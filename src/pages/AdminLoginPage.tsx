import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { ArrowLeft, Loader2, Users } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  collegeCode: z.string().min(3, "Invalid code"),
  adminId: z.string().min(5, "ID must be at least 5 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema)
  });

  const fillDemo = () => {
    setValue('collegeCode', 'DTU2025');
    setValue('password', 'password123');
    setValue('adminId', 'ADMIN/CSI/001');
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const user = await api.login(data.adminId, 'admin');
      login(user);
      navigate("/admin-dashboard");
    } catch (error: any) {
      alert(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundBlobs />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <Card className="border-secondary/30 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(236,72,153,0.1)]">
          <CardHeader className="pb-2">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-secondary/20 text-secondary border border-secondary/50">
                <Users className="w-8 h-8" />
              </div>
            </div>
            
            <CardTitle className="text-2xl text-center">
              Society Admin Portal
            </CardTitle>
            <CardDescription className="text-center">
              Manage your society events and members
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">College Code</label>
                <input 
                  {...register("collegeCode")}
                  placeholder="e.g. DTU2025"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-secondary outline-none text-white"
                />
                {errors.collegeCode && <p className="text-red-400 text-xs">{(errors.collegeCode as any).message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Admin ID</label>
                <input 
                  {...register("adminId")}
                  placeholder="e.g. ADMIN/CSI/001"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-secondary outline-none text-white"
                />
                {errors.adminId && <p className="text-red-400 text-xs">{(errors.adminId as any).message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <input 
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-secondary outline-none text-white"
                />
              </div>

              <Button type="submit" variant="secondary" className="w-full h-12 text-lg mt-4" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Admin Login"}
              </Button>

              <div className="text-center pt-2 space-y-2">
                <button type="button" onClick={fillDemo} className="block w-full text-xs text-gray-500 hover:text-secondary underline">
                  Auto-fill Admin Demo
                </button>
                
                <div className="pt-4 border-t border-white/10">
                  <Link to="/login" className="text-sm text-primary hover:underline">
                    Not an Admin? Student Login
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
