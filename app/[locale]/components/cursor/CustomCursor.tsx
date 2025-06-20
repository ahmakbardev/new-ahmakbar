"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest(".cursor-pointer"));
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if ((scrollY > vh && scrollY < 4800) || scrollY > 5400) {
        setIsWhite(true);
      } else {
        setIsWhite(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mouseout", handleHover);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mouseout", handleHover);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-[99] pointer-events-none transition-transform duration-75 ease-out rounded-full 
        ${isHovering ? "w-6 h-6 mix-blend-difference" : "w-4 h-4 opacity-60"} 
        ${isWhite ? "bg-white" : "bg-black"}
      `}
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    />
  );
}
