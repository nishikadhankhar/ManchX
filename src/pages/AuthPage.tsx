import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { ArrowLeft, Loader2, GraduationCap } from "lucide-react";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  collegeCode: z.string().min(3, "Invalid code"),
  collegeId: z.string().min(5, "ID must be at least 5 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema)
  });

  const fillDemo = () => {
    setValue('collegeCode', 'DTU2025');
    setValue('password', 'password123');
    setValue('collegeId', '2K21/SE/045');
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const user = await api.login(data.collegeId, 'student');
      login(user);
      navigate("/dashboard");
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

        <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
          <CardHeader className="pb-2">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/20 text-primary border border-primary/50">
                <GraduationCap className="w-8 h-8" />
              </div>
            </div>
            
            <CardTitle className="text-2xl text-center">
              Student Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your College ID to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">College Code</label>
                <input 
                  {...register("collegeCode")}
                  placeholder="e.g. DTU2025"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none text-white"
                />
                {errors.collegeCode && <p className="text-red-400 text-xs">{(errors.collegeCode as any).message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">College ID</label>
                <input 
                  {...register("collegeId")}
                  placeholder="e.g. 2K21/SE/045"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none text-white"
                />
                {errors.collegeId && <p className="text-red-400 text-xs">{(errors.collegeId as any).message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <input 
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none text-white"
                />
              </div>

              <Button type="submit" className="w-full h-12 text-lg mt-4" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Login"}
              </Button>

              <div className="text-center pt-2 space-y-2">
                <button type="button" onClick={fillDemo} className="block w-full text-xs text-gray-500 hover:text-primary underline">
                  Auto-fill Student Demo
                </button>
                
                <div className="pt-4 border-t border-white/10">
                  <Link to="/admin-login" className="text-sm text-secondary hover:underline">
                    Are you a Society Admin? Login here
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
