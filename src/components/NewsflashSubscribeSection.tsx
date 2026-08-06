"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsflashSubscribeSection() {
  const { lang } = useLanguage();
  const isFr = lang === "FR";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFullName("");
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 600);
  };

  return (
    <section className="relative w-full py-8 sm:py-10 bg-slate-50 dark:bg-[#090d16] border-t border-b border-neutral-200/80 dark:border-[#C6112F]/20 text-neutral-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Background ambient lighting in dark mode */}
      <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[#C6112F]/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white dark:bg-[#111726]/95 border border-neutral-200/90 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-xl backdrop-blur-md relative overflow-hidden transition-colors duration-300">
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6112F] to-transparent" />

          <div className="max-w-2xl mx-auto text-center">
            {/* Tag Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6112F]/10 dark:bg-[#C6112F]/15 border border-[#C6112F]/20 dark:border-[#C6112F]/30 text-[#C6112F] text-[10px] font-black tracking-[0.18em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] animate-pulse" />
              {isFr ? "RESTEZ INFORMÉ" : "STAY INFORMED"}
            </span>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 dark:text-white tracking-tight uppercase mb-2 leading-tight">
              {isFr ? "S'abonner aux " : "Subscribe to "}
              <span className="text-[#C6112F]">{isFr ? "Dépêches de l'Événement" : "THE Press Release"}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm font-medium leading-relaxed max-w-lg mx-auto mb-5">
              {isFr
                ? "Recevez les annonces officielles et les mises à jour directement dans votre boîte de réception."
                : "Get official announcements and event updates delivered directly to your inbox."}
            </p>

            {/* Success State */}
            {isSubmitted ? (
              <div className="bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-4 text-center animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white mb-0.5">
                  {isFr ? "Merci de votre abonnement !" : "Thank you for subscribing!"}
                </h3>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 font-medium">
                  {isFr
                    ? "Vous recevrez les prochaines dépêches de presse directement par e-mail."
                    : "You will receive future press release announcements directly in your inbox."}
                </p>
              </div>
            ) : (
              /* Compact Subscription Form */
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name Input */}
                  <div className="relative text-left">
                    <label htmlFor="subscribe-fullName" className="sr-only">
                      {isFr ? "Nom complet" : "Full Name"}
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <input
                      id="subscribe-fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isFr ? "Nom complet *" : "Full Name *"}
                      className="w-full bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/15 rounded-xl py-2.5 pl-9 pr-3 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all font-medium"
                    />
                  </div>

                  {/* Email Address Input */}
                  <div className="relative text-left">
                    <label htmlFor="subscribe-email" className="sr-only">
                      {isFr ? "Adresse e-mail" : "Email Address"}
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <input
                      id="subscribe-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isFr ? "Adresse e-mail *" : "Email Address *"}
                      className="w-full bg-neutral-100/90 dark:bg-white/5 border border-neutral-300/80 dark:border-white/15 rounded-xl py-2.5 pl-9 pr-3 text-xs text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:border-[#C6112F] focus:ring-2 focus:ring-[#C6112F]/20 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#C6112F] hover:bg-[#a50e27] text-white text-xs font-black tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md shadow-[#C6112F]/20 hover:scale-[1.01] active:scale-98 cursor-pointer flex items-center justify-center gap-2 self-center mt-1 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>{isFr ? "Traitement..." : "Subscribing..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{isFr ? "S'ABONNER MAINTENANT" : "SUBSCRIBE NOW"}</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                  {isFr
                    ? "Nous respectons votre vie privée. Désabonnez-vous à tout moment."
                    : "We respect your privacy. Unsubscribe at any time."}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
