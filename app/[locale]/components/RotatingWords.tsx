"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Daftar role
const roles = [
  ["Web", "Developer"],
  ["Frontend", "Engineer"],
  ["Project", "Manager"],
];

// Karakter random untuk scramble
const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Fungsi scramble per karakter
function scrambleWord(target: string, step: number): string {
  return target
    .split("")
    .map((char, i) =>
      i < step
        ? char
        : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
    )
    .join("");
}

// Hook untuk scrambling
function useScramble(
  target: string,
  intervalTime = 40,
  totalSteps = 10,
  trigger?: string,
) {
  const [displayed, setDisplayed] = useState(target);

  useEffect(() => {
    let step = 0;

    const interval = setInterval(() => {
      setDisplayed(scrambleWord(target, step));
      step += 1;
    }, intervalTime);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setDisplayed(target);
    }, intervalTime * totalSteps);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [trigger, target, intervalTime, totalSteps]);

  return displayed;
}

export default function RotatingWords() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [flashing, setFlashing] = useState(false);
  const [scrambleKey, setScrambleKey] = useState(`${Date.now()}`);

  // Ganti role tiap 4.5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setFlashing(true); // 🔥 Mulai flash

      setTimeout(() => {
        setFlashing(false);
        setVisible(false);

        setTimeout(() => {
          setIndex((prev) => (prev + 1) % roles.length);
          setScrambleKey(`${Date.now()}`); // trigger scramble
          setVisible(true);
        }, 300); // delay untuk animasi keluar
      }, 200); // lama efek flash
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const [line1, line2] = roles[index];
  const scrambled1 = useScramble(line1, 75, 50, scrambleKey + "-1");
  const scrambled2 = useScramble(line2, 75, 50, scrambleKey + "-2");

  return (
    <div className="h-[90px] md:h-[150px] overflow-hidden relative">
      <div
        className={`transition-colors duration-200 ease-in-out w-full h-full px-4 py-2
        font-bold font-montserrat text-[40px] md:text-[60px] leading-tight
        ${flashing ? "bg-black text-white" : "bg-transparent text-black"}`}
      >
        {/* Line 1 */}
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={`line1-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="absolute top-0 w-full"
            >
              {scrambled1}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-[10px]" />

        {/* Line 2 */}
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={`line2-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute top-[35px] md:top-[60px] w-full"
            >
              {scrambled2}.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
