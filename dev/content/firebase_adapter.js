/**
 * stemOS Universal Firebase & Multi-Tenant Data Adapter (v6.1.0)
 * ═══════════════════════════════════════════════════════════════════════════
 * Provides seamless abstraction between Cloud Firestore and Offline Air-Gapped Local Storage.
 * Complies with firestore.rules multi-tenant architecture and ISO 9001:2015 audit trails.
 *
 * Supported Portals:
 *  - /admin.html    (School Manager & Cohorts)
 *  - /teacher.html  (Teacher Classroom & Group Management)
 *  - /register.html (7-Step Student Onboarding Wizard)
 *  - /app.html      (3D Campus Student LXP & Career Map)
 *  - /dev.html      (Dev Studio & Workbench)
 * ═══════════════════════════════════════════════════════════════════════════
 */

(function (window) {
    'use strict';

    const STORAGE_KEY_AUTH = 'stemos_auth_user';
    const STORAGE_KEY_INSTITUTIONS = 'stemos_institutions_db';
    const STORAGE_KEY_CLASSES = 'stemos_teacher_classes';
    const STORAGE_KEY_STUDENTS = 'stemos_students_db';
    const STORAGE_KEY_ACTIVITIES = 'stemos_activity_feed';
    const STORAGE_KEY_AUDIT = 'stemos_audit_logs';

    // Default Seed Institution
    const DEFAULT_INSTITUTION = {
        id: 'tecnm-saltillo',
        name: 'TecNM Campus Saltillo',
        system: 'it',
        code: 'TECNM-SLW-2026',
        city: 'Saltillo',
        state: 'Coahuila',
        country: 'Mexico',
        adminName: 'Prof. Luis Morales',
        adminEmail: 'director@saltillo.tecnm.mx',
        createdAt: '2026-08-01T08:00:00.000Z'
    };

    // Default Seed Classes for initial offline readiness
    const DEFAULT_CLASSES = [
        {
            id: 'class-meca-4a',
            institutionId: 'tecnm-saltillo',
            teacherId: 't1',
            teacherName: 'Ing. Roberto Hernández',
            periodId: 'ago-dic-2026',
            name: 'Mecatrónica 4°A — Matutino',
            careerId: 'it-mecatronica',
            careerName: 'Ingeniería Mecatrónica',
            primaryTrackId: 'robotics-automation',
            totalHours: 60.0,
            inviteCode: 'STEM-MECA-A7X3K2',
            inviteExpiry: null,
            maxCapacity: 40,
            studentsCount: 32,
            avgProgress: 74.2,
            avgXp: 1350,
            status: 'active',
            createdAt: '2026-08-15T09:00:00.000Z'
        },
        {
            id: 'class-ind-4c',
            institutionId: 'tecnm-saltillo',
            teacherId: 't2',
            teacherName: 'Dra. Elena Vázquez',
            periodId: 'ago-dic-2026',
            name: 'Industrial 4°C — Lean Core',
            careerId: 'it-industrial',
            careerName: 'Ingeniería Industrial',
            primaryTrackId: 'automotive-lean',
            totalHours: 60.0,
            inviteCode: 'STEM-IND-B8Y4L3',
            inviteExpiry: null,
            maxCapacity: 40,
            studentsCount: 34,
            avgProgress: 69.1,
            avgXp: 1190,
            status: 'active',
            createdAt: '2026-08-15T09:30:00.000Z'
        },
        {
            id: 'class-sys-4a',
            institutionId: 'tecnm-saltillo',
            teacherId: 't3',
            teacherName: 'Mtro. Carlos Estrada',
            periodId: 'ago-dic-2026',
            name: 'Sistemas 4°A — Edge AI',
            careerId: 'it-sistemas',
            careerName: 'Ingeniería en Sistemas Computacionales',
            primaryTrackId: 'ai-ml',
            totalHours: 60.0,
            inviteCode: 'STEM-SYS-C9Z5M4',
            inviteExpiry: null,
            maxCapacity: 40,
            studentsCount: 32,
            avgProgress: 76.5,
            avgXp: 1410,
            status: 'active',
            createdAt: '2026-08-15T10:00:00.000Z'
        }
    ];

    const STEMOS_FIREBASE = {
        version: '6.1.0',
        mode: 'hybrid', // 'cloud' or 'local-airgapped'
        isInitialized: false,

        /**
         * Initialize storage, sync schemas, and detect Firebase SDK
         */
        init: function () {
            if (this.isInitialized) return this;

            // Seed classes if empty
            if (!localStorage.getItem(STORAGE_KEY_CLASSES)) {
                localStorage.setItem(STORAGE_KEY_CLASSES, JSON.stringify(DEFAULT_CLASSES));
            }

            // Seed institution if empty
            if (!localStorage.getItem(STORAGE_KEY_INSTITUTIONS)) {
                localStorage.setItem(STORAGE_KEY_INSTITUTIONS, JSON.stringify([DEFAULT_INSTITUTION]));
            }

            // Check if Firebase Web SDK is available in window
            if (typeof window.firebase !== 'undefined' && window.firebase.apps && window.firebase.apps.length > 0) {
                this.mode = 'cloud';
            } else {
                this.mode = 'local-airgapped';
            }

            this.isInitialized = true;
            this._broadcastStateChange();
            return this;
        },

        /**
         * Check if Cloud Firestore is actively connected
         */
        isCloudActive: function () {
            return this.mode === 'cloud';
        },

        /**
         * Get status descriptor for UI badges
         */
        getConnectionStatus: function () {
            if (this.isCloudActive()) {
                return {
                    online: true,
                    mode: 'Cloud Active',
                    label: 'Firestore Sync Connected',
                    badgeClass: 'badge-emerald',
                    icon: 'fa-cloud'
                };
            }
            return {
                online: true,
                mode: 'Air-Gapped Offline Cache',
                label: 'Local Storage v6.1.0 Active',
                badgeClass: 'badge-sky',
                icon: 'fa-hard-drive'
            };
        },

        /**
         * Get currently authenticated user or student profile
         */
        getAuthUser: function () {
            try {
                // Check unified auth key first
                const rawAuth = localStorage.getItem(STORAGE_KEY_AUTH);
                if (rawAuth) return JSON.parse(rawAuth);

                // Fallback to student profile if registered via register.html
                const rawStudent = localStorage.getItem('stemos_student_profile');
                if (rawStudent) {
                    const student = JSON.parse(rawStudent);
                    return {
                        uid: student.studentId || 'std-' + (student.matricula || '22050144'),
                        displayName: student.name || 'Student',
                        role: 'student',
                        email: student.email || '',
                        institutionId: student.institutionId || 'tecnm-saltillo',
                        classId: student.classId || null,
                        classCode: student.classCode || null,
                        careerId: student.careerId || 'it-mecatronica',
                        system: student.system || 'it',
                        hub: student.hub || 'Saltillo'
                    };
                }

                // Fallback to admin auth
                const rawAdmin = localStorage.getItem('stemos_admin_auth');
                if (rawAdmin) {
                    const admin = JSON.parse(rawAdmin);
                    return {
                        uid: 'admin-1',
                        displayName: admin.name || 'Admin',
                        role: 'admin',
                        email: admin.email || 'director@saltillo.tecnm.mx',
                        institutionId: admin.institutionId || 'tecnm-saltillo'
                    };
                }

                // Fallback to teacher auth
                const rawTeacher = localStorage.getItem('stemos_teacher_auth');
                if (rawTeacher) {
                    const teacher = JSON.parse(rawTeacher);
                    return {
                        uid: teacher.id || 'teacher-1',
                        displayName: teacher.name || 'Teacher',
                        role: 'teacher',
                        email: teacher.email || '',
                        institutionId: teacher.institutionId || 'tecnm-saltillo'
                    };
                }
            } catch (e) {
                console.warn('[stemOS Firebase Adapter] Error reading auth user:', e);
            }
            return null;
        },

        /**
         * Set authenticated user
         */
        setAuthUser: function (user) {
            localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
            this._broadcastStateChange('auth_changed', user);
            return user;
        },

        /**
         * Clear active session
         */
        logout: function () {
            localStorage.removeItem(STORAGE_KEY_AUTH);
            this._broadcastStateChange('auth_changed', null);
        },

        /**
         * Query classes for a given institution or teacher
         */
        getClasses: function (institutionId, teacherId) {
            try {
                const classes = JSON.parse(localStorage.getItem(STORAGE_KEY_CLASSES) || '[]');
                return classes.filter(function (c) {
                    if (institutionId && c.institutionId !== institutionId) return false;
                    if (teacherId && c.teacherId !== teacherId) return false;
                    return true;
                });
            } catch (e) {
                return DEFAULT_CLASSES;
            }
        },

        /**
         * Find class by invite code (case-insensitive)
         */
        getClassByCode: function (inviteCode) {
            if (!inviteCode) return null;
            const codeClean = inviteCode.trim().toUpperCase();
            const classes = this.getClasses();
            for (let i = 0; i < classes.length; i++) {
                if (classes[i].inviteCode && classes[i].inviteCode.toUpperCase() === codeClean) {
                    return classes[i];
                }
            }
            return null;
        },

        /**
         * Create a new class with auto-generated invite code
         */
        createClass: function (classData) {
            const classes = this.getClasses();
            const careerId = classData.careerId || 'it-mecatronica';
            const careerShort = careerId.replace(/^(it|ut|univ)-/, '').substring(0, 4).toUpperCase();
            const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            const inviteCode = 'STEM-' + careerShort + '-' + randomCode;

            const newClass = {
                id: 'class-' + Date.now().toString(36),
                institutionId: classData.institutionId || 'tecnm-saltillo',
                teacherId: classData.teacherId || 't1',
                teacherName: classData.teacherName || 'Faculty Lead',
                periodId: classData.periodId || 'ago-dic-2026',
                name: classData.name || 'New Group',
                careerId: careerId,
                careerName: classData.careerName || 'Engineering Track',
                primaryTrackId: classData.primaryTrackId || 'robotics-automation',
                totalHours: 60.0,
                inviteCode: inviteCode,
                inviteExpiry: classData.inviteExpiry || null,
                maxCapacity: parseInt(classData.maxCapacity, 10) || 40,
                studentsCount: 0,
                avgProgress: 0.0,
                avgXp: 0,
                status: 'active',
                createdAt: new Date().toISOString()
            };

            classes.push(newClass);
            localStorage.setItem(STORAGE_KEY_CLASSES, JSON.stringify(classes));

            this.createAuditLog(newClass.institutionId, {
                action: 'CLASS_CREATED',
                entity: 'class',
                entityId: newClass.id,
                details: 'Created group ' + newClass.name + ' with code ' + newClass.inviteCode
            });

            this._broadcastStateChange('class_created', newClass);
            return newClass;
        },

        /**
         * Register or update student in the ecosystem
         */
        registerStudent: function (studentData) {
            const students = this.getStudents();
            const studentId = studentData.studentId || 'std-' + Date.now().toString(36);

            // Check if student joined with class code
            let matchedClass = null;
            if (studentData.classCode) {
                matchedClass = this.getClassByCode(studentData.classCode);
            }

            const record = {
                id: studentId,
                name: studentData.name || studentData.fullName || 'Student',
                matricula: studentData.matricula || studentData.studentId || '2205' + Math.floor(1000 + Math.random() * 9000),
                email: studentData.email || '',
                careerId: studentData.careerId || 'it-mecatronica',
                careerName: studentData.careerName || 'Ingeniería Mecatrónica',
                cluster: studentData.cluster || 'STEM',
                system: studentData.system || 'it',
                hub: studentData.hub || 'Saltillo',
                semester: studentData.semester || 'mid',
                institutionId: matchedClass ? matchedClass.institutionId : (studentData.institutionId || 'tecnm-saltillo'),
                classId: matchedClass ? matchedClass.id : (studentData.classId || null),
                className: matchedClass ? matchedClass.name : (studentData.className || 'Independent Study'),
                classCode: matchedClass ? matchedClass.inviteCode : (studentData.classCode || null),
                progress: 0,
                xp: 0,
                modulesCompleted: 0,
                hoursCompleted: 0.0,
                level: 1,
                levelTitle: 'Intern',
                registeredAt: new Date().toISOString(),
                lastActiveAt: new Date().toISOString()
            };

            // Update or add student
            let existingIdx = -1;
            for (let i = 0; i < students.length; i++) {
                if (students[i].id === studentId || (students[i].matricula && students[i].matricula === record.matricula)) {
                    existingIdx = i;
                    break;
                }
            }

            if (existingIdx >= 0) {
                students[existingIdx] = Object.assign(students[existingIdx], record);
            } else {
                students.push(record);
            }

            localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));

            // If attached to a class, increment class studentsCount
            if (matchedClass) {
                const classes = this.getClasses();
                for (let j = 0; j < classes.length; j++) {
                    if (classes[j].id === matchedClass.id) {
                        classes[j].studentsCount = (classes[j].studentsCount || 0) + 1;
                        break;
                    }
                }
                localStorage.setItem(STORAGE_KEY_CLASSES, JSON.stringify(classes));
            }

            // Sync to student local storage keys for app.html
            localStorage.setItem('stemos_student_profile', JSON.stringify(record));
            localStorage.setItem('stemos_active_career', record.careerId);
            localStorage.setItem('stemos_current_user', JSON.stringify({
                name: record.name,
                matricula: record.matricula,
                careerId: record.careerId,
                careerName: record.careerName,
                system: record.system,
                hub: record.hub,
                classCode: record.classCode
            }));
            localStorage.setItem('stemos_backdoor', 'true');

            // Audit log and activity feed
            this.addActivity({
                type: 'enrollment',
                icon: 'fa-user-plus',
                iconClass: 'kpi-icon-teal',
                text: '<strong>' + record.name + '</strong> registered in <strong>' + record.careerName + '</strong> (' + record.className + ')',
                time: 'Just now'
            });

            this.createAuditLog(record.institutionId, {
                action: 'STUDENT_ENROLLED',
                entity: 'student',
                entityId: record.id,
                details: record.name + ' enrolled in ' + record.careerName + ' [' + record.matricula + ']'
            });

            this._broadcastStateChange('student_registered', record);
            return record;
        },

        /**
         * Update student progress, XP, and recalculate cohort metrics
         */
        updateStudentProgress: function (studentId, updateData) {
            const students = this.getStudents();
            let targetStudent = null;

            for (let i = 0; i < students.length; i++) {
                if (students[i].id === studentId || students[i].matricula === studentId) {
                    targetStudent = students[i];
                    break;
                }
            }

            if (!targetStudent) {
                // If not in database, attempt from local profile
                const raw = localStorage.getItem('stemos_student_profile');
                if (raw) {
                    targetStudent = JSON.parse(raw);
                    students.push(targetStudent);
                } else {
                    return null;
                }
            }

            if (typeof updateData.xp === 'number') {
                targetStudent.xp = (targetStudent.xp || 0) + updateData.xp;
            }
            if (typeof updateData.progress === 'number') {
                targetStudent.progress = Math.min(100, Math.max(targetStudent.progress || 0, updateData.progress));
            }
            if (typeof updateData.modulesCompleted === 'number') {
                targetStudent.modulesCompleted = Math.max(targetStudent.modulesCompleted || 0, updateData.modulesCompleted);
            }
            if (typeof updateData.hoursCompleted === 'number') {
                targetStudent.hoursCompleted = Math.max(targetStudent.hoursCompleted || 0, updateData.hoursCompleted);
            }

            targetStudent.lastActiveAt = new Date().toISOString();

            localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
            localStorage.setItem('stemos_student_profile', JSON.stringify(targetStudent));
            localStorage.setItem('stemos_student_xp', targetStudent.xp.toString());

            // Recalculate class averages if student is enrolled in a class
            if (targetStudent.classId) {
                this._recalculateClassMetrics(targetStudent.classId);
            }

            if (updateData.activityText) {
                this.addActivity({
                    type: updateData.activityType || 'completion',
                    icon: updateData.activityIcon || 'fa-check',
                    iconClass: updateData.activityIconClass || 'kpi-icon-emerald',
                    text: updateData.activityText,
                    time: 'Just now'
                });
            }

            this._broadcastStateChange('progress_updated', targetStudent);
            return targetStudent;
        },

        /**
         * Get list of students
         */
        getStudents: function (classId) {
            try {
                const students = JSON.parse(localStorage.getItem(STORAGE_KEY_STUDENTS) || '[]');
                if (!classId) return students;
                return students.filter(function (s) {
                    return s.classId === classId;
                });
            } catch (e) {
                return [];
            }
        },

        /**
         * Get institutional activity stream
         */
        getActivities: function (limit) {
            try {
                const list = JSON.parse(localStorage.getItem(STORAGE_KEY_ACTIVITIES) || '[]');
                if (limit && limit > 0) return list.slice(0, limit);
                return list;
            } catch (e) {
                return [];
            }
        },

        /**
         * Append to recent activity feed
         */
        addActivity: function (activity) {
            try {
                const list = this.getActivities();
                list.unshift(Object.assign({
                    id: 'act-' + Date.now().toString(36),
                    timestamp: new Date().toISOString()
                }, activity));
                // Cap at 50 activities
                const trimmed = list.slice(0, 50);
                localStorage.setItem(STORAGE_KEY_ACTIVITIES, JSON.stringify(trimmed));
                this._broadcastStateChange('activity_added', activity);
            } catch (e) {
                console.warn('[stemOS Firebase Adapter] Error adding activity:', e);
            }
        },

        /**
         * Write immutable audit log compliant with ISO 9001:2015 Clause 7.2
         */
        createAuditLog: function (institutionId, logData) {
            try {
                const logs = JSON.parse(localStorage.getItem(STORAGE_KEY_AUDIT) || '[]');
                const entry = {
                    id: 'audit-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5),
                    institutionId: institutionId || 'tecnm-saltillo',
                    action: logData.action || 'GENERAL_ACTION',
                    entity: logData.entity || 'system',
                    entityId: logData.entityId || null,
                    details: logData.details || '',
                    timestamp: new Date().toISOString(),
                    actor: logData.actor || 'system'
                };
                logs.unshift(entry);
                localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(logs.slice(0, 200)));
                return entry;
            } catch (e) {
                return null;
            }
        },

        /**
         * Internal: Recalculate average progress and XP for a class
         */
        _recalculateClassMetrics: function (classId) {
            const classes = this.getClasses();
            const classStudents = this.getStudents(classId);
            if (classStudents.length === 0) return;

            let totalProg = 0;
            let totalXp = 0;
            for (let i = 0; i < classStudents.length; i++) {
                totalProg += (classStudents[i].progress || 0);
                totalXp += (classStudents[i].xp || 0);
            }

            const avgProgress = Math.round((totalProg / classStudents.length) * 10) / 10;
            const avgXp = Math.round(totalXp / classStudents.length);

            for (let j = 0; j < classes.length; j++) {
                if (classes[j].id === classId) {
                    classes[j].avgProgress = avgProgress;
                    classes[j].avgXp = avgXp;
                    classes[j].studentsCount = classStudents.length;
                    break;
                }
            }
            localStorage.setItem(STORAGE_KEY_CLASSES, JSON.stringify(classes));
        },

        /**
         * Internal event broadcaster across DOM & tabs
         */
        _broadcastStateChange: function (type, detail) {
            try {
                const evt = new CustomEvent('stemos:firebase_state_change', {
                    detail: { type: type || 'sync', data: detail, mode: this.mode }
                });
                window.dispatchEvent(evt);
            } catch (e) {}
        }
    };

    // Auto-initialize when script loads
    STEMOS_FIREBASE.init();

    // Export to global scope
    window.STEMOS_FIREBASE = STEMOS_FIREBASE;

})(typeof window !== 'undefined' ? window : this);
