"use client";

import Image from "next/image";
import { SiCodeigniter, SiNextdotjs } from "react-icons/si";

export default function Hero() {
  return (
    <section className="relative group overflow-hidden bg-[#0052FF] text-white py-48 px-6 md:px-10">
      {/* Grid background */}
      <div className="absolute md:top-[600px] xl:top-[250px] left-[50%] opacity-20 -translate-x-[50%] rotate-[10deg] md:scale-[5] xl:scale-[2]">
        <Image
          src="/icons/bg-grid.png"
          alt="Hashtag"
          width={600}
          height={600}
        />
      </div>

      {/* Hashtag */}
      <div className="absolute xxs:left-[-5px] lxs:left-[-10px] md:left-[100px] lg:top-[80px] xl:top-[100px] xl:left-[180px] 2xl:top-[100px] 2xl:left-[380px] rotate-[10deg] scale-[2]">
        <Image
          src="/icons/Hashtags.svg"
          alt="Hashtag"
          width={90}
          height={90}
          className="xxs:scale-[0.4] lxs:scale-[0.6] xs:scale-[1]"
        />
      </div>

      {/* Judul */}
      <div className="relative z-10 max-w-7xl mx-auto text-center space-y-2">
        <h1 className="xxs:text-[4rem] lxs:text-[6rem] xs:text-[8rem] lsm:text-[9rem] md:text-[11rem] xl:text-[12rem] font-black font-outfit leading-none tracking-tight">
          <span className="block">IT&apos;S TIME</span>
          <span className="block">TO</span>
          <span className="block">CODE!</span>
        </h1>
      </div>

      {/* Arrow atas kanan */}
      <div className="absolute top-[100px] right-0 lxs:top-[120px] lxs:right-[20px] xs:top-[100px] xs:right-[50px] sm:top-[200px] sm:right-[50px] lg:top-[250px] lg:right-[100px] xl:right-[200px] 2xl:top-[250px] 2xl:right-[380px] z-10 group">
        <Image
          src="/icons/topRight.svg"
          alt="Arrow Top Right"
          width={90}
          height={90}
          className="rotate-[10deg] scale-[1] lxs:scale-[1.5] xs:scale-[2] md:scale-[2.5] transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:animate-pulse"
          unoptimized
        />
      </div>

      {/* Arrow bawah kiri */}
      <div className="absolute left-0 xs:bottom-[120px] xs:left-[-10px] sm:bottom-[200px] lg:left-[50px] lg:bottom-[350px] xl:left-[200px] 2xl:bottom-[220px] 2xl:left-[280px] z-10 group">
        <Image
          src="/icons/bottomLeft.svg"
          alt="Arrow Bottom Left"
          width={90}
          height={90}
          className="rotate-[10deg] scale-[1] lxs:scale-[1.5] xs:scale-[2] md:scale-[2.5] transition-transform duration-500 group-hover:-translate-x-6 group-hover:translate-y-6 group-hover:animate-pulse"
          unoptimized
        />
      </div>

      {/* Avatar right */}
      <div className="absolute hidden lg:flex lg:top-[350px] lg:right-[220px] xl:top-[400px] xl:right-[300px] 2xl:top-[350px] 2xl:right-[500px] z-10">
        <div className="rounded-2xl backdrop-blur-md bg-white/10 px-5 xl:px-10 -rotate-[25deg] hover:rotate-0 py-8 shadow-xl border border-white/20 transition-all ease-in-out flex flex-col items-center">
          {/* <Avatar.Root className="inline-flex h-[90px] w-[90px] select-none items-center justify-center overflow-hidden rounded-xl align-middle">
            <Avatar.Image
              className="h-full w-full object-cover"
              src="https://api.dicebear.com/7.x/micah/svg?seed=pearl"
              alt="pearl.eth"
            />
            <Avatar.Fallback className="text-white text-sm">P</Avatar.Fallback>
          </Avatar.Root> */}
          <SiCodeigniter className="text-[#ee4323] text-center text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px]" />
          <p className="text-center text-xs mt-2">
            <span className="text-lg font-semibold">Codeigniter</span>
            <br />
            Popular
          </p>
        </div>
      </div>

      {/* Avatar left */}
      <div className="absolute hidden lg:flex lg:left-[200px] lg:bottom-[350px] xl:left-[350px] 2xl:bottom-[250px] 2xl:left-[430px] z-10">
        <div className="rounded-2xl backdrop-blur-md bg-white/10 px-10 py-8 rotate-[15deg] hover:rotate-0 shadow-xl border border-white/20 transition-all ease-in-out flex flex-col items-center">
          {/* <Avatar.Root className="inline-flex h-[90px] w-[90px] select-none items-center justify-center overflow-hidden rounded-xl align-middle">
            <Avatar.Image
              className="h-full w-full object-cover"
              src="https://api.dicebear.com/7.x/micah/svg?seed=baseclub"
              alt="baseclub.eth"
            />
            <Avatar.Fallback className="text-white text-sm">B</Avatar.Fallback>
          </Avatar.Root> */}
          <div className="aspect-square rounded-full bg-white">
            <SiNextdotjs className="text-black text-center text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px]" />
          </div>
          <p className="text-center text-xs mt-2">
            <span className="text-lg font-semibold">NextJS</span>
            <br />
            Popular
          </p>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="absolute xxs:right-[10px] xl:right-[200px] xl:bottom-[150px] 2xl:right-[400px] z-10">
        <div className="w-[120px] h-[120px] bg-lime-400 rounded-full flex items-center justify-center rotate-[-15deg] text-xs font-bold text-black text-center shadow-xl">
          <span className="leading-tight">
            GUARANTEED <br /> DEVELOPER
          </span>
        </div>
      </div>
    </section>
  );
}
