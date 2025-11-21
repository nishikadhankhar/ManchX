import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 sm:w-96"
          >
            <Card className="bg-black/80 backdrop-blur-xl border-primary/30 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="font-bold text-white">ManchX AI</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="h-80 p-4 overflow-y-auto space-y-4">
                <div className="bg-white/10 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p className="text-sm">Hey! I'm your campus guide. Ask me about events, societies, or exam dates!</p>
                </div>
              </div>
              <div className="p-3 border-t border-white/10 flex gap-2">
                <input 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 text-sm focus:outline-none focus:border-primary"
                  placeholder="Ask something..."
                />
                <Button size="icon" className="h-9 w-9"><Send className="w-4 h-4" /></Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_20px_rgba(139,92,246,0.5)] flex items-center justify-center text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};
