"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { label: "Home", href: "/" },
  // { label: "Docs", href: "/docs" },
  // { label: "Community", href: "/community" },
  // { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={clsx(
          "fixed md:hidden top-4 right-4 z-[60] flex items-center justify-center rounded-full p-2 transition-all duration-300",
          open
            ? "bg-white text-[#003FCC] rotate-90"
            : "bg-[#003FCC] text-white",
        )}
      >
        {open ? (
          <X className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={clsx(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          open ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      />

      {/* Drawer Menu */}
      <div
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-[75%] max-w-xs bg-white shadow-xl transform transition-transform duration-500 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "text-lg font-medium px-4 py-2 rounded-md transition-all duration-300",
                pathname === item.href
                  ? "bg-[#003FCC] text-white shadow-md"
                  : "text-[#003FCC] hover:bg-[#E5F0FF] hover:pl-6",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
