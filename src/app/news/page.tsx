"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
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

function SponsorsSection() {
  const tiers = [
    {
      key: "SPECIAL",
      label: "Special Participation",
      color: "#1a3a7a",
      accentBg: "bg-blue-100",
      logoH: "h-16",
      logos: [
        "/sponsors/2026/qu_bec.png",
      ],
    },
    {
      key: "PLATINUM",
      label: "Platinum Partners",
      color: "#8B6914",
      accentBg: "bg-amber-100",
      logoH: "h-16",
      logos: [
        "/sponsers/Platinum%20Partners/Agnico_Eagle_Logo.svg.png",
        "/sponsors/2026/glencore.svg",
        "/sponsors/2026/national_bank_financial_markets.png",
        "/sponsors/2026/ventum_financial.png",
        "/sponsors/2026/sponsor_platinum_10.png",
        "/sponsors/2026/sponsor_platinum_12.png",
        "/sponsors/2026/sponsor_platinum_29.png",
      ],
    },
    {
      key: "GOLD",
      label: "Gold Partners",
      color: "#B8860B",
      accentBg: "bg-yellow-100",
      logoH: "h-14",
      logos: [
        "/sponsors/2026/peartree_canada.png",
        "/sponsors/2026/the_money_channel_new_york_city.svg",
        "/sponsors/2026/sponsor_gold_13.png",
        "/sponsors/2026/sponsor_gold_15.png",
        "/sponsors/2026/sponsor_gold_28.png",
        "/sponsors/2026/sponsor_gold_34.png",
        "/sponsors/2026/sponsor_gold_42.png",
        "/sponsors/2026/sponsor_2026_1_252x130.png",
        "/sponsors/2026/sponsor_2026_2_282x45.png",
        "/sponsors/2026/sponsor_2026_3_434x150.png",
        "/sponsors/2026/sponsor_2026_4_260x93.png",
        "/sponsors/2026/sponsor_2026_5_580x114.png",
      ],
    },
    {
      key: "SILVER",
      label: "Silver Partners",
      color: "#6B7280",
      accentBg: "bg-neutral-200",
      logoH: "h-12",
      logos: [
        "/sponsors/2026/atrium_research.ico",
        "/sponsors/2026/canadian_securities_exchange_cse.png",
        "/sponsors/2026/crux_investor.svg",
        "/sponsors/2026/iamgold.ico",
        "/sponsors/2026/government_of_newfoundland_labrador.svg",
        "/sponsors/2026/or_royalties_osisko_royalties.svg",
        "/sponsors/2026/hatch.png",
        "/sponsors/2026/red_cloud_securities.png",
        "/sponsors/2026/stifel.svg",
        "/sponsors/2026/tmx_group.png",
        "/sponsors/2026/sponsor_silver_5.png",
        "/sponsors/2026/sponsor_silver_6.png",
        "/sponsors/2026/sponsor_silver_9.png",
        "/sponsors/2026/sponsor_silver_11.png",
        "/sponsors/2026/sponsor_silver_16.png",
        "/sponsors/2026/sponsor_silver_30.png",
        "/sponsors/2026/sponsor_silver_31.png",
        "/sponsors/2026/sponsor_silver_32.png",
        "/sponsors/2026/sponsor_silver_33.png",
        "/sponsors/2026/sponsor_silver_38.png",
        "/sponsors/2026/sponsor_silver_41.png",
        "/sponsors/2026/sponsor_silver_44.png",
        "/sponsors/2026/sponsor_silver_46.png",
      ],
    },
    {
      key: "COPPER",
      label: "Copper Partners",
      color: "#B45309",
      accentBg: "bg-orange-100",
      logoH: "h-12",
      logos: [
        "/sponsors/2026/alliance_global_partners.ico",
        "/sponsors/2026/brooks_nelson.png",
        "/sponsors/2026/cassels.ico",
        "/sponsors/2026/centre_des_congr_s_de_qu_bec.png",
        "/sponsors/2026/la_caisse_cdpq.svg",
        "/sponsors/2026/mercury_group.png",
        "/sponsors/2026/outside_the_box_capital.png",
        "/sponsors/2026/pal_airlines.png",
        "/sponsors/2026/velocity_trade.png",
        "/sponsors/2026/vrify.png",
        "/sponsors/2026/sponsor_copper_2.png",
        "/sponsors/2026/sponsor_copper_3.png",
        "/sponsors/2026/sponsor_copper_4.png",
        "/sponsors/2026/sponsor_copper_7.png",
        "/sponsors/2026/sponsor_copper_8.png",
        "/sponsors/2026/sponsor_copper_14.png",
        "/sponsors/2026/sponsor_copper_39.png",
        "/sponsors/2026/sponsor_copper_40.png",
        "/sponsors/2026/sponsor_copper_43.png",
        "/sponsors/2026/sponsor_copper_45.png",
        "/sponsors/2026/sponsor_copper_51.png",
      ],
    },
    {
      key: "MEDIA",
      label: "Media Partners",
      color: "#C6112F",
      accentBg: "bg-rose-100",
      logoH: "h-10",
      logos: [
        "/sponsors/2026/sponsor_media_17.png",
        "/sponsors/2026/sponsor_media_19.png",
        "/sponsors/2026/sponsor_media_35.png",
        "/sponsors/2026/sponsor_media_48.png",
        "/sponsors/2026/sponsor_media_27.png",
        "/sponsors/2026/sponsor_media_21.png",
        "/sponsors/2026/miningir.png",
        "/sponsors/2026/sponsor_media_22.png",
        "/sponsors/2026/sponsor_media_23.png",
        "/sponsors/2026/sponsor_media_36.png",
        "/sponsors/2026/sponsor_media_25.png",
        "/sponsors/2026/sponsor_media_53.png",
        "/sponsors/2026/sponsor_media_52.png",
        "/sponsors/2026/sponsor_media_49.png",
        "/sponsors/2026/sponsor_media_37.png",
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
          FEATURED
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] tracking-tight mb-3">
          Our Sponsors &amp; <span className="text-[#C6112F]">Partners</span>
        </h2>
        <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mb-4" />
        <p className="text-neutral-500 text-sm font-medium max-w-xl mx-auto">
          A spotlight on the partners powering THE Mining Investment Event.
        </p>
      </div>

      {/* Single Unified Card */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-10 flex flex-col gap-8">
        {tiers.map((tier, tIdx) => (
          <div key={tier.key}>
            {/* Tier Divider Label */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`${tier.accentBg} text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1 rounded-full`}
                style={{ color: tier.color }}
              >
                {tier.label}
              </span>
              <div className="flex-1 h-[1px] bg-neutral-200 rounded-full" />
            </div>

            {/* Logo Row — flex wrap so all logos flow naturally */}
            <div className="flex flex-wrap gap-3 items-center">
              {tier.logos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center bg-neutral-50 border border-neutral-100 rounded-xl p-3 hover:shadow-md hover:-translate-y-0.5 hover:border-neutral-300 transition-all duration-200"
                  style={{ minWidth: "100px", maxWidth: "160px", flex: "1 1 100px" }}
                >
                  <img
                    src={logo}
                    alt={`${tier.label} ${idx + 1}`}
                    className={`${tier.logoH} max-w-full object-contain`}
                  />
                </div>
              ))}
            </div>

            {/* Separator between tiers (not after last) */}
            {tIdx < tiers.length - 1 && (
              <div className="mt-8 border-b border-dashed border-neutral-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION DATA
// ─────────────────────────────────────────────────────────────

/* 1. GOVERNMENTS */
const governmentsArticles = [
  {
    id: "gov-1",
    category: "CANADA",
    title: "Ottawa Unveils $3B Critical Minerals Strategy for 2026",
    date: "Jun 18, 2025",
    readTime: "5 min read",
    snippet: "The federal government's landmark strategy targets lithium, nickel and cobalt supply chains to reduce reliance on foreign imports.",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200",
    featured: true,
  },
  {
    id: "gov-2",
    category: "USA",
    title: "U.S. DOE Releases New Permitting Fast-Track for Mining Projects",
    date: "Jun 10, 2025",
    readTime: "4 min read",
    snippet: "Washington accelerates environmental review timelines to boost domestic production of battery metals.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800",
  },
  {
    id: "gov-3",
    category: "EUROPE",
    title: "EU Critical Raw Materials Act: First Benchmarks Published",
    date: "May 30, 2025",
    readTime: "6 min read",
    snippet: "Brussels sets binding targets to source 10% of strategic minerals domestically by 2030 under the new CRMA framework.",
    image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=800",
  },
  {
    id: "gov-4",
    category: "AFRICA",
    title: "DRC Reforms Mining Code to Attract Foreign Direct Investment",
    date: "May 18, 2025",
    readTime: "4 min read",
    snippet: "Kinshasa announces royalty restructuring and streamlined licensing to revitalize its copper-cobalt sector.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800",
  },
  {
    id: "gov-5",
    category: "ASIA-PACIFIC",
    title: "Australia's NAIF Commits A$500M to Northern Territory Resources",
    date: "May 8, 2025",
    readTime: "3 min read",
    snippet: "Northern Australia Infrastructure Facility backs new road and port infrastructure to unlock remote mineral deposits.",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800",
  },
];

/* 2. COMPANY ARTICLES */
const companyArticles = [
  {
    id: "co-1",
    category: "GOLD",
    title: "Agnico Eagle Posts Record Q2 Production from LaRonde Complex",
    date: "Jun 15, 2025",
    readTime: "5 min read",
    snippet: "Agnico Eagle reports 920,000 oz of gold production in Q2, driven by exceptional mill throughput at its flagship Quebec operations.",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1200",
    featured: true,
  },
  {
    id: "co-2",
    category: "COPPER",
    title: "Teck Resources Advances QB3 Expansion Amid Strong Copper Prices",
    date: "Jun 8, 2025",
    readTime: "4 min read",
    snippet: "Teck secures board approval for QB3 feasibility study as copper trades near $4.50/lb.",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800",
  },
  {
    id: "co-3",
    category: "OIL & GAS",
    title: "Suncor Energy Delivers Strong Free Cash Flow in H1 2025",
    date: "May 27, 2025",
    readTime: "5 min read",
    snippet: "Canada's largest oil sands producer reports $4.1B in free cash flow and raises its annual dividend by 8%.",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=800",
  },
  {
    id: "co-4",
    category: "CRITICAL MINERALS",
    title: "Patriot Battery Metals Closes C$150M Strategic Investment",
    date: "May 14, 2025",
    readTime: "4 min read",
    snippet: "The Shaakichiuwaanaan lithium project advances as Patriot secures funding from a major Asian battery manufacturer.",
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=800",
  },
  {
    id: "co-5",
    category: "SILVER",
    title: "First Majestic Silver Reports Highest-Ever Monthly Silver Production",
    date: "May 5, 2025",
    readTime: "3 min read",
    snippet: "San Dimas and Santa Elena mines combine for a record 3.7M oz Ag equivalent in April 2025.",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=800",
  },
];

/* 3. COMPANY INTERVIEWS (PAYING) */
const companyInterviews = [
  {
    id: "int-1",
    category: "CEO INTERVIEW",
    title: "Exclusive: Glencore CEO on Copper's Role in the Energy Transition",
    date: "Jun 20, 2025",
    readTime: "12 min read",
    snippet: "Gary Nagle discusses Glencore's long-term copper strategy, ESG targets and why the metal remains central to global decarbonization.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
    featured: true,
    sponsored: true,
  },
  {
    id: "int-2",
    category: "CFO INTERVIEW",
    title: "Agnico Eagle CFO on Capital Allocation and Dividend Growth",
    date: "Jun 12, 2025",
    readTime: "10 min read",
    snippet: "A deep dive into Agnico Eagle's balance sheet strength and its approach to returning value to shareholders in 2025.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
    sponsored: true,
  },
  {
    id: "int-3",
    category: "EXPLORATION",
    title: "Patriot Battery Metals: Building the Next Tier-1 Lithium Asset",
    date: "May 29, 2025",
    readTime: "8 min read",
    snippet: "President & CEO Blair Way explains the resource expansion strategy at Shaakichiuwaanaan and what institutional investors should know.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800",
    sponsored: true,
  },
  {
    id: "int-4",
    category: "OIL & GAS",
    title: "Suncor Energy President on Oil Sands Innovation and Net-Zero Goals",
    date: "May 20, 2025",
    readTime: "9 min read",
    snippet: "How Suncor is applying AI and carbon capture technology to reduce oil sands emissions while maintaining production growth.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800",
    sponsored: true,
  },
  {
    id: "int-5",
    category: "PRODUCTION",
    title: "Teck Resources COO on Scaling QB2 and the Road to QB3",
    date: "May 10, 2025",
    readTime: "7 min read",
    snippet: "Chief Operating Officer Jonathan Price outlines the operational ramp-up at Quebrada Blanca and the timeline for the next phase expansion.",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=800",
    sponsored: true,
  },
];

/* 4. CONFERENCES */
const conferencesArticles = [
  {
    id: "conf-1",
    category: "MINING",
    title: "THE Mining Investment Event 2026 — Quebec City, June 2–4",
    date: "Jun 2, 2026",
    readTime: "3 min read",
    snippet: "Canada's premier mining capital markets conference returns to the Centre des congrès de Québec with 1,400+ delegates, 350+ investors and 300+ mining companies.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
    featured: true,
  },
  {
    id: "conf-2",
    category: "OIL & GAS",
    title: "ADIPEC 2025 — Abu Dhabi International Petroleum Exhibition",
    date: "Nov 4, 2025",
    readTime: "4 min read",
    snippet: "The world's largest oil and gas gathering convenes 180,000+ professionals to discuss energy security, decarbonization and investment.",
    image: "https://images.unsplash.com/photo-1561625116-5f8675632053?q=80&w=800",
  },
  {
    id: "conf-3",
    category: "MINING",
    title: "PDAC 2026 — Prospectors & Developers Association of Canada",
    date: "Mar 1, 2026",
    readTime: "3 min read",
    snippet: "PDAC 2026 opens in Toronto with record exhibitor registrations and a dedicated Critical Minerals Investment Corridor.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800",
  },
  {
    id: "conf-4",
    category: "OIL & GAS",
    title: "CERAWeek 2026 — Energy Capital Markets Forum, Houston",
    date: "Mar 9, 2026",
    readTime: "4 min read",
    snippet: "S&P Global's flagship energy summit gathers 8,000+ executives to debate oil prices, LNG markets and the speed of the energy transition.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800",
  },
  {
    id: "conf-5",
    category: "MINING",
    title: "Mining Indaba 2026 — Africa's Foremost Mining Investment Forum",
    date: "Feb 2, 2026",
    readTime: "3 min read",
    snippet: "Cape Town hosts 8,500+ delegates from 100 countries as Africa's critical minerals sector attracts unprecedented investor attention.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800",
  },
];

// ─────────────────────────────────────────────────────────────
// REUSABLE SECTION TEMPLATE
// ─────────────────────────────────────────────────────────────
type SectionArticle = {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  snippet: string;
  image: string;
  featured?: boolean;
  sponsored?: boolean;
};

function NewsSection({
  sectionLabel,
  title,
  titleAccent,
  icon,
  categories,
  articles,
  ctaLabel,
  accentNote,
}: {
  sectionLabel: string;
  title: string;
  titleAccent: string;
  icon: React.ReactNode;
  categories: string[];
  articles: SectionArticle[];
  ctaLabel: string;
  accentNote?: string;
}) {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState("ALL");

  const filtered = articles.filter((a) => selectedCat === "ALL" || a.category === selectedCat);
  const featured = filtered.find((a) => a.featured) || filtered[0];
  const grid = filtered.filter((a) => a.id !== (featured?.id || "")).slice(0, 4);

  return (
    <div className="w-full flex flex-col">
      {/* ── Header Row ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-300">
        <div className="flex flex-col gap-1">
          <span className="text-[#C6112F] text-[10px] font-black tracking-[0.25em] uppercase">
            {sectionLabel}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f2430] uppercase tracking-tight flex items-center gap-2.5">
            {title}&nbsp;<span className="text-[#C6112F]">{titleAccent}</span>
            <span className="flex items-center">{icon}</span>
          </h2>
          {accentNote && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#C6112F] bg-rose-50 border border-[#C6112F]/20 px-2.5 py-0.5 rounded-full w-fit mt-0.5">
              ★ {accentNote}
            </span>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer ${
                  isSelected
                    ? "px-3.5 py-1 rounded-full text-[#C6112F] border border-[#C6112F] bg-rose-50 shadow-2xs"
                    : "text-neutral-500 hover:text-[#C6112F] px-2 py-1"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Featured Card ── */}
      {featured && (
        <div className="my-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-xs hover:shadow-md transition-all">
          <div className="md:col-span-5 w-full h-64 sm:h-72 md:h-80 rounded-xl overflow-hidden bg-neutral-200 shrink-0 relative">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800"; }}
            />
            <span className="absolute top-3 left-3 bg-[#C6112F] text-white text-[10px] font-black tracking-[0.18em] uppercase px-3 py-1 rounded-full shadow-md">
              {featured.category}
            </span>
            {featured.sponsored && (
              <span className="absolute top-3 right-3 bg-neutral-900/80 text-white text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-sm">
                SPONSORED
              </span>
            )}
          </div>

          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <span className="text-[#C6112F] text-xs font-black tracking-widest uppercase mb-2 block">
              {featured.category}
            </span>
            <h3
              onClick={() => router.push(`/news/${featured.id}`)}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1f2430] tracking-tight leading-tight mb-2 hover:text-[#C6112F] cursor-pointer transition-colors"
            >
              {featured.title}
            </h3>
            <div className="w-14 h-[3px] bg-[#C6112F] rounded-full my-3" />
            <span className="text-[#C6112F] text-xs font-bold mb-3 block">
              {featured.date}&nbsp;·&nbsp;{featured.readTime}
            </span>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 font-medium max-w-xl">
              {featured.snippet}
            </p>
            <button
              onClick={() => router.push(`/news/${featured.id}`)}
              className="text-[#C6112F] text-xs font-black tracking-widest uppercase hover:underline inline-flex items-center gap-1.5 cursor-pointer w-fit"
            >
              <span>READ MORE</span><span>&gt;</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 4-Column Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {grid.map((item) => (
          <article
            key={item.id}
            onClick={() => router.push(`/news/${item.id}`)}
            className="group cursor-pointer flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-3 bg-neutral-200 border border-neutral-200/80 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800"; }}
                />
                <span className="absolute top-2 left-2 bg-[#C6112F]/90 text-white text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
                {item.sponsored && (
                  <span className="absolute top-2 right-2 bg-neutral-900/70 text-white text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-full">
                    AD
                  </span>
                )}
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-[#1f2430] leading-snug mb-2 group-hover:text-[#C6112F] transition-colors line-clamp-3">
                {item.title}
              </h4>
            </div>
            <span className="text-[#C6112F] text-xs font-bold mt-2">
              {item.date}&nbsp;·&nbsp;{item.readTime}
            </span>
          </article>
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="flex flex-col items-center pt-4 pb-8 border-b border-neutral-300">
        <button
          onClick={() => setSelectedCat("ALL")}
          className="bg-[#C6112F] hover:bg-[#a50e27] text-white px-8 py-3.5 rounded-lg text-xs font-black tracking-widest uppercase shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          {ctaLabel}
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

      {/* Top Stats Bar Container (7 Key Cards matching provided design) */}
      <div className="w-full bg-white border border-neutral-200/90 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xs mb-10 overflow-x-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 min-w-[700px] lg:min-w-0">
          {/* Card 1: 350 INVESTORS */}
          <div className="bg-[#fcfdfe] border border-neutral-100 hover:border-neutral-300 rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="w-11 h-11 rounded-full bg-neutral-100/80 flex items-center justify-center text-neutral-800 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <span className="text-3xl font-black text-[#1a1f2c] tracking-tight leading-none mb-1">350</span>
            <span className="text-[10px] font-extrabold text-neutral-800 uppercase tracking-tight leading-tight mb-3">
              INVESTORS
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-100/70 text-[#C6112F] text-[9px] font-black uppercase tracking-wider">
              ATTENDING
            </span>
          </div>

          {/* Card 2: 200+ MINING COMPANIES */}
          <div className="bg-[#fcfdfe] border border-neutral-100 hover:border-neutral-300 rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="w-11 h-11 rounded-full bg-neutral-100/80 flex items-center justify-center text-neutral-800 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875A1.125 1.125 0 013.75 18.4v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25m16.5 0v3.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-3.25" />
              </svg>
            </div>
            <span className="text-3xl font-black text-[#1a1f2c] tracking-tight leading-none mb-1">200+</span>
            <span className="text-[10px] font-extrabold text-neutral-800 uppercase tracking-tight leading-tight mb-3">
              MINING COMPANIES
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-100/70 text-[#C6112F] text-[9px] font-black uppercase tracking-wider">
              PARTICIPATING
            </span>
          </div>

          {/* Card 3: 143 1-ON-1 USERS */}
          <div className="bg-[#fcfdfe] border border-neutral-100 hover:border-neutral-300 rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="w-11 h-11 rounded-full bg-neutral-100/80 flex items-center justify-center text-neutral-800 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <span className="text-3xl font-black text-[#1a1f2c] tracking-tight leading-none mb-1">143</span>
            <span className="text-[10px] font-extrabold text-neutral-800 uppercase tracking-tight leading-tight mb-3">
              1-ON-1 USERS
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-100/70 text-[#C6112F] text-[9px] font-black uppercase tracking-wider">
              MEETING
            </span>
          </div>

          {/* Card 4: 65 PRESENTATIONS */}
          <div className="bg-[#fcfdfe] border border-neutral-100 hover:border-neutral-300 rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="w-11 h-11 rounded-full bg-neutral-100/80 flex items-center justify-center text-neutral-800 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h16.5m-16.5 0L12 10.5m8.25-7.5v11.25A2.25 2.25 0 0118 16.5h-2.25m-6 3.75h6m-3-3.75v3.75" />
              </svg>
            </div>
            <span className="text-3xl font-black text-[#1a1f2c] tracking-tight leading-none mb-1">65</span>
            <span className="text-[10px] font-extrabold text-neutral-800 uppercase tracking-tight leading-tight mb-3">
              PRESENTATIONS
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-100/70 text-[#C6112F] text-[9px] font-black uppercase tracking-wider">
              DELIVERED
            </span>
          </div>

          {/* Card 5: 17 PANELS & KEYNOTES */}
          <div className="bg-[#fcfdfe] border border-neutral-100 hover:border-neutral-300 rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="w-11 h-11 rounded-full bg-neutral-100/80 flex items-center justify-center text-neutral-800 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="text-3xl font-black text-[#1a1f2c] tracking-tight leading-none mb-1">17</span>
            <span className="text-[10px] font-extrabold text-neutral-800 uppercase tracking-tight leading-tight mb-3">
              PANELS &amp; KEYNOTES
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-100/70 text-[#C6112F] text-[9px] font-black uppercase tracking-wider">
              HELD
            </span>
          </div>

          {/* Card 6: 60+ SPONSORS & PARTNERS */}
          <div className="bg-[#fcfdfe] border border-neutral-100 hover:border-neutral-300 rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="w-11 h-11 rounded-full bg-neutral-100/80 flex items-center justify-center text-neutral-800 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <span className="text-3xl font-black text-[#1a1f2c] tracking-tight leading-none mb-1">60+</span>
            <span className="text-[10px] font-extrabold text-neutral-800 uppercase tracking-tight leading-tight mb-3">
              SPONSORS &amp; PARTNERS
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-100/70 text-[#C6112F] text-[9px] font-black uppercase tracking-wider">
              SUPPORTING
            </span>
          </div>

          {/* Card 7: 3,500 MEETINGS */}
          <div className="bg-[#fcfdfe] border border-neutral-100 hover:border-neutral-300 rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
            <div className="w-11 h-11 rounded-full bg-neutral-100/80 flex items-center justify-center text-neutral-800 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <span className="text-3xl font-black text-[#1a1f2c] tracking-tight leading-none mb-1">3,500</span>
            <span className="text-[10px] font-extrabold text-neutral-800 uppercase tracking-tight leading-tight mb-3">
              MEETINGS
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-100/70 text-[#C6112F] text-[9px] font-black uppercase tracking-wider">
              HELD
            </span>
          </div>
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
      {/* Header */}
      <span className="text-[#C6112F] font-bold text-xs sm:text-sm tracking-[0.25em] uppercase block mb-2">
        ADVERTISING &amp; SUBSCRIPTION
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1f2430] tracking-tight mb-3">
        THE News — Your Source for all Things Resource
      </h2>
      <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-3" />
      <p className="text-neutral-600 text-xs sm:text-sm font-medium max-w-2xl mb-10 leading-relaxed">
        Promote your brand, share your story and connect with a global audience of resource industry leaders, investors and decision makers.
      </p>

      {/* Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: BASIC ANNUAL SUBSCRIPTION */}
        <div className="bg-white border border-neutral-200/90 hover:border-[#C6112F]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all duration-300 group">
          <div>
            <span className="text-[#C6112F] text-xs font-black tracking-widest uppercase mb-3 block">
              BASIC ANNUAL SUBSCRIPTION
            </span>
            <div className="flex items-baseline gap-1 mb-6 border-b border-neutral-100 pb-4">
              <span className="text-3xl sm:text-4xl font-black text-[#1f2430]">$1,200.00</span>
              <span className="text-neutral-500 text-xs font-bold">/ 12 months</span>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Delivered to your in-box monthly with the latest resource news from around the world.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Access the website as needed.</span>
              </li>
            </ul>
          </div>

          <a
            href="mailto:jchoi@irinc.ca?subject=Basic%20Annual%20Subscription%20Inquiry"
            className="w-full py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black tracking-widest uppercase text-center transition-all duration-300 shadow-md group-hover:scale-[1.02] cursor-pointer block"
          >
            BUY NOW
          </a>
        </div>

        {/* Card 2: CORPORATE SUBSCRIPTION */}
        <div className="bg-white border border-neutral-200/90 hover:border-[#C6112F]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all duration-300 group">
          <div>
            <span className="text-[#C6112F] text-xs font-black tracking-widest uppercase mb-3 block">
              CORPORATE SUBSCRIPTION
            </span>
            <div className="flex items-baseline gap-1 mb-6 border-b border-neutral-100 pb-4">
              <span className="text-3xl sm:text-4xl font-black text-[#1f2430]">$3,000</span>
              <span className="text-neutral-500 text-xs font-bold">/ 12 months</span>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Your latest PR's &amp; interviews distributed for 12 months.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Up to 6 press releases &amp; 6 interviews included.</span>
              </li>
            </ul>
          </div>

          <a
            href="mailto:jchoi@irinc.ca?subject=Corporate%20Subscription%20Inquiry"
            className="w-full py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black tracking-widest uppercase text-center transition-all duration-300 shadow-md group-hover:scale-[1.02] cursor-pointer block"
          >
            BUY NOW
          </a>
        </div>

        {/* Card 3: SPONSOR LOGO */}
        <div className="bg-white border border-neutral-200/90 hover:border-[#C6112F]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all duration-300 group">
          <div>
            <span className="text-[#C6112F] text-xs font-black tracking-widest uppercase mb-3 block">
              SPONSOR LOGO
            </span>

            <div className="space-y-2 mb-6 border-b border-neutral-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-xs font-bold">6-month</span>
                <span className="text-2xl font-black text-[#1f2430]">$1,500</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-xs font-bold">12-month</span>
                <span className="text-2xl font-black text-[#1f2430]">$2,500</span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Your logo prominently featured as a sponsor of THE News.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Clickable link directing to your website.</span>
              </li>
            </ul>
          </div>

          <a
            href="mailto:jchoi@irinc.ca?subject=Sponsor%20Logo%20Inquiry"
            className="w-full py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black tracking-widest uppercase text-center transition-all duration-300 shadow-md group-hover:scale-[1.02] cursor-pointer block"
          >
            BUY NOW
          </a>
        </div>

        {/* Card 4: VID INTERVIEWS */}
        <div className="bg-white border border-neutral-200/90 hover:border-[#C6112F]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all duration-300 group">
          <div>
            <span className="text-[#C6112F] text-xs font-black tracking-widest uppercase mb-3 block">
              VID INTERVIEWS
            </span>

            <div className="space-y-1.5 mb-6 border-b border-neutral-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-xs font-bold">1 interview</span>
                <span className="text-2xl font-black text-[#1f2430]">$3,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-xs font-bold">3 interviews</span>
                <span className="text-2xl font-black text-[#1f2430]">$6,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-xs font-bold">4 interviews</span>
                <span className="text-2xl font-black text-[#1f2430]">$9,000</span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Moderated intro — 15 minutes each.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Edited and sent across THE Event social platforms.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Included in THE News for up to 1 year.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Used for quarterly updates, press releases &amp; announcements.</span>
              </li>
            </ul>
          </div>

          <a
            href="mailto:jchoi@irinc.ca?subject=VID%20Interviews%20Inquiry"
            className="w-full py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black tracking-widest uppercase text-center transition-all duration-300 shadow-md group-hover:scale-[1.02] cursor-pointer block"
          >
            BUY NOW
          </a>
        </div>

        {/* Card 5: ADVERTISING */}
        <div className="bg-white border border-neutral-200/90 hover:border-[#C6112F]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left shadow-xs hover:shadow-md transition-all duration-300 group">
          <div>
            <span className="text-[#C6112F] text-xs font-black tracking-widest uppercase mb-3 block">
              ADVERTISING
            </span>

            <div className="space-y-1.5 mb-6 border-b border-neutral-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-xs font-bold">3-month rotating banner</span>
                <span className="text-2xl font-black text-[#1f2430]">$1,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-xs font-bold">6-month rotating banner</span>
                <span className="text-2xl font-black text-[#1f2430]">$3,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600 text-xs font-bold">12-month rotating banner</span>
                <span className="text-2xl font-black text-[#1f2430]">$5,000</span>
              </div>
            </div>

            {/* Bullet Points */}
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>We provide the specs, you provide us with artwork to publish.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 font-medium leading-snug">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] shrink-0 mt-1.5" />
                <span>Maximum of four companies per rotation.</span>
              </li>
            </ul>
          </div>

          <a
            href="mailto:jchoi@irinc.ca?subject=Advertising%20Banner%20Inquiry"
            className="w-full py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black tracking-widest uppercase text-center transition-all duration-300 shadow-md group-hover:scale-[1.02] cursor-pointer block"
          >
            BUY NOW
          </a>
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

        {/* ═══════ SECTION 2: SPONSORS & PARTNERS GRID ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <SponsorsSection />
        </section>

        {/* ═══════ SECTION 3: GOVERNMENTS ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <NewsSection
            sectionLabel="THE LATEST"
            title="Governments"
            titleAccent="— General"
            icon={
              <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M9 8h1m-1 4h1m4-4h1m-1 4h1M3 7l9-4 9 4M4 7v14M20 7v14M9 21V8m6 13V8" />
              </svg>
            }
            categories={["ALL", "CANADA", "USA", "EUROPE", "AFRICA", "ASIA-PACIFIC"]}
            articles={governmentsArticles}
            ctaLabel="VIEW ALL GOVERNMENT NEWS"
          />
        </section>

        {/* ═══════ SECTION 4: COMPANY ARTICLES ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <NewsSection
            sectionLabel="COMPANY NEWS"
            title="Company Articles"
            titleAccent="— General"
            icon={
              <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7l5-5h11a2 2 0 012 2v15a2 2 0 01-2 2z" />
                <polyline strokeLinecap="round" strokeLinejoin="round" points="14 2 14 8 20 8" />
              </svg>
            }
            categories={["ALL", "GOLD", "COPPER", "CRITICAL MINERALS", "SILVER", "OIL & GAS"]}
            articles={companyArticles}
            ctaLabel="VIEW ALL COMPANY ARTICLES"
          />
        </section>

        {/* ═══════ SECTION 5: COMPANY INTERVIEWS ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <NewsSection
            sectionLabel="EXCLUSIVE CONTENT"
            title="Company Interviews"
            titleAccent="— Paying"
            accentNote="Sponsored Content"
            icon={
              <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
            }
            categories={["ALL", "CEO INTERVIEW", "CFO INTERVIEW", "EXPLORATION", "PRODUCTION", "OIL & GAS"]}
            articles={companyInterviews}
            ctaLabel="VIEW ALL INTERVIEWS"
          />
        </section>

        {/* ═══════ SECTION 6: CONFERENCES ═══════ */}
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto">
          <NewsSection
            sectionLabel="EVENTS & CONFERENCES"
            title="Conferences"
            titleAccent="— Mining & Oil & Gas"
            icon={
              <svg className="w-5 h-5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            categories={["ALL", "MINING", "OIL & GAS"]}
            articles={conferencesArticles}
            ctaLabel="VIEW ALL CONFERENCES"
          />
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

