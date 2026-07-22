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
  image?: string;
}

const rawSpeakersData: [string, string, string, "gov" | "exec" | "fin" | "mod", number[], string?][] = [
  ["Keith Bradbury", "Department of Energy and Mines", "Government of Newfoundland & Labrador", "gov", [4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1780020309526-QX5SYHPDA2F9W66H4L8Z/Keith+Bradbury.png?format=750w"],
  ["Claude Guay", "Parliamentary Secretary to the Minister of Energy & Natural Resources", "Government of Québec", "gov", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1780020166474-LQ2NQJ8289B41QQW075X/GuayClaude_Portrait.jpg?format=750w"],
  ["Kody Boils", "Speaker", "Mining Industry Executive", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779502996098-IWVGMFK8BKMBOQ9VOE9R/BloisKody_Lib.jpg?format=750w"],
  ["Orin Baranowsky", "Chief Financial Officer", "NexGold Mining", "exec", [2,4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779154751377-H84R1XD7U3BXAZV8CUFN/Orin%2BBaranowsky.jpg?format=750w"],
  ["Stephen Soock", "VP, Investor Relations & Development", "Heliostar Metals", "exec", [2,4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152031110-VWUNS91VR3AXA9DB7GEL/stephen+soockpng.png?format=750w"],
  ["Kiran Patankar", "President & CEO", "Maple Gold Mines", "exec", [4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152192018-P0QD9TACY3UWLQNIBOB6/Kiran+Patankar.jpeg?format=750w"],
  ["Rana Vig", "President & CEO", "Blue Lagoon Resources", "exec", [2,4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152153453-R8IKXYPPMUT66Q4SM11X/RanaVig.webp?format=750w"],
  ["Trey Wasser", "CEO & Director", "Dryden Gold", "exec", [4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152087328-3IEDUWQAZN7FRHOYN72Q/Trey+Wasser.jpeg?format=750w"],
  ["Matt Manson", "President, CEO & Director", "Radisson Mining Resources", "exec", [4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152105728-3L0X4W8DGX5XWVEAL52Q/Matt+Manson.jpeg?format=750w"],
  ["Adrian Day", "Founder", "Adrian Day Asset Management", "fin", [4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152125012-7SK02444ZFZPGYTDHGZ2/Adrian+Day.png?format=750w"],
  ["Angie Stockley", "Moderator", "SAAF Exploration", "mod", [4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152139934-OX277RDRXB0N19CLA62L/Angie+Stockley.jpeg?format=750w"],
  ["Keith Bradbury", "Department of Energy and Mines", "Government of Newfoundland & Labrador", "gov", [4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779154321498-HRRWVXWAPTI4B28ZB95H/person-icon-person-icon-17.jpg?format=750w"],
  ["The Honourable Kody Blois", "Parliamentary Secretary to the Prime Minister", "Government of Canada", "gov", [4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152804896-BAYM70NN1UJXLTLZVCTH/Blois-Kody-1024x682.jpg?format=750w"],
  ["Terry Salman", "Chief Executive Officer", "Salman Partners", "fin", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152865058-OHGA6KGQIOMQJHPDWNOZ/Terry-Salman-bio.jpg?format=750w"],
  ["Jon Wiesblatt", "Panelist", "Trident Resources", "exec", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152251014-SJ6PK3OGF73YI0AMCU5P/jon-wiesblatt.jpg?format=750w"],
  ["Peter Espig", "Chief Executive Officer", "Nicola Mining", "exec", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152260885-BO5UNNG0V7GXP8HOWWO8/Peter+Espig.jpeg?format=750w"],
  ["Joseph Carrabba", "Panelist", "North American Niobium", "exec", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152273641-ZX8VGN8PGH8ACOPCAQ3O/Joseph+Carrabbajpg.webp?format=750w"],
  ["Nicholas Van Dyk", "Chief Financial Officer", "NorthIsle Copper & Gold", "exec", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152289756-MJRXGJP73508HW8MZFPA/Nicholas+Van+Dyk.jpeg?format=750w"],
  ["Guy Goulet", "Chief Executive Officer", "Cerro de Pasco Resources", "exec", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152903562-UT8YIE0I4C4GF4KXIU5E/1587480594080.jpg?format=750w"],
  ["Craig Hallworth", "Speaker", "Mining Industry Executive", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152320287-2BX2RIBDR1GGODOY785X/Craig+Hallworth.png?format=750w"],
  ["Dr. Nicole Adshead-Bell", "Moderator", "Independent", "mod", [3,4], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152336983-B62UFIKOO4UWHP3ZMXMZ/Nicole+Adshead-Bell.jpg?format=750w"],
  ["Thomas Bachand", "Moderator", "Banque Nationale", "fin", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152353737-EAEERWWF6KV4FMPJ1B76/Thomas+Bachand.jpeg?format=750w"],
  ["Shawn Khunkhun", "President", "Contango Silver & Gold", "exec", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152369364-3RKA28ISR7CDCP87UQRM/Shawn+Khunkhun.webp?format=750w"],
  ["Robert Bruggeman", "President & CEO", "Outcrop Silver & Gold", "exec", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152435695-QIR2I2IER6SDI2XN09AR/Robert+Bruggeman.jpeg?format=750w"],
  ["Peter Lekich", "Director, Capital Markets & Corporate Development", "New Pacific Metals", "exec", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152400695-KX6U5I2OW2G43E9GVDN6/Peter+Lekich.jpeg?format=750w"],
  ["Phillips S. Baker", "Panel Moderator", "Independent", "mod", [3], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152417703-UHGRZRTEPTOB0CLW96R2/Philip+S+Baker.jpeg?format=750w"],
  ["Pete Hoekstra", "U.S. Ambassador to Canada", "United States of America", "gov", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779153031756-KN0U3M0NY8U5WAWV2VNS/C._Piet_Hoekstra.jpg?format=750w"],
  ["Neil B. Jacobson", "Speaker", "Mining Industry Executive", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779154332594-N1M6PZIYE1QH8HV8R7HC/person-icon-person-icon-17.jpg?format=750w"],
  ["The Hon. Jagrup Brar", "Minister of Mining and Critical Minerals", "Government of British Columbia", "gov", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779153106640-XBB2RYRPB52P16L7HBS6/images.jpg?format=750w"],
  ["Anthony Vaccaro", "Speaker", "Mining Industry Executive", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152496454-F5ZIJUJDW8WOOZJYN6DO/Anthony-V.webp?format=750w"],
  ["Matt Gordon", "Speaker", "Mining Industry Executive", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152557029-40KJWI0JISGP1NPIR9LA/Matt+Gordon.webp?format=750w"],
  ["Erhen Cory", "Speaker", "Mining Industry Executive", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152570884-7IWX1PCRB0WV89P0V5WN/Ehren+Cory.png?format=750w"],
  ["Melanie Lalonde", "Fireside Speaker", "HATCH", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152588562-WBBCXU8B07GDRSMOJ5VB/Melanie+Lalonde.jpeg?format=750w"],
  ["Alain Zubinsky", "Fireside Speaker", "CAUR Technologies", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779154388298-JGQKIBZOPZML1N50IRYC/person-icon-person-icon-17.jpg?format=750w"],
  ["Jean Robitalle", "Speaker", "Mining Industry Executive", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779152619513-RXNE5B7DMFP5MS2TC7XN/Jean+Robitialle.+jpeg.jpeg?format=750w"],
  ["Kateri Chamagne-Jourdain", "Speaker", "Mining Industry Executive", "exec", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779153163108-MAGJ09R669W36K87R14L/champagne-jourdain-flourish.webp?format=750w"],
  ["Claude Guay", "Parliamentary Secretary to the Minister of Energy & Natural Resources", "Government of Québec", "gov", [2], "https://images.squarespace-cdn.com/content/v1/6488de5c81dc1f389b3b26bd/1779153239106-275B133ALL4V6JUO5RSF/1743299125281.jpg?format=750w"]
];

export const SPEAKERS = rawSpeakersData.map(([name, title, organization, category, days, image]) => ({
  name,
  title,
  organization,
  category,
  days,
  image,
}));


export const SPEAKERS_2025: RawSpeaker[] = [
  {
    "name": "Nichole Adshead-Bell",
    "title": "Speaker & Industry Expert",
    "organization": "Cupel Advisory",
    "category": "mod",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Neil Adshead",
    "title": "Speaker & Industry Expert",
    "organization": "Commodity Discovery Fund",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Phillips S. Baker",
    "title": "Speaker & Industry Expert",
    "organization": "Mining Executive",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Rob Curtis",
    "title": "Speaker & Industry Expert",
    "organization": "EMR Capital",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Daniella Dimitrov",
    "title": "Speaker & Industry Expert",
    "organization": "Calibre Mining",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Lisa Davis",
    "title": "Speaker & Industry Expert",
    "organization": "PearTree Securities",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "David Garofalo",
    "title": "Speaker & Industry Expert",
    "organization": "Gold Royalty Corp.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Matt Gordon",
    "title": "Speaker & Industry Expert",
    "organization": "Crux Investor",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Michael Gentile",
    "title": "Speaker & Industry Expert",
    "organization": "Bastion Asset Management",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Peter Grandich",
    "title": "Speaker & Industry Expert",
    "organization": "Trinity Financial Sports & Management",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Ed Ho",
    "title": "Speaker & Industry Expert",
    "organization": "Energy Transition",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Armand MacKenzie",
    "title": "Speaker & Industry Expert",
    "organization": "First Phosphate",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Angelina Mehta",
    "title": "Speaker & Industry Expert",
    "organization": "Rio Tinto",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "David Rhodes",
    "title": "Speaker & Industry Expert",
    "organization": "Endeavour Financial",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Sean Roosen",
    "title": "Speaker & Industry Expert",
    "organization": "Osisko Development Corp.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Alexis Segal",
    "title": "Speaker & Industry Expert",
    "organization": "Glencore Canada",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Elian Terner",
    "title": "Speaker & Industry Expert",
    "organization": "National Bank Financial Markets",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Keith Spence",
    "title": "Speaker & Industry Expert",
    "organization": "Global Mining Capital",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Jamie Strauss",
    "title": "Speaker & Industry Expert",
    "organization": "Digbee Limited",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Anthony Vaccaro",
    "title": "Speaker & Industry Expert",
    "organization": "Northern Miner Group",
    "category": "mod",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Maria Smirnova",
    "title": "Speaker & Industry Expert",
    "organization": "Sprott Asset Management",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Gary Stanley",
    "title": "Speaker & Industry Expert",
    "organization": "Former Director Critical Metals US Government",
    "category": "gov",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Heather Taylor",
    "title": "Speaker & Industry Expert",
    "organization": "Osisko Gold Royalties",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Michael F. White",
    "title": "Speaker & Industry Expert",
    "organization": "IBK Capital Corp.",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Rob Weir",
    "title": "Speaker & Industry Expert",
    "organization": "Lithium Royalty Corp",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Alexandra Woodyer Sherron",
    "title": "Speaker & Industry Expert",
    "organization": "Empress Royalty Corp.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  },
  {
    "name": "Matthew Zolnowski",
    "title": "Speaker & Industry Expert",
    "organization": "Greyfriars LLC",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2025
  }
];


export const SPEAKERS_2024: RawSpeaker[] = [
  {
    "name": "Terence Ortslan",
    "title": "Speaker & Panelist",
    "organization": "TSO Associates",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Frank E. Holmes",
    "title": "Speaker & Panelist",
    "organization": "U.S. Global Investors",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Maria Smirnova",
    "title": "Speaker & Panelist",
    "organization": "Sprott Asset Management",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Nadine Miller",
    "title": "Speaker & Panelist",
    "organization": "JDS Operational Technologies",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Ed Ho",
    "title": "Speaker & Panelist",
    "organization": "Energy Transition",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Daniella Dimitrov",
    "title": "Speaker & Panelist",
    "organization": "Mining Executive & Corporate Director",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Elian Terner",
    "title": "Speaker & Panelist",
    "organization": "National Bank Financial Markets",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Gary Stanley",
    "title": "Speaker & Panelist",
    "organization": "Former Director Critical Metals US Government",
    "category": "gov",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Robert Wares",
    "title": "Speaker & Panelist",
    "organization": "Osisko Metals Incorporated",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Phillips S. Baker",
    "title": "Speaker & Panelist",
    "organization": "The Silver Institute",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Alexandra Woodyer Sherron",
    "title": "Speaker & Panelist",
    "organization": "Empress Royalty Corp.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Rob Curtis",
    "title": "Speaker & Panelist",
    "organization": "EMR Capital",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "David Rhodes",
    "title": "Speaker & Panelist",
    "organization": "Endeavour Financial",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Michael Gentile",
    "title": "Speaker & Panelist",
    "organization": "Bastion Asset Management",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Tamara Brown",
    "title": "Speaker & Panelist",
    "organization": "Oberon Capital",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Peter Marrone",
    "title": "Speaker & Panelist",
    "organization": "Allied Gold Corporation",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Nichole Adshead-Bell",
    "title": "Speaker & Panelist",
    "organization": "Cupel Advisory",
    "category": "mod",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "David Garofalo",
    "title": "Speaker & Panelist",
    "organization": "Gold Royalty Corp.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Sean Roosen",
    "title": "Speaker & Panelist",
    "organization": "Osisko Development Corp.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Mathieu Savard",
    "title": "Speaker & Panelist",
    "organization": "Osisko Mining Inc.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Lisa Davis",
    "title": "Speaker & Panelist",
    "organization": "PearTree Securities",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Matthew Zolnowski",
    "title": "Speaker & Panelist",
    "organization": "Greyfriars LLC",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Jamie Strauss",
    "title": "Speaker & Panelist",
    "organization": "Digbee Limited",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "John Passalacqua",
    "title": "Speaker & Panelist",
    "organization": "First Phosphate",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Neil Adshead",
    "title": "Speaker & Panelist",
    "organization": "Commodity Discovery Fund",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Heather Taylor",
    "title": "Speaker & Panelist",
    "organization": "Osisko Gold Royalties",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Jose Vizquerra",
    "title": "Speaker & Panelist",
    "organization": "O3 Mining Inc.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Pierre Fitzgibbon",
    "title": "Speaker & Panelist",
    "organization": "Quebec Minister of Economy Innovation & Energy",
    "category": "gov",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Armand MacKenzie",
    "title": "Speaker & Panelist",
    "organization": "First Phosphate",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Iggy Tan",
    "title": "Speaker & Panelist",
    "organization": "Lithium Universe Ltd.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Rob Weir",
    "title": "Speaker & Panelist",
    "organization": "Lithium Royalty Corp",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Peter Grandich",
    "title": "Speaker & Panelist",
    "organization": "Trinity Financial Sports & Management",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Alexis Segal",
    "title": "Speaker & Panelist",
    "organization": "Glencore Canada",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Sylvain Lèpine",
    "title": "Speaker & Panelist",
    "organization": "NQ Investissement",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Grand Chief Mandy Gull-Masty",
    "title": "Speaker & Panelist",
    "organization": "Cree First Nation of Waswanipi",
    "category": "gov",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Ian Morrisette",
    "title": "Speaker & Panelist",
    "organization": "Quebec Deputy Minister of Mines & Forestry",
    "category": "gov",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Maïté Blanchette Vézina",
    "title": "Speaker & Panelist",
    "organization": "Quebec Minister of Mines & Forestry",
    "category": "gov",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Jean-François Béland",
    "title": "Speaker & Panelist",
    "organization": "Investissement Québec",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "David M. Cole",
    "title": "Speaker & Panelist",
    "organization": "EMX Royalty Corp.",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Amyot Choquette",
    "title": "Speaker & Panelist",
    "organization": "IQ Ressources Québec",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Geneviève Morinville",
    "title": "Speaker & Panelist",
    "organization": "Winsome Resources",
    "category": "exec",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Matt Gordon",
    "title": "Speaker & Panelist",
    "organization": "Crux Investor",
    "category": "fin",
    "days": [
      2,
      3
    ],
    "year": 2024
  },
  {
    "name": "Anthony Vaccaro",
    "title": "Speaker & Panelist",
    "organization": "Northern Miner Group",
    "category": "mod",
    "days": [
      2,
      3
    ],
    "year": 2024
  }
];
