"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface NewsStory {
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
  readTime?: string;
}

const allNewsStories: NewsStory[] = [
  {
    id: "1",
    tagCategory: "Announcement",
    dateEN: "Apr 14, 2026",
    dateFR: "14 avril 2026",
    headlineEN: "Keynote Speakers and Panels Announcement",
    headlineFR: "Annonce des conférenciers principaux et des panels",
    snippetEN: "THE Mining Investment Event announces its keynote speakers and panel line-up for the 2026 conference in Quebec City.",
    snippetFR: "THE Mining Investment Event annonce ses conférenciers principaux et la liste des panels pour la conférence 2026 à Québec.",
    fullBodyEN: `THE Mining Investment Event of the North is pleased to announce its distinguished keynote speakers and executive panel line-up for the upcoming 2026 conference at the Centre des congrès de Québec.

Featuring top industry leaders, government officials, institutional fund managers, and technical specialists, the 2026 program addresses key trends in critical minerals, ESG innovation, capital markets, and global resource development.

Key agenda highlights for the 2026 conference include:
• Critical Minerals & Energy Transition Capital Flows
• Modernizing Mining Finance & Private Equity Structuring
• ESG Innovation & Indigenous Partnership Frameworks
• Advanced Exploration Technologies & Geochemical Analytics

"We are delighted to bring together the global mining investment community in Quebec City once again," said conference organizers. "The 2026 edition expands our focus on high-impact issuer presentations, targeted 1-on-1 investor meetings, and high-level panel discussions."`,
    fullBodyFR: "THE Mining Investment Event of the North est heureux d'annoncer ses conférenciers principaux et la liste des panels exécutifs pour la prochaine conférence 2026 au Centre des congrès de Québec.",
    image: "/news/hero_1.png",
    readTime: "4 MIN READ",
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
    fullBodyEN: `Organizers of THE Mining Investment Event are proud to unveil the initial lineup of participating public mining companies and corporate sponsors for the 2026 edition in Quebec City.

Presenting issuers represent high-quality exploration, development, and production companies spanning gold, copper, battery metals, uranium, and critical minerals across North and South America.

Over 300 participating mining issuers will connect directly with accredited investors, family offices, and buy-side analysts through pre-arranged 1-on-1 meetings and executive corporate presentations.`,
    fullBodyFR: "Les organisateurs de THE Mining Investment Event sont fiers de dévoiler la liste initiale des sociétés minières cotées et des commanditaires participants pour l'édition 2026 à Québec.",
    image: "/news/copper_mine.png",
    readTime: "3 MIN READ",
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
    fullBodyEN: `THE Mining Investment Event, together with the International Trade and Finance Association (ITFA) and Association minière du Québec (AMQ), is thrilled to announce Quebec City's inaugural International Mining Week.

This landmark week-long initiative will unite global mining executives, institutional financiers, government delegations, and technical innovators for a series of high-level summits, corporate showcases, and networking forums.`,
    fullBodyFR: "THE Mining Investment Event, en collaboration avec l'Association internationale du commerce et de la finance (ITFA) et l'Association minière du Québec (AMQ), est ravi d'annoncer la première Semaine internationale des mines de Québec.",
    image: "/news/hero_2.png",
    readTime: "5 MIN READ",
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
    fullBodyEN: `The Student Sponsorship Program, generously supported by Glencore Canada, awards top geology, mining engineering, and finance students full sponsorship to attend THE Event, participate in mentorship sessions, and connect directly with corporate leadership.

Recipients were selected based on academic excellence, leadership initiative, and commitment to driving innovation within the natural resource sector.`,
    fullBodyFR: "Le programme de parrainage étudiant, généreusement soutenu par Glencore Canada, accorde aux meilleurs étudiants en géologie, en génie minier et en finance un parrainage complet.",
    image: "/news/hero_3.png",
    readTime: "3 MIN READ",
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
    fullBodyEN: `Mark your calendars — THE Mining Investment Event of the North returns to Quebec City for its 6th annual conference, June 1–3, 2027, at the Centre des congrès de Québec.

Building upon record participation from global investors and mining issuers, the 2027 event will feature expanded meeting facilities, enhanced technical showcases, and an unparalleled lineup of executive keynote presentations.`,
    fullBodyFR: "Inscrivez la date à vos agendas — THE Mining Investment Event revient à Québec du 1er au 3 juin 2027 au Centre des congrès de Québec.",
    image: "/news/banner_1.png",
    readTime: "2 MIN READ",
  },
  {
    id: "6",
    tagCategory: "Participants",
    dateEN: "Feb 13, 2025",
    dateFR: "13 février 2025",
    headlineEN: "THE Mining Investment Event Announces 2025 Participants & Welcomes Sponsors",
    headlineFR: "THE Mining Investment Event annonce les participants 2025 et accueille ses commanditaires",
    snippetEN: "Organizers release the full list of participating mining companies and sponsors for the upcoming conference.",
    snippetFR: "Les organisateurs publient la liste complète des sociétés minières et commanditaires participants.",
    fullBodyEN: `THE Mining Investment Event has released its official 2025 roster of participating public mining companies, institutional investors, and global sponsors.

The multi-day conference features structured 1-on-1 capital matching sessions, issuer presentation stages, and exclusive executive networking events in the heart of Quebec City.`,
    fullBodyFR: "THE Mining Investment Event a publié sa liste officielle 2025 de sociétés minières cotées et d'investisseurs institutionnels.",
    image: "/news/banner_2.png",
    readTime: "4 MIN READ",
  },
  {
    id: "7",
    tagCategory: "Speakers",
    dateEN: "Apr 2, 2025",
    dateFR: "2 avril 2025",
    headlineEN: "Keynote Speaker Lineup Unveiled for THE Event 2025",
    headlineFR: "Dévoilement des conférenciers principaux pour L'Événement 2025",
    snippetEN: "Leading global economists, mining CEOs, and portfolio managers confirmed as keynote speakers for the June conference.",
    snippetFR: "Des économistes de renom, des PDG miniers et des gestionnaires de portefeuille sont confirmés.",
    fullBodyEN: `An extraordinary roster of keynote speakers has been confirmed for THE Mining Investment Event 2025.

Featured speakers include chief economists from major global financial institutions, CEOs of multi-billion dollar producing mining corporations, and prominent resource portfolio managers discussing macroeconomic shifts, metal price cycles, and strategic M&A trends.`,
    fullBodyFR: "Une liste extraordinaire de conférenciers principaux a été confirmée pour THE Mining Investment Event 2025.",
    image: "/news/banner_3.png",
    readTime: "3 MIN READ",
  },
  {
    id: "8",
    tagCategory: "Keynote",
    dateEN: "May 15, 2025",
    dateFR: "15 mai 2025",
    headlineEN: "Executive Panels Announced: The Future of Critical Minerals & Battery Metals",
    headlineFR: "Panels exécutifs annoncés : L'avenir des minéraux critiques et des métaux pour batteries",
    snippetEN: "Expert panels to focus on supply chain security, lithium & nickel demand, and government incentive programs.",
    snippetFR: "Des panels d'experts se concentreront sur la sécurité de la chaîne d'approvisionnement et la demande.",
    fullBodyEN: `THE Mining Investment Event 2025 will feature specialized executive panel sessions dedicated to critical minerals and battery technology supply chains.

Panels will address North American processing capacity, government policy incentives, ESG compliance standards, and strategic off-take agreements between mining issuers and electric vehicle OEMs.`,
    fullBodyFR: "THE Mining Investment Event 2025 proposera des séances de panels exécutifs spécialisés consacrées aux minéraux critiques.",
    image: "/news/hero_1.png",
    readTime: "4 MIN READ",
  },
  {
    id: "9",
    tagCategory: "SHE-CO",
    dateEN: "Jun 3, 2025",
    dateFR: "3 juin 2025",
    headlineEN: "SHE-CO Initiative Celebrates Women Leaders in Mining & Finance",
    headlineFR: "L'initiative SHE-CO célèbre les femmes dirigeantes dans les mines et la finance",
    snippetEN: "Annual SHE-CO networking breakfast highlights female executive leadership across the global natural resources sector.",
    snippetFR: "Le petit-déjeuner de réseautage annuel SHE-CO met en lumière le leadership exécutif féminin.",
    fullBodyEN: `The SHE-CO Initiative proudly hosted its annual leadership breakfast at THE Mining Investment Event in Quebec City.

The event gathered female executives, board directors, and institutional investors to celebrate women leading capital growth, technical innovation, and governance excellence across the global mining industry.`,
    fullBodyFR: "L'initiative SHE-CO a fièrement organisé son petit-déjeuner annuel de leadership lors de THE Mining Investment Event à Québec.",
    image: "/news/hero_2.png",
    readTime: "3 MIN READ",
  },
  {
    id: "mining-1",
    tagCategory: "Mining News",
    dateEN: "JULY 10, 2026",
    dateFR: "10 JUILLET 2026",
    headlineEN: "THE Mining Investment Event Announces Winners of THE Pitch 2026",
    headlineFR: "THE Mining Investment Event annonce les gagnants de THE Pitch 2026",
    snippetEN: "Outstanding exploration companies awarded top honours at the 2026 pitch showcase in Quebec City.",
    snippetFR: "Des sociétés d'exploration remarquables ont été récompensées lors de la présentation 2026 à Québec.",
    fullBodyEN: `THE Mining Investment Event of the North is thrilled to announce the official winners of THE Pitch 2026 competition.

Presenting exploration companies were evaluated by a distinguished panel of institutional fund managers, mining analysts, and corporate development executives. The winning companies demonstrated exceptional geological potential, strong management execution, and disciplined capital allocation.`,
    fullBodyFR: "THE Mining Investment Event of the North est ravi d'annoncer les gagnants officiels du concours THE Pitch 2026.",
    image: "/news/hero_1.png",
    readTime: "4 MIN READ",
  },
  {
    id: "mining-2",
    tagCategory: "Copper",
    dateEN: "JUNE 24, 2026",
    dateFR: "24 JUIN 2026",
    headlineEN: "Copper Supply Deficit Accelerates Global Exploration M&A",
    headlineFR: "Le déficit d'approvisionnement en cuivre accélère les fusacq d'exploration mondiale",
    snippetEN: "Surging demand for energy transition metals drives record dealmaking in copper projects across Canada and Chile.",
    snippetFR: "La demande croissante pour les métaux de la transition énergétique stimule les transactions dans le cuivre.",
    fullBodyEN: `Growing global copper deficits continue to drive strategic M&A activity among major producing mining companies looking to replenish resource reserves.

Key industry presentations at THE Event highlighted copper exploration assets in Quebec, Ontario, and South America receiving increased institutional capital allocations.`,
    fullBodyFR: "Les déficits mondiaux croissants en cuivre continuent de stimuler l'activité de fusion-acquisition stratégique.",
    image: "/news/copper_mine.png",
    readTime: "3 MIN READ",
  },
  {
    id: "mining-3",
    tagCategory: "Critical Minerals",
    dateEN: "MAY 18, 2026",
    dateFR: "18 MAI 2026",
    headlineEN: "Government Initiatives Boost North American Critical Mineral Supply Chains",
    headlineFR: "Les initiatives gouvernementales stimulent la chaîne d'approvisionnement des minéraux critiques",
    snippetEN: "Federal grants and streamlined permitting accelerate battery metal development across Quebec and Ontario.",
    snippetFR: "Les subventions fédérales et la délivrance simplifiée des permis accélèrent le développement des métaux pour batteries.",
    fullBodyEN: `New federal strategic infrastructure funding is accelerating battery material supply chain projects across Quebec and Ontario.

Institutional investors at THE Event expressed strong confidence in critical mineral developers benefiting from government partnership frameworks and streamlined environmental permitting.`,
    fullBodyFR: "Les nouveaux financements stratégiques fédéraux pour les infrastructures accélèrent les projets de la chaîne d'approvisionnement.",
    image: "/news/hero_2.png",
    readTime: "5 MIN READ",
  },
  {
    id: "mining-4",
    tagCategory: "Gold",
    dateEN: "APRIL 30, 2026",
    dateFR: "30 AVRIL 2026",
    headlineEN: "Record Gold Prices Drive High-Grade Exploration Discoveries",
    headlineFR: "Les prix record de l'or stimulent les découvertes d'exploration à haute teneur",
    snippetEN: "Junior mining issuers report encouraging drill intersections in Canadian gold belts ahead of June conference.",
    snippetFR: "Les émetteurs miniers juniors révèlent des résultats de forage encourageants dans les ceintures aurifères canadiennes.",
    fullBodyEN: `Sustained gold price strength has significantly improved project economics for junior exploration companies operating across Canadian mining jurisdictions.

Presenting issuers at THE Mining Investment Event 2026 will showcase high-grade drill results and resource expansion updates to global institutional investors.`,
    fullBodyFR: "La solidité prolongée du cours de l'or a nettement amélioré la rentabilité des projets d'exploration juniors.",
    image: "/news/hero_3.png",
    readTime: "4 MIN READ",
  },
];

export default function SingleNewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, lang } = useLanguage();

  const idParam = params?.id as string;

  const article =
    allNewsStories.find(
      (item) =>
        item.id === idParam ||
        encodeURIComponent(item.headlineEN.toLowerCase().replace(/\s+/g, "-")) === idParam
    ) || allNewsStories[0];

  const headline = lang === "FR" ? article.headlineFR : article.headlineEN;
  const snippet = lang === "FR" ? article.snippetFR : article.snippetEN;
  const bodyText =
    (lang === "FR" ? article.fullBodyFR || article.snippetFR : article.fullBodyEN || article.snippetEN) ||
    snippet;
  const date = lang === "FR" ? article.dateFR : article.dateEN;
  const image = article.image || "/news/hero_1.png";

  const relatedArticles = allNewsStories.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f4f7fa]">
        {/* ═══════ HERO HEADER ═══════ */}
        <section className="relative w-full bg-[#0f1117] pt-32 sm:pt-36 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8 text-left">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6 flex-wrap">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <a href="/news" className="hover:text-white transition-colors">News & Media</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white truncate max-w-[300px]">{headline}</span>
            </div>

            <button
              onClick={() => router.push("/news")}
              className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all mb-6 cursor-pointer backdrop-blur-sm border border-white/15"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              <span>Back to All News</span>
            </button>
          </div>
        </section>

        {/* ═══════ ARTICLE BODY SECTION ═══════ */}
        <section className="relative w-full py-12 sm:py-16 md:py-20 -mt-10">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8">
            <article className="bg-white rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden text-left">
              {/* Cover Banner Image */}
              <div className="relative h-72 sm:h-96 w-full bg-neutral-900 overflow-hidden">
                <img
                  src={image}
                  alt={headline}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/50 to-transparent" />

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-20">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="px-3.5 py-1 bg-[#C6112F] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-md">
                      {article.tagCategory}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold border border-white/20 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#ff4d6d]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                      </svg>
                      {date}
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-neutral-300 text-xs font-semibold">
                      {article.readTime || "3 MIN READ"}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-sm">
                    {headline}
                  </h1>
                </div>
              </div>

              {/* Article Content Container */}
              <div className="p-6 sm:p-10 md:p-12 space-y-8">
                {/* Publisher Information */}
                <div className="flex items-center gap-3.5 pb-6 border-b border-neutral-100">
                  <div className="w-12 h-12 rounded-full bg-[#C6112F]/10 border border-[#C6112F]/20 flex items-center justify-center text-[#C6112F] font-black text-lg shrink-0">
                    M
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-neutral-900 uppercase tracking-wider">
                      THE Mining Investment Event of the North
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      Official Press Release · Quebec City, Canada
                    </p>
                  </div>
                </div>

                {/* Lead Quote Callout */}
                {snippet && (
                  <div className="bg-rose-50/90 border-l-4 border-[#C6112F] p-6 rounded-r-2xl text-neutral-800 text-base sm:text-lg font-semibold leading-relaxed shadow-2xs">
                    "{snippet}"
                  </div>
                )}

                {/* Main Body Text */}
                <div className="text-neutral-700 text-base sm:text-lg leading-relaxed font-normal space-y-6 whitespace-pre-line">
                  {bodyText}
                </div>

                {/* Media Contact Footer */}
                <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs font-semibold text-neutral-600">
                    Media Contact: <a href="mailto:jchoi@irinc.ca" className="text-[#C6112F] font-bold hover:underline">jchoi@irinc.ca</a>
                  </div>
                  <button
                    onClick={() => router.push("/news")}
                    className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-xs cursor-pointer"
                  >
                    All News Stories
                  </button>
                </div>
              </div>
            </article>

            {/* ═══════ RELATED STORIES RECOMMENDATIONS ═══════ */}
            <div className="mt-16 text-left">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.2em] uppercase block mb-2">
                MORE STORIES
              </span>
              <h3 className="text-2xl font-black text-neutral-900 mb-6">
                Related Press Releases
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => {
                  const relTitle = lang === "FR" ? rel.headlineFR : rel.headlineEN;
                  const relDate = lang === "FR" ? rel.dateFR : rel.dateEN;

                  return (
                    <article
                      key={rel.id}
                      onClick={() => router.push(`/news/${rel.id}`)}
                      className="group cursor-pointer bg-white border border-neutral-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-neutral-100">
                          <img
                            src={rel.image || "/news/hero_1.png"}
                            alt={relTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#C6112F] uppercase tracking-wider block mb-1">
                          {rel.tagCategory}
                        </span>
                        <h4 className="text-sm font-extrabold text-neutral-900 group-hover:text-[#C6112F] transition-colors leading-snug line-clamp-2 mb-2">
                          {relTitle}
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-400">
                        {relDate}
                      </span>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
