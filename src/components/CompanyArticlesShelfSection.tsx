"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

export interface BookArticle {
  id: string;
  company: string;
  ticker?: string;
  category: "GOLD & SILVER" | "COPPER & BATTERY METALS" | "ROYALTY & STREAMING" | "CRITICAL MINERALS";
  title: string;
  subtitle?: string;
  date: string;
  dateFR?: string;
  coverImage: string;
  headerTheme: "white-gold" | "blue" | "dark-metallic" | "crimson" | "navy" | "gold" | "emerald" | "purple" | "teal" | "amber" | "slate";
  summary: string;
  summaryFR?: string;
  pdfUrl?: string;
  readTime?: string;
  pages?: number;
}

const defaultArticles: BookArticle[] = [
  // --- JUNE 2026 ---
  {
    id: "us-gold-corp",
    company: "US Gold Corp",
    ticker: "NASDAQ: USAU",
    category: "GOLD & SILVER",
    title: "THE NEXT U.S. GOLD MINE",
    subtitle: "Advancing Flagship CK Gold Project in Wyoming Towards Commercial Production",
    date: "JUNE 2026",
    dateFR: "JUIN 2026",
    coverImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800",
    headerTheme: "white-gold",
    summary: "US Gold Corp is rapidly advancing its flagship CK Gold Project in Wyoming toward commercial production, positioning itself as the premier upcoming U.S. gold producer with robust economics, near-term cash flow, and strong local community backing.",
    summaryFR: "US Gold Corp fait avancer rapidement son projet phare CK Gold dans le Wyoming vers la production commerciale, se positionnant comme le prochain grand producteur d'or américain.",
    readTime: "4 min read",
    pages: 18,
  },
  {
    id: "auro-metals",
    company: "Auro Metals Inc",
    ticker: "TSX-V: AURO",
    category: "GOLD & SILVER",
    title: "UNLOCKING SANTA BARBARA",
    subtitle: "High-Grade Gold & Silver Exploration & Resource Development in Colombia",
    date: "JUNE 2026",
    dateFR: "JUIN 2026",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800",
    headerTheme: "blue",
    summary: "Auro Metals Inc announces breakthrough exploration drill results at the Santa Barbara high-grade gold deposit, revealing exceptional vein continuity and expanded multi-million ounce resource potential across the regional land package.",
    summaryFR: "Auro Metals Inc annonce des résultats d'exploration spectaculaires sur le gisement d'or à haute teneur de Santa Barbara en Colombie.",
    readTime: "5 min read",
    pages: 24,
  },
  {
    id: "pan-global",
    company: "Pan Global Resources",
    ticker: "TSX-V: PGZ",
    category: "COPPER & BATTERY METALS",
    title: "PAN GLOBAL'S STRATEGIC FINANCING SETS THE STAGE FOR EXPANDED EXPLORATION IN SPAIN",
    subtitle: "Accelerating Diamond Drilling Across the Escacena Volcanogenic Massive Sulphide Project",
    date: "JUNE 2026",
    dateFR: "JUIN 2026",
    coverImage: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=800",
    headerTheme: "dark-metallic",
    summary: "Pan Global Resources closes oversubscribed strategic financing to expand diamond drill testing at the Escacena copper-tin-silver project in Southern Spain's world-renowned Iberian Pyrite Belt.",
    summaryFR: "Pan Global Resources clôture un financement stratégique sursouscrit pour étendre ses forages sur le projet Escacena en Espagne.",
    readTime: "6 min read",
    pages: 32,
  },
  {
    id: "agnico-eagle",
    company: "Agnico Eagle Mines",
    ticker: "NYSE / TSX: AEM",
    category: "GOLD & SILVER",
    title: "CANADIAN GOLD MINING EXCELLENCE & SUSTAINABILITY",
    subtitle: "Q2 2026 Operational Milestones & Nunavut Exploration Growth",
    date: "JUNE 2026",
    dateFR: "JUIN 2026",
    coverImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=800",
    headerTheme: "crimson",
    summary: "Agnico Eagle Mines delivers outstanding operational metrics across its Canadian operations, setting new benchmarks in sustainable gold extraction, decarbonization, and regional infrastructure development.",
    summaryFR: "Agnico Eagle Mines enregistre d'excellents résultats opérationnels sur l'ensemble de ses mines canadiennes, imposant de nouveaux standards durables.",
    readTime: "4 min read",
    pages: 42,
  },

  // --- MAY 2026 ---
  {
    id: "barrick-gold",
    company: "Barrick Gold Corporation",
    ticker: "NYSE: GOLD / TSX: ABX",
    category: "GOLD & SILVER",
    title: "TIER 1 ASSETS & GLOBAL COPPER-GOLD EXPANSION",
    subtitle: "Reko Diq Megaproject & Lumwana Expansion Driving Global Growth Strategy",
    date: "MAY 2026",
    dateFR: "MAI 2026",
    coverImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800",
    headerTheme: "gold",
    summary: "Barrick Gold Corporation outlines its multi-decade production growth roadmap led by the world-class Reko Diq copper-gold project in Pakistan and major expansion at the Lumwana copper mine in Zambia.",
    summaryFR: "Barrick Gold présente sa feuille de route de croissance axée sur les méga-projets Reko Diq et Lumwana.",
    readTime: "7 min read",
    pages: 56,
  },
  {
    id: "lundin-mining",
    company: "Lundin Mining Corporation",
    ticker: "TSX: LUN",
    category: "COPPER & BATTERY METALS",
    title: "SOUTH AMERICAN COPPER POWERHOUSE",
    subtitle: "Candelaria & Caserones Operations Delivering Record Processing Throughput",
    date: "MAY 2026",
    dateFR: "MAI 2026",
    coverImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800",
    headerTheme: "emerald",
    summary: "Lundin Mining reports strong operational performance across its South American copper asset portfolio, increasing full-year copper production guidance backed by operational efficiencies.",
    summaryFR: "Lundin Mining annonce d'excellentes performances opérationnelles en Amérique du Sud et révise à la hausse ses prévisions de cuivre.",
    readTime: "5 min read",
    pages: 28,
  },
  {
    id: "wheaton-precious",
    company: "Wheaton Precious Metals",
    ticker: "NYSE / TSX: WPM",
    category: "ROYALTY & STREAMING",
    title: "STREAMING PRECEDENCE & LOW-RISK CAPITAL",
    subtitle: "High-Margin Organic Growth Pipeline & Industry-Leading ESG Rating",
    date: "MAY 2026",
    dateFR: "MAI 2026",
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800",
    headerTheme: "purple",
    summary: "Wheaton Precious Metals highlights its sector-leading cash operating margins and high-quality precious metals streaming portfolio, forecasting over 40% organic production growth by 2028.",
    summaryFR: "Wheaton Precious Metals met en avant ses marges opérationnelles d'exception et prévoit une croissance biologique de plus de 40 % d'ici 2028.",
    readTime: "5 min read",
    pages: 36,
  },
  {
    id: "first-quantum",
    company: "First Quantum Minerals",
    ticker: "TSX: FM",
    category: "COPPER & BATTERY METALS",
    title: "CRITICAL MINERALS & CLEAN ENERGY METALS",
    subtitle: "Kevitsa Nickel-Copper & Sentinel Operations Technical Update 2026",
    date: "MAY 2026",
    dateFR: "MAI 2026",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800",
    headerTheme: "teal",
    summary: "First Quantum Minerals releases comprehensive operational updates for its African and European copper and nickel operations, advancing renewable energy integrations across processing plants.",
    summaryFR: "First Quantum Minerals publie ses mises à jour techniques et fait progresser l'intégration des énergies renouvelables.",
    readTime: "6 min read",
    pages: 30,
  },

  // --- APRIL 2026 ---
  {
    id: "ivanhoe-mines",
    company: "Ivanhoe Mines",
    ticker: "TSX: IVN",
    category: "COPPER & BATTERY METALS",
    title: "KAMOAS-KAKULA COPPER COMPLEX PHASE 3",
    subtitle: "World-Class Direct-to-Blister Copper Smelter & Green Hydroelectric Power",
    date: "APRIL 2026",
    dateFR: "AVRIL 2026",
    coverImage: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=800",
    headerTheme: "amber",
    summary: "Ivanhoe Mines announces completion of Phase 3 expansion at Kamoa-Kakula, cementing its position as one of the world's largest and greenest ultra-high-grade copper production complexes.",
    summaryFR: "Ivanhoe Mines annonce la finalisation de l'extension Phase 3 à Kamoa-Kakula, confirmant sa position parmi les plus grands complexes cuivrifieurs.",
    readTime: "7 min read",
    pages: 48,
  },
  {
    id: "teck-resources",
    company: "Teck Resources",
    ticker: "NYSE / TSX: TECK",
    category: "CRITICAL MINERALS",
    title: "PURE-PLAY COPPER TRANSFORMATION",
    subtitle: "Quebrada Blanca (QB2) Ramp-Up & High-Growth Critical Metals Pipeline",
    date: "APRIL 2026",
    dateFR: "AVRIL 2026",
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800",
    headerTheme: "slate",
    summary: "Teck Resources details its successful transition into a premier pure-play copper producer, driven by full-scale production ramp-up at QB2 in Chile and critical mineral discovery.",
    summaryFR: "Teck Resources détaille sa transformation réussie en un producteur pur de cuivre grâce à la montée en puissance de QB2 au Chili.",
    readTime: "5 min read",
    pages: 34,
  },
  {
    id: "kinross-gold",
    company: "Kinross Gold Corporation",
    ticker: "NYSE: KGC / TSX: K",
    category: "GOLD & SILVER",
    title: "GREAT BEAR DISCOVERY & PRODUCTION OUTLOOK",
    subtitle: "World-Class High-Grade Gold Deposit Project Development in Ontario",
    date: "APRIL 2026",
    dateFR: "AVRIL 2026",
    coverImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=800",
    headerTheme: "gold",
    summary: "Kinross Gold Corporation provides advanced engineering and exploration results for the Great Bear project in Red Lake, Ontario, highlighting top-tier deposit quality and long-life mine potential.",
    summaryFR: "Kinross Gold fournit des résultats d'ingénierie et d'exploration avancés pour le projet d'exception Great Bear en Ontario.",
    readTime: "6 min read",
    pages: 40,
  },
  {
    id: "osisko-royalties-apr",
    company: "Osisko Gold Royalties",
    ticker: "NYSE / TSX: OR",
    category: "ROYALTY & STREAMING",
    title: "ROYALTY & STREAMING PORTFOLIO GROWTH",
    subtitle: "High-Margin Precious Metals Exposure Across Tier-1 Mining Jurisdictions",
    date: "APRIL 2026",
    dateFR: "AVRIL 2026",
    coverImage: "https://images.unsplash.com/photo-1618042164219-62c820f10723?q=80&w=800",
    headerTheme: "navy",
    summary: "Osisko Gold Royalties reports strong quarterly cash flows driven by cornerstone royalty assets, expanding its precious metals stream pipeline in key mining regions.",
    summaryFR: "Osisko Gold Royalties publie de solides flux de trésorerie trimestriels portés par ses redevances phares en Amérique du Nord.",
    readTime: "5 min read",
    pages: 26,
  },
];

export interface CompanyArticlesShelfProps {
  onViewAll?: () => void;
  ctaLabel?: string;
  hideCtaButton?: boolean;
}

export default function CompanyArticlesShelfSection({ onViewAll, ctaLabel, hideCtaButton = false }: CompanyArticlesShelfProps) {
  const { lang } = useLanguage();
  const isFr = lang === "FR";

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<BookArticle | null>(null);

  const categories = [
    { key: "ALL", label: isFr ? "TOUTES LES PUBLICATIONS" : "ALL PUBLICATIONS" },
    { key: "GOLD & SILVER", label: isFr ? "OR & ARGENT" : "GOLD & SILVER" },
    { key: "COPPER & BATTERY METALS", label: isFr ? "CUIVRE & MÉTAUX DE BATTERIE" : "COPPER & BATTERY METALS" },
    { key: "ROYALTY & STREAMING", label: isFr ? "REDEVANCES & STREAMING" : "ROYALTY & STREAMING" },
    { key: "CRITICAL MINERALS", label: isFr ? "MINÉRAUX CRITIQUES" : "CRITICAL MINERALS" },
  ];

  // Filtered & displayed articles (4 cards on main page preview, all cards on dedicated page)
  const displayedArticles = useMemo(() => {
    const list = defaultArticles.filter((art) => {
      const matchesCat = selectedCategory === "ALL" || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        art.company.toLowerCase().includes(q) ||
        (art.ticker && art.ticker.toLowerCase().includes(q)) ||
        art.title.toLowerCase().includes(q) ||
        (art.subtitle && art.subtitle.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });

    return hideCtaButton ? list : list.slice(0, 4);
  }, [selectedCategory, searchQuery, hideCtaButton]);

  // Group by Date Issue (e.g. JUNE 2026, MAY 2026, APRIL 2026)
  const groupedByDate = useMemo(() => {
    const groups: Record<string, BookArticle[]> = {};
    displayedArticles.forEach((art) => {
      const dateKey = isFr ? art.dateFR || art.date : art.date;
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(art);
    });
    return groups;
  }, [displayedArticles, isFr]);

  return (
    <section className="relative w-full py-8 sm:py-12 px-4 sm:px-6 md:px-8 max-w-[1240px] mx-auto transition-colors duration-300">
      {/* SECTION HEADER MATCHING SITE-WIDE DESIGN SYSTEM */}
      <div className="text-center mb-8">
        <span className="text-[#C6112F] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase block mb-2">
          {isFr ? "PUBLICATIONS & RAPPORTS" : "FEATURED PUBLICATIONS"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-3">
          {isFr ? "Articles d'Entreprises" : "Company Articles"}
        </h2>
        <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mx-auto mb-4" />
        <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-medium">
          {isFr
            ? "Découvrez les derniers rapports, analyses et publications exclusives des entreprises minières participantes."
            : "Explore in-depth corporate reports, development updates, and exclusive publications from participating mining leaders."}
        </p>
      </div>

      {/* FILTER TABS & SEARCH INPUT BAR (VISIBLE ON DEDICATED ARTICLE PAGE) */}
      {hideCtaButton && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold tracking-wider transition-all duration-200 cursor-pointer ${isActive
                      ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20 scale-105"
                      : "bg-white dark:bg-[#0e1626] text-neutral-700 dark:text-slate-300 border border-neutral-200/90 dark:border-[#233049] hover:bg-neutral-100 dark:hover:bg-slate-800 shadow-2xs"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* SEARCH BOX */}
          <div className="relative w-full md:w-72 shrink-0">
            <svg className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder={isFr ? "Rechercher une entreprise, symbole..." : "Search company, ticker, title..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#0e1626] border border-neutral-200/90 dark:border-[#233049] rounded-full text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#C6112F] transition-colors shadow-2xs"
            />
          </div>
        </div>
      )}

      {/* CONTAINER CONTAINER MATCHING SITE THEME */}
      <div className="w-full rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-[#233049] bg-white dark:bg-[#0e1626] p-6 sm:p-10 md:p-12 shadow-sm transition-colors">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="py-12 text-center">
            <span className="text-4xl mb-2 block">🔍</span>
            <h3 className="text-base font-bold text-neutral-800 dark:text-white mb-1">
              {isFr ? "Aucune publication trouvée" : "No Publications Found"}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400">
              {isFr ? "Essayez de modifier votre recherche ou sélectionnez une autre catégorie." : "Try adjusting your search terms or selecting another category filter."}
            </p>
          </div>
        ) : (
          Object.entries(groupedByDate).map(([dateLabel, articles], groupIdx) => (
            <div key={dateLabel} className={groupIdx > 0 ? "mt-12 pt-10 border-t border-neutral-200/80 dark:border-slate-800" : ""}>
              {/* MONTH / YEAR HEADER */}
              <div className="mb-8 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C6112F]" />
                <span className="text-[#C6112F] dark:text-[#ff4d6d] font-black text-xs sm:text-sm tracking-[0.25em] uppercase">
                  {dateLabel}
                </span>
                <span className="text-[11px] font-bold text-neutral-400 dark:text-slate-500 uppercase tracking-wider">
                  ({articles.length} {articles.length === 1 ? (isFr ? "Rapport" : "Report") : (isFr ? "Rapports" : "Reports")})
                </span>
                <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-slate-800" />
              </div>

              {/* 3D BOOK COVERS GRID */}
              <div
                className={`grid gap-6 sm:gap-8 justify-items-center items-end w-full ${
                  articles.length === 1
                    ? "grid-cols-1 max-w-sm mx-auto"
                    : articles.length === 2
                    ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                    : articles.length === 3
                    ? "grid-cols-1 sm:grid-cols-3"
                    : articles.length === 4
                    ? "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                    : "grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                }`}
              >
                {articles.map((article) => {
                  return (
                    <div
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="group flex flex-col items-center cursor-pointer select-none w-full"
                    >
                      {/* 3D BOOK COVER WRAPPER WITH REALISTIC SPINE & SHADOW */}
                      <div className="relative w-full max-w-[240px] sm:max-w-[265px] md:max-w-[280px] aspect-[1/1.38] rounded-r-sm overflow-hidden border-t border-b border-r border-stone-300/80 dark:border-slate-700 bg-white dark:bg-[#1a2334] shadow-[8px_16px_28px_rgba(0,0,0,0.18)] group-hover:shadow-[12px_24px_38px_rgba(198,17,47,0.28)] group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-300 transform mx-auto">
                        {/* LEFT SPINE 3D SHADOW OVERLAY */}
                        <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/45 via-black/15 to-transparent z-30 pointer-events-none" />

                        {/* RIGHT PAGE STACK 3D EDGE */}
                        <div className="absolute inset-y-0 right-0 w-[5px] bg-gradient-to-l from-stone-100 via-stone-200 to-stone-300 border-l border-stone-300/60 z-30 pointer-events-none" />

                        {/* TICKER / BADGE OVERLAY ON TOP RIGHT */}
                        {article.ticker && (
                          <div className="absolute top-2 right-2.5 z-30 bg-black/65 backdrop-blur-xs text-amber-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-400/30 tracking-wider shadow-xs">
                            {article.ticker}
                          </div>
                        )}

                        {/* COVER HEADER STYLING BASED ON THEME */}
                        {article.headerTheme === "white-gold" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-cover bg-center" style={{ backgroundImage: `url(${article.coverImage})` }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 z-10" />
                            <div className="relative z-20 bg-white/95 backdrop-blur-xs p-2 rounded-xs border border-white/80 text-center shadow-xs">
                              <span className="text-[9px] font-black text-amber-900 uppercase tracking-widest block">SPECIAL REPORT</span>
                            </div>
                            <div className="relative z-20 text-left pl-2 pb-1">
                              <h3 className="text-sm sm:text-base font-black text-white leading-tight mb-1 drop-shadow-sm">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[10px] text-amber-200 font-semibold leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                              <div className="mt-2 text-[9px] font-bold text-stone-300 uppercase tracking-wider">
                                {article.company}
                              </div>
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "blue" && (
                          <div className="h-full w-full flex flex-col justify-between relative bg-cover bg-center" style={{ backgroundImage: `url(${article.coverImage})` }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                            <div className="relative z-20 bg-[#025da6] p-2.5 text-center shadow-sm">
                              <span className="text-[10px] font-black text-white uppercase tracking-wider block">AURO METALS INC</span>
                            </div>
                            <div className="relative z-20 p-3 text-left pl-3 pb-2">
                              <h3 className="text-sm sm:text-base font-black text-white leading-tight mb-1 drop-shadow-sm">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[10px] text-sky-200 font-medium leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                              <div className="mt-2 text-[9px] font-bold text-sky-100 uppercase tracking-wider">
                                {article.company}
                              </div>
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "dark-metallic" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-neutral-950 text-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity" style={{ backgroundImage: `url(${article.coverImage})` }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 z-10" />

                            <div className="relative z-20 border-b border-[#C6112F]/40 pb-2 mb-2">
                              <span className="text-[9px] font-extrabold text-[#C6112F] uppercase tracking-[0.2em] block">
                                PAN GLOBAL RESOURCES
                              </span>
                            </div>

                            <div className="relative z-20 my-auto text-left py-2">
                              <h3 className="text-xs sm:text-sm font-black text-white leading-tight uppercase mb-1">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[9px] text-stone-300 font-medium leading-tight line-clamp-3 mt-1">
                                  {article.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="relative z-20 border-t border-neutral-700 pt-1.5 flex justify-between items-center text-[8px] text-neutral-300 font-bold uppercase tracking-wider">
                              <span>EXPLORATION REPORT</span>
                              <span>2026</span>
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "crimson" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-[#1c080b] text-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${article.coverImage})` }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#800a1d]/80 via-black/40 to-black/90 z-10" />

                            <div className="relative z-20 bg-[#C6112F] p-1.5 text-center shadow-xs rounded-xs">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest block">AGNICO EAGLE</span>
                            </div>

                            <div className="relative z-20 my-auto text-left py-2 pl-1">
                              <h3 className="text-xs sm:text-sm font-black text-white leading-tight uppercase mb-1">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[9px] text-rose-200 font-medium leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="relative z-20 text-[8px] text-rose-300 font-bold uppercase tracking-wider border-t border-rose-500/30 pt-1.5">
                              {article.company}
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "navy" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-[#09152b] text-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${article.coverImage})` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#09152b] via-[#09152b]/60 to-transparent z-10" />

                            <div className="relative z-20 border-b border-sky-400/30 pb-1.5">
                              <span className="text-[9px] font-black text-sky-300 uppercase tracking-widest block">OSISKO GOLD ROYALTIES</span>
                            </div>

                            <div className="relative z-20 my-auto text-left py-2 pl-1">
                              <h3 className="text-xs sm:text-sm font-black text-white leading-tight uppercase mb-1">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[9px] text-sky-200 font-medium leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="relative z-20 text-[8px] text-sky-300/80 font-bold uppercase tracking-wider border-t border-sky-400/30 pt-1.5">
                              {article.company}
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "gold" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-[#1c1608] text-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${article.coverImage})` }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#8a6c15]/80 via-black/50 to-black/90 z-10" />

                            <div className="relative z-20 bg-[#b8860b] p-1.5 text-center shadow-xs rounded-xs">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest block">{article.company}</span>
                            </div>

                            <div className="relative z-20 my-auto text-left py-2 pl-1">
                              <h3 className="text-xs sm:text-sm font-black text-amber-100 leading-tight uppercase mb-1">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[9px] text-amber-200/90 font-medium leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="relative z-20 text-[8px] text-amber-300 font-bold uppercase tracking-wider border-t border-amber-500/30 pt-1.5">
                              {article.ticker}
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "emerald" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-[#071a12] text-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${article.coverImage})` }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0e5c3c]/80 via-black/50 to-black/90 z-10" />

                            <div className="relative z-20 bg-[#0d7a4d] p-1.5 text-center shadow-xs rounded-xs">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest block">{article.company}</span>
                            </div>

                            <div className="relative z-20 my-auto text-left py-2 pl-1">
                              <h3 className="text-xs sm:text-sm font-black text-emerald-100 leading-tight uppercase mb-1">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[9px] text-emerald-200/90 font-medium leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="relative z-20 text-[8px] text-emerald-300 font-bold uppercase tracking-wider border-t border-emerald-500/30 pt-1.5">
                              {article.ticker}
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "purple" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-[#170a24] text-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${article.coverImage})` }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#5c1d8f]/80 via-black/50 to-black/90 z-10" />

                            <div className="relative z-20 bg-[#6b21a8] p-1.5 text-center shadow-xs rounded-xs">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest block">{article.company}</span>
                            </div>

                            <div className="relative z-20 my-auto text-left py-2 pl-1">
                              <h3 className="text-xs sm:text-sm font-black text-purple-100 leading-tight uppercase mb-1">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[9px] text-purple-200/90 font-medium leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="relative z-20 text-[8px] text-purple-300 font-bold uppercase tracking-wider border-t border-purple-500/30 pt-1.5">
                              {article.ticker}
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "teal" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-[#081b1c] text-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${article.coverImage})` }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0f6b6d]/80 via-black/50 to-black/90 z-10" />

                            <div className="relative z-20 bg-[#0f766e] p-1.5 text-center shadow-xs rounded-xs">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest block">{article.company}</span>
                            </div>

                            <div className="relative z-20 my-auto text-left py-2 pl-1">
                              <h3 className="text-xs sm:text-sm font-black text-teal-100 leading-tight uppercase mb-1">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[9px] text-teal-200/90 font-medium leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="relative z-20 text-[8px] text-teal-300 font-bold uppercase tracking-wider border-t border-teal-500/30 pt-1.5">
                              {article.ticker}
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "amber" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-[#1c1208] text-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${article.coverImage})` }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#78350f]/80 via-black/50 to-black/90 z-10" />

                            <div className="relative z-20 bg-[#d97706] p-1.5 text-center shadow-xs rounded-xs">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest block">{article.company}</span>
                            </div>

                            <div className="relative z-20 my-auto text-left py-2 pl-1">
                              <h3 className="text-xs sm:text-sm font-black text-amber-100 leading-tight uppercase mb-1">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[9px] text-amber-200/90 font-medium leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="relative z-20 text-[8px] text-amber-300 font-bold uppercase tracking-wider border-t border-amber-500/30 pt-1.5">
                              {article.ticker}
                            </div>
                          </div>
                        )}

                        {article.headerTheme === "slate" && (
                          <div className="h-full w-full flex flex-col justify-between p-3 relative bg-[#0f172a] text-white">
                            <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${article.coverImage})` }} />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#334155]/80 via-black/50 to-black/90 z-10" />

                            <div className="relative z-20 bg-[#475569] p-1.5 text-center shadow-xs rounded-xs">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest block">{article.company}</span>
                            </div>

                            <div className="relative z-20 my-auto text-left py-2 pl-1">
                              <h3 className="text-xs sm:text-sm font-black text-slate-100 leading-tight uppercase mb-1">
                                {article.title}
                              </h3>
                              {article.subtitle && (
                                <p className="text-[9px] text-slate-200/90 font-medium leading-tight line-clamp-2">
                                  {article.subtitle}
                                </p>
                              )}
                            </div>

                            <div className="relative z-20 text-[8px] text-slate-300 font-bold uppercase tracking-wider border-t border-slate-500/30 pt-1.5">
                              {article.ticker}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* COMPANY NAME LABEL BELOW */}
                      <span className="text-xs sm:text-sm font-extrabold text-[#1a1f2c] dark:text-slate-100 text-center mt-3.5 tracking-tight group-hover:text-[#C6112F] dark:group-hover:text-[#ff4d6d] transition-colors">
                        {article.company}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* VIEW ALL ARTICLES BUTTON */}
        {!hideCtaButton && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <button
              onClick={onViewAll}
              className="group px-7 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-extrabold tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{ctaLabel || (isFr ? "VOIR TOUS LES ARTICLES D'ENTREPRISES" : "VIEW ALL COMPANY ARTICLES")}</span>
              <svg
                className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ARTICLE READER MODAL OVERLAY */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#131b2e] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 dark:border-slate-700 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-slate-300 hover:bg-[#C6112F] hover:text-white flex items-center justify-center transition-all cursor-pointer z-20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* MODAL HEADER */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-rose-50 dark:bg-rose-950/60 text-[#C6112F] dark:text-[#ff4d6d] rounded-full border border-[#C6112F]/20">
                {selectedArticle.company}
              </span>
              {selectedArticle.ticker && (
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 rounded-full border border-amber-300/40">
                  {selectedArticle.ticker}
                </span>
              )}
              <span className="text-xs font-bold text-neutral-500 dark:text-slate-400">
                {isFr ? selectedArticle.dateFR || selectedArticle.date : selectedArticle.date} · {selectedArticle.pages || 30} pages
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-2 leading-tight">
              {selectedArticle.title}
            </h3>

            {selectedArticle.subtitle && (
              <p className="text-sm font-semibold text-[#C6112F] dark:text-[#ff4d6d] mb-4">
                {selectedArticle.subtitle}
              </p>
            )}

            {/* FEATURED COVER PREVIEW */}
            <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-6 relative bg-neutral-900 shadow-md">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-white/90 font-medium">
                  {selectedArticle.readTime || "5 min read"}
                </span>
              </div>
            </div>

            {/* ARTICLE SUMMARY CONTENT */}
            <div className="text-neutral-700 dark:text-slate-300 text-sm leading-relaxed space-y-3 font-medium mb-6">
              <p>{isFr ? selectedArticle.summaryFR || selectedArticle.summary : selectedArticle.summary}</p>
              <p>
                {isFr
                  ? "Ce rapport offre une analyse détaillée des perspectives de croissance de l'entreprise, de sa stratégie d'exploration et de son engagement envers le développement minier responsable."
                  : "This corporate publication provides in-depth analysis on the company's growth outlook, exploration strategy, and commitment to sustainable mining practices."}
              </p>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-200 dark:border-slate-800">
              <a
                href={selectedArticle.pdfUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!selectedArticle.pdfUrl) {
                    e.preventDefault();
                    alert(isFr ? "Téléchargement du rapport PDF en cours..." : "Opening full corporate PDF publication report...");
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-extrabold tracking-wider uppercase shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>📥 {isFr ? "TÉLÉCHARGER LE RAPPORT PDF" : "DOWNLOAD PDF REPORT"}</span>
              </a>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 text-neutral-800 dark:text-slate-200 text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer"
              >
                {isFr ? "FERMER LE RAPPORT" : "CLOSE REPORT"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
