"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function TradingHeroSection() {
  const { slug } = useParams();
  const t = useTranslations(`${slug as string}.heroSection`);
  const tRoot = useTranslations(slug as string); // Untuk ambil warna dari root

  const gradientFrom = tRoot("color.gradient.from") || "#3B82F6"; // fallback ke blue-500
  const gradientTo = tRoot("color.gradient.to") || "#2563EB"; // fallback ke blue-700

  return (
    <section className="relative w-full bg-white py-20 overflow-hidden">
      <div className="relative flex flex-col lg:flex-row gap-5 items-center justify-between">
        {/* Teks Kiri */}
        <div className="max-w-xl text-center lg:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {t("title.pre")} <br />
            <span style={{ color: gradientFrom }}>
              {t("title.highlight")}
            </span>{" "}
            {t("title.post")}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* Background Gradient + Mockup */}
        <div className="relative w-full lg:w-[60%] mt-16 lg:mt-0">
          <div
            className="rounded-l-[5rem] w-full h-[400px] lg:h-[500px]"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute -top-0 right-4 md:right-10 lg:right-20 z-10"
          >
            <Image
              src={t("image")}
              alt="Hero Visual"
              width={300}
              height={600}
              className="drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
