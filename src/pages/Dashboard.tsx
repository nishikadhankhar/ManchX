import { motion } from "framer-motion";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Zap, Users, Code, Trophy, ArrowRight, Target, Lightbulb, Globe } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-24 pb-10 px-4 container mx-auto relative">
      <BackgroundBlobs />
      
      {/* Welcome Section */}
      <div className="text-center mb-16 space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ManchX</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Your exclusive gateway to campus life. Connect, Compete, and Conquer.
        </motion.p>
      </div>

      {/* Our Aim / Mission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To bridge the gap between students and societies, creating a unified platform for all campus activities, events, and opportunities.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Innovation First</h3>
            <p className="text-gray-400 leading-relaxed">
              We empower students to showcase their projects, participate in hackathons, and build a portfolio that stands out to recruiters.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Community</h3>
            <p className="text-gray-400 leading-relaxed">
              A safe, exclusive space for college students to connect with seniors, join clubs, and find their tribe without outside noise.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How It Works / Quick Links */}
      <h2 className="text-3xl font-bold text-center mb-10">Explore The Platform</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Link to="/hackathons">
          <Card className="h-full bg-gradient-to-br from-gray-900 to-black border-white/10 hover:border-accent/50 group">
            <CardContent className="p-6">
              <Code className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">Hackathons</h3>
              <p className="text-sm text-gray-400 mb-4">Compete in coding battles and win big prizes.</p>
              <div className="flex items-center text-accent text-sm font-bold">
                Register Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/events">
          <Card className="h-full bg-gradient-to-br from-gray-900 to-black border-white/10 hover:border-primary/50 group">
            <CardContent className="p-6">
              <Zap className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Events</h3>
              <p className="text-sm text-gray-400 mb-4">Discover fests, workshops, and cultural nights.</p>
              <div className="flex items-center text-primary text-sm font-bold">
                View Calendar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/societies">
          <Card className="h-full bg-gradient-to-br from-gray-900 to-black border-white/10 hover:border-secondary/50 group">
            <CardContent className="p-6">
              <Users className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">Societies</h3>
              <p className="text-sm text-gray-400 mb-4">Join clubs that match your passion.</p>
              <div className="flex items-center text-secondary text-sm font-bold">
                Find Clubs <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/profile">
          <Card className="h-full bg-gradient-to-br from-gray-900 to-black border-white/10 hover:border-yellow-500/50 group">
            <CardContent className="p-6">
              <Trophy className="w-10 h-10 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">Your Profile</h3>
              <p className="text-sm text-gray-400 mb-4">Track your points, badges, and projects.</p>
              <div className="flex items-center text-yellow-500 text-sm font-bold">
                Go to Profile <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

      </div>
    </div>
  );
}
