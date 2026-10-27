"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface Section {
  id?: string;
  title: string;
  content: string;
  paragraphs?: string[];
  list?: string[];
  subcontent?: string;
  contactInfo?: boolean;
}

export default function PrivacyPolicyPage() {
  const { t, lang } = useLanguage();

  const sections: Section[] = lang === "FR" ? [
    {
      title: "1. Introduction et Date d'entrée en vigueur",
      content: "Date d'entrée en vigueur : janvier 2022",
      paragraphs: [
        "VID Media Incorporated (« nous », « notre » ou « nos ») exploite le site Web https://www.vidconferences.com (le « Service »).",
        "Cette page vous informe de nos politiques concernant la collecte, l'utilisation et la divulgation des données personnelles lorsque vous utilisez notre Service ainsi que les choix dont vous disposez associés à ces données.",
        "Nous utilisons vos données pour fournir et améliorer le Service. En utilisant le Service, vous acceptez la collecte et l'utilisation d'informations conformément à la présente politique. Sauf définition contraire dans cette politique de confidentialité, les termes utilisés ont la même signification que dans nos Conditions générales, accessibles depuis https://www.vidconferences.com."
      ]
    },
    {
      title: "2. Collecte et Utilisation des Informations",
      content: "Nous recueillons plusieurs types de renseignements différents à diverses fins afin de vous fournir notre Service et de l'améliorer.",
      paragraphs: [
        "Données Personnelles : Lors de l'utilisation de notre Service, nous pouvons vous demander de nous fournir certaines informations d'identification personnelle pouvant être utilisées pour vous contacter ou vous identifier (« Données personnelles »). Les informations d'identification personnelle peuvent inclure, sans s'y limiter :"
      ],
      list: [
        "Adresse courriel (Email address)",
        "Prénom et nom de famille (First name and last name)",
        "Cookies et Données d'utilisation (Cookies and Usage Data)"
      ]
    },
    {
      title: "3. Données d'Utilisation (Usage Data)",
      content: "Nous ne partageons pas vos renseignements personnels avec des tiers.",
      paragraphs: [
        "Nous pouvons également recueillir des informations sur la manière dont le Service est consulté et utilisé (« Données d'utilisation »). Ces données d'utilisation peuvent inclure des informations telles que l'adresse de protocole Internet de votre ordinateur (ex. adresse IP), le type de navigateur, la version du navigateur, les pages de notre Service que vous visitez, l'heure et la date de votre visite, le temps passé sur ces pages, les identifiants uniques de périphériques et d'autres données de diagnostic."
      ]
    },
    {
      title: "4. Données de Suivi et Témoins (Cookies)",
      content: "Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre Service et conserver certaines informations.",
      paragraphs: [
        "Les cookies sont des fichiers contenant une faible quantité de données pouvant inclure un identifiant unique anonyme. Les cookies sont envoyés à votre navigateur depuis un site Web et enregistrés sur votre appareil. D'autres technologies de suivi comme les balises, pixels et scripts sont également utilisées pour recueillir et suivre les informations et pour analyser et perfectionner notre Service.",
        "Vous pouvez configurer votre navigateur pour refuser tous les cookies ou indiquer quand un cookie est envoyé. Cependant, si vous n'acceptez pas les cookies, vous pourriez ne pas être en mesure d'utiliser certaines portions de notre Service.",
        "Exemples de témoins (cookies) que nous utilisons :"
      ],
      list: [
        "Témoins de session (Session Cookies) : Nous utilisons des témoins de session pour faire fonctionner notre Service.",
        "Témoins de préférences (Preference Cookies) : Nous utilisons des témoins de préférences pour mémoriser vos préférences et différents paramètres.",
        "Témoins de sécurité (Security Cookies) : Nous utilisons des témoins de sécurité à des fins de sécurité et de protection."
      ]
    },
    {
      title: "5. Ne Pas Pister (Do Not Track)",
      content: "Veuillez noter que nous ne modifions pas les pratiques de collecte et d'utilisation de données de notre site lorsque nous détectons un signal « Do Not Track » provenant de votre navigateur."
    },
    {
      title: "6. RGPD (Résidents Européens)",
      content: "Si vous résidez dans l'Espace économique européen, vous avez le droit d'accéder aux données personnelles que nous détenons à votre sujet et de demander que vos données personnelles soient rectifiées, mises à jour ou supprimées. Si vous souhaitez exercer ce droit, veuillez nous contacter aux coordonnées ci-dessous. De plus, veuillez noter que vos informations seront transférées hors d'Europe, notamment vers le Canada et les États-Unis."
    },
    {
      title: "7. Utilisation des Données",
      content: "VID Media Incorporated utilise les données recueillies à diverses fins :",
      list: [
        "Fournir et maintenir le Service",
        "Vous informer des modifications apportées à notre Service",
        "Vous permettre de participer aux fonctionnalités interactives de notre Service lorsque vous le souhaitez",
        "Fournir une assistance et un service client de qualité",
        "Fournir des analyses ou des informations précieuses pour améliorer le Service",
        "Surveiller l'utilisation du Service",
        "Détecter, prévenir et résoudre les problèmes techniques",
        "Partager avec les fournisseurs de services externes de l'Entreprise qui nous assistent dans nos prestations (ex. publicité avec les plateformes Google Ads et AdRoll)",
        "Personnaliser le contenu Web le cas échéant"
      ],
      subcontent: "Pour vous désinscrire de la publicité ciblée en ligne, veuillez visiter : http://www.aboutads.info/"
    },
    {
      title: "8. Transfert des Données",
      content: "Vos informations, y compris vos Données personnelles, peuvent être transférées et conservées sur des ordinateurs situés en dehors de votre province, pays ou autre juridiction gouvernementale où les lois sur la protection des données peuvent différer de celles de votre juridiction.",
      paragraphs: [
        "Si vous résidez à l'extérieur du Canada et choisissez de nous fournir des renseignements, veuillez noter que nous transférons les données, y compris les Données personnelles, au Canada et les y traitons.",
        "Votre consentement à la présente politique de confidentialité suivi de votre soumission de telles informations représente votre accord quant à ce transfert.",
        "VID Media Incorporated prendra toutes les mesures raisonnablement nécessaires pour s'assurer que vos données sont traitées en toute sécurité et conformément à la présente politique de confidentialité. Aucun transfert de vos Données personnelles n'aura lieu vers une organisation ou un pays à moins que des contrôles adéquats ne soient en place, y compris la sécurité de vos données et d'autres informations personnelles."
      ]
    },
    {
      title: "9. Divulgation des Données et Exigences Légales",
      content: "VID Media Incorporated peut divulguer vos Données personnelles en croyant de bonne foi qu'une telle action est nécessaire pour :",
      list: [
        "Se conformer à une obligation légale",
        "Protéger et défendre les droits ou les biens de VID Media Inc.",
        "Prévenir ou enquêter sur d'éventuels actes répréhensibles liés au Service",
        "Protéger la sécurité personnelle des utilisateurs du Service ou du public",
        "Se protéger contre toute responsabilité légale"
      ]
    },
    {
      title: "10. Sécurité des Données",
      content: "La sécurité de vos données est importante pour nous, mais rappelez-vous qu'aucune méthode de transmission sur Internet ou de stockage électronique n'est sûre à 100 %. Bien que nous nous efforcions d'utiliser des moyens commercialement acceptables pour protéger vos données personnelles, nous ne pouvons garantir leur sécurité absolue."
    },
    {
      title: "11. Prestataires de Services",
      content: "Nous pouvons employer des entreprises et des tiers pour faciliter notre Service (« Prestataires de services »), fournir le Service en notre nom, effectuer des prestations liées au Service ou nous aider à analyser la manière dont notre Service est utilisé.",
      paragraphs: [
        "Ces tiers n'ont accès à vos données personnelles que pour effectuer ces tâches en notre nom et sont tenus de ne pas les divulguer ni de les utiliser à d'autres fins."
      ]
    },
    {
      title: "12. Analyses et Google Analytics",
      content: "Nous pouvons faire appel à des prestataires de services tiers pour surveiller et analyser l'utilisation de notre Service.",
      paragraphs: [
        "Google Analytics : Google Analytics est un service d'analyse Web proposé par Google qui suit et rapporte le trafic du site Web. Google utilise les données recueillies pour suivre et surveiller l'utilisation de notre Service. Ces données sont partagées avec d'autres services Google. Google peut utiliser les données recueillies pour contextualiser et personnaliser les annonces de son propre réseau publicitaire.",
        "Vous pouvez désactiver la mise à disposition de votre activité sur le Service pour Google Analytics en installant le module complémentaire de navigateur pour la désactivation de Google Analytics. Le module complémentaire empêche le JavaScript de Google Analytics (ga.js, analytics.js et dc.js) de partager des informations avec Google Analytics sur les visites.",
        "Pour plus d'informations sur les pratiques de confidentialité de Google, veuillez visiter la page Web Google Confidentialité et Conditions : https://policies.google.com/privacy?hl=fr"
      ]
    },
    {
      title: "13. Liens Vers d'Autres Sites",
      content: "Notre Service peut contenir des liens vers d'autres sites qui ne sont pas exploités par nous. Si vous cliquez sur un lien tiers, vous serez redirigé vers le site de ce tiers. Nous vous conseillons vivement de consulter la politique de confidentialité de chaque site que vous visitez.",
      paragraphs: [
        "Nous n'avons aucun contrôle et n'assumons aucune responsabilité quant au contenu, aux politiques de confidentialité ou aux pratiques des sites ou services tiers."
      ]
    },
    {
      title: "14. Confidentialité des Enfants",
      content: "Notre Service ne s'adresse à personne de moins de 18 ans (« Enfants »).",
      paragraphs: [
        "Nous ne recueillons pas sciemment d'informations d'identification personnelle auprès de personnes de moins de 18 ans. Si vous êtes un parent ou un tuteur et que vous apprenez que vos enfants nous ont fourni des Données personnelles, veuillez nous contacter. Si nous apprenons que nous avons recueilli des données personnelles d'enfants sans vérification du consentement parental, nous prenons des mesures pour supprimer ces informations de nos serveurs."
      ]
    },
    {
      title: "15. Modifications de Cette Politique de Confidentialité",
      content: "Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page.",
      paragraphs: [
        "Nous vous en informerons par courriel et/ou par un avis visible sur notre Service avant que le changement ne devienne effectif et mettrons à jour la « date d'entrée en vigueur » en haut de cette politique.",
        "Il vous est conseillé de consulter périodiquement cette politique de confidentialité pour prendre connaissance des éventuelles modifications. Les modifications apportées à cette politique de confidentialité entrent en vigueur lorsqu'elles sont publiées sur cette page."
      ]
    },
    {
      title: "16. Nous Contacter",
      content: "Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter :",
      contactInfo: true
    },
    {
      id: "disclaimer",
      title: "17. Avis de non-responsabilité en matière d'investissement / Disclaimer",
      content: "Ce site Web, les événements, les informations et les documents relatifs à THE Mining Investment Event ne constituent pas et ne doivent pas être interprétés comme une offre d'achat ou de vente, ou comme une sollicitation d'une offre d'achat ou de vente, ni comme un parrainage, une promotion, un soutien ou une recommandation, ni comme la prestation de conseils en investissement ou d'autres conseils pour tous produits, titres ou investissements réglementés. Aucune décision d'investir dans des produits réglementés ou non réglementés, y compris les monnaies numériques ou les actifs numériques rattachés, les titres ou les investissements, ne doit être prise en se fondant sur l'une quelconque des informations ou des documents présents sur le site Web ou lors de THE Mining Investment Event. Les investisseurs éventuels doivent solliciter les conseils de conseillers financiers, juridiques, fiscaux et comptables dûment qualifiés et agréés, en tenant compte de leurs besoins et de leur situation financière individuels et en évaluant soigneusement les risques associés à de telles décisions d'investissement."
    }
  ] : [
    {
      title: "1. Introduction & Effective Date",
      content: "Effective date: January 2022",
      paragraphs: [
        "VID Media Incorporated (\"us\", \"we\", or \"our\") operates the https://www.vidconferences.com website (the \"Service\").",
        "This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.",
        "We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from https://www.vidconferences.com."
      ]
    },
    {
      title: "2. Information Collection and Use",
      content: "We collect several different types of information for various purposes to provide and improve our Service to you.",
      paragraphs: [
        "Types of Data Collected — Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (\"Personal Data\"). Personally identifiable information may include, but is not limited to:"
      ],
      list: [
        "Email address",
        "First name and last name",
        "Cookies and Usage Data"
      ]
    },
    {
      title: "3. Usage Data",
      content: "We do not share your Personal Information with third parties.",
      paragraphs: [
        "We may also collect information on how the Service is accessed and used (\"Usage Data\"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data."
      ]
    },
    {
      title: "4. Tracking & Cookies Data",
      content: "We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.",
      paragraphs: [
        "Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.",
        "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.",
        "Examples of Cookies we use:"
      ],
      list: [
        "Session Cookies: We use Session Cookies to operate our Service.",
        "Preference Cookies: We use Preference Cookies to remember your preferences and various settings.",
        "Security Cookies: We use Security Cookies for security purposes."
      ]
    },
    {
      title: "5. Do Not Track",
      content: "Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser."
    },
    {
      title: "6. GDPR (European Residents)",
      content: "If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States."
    },
    {
      title: "7. Use of Data",
      content: "VID Media Incorporated uses the collected data for various purposes:",
      list: [
        "To provide and maintain the Service",
        "To notify you about changes to our Service",
        "To allow you to participate in interactive features of our Service when you choose to do so",
        "To provide customer care and support",
        "To provide analysis or valuable information so that we can improve the Service",
        "To monitor the usage of the Service",
        "To detect, prevent and address technical issues",
        "To share with the Company’s external service providers who assist us with our services and functions (e.g., advertising with Google Ads and AdRoll platforms)",
        "To personalize web content where applicable"
      ],
      subcontent: "To Opt-out of receiving targeted online advertising please visit the following link: http://www.aboutads.info/"
    },
    {
      title: "8. Transfer Of Data",
      content: "Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.",
      paragraphs: [
        "If you are located outside Canada and choose to provide information to us, please note that we transfer the data, including Personal Data, to Canada and process it there.",
        "Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.",
        "VID Media Incorporated will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information."
      ]
    },
    {
      title: "9. Disclosure Of Data & Legal Requirements",
      content: "VID Media Incorporated may disclose your Personal Data in the good faith belief that such action is necessary to:",
      list: [
        "To comply with a legal obligation",
        "To protect and defend the rights or property of VID Media Inc.",
        "To prevent or investigate possible wrongdoing in connection with the Service",
        "To protect the personal safety of users of the Service or the public",
        "To protect against legal liability"
      ]
    },
    {
      title: "10. Security Of Data",
      content: "The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security."
    },
    {
      title: "11. Service Providers",
      content: "We may employ third party companies and individuals to facilitate our Service (\"Service Providers\"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.",
      paragraphs: [
        "These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose."
      ]
    },
    {
      title: "12. Analytics & Google Analytics",
      content: "We may use third-party Service Providers to monitor and analyze the use of our Service.",
      paragraphs: [
        "Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.",
        "You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.",
        "For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page: https://policies.google.com/privacy?hl=en"
      ]
    },
    {
      title: "13. Links To Other Sites",
      content: "Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.",
      paragraphs: [
        "We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services."
      ]
    },
    {
      title: "14. Children's Privacy",
      content: "Our Service does not address anyone under the age of 18 (\"Children\").",
      paragraphs: [
        "We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers."
      ]
    },
    {
      title: "15. Changes To This Privacy Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
      paragraphs: [
        "We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the \"effective date\" at the top of this Privacy Policy.",
        "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page."
      ]
    },
    {
      title: "16. Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us:",
      contactInfo: true
    },
    {
      id: "disclaimer",
      title: "17. Investment & Legal Disclaimer",
      content: "This website, the events, information and materials pertaining to and associated with THE Mining Investment Event, are not, and should not be construed as an offer to buy or sell, or as a solicitation of an offer to buy or sell, sponsor, advocate, endorse, promote or be construed as making any recommendation or providing investment or other advice for any regulated products, securities, or investments. A decision to invest in any regulated products, or any unregulated products, including digital currencies or digitally attached assets, securities or investments should not be made in reliance on any of the information or materials on the website, or at THE Mining investment Event. Prospective investors should seek advice from appropriately qualified and licensed financial, legal, tax and accounting advisors, taking into account their individual financial needs and circumstances and carefully considering the risks associated with any such investment decisions."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white dark:bg-[#0e1626] transition-colors duration-300">
        {/* ══════ HERO SECTION ══════ */}
        <section className="relative w-full bg-[#0f1117] text-white pt-28 sm:pt-30 md:pt-32 pb-10 sm:pb-12 md:pb-14 border-b-[3px] border-[#C6112F]">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-400 mb-6 font-bold">
              <a href="/" className="hover:text-white transition-colors">
                {t("py-home", "Home")}
              </a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">
                {lang === "FR" ? "Politique de Confidentialité" : "Privacy Policy"}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C6112F] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#C6112F]/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <span className="text-[#C6112F] text-xs font-black tracking-[0.2em] uppercase">
                {lang === "FR" ? "DOCUMENT JURIDIQUE" : "LEGAL DOCUMENT"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
              {lang === "FR" ? "Politique de Confidentialité" : "Privacy Policy"}
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] rounded-full mb-5" />
            <p className="text-neutral-300 text-sm sm:text-base max-w-[760px] font-medium leading-relaxed">
              {lang === "FR"
                ? "Date d'entrée en vigueur : janvier 2022. Ce document vous informe des politiques de VID Media Incorporated concernant la collecte, l'utilisation et la divulgation de données personnelles lors de l'utilisation du Service."
                : "Effective date: January 2022. This document informs you of the policies of VID Media Incorporated regarding the collection, use, and disclosure of personal data when you use the Service."}
            </p>
          </div>
        </section>

        {/* ══════ PRIVACY POLICY CONTENT ══════ */}
        <section className="py-12 sm:py-14 md:py-16 bg-neutral-50 dark:bg-[#090d16] min-h-[600px] transition-colors duration-300">
          <div className="max-w-[860px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-white dark:bg-[#131b2e] border border-neutral-200/90 dark:border-[#233049] rounded-3xl p-6 sm:p-10 shadow-xl">
              {sections.map((section, idx) => (
                <div key={idx} id={section.id} className={`${idx > 0 ? "mt-10 pt-8 border-t border-neutral-200/80 dark:border-[#233049]" : ""}`}>
                  <h2 className="text-lg sm:text-xl font-black text-[#101828] dark:text-white mb-3 tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-neutral-700 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed font-medium">
                    {section.content}
                  </p>

                  {section.paragraphs && (
                    <div className="mt-3 space-y-3">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-neutral-700 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed font-medium">
                          {p}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.list && (
                    <ul className="mt-4 space-y-3">
                      {section.list.map((item, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-slate-300 leading-relaxed font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6112F] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.subcontent && (
                    <p className="mt-4 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-slate-400 bg-neutral-100 dark:bg-[#1a2337] p-3 rounded-xl border border-neutral-200 dark:border-[#2a3a5a]">
                      {section.subcontent}
                    </p>
                  )}

                  {section.contactInfo && (
                    <div className="mt-6 bg-neutral-50 dark:bg-[#0e1626] border border-neutral-200 dark:border-[#233049] rounded-2xl p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#C6112F] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <div>
                          <span className="text-xs font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">Email</span>
                          <a href="mailto:info@vidconferences.com" className="text-sm font-bold text-[#C6112F] hover:underline">
                            info@vidconferences.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#C6112F] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        <div>
                          <span className="text-xs font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">
                            {lang === "FR" ? "Site Web" : "Website"}
                          </span>
                          <a href="https://www.vidconferences.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#C6112F] hover:underline">
                            www.vidconferences.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#C6112F] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <div>
                          <span className="text-xs font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">{lang === "FR" ? "Téléphone" : "Phone"}</span>
                          <a href="tel:+16479640292" className="text-sm font-bold text-[#C6112F] hover:underline">+1-647-964-0292</a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#C6112F] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <div>
                          <span className="text-xs font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">{lang === "FR" ? "Entité" : "Company"}</span>
                          <span className="text-sm font-bold text-neutral-900 dark:text-white">VID Media Incorporated</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
