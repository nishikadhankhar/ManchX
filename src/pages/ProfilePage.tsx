import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Github, ExternalLink, Plus, Trophy, Medal, Code } from "lucide-react";
import { api, Project } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {
    api.getProjects().then(setProjects);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 container mx-auto relative">
      <BackgroundBlobs />

      {/* Header Profile Card */}
      <Card className="bg-white/5 border-white/10 mb-8 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 to-secondary/30" />
        <CardContent className="relative pt-0 px-8 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-12">
            <div className="w-32 h-32 rounded-2xl bg-black border-4 border-black overflow-hidden flex items-center justify-center text-4xl font-bold text-gray-500">
              {user?.avatar || "JD"}
            </div>
            <div className="flex-1 mb-2">
              <h1 className="text-3xl font-bold">{user?.name || "Student Name"}</h1>
              <p className="text-gray-400">{user?.collegeId || "2K21/SE/XXX"} • Computer Science</p>
            </div>
            <div className="flex gap-4 mb-2">
              <div className="text-center px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-gray-400">Points</p>
                <p className="text-xl font-bold text-yellow-500">{user?.points || 0}</p>
              </div>
              <div className="text-center px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <p className="text-xs text-gray-400">Events</p>
                <p className="text-xl font-bold text-primary">12</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Achievements & Badges */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Medal className="w-5 h-5 text-yellow-500" /> Badges</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              {['Hackathon Winner', 'Top Contributor', 'Event Organizer'].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-2xl border border-yellow-500/30">
                    🏆
                  </div>
                  <span className="text-[10px] text-gray-400">{badge}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-lg font-bold text-accent">Projects</h2>
            <Button size="sm" onClick={() => setShowAddProject(true)}><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="bg-white/5 border-white/10 hover:border-primary/50 transition-all group">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 h-10 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1">
                        <Button variant="outline" size="sm" className="w-full"><Github className="w-4 h-4 mr-2" /> Code</Button>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1">
                        <Button variant="secondary" size="sm" className="w-full"><ExternalLink className="w-4 h-4 mr-2" /> Demo</Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {showAddProject && <AddProjectModal onClose={() => setShowAddProject(false)} onAdd={(p) => setProjects([p, ...projects])} />}
    </div>
  );
}

function AddProjectModal({ onClose, onAdd }: { onClose: () => void, onAdd: (p: Project) => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newProject = await api.addProject({
      title,
      description: desc,
      techStack: ["React", "Node.js"],
      githubUrl: "https://github.com",
    });
    onAdd(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold mb-4">Upload Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white" required />
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white h-24" required />
          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Upload</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
