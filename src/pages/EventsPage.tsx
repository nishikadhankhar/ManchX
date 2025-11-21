import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { Card, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { MapPin, Users, Tag, Loader2, Calendar, CheckCircle } from "lucide-react";
import { api, Event } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ['All', 'Cultural', 'Tech', 'Sports', 'Trip', 'Workshop', 'Society Interview'];

export default function EventsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [registeringId, setRegisteringId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, userRegistrations] = await Promise.all([
          api.getEvents(),
          user ? api.getUserRegistrations(user.id) : Promise.resolve([])
        ]);
        setEvents(eventsData);
        setRegisteredIds(userRegistrations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleRegister = async (eventId: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setRegisteringId(eventId);
    try {
      await api.registerForEvent(eventId, user.id);
      setRegisteredIds([...registeredIds, eventId]);
      // Update local event state to reflect new attendee count
      setEvents(events.map(e => 
        e.id === eventId ? { ...e, attendees: e.attendees + 1 } : e
      ));
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed or you are already registered.");
    } finally {
      setRegisteringId(null);
    }
  };

  const filteredEvents = activeFilter === 'All' 
    ? events 
    : events.filter(e => e.category === activeFilter);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 container mx-auto relative">
      <BackgroundBlobs />
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Campus Events</h1>
          <p className="text-gray-400">Discover what's happening around you.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === cat 
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]' 
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((event, index) => {
            const isRegistered = registeredIds.includes(event.id);
            const isRegistering = registeringId === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white/5 border-white/10 h-full flex flex-col overflow-hidden group hover:border-primary/30 transition-colors">
                  <div className="h-40 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {event.category}
                    </div>
                    <div className={`w-full h-full opacity-50 bg-gradient-to-tr ${
                      event.category === 'Tech' ? 'from-blue-600 to-purple-600' :
                      event.category === 'Cultural' ? 'from-pink-600 to-orange-600' :
                      event.category === 'Sports' ? 'from-green-600 to-emerald-600' :
                      event.category === 'Trip' ? 'from-orange-500 to-red-600' :
                      event.category === 'Society Interview' ? 'from-slate-700 to-slate-900' :
                      'from-gray-600 to-gray-500'
                    }`} />
                  </div>
                  
                  <CardContent className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {event.date}
                      </span>
                      <span className="text-xs text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded">FREE</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{event.description || "No description provided."}</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" /> {event.attendees} Interested
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-5 pt-0">
                    <Button 
                      className={`w-full transition-all ${isRegistered ? 'bg-green-500/20 text-green-500 border-green-500/50 hover:bg-green-500/30' : ''}`} 
                      variant={isRegistered ? "outline" : "secondary"}
                      disabled={isRegistered || isRegistering}
                      onClick={() => handleRegister(event.id)}
                    >
                      {isRegistering ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : isRegistered ? (
                        <><CheckCircle className="w-4 h-4 mr-2" /> Registered</>
                      ) : (
                        event.category === 'Society Interview' ? 'Apply Now' : 'RSVP Now'
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
