const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("Launching headless browser via Playwright...");
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1400, height: 1000 } });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:8080/dev.html#negotiation-pitch-section ...");
  await page.goto('http://localhost:8080/dev.html#negotiation-pitch-section', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const pitchSection = page.locator('#negotiation-pitch-section');
  await pitchSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const artifactDir = '/Users/yepz/.gemini/antigravity-ide/brain/3971080a-5dfa-4fe9-9b6b-db0fa5e4053d';

  // 1. Capture Pitch Builder
  console.log("Capturing Pitch Builder screenshot...");
  await pitchSection.screenshot({ path: path.join(artifactDir, 'phase3_pitch_builder.png') });

  // 2. Switch to Negotiation Arena
  console.log("Switching to Negotiation Arena tab...");
  await page.click('#tab-btn-negotiation-arena');
  await page.waitForTimeout(800);

  // Click on collaborative option to trigger interaction
  const collabBtn = page.locator('.choice-tag.collab').first();
  if (await collabBtn.isVisible()) {
    await collabBtn.click();
    await page.waitForTimeout(800);
  }

  console.log("Capturing Negotiation Arena screenshot...");
  await pitchSection.screenshot({ path: path.join(artifactDir, 'phase3_negotiation_arena.png') });

  // 3. Switch to Phonetic & Syllable Stress Trainer
  console.log("Switching to Phonetic Trainer tab...");
  await page.click('#tab-btn-phonetic-trainer');
  await page.waitForTimeout(800);

  console.log("Capturing Phonetic Trainer screenshot...");
  await pitchSection.screenshot({ path: path.join(artifactDir, 'phase3_phonetic_trainer.png') });

  await browser.close();
  console.log("Screenshots captured successfully!");
})();
