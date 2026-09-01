"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedHeading from "@/components/AnimatedHeading";

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
      link: "/student",
      image:
        "/student/STUDENTS/MINING%20INVESTMENT%20EVENT%202026_DAY%201_STUDENTS-1.jpg",
      imageAlt: "Students at Mining Investment Event",
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
      link: "/sheco",
      image: "/she-co-initiative.jpg",
      imageAlt: "SHE-Co Initiative presentation at Mining Investment Event",
      imageOnLeft: true,
    },
    {
      id: "institutional",
      category: t("prog-inst-cat", "I N S T I T U T I O N A L"),
      title: t("prog-inst-title", "THE Tier 1 Conference Partnership"),
      description: t(
        "prog-inst-desc",
        "Becoming a Tier 1 Conference Partner provides unrivalled access to decision\u00A0makers, investors, and policy\u00A0makers across the global mining industry. Our partnerships are tailored to maximize visibility and engagement throughout THE Event."
      ),
      cta: t("prog-inst-cta", "PARTNERSHIP INFO"),
      link: "/partnership",
      image:
        "/gallery%20photos/MAIN%20EVENT/MINING%20INVESTMENT%20EVENT%202026_DAY%201_MAIN%20EVENT-8.jpg",
      imageAlt: "Partnership presentation at Mining Investment Event",
      imageOnLeft: false,
    },
    {
      id: "dialogue",
      category: t("prog-dial-cat", "D I A L O G U E"),
      title: t("prog-dial-title", "THE Coreshack"),
      description: t(
        "prog-dial-desc",
        "An intimate networking experience designed to connect Canada's exploration community with international investors"
      ),
      cta: t("prog-dial-cta", "MEET SPEAKERS"),
      link: "/agenda",
      image: "/coreshack.jpg",
      imageAlt: "THE Coreshack networking session",
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
    <section className="relative w-full bg-white dark:bg-[#090d16] py-14 sm:py-18 overflow-hidden transition-colors duration-300">
      {/* Bottom Accent Red Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6112F] rounded-full z-20" />

      {/* Header Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 text-center group">
        <span className="heading-badge text-xs font-extrabold uppercase mb-2 block transition-all duration-300 group-hover:tracking-[0.32em]">
          {t("programs-tag", "FEATURED INITIATIVES")}
        </span>
        <AnimatedHeading
          text={t("programs-title", "Key Event Programs")}
          className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1a1f2c] dark:text-white leading-[1.2] mb-3"
        />
        <div className="w-16 group-hover:w-24 h-[3.5px] heading-underline rounded-full mx-auto mb-8" />

        {/* Program Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 ${activeTab === cat
                ? "bg-[#C6112F] text-white shadow-md scale-105"
                : "bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 hover:bg-neutral-200 dark:hover:bg-slate-700 hover:text-neutral-900 dark:hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2x2 100% Full Width Edge-to-Edge Grid Container — no gaps */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-none overflow-hidden border-none shadow-none gap-0">
        {filteredPrograms.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row w-full h-auto sm:min-h-[380px] lg:min-h-[420px] rounded-none group relative border-none card-shimmer cursor-pointer"
          >
            {item.imageOnLeft ? (
              <>
                {/* Image Block (Left Half) */}
                <div className="w-full sm:w-1/2 h-[200px] xs:h-[240px] sm:h-full relative overflow-hidden bg-neutral-900 shrink-0 rounded-none">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 rounded-none"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Clean Origami Text Block (Right Half) */}
                <div className="w-full sm:w-1/2 p-5 sm:p-7 lg:p-9 flex flex-col justify-between relative bg-[#eaeaea] dark:bg-[#131b2e] overflow-hidden rounded-none group-hover:bg-[#e2e2e2] dark:group-hover:bg-[#1a2238] transition-colors duration-300">
                  {/* Origami Faceted Polygon Background */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-10 group-hover:scale-105 transition-transform duration-700">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 400">
                      <polygon points="0,0 400,0 280,400 0,400" fill="#ffffff" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-1.5 block group-hover:translate-x-1 transition-transform duration-300">
                      {item.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#1a1f2c] dark:text-white leading-snug mb-2.5">
                      {item.title}
                    </h3>
                    <div className="w-12 group-hover:w-20 h-[2.5px] bg-[#C6112F] rounded-full mb-3 transition-all duration-300" />
                    <p className="text-neutral-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-medium mb-4 max-w-[480px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Red Text Link with Arrow */}
                  <div className="relative z-10 pt-2 mt-auto">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                    >
                      <span>{item.cta}</span>
                      <span className="text-base leading-none group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Clean Origami Text Block First (Left Half) */}
                <div className="w-full sm:w-1/2 p-5 sm:p-7 lg:p-9 flex flex-col justify-between relative bg-[#eaeaea] dark:bg-[#131b2e] overflow-hidden rounded-none order-2 sm:order-1 group-hover:bg-[#e2e2e2] dark:group-hover:bg-[#1a2238] transition-colors duration-300">
                  {/* Origami Faceted Polygon Background */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-10 group-hover:scale-105 transition-transform duration-700">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 400">
                      <polygon points="0,0 400,0 400,400 120,400" fill="#ffffff" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-1.5 block group-hover:translate-x-1 transition-transform duration-300">
                      {item.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#1a1f2c] dark:text-white leading-snug mb-2.5">
                      {item.title}
                    </h3>
                    <div className="w-12 group-hover:w-20 h-[2.5px] bg-[#C6112F] rounded-full mb-3 transition-all duration-300" />
                    <p className="text-neutral-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-medium mb-4 max-w-[480px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Red Text Link with Arrow */}
                  <div className="relative z-10 pt-2 mt-auto">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                    >
                      <span>{item.cta}</span>
                      <span className="text-base leading-none group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
                    </Link>
                  </div>
                </div>

                {/* Image Block (Right Half) */}
                <div className="w-full sm:w-1/2 h-[200px] xs:h-[240px] sm:h-full relative overflow-hidden bg-neutral-900 rounded-none order-1 sm:order-2 shrink-0">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 rounded-none"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
