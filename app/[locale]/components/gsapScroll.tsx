"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollGalleryBasic() {
  const scene1Ref = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const leftVerticalRef = useRef<HTMLDivElement>(null);
  const rightVerticalRef = useRef<HTMLDivElement>(null);
  const leftItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scene2TextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !scene1Ref.current ||
      !topRef.current ||
      !bottomRef.current ||
      !textRef.current ||
      !scene2Ref.current
    )
      return;

    // ✨ Scene 1 scroll + pin
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scene1Ref.current,
        start: "top top+=300",
        end: "+=1000",
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    tl.fromTo(
      topRef.current,
      { opacity: 0, scale: 2.5, y: -100 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" },
    );

    tl.fromTo(
      bottomRef.current,
      { opacity: 0, scale: 2.5, y: 100 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "<",
    );

    tl.to(topRef.current, { xPercent: -20, ease: "power1.inOut" });
    tl.to(bottomRef.current, { xPercent: 20, ease: "power1.inOut" }, "<");

    gsap.to(outerRef.current, {
      backgroundColor: "#000000",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top top+=200",
        end: "bottom bottom-=300",
        scrub: true,
        markers: false,
        toggleActions: "play reverse play reverse",
      },
    });

    // ✨ Animate text span
    const spans = textRef.current.querySelectorAll("span");
    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top top+=200",
      toggleActions: "play reverse play reverse",
      onEnter: () => {
        gsap.fromTo(
          spans,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, stagger: 0.03, duration: 0.3 },
        );
      },
      onLeaveBack: () => {
        gsap.to(spans, {
          opacity: 0,
          scale: 0.98,
          stagger: -0.03,
          duration: 0.3,
        });
      },
    });

    gsap.to(outerRef.current, {
      backgroundColor: "#ffffff",
      color: "#000000",
      scrollTrigger: {
        trigger: scene2Ref.current,
        start: "top center-=300",
        end: "bottom center",
        scrub: true,
        markers: false,
      },
    });

    // ✨ Scene 2 scroll + pin
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
          markers: true,
          toggleActions: "play reverse play reverse", // snap ke state
        },
      },
    );

    // ✨ Left vertical scroll - dari atas ke bawah
    // ✨ Muncul kiri dari atas
    gsap.fromTo(
      leftVerticalRef.current,
      { opacity: 0, y: -0 },
      {
        opacity: 1,
        y: 0,
        ease: "cubic-bezier(0.65, 0, 0.35, 1)",
        duration: 0.8,
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: "top center-=300",
          toggleActions: "play reverse play reverse",
        },
      },
    );

    // ✨ Muncul kanan dari bawah
    gsap.fromTo(
      rightVerticalRef.current,
      { opacity: 0, y: 0 },
      {
        opacity: 1,
        y: 0,
        ease: "cubic-bezier(0.65, 0, 0.35, 1)",
        duration: 0.8,
        scrollTrigger: {
          trigger: scene2Ref.current,
          start: "top center-=300",
          toggleActions: "play reverse play reverse",
        },
      },
    );

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
            markers: true,
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
            markers: true,
            end: "bottom+=500 top",
            scrub: true,
          },
        },
      );
    });
  }, []);

  const textLine1 = "All about";
  const textLine2 = "My Portfolios";

  return (
    <section
      ref={outerRef}
      className="bg-[#0052FF] text-white transition-all z-0 ease-in-out duration-300 overflow-hidden"
    >
      {/* Scene 1 */}
      <div
        ref={scene1Ref}
        className="flex flex-col items-center gap-10 -top-[120px] py-[0vh]"
      >
        <div ref={topRef} className="flex gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-[350px] aspect-video bg-neutral-800 rounded-lg flex items-center justify-center text-xl font-bold"
            >
              Top {i + 1}
            </div>
          ))}
        </div>

        <div ref={textRef} className="text-center leading-tight font-bold">
          <p className="text-6xl md:text-7xl">
            {textLine1.split("").map((char, i) => (
              <span key={`line1-${i}`} className="inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
          <p className="text-5xl md:text-6xl text-white/80">
            {textLine2.split("").map((char, i) => (
              <span key={`line2-${i}`} className="inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        <div ref={bottomRef} className="flex gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-[350px] aspect-video bg-neutral-800 rounded-lg flex items-center justify-center text-xl font-bold"
            >
              Bot {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Scene 2 */}
      <div
        ref={scene2Ref}
        className="relative h-[80vh] flex flex-col top-[10%] transition-all ease-in-out z-0 justify-start items-center text-center opacity-100"
      >
        <div ref={scene2TextRef}>
          <p className="text-6xl md:text-7xl font-bold leading-tight text-black">
            Navigate client
          </p>
          <p className="text-5xl md:text-6xl font-bold text-black/80 mt-3">
            handoffs like a pro.
          </p>
        </div>

        {/* LEFT */}
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

        {/* RIGHT */}
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
    </section>
  );
}
