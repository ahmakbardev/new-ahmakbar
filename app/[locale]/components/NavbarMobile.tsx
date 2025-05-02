"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import MobileLangSwitcher from "./MobileLangSwitcher";

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
          "fixed md:hidden top-4 right-4 z-[60] flex items-center justify-center w-14 h-14 rounded-xl shadow-lg transition-all duration-300",
          open
            ? "bg-white text-[#003FCC] rotate-90"
            : "bg-[#003FCC] text-white hover:bg-[#0052FF]",
        )}
      >
        {open ? (
          <X className="w-6 h-6 transition-transform duration-300" />
        ) : (
          <Menu className="w-6 h-6 transition-transform duration-300" />
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
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 z-50 h-[90vh] bg-white shadow-2xl flex items-center justify-center"
            >
              <div className="absolute top-12 w-full">
                <p className="text-center text-sm font-semibold text-[#999] tracking-widest uppercase mb-6">
                  Menu
                </p>
              </div>
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="flex flex-col gap-14 w-full px-6"
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "relative text-6xl font-black uppercase tracking-wide px-4 py-3 rounded-lg w-full text-center transition-all duration-300",
                        pathname === item.href
                          ? "bg-[#003FCC] text-white"
                          : "text-[#003FCC] hover:bg-[#E5F0FF]",
                      )}
                    >
                      {item.label}

                      {/* Sparkles di pojok kanan atas */}
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-2 -right-3"
                      >
                        <Sparkles className="w-5 h-5 text-[#003FCC]" />
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <MobileLangSwitcher />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
