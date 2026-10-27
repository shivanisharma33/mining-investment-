const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");

const filesToConvert = [
  "PHOTO 1.jpg",
  "PHOTO2.jpg",
  "PHOTO3.jpg",
  "PHOTO 4.jpg",
  "PHOTO 5.jpg",
  "PHOTO 6.jpg",
  "PHOTO 7.jpg",
  "PHOTO 8.jpg",
  "PHOTO9.jpg",
  "PHOTO10.jpg",
  "coreshack.jpg",
];

async function processImage(fileName) {
  const inputPath = path.join(publicDir, fileName);
  if (!fs.existsSync(inputPath)) {
    console.log(`File not found: ${fileName}`);
    return;
  }

  const stat = fs.statSync(inputPath);
  const origMB = (stat.size / (1024 * 1024)).toFixed(2);
  const baseName = path.parse(fileName).name; // e.g. "PHOTO 4" or "PHOTO2"

  // 1. Output WebP with same base name
  const webpPath = path.join(publicDir, `${baseName}.webp`);
  // Also clean slug version without spaces: e.g. "photo-4.webp"
  const cleanSlug = baseName.toLowerCase().replace(/\s+/g, "-") + ".webp";
  const cleanWebpPath = path.join(publicDir, cleanSlug);

  try {
    // Generate WebP (1600px max, quality 80, effort 4)
    const pipeline = sharp(inputPath)
      .rotate() // preserve orientation
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 });

    await pipeline.toFile(webpPath);
    const webpStat = fs.statSync(webpPath);
    const webpKB = (webpStat.size / 1024).toFixed(1);

    // Copy to clean slug as well
    fs.copyFileSync(webpPath, cleanWebpPath);

    // 2. Also optimize the original JPEG in place if it's over 500KB
    if (stat.size > 500 * 1024) {
      const tempJpg = inputPath + ".tmp";
      await sharp(inputPath)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true, mozjpeg: true })
        .toFile(tempJpg);

      fs.unlinkSync(inputPath);
      fs.renameSync(tempJpg, inputPath);
      const newJpgStat = fs.statSync(inputPath);
      const newJpgKB = (newJpgStat.size / 1024).toFixed(1);
      console.log(`✓ ${fileName}: ${origMB}MB -> WebP: ${webpKB}KB, JPG optimized: ${newJpgKB}KB`);
    } else {
      console.log(`✓ ${fileName}: ${origMB}MB -> WebP: ${webpKB}KB`);
    }
  } catch (err) {
    console.error(`✗ Error processing ${fileName}:`, err.message);
  }
}

async function main() {
  console.log("=== Converting Gallery & Homepage Images to WebP ===");
  for (const f of filesToConvert) {
    await processImage(f);
  }
  console.log("=== Conversion Complete ===");
}

main().catch(console.error);
