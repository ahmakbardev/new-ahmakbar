import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface DemoButtonProps {
  label: string;
}

export default function DemoButton({ label }: DemoButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="https://staging.edutorium.in/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          paddingRight: hovered ? "3.5rem" : "2.5rem",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="group mt-6 w-fit cursor-pointer flex items-center bg-blue-500 text-white font-semibold rounded-full pl-10 py-2 overflow-hidden relative"
      >
        <span className="z-10">{label}</span>

        <motion.span
          animate={{
            x: hovered ? 0 : 40,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-blue-500 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
        >
          <ArrowUpRight size={16} />
        </motion.span>
      </motion.button>
    </Link>
  );
}
