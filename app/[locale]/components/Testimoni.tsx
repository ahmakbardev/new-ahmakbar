"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import * as Avatar from "@radix-ui/react-avatar";

const services = [
  {
    title: "Rifqi Ardhian",
    desc: "Reader will be distracted by the readable content.",
    rotate: 15,
    x: -550,
    y: -280,
    delay: 0.1,
    tags: ["📐 Strategist", "🎨 Graphic Designer"],
  },
  {
    title: "Tria Bagus",
    desc: "Reach more audiences with web design.",
    rotate: -10,
    x: -500,
    y: 100,
    delay: 0.2,
    tags: ["📐 Strategist", "🎨 Graphic Designer"],
  },
  {
    title: "Gita Kartika",
    desc: "Gain brand recognition with branding.",
    rotate: -10,
    x: 250,
    y: -280,
    delay: 0.3,
    tags: ["📐 Strategist", "🎨 Graphic Designer"],
  },
  {
    title: "Mahendra",
    desc: "Creative concept for your audiences.",
    rotate: 15,
    x: 200,
    y: 100,
    delay: 0.4,
    tags: ["📐 Strategist", "🎨 Graphic Designer"],
  },
];

export default function TestimonialGrid() {
  const controls = useAnimation();
  const titleControls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        services.forEach((s, i) => {
          controls.start((index) =>
            index === i
              ? {
                  x: s.x,
                  y: s.y,
                  rotate: s.rotate,
                  opacity: 1,
                  transition: { duration: 0.4 },
                }
              : {},
          );
        });

        titleControls.start({
          opacity: 1,
          scale: 1,
        });
      }, 1000); // delay 5 detik

      return () => clearTimeout(timeout); // cleanup kalau user scroll cepat
    }
  }, [inView, controls, titleControls]);

  return (
    <section ref={ref} className="relative h-screen w-screen overflow-hidden">
      {services.map((s, i) => (
        <motion.div
          key={i}
          custom={i}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={controls}
          whileHover={{
            scale: 1.08,
            rotate: 0,
            zIndex: 10,
            transition: { duration: 0.2 },
          }}
          onHoverEnd={() => {
            controls.start((index) =>
              index === i
                ? {
                    x: s.x,
                    y: s.y,
                    rotate: s.rotate, // reset ke rotate awal
                    opacity: 1,
                    transition: { duration: 0.1 },
                  }
                : {},
            );
          }}
          className="service-card absolute left-[58%] top-[60%] w-64 p-5 bg-white rounded-3xl shadow-xl -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 cursor-pointer"
        >
          <Avatar.Root className="relative w-[140px] h-[140px] bg-[#0052FF] mx-auto rounded-full overflow-hidden">
            <Avatar.Image
              src={`https://api.dicebear.com/7.x/micah/svg?seed=${s.title}`}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            <Avatar.Fallback
              delayMs={200}
              className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 text-3xl font-bold"
            >
              {s.title.charAt(0)}
            </Avatar.Fallback>
          </Avatar.Root>

          <div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-3">{s.desc}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {s.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={titleControls}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.5 }}
        className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl font-bold text-white"
      >
        People who worked <br /> with me are saying
      </motion.h1>
    </section>
  );
}
