const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const outDir = '/Users/yepz/.gemini/antigravity-ide/brain/db09558b-057f-4d21-bd60-40dadd6db075';

    page.on('console', msg => {
        if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
    });
    page.on('pageerror', err => console.log('UNCAUGHT PAGE ERROR:', err.toString()));

    await page.setViewport({ width: 1280, height: 900 });
    const appPath = 'file://' + path.resolve(__dirname, '../app.html');
    await page.goto(appPath, { waitUntil: 'networkidle0' });

    console.log('--- 1. Testing A1 Unit 1 Open (Foundations UPFRONT) ---');
    const a1Check = await page.evaluate(() => {
        window.openMcerUnitModal('a1-u1', true);
        const modal = document.getElementById('modal-mcer-unit');
        const screenFund = document.getElementById('mcer-screen-fundamentals');
        const screenDiag = document.getElementById('mcer-screen-dialogue');
        const tabCrucible = document.getElementById('mcer-tab-crucible');
        const candoTitle = document.getElementById('mcer-fund-cando-title')?.textContent;
        const grammarTag = document.getElementById('mcer-fund-grammar-tag')?.textContent;
        const formulaChips = document.querySelectorAll('.mcer-formula-chip').length;
        const vocabCards = document.querySelectorAll('#mcer-fund-vocab-grid > div').length;
        const pinkBadges = document.querySelectorAll('.pink-stress-badge').length;
        const mistakes = document.querySelectorAll('#mcer-fund-mistakes-grid .mcer-mistake-card').length;

        return {
            modalOpen: modal && (modal.open || modal.hasAttribute('open')),
            fundVisible: screenFund && window.getComputedStyle(screenFund).display !== 'none',
            diagHidden: screenDiag && window.getComputedStyle(screenDiag).display === 'none',
            crucibleHidden: tabCrucible && window.getComputedStyle(tabCrucible).display === 'none',
            candoTitle,
            grammarTag,
            formulaChips,
            vocabCards,
            pinkBadges,
            mistakes
        };
    });
    console.log('A1 Unit 1 Check Result:', JSON.stringify(a1Check, null, 2));

    await page.screenshot({ path: path.join(outDir, 'verify_a1_u1_fundamentos.png'), fullPage: false });

    console.log('\n--- 2. Testing Stepper: Advance from Fundamentos to Diálogo ---');
    const stepCheck = await page.evaluate(() => {
        const nextBtn = document.getElementById('btn-mcer-fund-next');
        if (nextBtn) nextBtn.click();

        const screenFund = document.getElementById('mcer-screen-fundamentals');
        const screenDiag = document.getElementById('mcer-screen-dialogue');
        const dialogueBubbles = document.querySelectorAll('#mcer-dialogue-bubbles > div').length;
        const activeTab = document.querySelector('.mcer-tab-btn.active')?.dataset.mcerTab;

        return {
            activeTab,
            fundHidden: screenFund && window.getComputedStyle(screenFund).display === 'none',
            diagVisible: screenDiag && window.getComputedStyle(screenDiag).display !== 'none',
            dialogueBubbles
        };
    });
    console.log('Stepper Advance Result:', JSON.stringify(stepCheck, null, 2));

    await page.screenshot({ path: path.join(outDir, 'verify_a1_u1_dialogue.png'), fullPage: false });

    console.log('\n--- 3. Testing B1 Unit 1 Open (Crisol IA should be visible) ---');
    const b1Check = await page.evaluate(() => {
        window.openMcerUnitModal('b1-u1', true);
        const tabCrucible = document.getElementById('mcer-tab-crucible');
        return {
            crucibleVisible: tabCrucible && window.getComputedStyle(tabCrucible).display !== 'none',
            crucibleDisplay: tabCrucible ? window.getComputedStyle(tabCrucible).display : null
        };
    });
    console.log('B1 Unit 1 Check Result:', JSON.stringify(b1Check, null, 2));

    await page.screenshot({ path: path.join(outDir, 'verify_b1_u1_crucible_visible.png'), fullPage: false });

    await browser.close();
    console.log('\nAll tests completed successfully.');
})();
