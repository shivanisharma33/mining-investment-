"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "EN" | "FR";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav
    "nav-home": "Home",
    "nav-about": "About",
    "nav-about-event": "About THE Event",
    "nav-team": "THE Team",
    "nav-travel": "Travel & Accommodations",
    "nav-media": "Recent Media",
    "nav-newsflash": "THE Newsflash",
    "nav-programs": "Programs",
    "nav-student": "The Student Sponsorship Program",
    "nav-sheco": "SHE-Co Initiative",
    "nav-partnership": "Partnership",
    "nav-speakers": "Speakers",
    "nav-past-years": "Past Years",
    "nav-snapshot": "THE SnapShot Report",
    "nav-gallery": "Gallery",
    "nav-register": "Register Here",

    // Hero
    "hero-eyebrow": "Canada's Only Tier I Global Mining Investment Conference",
    "hero-title-1": "The",
    "hero-title-2": "Mining",
    "hero-title-3": "Investment",
    "hero-title-4": "Event",
    "hero-subtitle": "Meet investors, discover projects, secure partnerships and shape the future of mining.",
    "hero-date": "3-6 JUNE 2027 · QUÉBEC CITY, CANADA",
    "hero-register": "REGISTER NOW",
    "hero-program": "VIEW PROGRAM",

    // Quick Links
    "ql-sponsors": "Sponsors",
    "ql-companies": "Participating Companies",
    "ql-mining-week": "International Mining Week",
    "ql-agenda": "Agenda",
    "ql-brochure": "Brochure",
    "ql-meet-team": "Speakers",

    // Stats & Glimpse
    "welcome-tag": "WELCOME",
    "glimpse-title": "A Glimpse Inside THE Event",
    "glimpse-desc": "Step inside Canada's only Tier 1 global mining investment conference — where senior producers, emerging developers, institutional capital and the next generation of industry leaders converge under one roof.",
    "discover-event": "DISCOVER THE EVENT",
    "stat-years-label": "YEARS",
    "stat-years-sub": "of Excellence",
    "stat-investors-label": "INVESTORS",
    "stat-investors-sub": "Attending",
    "stat-mining-label": "MINING COMPANIES",
    "stat-mining-sub": "Participating",
    "stat-countries-label": "COUNTRIES",
    "stat-countries-sub": "Represented",
    "stat-meetings-label": "MEETINGS",
    "stat-meetings-sub": "Held",

    // Why Attend
    "why-tag": "WHY ATTEND",
    "why-title": "Your Pathway To Investment Success",
    "why-01-title": "MEET INVESTORS",
    "why-01-desc": "Connect with global investors actively seeking high-potential mining opportunities.",
    "why-02-title": "DISCOVER OPPORTUNITIES",
    "why-02-desc": "Explore high-potential mining projects from around the world.",
    "why-03-title": "BUILD PARTNERSHIPS",
    "why-03-desc": "Create strategic partnerships that drive long-term growth.",
    "why-04-title": "RAISE CAPITAL",
    "why-04-desc": "Secure the capital you need to advance your projects.",

    // Featured Programs Grid
    "programs-tag": "FEATURED INITIATIVES",
    "programs-title": "Key Event Programs",
    "prog-edu-cat": "EDUCATION",
    "prog-edu-title": "Student Sponsorship Program",
    "prog-edu-desc": "Offering a one-of-a-kind exposure to the mining industry for up to 50 university and college students passionate about geology, finance and engineering.",
    "prog-edu-cta": "EXPLORE PROGRAM",
    "prog-lead-cat": "LEADERSHIP",
    "prog-lead-title": "SHE-Co Initiative",
    "prog-lead-desc": "Fostering industry-wide progress through ESG innovation and diversity, highlighting the achievements of women in the global mining sector.",
    "prog-lead-cta": "LEARN MORE",
    "prog-inst-cat": "INSTITUTIONAL",
    "prog-inst-title": "Tier 1 Partnership",
    "prog-inst-desc": "Tailored opportunities designed to maximize visibility and engagement with the world's most influential mining companies and investors.",
    "prog-inst-cta": "PARTNERSHIP INFO",
    "prog-dial-cat": "DIALOGUE",
    "prog-dial-title": "THE Salon Explore Co Lounge",
    "prog-dial-desc": "An intimate networking experience designed to connect Canada's exploration community with elite international investors.",
    "prog-dial-cta": "MEET SPEAKERS",

    // Featured Event Countdown
    "feat-event-tag": "FEATURED EVENT",
    "feat-event-title": "THE MINING INVESTMENT EVENT",
    "feat-event-date": "3-6 JUNE 2027",
    "feat-event-loc": "QUÉBEC CITY, CANADA",
    "feat-event-agenda": "VIEW AGENDA",
    "timer-days": "DAYS",
    "timer-hrs": "HRS",
    "timer-min": "MIN",
    "timer-sec": "SEC",

    // Featured Partners
    "partners-tag": "FEATURED",
    "partners-title": "Featured Partners",
    "partners-sub": "A spotlight on the partners powering THE Mining Investment Event. Switch tiers to explore each circle of supporters.",

    // Canada Premier Forum
    "forum-tag": "THE CONFERENCE",
    "forum-title": "Canada's Premier Mining Forum",
    "forum-desc": "THE Mining Investment Event is an invitation-only gathering that brings together the world's most influential mining companies, investors, institutions and government authorities in the historic setting of Québec City.",
    "forum-highlight": "Independently sponsored by the Government of Québec and the financial and mining communities at large.",
    "forum-bullet-1": "Privately arranged 1-on-1 meetings between mining companies and international investors",
    "forum-bullet-2": "Keynote speakers and industry thought leaders from across the globe",
    "forum-bullet-3": "Promoting sustainability via the Student Sponsorship and SHE-Co initiatives",
    "forum-bullet-4": "Platform for ESG innovation and equality in the mining sector",
    "forum-bullet-5": "Accredited investors, family offices, institutions and sovereign funds",
    "forum-about-btn": "ABOUT THE EVENT",

    // Global Community Map
    "map-tag": "GLOBAL PRESENCE",
    "map-title": "Where the World's Mining Converges",
    "map-desc": "Explore the international network of companies, investors, and delegations gathering in Québec City.",
    "map-cta": "VIEW GLOBAL PARTICIPATION",
    "stat-participants": "PARTICIPANTS",
    "stat-student-sponsors": "STUDENT SPONSORS",
    "stat-program-label": "PROGRAM",

    // Event Highlights & Media
    "highlights-tag": "MEDIA & HIGHLIGHTS",
    "highlights-title": "Event Highlights",
    "highlights-desc": "Three days in Québec City — plenary sessions, privately arranged meetings and the evening programme, captured as they happened.",
    "stat-photos": "PHOTOS",
    "stat-press": "PRESS",
    "media-badge-speeches": "KEYNOTE SPEECHES",
    "media-title-1": "Plenary Keynotes & Strategic Insights",
    "media-desc-1": "Watch executive keynotes from global mining leaders presenting capital strategies.",
    "media-watch": "WATCH REPLAYS",
    "media-badge-interviews": "INTERVIEWS",
    "media-title-2": "C-Suite & Investor Interviews",
    "media-desc-2": "Exclusive 1-on-1 interviews with CEOs, exploration managers, and institutional funds.",
    "media-title-3": "High-Resolution Photo Gallery",
    "media-desc-3": "Explore official photography capturing networking receptions, lounge sessions, and speeches.",
    "media-view-gallery": "VIEW GALLERY",

    // Get In Touch CTA
    "cta-tag": "HAVE A QUESTION?",
    "cta-title": "Get in Touch",
    "cta-desc-prefix": "For more information about 'THE Event' programming or registration, please contact",
    "cta-desc-or": "or call",

    // Footer
    "footer-questions": "WANT TO JOIN WITH US?",
    "footer-initiatives": "INITIATIVES",
    "footer-about": "ABOUT",
    "footer-program": "PROGRAM",
    "footer-disclaimer": "DISCLAIMER",
    "footer-link-student-sponsor": "Student Sponsorship",
    "footer-link-sheco": "SHE-CO",
    "footer-link-student-volunteer": "Student Volunteer",
    "footer-link-registration": "Registration Information",
    "footer-link-our-sponsors": "Our Sponsors",
    "footer-disclaimer-text": "This website, the events, information and materials pertaining to and associated with THE Mining Investment Event, are not and should not be construed as an offer to buy or sell, or as a solicitation of an offer to buy or sell, sponsor, advocate, endorse, promote or be construed as making any recommendation or providing investment or other advice for any regulated products, securities or investments.",
  },
  FR: {
    // Nav
    "nav-home": "Accueil",
    "nav-about": "À Propos",
    "nav-about-event": "À Propos de L'Événement",
    "nav-team": "L'Équipe",
    "nav-travel": "Voyage et Hébergement",
    "nav-media": "Médias Récents",
    "nav-newsflash": "THE Newsflash",
    "nav-programs": "Programmes",
    "nav-student": "Programme de Bourses Étudiantes",
    "nav-sheco": "Initiative SHE-Co",
    "nav-partnership": "Partenariat",
    "nav-speakers": "Conférenciers",
    "nav-past-years": "Années Précédentes",
    "nav-snapshot": "Rapport SnapShot",
    "nav-gallery": "Galerie",
    "nav-register": "Inscrivez-vous",

    // Hero
    "hero-eyebrow": "La Seule Conférence d'Investissement Minier de Niveau I au Canada",
    "hero-title-1": "L'Événement",
    "hero-title-2": "d'Investissement",
    "hero-title-3": "Minier",
    "hero-title-4": "",
    "hero-subtitle": "Rencontrer des investisseurs, découvrir des projets, sécuriser des partenariats et façonner l'avenir minier.",
    "hero-date": "3-6 JUIN 2027 · VILLE DE QUÉBEC, CANADA",
    "hero-register": "S'INSCRIRE MAINTENANT",
    "hero-program": "VOIR LE PROGRAMME",

    // Quick Links
    "ql-sponsors": "Commanditaires",
    "ql-companies": "Compagnies Participantes",
    "ql-mining-week": "Semaine Internationale des Mines",
    "ql-agenda": "Ordre du Jour",
    "ql-brochure": "Brochure",
    "ql-meet-team": "Conférenciers",

    // Stats & Glimpse
    "welcome-tag": "BIENVENUE",
    "glimpse-title": "Un Aperçu de L'Événement",
    "glimpse-desc": "Découvrez la seule conférence d'investissement minier de niveau 1 au Canada — où producteurs chevronnés, développeurs émergents, capital institutionnel et leaders de demain se réunissent.",
    "discover-event": "DÉCOUVRIR L'ÉVÉNEMENT",
    "stat-years-label": "ANNÉES",
    "stat-years-sub": "d'Excellence",
    "stat-investors-label": "INVESTISSEURS",
    "stat-investors-sub": "Présents",
    "stat-mining-label": "SOCIÉTÉS MINIÈRES",
    "stat-mining-sub": "Participantes",
    "stat-countries-label": "PAYS",
    "stat-countries-sub": "Représentés",
    "stat-meetings-label": "RÉUNIONS",
    "stat-meetings-sub": "Tenues",

    // Why Attend
    "why-tag": "POURQUOI PARTICIPER",
    "why-title": "Votre Voie Vers Le Succès D'Investissement",
    "why-01-title": "RENCONTRER DES INVESTISSEURS",
    "why-01-desc": "Connectez-vous avec des investisseurs mondiaux recherchant des opportunités minières à fort potentiel.",
    "why-02-title": "DÉCOUVRIR DES OPPORTUNITÉS",
    "why-02-desc": "Explorez des projets miniers à fort potentiel à travers le monde.",
    "why-03-title": "BÂTIR DES PARTENARIATS",
    "why-03-desc": "Créez des partenariats stratégiques pour stimuler une croissance à long terme.",
    "why-04-title": "LEVER DU CAPITAL",
    "why-04-desc": "Obtenez le capital nécessaire pour faire avancer vos projets.",

    // Featured Programs Grid
    "programs-tag": "INITIATIVES EN VEDETTE",
    "programs-title": "Programmes Principaux",
    "prog-edu-cat": "ÉDUCATION",
    "prog-edu-title": "Programme de Bourses Étudiantes",
    "prog-edu-desc": "Offrant une exposition unique à l'industrie minière pour jusqu'à 50 étudiants universitaires passionnés par la géologie et la finance.",
    "prog-edu-cta": "EXPLORER LE PROGRAMME",
    "prog-lead-cat": "LEADERSHIP",
    "prog-lead-title": "Initiative SHE-Co",
    "prog-lead-desc": "Favoriser le progrès de l'industrie grâce à l'innovation ESG et à la diversité des femmes dans le secteur minier.",
    "prog-lead-cta": "EN SAVOIR PLUS",
    "prog-inst-cat": "INSTITUTIONNEL",
    "prog-inst-title": "Partenariat de Niveau 1",
    "prog-inst-desc": "Opportunités sur mesure conçues pour maximiser la visibilité auprès des sociétés minières et investisseurs influents.",
    "prog-inst-cta": "INFO PARTENARIAT",
    "prog-dial-cat": "DIALOGUE",
    "prog-dial-title": "Le Salon ExplorCo Lounge",
    "prog-dial-desc": "Une expérience de réseautage intime pour connecter la communauté d'exploration du Canada aux investisseurs mondiaux.",
    "prog-dial-cta": "RENCONTRER LES CONFÉRENCIERS",

    // Featured Event Countdown
    "feat-event-tag": "ÉVÉNEMENT EN VEDETTE",
    "feat-event-title": "L'ÉVÉNEMENT D'INVESTISSEMENT MINIER",
    "feat-event-date": "3-6 JUIN 2027",
    "feat-event-loc": "VILLE DE QUÉBEC, CANADA",
    "feat-event-agenda": "VOIR L'ORDRE DU JOUR",
    "timer-days": "JOURS",
    "timer-hrs": "HRS",
    "timer-min": "MIN",
    "timer-sec": "SEC",

    // Featured Partners
    "partners-tag": "EN VEDETTE",
    "partners-title": "Partenaires en Vedette",
    "partners-sub": "Un coup de projecteur sur les partenaires propulsant L'Événement d'Investissement Minier. Changez de niveau pour explorer chaque cercle de supporters.",

    // Canada Premier Forum
    "forum-tag": "LA CONFÉRENCE",
    "forum-title": "Premier Forum Minier du Canada",
    "forum-desc": "L'Événement d'Investissement Minier est un rassemblement sur invitation réunissant les sociétés minières et investisseurs les plus influents au monde dans le cadre historique de la ville de Québec.",
    "forum-highlight": "Parrainé indépendamment par le gouvernement du Québec ainsi que la communauté financière et minière dans son ensemble.",
    "forum-bullet-1": "Rencontres privées 1 à 1 organisées entre sociétés minières et investisseurs internationaux",
    "forum-bullet-2": "Conférenciers principaux et leaders d'opinion de l'industrie venus du monde entier",
    "forum-bullet-3": "Promotion de la durabilité via les initiatives de Bourses Étudiantes et SHE-Co",
    "forum-bullet-4": "Plateforme d'innovation ESG et d'égalité dans le secteur minier",
    "forum-bullet-5": "Investisseurs accrédités, bureaux de gestion de patrimoine, institutions et fonds souverains",
    "forum-about-btn": "À PROPOS DE L'ÉVÉNEMENT",

    // Global Community Map
    "map-tag": "PRÉSENCE MONDIALE",
    "map-title": "Où le Monde Minier Converge",
    "map-desc": "Explorez le réseau international d'entreprises, d'investisseurs et de délégations réunies à Québec.",
    "map-cta": "VOIR LA PARTICIPATION MONDIALE",
    "stat-participants": "PARTICIPANTS",
    "stat-student-sponsors": "BOURSES ÉTUDIANTES",
    "stat-program-label": "PROGRAMME",

    // Event Highlights & Media
    "highlights-tag": "MÉDIAS ET FAITS SAILLANTS",
    "highlights-title": "Faits Saillants de l'Événement",
    "highlights-desc": "Trois jours à Québec — sessions plénières, réunions privées et programme de soirée capturés en direct.",
    "stat-photos": "PHOTOS",
    "stat-press": "PRESSE",
    "media-badge-speeches": "DISCOURS PRINCIPAUX",
    "media-title-1": "Conférences Plénières et Perspectives Stratégiques",
    "media-desc-1": "Regardez les discours des leaders miniers mondiaux présentant leurs stratégies de capital.",
    "media-watch": "REGARDER LES REDIFFUSIONS",
    "media-badge-interviews": "ENTREVUES",
    "media-title-2": "Entrevues Exécutives & Investisseurs",
    "media-desc-2": "Entrevues exclusives 1 à 1 avec les PDG, directeurs d'exploration et fonds institutionnels.",
    "media-title-3": "Galerie Photos Haute Résolution",
    "media-desc-3": "Explorez la photographie officielle capturant les réceptions de réseautage et conférences.",
    "media-view-gallery": "VOIR LA GALERIE",

    // Get In Touch CTA
    "cta-tag": "UNE QUESTION ?",
    "cta-title": "Contactez-Nous",
    "cta-desc-prefix": "Pour plus d'informations sur le programme de 'L'Événement' ou l'inscription, veuillez contacter",
    "cta-desc-or": "ou appeler le",

    // Footer
    "footer-questions": "VOUS SOUHAITEZ VOUS JOINDRE À NOUS ?",
    "footer-initiatives": "INITIATIVES",
    "footer-about": "À PROPOS",
    "footer-program": "PROGRAMME",
    "footer-disclaimer": "AVIS DE NON-RESPONSABILITÉ",
    "footer-link-student-sponsor": "Bourses Étudiantes",
    "footer-link-sheco": "SHE-CO",
    "footer-link-student-volunteer": "Bénévoles Étudiants",
    "footer-link-registration": "Informations d'Inscription",
    "footer-link-our-sponsors": "Nos Commanditaires",
    "footer-disclaimer-text": "Ce site Web, les événements, les informations et les documents relatifs à L'Événement d'Investissement Minier ne constituent pas et ne doivent pas être interprétés comme une offre d'achat ou de vente.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("EN");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved === "EN" || saved === "FR") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[lang];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
