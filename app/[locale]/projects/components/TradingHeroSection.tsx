"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TradingHeroSection() {
  return (
    <section className="relative w-full bg-white py-20 overflow-hidden">
      <div className="relative flex flex-col lg:flex-row gap-5 items-center justify-between">
        {/* Teks Kiri */}
        <div className="max-w-xl text-center lg:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Experience the <br />
            future of <span className="text-blue-500">online trading</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            When you trade with <strong className="text-black">____</strong>,
            you don’t just get a broker – you get support from a partner willing
            to help you achieve your trading ambitions. Exclusive trading
            groups, world-class technologies, educational courses and expert
            knowledge of experienced team, we offer everything necessary for
            growth and development as a trader.
          </p>
        </div>

        {/* Background Biru */}
        <div className="relative w-full lg:w-[60%] mt-16 lg:mt-0">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-l-[5rem] w-full h-[400px] lg:h-[500px]" />

          {/* Gambar HP Absolute */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute -top-0 right-4 md:right-10 lg:right-20 z-10"
          >
            <Image
              src="/projects/phone/dummy-2.webp"
              alt="Trading App"
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
