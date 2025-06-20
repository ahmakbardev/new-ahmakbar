"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VerticalScrollSection() {
  const scene2Ref = useRef<HTMLDivElement>(null);
  const leftVerticalRef = useRef<HTMLDivElement>(null);
  const rightVerticalRef = useRef<HTMLDivElement>(null);
  const leftItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const outerRef = useRef<HTMLElement | null>(
    document.querySelector("section"),
  );

  useEffect(() => {
    if (!scene2Ref.current) return;

    // pin and fade in scene
    gsap.fromTo(
      scene2Ref.current,
      { opacity: 0, y: 0 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: "top center-=300",
          end: "+=800",
          pin: true,
          toggleActions: "play reverse play reverse",
        },
      },
    );

    // background putih saat masuk scene 2
    if (outerRef.current) {
      gsap.to(outerRef.current, {
        backgroundColor: "#ffffff",
        color: "#000000",
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: "top center-=300",
          end: "bottom center",
          scrub: true,
        },
      });
    }

    // animate left & right container muncul
    gsap.fromTo(
      leftVerticalRef.current,
      { opacity: 0, y: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: "top center-=300",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    gsap.fromTo(
      rightVerticalRef.current,
      { opacity: 0, y: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: "top center-=300",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    // item scrolling
    leftItemsRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: -30 },
        {
          y: 1300,
          scrollTrigger: {
            trigger: scene2Ref.current,
            start: "top center-=300",
            end: "bottom+=500 top",
            scrub: true,
          },
        },
      );
    });

    rightItemsRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 30 },
        {
          y: -1300,
          scrollTrigger: {
            trigger: scene2Ref.current,
            start: "top center-=300",
            end: "bottom+=500 top",
            scrub: true,
          },
        },
      );
    });
  }, []);

  return (
    <div
      ref={scene2Ref}
      className="relative h-[80vh] flex flex-col top-[10%] transition-all ease-in-out z-0 justify-start items-center text-center opacity-100"
    >
      <div>
        <p className="text-6xl md:text-7xl font-bold leading-tight text-black">
          Navigate client
        </p>
        <p className="text-5xl md:text-6xl font-bold text-black/80 mt-3">
          handoffs like a pro.
        </p>
      </div>

      <div
        ref={leftVerticalRef}
        className="absolute left-64 -top-[1700px] flex flex-col gap-4"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={`left-${i}`}
            ref={(el) => {
              if (el) leftItemsRef.current[i] = el;
            }}
            className="w-[220px] aspect-[9/16] bg-neutral-800 rounded-xl flex items-center justify-center text-sm font-bold"
          >
            Left {i + 1}
          </div>
        ))}
      </div>

      <div
        ref={rightVerticalRef}
        className="absolute right-64 -top-[100px] flex flex-col gap-4"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={`right-${i}`}
            ref={(el) => {
              if (el) rightItemsRef.current[i] = el;
            }}
            className="w-[220px] aspect-[9/16] bg-neutral-800 rounded-xl flex items-center justify-center text-sm font-bold"
          >
            Right {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
