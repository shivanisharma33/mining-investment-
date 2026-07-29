/**
 * Image Compression Script
 * Compresses all gallery and student photos to web-optimized JPEGs.
 * - Resizes to max 1600px wide (more than enough for any screen)
 * - Compresses to 80% JPEG quality
 * - Overwrites originals to keep paths working
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const DIRS = [
  path.join(__dirname, "public", "gallery photos", "MAIN EVENT"),
  path.join(__dirname, "public", "student", "STUDENTS"),
];

const MAX_WIDTH = 1600;
const JPEG_QUALITY = 75;

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") return;

  const originalSize = fs.statSync(filePath).size;
  const originalMB = (originalSize / 1024 / 1024).toFixed(2);

  // Skip if already small (under 500KB)
  if (originalSize < 500 * 1024) {
    console.log(`  SKIP ${path.basename(filePath)} (${originalMB} MB - already small)`);
    return;
  }

  try {
    const tempPath = filePath + ".tmp";

    await sharp(filePath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
      .toFile(tempPath);

    // Replace original with compressed version
    const newSize = fs.statSync(tempPath).size;
    const newMB = (newSize / 1024 / 1024).toFixed(2);
    const saved = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);

    console.log(`  ✓ ${path.basename(filePath)}: ${originalMB} MB → ${newMB} MB (${saved}% saved)`);
  } catch (err) {
    console.error(`  ✗ Error compressing ${path.basename(filePath)}:`, err.message);
    // Clean up temp file if it exists
    const tempPath = filePath + ".tmp";
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

async function main() {
  console.log("=== Image Compression Script ===");
  console.log(`Max width: ${MAX_WIDTH}px | JPEG quality: ${JPEG_QUALITY}%\n`);

  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`Directory not found: ${dir}`);
      continue;
    }

    const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
    console.log(`\nProcessing ${files.length} images in: ${path.basename(path.dirname(dir))}/${path.basename(dir)}`);

    for (const file of files) {
      await compressImage(path.join(dir, file));
    }
  }

  console.log("\n=== Done! ===");
}

main().catch(console.error);
