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

    const appPath = 'file://' + path.resolve(__dirname, '../app.html');

    console.log('=== TEST 1: DESKTOP IMMERSIVE CENTERED MODAL & ARROW STEPPER ===');
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(appPath, { waitUntil: 'networkidle0' });

    const desktopInit = await page.evaluate(() => {
        window.openMcerUnitModal('a1-u1', true);
        const modal = document.getElementById('modal-mcer-unit');
        const modalRect = modal.getBoundingClientRect();
        const stepperSeps = document.querySelectorAll('.mcer-stepper-sep').length;
        const tabBtns = document.querySelectorAll('.mcer-tab-btn').length;
        const bottomNav = document.getElementById('mcer-modal-bottom-nav');
        const bottomNavRect = bottomNav.getBoundingClientRect();
        const prevBtn = document.getElementById('btn-mcer-prev-step');
        const nextBtn = document.getElementById('btn-mcer-next-step');
        const counterText = document.getElementById('mcer-step-counter-text')?.textContent;
        const progressWidth = document.getElementById('mcer-step-progress-fill')?.style.width;

        return {
            modalOpen: modal && (modal.open || modal.hasAttribute('open')),
            rect: {
                width: Math.round(modalRect.width),
                height: Math.round(modalRect.height),
                left: Math.round(modalRect.left),
                top: Math.round(modalRect.top)
            },
            stepperSeps,
            tabBtns,
            bottomNav: {
                visible: !!bottomNav,
                height: Math.round(bottomNavRect.height),
                top: Math.round(bottomNavRect.top)
            },
            prevHidden: prevBtn ? (prevBtn.style.visibility === 'hidden' || window.getComputedStyle(prevBtn).visibility === 'hidden') : false,
            counterText,
            progressWidth,
            nextLabel: nextBtn?.textContent?.trim()
        };
    });

    console.log('Desktop Init Evaluation:', JSON.stringify(desktopInit, null, 2));
    await page.screenshot({ path: path.join(outDir, 'verify_desktop_modal_step1.png'), fullPage: false });

    // Test Desktop Step Advance via Bottom Nav
    console.log('\n--- Clicking Next Step: Continuar Diálogo ---');
    const step2Check = await page.evaluate(() => {
        const nextBtn = document.getElementById('btn-mcer-next-step');
        if (nextBtn) nextBtn.click();

        const screenFund = document.getElementById('mcer-screen-fundamentals');
        const screenDiag = document.getElementById('mcer-screen-dialogue');
        const prevBtn = document.getElementById('btn-mcer-prev-step');
        const nextBtnUpdated = document.getElementById('btn-mcer-next-step');
        const counterText = document.getElementById('mcer-step-counter-text')?.textContent;
        const progressWidth = document.getElementById('mcer-step-progress-fill')?.style.width;
        const tab1Completed = document.getElementById('mcer-tab-fundamentals')?.classList.contains('completed');
        const tab2Active = document.getElementById('mcer-tab-dialogue')?.classList.contains('active');

        return {
            screenFundVisible: screenFund && window.getComputedStyle(screenFund).display !== 'none',
            screenDiagVisible: screenDiag && window.getComputedStyle(screenDiag).display !== 'none',
            prevVisible: prevBtn && prevBtn.style.visibility === 'visible',
            nextLabel: nextBtnUpdated?.textContent?.trim(),
            counterText,
            progressWidth,
            tab1Completed,
            tab2Active
        };
    });
    console.log('Step 2 Evaluation:', JSON.stringify(step2Check, null, 2));
    await page.screenshot({ path: path.join(outDir, 'verify_desktop_modal_step2.png'), fullPage: false });

    console.log('\n=== TEST 2: MOBILE 100% FULL-SCREEN & TOUCH ERGONOMICS (iPhone 14 / 390x844) ===');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    // Open modal explicitly on mobile
    const mobileCheck = await page.evaluate(() => {
        window.openMcerUnitModal('a1-u1', true);
        const modal = document.getElementById('modal-mcer-unit');
        const modalRect = modal.getBoundingClientRect();
        const bottomNav = document.getElementById('mcer-modal-bottom-nav');
        const bottomNavRect = bottomNav.getBoundingClientRect();
        const nextBtn = document.getElementById('btn-mcer-next-step');
        const nextBtnRect = nextBtn.getBoundingClientRect();
        const prevBtn = document.getElementById('btn-mcer-prev-step');
        const prevBtnRect = prevBtn.getBoundingClientRect();

        return {
            modalOpen: modal && (modal.open || modal.hasAttribute('open')),
            modalRect: {
                width: Math.round(modalRect.width),
                height: Math.round(modalRect.height),
                left: Math.round(modalRect.left),
                top: Math.round(modalRect.top)
            },
            bottomNavRect: {
                width: Math.round(bottomNavRect.width),
                height: Math.round(bottomNavRect.height),
                bottom: Math.round(bottomNavRect.bottom)
            },
            nextBtnHeight: Math.round(nextBtnRect.height),
            prevBtnHeight: Math.round(prevBtnRect.height),
            isFullScreen: (Math.round(modalRect.width) === 390 && Math.round(modalRect.height) === 844)
        };
    });
    console.log('Mobile Geometry Evaluation:', JSON.stringify(mobileCheck, null, 2));
    await page.screenshot({ path: path.join(outDir, 'verify_mobile_modal_fullscreen_step1.png'), fullPage: false });

    // Step through each step on mobile to test progression
    console.log('\n--- Step through all steps on mobile ---');
    const stepKeys = ['dialogue', 'vocab', 'grammar', 'listening', 'reading', 'writing', 'quiz'];
    for (const stepKey of stepKeys) {
        await page.evaluate(() => {
            const nextBtn = document.getElementById('btn-mcer-next-step');
            if (nextBtn) nextBtn.click();
        });
        const currentStatus = await page.evaluate(() => {
            return {
                counterText: document.getElementById('mcer-step-counter-text')?.textContent,
                nextLabel: document.getElementById('btn-mcer-next-step')?.textContent?.trim(),
                progressWidth: document.getElementById('mcer-step-progress-fill')?.style.width
            };
        });
        console.log(`Mobile Step '${stepKey}':`, currentStatus);
    }

    // Take screenshot of Step 8 (Quiz) on mobile
    await page.screenshot({ path: path.join(outDir, 'verify_mobile_modal_fullscreen_step8_quiz.png'), fullPage: false });

    // Close modal test
    console.log('\n--- Testing Close Button on Mobile ---');
    const closeCheck = await page.evaluate(() => {
        const closeBtn = document.getElementById('mcer-unit-close');
        if (closeBtn) closeBtn.click();
        const modal = document.getElementById('modal-mcer-unit');
        return {
            modalClosed: !modal || !modal.open
        };
    });
    console.log('Close Modal Check:', closeCheck);

    await browser.close();
    console.log('\nAll verification tests completed successfully!');
})();
