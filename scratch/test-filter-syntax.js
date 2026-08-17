const baseUrl = 'https://typical-butterfly-3f86e59200.strapiapp.com';

async function testQuery(name, query) {
  try {
    const url = `${baseUrl}/api/agendas?${query}`;
    const res = await fetch(url);
    const text = await res.text();
    console.log(`[${res.status}] ${name} -> ${query}`);
    if (res.status !== 200) {
      console.log('  Error:', text.slice(0, 300));
    } else {
      const json = JSON.parse(text);
      console.log(`  Count: ${json.data?.length}, Total: ${json.meta?.pagination?.total}`);
    }
  } catch (err) {
    console.log(`  Exception:`, err.message);
  }
}

async function main() {
  console.log('Testing filter queries on /api/agendas:');
  await testQuery('contains', 'filters[publishTo][$contains]=Mining Investment Week');
  await testQuery('containsi', 'filters[publishTo][$containsi]=Mining Investment Week');
  await testQuery('eq', 'filters[publishTo][$eq]=Mining Investment Week');
  await testQuery('in', 'filters[publishTo][$in][0]=Mining Investment Week');
  await testQuery('null check', 'filters[publishTo][$null]=true');
  await testQuery('not null check', 'filters[publishTo][$notNull]=true');
  await testQuery('complex or (contains or null)', 'filters[$or][0][publishTo][$contains]=Mining Investment Week&filters[$or][1][publishTo][$null]=true');
}

main();
