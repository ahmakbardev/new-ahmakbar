"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { MonitorCog, LayoutDashboard, ClipboardList } from "lucide-react";
import {
  SiCodeigniter,
  SiLaravel,
  SiNextdotjs,
  SiTailwindcss,
  SiReact,
} from "react-icons/si";
import { useTranslations } from "next-intl";

export default function CreativeIntroSection() {
  const t = useTranslations("me");
  const sectionRef = useRef<HTMLDivElement>(null); // 👈 ganti dari imageRef
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const [isHoverAkbar, setIsHoverAkbar] = useState(false);
  const [isHoverEngineer, setIsHoverEngineer] = useState(false);

  const boxRefAkbar = useRef<HTMLHeadingElement>(null);
  const boxRefEngineer = useRef<HTMLHeadingElement>(null);

  const mouseXAkbar = useMotionValue(0);
  const mouseYAkbar = useMotionValue(0);
  const springXAkbar = useSpring(mouseXAkbar, { stiffness: 300, damping: 20 });
  const springYAkbar = useSpring(mouseYAkbar, { stiffness: 300, damping: 20 });
  const [isHoverEvolving, setIsHoverEvolving] = useState(false);
  const boxRefEvolving = useRef<HTMLHeadingElement>(null);
  //   const roles = [
  //     {
  //       icon: <MonitorCog className="text-blue-500" size={24} />,
  //       style: "top-[20%] left-[10%]",
  //     },
  //     {
  //       icon: <LayoutDashboard className="text-blue-500" size={24} />,
  //       style: "top-[40%] right-[12%]",
  //     },
  //     {
  //       icon: <ClipboardList className="text-blue-500" size={24} />,
  //       style: "bottom-[15%] left-[30%]",
  //     },
  //   ];

  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const techStack = [
    {
      icon: <SiCodeigniter className="text-[#ee4323]" size={50} />,
      style: "top-[10%] -right-0",
    },
    {
      icon: <SiLaravel className="text-[#f9322c]" size={50} />,
      style: "top-[30%] left-[0]",
    },
    {
      icon: <SiNextdotjs size={50} className="text-black" />,
      style: "bottom-[25%] right-[5%]",
    },
    {
      icon: <SiTailwindcss className="text-[#38bdf8]" size={50} />,
      style: "bottom-[10%] left-[5%]",
    },
    {
      icon: <SiReact className="text-[#61dbfb]" size={50} />,
      style: "bottom-[-5%] right-[25%]",
    },
  ];

  const mouseXEvolving = useMotionValue(0);
  const mouseYEvolving = useMotionValue(0);
  const springXEvolving = useSpring(mouseXEvolving, {
    stiffness: 300,
    damping: 20,
  });
  const springYEvolving = useSpring(mouseYEvolving, {
    stiffness: 300,
    damping: 20,
  });

  const mouseXEngineer = useMotionValue(0);
  const mouseYEngineer = useMotionValue(0);
  const springXEngineer = useSpring(mouseXEngineer, {
    stiffness: 300,
    damping: 20,
  });
  const springYEngineer = useSpring(mouseYEngineer, {
    stiffness: 300,
    damping: 20,
  });

  const handleMouseMoveAkbar = (e: React.MouseEvent) => {
    const rect = boxRefAkbar.current?.getBoundingClientRect();
    if (!rect) return;
    mouseXAkbar.set(e.clientX - rect.left);
    mouseYAkbar.set(e.clientY - rect.top);
  };

  const handleMouseMoveEngineer = (e: React.MouseEvent) => {
    const rect = boxRefEngineer.current?.getBoundingClientRect();
    if (!rect) return;
    mouseXEngineer.set(e.clientX - rect.left);
    mouseYEngineer.set(e.clientY - rect.top);
  };

  const handleMouseMoveEvolving = (e: React.MouseEvent) => {
    const rect = boxRefEvolving.current?.getBoundingClientRect();
    if (!rect) return;
    mouseXEvolving.set(e.clientX - rect.left);
    mouseYEvolving.set(e.clientY - rect.top);
  };

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMoveImage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateMax = 25;

    rotateY.set(((x - centerX) / centerX) * rotateMax);
    rotateX.set(-((y - centerY) / centerY) * rotateMax);
  };

  const handleMouseLeaveImage = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const h1s = section.querySelectorAll("h1");

    // Set initial state
    gsap.set(h1s, { opacity: 0, y: 60 });
    gsap.set(iconRefs.current, { opacity: 0, scale: 0.5, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "+=100%",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    // Teks reveal
    tl.to(h1s, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power4.out",
    });

    // Icon reveal (sequential)
    iconRefs.current.forEach((ref) => {
      if (ref) {
        tl.to(
          ref,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          `+=0.3`, // delay antar item
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);
  function setIconRef(el: HTMLDivElement | null, index: number) {
    iconRefs.current[index] = el;
  }

  return (
    <section className="w-full pb-[400px] bg-black text-white flex items-center justify-center px-8 md:px-16">
      <div
        ref={sectionRef}
        className="w-full max-w-7xl flex flex-col-reverse md:flex-row items-center justify-between gap-10 relative"
      >
        {/* Teks besar di kiri */}
        <div className="text-left md:w-1/2 space-y-20">
          {/* AKBAR */}
          <div
            className="relative inline-block"
            ref={boxRefAkbar}
            onMouseMove={(e) => {
              handleMouseMoveAkbar(e);
              setIsHoverAkbar(true);
            }}
            onMouseLeave={() => setIsHoverAkbar(false)}
          >
            <h1
              className="text-5xl font-montserrat relative cursor-default tracking-wider md:text-8xl font-extrabold leading-tight 
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white 
              after:transition-all after:duration-300 hover:after:w-full"
            >
              AKBAR.
            </h1>

            {isHoverAkbar && (
              <motion.div
                className="absolute top-0 left-0 pointer-events-none z-10"
                style={{
                  x: springXAkbar,
                  y: springYAkbar,
                }}
              >
                <motion.div
                  className="relative w-full max-w-xl min-w-[450px] px-6 py-5 bg-white/10 border border-white/30 rounded-2xl backdrop-blur-md text-white shadow-xl text-left overflow-visible"
                  initial={{ scale: 0, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Decorative Emojis */}
                  <motion.div
                    className="absolute -top-3 right-3 text-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    💻
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-3 right-20 text-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    ☕
                  </motion.div>

                  {/* Main Content */}
                  <p className="text-2xl font-bold mb-4 flex items-center gap-2">
                    👋 Meet{" "}
                    <span className="text-white/90 font-extrabold">Akbar</span>
                    <span className="text-[10px] bg-yellow-400 text-black px-2 py-[2px] rounded-full uppercase font-semibold tracking-wide">
                      Creative
                    </span>
                  </p>

                  <div className="space-y-2 text-base leading-relaxed">
                    <p>
                      <span className="inline-block bg-green-600/80 px-2 py-1 rounded-md font-semibold text-sm">
                        {t("akbar.1.label")}
                      </span>{" "}
                      {t("akbar.1.text")}
                    </p>
                    <p>
                      <span className="inline-block bg-pink-600/80 px-2 py-1 rounded-md font-semibold text-sm">
                        {t("akbar.2.label")}
                      </span>{" "}
                      {t("akbar.2.text")}
                    </p>
                    <p>
                      <span className="inline-block bg-blue-600/80 px-2 py-1 rounded-md font-semibold text-sm">
                        {t("akbar.3.label")}
                      </span>{" "}
                      {t("akbar.3.text")}
                    </p>
                    <p className="text-white/60 italic pt-1">
                      {t("akbar.4.text")}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* ENGINEER */}
          <div
            className="relative inline-block"
            ref={boxRefEngineer}
            onMouseMove={(e) => {
              handleMouseMoveEngineer(e);
              setIsHoverEngineer(true);
            }}
            onMouseLeave={() => setIsHoverEngineer(false)}
          >
            <h1
              className="text-5xl font-montserrat relative cursor-default tracking-wider md:text-8xl font-extrabold leading-tight 
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white 
    after:transition-all after:duration-300 hover:after:w-full"
            >
              ENGINEER.
            </h1>

            {isHoverEngineer && (
              <motion.div
                className="absolute top-0 left-0 pointer-events-none z-10"
                style={{
                  x: springXEngineer,
                  y: springYEngineer,
                }}
              >
                <motion.div
                  className="relative w-full max-w-xl min-w-[450px] px-6 py-5 bg-white/10 border border-white/30 rounded-2xl backdrop-blur-md text-white shadow-xl text-left overflow-visible"
                  initial={{ scale: 0, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Icon Decorative */}
                  <motion.div
                    className="absolute -top-3 right-3 text-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    🛠️
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-3 right-20 text-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    🔧
                  </motion.div>

                  {/* Main Content */}
                  <p className="text-2xl font-bold mb-4 flex items-center gap-2">
                    💡 The Engineer Side
                    <span className="text-[10px] bg-cyan-400 text-black px-2 py-[2px] rounded-full uppercase font-semibold tracking-wide">
                      Systems Thinker
                    </span>
                  </p>

                  <div className="space-y-2 text-base leading-relaxed">
                    <p>
                      <span className="inline-block bg-blue-600/80 px-2 py-1 rounded-md font-semibold text-sm">
                        {t("engineer.1.label")}
                      </span>{" "}
                      {t("engineer.1.text")}
                    </p>
                    <p>
                      <span className="inline-block bg-purple-600/80 px-2 py-1 rounded-md font-semibold text-sm">
                        {t("engineer.2.label")}
                      </span>{" "}
                      {t("engineer.2.text")}
                    </p>
                    <p>
                      <span className="inline-block bg-green-600/80 px-2 py-1 rounded-md font-semibold text-sm">
                        {t("engineer.3.label")}
                      </span>{" "}
                      {t("engineer.3.text")}
                    </p>
                    <p className="text-white/60 italic pt-1">
                      {t("engineer.4.text")}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          <div
            className="relative inline-block"
            ref={boxRefEvolving}
            onMouseMove={(e) => {
              handleMouseMoveEvolving(e);
              setIsHoverEvolving(true);
            }}
            onMouseLeave={() => setIsHoverEvolving(false)}
          >
            <h1
              className="text-5xl font-montserrat relative cursor-default tracking-wider md:text-8xl font-extrabold leading-tight 
    after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-white 
    after:transition-all after:duration-300 hover:after:w-full"
            >
              EVOLVING.
            </h1>

            {isHoverEvolving && (
              <motion.div
                className="absolute top-0 left-0 pointer-events-none z-10"
                style={{
                  x: springXEvolving,
                  y: springYEvolving,
                }}
              >
                <motion.div
                  className="relative w-full max-w-xl min-w-[450px] px-6 py-5 bg-white/10 border border-white/30 rounded-2xl backdrop-blur-md text-white shadow-xl text-left overflow-visible"
                  initial={{ scale: 0, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Decorative Icons */}
                  <motion.div
                    className="absolute -top-3 right-3 text-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    🌱
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-3 right-20 text-3xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    ✨
                  </motion.div>

                  {/* Main Content */}
                  <p className="text-2xl font-bold mb-4 flex items-center gap-2">
                    🔄 Always Evolving
                    <span className="text-[10px] bg-orange-400 text-black px-2 py-[2px] rounded-full uppercase font-semibold tracking-wide">
                      Growth Mindset
                    </span>
                  </p>

                  <div className="space-y-2 text-base leading-relaxed">
                    <p>
                      <span className="inline-block bg-indigo-600/80 px-2 py-1 rounded-md font-semibold text-sm">
                        {t("evolving.1.label")}
                      </span>{" "}
                      {t("evolving.1.text")}
                    </p>
                    <p>
                      <span className="inline-block bg-rose-600/80 px-2 py-1 rounded-md font-semibold text-sm">
                        {t("evolving.2.label")}
                      </span>{" "}
                      {t("evolving.2.text")}
                    </p>
                    <p className="text-white/60 italic pt-1">
                      {t("evolving.3.text")}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Gambar di kanan */}
        <motion.div
          className="md:w-1/2 flex justify-center relative -right-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onMouseMove={handleMouseMoveImage}
          onMouseLeave={handleMouseLeaveImage}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 pointer-events-none z-10">
            {techStack.map((t, i) => (
              <div
                key={`tech-${i}`}
                ref={(el) => setIconRef(el, i)}
                className={`absolute ${t.style} p-4 rounded-2xl bg-white opacity-0 scale-50`}
              >
                {t.icon}
              </div>
            ))}
          </div>

          <Image
            src="/assets/images/photos/me.JPG"
            alt="Hero Visual"
            width={600}
            height={800}
            className="object-contain max-h-[80vh] will-change-transform"
          />
        </motion.div>
      </div>
    </section>
  );
}
