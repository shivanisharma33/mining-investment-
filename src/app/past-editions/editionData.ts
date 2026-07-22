export interface AgendaBlock {
  title: string;
  lines: string[];
}

export interface AgendaItem {
  t?: string;
  type: "logistics" | "remarks" | "keynote" | "pres" | "panel" | "spotlight" | "mod" | "networking" | "gala" | "closing";
  only?: string;
  sub?: string;
  co?: string;
  sp?: string;
  text?: string;
  block?: AgendaBlock;
}

export interface AgendaDay {
  id: string;
  tab: string;
  sub: string;
  title: string;
  accent: string;
  items: AgendaItem[];
}

export const AGENDA_DAYS: AgendaDay[] = [
  {
    id: "d1",
    tab: "June 1",
    sub: "Pre-Event Day",
    title: "PRE-EVENT & WELCOME",
    accent: "#3a4150",
    items: [
      { t: "6:45 AM – 3:30 PM", type: "networking", only: "Iconic Golf Day – La Tempête" },
      {
        t: "5:00 – 9:00 PM",
        type: "networking",
        only: "Welcome Event & Pre-Registration",
        sub: "Presented by CAUR Technologies & ITFA — Red Cloud Connect Lounge, Centre des Congrès de Québec",
      },
      {
        t: "5:30 – 6:30 PM",
        type: "panel",
        block: {
          title: "ITFA Panel – Financing the Metal, Not the Mine: How Trade Finance Is Reshaping Mining Capital",
          lines: ["<b>Modifier:</b> Marsh — Presentation Room 400C"],
        },
      },
    ],
  },
  {
    id: "d2",
    tab: "June 2",
    sub: "Tuesday",
    title: "PRODUCERS & DEVELOPERS — Presentation Room 400C",
    accent: "#1479c4",
    items: [
      {
        t: "7:00 AM – 5:00",
        type: "logistics",
        only: "Registration | Buffet Breakfast & Lunch – Food Hall | Presentations – 400 C",
        sub: "1×1 Meetings Presented by Ventum Capital Markets – 400 A-B",
      },
      { t: "7:55", type: "remarks", only: "Opening Remarks: Joanne Jobin, CEO & Founder, THE Event" },
      { t: "8:00", type: "remarks", only: "Welcoming Address, Grand Chief Pierre Picard, Wendat Nation" },
      {
        t: "8:05 – 8:30",
        type: "keynote",
        only: "Claude Guay, Parliamentary Secretary to the Minister of Energy & Natural Resources",
      },
      {
        t: "8:30 – 8:45",
        type: "keynote",
        only: "Kateri Champagne-Jourdain, Minister of Natural Resources and Forests, Quebec",
      },
      { type: "mod", text: "Ventum Capital Markets ; Robin Kozar – Managing Director, Mining Research" },
      {
        t: "8:45 – 9:00",
        type: "pres",
        co: "Agnico Eagle Mines Limited",
        sp: "Jean Robitaille, EVP, Chief Strategy & Technology Officer",
      },
      { t: "9:00 – 9:15", type: "pres", co: "IAMGOLD Corporation", sp: "Renaud Adams, President & CEO" },
      {
        t: "9:15 – 9:30",
        type: "pres",
        co: "Equinox Gold Mines",
        sp: "Daniella Dimitrov, Chief Strategy & Risk Officer",
      },
      {
        t: "9:30 – 9:45",
        type: "pres",
        co: "Hemlo Mining Corp.",
        sp: "Jason Banducci, Vice President, Corporate Development & IR",
      },
      {
        t: "9:45 – 10:00",
        type: "pres",
        co: "Orezone Gold Corporation",
        sp: "Patrick Downey, President & CEO",
      },
      {
        t: "10:00 – 10:30",
        type: "panel",
        block: {
          title: "Fireside Conversation: How Technology Is Redefining The Mining Lifecycle",
          lines: ["Alain Zubinsky, CAUR Technologies and Melanie Lalonde, HATCH"],
        },
      },
      { type: "mod", text: "Ventum Capital Markets ; Surya Sankarasubramanian, Mining Analyst, Research" },
      {
        t: "10:30 – 11:00",
        type: "pres",
        co: "Canada Infrastructure Bank",
        sp: "Ehren Cory, CEO with Karanjit Bhugra, President of Ventum Financial",
      },
      {
        t: "11:00 – 11:15",
        type: "pres",
        co: "Andean Precious Metals Corp.",
        sp: "Juan Carlos Sandoval, Chief Financial Officer",
      },
      { t: "11:15 – 11:30", type: "pres", co: "Collective Mining Ltd", sp: "Paul Begin, Chief Financial Officer" },
      { t: "11:30 – 11:45", type: "pres", co: "Osisko Development Corp.", sp: "Sean Roosen, Chairman & CEO" },
      {
        t: "11:45 – 12:00",
        type: "pres",
        co: "Alkane Resources Limited",
        sp: "Nic Earner, Managing Director & CEO",
      },
      { t: "12:00 – 12:15", type: "pres", co: "Mineros S.A.", sp: "Ann Wilkinson, Vice President, Investor Relations" },
      {
        t: "12:15 – 1:15",
        type: "panel",
        block: {
          title: "Next-gen Mining Capital: The Shift To Sustainable, Production-linked Finance",
          lines: [
            "<b>Moderator:</b> Daniella Dimitrov, Equinox Gold",
            "<b>Featuring:</b> Renaud Adams, IAMGOLD Corporation; Jean Robitaille, Agnico Eagle; Michael Gentile, BAM Asset Management; Sean Roosen, Osisko Development; Caroline Donally, Sprott Resources Streaming & Royalty",
          ],
        },
      },
      { type: "mod", text: "National Bank Capital Markets ; Mary Zhang, Director" },
      {
        t: "1:15 – 1:30",
        type: "pres",
        co: "Troilus Mining Corp.",
        sp: "Caroline Arsenault, Vice President, Corporate Communications",
      },
      {
        t: "1:30 – 1:45",
        type: "pres",
        co: "Summit Royalties Ltd.",
        sp: "Drew Clark, President, CEO & Founder",
      },
      { t: "1:45 – 2:00", type: "pres", co: "Firefly Metals Ltd", sp: "Darren Cooke, Chief Executive Officer" },
      { t: "2:00 – 2:15", type: "pres", co: "New Found Gold Corp.", sp: "Keith Boyle, Chief Executive Officer" },
      {
        t: "2:15 – 2:30",
        type: "pres",
        co: "Heliostar Metals Ltd.",
        sp: "Stephen Soock, Vice President Investor Relations & Development",
      },
      {
        t: "2:30 – 2:45",
        type: "pres",
        co: "Lahontan Gold Corp",
        sp: "Kimberly Ann, Founder, CEO, President & Executive Chair",
      },
      {
        t: "2:45 – 3:15",
        type: "spotlight",
        block: {
          title: "Minister Spotlight",
          lines: [
            "<b>Moderator:</b> Anthony Vacarro, The Northern Miner",
            "The Hon. Jagrup Brar, Minister of Mining and Critical Minerals, British Columbia",
          ],
        },
      },
      { type: "mod", text: "Ventum Capital Markets ; Robin Kozar – Managing Director, Mining Research" },
      { t: "3:15 – 3:30", type: "pres", co: "First Mining Gold Corp", sp: "Dan Wilton, CEO & Director" },
      { t: "3:30 – 3:45", type: "pres", co: "Minera Alamos Inc.", sp: "Darren Blasutti, Chief Executive Officer" },
      { t: "3:45 – 4:00", type: "pres", co: "NexGold Mining Corp", sp: "Orin Baranowsky, Chief Financial Officer" },
      { t: "4:00 – 4:15", type: "pres", co: "STLLR Gold Inc", sp: "Salvatore Curcio, Chief Financial Officer" },
      {
        t: "4:15 – 4:30",
        type: "pres",
        co: "Orvana Minerals Corp",
        sp: "Raúl Álvarez, Director Exploration & Technical Services",
      },
      {
        t: "4:30 – 4:45",
        type: "pres",
        co: "Cerrado Gold Inc",
        sp: "David Ball, Vice President, Corporate Development",
      },
      { t: "4:45 – 5:00", type: "pres", co: "Blue Lagoon Resources Inc", sp: "Rana Vig, President & CEO" },
      { t: "5:00", type: "keynote", only: "Pete Hoekstra, U.S. Ambassador to Canada" },
      {
        t: "6:30 – 12:00 AM",
        type: "gala",
        only: "THE Sponsors Gala Coreshack & Casino Networking Event",
        sub: "Salon Galaxie/Galaxy Lounge — Dress to Impress!",
      },
    ],
  },
  {
    id: "d3",
    tab: "June 3",
    sub: "Wednesday",
    title: "CRITICAL METALS & TRANSITION ENERGY — Presentation Room 400 C",
    accent: "#00a58c",
    items: [
      {
        t: "7:00 AM – 5:00",
        type: "logistics",
        only: "Registration – Lobby Area | Buffet Breakfast & Lunch – Food Hall | Presentations – 400 C",
        sub: "1×1 Meetings Presented by Ventum Capital Markets – 400 A-B",
      },
      { t: "8:00", type: "remarks", only: "Opening Remarks: Joanne Jobin, CEO & Founder THE Event" },
      {
        t: "8:05 – 8:30",
        type: "keynote",
        only: "Jocelyn Douhéret, Directeur Général des politiques et du développement minier",
        sub: "Québec Strategy for the Development of Critical and Strategic Minerals",
      },
      { type: "mod", text: "Ventum Capital Markets: Taylor Combaluzier – Managing Director, Mining Analyst" },
      { t: "8:30 – 8:45", type: "pres", co: "Glencore Plc / Glencore Canada", sp: "Toby Spittle, Copper Trader" },
      { t: "8:45 – 9:00", type: "pres", co: "White Gold Corp", sp: "David D'Onofrio, Chief Executive Officer" },
      {
        t: "9:00 – 9:15",
        type: "pres",
        co: "New Pacific Metals Corp.",
        sp: "Peter Lekich, Director Capital Markets and Corporate Development",
      },
      { t: "9:15 – 9:30", type: "pres", co: "PMET Resources Inc.", sp: "Olivier Caza-lapointe, Investor Relations" },
      {
        t: "9:30 – 9:45",
        type: "pres",
        co: "NorthIsle Copper & Gold Inc.",
        sp: "Nicholas Van Dyk, Chief Financial Officer",
      },
      {
        t: "9:45 – 10:30",
        type: "panel",
        block: {
          title: "Beyond The Mine: The Physical Silver Scarcity",
          lines: [
            "<b>Moderated by</b> Phillips S. Baker",
            "<b>Featuring:</b> Peter Lekich, New Pacific Metals; Robert Bruggeman, Outcrop Silver Corp; Shawn Khunkhun, Contango Silver and Gold Inc",
          ],
        },
      },
      { type: "mod", text: "Apaton Media : Lyndsay Malchuk, Global On-Camera Capital Markets Reporter" },
      { t: "10:30 – 10:45", type: "pres", co: "Contango Silver & Gold Inc.", sp: "Shawn Khunkhun, President" },
      { t: "10:45 – 11:00", type: "pres", co: "Power Metallic Mines Inc.", sp: "Duncan Roy, Vice President, Investor Relations" },
      {
        t: "11:00 – 11:15",
        type: "pres",
        co: "Cerro De Pasco Resources Inc.",
        sp: "Guy Goulet, Chief Executive Officer",
      },
      {
        t: "11:15 – 11:30",
        type: "pres",
        co: "Silver X Mining Corp.",
        sp: "Jose Garcia, President, CEO, and Co-Founder",
      },
      { t: "11:30 – 11:45", type: "pres", co: "Silver One Resources Inc.", sp: "Greg Crowe, President & CEO" },
      { t: "11:45 – 12:00", type: "pres", co: "Lavras Gold Corp.", sp: "Jonathan Hill, Interim VP Exploration" },
      { t: "12:00 – 12:15", type: "pres", co: "Q2 Metals Corp.", sp: "Alicia Milne, President and CEO" },
      {
        t: "12:15 – 1:15",
        type: "spotlight",
        block: {
          title: "Québec Spotlight — Québec's Financing Ecosystem For Critical Minerals",
          lines: [
            "<b>Moderator:</b> Thomas Bachand, Banque Nationale",
            "<b>Featuring:</b> Jocelyn Douhéret, Directeur Général des politiques et du développement minier; Amyot Choquette, Directeur principal, investissements d'Investissement Québec; Sylvain Lépine, directeur général, NQ Investissement minier; André Laferrière, directeur aux investissements de SIDEX; Ahmed Hassani, Associé senior, capital-investissement, La Caisse",
          ],
        },
      },
      { type: "mod", text: "Ventum Capital Markets ; Surya Sankarasubramanian, Mining Analyst, Research" },
      { t: "1:15 – 1:30", type: "pres", co: "Atha Energy Corp.", sp: "Troy Boisjoli, CEO & Director" },
      { t: "1:30 – 1:45", type: "pres", co: "Nicola Mining Inc.", sp: "Peter Espig, Chief Executive Officer" },
      {
        t: "1:45 – 2:00",
        type: "pres",
        co: "Outcrop Silver & Gold Corporation",
        sp: "Robert Bruggeman, President & CEO",
      },
      { t: "2:00 – 2:15", type: "pres", co: "Avanti Gold Corp.", sp: "Mohamed Cisse, Chief Executive Officer" },
      { t: "2:15 – 2:30", type: "pres", co: "FPX Nickel Corp.", sp: "Martin Turenne, President & CEO" },
      {
        t: "2:30 – 2:45",
        type: "pres",
        co: "Gunnison Copper Corp.",
        sp: "Melissa Mackie, Director, Investor Relations and Communications",
      },
      {
        t: "2:45 – 3:30",
        type: "panel",
        block: {
          title: "Powering the Transition: Critical Metals",
          lines: [
            "<b>Moderator:</b> Dr. Nicole Adshead-Bell",
            "<b>Featuring:</b> Melissa Mackie, Gunnison Copper; Guy Goulet, Cerro De Pasco Resources Inc; Nicholas Van Dyk, Northisle Copper and Gold Inc; Joseph Carrabba, North American Niobium; Jeremy Neimi, Juno Corp; Peter Espig, Nicola Mining; Jon Wiesblatt, Trident Resources",
          ],
        },
      },
      { type: "mod", text: "Apaton Media : Lyndsay Malchuk, Global On-Camera Capital Markets Reporter" },
      { t: "3:30 – 3:45", type: "pres", co: "Mithril Silver and Gold Limited", sp: "Nicole Hoeller, Communications" },
      {
        t: "3:45 – 4:00",
        type: "pres",
        co: "West Point Gold Corp.",
        sp: "Amandip Singh, Vice President, Corporate Development",
      },
      { t: "4:00 – 4:15", type: "pres", co: "Azimut Exploration Inc.", sp: "Jean-Marc Lulin, President and CEO" },
      { t: "4:15 – 4:30", type: "pres", co: "Vior Gold Corporation Inc.", sp: "Mathieu Savard, President and CEO" },
      { t: "4:30 – 4:45", type: "pres", co: "ES Gold Corp.", sp: "Gordon Robb, Chief Executive Officer" },
      { t: "4:45 – 5:00", type: "pres", co: "Wallbridge Mining Company", sp: "Brian Penny, Chief Executive Officer" },
      { t: "5:00 – 5:15", type: "pres", co: "GEOMEGA Resources Inc.", sp: "Kiril Mugerman, President and CEO" },
      { t: "5:15 – 5:30", type: "remarks", only: "Terry Salman, CEO, Salman Partners" },
      {
        t: "6:00 – 7:30 PM",
        type: "networking",
        only: "THE Sponsors Cocktails & Coreshack Networking Event",
        sub: "Salon Galaxie Lounge",
      },
      {
        t: "9:00 – 12:00 AM",
        type: "networking",
        only: "International Mining Week – After Dark Event",
        sub: "Red Cloud Connect Lounge – QCC",
      },
    ],
  },
  {
    id: "d4",
    tab: "June 4",
    sub: "Thursday",
    title: "EXPLORERS & DEVELOPERS — Presentation Room 400 C",
    accent: "#f07d1a",
    items: [
      {
        t: "7:00 AM – 4:00",
        type: "logistics",
        only: "Registration – Lobby Area | Buffet Breakfast & Lunch – Food Hall | Presentations – 400 C",
        sub: "1×1 Meetings Presented by Ventum Capital Markets – 400 A-B",
      },
      { t: "8:00", type: "remarks", only: "Opening Remarks: Joanne Jobin, CEO & Founder, THE Event" },
      {
        t: "8:05 – 8:30",
        type: "keynote",
        only: "Adrian Day, Adrian Day Asset Management",
        sub: "Apart From Gold, What Else?",
      },
      { type: "mod", text: "Apaton Media : Lyndsay Malchuk, Global On-Camera Capital Markets Reporter" },
      { t: "8:30 – 8:45", type: "pres", co: "1911 Gold Corporation", sp: "Shaun Heinrichs, President & CEO" },
      { t: "8:45 – 9:00", type: "pres", co: "Valkea Resources Corp.", sp: "Louis Archambeault, Interim Chair" },
      { t: "9:00 – 9:15", type: "pres", co: "US Gold Corp", sp: "Luke Norman, Founder & Chairman" },
      { t: "9:15 – 9:30", type: "pres", co: "Maple Gold Mines Ltd.", sp: "Kiran Patankar, President & CEO" },
      {
        t: "9:30 – 9:45",
        type: "pres",
        co: "Radisson Mining Resources Inc.",
        sp: "Matt Manson, President, CEO & Director",
      },
      {
        t: "9:45 – 10:45",
        type: "spotlight",
        block: {
          title: "Yukon Spotlight",
          lines: [
            "<b>Introduction:</b> Nicole Hoeller, Nikli Communications",
            "<b>Moderator:</b> Dr. Nicole Adshead-Bell",
            "Graham Downs, Cascadia Minerals; Brock Colterjohn, Onyx Gold; Colin Jourdie, Selkirk Copper; David D'Onofrio, White Gold Corp",
          ],
        },
      },
      { type: "mod", text: "Peartree ; Gary Baschuk, Co-head, Mining & Sr. Geologist" },
      { t: "10:45 – 11:00", type: "pres", co: "Onyx Gold Corp", sp: "Brock Colterjohn, President & CEO" },
      { t: "11:00 – 11:15", type: "pres", co: "Scottie Resources Corp.", sp: "Brad Rourke, Chairman" },
      { t: "11:15 – 11:30", type: "pres", co: "Scorpio Gold Corp", sp: "Harrison Pokrandt, Vice President Exploration" },
      { t: "11:30 – 11:45", type: "pres", co: "Spanish Mountain Gold Ltd", sp: "Mark Ruus, Chief Financial Officer" },
      { t: "11:45 – 12:00", type: "pres", co: "Cygnus Metals Limited", sp: "Nick Kwong, President & CEO" },
      {
        t: "12:00 – 1:00",
        type: "spotlight",
        block: {
          title: "Newfoundland & Labrador Spotlight",
          lines: [
            "<b>Opening Keynote:</b> Keith Bradbury, Department of Energy and Mines, Government of Newfoundland & Labrador",
            "<b>Moderator:</b> Angie Stockley, SAAF Exploration",
            "Nolan Peterson, Atlas Salt; Daniella Dimitrov, Equinox Gold; Darren Cooke, Firefly Metals; Keith Boyle, New Found Gold and Farzad Nader, Red Paramount Iron",
          ],
        },
      },
      { type: "mod", text: "Apaton Media : Lyndsay Malchuk, Global On-Camera Capital Markets Reporter" },
      { t: "1:00 – 1:15", type: "pres", co: "Abcourt Mines Inc.", sp: "Pascal Hamelin, Chief Executive Officer" },
      {
        t: "1:15 – 1:30",
        type: "pres",
        co: "Astra Exploration Inc.",
        sp: "Brian Miller, CEO, Director & Co-Founder",
      },
      { t: "1:30 – 1:45", type: "pres", co: "Dryden Gold Corp.", sp: "Trey Wasser, CEO & Director" },
      {
        t: "1:45 – 2:45",
        type: "panel",
        block: {
          title: "What Makes a Successful Junior?",
          lines: [
            "<b>Moderator:</b> Adrian Day, Adrian Day Asset Management",
            "<b>Featuring:</b> Matt Manson, Radisson Mining Resources Inc; Trey Wasser, Dryden Gold Corp; Rana Vig, Blue Lagoon Resources Inc; Kiran Patankar, Maple Gold Mines; Orin Baranowsky, NexGold Mining Corp; Stephen Soock, Heliostar Metals",
          ],
        },
      },
      { t: "2:45 – 3:00", type: "pres", co: "Globex Mining Enterprises Inc", sp: "David Christie, President and COO" },
      { t: "3:00 – 3:15", type: "pres", co: "Cascadia Metals LTD", sp: "Graham Downs, President and CEO" },
      {
        t: "3:15 – 3:45",
        type: "keynote",
        only: "The Honourable Kody Blois, Parliamentary Secretary to the Prime Minister",
      },
      { type: "mod", text: "Joanne Jobin, CEO & Founder, THE Event" },
      {
        t: "3:45 – 4:15",
        type: "panel",
        block: {
          title: "Presentations & Awards",
          lines: [
            "SHE-Co Presentation – Vior Gold Corporation Inc. to Moisson Rive-Sud",
            "THE Student Partnership Program Awards – Presented by: GLENCORE Canada, IAMGOLD Corporation, OR Royalties",
          ],
        },
      },
      { t: "4:00", type: "closing", only: "Closing — Joanne Jobin, CEO & Founder, THE Event" },
      { t: "4:00 – 6:00", type: "networking", only: "Au Revoir Cocktails presented by IR.INC", sub: "THE Red Cloud Connect Lounge" },
    ],
  },
];

export interface RawSpeaker {
  name: string;
  title: string;
  organization: string;
  category: "gov" | "exec" | "fin" | "mod";
  days: number[];
}

const rawSpeakersData: [string, string, string, "gov" | "exec" | "fin" | "mod", number[]][] = [
  ["Claude Guay", "Parliamentary Secretary to the Minister of Energy & Natural Resources", "Government of Québec", "gov", [2]],
  ["Kateri Champagne-Jourdain", "Minister of Natural Resources and Forests", "Government of Québec", "gov", [2]],
  ["The Hon. Jagrup Brar", "Minister of Mining and Critical Minerals", "Government of British Columbia", "gov", [2]],
  ["Pete Hoekstra", "U.S. Ambassador to Canada", "United States of America", "gov", [2]],
  ["Grand Chief Pierre Picard", "Welcoming Address", "Wendat Nation", "gov", [2]],
  ["Jocelyn Douhéret", "Directeur Général des politiques et du développement minier", "Government of Québec", "gov", [3]],
  ["The Honourable Kody Blois", "Parliamentary Secretary to the Prime Minister", "Government of Canada", "gov", [4]],
  ["Keith Bradbury", "Department of Energy and Mines", "Government of Newfoundland & Labrador", "gov", [4]],
  ["Joanne Jobin", "CEO & Founder", "THE Event", "mod", [2, 3, 4]],
  ["Robin Kozar", "Managing Director, Mining Research", "Ventum Capital Markets", "mod", [2]],
  ["Surya Sankarasubramanian", "Mining Analyst, Research", "Ventum Capital Markets", "mod", [2, 3]],
  ["Taylor Combaluzier", "Managing Director, Mining Analyst", "Ventum Capital Markets", "mod", [3]],
  ["Mary Zhang", "Director", "National Bank Capital Markets", "mod", [2]],
  ["Lyndsay Malchuk", "Global On-Camera Capital Markets Reporter", "Apaton Media", "mod", [3, 4]],
  ["Gary Baschuk", "Co-head, Mining & Sr. Geologist", "PearTree", "mod", [4]],
  ["Anthony Vacarro", "Moderator", "The Northern Miner", "mod", [2]],
  ["Dr. Nicole Adshead-Bell", "Moderator", "Independent", "mod", [3, 4]],
  ["Phillips S. Baker", "Panel Moderator", "Independent", "mod", [3]],
  ["Angie Stockley", "Moderator", "SAAF Exploration", "mod", [4]],
  ["Nicole Hoeller", "Communications", "Nikli Communications", "mod", [3, 4]],
  ["Adrian Day", "Founder", "Adrian Day Asset Management", "fin", [4]],
  ["Ehren Cory", "Chief Executive Officer", "Canada Infrastructure Bank", "fin", [2]],
  ["Karanjit Bhugra", "President", "Ventum Financial", "fin", [2]],
  ["Michael Gentile", "Portfolio Manager", "BAM Asset Management", "fin", [2]],
  ["Caroline Donally", "Managing Director", "Sprott Resources Streaming & Royalty", "fin", [2]],
  ["Thomas Bachand", "Moderator", "Banque Nationale", "fin", [3]],
  ["Amyot Choquette", "Directeur principal, investissements", "Investissement Québec", "fin", [3]],
  ["Sylvain Lépine", "Directeur général", "NQ Investissement minier", "fin", [3]],
  ["André Laferrière", "Directeur aux investissements", "SIDEX", "fin", [3]],
  ["Ahmed Hassani", "Associé senior, capital-investissement", "La Caisse", "fin", [3]],
  ["Terry Salman", "Chief Executive Officer", "Salman Partners", "fin", [3]],
  ["Jean Robitaille", "EVP, Chief Strategy & Technology Officer", "Agnico Eagle Mines", "exec", [2]],
  ["Renaud Adams", "President & CEO", "IAMGOLD Corporation", "exec", [2]],
  ["Daniella Dimitrov", "Chief Strategy & Risk Officer", "Equinox Gold", "exec", [2, 4]],
  ["Jason Banducci", "VP, Corporate Development & IR", "Hemlo Mining", "exec", [2]],
  ["Patrick Downey", "President & CEO", "Orezone Gold", "exec", [2]],
  ["Alain Zubinsky", "Fireside Speaker", "CAUR Technologies", "exec", [2]],
  ["Melanie Lalonde", "Fireside Speaker", "HATCH", "exec", [2]],
  ["Juan Carlos Sandoval", "Chief Financial Officer", "Andean Precious Metals", "exec", [2]],
  ["Paul Begin", "Chief Financial Officer", "Collective Mining", "exec", [2]],
  ["Sean Roosen", "Chairman & CEO", "Osisko Development", "exec", [2]],
  ["Nic Earner", "Managing Director & CEO", "Alkane Resources", "exec", [2]],
  ["Ann Wilkinson", "VP, Investor Relations", "Mineros S.A.", "exec", [2]],
  ["Caroline Arsenault", "VP, Corporate Communications", "Troilus Mining", "exec", [2]],
  ["Drew Clark", "President, CEO & Founder", "Summit Royalties", "exec", [2]],
  ["Darren Cooke", "Chief Executive Officer", "Firefly Metals", "exec", [2, 4]],
  ["Keith Boyle", "Chief Executive Officer", "New Found Gold", "exec", [2, 4]],
  ["Stephen Soock", "VP, Investor Relations & Development", "Heliostar Metals", "exec", [2, 4]],
  ["Kimberly Ann", "Founder, CEO, President & Executive Chair", "Lahontan Gold", "exec", [2]],
  ["Dan Wilton", "CEO & Director", "First Mining Gold", "exec", [2]],
  ["Darren Blasutti", "Chief Executive Officer", "Minera Alamos", "exec", [2]],
  ["Orin Baranowsky", "Chief Financial Officer", "NexGold Mining", "exec", [2, 4]],
  ["Salvatore Curcio", "Chief Financial Officer", "STLLR Gold", "exec", [2]],
  ["Raúl Álvarez", "Director, Exploration & Technical Services", "Orvana Minerals", "exec", [2]],
  ["David Ball", "VP, Corporate Development", "Cerrado Gold", "exec", [2]],
  ["Rana Vig", "President & CEO", "Blue Lagoon Resources", "exec", [2, 4]],
  ["Toby Spittle", "Copper Trader", "Glencore", "exec", [3]],
  ["David D'Onofrio", "Chief Executive Officer", "White Gold Corp", "exec", [3, 4]],
  ["Peter Lekich", "Director, Capital Markets & Corporate Development", "New Pacific Metals", "exec", [3]],
  ["Olivier Caza-lapointe", "Investor Relations", "PMET Resources", "exec", [3]],
  ["Nicholas Van Dyk", "Chief Financial Officer", "NorthIsle Copper & Gold", "exec", [3]],
  ["Robert Bruggeman", "President & CEO", "Outcrop Silver & Gold", "exec", [3]],
  ["Shawn Khunkhun", "President", "Contango Silver & Gold", "exec", [3]],
  ["Duncan Roy", "VP, Investor Relations", "Power Metallic Mines", "exec", [3]],
  ["Guy Goulet", "Chief Executive Officer", "Cerro de Pasco Resources", "exec", [3]],
  ["Jose Garcia", "President, CEO & Co-Founder", "Silver X Mining", "exec", [3]],
  ["Greg Crowe", "President & CEO", "Silver One Resources", "exec", [3]],
  ["Jonathan Hill", "Interim VP, Exploration", "Lavras Gold", "exec", [3]],
  ["Alicia Milne", "President & CEO", "Q2 Metals", "exec", [3]],
  ["Troy Boisjoli", "CEO & Director", "Atha Energy", "exec", [3]],
  ["Peter Espig", "Chief Executive Officer", "Nicola Mining", "exec", [3]],
  ["Mohamed Cisse", "Chief Executive Officer", "Avanti Gold", "exec", [3]],
  ["Martin Turenne", "President & CEO", "FPX Nickel", "exec", [3]],
  ["Melissa Mackie", "Director, Investor Relations & Communications", "Gunnison Copper", "exec", [3]],
  ["Joseph Carrabba", "Panelist", "North American Niobium", "exec", [3]],
  ["Jeremy Neimi", "Panelist", "Juno Corp", "exec", [3]],
  ["Jon Wiesblatt", "Panelist", "Trident Resources", "exec", [3]],
  ["Amandip Singh", "VP, Corporate Development", "West Point Gold", "exec", [3]],
  ["Jean-Marc Lulin", "President & CEO", "Azimut Exploration", "exec", [3]],
  ["Mathieu Savard", "President & CEO", "Vior Gold", "exec", [3]],
  ["Gordon Robb", "Chief Executive Officer", "ES Gold", "exec", [3]],
  ["Brian Penny", "Chief Executive Officer", "Wallbridge Mining", "exec", [3]],
  ["Kiril Mugerman", "President & CEO", "GEOMEGA Resources", "exec", [3]],
  ["Shaun Heinrichs", "President & CEO", "1911 Gold", "exec", [4]],
  ["Louis Archambeault", "Interim Chair", "Valkea Resources", "exec", [4]],
  ["Luke Norman", "Founder & Chairman", "US Gold Corp", "exec", [4]],
  ["Kiran Patankar", "President & CEO", "Maple Gold Mines", "exec", [4]],
  ["Matt Manson", "President, CEO & Director", "Radisson Mining Resources", "exec", [4]],
  ["Graham Downs", "President & CEO", "Cascadia Metals", "exec", [4]],
  ["Brock Colterjohn", "President & CEO", "Onyx Gold", "exec", [4]],
  ["Colin Jourdie", "Panelist", "Selkirk Copper", "exec", [4]],
  ["Brad Rourke", "Chairman", "Scottie Resources", "exec", [4]],
  ["Harrison Pokrandt", "VP, Exploration", "Scorpio Gold", "exec", [4]],
  ["Mark Ruus", "Chief Financial Officer", "Spanish Mountain Gold", "exec", [4]],
  ["Nick Kwong", "President & CEO", "Cygnus Metals", "exec", [4]],
  ["Nolan Peterson", "Panelist", "Atlas Salt", "exec", [4]],
  ["Farzad Nader", "Panelist", "Red Paramount Iron", "exec", [4]],
  ["Pascal Hamelin", "Chief Executive Officer", "Abcourt Mines", "exec", [4]],
  ["Brian Miller", "CEO, Director & Co-Founder", "Astra Exploration", "exec", [4]],
  ["Trey Wasser", "CEO & Director", "Dryden Gold", "exec", [4]],
  ["David Christie", "President & COO", "Globex Mining Enterprises", "exec", [4]],
];

export const SPEAKERS = rawSpeakersData.map(([name, title, organization, category, days]) => ({
  name,
  title,
  organization,
  category,
  days,
}));
