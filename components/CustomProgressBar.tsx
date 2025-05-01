"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomProgressBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleStart = () => {
      setLoading(true);
      timeout = setTimeout(() => setLoading(false), 800); // auto stop after 800ms fallback
    };

    handleStart(); // trigger on initial load
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="progress"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 left-0 h-1 bg-amber-500 z-[9999]"
        />
      )}
    </AnimatePresence>
  );
}
