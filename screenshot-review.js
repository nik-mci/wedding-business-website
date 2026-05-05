const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const OUT = path.join(__dirname, 'review-screenshots');

const PAGES = [
  { name: 'home',         url: '/' },
  { name: 'services',     url: '/services' },
  { name: 'about',        url: '/about' },
  { name: 'contact',      url: '/contact' },
  { name: 'portfolio',    url: '/portfolio' },
  { name: 'destinations', url: '/destinations' },
  { name: 'faq',          url: '/faq' },
  { name: 'blog',         url: '/blog' },
];

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const { name, url } of PAGES) {
    console.log(`Capturing: ${name}`);
    await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    // dismiss loader if present
    await page.waitForTimeout(2000);
    // full-page screenshot
    await page.screenshot({
      path: path.join(OUT, `${name}-full.png`),
      fullPage: true,
    });
    // viewport-only (above the fold)
    await page.screenshot({
      path: path.join(OUT, `${name}-top.png`),
      fullPage: false,
    });
    console.log(`  ✓ ${name}`);
  }

  await browser.close();
  console.log('Done. Screenshots saved to:', OUT);
})();
