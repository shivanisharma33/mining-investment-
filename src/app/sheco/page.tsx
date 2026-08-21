"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface AnnualDonationItem {
  year: string;
  title: string;
  desc: string;
  category: string;
  impactHighlight: string;
  location: string;
  image: string;
  link?: string;
  linkText?: string;
}

export default function SheCoPage() {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";
  const [selectedYear, setSelectedYear] = useState<string>("ALL");

  const annualDonations: AnnualDonationItem[] = [
    {
      year: "2026",
      title: "Moisson Rive-Sud",
      category: "Health & Food Security",
      impactHighlight: isFr ? "Banque alimentaire principale de la Montérégie" : "Primary Montérégie Food Bank",
      location: "Montérégie, QC",
      image: "/Centre-des-congres-Quebec-Mines-1%20(1).webp",
      desc: isFr
        ? "Moisson Rive-Sud est la banque alimentaire principale de la Montérégie soutenant la sécurité alimentaire essentielle, l'approvisionnement des organismes communautaires et l'aide directe aux familles."
        : "Moisson Rive-Sud is the main food bank in Montérégie, ensuring critical food security, community agency distribution, and direct emergency assistance to families in need.",
    },
    {
      year: "2025",
      title: isFr ? "Société d'Éducation et d'Emploi de Quesnel" : "Quesnel Education & Employment Society",
      category: "Indigenous Education",
      impactHighlight: isFr ? "Partenariat avec la Nation Lhoosk'uz Dene & Lhtako Dene" : "Partnered with Lhoosk'uz Dene & Lhtako Dene Nations",
      location: "Quesnel, BC",
      image: "/student/STUDENTS/MINING INVESTMENT EVENT 2026_DAY 1_STUDENTS-17.jpg",
      link: "https://dakelheed.wordpress.com/",
      linkText: isFr ? "Visiter la Société ↗" : "Visit Society Website ↗",
      desc: isFr
        ? "Créée par la Nation Lhoosk'uz Dene, la Nation Lhtako Dene et la Nation Nazko avec le soutien de Sean Roosen, cette initiative finance la formation professionnelle et les opportunités d'emploi communautaires."
        : "Established by the Lhoosk’uz Dene Nation, Lhtako Dene Nation, and Nazko Nation with the support of Sean Roosen, this organization provides funded education, skills training, and local employment opportunities.",
    },
    {
      year: "2024",
      title: "THE Drum Circle",
      category: "Youth Emotional Healing",
      impactHighlight: isFr ? "10 ensembles de tambours des Premières Nations financés" : "10 First Nations Drum Kits Funded",
      location: "St. John's, NL",
      image: "/sheco-logo.png",
      desc: isFr
        ? "Financement de 10 ensembles de tambours des Premières Nations et d'un animateur pour les élèves de l'école Bishop Field. Favorise la guérison émotionnelle et le soutien face au deuil ou aux traumatismes."
        : "Funded 10 First Nations drum kits and a certified facilitator at Bishop Field Elementary. Supports Grades 4-6 students experiencing anxiety, grief, or trauma through rhythmic circles and healing traditions.",
    },
    {
      year: "2023",
      title: isFr ? "Université de la Colombie-Britannique (UBC)" : "University of British Columbia (UBC)",
      category: "Women's Fellowships",
      impactHighlight: isFr ? "3 bourses complètes pour jeunes femmes afghanes" : "3 Full Fellowships for Afghani Women",
      location: "Vancouver, BC",
      image: "/sheco-logo.png",
      desc: isFr
        ? "Don spécial ayant permis à 3 jeunes femmes afghanes de poursuivre leurs programmes d'études universitaires et d'accéder à un avenir prometteur en éducation."
        : "Special university grant assisting 3 young Afghani women with full tuition and education programs, enabling higher learning and leadership empowerment.",
    },
  ];

  const filteredDonations =
    selectedYear === "ALL"
      ? annualDonations
      : annualDonations.filter((item) => item.year === selectedYear);

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#fcfcfd] dark:bg-[#0c0d12] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        <section className="relative w-full bg-[#0b0f19] overflow-hidden text-white pt-32 sm:pt-36 md:pt-44 pb-20 sm:pb-24 border-b border-neutral-800">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#C6112F]/20 blur-[140px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-8">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-400">{t("sheco-breadcrumb-init", "Initiatives")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white font-semibold">{t("sheco-breadcrumb-title", "SHE-Co Initiative")}</span>
            </div>
            {/* 2-Column Hero Grid with sheco1.webp logo on right side */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#C6112F]/15 border border-[#C6112F]/30 text-[#ff4d6d] text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#C6112F] animate-pulse" />
                  <span>{isFr ? "COMMUNAUTÉ ET IMPACT SOCIAL" : "COMMUNITY & SOCIAL IMPACT"}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
                  SHE-Co <span className="text-[#C6112F]">Initiative</span>
                </h1>

                <p className="text-neutral-300 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
                  {isFr
                    ? "Soutenir des projets d'éducation, de santé et de bien-être qui en valent la peine"
                    : "Supporting Worthy Educational, Health and Wellness Projects Across Canada"}
                </p>
              </div>

              {/* Right Column Logo Display */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[420px] bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-[#C6112F]/25 flex flex-col items-center justify-center text-center group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,17,47,0.2),transparent_70%)] rounded-3xl pointer-events-none" />
                  
                  <div className="relative z-10 w-full max-w-[280px] p-5 bg-white dark:bg-slate-900 rounded-2xl border border-white/30 dark:border-slate-700 shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/sheco1.webp"
                      alt="SHE-Co Official Logo"
                      className="w-full h-auto object-contain select-none mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative w-full py-12 bg-[#C6112F]/10 border-b border-[#C6112F]/20">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-[#131926] p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-slate-800 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#C6112F] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-lg">
                  ❤️
                </div>
                <div>
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#C6112F]">
                    {isFr ? "MISSION ET ENGAGEMENT" : "OUR CHARITABLE PURPOSE"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1a1f2c] dark:text-white mt-0.5">
                    {isFr ? "Redonner directement aux communautés" : "Giving Back Directly to Local Communities"}
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-slate-300 font-medium max-w-xl leading-relaxed">
                {isFr
                  ? "Chaque année, une portion des bénéfices de L'Événement est versée directement à des organismes caritatifs qualifiés afin de faire une différence concrète."
                  : "Each year, proceeds from THE Event are directly donated to qualified non-profit and charitable groups to make a lasting, positive difference."}
              </p>
            </div>
          </div>
        </section>
        <section className="relative w-full py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-zinc-800 group">
                  <img
                    src="/Centre-des-congres-Quebec-Mines-1%20(1).webp"
                    alt="Centre des congrès de Québec - SHE-Co Event Host Venue"
                    className="w-full h-[380px] sm:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="px-3.5 py-1 rounded-full bg-[#C6112F] text-white font-extrabold text-[10px] uppercase tracking-widest inline-block mb-2 shadow-md">
                      QUEBEC CITY CONVENTION CENTRE
                    </span>
                    <p className="text-sm font-bold text-neutral-200">
                      {isFr
                        ? "Hôte officiel de L'Événement & de l'initiative SHE-Co"
                        : "Official Host Venue of THE Event & SHE-Co Initiative"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-2 block">
                  {isFr ? "L'INITIATIVE CARITATIVE DE IR.INC ET VID MEDIA" : "IR.INC & VID MEDIA'S CHARITABLE INITIATIVE"}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-4 leading-tight">
                  &ldquo;{isFr ? "Habiliter les individus et les communautés" : "Empowering Individuals and Communities"}&rdquo;
                </h2>
                <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full mb-6" />
                <p className="text-lg font-extrabold text-[#C6112F] mb-4">
                  {isFr
                    ? "Soutenir des projets d'éducation, de santé et de bien-être qui en valent la peine"
                    : "Supporting Worthy Educational, Health and Wellness Projects"}
                </p>
                <p className="text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                  {isFr
                    ? "Chaque année, une portion des bénéfices de L'Événement est versée à des groupes à but non lucratif et caritatifs qualifiés. Les dons seront axés sur le soutien aux individus, groupes, institutions et/ou projets communautaires apportant une contribution positive dans la vie des gens."
                    : "Each year a portion of THE Event proceeds are donated to qualified non-profit and charitable groups. Donations will be focused on support to individuals, groups, institutions and/or community projects making a positive difference in the lives of people."}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative w-full bg-slate-50/80 dark:bg-[#121824] py-16 sm:py-20 md:py-24 border-t border-neutral-200/60 dark:border-slate-800">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-2 block">
                  {isFr ? "DONS ANNUELS ET IMPACT" : "ANNUAL DONATIONS & IMPACT"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight">
                  {isFr ? "Impact à travers nos communautés" : "Impact Across Communities"}
                </h2>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                {["ALL", "2026", "2025", "2024", "2023"].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                      selectedYear === yr
                        ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20"
                        : "bg-white dark:bg-[#182032] border border-neutral-200 dark:border-slate-800 text-neutral-700 dark:text-slate-300 hover:border-[#C6112F]"
                    }`}
                  >
                    {yr === "ALL" ? (isFr ? "Tous" : "All Years") : yr}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {filteredDonations.map((item) => (
                <div
                  key={item.year}
                  className="bg-white dark:bg-[#182032] border border-neutral-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:border-[#C6112F]/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-1.5 rounded-xl bg-[#C6112F] text-white font-black text-base tracking-wider shadow-sm">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-widest bg-neutral-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                        {item.location}
                      </span>
                    </div>
                    <span className="text-[11px] font-black text-[#C6112F] uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1a1f2c] dark:text-white mb-2 group-hover:text-[#C6112F] transition-colors">
                      {item.title}
                    </h3>
                    <div className="inline-block bg-[#C6112F]/10 text-[#C6112F] text-xs font-bold px-3 py-1 rounded-lg mb-4">
                      ✓ {item.impactHighlight}
                    </div>
                    <p className="text-neutral-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-6 text-xs font-extrabold tracking-wider uppercase text-[#C6112F] hover:underline"
                    >
                      <span>{item.linkText}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-[#182032] border border-neutral-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full">
                  {isFr ? "PROJET SOUTENU EN 2025" : "FEATURED INITIATIVE"}
                </span>
                <span className="text-xs font-bold text-neutral-400">Quesnel, BC</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white mb-4">
                Quesnel Education and Employment Society
              </h3>
              <p className="text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium mb-6">
                {isFr ? (
                  <>
                    Grâce à l&apos;aide de Sean Roosen, l&apos;initiative SHE-Co de L&apos;Événement est heureuse de soutenir la Quesnel Education and Employment Society. Cet organisme a été créé par la Nation Lhoosk&apos;uz Dene, la Nation Lhtako Dene et la Nation Nazko pour soutenir l&apos;éducation, la formation et l&apos;emploi des membres de la communauté.
                  </>
                ) : (
                  <>
                    Through the help of Sean Roosen, THE Event’s SHE-Co initiative is pleased to support the Quesnel Education and Employment Society. This organization established by the Lhoosk’uz Dene Nation, Lhtako Dene Nation and Nazko Nation to support education, training and employment of community members.
                  </>
                )}
              </p>
              <a
                href="https://dakelheed.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-extrabold tracking-[0.15em] uppercase transition-all shadow-md hover:scale-105"
              >
                <span>{isFr ? "En savoir plus ↗" : "Learn More ↗"}</span>
              </a>
            </div>
            <div className="bg-white dark:bg-[#182032] border border-neutral-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#C6112F] bg-[#C6112F]/10 px-3.5 py-1 rounded-full">
                  {isFr ? "PROJET EN VEDETTE" : "FEATURED INITIATIVE"}
                </span>
                <span className="text-xs font-bold text-neutral-400">St. John&apos;s, NL</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1f2c] dark:text-white mb-4">
                THE Drum Circle
              </h3>
              <div className="space-y-4 text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                {isFr ? (
                  <>
                    <p>
                      Grâce à notre initiative SHE-Co, nous avons fièrement soutenu &laquo;THE Drum Circle&raquo; à l&apos;école élémentaire Bishop Field à St John&apos;s, Terre-Neuve. Ce programme s&apos;adresse aux élèves de la 4e à la 6e année ayant des besoins sociaux et émotionnels et nécessitant un soutien pour des questions telles que l&apos;anxiété, les traumatismes ou le deuil. Notre don a permis de financer l&apos;achat de 10 ensembles de tambours des Premières Nations et l&apos;embauche d&apos;un animateur pour intégrer les tambours, les chants et les mouvements rythmiques dans les cercles de partage des enfants.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Through our SHE-Co Initiative, we proudly supported &ldquo;THE Drum Circle&rdquo; at Bishop Field Elementary in St John’s, Newfoundland. This program is for students in Grades 4-6 with social and emotional needs who require support for issues such as anxiety, trauma, or grief. Our donation helped fund the purchase of 10 First Nations drum kits and a facilitator to incorporate drumming, chanting, and rhythmic movement into the children’s sharing circles.
                    </p>
                  </>
                )}
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
