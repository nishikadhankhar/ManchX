import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { Card, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Calendar, MapPin, Trophy, Users, Code, ExternalLink, Zap } from "lucide-react";
import { api, Event } from "../lib/api";

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getHackathons().then((data) => {
      setHackathons(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 container mx-auto relative">
      <BackgroundBlobs />
      
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-mono backdrop-blur-md"
        >
          &lt;BuildTheFuture /&gt;
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Hackathons <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Zone</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Compete with the best minds. Solve real-world problems. Win big prizes.
          The ultimate arena for campus developers.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading Hackathons...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hackathons.map((hack, index) => (
            <motion.div
              key={hack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#0a0a0a] border border-white/10 hover:border-accent/50 transition-all overflow-hidden group relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colors" />
                
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Code className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono text-gray-400 mb-1">PRIZE POOL</span>
                      <span className="text-xl font-bold text-green-400">{hack.prizePool || "₹10,000"}</span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">{hack.title}</h3>
                  <p className="text-gray-400 mb-6 line-clamp-2">
                    {hack.description || "Join us for 24 hours of non-stop coding, innovation, and fun. Build solutions for modern problems."}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{hack.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Users className="w-4 h-4 text-accent" />
                      <span>{hack.teamSize || "1-4 Members"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{hack.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span>Certificates & Swag</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 bg-accent hover:bg-accent/90 text-black font-bold h-12">
                      <Zap className="w-4 h-4 mr-2" /> Register Now
                    </Button>
                    <Button variant="outline" className="flex-1 h-12 border-white/20 hover:bg-white/5">
                      View Details <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
