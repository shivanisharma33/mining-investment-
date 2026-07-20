"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav-home", "HOME"), href: "#", active: true },
    { name: t("nav-about", "ABOUT"), href: "#" },
    { name: t("nav-programs", "PROGRAMS"), href: "#" },
    { name: t("nav-past-years", "PAST YEARS"), href: "#" },
    { name: t("nav-snapshot", "THE SNAPSHOT REPORT"), href: "#" },
    { name: t("nav-gallery", "GALLERY"), href: "#" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-[#C6112F]/80 ${
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
            <Link
              key={link.name}
              href={link.href}
              className={`relative py-1 text-[11px] xl:text-sm font-extrabold tracking-wide xl:tracking-wider whitespace-nowrap uppercase transition-colors duration-200 group ${
                link.active ? "text-[#C6112F]" : "text-neutral-900 hover:text-[#C6112F]"
              }`}
            >
              <span>{link.name}</span>
              {/* Animated Underline Effect */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#C6112F] transition-all duration-300 ${
                  link.active ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
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
            href="#"
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-md border-b border-neutral-200 shadow-xl px-6 py-6 flex flex-col gap-5 animate-fadeIn">
          <nav className="flex flex-col gap-3.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-1 text-sm font-extrabold tracking-wider uppercase transition-colors ${
                  link.active ? "text-[#C6112F]" : "text-neutral-800 hover:text-[#C6112F]"
                }`}
              >
                {link.name}
              </Link>
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
