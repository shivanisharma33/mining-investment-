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
      const url = `https://typical-butterfly-3f86e59200.strapiapp.com/api/${ep}?populate=*&pagination[pageSize]=10`;
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`=== ${ep} (FAILED: ${res.status}) ===`);
        continue;
      }
      const json = await res.json();
      console.log(`=== ${ep} (Total: ${json.meta?.pagination?.total ?? json.data?.length}) ===`);
      if (json.data && json.data.length > 0) {
        const item = json.data[0];
        console.log('Fields:', Object.keys(item));
        console.log('Sample publishTo values:', json.data.map(d => ({ id: d.id, documentId: d.documentId, publishTo: d.publishTo })));
      } else {
        console.log('No records found.');
      }
    } catch (err) {
      console.error(`Error ${ep}:`, err.message);
    }
  }
}

main();
