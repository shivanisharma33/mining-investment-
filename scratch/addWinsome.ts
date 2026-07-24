import { PARTICIPATING_COMPANIES, CompanyItem } from '../src/components/companiesData';
import fs from 'fs';

const newCompany2024: CompanyItem = {
  name: "WINSOME RESOURCES LIMITED",
  marker: "",
  ticker: "ASX: WR1; OTCQB: WRSLF",
  type: "EXPLORER",
  location: "CANADA/QC",
  commodities: "Li",
  year: 2024
};

const newCompany2025: CompanyItem = {
  name: "WINSOME RESOURCES LIMITED",
  marker: "",
  ticker: "ASX: WR1; OTCQB: WRSLF",
  type: "EXPLORER",
  location: "CANADA/QC",
  commodities: "Li",
  year: 2025
};

const newCompany2026: CompanyItem = {
  name: "WINSOME RESOURCES LIMITED",
  marker: "",
  ticker: "ASX: WR1; OTCQB: WRSLF",
  type: "EXPLORER",
  location: "CANADA/QC",
  commodities: "Li",
  year: 2026
};

// Filter out any duplicate if present
const updatedCompanies = [
  ...PARTICIPATING_COMPANIES.filter(c => c.name.toLowerCase() !== "winsome resources limited"),
  newCompany2024,
  newCompany2025,
  newCompany2026
];

const tsContent = `export interface CompanyItem {
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

export const PARTICIPATING_COMPANIES: CompanyItem[] = ${JSON.stringify(updatedCompanies, null, 2)};
`;

fs.writeFileSync('./src/components/companiesData.ts', tsContent);
console.log("Successfully added Winsome Resources Limited! Total companies:", updatedCompanies.length);
