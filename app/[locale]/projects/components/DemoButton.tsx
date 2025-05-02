"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface DemoButtonProps {
  label: string;
}

export default function DemoButton({ label }: DemoButtonProps) {
  const [hovered, setHovered] = useState(false);
  const { slug } = useParams();
  const t = useTranslations(slug as string);

  const targetUrl = t("targetUrl");
  const bgColor = t("color.hex");
  const iconTextColor = t("color.hex") || "#3b82f6"; // default ke blue-500 kalau tidak tersedia

  return (
    <Link href={targetUrl} target="_blank" rel="noopener noreferrer">
      <motion.button
        style={{ backgroundColor: bgColor }}
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
        className={`group mt-6 w-fit cursor-pointer flex items-center text-white font-semibold rounded-full pl-10 py-2 overflow-hidden relative`}
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
          style={{ color: iconTextColor }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white w-7 h-7 rounded-full flex items-center justify-center shadow-md"
        >
          <ArrowUpRight size={16} />
        </motion.span>
      </motion.button>
    </Link>
  );
}
