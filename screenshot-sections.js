const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const OUT = path.join(__dirname, 'review-screenshots');

// Disable reveal animations so content is visible
const disableAnimations = `
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  // Hide loader
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
`;

const SECTIONS = [
  { name: 'home-services',     url: '/',           scrollY: 800  },
  { name: 'home-process',      url: '/',           scrollY: 1700 },
  { name: 'home-memory',       url: '/',           scrollY: 2600 },
  { name: 'home-hashtag',      url: '/',           scrollY: 3500 },
  { name: 'home-ideas',        url: '/',           scrollY: 4200 },
  { name: 'home-testimonials', url: '/',           scrollY: 5200 },
  { name: 'home-cta',          url: '/',           scrollY: 6200 },
  { name: 'services-hero',     url: '/services',   scrollY: 0    },
  { name: 'services-s1',       url: '/services',   scrollY: 400  },
  { name: 'services-s3',       url: '/services',   scrollY: 1200 },
  { name: 'services-addons',   url: '/services',   scrollY: 4000 },
  { name: 'about-hero',        url: '/about',      scrollY: 0    },
  { name: 'about-story',       url: '/about',      scrollY: 600  },
  { name: 'about-values',      url: '/about',      scrollY: 1800 },
  { name: 'about-stats',       url: '/about',      scrollY: 2600 },
  { name: 'about-team',        url: '/about',      scrollY: 3400 },
  { name: 'portfolio-top',     url: '/portfolio',  scrollY: 0    },
  { name: 'portfolio-cards',   url: '/portfolio',  scrollY: 400  },
  { name: 'faq-top',           url: '/faq',        scrollY: 0    },
  { name: 'faq-content',       url: '/faq',        scrollY: 400  },
  { name: 'blog-top',          url: '/blog',       scrollY: 0    },
  { name: 'destinations-top',  url: '/destinations', scrollY: 0  },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  let lastUrl = null;
  for (const { name, url, scrollY } of SECTIONS) {
    if (url !== lastUrl) {
      await page.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(1500);
      await page.evaluate(disableAnimations);
      lastUrl = url;
    }
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT, `${name}.png`) });
    console.log(`✓ ${name}`);
  }

  await browser.close();
})();
