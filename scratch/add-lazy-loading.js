/**
 * Add loading="lazy" and decoding="async" to all <img tags in components.
 * This makes images only load when they scroll into view.
 */
const fs = require("fs");
const path = require("path");

const COMPONENTS_DIR = path.join(__dirname, "src", "components");
const APP_DIR = path.join(__dirname, "src", "app");

// All tsx files in components and app directories
function getTsxFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...getTsxFiles(fullPath));
    } else if (item.name.endsWith(".tsx")) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = [...getTsxFiles(COMPONENTS_DIR), ...getTsxFiles(APP_DIR)];

let totalFixed = 0;

for (const filePath of files) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  // Match <img tags that don't already have loading="lazy"
  // Add loading="lazy" and decoding="async" after the opening <img
  content = content.replace(
    /(<img\b)(?![^>]*loading=)((?:[^>]*?))(\/?>)/g,
    (match, imgOpen, attrs, close) => {
      // Don't add to tags that already have loading
      if (attrs.includes('loading=')) return match;
      return `${imgOpen}${attrs}\n                loading="lazy"\n                decoding="async"\n              ${close}`;
    }
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    const count = (content.match(/loading="lazy"/g) || []).length;
    const basename = path.relative(__dirname, filePath);
    console.log(`  ✓ ${basename}: ${count} img tags updated`);
    totalFixed += count;
  }
}

console.log(`\n=== Done! ${totalFixed} total img tags now have lazy loading ===`);
