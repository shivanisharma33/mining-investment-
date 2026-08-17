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
    const url1 = `${baseUrl}/api/${ep}?filters[publishTo][$contains]=Mining Investment Week&populate=*`;
    const res1 = await fetch(url1);
    console.log(`[${res1.status}] ${ep} ($contains)`);
    
    const url2 = `${baseUrl}/api/${ep}?filters[publishTo][$containsi]=Mining Investment Week&populate=*`;
    const res2 = await fetch(url2);
    console.log(`[${res2.status}] ${ep} ($containsi)`);
  }
}

main();
