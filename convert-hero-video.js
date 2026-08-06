/**
 * Convert the hero .mov video to a web-optimized MP4.
 *
 * Usage:  node convert-hero-video.js
 *
 * Produces a much smaller H.264 MP4 with:
 *   - faststart (moov atom at front for instant streaming)
 *   - CRF 28 for aggressive but still good-looking compression
 *   - 720p max height (plenty for a background video)
 *   - no audio (it's a muted background video)
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

let ffmpegPath;
try {
  ffmpegPath = require("ffmpeg-static");
} catch {
  console.error("ffmpeg-static not installed. Run: npm install --save-dev ffmpeg-static");
  process.exit(1);
}

const INPUT = path.join(__dirname, "public", "fwdboardmemberphotos", "Mining investment video .mov");
const OUTPUT = path.join(__dirname, "public", "fwdboardmemberphotos", "hero-bg.mp4");

if (!fs.existsSync(INPUT)) {
  console.error("Source video not found:", INPUT);
  process.exit(1);
}

console.log("Converting .mov → .mp4 (web-optimized)…");
console.log("  Input :", INPUT, `(${(fs.statSync(INPUT).size / 1024 / 1024).toFixed(1)} MB)`);

const cmd = [
  `"${ffmpegPath}"`,
  `-i "${INPUT}"`,
  `-c:v libx264`,          // H.264 codec — universal browser support
  `-preset slow`,          // better compression at cost of encode time
  `-crf 28`,               // quality level (lower = bigger; 28 is good for bg video)
  `-vf "scale=-2:720"`,    // cap at 720p height
  `-an`,                   // strip audio — it's muted anyway
  `-movflags +faststart`,  // move moov atom to front for instant streaming
  `-y`,                    // overwrite if exists
  `"${OUTPUT}"`,
].join(" ");

try {
  execSync(cmd, { stdio: "inherit" });
  const outSize = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(1);
  console.log(`\n✅ Done! Output: ${OUTPUT} (${outSize} MB)`);
} catch (err) {
  console.error("ffmpeg failed:", err.message);
  process.exit(1);
}
