import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BackgroundBlobs } from "../components/3d/BackgroundBlobs";
import { Button } from "../components/ui/Button";
import { Search, Send, Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { api, ChatContact, Message } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

export default function MessengerPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatContact[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<(Message & { isMine: boolean })[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch Chats
  useEffect(() => {
    if (!user) return;
    const loadChats = () => {
        api.getChats(user.role).then((data) => {
            setChats(data);
            setLoading(false);
        });
    };
    loadChats();
    
    // Poll for new chats/last messages every 3 seconds
    const interval = setInterval(loadChats, 3000);
    return () => clearInterval(interval);
  }, [user]);

  // Fetch Messages when chat selected
  useEffect(() => {
    if (selectedChat && user) {
      const loadMessages = () => {
          api.getMessages(user.id, selectedChat.id).then(setMessages);
      };
      loadMessages();
      
      // Poll for new messages every 1 second
      const interval = setInterval(loadMessages, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedChat, user]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat || !user) return;

    const msg = await api.sendMessage(user.id, selectedChat.id, newMessage);
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="h-screen pt-20 pb-4 px-4 container mx-auto relative flex flex-col">
      <BackgroundBlobs />
      
      <div className="flex-1 flex gap-6 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        
        {/* Sidebar - Chat List */}
        <div className={cn(
          "w-full md:w-80 flex flex-col border-r border-white/10 bg-white/5",
          selectedChat ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                placeholder="Search people..." 
                className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {loading ? (
              <div className="text-center p-4 text-gray-400">Loading chats...</div>
            ) : (
              chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left",
                    selectedChat?.id === chat.id ? "bg-primary/20 border border-primary/30" : "hover:bg-white/5"
                  )}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center font-bold text-white">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold truncate text-sm">{chat.name}</h3>
                      <span className="text-[10px] text-gray-400">{chat.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col bg-black/20",
          !selectedChat ? "hidden md:flex" : "flex"
        )}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedChat(null)}>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-sm">
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold">{selectedChat.name}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      {selectedChat.role} 
                      {selectedChat.online && <span className="text-green-500">• Online</span>}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon"><Video className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex w-full",
                      msg.isMine ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "max-w-[75%] p-3 rounded-2xl text-sm",
                      msg.isMine 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-white/10 text-gray-200 rounded-tl-none"
                    )}>
                      <p>{msg.content}</p>
                      <span className="text-[10px] opacity-50 block text-right mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <Button type="submit" size="icon" className="rounded-xl bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Send className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-xl font-bold text-gray-300 mb-2">Your Messages</h3>
              <p className="max-w-xs">Select a chat from the sidebar to start messaging society heads or students.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
