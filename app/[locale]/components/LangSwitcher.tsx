"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

const languages = [
  { label: "English", code: "en", flag: "/flags/ENG.png" },
  { label: "Bahasa Indonesia", code: "id", flag: "/flags/IDN.webp" },
];

export default function LanguageSwitcher({
  isScrolled,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  useEffect(() => {
    const currentLocale = window.location.pathname.split("/")[1];
    const lang = languages.find((l) => l.code === currentLocale);
    if (lang) setSelectedLang(lang);
  }, [pathname]);

  const handleSwitchLang = (langCode: string) => {
    if (langCode !== selectedLang.code) {
      const scrollY = window.scrollY;

      router.push(pathname, { locale: langCode, scroll: false });

      // Restore scroll setelah delay kecil untuk memastikan konten sudah render
      setTimeout(() => {
        window.scrollTo({ top: scrollY });
      }, 0);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={clsx(
            "hidden md:flex transition-all text-white px-4 font-bold cursor-pointer  duration-300 items-center justify-center gap-2",
            isScrolled
              ? "bg-white/10 backdrop-blur-lg rounded-full py-5 mt-3 mx-auto shadow-md"
              : "py-3",
          )}
        >
          <Image
            src={selectedLang.flag}
            alt={selectedLang.label}
            width={20}
            height={20}
            className="rounded-sm"
          />
          {selectedLang.code.toUpperCase()}
          <ChevronDown size={16} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="z-50 min-w-[180px] rounded-xl border border-white/20 bg-white/90 backdrop-blur-md shadow-xl p-2 text-sm"
        >
          {languages.map((lang) => (
            <DropdownMenu.Item
              key={lang.code}
              onClick={() => handleSwitchLang(lang.code)}
              className="flex items-center gap-2 w-full rounded-lg px-3 py-2 transition-colors hover:bg-[#f3f4f6] text-black cursor-pointer"
            >
              <Image
                src={lang.flag}
                alt={lang.label}
                width={20}
                height={20}
                className="rounded-full border border-gray-300"
              />
              {lang.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
