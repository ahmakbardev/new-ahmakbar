"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import Image from "next/image";

interface LanguageFlagToggleProps {
  isScrolled?: boolean;
  isHomeScrolled?: boolean;
  isProjectScrolled?: boolean;
}

export default function LangSwitcher({
  isScrolled,
  isHomeScrolled,
  isProjectScrolled,
}: LanguageFlagToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<"en" | "id">("en");

  useEffect(() => {
    const current = window.location.pathname.split("/")[1] as "en" | "id";
    setLang(current);
  }, [pathname]);

  const toggleLang = () => {
    const nextLang = lang === "en" ? "id" : "en";
    router.push(pathname, { locale: nextLang });

    // Reload the page to force scroll to top & re-initialize state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const getBgClass = () => {
    if (isProjectScrolled || isHomeScrolled) {
      return "bg-blue-600 w-20 h-12 px-1";
    }
    if (isScrolled) {
      return "bg-white/10 backdrop-blur-md w-20 h-12 px-1";
    }
    return "bg-transparent w-14 h-8 px-1";
  };

  const getDotSize = () => {
    if (isScrolled || isProjectScrolled || isHomeScrolled) {
      return "w-8 h-8";
    }
    return "w-6 h-6";
  };

  const getTranslate = () => {
    const isLarge = isScrolled || isProjectScrolled || isHomeScrolled;
    if (lang === "en") return "translate-x-0";
    return isLarge ? "translate-x-[32px]" : "translate-x-5";
  };

  return (
    <button
      onClick={toggleLang}
      className={`relative ${getBgClass()} rounded-full flex items-center transition-all duration-300`}
    >
      <div
        className={`${getDotSize()} ${getTranslate()} rounded-full shadow-md transform transition-transform duration-300`}
      >
        <Image
          src={lang === "en" ? "/flags/ENG.png" : "/flags/IDN.webp"}
          alt={lang}
          width={24}
          height={24}
          className="rounded-full w-full h-full object-cover"
        />
      </div>
    </button>
  );
}
