"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t, lang } = useLanguage();

  const sections = lang === "FR" ? [
    {
      title: "1. Introduction",
      content: "La présente politique de confidentialité décrit comment THE Mining Investment Event (« nous », « notre » ou « L'Événement ») recueille, utilise, communique et protège les renseignements personnels des visiteurs de notre site Web, des participants aux événements et des personnes qui interagissent avec nos services. THE Mining Investment Event est organisé par IR Inc. et est commandité de manière indépendante par le Gouvernement du Québec, ainsi que par les communautés financières et minières dans leur ensemble."
    },
    {
      title: "2. Renseignements que Nous Recueillons",
      content: "Nous pouvons recueillir les types de renseignements personnels suivants :",
      list: [
        "Informations d'identification : nom complet, titre du poste, nom de l'entreprise, adresse courriel professionnelle, numéro de téléphone et adresse postale.",
        "Informations d'inscription : détails de la participation à l'événement, préférences alimentaires, exigences d'accessibilité et choix de sessions.",
        "Informations de paiement : les données de carte de crédit et de facturation sont traitées de manière sécurisée via des processeurs de paiement tiers et ne sont pas stockées sur nos serveurs.",
        "Données d'utilisation du site Web : adresse IP, type de navigateur, pages visitées, temps passé sur les pages et liens cliqués.",
        "Communications : correspondance par courriel, soumissions de formulaires de contact et réponses à des sondages."
      ]
    },
    {
      title: "3. Comment Nous Utilisons Vos Renseignements",
      content: "Nous utilisons les renseignements personnels recueillis aux fins suivantes :",
      list: [
        "Traiter les inscriptions aux événements et gérer la participation.",
        "Envoyer des confirmations d'événements, des mises à jour, des changements de programme et des informations logistiques.",
        "Fournir un contenu et des recommandations personnalisés en fonction de vos intérêts dans l'industrie.",
        "Améliorer notre site Web, nos événements et nos services grâce à l'analyse et aux commentaires.",
        "Communiquer avec vous au sujet des événements à venir, des opportunités de commandite et des services associés.",
        "Nous conformer aux obligations légales et protéger nos droits."
      ]
    },
    {
      title: "4. Partage de Vos Renseignements",
      content: "Nous pouvons partager vos renseignements personnels avec :",
      list: [
        "Commanditaires et partenaires de l'événement : votre nom, titre et entreprise peuvent être partagés avec les commanditaires de l'événement aux fins de réseautage, sauf si vous choisissez de vous y opposer.",
        "Fournisseurs de services : des prestataires de services tiers qui nous aident dans l'inscription aux événements, le traitement des paiements, le marketing par courriel et l'hébergement Web.",
        "Autorités gouvernementales : lorsque la loi l'exige ou en réponse à des processus juridiques valides.",
        "Partenaires commerciaux : avec votre consentement, nous pouvons partager vos coordonnées avec des tiers sélectionnés offrant des produits ou services pertinents pour l'industrie minière."
      ]
    },
    {
      title: "5. Cookies et Technologies de Suivi",
      content: "Notre site Web utilise des cookies et des technologies de suivi similaires pour améliorer votre expérience de navigation, analyser le trafic du site et comprendre l'engagement des visiteurs. Vous pouvez contrôler les préférences en matière de cookies via les paramètres de votre navigateur. Veuillez noter que la désactivation de certains cookies peut affecter la fonctionnalité du site Web."
    },
    {
      title: "6. Sécurité des Données",
      content: "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos renseignements personnels contre tout accès non autorisé, toute altération, divulgation ou destruction. Ces mesures comprennent le chiffrement, les pare-feu et les pratiques de stockage sécurisé des données. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue."
    },
    {
      title: "7. Conservation des Données",
      content: "Nous conservons les renseignements personnels aussi longtemps que nécessaire pour atteindre les objectifs pour lesquels ils ont été recueillis, y compris pour satisfaire aux exigences légales, comptables ou de déclaration. Les données d'inscription à l'événement sont conservées pendant une période maximale de trois (3) ans après l'événement, sauf si une période de conservation plus longue est requise par la loi."
    },
    {
      title: "8. Vos Droits",
      content: "En vertu des lois applicables en matière de protection des données, vous pouvez avoir les droits suivants :",
      list: [
        "Accès : demander une copie des renseignements personnels que nous détenons à votre sujet.",
        "Rectification : demander la correction des renseignements personnels inexacts ou incomplets.",
        "Suppression : demander la suppression de vos renseignements personnels dans certaines circonstances.",
        "Opposition : vous opposer au traitement de vos renseignements personnels à des fins de marketing direct.",
        "Retrait du consentement : retirer votre consentement au traitement lorsque le consentement constitue la base juridique."
      ]
    },
    {
      title: "9. Sites Web Tiers",
      content: "Notre site Web peut contenir des liens vers des sites Web tiers. Nous ne sommes pas responsables des pratiques de confidentialité de ces sites Web. Nous vous encourageons à consulter les politiques de confidentialité de tout site tiers que vous visitez."
    },
    {
      title: "10. Confidentialité des Enfants",
      content: "Nos services ne s'adressent pas aux personnes de moins de 18 ans. Nous ne recueillons pas sciemment de renseignements personnels auprès d'enfants. Si nous apprenons que nous avons recueilli des renseignements personnels auprès d'un enfant, nous prendrons des mesures pour les supprimer rapidement."
    },
    {
      title: "11. Modifications de Cette Politique",
      content: "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre pour refléter les changements dans nos pratiques ou les exigences légales. Toute modification sera publiée sur cette page avec une date de « dernière mise à jour » révisée. Nous vous encourageons à consulter cette politique périodiquement."
    },
    {
      title: "12. Nous Contacter",
      content: "Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou nos pratiques en matière de données, veuillez nous contacter :",
      contactInfo: true
    }
  ] : [
    {
      title: "1. Introduction",
      content: "This Privacy Policy describes how THE Mining Investment Event (\"we,\" \"our,\" or \"the Event\") collects, uses, discloses, and protects the personal information of visitors to our website, event attendees, and individuals who interact with our services. THE Mining Investment Event is organized by IR Inc. and is independently sponsored by the Government of Québec, and the financial and mining communities at large."
    },
    {
      title: "2. Information We Collect",
      content: "We may collect the following types of personal information:",
      list: [
        "Identification Information: full name, job title, company name, business email address, phone number, and mailing address.",
        "Registration Information: event attendance details, dietary preferences, accessibility requirements, and session selections.",
        "Payment Information: credit card and billing data are processed securely through third-party payment processors and are not stored on our servers.",
        "Website Usage Data: IP address, browser type, pages visited, time spent on pages, and links clicked.",
        "Communications: email correspondence, contact form submissions, and survey responses."
      ]
    },
    {
      title: "3. How We Use Your Information",
      content: "We use the personal information collected for the following purposes:",
      list: [
        "Processing event registrations and managing attendance.",
        "Sending event confirmations, updates, schedule changes, and logistics information.",
        "Providing personalized content and recommendations based on your industry interests.",
        "Improving our website, events, and services through analytics and feedback.",
        "Communicating with you about upcoming events, sponsorship opportunities, and related services.",
        "Complying with legal obligations and protecting our rights."
      ]
    },
    {
      title: "4. Sharing Your Information",
      content: "We may share your personal information with:",
      list: [
        "Event Sponsors & Partners: your name, title, and company may be shared with event sponsors for networking purposes, unless you opt out.",
        "Service Providers: third-party vendors who assist us with event registration, payment processing, email marketing, and website hosting.",
        "Government Authorities: when required by law or in response to valid legal processes.",
        "Business Partners: with your consent, we may share your contact details with selected third parties offering products or services relevant to the mining industry."
      ]
    },
    {
      title: "5. Cookies & Tracking Technologies",
      content: "Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand visitor engagement. You can control cookie preferences through your browser settings. Please note that disabling certain cookies may affect website functionality."
    },
    {
      title: "6. Data Security",
      content: "We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, firewalls, and secure data storage practices. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security."
    },
    {
      title: "7. Data Retention",
      content: "We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. Event registration data is retained for a maximum of three (3) years following the event, unless a longer retention period is required by law."
    },
    {
      title: "8. Your Rights",
      content: "Under applicable data protection laws, you may have the following rights:",
      list: [
        "Access: request a copy of the personal information we hold about you.",
        "Rectification: request correction of inaccurate or incomplete personal information.",
        "Erasure: request deletion of your personal information in certain circumstances.",
        "Objection: object to the processing of your personal information for direct marketing purposes.",
        "Withdraw Consent: withdraw your consent to processing where consent is the legal basis."
      ]
    },
    {
      title: "9. Third-Party Websites",
      content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites. We encourage you to review the privacy policies of any third-party sites you visit."
    },
    {
      title: "10. Children's Privacy",
      content: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete it promptly."
    },
    {
      title: "11. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page with a revised \"last updated\" date. We encourage you to review this policy periodically."
    },
    {
      title: "12. Contact Us",
      content: "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:",
      contactInfo: true
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-white dark:bg-[#0e1626] transition-colors duration-300">
        {/* ══════ HERO SECTION ══════ */}
        <section className="relative w-full bg-[#0f1117] text-white py-20 sm:py-24 pt-32 sm:pt-36 border-b-[3px] border-[#C6112F]">
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
                ? "Ce document explique comment THE Mining Investment Event recueille, utilise et protège vos renseignements personnels. Dernière mise à jour : juillet 2026."
                : "This document explains how THE Mining Investment Event collects, uses, and protects your personal information. Last updated: July 2026."}
            </p>
          </div>
        </section>

        {/* ══════ PRIVACY POLICY CONTENT ══════ */}
        <section className="py-12 sm:py-16 bg-neutral-50 dark:bg-[#090d16] min-h-[600px] transition-colors duration-300">
          <div className="max-w-[860px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-white dark:bg-[#131b2e] border border-neutral-200/90 dark:border-[#233049] rounded-3xl p-6 sm:p-10 shadow-xl">
              {sections.map((section, idx) => (
                <div key={idx} className={`${idx > 0 ? "mt-10 pt-8 border-t border-neutral-200/80 dark:border-[#233049]" : ""}`}>
                  <h2 className="text-lg sm:text-xl font-black text-[#101828] dark:text-white mb-3 tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-neutral-700 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed font-medium">
                    {section.content}
                  </p>

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

                  {section.contactInfo && (
                    <div className="mt-6 bg-neutral-50 dark:bg-[#0e1626] border border-neutral-200 dark:border-[#233049] rounded-2xl p-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#C6112F] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <div>
                          <span className="text-xs font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">Email</span>
                          <a href="mailto:jchoi@irinc.ca" className="text-sm font-bold text-[#C6112F] hover:underline">jchoi@irinc.ca</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#C6112F] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <div>
                          <span className="text-xs font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">{lang === "FR" ? "Téléphone" : "Phone"}</span>
                          <a href="tel:+19055153508" className="text-sm font-bold text-[#C6112F] hover:underline">+1-905-515-3508</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-[#C6112F] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <div>
                          <span className="text-xs font-bold text-neutral-400 dark:text-slate-400 uppercase tracking-wider block">{lang === "FR" ? "Organisateur" : "Organizer"}</span>
                          <span className="text-sm font-bold text-neutral-900 dark:text-white">IR Inc. — THE Mining Investment Event</span>
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
