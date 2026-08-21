"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const flights = [
  { city: "Toronto", time: "1.5 hrs" },
  { city: "Montreal", time: "45 mins" },
  { city: "Vancouver", time: "5 hrs" },
  { city: "New York", time: "2.5 hrs" },
  { city: "London", time: "8.5 hrs" },
  { city: "Paris", time: "7.5 hrs" },
];

export default function TravelPage() {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";
  const [isAirReadMore, setIsAirReadMore] = React.useState(false);

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white dark:bg-[#090d16] text-neutral-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300">
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
              <a href="/" className="hover:text-white transition-colors">
                {t("nav-home", "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-500">{t("nav-about", "About")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("nav-travel", "Travel & Accommodations")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              {t("travel-hero-title-1", "Travel &")} <span className="text-[#C6112F]">{t("travel-hero-title-2", "Accommodations")}</span>
            </h1>
            <div className="w-20 h-[3.5px] bg-[#C6112F] rounded-full mt-6" />
          </div>
        </section>

        {/* ═══════ MAIN CONTENT IN CLIENT SPECIFIED ORDER ═══════ */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 py-14 sm:py-18 md:py-20 space-y-16 sm:space-y-20">

          {/* ════════ ORDER 1: QUÉBEC CITY CONVENTION CENTRE (QCC) DETAILS ════════ */}
          <section id="convention-centre" className="relative w-full">
            <div className="mb-6">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {isFr ? "LIEU DE L'ÉVÉNEMENT" : "EVENT VENUE"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-2">
                {isFr ? "Centre des congrès de Québec (QCC)" : "Québec City Convention Centre (QCC)"}
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full" />
            </div>

            <div className="bg-slate-50 dark:bg-[#131b2e] border border-neutral-200/90 dark:border-[#233049] rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C6112F]/10 border border-[#C6112F]/30 text-[#C6112F] text-xs font-extrabold tracking-wider uppercase">
                    <span>OFFICIAL CONFERENCE VENUE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                    {t(
                      "travel-event-welcome",
                      "Welcome to THE Mining Investment EVENT, taking place at the Centre des congrès de Québec (“QCC”)"
                    )}
                  </h3>
                  <p className="text-neutral-700 dark:text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                    {t(
                      "travel-convention-desc",
                      "Welcome to the Centre des congrès de Québec, where elegance meets innovation. Nestled within the charming historic district of Old Quebec, this world-class facility seamlessly blends modern amenities with the rich tapestry of Quebecois culture."
                    )}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="https://www.convention.qc.ca/en/about/ceo-message/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-md hover:shadow-lg transition-all"
                    >
                      <span>{t("travel-about-qcc", "About the Centre des congrès de Québec")} ↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Photo Preview */}
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] border-2 border-[#C6112F]/40 shadow-lg group">
                  <img
                    src="/Centre-des-congres-Quebec-Mines-1%20(1).webp"
                    alt="Centre des congrès de Québec (QCC)"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold flex items-center justify-between">
                    <span>Centre des congrès de Québec</span>
                    <span className="text-[10px] bg-[#C6112F] px-2 py-0.5 rounded font-black uppercase tracking-wider">QCC VENUE</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════ ORDER 2: OFFICIAL PARTNER HOTELS ════════ */}
          <section id="partner-hotels" className="relative w-full">
            <div className="mb-6">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {isFr ? "HÔTELS PARTENAIRES" : "OFFICIAL ACCOMMODATIONS"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-2">
                {isFr ? "Hôtels Partenaires Officiels" : "Official Partner Hotels"}
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* HILTON HOTEL */}
              <div className="bg-white dark:bg-[#131b2e] border-2 border-neutral-200 dark:border-[#233049] hover:border-[#C6112F] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#C6112F] text-white flex items-center justify-center shadow-md shrink-0">
                      <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider">
                      WALKING DISTANCE
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-2">
                    {t("travel-hilton-title", "Hilton Québec")}
                  </h3>
                  <div className="w-10 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />

                  <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                    {t(
                      "travel-hilton-desc",
                      "Experience luxury and convenience at the Hilton Hotel in Quebec City, perfectly positioned just steps away from the Quebec City Convention Centre. Indulge in exquisite dining, unwind with a cocktail at the lounge, or rejuvenate in the state-of-the-art fitness centre."
                    )}
                  </p>

                  <p className="text-[#C6112F] text-xs font-semibold mb-6">
                    {t(
                      "travel-hilton-note",
                      "Discounted block rates available for registered participants only. You are responsible for coordinating all your own travel and lodging arrangements."
                    )}
                  </p>
                </div>

                <a
                  href="https://www.hilton.com/en/hotels/yqbhihh-hilton-quebec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-md hover:shadow-lg transition-all w-full text-center"
                >
                  <span>{t("travel-hilton-link", "View Hilton Website ↗")}</span>
                </a>
              </div>

              {/* DELTA HOTEL (RECOMMENDED PARTNER HOTEL) */}
              <div className="bg-white dark:bg-[#131b2e] border-2 border-[#C6112F] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C6112F] text-white text-[9.5px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-md">
                  RECOMMENDED PARTNER HOTEL
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#C6112F] text-white flex items-center justify-center shadow-md shrink-0">
                      <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-2">
                    {t("travel-delta-title", "Delta Hotels by Marriott Québec")}
                  </h3>
                  <span className="inline-block text-[#C6112F] text-xs font-extrabold uppercase tracking-wider mb-2">
                    (Recommended Partner Hotel)
                  </span>
                  <div className="w-10 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />

                  <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                    {t(
                      "travel-delta-desc",
                      "Conveniently located near the Québec City Convention Centre (QCC), Delta Hotels Québec offers premium guest rooms, modern amenities, on-site dining, and exclusive group rates for conference delegates."
                    )}
                  </p>

                  <p className="text-[#C6112F] text-xs font-semibold mb-6">
                    {t(
                      "travel-delta-note",
                      "Recommended partner hotel with special delegate rates available for registered participants."
                    )}
                  </p>
                </div>

                <a
                  href="https://www.marriott.com/en-us/hotels/yqbdr-delta-hotels-quebec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-md hover:shadow-lg transition-all w-full text-center"
                >
                  <span>{t("travel-delta-link", "View Delta Hotel Website ↗")}</span>
                </a>
              </div>

              {/* FAIRMONT LE CHÂTEAU FRONTENAC */}
              <div className="bg-white dark:bg-[#131b2e] border-2 border-neutral-200 dark:border-[#233049] hover:border-[#C6112F] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#C6112F] text-white flex items-center justify-center shadow-md shrink-0">
                      <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                      HISTORIC LUXURY HOTEL
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-2">
                    {t("travel-fairmont-title", "Fairmont Le Château Frontenac")}
                  </h3>
                  <div className="w-10 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />

                  <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                    {t(
                      "travel-fairmont-desc",
                      "Perched high above Old Québec, Fairmont Le Château Frontenac is one of Canada's most iconic luxury landmark hotels. Enjoy world-class hospitality, gourmet dining, and breathtaking views of the St. Lawrence River, located just minutes from the Québec City Convention Centre."
                    )}
                  </p>

                  <p className="text-[#C6112F] text-xs font-semibold mb-6">
                    {t(
                      "travel-fairmont-note",
                      "Iconic luxury accommodations in historic Old Québec for conference attendees. You are responsible for coordinating all your own travel and lodging arrangements."
                    )}
                  </p>
                </div>

                <a
                  href="https://www.fairmont.com/en/hotels/quebec-city/fairmont-le-chateau-frontenac.html?cmpid=google_lcf_search-generic-ww_luxury-hotel-e-revsh&kpid=go_cmp-22173449727_adg-174124187973_ad-731161028831_kwd-178173882_dev-c_ext-_prd-&wiz_medium=cpc&wiz_source=google&wiz_campaign=22173449727&gad_source=1&gad_campaignid=22173449727&gbraid=0AAAAA97FndlzrxLwVgmOvfWC7mBLZ5ooL&gclid=EAIaIQobChMIyfvUqv2OlgMVB4jCCB1bxAPNEAAYASAAEgK4CfD_BwE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-md hover:shadow-lg transition-all w-full text-center"
                >
                  <span>{t("travel-fairmont-link", "View Fairmont Website ↗")}</span>
                </a>
              </div>
            </div>
          </section>

          {/* ════════ ORDER 3: ROOM BLOCKS & DELEGATE DISCOUNTS ════════ */}
          <section id="room-blocks" className="relative w-full">
            <div className="mb-6">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {isFr ? "TARIFS DÉLÉGUÉS EXCLUSIFS" : "DELEGATE RATES"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-2">
                {isFr ? "Blocs de Chambres et Réductions" : "Room Blocks & Delegate Discounts"}
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full" />
            </div>

            <div className="bg-gradient-to-br from-[#800016] via-[#730214] to-[#54020e] rounded-3xl p-8 sm:p-10 md:p-12 text-white shadow-xl border border-white/20">
              <div className="max-w-4xl space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs sm:text-sm font-black tracking-widest uppercase border border-white/30">
                  <span>SPECIAL DELEGATE RATES</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                  {isFr ? "Tarifs de Chambres Réservés aux Participants" : "Discounted Room Blocks for Registered Delegates"}
                </h3>
                <p className="text-white text-base sm:text-lg md:text-xl font-bold leading-relaxed">
                  {t(
                    "travel-notice-1",
                    "Discounted block rates available for registered participants only."
                  )}
                </p>
                <p className="text-white/95 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                  {t(
                    "travel-notice-2",
                    "You are responsible for coordinating all your own travel and lodging arrangements. Please check with individual properties regarding cancellation policy, deposit requirement, and taxes/fees."
                  )}
                </p>

                <div className="pt-6 border-t border-white/25 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-start gap-3.5 bg-white/15 p-4 sm:p-5 rounded-2xl border border-white/20 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span className="text-sm sm:text-base text-white font-semibold leading-relaxed">
                      {isFr
                        ? "Offres spéciales dans les hôtels partenaires officiels à quelques pas du centre de congrès."
                        : "Special group rate links sent upon registration for official conference hotels."}
                    </span>
                  </div>
                  <div className="flex items-start gap-3.5 bg-white/15 p-4 sm:p-5 rounded-2xl border border-white/20 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span className="text-sm sm:text-base text-white font-semibold leading-relaxed">
                      {isFr
                        ? "Rabais exclusifs délégués dans les restaurants et attractions de la ville de Québec."
                        : "Exclusive delegate discount program at participating Québec City restaurants & attractions."}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════ ORDER 5: A1 LIMO (PRIVATE TRANSPORTATION) ════════ */}
          <section id="private-limo" className="relative w-full">
            <div className="mb-6">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {isFr ? "TRANSPORT PRIVE" : "CHAUFFEUR SERVICE"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-2">
                {isFr ? "Limousine A1 (Transport Privé)" : "Limousine A1 (Private Transportation)"}
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full" />
            </div>

            <div className="bg-slate-50 dark:bg-[#131b2e] border border-neutral-200/90 dark:border-[#233049] rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-[4/3] border-2 border-neutral-300/80 shadow-md shrink-0">
                  <img
                    src="/travle-4.webp"
                    alt="Limousine A1 Luxury Transportation"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
                    {t("travel-limo-title", "Limousine A1 (Private Transportation)")}
                  </h3>
                  <p className="text-neutral-700 dark:text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                    {t(
                      "travel-limo-desc",
                      "If you wish to book private transportation, we invite you to contact Limousine A1 directly to arrange. With over 40 years of experience, Limousine A1 provides personalized transportation and seamless logistics in Quebec."
                    )}
                  </p>

                  <div className="p-4 bg-white dark:bg-slate-800/90 border border-neutral-200 dark:border-slate-700 rounded-2xl space-y-1 text-xs sm:text-sm font-semibold">
                    <p>
                      <span>Tel: </span>
                      <a href="tel:4185235059" className="text-[#C6112F] dark:text-[#ff4d6d] font-bold hover:underline">
                        418-523-5059
                      </a>
                    </p>
                    <p>
                      <span>Email: </span>
                      <a href="mailto:res@limousinequebec.com" className="text-[#C6112F] dark:text-[#ff4d6d] font-bold hover:underline">
                        res@limousinequebec.com
                      </a>
                    </p>
                  </div>

                  <a
                    href="http://www.limousinequebec.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-md hover:shadow-lg transition-all"
                  >
                    <span>{t("travel-limo-btn", "Contact Limousine A1")} ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ════════ ORDER 6: FLIGHT, TRAIN & DRIVING OPTIONS ════════ */}
          <section id="flight-train" className="relative w-full">
            <div className="mb-6">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {t("travel-transit-section-label", isFr ? "OPTIONS DE TRANSPORT ET CONDUITE" : "FLIGHT, TRAIN & DRIVING OPTIONS")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1a1f2c] dark:text-white tracking-tight mb-2">
                {t("travel-transit-section-title", isFr ? "Options de Vols, Train et Conduite" : "Flight, Train & Driving Options")}
              </h2>
              <div className="w-16 h-[3.5px] bg-[#C6112F] rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {/* AIR TRAVEL CARD */}
              <div className="bg-white dark:bg-[#131b2e] border border-neutral-200/90 dark:border-[#233049] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm h-full">
                <div className="flex-1 flex flex-col">
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-neutral-900 mb-6 relative shrink-0">
                    <img
                      src="/travle-1.webp"
                      alt="Air Travel to YQB"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                      AIR TRAVEL (YQB)
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-2 min-h-[3rem] flex items-center">
                    {t("travel-air-title", "Air Travel direct to Quebec (YQB) estimated times")}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#C6112F] rounded-full mb-4 shrink-0" />

                  {/* Flight Times Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {flights.map((f) => (
                      <div
                        key={f.city}
                        className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/90 border border-neutral-200/80 dark:border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold"
                      >
                        <span>{f.city}</span>
                        <span className="text-[#C6112F] dark:text-[#ff4d6d]" style={{ fontWeight: 800 }}>{f.time}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                      {isAirReadMore
                        ? t(
                            "travel-air-carrier-note",
                            "All major carriers fly to Toronto or Montreal, where you may do a quick connection to YQB. Some carriers fly direct to YQB, Please check with your carrier of choice. Jean Lesage International airport in Quebec City is a 20 minute taxi ride to/from THE Event venue."
                          )
                        : t(
                            "travel-air-carrier-note-short",
                            "All major carriers fly to Toronto or Montreal, where you may do a quick connection to YQB."
                          )}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsAirReadMore(!isAirReadMore)}
                      className="mt-1.5 text-xs font-extrabold text-[#C6112F] dark:text-[#ff4d6d] hover:underline inline-flex items-center gap-1 cursor-pointer focus:outline-none"
                    >
                      {isAirReadMore
                        ? (isFr ? "Réduire ‹" : "Read Less ‹")
                        : (isFr ? "En savoir plus ›" : "Read More ›")}
                    </button>
                  </div>
                </div>

                <a
                  href="https://www.aeroportdequebec.com/en/flights-and-destinations/destinations-served"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-black tracking-wider uppercase shadow-md hover:shadow-lg transition-all w-full text-center whitespace-nowrap"
                >
                  <span>{t("travel-air-link-btn", "Check YQB Destinations")} ↗</span>
                </a>
              </div>

              {/* TRAIN TRAVEL CARD */}
              <div className="bg-white dark:bg-[#131b2e] border border-neutral-200/90 dark:border-[#233049] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm h-full">
                <div className="flex-1 flex flex-col">
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-neutral-900 mb-6 relative shrink-0">
                    <img
                      src="/travle-2.webp"
                      alt="Train Travel VIA Rail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                      TRAIN TRAVEL (VIA RAIL)
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-2 min-h-[3rem] flex items-center">
                    {t("travel-train-title", "Train Travel to Quebec (YQB) estimated times:")}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#C6112F] rounded-full mb-4 shrink-0" />

                  <div className="space-y-2 text-xs sm:text-sm font-semibold mb-4 bg-slate-100 dark:bg-slate-800/90 border border-neutral-200/80 dark:border-slate-700/80 p-3.5 rounded-xl">
                    <p className="flex justify-between items-center text-neutral-900 dark:text-slate-100">
                      <span>• From Toronto:</span>
                      <span className="font-extrabold text-[#C6112F] dark:text-[#ff4d6d]">8 hrs (transfer at Montreal)</span>
                    </p>
                    <p className="flex justify-between items-center border-t border-neutral-200/60 dark:border-slate-700/60 pt-2 text-neutral-900 dark:text-slate-100">
                      <span>• From Montreal:</span>
                      <span className="font-extrabold text-[#C6112F] dark:text-[#ff4d6d]">3 hrs</span>
                    </p>
                  </div>

                  <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium mb-6">
                    {t("travel-train-taxi-note", "The train station in Quebec City is 5 mins by taxi to most major hotels.")}
                  </p>
                </div>

                <a
                  href="https://www.viarail.ca/en/travel-info/booking/buy-train-ticket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-black tracking-wider uppercase shadow-md hover:shadow-lg transition-all w-full text-center whitespace-nowrap"
                >
                  <span>{t("travel-train-btn", "Book VIA Rail Tickets")} ↗</span>
                </a>
              </div>

              {/* DRIVING / CAR TRAVEL CARD */}
              <div className="bg-white dark:bg-[#131b2e] border border-neutral-200/90 dark:border-[#233049] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm h-full">
                <div className="flex-1 flex flex-col">
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-neutral-900 mb-6 relative shrink-0">
                    <img
                      src="/travle-3.webp"
                      alt="Driving to Quebec City"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                      {isFr ? "CONDUITE / VOITURE" : "DRIVING / CAR TRAVEL"}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-neutral-900 dark:text-white mb-2 min-h-[3rem] flex items-center">
                    {t("travel-drive-title", "Driving to Quebec City estimated times:")}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#C6112F] rounded-full mb-4 shrink-0" />

                  <div className="space-y-2 text-xs sm:text-sm font-semibold mb-4 bg-slate-100 dark:bg-slate-800/90 border border-neutral-200/80 dark:border-slate-700/80 p-3.5 rounded-xl">
                    <p className="flex justify-between items-center text-neutral-900 dark:text-slate-100">
                      <span>• From Montreal:</span>
                      <span className="font-extrabold text-[#C6112F] dark:text-[#ff4d6d]">2.5 - 3 hrs</span>
                    </p>
                    <p className="flex justify-between items-center border-t border-neutral-200/60 dark:border-slate-700/60 pt-2 text-neutral-900 dark:text-slate-100">
                      <span>• From Toronto:</span>
                      <span className="font-extrabold text-[#C6112F] dark:text-[#ff4d6d]">7.5 - 8 hrs</span>
                    </p>
                  </div>

                  <p className="text-neutral-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium mb-6">
                    {t("travel-drive-note", "Driving? It is an estimated 2.5 hour drive from Montreal to Quebec City.")}
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps/dir/Montreal,+QC/Quebec+City,+QC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#C6112F] hover:bg-[#a80d26] text-white text-xs font-black tracking-wider uppercase shadow-md hover:shadow-lg transition-all w-full text-center whitespace-nowrap"
                >
                  <span>{t("travel-drive-btn", "View Driving Directions")} ↗</span>
                </a>
              </div>
            </div>
          </section>

        </div>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
