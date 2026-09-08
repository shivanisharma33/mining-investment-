const fs = require('fs');

const gold = [
  '/altitude.png',
  '/Invest_Yukon.png',
  '/LOGOS Mining (10).png',
  '/sponsors/2026/maxit_capital.png',
  '/peartree_0c7d9a1777.png',
  '/sponsors/2026/the_money_channel_new_york_city.png',
];

const silver = [
  '/sponsors/2026/atrium_research.png',
  '/sponsors/2026/canadian_securities_exchange_cse.svg',
  '/43.png',
  '/sponsors/2026/crux_investor.svg',
  '/sponsors/2026/hatch.png',
  '/sponsor image/IAMGOLD-Logo-N.png',
  '/sponsors/2026/government_of_newfoundland_labrador.svg',
  '/lorroyalties.svg',
  '/sponsers/LOGOS Mining (3).png',
  '/sponsors/2026/stifel.svg',
  '/sponsers/176.png'
];

const copper = [
  '/agp.webp',
  '/apaton-finance-logo.svg',
  '/brooks-nelson.png',
  '/sponsers/128.png',
  '/sponsers/cassels.svg',
  '/sponsers/center.svg',
  '/sponsor image/inforfg-logo-f.png',
  '/sponsors/2026/la_caisse_cdpq.svg',
  '/139.png',
  '/sponsers/38.png',
  '/sponsers/pal_airlines.svg',
  '/sponsors/2026/outside_the_box_capital.png',
  '/151.png',
  '/sponsors/2026/40.png'
];

const media = [
  '/sponsors/2026/mining_discovery.webp',
  '/btv.png',
  '/ceo_ca.png',
  '/cmj.png',
  '/sponsors/2026/crux_investor.svg',
  '/gbr.webp',
  '/sponsor image/ibn.svg',
  '/kitco.png',
  '/miningir.png',
  '/sponsors/2026/newsfile.png',
  '/sponsors/2026/resource_world_magazine.ico',
  '/tnm.png',
  '/sponsors/2026/the_prospector_news.png'
];

for (const [name, list] of Object.entries({ gold, silver, copper, media })) {
  console.log(`=== ${name} ===`);
  for (const f of list) {
    const p = 'public' + f;
    console.log(f, fs.existsSync(p));
  }
}
