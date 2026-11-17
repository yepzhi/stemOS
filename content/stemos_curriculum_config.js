/**
 * ==============================================================================
 * stemOS LXP — Gestor Compartido de Secuencia Curricular, Visibilidad y Desbloqueos
 * Permite al docente reordenar temas (MCER 50m y ESP 50m), ocultar/mostrar módulos,
 * preservar el progreso histórico del estudiante por ID canónico inmutable, y
 * sincronizar la configuración del grupo vía Firestore + localStorage fallback.
 * ==============================================================================
 */
(function (root, factory) {
  const result = factory(root);
  if (typeof define === 'function' && define.amd) {
    define([], () => result);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = result;
  }
  if (typeof root !== 'undefined') {
    root.STEMOS_CURRICULUM_CONFIG = result;
  }
  if (typeof window !== 'undefined') {
    window.STEMOS_CURRICULUM_CONFIG = result;
  }
}(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  const STORAGE_KEY = 'stemos_curriculum_config_v1';
  const LEGACY_UNLOCKS_KEY = 'stemos_teacher_unlocks';
  const memoryStore = {};

  function safeStorageGet(key) {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (_) {}
    return memoryStore[key] || null;
  }

  function safeStorageSet(key, val) {
    memoryStore[key] = val;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, val);
      }
    } catch (_) {}
  }

  function readAllLocalConfigs() {
    try {
      const raw = safeStorageGet(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writeAllLocalConfigs(map) {
    safeStorageSet(STORAGE_KEY, JSON.stringify(map || {}));
  }

  function sanitizeTrackKey(trackKey) {
    return String(trackKey || 'mcer_A1').replace(/[^a-zA-Z0-9_-]/g, '_');
  }

  function makeCompositeKey(classId, trackKey) {
    return `${classId || 'DEFAULT'}::${sanitizeTrackKey(trackKey)}`;
  }

  function getTrackKey(mode, levelOrTrackId) {
    const m = String(mode || 'mcer').toLowerCase().trim();
    if (m === 'mcer') {
      const lvl = String(levelOrTrackId || 'A1').toUpperCase().trim();
      if (lvl === 'C1' || lvl === 'C2' || lvl === 'C1-C2' || lvl === 'C1_C2') return 'mcer_C1-C2';
      if (lvl === 'ALL') return 'mcer_ALL';
      return `mcer_${lvl}`;
    }
    return `esp_${sanitizeTrackKey(levelOrTrackId || 'default')}`;
  }

  function getActiveStudentClassId() {
    try {
      const sessionRaw = safeStorageGet('stemos_user_session');
      if (sessionRaw) {
        const s = JSON.parse(sessionRaw);
        if (s && s.activeClassId) return s.activeClassId;
        if (s && s.classId) return s.classId;
      }
      const fallback = safeStorageGet('stemos_active_class_id');
      if (fallback) return fallback;
    } catch (_) {}
    return 'DEFAULT';
  }

  function getLegacyTeacherUnlocks(classId) {
    try {
      const raw = safeStorageGet(LEGACY_UNLOCKS_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return [];
      const set = new Set();
      if (Array.isArray(data[classId])) data[classId].forEach((id) => set.add(id));
      if (Array.isArray(data.ALL)) data.ALL.forEach((id) => set.add(id));
      // Handle flat map { 'a1-u1': true } or { 'classId::modId': true }
      Object.keys(data).forEach((k) => {
        if (data[k] === true) set.add(k);
        if (classId && k.startsWith(`${classId}::`) && data[k]) {
          set.add(k.slice(classId.length + 2));
        }
      });
      return Array.from(set);
    } catch (_) {
      return [];
    }
  }

  function getCanonicalItems(trackKey) {
    const key = String(trackKey || 'mcer_A1');
    const classesApi = (typeof STEMOS_MCER_CLASSES !== 'undefined' && STEMOS_MCER_CLASSES) || (root && root.STEMOS_MCER_CLASSES);
    const tracksApi = (typeof STEMOS_MCER_TRACKS !== 'undefined' && STEMOS_MCER_TRACKS) || (root && root.STEMOS_MCER_TRACKS);
    const pathsApi = (typeof STEMOS_CAREER_PATHS !== 'undefined' && STEMOS_CAREER_PATHS) || (root && root.STEMOS_CAREER_PATHS);
    const coursesMap = (typeof LXP_COURSES !== 'undefined' && LXP_COURSES) || (root && root.LXP_COURSES);

    if (key.startsWith('mcer_')) {
      const lvl = key.slice(5);
      if (classesApi && typeof classesApi.getClassesByLevel === 'function') {
        const list = lvl === 'ALL' ? classesApi.getAllClasses() : classesApi.getClassesByLevel(lvl);
        if (list && list.length) return list.slice();
      }
      if (tracksApi && typeof tracksApi.getAllUnits === 'function') {
        return lvl === 'ALL' ? tracksApi.getAllUnits() : tracksApi.getUnitsByLevel(lvl);
      }
      return [];
    }

    const espId = key.startsWith('esp_') ? key.slice(4) : key;
    if (pathsApi) {
      const getter = pathsApi.getPathForCareer || pathsApi.getPath;
      const career = typeof getter === 'function' ? getter.call(pathsApi, espId) : (pathsApi.careers && pathsApi.careers[espId]);
      if (career && Array.isArray(career.modules)) return career.modules.slice();
    }
    if (coursesMap && coursesMap[espId] && Array.isArray(coursesMap[espId].modules)) {
      return coursesMap[espId].modules.slice();
    }
    return [];
  }

  function getConfig(classId, trackKey) {
    const map = readAllLocalConfigs();
    const cid = classId || getActiveStudentClassId() || 'DEFAULT';
    const normTrack = sanitizeTrackKey(trackKey);
    const specific = map[makeCompositeKey(cid, normTrack)];
    const fallbackDefault = cid !== 'DEFAULT' ? map[makeCompositeKey('DEFAULT', normTrack)] : null;
    const base = specific || fallbackDefault || null;
    if (!base) return null;
    return Object.assign({
      classId: cid,
      trackKey: normTrack,
      orderedIds: [],
      hiddenIds: [],
      unlockedIds: [],
      paceMinutes: 50
    }, base);
  }

  function resolveSequenceItems(canonicalItems, config, opts) {
    const items = Array.isArray(canonicalItems) ? canonicalItems.slice() : [];
    const options = Object.assign({ includeHidden: false, extraUnlocks: [] }, opts);
    if (!items.length) return [];

    const byId = {};
    const canonicalIndexById = {};
    items.forEach((it, idx) => {
      if (it && it.id) {
        byId[it.id] = it;
        canonicalIndexById[it.id] = idx;
      }
    });

    const orderedIds = (config && Array.isArray(config.orderedIds)) ? config.orderedIds : [];
    const hiddenSet = new Set((config && Array.isArray(config.hiddenIds)) ? config.hiddenIds : []);
    const unlockSet = new Set([
      ...((config && Array.isArray(config.unlockedIds)) ? config.unlockedIds : []),
      ...(Array.isArray(options.extraUnlocks) ? options.extraUnlocks : [])
    ]);

    const seen = new Set();
    const sorted = [];

    orderedIds.forEach((id) => {
      if (byId[id] && !seen.has(id)) {
        seen.add(id);
        sorted.push(byId[id]);
      }
    });

    // Preserve any newly appended canonical items not yet stored in saved orderedIds
    items.forEach((it) => {
      if (it && it.id && !seen.has(it.id)) {
        seen.add(it.id);
        sorted.push(it);
      }
    });

    const hasCustomOrder = orderedIds.length > 0 && orderedIds.some((id, idx) => sorted[idx] && items[idx] && sorted[idx].id !== items[idx].id);

    const out = [];
    sorted.forEach((item, effectiveIdx) => {
      const isHidden = hiddenSet.has(item.id);
      if (isHidden && !options.includeHidden) return;
      out.push(Object.assign({}, item, {
        canonicalIndex: canonicalIndexById[item.id],
        effectiveIndex: effectiveIdx,
        visibleIndex: out.length,
        isHidden,
        isUnlockedByTeacher: unlockSet.has(item.id),
        hasCustomOrder
      }));
    });
    return out;
  }

  function getEffectiveSequence(classId, trackKey, opts) {
    const cid = classId || getActiveStudentClassId() || 'DEFAULT';
    const canonical = (opts && Array.isArray(opts.canonicalItems)) ? opts.canonicalItems : getCanonicalItems(trackKey);
    const config = getConfig(cid, trackKey);
    const legacyUnlocks = getLegacyTeacherUnlocks(cid);
    return resolveSequenceItems(canonical, config, Object.assign({}, opts, { extraUnlocks: legacyUnlocks }));
  }

  function isItemUnlockedInSequence(itemId, orderedItems, completedIds, explicitUnlocks, isDemoOrAdmin) {
    if (isDemoOrAdmin) return true;
    const list = Array.isArray(orderedItems) ? orderedItems : [];
    const doneSet = completedIds instanceof Set ? completedIds : new Set(Array.isArray(completedIds) ? completedIds : []);
    const explicitSet = explicitUnlocks instanceof Set ? explicitUnlocks : new Set(Array.isArray(explicitUnlocks) ? explicitUnlocks : []);

    if (doneSet.has(itemId) || explicitSet.has(itemId)) return true;

    const visible = list.filter((it) => !it.isHidden);
    const idx = visible.findIndex((it) => it.id === itemId);
    if (idx <= 0) return true; // First active lesson in teacher's sequence is always open

    const prevItem = visible[idx - 1];
    if (!prevItem) return true;
    if (visible[idx].isUnlockedByTeacher) return true;
    return doneSet.has(prevItem.id);
  }

  function getNextItemInSequence(currentId, orderedItems) {
    const visible = (Array.isArray(orderedItems) ? orderedItems : []).filter((it) => !it.isHidden);
    const idx = visible.findIndex((it) => it.id === currentId);
    if (idx === -1 || idx + 1 >= visible.length) return null;
    return visible[idx + 1];
  }

  function reorderArray(arr, fromIndex, toIndex) {
    const copy = Array.isArray(arr) ? arr.slice() : [];
    if (fromIndex < 0 || fromIndex >= copy.length || toIndex < 0 || toIndex >= copy.length || fromIndex === toIndex) {
      return copy;
    }
    const [moved] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, moved);
    return copy;
  }

  async function saveConfig(classId, trackKey, configObj, options) {
    const cid = classId || getActiveStudentClassId() || 'DEFAULT';
    const normTrack = sanitizeTrackKey(trackKey);
    const payload = Object.assign({
      classId: cid,
      institutionId: (options && options.institutionId) || 'upbc',
      trackKey: normTrack,
      orderedIds: [],
      hiddenIds: [],
      unlockedIds: [],
      paceMinutes: 50,
      note: '',
      updatedAt: new Date().toISOString(),
      updatedBy: (options && options.updatedBy) || 'teacher'
    }, configObj || {});

    const allMap = readAllLocalConfigs();
    allMap[makeCompositeKey(cid, normTrack)] = payload;
    writeAllLocalConfigs(allMap);

    // Sync also to legacy stemos_teacher_unlocks so older readers recognize cohort unlocks
    if (Array.isArray(payload.unlockedIds) && payload.unlockedIds.length) {
      try {
        const legacy = JSON.parse(safeStorageGet(LEGACY_UNLOCKS_KEY) || '{}');
        legacy[cid] = Array.from(new Set([...(Array.isArray(legacy[cid]) ? legacy[cid] : []), ...payload.unlockedIds]));
        safeStorageSet(LEGACY_UNLOCKS_KEY, JSON.stringify(legacy));
      } catch (_) {}
    }

    let cloudSynced = false;
    const fbApi = (typeof STEMOS_FIREBASE !== 'undefined' && STEMOS_FIREBASE) || (root && root.STEMOS_FIREBASE);
    if (fbApi && typeof fbApi.saveClassCurriculumConfig === 'function' && cid !== 'DEFAULT') {
      try {
        const res = await fbApi.saveClassCurriculumConfig(payload.institutionId, cid, normTrack, payload);
        cloudSynced = !!(res && res.success);
      } catch (_) {}
    }

    if (!cloudSynced && cid !== 'DEFAULT') {
      const syncApi = (typeof STEMOS_SYNC !== 'undefined' && STEMOS_SYNC) || (root && root.STEMOS_SYNC);
      if (syncApi && typeof syncApi.queueMutation === 'function') {
        try {
          syncApi.queueMutation('CURRICULUM_CONFIG', payload);
        } catch (_) {}
      }
    }

    if (typeof window !== 'undefined' && typeof CustomEvent === 'function') {
      try {
        window.dispatchEvent(new CustomEvent('stemos:curriculum-config-updated', { detail: payload }));
      } catch (_) {}
    }
    return { success: true, cloudSynced, payload };
  }

  async function resetConfig(classId, trackKey, options) {
    const cid = classId || getActiveStudentClassId() || 'DEFAULT';
    const normTrack = sanitizeTrackKey(trackKey);
    const canonical = getCanonicalItems(trackKey);
    return saveConfig(cid, normTrack, {
      orderedIds: canonical.map((c) => c.id),
      hiddenIds: [],
      unlockedIds: [],
      note: 'Orden Oficial MCER/ESP restaurado'
    }, options);
  }

  async function loadRemoteConfig(classId, trackKey, institutionId) {
    const cid = classId || getActiveStudentClassId();
    if (!cid || cid === 'DEFAULT') return null;
    const normTrack = sanitizeTrackKey(trackKey);
    const fbApi = (typeof STEMOS_FIREBASE !== 'undefined' && STEMOS_FIREBASE) || (root && root.STEMOS_FIREBASE);
    if (!fbApi || typeof fbApi.getClassCurriculumConfig !== 'function') return null;
    try {
      const res = await fbApi.getClassCurriculumConfig(institutionId || 'upbc', cid, normTrack);
      if (res && res.success && res.config) {
        const allMap = readAllLocalConfigs();
        allMap[makeCompositeKey(cid, normTrack)] = res.config;
        writeAllLocalConfigs(allMap);
        if (typeof window !== 'undefined' && typeof CustomEvent === 'function') {
          window.dispatchEvent(new CustomEvent('stemos:curriculum-config-updated', { detail: res.config }));
        }
        return res.config;
      }
    } catch (_) {}
    return null;
  }

  return {
    version: '2026.11-curriculum-cfg-v1',
    getTrackKey,
    getActiveStudentClassId,
    getCanonicalItems,
    getConfig,
    resolveSequenceItems,
    getEffectiveSequence,
    isItemUnlockedInSequence,
    getNextItemInSequence,
    reorderArray,
    saveConfig,
    resetConfig,
    loadRemoteConfig
  };
}));
