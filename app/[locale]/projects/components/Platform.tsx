"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Globe } from "lucide-react";

const platforms = [
  {
    icon: <Monitor size={20} />,
    title: "Desktop",
    desc: "Trade CFDs on a wide range of markets using powerful software.",
  },
  {
    icon: <Smartphone size={20} />,
    title: "Mobile Trading",
    desc: "Trade on iOS and Android with ease and flexibility.",
  },
  {
    icon: <Globe size={20} />,
    title: "Web Terminal",
    desc: "Browser-based platform with no software needed.",
  },
];

export default function PlatformSection() {
  return (
    <section className="relative py-20 bg-white max-w-7xl mx-auto overflow-hidden">
      <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left: Blue Background & Device Images */}
        <div className="relative w-full lg:w-[50%]">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-r-[5rem] w-full h-[400px] lg:h-[500px]" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute -top-0 left-4 md:left-10 lg:left-20 z-10"
          >
            <Image
              src="/projects/laptop/laptop-edu.webp" // ganti sesuai nama file kamu
              alt="Platform Devices"
              width={500}
              height={400}
              className="drop-shadow-2xl scale-[1.5]"
            />
          </motion.div>
        </div>

        {/* Right: Text + Items */}
        <div className="w-full lg:w-[50%]">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center lg:text-left">
            Choose your <span className="text-blue-500">platform</span>
          </h2>

          <div className="space-y-4">
            {platforms.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white border border-gray-200 shadow-sm rounded-xl p-4"
              >
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{p.title}</h4>
                  <p className="text-xs text-gray-600">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center lg:text-left">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full text-sm shadow">
              Open Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
