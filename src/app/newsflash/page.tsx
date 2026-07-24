"use client";

import React, { useState } from "react";
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
}

const tagTranslations: Record<string, { EN: string; FR: string }> = {
  All: { EN: "All Updates", FR: "Toutes les mises à jour" },
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
    fullBodyFR: "THE Mining Investment Event of the North est heureux d'annoncer ses conférenciers principaux et la liste des panels exécutifs pour la prochaine conférence 2026 au Centre des congrès de Québec. Mettant en vedette des dirigeants de premier plan, des représentants gouvernementaux et des investisseurs institutionnels, le programme 2026 aborde les tendances clés des minéraux critiques, de l'innovation ESG, des marchés des capitaux et du développement mondial des ressources.",
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
    fullBodyEN: "Organizers of THE Mining Investment Event are proud to unveil the initial lineup of participating public mining companies and sponsors for the 2026 edition in Quebec City. Presenting issuers represent high-quality exploration, development, and production companies spanning gold, copper, battery metals, and critical minerals.",
    fullBodyFR: "Les organisateurs de THE Mining Investment Event sont fiers de dévoiler la liste initiale des sociétés minières cotées et des commanditaires participants pour l'édition 2026 à Québec. Les émetteurs présentateurs représentent des sociétés d'exploration, de développement et de production de haute qualité dans les secteurs de l'or, du cuivre, des métaux pour batteries et des minéraux critiques.",
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
    fullBodyEN: "THE Mining Investment Event, together with the International Trade and Finance Association (ITFA) and Association minière du Québec (AMQ), is thrilled to announce Quebec City's inaugural International Mining Week, uniting global mining leaders, investors, and policymakers.",
    fullBodyFR: "THE Mining Investment Event, en collaboration avec l'Association internationale du commerce et de la finance (ITFA) et l'Association minière du Québec (AMQ), est ravi d'annoncer la première Semaine internationale des mines de Québec, réunissant des dirigeants miniers mondiaux, des investisseurs et des décideurs politiques.",
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
    fullBodyEN: "The Student Sponsorship Program, generously supported by Glencore Canada, awards top geology, mining engineering, and finance students full sponsorship to attend THE Event, participate in mentorship sessions, and connect directly with corporate leadership.",
    fullBodyFR: "Le programme de parrainage étudiant, généreusement soutenu par Glencore Canada, accorde aux meilleurs étudiants en géologie, en génie minier et en finance un parrainage complet pour assister à L'Événement, participer à des séances de mentorat et entrer en contact direct avec les dirigeants d'entreprises.",
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
  },
  {
    id: "7",
    tagCategory: "Students",
    dateEN: "Jul 16, 2024",
    dateFR: "16 juillet 2024",
    headlineEN: "Announces Winners of '2024 THE Student Sponsorship' Sponsored by Osisko Mining & Glencore Canada",
    headlineFR: "Annonce des gagnants de la bourse étudiante 2024 commanditée par Osisko Mining & Glencore",
    snippetEN: "THE Mining Investment Event of the North announces the winners of the 2024 Student Sponsorship, sponsored by Osisko Mining and Glencore Canada.",
    snippetFR: "THE Mining Investment Event of the North annonce les gagnants de la bourse étudiante 2024, parrainée par Osisko Mining et Glencore Canada.",
  },
  {
    id: "8",
    tagCategory: "Speakers",
    dateEN: "May 30, 2024",
    dateFR: "30 mai 2024",
    headlineEN: "Quebec City: Announces Sold Out Status for Speaking Slots",
    headlineFR: "Québec : Annonce de la fermeture des inscriptions pour les conférenciers",
    snippetEN: "THE Mining Investment Event of the North announces sold-out status for all speaking slots ahead of its conference in Quebec City.",
    snippetFR: "THE Mining Investment Event of the North annonce que tous les créneaux de présentation affichent complet avant la conférence de Québec.",
  },
  {
    id: "9",
    tagCategory: "Keynote",
    dateEN: "May 2, 2024",
    dateFR: "2 mai 2024",
    headlineEN: "Welcomes Keynote Speaker Jennifer Knight",
    headlineFR: "Accueil de la conférencière d'honneur Jennifer Knight",
    snippetEN: "THE Mining Investment Event of the North welcomes Jennifer Knight as a keynote speaker for the conference.",
    snippetFR: "THE Mining Investment Event of the North accueille Jennifer Knight comme conférencière d'honneur pour la conférence.",
  },
  {
    id: "10",
    tagCategory: "Keynote",
    dateEN: "Apr 9, 2024",
    dateFR: "9 avril 2024",
    headlineEN: "Announces Keynote Speaker Maïté Blanchette Vézina, Quebec Minister of Natural Resources and Forests",
    headlineFR: "Annonce de la conférencière d'honneur Maïté Blanchette Vézina, ministre des Ressources naturelles et des Forêts du Québec",
    snippetEN: "THE Mining Investment Event of the North announces Maïté Blanchette Vézina, Quebec Minister of Natural Resources and Forests, as a keynote speaker.",
    snippetFR: "THE Mining Investment Event of the North annonce la présence de Maïté Blanchette Vézina, ministre des Ressources naturelles et des Forêts du Québec.",
  },
  {
    id: "11",
    tagCategory: "SHE-CO",
    dateEN: "Mar 4, 2024",
    dateFR: "4 mars 2024",
    headlineEN: "Glencore Canada Named Gold Sponsor of THE Student Sponsorship 2024",
    headlineFR: "Glencore Canada nommé commanditaire Or de la bourse étudiante 2024",
    snippetEN: "THE Mining Investment Event of the North announces Glencore Canada as a Gold Sponsor of THE Student Sponsorship 2024.",
    snippetFR: "THE Mining Investment Event of the North nomme Glencore Canada comme commanditaire Or pour la bourse étudiante 2024.",
  },
  {
    id: "12",
    tagCategory: "Keynote",
    dateEN: "Feb 29, 2024",
    dateFR: "29 février 2024",
    headlineEN: "Announces Keynote Speaker Pierre Fitzgibbon, Quebec Minister of Economy, Innovation and Energy",
    headlineFR: "Annonce du conférencier d'honneur Pierre Fitzgibbon, ministre de l'Économie, de l'Innovation et de l'Énergie du Québec",
    snippetEN: "THE Mining Investment Event of the North announces Pierre Fitzgibbon as a keynote speaker for the conference.",
    snippetFR: "THE Mining Investment Event of the North annonce Pierre Fitzgibbon, ministre de l'Économie, de l'Innovation et de l'Énergie, comme conférencier d'honneur.",
  },
  {
    id: "13",
    tagCategory: "Students",
    dateEN: "Jan 9, 2024",
    dateFR: "9 janvier 2024",
    headlineEN: "Announces Osisko Mining as THE 2024 Student Sponsor",
    headlineFR: "Annonce d'Osisko Mining comme commanditaire du programme étudiant 2024",
    snippetEN: "THE Mining Investment Event of the North announces Osisko Mining as THE 2024 Student Sponsor.",
    snippetFR: "THE Mining Investment Event of the North annonce Osisko Mining comme commanditaire principal du programme étudiant 2024.",
  },
  {
    id: "14",
    tagCategory: "Issuer Update",
    dateEN: "Dec 15, 2023",
    dateFR: "15 décembre 2023",
    headlineEN: "Announcement from THE Event Issuer First Phosphate (CSE: PHOS)",
    headlineFR: "Annonce de l'émetteur de L'Événement First Phosphate (CSE: PHOS)",
    snippetEN: "An update from THE Event Issuer First Phosphate (CSE: PHOS) (OTC Pink: FRSPF) (FSE: KD0).",
    snippetFR: "Mise à jour concernant l'émetteur First Phosphate (CSE: PHOS) (OTC Pink: FRSPF) (FSE: KD0).",
  },
  {
    id: "15",
    tagCategory: "Issuer Update",
    dateEN: "Nov 29, 2023",
    dateFR: "29 novembre 2023",
    headlineEN: "Announcement from THE Event Issuer First Phosphate (CSE: PHOS)",
    headlineFR: "Annonce de l'émetteur de L'Événement First Phosphate (CSE: PHOS)",
    snippetEN: "An update from THE Event Issuer First Phosphate (CSE: PHOS) (OTC Pink: FRSPF) (FSE: KD0).",
    snippetFR: "Mise à jour concernant l'émetteur First Phosphate (CSE: PHOS) (OTC Pink: FRSPF) (FSE: KD0).",
  },
];

export default function NewsflashPage() {
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

  const firstFeatured = selectedTagCategory === "All" && searchQuery === "" ? rawNewsData[0] : null;
  const remainingNews = firstFeatured ? filteredRaw.slice(1) : filteredRaw;

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f4f7fa]">
        {/* ═══════ HERO ═══════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/15 via-transparent to-transparent" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-14 sm:pb-18 md:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-500">{t("nav-about", "About")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("nav-newsflash", "THE Newsflash")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("news-hero-title-1", "THE")} <span className="text-[#C6112F]">{t("news-hero-title-2", "Newsflash")}</span>
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] mt-6" />
          </div>
        </section>

        {/* ═══════ NEWS FEED ═══════ */}
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("news-latest-label", "LATEST UPDATES")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("news-section-title-1", "Stay Informed with")} <span className="text-[#C6112F]">{t("news-section-title-2", "THE Newsflash")}</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-4" />
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-[700px] mb-10 font-medium">
              {t(
                "news-section-desc",
                "The latest news, announcements and updates from THE Mining Investment Event. Subscribe to stay current with conference programming, speaker announcements, and initiative updates."
              )}
            </p>

            {/* Filter Tags & Search Input Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const label = tagTranslations[cat] ? tagTranslations[cat][lang] : cat;
                  const isSelected = selectedTagCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedTagCategory(cat)}
                      className={`px-4.5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-200 ${
                        isSelected
                          ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20 scale-105"
                          : "bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100 hover:text-neutral-900 shadow-2xs"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72 shrink-0">
                <svg className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  placeholder={lang === "FR" ? "Rechercher..." : "Search updates..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200/90 rounded-full text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#C6112F] transition-colors shadow-2xs"
                />
              </div>
            </div>

            {/* 🌟 FEATURED RELEASE CARD 🌟 */}
            {firstFeatured && (
              <div className="mb-10">
                <article className="group relative bg-[#0f1117] rounded-3xl p-8 sm:p-10 shadow-2xl border border-neutral-800 hover:border-[#C6112F]/60 transition-all duration-300 overflow-hidden">
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8">
                      {/* Featured Badge */}
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="bg-[#C6112F] text-white text-[10px] font-black tracking-[0.2em] uppercase px-3.5 py-1 rounded-full shadow-md">
                          {lang === "FR" ? "DERNIÈRE ANNONCE" : "FEATURED RELEASE"}
                        </span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-neutral-300 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm">
                          <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                          </svg>
                          {lang === "FR" ? firstFeatured.dateFR : firstFeatured.dateEN}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3 group-hover:text-[#C6112F] transition-colors duration-300">
                        {lang === "FR" ? firstFeatured.headlineFR : firstFeatured.headlineEN}
                      </h3>

                      {/* Snippet */}
                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal max-w-[800px]">
                        {lang === "FR" ? firstFeatured.snippetFR : firstFeatured.snippetEN}
                      </p>
                    </div>

                    {/* Right CTA Area */}
                    <div className="lg:col-span-4 flex lg:justify-end">
                      <button
                        onClick={() => setActiveModalItem(firstFeatured)}
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#C6112F] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#a50e27] transition-all duration-300 shadow-md group-hover:scale-105"
                      >
                        <span>{t("news-read-more", "Read More")}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* 🌟 ADORABLE & CLEAN NEWS CARDS GRID 🌟 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingNews.map((item) => {
                const headline = lang === "FR" ? item.headlineFR : item.headlineEN;
                const snippet = lang === "FR" ? item.snippetFR : item.snippetEN;
                const date = lang === "FR" ? item.dateFR : item.dateEN;
                const tag = tagTranslations[item.tagCategory] ? tagTranslations[item.tagCategory][lang] : item.tagCategory;

                return (
                  <article
                    key={item.id}
                    className="group relative bg-white border border-neutral-200/90 rounded-2xl p-6 shadow-2xs hover:shadow-[0_16px_36px_rgba(198,17,47,0.08)] hover:border-[#C6112F]/40 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top Red Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#C6112F] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Date Pill & Tag Badge Row */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="px-3 py-1 bg-neutral-100/90 rounded-full text-neutral-500 font-medium text-[11px] flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-[#C6112F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                          </svg>
                          <span>{date}</span>
                        </div>
                        <span className="px-3 py-1 bg-[#C6112F]/10 text-[#C6112F] group-hover:bg-[#C6112F] group-hover:text-white text-[10px] font-bold tracking-wider uppercase rounded-full transition-colors duration-300">
                          {tag}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-base sm:text-lg font-black text-[#1a1f2c] leading-snug mb-3 group-hover:text-[#C6112F] transition-colors duration-300">
                        {headline}
                      </h3>

                      {/* Snippet */}
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                        {snippet}
                      </p>
                    </div>

                    {/* Read More Row */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="text-xs font-bold tracking-wider uppercase text-neutral-800 group-hover:text-[#C6112F] transition-colors inline-flex items-center gap-1"
                      >
                        <span>{t("news-read-more", "Read More")}</span>
                      </button>
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-700 group-hover:bg-[#C6112F] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-2xs"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Subscribe footer */}
            <div className="mt-16 text-center bg-white border border-neutral-200/80 rounded-3xl p-8 shadow-2xs">
              <p className="text-neutral-600 text-sm font-medium">
                {t("news-subscribe-text", "For more information and to subscribe to THE Newsflash, contact")}{" "}
                <a href="mailto:jchoi@irinc.ca" className="text-[#C6112F] font-bold hover:underline ml-1">
                  jchoi@irinc.ca
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 ARTICLE PREVIEW MODAL 🌟 */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
            <div className="bg-white rounded-3xl max-w-[720px] w-full p-6 sm:p-10 shadow-2xl border border-neutral-200 relative my-auto">
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 hover:bg-[#C6112F] hover:text-white text-neutral-600 flex items-center justify-center transition-colors font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#fef2f2] text-[#C6112F] border border-[#C6112F]/15 text-[11px] font-black uppercase rounded-full">
                  {tagTranslations[activeModalItem.tagCategory] ? tagTranslations[activeModalItem.tagCategory][lang] : activeModalItem.tagCategory}
                </span>
                <span className="text-neutral-500 font-semibold text-xs">
                  {lang === "FR" ? activeModalItem.dateFR : activeModalItem.dateEN}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] leading-tight mb-4">
                {lang === "FR" ? activeModalItem.headlineFR : activeModalItem.headlineEN}
              </h2>
              <div className="w-12 h-[3px] bg-[#C6112F] rounded-full mb-6" />

              <div className="text-neutral-700 text-sm sm:text-base leading-relaxed font-medium space-y-4 mb-8">
                <p className="font-semibold text-neutral-800">{lang === "FR" ? activeModalItem.snippetFR : activeModalItem.snippetEN}</p>
                {activeModalItem.fullBodyEN && (
                  <p className="pt-3 border-t border-neutral-100">
                    {lang === "FR" ? activeModalItem.fullBodyFR : activeModalItem.fullBodyEN}
                  </p>
                )}
              </div>

              <div className="p-4 bg-[#f8fafc] border border-neutral-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-semibold text-neutral-600">
                  Media Contact: <a href="mailto:jchoi@irinc.ca" className="text-[#C6112F] font-bold hover:underline">jchoi@irinc.ca</a>
                </div>
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#C6112F] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#a80d26] transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
