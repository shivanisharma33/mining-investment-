const baseUrl = 'https://typical-butterfly-3f86e59200.strapiapp.com';
const endpoints = [
  'agendas',
  'articles',
  'brochures',
  'media-partners',
  'participating-companies',
  'press-releases',
  'speakers'
];

async function main() {
  for (const ep of endpoints) {
    const url = `${baseUrl}/api/${ep}?filters[publishTo][$notNull]=true`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      console.log(`${ep}: not-null count = ${json.meta?.pagination?.total}`);
      if (json.data?.length > 0) {
        console.log(json.data.map(d => ({ id: d.id, publishTo: d.publishTo })));
      }
    } else {
      console.log(`${ep}: error ${res.status}`);
    }
  }
}

main();
