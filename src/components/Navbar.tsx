"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/* About dropdown sub-items */
const aboutDropdown = [
  {
    titleKey: "nav-about-event",
    titleDefault: "About THE Event",
    descKey: "nav-about-event-desc",
    descDefault: "Learn about Canada's premier mining conference",
    href: "/about",
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
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
      </svg>
    ),
  },
  {
    titleKey: "nav-newsflash",
    titleDefault: "THE Newsflash",
    descKey: "nav-newsflash-desc",
    descDefault: "Newsletter and industry updates",
    href: "/newsflash",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
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
    titleDefault: "Tier 1 Partnership",
    descKey: "nav-partnership-desc",
    descDefault: "Align your brand with Canada's premier mining conference",
    href: "/partnership",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
      </svg>
    ),
  },
  {
    titleKey: "nav-speakers",
    titleDefault: "Speakers & Panels",
    descKey: "nav-speakers-desc",
    descDefault: "Keynote speeches and executive panel discussions",
    href: "/speakers",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    titleKey: "nav-agenda",
    titleDefault: "Event Agenda",
    descKey: "nav-agenda-desc",
    descDefault: "Full schedule, keynotes, panels and timings",
    href: "/agenda",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    titleKey: "nav-sponsors",
    titleDefault: "Event Sponsors",
    descKey: "nav-sponsors-desc",
    descDefault: "Platinum, Gold, Silver, and Bronze sponsors list",
    href: "/sponsors",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.6l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.2 6.9 19l1.1-5.6-4.2-3.9 5.7-.7z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

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
    { name: t("nav-snapshot", "THE SNAPSHOT REPORT"), href: "https://online.flippingbook.com/view/213558062/", active: false, hasDropdown: false, dropdownType: "none", isExternal: true },
    { name: t("nav-gallery", "GALLERY"), href: "/media", active: false, hasDropdown: false, dropdownType: "none", isExternal: false },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-[#C6112F]/80 ${
        scrolled ? "shadow-md h-20 sm:h-22" : "h-24"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center group">
          <Image
            src="/MainPageLogo.webp"
            alt="The Mining Investment Event"
            width={240}
            height={90}
            priority
            className="object-contain h-16 sm:h-20 md:h-[76px] max-h-[80%] w-auto group-hover:scale-105 transition-transform duration-300"
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
              }}
              onMouseLeave={() => {
                if (link.dropdownType === "about") setAboutOpen(false);
                if (link.dropdownType === "programs") setProgramsOpen(false);
              }}
            >
              {link.isExternal ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative py-1 text-[11px] xl:text-sm font-extrabold tracking-wide xl:tracking-wider whitespace-nowrap uppercase transition-colors duration-200 group inline-flex items-center gap-1 text-neutral-900 hover:text-[#C6112F]"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 h-[2px] bg-[#C6112F] transition-all duration-300 w-0 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={`relative py-1 text-[11px] xl:text-sm font-extrabold tracking-wide xl:tracking-wider whitespace-nowrap uppercase transition-colors duration-200 group inline-flex items-center gap-1 ${
                    link.active ? "text-[#C6112F]" : "text-neutral-900 hover:text-[#C6112F]"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        (link.dropdownType === "about" && aboutOpen) || (link.dropdownType === "programs" && programsOpen)
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
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C6112F] transition-all duration-300 ${
                      link.active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )}

              {/* About Mega Menu Dropdown */}
              {link.dropdownType === "about" && aboutOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-white rounded-xl border border-neutral-200 shadow-2xl p-4 min-w-[340px] animate-fadeIn">
                    <div className="absolute top-3 left-4 right-4 h-[2px] bg-[#C6112F] rounded-full" />
                    <div className="flex flex-col gap-1 mt-2">
                      {aboutDropdown.map((item) => (
                        <Link
                          key={item.titleKey}
                          href={item.href}
                          className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#fef2f2] transition-colors duration-200 group/item"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#f4f7fa] border border-neutral-200 flex items-center justify-center text-neutral-600 group-hover/item:bg-[#C6112F] group-hover/item:text-white group-hover/item:border-[#C6112F] transition-all duration-200 shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#1a1f2c] group-hover/item:text-[#C6112F] transition-colors">
                              {t(item.titleKey, item.titleDefault)}
                            </span>
                            <span className="text-xs text-neutral-500 leading-relaxed mt-0.5">
                              {t(item.descKey, item.descDefault)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Programs Mega Menu Dropdown */}
              {link.dropdownType === "programs" && programsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-white rounded-xl border border-neutral-200 shadow-2xl p-4 min-w-[340px] animate-fadeIn">
                    <div className="absolute top-3 left-4 right-4 h-[2px] bg-[#C6112F] rounded-full" />
                    <div className="flex flex-col gap-1 mt-2">
                      {programsDropdown.map((item) => (
                        <Link
                          key={item.titleKey}
                          href={item.href}
                          className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#fef2f2] transition-colors duration-200 group/item"
                        >
                          <div className="w-10 h-10 rounded-lg bg-[#f4f7fa] border border-neutral-200 flex items-center justify-center text-neutral-600 group-hover/item:bg-[#C6112F] group-hover/item:text-white group-hover/item:border-[#C6112F] transition-all duration-200 shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#1a1f2c] group-hover/item:text-[#C6112F] transition-colors">
                              {t(item.titleKey, item.titleDefault)}
                            </span>
                            <span className="text-xs text-neutral-500 leading-relaxed mt-0.5">
                              {t(item.descKey, item.descDefault)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
          {/* Language Toggle Switch */}
          <button
            onClick={() => setLang(lang === "EN" ? "FR" : "EN")}
            className="relative flex items-center w-[88px] xl:w-[96px] h-[34px] xl:h-[38px] rounded-full border-2 border-[#C6112F] bg-white/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 shadow-xs"
            aria-label={`Switch language to ${lang === "EN" ? "FR" : "EN"}`}
          >
            {/* Sliding Indicator */}
            <span
              className="absolute top-[2px] h-[26px] xl:h-[30px] w-[42px] xl:w-[44px] rounded-full bg-[#C6112F] transition-all duration-300 ease-in-out"
              style={{ left: lang === "EN" ? "2px" : "calc(100% - 44px)" }}
            />
            {/* EN Label */}
            <span
              className={`relative z-10 flex-1 text-center text-[10px] xl:text-xs font-extrabold tracking-wider transition-colors duration-300 ${
                lang === "EN" ? "text-white" : "text-[#C6112F]"
              }`}
            >
              EN
            </span>
            {/* FR Label */}
            <span
              className={`relative z-10 flex-1 text-center text-[10px] xl:text-xs font-extrabold tracking-wider transition-colors duration-300 ${
                lang === "FR" ? "text-white" : "text-[#C6112F]"
              }`}
            >
              FR
            </span>
          </button>

          {/* REGISTER HERE Button */}
          <Link
            href="/register"
            className="px-5 py-2.5 xl:px-6 xl:py-2.5 rounded-lg bg-[#C6112F] hover:bg-[#a80d26] text-white text-[11px] xl:text-xs font-extrabold tracking-wider uppercase inline-flex items-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>{t("nav-register", "REGISTER HERE")}</span>
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-neutral-900 hover:text-[#C6112F] focus:outline-none transition-colors"
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

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-md border-b border-neutral-200 shadow-xl px-6 py-6 flex flex-col gap-5 animate-fadeIn max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() => {
                        if (link.dropdownType === "about") setMobileAboutOpen(!mobileAboutOpen);
                        if (link.dropdownType === "programs") setMobileProgramsOpen(!mobileProgramsOpen);
                      }}
                      className="w-full flex items-center justify-between py-2.5 text-sm font-extrabold tracking-wider uppercase text-neutral-800 hover:text-[#C6112F] transition-colors"
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          (link.dropdownType === "about" && mobileAboutOpen) || (link.dropdownType === "programs" && mobileProgramsOpen)
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
                        {aboutDropdown.map((item) => (
                          <Link
                            key={item.titleKey}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 py-2 text-sm font-semibold text-neutral-700 hover:text-[#C6112F] transition-colors"
                          >
                            <span className="text-[#C6112F]">{item.icon}</span>
                            <span>{t(item.titleKey, item.titleDefault)}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    {link.dropdownType === "programs" && mobileProgramsOpen && (
                      <div className="pl-4 flex flex-col gap-1 mb-2 border-l-2 border-[#C6112F]/20">
                        {programsDropdown.map((item) => (
                          <Link
                            key={item.titleKey}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 py-2 text-sm font-semibold text-neutral-700 hover:text-[#C6112F] transition-colors"
                          >
                            <span className="text-[#C6112F]">{item.icon}</span>
                            <span>{t(item.titleKey, item.titleDefault)}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : link.isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="py-2.5 text-sm font-extrabold tracking-wider uppercase transition-colors block text-neutral-800 hover:text-[#C6112F]"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`py-2.5 text-sm font-extrabold tracking-wider uppercase transition-colors block ${
                      link.active ? "text-[#C6112F]" : "text-neutral-800 hover:text-[#C6112F]"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            {/* Mobile Language Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang("EN")}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  lang === "EN" ? "bg-[#C6112F] text-white" : "bg-neutral-100 text-neutral-700"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("FR")}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  lang === "FR" ? "bg-[#C6112F] text-white" : "bg-neutral-100 text-neutral-700"
                }`}
              >
                FR
              </button>
            </div>

            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 rounded-lg bg-[#C6112F] text-white text-xs font-extrabold tracking-wider uppercase text-center"
            >
              {t("nav-register", "REGISTER HERE")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
