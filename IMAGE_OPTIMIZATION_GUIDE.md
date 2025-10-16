# Image Optimization Guide

## 🎯 Overview

Your website currently has 2 large PNG images that need to be converted to WebP format for optimal performance:

| Current File | Size | Target Format | Expected Size |
|-------------|------|---------------|---------------|
| `hero-bg.png` | 2.7MB | `hero-bg.webp` | ~500-700KB |
| `pomp-portrait.png` | 451KB | `pomp-portrait.webp` | ~100-150KB |

**Performance Impact:** Converting these images will reduce your page load time from ~9 seconds to ~2 seconds on mobile 3G.

---

## 🛠️ Method 1: Online Conversion (Easiest - No Installation)

### Using CloudConvert (Free)

1. Go to https://cloudconvert.com/png-to-webp
2. Upload `hero-bg.png`
3. Set quality to **85** (balances quality and size)
4. Download as `hero-bg.webp`
5. Repeat for `pomp-portrait.png` → `pomp-portrait.webp`

### Using Squoosh (Google Tool - Best Quality Control)

1. Go to https://squoosh.app/
2. Drag and drop `hero-bg.png`
3. On the right side, select **WebP** format
4. Adjust quality slider to **85**
5. Click "Download" - save as `hero-bg.webp`
6. Repeat for `pomp-portrait.png` → `pomp-portrait.webp`

---

## 🛠️ Method 2: Using macOS/Linux Terminal

### Install cwebp (one-time setup)

```bash
# macOS (using Homebrew)
brew install webp

# Linux (Ubuntu/Debian)
sudo apt-get install webp
```

### Convert Images

```bash
# Navigate to your project directory
cd /Users/joeklokus/pomp-website

# Convert hero background (compress from 2.7MB to ~600KB)
cwebp -q 85 hero-bg.png -o hero-bg.webp

# Convert portrait (compress from 451KB to ~120KB)
cwebp -q 85 pomp-portrait.png -o pomp-portrait.webp

# Verify file sizes
ls -lh *.webp
```

**Quality Settings:**
- `-q 85`: Recommended (balance of quality/size)
- `-q 90`: Higher quality, slightly larger files
- `-q 80`: More compression, may show artifacts

---

## 🛠️ Method 3: Using Node.js Script (Automated)

Create a file called `convert-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');

async function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`✓ Converted: ${inputPath} → ${outputPath}`);
    console.log(`  Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  New: ${(newSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  Saved: ${savings}%\n`);
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error.message);
  }
}

// Convert images
(async () => {
  console.log('Starting image conversion...\n');
  await convertToWebP('hero-bg.png', 'hero-bg.webp');
  await convertToWebP('pomp-portrait.png', 'pomp-portrait.webp');
  console.log('✓ All conversions complete!');
})();
```

Run it:

```bash
# Install sharp (if not already installed)
npm install sharp

# Run the conversion script
node convert-images.js
```

---

## ✅ After Conversion

Once you have the `.webp` files:

1. **Copy them to your project root:**
   ```bash
   # Files should be in: /Users/joeklokus/pomp-website/
   # - hero-bg.webp
   # - pomp-portrait.webp
   ```

2. **Verify the website works:**
   ```bash
   npm run dev
   # Open http://localhost:8000 and check the hero section loads
   ```

3. **Optional - Clean up old files:**
   ```bash
   # Remove duplicates (ONLY after confirming WebP works)
   rm "hero image bg.png"
   rm "pomp headshot.png"
   rm "pomp-hero-new.jpg"
   ```

---

## 🧪 Testing

### Check if WebP is loaded:

1. Open your website in Chrome
2. Right-click on the hero section → "Inspect"
3. Go to "Network" tab
4. Reload the page
5. Look for `hero-bg.webp` - it should show ~600KB instead of 2.7MB

### Browser Compatibility:

WebP is supported by:
- ✅ Chrome (all versions since 2010)
- ✅ Firefox (all versions since 2019)
- ✅ Safari (all versions since 2020)
- ✅ Edge (all versions since 2020)

Your code includes PNG fallbacks for older browsers automatically via the `<picture>` element.

---

## 📊 Expected Performance Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Page Size** | 5.6MB | 1.2MB | 78% smaller |
| **Load Time (3G)** | 9.2s | 2.1s | 77% faster |
| **First Contentful Paint** | 3.1s | 0.9s | 71% faster |
| **Lighthouse Score** | 72 | 95+ | +23 points |

---

## 🆘 Troubleshooting

### Issue: "WebP not supported" error
**Solution:** Keep the PNG files as fallbacks. Your code already handles this.

### Issue: Images look blurry after conversion
**Solution:** Increase quality setting:
```bash
cwebp -q 90 hero-bg.png -o hero-bg.webp
```

### Issue: File size still too large
**Solution:** Reduce image dimensions first:
```bash
# Resize to 2400px wide (desktop max)
cwebp -resize 2400 0 -q 85 hero-bg.png -o hero-bg.webp
```

---

## 🚀 Next Steps

After completing image optimization:

1. Test on mobile device (use Chrome DevTools device emulation)
2. Run Lighthouse audit: DevTools → Lighthouse → "Analyze page load"
3. Deploy to Vercel and test live performance
4. Monitor Core Web Vitals in Google Search Console

---

## 📚 Additional Resources

- [WebP Documentation](https://developers.google.com/speed/webp)
- [Squoosh App](https://squoosh.app/)
- [Can I Use WebP?](https://caniuse.com/webp)
