"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export interface Slide {
  image: string;
  label: string;
  link: string;
}

interface ProjectImageSliderProps {
  slides: Slide[];
}

export default function ProjectImageSlider({
  slides,
}: ProjectImageSliderProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const paginate = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) =>
      dir === 1
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length,
    );
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative rounded-3xl aspect-video shadow-md w-full overflow-hidden">
      {/* Top-right Button */}
      <div className="absolute top-4 right-4 z-10">
        <a
          href={slides[index].link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-1 rounded-full transition-all duration-300"
        >
          {slides[index].label}
        </a>
      </div>

      {/* Image Slide */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: direction < 0 ? "100%" : "-100%" }}
            transition={{
              duration: 0.6,
              ease: [0.77, 0, 0.175, 1], // cubic-bezier untuk swipe smooth
            }}
            className="absolute inset-0 w-full h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -100)
                paginate(1); // Swipe left → next
              else if (info.offset.x > 100) paginate(-1); // Swipe right → prev
            }}
          >
            <Image
              src={slides[index].image}
              alt={slides[index].label}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer
              ${index === i ? "w-14 bg-blue-500/30" : "w-2 aspect-square bg-blue-500/30"}`}
          >
            {index === i && (
              <motion.div
                key={i + "-fill"}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
                className="absolute left-0 top-0 h-full bg-blue-600 rounded-r-full"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
