"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const categories = ["ALL", "EDUCATION", "LEADERSHIP", "INSTITUTIONAL", "DIALOGUE"];

export default function ProgramsGrid() {
  const [activeTab, setActiveTab] = useState("ALL");
  const { t } = useLanguage();

  const programs = [
    {
      id: "education",
      category: t("prog-edu-cat", "E D U C A T I O N"),
      title: t("prog-edu-title", "Student Sponsorship Program"),
      description: t(
        "prog-edu-desc",
        "Offering a one-of-a-kind exposure to the mining industry for up to 50 university and college students passionate about geology, finance and engineering."
      ),
      cta: t("prog-edu-cta", "EXPLORE PROGRAM"),
      link: "#",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Students collaborating in library",
      imageOnLeft: true,
    },
    {
      id: "leadership",
      category: t("prog-lead-cat", "L E A D E R S H I P"),
      title: t("prog-lead-title", "SHE-Co Initiative"),
      description: t(
        "prog-lead-desc",
        "Fostering industry-wide progress through ESG innovation and diversity, highlighting the achievements of women in the global mining sector."
      ),
      cta: t("prog-lead-cta", "LEARN MORE"),
      link: "#",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Smiling professional woman in office",
      imageOnLeft: true,
    },
    {
      id: "institutional",
      category: t("prog-inst-cat", "I N S T I T U T I O N A L"),
      title: t("prog-inst-title", "Tier 1 Partnership"),
      description: t(
        "prog-inst-desc",
        "Tailored opportunities designed to maximize visibility and engagement with the world's most influential mining companies and investors."
      ),
      cta: t("prog-inst-cta", "PARTNERSHIP INFO"),
      link: "#",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Team presentation meeting in loft office",
      imageOnLeft: false,
    },
    {
      id: "dialogue",
      category: t("prog-dial-cat", "D I A L O G U E"),
      title: t("prog-dial-title", "THE Salon Explore Co Lounge"),
      description: t(
        "prog-dial-desc",
        "An intimate networking experience designed to connect Canada's exploration community with elite international investors."
      ),
      cta: t("prog-dial-cta", "MEET SPEAKERS"),
      link: "#",
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Conference stage microphone",
      imageOnLeft: false,
    },
  ];

  const filteredPrograms =
    activeTab === "ALL"
      ? programs
      : programs.filter(
          (p) =>
            p.category.replace(/\s+/g, "") === activeTab ||
            p.id === activeTab.toLowerCase()
        );

  return (
    <section className="relative w-full bg-white py-14 sm:py-18 overflow-hidden">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      {/* Header Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 text-center">
        <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
          {t("programs-tag", "FEATURED INITIATIVES")}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] tracking-tight mb-3">
          {t("programs-title", "Key Event Programs")}
        </h2>
        <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mb-8" />

        {/* Program Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 ${
                activeTab === cat
                  ? "bg-[#C6112F] text-white shadow-md scale-105"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2x2 100% Full Width Edge-to-Edge Grid Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-none overflow-hidden border-none shadow-none">
        {filteredPrograms.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row w-full h-auto sm:h-[320px] lg:h-[360px] rounded-none group relative border-none"
          >
            {item.imageOnLeft ? (
              <>
                {/* Image Block (Left Half) */}
                <div className="w-full sm:w-1/2 h-[280px] sm:h-full relative overflow-hidden bg-neutral-900 shrink-0 rounded-none">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
                  />
                </div>

                {/* Clean Origami Text Block (Right Half) */}
                <div className="w-full sm:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-between relative bg-[#eaeaea] overflow-hidden rounded-none group-hover:bg-[#e4e4e4] transition-colors duration-300">
                  {/* Origami Faceted Polygon Background */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 400">
                      <polygon points="0,0 400,0 280,400 0,400" fill="#ffffff" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a1f2c] leading-tight mb-3">
                      {item.title}
                    </h3>
                    <div className="w-12 h-[2px] bg-[#C6112F] mb-4" />
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium mb-6 max-w-[480px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Red Text Link with Arrow matching reference image */}
                  <div className="relative z-10 pt-2">
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                    >
                      <span>{item.cta}</span>
                      <span className="text-base leading-none">➔</span>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Clean Origami Text Block First (Left Half) */}
                <div className="w-full sm:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-between relative bg-[#eaeaea] overflow-hidden rounded-none order-2 sm:order-1 group-hover:bg-[#e4e4e4] transition-colors duration-300">
                  {/* Origami Faceted Polygon Background */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 400">
                      <polygon points="0,0 400,0 400,400 120,400" fill="#ffffff" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1a1f2c] leading-tight mb-3">
                      {item.title}
                    </h3>
                    <div className="w-12 h-[2px] bg-[#C6112F] mb-4" />
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium mb-6 max-w-[480px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Red Text Link with Arrow matching reference image */}
                  <div className="relative z-10 pt-2">
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                    >
                      <span>{item.cta}</span>
                      <span className="text-base leading-none">➔</span>
                    </a>
                  </div>
                </div>

                {/* Image Block (Right Half) */}
                <div className="w-full sm:w-1/2 h-[280px] sm:h-full relative overflow-hidden bg-neutral-900 rounded-none order-1 sm:order-2 shrink-0">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
