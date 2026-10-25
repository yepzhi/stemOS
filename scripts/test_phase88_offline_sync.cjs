/**
 * Test Suite: Phase 88 — Enterprise Offline Sync Engine & IndexedDB Mutation Queue
 * Validates:
 * 1. content/stemos_sync.js module structure & public API.
 * 2. Three-tier conflict resolution engine (XP_ACCUMULATIVE, MAX_PROGRESS, LWW).
 * 3. Mutation enqueueing and queue flush lifecycle with exponential backoff calculation.
 * 4. Service Worker v6.8.0 cache bump and pre-caching of stemos_sync.js.
 * 5. Script tag presence with defer across 7 key educational portals.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT_DIR = path.resolve(__dirname, '..');

console.log('🔄 ==============================================================');
console.log('🔄 STARTING PHASE 88: ENTERPRISE OFFLINE SYNC ENGINE TEST');
console.log('🔄 ==============================================================\n');

let totalTests = 0;
let passedTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${description}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${description}`);
    console.error(`     Error: ${err.message}`);
    process.exitCode = 1;
  }
}

async function testAsync(description, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${description}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${description}`);
    console.error(`     Error: ${err.message}`);
    process.exitCode = 1;
  }
}

async function runAllTests() {
  // ── SUITE 1: Module File & Public API ──
  console.log('📦 SUITE 1: Sync Engine Module & API Interface');
  const syncPath = path.join(ROOT_DIR, 'content', 'stemos_sync.js');
  test('content/stemos_sync.js exists', () => {
    assert(fs.existsSync(syncPath), 'File must exist');
  });

  const SyncEngine = require(syncPath);

  test('SyncEngine exports version string', () => {
    assert(typeof SyncEngine.version === 'string', 'Version string present');
    assert(SyncEngine.version.includes('phase88'), 'Version notes phase88');
  });

  test('SyncEngine exposes all core mutation and sync methods', () => {
    assert.strictEqual(typeof SyncEngine.enqueueMutation, 'function');
    assert.strictEqual(typeof SyncEngine.getPendingMutations, 'function');
    assert.strictEqual(typeof SyncEngine.resolveConflict, 'function');
    assert.strictEqual(typeof SyncEngine.flushQueue, 'function');
    assert.strictEqual(typeof SyncEngine.clearQueue, 'function');
    assert.strictEqual(typeof SyncEngine.isOnline, 'function');
    assert.strictEqual(typeof SyncEngine.onSyncEvent, 'function');
  });

  // ── SUITE 2: Conflict Resolution Strategies ──
  console.log('\n⚔️ SUITE 2: Multi-Strategy Conflict Resolution Engine');

  test('XP_ACCUMULATIVE strategy performs additive merge without overwriting server totals', () => {
    const serverDoc = { xp: 1200, coins: 45, level: 3 };
    const clientDoc = { xpEarnedOffline: 350, coinsEarnedOffline: 15 };
    const merged = SyncEngine.resolveConflict(clientDoc, serverDoc, 'XP_ACCUMULATIVE');

    assert.strictEqual(merged.xp, 1550, 'XP correctly summed (1200 + 350)');
    assert.strictEqual(merged.coins, 60, 'Coins correctly summed (45 + 15)');
    assert(merged.lastSyncTimestamp, 'Timestamp assigned');
  });

  test('MAX_PROGRESS strategy guarantees monotonic non-decreasing level and lesson progress', () => {
    const serverDoc = { level: 4, completedLessonsCount: 12 };
    const clientDoc = { level: 5, completedLessonsCount: 15 }; // Offline player advanced
    const merged = SyncEngine.resolveConflict(clientDoc, serverDoc, 'MAX_PROGRESS');

    assert.strictEqual(merged.level, 5, 'Takes higher level');
    assert.strictEqual(merged.completedLessonsCount, 15, 'Takes higher completed lessons count');

    // Case where server doc was ahead
    const serverDocAhead = { level: 6, completedLessonsCount: 20 };
    const clientDocBehind = { level: 5, completedLessonsCount: 18 };
    const merged2 = SyncEngine.resolveConflict(clientDocBehind, serverDocAhead, 'MAX_PROGRESS');

    assert.strictEqual(merged2.level, 6, 'Preserves higher server level');
    assert.strictEqual(merged2.completedLessonsCount, 20, 'Preserves higher server lesson count');
  });

  test('LWW (Last-Write-Wins) strategy chooses document with most recent timestamp', () => {
    const olderDoc = { title: 'Old Lesson Note', updatedAt: '2026-10-20T10:00:00Z' };
    const newerDoc = { title: 'New Lesson Note', updatedAt: '2026-10-21T15:30:00Z' };

    const resolvedClientNewer = SyncEngine.resolveConflict(newerDoc, olderDoc, 'LWW');
    assert.strictEqual(resolvedClientNewer.title, 'New Lesson Note', 'Newer client win');

    const resolvedServerNewer = SyncEngine.resolveConflict(olderDoc, newerDoc, 'LWW');
    assert.strictEqual(resolvedServerNewer.title, 'New Lesson Note', 'Newer server win');
  });

  // ── SUITE 3: Mutation Lifecycle & Queue Simulation ──
  console.log('\n📬 SUITE 3: Offline Mutation Queue & Flush Lifecycle');

  await testAsync('enqueueMutation records pending item into memory queue in Node environment', async () => {
    await SyncEngine.clearQueue();
    const mutation = await SyncEngine.enqueueMutation('lesson_progress', 'complete_module', {
      moduleId: 'semi-01-photolithography',
      score: 98,
      xpEarned: 100
    }, { strategy: 'XP_ACCUMULATIVE' });

    assert(mutation.id.startsWith('mut_'), 'Generated mutation ID');
    assert.strictEqual(mutation.entityType, 'lesson_progress');
    assert.strictEqual(mutation.status, 'pending');

    const pending = await SyncEngine.getPendingMutations();
    assert.strictEqual(pending.length, 1, '1 item pending in queue');
    assert.strictEqual(pending[0].payload.moduleId, 'semi-01-photolithography');
  });

  await testAsync('flushQueue executes sync processor and updates mutation statuses', async () => {
    let sentCount = 0;
    const result = await SyncEngine.flushQueue(async (m) => {
      sentCount++;
      return { success: true };
    });

    assert.strictEqual(sentCount, 1, 'Custom sender was called');
    assert.strictEqual(result.synced, 1, '1 mutation marked synced');

    const remaining = await SyncEngine.getPendingMutations();
    assert.strictEqual(remaining.length, 0, 'No more pending mutations');
  });

  await testAsync('flushQueue applies retry backoff on simulated network failure', async () => {
    await SyncEngine.clearQueue();
    await SyncEngine.enqueueMutation('attendance', 'check_in', { studentId: 'std_99' });

    // Simulate failure
    await SyncEngine.flushQueue(async () => {
      throw new Error('503 Service Unavailable');
    });

    const pending = await SyncEngine.getPendingMutations();
    assert.strictEqual(pending.length, 1, 'Item remains pending');
    assert.strictEqual(pending[0].retries, 1, 'Retry count incremented');
    assert(pending[0].retryAfter > Date.now(), 'retryAfter backoff timestamp set in future');
  });

  // ── SUITE 4: Service Worker Cache Configuration ──
  console.log('\n📱 SUITE 4: Service Worker v6.8.0 Cache Integration');
  const swPath = path.join(ROOT_DIR, 'sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');

  test('sw.js CACHE_NAME bumped to stemos-lxp-v6.8.x', () => {
    assert(/CACHE_NAME = 'stemos-lxp-v6\.8\.\d+/.test(swContent), 'Cache name matches Phase 88+');
  });

  test('sw.js precaches /content/stemos_sync.js', () => {
    assert(swContent.includes("'/content/stemos_sync.js'"), 'Assets array includes stemos_sync.js');
  });

  // ── SUITE 5: Cross-Portal HTML Integration ──
  console.log('\n🌐 SUITE 5: Cross-Portal HTML Integration (7 Portals)');
  const portals = ['index.html', 'dev.html', 'tracks.html', 'app.html', 'placement.html', 'teacher.html', 'admin.html'];

  portals.forEach((portal) => {
    test(`${portal} includes /content/stemos_sync.js with defer`, () => {
      const filePath = path.join(ROOT_DIR, portal);
      assert(fs.existsSync(filePath), `${portal} exists`);
      const content = fs.readFileSync(filePath, 'utf8');
      assert(
        content.includes('<script src="/content/stemos_sync.js" defer></script>'),
        `${portal} has stemos_sync.js script tag`
      );
    });
  });

  console.log('\n🏁 ==============================================================');
  console.log(`🏁 PHASE 88 COMPLETED: ${passedTests}/${totalTests} TESTS PASSING`);
  console.log('🏁 ==============================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
