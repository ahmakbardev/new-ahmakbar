"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function PortfolioCTA() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [hovering, setHovering] = useState(false);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const text = textRef.current;
    if (!wrapper || !text) return;

    const move = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      target.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    wrapper.addEventListener("mousemove", move);
    text.addEventListener("mouseenter", enter);
    text.addEventListener("mouseleave", leave);

    const handleGlobalClick = () => {
      if (hovering) {
        window.open(
          "https://wa.me/62895366979201?text=Halo%20Akbar%2C%20saya%20tertarik%20kerja%20sama!",
          "_blank",
        );
      }
    };

    document.addEventListener("click", handleGlobalClick);

    let frame: number;
    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 1.2;
      current.current.y += (target.current.y - current.current.y) * 1.2;
      setCursor({ x: current.current.x, y: current.current.y });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      wrapper.removeEventListener("mousemove", move);
      text.removeEventListener("mouseenter", enter);
      text.removeEventListener("mouseleave", leave);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [hovering]);

  return (
    <section className="relative h-[92vh] bg-[#0052FF] text-white flex items-center justify-center overflow-hidden">
      <div
        ref={wrapperRef}
        className="relative w-full max-w-6xl flex h-full justify-center items-center"
      >
        <h2
          ref={textRef}
          className="text-5xl md:text-8xl font-bold select-none z-10 pointer-events-auto"
        >
          Let&apos;s Connect!
        </h2>

        {/* Circle Reveal with smooth lerp motion */}
        <motion.div
          className="absolute inset-0 z-[101] pointer-events-none flex bg-white justify-center items-center"
          animate={{
            scale: hovering ? 1 : 0.04,
            opacity: hovering ? 1 : 0,
          }}
          onClick={() =>
            window.open(
              "https://wa.me/62895366979201?text=Halo%20Akbar%2C%20saya%20tertarik%20kerja%20sama!",
              "_blank",
            )
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            WebkitMaskImage: `radial-gradient(circle 220px at ${cursor.x}px ${cursor.y}px, white 99%, transparent 100%)`,
            maskImage: `radial-gradient(circle 220px at ${cursor.x}px ${cursor.y}px, white 99%, transparent 100%)`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            transformOrigin: `${cursor.x}px ${cursor.y}px`,
          }}
        >
          <h2 className="text-5xl md:text-8xl font-bold text-[#0052FF]">
            Contact Me Now!
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
