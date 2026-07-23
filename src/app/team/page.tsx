"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import GetInTouchCTA from "@/components/GetInTouchCTA";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

/* ──────── Team Data ──────── */
const coreTeam = [
  {
    initials: "JJ",
    name: "Joanne Jobin",
    role: "Founder & CEO",
    bio: "Joanne is a seasoned Capital Markets and Communications executive with over 25 years of dedicated experience. She is the Principal and Founder of IR.INC, Capital Markets Advisory, VID Media Incorporated and THE Mining Investment Event of the North. She began her career in the fledgling investor relations industry in 1987 with Barrick Gold, where she helped develop its early IR and marketing programs. Since then, she has worked in the natural resources sector and managed the investor relations, corporate affairs and communications programs for a number of publicly traded companies, including J.P. Morgan & Co. (Canada), Canadian Tire Corporation, and Meridian Credit Union. Ms. Jobin has held senior IRO positions in several companies, including IAMGOLD, Yamana Gold, Noront Resources, Excellon Resources, Schwazze, and Jaguar Mining.\n\nIR.INC is an Advisory firm dedicated to providing capital markets and IR advice to select natural resource and financial industry clients. VID Media is focused on providing companies with an unparalleled direct investor experience through its unique flagship products including VID Town Hall Forums. THE Mining Investment Event of the North is Canada's only Tier 1 Mining Investment Conference, held annually in Quebec City, hosting 800+ participants including issuers, investors, financial institutions, sponsors and governments of all levels.",
    expandable: true,
  },
  {
    initials: "JC",
    name: "Jennifer Choi",
    role: "VP, Operations",
    bio: "Jennifer Choi serves as Vice President of Operations at THE Mining Investment Event, overseeing all operational aspects of Canada's premier mining investment conference. For registration and event inquiries, Jennifer can be reached directly at jchoi@irinc.ca or +1-905-515-3508.",
    expandable: false,
  },
  {
    initials: "SS",
    name: "Sydney Schuch",
    role: "Manager, Production Services",
    bio: "Sydney is the Manager, Production Services at IR INC and VID Media, where she oversees production operations and leads the social media team for THE Mining Investment Event. With a background in media, communications, and public affairs, she brings a structured, detail-oriented approach to managing complex projects and stakeholder-driven initiatives.\n\nShe is a graduate of the University of Western Ontario, holding a BA in Political Science and Media Information (2024), and is currently pursuing a Graduate Certificate in Government Relations at Seneca Polytechnic.\n\nAlongside her professional work, Sydney is actively engaged in public service. She volunteers with her local MPP's office and serves as an administrative assistant to the executive team at the Caledonia Royal Canadian Legion.",
    expandable: true,
  },
  {
    initials: "JF",
    name: "Jackie Fitos",
    role: "Manager, Client Services",
    bio: "Jackie Fitos is an accomplished professional with a diverse background in direct sales and client service relationships. Jackie has excelled in her various job roles as supervisor and liaison, bridging the gap between her former companies, clients, and employees. Jackie has identified her commitment to excellence, strong communication skills, and dedication to ensuring client satisfaction as her most valuable assets in her current work with THE Event.",
    expandable: false,
  },
  {
    initials: "AN",
    name: "Ada Nocita",
    role: "Manager, Administration Services",
    bio: "Ada brings a wealth of administrative and operational experience, with a strong focus on business efficiency, organization, and strategic support. Throughout her career, she has demonstrated an exceptional ability to manage multiple priorities, streamline processes, and support leadership in achieving organizational goals. Known for her professionalism, reliability, and strong communication skills, Ada plays a key role in maintaining effective operations and fostering a productive work environment. She brings a results-driven approach to her work, ensuring that daily operations run efficiently while maintaining a high standard of professionalism and client service. Ada is skilled at coordinating teams, managing complex schedules, and supporting business growth through thoughtful planning and attention to detail.",
    expandable: true,
  },
];

const advisoryBoard = [
  {
    initials: "YR",
    name: "The Hon. Yvonne Rumbolt-Jones",
    role: "Advisory Board Member · Former MP of Labrador",
    bio: "Yvonne Rumbolt-Jones is a senior public policy and governance leader with more than thirty years of experience advancing sustainable development, Indigenous partnerships, and community–industry relations in Northern and Arctic Canada. A former Member of Parliament for Labrador, Member of the House of Assembly, Cabinet Minister, and Leader of the Liberal Party of Newfoundland and Labrador, she has built a distinguished career at the intersection of government, Indigenous communities, and the mining and energy sectors.\n\nThroughout her public service, Yvonne championed the inclusion of women and Indigenous peoples in resource development. As Parliamentary Secretary for Natural Resources, she contributed to Canada's Critical Minerals Strategy, supporting Indigenous equity participation, community-benefit frameworks, and responsible mining and energy development in northern and Arctic regions.",
    expandable: true,
    image: "/fwdboardmemberphotos/yvonne jones.jpg",
  },
  {
    initials: "DD",
    name: "Daniella Dimitrov",
    role: "Advisory Board Member · Chief Strategy & Risk Officer, Equinox Gold Corp.",
    bio: "Daniella has more than 25 years of experience in building, leading and operating businesses in mining and financial services in various strategy, finance, operations, corporate development and governance roles. Daniella's previous roles include President and CEO, Interim CEO, CFO of multi mine gold/copper producers and a $2B+ mine developer, partner at a mining investment bank.\n\nDaniella was chosen as one of the Top 100 Global Inspirational Women in Mining for 2016, was a Canada Board Diversity Council – 2016 Diversity 50 Candidate and has the National Association of Corporate Directors (NACD) Directorship Certification.",
    expandable: true,
    image: "/fwdboardmemberphotos/Daniella-Dimitrov.jpg",
  },
  {
    initials: "DS",
    name: "Daniele Spethmann",
    role: "Advisory Board Member · CEO & Founder, XV Solutions",
    bio: "Daniele is an international mining industry executive with a technical background in geology and over 30 years of experience in mineral exploration, team building, and corporate leadership across public companies, M&A transitions, and not-for-profits. She is a co-founder of Warrior Gold Inc., taking it from private to public.\n\nShe currently serves as Secretary and Director of the Ontario Prospectors Association, helping to rebuild its governance, leadership, and strategic direction.",
    expandable: true,
    image: "/fwdboardmemberphotos/daniele spethmann.jpg",
  },
  {
    initials: "AS",
    name: "Angie Stockley",
    role: "Advisory Board Member · President & CCO, SSAF Exploration",
    bio: "Angie Stockley is an accomplished executive with over 25 years' experience in corporate development, strategic communications, go-to-market strategy, investor relations, partnership development, M&A activity and change management. Her current focus is predominantly in the mining sector, coupled with extensive expertise in tech, enterprise SaaS and the public sector.\n\nIn the mining sector, Angie's roles include serving as President, Chief Commercial Officer (CCO) and Director at Blue Ice Gold; and President and CCO at SSAF Exploration.",
    expandable: true,
    image: "/fwdboardmemberphotos/angie-stockley-.webp",
  },
  {
    initials: "JC",
    name: "Jenny-Lou Campbell",
    role: "Advisory Board Member · Executive Director, ICEMD",
    bio: "Jenny-Lou Campbell is Anishinaabe-Kwe and a proud member of Serpent River First Nation. She grew up in the Ontario mining communities of Elliot Lake and Marathon. Her career in mining has taken her to Hemlo Ontario, Thompson Manitoba, and Sudbury Ontario.\n\nCurrently as the Executive Director of the Indigenous Centre of Excellence for Mineral Development (ICEMD), Jenny is leading efforts to support First Nation participation in the mining sector.",
    expandable: true,
    image: "/fwdboardmemberphotos/jenny-lou-campbell.jpg",
  },
  {
    initials: "SV",
    name: "Stéfanie Vo",
    role: "Advisory Board Member · Regional Director, Mining and Metals for Eastern Canada at Hatch",
    bio: "Stéfanie Vo is a senior process engineer with two decades of experience in consulting engineering, specializing in mineral processing and process optimization. Her career includes more than four years on-site at an iron ore concentrator. She currently serves as Regional Director, Mining and Metals for Eastern Canada at Hatch, and contributes to the Board of Directors for CIM's Canadian Mineral Processors (CMP) Society.",
    expandable: false,
    image: "/fwdboardmemberphotos/stefanie vo.jpg",
  },
];

/* ──────── Team Card Component ──────── */
function TeamCard({
  member,
}: {
  member: { initials: string; name: string; role: string; bio: string; expandable: boolean; image?: string };
}) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  const shortBio = member.bio.split("\n\n")[0];
  const showBio = expanded ? member.bio : shortBio;

  return (
    <div className="group bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 hover:border-[#C6112F]/30 hover:shadow-lg transition-all duration-300">
      {/* Avatar + Name */}
      <div className="flex items-start gap-4 mb-4">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-14 h-14 rounded-full border-2 border-[#C6112F]/30 object-cover shrink-0 group-hover:border-[#C6112F] transition-colors"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-[#0f1117] border-2 border-[#C6112F]/30 flex items-center justify-center text-white font-black text-lg shrink-0 group-hover:border-[#C6112F] transition-colors">
            {member.initials}
          </div>
        )}
        <div>
          <h3 className="text-lg font-black text-[#1a1f2c] tracking-tight leading-tight">
            {member.name}
          </h3>
          <p className="text-[#C6112F] text-xs sm:text-sm font-semibold mt-0.5">{member.role}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="w-10 h-[2px] bg-[#C6112F] mb-3" />
      <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line">
        {showBio}
      </p>

      {/* Read More */}
      {member.expandable && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-[#C6112F] text-xs font-bold tracking-wider uppercase hover:underline transition-colors inline-flex items-center gap-1"
        >
          {expanded ? t("team-read-less", "Read Less ↑") : t("team-read-more", "Read More ↓")}
        </button>
      )}
    </div>
  );
}

export default function TeamPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="flex flex-col flex-grow w-full">
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
              <span className="text-white">{t("nav-team", "THE Team")}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
              <span className="text-[#C6112F]">{t("team-hero-title-1", "THE")}</span> {t("team-hero-title-2", "Team")}
            </h1>
            <div className="w-20 h-[3px] bg-[#C6112F] mt-6" />
          </div>
        </section>

        {/* ═══════ CORE TEAM ═══════ */}
        <section className="relative w-full bg-white py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("team-core-label", "Core Team")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("team-core-title-1", "The People Behind")} <span className="text-[#C6112F]">{t("team-core-title-2", "THE Event")}</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coreTeam.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ ADVISORY BOARD ═══════ */}
        <section className="relative w-full bg-[#f4f7fa] py-16 sm:py-20 md:py-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
            <span className="text-[#C6112F] text-xs font-bold tracking-[0.25em] uppercase mb-2 block">
              {t("team-advisory-label", "Advisory Board Members")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1a1f2c] tracking-tight mb-3">
              {t("team-advisory-title", "Advisory Board")}
            </h2>
            <div className="w-16 h-[3px] bg-[#C6112F] rounded-full mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advisoryBoard.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </div>
          </div>
        </section>

        <GetInTouchCTA />
        <Footer />
      </main>
    </>
  );
}
