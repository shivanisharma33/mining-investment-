"use client";

import React, { useState, useMemo, useEffect } from "react";
import { SPEAKERS, SPEAKERS_2025, SPEAKERS_2024, SPEAKERS_2023, RawSpeaker } from "@/app/past-editions/editionData";
import { useLanguage } from "@/context/LanguageContext";
import { fetchSpeakersByYear } from "@/lib/speakersApi";

function translateSpeakerTitle(title: string, isFr: boolean): string {
  if (!isFr || !title) return title;

  const translations: Record<string, string> = {
    "Department of Energy and Mines": "Ministère de l'Énergie et des Mines",
    "Parliamentary Secretary to the Minister of Energy & Natural Resources": "Secrétaire parlementaire du ministre de l'Énergie et des Ressources naturelles",
    "Parliamentary Secretary to the Prime Minister": "Secrétaire parlementaire du Premier ministre",
    "Minister of Mining and Critical Minerals": "Ministre des Mines et des Minéraux critiques",
    "Minister of Natural Resources and Forests, Quebec": "Ministre des Ressources naturelles et des Forêts du Québec",
    "U.S. Ambassador to Canada": "Ambassadeur des États-Unis au Canada",
    "Speaker & Industry Expert": "Conférencier & Expert de l'industrie",
    "Speaker": "Conférencier",
    "Chief Financial Officer": "Directeur financier (CFO)",
    "President & CEO": "Président et PDG",
    "CEO & Director": "PDG et administrateur",
    "Chief Executive Officer": "Chef de la direction",
    "President, CEO & Director": "Président, PDG et administrateur",
    "VP, Investor Relations & Development": "VP, Relations investisseurs et développement",
    "Vice President, Corporate Communications": "Vice-présidente, Communications d'entreprise",
    "Vice President, Investor Relations": "Vice-présidente, Relations avec les investisseurs",
    "Managing Director & CEO": "Directeur général et PDG",
    "Chief Strategy & Risk Officer": "Directrice de la stratégie et des risques",
    "EVP, Chief Strategy & Technology Officer": "VPE, Directeur de la stratégie et de la technologie",
    "Vice President, Corporate Development & IR": "Vice-président, Développement d'entreprise et RI",
    "Director, Capital Markets & Corporate Development": "Directeur, Marchés des capitaux et développement",
    "Moderator": "Modérateur",
    "Panel Moderator": "Modérateur de panel",
    "Panelist": "Panéliste",
    "Fireside Speaker": "Conférencier de causerie",
    "Founder": "Fondateur",
    "President": "Président",
  };

  if (translations[title]) return translations[title];

  return title
    .replace(/Speaker & Industry Expert/gi, "Conférencier & Expert de l'industrie")
    .replace(/Speaker/gi, "Conférencier")
    .replace(/Chief Financial Officer/gi, "Directeur financier")
    .replace(/President & CEO/gi, "Président et PDG")
    .replace(/Chief Executive Officer/gi, "Chef de la direction")
    .replace(/CEO & Director/gi, "PDG et administrateur")
    .replace(/Managing Director/gi, "Directeur général")
    .replace(/Vice President/gi, "Vice-président")
    .replace(/Moderator/gi, "Modérateur")
    .replace(/Panelist/gi, "Panéliste")
    .replace(/Department of/gi, "Ministère de")
    .replace(/Parliamentary Secretary/gi, "Secrétaire parlementaire");
}

function cleanOrgName(org: string): string {
  if (!org) return "";
  const cleaned = org.trim();
  // Fix known client typo where Crux Investor was written as "Crux Investo"
  if (/^crux investo\b/i.test(cleaned)) {
    return "Crux Investor";
  }
  return cleaned;
}

function translateSpeakerOrg(org: string, isFr: boolean): string {
  if (!org) return "";
  const cleaned = cleanOrgName(org);
  if (!isFr) return cleaned;

  const translations: Record<string, string> = {
    "Government of Newfoundland & Labrador": "Gouvernement de Terre-Neuve-et-Labrador",
    "Government of Québec": "Gouvernement du Québec",
    "Government of Canada": "Gouvernement du Canada",
    "Government of British Columbia": "Gouvernement de la Colombie-Britannique",
    "United States of America": "États-Unis d'Amérique",
    "Mining Industry Executive": "Cadre de l'industrie minière",
    "Independent": "Indépendant",
    "Crux Investor": "Crux Investor",
  };

  return translations[cleaned] || cleaned;
}

function getCategoryStyles(category: string, lang: string) {
  switch (category) {
    case "gov":
      return {
        label: lang === "FR" ? "CONFÉRENCIER" : "KEYNOTE",
        avGrad: "from-[#C6112F] to-[#7A0011]",
        badge: "bg-[#C6112F]/10 text-[#C6112F] border border-[#C6112F]/30",
      };
    case "exec":
      return {
        label: lang === "FR" ? "DIRIGEANT" : "EXECUTIVE",
        avGrad: "from-slate-700 to-slate-900",
        badge: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700",
      };
    case "fin":
      return {
        label: lang === "FR" ? "FINANCE" : "INVESTOR",
        avGrad: "from-neutral-800 to-black",
        badge: "bg-neutral-100 text-neutral-800 dark:bg-zinc-800 dark:text-zinc-200 border border-neutral-300 dark:border-zinc-700",
      };
    case "mod":
      return {
        label: lang === "FR" ? "MODÉRATEUR" : "MODERATOR",
        avGrad: "from-[#C6112F]/80 to-neutral-900",
        badge: "bg-neutral-100 text-neutral-700 dark:bg-zinc-800 dark:text-zinc-300 border border-neutral-200 dark:border-zinc-700",
      };
    default:
      return {
        label: lang === "FR" ? "CONFÉRENCIER" : "SPEAKER",
        avGrad: "from-[#C6112F] to-slate-900",
        badge: "bg-[#C6112F]/10 text-[#C6112F] border border-[#C6112F]/30",
      };
  }
}

function getInitials(name: string) {
  const cleaned = name
    .replace(/^(The Hon.|The Honourable|Grand Chief|Dr.)\s+/i, "")
    .split(" ")
    .filter(Boolean);
  if (cleaned.length === 0) return "";
  const first = cleaned[0][0];
  const last = cleaned.length > 1 ? cleaned[cleaned.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function SpeakerCard({
  speaker,
  lang,
}: {
  speaker: RawSpeaker;
  lang: string;
}) {
  const [imgError, setImgError] = useState(false);
  const styles = getCategoryStyles(speaker.category, lang);
  const initials = getInitials(speaker.name);

  // Normalize organization - fix "Crux Investo" typo
  const orgName = cleanOrgName(speaker.organization);
  const displayOrg = translateSpeakerOrg(orgName, lang === "FR");
  const displayTitle = translateSpeakerTitle(speaker.title, lang === "FR");

  const hasImage = Boolean(speaker.image) && !imgError;

  return (
    <article className="bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 text-center shadow-2xs hover:shadow-xl hover:border-[#C6112F]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group">
      <div>
        {/* Speaker Photo / Avatar: Generous framing & top-aligned positioning so heads aren't chopped off */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4">
          {hasImage ? (
            <div className="w-full h-full rounded-full p-1 ring-2 ring-neutral-200/90 dark:ring-zinc-700 group-hover:ring-[#C6112F]/60 group-hover:shadow-lg transition-all duration-300 bg-white dark:bg-zinc-800 shadow-sm overflow-hidden">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: "50% 12%" }}
                loading="lazy"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div
              className={`w-full h-full rounded-full flex items-center justify-center font-black text-2xl sm:text-3xl text-white shadow-md bg-gradient-to-br ${styles.avGrad} border-4 border-white dark:border-zinc-800 ring-2 ring-neutral-200 dark:ring-zinc-700 group-hover:ring-[#C6112F]/50 transition-all`}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Name - strictly balanced height for grid alignment */}
        <div className="min-h-[44px] flex items-center justify-center mb-1.5 px-1">
          <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white tracking-tight leading-snug line-clamp-2 group-hover:text-[#C6112F] transition-colors">
            {speaker.name}
          </h3>
        </div>

        {/* Title / Role - strictly balanced height for grid alignment */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-2 px-1">
          <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-zinc-400 font-medium leading-tight line-clamp-2 text-center">
            {displayTitle}
          </p>
        </div>

        {/* Company/Org - strictly balanced height for grid alignment */}
        <div className="h-6 flex items-center justify-center mb-4 px-1">
          <span className="text-xs font-extrabold text-[#C6112F] tracking-wide line-clamp-1 text-center">
            {displayOrg}
          </span>
        </div>
      </div>

      {/* Badges - pinned to bottom */}
      <div className="flex justify-center gap-1.5 flex-wrap pt-3 border-t border-neutral-100 dark:border-zinc-800/80">
        <span
          className={`text-[9px] font-black tracking-wider px-2.5 py-0.5 rounded-full uppercase ${styles.badge}`}
        >
          {styles.label}
        </span>
      </div>
    </article>
  );
}

export default function SpeakersView({ year = 2027 }: { year?: number }) {
  const { t, lang } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [apiSpeakers, setApiSpeakers] = useState<RawSpeaker[]>([]);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);

  useEffect(() => {
    if (year) {
      setSelectedYear(year);
    }
  }, [year]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoadingApi(true);

    fetchSpeakersByYear(selectedYear, controller.signal)
      .then((items) => {
        setApiSpeakers(items);
        setIsLoadingApi(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setApiSpeakers([]);
        setIsLoadingApi(false);
      });

    return () => controller.abort();
  }, [selectedYear]);

  const speakersList = useMemo(() => {
    if (selectedYear === 2027) {
      return apiSpeakers;
    }
    if (apiSpeakers.length > 0) {
      return apiSpeakers;
    }
    if (selectedYear === 2026) return SPEAKERS || [];
    if (selectedYear === 2025) return SPEAKERS_2025 || [];
    if (selectedYear === 2024) return SPEAKERS_2024 || [];
    if (selectedYear === 2023) return SPEAKERS_2023 || [];
    return [];
  }, [selectedYear, apiSpeakers]);

  const filteredSpeakers = useMemo(() => {
    return speakersList.filter((sp) => {
      const org = cleanOrgName(sp.organization);
      const matchSearch =
        sp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter ? sp.category === categoryFilter : true;
      return matchSearch && matchCat;
    });
  }, [speakersList, searchTerm, categoryFilter]);

  const uniqueOrgs = useMemo(() => {
    return new Set(speakersList.map((s) => s.organization)).size;
  }, [speakersList]);

  return (
    <div className="w-full text-left">
      {/* Year Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black tracking-widest text-[#C6112F] uppercase">
            {t("spk-filter-edition", "FILTER EDITION")}:
          </span>
          <div className="flex gap-2">
            {[2027, 2026, 2025, 2024].map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${selectedYear === y
                  ? "bg-[#C6112F] text-white shadow-md"
                  : "bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-200 dark:hover:bg-zinc-700"
                  }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-bold text-neutral-500 dark:text-zinc-400">
          {selectedYear === 2027 && speakersList.length === 0
            ? (lang === "FR" ? "Édition 2027 à venir" : "2027 Edition Coming Soon")
            : (lang === "FR"
              ? `Affichage de ${filteredSpeakers.length} sur ${speakersList.length} conférenciers officiels ${selectedYear}`
              : `Showing ${filteredSpeakers.length} of ${speakersList.length} Official ${selectedYear} Speakers`)}
        </span>
      </div>

      {/* LOADING STATE */}
      {isLoadingApi && speakersList.length === 0 ? (
        <div className="rounded-3xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-[#18181b] p-12 text-center flex flex-col items-center justify-center min-h-[300px] my-4">
          <span className="w-10 h-10 rounded-full border-3 border-neutral-200 dark:border-slate-700 border-t-[#C6112F] animate-spin mb-4" />
          <p className="text-sm font-bold text-neutral-500 dark:text-zinc-400 uppercase tracking-wider">
            Loading speakers data...
          </p>
        </div>
      ) : selectedYear === 2027 && speakersList.length === 0 ? (
        /* 2027 COMING SOON CARD */
        <div className="rounded-3xl border border-neutral-200/90 dark:border-zinc-800 bg-gradient-to-br from-white via-slate-50 to-neutral-100 dark:from-[#18181b] dark:via-[#121215] dark:to-[#1a1a22] p-8 sm:p-14 text-center shadow-lg relative overflow-hidden my-4">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C6112F]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#C6112F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-[#C6112F]/10 text-[#C6112F] border border-[#C6112F]/20 flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-[#C6112F]/15 text-[#C6112F] text-xs font-black tracking-[0.2em] uppercase mb-4 border border-[#C6112F]/20">
              {lang === "FR" ? "À VENIR" : "COMING SOON"}
            </span>

            <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight mb-4">
              {lang === "FR" ? "Conférenciers 2027 à venir" : "2027 Speakers Lineup Coming Soon"}
            </h3>

            <p className="text-neutral-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-medium mb-8 max-w-xl">
              {lang === "FR"
                ? "La liste officielle des conférenciers de L'Événement 2027 est en cours de finalisation. Revenez bientôt pour découvrir les conférenciers vedettes et les dirigeants de l'industrie !"
                : "The official speaker lineup for Mining Investment Event 2027 is currently being finalized. Check back soon for announcements on keynote presenters, industry leaders, and executive panelists!"}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="mailto:jchoi@irinc.ca?subject=Speaking Inquiry 2027"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C6112F] hover:bg-[#a80e27] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-xl shadow-md hover:shadow-lg transition-all text-center transform hover:-translate-y-0.5 cursor-pointer"
              >
                {lang === "FR" ? "POSTULER COMME CONFÉRENCIER" : "APPLY TO SPEAK"}
              </a>

              <a
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-zinc-800 border border-neutral-300 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-700 text-neutral-900 dark:text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-xl shadow-xs hover:shadow-md transition-all text-center cursor-pointer"
              >
                {lang === "FR" ? "S'INSCRIRE POUR 2027" : "REGISTER FOR 2027"}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 3 Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="3.4" />
                  <path d="M5.5 20c.8-3.6 3.3-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-black text-neutral-900 dark:text-white block leading-tight">
                  {speakersList.length}
                </span>
                <span className="text-xs text-neutral-500 dark:text-zinc-400 font-semibold">
                  {t("spk-stat-featured", "Featured Speakers")}
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M16 2v4M8 2v4M3 9h18" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-black text-neutral-900 dark:text-white block leading-tight">
                  4 {t("spk-stat-days", "Days")}
                </span>
                <span className="text-xs text-neutral-500 dark:text-zinc-400 font-semibold">
                  {t("spk-stat-sessions", "Keynotes & Panels")}
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-[#18181b] border border-neutral-200/90 dark:border-zinc-800 rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-md hover:border-[#C6112F]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#C6112F]/10 text-[#C6112F] flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-black text-neutral-900 dark:text-white block leading-tight">
                  {uniqueOrgs}+
                </span>
                <span className="text-xs text-neutral-500 dark:text-zinc-400 font-semibold">
                  {t("spk-stat-[#orgs]", "Represented Orgs")}
                </span>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <svg className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={
                  lang === "FR"
                    ? "Rechercher par nom, titre ou organisation..."
                    : "Search speakers by name, title, or organization..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-zinc-700 rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 shadow-2xs"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white dark:bg-[#18181b] border border-neutral-300 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white focus:outline-none focus:border-[#C6112F] shadow-2xs cursor-pointer"
            >
              <option value="">{lang === "FR" ? "Toutes les catégories" : "All Categories"}</option>
              <option value="gov">{lang === "FR" ? "Conférenciers & Gouvernement" : "Keynotes & Government"}</option>
              <option value="exec">{lang === "FR" ? "Dirigeants d'entreprise" : "Corporate Executives"}</option>
              <option value="fin">{lang === "FR" ? "Finance & Investisseurs" : "Finance & Investors"}</option>
              <option value="mod">{lang === "FR" ? "Modérateurs" : "Moderators"}</option>
            </select>
          </div>

          {/* Speakers Cards Grid */}
          {filteredSpeakers.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredSpeakers.map((speaker, idx) => (
                <SpeakerCard
                  key={`${speaker.name}-${speaker.year ?? selectedYear}-${idx}`}
                  speaker={speaker}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-neutral-50 dark:bg-zinc-900/50 rounded-2xl border border-neutral-200 dark:border-zinc-800">
              <p className="text-neutral-500 dark:text-zinc-400 font-semibold text-sm">
                {lang === "FR"
                  ? "Aucun conférencier ne correspond à vos critères de recherche."
                  : "No speakers matched your search criteria."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
