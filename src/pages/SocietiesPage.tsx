import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Users, ChevronRight, Star } from "lucide-react";
import { api, Society } from "../lib/api";

export default function SocietiesPage() {
  const [societies, setSocieties] = useState<Society[]>([]);

  useEffect(() => {
    api.getSocieties().then(setSocieties);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 container mx-auto relative">
      <BackgroundBlobs />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Student Societies</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join a community that matches your vibe. From coding to dancing, we have it all.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {societies.map((society, index) => (
          <motion.div
            key={society.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                    {society.logo}
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold border border-white/10">
                    {society.category}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{society.name}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10 line-clamp-2">{society.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{society.members} Members</span>
                  </div>
                  <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
