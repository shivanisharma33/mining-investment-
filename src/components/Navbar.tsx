"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

/* About dropdown sub-items */
const aboutDropdown = [
  {
    titleKey: "nav-about-event",
    titleDefault: "About THE Event",
    descKey: "nav-about-event-desc",
    descDefault: "Learn about Canada's premier mining conference",
    href: "/about",
    isExternal: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
  },
  {
    titleKey: "nav-team",
    titleDefault: "THE Team",
    descKey: "nav-team-desc",
    descDefault: "Meet the people behind THE Event",
    href: "/team",
    isExternal: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    titleKey: "nav-travel",
    titleDefault: "Travel & Accommodations",
    descKey: "nav-travel-desc",
    descDefault: "Venue, hotels and travel information",
    href: "/travel",
    isExternal: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    titleKey: "nav-media",
    titleDefault: "Recent Media",
    descKey: "nav-media-desc",
    descDefault: "Latest media coverage and press",
    href: "/media",
    isExternal: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
      </svg>
    ),
  },
  {
    titleKey: "nav-newsflash",
    titleDefault: "THE Press Release",
    descKey: "nav-newsflash-desc",
    descDefault: "Press releases and official announcements",
    href: "/newsflash",
    isExternal: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    titleKey: "nav-imw",
    titleDefault: "International Mining Week",
    descKey: "nav-imw-desc",
    descDefault: "One week of infinite mining opportunities in Quebec City",
    href: "https://mining-international-weekly.vercel.app/",
    isExternal: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
      </svg>
    ),
  },
];

/* Programs dropdown sub-items */
const programsDropdown = [
  {
    titleKey: "nav-student",
    titleDefault: "The Student Sponsorship Program",
    descKey: "nav-student-desc",
    descDefault: "Exposure to the mining industry for university and college students",
    href: "/student",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147L12 14.634l7.74-4.487l-7.74-4.486l-7.74 4.486zm0 0v4.487M12 14.634v4.487" />
      </svg>
    ),
  },
  {
    titleKey: "nav-sheco",
    titleDefault: "SHE-Co Initiative",
    descKey: "nav-sheco-desc",
    descDefault: "ESG innovation and diversity in global mining",
    href: "/sheco",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5c-1.935 0-3.597 1.126-4.312 2.733c-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    titleKey: "nav-partnership",
    titleDefault: "THE Tier 1 Conference Partnership",
    descKey: "nav-partnership-desc",
    descDefault: "Align your brand with Canada's premier mining conference",
    href: "/partnership",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
  },
];

/* Past Years dropdown sub-items */
const pastYearsDropdown = [
  {
    titleKey: "nav-past-editions",
    titleDefault: "Past Editions",
    descKey: "nav-past-editions-desc",
    descDefault: "View overview and summaries of our past editions",
    href: "/past-editions",
    isExternal: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    titleKey: "nav-snapshot-report",
    titleDefault: "THE Snapshot Report",
    descKey: "nav-snapshot-report-desc",
    descDefault: "Read the official event snapshot report",
    href: "https://online.flippingbook.com/view/213558062/",
    isExternal: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [pastYearsOpen, setPastYearsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobilePastYearsOpen, setMobilePastYearsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav-home", "HOME"), href: "/", active: false, hasDropdown: false, dropdownType: "none", isExternal: false },
    { name: t("nav-about", "ABOUT"), href: "/about", active: false, hasDropdown: true, dropdownType: "about", isExternal: false },
    { name: t("nav-programs", "PROGRAMS"), href: "/student", active: false, hasDropdown: true, dropdownType: "programs", isExternal: false },
    { name: t("nav-past-years", "PAST YEARS"), href: "/past-editions", active: false, hasDropdown: false, dropdownType: "none", isExternal: false },
    { name: t("nav-gallery", "GALLERY"), href: "/media", active: false, hasDropdown: false, dropdownType: "none", isExternal: false },
    { name: t("nav-news-main", "THE NEWS"), href: "/news", active: false, hasDropdown: false, dropdownType: "none", isExternal: false },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 bg-white/95 dark:bg-[#0e1626]/95 backdrop-blur-md border-b border-[#C6112F]/80 ${scrolled ? "shadow-md h-20 sm:h-22" : "h-24"
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center group">
          <Image
            src="/MainPageLogo.webp"
            alt="The Mining Investment Event"
            width={240}
            height={90}
            priority
            className="object-contain h-12 xs:h-16 sm:h-20 md:h-[76px] max-h-[80%] w-auto group-hover:scale-105 transition-transform duration-300 dark:brightness-110"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => {
                if (link.dropdownType === "about") setAboutOpen(true);
                if (link.dropdownType === "programs") setProgramsOpen(true);
                if (link.dropdownType === "past-years") setPastYearsOpen(true);
              }}
              onMouseLeave={() => {
                if (link.dropdownType === "about") setAboutOpen(false);
                if (link.dropdownType === "programs") setProgramsOpen(false);
                if (link.dropdownType === "past-years") setPastYearsOpen(false);
              }}
            >
              {link.isExternal ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative py-1 text-[11px] xl:text-sm font-extrabold tracking-wide xl:tracking-wider whitespace-nowrap uppercase transition-colors duration-200 group inline-flex items-center gap-1 text-neutral-900 dark:text-slate-100 hover:text-[#C6112F] dark:hover:text-[#C6112F]"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 h-[2px] bg-[#C6112F] transition-all duration-300 w-0 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={`relative py-1 text-[11px] xl:text-sm font-extrabold tracking-wide xl:tracking-wider whitespace-nowrap uppercase transition-colors duration-200 group inline-flex items-center gap-1 ${link.active ? "text-[#C6112F]" : "text-neutral-900 dark:text-slate-100 hover:text-[#C6112F] dark:hover:text-[#C6112F]"
                    }`}
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${(link.dropdownType === "about" && aboutOpen) ||
                        (link.dropdownType === "programs" && programsOpen) ||
                        (link.dropdownType === "past-years" && pastYearsOpen)
                        ? "rotate-180 text-[#C6112F]"
                        : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                  {/* Animated Underline Effect */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C6112F] transition-all duration-300 ${link.active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              )}

              {/* About Mega Menu Dropdown */}
              {link.dropdownType === "about" && aboutOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-white dark:bg-[#18181b] rounded-xl border border-neutral-200 dark:border-zinc-800 shadow-2xl p-4 min-w-[340px] animate-fadeIn">
                    <div className="absolute top-3 left-4 right-4 h-[2px] bg-[#C6112F] rounded-full" />
                    <div className="flex flex-col gap-1 mt-2">
                      {aboutDropdown.map((item) => {
                        if (item.isExternal) {
                          return (
                            <a
                              key={item.titleKey}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#fef2f2] dark:hover:bg-zinc-800/80 transition-colors duration-200 group/item"
                            >
                              <div className="w-10 h-10 rounded-lg bg-[#f4f7fa] dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center text-neutral-600 dark:text-zinc-300 group-hover/item:bg-[#C6112F] group-hover/item:text-white group-hover/item:border-[#C6112F] transition-all duration-200 shrink-0 mt-0.5">
                                {item.icon}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-[#C6112F] dark:text-[#C6112F] transition-colors">
                                  {t(item.titleKey, item.titleDefault)}
                                </span>
                                <span className="text-xs text-neutral-500 dark:text-zinc-300 leading-relaxed mt-0.5">
                                  {t(item.descKey, item.descDefault)}
                                </span>
                              </div>
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={item.titleKey}
                            href={item.href}
                            className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#fef2f2] dark:hover:bg-zinc-800/80 transition-colors duration-200 group/item"
                          >
                            <div className="w-10 h-10 rounded-lg bg-[#f4f7fa] dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center text-neutral-600 dark:text-zinc-300 group-hover/item:bg-[#C6112F] group-hover/item:text-white group-hover/item:border-[#C6112F] transition-all duration-200 shrink-0 mt-0.5">
                              {item.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-[#C6112F] dark:text-[#C6112F] transition-colors">
                                {t(item.titleKey, item.titleDefault)}
                              </span>
                              <span className="text-xs text-neutral-500 dark:text-zinc-300 leading-relaxed mt-0.5">
                                {t(item.descKey, item.descDefault)}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Programs Mega Menu Dropdown */}
              {link.dropdownType === "programs" && programsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-white dark:bg-[#18181b] rounded-xl border border-neutral-200 dark:border-zinc-800 shadow-2xl p-4 min-w-[340px] animate-fadeIn">
                    <div className="absolute top-3 left-4 right-4 h-[2px] bg-[#C6112F] rounded-full" />
                    <div className="flex flex-col gap-1 mt-2">
                      {programsDropdown.map((item) => (
                        <Link
                          key={item.titleKey}
                          href={item.href}
                          className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#fef2f2] dark:hover:bg-zinc-800/80 transition-colors duration-200 group/item"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#f4f7fa] dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center text-neutral-600 dark:text-zinc-300 group-hover/item:bg-[#C6112F] group-hover/item:text-white group-hover/item:border-[#C6112F] transition-all duration-200 shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#C6112F] dark:text-[#C6112F] transition-colors">
                              {t(item.titleKey, item.titleDefault)}
                            </span>
                            <span className="text-xs text-neutral-500 dark:text-zinc-300 leading-relaxed mt-0.5">
                              {t(item.descKey, item.descDefault)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Past Years Mega Menu Dropdown */}
              {link.dropdownType === "past-years" && pastYearsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-white dark:bg-[#18181b] rounded-xl border border-neutral-200 dark:border-zinc-800 shadow-2xl p-4 min-w-[340px] animate-fadeIn">
                    <div className="absolute top-3 left-4 right-4 h-[2px] bg-[#C6112F] rounded-full" />
                    <div className="flex flex-col gap-1 mt-2">
                      {pastYearsDropdown.map((item) => {
                        if (item.isExternal) {
                          return (
                            <a
                              key={item.titleKey}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#fef2f2] dark:hover:bg-zinc-800/80 transition-colors duration-200 group/item"
                            >
                              <div className="w-10 h-10 rounded-lg bg-[#f4f7fa] dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center text-neutral-600 dark:text-zinc-300 group-hover/item:bg-[#C6112F] group-hover/item:text-white group-hover/item:border-[#C6112F] transition-all duration-200 shrink-0 mt-0.5">
                                {item.icon}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-[#C6112F] dark:text-[#C6112F] transition-colors">
                                  {t(item.titleKey, item.titleDefault)}
                                </span>
                                <span className="text-xs text-neutral-500 dark:text-zinc-300 leading-relaxed mt-0.5">
                                  {t(item.descKey, item.descDefault)}
                                </span>
                              </div>
                            </a>
                          );
                        }
                        return (
                          <Link
                            key={item.titleKey}
                            href={item.href}
                            className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#fef2f2] dark:hover:bg-zinc-800/80 transition-colors duration-200 group/item"
                          >
                            <div className="w-10 h-10 rounded-lg bg-[#f4f7fa] dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 flex items-center justify-center text-neutral-600 dark:text-zinc-300 group-hover/item:bg-[#C6112F] group-hover/item:text-white group-hover/item:border-[#C6112F] transition-all duration-200 shrink-0 mt-0.5">
                              {item.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-[#C6112F] dark:text-[#C6112F] transition-colors">
                                {t(item.titleKey, item.titleDefault)}
                              </span>
                              <span className="text-xs text-neutral-500 dark:text-zinc-300 leading-relaxed mt-0.5">
                                {t(item.descKey, item.descDefault)}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop & Action Buttons Container */}
        <div className="flex items-center gap-2.5 sm:gap-3 xl:gap-4 shrink-0">


          {/* REGISTER HERE Button */}
          <Link
            href="/register"
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 xl:px-6 xl:py-2.5 rounded-lg bg-[#C6112F] hover:bg-[#a80d26] text-white text-[10px] sm:text-[11px] xl:text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>{t("nav-register", "REGISTER HERE")}</span>
            <svg
              className="w-3.5 h-3.5 text-white hidden sm:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          {/* Day / Night Mode Toggle Switch (Right Corner) */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center justify-between px-1.5 w-[72px] sm:w-[78px] xl:w-[86px] h-[32px] sm:h-[34px] xl:h-[38px] rounded-full border-2 border-[#C6112F] bg-white/70 dark:bg-slate-800/80 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 shadow-xs group overflow-hidden"
            aria-label={`Switch to ${theme === "light" ? "Night" : "Day"} mode`}
            title={theme === "light" ? "Switch to Night mode" : "Switch to Day mode"}
          >
            {/* Sliding Indicator Circle */}
            <span
              className="absolute top-[2px] h-[24px] sm:h-[26px] xl:h-[30px] w-[24px] sm:w-[26px] xl:w-[30px] rounded-full bg-[#C6112F] transition-all duration-300 ease-in-out flex items-center justify-center text-white shadow-xs z-20"
              style={{
                left: theme === "light" ? "2px" : "calc(100% - 2px)",
                transform: theme === "light" ? "translateX(0)" : "translateX(-100%)",
              }}
            >
              {theme === "light" ? (
                <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-300 fill-amber-300" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4" />
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-indigo-100 fill-indigo-100" viewBox="0 0 24 24">
                  <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </span>
            {/* Sun Icon */}
            <span className={`relative z-10 flex-1 flex justify-center transition-opacity duration-300 ${theme === "light" ? "opacity-0" : "opacity-70 text-amber-400"}`}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.78a1 1 0 011.415 0l.707.707a1 1 0 01-1.414 1.414l-.708-.707a1 1 0 010-1.414zm2.78 4.22a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-2.78 5.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.415 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-5.636-2.78a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 10a1 1 0 01-1-1V8a1 1 0 112 0v1a1 1 0 01-1 1zm2.78-5.636a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
              </svg>
            </span>
            {/* Moon Icon */}
            <span className={`relative z-10 flex-1 flex justify-center transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-70 text-indigo-600"}`}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-neutral-900 dark:text-slate-100 hover:text-[#C6112F] focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/98 dark:bg-[#0e1626]/98 backdrop-blur-md border-b border-neutral-200 dark:border-slate-800 shadow-xl px-6 py-6 flex flex-col gap-5 animate-fadeIn max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() => {
                        if (link.dropdownType === "about") setMobileAboutOpen(!mobileAboutOpen);
                        if (link.dropdownType === "programs") setMobileProgramsOpen(!mobileProgramsOpen);
                        if (link.dropdownType === "past-years") setMobilePastYearsOpen(!mobilePastYearsOpen);
                      }}
                      className="w-full flex items-center justify-between py-2.5 text-sm font-extrabold tracking-wider uppercase text-neutral-800 dark:text-slate-100 hover:text-[#C6112F] transition-colors"
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${(link.dropdownType === "about" && mobileAboutOpen) ||
                          (link.dropdownType === "programs" && mobileProgramsOpen) ||
                          (link.dropdownType === "past-years" && mobilePastYearsOpen)
                          ? "rotate-180 text-[#C6112F]"
                          : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {link.dropdownType === "about" && mobileAboutOpen && (
                      <div className="pl-4 flex flex-col gap-1 mb-2 border-l-2 border-[#C6112F]/20">
                        {aboutDropdown.map((item) => {
                          if (item.isExternal) {
                            return (
                              <a
                                key={item.titleKey}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 py-2 text-sm font-semibold text-neutral-700 dark:text-slate-300 hover:text-[#C6112F] transition-colors"
                              >
                                <span className="text-[#C6112F]">{item.icon}</span>
                                <span>{t(item.titleKey, item.titleDefault)}</span>
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={item.titleKey}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 py-2 text-sm font-semibold text-neutral-700 dark:text-slate-300 hover:text-[#C6112F] transition-colors"
                            >
                              <span className="text-[#C6112F]">{item.icon}</span>
                              <span>{t(item.titleKey, item.titleDefault)}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                    {link.dropdownType === "programs" && mobileProgramsOpen && (
                      <div className="pl-4 flex flex-col gap-1 mb-2 border-l-2 border-[#C6112F]/20">
                        {programsDropdown.map((item) => (
                          <Link
                            key={item.titleKey}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 py-2 text-sm font-semibold text-neutral-700 dark:text-slate-300 hover:text-[#C6112F] transition-colors"
                          >
                            <span className="text-[#C6112F]">{item.icon}</span>
                            <span>{t(item.titleKey, item.titleDefault)}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    {link.dropdownType === "past-years" && mobilePastYearsOpen && (
                      <div className="pl-4 flex flex-col gap-1 mb-2 border-l-2 border-[#C6112F]/20">
                        {pastYearsDropdown.map((item) => {
                          if (item.isExternal) {
                            return (
                              <a
                                key={item.titleKey}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 py-2 text-sm font-semibold text-neutral-700 dark:text-slate-300 hover:text-[#C6112F] transition-colors"
                              >
                                <span className="text-[#C6112F]">{item.icon}</span>
                                <span>{t(item.titleKey, item.titleDefault)}</span>
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={item.titleKey}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 py-2 text-sm font-semibold text-neutral-700 dark:text-slate-300 hover:text-[#C6112F] transition-colors"
                            >
                              <span className="text-[#C6112F]">{item.icon}</span>
                              <span>{t(item.titleKey, item.titleDefault)}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : link.isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="py-2.5 text-sm font-extrabold tracking-wider uppercase transition-colors block text-neutral-800 dark:text-slate-100 hover:text-[#C6112F]"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`py-2.5 text-sm font-extrabold tracking-wider uppercase transition-colors block ${link.active ? "text-[#C6112F]" : "text-neutral-800 dark:text-slate-100 hover:text-[#C6112F]"
                      }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="pt-4 border-t border-neutral-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            {/* Mobile Actions: Theme & Language */}
            <div className="flex items-center gap-3">
              {/* Mobile Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold border border-[#C6112F] text-neutral-800 dark:text-slate-100 bg-neutral-50 dark:bg-slate-800 transition-colors shadow-2xs"
              >
                {theme === "light" ? (
                  <>
                    <span className="text-amber-500">☀️</span>
                    <span>Day</span>
                  </>
                ) : (
                  <>
                    <span className="text-indigo-400">🌙</span>
                    <span>Night</span>
                  </>
                )}
              </button>


            </div>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 rounded-lg bg-[#C6112F] text-white text-xs font-extrabold tracking-wider uppercase text-center shrink-0"
            >
              {t("nav-register", "REGISTER HERE")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
