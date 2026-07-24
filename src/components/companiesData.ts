export interface CompanyItem {
  name: string;
  marker?: string;
  ticker: string;
  type: string;
  location: string;
  commodities: string;
  email?: string;
  website?: string;
  year?: number;
}

export const PARTICIPATING_COMPANIES: CompanyItem[] = [
  {
    "name": "1844 RESOURCES INC.",
    "marker": "^^",
    "ticker": "TSX-V: EFF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Cu, Pb, Zn, Ag",
    "email": "info@1844resources.com",
    "year": 2026
  },
  {
    "name": "1911 GOLD CORPORATION",
    "marker": "",
    "ticker": "TSX-V:AUMB; OTCQX:AUMBF",
    "type": "DEVELOPER",
    "location": "CANADA/ON, MB",
    "commodities": "Au",
    "email": "Update@1911gold.com",
    "year": 2026
  },
  {
    "name": "ABCOURT MINES INC.",
    "marker": "#",
    "ticker": "TSX-V:ABI; OTCQB:ABMBF",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@abcourt.com",
    "year": 2026
  },
  {
    "name": "AGNICO EAGLE MINES LIMITED",
    "marker": "",
    "ticker": "TSX:AEM; NYSE:AEM",
    "type": "PRODUCER",
    "location": "GLOBAL",
    "commodities": "Au",
    "email": "info@agnicoeagle.com",
    "year": 2026
  },
  {
    "name": "ALKANE RESOURCES LIMITED",
    "marker": "",
    "ticker": "TSX: ALK; ASX: ALK: OTCQX: ALKEF",
    "type": "PRODUCER",
    "location": "AUSTRALIA; SWEDEN",
    "commodities": "Au, Sb",
    "email": "info@alkres.com",
    "year": 2026
  },
  {
    "name": "ANDEAN PRECIOUS METALS CORP.",
    "marker": "",
    "ticker": "TSX:APM; OTCQX: ANPMF",
    "type": "PRODUCER",
    "location": "USA/CA; MEXICO; BOLIVIA",
    "commodities": "Au, Ag",
    "email": "info@andeanpm.com",
    "year": 2026
  },
  {
    "name": "APEX CRITICAL METALS CORP",
    "marker": "*",
    "ticker": "CSE: APXC; OTCQX; APXCF",
    "type": "EXPLORER",
    "location": "USA, CANADA/BC/QC/ON",
    "commodities": "REEs; Nb",
    "email": "info@apexcriticalmetals.com",
    "year": 2026
  },
  {
    "name": "ARGO GOLD INC.",
    "marker": "~",
    "ticker": "CSE:ARQ",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "email": "jbaker@argogold.ca",
    "year": 2026
  },
  {
    "name": "ARIZONA GOLD & SILVER INC.",
    "marker": "*",
    "ticker": "TSX-V: AZS; OTCQB: AZASF",
    "type": "EXPL/DEV",
    "location": "USA/AZ, NV",
    "commodities": "Au, Ag",
    "email": "info@arizonagoldsilver.com",
    "year": 2026
  },
  {
    "name": "ARIZONA METALS CORP.",
    "marker": "*",
    "ticker": "TSX:AMC;OTCQX:AZMCF",
    "type": "EXPLORER",
    "location": "USA/AZ",
    "commodities": "Au,Cu,Zn",
    "email": "info@arizonametals.com",
    "year": 2026
  },
  {
    "name": "ASTRA EXPLORATION INC",
    "marker": "",
    "ticker": "TSX-V: ASTR; OTCQB: ATEPF",
    "type": "EXPLORER",
    "location": "ARGENTINA, CHILE",
    "commodities": "Au, Ag",
    "email": "info@astra-exploration.com",
    "year": 2026
  },
  {
    "name": "ATHA ENERGY CORP",
    "marker": "",
    "ticker": "TSX-V: SASK; OTCQB: SASKF",
    "type": "DEV/EXPL",
    "location": "CANADA/NV, SK",
    "commodities": "U308",
    "email": "info@athaenergy.com",
    "year": 2026
  },
  {
    "name": "ATLAS SALT INC.",
    "marker": "*",
    "ticker": "TSX-V: SALT; OTCQX: SALQF",
    "type": "PRODUCER",
    "location": "CANADA/NL",
    "commodities": "Na",
    "email": "info@atlassalt.com",
    "year": 2026
  },
  {
    "name": "AURIGINAL MINING CORP",
    "marker": "*",
    "ticker": "TSX-V: AUME",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, Cu",
    "email": "info@auriginal.ca",
    "year": 2026
  },
  {
    "name": "AVANTI GOLD CORP",
    "marker": "",
    "ticker": "CSE: AGC;OTCQB: AVTGF",
    "type": "EXPLORER",
    "location": "DRC",
    "commodities": "Au",
    "email": "info@avantigoldcorp.com",
    "year": 2026
  },
  {
    "name": "AZIMUT EXPLORATION INC.",
    "marker": "",
    "ticker": "TSXV: AZM;OTCQX: AZMTF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au,Cu,Ni,Li",
    "email": "info@azimut-exploration.com",
    "year": 2026
  },
  {
    "name": "AZTEC MINERALS CORP.",
    "marker": "*",
    "ticker": "TSX-V: AZT; OTCQB: AZZTF",
    "type": "EXPLORER",
    "location": "USA/ARIZONA",
    "commodities": "Ag, Au",
    "email": "info@aztecminerals.com",
    "year": 2026
  },
  {
    "name": "BLUE LAGOON RESOURCES INC",
    "marker": "",
    "ticker": "CSE: BLLG; OTCQB: BLAGF",
    "type": "DEVELOPER",
    "location": "CANADA/BC",
    "commodities": "Au",
    "email": "info@bluelagoonresources.com",
    "year": 2026
  },
  {
    "name": "BLUEJAY GOLD INC.",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "CANADA/ON, YK",
    "commodities": "Au, Ag",
    "email": "info@bluejaygold.com",
    "year": 2026
  },
  {
    "name": "BONTERRA RESOURCES INC.",
    "marker": "*",
    "ticker": "TSX-V: BTR; OTCQX: BONXF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@btrgold.com",
    "year": 2026
  },
  {
    "name": "BRIXTON METALS CORPORATION",
    "marker": "*",
    "ticker": "TSX-V: BBB; OTCQX: BBBXF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Cu, Au, Ag",
    "email": "info@brixtonmetals.com",
    "year": 2026
  },
  {
    "name": "BRUNSWICK EXPLORATION",
    "marker": "*",
    "ticker": "TSX-V: BRW;OTCQB: BRWXF",
    "type": "EXPLORER",
    "location": "CANADA/QC; GREENLAND",
    "commodities": "Pg",
    "email": "info@brwexplo.ca",
    "year": 2026
  },
  {
    "name": "CAPITAN SILVER CORP",
    "marker": "*",
    "ticker": "TSX-V: CAPT; OTCQX: CAPTF",
    "type": "EXPLORER",
    "location": "MEXICO",
    "commodities": "Ag",
    "email": "info@capitansilver.com",
    "year": 2026
  },
  {
    "name": "CARTIER RESOURCES INC.",
    "marker": "*",
    "ticker": "TSX-V: ECR",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "philippe.cloutier@ressourcescartier.com",
    "year": 2026
  },
  {
    "name": "CASCADIA MINERALS LTD",
    "marker": "",
    "ticker": "TSX-V: CAM;OTCQB: CAMNF",
    "type": "EXPLORER",
    "location": "CANADA/YK",
    "commodities": "Au, Cu",
    "email": "info@cascadiaminerals.com",
    "year": 2026
  },
  {
    "name": "CASSIAR GOLD CORP.",
    "marker": "*",
    "ticker": "TSX-V: GLDC, OTCQX: CGLCF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Au",
    "email": "jasons@cassiargold.com",
    "year": 2026
  },
  {
    "name": "CERRADO GOLD INC.",
    "marker": "",
    "ticker": "TSX-V:CERT; OTCQX:CRDOF",
    "type": "PRODUCER",
    "location": "CANADA/QC; ARGENTINA; PORTUGAL",
    "commodities": "Au",
    "email": "info@cerradogold.com",
    "year": 2026
  },
  {
    "name": "CERRO DE PASCO RESOURCES INC",
    "marker": "",
    "ticker": "TSX-V: CDPR;OTCQB: GPPRF",
    "type": "DEVELOPER",
    "location": "PERU",
    "commodities": "Cu, Zn, Pb, Au",
    "email": "info@pascoresources.com",
    "year": 2026
  },
  {
    "name": "CLINCH RESOURCES LTD.",
    "marker": "",
    "ticker": "TSX: CLCH",
    "type": "PRODUCER",
    "location": "USA/WV",
    "commodities": "C",
    "email": "info@clinchresources.com",
    "year": 2026
  },
  {
    "name": "COLLECTIVE MINING LTD",
    "marker": "",
    "ticker": "TSX: CNL; NYSE: CNL",
    "type": "DEVELOPER",
    "location": "COLOMBIA",
    "commodities": "Au, Ag",
    "email": "info@collectivemining.com",
    "year": 2026
  },
  {
    "name": "CONSOLIDATED LITHIUM METALS INC.",
    "marker": "",
    "ticker": "TSX-V: CLM; OTCQB: JORFF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Li",
    "email": "info@consolidatedlithiummetals.com",
    "year": 2026
  },
  {
    "name": "CONTANGO SILVER & GOLD INC.",
    "marker": "",
    "ticker": "TSX/NYSE: CTGO",
    "type": "EXPLORER",
    "location": "CANADA/ BC",
    "commodities": "Ag, Au",
    "email": "info@contangosilvergold.com",
    "year": 2026
  },
  {
    "name": "CONSOLIDATED LITHIUM METALS INC.",
    "marker": "*",
    "ticker": "TSX-V: CLM; OTCQB: JORFF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Li",
    "email": "info@consolidatedlithiummetals.com",
    "year": 2026
  },
  {
    "name": "CRITICAL ELEMENTS LITHIUM CORPORATION",
    "marker": "*",
    "ticker": "TSX-V: CRE; OTCQX: CRECF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Li",
    "email": "info@celithium.com",
    "year": 2026
  },
  {
    "name": "CUPANI METALS CORPORATION",
    "marker": "*",
    "ticker": "CSE: CUPA; OTCQB: CUPIF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Cu",
    "email": "info@cupanimetals.com",
    "year": 2026
  },
  {
    "name": "CYGNUS METALS LIMITED",
    "marker": "",
    "ticker": "TSX-V: CYG; OTCQB: CYGGF",
    "type": "DEV/EXPL",
    "location": "CANADA/QC",
    "commodities": "Au, Cu",
    "email": "info@cygnusmetals.com",
    "year": 2026
  },
  {
    "name": "DOMESTIC METALS CORP",
    "marker": "*",
    "ticker": "TSXV:DMCU;OTCQB: DMCUF",
    "type": "EXPLORER",
    "location": "USA",
    "commodities": "Cu, Au",
    "email": "info@domesticmetals.com",
    "year": 2026
  },
  {
    "name": "DRYDEN GOLD CORP",
    "marker": "#",
    "ticker": "TSX-V: DRY; OTCQX: DRYGF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "email": "ir@drydengold.com",
    "year": 2026
  },
  {
    "name": "DUMONT NICKEL INC.",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Ni, Co",
    "email": "info@dumontnickel.com",
    "year": 2026
  },
  {
    "name": "DYNASTY GOLD CORP",
    "marker": "*",
    "ticker": "TSX-V: DYG",
    "type": "EXPLORER",
    "location": "CANADA/ON, USA/NV",
    "commodities": "Au",
    "email": "info@dynastygoldcorp.com",
    "year": 2026
  },
  {
    "name": "ELEMENT 29 RESOURCES INC.",
    "marker": "*",
    "ticker": "TSX-V: ECU; OTCQB: EMTRF",
    "type": "EXPLORER",
    "location": "PERU",
    "commodities": "Cu",
    "email": "info@e29copper.com",
    "year": 2026
  },
  {
    "name": "ELORO RESOURCES LTD.",
    "marker": "*",
    "ticker": "TSX: ELO; OTCQX: ELRRF",
    "type": "EXPLORER",
    "location": "BOLIVIA",
    "commodities": "Sn, Ag",
    "email": "info@elororesources.com",
    "year": 2026
  },
  {
    "name": "EMPEROR METALS INC.",
    "marker": "*",
    "ticker": "CSE: AUOZ; OTCQB: EMAUF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@emperormetals.com",
    "year": 2026
  },
  {
    "name": "EPIC GOLD CORP.",
    "marker": "*",
    "ticker": "CSE:NFLD; OTCQB: NFLDF",
    "type": "EXPLORER",
    "location": "CANADA/NFLD",
    "commodities": "Au",
    "email": "info@epicgold.com",
    "year": 2026
  },
  {
    "name": "EQUINOX GOLD CORP.",
    "marker": "",
    "ticker": "TSX:EQX; NYSE-A: EQX",
    "type": "PRODUCER",
    "location": "CANADA/NF; ON/NICARAGUA/USA",
    "commodities": "Au",
    "email": "ryan.king@equinoxgold.com",
    "year": 2026
  },
  {
    "name": "EQUITY METALS CORPORATION",
    "marker": "*",
    "ticker": "TSX-V: EQTY; OTCQB: EQMEF",
    "type": "EXPLORER",
    "location": "CANADA/BC, NT, SK",
    "commodities": "Au, Ag, Cu",
    "email": "info@mnxltd.com",
    "year": 2026
  },
  {
    "name": "ERANOVA METALS INC.",
    "marker": "^^",
    "ticker": "TSX-V: NOVA; OTCQB: STXPF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Mo",
    "email": "meades@stuhini.com",
    "year": 2026
  },
  {
    "name": "ESGOLD CORP",
    "marker": "",
    "ticker": "CSE: ESAU; OTCQB: ESAUF",
    "type": "EXPL/DEV",
    "location": "CANADA/QC",
    "commodities": "Au, Ag",
    "email": "info@esgold.com",
    "year": 2026
  },
  {
    "name": "FIRST CANADIAN GRAPHITE INC",
    "marker": "*",
    "ticker": "TSX-V: FCI; OTCQB: GRAPF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "C",
    "email": "info@firstcanadiangraphite.com",
    "year": 2026
  },
  {
    "name": "FIREFLY METALS LTD",
    "marker": "",
    "ticker": "TSX: FFM; ASX: FFM",
    "type": "EXPLORER",
    "location": "CANADA/NFLD",
    "commodities": "Cu, Au",
    "email": "info@fireflymetals.com.au",
    "year": 2026
  },
  {
    "name": "FIRST MINING GOLD CORP",
    "marker": "#",
    "ticker": "TSX: FF; OTCQX: FFMGF",
    "type": "DEV/EXPL",
    "location": "CANADA/ON, QC, NFLD",
    "commodities": "Au",
    "email": "info@firstmininggold.com",
    "year": 2026
  },
  {
    "name": "FIRST PHOSPHATE CORP.",
    "marker": "*",
    "ticker": "CSE: PHOS; OTCQX: FRSPF OTCQX-ADR: FPHOY",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Battery, P2O5",
    "email": "questions@firstphosphate.com",
    "year": 2026
  },
  {
    "name": "FORMATION METALS INC",
    "marker": "*",
    "ticker": "CSE: FOMO; OTCQB: FOMTF",
    "type": "EXPLORER",
    "location": "CANADA/ON; QC",
    "commodities": "Au, Ni, Cu, PGE, Ti",
    "email": "ir@formationmetalsinc.com",
    "year": 2026
  },
  {
    "name": "FPX NICKEL CORP",
    "marker": "",
    "ticker": "TSX-V: FPX; OTCBX: FPOCF",
    "type": "DEVELOPER",
    "location": "CANADA/BC",
    "commodities": "Ni",
    "email": "ceo@fpxnickel.com",
    "year": 2026
  },
  {
    "name": "GEMDALE GOLD INC.",
    "marker": "~",
    "ticker": "TSX-V: GEMG",
    "type": "EXPLORER",
    "location": "FINLAND",
    "commodities": "Au",
    "email": "info@gemdalegold.com",
    "year": 2026
  },
  {
    "name": "GEOMEGA RESOURCES INC.",
    "marker": "",
    "ticker": "TSX-V: GMA; OTCQB: GOMRF",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "REE Extraction, refinery",
    "email": "kmugerman@geomega.ca",
    "year": 2026
  },
  {
    "name": "GLENCORE PLC / GLENCORE CANADA",
    "marker": "",
    "ticker": "LSE: GLEN; JSE: GLN",
    "type": "PRODUCER",
    "location": "CANADA/GLOBAL",
    "commodities": "Cu, Ni, Zn, Pb",
    "email": "info@glencoreglencorecanada.com",
    "year": 2026
  },
  {
    "name": "GLOBEX MINING ENTERPRISES INC.",
    "marker": "",
    "ticker": "TSX: GMX; OTCQX: GLBXF",
    "type": "EXPLORER",
    "location": "CANADA/QC/ON; USA",
    "commodities": "Polymetallic",
    "email": "info@globexminingenterprises.com",
    "year": 2026
  },
  {
    "name": "GOLDEN CARIBOO RESOURCES LTD.",
    "marker": "^^",
    "ticker": "CSE: GCC; OTCQB:GCCFF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Au, Ag",
    "email": "info@goldencariboo.com",
    "year": 2026
  },
  {
    "name": "GR SILVER MINING LTD.",
    "marker": "*",
    "ticker": "TSX-V: GRSL; OTCQX: GRSLF",
    "type": "DEVELOPER",
    "location": "MEXICO",
    "commodities": "Ag",
    "email": "info@grsilvermining.com",
    "year": 2026
  },
  {
    "name": "GREENLIGHT METALS INC.",
    "marker": "*",
    "ticker": "TSX-V:GRL; OTCQB: GRLMF",
    "type": "EXPLORER",
    "location": "USA",
    "commodities": "Cu, Zn, Au",
    "email": "info@greenlightmetals.com",
    "year": 2026
  },
  {
    "name": "GT RESOURCES INC.",
    "marker": "~",
    "ticker": "TSX-V: GT; OTCQB: CGTRF",
    "type": "EXPLORER",
    "location": "FINLAND",
    "commodities": "Cu, Ni, Pd, Co, Au, Pt",
    "email": "info@gtresources.com",
    "year": 2026
  },
  {
    "name": "GUANAJUATO SILVER COMPANY",
    "marker": "*",
    "ticker": "TSX-V: GSVR; OTCQX: GSVRF",
    "type": "PRODUCER",
    "location": "MEXICO",
    "commodities": "Ag, Au",
    "email": "info@gsilver.com",
    "year": 2026
  },
  {
    "name": "GUNNISON COPPER CORP",
    "marker": "*",
    "ticker": "TSX: GCU; OTCQB:GCUMF",
    "type": "PRODUCER",
    "location": "USA/AZ",
    "commodities": "Cu",
    "email": "Info@gunnisoncopper.com",
    "year": 2026
  },
  {
    "name": "HARFANG EXPLORATION INC.",
    "marker": "*",
    "ticker": "TSX-V: HAR",
    "type": "EXPLORER",
    "location": "CANADA/QC; ON",
    "commodities": "Au",
    "email": "info@harfangexploration.com",
    "year": 2026
  },
  {
    "name": "HELIOSTAR METALS LTD.",
    "marker": "",
    "ticker": "TSX-V: HSTR; OTCQX: HSTXF",
    "type": "DEVELOPER",
    "location": "MEXICO",
    "commodities": "Au",
    "email": "info@heliostarmetals.com",
    "year": 2026
  },
  {
    "name": "HEMLO MINING CORP.",
    "marker": "",
    "ticker": "TSX-V: HMMC; OTCQX: HMMCF",
    "type": "PRODUCER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@hemlomining.com",
    "year": 2026
  },
  {
    "name": "HI- VIEW RESOURCES INC",
    "marker": "*",
    "ticker": "CSE: GXLD;",
    "type": "EXPLORER",
    "location": "CANADA/BC, YK",
    "commodities": "Au, Cu",
    "email": "info@hiviewresources.com",
    "year": 2026
  },
  {
    "name": "IAMGOLD CORPORATION",
    "marker": "",
    "ticker": "TSX: IMG; NYSE: IAG",
    "type": "PRODUCER",
    "location": "CANADA/QC, ON; WEST AFRICA",
    "commodities": "Au",
    "email": "info@iamgold.com",
    "year": 2026
  },
  {
    "name": "JUNO CORP.",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "DEV/EXPL",
    "location": "CANADA/ ON",
    "commodities": "Cu, Au, Ti, V, Sc, PGE",
    "email": "info@junocorp.ca",
    "year": 2026
  },
  {
    "name": "KIRKLAND LAKE DISCOVERIES",
    "marker": "*#",
    "ticker": "TSX-V: KLDC; OTCQB: KLKLF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "email": "info@kirklandlakediscoveries.com",
    "year": 2026
  },
  {
    "name": "LAFLEUR MINERALS INC.",
    "marker": "*",
    "ticker": "CSE: LFLR; OTCQB: LFLRF",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@lafleurminerals.com",
    "year": 2026
  },
  {
    "name": "LAHONTAN GOLD CORP.",
    "marker": "*",
    "ticker": "TSX.V: LG; OTCQB: LGCXF",
    "type": "EXPLORER",
    "location": "USA/NV",
    "commodities": "Au",
    "email": "info@lahontangoldcorp.com",
    "year": 2026
  },
  {
    "name": "LATIN METALS INC",
    "marker": "*",
    "ticker": "TSX.V: LMS; OTCQB: LMSQF",
    "type": "EXPLORER",
    "location": "PERU; ARGENTINA",
    "commodities": "Au, Ag, Cu",
    "email": "Info@latin-metals.com",
    "year": 2026
  },
  {
    "name": "LAVRAS GOLD CORP.",
    "marker": "",
    "ticker": "TSX-V: LGC; OTCQX:LGCFF",
    "type": "EXPLORER",
    "location": "BRAZIL",
    "commodities": "Au",
    "email": "info@lavrasgold.com",
    "year": 2026
  },
  {
    "name": "LEVIATHAN METALS CORP.",
    "marker": "*",
    "ticker": "TSX-V: LVX; OTCQB: LVXFF",
    "type": "EXPLORER",
    "location": "BOTSWANA; BOSNIA; HERZEGOVINA",
    "commodities": "Cu, Ag, Zn, Pb",
    "email": "info@leviathanmetals.com",
    "year": 2026
  },
  {
    "name": "Li-FT POWER LTD",
    "marker": "*",
    "ticker": "TSX-V: LIFT; OTCQX: LIFFF",
    "type": "EXPLORER",
    "location": "CANADA/NWT&#x27;; QC",
    "commodities": "Li",
    "email": "info@li-ft.com",
    "year": 2026
  },
  {
    "name": "LOMIKO METALS INC.",
    "marker": "^^",
    "ticker": "TSX-V: LMR;",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "C",
    "email": "communaute@lomiko.com",
    "year": 2026
  },
  {
    "name": "LOYALIST EXPLORATION LIMITED",
    "marker": "*",
    "ticker": "CSE: PNGC",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au, REEs",
    "email": "efarr@loyalistexploration.com",
    "year": 2026
  },
  {
    "name": "MAGMA SILVER CORP.",
    "marker": "*",
    "ticker": "TSX-V: MGMA; OTCQB: MAGMF",
    "type": "EXPLORER",
    "location": "PERU",
    "commodities": "Au, Ag",
    "email": "info@magmasilver.com",
    "year": 2026
  },
  {
    "name": "MAPLE GOLD MINES LTD",
    "marker": "#",
    "ticker": "OTCQX:MGMLF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@maplegoldmines.com",
    "year": 2026
  },
  {
    "name": "MCFARLANE LAKE MINING LIMITED",
    "marker": "*",
    "ticker": "CSE: MLM: OTCQB: MLMLF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "email": "info@mcfarlanelakemining.com",
    "year": 2026
  },
  {
    "name": "MIDLAND EXPLORATION INC.",
    "marker": "*",
    "ticker": "TSX-V: MD",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, PGE&#x27;s",
    "email": "info@midlandexploration.com",
    "year": 2026
  },
  {
    "name": "MINAURUM SILVER INC.",
    "marker": "*",
    "ticker": "TSX.V: MGG; OTCQX: MMRGF",
    "type": "DEV/EXPL",
    "location": "MEXICO; USA",
    "commodities": "Au, Ag",
    "email": "info@minaurum.com",
    "year": 2026
  },
  {
    "name": "MINERA ALAMOS INC",
    "marker": "",
    "ticker": "TSX-V: MAI; OTCQX: MAIFF",
    "type": "PRODUCER",
    "location": "USA; MEXICO",
    "commodities": "Au",
    "email": "info@mineraalamos.com",
    "year": 2026
  },
  {
    "name": "MINEROS S.A.",
    "marker": "",
    "ticker": "TSX: MSA; OTCQX: MNSAF",
    "type": "EXPL/PRO",
    "location": "CA/NIC;SA/CHILE,COL",
    "commodities": "Au",
    "email": "info@mineros.com.co",
    "year": 2026
  },
  {
    "name": "MITHRIL SILVER AND GOLD LIMITED",
    "marker": "",
    "ticker": "TSX-V: MSG; ASX:MTH; OTCQB: MTIRF",
    "type": "EXPLORER",
    "location": "MEXICO",
    "commodities": "Ag, Au",
    "email": "investors@mithrilsilvergold.com",
    "year": 2026
  },
  {
    "name": "MONT ROYAL RESOURCES LIMITED",
    "marker": "*",
    "ticker": "TSX-V: MRZL; AXS: MRZ",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "REEs",
    "email": "info@montroyalresources.com",
    "year": 2026
  },
  {
    "name": "MOROCCO STRATEGIC MINERALS CORPORATION",
    "marker": "~",
    "ticker": "TSX-V: MCC",
    "type": "EXPLORER",
    "location": "MOROCCO; CANADA/QC",
    "commodities": "Li, Au, Cu",
    "email": "info@moroccostrategicminerals.com",
    "year": 2026
  },
  {
    "name": "NEW AGE METALS INC.",
    "marker": "*",
    "ticker": "TSX-V: NAM; OTCQB: NMTLF",
    "type": "EXPLORER",
    "location": "CANADA/ON; MB",
    "commodities": "PGE; Li, REEs",
    "email": "info@newagemetals.com",
    "year": 2026
  },
  {
    "name": "NEW FOUND GOLD CORP.",
    "marker": "",
    "ticker": "TSXV:NFG;NYSE:NFGC",
    "type": "EXPLORER",
    "location": "CANADA/NFLD",
    "commodities": "Au",
    "email": "contact@newfoundgold.ca",
    "year": 2026
  },
  {
    "name": "NEW PACIFIC METALS CORP.",
    "marker": "*",
    "ticker": "TSX: NUAG; NYSE: NEWP",
    "type": "PRODUCER",
    "location": "BOLIVIA",
    "commodities": "Ag",
    "email": "invest@newpacificmetals.com",
    "year": 2026
  },
  {
    "name": "NEXGOLD MINING CORP",
    "marker": "",
    "ticker": "TSX-V: NEXG; OTCQX: NXGCF",
    "type": "DEV/EXPL",
    "location": "CANADA/ON, NS",
    "commodities": "Au",
    "email": "info@nexgold.com",
    "year": 2026
  },
  {
    "name": "NICOLA MINING INC",
    "marker": "",
    "ticker": "TSX-V: NIM; OTCQB: HUSIF",
    "type": "EXPLOER/DEV",
    "location": "CANADA/BC",
    "commodities": "Cu, Ag, Au",
    "email": "info@nicolamining.com",
    "year": 2026
  },
  {
    "name": "NORTH AMERICAN NIOBIUM AND CRITICAL MINERALS CORP.",
    "marker": "",
    "ticker": "CSE: NIOB;",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Cu, REEs",
    "email": "info@northamericanniobiumandcriticalminerals.com",
    "year": 2026
  },
  {
    "name": "NORTH ATLANTIC TITANIUM CORP",
    "marker": "#^^",
    "ticker": "CSE: NATO",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Ti",
    "email": "info@natitanium.com",
    "year": 2026
  },
  {
    "name": "NORTHISLE COPPER & GOLD INC.",
    "marker": "",
    "ticker": "TSX-V: NCX;OTCQX: NTCPF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Cu, Au",
    "email": "info@northisle.ca",
    "year": 2026
  },
  {
    "name": "NOUVEAU MONDE GRAPHITE INC.",
    "marker": "*",
    "ticker": "TSX: NOU; NYSE: NMG",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "C",
    "email": "info@nouveaumondegraphite.com",
    "year": 2026
  },
  {
    "name": "NUVAU MINERALS INC.",
    "marker": "*",
    "ticker": "TSX-V: NMC",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Zn, Cu",
    "email": "info@nuvauminerals.com",
    "year": 2026
  },
  {
    "name": "OMAI GOLD MINES CORP",
    "marker": "*",
    "ticker": "TTSX-V: OMG; OTCQB: OMGGF",
    "type": "DEVELOPER",
    "location": "GUYANA",
    "commodities": "Au",
    "email": "info@omaigoldmines.com",
    "year": 2026
  },
  {
    "name": "ONYX GOLD CORP",
    "marker": "",
    "ticker": "TSX-V: ONYX;OTCQX: ONXGF",
    "type": "EXPLORER",
    "location": "CANADA/ON, YK",
    "commodities": "Au",
    "email": "information@onyxgold.com",
    "year": 2026
  },
  {
    "name": "OPUS ONE GOLD CORPORATION",
    "marker": "^^",
    "ticker": "TSX-V: OOR",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, Li",
    "email": "info@opusonegold.com",
    "year": 2026
  },
  {
    "name": "OREZONE GOLD CORPORATION",
    "marker": "",
    "ticker": "TSX: ORE; ASX: ORE; OTCQX: ORZCF",
    "type": "PRODUCER",
    "location": "CANADA/QC; AFRICA",
    "commodities": "Au",
    "email": "info@orezonegold.com",
    "year": 2026
  },
  {
    "name": "OR ROYALTIES INC",
    "marker": "",
    "ticker": "TSX:OR; NYSE: OR",
    "type": "ROYALTY",
    "location": "GLOBAL",
    "commodities": "Royalties",
    "email": "info@ORroyalties.com",
    "year": 2026
  },
  {
    "name": "ORVANA MINERALS CORP.",
    "marker": "",
    "ticker": "TSX: ORV;OTCQX: ORVMF",
    "type": "PRODUCER",
    "location": "SPAIN, ARGENTINA, BOLIVIA",
    "commodities": "Au, Cu, Ag",
    "email": "nmenendez@orvana.com",
    "year": 2026
  },
  {
    "name": "OSISKO DEVELOPMENT CORP.",
    "marker": "",
    "ticker": "TSX-V: ODV; NYSE: ODV",
    "type": "PRODUCER",
    "location": "CANADA/BC; USA/UT",
    "commodities": "Au",
    "email": "info@osiskodev.com",
    "year": 2026
  },
  {
    "name": "OUTCROP SILVER & GOLD CORPORATION",
    "marker": "",
    "ticker": "TSX:OCG; OTCQX: OCGSF",
    "type": "EXPLORER",
    "location": "COLOMBIA",
    "commodities": "Ag",
    "email": "info@outcropsilvergold.com",
    "year": 2026
  },
  {
    "name": "PALQUARTZ INC.",
    "marker": "^^",
    "ticker": "PRIVATE",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Si, HPQ",
    "email": "info@palquartz.com",
    "year": 2026
  },
  {
    "name": "PANTHER MINERALS PLC",
    "marker": "*",
    "ticker": "LSE: PALM;OTCQB: GLIOF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au, Ag, Zn, Cu, Co, Ga",
    "email": "info@pantherminerals.com",
    "year": 2026
  },
  {
    "name": "PELANGIO EXPLORATION INC.",
    "marker": "*",
    "ticker": "TSX-V: PX",
    "type": "EXPLORER",
    "location": "CANADA/ON; AFRICA",
    "commodities": "Au",
    "email": "info@pelangio.com",
    "year": 2026
  },
  {
    "name": "PELOTON MINERALS CORPORATION",
    "marker": "*",
    "ticker": "CSE: PMC; OTCQB: PMCCF",
    "type": "EXPLORER",
    "location": "USA/NV",
    "commodities": "Li, U, REEs",
    "email": "pelotonminerals45@gmail.com",
    "year": 2026
  },
  {
    "name": "PERSEVERANCE METALS INC.",
    "marker": "*#",
    "ticker": "TSX-V: PMI",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Ni, Cu, PGE",
    "email": "info@perseverancemetals.com",
    "year": 2026
  },
  {
    "name": "PIVOTAL METALS LIMITED",
    "marker": "*",
    "ticker": "ASX: PVT",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Cu, Ni, PGMs",
    "email": "info@pivotalmetals.com",
    "year": 2026
  },
  {
    "name": "PMET RESOURCES INC",
    "marker": "",
    "ticker": "TSX: PMET; ASX: PMT; OTCQX: PMETF",
    "type": "EXPL/DEV",
    "location": "CANADA/QC",
    "commodities": "Li",
    "email": "eroy@pmet.ca",
    "year": 2026
  },
  {
    "name": "POWER METALLIC MINES INC.",
    "marker": "",
    "ticker": "TSX-V: PNPN;OTCQB: PNPNF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "POLYMETALLIC",
    "email": "duncan@powermetallic.com",
    "year": 2026
  },
  {
    "name": "Q2 METALS CORP.",
    "marker": "",
    "ticker": "TSX-V:QTWO; OTCQB:QUEXF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Li",
    "email": "info@q2metals.com",
    "year": 2026
  },
  {
    "name": "QUESTCORP MINING INC.",
    "marker": "^^",
    "ticker": "CSE: QQQ;OTCQB: QQCMF",
    "type": "EXPLORER",
    "location": "CANADA/BC; MEXICO",
    "commodities": "Cu, Au",
    "email": "info@questcorpmining.com",
    "year": 2026
  },
  {
    "name": "RADISSON MINING RESOURCES INC.",
    "marker": "",
    "ticker": "TSX-V: RDS; OTCQX:RMRDF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@radissonmining.com",
    "year": 2026
  },
  {
    "name": "RED PARAMOUNT IRON",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "DEVELOPER",
    "location": "CANADA/NL",
    "commodities": "Fe",
    "email": "info@redparamountiron.com",
    "year": 2026
  },
  {
    "name": "RESOURO STRATEGIC METALS INC.",
    "marker": "*",
    "ticker": "TSX-V: RSM; OTCQB: RSGOF",
    "type": "EXPLORER",
    "location": "BRAZIL",
    "commodities": "REEs, Ti",
    "email": "info@resouro.com",
    "year": 2026
  },
  {
    "name": "RPX GOLD INC",
    "marker": "*",
    "ticker": "TSX-V: RPX; OTCQB: RDEXF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "email": "info@rpxgold.com",
    "year": 2026
  },
  {
    "name": "SAUDI GOLD REFINERY CO.",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "SAUDI ARABIA",
    "commodities": "Au",
    "email": "info@sgr-sa.com",
    "year": 2026
  },
  {
    "name": "SCANDIUM CANADA LIMITED",
    "marker": "*",
    "ticker": "TSX-V: SCD",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Sc",
    "email": "info@scandium-canada.com",
    "year": 2026
  },
  {
    "name": "SCORPIO GOLD CORPORATION",
    "marker": "",
    "ticker": "TSX-V: SGN;OTCQB: SRCRF",
    "type": "EXPLORER",
    "location": "USA/NV",
    "commodities": "Au",
    "email": "info@scorpiogold.com",
    "year": 2026
  },
  {
    "name": "SCOTTIE RESOURCES CORP.",
    "marker": "",
    "ticker": "TSX-V: SCOT; OTCQB: SCTSF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Au,Ag",
    "email": "brad@scottieresources.com",
    "year": 2026
  },
  {
    "name": "SEARCH MINERALS",
    "marker": "~",
    "ticker": "TSX-V: SMY",
    "type": "EXPLORER",
    "location": "CANADA/NL",
    "commodities": "REEs",
    "email": "info@searchminerals.ca",
    "year": 2026
  },
  {
    "name": "SELKIRK COPPER MINES INC.",
    "marker": "*#",
    "ticker": "TSX-V: SCMI;OTCQB: SKRKF",
    "type": "DEVELOPER",
    "location": "CANADA/YK",
    "commodities": "Cu, Au, Ag",
    "email": "info@selkirkcopper.com",
    "year": 2026
  },
  {
    "name": "SERABI GOLD PLC",
    "marker": "*",
    "ticker": "TSX: SBI; OTCQX: SRBIF",
    "type": "PRODUCER",
    "location": "BRAZIL",
    "commodities": "Au",
    "email": "contact@serabigold.com",
    "year": 2026
  },
  {
    "name": "SILVER X MINING CORP",
    "marker": "*",
    "ticker": "TSX-V: AGX: OTCQB: AGXPF",
    "type": "PRODUCER",
    "location": "PERU",
    "commodities": "Ag",
    "email": "info@silverxmining.com",
    "year": 2026
  },
  {
    "name": "SILVER ONE RESOURCES INC",
    "marker": "",
    "ticker": "TSX-V: SVE, OTCQX:SLVRF",
    "type": "EXPL/DEV",
    "location": "USA/NV",
    "commodities": "Ag",
    "email": "info@silverone.com",
    "year": 2026
  },
  {
    "name": "SIRIOS RESOURCES INC.",
    "marker": "*",
    "ticker": "TSX-V: SOI; OTCQB: SIREF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@sirios.com",
    "year": 2026
  },
  {
    "name": "SOUTH KIRKLAND GOLD",
    "marker": "^^",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "email": "info@southkirkland.com",
    "year": 2026
  },
  {
    "name": "SPANISH MOUNTAIN GOLD LTD",
    "marker": "#",
    "ticker": "TSX-V: SPA: OTCQB: SPAUF",
    "type": "DEVELOPER",
    "location": "CANADA/BC",
    "commodities": "Au",
    "email": "info@spanishmountaingold.com",
    "year": 2026
  },
  {
    "name": "STANDARD URANIUM LTD",
    "marker": "*",
    "ticker": "TSX-V: STND ; OTCQB: STTDF",
    "type": "EXPL/ DEV",
    "location": "CANADA/SK",
    "commodities": "U",
    "email": "info@standarduranium.ca",
    "year": 2026
  },
  {
    "name": "STLLR GOLD INC.",
    "marker": "",
    "ticker": "TSX: STLR; OTCQX: STLRF",
    "type": "DEVELOPER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "email": "info@stllrgold.com",
    "year": 2026
  },
  {
    "name": "STRATEGIC RESOURCES INC.",
    "marker": "*",
    "ticker": "TSX-V: SR",
    "type": "EXPLORER",
    "location": "CANADA/QC; FINLAND",
    "commodities": "Fe, Li, Ti, V",
    "email": "info@strategicresources.com",
    "year": 2026
  },
  {
    "name": "SUMMIT ROYALTIES LTD",
    "marker": "*",
    "ticker": "TSX-V: SUM; OTCQB: SUMMF",
    "type": "ROYALTY",
    "location": "GLOBAL",
    "commodities": "ROYALTIES",
    "email": "info@summit-royalties.com",
    "year": 2026
  },
  {
    "name": "SUN SUMMIT MINERALS CORP.",
    "marker": "*",
    "ticker": "TSX-V: SMN; OTCQB: SMREF",
    "type": "EXPLORER",
    "location": "CANADA",
    "commodities": "Au, Ag, Cu, Zn",
    "email": "info@sunsummitminerals.com",
    "year": 2026
  },
  {
    "name": "SURGE COPPER CORP.",
    "marker": "*",
    "ticker": "TSX-V: SURG; OTCQB: SRGXF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Cu, Mo, Au, Ag",
    "email": "info@surgecopper.com",
    "year": 2026
  },
  {
    "name": "TOCVAN VENTURES CORP.",
    "marker": "*",
    "ticker": "CSE: TOC; OTCQB: TCVNF",
    "type": "DEVELOPER",
    "location": "MEXICO",
    "commodities": "Au, Ag",
    "email": "info@tocvanventures.com",
    "year": 2026
  },
  {
    "name": "TACORA RESOURCES INC.",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "PRODUCER",
    "location": "CANADA/NL",
    "commodities": "Fe",
    "email": "info@tacoraresources.com",
    "year": 2026
  },
  {
    "name": "TALISKER RESOURCES LTD",
    "marker": "*",
    "ticker": "TSX: TSK; OTCQB: TSKFF",
    "type": "DEVELOPER",
    "location": "CANADA/BC",
    "commodities": "Au",
    "email": "info@taliskerresources.com",
    "year": 2026
  },
  {
    "name": "TARGA EXPLORATION CORP.",
    "marker": "*",
    "ticker": "CSE: TEX; OTCQB: TRGEF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@targaexploration.com",
    "year": 2026
  },
  {
    "name": "THUNDER GOLD CORP",
    "marker": "*",
    "ticker": "TSX-V: TGOL; OTCQB: TGOLF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "email": "info@thundergold.com",
    "year": 2026
  },
  {
    "name": "TINCORP METALS INC.",
    "marker": "~",
    "ticker": "TSX-V: TIN",
    "type": "EXPLORER",
    "location": "BOLIVIA",
    "commodities": "Tin",
    "email": "info@tincorpmetals.com",
    "year": 2026
  },
  {
    "name": "TRIDENT RESOURCES CORP.",
    "marker": "*",
    "ticker": "TSX-V: ROCK; OTCQB: TRDTF",
    "type": "EXPLORER",
    "location": "CANADA/SK",
    "commodities": "Au, Cu, Co, Ag, Zn",
    "email": "Info@tridentresourcescorp.com",
    "year": 2026
  },
  {
    "name": "TROILUS MINING CORP",
    "marker": "",
    "ticker": "TSX: TLG; OTCQX: CHXMF",
    "type": "DEV/EXPL",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@troilusmining.com",
    "year": 2026
  },
  {
    "name": "URANIUM X DISCOVERY CORP.",
    "marker": "^^",
    "ticker": "CSE: STMN",
    "type": "EXPLORER",
    "location": "CANADA/SK",
    "commodities": "U",
    "email": "info@uraniumx.ca",
    "year": 2026
  },
  {
    "name": "US GOLD CORP",
    "marker": "",
    "ticker": "NASDAQ: USAU",
    "type": "DEV/EXPL",
    "location": "USA/WY, NV,ID",
    "commodities": "Au, Cu",
    "email": "info@usgoldcorp.gold",
    "year": 2026
  },
  {
    "name": "VALKEA RESOURCES CORP",
    "marker": "",
    "ticker": "TSX-V: OZ;OTCQB: OZBKF",
    "type": "EXPLORER",
    "location": "FINLAND",
    "commodities": "Au",
    "email": "info@valkea.ca",
    "year": 2026
  },
  {
    "name": "VANADIUMCORP RESOURCE INC.",
    "marker": "^^",
    "ticker": "TSX-V: VRB; OTCQB: VRBFF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "V",
    "email": "info@vanadiumcorp.com",
    "year": 2026
  },
  {
    "name": "VIOR GOLD CORPORATION INC",
    "marker": "",
    "ticker": "TSX-V: VIO; OTCQB: VIORF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, Ni",
    "email": "info@vior.ca",
    "year": 2026
  },
  {
    "name": "VIZSLA SILVER CORP",
    "marker": "",
    "ticker": "TSX-V: VZLA; NYSE: VZLA",
    "type": "DEVELOPER",
    "location": "MEXICO",
    "commodities": "Ag",
    "email": "info@vizslasilver.ca",
    "year": 2026
  },
  {
    "name": "VOLTA METALS LTD.",
    "marker": "*",
    "ticker": "CSE: VLTA;OTCQB: VOLMF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "CM",
    "email": "info@voltametals.ca",
    "year": 2026
  },
  {
    "name": "WALLBRIDGE MINING COMPANY LIMITED",
    "marker": "",
    "ticker": "TSX:WM; OTCQB: WLBMF",
    "type": "EXPLORER/DEV",
    "location": "CANADA/QC",
    "commodities": "Au",
    "email": "info@wallbridgeminingcompany.com",
    "year": 2026
  },
  {
    "name": "WESDOME GOLD MINES LTD.",
    "marker": "*",
    "ticker": "TSX: WDO; OTCQX: WDOFF",
    "type": "PRODUCER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "email": "info@wesdome.com",
    "year": 2026
  },
  {
    "name": "WEST POINT GOLD CORP",
    "marker": "",
    "ticker": "TSX-V: WPG; OTCQB: WPGCF",
    "type": "EXPLORER",
    "location": "USA/AZ; NV",
    "commodities": "Au",
    "email": "info@westpointgold.com",
    "year": 2026
  },
  {
    "name": "WESTERN EXPLORATION INC.",
    "marker": "~",
    "ticker": "TSX-V: WEX; OTC: WEXPF",
    "type": "EXPLORER",
    "location": "USA/NV",
    "commodities": "Au, Ag",
    "email": "info@westernexploration.com",
    "year": 2026
  },
  {
    "name": "WHITE GOLD CORP",
    "marker": "*",
    "ticker": "TSX-V:WGO; OTCQX: WHGOF",
    "type": "DEVELOPER",
    "location": "CANADA/YK",
    "commodities": "Au",
    "email": "ir@whitegoldcorp.ca",
    "year": 2026
  },
  {
    "name": "WINSHEAR GOLD CORP",
    "marker": "^^",
    "ticker": "TSX-V: WINS",
    "type": "EXPLORER",
    "location": "CANADA/ON; UK",
    "commodities": "Au, Ni, Cu, Co",
    "email": "info@winshear.com",
    "year": 2026
  },
  {
    "name": "XAU RESOURCES INC.",
    "marker": "~",
    "ticker": "TSX-V: GIG",
    "type": "EXPLORER",
    "location": "GUYANA",
    "commodities": "Au",
    "email": "info@xauresources.com",
    "year": 2026
  },
  {
    "name": "XXIX METAL CORP.",
    "marker": "*",
    "ticker": "TSX-V: XXIX; OTCQB; QCCUF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Cu",
    "email": "info@xxix.ca",
    "year": 2026
  },
  {
    "name": "Agnico Eagle Mines Limited",
    "ticker": "TSX: AEM • NYSE: AEM",
    "type": "PRODUCER",
    "location": "GLOBAL",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Amex Exploration Inc.",
    "ticker": "TSX-V: AMX • OTCQX: AMXEF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Archer Exploration Corp.",
    "ticker": "CSE: RCHR",
    "type": "EXPLORER",
    "location": "CANADA",
    "commodities": "Ni, Cu",
    "year": 2023
  },
  {
    "name": "Arizona Sonoran Copper Company Inc.",
    "ticker": "TSX: ASCU • OTCQX: ASCUF",
    "type": "DEVELOPER",
    "location": "USA/AZ",
    "commodities": "Cu",
    "year": 2023
  },
  {
    "name": "Baselode Energy Corp.",
    "ticker": "TSX-V: FIND • OTCQB: BSENF",
    "type": "EXPLORER",
    "location": "CANADA/SK",
    "commodities": "U",
    "year": 2023
  },
  {
    "name": "Bonterra Resources Inc.",
    "ticker": "TSX: BTR • OTCQX: BONFX",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Brunswick Exploration Inc.",
    "ticker": "TSX-V: BWR",
    "type": "EXPLORER",
    "location": "CANADA",
    "commodities": "Li",
    "year": 2023
  },
  {
    "name": "Canada Nickel Company Inc.",
    "ticker": "TSX-V: CNC • OTCQX: CNIKF",
    "type": "DEVELOPER",
    "location": "CANADA/ON",
    "commodities": "Ni",
    "year": 2023
  },
  {
    "name": "Cartier Resources Inc.",
    "ticker": "TSX-V: ECR",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Doré Copper Mining Corp.",
    "ticker": "TSX-V: DCMC • OTCQX: DRCMF",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Cu, Au",
    "year": 2023
  },
  {
    "name": "Emerita Resources Corp.",
    "ticker": "TSX: EMO • OTCQF: EMOTF",
    "type": "EXPLORER",
    "location": "SPAIN",
    "commodities": "Zn, Pb, Cu, Ag",
    "year": 2023
  },
  {
    "name": "Empress Royalty Corp.",
    "ticker": "TSX-V: EMPR • OTCQX: EMPYF",
    "type": "ROYALTY",
    "location": "GLOBAL",
    "commodities": "Au, Ag",
    "year": 2023
  },
  {
    "name": "EMX Royalty Corp.",
    "ticker": "TSX-V: EMX • NYSE: EMX",
    "type": "ROYALTY",
    "location": "GLOBAL",
    "commodities": "Au, Cu",
    "year": 2023
  },
  {
    "name": "EU Gold Mining Inc.",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "EUROPE",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Exiro Minerals Corp.",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA",
    "commodities": "Ni, Cu, Co, PGE",
    "year": 2023
  },
  {
    "name": "Exploits Discovery Corp.",
    "ticker": "CSE: NFLD • OTCQB: NFLDF",
    "type": "EXPLORER",
    "location": "CANADA/NL",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Fireweed Metals Corp.",
    "ticker": "TSX-V: FWZ • OTCQB: FWEDF",
    "type": "DEVELOPER",
    "location": "CANADA/YT",
    "commodities": "Zn, Pb, Ag, W",
    "year": 2023
  },
  {
    "name": "First Mining Gold Corp.",
    "ticker": "TSX: FF • OTCQX: FFMGF",
    "type": "DEVELOPER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "First Phosphate Corp.",
    "ticker": "CSE: PHOS",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "P",
    "year": 2023
  },
  {
    "name": "Fury Gold Mines Limited",
    "ticker": "TSX-V: FURY • NYSE: FURY",
    "type": "EXPLORER",
    "location": "CANADA/NU, QC, BC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Generation Mining Limited",
    "ticker": "TSX: GENM • OTCQB: GENMF",
    "type": "DEVELOPER",
    "location": "CANADA/ON",
    "commodities": "Pd, Cu, Pt",
    "year": 2023
  },
  {
    "name": "Go Metals Corp.",
    "ticker": "CSE: GOCO",
    "type": "EXPLORER",
    "location": "CANADA/QC, YT",
    "commodities": "Ni, Cu, Co",
    "year": 2023
  },
  {
    "name": "Gold Royalty Corp.",
    "ticker": "NYSE: GROY",
    "type": "ROYALTY",
    "location": "GLOBAL",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Goliath Resources Limited",
    "ticker": "TSX-V: GOT • OTCQB: GOTRF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Au, Ag",
    "year": 2023
  },
  {
    "name": "Harfang Exploration Inc.",
    "ticker": "TSX-V: HAR",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Hecla Mining Company",
    "ticker": "NYSE: HL",
    "type": "PRODUCER",
    "location": "USA, CANADA",
    "commodities": "Ag, Au",
    "year": 2023
  },
  {
    "name": "Hycroft Mining Corp.",
    "ticker": "NASDAQ: HYMC",
    "type": "DEVELOPER",
    "location": "USA/NV",
    "commodities": "Au, Ag",
    "year": 2023
  },
  {
    "name": "Ion Energy Ltd.",
    "ticker": "TSX-V: ION • OTCQB: IONGF",
    "type": "EXPLORER",
    "location": "MONGOLIA",
    "commodities": "Li",
    "year": 2023
  },
  {
    "name": "Jaguar Mining Inc.",
    "ticker": "TSX: JAG • OTCQX: JAGGF",
    "type": "PRODUCER",
    "location": "BRAZIL",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Juggernaut Exploration Inc.",
    "ticker": "TSX-V: JUGR",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Au, Ag",
    "year": 2023
  },
  {
    "name": "Kirkland Lake Discoveries Corp.",
    "ticker": "TSX-V: KLDC",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Lavras Gold Corp.",
    "ticker": "TSX-V: LGC • OTCQB: LGCFF",
    "type": "EXPLORER",
    "location": "BRAZIL",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Li-FT Power Ltd.",
    "ticker": "CSE: LIFT",
    "type": "EXPLORER",
    "location": "CANADA/NWT, QC",
    "commodities": "Li",
    "year": 2023
  },
  {
    "name": "LithiumBank Resources Corp.",
    "ticker": "TSX: LBNK • OTCQX: LBNKF",
    "type": "DEVELOPER",
    "location": "CANADA/AB, SK",
    "commodities": "Li",
    "year": 2023
  },
  {
    "name": "Lomiko Metals Inc.",
    "ticker": "TSX-V: LMR • OTCQB: LMRMF",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "C",
    "year": 2023
  },
  {
    "name": "Maple Gold Mines Ltd.",
    "ticker": "TSX-V: MGM • OTCQB: MGMLF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Midland Exploration Inc.",
    "ticker": "TSX-V: MD",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, Base Metals",
    "year": 2023
  },
  {
    "name": "Mundoro Capital Ltd.",
    "ticker": "TSX-V: MUN • OTCQB: MUNMF",
    "type": "EXPLORER",
    "location": "EUROPE, USA",
    "commodities": "Cu, Au",
    "year": 2023
  },
  {
    "name": "Nickel Creek Platinum Corp.",
    "ticker": "TSX: NCP • OTCQB: NCPCF",
    "type": "DEVELOPER",
    "location": "CANADA/YT",
    "commodities": "Ni, Cu, Co, Pt, Pd",
    "year": 2023
  },
  {
    "name": "Northern Superior Resources Inc.",
    "ticker": "TSX-V: SUP • OTCQB: NSUPF",
    "type": "EXPLORER",
    "location": "CANADA/QC, ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "NorthWest Copper Corp.",
    "ticker": "TSX-V: NWST • OTCQX: NWCCF",
    "type": "DEVELOPER",
    "location": "CANADA/BC",
    "commodities": "Cu, Au",
    "year": 2023
  },
  {
    "name": "Nouveau Monde Graphite Inc.",
    "ticker": "TSX-V: NOU • NYSE: NMG",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "C",
    "year": 2023
  },
  {
    "name": "Nuvau Minerals Corp.",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA",
    "commodities": "Au, Cu",
    "year": 2023
  },
  {
    "name": "O3 Mining Inc.",
    "ticker": "TSX-V: OIII • OTCQX: OIIIF",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "OMAI Gold Mines Corp.",
    "ticker": "TSX-V: OMG • OTCQB: OMGGF",
    "type": "EXPLORER",
    "location": "GUYANA",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Orford Mining Corporation",
    "ticker": "TSX-V: ORM",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, Ni, Cu",
    "year": 2023
  },
  {
    "name": "Osisko Development Corp.",
    "ticker": "TSX-V: ODV • NYSE: ODV",
    "type": "DEVELOPER",
    "location": "CANADA/BC, USA/UT",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Osisko Metals Incorporated",
    "ticker": "TSX-V: OM • OTCQX: OMZNF",
    "type": "DEVELOPER",
    "location": "CANADA/NWT, QC",
    "commodities": "Zn, Pb, Cu",
    "year": 2023
  },
  {
    "name": "Osisko Mining Inc.",
    "ticker": "TSX: OSK",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Palladium One Mining Inc.",
    "ticker": "TSX-V: PDM • OTCQB: NKORF",
    "type": "EXPLORER",
    "location": "CANADA/ON, FINLAND",
    "commodities": "Pd, Pt, Ni, Cu",
    "year": 2023
  },
  {
    "name": "Paramount Gold Nevada Corp.",
    "ticker": "NYSE: PZG",
    "type": "DEVELOPER",
    "location": "USA/NV, OR",
    "commodities": "Au, Ag",
    "year": 2023
  },
  {
    "name": "Patriot Battery Metals Inc.",
    "ticker": "TSX-V: PMET • OTCQX: PMETF",
    "type": "EXPLORER",
    "location": "CANADA/QC, NWT",
    "commodities": "Li",
    "year": 2023
  },
  {
    "name": "Power Nickel Inc.",
    "ticker": "TSX-V: PNPN • OTCQB: CMETF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Ni, Cu, Co, PGE",
    "year": 2023
  },
  {
    "name": "Prospector Metals Corp.",
    "ticker": "TSX-V: PPP • OTCQB: PMCOF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au, Cu",
    "year": 2023
  },
  {
    "name": "QC Copper & Gold Inc.",
    "ticker": "TSX-V: QCCU • OTCQB: QCCUF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Cu, Au",
    "year": 2023
  },
  {
    "name": "Quebec Nickel Corp.",
    "ticker": "CSE: QNI • OTCQB: QNICF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Ni, Cu, Co, PGE",
    "year": 2023
  },
  {
    "name": "Rackla Metals Inc.",
    "ticker": "TSX-V: RAK",
    "type": "EXPLORER",
    "location": "CANADA/YT",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Red Pine Exploration Inc.",
    "ticker": "TSX-V: RPX • OTCQB: RDEXF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Ridgeline Minerals Corp.",
    "ticker": "TSX-V: RDG • OTCQB: RDGMF",
    "type": "EXPLORER",
    "location": "USA/NV",
    "commodities": "Au, Ag",
    "year": 2023
  },
  {
    "name": "Sayona Mining Limited",
    "ticker": "ASX: SAY • OTCQB: SYAXF",
    "type": "DEVELOPER",
    "location": "CANADA/QC, AUSTRALIA",
    "commodities": "Li",
    "year": 2023
  },
  {
    "name": "Signal Gold Inc.",
    "ticker": "TSX: SGNL • OTCQB: SGNLF",
    "type": "DEVELOPER",
    "location": "CANADA/NS, NL",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Sirios Resources Inc.",
    "ticker": "TSX-V: SOI",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Skyharbour Resources Ltd.",
    "ticker": "TSX-V: SYH • OTCQX: SYHBF",
    "type": "EXPLORER",
    "location": "CANADA/SK",
    "commodities": "U",
    "year": 2023
  },
  {
    "name": "Stelmine Canada Ltd.",
    "ticker": "TSX-V: STH • OTCQB: STHFF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Steppe Gold Ltd.",
    "ticker": "TSX: STGO • OTCQX: STPGF",
    "type": "PRODUCER",
    "location": "MONGOLIA",
    "commodities": "Au, Ag",
    "year": 2023
  },
  {
    "name": "Stillwater Critical Minerals Corp.",
    "ticker": "TSX-V: PGE • OTCQB: PGEZF",
    "type": "EXPLORER",
    "location": "USA/MT, CANADA/YT",
    "commodities": "Ni, Cu, Co, PGE",
    "year": 2023
  },
  {
    "name": "Strategic Resources Inc.",
    "ticker": "TSX-V: SR",
    "type": "DEVELOPER",
    "location": "CANADA/QC, FINLAND",
    "commodities": "V, Ti, Fe",
    "year": 2023
  },
  {
    "name": "Talisker Resources Ltd.",
    "ticker": "TSX: TSK • OTCQX: TSKFF",
    "type": "DEVELOPER",
    "location": "CANADA/BC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Thunder Gold Corp.",
    "ticker": "TSX-V: TGOL",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Troilus Gold Corp.",
    "ticker": "TSX: TLG • OTCQX: CHXMF",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Au, Cu",
    "year": 2023
  },
  {
    "name": "Vanadiumcorp Resource Inc.",
    "ticker": "TSX-V: VRB",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "V, Fe, Ti",
    "year": 2023
  },
  {
    "name": "Vanstar Mining Resources Inc.",
    "ticker": "TSX-V: VSR • OTCQX: VMNGF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Vision Lithium Inc.",
    "ticker": "TSX-V: VLI • OTCQB: ABEPF",
    "type": "EXPLORER",
    "location": "CANADA/QC, ON",
    "commodities": "Li",
    "year": 2023
  },
  {
    "name": "Wallbridge Mining Company",
    "ticker": "TSX: WM • OTCQX: WLBMF",
    "type": "DEVELOPER",
    "location": "CANADA/QC, ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Wesdome Gold Mines Ltd.",
    "ticker": "TSX: WDO • OTCQX: WDOFF",
    "type": "PRODUCER",
    "location": "CANADA/ON, QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "West Red Lake Gold Mines Ltd.",
    "ticker": "TSX-V: WRLG",
    "type": "DEVELOPER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Western Copper and Gold Corp.",
    "ticker": "TSX: WRN • NYSE: WRN",
    "type": "DEVELOPER",
    "location": "CANADA/YT",
    "commodities": "Cu, Au, Ag, Mo",
    "year": 2023
  },
  {
    "name": "Astra Exploration Inc.",
    "ticker": "TSX-V: ASTR • OTCQB: ATEPF",
    "type": "EXPLORER",
    "location": "CHILE",
    "commodities": "Au, Ag",
    "year": 2023
  },
  {
    "name": "Argo Gold Inc.",
    "ticker": "CSE: ARQ",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Beauce Gold Fields Inc.",
    "ticker": "TSX-V: BGF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Calisto Cobre Resources Corp.",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA",
    "commodities": "Cu",
    "year": 2023
  },
  {
    "name": "Canadian Copper Inc.",
    "ticker": "CSE: CCI",
    "type": "EXPLORER",
    "location": "CANADA/NB",
    "commodities": "Cu",
    "year": 2023
  },
  {
    "name": "Comet Lithium Corp.",
    "ticker": "TSX-V: CLIC",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Li",
    "year": 2023
  },
  {
    "name": "Copperzone Resources Limited",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "ZAMBIA",
    "commodities": "Cu",
    "year": 2023
  },
  {
    "name": "Delta Resources Limited",
    "ticker": "TSX-V: DLTA • OTCQB: DTARF",
    "type": "EXPLORER",
    "location": "CANADA/QC, ON",
    "commodities": "Au, Cu, Zn",
    "year": 2023
  },
  {
    "name": "Dryden Gold Corp.",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "E2Gold Inc.",
    "ticker": "TSX-V: ETU • OTCQB: ETUGF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "EDM Resources Inc.",
    "ticker": "TSX-V: EDM",
    "type": "EXPLORER",
    "location": "CANADA/NS",
    "commodities": "Zn, Pb",
    "year": 2023
  },
  {
    "name": "Electro Metals & Mining",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA",
    "commodities": "Cu, Ni",
    "year": 2023
  },
  {
    "name": "Focus Graphite Inc.",
    "ticker": "TSX-V: FMS • OTCQB: FCSMF",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "C",
    "year": 2023
  },
  {
    "name": "Fokus Mining Corporation",
    "ticker": "TSX-V: FKM • OTCQB: FKMCF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Green Battery Minerals Inc.",
    "ticker": "TSX-V: GEM • OTCQB: GBMIF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "C",
    "year": 2023
  },
  {
    "name": "iMetal Resources Inc.",
    "ticker": "TSX-V: IMR • OTCQB: IMRFF",
    "type": "EXPLORER",
    "location": "CANADA/ON, QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Leopard Lake Gold Corp.",
    "ticker": "CSE: LP",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Medaro Gold Resources Corp.",
    "ticker": "TSX-V: MEDA",
    "type": "EXPLORER",
    "location": "CANADA/QC, ON",
    "commodities": "Li, U",
    "year": 2023
  },
  {
    "name": "Magna Mining Inc.",
    "ticker": "TSX-V: NICU",
    "type": "DEVELOPER",
    "location": "CANADA/ON",
    "commodities": "Ni, Cu, PGM",
    "year": 2023
  },
  {
    "name": "Metals Energy Corp.",
    "ticker": "TSX-V: MERG",
    "type": "EXPLORER",
    "location": "CANADA/MB, ON",
    "commodities": "Ni, Cu, Co",
    "year": 2023
  },
  {
    "name": "Platinex Inc.",
    "ticker": "CSE: PTX",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Puma Exploration Inc.",
    "ticker": "TSX-V: PUMA • OTCQB: PUMXF",
    "type": "EXPLORER",
    "location": "CANADA/NB",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Quebec Precious Metals Corp.",
    "ticker": "TSX-V: QPM • OTCQB: CJCFF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Quimbaya Gold Inc.",
    "ticker": "CSE: QIM",
    "type": "EXPLORER",
    "location": "COLOMBIA",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Radisson Mining Resources",
    "ticker": "TSX-V: RDS • OTCQB: RMRDF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Renforth Resources Inc.",
    "ticker": "CSE: RFR • OTCQB: RFHRF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Ni, Cu, Co, Zn",
    "year": 2023
  },
  {
    "name": "Steadright Critical Minerals Inc.",
    "ticker": "CSE: SCM",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Ni, Cu",
    "year": 2023
  },
  {
    "name": "Vior Inc.",
    "ticker": "TSX-V: VIO • OTCQB: VIORF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2023
  },
  {
    "name": "Xplore Resources Corp.",
    "ticker": "TSX-V: XPLR",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au, Li",
    "year": 2023
  },
  {
    "name": "ABCOURT MINES INC.",
    "marker": "*",
    "ticker": "TSX-V: ABI; OTCQB: ABMBF",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "ABITIBI METALS",
    "marker": "#",
    "ticker": "CSE: AMQ; OTCQB: AMQFF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Cu",
    "year": 2025
  },
  {
    "name": "ABRA SILVER RESOURCE CORP.",
    "marker": "",
    "ticker": "TSX-V: ABRA; OTCQX: ABBRF",
    "type": "DEVELOPER",
    "location": "ARGENTINA",
    "commodities": "Au, Ag",
    "year": 2025
  },
  {
    "name": "AGNICO EAGLE MINES LIMITED",
    "marker": "",
    "ticker": "TSX: AEM; NYSE: AEM",
    "type": "PRODUCER",
    "location": "GLOBAL",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "AMEX EXPLORATION INC.",
    "marker": "",
    "ticker": "TSX-V: AMX; OTCQX: AMXEF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "ANDEAN PRECIOUS METALS CORP.",
    "marker": "",
    "ticker": "TSX: APM; OTCQX: ANPMF",
    "type": "PRODUCER",
    "location": "USA/CA; MEXICO; BOLIVIA",
    "commodities": "Au, Ag",
    "year": 2025
  },
  {
    "name": "ARIZONA METALS CORP",
    "marker": "",
    "ticker": "TSX: AMC; OTCQX: AZMCF",
    "type": "EXPLORER",
    "location": "USA/AZ",
    "commodities": "Au, Cu",
    "year": 2025
  },
  {
    "name": "ATHA ENERGY CORP",
    "marker": "",
    "ticker": "TSX-V: SASK; OTCQB: SASKF",
    "type": "DEV/EXPL",
    "location": "CANADA/NV, SK",
    "commodities": "U308",
    "year": 2025
  },
  {
    "name": "AURANIA RESOURCES LTD.",
    "marker": "*",
    "ticker": "TSX-V: ARU; OTCQB: AUIAF",
    "type": "EXPLORER",
    "location": "ECUADOR",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "BRUNSWICK EXPLORATION INC.",
    "marker": "#",
    "ticker": "TSX-V: BRW; OTCQB: BRWXF",
    "type": "DEV/EXPL",
    "location": "CANADA/QC",
    "commodities": "Li",
    "year": 2025
  },
  {
    "name": "BUNKER HILL MINING CORP",
    "marker": "",
    "ticker": "TSX-V: BNKR; OTCQB: BHLL",
    "type": "DEVELOPER",
    "location": "USA/ID, CO",
    "commodities": "Ag, Pb, Zn",
    "year": 2025
  },
  {
    "name": "CALIBRE MINING CORP.",
    "marker": "",
    "ticker": "TSX: CXB; OTCQX: CXBMF",
    "type": "PRODUCER",
    "location": "CANADA/NFLD; USA; NICARAGUA",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "CANTERRA MINERALS CORPORATION",
    "marker": "*",
    "ticker": "TSX-V: CTM; OTCQB: CTMCF",
    "type": "EXPLORER",
    "location": "CANADA/NFLD, AB",
    "commodities": "Cu, Zi, Pb, Au",
    "year": 2025
  },
  {
    "name": "COLLECTIVE MINING LTD.",
    "marker": "",
    "ticker": "TSX: CNL; NYSE: CNL",
    "type": "EXPLORER",
    "location": "COLOMBIA",
    "commodities": "Au, Ag, Cu",
    "year": 2025
  },
  {
    "name": "DRYDEN GOLD",
    "marker": "*",
    "ticker": "TSX-V: DRY; OTCQB: DRYGF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "EXPLOITS DISCOVERY CORP.",
    "marker": "*",
    "ticker": "CSE: NFLD; OTCQB: NFLDF",
    "type": "EXPLORER",
    "location": "CANADA/NFLD",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "FIREFLY METALS LTD",
    "marker": "",
    "ticker": "ASX: FFM; TSX: FFM",
    "type": "EXPLORER",
    "location": "CANADA/NFLD",
    "commodities": "Cu, Au",
    "year": 2025
  },
  {
    "name": "FIREWEED METALS CORP.",
    "marker": "",
    "ticker": "TSX-V: FWZ; OTCQX: FWEDF",
    "type": "EXPLORER",
    "location": "CANADA/YK, NWT",
    "commodities": "Zn, Pb, Ag, W, Ge, Ga",
    "year": 2025
  },
  {
    "name": "FIRST MINING GOLD CORP",
    "marker": "#",
    "ticker": "TSX: FF; OTCQX: FFMGF",
    "type": "DEV/EXPL",
    "location": "CANADA/ON, QC, NFLD",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "STRIKEPOINT GOLD INC.",
    "marker": "^^",
    "ticker": "TSX-V: SKP; OTCQB: STKXF",
    "type": "EXPLORER",
    "location": "CANADA/BC; USA/NV",
    "commodities": "Au, Ag",
    "year": 2025
  },
  {
    "name": "GRID METALS CORP",
    "marker": "^^",
    "ticker": "TSX-V: GRDM; OTCQB: MSMGF",
    "type": "EXPLORER",
    "location": "CANADA/MB",
    "commodities": "Li, Cu, Ni",
    "year": 2025
  },
  {
    "name": "GLENCORE PLC / GLENCORE CANADA",
    "marker": "",
    "ticker": "LSE: GLEN; JSE: GLN",
    "type": "PRODUCER",
    "location": "CANADA/GLOBAL",
    "commodities": "Cu, Ni, Zn, Pb",
    "year": 2025
  },
  {
    "name": "GOLD ROYALTY CORP",
    "marker": "",
    "ticker": "NYSE: GROY",
    "type": "ROYALTY",
    "location": "GLOBAL",
    "commodities": "Royalties",
    "year": 2025
  },
  {
    "name": "KENORLAND MINERALS LTD.",
    "marker": "",
    "ticker": "TSX-V: KLD; OTCQX: KLDCF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "KIRKLAND LAKE DISCOVERIES",
    "marker": "*",
    "ticker": "TSX-V: KLDC",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "LAVRAS GOLD CORP.",
    "marker": "",
    "ticker": "TSX-V: LGC; OTCQX: LGCFF",
    "type": "EXPLORER",
    "location": "BRAZIL",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "MAPLE GOLD MINES LTD",
    "marker": "",
    "ticker": "TSX-V: MGM; OTCQB: MGMLF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "MARITIME RESOURCES CORP",
    "marker": "",
    "ticker": "TSX-V: MAE",
    "type": "DEV/EXPL",
    "location": "CANADA/NFLD",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "MIDLAND EXPLORATION INC.",
    "marker": "*",
    "ticker": "TSX-V: MD",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, PGE's",
    "year": 2025
  },
  {
    "name": "MINEROS S.A.",
    "marker": "",
    "ticker": "TSX: MSA",
    "type": "PRODUCER",
    "location": "COLOMBIA; CHILE; NICARAGUA",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "NEW GOLD INC.",
    "marker": "",
    "ticker": "TSX: NGD; NYSE: NGD",
    "type": "PRODUCER",
    "location": "CANADA/ON, BC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "NUVAU MINERALS CORP.",
    "marker": "*",
    "ticker": "TSX-V: NMC",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Zn, Cu",
    "year": 2025
  },
  {
    "name": "OSISKO DEVELOPMENT CORP.",
    "marker": "",
    "ticker": "TSX-V: ODV; NYSE: ODV",
    "type": "PRODUCER",
    "location": "CANADA/BC; USA/UT",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "OSISKO GOLD ROYALTIES LTD.",
    "marker": "",
    "ticker": "TSX: OR; NYSE: OR",
    "type": "ROYALTY",
    "location": "GLOBAL",
    "commodities": "Royalties",
    "year": 2025
  },
  {
    "name": "OSISKO METALS INCORPORATED",
    "marker": "#",
    "ticker": "TSX-V: OM; OTCQX: OMZNF",
    "type": "DEV/EXPL",
    "location": "CANADA/QC, NT",
    "commodities": "Cu, Zn",
    "year": 2025
  },
  {
    "name": "PATRIOT BATTERY METALS INC.",
    "marker": "",
    "ticker": "TSX: PMET; ASX: PMT; OTCQX: PMETF",
    "type": "EXPL/DEV",
    "location": "CANADA/QC",
    "commodities": "Li",
    "year": 2025
  },
  {
    "name": "PELOTON MINERALS CORPORATION",
    "marker": "*",
    "ticker": "CSE: PMC; OTCQB: PMCCF",
    "type": "EXPLORER",
    "location": "USA/NV",
    "commodities": "Li",
    "year": 2025
  },
  {
    "name": "POWER METALLIC MINES INC.",
    "marker": "#",
    "ticker": "TSX-V: PNPN; OTCQB: PNPNF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Ni",
    "year": 2025
  },
  {
    "name": "QUIMBAYA GOLD INC.",
    "marker": "^^",
    "ticker": "CSE: QIM; OTCQB: QIMGF",
    "type": "EXPLORER",
    "location": "COLOMBIA",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "RADISSON MINING RESOURCES INC.",
    "marker": "",
    "ticker": "TSX-V: RDS; OTCQB: RMRDF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "RED PINE EXPLORATION",
    "marker": "*",
    "ticker": "TSX-V: RPX; OTCQB: RDEXF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "SAYONA MINING LTD.",
    "marker": "",
    "ticker": "ASX: SYA; OTCQB: SYAXF",
    "type": "DEV/EXPL",
    "location": "CANADA/QC; AUSTRALIA",
    "commodities": "Li",
    "year": 2025
  },
  {
    "name": "SILVER ONE RESOURCES INC",
    "marker": "",
    "ticker": "TSX-V: SVE; OTCQX: SLVRF",
    "type": "EXPL/DEV",
    "location": "USA/NV",
    "commodities": "Ag",
    "year": 2025
  },
  {
    "name": "SIRIOS RESOURCES INC.",
    "marker": "*",
    "ticker": "TSX-V: SOI; OTCQB: SIREF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "STRATEGIC RESOURCES INC.",
    "marker": "",
    "ticker": "TSX-V: SR",
    "type": "DEVELOPER",
    "location": "CANADA/QC; FINLAND",
    "commodities": "V, Ti, Fe",
    "year": 2025
  },
  {
    "name": "TROILUS GOLD CORP",
    "marker": "",
    "ticker": "TSX: TLG; OTCQX: CHXMF",
    "type": "DEV/EXPL",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "UNIGOLD INC.",
    "marker": "*",
    "ticker": "TSX-V: UGD; OTCQX: UGDIF",
    "type": "EXPLORER",
    "location": "CARRIBEAN",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "VIZSLA SILVER CORP",
    "marker": "",
    "ticker": "TSX-V: VZLA; NYSE: VZLA",
    "type": "DEVELOPER",
    "location": "MEXICO",
    "commodities": "Ag",
    "year": 2025
  },
  {
    "name": "WALLBRIDGE MINING COMPANY LIMITED",
    "marker": "",
    "ticker": "TSX: WM; OTCQB: WLBMF",
    "type": "EXPL/DEV",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "WESDOME GOLD MINES LTD.",
    "marker": "",
    "ticker": "TSX: WDO; OTCQX: WDOFF",
    "type": "PRODUCER",
    "location": "CANADA/QC, ON",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "WEST RED LAKE GOLD MINES LTD.",
    "marker": "",
    "ticker": "TSX-V: WRLG; OTCQB: WRLGF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "ANGUS GOLD INC.",
    "marker": "~",
    "ticker": "TSX-V: GUS; OTCQB: ANGVF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "MAX RESOURCE CORP",
    "marker": "",
    "ticker": "TSX-V: MAX",
    "type": "EXPLORER",
    "location": "BRAZIL; COLOMBIA",
    "commodities": "Cu, Fe",
    "year": 2025
  },
  {
    "name": "Li-FT POWER LTD.",
    "marker": "",
    "ticker": "TSX-V: LIFT; OTCQX: LIFFF",
    "type": "EXPLORER",
    "location": "CANADA/NWT, QC",
    "commodities": "Li",
    "year": 2025
  },
  {
    "name": "ORVANA MINERALS CORP",
    "marker": "*",
    "ticker": "TSX: ORV",
    "type": "PRODUCER",
    "location": "SPAIN, ARGENTINA, BOLIVIA",
    "commodities": "Au, Cu, Ag",
    "year": 2025
  },
  {
    "name": "DOLLY VARDEN SILVER CORP",
    "marker": "",
    "ticker": "TSX-V: DV; OTCQX: DOLLF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Ag, Au",
    "year": 2025
  },
  {
    "name": "VALKEA RESOURCES CORP",
    "marker": "",
    "ticker": "TSX-V: OZ",
    "type": "EXPLORER",
    "location": "FINLAND",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "VIOR INC.",
    "marker": "",
    "ticker": "TSX-V: VIO; OTCQB: VIORF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, Ni",
    "year": 2025
  },
  {
    "name": "IAMGOLD CORPORATION",
    "marker": "",
    "ticker": "TSX: IMG; NYSE: IAG",
    "type": "PRODUCER",
    "location": "CANADA/QC; WEST AFRICA",
    "commodities": "Au, Ag",
    "year": 2025
  },
  {
    "name": "APOLLO SILVER CORP",
    "marker": "",
    "ticker": "TSX-V: APGO; OTCQB: APGOF",
    "type": "DEV/EXPL/PRO",
    "location": "USA/MEXICO",
    "commodities": "Ag",
    "year": 2025
  },
  {
    "name": "WHEATON PRECIOUS METALS CORP.",
    "marker": "",
    "ticker": "TSX: WPM; NYSE: WPM",
    "type": "ROYALTIES/STREAMING",
    "location": "GLOBAL",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "EMPEROR METALS INC.",
    "marker": "^^*",
    "ticker": "CSE: AUOZ; OTCQB: EMAUF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "EXIRO MINERALS CORP.",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "CANADA/MB",
    "commodities": "Au, Cu, Ni",
    "year": 2025
  },
  {
    "name": "GOLDEN CARIBOO RESOURCES LTD",
    "marker": "^^",
    "ticker": "CSE: GCC; OTCQB: GCCFF",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "MAGNA MINING INC.",
    "marker": "",
    "ticker": "TSX-V: NICU; OTCQB: MGMNF",
    "type": "PRODUCER",
    "location": "CANADA/ON",
    "commodities": "Ni, Cu",
    "year": 2025
  },
  {
    "name": "Q2 METALS CORP.",
    "marker": "#",
    "ticker": "TSX-V: QTWO; OTCQB: QUEXF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Li",
    "year": 2025
  },
  {
    "name": "MANDALAY RESOURCES CORPORATION",
    "marker": "",
    "ticker": "TSX: MND; OTCQB: MNDJF",
    "type": "PRODUCER",
    "location": "SWEDEN, AUSTRALIA",
    "commodities": "Au, Sb",
    "year": 2025
  },
  {
    "name": "SILVER X MINING CORP.",
    "marker": "*",
    "ticker": "TSX-V: AGX; OTCQB: AGXPF",
    "type": "PRODUCER",
    "location": "PERU",
    "commodities": "Ag, Au, Zn, Pb",
    "year": 2025
  },
  {
    "name": "FIRST PHOSPHATE CORP.",
    "marker": "*",
    "ticker": "CSE: PHOS; OTCQB: FRSPF; FSE: KD0",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Battery, P2O5",
    "year": 2025
  },
  {
    "name": "NIOBAY METALS INC.",
    "marker": "^^",
    "ticker": "TSX-V: NBY; OTCQB: NBYCF",
    "type": "EXPLORER",
    "location": "CANADA/QC, ON",
    "commodities": "Nb, Ti, Ta",
    "year": 2025
  },
  {
    "name": "DYNASTY GOLD CORP",
    "marker": "*",
    "ticker": "TSX-V: DYG",
    "type": "EXPLORER",
    "location": "CANADA/ON, USA/NV",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "EQUITY METALS CORPORATION",
    "marker": "*",
    "ticker": "TSX-V: EQTY; OTCQB: EQMEF",
    "type": "EXPL/DEV",
    "location": "CANADA/BC",
    "commodities": "Au, Ag",
    "year": 2025
  },
  {
    "name": "HARFANG EXPLORATION INC",
    "marker": "^^",
    "ticker": "TSX-V: HAR",
    "type": "EXPLORER",
    "location": "CANADA/ON, QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "JUNO CORP.",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Cu, Au, Ti, V, Sc, PGE",
    "year": 2025
  },
  {
    "name": "STANDARD URANIUM LTD",
    "marker": "*",
    "ticker": "TSX-V: STND; OTCQB: STTDF",
    "type": "EXPL/DEV",
    "location": "CANADA/SK",
    "commodities": "U",
    "year": 2025
  },
  {
    "name": "YUKON METALS CORP",
    "marker": "*",
    "ticker": "CSE: YMC; OTCQB: YMMCF",
    "type": "EXPLORER",
    "location": "CANADA/YK",
    "commodities": "Cu, Au, Ag, Pb, Zn",
    "year": 2025
  },
  {
    "name": "MINES D'OR ORBEC INC.",
    "marker": "^^",
    "ticker": "TSX-V: BLUE",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, Base Metals",
    "year": 2025
  },
  {
    "name": "CUPANI METALS CORPORATION",
    "marker": "*",
    "ticker": "CSE: CUPA",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Cu",
    "year": 2025
  },
  {
    "name": "LITHIUM ROYALTY CORP",
    "marker": "",
    "ticker": "TSX: LIRC",
    "type": "ROYALTY",
    "location": "GLOBAL",
    "commodities": "Royalties",
    "year": 2025
  },
  {
    "name": "XXIX METALS CORP.",
    "marker": "*",
    "ticker": "TSX-V: XXIX; OTCQB: QCCUF",
    "type": "EXPL/DEV",
    "location": "CANADA/QC",
    "commodities": "Cu, Ag",
    "year": 2025
  },
  {
    "name": "NEWCORE GOLD LTD.",
    "marker": "",
    "ticker": "TSX-V: NCAU; OTCQX: NCAUF",
    "type": "EXPL/DEV",
    "location": "AFRICA",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "OROGEN ROYALTIES INC.",
    "marker": "",
    "ticker": "TSX-V: OGN; OTCQB: OGNRF",
    "type": "ROYALTIES",
    "location": "GLOBAL",
    "commodities": "Au, Ag",
    "year": 2025
  },
  {
    "name": "OPUS ONE GOLD CORPORATION",
    "marker": "^^",
    "ticker": "TSX-V: OOR",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "CYGNUS METALS LIMITED",
    "marker": "",
    "ticker": "TSX-V: CYG; OTCQB: CYGGF",
    "type": "DEV/EXPL",
    "location": "CANADA/QC",
    "commodities": "Au, Cu",
    "year": 2025
  },
  {
    "name": "RESOURO STRATEGIC METALS INC",
    "marker": "*",
    "ticker": "TSX-V: RSM; OTCQB: RSGOF",
    "type": "EXPLORER",
    "location": "BRAZIL",
    "commodities": "REEs, Ti, Au",
    "year": 2025
  },
  {
    "name": "1911 GOLD CORPORATION",
    "marker": "*",
    "ticker": "TSX-V: AUMB; OTCQB: AUMBF",
    "type": "DEV/EXPL",
    "location": "CANADA/ON, MB",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "SPANISH MOUNTAIN GOLD",
    "marker": "",
    "ticker": "TSX-V: SPA; OTCQB: SPAZF",
    "type": "EXP/DEV",
    "location": "CANADA/BC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "NORTHISLE COPPER & GOLD INC.",
    "marker": "",
    "ticker": "TSX-V: NCX;",
    "type": "EXPLORER",
    "location": "CANADA/BC",
    "commodities": "Au, Cu",
    "year": 2025
  },
  {
    "name": "SUN SUMMIT MINERALS CORP.",
    "marker": "*",
    "ticker": "TSX-V: SMN; OTCQB: SMREF",
    "type": "EXPLORER",
    "location": "CANADA",
    "commodities": "Au, Ag, Cu, Zn",
    "year": 2025
  },
  {
    "name": "NEW FOUND GOLD. CORP.",
    "marker": "#",
    "ticker": "TSX-V: NFG; NYSE-A: NFGC",
    "type": "DEVELOPER",
    "location": "CANADA/NFLD",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "NATIONS ROYALTY CORP.",
    "marker": "",
    "ticker": "TSX-V: NRC; OTCQB: NRYCF",
    "type": "ROYALTY",
    "location": "CANADA",
    "commodities": "Royalties",
    "year": 2025
  },
  {
    "name": "PROBE GOLD INC.",
    "marker": "~",
    "ticker": "TSX: PRB ; OTCQB: PROBF",
    "type": "PRODUCER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "US GOLD CORP",
    "marker": "",
    "ticker": "NASDAQ: USAU",
    "type": "DEV/EXPL",
    "location": "USA/WY, NV,ID",
    "commodities": "Au, Cu",
    "year": 2025
  },
  {
    "name": "STILLWATER CRITICAL MINERALS CORP.",
    "marker": "*",
    "ticker": "TSX-V: PGE; OCTQB: PGEZF",
    "type": "EXPLORER",
    "location": "USA/MT",
    "commodities": "Ni, PGE, Cu, Co, Au",
    "year": 2025
  },
  {
    "name": "CASCADIA MINERALS LTD.",
    "marker": "^^",
    "ticker": "TSX-V: CAM; OTCQB: CAMNF",
    "type": "EXPLORER",
    "location": "CANADA/YK, BC",
    "commodities": "Au, Ag, Cu",
    "year": 2025
  },
  {
    "name": "LATIN METALS INC",
    "marker": "^^",
    "ticker": "TSX.V: LMS; OTCQB: LMSQF",
    "type": "EXPLORER",
    "location": "PERU; ARGENTINA",
    "commodities": "Au, Ag, Cu",
    "year": 2025
  },
  {
    "name": "SCORPIO GOLD CORPORATION",
    "marker": "*",
    "ticker": "TSX-V: SGN; OTCQB: SRCRF",
    "type": "EXPLORER",
    "location": "USA/NV",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "MINÉRAUX STRATÉGIQUES ABITIBI INC.",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Ni",
    "year": 2025
  },
  {
    "name": "PINNACLE GOLD AND SILVER CORP.",
    "marker": "^^",
    "ticker": "TSX-V: PINN",
    "type": "EXPLORER",
    "location": "CANADA; MEXICO",
    "commodities": "Au, Ag, Cu",
    "year": 2025
  },
  {
    "name": "PASOFINO GOLD CORP.",
    "marker": "*",
    "ticker": "TSX-V: VEIN; OTCQB:EFRGF",
    "type": "EXPLORER",
    "location": "LIBERIA",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "ALTIUS MINERALS CORPORATION",
    "marker": "",
    "ticker": "TSX: ALS; OTCQX: ATUSF",
    "type": "ROYALTIES",
    "location": "GLOBAL",
    "commodities": "K, C, Cu, Li, Ni, Co, U, Zi, Fe",
    "year": 2025
  },
  {
    "name": "SRQ RESOURCES INC.",
    "marker": "^^",
    "ticker": "TSX-V: SRQ",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Ni, Cu, Pt",
    "year": 2025
  },
  {
    "name": "BLUE LAGOON RESOURCES INC",
    "marker": "*",
    "ticker": "CSE: BLLG; OTCQB: BLAGF",
    "type": "DEVELOPER",
    "location": "CANADA/BC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "GREEN LIGHT METALS",
    "marker": "*",
    "ticker": "TSX-V: GRL",
    "type": "EXPLORER",
    "location": "USA/WI",
    "commodities": "Au, Cu, Zn",
    "year": 2025
  },
  {
    "name": "PIVOTAL METALS",
    "marker": "*",
    "ticker": "ASX:PVT",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Cu, Ni, PGM",
    "year": 2025
  },
  {
    "name": "CENTERRA GOLD INC",
    "marker": "~",
    "ticker": "TSX: CG ; NYSE: CGAU",
    "type": "DEV/EXPL/ PRO",
    "location": "CANADA/ BC ;USA/ NV ; TURKEY",
    "commodities": "Au, Cu",
    "year": 2025
  },
  {
    "name": "KONE MINING HOLDINGS INC.",
    "marker": "^^",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "Africa/ Mali",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "ONYX GOLD CORP",
    "marker": "*",
    "ticker": "TSX-V: ONYX; OTCQX: ONXGF",
    "type": "EXPLORER",
    "location": "CANADA/YK, ON",
    "commodities": "Ag",
    "year": 2025
  },
  {
    "name": "CARTIER RESOURCES INC.",
    "marker": "*",
    "ticker": "TSX-V: ECR",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, Ag, Cu, Zn",
    "year": 2025
  },
  {
    "name": "iMETAL RESOURCES INC.",
    "marker": "^^",
    "ticker": "TSX-V: IMR; OTCQB: IMRFF",
    "type": "EXPLORER",
    "location": "CANADA/QC, ON",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "LIBRA ENERGY MATERIALS",
    "marker": "^^",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "CANADA/ON, QC",
    "commodities": "Li",
    "year": 2025
  },
  {
    "name": "ARGENTA SILVER CORP",
    "marker": "*",
    "ticker": "TSX-V: AGAG; OTCQB: AGAGF",
    "type": "EXPLORER",
    "location": "ARGENTINA",
    "commodities": "Ag",
    "year": 2025
  },
  {
    "name": "WESTERN EXPLORATION INC.",
    "marker": "^^",
    "ticker": "TSX-V: WEX; OTCQX: WEXPF",
    "type": "EXPLORER",
    "location": "USA/NEVADA",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "AXCAP VENTURES INC",
    "marker": "*",
    "ticker": "CSE: AXCP",
    "type": "EXPLORER",
    "location": "CANADA/BC, USA",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "COMMERCE RESOURCES CORP.",
    "marker": "~",
    "ticker": "TSX-V: CCE; OTC:CMRZF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "REEs",
    "year": 2025
  },
  {
    "name": "EMPRESS ROYALTY CORP",
    "marker": "~",
    "ticker": "TSX-V: EMPR; OTCQX: EMPYF",
    "type": "ROYALTY",
    "location": "GLOBAL",
    "commodities": "Royalties",
    "year": 2025
  },
  {
    "name": "LOYALIST EXPLORATION LIMITED",
    "marker": "~",
    "ticker": "CSE: PNGC",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au, Ag, Ni, Cu",
    "year": 2025
  },
  {
    "name": "NAMIB MINERALS",
    "marker": "*",
    "ticker": "PRIVATE",
    "type": "PRODUCER",
    "location": "AFRICA/ZW; DRC",
    "commodities": "Au, Cu, Co",
    "year": 2025
  },
  {
    "name": "TARGA EXPLORATION CORP.",
    "marker": "^^",
    "ticker": "CSE: TEX; OTCQB: TRGEF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "ARGO GOLD INC.",
    "marker": "~",
    "ticker": "TSX-V: ARQ: OTCQB: ARBTF",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "E POWER RESOURCES",
    "marker": "^^",
    "ticker": "CSE: EPR",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "C",
    "year": 2025
  },
  {
    "name": "FPX NICKEL CORP",
    "marker": "~",
    "ticker": "TSX-V: FPX; OTCQB: FPOCF",
    "type": "DEVELOPER",
    "location": "CANADA/BC",
    "commodities": "Ni",
    "year": 2025
  },
  {
    "name": "METALQUEST MINING INC.",
    "marker": "^^",
    "ticker": "TSX-V: MQM; OTCQB: MQMIF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Fe",
    "year": 2025
  },
  {
    "name": "Ni-Co ENERGY INC.",
    "marker": "^^",
    "ticker": "PRIVATE",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Ni, Cu, Co",
    "year": 2025
  },
  {
    "name": "LOYALTIST EXPLORATION LTD.",
    "marker": "",
    "ticker": "CSE: PNGC",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2025
  },
  {
    "name": "MAGMA SILVER CORP.",
    "marker": "~",
    "ticker": "TSX-V: MGMA",
    "type": "EXPLORER",
    "location": "PERU",
    "commodities": "Ag, Au",
    "year": 2025
  },
  {
    "name": "Abcourt Mines Inc.",
    "marker": "*",
    "ticker": "TSX-V: ABI",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "E-Power Resources Inc.",
    "marker": "^^",
    "ticker": "CSE: EPR",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Lode Gold Resources",
    "marker": "^^*",
    "ticker": "TSX-V: LOD; OTCQB: SBMIF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Quebec Precious Metals",
    "marker": "^^",
    "ticker": "TSX: QPM; OTCQB: CJCFF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Abitibi Metals Corp.",
    "marker": "*#",
    "ticker": "CSE: AMQ; OTCQB: AMQFF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "E2Gold Inc.",
    "marker": "^^",
    "ticker": "TSX-V: ETU; OTCQB: ETUGF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Maple Gold Mines Ltd.",
    "marker": "",
    "ticker": "TSX-V: MGM; OTCQB: MGMLF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Rackla Metals Inc.",
    "marker": "*",
    "ticker": "TSX-V: RAK",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Advanced Gold Exploration",
    "marker": "~",
    "ticker": "CSE: AUEX",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Emperor Metals Inc.",
    "marker": "^^#",
    "ticker": "CSE :AUOZ: OTCQB: EMAUF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Maritime Resources Corp.",
    "marker": "",
    "ticker": "TSX-V: MAE",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Radisson Mining Resources",
    "marker": "",
    "ticker": "TSX-V: RDS; OTCQB: RMRDF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Adyton Resources Corp.",
    "marker": "",
    "ticker": "TSX-V: ADY",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Empress Royalty Corp.",
    "marker": "",
    "ticker": "TSX-V: EMPR; OTCQX: EMPYF",
    "type": "ROYALTY",
    "location": "CANADA / GLOBAL",
    "commodities": "Royalties",
    "year": 2024
  },
  {
    "name": "Midland Exploration Inc.",
    "marker": "*",
    "ticker": "TSX-V: MD",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au, PGE&#x27;s",
    "year": 2024
  },
  {
    "name": "Resouro Strategic Resources",
    "marker": "^^",
    "ticker": "TSX-V: RSM.",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Agnico Eagle Mines Limited",
    "marker": "",
    "ticker": "TSX: AEM; NYSE: AEM",
    "type": "PRODUCER",
    "location": "GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "EMX Royalty Corp.",
    "marker": "",
    "ticker": "TSX-V: EMX; NYSE: EMX",
    "type": "ROYALTY",
    "location": "CANADA / GLOBAL",
    "commodities": "Royalties",
    "year": 2024
  },
  {
    "name": "Mineros S.A.",
    "marker": "",
    "ticker": "TSX: MSA",
    "type": "EXPL/PRO",
    "location": "CA/NIC;SA/CHILE,COL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Sherritt International Corp",
    "marker": "",
    "ticker": "TSX: S",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Alamos Gold Inc.",
    "marker": "~",
    "ticker": "TSX: AGI; NYSE: AGI",
    "type": "PRODUCER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Evolve Royalties",
    "marker": "~",
    "ticker": "Private",
    "type": "ROYALTY",
    "location": "CANADA / GLOBAL",
    "commodities": "Royalties",
    "year": 2024
  },
  {
    "name": "Mosaic Minerals Corp.",
    "marker": "~",
    "ticker": "CSE: MOC",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Silver Mountain Resources",
    "marker": "*",
    "ticker": "TSX-V: AGMR; OTCQB: AGMRF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Ag",
    "year": 2024
  },
  {
    "name": "Allied Gold Corporation",
    "marker": "",
    "ticker": "TSX: AAUC",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Exiro Minerals Corp.",
    "marker": "*",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Nevada Organic Phosphate",
    "marker": "^^",
    "ticker": "CSE: NOP",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "SRQ Resources Inc.",
    "marker": "^^",
    "ticker": "TSX-V: SRQ",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Amex Exploration Inc.",
    "marker": "#",
    "ticker": "TSX-V: AMX; OTCQX: AMXEF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Exploits Discovery Corp.",
    "marker": "",
    "ticker": "CSE: NFLD; OTCQB: NFLDF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Niobay Metals Inc.",
    "marker": "^^#",
    "ticker": "TSX-V: NBY; OTCQB: NBYCF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Sirios Resources Inc.",
    "marker": "*",
    "ticker": "TSX-V: SOI; OTCQB: SIREF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Aston Minerals Ltd",
    "marker": "*",
    "ticker": "ASX: ASO",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Falco Resources Ltd.",
    "marker": "",
    "ticker": "TSX-V: FPC",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Nion Nickel Inc.",
    "marker": "",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Ni",
    "year": 2024
  },
  {
    "name": "Starcore International Mines",
    "marker": "*",
    "ticker": "TSX: SAM",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Atex Resources Inc.",
    "marker": "",
    "ticker": "TSX-V: ATX",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Firefly Metals Ltd.",
    "marker": "",
    "ticker": "ASX: FFM",
    "type": "EXPLORER",
    "location": "CANADA/NFLD",
    "commodities": "Cu, Au",
    "year": 2024
  },
  {
    "name": "Northern Superior Resources",
    "marker": "",
    "ticker": "TSX-V: SUP; OTCQB: NSUPF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "STLLR Gold Inc.",
    "marker": "*",
    "ticker": "TSX: STLR; OTCQX: STLRF",
    "type": "DEVELOPER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Atha Energy Corp.",
    "marker": "",
    "ticker": "TSX-V: SASK; OTCQB: SASKF",
    "type": "DEVELOPER",
    "location": "CANADA/NV, SK",
    "commodities": "U308",
    "year": 2024
  },
  {
    "name": "First Phosphate Corp.",
    "marker": "#",
    "ticker": "CSE: PHOS",
    "type": "DEVELOPER",
    "location": "CANADA/QC",
    "commodities": "Battery, P2O5",
    "year": 2024
  },
  {
    "name": "NorthX Nickel Corp",
    "marker": "*",
    "ticker": "CSE: NIX",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Ni",
    "year": 2024
  },
  {
    "name": "Strategic Resources Inc",
    "marker": "",
    "ticker": "TSX-V:SR",
    "type": "EXPLORER",
    "location": "CANADA/QC; FINLAND",
    "commodities": "Fe, Li, Ti, V",
    "year": 2024
  },
  {
    "name": "Avanti Gold Corporation",
    "marker": "",
    "ticker": "CSE: AGC",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "FPX Nickel Corp.",
    "marker": "",
    "ticker": "TSX-V: FPX; OTCQB: FPOCF",
    "type": "DEVELOPER",
    "location": "CANADA/BC",
    "commodities": "Ni",
    "year": 2024
  },
  {
    "name": "Nouveau Monde Graphite",
    "marker": "",
    "ticker": "TSX-V: NOU; NYSE: NMG",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Temas Resources Corp.",
    "marker": "^^",
    "ticker": "CSE: TMAS; OTCQB: TMASF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Aya Gold & Silver Inc.",
    "marker": "",
    "ticker": "TSX: AYA; OTCQX: AYASF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Geovic Metals",
    "marker": "*",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Nuvau Minerals Corp.",
    "marker": "*#",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Strikepoint Gold Inc.",
    "marker": "^^",
    "ticker": "TSX-V: SKP; OTCQB: STKXF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Blackbird Critical Metals",
    "marker": "^^*",
    "ticker": "CSE: BBRD; OTCQB: BBCMF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Glencore PLC/Glencore Canada",
    "marker": "",
    "ticker": "LSE: GLEN; JSE: GLN",
    "type": "PRODUCER",
    "location": "CANADA/GLOBAL",
    "commodities": "Cu, Ni, Zn, Pb",
    "year": 2024
  },
  {
    "name": "O3 Mining Inc.",
    "marker": "#",
    "ticker": "TSX-V: OIII; OTCQX: OIIIF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Troilus Gold Corp.",
    "marker": "",
    "ticker": "TSX: TLG; OTCQX: CHXMF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Blue Thunder Mining Inc.",
    "marker": "^^",
    "ticker": "TSX-V: BLUE",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "GoGold Resources Inc.",
    "marker": "",
    "ticker": "TSX: GGD; OTCQX: GLGDF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Osisko Development Corp.",
    "marker": "",
    "ticker": "TSX-V: ODV; NYSE: ODV",
    "type": "PRODUCER",
    "location": "CANADA/BC; USA/UT",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Tudor Gold Corp.",
    "marker": "",
    "ticker": "TSX-V: TUD",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Brunswick Exploration Inc.",
    "marker": "#",
    "ticker": "TSX-V: BRW; OTCQB: BRWXF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Gold Royalty Corp.",
    "marker": "",
    "ticker": "NYSE: GROY",
    "type": "ROYALTY",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Osisko Gold Royalties Ltd.",
    "marker": "",
    "ticker": "TSX:OR; NYSE: OR",
    "type": "ROYALTY",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Unigold Inc.",
    "marker": "*",
    "ticker": "TSX-V:UGD: OTCQX: UGDIF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Bunker Hill Mining Corp.",
    "marker": "",
    "ticker": "TSX-V: BNKR; OTCQB: BHLL",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Golden Cariboo Resources",
    "marker": "^^",
    "ticker": "CSE: GCC",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Osisko Metals Incorporated",
    "marker": "#",
    "ticker": "TSX-V: OM; OTCQX: OMZNF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Vanadiumcorp Resource Inc.",
    "marker": "*",
    "ticker": "TSX-V: VRB",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "V",
    "year": 2024
  },
  {
    "name": "Calisto Cobre Resources.",
    "marker": "^^",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Goliath Resources Limited",
    "marker": "*",
    "ticker": "TSX-V: GOT; OTCQB: GOTRF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Osisko Mining Inc.",
    "marker": "#",
    "ticker": "TSX: OSK",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Vior Inc.",
    "marker": "^^*",
    "ticker": "TSX-V: VIO; OTCQB: VIORF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Canada Nickel Company",
    "marker": "",
    "ticker": "TSX-V: CNC; OTCQX: CNIKF",
    "type": "DEVELOPER",
    "location": "CANADA / GLOBAL",
    "commodities": "Ni",
    "year": 2024
  },
  {
    "name": "Harfang Exploration Inc.",
    "marker": "^^",
    "ticker": "TSX-V: HAR",
    "type": "EXPLORER",
    "location": "CANADA/QC; ON",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Patriot Battery Metals Inc.",
    "marker": "",
    "ticker": "TSX: PMET; ASX: PMT; OTCQX: PMETF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Vision Lithium Inc.",
    "marker": "",
    "ticker": "TSX-V: VLI; OTCQB: ABEPF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Li",
    "year": 2024
  },
  {
    "name": "Cartier Resources Inc.",
    "marker": "~",
    "ticker": "TSX-V: ECR",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Hecla Mining Company",
    "marker": "",
    "ticker": "NYSE: HL",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Peloton Minerals Corporation",
    "marker": "*",
    "ticker": "CSE: PMC; OTCQB: PMCCF",
    "type": "EXPLORER",
    "location": "USA/NV",
    "commodities": "Li, U, REEs",
    "year": 2024
  },
  {
    "name": "Vizsla Silver Corp.",
    "marker": "",
    "ticker": "TSX-V: VZLA; NYSE: VZLA",
    "type": "DEVELOPER",
    "location": "MEXICO",
    "commodities": "Ag",
    "year": 2024
  },
  {
    "name": "Comet Lithium Corp",
    "marker": "^^",
    "ticker": "TSX-V: CLIC",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Li",
    "year": 2024
  },
  {
    "name": "i80 Gold Corp.",
    "marker": "",
    "ticker": "TSX: IAU; NYSE: IAUX",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Perseverance Metals",
    "marker": "*",
    "ticker": "Private",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Volta Metals Ltd",
    "marker": "^^",
    "ticker": "CSE: VLTA",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "CM",
    "year": 2024
  },
  {
    "name": "Coniagas Battery Metals",
    "marker": "^^*",
    "ticker": "TSX-V: COS",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "IAMGOLD Corporation",
    "marker": "",
    "ticker": "TSX: IMG; NYSE: IAG",
    "type": "PRODUCER",
    "location": "CANADA/QC, ON; WEST AFRICA",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Piedmont Lithium Inc.",
    "marker": "",
    "ticker": "NASDAQ: PLL; ASX: PLL",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Li",
    "year": 2024
  },
  {
    "name": "Wallbridge Mining Company",
    "marker": "",
    "ticker": "TSX: WM; OTCQB: WLBMF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Delta Resources Limited",
    "marker": "^^",
    "ticker": "TSX-V: DLTA",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "iMetal Resources Inc^^",
    "marker": "*",
    "ticker": "TSX-V: IMR; OTCQB: IMRFF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Power Metals Corp.",
    "marker": "~",
    "ticker": "TSX-V: PWM; OTCQB: PWRMF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Wesdome Gold Mines Ltd.",
    "marker": "",
    "ticker": "TSX: WDO; OTCQX: WDOFF",
    "type": "PRODUCER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Denison Mines Corp.",
    "marker": "",
    "ticker": "TSX: DML; NYSE: DNN",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Lavras Gold Corp.",
    "marker": "",
    "ticker": "TSX-V: LGC; OTCQX: LGCFF",
    "type": "EXPLORER",
    "location": "BRAZIL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Power Nickel Inc.",
    "marker": "",
    "ticker": "TSX-V: PNPN; OTCQB: PNPNF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Ni",
    "year": 2024
  },
  {
    "name": "West Red Lake Gold Mines",
    "marker": "",
    "ticker": "TSX-V: WRLG; OTCQB: WRLGF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Dolly Varden Silver Corp.",
    "marker": "",
    "ticker": "TSX-V: DV; OTCQX: DOLLF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Ag",
    "year": 2024
  },
  {
    "name": "Li-FT Power Ltd.",
    "marker": "",
    "ticker": "TSX-V: LIFT; OTCQX: LIFFF",
    "type": "EXPLORER",
    "location": "CANADA/NWT&#x27;; QC",
    "commodities": "Li",
    "year": 2024
  },
  {
    "name": "Puma Exploration Inc.",
    "marker": "^^",
    "ticker": "TSX-V: PUMA; OTCQB: PUMXF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Wheaton Precious Metals Corp.",
    "marker": "",
    "ticker": "TSX:WPM; NYSE:WPM; LSE:WPM",
    "type": "PRODUCER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au, Cu",
    "year": 2024
  },
  {
    "name": "Doré Copper Mining Corp.",
    "marker": "*",
    "ticker": "TSX-V: DCMC;OTCQX: DRCMF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Cu",
    "year": 2024
  },
  {
    "name": "Lithium Royalty Corp.",
    "marker": "",
    "ticker": "TSX: LIRC; OTCQX: LITRF",
    "type": "ROYALTY",
    "location": "CANADA / GLOBAL",
    "commodities": "Li",
    "year": 2024
  },
  {
    "name": "QC Copper & Gold Inc.",
    "marker": "",
    "ticker": "TSX-V: QCCU; OTCQB: QCCUF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Dryden Gold Corp.",
    "marker": "*#",
    "ticker": "TSX-V: DRY",
    "type": "EXPLORER",
    "location": "CANADA/ON",
    "commodities": "Au",
    "year": 2024
  },
  {
    "name": "Lithium Universe Limited",
    "marker": "",
    "ticker": "ASX: LU7",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "Li",
    "year": 2024
  },
  {
    "name": "Purepoint Uranium Group Inc.",
    "marker": "*",
    "ticker": "TSX-V: PTU; OTCQB: PTUUF",
    "type": "EXPLORER",
    "location": "CANADA / GLOBAL",
    "commodities": "U",
    "year": 2024
  },
  {
    "name": "WINSOME RESOURCES LIMITED",
    "marker": "",
    "ticker": "ASX: WR1; OTCQB: WRSLF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Li",
    "year": 2024
  },
  {
    "name": "WINSOME RESOURCES LIMITED",
    "marker": "",
    "ticker": "ASX: WR1; OTCQB: WRSLF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Li",
    "year": 2025
  },
  {
    "name": "WINSOME RESOURCES LIMITED",
    "marker": "",
    "ticker": "ASX: WR1; OTCQB: WRSLF",
    "type": "EXPLORER",
    "location": "CANADA/QC",
    "commodities": "Li",
    "year": 2026
  }
];
