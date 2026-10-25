const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const outDir = '/Users/yepz/.gemini/antigravity-ide/brain/db09558b-057f-4d21-bd60-40dadd6db075';
    
    page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

    await page.setViewport({ width: 1280, height: 900 });
    const appPath = 'file://' + path.resolve(__dirname, '../app.html');
    await page.goto(appPath, { waitUntil: 'networkidle0' });

    console.log('Testing sidebar buttons...');

    const views = ['world-map', 'skills-graph', 'feynman-tutor', 'micro-badges', 'glossary'];

    for (const view of views) {
        console.log(`\n--- Clicking data-view="${view}" ---`);
        const result = await page.evaluate((v) => {
            const btn = document.querySelector(`.ed-rail-btn[data-view="${v}"]`);
            if (!btn) return { error: 'Button not found' };
            
            // Check if button is disabled or covered
            const rect = btn.getBoundingClientRect();
            btn.click();
            
            const target = document.getElementById(`view-${v}`);
            const isVisible = target ? (target.style.display !== 'none' && window.getComputedStyle(target).display !== 'none') : false;
            
            return {
                found: true,
                rect,
                targetExists: !!target,
                isVisible,
                targetDisplay: target ? target.style.display : null,
                computedDisplay: target ? window.getComputedStyle(target).display : null,
                activeClass: target ? target.classList.contains('active') : false
            };
        }, view);
        console.log(`Result for ${view}:`, JSON.stringify(result));
        await page.screenshot({ path: path.join(outDir, `test_view_${view}.png`), fullPage: false });
    }

    await browser.close();
})();
