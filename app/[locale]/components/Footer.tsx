"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#0052FF] text-white py-5 px-6 z-[1] md:px-10">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3"></div>

      <div className="border-t border-white/20 pt-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} ahmakbar. {t("copyright")}
      </div>
    </footer>
  );
}
