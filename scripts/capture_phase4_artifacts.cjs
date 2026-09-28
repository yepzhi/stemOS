/**
 * scripts/capture_phase4_artifacts.cjs
 * Visual proof generator for Phase 4.1 & 4.2:
 * 1. Corporate L&D Dashboard (Consolidated Enterprise view)
 * 2. Plant Drill-down (Tijuana Medical Cluster)
 * 3. Official ISO 9001:2015 Clause 7.2 Executive Audit Dossier Modal
 * 4. SCORM 1.2 / 2004 LMS Exporter & SSO Status
 */

const { chromium } = require('playwright');
const path = require('path');

(async () => {
  console.log("Launching headless browser via Playwright...");
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:8080/dev.html#corporate-ld-section ...");
  await page.goto('http://localhost:8080/dev.html#corporate-ld-section', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const ldSection = page.locator('#corporate-ld-section');
  await ldSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const artifactDir = '/Users/yepz/.gemini/antigravity-ide/brain/3971080a-5dfa-4fe9-9b6b-db0fa5e4053d';

  // 1. Capture Consolidated Dashboard
  console.log("Capturing Corporate L&D Dashboard (Consolidated)...");
  await ldSection.screenshot({ path: path.join(artifactDir, 'phase4_corporate_ld_dashboard.png') });

  // 2. Switch to Tijuana Medical Device Cluster
  console.log("Switching to Tijuana Medical Cluster...");
  await page.click('.ld-plant-chip[data-plant="tijuana"]');
  await page.waitForTimeout(600);
  console.log("Capturing Tijuana Plant Drill-down...");
  await ldSection.screenshot({ path: path.join(artifactDir, 'phase4_plant_drilldown_tijuana.png') });

  // 3. Open ISO 9001 Audit Dossier Modal
  console.log("Opening ISO 9001 Executive Audit Dossier Modal...");
  await page.click('#btn-preview-audit-dossier');
  await page.waitForTimeout(700);
  const auditModalCard = page.locator('#audit-dossier-modal .cs-modal-card');
  if (await auditModalCard.isVisible()) {
    console.log("Capturing Executive Audit Dossier Modal...");
    await auditModalCard.screenshot({ path: path.join(artifactDir, 'phase4_audit_dossier_modal.png') });
    await page.click('#btn-close-audit-modal');
    await page.waitForTimeout(500);
  }

  // 4. Trigger SCORM Package Generation
  console.log("Triggering SCORM LMS Package Exporter...");
  await page.click('#btn-generate-scorm-zip');
  await page.waitForTimeout(600);
  console.log("Capturing SCORM LMS Exporter status...");
  await ldSection.screenshot({ path: path.join(artifactDir, 'phase4_scorm_lms_exporter.png') });

  await browser.close();
  console.log("All Phase 4 visual artifacts captured successfully!");
})();
