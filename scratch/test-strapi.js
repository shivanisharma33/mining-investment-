const endpoints = [
  'agendas',
  'articles',
  'brochures',
  'event-brochures',
  'media-partners',
  'participating-companies',
  'press-releases',
  'speakers'
];

async function main() {
  for (const ep of endpoints) {
    try {
      const url = `https://typical-butterfly-3f86e59200.strapiapp.com/api/${ep}?populate=*&pagination[pageSize]=2`;
      const res = await fetch(url);
      console.log(`=== ${ep} (Status: ${res.status}) ===`);
      if (res.ok) {
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
      } else {
        const text = await res.text();
        console.log(`Error body: ${text}`);
      }
    } catch (err) {
      console.error(`Fetch error for ${ep}:`, err.message);
    }
  }
}

main();
