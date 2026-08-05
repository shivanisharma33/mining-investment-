"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function WhyAttend() {
  const { t } = useLanguage();
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12; // -12deg to +12deg
    const rotateY = ((x - centerX) / centerX) * 14;  // -14deg to +14deg
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const steps = [
    {
      number: "01",
      title: t("why-01-title", "MEET INVESTORS"),
      description: t("why-01-desc", "Connect with global investors actively seeking high-potential mining opportunities."),
    },
    {
      number: "02",
      title: t("why-02-title", "DISCOVER OPPORTUNITIES"),
      description: t("why-02-desc", "Explore high-potential mining projects from around the world."),
    },
    {
      number: "03",
      title: t("why-03-title", "BUILD PARTNERSHIPS"),
      description: t("why-03-desc", "Create strategic partnerships that drive long-term growth."),
    },
    {
      number: "04",
      title: t("why-04-title", "RAISE CAPITAL"),
      description: t("why-04-desc", "Secure the capital you need to advance your projects."),
    },
  ];

  return (
    <section className="relative bg-white dark:bg-[#090d16] py-16 sm:py-20 md:py-24 overflow-hidden transition-colors duration-300">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Single High-Impact Image with Interactive 3D Perspective Tilt */}
          <div className="lg:col-span-6 relative py-6 sm:py-10 px-2 sm:px-6 flex justify-center [perspective:1200px]">
            {/* Ambient Background Red & Amber Glow Orbs */}
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-gradient-to-tr from-[#C6112F]/25 via-red-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-bl from-[#C6112F]/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

            {/* Interactive 3D Parallax Stage */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="relative z-10 w-full max-w-[480px] my-4 transition-transform duration-200 ease-out cursor-pointer group/stage py-4"
            >
              {/* 3D Main Hero Photo Card (translateZ: 20px) */}
              <div
                style={{ transform: "translateZ(20px)" }}
                className="relative rounded-[26px] overflow-hidden border-[3px] border-[#C6112F] shadow-[0_25px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_rgba(198,17,47,0.35)] bg-neutral-900 group/img aspect-[4/3] transition-all duration-500"
              >
                <img
                  src="/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-2.jpg"
                  alt="Mining Investment Event Main Conference"
                  className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />

                {/* Dark Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 transition-opacity duration-300" />

                {/* Live Ribbon Badge on Top-Right */}
                <div className="absolute top-4 right-4 bg-[#C6112F] text-white text-[10px] sm:text-[11px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>TIER I FORUM</span>
                </div>

                {/* Caption at Bottom of Main Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 mb-1 text-[#ff4d6d] font-extrabold text-[11px] uppercase tracking-wider">
                    <i className="fi fi-rr-marker text-xs" /> QUÉBEC CITY • CANADA
                  </div>
                  <h4 className="text-white font-extrabold text-xs sm:text-sm leading-snug drop-shadow-md">
                    Canada's Premier Mining Investment Conference
                  </h4>
                </div>
              </div>

              {/* 3D Layer 2: Glassmorphic Floating Stat Badge 1 (Top-Left Overlap, translateZ: 60px) */}
              <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute -top-4 -left-2 sm:-left-6 z-30 bg-white/95 dark:bg-[#0e1626]/95 backdrop-blur-md border border-neutral-200/80 dark:border-[#C6112F]/50 px-3.5 sm:px-4 py-2 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-transform duration-300 group-hover/stage:scale-105"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C6112F] to-[#8a091e] text-white flex items-center justify-center text-sm shadow-md shrink-0">
                  <i className="fi fi-rr-handshake leading-none" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 dark:text-slate-400 font-extrabold">GLOBAL NETWORK</span>
                  <span className="text-xs font-black text-neutral-900 dark:text-white">500+ Investors</span>
                </div>
              </div>

              {/* 3D Layer 2: Glassmorphic Floating Stat Badge 2 (Bottom-Right Overlap, translateZ: 60px) */}
              <div
                style={{ transform: "translateZ(60px)" }}
                className="absolute -bottom-4 -right-2 sm:-right-6 z-30 bg-white/95 dark:bg-[#0e1626]/95 backdrop-blur-md border border-neutral-200/80 dark:border-[#C6112F]/50 px-3.5 sm:px-4 py-2 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-transform duration-300 group-hover/stage:scale-105"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-sm shadow-md shrink-0">
                  <i className="fi fi-rr-award leading-none" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-neutral-500 dark:text-slate-400 font-extrabold">CONFIRMED</span>
                  <span className="text-xs font-black text-neutral-900 dark:text-white">100% Focused</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Text and Numbered Feature Steps */}
          <div className="lg:col-span-6 flex flex-col items-start text-left lg:pl-4 group">
            <span className="heading-badge text-xs sm:text-sm font-extrabold uppercase mb-2 block transition-all duration-300 group-hover:tracking-[0.32em]">
              {t("why-tag", "WHY ATTEND")}
            </span>
            <AnimatedHeading
              text={t("why-title", "Your Pathway To Investment Success")}
              className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3"
            />
            <div className="w-16 group-hover:w-24 h-[3.5px] heading-underline rounded-full mb-6" />

            {/* 4 Steps Stack with Equal Cards and Equal Gap Spacing */}
            <div className="space-y-4 sm:space-y-4 w-full max-w-[500px]">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0e1626] border border-neutral-200/90 dark:border-[#233049] hover:border-[#C6112F] shadow-2xs hover:shadow-[0_12px_28px_rgba(198,17,47,0.14)] dark:hover:shadow-[0_12px_28px_rgba(198,17,47,0.25)] hover:-translate-y-1 transition-all duration-300 card-shimmer group cursor-pointer"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#C6112F] text-white flex items-center justify-center text-xs sm:text-sm font-extrabold shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#a80d26] group-hover:shadow-[0_0_15px_rgba(198,17,47,0.5)] mt-0.5">
                    {step.number}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[#C6112F] dark:text-[#ff4d6d] font-extrabold text-xs sm:text-[13px] tracking-wider uppercase mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
