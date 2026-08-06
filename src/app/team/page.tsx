"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

/* ──────── Team Data ──────── */
interface TeamMember {
  initials: string;
  name: string;
  role: string;
  roleFr?: string;
  organization?: string;
  organizationFr?: string;
  bio: string;
  bioFr?: string;
  category: "executive" | "board";
}

const coreTeam: TeamMember[] = [
  {
    initials: "JJ",
    name: "Joanne Jobin",
    role: "Founder & CEO",
    roleFr: "Fondatrice et PDG",
    organization: "IR.INC & VID Media",
    organizationFr: "IR.INC & VID Media",
    bio: "Joanne is a seasoned Capital Markets and Communications executive with over 25 years of dedicated experience. She is the Principal and Founder of IR.INC, Capital Markets Advisory, VID Media Incorporated and THE Mining Investment Event of the North. She began her career in the fledgling investor relations industry in 1987 with Barrick Gold, where she helped develop its early IR and marketing programs.\n\nSince then, she has worked in the natural resources sector and managed the investor relations, corporate affairs and communications programs for a number of publicly traded companies, including J.P. Morgan & Co. (Canada), Canadian Tire Corporation, and Meridian Credit Union. Ms. Jobin has held senior IRO positions in several companies, including IAMGOLD, Yamana Gold, Noront Resources, Excellon Resources, Schwazze, and Jaguar Mining.\n\nIR.INC is an Advisory firm dedicated to providing capital markets and IR advice to select natural resource and financial industry clients. VID Media is focused on providing companies with an unparalleled direct investor experience through its unique flagship products including VID Town Hall Forums. THE Mining Investment Event of the North is Canada's only Tier 1 Mining Investment Conference, held annually in Quebec City, hosting 800+ participants including issuers, investors, financial institutions, sponsors and governments of all levels.",
    bioFr: "Joanne est une dirigeante chevronnée des marchés des capitaux et des communications avec plus de 25 ans d'expérience dédiée. Elle est la dirigeante et fondatrice d'IR.INC, Capital Markets Advisory, VID Media Incorporated et THE Mining Investment Event of the North. Elle a débuté sa carrière dans l'industrie émergente des relations avec les investisseurs en 1987 chez Barrick Gold, où elle a contribué au développement de ses premiers programmes de relations avec les investisseurs et de marketing.\n\nDepuis lors, elle a travaillé dans le secteur des ressources naturelles et a géré les programmes de relations avec les investisseurs, d'affaires corporatives et de communications pour plusieurs sociétés cotées en bourse, notamment J.P. Morgan & Co. (Canada), Canadian Tire Corporation et Meridian Credit Union. Mme Jobin a occupé des postes de direction en RI au sein de plusieurs entreprises, dont IAMGOLD, Yamana Gold, Noront Resources, Excellon Resources, Schwazze et Jaguar Mining.\n\nIR.INC est un cabinet de conseil dédié à fournir des conseils en marchés des capitaux et RI à des clients sélectionnés des secteurs des ressources naturelles et de la finance. VID Media se concentre sur la fourniture d'une expérience d'investisseur direct inégalée grâce à ses produits phares uniques, dont les forums VID Town Hall. THE Mining Investment Event of the North est la seule conférence d'investissement minier de Niveau 1 au Canada, tenue annuellement à la ville de Québec, accueillant plus de 800 participants, y compris des émetteurs, des investisseurs, des institutions financières, des commanditaires et des gouvernements de tous niveaux.",
    expandable: true,
    category: "executive",
  },
  {
    initials: "JC",
    name: "Jennifer Choi",
    role: "VP, Operations",
    roleFr: "Vice-présidente des opérations",
    organization: "THE Mining Investment EVENT",
    organizationFr: "THE Mining Investment EVENT",
    bio: "Jennifer Choi serves as Vice President of Operations at THE Mining Investment Event, overseeing all operational aspects of Canada's premier mining investment conference. For registration and event inquiries, Jennifer can be reached directly at jchoi@irinc.ca or +1-905-515-3508.",
    bioFr: "Jennifer Choi occupe le poste de vice-présidente des opérations chez THE Mining Investment Event, supervisant tous les aspects opérationnels de la plus importante conférence d'investissement minier au Canada. Pour toute question d'inscription ou d'événement, Jennifer peut être contactée directement à jchoi@irinc.ca ou au +1-905-515-3508.",
    expandable: false,
    category: "executive",
  },
  {
    initials: "SS",
    name: "Sydney Schuch",
    role: "Manager, Production Services",
    roleFr: "Directrice des services de production",
    organization: "IR INC & VID Media",
    organizationFr: "IR INC & VID Media",
    bio: "Sydney is the Manager, Production Services at IR INC and VID Media, where she oversees production operations and leads the social media team for THE Mining Investment Event. With a background in media, communications, and public affairs, she brings a structured, detail-oriented approach to managing complex projects and stakeholder-driven initiatives.\n\nShe is a graduate of the University of Western Ontario, holding a BA in Political Science and Media Information (2024), and is currently pursuing a Graduate Certificate in Government Relations at Seneca Polytechnic.\n\nAlongside her professional work, Sydney is actively engaged in public service. She volunteers with her local MPP's office and serves as an administrative assistant to the executive team at the Caledonia Royal Canadian Legion.",
    bioFr: "Sydney est directrice des services de production chez IR INC et VID Media, où elle supervise les opérations de production et dirige l'équipe des médias sociaux pour THE Mining Investment Event. Avec une formation en médias, communications et affaires publiques, elle apporte une approche structurée et axée sur les détails à la gestion de projets complexes et d'initiatives axées sur les parties prenantes.\n\nDiplômée de l'Université Western Ontario, elle est titulaire d'un baccalauréat en sciences politiques et informations média (2024), et poursuit actuellement un certificat d'études supérieures en relations gouvernementales au Seneca Polytechnic.\n\nEn parallèle de son travail professionnel, Sydney s'engage activement dans le service public. Elle est bénévole auprès du bureau de son député provincial local et agit en tant qu'assistante administrative auprès de l'équipe exécutive de la Légion royale canadienne de Caledonia.",
    expandable: true,
    category: "executive",
  },
  {
    initials: "JF",
    name: "Jackie Fitos",
    role: "Manager, Client Services",
    roleFr: "Directrice des services clients",
    organization: "THE Mining Investment EVENT",
    organizationFr: "THE Mining Investment EVENT",
    bio: "Jackie Fitos is an accomplished professional with a diverse background in direct sales and client service relationships. Jackie has excelled in her various job roles as supervisor and liaison, bridging the gap between her former companies, clients, and employees. Jackie has identified her commitment to excellence, strong communication skills, and dedication to ensuring client satisfaction as her most valuable assets in her current work with THE Event.",
    bioFr: "Jackie Fitos est une professionnelle accomplie possédant un parcours diversifié dans les ventes directes et les relations de service à la clientèle. Jackie s'est distinguée dans ses divers rôles de superviseure et de liaison, comblant le fossé entre ses anciennes entreprises, ses clients et ses employés. Sa rigueur, ses solides compétences en communication et son dévouement envers la satisfaction client sont ses atouts les plus précieux dans son travail avec L'Événement.",
    expandable: false,
    category: "executive",
  },
  {
    initials: "AN",
    name: "Ada Nocita",
    role: "Manager, Administration Services",
    roleFr: "Directrice des services administratifs",
    organization: "IR INC",
    organizationFr: "IR INC",
    bio: "Ada brings a wealth of administrative and operational experience, with a strong focus on business efficiency, organization, and strategic support. Throughout her career, she has demonstrated an exceptional ability to manage multiple priorities, streamline processes, and support leadership in achieving organizational goals. Known for her professionalism, reliability, and strong communication skills, Ada plays a key role in maintaining effective operations and fostering a productive work environment.\n\nShe brings a results-driven approach to her work, ensuring that daily operations run efficiently while maintaining a high standard of professionalism and client service. Ada is skilled at coordinating teams, managing complex schedules, and supporting business growth through thoughtful planning and attention to detail.",
    bioFr: "Ada apporte une vaste expérience administrative et opérationnelle, fortement axée sur l'efficacité commerciale, l'organisation et le soutien stratégique. Tout au long de sa carrière, elle a démontré une capacité exceptionnelle à gérer de multiples priorités, à rationaliser les processus et à soutenir la direction dans l'atteinte des objectifs organisationnels. Reconnue pour son professionnalisme, sa fiabilité et ses solides compétences en communication, Ada joue un rôle clé dans le maintien d'opérations efficaces et la création d'un environnement de travail productif.\n\nElle apporte une approche axée sur les résultats à son travail, veillant à ce que les opérations quotidiennes se déroulent efficacement tout en maintenant un niveau élevé de professionnalisme et de service client. Ada excelle dans la coordination d'équipes, la gestion d'horaires complexes et le soutien de la croissance des entreprises.",
    expandable: true,
    category: "executive",
  },
  {
    initials: "TZ",
    name: "Taylor Zimmerman",
    role: "Associate",
    roleFr: "Associée",
    organization: "THE Mining Investment EVENT",
    organizationFr: "THE Mining Investment EVENT",
    bio: "Taylor Zimmerman serves as Associate at THE Mining Investment Event, supporting operational planning, delegate relations, and event logistics for Canada's premier mining investment conference.",
    bioFr: "Taylor Zimmerman agit à titre d'associée chez THE Mining Investment Event, appuyant la planification opérationnelle, les relations avec les délégués et la logistique de la plus importante conférence d'investissement minier au Canada.",
    expandable: false,
    category: "executive",
  },
];

const advisoryBoard: TeamMember[] = [
  {
    initials: "YR",
    name: "The Hon. Yvonne Rumbolt-Jones",
    role: "Advisory Board Member",
    roleFr: "Membre du conseil consultatif",
    organization: "Former MP of Labrador & Cabinet Minister",
    organizationFr: "Ancienne députée du Labrador et ministre du Cabinet",
    bio: "Yvonne Rumbolt-Jones is a senior public policy and governance leader with more than thirty years of experience advancing sustainable development, Indigenous partnerships, and community–industry relations in Northern and Arctic Canada. A former Member of Parliament for Labrador, Member of the House of Assembly, Cabinet Minister, and Leader of the Liberal Party of Newfoundland and Labrador, she has built a distinguished career at the intersection of government, Indigenous communities, and the mining and energy sectors.\n\nThroughout her public service, Yvonne championed the inclusion of women and Indigenous peoples in resource development. As Parliamentary Secretary for Natural Resources, she contributed to Canada's Critical Minerals Strategy, supporting Indigenous equity participation, community-benefit frameworks, and responsible mining and energy development in northern and Arctic regions.",
    bioFr: "Yvonne Rumbolt-Jones est une dirigeante de haut niveau en politiques publiques et gouvernance comptant plus de trente ans d'expérience dans l'avancement du développement durable, des partenariats autochtones et des relations communauté-industrie dans le Nord et l'Arctique canadien. Ancienne députée du Labrador, membre de l'Assemblée législative, ministre du Cabinet et chef du Parti libéral de Terre-Neuve-et-Labrador, elle s'est bâtie une carrière distinguée à l'intersection du gouvernement, des communautés autochtones et des secteurs minier et énergétique.\n\nTout au long de son service public, Yvonne a préconisé l'inclusion des femmes et des peuples autochtones dans le développement des ressources. En tant que secrétaire parlementaire des Ressources naturelles, elle a contribué à la Stratégie canadienne sur les minéraux critiques.",
    expandable: true,
    category: "board",
  },
  {
    initials: "DD",
    name: "Daniella Dimitrov",
    role: "Advisory Board Member",
    roleFr: "Membre du conseil consultatif",
    organization: "Chief Strategy & Risk Officer, Equinox Gold Corp.",
    organizationFr: "Directrice de la stratégie et des risques, Equinox Gold Corp.",
    bio: "Daniella has more than 25 years of experience in building, leading and operating businesses in mining and financial services in various strategy, finance, operations, corporate development and governance roles. Daniella's previous roles include President and CEO, Interim CEO, CFO of multi mine gold/copper producers and a $2B+ mine developer, partner at a mining investment bank.\n\nDaniella was chosen as one of the Top 100 Global Inspirational Women in Mining for 2016, was a Canada Board Diversity Council – 2016 Diversity 50 Candidate and has the National Association of Corporate Directors (NACD) Directorship Certification.",
    bioFr: "Daniella possède plus de 25 ans d'expérience dans la création, la direction et l'exploitation d'entreprises du secteur minier et des services financiers, dans divers rôles de stratégie, finance, opérations, développement d'entreprise et gouvernance. Les rôles précédents de Daniella incluent présidente et PDG, PDG par intérim, directrice financière de producteurs d'or/cuivre multi-mines et d'un développeur minier de plus de 2 milliards de dollars, et associée dans une banque d'investissement minier.\n\nDaniella a été choisie parmi les 100 femmes inspirantes de l'industrie minière mondiale en 2016 et a obtenu la certification de gestion d'entreprise de la National Association of Corporate Directors (NACD).",
    expandable: true,
    category: "board",
  },
  {
    initials: "DS",
    name: "Daniele Spethmann",
    role: "Advisory Board Member",
    roleFr: "Membre du conseil consultatif",
    organization: "CEO & Founder, XV Solutions",
    organizationFr: "PDG et fondatrice, XV Solutions",
    bio: "Daniele is an international mining industry executive with a technical background in geology and over 30 years of experience in mineral exploration, team building, and corporate leadership across public companies, M&A transitions, and not-for-profits. She is a co-founder of Warrior Gold Inc., taking it from private to public.\n\nShe currently serves as Secretary and Director of the Ontario Prospectors Association, helping to rebuild its governance, leadership, and strategic direction.",
    bioFr: "Daniele est une dirigeante internationale de l'industrie minière avec une formation technique en géologie et plus de 30 ans d'expérience dans l'exploration minérale, la création d'équipes et la direction d'entreprises publiques, les transitions de fusion-acquisition et les organismes à but non lucratif. Elle est cofondatrice de Warrior Gold Inc., l'ayant fait passer du statut privé à public.\n\nElle occupe actuellement les fonctions de secrétaire et directrice de l'Ontario Prospectors Association, aidant à reconstruire sa gouvernance, son leadership et sa direction stratégique.",
    expandable: true,
    category: "board",
  },
  {
    initials: "AS",
    name: "Angie Stockley",
    role: "Advisory Board Member",
    roleFr: "Membre du conseil consultatif",
    organization: "President & CCO, SSAF Exploration",
    organizationFr: "Présidente et CCO, SSAF Exploration",
    bio: "Angie Stockley is an accomplished executive with over 25 years' experience in corporate development, strategic communications, go-to-market strategy, investor relations, partnership development, M&A activity and change management. Her current focus is predominantly in the mining sector, coupled with extensive expertise in tech, enterprise SaaS and the public sector.\n\nIn the mining sector, Angie's roles include serving as President, Chief Commercial Officer (CCO) and Director at Blue Ice Gold; and President and CCO at SSAF Exploration.",
    bioFr: "Angie Stockley est une dirigeante accomplie comptant plus de 25 ans d'expérience dans le développement d'entreprise, les communications stratégiques, la stratégie de commercialisation, les relations avec les investisseurs, le développement de partenariats, les activités de fusion-acquisition et la gestion du changement. Son accent actuel est principalement mis sur le secteur minier, combiné à une vaste expertise en technologie, SaaS d'entreprise et secteur public.\n\nDans le secteur minier, les rôles d'Angie incluent les fonctions de présidente, directrice commerciale (CCO) et directrice chez Blue Ice Gold, ainsi que présidente et CCO chez SSAF Exploration.",
    expandable: true,
    category: "board",
  },
  {
    initials: "JC",
    name: "Jenny-Lou Campbell",
    role: "Advisory Board Member",
    roleFr: "Membre du conseil consultatif",
    organization: "Executive Director, ICEMD",
    organizationFr: "Directrice générale, ICEMD",
    bio: "Jenny-Lou Campbell is Anishinaabe-Kwe and a proud member of Serpent River First Nation. She grew up in the Ontario mining communities of Elliot Lake and Marathon. Her career in mining has taken her to Hemlo Ontario, Thompson Manitoba, and Sudbury Ontario.\n\nCurrently as the Executive Director of the Indigenous Centre of Excellence for Mineral Development (ICEMD), Jenny is leading efforts to support First Nation participation in the mining sector.",
    bioFr: "Jenny-Lou Campbell est Anishinaabe-Kwe et fière membre de la Première Nation de Serpent River. Elle a grandi dans les communautés minières ontariennes d'Elliot Lake et de Marathon. Sa carrière dans le secteur minier l'a amenée à Hemlo (Ontario), Thompson (Manitoba) et Sudbury (Ontario).\n\nActuellement directrice générale du Centre d'excellence autochtone pour le développement minéral (ICEMD), Jenny dirige les efforts visant à soutenir la participation des Premières Nations dans le secteur minier.",
    expandable: true,
    category: "board",
  },
  {
    initials: "SV",
    name: "Stéfanie Vo",
    role: "Advisory Board Member",
    roleFr: "Membre du conseil consultatif",
    organization: "Regional Director, Eastern Canada, Hatch",
    organizationFr: "Directrice régionale, Est du Canada, Hatch",
    bio: "Stéfanie Vo is a senior process engineer with two decades of experience in consulting engineering, specializing in mineral processing and process optimization. Her career includes more than four years on-site at an iron ore concentrator. She currently serves as Regional Director, Mining and Metals for Eastern Canada at Hatch, and contributes to the Board of Directors for CIM's Canadian Mineral Processors (CMP) Society.",
    bioFr: "Stéfanie Vo est une ingénieure de procédé senior comptant deux décennies d'expérience en ingénierie-conseil, spécialisée dans le traitement des minerais et l'optimisation des procédés. Sa carrière comprend plus de quatre ans sur le terrain dans un concentrateur de minerai de fer. Elle occupe actuellement le poste de directrice régionale, Mines et métaux pour l'Est du Canada chez Hatch, et siège au conseil d'administration de la Société des minéralurgistes du Canada (CMP) de l'ICM.",
    expandable: false,
    category: "board",
  },
];

/* ──────── Board Member Card (Unified Executive Style) ──────── */
function BoardCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false);
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";

  const bioText = isFr && member.bioFr ? member.bioFr : member.bio;
  const roleText = isFr && member.roleFr ? member.roleFr : member.role;
  const orgText = isFr && member.organizationFr ? member.organizationFr : member.organization;

  const paragraphs = bioText.split("\n\n");
  const shortBio = paragraphs[0];

  return (
    <div className="group bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs hover:border-[#C6112F]/40 hover:shadow-[0_16px_36px_rgba(198,17,47,0.08)] transition-all duration-500 flex flex-col hover:-translate-y-1.5">
      {/* Avatar Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0f1117] to-[#1a1f2c] border-2 border-[#C6112F]/30 flex items-center justify-center text-white font-black text-xl sm:text-2xl shrink-0 group-hover:border-[#C6112F] group-hover:scale-105 transition-all duration-300 shadow-md">
          {member.initials}
        </div>
        <div className="pt-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#C6112F] bg-[#fef2f2] px-2.5 py-0.5 rounded-full border border-[#C6112F]/15 mb-1.5 inline-block">
            {isFr ? "CONSEIL CONSULTATIF" : "ADVISORY BOARD"}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#1a1f2c] tracking-tight leading-tight">
            {member.name}
          </h3>
          <p className="text-[#C6112F] text-xs sm:text-sm font-extrabold mt-0.5">{roleText}</p>
          {orgText && (
            <p className="text-neutral-500 text-xs font-semibold mt-0.5">{orgText}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-12 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />

      {/* Bio */}
      <div className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium space-y-2.5 flex-1">
        {expanded ? (
          paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
        ) : (
          <p className="line-clamp-4">{shortBio}</p>
        )}
      </div>

      {/* Read More Button */}
      {member.expandable && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 pt-3 border-t border-neutral-100 text-[#C6112F] text-xs font-bold tracking-wider uppercase hover:underline inline-flex items-center gap-1.5 self-start transition-colors"
        >
          {expanded ? t("team-read-less", "Read Less ↑") : t("team-read-more", "Read Full Bio ➔")}
        </button>
      )}
    </div>
  );
}

/* ──────── Core Team Card (Executive Card) ──────── */
function ExecutiveCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false);
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";

  const bioText = isFr && member.bioFr ? member.bioFr : member.bio;
  const roleText = isFr && member.roleFr ? member.roleFr : member.role;
  const orgText = isFr && member.organizationFr ? member.organizationFr : member.organization;

  const paragraphs = bioText.split("\n\n");
  const shortBio = paragraphs[0];

  return (
    <div className="group bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-7 shadow-2xs hover:border-[#C6112F]/40 hover:shadow-[0_16px_36px_rgba(198,17,47,0.08)] transition-all duration-500 flex flex-col hover:-translate-y-1.5">
      {/* Avatar Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0f1117] to-[#1a1f2c] border-2 border-[#C6112F]/30 flex items-center justify-center text-white font-black text-xl sm:text-2xl shrink-0 group-hover:border-[#C6112F] group-hover:scale-105 transition-all duration-300 shadow-md">
          {member.initials}
        </div>
        <div className="pt-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#C6112F] bg-[#fef2f2] px-2.5 py-0.5 rounded-full border border-[#C6112F]/15 mb-1.5 inline-block">
            {isFr ? "DIRECTION EXÉCUTIVE" : "EXECUTIVE LEADERSHIP"}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#1a1f2c] tracking-tight leading-tight">
            {member.name}
          </h3>
          <p className="text-[#C6112F] text-xs sm:text-sm font-extrabold mt-0.5">{roleText}</p>
          {orgText && (
            <p className="text-neutral-500 text-xs font-semibold mt-0.5">{orgText}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-12 h-[2.5px] bg-[#C6112F] rounded-full mb-4" />

      {/* Bio */}
      <div className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-medium space-y-2.5 flex-1">
        {expanded ? (
          paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
        ) : (
          <p className="line-clamp-4">{shortBio}</p>
        )}
      </div>

      {/* Read More Button */}
      {member.expandable && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 pt-3 border-t border-neutral-100 text-[#C6112F] text-xs font-bold tracking-wider uppercase hover:underline inline-flex items-center gap-1.5 self-start transition-colors"
        >
          {expanded ? t("team-read-less", "Read Less ↑") : t("team-read-more", "Read Full Bio ➔")}
        </button>
      )}
    </div>
  );
}

export default function TeamPage() {
  const { t, lang } = useLanguage();
  const isFr = lang === "FR";
  const [activeTab, setActiveTab] = useState<"all" | "executive" | "board">("all");

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full bg-[#f8fafc]">
        {/* ═══════ HERO BANNER ═══════ */}
        <section className="relative w-full bg-[#0f1117] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6112F]/20 via-transparent to-transparent" />
          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-400 mb-6">
              <a href="/" className="hover:text-white transition-colors">{t("nav-home", "Home")}</a>
              <span className="text-[#C6112F]">›</span>
              <span className="text-neutral-500">{t("nav-about", "About")}</span>
              <span className="text-[#C6112F]">›</span>
              <span className="text-white">{t("nav-team", "THE Team")}</span>
            </div>

            <span className="text-[#C6112F] text-xs font-black tracking-[0.25em] uppercase mb-3 block">
              {isFr ? "DIRECTION ET GOUVERNANCE" : "LEADERSHIP & GOVERNANCE"}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-4">
              <span className="text-[#C6112F]">{t("team-hero-title-1", "THE")}</span> {t("team-hero-title-2", "Team & Advisory Board")}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-[720px] font-medium leading-relaxed mb-8">
              {isFr
                ? "Rencontrez les dirigeants visionnaires, les vétérans de l'industrie et les membres distingués du conseil qui guident la première conférence d'investissement minier de Niveau 1 au Canada."
                : "Meet the visionary leaders, industry veterans, and distinguished board members guiding Canada's premier Tier 1 mining investment conference."}
            </p>
            <div className="w-20 h-[3px] bg-[#C6112F] rounded-full" />
          </div>
        </section>

        {/* ═══════ CATEGORY FILTER TABS ═══════ */}
        <section className="sticky top-[72px] z-30 w-full bg-white border-b border-neutral-200 shadow-2xs">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${activeTab === "all"
                  ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
              >
                {isFr ? `Tous les membres (${coreTeam.length + advisoryBoard.length})` : `All Members (${coreTeam.length + advisoryBoard.length})`}
              </button>
              <button
                onClick={() => setActiveTab("executive")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${activeTab === "executive"
                  ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
              >
                {isFr ? `Équipe exécutive (${coreTeam.length})` : `Core Executive Team (${coreTeam.length})`}
              </button>
              <button
                onClick={() => setActiveTab("board")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${activeTab === "board"
                  ? "bg-[#C6112F] text-white shadow-md shadow-[#C6112F]/20"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
              >
                {isFr ? `Membres du conseil (${advisoryBoard.length})` : `Advisory Board Members (${advisoryBoard.length})`}
              </button>
            </div>

            <span className="hidden md:inline-block text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {isFr ? "Ville de Québec • Canada" : "Quebec City • Canada"}
            </span>
          </div>
        </section>

        {/* ═══════ CORE TEAM SECTION ═══════ */}
        {(activeTab === "all" || activeTab === "executive") && (
          <section className="relative w-full py-16 sm:py-20">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
              <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                {t("team-core-label", "Core Team")}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
                {t("team-core-title-1", "The People Behind")} <span className="text-[#C6112F]">{t("team-core-title-2", "THE Event")}</span>
              </h2>
              <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-10" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {coreTeam.map((m) => (
                  <ExecutiveCard key={m.name} member={m} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════ ADVISORY BOARD SECTION (PROMINENT PORTRAIT GRID) ═══════ */}
        {(activeTab === "all" || activeTab === "board") && (
          <section className="relative w-full py-16 sm:py-20 bg-[#ffffff] border-t border-neutral-200/80">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
              <div className="mb-10 max-w-[720px]">
                <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
                  {t("team-advisory-label", "Advisory Board Members")}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
                  {t("team-advisory-title", "Advisory Board")}
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base font-medium leading-relaxed mb-4">
                  {t("team-advisory-desc", "Distinguished mining executives, former government leaders and technical experts providing strategic direction for THE Mining Investment Event.")}
                </p>
                <div className="w-16 h-[3px] bg-[#C6112F] rounded-full" />
              </div>

              {/* 3-Column Prominent Board Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {advisoryBoard.map((m) => (
                  <BoardCard key={m.name} member={m} />
                ))}
              </div>
            </div>
          </section>
        )}

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
