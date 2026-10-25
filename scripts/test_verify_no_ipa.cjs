const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const outDir = '/Users/yepz/.gemini/antigravity-ide/brain/db09558b-057f-4d21-bd60-40dadd6db075';

    await page.setViewport({ width: 1280, height: 900 });
    const appPath = 'file://' + path.resolve(__dirname, '../app.html');
    await page.goto(appPath, { waitUntil: 'networkidle0' });

    console.log('--- Checking for any visible IPA slash notation in A1 Unit 1 ---');
    const a1Check = await page.evaluate(() => {
        window.openMcerUnitModal('a1-u1', true);
        
        // Scan all visible text within modal
        const modal = document.getElementById('modal-mcer-unit');
        const text = modal ? modal.innerText : '';
        
        // Look for patterns like /.../ with phonetic characters or common words
        const slashMatches = text.match(/\/[^\/\n\s]{2,}\//g) || [];
        
        // Also check Tab 3 (Vocab)
        const tabVocab = document.querySelector('.mcer-tab-btn[data-mcer-tab="vocab"]');
        if (tabVocab) tabVocab.click();
        const vocabText = modal ? modal.innerText : '';
        const vocabSlashMatches = vocabText.match(/\/[^\/\n\s]{2,}\//g) || [];

        return {
            fundSlashMatches: slashMatches,
            vocabSlashMatches: vocabSlashMatches,
            containsLoggd: text.includes('/lɔːɡd/') || vocabText.includes('/lɔːɡd/'),
            containsAnySlashIpa: slashMatches.length > 0 || vocabSlashMatches.length > 0
        };
    });

    console.log('A1 Unit 1 Check Result:', JSON.stringify(a1Check, null, 2));

    await page.screenshot({ path: path.join(outDir, 'verify_no_ipa_vocab_tab.png'), fullPage: false });

    // Switch back to fundamentals
    await page.evaluate(() => {
        const tabFund = document.querySelector('.mcer-tab-btn[data-mcer-tab="fundamentals"]');
        if (tabFund) tabFund.click();
    });
    await page.screenshot({ path: path.join(outDir, 'verify_no_ipa_fundamentals_tab.png'), fullPage: false });

    await browser.close();
    console.log('\nVerification complete.');
})();
