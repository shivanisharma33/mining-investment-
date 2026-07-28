"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import FeaturedPartners from "@/components/FeaturedPartners";
import { useLanguage } from "@/context/LanguageContext";

interface RawNewsItem {
  id: string;
  tagCategory: string;
  dateEN: string;
  dateFR: string;
  headlineEN: string;
  headlineFR: string;
  snippetEN: string;
  snippetFR: string;
  fullBodyEN?: string;
  fullBodyFR?: string;
  image?: string;
}

const tagTranslations: Record<string, { EN: string; FR: string }> = {
  All: { EN: "All News", FR: "Toutes les nouvelles" },
  Announcement: { EN: "Announcement", FR: "Annonce" },
  Issuers: { EN: "Issuers", FR: "Émetteurs" },
  Students: { EN: "Students", FR: "Étudiants" },
  "Save the Date": { EN: "Save the Date", FR: "Réservez la date" },
  Participants: { EN: "Participants", FR: "Participants" },
  Speakers: { EN: "Speakers", FR: "Conférenciers" },
  Keynote: { EN: "Keynote", FR: "Conférence" },
  "SHE-CO": { EN: "SHE-CO", FR: "SHE-CO" },
  "Issuer Update": { EN: "Issuer Update", FR: "Mise à jour émetteur" },
};

const rawNewsData: RawNewsItem[] = [
  {
    id: "1",
    tagCategory: "Announcement",
    dateEN: "Apr 14, 2026",
    dateFR: "14 avril 2026",
    headlineEN: "Keynote Speakers and Panels Announcement",
    headlineFR: "Annonce des conférenciers principaux et des panels",
    snippetEN: "THE Mining Investment Event announces its keynote speakers and panel line-up for the 2026 conference in Quebec City.",
    snippetFR: "THE Mining Investment Event annonce ses conférenciers principaux et la liste des panels pour la conférence 2026 à Québec.",
    fullBodyEN: "THE Mining Investment Event of the North is pleased to announce its distinguished keynote speakers and executive panel line-up for the upcoming 2026 conference at the Centre des congrès de Québec. Featuring top industry leaders, government officials, and institutional investors, the 2026 program addresses key trends in critical minerals, ESG innovation, capital markets, and global resource development.",
    fullBodyFR: "THE Mining Investment Event of the North est heureux d'annoncer ses conférenciers principaux et la liste des panels exécutifs pour la prochaine conférence 2026 au Centre des congrès de Québec.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200",
  },
  {
    id: "2",
    tagCategory: "Issuers",
    dateEN: "Feb 19, 2026",
    dateFR: "19 février 2026",
    headlineEN: "THE Mining Investment Event Announces 2026 Issuers and Welcomes Partners",
    headlineFR: "THE Mining Investment Event annonce les émetteurs 2026 et accueille ses partenaires",
    snippetEN: "THE Mining Investment Event unveils its 2026 issuer roster and welcomes new and returning partners ahead of the conference in Quebec City.",
    snippetFR: "THE Mining Investment Event dévoile sa liste d'émetteurs 2026 et accueille ses partenaires nouveaux et renouvelés avant la conférence à Québec.",
    fullBodyEN: "Organizers of THE Mining Investment Event are proud to unveil the initial lineup of participating public mining companies and sponsors for the 2026 edition in Quebec City.",
    fullBodyFR: "Les organisateurs de THE Mining Investment Event sont fiers de dévoiler la liste initiale des sociétés minières cotées et des commanditaires participants pour l'édition 2026 à Québec.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200",
  },
  {
    id: "3",
    tagCategory: "Announcement",
    dateEN: "Oct 8, 2025",
    dateFR: "8 octobre 2025",
    headlineEN: "In Collaboration with ITFA and AMQ, Announces International Mining Week in Quebec City",
    headlineFR: "En collaboration avec l'ITFA et l'AMQ, annonce la Semaine internationale des mines à Québec",
    snippetEN: "THE Mining Investment Event, in collaboration with ITFA and AMQ, announces International Mining Week in Quebec City.",
    snippetFR: "THE Mining Investment Event, en collaboration avec l'ITFA et l'AMQ, annonce la Semaine internationale des mines à Québec.",
    fullBodyEN: "THE Mining Investment Event, together with the International Trade and Finance Association (ITFA) and Association minière du Québec (AMQ), is thrilled to announce Quebec City's inaugural International Mining Week.",
    fullBodyFR: "THE Mining Investment Event, en collaboration avec l'Association internationale du commerce et de la finance (ITFA) et l'Association minière du Québec (AMQ), est ravi d'annoncer la première Semaine internationale des mines de Québec.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
  },
  {
    id: "4",
    tagCategory: "Students",
    dateEN: "Jul 9, 2025",
    dateFR: "9 juillet 2025",
    headlineEN: "THE Mining Investment Event Announces 2025 Glencore Student Program Awards",
    headlineFR: "Annonce des lauréats du programme étudiant Glencore 2025",
    snippetEN: "THE Event is proud to announce the recipients of the 2025 Glencore Student Program Awards, recognizing outstanding students from universities across Canada.",
    snippetFR: "THE Event est fier d'annoncer les récipiendaires des prix du programme étudiant Glencore 2025, soulignant l'excellence d'étudiants d'universités canadiennes.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200",
  },
  {
    id: "5",
    tagCategory: "Save the Date",
    dateEN: "Jun 12, 2025",
    dateFR: "12 juin 2025",
    headlineEN: "THE Mining Investment Event – SAVE THE DATE: Quebec City, June 1–3, 2027",
    headlineFR: "THE Mining Investment Event – RÉSERVEZ LA DATE : Québec, 1–3 juin 2027",
    snippetEN: "Mark your calendars — THE Mining Investment Event returns to Quebec City, June 1–3, 2027 at the Centre des congrès de Québec.",
    snippetFR: "Inscrivez la date à vos agendas — THE Mining Investment Event revient à Québec du 1er au 3 juin 2027 au Centre des congrès de Québec.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200",
  },
  {
    id: "6",
    tagCategory: "Participants",
    dateEN: "Feb 13, 2025",
    dateFR: "13 février 2025",
    headlineEN: "Quebec City — Announces 2025 Participants, Welcomes New & Returning Sponsors",
    headlineFR: "Québec — Annonce les participants 2025 et accueille ses commanditaires",
    snippetEN: "THE Mining Investment Event announces its 2025 participant line-up and welcomes new and returning sponsors for the Quebec City conference.",
    snippetFR: "THE Mining Investment Event dévoile la liste de ses participants 2025 et accueille les commanditaires nouveaux et fidèles pour la conférence de Québec.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200",
  },
];

const heroSlides = [
  {
    id: "hero-1",
    featuredTag: "FEATURED",
    headlineEN: "Global Mining Investment Hits New High in 2025",
    headlineFR: "L'investissement minier mondial atteint un nouveau sommet en 2025",
    snippetEN: "Exploration spending rises across gold, copper and critical minerals as investor confidence strengthens.",
    snippetFR: "Les dépenses d'exploration augmentent dans l'or, le cuivre et les minéraux critiques avec la confiance des investisseurs.",
    image: "/news/hero_1.png",
    buttonTextEN: "READ FULL STORY",
    buttonTextFR: "LIRE L'HISTOIRE COMPLÈTE",
  },
  {
    id: "hero-2",
    featuredTag: "FEATURED",
    headlineEN: "International Mining Week Announced for Quebec City",
    headlineFR: "Annonce de la Semaine internationale des mines à Québec",
    snippetEN: "Global mining leaders, institutional investors and policymakers unite for Canada's premier capital markets conference.",
    snippetFR: "Les dirigeants miniers mondiaux, investisseurs institutionnels et décideurs réunis à Québec.",
    image: "/news/hero_2.png",
    buttonTextEN: "READ FULL STORY",
    buttonTextFR: "LIRE L'HISTOIRE COMPLÈTE",
  },
  {
    id: "hero-3",
    featuredTag: "FEATURED",
    headlineEN: "Glencore & Osisko Expand Student Sponsorship Program",
    headlineFR: "Glencore et Osisko élargissent le programme de bourse étudiante",
    snippetEN: "Empowering the next generation of geology, engineering, and finance leaders across North American universities.",
    snippetFR: "Soutenir la prochaine génération de leaders en géologie, génie et finance dans les universités.",
    image: "/news/hero_3.png",
    buttonTextEN: "READ FULL STORY",
    buttonTextFR: "LIRE L'HISTOIRE COMPLÈTE",
  },
];

function HeroNewsSlider({
  setActiveModalItem,
  lang,
}: {
  setActiveModalItem: (item: RawNewsItem) => void;
  lang: string;
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const current = heroSlides[currentIndex];

  return (
    <div className="relative w-full bg-[#f6f7f9] border border-neutral-300/80 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-14 min-h-[360px] sm:min-h-[400px] flex flex-col justify-between overflow-hidden shadow-xs">
      {/* Right Side Crisp Image Container */}
      <div
        className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 bg-cover bg-center transition-all duration-700 opacity-60 md:opacity-90"
        style={{ backgroundImage: `url(${current.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#f6f7f9] via-[#f6f7f9]/80 to-transparent" />
      </div>

      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous Story"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 hover:border-neutral-800 text-neutral-800 flex items-center justify-center shadow-sm transition-all z-20 cursor-pointer"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        aria-label="Next Story"
        className="absolute right-3 sm:left-auto right-3 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 hover:border-neutral-800 text-neutral-800 flex items-center justify-center shadow-sm transition-all z-20 cursor-pointer"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-xl pl-6 sm:pl-10 pr-6 sm:pr-10 my-auto">
        <span className="text-[#C6112F] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-3">
          {current.featuredTag}
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-[#1f2430] tracking-tight leading-[1.18] mb-4">
          {lang === "FR" ? current.headlineFR : current.headlineEN}
        </h2>
        <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
        <p className="text-neutral-600 text-xs sm:text-base font-medium leading-relaxed mb-6">
          {lang === "FR" ? current.snippetFR : current.snippetEN}
        </p>
        <button
          onClick={() => {
            router.push(`/news/${current.id || "1"}`);
          }}
          className="bg-[#C6112F] hover:bg-[#a50e27] text-white px-6 py-3.5 rounded-lg text-xs font-black tracking-widest uppercase shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center justify-center"
        >
          {lang === "FR" ? current.buttonTextFR : current.buttonTextEN}
        </button>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="relative z-10 flex justify-center items-center gap-2.5 pt-4">
        {heroSlides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer ${idx === currentIndex
              ? "w-3 h-3 rounded-full bg-[#C6112F] scale-110"
              : "w-2.5 h-2.5 rounded-full bg-neutral-300 hover:bg-neutral-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

const bannerSlides = [
  {
    id: "banner-1",
    title: "Global Mining Capital Markets Summit",
    subtitle: "Connecting Issuers, Investors & Global Mining Leaders",
    image: "/news/banner_1.png",
  },
  {
    id: "banner-2",
    title: "Critical Minerals & ESG Innovation Showcase",
    subtitle: "Shaping the Future of Sustainable Mining & Energy Transition",
    image: "/news/banner_2.png",
  },
  {
    id: "banner-3",
    title: "Quebec City Convention & Executive Networking",
    subtitle: "Canada's Premier Mining Investment Gathering",
    image: "/news/banner_3.png",
  },
];

function FeaturedPartnersBanner() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
  };

  const currentBanner = bannerSlides[currentBannerIndex];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header text from mockup */}
      <span className="text-[#C6112F] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase text-center block mb-2">
        FEATURED
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1f2430] text-center mb-3 tracking-tight">
        Featured Partners
      </h2>
      <div className="w-16 h-[3px] bg-[#C6112F] mx-auto rounded-full mb-4" />
      <p className="text-neutral-600 text-xs sm:text-sm text-center font-medium max-w-xl mx-auto mb-10 leading-relaxed">
        A spotlight on the partners powering THE Mining Investment Event.
        <br />
        Switch tiers to explore each circle of supporters.
      </p>

      {/* Banner Carousel Container with Side Arrows */}
      <div className="w-full flex items-center justify-between gap-3 sm:gap-6">
        {/* Left Circular Arrow */}
        <button
          onClick={prevBanner}
          aria-label="Previous Partner Banner"
          className="w-10 h-10 rounded-full border-2 border-[#C6112F] text-[#C6112F] hover:bg-[#C6112F] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs shrink-0 z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        {/* Center Full Image Banner Box */}
        <div className="w-full bg-[#e5e7eb] border border-neutral-300/80 rounded-2xl sm:rounded-3xl shadow-sm relative overflow-hidden flex items-center justify-center h-[260px] sm:h-[340px] md:h-[380px] group transition-all">
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white z-10 text-left">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#C6112F] bg-white/95 px-3 py-1 rounded-md inline-block mb-2 shadow-sm">
              {currentBanner.subtitle}
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white leading-tight drop-shadow-sm">
              {currentBanner.title}
            </h3>
          </div>
        </div>

        {/* Right Circular Arrow */}
        <button
          onClick={nextBanner}
          aria-label="Next Partner Banner"
          className="w-10 h-10 rounded-full border-2 border-[#C6112F] text-[#C6112F] hover:bg-[#C6112F] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs shrink-0 z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex justify-center items-center gap-2.5 mt-8">
        {bannerSlides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentBannerIndex(idx)}
            aria-label={`Go to banner ${idx + 1}`}
            className={`transition-all duration-300 cursor-pointer ${idx === currentBannerIndex
              ? "w-3 h-3 rounded-full bg-[#C6112F] scale-110"
              : "w-2.5 h-2.5 rounded-full bg-neutral-300 hover:bg-neutral-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

const latestMiningArticles = [
  {
    id: "mining-1",
    category: "GOLD",
    title: "Major Gold Discovery Reported in Northern Ontario",
    date: "May 20, 2025",
    readTime: "5 min read",
    snippet: "The discovery could add significant ounces to Canada's resource base and attract new investment into the region.",
    image: "/news/gold_discovery.png",
    featured: true,
  },
  {
    id: "mining-2",
    category: "COPPER",
    title: "New Copper Project Advances in Chile",
    date: "May 20, 2025",
    readTime: "5 min read",
    snippet: "Feasibility studies confirm robust economic returns for greenfield copper deposit.",
    image: "/news/copper_mine.png",
  },
  {
    id: "mining-3",
    category: "BASE METALS",
    title: "Mining M&A Activity Picks Up in Q2",
    date: "May 20, 2025",
    readTime: "5 min read",
    snippet: "Consolidation trends drive strategic acquisitions across North American exploration companies.",
    image: "/news/mining_ma.png",
  },
  {
    id: "mining-4",
    category: "GOLD",
    title: "Silver Market Sees Strong Momentum",
    date: "May 20, 2025",
    readTime: "5 min read",
    snippet: "Industrial demand and precious metal safe-haven inflows push silver prices higher.",
    image: "/news/silver_market.png",
  },
  {
    id: "mining-5",
    category: "CRITICAL MINERALS",
    title: "Critical Minerals Key to Energy Transition",
    date: "May 20, 2025",
    readTime: "5 min read",
    snippet: "Policy support strengthens North American supply chain independence for lithium, nickel & cobalt.",
    image: "/news/critical_minerals.png",
  },
];

function LatestMiningSection({
  setActiveModalItem,
}: {
  setActiveModalItem: (item: any) => void;
}) {
  const router = useRouter();
  const [selectedMiningCat, setSelectedMiningCat] = useState("ALL");

  const categories = ["ALL", "GOLD", "COPPER", "CRITICAL MINERALS", "BASE METALS", "EXPLORATION"];

  const filteredArticles = latestMiningArticles.filter((art) => {
    if (selectedMiningCat === "ALL") return true;
    return art.category === selectedMiningCat;
  });

  const featuredArticle = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const gridArticles = filteredArticles.filter((a) => a.id !== (featuredArticle?.id || "")).slice(0, 4);

  return (
    <div className="w-full flex flex-col">
      {/* Header Row from Mockup */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-300">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f2430] uppercase tracking-tight">
          THE LATEST - MINING
        </h2>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {categories.map((cat) => {
            const isSelected = selectedMiningCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedMiningCat(cat)}
                className={`text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer ${isSelected
                  ? "px-3.5 py-1 rounded-full text-[#C6112F] border border-[#C6112F] bg-rose-50 shadow-2xs"
                  : "text-neutral-600 hover:text-[#C6112F] px-2 py-1"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Highlight Card (Top Row - Split Layout) */}
      {featuredArticle && (
        <div className="my-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all">
          <div className="md:col-span-5 w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <h3
              onClick={() => router.push(`/news/${featuredArticle.id}`)}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1f2430] tracking-tight leading-tight mb-2 hover:text-[#C6112F] cursor-pointer transition-colors"
            >
              {featuredArticle.title}
            </h3>

            <div className="w-14 h-[3px] bg-[#C6112F] rounded-full my-3" />

            <span className="text-[#C6112F] text-xs font-bold mb-3 block">
              {featuredArticle.date} &nbsp;.&nbsp; {featuredArticle.readTime}
            </span>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 font-medium max-w-xl">
              {featuredArticle.snippet}
            </p>

            <div>
              <button
                onClick={() => router.push(`/news/${featuredArticle.id}`)}
                className="text-[#C6112F] text-xs font-black tracking-widest uppercase hover:underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>READ MORE</span>
                <span>&gt;</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4-Column Grid Below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {gridArticles.map((item) => (
          <article
            key={item.id}
            onClick={() => router.push(`/news/${item.id}`)}
            className="group cursor-pointer flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-3 bg-neutral-200 border border-neutral-200/80">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-[#1f2430] leading-snug mb-2 group-hover:text-[#C6112F] transition-colors">
                {item.title}
              </h4>
            </div>

            <span className="text-[#C6112F] text-xs font-bold mt-2">
              {item.date} &nbsp;.&nbsp; {item.readTime}
            </span>
          </article>
        ))}
      </div>

      {/* Bottom Center Button & Divider Line */}
      <div className="flex flex-col items-center pt-4 pb-8 border-b border-neutral-300">
        <button
          onClick={() => setSelectedMiningCat("ALL")}
          className="bg-[#C6112F] hover:bg-[#a50e27] text-white px-8 py-3.5 rounded-lg text-xs font-black tracking-widest uppercase shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          VIEW ALL MINING NEWS
        </button>
      </div>
    </div>
  );
}

function EventByTheNumbers() {
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(4); // default 2026
  const [activeLegend, setActiveLegend] = useState<{
    name: string;
    percent: string;
    color: string;
    desc: string;
  } | null>(null);

  const [flipDegree, setFlipDegree] = useState<number>(0);
  const [hasFlippedOnScroll, setHasFlippedOnScroll] = useState<boolean>(false);
  const donutRef = useRef<HTMLDivElement>(null);

  const legendItems = [
    { name: "Family Offices", percent: "20%", color: "#C6112F", desc: "Long-term private equity partners" },
    { name: "HNW Investors", percent: "25%", color: "#6366f1", desc: "Accredited high net worth investors" },
    { name: "Retail Investors", percent: "10%", color: "#06b6d4", desc: "Public market liquidity & market buyers" },
    { name: "Resource Funds", percent: "25%", color: "#f59e0b", desc: "Mining & energy transition institutional funds" },
    { name: "Buy Side", percent: "20%", color: "#374151", desc: "Asset managers & corporate development" },
  ];

  const currentDisplayLegend = activeLegend || legendItems[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFlippedOnScroll) {
            setHasFlippedOnScroll(true);
            // Trigger 360-degree 3D flip animation when scrolling into section
            setFlipDegree((prev) => prev + 360);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (donutRef.current) {
      observer.observe(donutRef.current);
    }

    return () => observer.disconnect();
  }, [hasFlippedOnScroll]);

  const Y_AXIS_MAX = 1450;
  const yearlyData = [
    { year: 2022, total: 250, investors: 61, delegates: 189, heightPct: Math.round((250 / Y_AXIS_MAX) * 100), yoy: "+0%" },
    { year: 2023, total: 600, investors: 200, delegates: 400, heightPct: Math.round((600 / Y_AXIS_MAX) * 100), yoy: "+140%" },
    { year: 2024, total: 800, investors: 260, delegates: 540, heightPct: Math.round((800 / Y_AXIS_MAX) * 100), yoy: "+33%" },
    { year: 2025, total: 1045, investors: 300, delegates: 745, heightPct: Math.round((1045 / Y_AXIS_MAX) * 100), yoy: "+31%" },
    { year: 2026, total: 1400, investors: 350, delegates: 1050, heightPct: Math.round((1400 / Y_AXIS_MAX) * 100), yoy: "+38%", highlight: "38% Y-O-Y" },
  ];

  const selectedYear = yearlyData[selectedYearIndex];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header from mockup */}
      <span className="text-[#C6112F] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase text-center block mb-2">
        THE EVENT 2026
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1f2430] text-center mb-3 tracking-tight">
        The Event by the Numbers
      </h2>
      <div className="w-16 h-[3px] bg-[#C6112F] mx-auto rounded-full mb-4" />
      <p className="text-neutral-600 text-xs sm:text-sm text-center font-medium max-w-xl mx-auto mb-10 leading-relaxed">
        A global platform connecting investors, companies, and leaders driving the future of mining and resource investment.
      </p>

      {/* Top Stats Bar Container (5 Key Numbers) */}
      <div className="w-full bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border border-neutral-300/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center divide-y md:divide-y-0 md:divide-x divide-neutral-200/90 mb-10">
        {/* Stat 1 */}
        <div className="w-full flex flex-col items-center justify-center p-3 text-center group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-rose-50/80 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] shadow-2xs group-hover:bg-[#C6112F] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#1f2430] mt-3 mb-1 group-hover:text-[#C6112F] transition-colors">15+</span>
          <span className="text-[#C6112F] text-[10px] font-extrabold tracking-widest uppercase">YEARS OF EXCELLENCE</span>
        </div>

        {/* Stat 2 */}
        <div className="w-full flex flex-col items-center justify-center p-3 text-center pt-6 md:pt-3 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-rose-50/80 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] shadow-2xs group-hover:bg-[#C6112F] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#1f2430] mt-3 mb-1 group-hover:text-[#C6112F] transition-colors">500+</span>
          <span className="text-[#C6112F] text-[10px] font-extrabold tracking-widest uppercase">INVESTORS ATTENDING</span>
        </div>

        {/* Stat 3 */}
        <div className="w-full flex flex-col items-center justify-center p-3 text-center pt-6 md:pt-3 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-rose-50/80 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] shadow-2xs group-hover:bg-[#C6112F] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25m16.5 0v3.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-3.25" />
            </svg>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#1f2430] mt-3 mb-1 group-hover:text-[#C6112F] transition-colors">300+</span>
          <span className="text-[#C6112F] text-[10px] font-extrabold tracking-widest uppercase">MINING COMPANIES PARTICIPATING</span>
        </div>

        {/* Stat 4 */}
        <div className="w-full flex flex-col items-center justify-center p-3 text-center pt-6 md:pt-3 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-rose-50/80 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] shadow-2xs group-hover:bg-[#C6112F] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z" />
            </svg>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#1f2430] mt-3 mb-1 group-hover:text-[#C6112F] transition-colors">50+</span>
          <span className="text-[#C6112F] text-[10px] font-extrabold tracking-widest uppercase">COUNTRIES REPRESENTED</span>
        </div>

        {/* Stat 5 */}
        <div className="w-full flex flex-col items-center justify-center p-3 text-center pt-6 md:pt-3 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-rose-50/80 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] shadow-2xs group-hover:bg-[#C6112F] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m10.5 0a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 9m15 0v11.25A2.25 2.25 0 0117.25 22.5H6.75A2.25 2.25 0 014.5 20.25V9" />
            </svg>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-[#1f2430] mt-3 mb-1 group-hover:text-[#C6112F] transition-colors">12,000+</span>
          <span className="text-[#C6112F] text-[10px] font-extrabold tracking-widest uppercase">MEETINGS HELD</span>
        </div>
      </div>

      {/* Two-Column Lower Cards (Growth & Investor Profile) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card: Growth Profile */}
        <div className="bg-[#f0f2f5] border border-neutral-300/90 hover:border-[#C6112F]/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left transition-all duration-300 shadow-xs hover:shadow-md">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#C6112F] font-bold text-xs tracking-widest uppercase block">
                GROWTH OVER TIME
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C6112F]/10 text-[#C6112F] text-[10px] font-black uppercase tracking-wider animate-pulse">
                5X EXPANSION
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1f2430] mb-2">
              Growth Profile - 500%
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm font-medium mb-4">
              Strong and consistent growth in delegates and investor participation.
            </p>

            {/* Interactive Year Selector Tabs */}
            <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
              {yearlyData.map((d, idx) => {
                const isSelected = selectedYearIndex === idx;
                return (
                  <button
                    key={d.year}
                    onClick={() => setSelectedYearIndex(idx)}
                    onMouseEnter={() => setSelectedYearIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${isSelected
                      ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20 scale-105"
                      : "bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200/80"
                      }`}
                  >
                    {d.year}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bar Chart Container with Y-Axis Gridlines */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-2xs relative">
            {/* Chart Legend & Selected Year Detail Banner */}
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 mb-5 flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-bold text-neutral-700">
                  <span className="w-3 h-3 rounded-xs bg-gradient-to-t from-slate-400 to-slate-200 inline-block shadow-2xs border border-slate-300" />
                  Delegates
                </span>
                <span className="flex items-center gap-1.5 font-bold text-[#C6112F]">
                  <span className="w-3 h-3 rounded-xs bg-gradient-to-t from-[#C6112F] to-[#ff4d6d] inline-block shadow-2xs" />
                  Investors
                </span>
              </div>

              <div className="flex items-center gap-2 bg-rose-50 border border-[#C6112F]/30 px-3 py-1 rounded-xl text-[11px] font-extrabold text-[#C6112F] shadow-2xs">
                <span>{selectedYear.year}:</span>
                <span>{selectedYear.total} Total</span>
                <span className="text-neutral-300 font-normal">|</span>
                <span>{selectedYear.investors} Investors</span>
                <span className="bg-[#C6112F] text-white text-[9px] px-1.5 py-0.5 rounded-md ml-1 font-black shadow-xs">
                  {selectedYear.yoy}
                </span>
              </div>
            </div>

            {/* Stacked Bars Container with Gridlines & Y-Axis */}
            <div className="relative h-96 pt-6 pb-2 pl-8 pr-2 flex items-end justify-between gap-3 border-b border-neutral-200">
              {/* Background Gridlines */}
              <div className="absolute inset-0 pl-8 pr-2 pointer-events-none flex flex-col justify-between py-2">
                {[1400, 1000, 600, 200, 0].map((val) => (
                  <div key={val} className="w-full flex items-center gap-2">
                    <span className="text-[9px] font-bold text-neutral-400 w-5 text-right shrink-0">
                      {val}
                    </span>
                    <div className="w-full border-b border-dashed border-neutral-200/80" />
                  </div>
                ))}
              </div>

              {/* Interactive Stacked 3D Metallic Pillars */}
              {yearlyData.map((d, idx) => {
                const isSelected = selectedYearIndex === idx;
                return (
                  <div
                    key={d.year}
                    onClick={() => setSelectedYearIndex(idx)}
                    onMouseEnter={() => setSelectedYearIndex(idx)}
                    className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer relative z-10"
                  >
                    {/* Y-O-Y Badge */}
                    {d.highlight && (
                      <span className="text-[#C6112F] text-[9px] font-black bg-rose-50 border border-[#C6112F]/40 px-2 py-0.5 rounded-full mb-1 shadow-xs animate-bounce">
                        {d.highlight}
                      </span>
                    )}

                    {/* Number on top */}
                    <span
                      className={`text-[10px] font-bold mb-1 transition-all duration-300 ${isSelected ? "text-[#C6112F] font-black scale-110" : "text-neutral-500"
                        }`}
                    >
                      {d.total}
                    </span>

                    {/* 3D Metallic Glass Pillar Container */}
                    <div
                      className={`w-full max-w-[36px] sm:max-w-[42px] bg-gradient-to-t from-slate-400 via-slate-300 to-slate-200 rounded-t-lg relative flex flex-col justify-end overflow-hidden origin-bottom transition-all duration-700 ease-out shadow-sm group-hover:scale-105 group-hover:shadow-md border border-slate-300/80 ${isSelected
                          ? "ring-2 ring-[#C6112F] shadow-[0_10px_25px_rgba(198,17,47,0.3)] scale-105"
                          : ""
                        }`}
                      style={{
                        height: `${d.heightPct}%`,
                      }}
                    >
                      {/* Glossy 3D Highlight Strip */}
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-white/40 z-20 pointer-events-none" />

                      {/* Investor Segment (Ruby Red Gradient Bottom) */}
                      <div
                        className="w-full bg-gradient-to-t from-[#900B21] via-[#C6112F] to-[#ff4d6d] flex items-center justify-center transition-all duration-700 ease-out shadow-inner origin-bottom border-t border-white/30"
                        style={{ height: `${(d.investors / d.total) * 100}%` }}
                      >
                        <span className="text-[8px] font-black text-white tracking-tighter shadow-xs">
                          {d.investors}
                        </span>
                      </div>
                    </div>

                    {/* Year Label */}
                    <span
                      className={`text-[11px] font-bold mt-2.5 transition-all duration-300 ${isSelected ? "text-[#C6112F] font-black scale-110" : "text-neutral-600"
                        }`}
                    >
                      {d.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Card: Diverse Investor Mix */}
        <div className="bg-[#f0f2f5] border border-neutral-300/90 hover:border-[#C6112F]/40 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left transition-all duration-300 shadow-xs hover:shadow-md">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#C6112F] font-bold text-xs tracking-widest uppercase block">
                INVESTOR PROFILE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-[10px] font-black uppercase tracking-wider animate-pulse">
                BALANCED MIX
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1f2430] mb-2">
              Diverse Investor Mix
            </h3>
            <div className="w-14 h-[3px] bg-[#C6112F] rounded-full my-2" />
            <p className="text-neutral-600 text-xs sm:text-sm font-medium mb-6">
              A balanced mix of investor types driving meaningful connections and investment opportunities.
            </p>
          </div>

          {/* Donut Chart Container with SVG 3D Depth & Orbiting Satellites */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 shadow-2xs flex flex-col items-center justify-center gap-6">
            {/* Ultra-Realistic 3D SVG Donut Chart Callout */}
            <div
              ref={donutRef}
              className="relative flex items-center justify-center p-3"
            >
              {/* Outer Dashed Orbit Ring */}
              <div className="absolute -inset-3.5 rounded-full border-2 border-dashed border-[#C6112F]/30 animate-[spin_20s_linear_infinite] pointer-events-none" />

              {/* Reverse Inner Orbit Ring */}
              <div className="absolute -inset-1.5 rounded-full border border-indigo-400/30 animate-[spin_14s_linear_infinite_reverse] pointer-events-none" />

              {/* Orbiting Glowing Satellite Circle */}
              <div className="absolute -inset-2.5 rounded-full animate-[spin_8s_linear_infinite] pointer-events-none">
                <div className="w-3.5 h-3.5 rounded-full bg-[#C6112F] shadow-[0_0_14px_#C6112F] border-2 border-white -top-1.5 left-1/2 -translate-x-1/2 absolute" />
              </div>

              {/* Concentric Pulse Circles (Circle-on-Circle Animation) */}
              <div className="absolute w-40 h-40 rounded-full border-2 border-rose-300/30 animate-ping pointer-events-none opacity-40" />
              <div className="absolute w-44 h-44 rounded-full border border-[#C6112F]/20 animate-pulse pointer-events-none opacity-40" />

              {/* Vector SVG 3D Donut Chart */}
              <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform overflow-visible" viewBox="0 0 160 160">
                  <defs>
                    <filter id="donutShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.16" />
                    </filter>
                  </defs>

                  {/* Background Track Ring */}
                  <circle
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="22"
                    className="opacity-50"
                  />

                  {/* Interactive Slices with Stroke Dasharray (Circumference ~ 376.99) */}
                  {[
                    { name: "Family Offices", pct: 0.20, color: "#C6112F", dashLength: 75.4, dashOffset: 0 },
                    { name: "HNW Investors", pct: 0.25, color: "#6366f1", dashLength: 94.2, dashOffset: -75.4 },
                    { name: "Retail Investors", pct: 0.10, color: "#06b6d4", dashLength: 37.7, dashOffset: -169.6 },
                    { name: "Resource Funds", pct: 0.25, color: "#f59e0b", dashLength: 94.2, dashOffset: -207.3 },
                    { name: "Buy Side", pct: 0.20, color: "#374151", dashLength: 75.4, dashOffset: -301.5 },
                  ].map((slice, idx) => {
                    const isHovered = currentDisplayLegend.name === slice.name;
                    return (
                      <circle
                        key={slice.name}
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke={slice.color}
                        strokeWidth={isHovered ? "26" : "22"}
                        strokeDasharray={`${slice.dashLength - 2} ${376.99 - (slice.dashLength - 2)}`}
                        strokeDashoffset={slice.dashOffset}
                        filter="url(#donutShadow)"
                        className="transition-all duration-500 ease-out cursor-pointer"
                        style={{
                          opacity: isHovered ? 1 : 0.88,
                          transformOrigin: "center",
                          transform: isHovered ? "scale(1.06)" : "scale(1)",
                        }}
                        onClick={() => setActiveLegend(legendItems[idx])}
                        onMouseEnter={() => setActiveLegend(legendItems[idx])}
                      />
                    );
                  })}
                </svg>

                {/* Upright Glassmorphic Center Hole Dial */}
                <div className="absolute w-28 h-28 bg-white/95 backdrop-blur-md rounded-full flex flex-col items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.08)] text-center px-2 py-2 border border-neutral-200/90 z-20 group cursor-pointer transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-1.5 mb-2 bg-neutral-100/90 px-3 py-1 rounded-full border border-neutral-200/80 shadow-2xs">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-ping"
                      style={{ backgroundColor: currentDisplayLegend.color }}
                    />
                    <span className="text-xs font-black tracking-wider uppercase text-neutral-700">
                      {currentDisplayLegend.percent}
                    </span>
                  </div>

                  <span
                    className="text-4xl font-black leading-none mb-1 tracking-tight transition-colors duration-300"
                    style={{ color: currentDisplayLegend.color }}
                  >
                    {currentDisplayLegend.percent}
                  </span>
                  <span className="text-xs font-extrabold text-neutral-800 uppercase tracking-tight leading-tight text-center px-2">
                    {currentDisplayLegend.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Color Legend — grid row below chart */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full text-xs font-bold text-neutral-700">
              {legendItems.map((item) => {
                const isActive = currentDisplayLegend.name === item.name;
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setActiveLegend(item);
                      setFlipDegree((prev) => prev + 180);
                    }}
                    onMouseEnter={() => {
                      setActiveLegend(item);
                      setFlipDegree((prev) => prev + 180);
                    }}
                    onMouseLeave={() => setActiveLegend(null)}
                    className={`flex flex-col gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer border ${isActive
                      ? "bg-neutral-100/90 border-neutral-300 shadow-sm scale-105 text-[#1f2430]"
                      : "bg-white border-transparent hover:bg-neutral-50 hover:border-neutral-200"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-xs transition-transform shadow-2xs"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-extrabold">{item.name}</span>
                      </div>
                      <span
                        className="font-black text-xs ml-2"
                        style={{ color: item.color }}
                      >
                        {item.percent}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500 font-medium pl-5 line-clamp-1">
                      {item.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvertisingSubscriptionSection() {
  return (
    <div className="w-full flex flex-col text-left">
      {/* Header from mockup */}
      <span className="text-[#C6112F] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-2">
        ADVERTISING & SUBSCRIPTION
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1f2430] tracking-tight mb-3">
        THE News - Your Source for all Things Resource
      </h2>
      <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-3" />
      <p className="text-neutral-600 text-xs sm:text-sm font-medium max-w-xl mb-10 leading-relaxed">
        Promote your brand, share your story and connect with a global audience of resource industry leaders, investors and decision makers.
      </p>

      {/* Cards Layout */}
      <div className="flex flex-col gap-6">
        {/* Top Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: BASIC ANNUAL SUBSCRIPTION */}
          <div className="bg-[#f0f2f5] border border-neutral-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 transition-all">
            <div>
              <span className="text-[#C6112F] text-xs font-bold tracking-widest uppercase mb-4 block">
                BASIC ANNUAL SUBSCRIPTION
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#C6112F] mb-1">
                $1,200
              </div>
              <span className="text-neutral-600 text-xs font-bold mb-6 block">
                / 12 months
              </span>
            </div>

            <p className="text-neutral-600 text-xs leading-relaxed font-medium">
              Delivered to your in-box monthly with the latest resource news, from around the world or access the website as needed.
            </p>
          </div>

          {/* Card 2: CORPORATE SUBSCRIPTION */}
          <div className="bg-[#f0f2f5] border border-neutral-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 transition-all">
            <div>
              <span className="text-[#C6112F] text-xs font-bold tracking-widest uppercase mb-4 block">
                CORPORATE SUBSCRIPTION
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#C6112F] mb-1">
                $3,000
              </div>
              <span className="text-neutral-600 text-xs font-bold mb-4 block">
                / 12 months
              </span>
              <div className="w-12 h-[2px] bg-[#C6112F] mx-auto my-4" />
            </div>

            <p className="text-neutral-600 text-xs leading-relaxed font-medium">
              Your latest PR's & interviews distributed for 12 months Up to 6 press releases & 6 interviews
            </p>
          </div>

          {/* Card 3: SPONSOR LOGO */}
          <div className="bg-[#f0f2f5] border border-neutral-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 transition-all">
            <div>
              <span className="text-[#C6112F] text-xs font-bold tracking-widest uppercase mb-4 block">
                SPONSOR LOGO
              </span>

              <div className="mb-3">
                <div className="text-2xl sm:text-3xl font-black text-[#C6112F] leading-tight">
                  $1,500
                </div>
                <span className="text-neutral-600 text-xs font-bold">
                  / 3-month rotating banner
                </span>
              </div>

              <div className="mb-4">
                <div className="text-2xl sm:text-3xl font-black text-[#C6112F] leading-tight">
                  $2,500
                </div>
                <span className="text-neutral-600 text-xs font-bold">
                  / 6-month rotating banner
                </span>
              </div>

              <div className="w-12 h-[2px] bg-[#C6112F] mx-auto my-3" />
            </div>

            <p className="text-neutral-600 text-xs leading-relaxed font-medium">
              Your logo prominently featured as a sponsor of THE News with a clickable link to your website.
            </p>
          </div>
        </div>

        {/* Bottom Row: 2 Cards (Matching 2-column width on mockup) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-2/3 md:max-w-4xl">
          {/* Card 4: VID INTERVIEWS */}
          <div className="bg-[#f0f2f5] border border-neutral-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 transition-all">
            <div>
              <span className="text-[#C6112F] text-xs font-bold tracking-widest uppercase mb-4 block">
                VID INTERVIEWS
              </span>

              <div className="mb-2">
                <div className="text-2xl sm:text-3xl font-black text-[#C6112F] leading-tight">
                  $3,000
                </div>
                <span className="text-neutral-600 text-xs font-bold">
                  / interview
                </span>
              </div>

              <div className="mb-2">
                <div className="text-2xl sm:text-3xl font-black text-[#C6112F] leading-tight">
                  $6,000
                </div>
                <span className="text-neutral-600 text-xs font-bold">
                  / 3 interviews
                </span>
              </div>

              <div className="mb-4">
                <div className="text-2xl sm:text-3xl font-black text-[#C6112F] leading-tight">
                  $9,000
                </div>
                <span className="text-neutral-600 text-xs font-bold">
                  / 4 interviews
                </span>
              </div>
            </div>

            <p className="text-neutral-600 text-xs leading-relaxed font-medium pt-2">
              Moderated intro - 15 minutes each, Edited, sent across THE Event social platforms, included in THE News for up to 1 year. Used for quarterly updates, press releases/announcements.
            </p>
          </div>

          {/* Card 5: ADVERTISING */}
          <div className="bg-[#f0f2f5] border border-neutral-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-center shadow-2xs hover:shadow-md hover:border-[#C6112F]/40 transition-all">
            <div>
              <span className="text-[#C6112F] text-xs font-bold tracking-widest uppercase mb-4 block">
                ADVERTISING
              </span>

              <div className="mb-2">
                <div className="text-2xl sm:text-3xl font-black text-[#C6112F] leading-tight">
                  $1,000
                </div>
                <span className="text-neutral-600 text-xs font-bold">
                  / 3-month rotating banner
                </span>
              </div>

              <div className="mb-2">
                <div className="text-2xl sm:text-3xl font-black text-[#C6112F] leading-tight">
                  $3,000
                </div>
                <span className="text-neutral-600 text-xs font-bold">
                  / 6-month rotating banner
                </span>
              </div>

              <div className="mb-4">
                <div className="text-2xl sm:text-3xl font-black text-[#C6112F] leading-tight">
                  $5,000
                </div>
                <span className="text-neutral-600 text-xs font-bold">
                  / 12-month rotating banner
                </span>
              </div>
            </div>

            <p className="text-neutral-600 text-xs leading-relaxed font-medium pt-2">
              We provide the specs you provide us with artwork to publish. Maximum of four companies per rotation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const { t, lang } = useLanguage();
  const [selectedTagCategory, setSelectedTagCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalItem, setActiveModalItem] = useState<RawNewsItem | null>(null);

  const categories = ["All", ...Array.from(new Set(rawNewsData.map((n) => n.tagCategory)))];

  const filteredRaw = rawNewsData.filter((item) => {
    const matchesCategory = selectedTagCategory === "All" || item.tagCategory === selectedTagCategory;
    const headline = lang === "FR" ? item.headlineFR : item.headlineEN;
    const snippet = lang === "FR" ? item.snippetFR : item.snippetEN;
    const matchesSearch =
      searchQuery.trim() === "" ||
      headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f4f7fa] pb-16 sm:pb-24">
        {/* ═══════ HERO SLIDER SECTION ═══════ */}
        <section className="relative w-full pt-28 sm:pt-36 pb-8 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <HeroNewsSlider setActiveModalItem={setActiveModalItem} lang={lang} />
        </section>

        {/* ═══════ SECTION 2: FEATURED PARTNERS BANNER (EXACT MOCKUP MATCH) ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <FeaturedPartnersBanner />
        </section>

        {/* ═══════ SECTION 2B: SPONSORS TIER GRID ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <FeaturedPartners />
        </section>

        {/* ═══════ SECTION 3: THE LATEST - MINING (EXACT MOCKUP MATCH) ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <LatestMiningSection setActiveModalItem={setActiveModalItem} />
        </section>

        {/* ═══════ SECTION 4: THE EVENT BY THE NUMBERS (EXACT MOCKUP MATCH) ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <EventByTheNumbers />
        </section>


        {/* ═══════ SECTION 6: ADVERTISING & SUBSCRIPTION (EXACT MOCKUP MATCH) ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <AdvertisingSubscriptionSection />
        </section>

        <div className="mt-16">
          <GetInTouchCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
