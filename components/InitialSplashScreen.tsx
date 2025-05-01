"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function InitialSplashScreen() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("splashShown");
    if (!alreadyShown) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("splashShown", "true");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [showSplash]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 1 }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 bg-white z-[9999] flex items-center justify-center pointer-events-none"
          style={{ touchAction: "none" }}
        >
          {/* SVG Circle Animation */}
          <motion.svg
            width={140}
            height={140}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute z-0 scale-[1.5]"
          >
            <circle
              cx="70"
              cy="70"
              r="65"
              stroke="#000"
              strokeWidth="2"
              fill="none"
              strokeDasharray={2 * Math.PI * 65}
              strokeDashoffset={2 * Math.PI * 65}
              transform="rotate(-90 70 70)" // fix: start dari jam 9
            >
              <animate
                attributeName="stroke-dashoffset"
                from={2 * Math.PI * 65}
                to="0"
                dur="1.5s"
                fill="freeze"
                begin="0s"
              />
            </circle>
          </motion.svg>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-10"
          >
            <Image
              src="/logo/a.webp"
              alt="Loading..."
              width={100}
              height={100}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
