"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollDownIndicator() {
  return (
    <div className="absolute bottom-10 lg:bottom-36 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 group cursor-pointer">
      <motion.span
        className="text-xs text-white font-medium tracking-wide"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Scroll Down
      </motion.span>
      <motion.div
        initial={{ y: 0, opacity: 0.7 }}
        animate={{ y: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-6 h-6 text-white animate-bounce" />
      </motion.div>
    </div>
  );
}
