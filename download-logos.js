const fs = require('fs');
const path = require('path');

const SPONSORS_DATA = [
    {
        title: 'Platinum Partners',
        files: [
            '5.png',
            '7.png',
            '8.png',
            '9.png',
            'Agnico_Eagle_Logo.svg.png'
        ]
    },
    {
        title: 'Gold Partners',
        files: [
            '1.pdf (1).png',
            '1.pdf.png',
            '12 (1).png',
            'peartree.8c0c95cff01a.png',
            'SPONSORS+04.09.26+(1).pdf.png'
        ]
    },
    {
        title: 'Silver Partners',
        files: [
            '12.png',
            '12 (2).png',
            '12 (3).png',
            '12 (4).png',
            '12 (7).png',
            '12 (8).png',
            '12 (9).png',
            '12 (10).png',
            '3.png',
            '642e8adf6f6728bf086ca90e_logo.svg',
            '790205.avif'
        ]
    },
    {
        title: 'Copper Partners',
        files: [
            '11.png', '12.png', '13.png', '14.png', '15.png', '16.png',
            '17.png', '18.png', '19.png', '20.png', '21.png', '22.png'
        ]
    },
    {
        title: 'Media Partners',
        files: [
            '1.pdf.png',
            '24.png', '25.png', '26.png', '27.png', '28.png', '29.png',
            '30.png', '31.png', '32.png', '33.png', '34.png', '35.png',
            '36.png', '37.png', '39.png', '40.png', '41.png', '42.png',
            '43.png', '44.png', '45.png'
        ]
    }
];

const publicSponsersDir = path.join(__dirname, 'public', 'sponsers');

async function downloadAllSponsors() {
  let count = 0;
  for (const tier of SPONSORS_DATA) {
    const tierDir = path.join(publicSponsersDir, tier.title);
    if (!fs.existsSync(tierDir)) {
      fs.mkdirSync(tierDir, { recursive: true });
    }
    for (const file of tier.files) {
      const url = `https://mining-investment.vercel.app/sponsers/${encodeURIComponent(tier.title)}/${encodeURIComponent(file)}`;
      try {
        const res = await fetch(url);
        if (res.ok) {
          const buffer = await res.arrayBuffer();
          const dest = path.join(tierDir, file);
          fs.writeFileSync(dest, Buffer.from(buffer));
          count++;
          console.log(`[OK] ${tier.title}/${file}`);
        } else {
          console.log(`[FAIL ${res.status}] ${tier.title}/${file}`);
        }
      } catch (err) {
        console.log(`[ERR] ${tier.title}/${file}: ${err.message}`);
      }
    }
  }
  console.log(`\nSuccessfully downloaded ${count} sponsor logos to project public folder!`);
}

downloadAllSponsors();
