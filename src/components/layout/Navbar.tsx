import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Zap, Menu, X, User, Code, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/admin-login";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isAuthPage) return null;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter">Manch<span className="text-primary">X</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {user?.role === 'admin' ? (
            <>
              <Link to="/admin-dashboard" className="text-sm font-medium text-gray-300 hover:text-white">Admin Panel</Link>
              <Link to="/societies" className="text-sm font-medium text-gray-300 hover:text-white">My Society</Link>
              <Link to="/messages" className="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-2">
                Messages
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white">Home</Link>
              <Link to="/feed" className="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-1">
                <LayoutGrid className="w-3 h-3" /> Community
              </Link>
              <Link to="/events" className="text-sm font-medium text-gray-300 hover:text-white">Events</Link>
              <Link to="/hackathons" className="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-1">
                <Code className="w-3 h-3" /> Hackathons
              </Link>
              <Link to="/societies" className="text-sm font-medium text-gray-300 hover:text-white">Societies</Link>
              {user && (
                <Link to="/messages" className="text-sm font-medium text-gray-300 hover:text-white">
                  Messages
                </Link>
              )}
            </>
          )}
          
          {user ? (
             <div className="flex items-center gap-4 ml-2">
                <Link to="/profile">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/50">
                    <User className="w-4 h-4" />
                  </div>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
             </div>
          ) : (
            <Link to="/login">
              <Button variant="glass" size="sm">Login / Join</Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10"
        >
          <div className="flex flex-col p-4 gap-4">
             <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-gray-300">Home</Link>
             <Link to="/feed" onClick={() => setIsMenuOpen(false)} className="text-gray-300">Community</Link>
             <Link to="/events" onClick={() => setIsMenuOpen(false)} className="text-gray-300">Events</Link>
             <Link to="/hackathons" onClick={() => setIsMenuOpen(false)} className="text-gray-300">Hackathons</Link>
             <Link to="/societies" onClick={() => setIsMenuOpen(false)} className="text-gray-300">Societies</Link>
             {user && (
                <Link to="/messages" onClick={() => setIsMenuOpen(false)} className="text-gray-300">Messages</Link>
             )}
             {!user && (
               <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Login</Button>
               </Link>
             )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
