"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const languages = [
  { label: "English", code: "en", flag: "/flags/ENG.png" },
  { label: "Bahasa Indonesia", code: "id", flag: "/flags/IDN.webp" },
];

export default function MobileLangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const currentLocale = window.location.pathname.split("/")[1];
    const lang = languages.find((l) => l.code === currentLocale);
    if (lang) setSelectedLang(lang);
  }, [pathname]);

  const handleSwitchLang = (langCode: string) => {
    if (langCode !== selectedLang.code) {
      const scrollY = window.scrollY;
      router.push(pathname, { locale: langCode, scroll: false });
      setTimeout(() => {
        window.scrollTo({ top: scrollY });
      }, 0);
    }
  };

  return (
    <div className="md:hidden fixed bottom-6 right-6 z-[70] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mb-2 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden"
          >
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => {
                  handleSwitchLang(lang.code);
                  setOpen(false);
                }}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 text-xl cursor-pointer hover:bg-gray-100",
                  lang.code === selectedLang.code && "font-bold bg-gray-50",
                )}
              >
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  width={25}
                  height={25}
                  className="rounded-full border border-gray-300"
                />
                {lang.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 text-xl rounded-full bg-[#003FCC] text-white shadow-lg font-semibold"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={selectedLang.flag}
          alt={selectedLang.label}
          width={25}
          height={25}
          className="rounded-sm"
        />
        {selectedLang.code.toUpperCase()}
        <ChevronDown size={16} />
      </motion.button>
    </div>
  );
}
