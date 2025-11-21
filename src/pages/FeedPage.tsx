import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon, Trophy, Star, TrendingUp } from "lucide-react";
import { api, Post, Comment } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

export default function FeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;

    const post = await api.createPost(newPostContent, user);
    setPosts([post, ...posts]);
    setNewPostContent("");
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 container mx-auto relative">
      <BackgroundBlobs />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar: User Stats */}
        <div className="hidden lg:block space-y-6">
          <Card className="bg-white/5 border-white/10 sticky top-24">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white mb-4 border-4 border-black">
                {user?.avatar || "ME"}
              </div>
              <h2 className="text-xl font-bold">{user?.name || "Student"}</h2>
              <p className="text-sm text-gray-400 mb-6">{user?.title || "Campus Rookie"}</p>
              
              <div className="space-y-4">
                <div className="bg-black/20 rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Level {user?.level || 1}</span>
                    <span className="text-primary font-bold">{user?.points || 0} XP</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-[70%]" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <div className="font-bold text-lg text-white">12</div>
                    <div className="text-xs text-gray-400">Posts</div>
                  </div>
                  <div className="p-2 bg-white/5 rounded-lg">
                    <div className="font-bold text-lg text-white">450</div>
                    <div className="text-xs text-gray-400">Views</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center: Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post Widget */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-sm font-bold">
                  {user?.avatar || "ME"}
                </div>
                <form onSubmit={handleCreatePost} className="flex-1">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your achievements, project updates, or ask something..."
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 resize-none h-20"
                  />
                  <div className="flex justify-between items-center pt-2 border-t border-white/10 mt-2">
                    <div className="flex gap-2">
                      <Button type="button" variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                        <ImageIcon className="w-4 h-4 mr-2" /> Photo
                      </Button>
                    </div>
                    <Button type="submit" size="sm" disabled={!newPostContent.trim()} className="bg-primary hover:bg-primary/90">
                      Post
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Posts Stream */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center text-gray-500 py-10">Loading feed...</div>
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar: Trending */}
        <div className="hidden lg:block space-y-6">
          <Card className="bg-white/5 border-white/10 sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-4 h-4 text-accent" /> Trending on Campus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { tag: "#HackathonWinner", count: "2.4k posts" },
                { tag: "#FresherParty", count: "1.8k posts" },
                { tag: "#PlacementSeason", count: "900 posts" },
                { tag: "#CampusLife", count: "500 posts" },
              ].map((topic, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                  <div>
                    <p className="text-sm font-bold text-gray-200 group-hover:text-primary transition-colors">{topic.tag}</p>
                    <p className="text-xs text-gray-500">{topic.count}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  // Initialize with a copy to avoid reference mutation issues with mock API
  const [comments, setComments] = useState([...post.comments]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    api.likePost(post.id);
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = await api.addComment(post.id, newComment, user?.name || "Me");
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-4 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center font-bold text-sm">
              {post.authorAvatar}
            </div>
            <div>
              <h3 className="font-bold text-sm">{post.authorName}</h3>
              <p className="text-xs text-gray-400">{post.authorTitle} • {post.timestamp}</p>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-2">
            <p className="text-sm text-gray-200 whitespace-pre-wrap">{post.content}</p>
          </div>
          
          {post.image && (
            <div className="mt-2 w-full h-64 overflow-hidden">
              <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Stats */}
          <div className="px-4 py-2 flex items-center justify-between text-xs text-gray-400 border-b border-white/5">
            <span>{likesCount} Likes</span>
            <span>{comments.length} Comments</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-2">
            <Button 
              variant="ghost" 
              className={cn("flex-1 gap-2", isLiked ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-white")}
              onClick={handleLike}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} /> Like
            </Button>
            <Button 
              variant="ghost" 
              className="flex-1 gap-2 text-gray-400 hover:text-white"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="w-4 h-4" /> Comment
            </Button>
            <Button variant="ghost" className="flex-1 gap-2 text-gray-400 hover:text-white">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-black/20 border-t border-white/5"
              >
                <div className="p-4 space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs">
                        {comment.authorAvatar}
                      </div>
                      <div className="flex-1 bg-white/5 rounded-lg p-2 text-xs">
                        <div className="font-bold mb-1">{comment.authorName}</div>
                        <p className="text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  <form onSubmit={handleComment} className="flex gap-2 mt-2">
                    <input 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                    />
                    <Button type="submit" size="icon" variant="secondary" disabled={!newComment.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
