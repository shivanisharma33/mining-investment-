"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import CompanyArticlesShelfSection from "@/components/CompanyArticlesShelfSection";
import { useLanguage } from "@/context/LanguageContext";
import { fetchPressReleaseList, PressRelease } from "@/lib/newsflashApi";

interface NewsroomItem {
  id: string;
  type: "press-release" | "media-coverage" | "announcement" | "interview" | "initiative";
  category: string;
  categoryFR?: string;
  dateEN: string;
  dateFR: string;
  titleEN: string;
  titleFR: string;
  snippetEN: string;
  snippetFR: string;
  fullBodyEN?: string;
  fullBodyFR?: string;
  image: string;
  source?: string;
  readTime?: string;
  featured?: boolean;
  breaking?: boolean;
  pdfUrl?: string;
  youtubeId?: string;
  href?: string;
}

const newsroomItems: NewsroomItem[] = [
  {
    id: "1",
    type: "announcement",
    category: "Keynote Announcement",
    categoryFR: "Conférenciers Principaux",
    dateEN: "Apr 14, 2026",
    dateFR: "14 avril 2026",
    titleEN: "Keynote Speakers and Executive Panels Announced for 2026 Conference",
    titleFR: "Annonce des conférenciers principaux et des panels exécutifs pour 2026",
    snippetEN: "Distinguished keynote speakers and executive panel line-up unveiled for the upcoming Tier 1 gathering at the Centre des congrès de Québec.",
    snippetFR: "Conférenciers prestigieux et panels de direction dévoilés pour le grand rassemblement de Niveau 1 au Centre des congrès de Québec.",
    fullBodyEN: "THE Mining Investment Event of the North is pleased to announce its distinguished keynote speakers and executive panel line-up for the upcoming 2026 conference at the Centre des congrès de Québec. Featuring top industry leaders, government officials, institutional fund managers and technical specialists, the 2026 program addresses key trends in critical minerals, ESG innovation, capital markets and global resource development.",
    fullBodyFR: "THE Mining Investment Event of the North est heureux d'annoncer ses conférenciers principaux et la liste des panels exécutifs pour la prochaine conférence 2026 au Centre des congrès de Québec.",
    image: "/MINING%20INVESTMENT%20EVENT%202026_DAY%202_MAIN%20EVENT-101.jpg",
    readTime: "4 min read",
    featured: true,
    breaking: true,
    href: "/news/1",
  },
  {
    id: "2",
    type: "press-release",
    category: "Issuers & Partners",
    categoryFR: "Émetteurs & Partenaires",
    dateEN: "Feb 19, 2026",
    dateFR: "19 février 2026",
    titleEN: "THE Mining Investment Event Unveils 2026 Participating Issuers & Global Partners",
    titleFR: "Dévoilement des sociétés minières participantes et partenaires mondiaux 2026",
    snippetEN: "Over 100 premier mining issuers confirm attendance alongside international sovereign wealth and institutional investors.",
    snippetFR: "Plus de 100 émetteurs miniers de premier plan confirment leur présence aux côtés d'investisseurs institutionnels mondiaux.",
    fullBodyEN: "Organizers of THE Mining Investment Event are proud to unveil the initial lineup of participating public mining companies and sponsors for the 2026 edition in Quebec City. Bringing together critical mineral explorers and Tier-1 producers.",
    fullBodyFR: "Les organisateurs de THE Mining Investment Event sont fiers de dévoiler la liste initiale des sociétés minières cotées participantes.",
    image: "/news/hero_2.png",
    readTime: "3 min read",
    featured: true,
    href: "/news/2",
  },
  {
    id: "3",
    type: "announcement",
    category: "Strategic Initiative",
    categoryFR: "Initiative Stratégique",
    dateEN: "Oct 8, 2025",
    dateFR: "8 octobre 2025",
    titleEN: "In Collaboration with ITFA and AMQ: Inaugural International Mining Week Announced",
    titleFR: "En collaboration avec l'ITFA et l'AMQ : Semaine internationale des mines annoncée",
    snippetEN: "Quebec City will host a historic week uniting international trade, capital markets, and sustainable resource extraction.",
    snippetFR: "Québec accueillera une semaine historique unissant le commerce international, les capitaux et les ressources durables.",
    fullBodyEN: "THE Mining Investment Event, together with the International Trade and Finance Association (ITFA) and Association minière du Québec (AMQ), is thrilled to announce Quebec City's inaugural International Mining Week.",
    fullBodyFR: "THE Mining Investment Event annonce la Semaine internationale des mines de Québec.",
    image: "/news/hero_3.png",
    readTime: "5 min read",
    href: "/news/3",
  },
  {
    id: "4",
    type: "initiative",
    category: "Education & Awards",
    categoryFR: "Éducation & Bourses",
    dateEN: "Jul 9, 2025",
    dateFR: "9 juillet 2025",
    titleEN: "Glencore & Osisko Student Program Awards Announced for 2025/2026 Scholars",
    titleFR: "Prix du Programme étudiant Glencore & Osisko décernés pour 2025/2026",
    snippetEN: "50 university and college geology, engineering and finance students receive comprehensive conference sponsorship.",
    snippetFR: "50 étudiants universitaires en géologie, génie et finance reçoivent un parrainage complet.",
    image: "/student-hero.jpg",
    readTime: "3 min read",
    href: "/student",
  },
  {
    id: "5",
    type: "media-coverage",
    category: "Media Coverage",
    categoryFR: "Couverture Médiatique",
    dateEN: "May 22, 2025",
    dateFR: "22 mai 2025",
    source: "The Northern Miner",
    titleEN: "How Quebec City Became the Nexus of Tier 1 Mining Investment in Canada",
    titleFR: "Comment Québec est devenue le carrefour de l'investissement minier de Niveau 1 au Canada",
    snippetEN: "An in-depth report on the 1-on-1 private meeting format that generated over $1.2B in deal flow during the 2024–2025 cycles.",
    snippetFR: "Rapport approfondi sur le format exclusif de rencontres individuelles ayant stimulé les flux d'investissements.",
    image: "/news/banner_1.png",
    readTime: "6 min read",
    href: "/news/1",
  },
  {
    id: "6",
    type: "interview",
    category: "Executive Broadcast",
    categoryFR: "Entrevue de Direction",
    dateEN: "Apr 2, 2025",
    dateFR: "2 avril 2025",
    titleEN: "Executive Video: The Critical Minerals Supercycle & Government Policy in Northern Quebec",
    titleFR: "Vidéo exclusive : Le supercycle des minéraux critiques et les politiques gouvernementales",
    snippetEN: "Watch the exclusive panel discussion with industry CEOs and government resource ministers filmed live at the conference.",
    snippetFR: "Regardez la table ronde exclusive avec les PDG de l'industrie et les ministres des ressources.",
    image: "/news/copper_mine.png",
    youtubeId: "L_LUpnjgPso",
    readTime: "18 min video",
  },
  {
    id: "7",
    type: "initiative",
    category: "SHE-Co Initiative",
    categoryFR: "Initiative SHE-Co",
    dateEN: "Jan 18, 2025",
    dateFR: "18 janvier 2025",
    titleEN: "SHE-Co Forum: Advancing Diversity and Women in Mining Leadership Across Canada",
    titleFR: "Forum SHE-Co : Promouvoir la diversité et le leadership féminin dans le secteur minier",
    snippetEN: "Leading female executives, board members and investors gather to accelerate gender parity and ESG innovation in global mining.",
    snippetFR: "Dirigeantes, administratrices et investisseuses réunies pour faire progresser la parité et l'innovation ESG.",
    image: "/news/banner_2.png",
    readTime: "4 min read",
    href: "/sheco",
  },
  {
    id: "8",
    type: "media-coverage",
    category: "Market Analysis",
    categoryFR: "Analyse des Marchés",
    dateEN: "Nov 12, 2024",
    dateFR: "12 novembre 2024",
    source: "Mining.com Capital Review",
    titleEN: "Institutional Capital Returns to Canadian Mineral Exploration at THE Event",
    titleFR: "Le capital institutionnel revient à l'exploration minérale canadienne lors de THE Event",
    snippetEN: "Family offices and sovereign funds increase their allocations to North American gold and copper developers.",
    snippetFR: "Les family offices et fonds souverains augmentent leurs allocations aux promoteurs d'or et de cuivre nord-américains.",
    image: "/news/gold_discovery.png",
    readTime: "5 min read",
    href: "/news/1",
  },
  {
    id: "9",
    type: "interview",
    category: "Executive Broadcast",
    categoryFR: "Entrevue de Direction",
    dateEN: "Sep 28, 2024",
    dateFR: "28 septembre 2024",
    titleEN: "Keynote Dialogue: Global Trade Corridors, Critical Mineral Security & Mining Finance",
    titleFR: "Dialogue principal : Corridors commerciaux mondiaux et sécurité des minéraux critiques",
    snippetEN: "Keynote fireside with sovereign fund managers and international trade delegates on establishing resilient critical supply chains.",
    snippetFR: "Entretien principal avec des gestionnaires de fonds souverains et délégués commerciaux internationaux.",
    image: "/news/banner_3.png",
    youtubeId: "L_LUpnjgPso",
    readTime: "24 min video",
  },
];

const fallbackPressReleases: PressRelease[] = [
  {
    id: "pr-1",
    title: "Keynote Speakers and Panels Announcement for 2026 Edition",
    slug: "keynote-speakers-and-panels-announcement",
    date: "April 14, 2026",
    summary: "THE Mining Investment Event announces its keynote speakers and panel line-up for the 2026 conference in Quebec City.",
    body: "THE Mining Investment Event of the North is pleased to announce its distinguished keynote speakers and executive panel line-up for the upcoming 2026 conference at the Centre des congrès de Québec. Featuring top industry leaders, government officials and institutional fund managers.",
  },
  {
    id: "pr-2",
    title: "THE Mining Investment Event Announces 2026 Issuers and Welcomes Partners",
    slug: "the-mining-investment-event-announces-2026-issuers",
    date: "February 19, 2026",
    summary: "THE Mining Investment Event unveils its 2026 issuer roster and welcomes new and returning partners ahead of the conference in Quebec City.",
    body: "Organizers of THE Mining Investment Event are proud to unveil the initial lineup of participating public mining companies and sponsors for the 2026 edition in Quebec City.",
  },
  {
    id: "pr-3",
    title: "In Collaboration with ITFA and AMQ, Announces International Mining Week in Quebec City",
    slug: "in-collaboration-with-itfa-and-amq-announces-international-mining-week",
    date: "October 8, 2025",
    summary: "THE Mining Investment Event, in collaboration with ITFA and AMQ, announces International Mining Week in Quebec City.",
    body: "THE Mining Investment Event, together with the International Trade and Finance Association (ITFA) and Association minière du Québec (AMQ), is thrilled to announce Quebec City's inaugural International Mining Week.",
  },
];

export default function NewsroomPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";

  // State
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pressReleases, setPressReleases] = useState<PressRelease[]>(fallbackPressReleases);
  const [selectedPressRelease, setSelectedPressRelease] = useState<PressRelease | null>(null);
  const [activeVideo, setActiveVideo] = useState<NewsroomItem | null>(null);

  // Accreditation modal
  const [isAccreditationOpen, setIsAccreditationOpen] = useState(false);
  const [accreditationSubmitted, setAccreditationSubmitted] = useState(false);
  const [accreditationForm, setAccreditationForm] = useState({
    fullName: "",
    outlet: "",
    email: "",
    role: "Journalist / Correspondent",
    country: "Canada",
    notes: "",
  });

  // Newsletter subscribe
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Fetch press releases on load
  useEffect(() => {
    (async () => {
      try {
        const fetched = await fetchPressReleaseList();
        if (fetched && fetched.length > 0) {
          setPressReleases(fetched);
        }
      } catch (err) {
        console.warn("Could not fetch live press releases, using fallback:", err);
      }
    })();
  }, []);

  // Filtered news items
  const filteredItems = useMemo(() => {
    return newsroomItems.filter((item) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "press" && item.type === "press-release") ||
        (activeTab === "media" && item.type === "media-coverage") ||
        (activeTab === "interviews" && item.type === "interview") ||
        (activeTab === "announcements" && item.type === "announcement") ||
        (activeTab === "initiatives" && item.type === "initiative");

      const title = isFr ? item.titleFR : item.titleEN;
      const snippet = isFr ? item.snippetFR : item.snippetEN;
      const category = isFr && item.categoryFR ? item.categoryFR : item.category;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        title.toLowerCase().includes(q) ||
        snippet.toLowerCase().includes(q) ||
        category.toLowerCase().includes(q) ||
        (item.source && item.source.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, isFr]);

  const breakingItem = newsroomItems.find((item) => item.breaking) || newsroomItems[0];

  const handleAccreditationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accreditationForm.fullName || !accreditationForm.email || !accreditationForm.outlet) {
      alert(isFr ? "Veuillez remplir tous les champs obligatoires." : "Please fill in all required fields.");
      return;
    }
    setAccreditationSubmitted(true);
    setTimeout(() => {
      setAccreditationSubmitted(false);
      setIsAccreditationOpen(false);
      setAccreditationForm({
        fullName: "",
        outlet: "",
        email: "",
        role: "Journalist / Correspondent",
        country: "Canada",
        notes: "",
      });
    }, 2500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes("@")) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 3500);
      setNewsletterEmail("");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-neutral-900 dark:text-slate-100 transition-colors duration-300">
        {/* ══════════════════════════════════════════════════════════════
            1. HERO HEADER SECTION
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-[#f8fafc] dark:from-[#0e1626] dark:via-[#0b101c] dark:to-[#090d16] border-b border-neutral-200/80 dark:border-[#1d273b]">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C6112F]/10 dark:bg-[#C6112F]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C6112F]/10 dark:bg-[#C6112F]/20 border border-[#C6112F]/30 text-[#C6112F] text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-ping" />
              {isFr ? "SALLE DE PRESSE OFFICIELLE" : "OFFICIAL MEDIA CENTER & NEWSROOM"}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-[1.12] mb-6">
              THE <span className="text-[#C6112F]">Newsroom</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-medium text-neutral-600 dark:text-slate-300 leading-relaxed mb-8">
              {isFr
                ? "Le carrefour médiatique officiel de l'événement minier de référence au Canada. Accédez aux communiqués de presse officiels, interviews vidéo exécutives, kit média haute résolution et accréditation des journalistes."
                : "The central media hub for Canada's only Tier 1 global mining investment conference. Access official press announcements, broadcast video interviews, downloadable brand assets, and journalist accreditation."}
            </p>

            {/* Quick-Jump Anchor Pills */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              <a
                href="#breaking-news"
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-[#233049] text-neutral-700 dark:text-slate-200 hover:border-[#C6112F] hover:text-[#C6112F] transition-all shadow-xs"
              >
                📢 {isFr ? "À La Une" : "Breaking News"}
              </a>
              <a
                href="#press-releases"
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-[#233049] text-neutral-700 dark:text-slate-200 hover:border-[#C6112F] hover:text-[#C6112F] transition-all shadow-xs"
              >
                📰 {isFr ? "Communiqués" : "Press Releases"}
              </a>
              <a
                href="#video-interviews"
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-[#233049] text-neutral-700 dark:text-slate-200 hover:border-[#C6112F] hover:text-[#C6112F] transition-all shadow-xs"
              >
                🎥 {isFr ? "Interviews Vidéo" : "Video Interviews"}
              </a>
              <a
                href="#media-kit"
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-[#233049] text-neutral-700 dark:text-slate-200 hover:border-[#C6112F] hover:text-[#C6112F] transition-all shadow-xs"
              >
                🗂️ {isFr ? "Kit Média & Logos" : "Media Kit & Logos"}
              </a>
              <a
                href="#accreditation"
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-[#233049] text-neutral-700 dark:text-slate-200 hover:border-[#C6112F] hover:text-[#C6112F] transition-all shadow-xs"
              >
                🎟️ {isFr ? "Accréditation Presse" : "Press Accreditation"}
              </a>
              <button
                onClick={() => setIsAccreditationOpen(true)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-[#C6112F] hover:bg-[#a50e27] text-white transition-all shadow-md hover:scale-105 cursor-pointer"
              >
                {isFr ? "Demander une passe média" : "Request Media Pass"}
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            2. BREAKING / SPOTLIGHT STORY BANNER
        ══════════════════════════════════════════════════════════════ */}
        <section id="breaking-news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
          <div className="bg-white dark:bg-[#131b2e] rounded-3xl border border-neutral-200 dark:border-[#233049] shadow-xl overflow-hidden hover:shadow-2xl transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Details */}
              <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between text-left">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#C6112F] text-white text-[11px] font-black uppercase tracking-wider">
                      ★ {isFr ? "COMMUNIQUÉ MAJEUR" : "BREAKING ANNOUNCEMENT"}
                    </span>
                    <span className="text-xs font-bold text-[#C6112F]">
                      {isFr ? breakingItem.categoryFR : breakingItem.category}
                    </span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs font-semibold text-neutral-500 dark:text-slate-400">
                      {isFr ? breakingItem.dateFR : breakingItem.dateEN}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white leading-tight mb-4">
                    {isFr ? breakingItem.titleFR : breakingItem.titleEN}
                  </h2>

                  <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 font-normal leading-relaxed mb-6">
                    {isFr ? breakingItem.fullBodyFR || breakingItem.snippetFR : breakingItem.fullBodyEN || breakingItem.snippetEN}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-100 dark:border-[#1d273b]">
                  <Link
                    href={breakingItem.href || `/news/${breakingItem.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105"
                  >
                    <span>{isFr ? "LIRE LE COMMUNIQUÉ COMPLET" : "READ FULL STORY"}</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/newsflash"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-100 dark:bg-slate-800 text-neutral-800 dark:text-slate-200 hover:bg-neutral-200 dark:hover:bg-slate-700 text-xs font-bold transition-all"
                  >
                    <span>{isFr ? "TOUS LES COMMUNIQUÉS" : "ALL OFFICIAL RELEASES"}</span>
                    <span>↗</span>
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-neutral-900">
                <Image
                  src={breakingItem.image}
                  alt={isFr ? breakingItem.titleFR : breakingItem.titleEN}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-[#131b2e] lg:via-transparent lg:to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium backdrop-blur-md bg-black/40 p-3 rounded-xl border border-white/10">
                  📍 {isFr ? "Centre des congrès de Québec · Québec, Canada" : "Centre des congrès de Québec · Québec City, Canada"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            3. FILTERABLE NEWS & MEDIA STREAM
        ══════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-[#233049] mb-8">
            <div className="text-left">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C6112F] block mb-1">
                {isFr ? "FLUX D'INFORMATION" : "MEDIA & NEWS FEED"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white uppercase tracking-tight">
                {isFr ? "Dernières Mises à Jour" : "Latest News & Coverage"}
              </h2>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder={isFr ? "Rechercher dans la salle de presse..." : "Search news, topics, keywords..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-[#233049] text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#C6112F] transition-all shadow-xs"
              />
              <svg
                className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {[
              { id: "all", labelEN: "All Updates", labelFR: "Toutes les actualités" },
              { id: "press", labelEN: "Press Releases", labelFR: "Communiqués" },
              { id: "media", labelEN: "Media Coverage", labelFR: "Couverture Médias" },
              { id: "interviews", labelEN: "Video Interviews", labelFR: "Interviews Vidéo" },
              { id: "announcements", labelEN: "Announcements", labelFR: "Annonces" },
              { id: "initiatives", labelEN: "Initiatives (SHE-CO / Students)", labelFR: "Initiatives" },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-[#C6112F] text-white shadow-md scale-102"
                      : "bg-white dark:bg-[#131b2e] border border-neutral-200 dark:border-[#233049] text-neutral-700 dark:text-slate-300 hover:border-[#C6112F]"
                  }`}
                >
                  {isFr ? tab.labelFR : tab.labelEN}
                </button>
              );
            })}
          </div>

          {/* News Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#131b2e] rounded-3xl border border-dashed border-neutral-300 dark:border-[#233049]">
              <p className="text-neutral-500 dark:text-slate-400 text-sm">
                {isFr ? "Aucun article trouvé pour cette recherche." : "No news stories matched your search criteria."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#C6112F] text-white text-xs font-bold"
              >
                {isFr ? "Réinitialiser les filtres" : "Reset Filters"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white dark:bg-[#131b2e] rounded-2xl border border-neutral-200 dark:border-[#233049] hover:border-[#C6112F]/60 dark:hover:border-[#C6112F]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      if (item.type === "interview") {
                        setActiveVideo(item);
                      } else if (item.href) {
                        router.push(item.href);
                      } else {
                        router.push(`/news/${item.id}`);
                      }
                    }}
                    className="relative w-full h-52 sm:h-56 bg-neutral-900 overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt={isFr ? item.titleFR : item.titleEN}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 bg-[#131b2e]/90 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-xs">
                      {isFr && item.categoryFR ? item.categoryFR : item.category}
                    </span>

                    {/* Video Play Overlay */}
                    {item.type === "interview" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-[#C6112F] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Read Time / Duration Badge */}
                    {item.readTime && (
                      <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        {item.readTime}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 dark:text-slate-400 mb-2.5">
                        <span>{isFr ? item.dateFR : item.dateEN}</span>
                        {item.source && (
                          <>
                            <span>·</span>
                            <span className="text-[#C6112F] font-bold">{item.source}</span>
                          </>
                        )}
                      </div>

                      <h3
                        onClick={() => {
                          if (item.type === "interview") {
                            setActiveVideo(item);
                          } else if (item.href) {
                            router.push(item.href);
                          } else {
                            router.push(`/news/${item.id}`);
                          }
                        }}
                        className="text-lg font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-[#C6112F] transition-colors cursor-pointer line-clamp-2 mb-3"
                      >
                        {isFr ? item.titleFR : item.titleEN}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 font-normal leading-relaxed line-clamp-3 mb-4">
                        {isFr ? item.snippetFR : item.snippetEN}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 dark:border-[#1d273b] flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#C6112F] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        {item.type === "interview"
                          ? isFr
                            ? "Visionner la vidéo ▶"
                            : "Watch Video ▶"
                          : isFr
                          ? "Lire l'article ↗"
                          : "Read Story ↗"}
                      </span>
                      <button
                        onClick={() => {
                          if (item.type === "interview") {
                            setActiveVideo(item);
                          } else if (item.href) {
                            router.push(item.href);
                          } else {
                            router.push(`/news/${item.id}`);
                          }
                        }}
                        className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-neutral-600 dark:text-slate-300 group-hover:bg-[#C6112F] group-hover:text-white transition-all cursor-pointer"
                        aria-label="Open story"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════════════
            4. OFFICIAL PRESS RELEASES FEED & ARCHIVE
        ══════════════════════════════════════════════════════════════ */}
        <section id="press-releases" className="bg-[#f1f5f9] dark:bg-[#0b101c] py-16 sm:py-20 border-y border-neutral-200 dark:border-[#1d273b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-left">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C6112F] block mb-1">
                  {isFr ? "FIL CONDUCTEUR OFFICIEL" : "OFFICIAL WIRE"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white uppercase tracking-tight">
                  {isFr ? "Communiqués de Presse & Annonces" : "Press Releases & Official Wire"}
                </h2>
              </div>
              <Link
                href="/newsflash"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#C6112F] hover:underline"
              >
                <span>{isFr ? "Voir tous les communiqués (THE Press Release) →" : "View all press releases (THE Press Release) →"}</span>
              </Link>
            </div>

            <div className="space-y-4">
              {pressReleases.map((pr) => (
                <div
                  key={pr.id}
                  className="bg-white dark:bg-[#131b2e] rounded-2xl border border-neutral-200 dark:border-[#233049] p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-lg transition-all text-left"
                >
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-3 text-xs font-bold text-neutral-500 dark:text-slate-400 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-slate-800 text-[#C6112F] uppercase text-[10px] font-black">
                        {isFr ? "COMMUNIQUÉ" : "OFFICIAL RELEASE"}
                      </span>
                      <span>{pr.date}</span>
                    </div>
                    <h3
                      onClick={() => setSelectedPressRelease(pr)}
                      className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white hover:text-[#C6112F] cursor-pointer transition-colors leading-snug mb-2"
                    >
                      {pr.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 line-clamp-2">
                      {pr.summary || pr.body}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => setSelectedPressRelease(pr)}
                      className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-slate-800 hover:bg-[#C6112F] hover:text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      {isFr ? "Aperçu Rapide" : "Quick View"}
                    </button>
                    {pr.slug && (
                      <Link
                        href={`/newsflash/${pr.slug}`}
                        className="px-5 py-2 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs"
                      >
                        {isFr ? "Lire la suite" : "Read Full Wire"}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            5. COMPANY PUBLICATIONS & ARTICLES SHELF
        ══════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-neutral-200 dark:border-[#233049]">
          <CompanyArticlesShelfSection />
        </section>

        {/* ══════════════════════════════════════════════════════════════
            6. VIDEO & BROADCAST INTERVIEWS (YOUTUBE HUB)
        ══════════════════════════════════════════════════════════════ */}
        <section id="video-interviews" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-left">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C6112F] block mb-1">
                {isFr ? "DIFFUSIONS VIDÉO" : "EXECUTIVE BROADCAST"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white uppercase tracking-tight">
                {isFr ? "Entretiens & Tables Rondes" : "Executive & Panel Interviews"}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 max-w-md">
              {isFr
                ? "Discussions exclusives enregistrées avec les dirigeants des principales sociétés minières et décideurs politiques."
                : "Exclusive discussions recorded with chief executives, institutional fund managers, and policy leaders."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsroomItems
              .filter((item) => item.type === "interview")
              .map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="group bg-white dark:bg-[#131b2e] rounded-2xl border border-neutral-200 dark:border-[#233049] overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer text-left flex flex-col"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <Image
                      src={video.image}
                      alt={isFr ? video.titleFR : video.titleEN}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-[#C6112F] text-white flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform">
                        <svg className="w-7 h-7 fill-current ml-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {video.readTime && (
                      <span className="absolute bottom-3 right-3 bg-black/85 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        HD · {video.readTime}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#C6112F] tracking-wider block mb-1">
                        {isFr && video.categoryFR ? video.categoryFR : video.category}
                      </span>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-[#C6112F] transition-colors line-clamp-2 mb-2">
                        {isFr ? video.titleFR : video.titleEN}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-slate-400 line-clamp-2">
                        {isFr ? video.snippetFR : video.snippetEN}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-neutral-100 dark:border-[#1d273b] flex items-center justify-between text-xs text-[#C6112F] font-bold">
                      <span>{isFr ? "Regarder l'entrevue" : "Watch Full Interview"}</span>
                      <span>▶</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            7. OFFICIAL MEDIA KIT & DOWNLOADABLE BRAND ASSETS
        ══════════════════════════════════════════════════════════════ */}
        <section id="media-kit" className="bg-[#f1f5f9] dark:bg-[#0b101c] py-16 sm:py-20 border-y border-neutral-200 dark:border-[#1d273b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C6112F] block mb-2">
                {isFr ? "RESSOURCES OFFICIELLES DE MARQUE" : "OFFICIAL BRAND ASSETS"}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white uppercase tracking-tight mb-4">
                {isFr ? "Kit Média & Guide Éditorial" : "Media Kit & Fast Facts"}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300">
                {isFr
                  ? "Téléchargez les logos officiels vectoriels, fiches d'information événementielles et photographies de presse pour votre publication."
                  : "Download official high-resolution vector logos, event fact sheets, executive headshots and approved press imagery."}
              </p>
            </div>

            {/* Grid of Media Kit Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left mb-12">
              {/* Card 1: Official Logos */}
              <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-neutral-200 dark:border-[#233049] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-[#C6112F]/10 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] mb-5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    {isFr ? "Pack de Logos Officiels" : "Official Logo Package"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 leading-relaxed mb-6">
                    {isFr
                      ? "Versions claires et foncées du logo officiel en formats haute résolution (PNG, WEBP, SVG transparents)."
                      : "Light and dark variants of the conference identity in high-res vector and transparent PNG formats."}
                  </p>
                </div>
                <a
                  href="/MainPageLogo.webp"
                  download="THE-Mining-Investment-Event-Logo.webp"
                  className="w-full text-center px-4 py-2.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs"
                >
                  {isFr ? "Télécharger les Logos (PNG/WEBP)" : "Download Logo Pack (WEBP)"}
                </a>
              </div>

              {/* Card 2: Conference Fast Fact Sheet */}
              <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-neutral-200 dark:border-[#233049] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-[#C6112F]/10 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] mb-5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    {isFr ? "Fiche de Faits & Statistiques" : "Event Fast Facts Sheet"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 leading-relaxed mb-6">
                    {isFr
                      ? "Vue d'ensemble résumant les dates 2026/2027, le lieu, la participation de 500+ investisseurs et 100+ sociétés minières."
                      : "Quick-reference fact sheet summarizing dates, Québec City venue details, attendee demographics and Tier 1 stats."}
                  </p>
                </div>
                <Link
                  href="/about"
                  className="w-full text-center px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-slate-800 hover:bg-[#C6112F] hover:text-white text-neutral-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider transition-all shadow-xs"
                >
                  {isFr ? "Consulter la Fiche de Faits" : "View Conference Overview"}
                </Link>
              </div>

              {/* Card 3: Press Photos & B-Roll */}
              <div className="bg-white dark:bg-[#131b2e] rounded-2xl border border-neutral-200 dark:border-[#233049] p-6 sm:p-7 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-[#C6112F]/10 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] mb-5">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    {isFr ? "Galerie Photo Presse" : "Press Photography & Gallery"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 leading-relaxed mb-6">
                    {isFr
                      ? "Accédez aux galeries photo haute définition des conférences, discours principaux, cérémonies et sessions de réseautage."
                      : "High-resolution photo library covering conference floors, keynote stages, SHE-Co forums, and investor networking."}
                  </p>
                </div>
                <Link
                  href="/media"
                  className="w-full text-center px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-slate-800 hover:bg-[#C6112F] hover:text-white text-neutral-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider transition-all shadow-xs"
                >
                  {isFr ? "Explorer la Galerie Photo" : "Browse Media Gallery"}
                </Link>
              </div>
            </div>

            {/* Quick Fact Box */}
            <div className="bg-white dark:bg-[#131b2e] rounded-3xl border border-neutral-200 dark:border-[#233049] p-6 sm:p-8 text-left">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#C6112F] mb-4">
                {isFr ? "RÈGLES ÉDITORIALES & MENTIONS OFFICIELLES" : "EDITORIAL CITATION & BOILERPLATE"}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 leading-relaxed mb-4">
                <strong>{isFr ? "Description officielle de l'événement :" : "Official Event Boilerplate:"}</strong> &ldquo;THE Mining Investment Event of the North—Canada’s Only Tier 1 Global Mining Investment Conference© is held annually in Québec City, Canada. It is independently owned and partnered to facilitate privately arranged meetings among mining companies, international institutional investors and government authorities.&rdquo;
              </p>
              <div className="text-[11px] text-neutral-400 dark:text-slate-500 font-medium">
                {isFr
                  ? "Pour toute citation ou demande d'entrevue avec les organisateurs, mentionner : THE Mining Investment Event."
                  : "When citing the event in print or broadcast publications, please attribute to: THE Mining Investment Event."}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            8. MEDIA ACCREDITATION & INQUIRIES
        ══════════════════════════════════════════════════════════════ */}
        <section id="accreditation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
            {/* Left Accreditation Information */}
            <div className="lg:col-span-7 bg-white dark:bg-[#131b2e] rounded-3xl border border-neutral-200 dark:border-[#233049] p-8 sm:p-12 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C6112F] block mb-2">
                  {isFr ? "ACCRÉDITATION DES MÉDIAS" : "PRESS ACCREDITATION"}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white uppercase tracking-tight mb-4">
                  {isFr ? "Accréditation & Accès Journalistes" : "Journalist & Media Passes"}
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-slate-300 leading-relaxed mb-6">
                  {isFr
                    ? "L'accès média est accordé aux journalistes accrédités, correspondants financiers, équipes de tournage et analystes de l'industrie représentant des médias reconnus."
                    : "Complimentary press credentials are granted to accredited journalists, financial columnists, broadcast teams, and industry analysts representing recognized news organizations."}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-[#C6112F] font-black">✓</span>
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-slate-300">
                      {isFr ? "Accès complet aux discours d'ouverture et panels exécutifs" : "Full access to keynote stages and executive panels"}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#C6112F] font-black">✓</span>
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-slate-300">
                      {isFr ? "Espace de travail presse dédié avec Wi-Fi haute vitesse et studio d'entrevues" : "Dedicated press lounge with high-speed Wi-Fi & interview workspace"}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#C6112F] font-black">✓</span>
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-slate-300">
                      {isFr ? "Facilitation d'interviews individuelles avec les PDG participants" : "Assistance with 1-on-1 interview requests with participating CEOs"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-neutral-100 dark:border-[#1d273b]">
                <button
                  onClick={() => setIsAccreditationOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black uppercase tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  {isFr ? "DEMANDER UNE ACCRÉDITATION" : "APPLY FOR MEDIA ACCREDITATION"}
                </button>
                <a
                  href="mailto:info@mininginvestmentevent.com?subject=Press%20Accreditation%20Inquiry"
                  className="text-xs sm:text-sm font-bold text-neutral-600 dark:text-slate-300 hover:text-[#C6112F] transition-colors"
                >
                  {isFr ? "Ou contacter info@mininginvestmentevent.com" : "Or email info@mininginvestmentevent.com"}
                </a>
              </div>
            </div>

            {/* Right Contact Card & Newsletter */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Media Relations Office Card */}
              <div className="bg-gradient-to-br from-[#18181b] to-[#0e1626] text-white rounded-3xl p-8 border border-neutral-800 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[#C6112F] text-xs font-black tracking-widest uppercase block mb-2">
                    {isFr ? "BUREAU DES RELATIONS MÉDIAS" : "MEDIA RELATIONS CONTACT"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black mb-4">
                    THE Event Press Office
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                    {isFr
                      ? "Pour toute demande urgente de presse, interviews avec les organisateurs ou vérification de faits :"
                      : "For urgent media inquiries, speaker interviews, or press badge confirmations:"}
                  </p>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-[#C6112F] font-bold">✉</span>
                      <a
                        href="mailto:info@mininginvestmentevent.com"
                        className="text-neutral-200 hover:text-[#C6112F] transition-colors font-medium"
                      >
                        info@mininginvestmentevent.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#C6112F] font-bold">📍</span>
                      <span className="text-neutral-300">
                        Centre des congrès de Québec, QC, Canada
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#C6112F] font-bold">⏱</span>
                      <span className="text-neutral-400">
                        {isFr ? "Délai de réponse : moins de 24 heures" : "Response time: under 24 hours"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <a
                    href="mailto:info@mininginvestmentevent.com"
                    className="inline-block w-full text-center px-4 py-3 rounded-xl bg-white/10 hover:bg-[#C6112F] text-white text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    {isFr ? "Envoyer un Courriel Média" : "Send Press Inquiry"}
                  </a>
                </div>
              </div>

              {/* Newsletter Alerts Box */}
              <div className="bg-white dark:bg-[#131b2e] rounded-3xl border border-neutral-200 dark:border-[#233049] p-8">
                <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                  {isFr ? "Recevoir les Alertes Presse" : "Subscribe to Press Alerts"}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {isFr
                    ? "Recevez instantanément nos communiqués officiels et avis aux médias dès leur diffusion."
                    : "Receive official embargoed releases and event bulletins directly in your inbox."}
                </p>

                {newsletterSubscribed ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl text-center">
                    ✓ {isFr ? "Merci! Vous êtes inscrit aux alertes presse." : "Thank you! You are subscribed to press alerts."}
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder={isFr ? "Votre courriel professionnel..." : "Your work email..."}
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-grow px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0e1626] border border-neutral-200 dark:border-[#233049] text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#C6112F]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer"
                    >
                      {isFr ? "S'inscrire" : "Join"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CALL TO ACTION
        ══════════════════════════════════════════════════════════════ */}
        <div className="mt-8">
          <GetInTouchCTA />
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════
          MODAL 1: PRESS RELEASE QUICK VIEW MODAL
      ══════════════════════════════════════════════════════════════ */}
      {selectedPressRelease && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#131b2e] rounded-3xl border border-neutral-200 dark:border-[#233049] shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#233049] pb-4 mb-4">
              <span className="px-3 py-1 rounded bg-[#C6112F]/10 text-[#C6112F] text-[10px] font-black uppercase">
                {isFr ? "COMMUNIQUÉ OFFICIEL" : "OFFICIAL PRESS RELEASE"}
              </span>
              <button
                onClick={() => setSelectedPressRelease(null)}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-white flex items-center justify-center font-bold text-sm hover:bg-[#C6112F] hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <span className="text-xs text-neutral-400 font-semibold mb-2 block">
              {selectedPressRelease.date}
            </span>

            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white leading-snug mb-4">
              {selectedPressRelease.title}
            </h3>

            <div className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 leading-relaxed space-y-3 mb-6 whitespace-pre-line">
              {selectedPressRelease.body || selectedPressRelease.summary}
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-[#233049] flex flex-wrap items-center justify-between gap-3">
              {selectedPressRelease.slug ? (
                <Link
                  href={`/newsflash/${selectedPressRelease.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-[#C6112F] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#a50e27] transition-all"
                >
                  {isFr ? "Ouvrir la page complète →" : "Open Full Release Page →"}
                </Link>
              ) : (
                <div />
              )}
              <button
                onClick={() => setSelectedPressRelease(null)}
                className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-slate-800 text-xs font-bold text-neutral-700 dark:text-slate-300 cursor-pointer"
              >
                {isFr ? "Fermer" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL 2: YOUTUBE VIDEO PLAYER MODAL
      ══════════════════════════════════════════════════════════════ */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#131b2e] rounded-3xl border border-[#233049] overflow-hidden shadow-2xl flex flex-col text-left">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#233049] bg-[#0e1626]">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="bg-[#C6112F] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shrink-0">
                  {isFr && activeVideo.categoryFR ? activeVideo.categoryFR : activeVideo.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                  {isFr ? activeVideo.titleFR : activeVideo.titleEN}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C6112F] text-white flex items-center justify-center font-bold text-base transition-colors shrink-0 cursor-pointer ml-3"
              >
                ✕
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId || "L_LUpnjgPso"}?autoplay=1`}
                title={isFr ? activeVideo.titleFR : activeVideo.titleEN}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-4 sm:p-6 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-neutral-300">THE Mining Investment Event Official Broadcast</span>
                <span>{isFr ? activeVideo.dateFR : activeVideo.dateEN}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isFr ? activeVideo.snippetFR : activeVideo.snippetEN}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MODAL 3: MEDIA ACCREDITATION APPLICATION MODAL
      ══════════════════════════════════════════════════════════════ */}
      {isAccreditationOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#131b2e] rounded-3xl border border-neutral-200 dark:border-[#233049] shadow-2xl p-6 sm:p-8 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#233049] pb-4 mb-5">
              <div>
                <span className="text-[#C6112F] text-[10px] font-black uppercase tracking-wider block">
                  {isFr ? "ACCRÉDITATION OFFICIELLE" : "OFFICIAL CREDENTIALS"}
                </span>
                <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">
                  {isFr ? "Demande de Passe Média" : "Media Pass Request"}
                </h3>
              </div>
              <button
                onClick={() => setIsAccreditationOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-white flex items-center justify-center font-bold text-sm hover:bg-[#C6112F] hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {accreditationSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {isFr ? "Demande transmise avec succès!" : "Application Submitted Successfully!"}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-slate-400 max-w-sm mx-auto">
                  {isFr
                    ? "Notre équipe des relations de presse examinera votre demande et communiquera avec vous dans les 24 heures ouvrables."
                    : "Our media relations department will review your credentials and confirm accreditation within 24 business hours."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleAccreditationSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                    {isFr ? "Nom Complet *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={accreditationForm.fullName}
                    onChange={(e) => setAccreditationForm({ ...accreditationForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0e1626] border border-neutral-200 dark:border-[#233049] text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#C6112F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                      {isFr ? "Média / Publication *" : "Media Outlet / Publication *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Financial Post, Bloomberg"
                      value={accreditationForm.outlet}
                      onChange={(e) => setAccreditationForm({ ...accreditationForm, outlet: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0e1626] border border-neutral-200 dark:border-[#233049] text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#C6112F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                      {isFr ? "Courriel Professionnel *" : "Work Email *"}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@outlet.com"
                      value={accreditationForm.email}
                      onChange={(e) => setAccreditationForm({ ...accreditationForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0e1626] border border-neutral-200 dark:border-[#233049] text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#C6112F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                      {isFr ? "Rôle / Fonction" : "Professional Role"}
                    </label>
                    <select
                      value={accreditationForm.role}
                      onChange={(e) => setAccreditationForm({ ...accreditationForm, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0e1626] border border-neutral-200 dark:border-[#233049] text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#C6112F]"
                    >
                      <option value="Journalist / Correspondent">Journalist / Correspondent</option>
                      <option value="Editor / Senior Producer">Editor / Senior Producer</option>
                      <option value="Camera / Broadcast Crew">Camera / Broadcast Crew</option>
                      <option value="Financial Analyst / Researcher">Financial Analyst / Researcher</option>
                      <option value="Freelance Reporter">Freelance Reporter</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                      {isFr ? "Pays" : "Country"}
                    </label>
                    <input
                      type="text"
                      placeholder="Canada, USA, UK..."
                      value={accreditationForm.country}
                      onChange={(e) => setAccreditationForm({ ...accreditationForm, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0e1626] border border-neutral-200 dark:border-[#233049] text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#C6112F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-slate-300 block mb-1">
                    {isFr ? "Notes ou entrevues sollicitées" : "Coverage Intent / Requested Interviews"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={
                      isFr
                        ? "Précisez vos besoins particuliers ou les intervenants que vous souhaitez interviewer..."
                        : "Describe planned coverage or specific speakers/companies you wish to interview..."
                    }
                    value={accreditationForm.notes}
                    onChange={(e) => setAccreditationForm({ ...accreditationForm, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0e1626] border border-neutral-200 dark:border-[#233049] text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#C6112F]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAccreditationOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-slate-800 text-xs font-bold text-neutral-700 dark:text-slate-300 cursor-pointer"
                  >
                    {isFr ? "Annuler" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    {isFr ? "Soumettre la Demande" : "Submit Accreditation"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
