import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Trophy, Lock, Zap } from "lucide-react";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { Card, CardContent, CardFooter } from "../components/ui/Card";
import { api, Event } from "../lib/api";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function LandingPage() {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [hackathons, setHackathons] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch public teaser data
    const fetchData = async () => {
      const allEvents = await api.getEvents();
      const allHackathons = await api.getHackathons();
      setFeaturedEvents(allEvents.slice(0, 2)); // Show top 2 events
      setHackathons(allHackathons.slice(0, 2)); // Show top 2 hackathons
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <BackgroundBlobs />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4 container mx-auto text-center z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-semibold backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            LIVE: Campus Events & Hackathons
          </motion.div>
          
          <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Don't Miss The <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Campus Hype</span>
          </motion.h1>
          
          <motion.p variants={item} className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            The exclusive platform for students. See upcoming fests, register for hackathons, and connect with societies.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-white text-black hover:bg-gray-200">
                Student Login <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8 border-white/20 hover:bg-white/10">
                Society Admin
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Live Showcase Section */}
      <section className="py-12 container mx-auto px-4 z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="text-yellow-500 fill-yellow-500" /> Trending Now
          </h2>
          <div className="text-sm text-gray-400">Login to view full details</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Hackathons Teaser */}
          {hackathons.map((hack, i) => (
            <motion.div 
              key={hack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-[#0a0a0a] border border-accent/30 h-full group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                  <Trophy className="w-12 h-12 text-accent/20 group-hover:text-accent/40" />
                </div>
                <CardContent className="p-6">
                  <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider">Hackathon</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{hack.title}</h3>
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {hack.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" /> Prize: {hack.prizePool || "₹50,000"}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full border-accent/30 hover:bg-accent/10 text-accent group-hover:border-accent">
                      <Lock className="w-3 h-3 mr-2" /> Login to Register
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}

          {/* Events Teaser */}
          {featuredEvents.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
            >
              <Card className="bg-white/5 border-white/10 h-full group hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{event.category} Event</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {event.location}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link to="/login" className="w-full">
                    <Button variant="secondary" className="w-full opacity-80 hover:opacity-100">
                      <Lock className="w-3 h-3 mr-2" /> Login to RSVP
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Stats */}
      <section className="mt-auto border-t border-white/10 bg-black/40 backdrop-blur-md py-8">
        <div className="container mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Societies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">12k+</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Students</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">Daily</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">Events</div>
          </div>
        </div>
      </section>
    </div>
  );
}
