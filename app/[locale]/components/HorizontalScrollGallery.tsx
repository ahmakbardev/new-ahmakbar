"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { Eye } from "lucide-react";
import Link from "next/link";

interface Project {
  slug: string;
  title: string;
  type: string;
  desc: string;
  image: string;
}

export default function HorizontalScrollGallery() {
  const t = useTranslations("projects");

  // Jumlah project — sesuaikan dengan jumlah data yang kamu punya
  const projectCount = 3;

  const projects: Project[] = Array.from({ length: projectCount })
    .map((_, i) => {
      try {
        return {
          slug: t(`${i}.slug`),
          title: t(`${i}.title`),
          type: t(`${i}.type`),
          desc: t(`${i}.desc`),
          image: t(`${i}.image`),
        };
      } catch {
        console.warn(`Project index ${i} translation not found.`);
        return null;
      }
    })
    .filter(Boolean) as Project[];

  const allProjects = [...projects, ...projects]; // Infinite scroll effect

  const containerRef = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const speed = 0.5;
  const isHovering = useRef(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useAnimationFrame(() => {
    if (!containerRef.current) return;
    const totalWidth = containerRef.current.scrollWidth / 2;
    if (!isHovering.current) {
      const current = x.get();
      const next = current - speed;
      x.set(next <= -totalWidth ? 0 : next);
    }
  });

  return (
    <section className="overflow-hidden py-16 px-6 bg-white">
      <motion.ul
        ref={containerRef}
        className="flex w-max gap-6"
        style={{ x }}
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
      >
        {allProjects.map((project, i) => {
          const actualIndex = i % projects.length;
          const isActive = activeCard === i;

          return (
            <motion.li
              key={`${actualIndex}-${i}`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="flex-shrink-0 relative group transition-transform duration-300"
              style={{
                zIndex: activeCard === i ? 50 : hoveredCard === i ? 30 : 20,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-[150px] h-[220px] md:w-[250px] md:h-[320px]">
                {/* Main Card */}
                <motion.div
                  className={`absolute inset-0 ${
                    isActive ? "z-30" : "z-20"
                  } rounded-2xl overflow-hidden border border-gray-200`}
                  animate={isActive ? { x: [-8, -25, 0] } : { x: 0 }}
                  transition={
                    isActive
                      ? {
                          duration: 0.8,
                          ease: "easeInOut",
                          times: [0, 0.2, 0.6, 1],
                        }
                      : {
                          duration: 0.5,
                          ease: "easeOut",
                        }
                  }
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 text-white bg-black/60 px-3 py-2 rounded-xl">
                    <p className="font-semibold text-sm">{project.title}</p>
                    <p className="text-xs text-white/70">{project.type}</p>
                  </div>
                </motion.div>

                {/* Back Card */}
                <Link href={`/projects/${project.slug}`} className="group/card">
                  <motion.div
                    initial={{
                      rotate: "0deg",
                      scale: 0.9,
                      x: 0,
                      zIndex: 15,
                    }}
                    animate={{
                      rotate: hoveredCard === i ? "10deg" : "0deg",
                      scale: hoveredCard === i ? 1 : 0.9,
                      x: activeCard === i ? [0, 30, 60] : 0,
                      zIndex: activeCard === i ? 40 : 15,
                    }}
                    transition={{
                      rotate: { duration: 0.001, ease: "easeInOut" },
                      x:
                        activeCard === i
                          ? {
                              duration: 0.9,
                              ease: "easeInOut",
                              times: [0, 0.3, 0.6, 1],
                            }
                          : { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    }}
                    onMouseEnter={() => {
                      setActiveCard(i);
                    }}
                    onMouseLeave={() => {
                      setActiveCard(null);
                    }}
                    className={`absolute bottom-0 left-0 w-full h-full origin-bottom-left
                    bg-[#0f172a] text-white rounded-2xl shadow-xl p-4 flex flex-col justify-between 
                    pointer-events-auto transition-all duration-500
                    ${hoveredCard === i ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                    ${activeCard === i ? "z-[40]" : "z-[15]"}`}
                  >
                    <div className="flex justify-end pointer-events-auto">
                      <div
                        className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full cursor-pointer shadow-md hover:bg-gray-200"
                        onMouseEnter={() => setActiveCard(i)}
                        onMouseLeave={() => setActiveCard(null)}
                      >
                        <Eye size={14} />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-black text-white px-2 py-1 rounded-md opacity-0 group-hover/card:opacity-100 transition">
                          Lihat detail proyek
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-white/80">{project.desc}</p>
                  </motion.div>
                </Link>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
