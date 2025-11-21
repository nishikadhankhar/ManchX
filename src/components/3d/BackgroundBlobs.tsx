import { motion } from "framer-motion";

export const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] opacity-50"
      />
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] opacity-40"
      />
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 50, -100, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] opacity-30"
      />
    </div>
  );
};
