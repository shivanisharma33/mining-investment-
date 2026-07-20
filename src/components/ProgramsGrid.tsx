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
      category: t("prog-edu-cat", "EDUCATION"),
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
      category: t("prog-lead-cat", "LEADERSHIP"),
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
      category: t("prog-inst-cat", "INSTITUTIONAL"),
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
      category: t("prog-dial-cat", "DIALOGUE"),
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
      : programs.filter((p) => p.category === activeTab || p.id === activeTab.toLowerCase());

  return (
    <section className="relative w-full bg-white py-14 sm:py-18 overflow-hidden">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] z-20" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
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

        {/* 2x2 Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-neutral-200 shadow-xs">
          {filteredPrograms.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row w-full min-h-[300px] lg:min-h-[340px] border-b md:border-r border-neutral-200 group"
            >
              {item.imageOnLeft ? (
                <>
                  {/* Image Block */}
                  <div className="w-full sm:w-1/2 h-[220px] sm:h-auto relative overflow-hidden bg-neutral-900 shrink-0">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>

                  {/* Clean Light Text Block */}
                  <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between relative bg-[#f8fafc] group-hover:bg-[#f1f5f9] transition-colors duration-300">
                    <div className="relative z-10">
                      <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-1.5 block">
                        {item.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1f2c] leading-tight mb-2.5">
                        {item.title}
                      </h3>
                      <div className="w-12 h-[2.5px] bg-[#C6112F] rounded-full mb-3.5" />
                      <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed font-medium mb-6">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative z-10 pt-2">
                      <a
                        href={item.link}
                        className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-extrabold tracking-wider px-4 py-2.5 rounded-lg uppercase inline-flex items-center gap-2 shadow-2xs hover:shadow-xs transition-all duration-300"
                      >
                        <span>{item.cta}</span>
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Clean Light Text Block First */}
                  <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between relative bg-[#f8fafc] order-2 sm:order-1 group-hover:bg-[#f1f5f9] transition-colors duration-300">
                    <div className="relative z-10">
                      <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-1.5 block">
                        {item.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1f2c] leading-tight mb-2.5">
                        {item.title}
                      </h3>
                      <div className="w-12 h-[2.5px] bg-[#C6112F] rounded-full mb-3.5" />
                      <p className="text-neutral-600 text-xs sm:text-[13px] leading-relaxed font-medium mb-6">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative z-10 pt-2">
                      <a
                        href={item.link}
                        className="bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-extrabold tracking-wider px-4 py-2.5 rounded-lg uppercase inline-flex items-center gap-2 shadow-2xs hover:shadow-xs transition-all duration-300"
                      >
                        <span>{item.cta}</span>
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Image Block */}
                  <div className="w-full sm:w-1/2 h-[220px] sm:h-auto relative overflow-hidden bg-neutral-900 order-1 sm:order-2 shrink-0">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
