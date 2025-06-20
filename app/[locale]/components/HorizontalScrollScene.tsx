"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  slug: string;
  title: string;
  type: string;
  desc: string;
  image: string;
  tooltips: { position: "top" | "bottom" | "left" | "right"; text: string }[];
}

export default function HorizontalScrollScene() {
  const t = useTranslations("projects");
  const projectCount = 4;

  const projects = Array.from({ length: projectCount })
    .map((_, i) => {
      try {
        return {
          slug: t(`${i}.slug`),
          title: t(`${i}.title`),
          type: t(`${i}.type`),
          desc: t(`${i}.desc`),
          image: t(`${i}.image`),
          tooltips: t.raw(`${i}.tooltips`),
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as Project[];

  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scene1Ref = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const tooltipPositionClass = {
    top: "-top-3 left-10 mb-2",
    bottom: "-bottom-3 right-3 mt-2",
    left: "-left-2 top-1/2 -translate-y-1/2 mr-2",
    right: "-right-2 bottom-28",
  };

  useEffect(() => {
    const top = topRef.current;
    const bot = bottomRef.current;
    const text = textRef.current;
    const outer = outerRef.current;
    const scene = scene1Ref.current;
    const badge = badgeRef.current;

    if (!top || !bot || !text || !outer || !scene) return;

    // Set initial state
    gsap.set([top, bot], {
      opacity: 0,
      scale: 2.5,
      y: (i) => (i === 0 ? -100 : 100),
    });

    gsap.set(badge, {
      opacity: 0,
      scale: 0.95,
      rotate: -10,
    });
    const spans = text.querySelectorAll("span");

    const stText = ScrollTrigger.create({
      trigger: text,
      start: "top-=100 center",
      onEnter: () => {
        gsap.fromTo(
          badge,
          { opacity: 0, scale: 0.95, rotate: -10 },
          {
            opacity: 1,
            scale: 1,
            rotate: 18, // biar tetap miring
            duration: 0.3,
            ease: "power2.out",
          },
        );

        gsap.fromTo(
          spans,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.03,
            duration: 0.3,
            ease: "power2.out",
          },
        );

        gsap.to(top, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: 0.5,
          ease: "power2.out",
        });
        gsap.to(bot, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: 0.5,
          ease: "power2.out",
        });
      },

      onLeaveBack: () => {
        gsap.to(badge, {
          opacity: 0,
          scale: 0.95,
          rotate: -10,
          duration: 0.3,
        });

        gsap.to(spans, {
          opacity: 0,
          scale: 0.98,
          stagger: -0.03,
          duration: 0.3,
        });

        gsap.set([top, bot], {
          opacity: 0,
          scale: 2.5,
          y: (i) => (i === 0 ? -100 : 100),
        });
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top top+=300",
        end: "+=1500",
        scrub: true,
        pin: true,
      },
    });

    tl.to(top, { xPercent: -20, ease: "power1.inOut" });
    tl.to(bot, { xPercent: 20, ease: "power1.inOut" }, "<");

    const bgTrigger = ScrollTrigger.create({
      trigger: text,
      start: "top-=150 center",
      end: "bottom bottom-=300",
      scrub: true,
      onUpdate: () => {
        gsap.to(outer, { backgroundColor: "#000000", duration: 0.3 });
      },
    });

    return () => {
      // Cleanup semua trigger agar tidak crash saat kembali
      stText.kill();
      bgTrigger.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const textLine1 = "All about";
  const textLine2 = "My Portfolios";

  return (
    <section
      ref={outerRef}
      className="bg-[#0052FF] text-white transition-all relative z-0 ease-in-out duration-300 overflow-hidden"
    >
      <div
        ref={scene1Ref}
        id="scene1"
        className="flex flex-col items-center gap-10"
      >
        <div
          ref={topRef}
          className={`flex gap-6 transition-opacity duration-300 ${
            hoveredIndex !== null ? "opacity-100" : "opacity-50"
          }`}
        >
          {projects.map((project, i) => (
            <Link
              href={`/projects/${project.slug}`}
              key={i}
              className="group"
              target="_blank"
            >
              <div
                className="relative w-[350px] aspect-video bg-neutral-800 rounded-lg text-white transition-transform duration-300 hover:scale-[1.02] group-hover:ring-2 group-hover:ring-white"
                onMouseEnter={() => {
                  if (tooltipTimeoutRef.current)
                    clearTimeout(tooltipTimeoutRef.current);
                  setHoveredIndex(i);
                }}
                onMouseLeave={() => {
                  tooltipTimeoutRef.current = setTimeout(() => {
                    setHoveredIndex(null);
                  }, 100);
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-2 rounded-xl">
                  <p className="font-semibold text-sm">{project.title}</p>
                  <p className="text-xs text-white/70">{project.type}</p>
                </div>

                <AnimatePresence>
                  {hoveredIndex === i &&
                    projects[i].tooltips.map((tooltip, j) => (
                      <motion.div
                        key={j}
                        className={`absolute z-20 px-4 py-2 text-xs rounded-xl bg-white text-black shadow-xl ${tooltipPositionClass[tooltip.position]}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {tooltip.text}
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </Link>
          ))}
        </div>

        <div
          ref={textRef}
          className="relative text-center leading-tight font-bold"
        >
          <div
            ref={badgeRef}
            className="absolute top-10 -right-[100px] bg-white text-black text-xs px-3 py-2 rounded-full shadow-md rotate-[12deg] opacity-0 scale-95"
          >
            💡 Hover the item
          </div>

          <p className="text-5xl md:text-7xl">
            {textLine1.split("").map((char, i) => (
              <span key={`line1-${i}`} className="inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
          <p className="text-4xl md:text-6xl text-white/80">
            {textLine2.split("").map((char, i) => (
              <span key={`line2-${i}`} className="inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        <div
          ref={bottomRef}
          className="flex gap-6 opacity-0 scale-[2.5] translate-y-[100px]"
        >
          {[...projects].reverse().map((project, i) => (
            <Link
              href={`/projects/${project.slug}`}
              key={i}
              className="group"
              target="_blank"
            >
              <div
                className="relative w-[350px] aspect-video bg-neutral-800 rounded-lg text-white transition-transform duration-300 hover:scale-[1.02] group-hover:ring-2 group-hover:ring-white"
                onMouseEnter={() => {
                  if (tooltipTimeoutRef.current)
                    clearTimeout(tooltipTimeoutRef.current);
                  setHoveredIndex(i + 100); // offset index bawah
                }}
                onMouseLeave={() => {
                  tooltipTimeoutRef.current = setTimeout(() => {
                    setHoveredIndex(null);
                  }, 100);
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-xl"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-2 rounded-xl">
                  <p className="font-semibold text-sm">{project.title}</p>
                  <p className="text-xs text-white/70">{project.type}</p>
                </div>

                <AnimatePresence>
                  {hoveredIndex === i + 100 &&
                    project.tooltips.map((tooltip, j) => (
                      <motion.div
                        key={j}
                        className={`absolute z-20 px-4 py-2 text-xs rounded-xl bg-white text-black shadow-xl ${tooltipPositionClass[tooltip.position]}`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {tooltip.text}
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
