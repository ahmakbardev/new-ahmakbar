"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Github, Linkedin, Instagram } from "lucide-react"; // dari lucide
import { BiEnvelope } from "react-icons/bi"; // fallback dari boxicons (email)
import { Tooltip } from "@/components/ui/tooltip";
import LanguageSwitcher from "./LangSwitcher";

const navItems = [
  { label: "Home", href: "/" },
  // { label: "Portfolios", href: "/docs" },
  // { label: "Achievement", href: "/achieve" },
  { label: "About", href: "/about" },
];

const socialLinks = [
  {
    icon: <Github size={20} />,
    href: "https://github.com/ahmakbardev",
    label: "GitHub",
  },
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/ahmad-akbar-m/",
    label: "LinkedIn",
  },
  {
    icon: <Instagram size={20} />,
    href: "https://www.instagram.com/ahm_akbar/",
    label: "Instagram",
  },
  {
    icon: <BiEnvelope size={20} />,
    href: "mailto:ahmakbar.dev@gmail.com",
    label: "Email",
  },
];

export default function NavbarDesktop() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <nav
        className={clsx(
          "hidden md:flex justify-between gap-4 transition-all duration-300 items-center w-full",
          isScrolled
            ? "bg-white/10 backdrop-blur-lg rounded-full max-w-6xl px-6 py-5 mt-3 mx-auto shadow-md"
            : "py-3",
        )}
      >
        <div className="flex-1">
          <Image
            src="/logo/a.webp"
            alt="Arrow Top Right"
            width={35}
            height={35}
            className=""
          />
        </div>
        <div className="flex-1 flex justify-center">
          {navItems.map((item) => {
            const currentPath = pathname.split("/").slice(2).join("/") || "";
            const itemPath = item.href.replace(/^\//, "");
            const isActive = currentPath === itemPath;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "px-5 py-2 rounded-full font-medium transition-colors duration-300",
                  isActive
                    ? "bg-white text-[#0052FF]"
                    : "text-white hover:bg-white/20 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="flex-1 flex justify-end gap-4">
          {socialLinks.map((social) => (
            <Tooltip key={social.href} content={social.label}>
              <Link
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#0052FF] transition-colors duration-300"
              >
                {social.icon}
              </Link>
            </Tooltip>
          ))}
        </div>
      </nav>
      <LanguageSwitcher isScrolled={isScrolled} />
    </div>
  );
}
