const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const filePath = 'file://' + path.resolve(__dirname, '../app.html');
    const outDir = '/Users/yepz/.gemini/antigravity-ide/brain/db09558b-057f-4d21-bd60-40dadd6db075';

    console.log('Navigating to', filePath);
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Ensure localStorage does NOT have completed placement
    await page.evaluate(() => {
        localStorage.removeItem('stemos_placement_test');
        localStorage.removeItem('stemos_placement_result');
        localStorage.removeItem('stemos_diagnostic_passport');
        localStorage.removeItem('stemos_user_level');
        localStorage.removeItem('stemos_active_mcer_level');
        localStorage.removeItem('stemos_theme'); // test default theme
        if (typeof initThemeSynchronizer === 'function') initThemeSynchronizer();
        if (typeof syncUserPlacementBadge === 'function') syncUserPlacementBadge();
    });

    // Check html classes for light theme
    const rootClasses = await page.evaluate(() => document.documentElement.className);
    console.log('Root HTML classes:', rootClasses);

    // Capture desktop screenshot
    await page.screenshot({ path: path.join(outDir, 'app_light_desktop.png'), fullPage: false });
    console.log('Captured app_light_desktop.png');

    // Switch to MCER tab if not already on it
    await page.evaluate(() => {
        const mcerTab = document.querySelector('[data-panel="mcer-catalog"]');
        if (mcerTab) mcerTab.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture MCER catalog view
    await page.screenshot({ path: path.join(outDir, 'app_light_mcer_catalog.png'), fullPage: false });
    console.log('Captured app_light_mcer_catalog.png');

    // Click on A1 Unit 1 card: should open modal directly!
    const unit1Clicked = await page.evaluate(() => {
        const u1Card = document.querySelector('.ed-unit-card[data-unit-id="a1-u1"]');
        if (u1Card) {
            u1Card.click();
            return true;
        }
        return false;
    });
    console.log('Unit 1 card clicked:', unit1Clicked);
    await new Promise(r => setTimeout(r, 800));

    // Check if modal-mcer-unit is open
    const isModalOpen = await page.evaluate(() => {
        const modal = document.getElementById('modal-mcer-unit');
        return modal && (modal.open || modal.hasAttribute('open') || window.getComputedStyle(modal).display !== 'none');
    });
    console.log('Is modal-mcer-unit open for A1?', isModalOpen);
    await page.screenshot({ path: path.join(outDir, 'app_light_a1_unit_modal.png'), fullPage: false });

    // Close modal
    await page.evaluate(() => {
        const closeBtn = document.getElementById('mcer-unit-close');
        if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Now test higher level unit like B1 unit: should open placement required modal
    const b1Clicked = await page.evaluate(() => {
        const filterB1 = document.querySelector('.ed-filter-chip[data-filter-level="B1"]');
        if (filterB1) filterB1.click();
        const b1Card = document.querySelector('.ed-unit-card[data-unit-id="b1-u1"]');
        if (b1Card) {
            b1Card.click();
            return true;
        }
        return false;
    });
    console.log('B1 card clicked:', b1Clicked);
    await new Promise(r => setTimeout(r, 800));

    const isPlacementModalOpen = await page.evaluate(() => {
        const modal = document.getElementById('modal-placement-required');
        return modal && (modal.open || modal.hasAttribute('open') || window.getComputedStyle(modal).display !== 'none');
    });
    console.log('Is modal-placement-required open for B1?', isPlacementModalOpen);
    await page.screenshot({ path: path.join(outDir, 'app_light_b1_placement_modal.png'), fullPage: false });

    // Test Mobile Viewport
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => {
        const closePlacement = document.getElementById('modal-placement-required-close');
        if (closePlacement) closePlacement.click();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(outDir, 'app_light_mobile.png'), fullPage: false });
    console.log('Captured app_light_mobile.png');

    await browser.close();
    console.log('Verification completed successfully!');
})();
