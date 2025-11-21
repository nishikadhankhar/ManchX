import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Plus, Users, Calendar, Award, Settings, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { api, Society } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'members'>('overview');
  const [showEventModal, setShowEventModal] = useState(false);
  const [society, setSociety] = useState<Society | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSocietyDetails = async () => {
      if (user?.societyId) {
        const societies = await api.getSocieties();
        const mySociety = societies.find(s => s.id === user.societyId);
        setSociety(mySociety || null);
      }
      setLoading(false);
    };
    loadSocietyDetails();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 container mx-auto relative">
      <BackgroundBlobs />
      
      {/* Society Header Identity */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-white/10">
            {society?.logo || "🏛️"}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-bold">{society?.name || "Society Admin"}</h1>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">
                {society?.category || "General"}
              </span>
            </div>
            <p className="text-gray-400 max-w-xl">{society?.description || "Manage your society events and members."}</p>
            <p className="text-sm text-gray-500 mt-2">Logged in as: <span className="text-white font-medium">{user?.name}</span> ({user?.collegeId})</p>
          </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Settings className="w-4 h-4 mr-2" /> Settings
          </Button>
          <Button onClick={() => setShowEventModal(true)} className="flex-1 md:flex-none bg-gradient-to-r from-primary to-secondary border-0 shadow-lg shadow-primary/25">
            <Plus className="w-4 h-4 mr-2" /> Create Event
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/10 pb-1 overflow-x-auto">
        {['overview', 'events', 'members'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 text-sm font-bold capitalize border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && <OverviewSection society={society} />}
      {activeTab === 'events' && <EventsManager />}
      {activeTab === 'members' && <MembersManager />}

      {showEventModal && <CreateEventModal onClose={() => setShowEventModal(false)} />}
    </div>
  );
}

function OverviewSection({ society }: { society: Society | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-4 rounded-full bg-blue-500/20 text-blue-500"><Users className="w-8 h-8" /></div>
          <div>
            <p className="text-gray-400 text-sm">Total Members</p>
            <h3 className="text-3xl font-bold">{society?.members || 0}</h3>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-4 rounded-full bg-purple-500/20 text-purple-500"><Calendar className="w-8 h-8" /></div>
          <div>
            <p className="text-gray-400 text-sm">Events Hosted</p>
            <h3 className="text-3xl font-bold">8</h3>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-4 rounded-full bg-yellow-500/20 text-yellow-500"><Award className="w-8 h-8" /></div>
          <div>
            <p className="text-gray-400 text-sm">Points Awarded</p>
            <h3 className="text-3xl font-bold">5,200</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EventsManager() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold">Upcoming Events</h3>
              <p className="text-sm text-gray-400">Manage registrations and details</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold">
                  25<br/>OCT
                </div>
                <div>
                  <h4 className="font-bold">Neon Night: Fresher's Party</h4>
                  <p className="text-xs text-gray-400">Main Ground • 450 Registered</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="secondary">View RSVPs</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MembersManager() {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle>Society Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">S{i}</div>
                <div>
                  <p className="font-bold">Student Name {i}</p>
                  <p className="text-xs text-gray-400">2K21/SE/0{40+i}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/10">
                <Award className="w-4 h-4 mr-1" /> Reward Points
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CreateEventModal({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    await api.createEvent({ ...data, attendees: 0 });
    onClose();
    alert("Event Created Successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Event Title</label>
            <input {...register("title")} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" placeholder="e.g. Hackathon 2025" required />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea 
              {...register("description")} 
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white resize-none" 
              rows={3}
              placeholder="Event details, requirements, etc." 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm text-gray-400 mb-1">Date</label>
               <input {...register("date")} type="date" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" required />
            </div>
             <div>
               <label className="block text-sm text-gray-400 mb-1">Category</label>
               <select {...register("category")} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white">
                 <option>Tech</option>
                 <option>Cultural</option>
                 <option>Sports</option>
                 <option>Trip</option>
                 <option>Workshop</option>
                 <option>Society Interview</option>
               </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Location</label>
            <input {...register("location")} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" placeholder="e.g. Auditorium" required />
          </div>
          
          <div className="flex gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Publish Event</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
