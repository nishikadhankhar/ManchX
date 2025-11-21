import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import Dashboard from "./pages/Dashboard";
import EventsPage from "./pages/EventsPage";
import SocietiesPage from "./pages/SocietiesPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import MessengerPage from "./pages/MessengerPage";
import HackathonsPage from "./pages/HackathonsPage";
import FeedPage from "./pages/FeedPage";
import { AIChatbot } from "./components/layout/AIChatbot";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/hackathons" element={<HackathonsPage />} />
            <Route path="/societies" element={<SocietiesPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/messages" element={<MessengerPage />} />
            <Route path="/feed" element={<FeedPage />} />
          </Routes>
          <AIChatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
