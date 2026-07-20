"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyAttend() {
  const { t } = useLanguage();

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
    <section className="relative bg-white py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stacked Images with Red Perimeter Borders & Hover Zoom */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-start pl-4 sm:pl-8 py-6">
            {/* Red Accent Frame Box Behind Bottom Left */}
            <div className="absolute left-0 sm:left-2 bottom-0 w-36 sm:w-44 h-36 sm:h-44 border-[2px] border-[#C6112F] rounded-2xl z-0 pointer-events-none opacity-80" />

            {/* Main Handshake Image Card */}
            <div className="relative z-10 rounded-2xl overflow-hidden border-[3px] border-[#C6112F] shadow-[0_15px_35px_rgba(0,0,0,0.12)] w-full max-w-[480px] aspect-[4/3] bg-neutral-100 group">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80"
                alt="Business agreement handshake"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Overlapping Small Clock Image Card */}
            <div className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-[42%] sm:w-[46%] rounded-xl overflow-hidden border-[3px] border-[#C6112F] shadow-[0_15px_30px_rgba(0,0,0,0.2)] aspect-[4/3] bg-white group hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80"
                alt="Desk clock and analytics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Text and Numbered Feature Steps */}
          <div className="lg:col-span-6 flex flex-col items-start text-left lg:pl-4">
            <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("why-tag", "WHY ATTEND")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] leading-[1.2] mb-3">
              {t("why-title", "Your Pathway To Investment Success")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-6" />

            {/* 4 Steps Stack with Interactive Hover Cards */}
            <div className="space-y-4 sm:space-y-5 w-full max-w-[480px]">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 sm:gap-5 p-3.5 rounded-xl border border-transparent hover:border-neutral-200 hover:bg-neutral-50/80 hover:shadow-2xs transition-all duration-300 group cursor-default"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 group-hover:border-[#C6112F] group-hover:bg-[#C6112F] group-hover:text-white flex items-center justify-center text-xs sm:text-sm font-extrabold text-[#C6112F] shrink-0 bg-white shadow-2xs transition-all duration-300 mt-0.5">
                    {step.number}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[#C6112F] font-extrabold text-xs sm:text-[13px] tracking-wider uppercase mb-1">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed font-medium">
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
