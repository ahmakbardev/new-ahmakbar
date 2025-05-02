"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProjectImageSlider, { Slide } from "../components/ProjectImageSlider";
import WorkProcessTimeline from "../components/WorkProcessTimeline";
import TradingHeroSection from "../components/TradingHeroSection";
import KeyFeatures from "../components/KeyFeatures";
import PlatformSection from "../components/Platform";
import DemoButton from "../components/DemoButton";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const [isHovered, setIsHovered] = useState(false);
  //   const targetUrl = "https://staging.edutorium.in/"; // Ganti dengan URL yang kamu mau

  const { slug } = useParams();
  // Baru di bawah ini aman
  const t = useTranslations(slug as string);

  const slides = t.raw("slides") as Slide[];
  const targetUrl = t("targetUrl");

  return (
    <section className="px-10 py-10 mt-20 bg-white rounded-4xl max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* KIRI */}
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col justify-center py-5">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              {t("description")}
            </p>

            <DemoButton label={t("cta")} />
          </div>

          <ProjectImageSlider slides={slides} />
        </div>

        <Link href={targetUrl} target="_blank" rel="noopener noreferrer">
          <div
            className="relative hidden md:flex w-full h-64 md:h-full max-h-[710px] overflow-hidden rounded-2xl shadow-lg mb-10 md:mb-0 group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gambar pakai next/image */}
            <Image
              src={t("heroImage")}
              alt="Edutorium"
              fill
              className="object-cover w-full h-full"
              priority
            />

            {/* Layer gelap hover */}
            <motion.div
              initial={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              animate={{
                backgroundColor: isHovered
                  ? "rgba(0,0,0,0.3)"
                  : "rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 rounded-2xl z-10"
            />

            {/* Teks muncul saat hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
            >
              <span className="text-white text-lg font-semibold">
                {t("demoLabel")}
              </span>
            </motion.div>
          </div>
        </Link>
      </div>

      <div className="mb-10">
        <WorkProcessTimeline />
        <TradingHeroSection />
        <KeyFeatures />
        <PlatformSection />
      </div>
    </section>
  );
}
