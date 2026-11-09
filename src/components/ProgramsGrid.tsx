"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function ProgramsGrid() {
  const { t, isFr } = useLanguage();
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent, link: string) => {
    if (!link) return;
    if ((e.target as HTMLElement).closest("a, button")) {
      return;
    }
    if (link.startsWith("mailto:")) {
      window.location.href = link;
    } else {
      router.push(link);
    }
  };

  const programs = [
    {
      id: "meeting",
      category: t("prog-meeting-cat", "N E T W O R K I N G"),
      title: t("prog-meeting-title", "1x1 Meeting Program"),
      description: t(
        "prog-meeting-desc",
        "Facilitating thousands of private, pre-scheduled one-on-one meetings connecting participating mining companies, global institutional investors and key decision-makers."
      ),
      cta: t("prog-meeting-cta", "REGISTER NOW"),
      link: "/register#registration-form-section",
      image: "/photo-8.webp",
      imageAlt: "1x1 private meeting rooms in use at THE Mining Investment Event",
      imagePosition: "object-center",
      imageOnLeft: true,
    },
    {
      id: "education",
      category: t("prog-edu-cat", "E D U C A T I O N"),
      title: t("prog-edu-title", "THE Student Partnership Program"),
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
        "THE Event's SHE-Co initiative 2026 donated a portion of the conference proceeds to charities or community groups that fund start-ups, further education, or offer other worthwhile programs to assist people, particularly women and children. This year's charitable beneficiary was Moisson Rive-Sud, a large Quebec based food security charitable organization. Led this year by added private donations from Vior Gold's Mathieu Savard and Osisko Development's Sean Roosen, the program continues to encourage reach out and industry concern for people, as there is no part of life or the economy that is not connected somehow to the mining industry. Each year, a mining leader selects the charity or program who receives the donations, and in 2027 Mathieu Savard will be choosing the person who will select the group to receive the charitable/community initiative funds."
      ),
      cta: t("prog-lead-cta", "LEARN MORE"),
      link: "/sheco",
      image: "/photo-9.webp",
      imageAlt: "SHE-Co Initiative cheque presentation on stage to Moisson Rive-Sud",
      imagePosition: "object-[center_35%]",
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
      cta: t("prog-dial-cta", "CONTACT JENNY CHOI"),
      link: "mailto:jchoi@irinc.ca?subject=THE Coreshack Inquiry",
      image: "/coreshack.webp",
      imageAlt: "THE Coreshack networking session",
      imageOnLeft: false,
    },
  ];

  function ProgramDescription({ text, isFr }: { text: string; isFr: boolean }) {
    const [expanded, setExpanded] = useState(false);
    const threshold = 180;
    const isLong = text.length > threshold;

    if (!isLong) {
      return (
        <p className="text-neutral-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-medium mb-4 max-w-[480px]">
          {text}
        </p>
      );
    }

    return (
      <p className="text-neutral-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-medium mb-4 max-w-[480px]">
        {expanded ? text : `${text.slice(0, threshold).trim()}... `}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          className="text-[#C6112F] hover:text-[#9e0d25] font-bold text-xs uppercase tracking-wider underline underline-offset-2 ml-1 cursor-pointer transition-colors"
        >
          {expanded ? (isFr ? "Lire moins" : "Read Less") : (isFr ? "Lire plus" : "Read More")}
        </button>
      </p>
    );
  }

  return (
    <section className="relative w-full bg-white dark:bg-[#090d16] py-12 sm:py-14 md:py-16 overflow-hidden transition-colors duration-300">
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
        <div className="w-16 group-hover:w-24 h-[3.5px] heading-underline rounded-full mx-auto" />
      </div>

      {/* 2x2 100% Full Width Edge-to-Edge Grid Container — no gaps */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 rounded-none overflow-hidden border-none shadow-none gap-0">
        {programs.map((item) => (
          <div
            key={item.id}
            onClick={(e) => handleCardClick(e, item.link)}
            className={`flex flex-col sm:flex-row w-full h-auto sm:min-h-[380px] lg:min-h-[420px] rounded-none group relative border-none card-shimmer ${item.link ? "cursor-pointer" : ""}`}
          >
            {item.imageOnLeft ? (
              <>
                {/* Image Block (Left Half) */}
                <div className="w-full sm:w-1/2 h-[200px] xs:h-[240px] sm:h-full relative overflow-hidden bg-neutral-900 shrink-0 rounded-none">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className={`w-full h-full object-cover ${item.imagePosition || "object-center"} group-hover:scale-108 transition-transform duration-700 rounded-none`}
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
                    <ProgramDescription text={item.description} isFr={isFr} />
                  </div>

                  {/* Red Text Link / CTA with Arrow */}
                  {item.cta && (
                    <div className="relative z-10 pt-2 mt-auto">
                      {item.link ? (
                        item.link.startsWith("mailto:") ? (
                          <a
                            href={item.link}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                          >
                            <span>{item.cta}</span>
                            <span className="text-base leading-none group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
                          </a>
                        ) : (
                          <Link
                            href={item.link}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                          >
                            <span>{item.cta}</span>
                            <span className="text-base leading-none group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
                          </Link>
                        )
                      ) : (
                        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] uppercase tracking-wider select-none">
                          <span>{item.cta}</span>
                          <span className="text-base leading-none group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
                        </div>
                      )}
                    </div>
                  )}
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
                    <ProgramDescription text={item.description} isFr={isFr} />
                  </div>

                  {/* Red Text Link / CTA with Arrow */}
                  {item.cta && (
                    <div className="relative z-10 pt-2 mt-auto">
                      {item.link ? (
                        item.link.startsWith("mailto:") ? (
                          <a
                            href={item.link}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                          >
                            <span>{item.cta}</span>
                            <span className="text-base leading-none group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
                          </a>
                        ) : (
                          <Link
                            href={item.link}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] hover:text-[#a80d26] uppercase tracking-wider transition-all duration-300 group-hover:gap-3"
                          >
                            <span>{item.cta}</span>
                            <span className="text-base leading-none group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
                          </Link>
                        )
                      ) : (
                        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#C6112F] uppercase tracking-wider select-none">
                          <span>{item.cta}</span>
                          <span className="text-base leading-none group-hover:translate-x-1.5 transition-transform duration-300">➔</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Image Block (Right Half) */}
                <div className="w-full sm:w-1/2 h-[200px] xs:h-[240px] sm:h-full relative overflow-hidden bg-neutral-900 rounded-none order-1 sm:order-2 shrink-0">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className={`w-full h-full object-cover ${item.imagePosition || "object-center"} group-hover:scale-108 transition-transform duration-700 rounded-none`}
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
