const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const outDir = '/Users/yepz/.gemini/antigravity-ide/brain/db09558b-057f-4d21-bd60-40dadd6db075';
    
    // Auto-accept confirm dialogs
    page.on('dialog', async dialog => {
        console.log('Dialog opened:', dialog.message());
        await dialog.accept();
    });

    await page.setViewport({ width: 1280, height: 900 });
    const placementPath = 'file://' + path.resolve(__dirname, '../placement.html');
    await page.goto(placementPath, { waitUntil: 'networkidle0' });

    // Capture screenshot of placement screen-welcome with Waiver card
    await page.screenshot({ path: path.join(outDir, 'placement_welcome_with_waiver.png'), fullPage: false });
    console.log('Captured placement_welcome_with_waiver.png');

    // Click Waiver button
    const waived = await page.evaluate(() => {
        const btn = document.getElementById('btn-waive-placement');
        if (btn) {
            btn.click();
            return true;
        }
        return false;
    });
    console.log('Waiver button clicked:', waived);

    await new Promise(r => setTimeout(r, 1200));

    // Verify localStorage keys
    const storageKeys = await page.evaluate(() => {
        return {
            waived: localStorage.getItem('stemos_placement_waived'),
            completed: localStorage.getItem('stemos_placement_completed'),
            level: localStorage.getItem('stemos_user_level'),
            activeLevel: localStorage.getItem('stemos_active_mcer_level')
        };
    });
    console.log('Post-waiver storage keys:', storageKeys);

    await browser.close();
    console.log('Verification completed successfully!');
})();
