"use client";

import { useTranslations } from "next-intl";
import HorizontalScrollGallery from "./HorizontalScrollGallery";
import RotatingWords from "./RotatingWords";

export default function Showcase() {
  const t = useTranslations("showcase");

  return (
    <section className="bg-white py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative w-full md:w-[25rem]">
            <RotatingWords />
          </div>
          <div className="flex-1">
            <p className="text-base md:text-lg text-black/80 leading-relaxed">
              {t("desc")}
            </p>
          </div>
        </div>

        <HorizontalScrollGallery />
      </div>
    </section>
  );
}
