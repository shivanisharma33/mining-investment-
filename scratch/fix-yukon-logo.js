const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogo() {
  const inputPath = path.join(__dirname, '../public/Invest_Yukon.png');
  const backupPath = path.join(__dirname, '../public/Invest_Yukon_original.png');
  const outputPath = path.join(__dirname, '../public/Invest_Yukon.png');

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
  }

  const image = sharp(backupPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Let's iterate through pixels
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = channels === 4 ? data[i + 3] : 255;

    if (a > 10) {
      // Check if pixel is white/near-white (high R, G, B with low color saturation)
      // Gold/yellow has high R, medium G, low B (e.g. R > 200, G > 120, B < 100)
      const isGold = (r > 180 && g > 120 && b < 100) || (r - b > 80 && g - b > 40);
      
      if (!isGold) {
        // This is the white/light part ("INV", "YUK", "YUKON MINING ALLIANCE")
        // We set it to dark black/charcoal #111827 (r: 17, g: 24, b: 39) or pure black (r: 0, g: 0, b: 0)
        // Keep the alpha as is (smooth antialiasing)
        data[i] = 17;     // R
        data[i + 1] = 24; // G
        data[i + 2] = 39; // B
      }
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  }).png().toFile(outputPath);

  console.log(`Updated ${outputPath} successfully (${width}x${height})`);
}

processLogo().catch(console.error);
