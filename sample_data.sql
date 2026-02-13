-- HRMS Lite - Sample Data SQL Script
-- This script creates 50 employees and attendance records
-- Run this after migrations are complete

-- ============================================
-- INSERT 50 EMPLOYEES
-- ============================================

INSERT INTO employees_employee (employee_id, full_name, email, department, created_at) VALUES
('EMP001', 'John Doe', 'john.doe@company.com', 'Engineering', NOW()),
('EMP002', 'Sarah Smith', 'sarah.smith@company.com', 'Human Resources', NOW()),
('EMP003', 'Michael Chen', 'michael.chen@company.com', 'Finance', NOW()),
('EMP004', 'Emily Johnson', 'emily.johnson@company.com', 'Marketing', NOW()),
('EMP005', 'David Martinez', 'david.martinez@company.com', 'Engineering', NOW()),
('EMP006', 'Jessica Williams', 'jessica.williams@company.com', 'Sales', NOW()),
('EMP007', 'Robert Brown', 'robert.brown@company.com', 'Engineering', NOW()),
('EMP008', 'Maria Garcia', 'maria.garcia@company.com', 'Operations', NOW()),
('EMP009', 'James Wilson', 'james.wilson@company.com', 'Finance', NOW()),
('EMP010', 'Jennifer Davis', 'jennifer.davis@company.com', 'Marketing', NOW()),
('EMP011', 'William Rodriguez', 'william.rodriguez@company.com', 'Engineering', NOW()),
('EMP012', 'Linda Martinez', 'linda.martinez@company.com', 'Human Resources', NOW()),
('EMP013', 'Richard Anderson', 'richard.anderson@company.com', 'Sales', NOW()),
('EMP014', 'Patricia Taylor', 'patricia.taylor@company.com', 'Operations', NOW()),
('EMP015', 'Charles Thomas', 'charles.thomas@company.com', 'Engineering', NOW()),
('EMP016', 'Barbara Hernandez', 'barbara.hernandez@company.com', 'Finance', NOW()),
('EMP017', 'Joseph Moore', 'joseph.moore@company.com', 'Marketing', NOW()),
('EMP018', 'Susan Martin', 'susan.martin@company.com', 'Engineering', NOW()),
('EMP019', 'Thomas Jackson', 'thomas.jackson@company.com', 'Sales', NOW()),
('EMP020', 'Karen Thompson', 'karen.thompson@company.com', 'Human Resources', NOW()),
('EMP021', 'Christopher White', 'christopher.white@company.com', 'Engineering', NOW()),
('EMP022', 'Nancy Lopez', 'nancy.lopez@company.com', 'Operations', NOW()),
('EMP023', 'Daniel Lee', 'daniel.lee@company.com', 'Finance', NOW()),
('EMP024', 'Betty Gonzalez', 'betty.gonzalez@company.com', 'Marketing', NOW()),
('EMP025', 'Matthew Harris', 'matthew.harris@company.com', 'Engineering', NOW()),
('EMP026', 'Helen Clark', 'helen.clark@company.com', 'Sales', NOW()),
('EMP027', 'Donald Lewis', 'donald.lewis@company.com', 'Engineering', NOW()),
('EMP028', 'Dorothy Robinson', 'dorothy.robinson@company.com', 'Human Resources', NOW()),
('EMP029', 'Anthony Walker', 'anthony.walker@company.com', 'Operations', NOW()),
('EMP030', 'Lisa Young', 'lisa.young@company.com', 'Finance', NOW()),
('EMP031', 'Mark Allen', 'mark.allen@company.com', 'Engineering', NOW()),
('EMP032', 'Sandra King', 'sandra.king@company.com', 'Marketing', NOW()),
('EMP033', 'Paul Wright', 'paul.wright@company.com', 'Sales', NOW()),
('EMP034', 'Ashley Scott', 'ashley.scott@company.com', 'Engineering', NOW()),
('EMP035', 'Steven Torres', 'steven.torres@company.com', 'Operations', NOW()),
('EMP036', 'Kimberly Nguyen', 'kimberly.nguyen@company.com', 'Finance', NOW()),
('EMP037', 'Andrew Hill', 'andrew.hill@company.com', 'Engineering', NOW()),
('EMP038', 'Donna Flores', 'donna.flores@company.com', 'Human Resources', NOW()),
('EMP039', 'Joshua Green', 'joshua.green@company.com', 'Marketing', NOW()),
('EMP040', 'Carol Adams', 'carol.adams@company.com', 'Sales', NOW()),
('EMP041', 'Kevin Nelson', 'kevin.nelson@company.com', 'Engineering', NOW()),
('EMP042', 'Michelle Baker', 'michelle.baker@company.com', 'Operations', NOW()),
('EMP043', 'Brian Hall', 'brian.hall@company.com', 'Finance', NOW()),
('EMP044', 'Amanda Rivera', 'amanda.rivera@company.com', 'Engineering', NOW()),
('EMP045', 'George Campbell', 'george.campbell@company.com', 'Marketing', NOW()),
('EMP046', 'Melissa Mitchell', 'melissa.mitchell@company.com', 'Sales', NOW()),
('EMP047', 'Edward Carter', 'edward.carter@company.com', 'Engineering', NOW()),
('EMP048', 'Deborah Roberts', 'deborah.roberts@company.com', 'Human Resources', NOW()),
('EMP049', 'Ronald Turner', 'ronald.turner@company.com', 'Operations', NOW()),
('EMP050', 'Stephanie Phillips', 'stephanie.phillips@company.com', 'Finance', NOW());

-- ============================================
-- INSERT ATTENDANCE RECORDS FOR TODAY
-- ============================================

-- Mark 40 employees as PRESENT today
INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE, 'PRESENT', NOW()
FROM employees_employee
WHERE employee_id IN (
    'EMP001', 'EMP002', 'EMP004', 'EMP005', 'EMP006', 'EMP007', 'EMP008', 'EMP010',
    'EMP011', 'EMP012', 'EMP013', 'EMP014', 'EMP015', 'EMP016', 'EMP017', 'EMP018',
    'EMP019', 'EMP020', 'EMP021', 'EMP022', 'EMP023', 'EMP024', 'EMP025', 'EMP026',
    'EMP027', 'EMP028', 'EMP029', 'EMP030', 'EMP031', 'EMP032', 'EMP033', 'EMP034',
    'EMP035', 'EMP036', 'EMP037', 'EMP038', 'EMP039', 'EMP040', 'EMP041', 'EMP042'
);

-- Mark 10 employees as ABSENT today
INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE, 'ABSENT', NOW()
FROM employees_employee
WHERE employee_id IN (
    'EMP003', 'EMP009', 'EMP043', 'EMP044', 'EMP045', 'EMP046', 'EMP047', 'EMP048', 'EMP049', 'EMP050'
);

-- ============================================
-- INSERT ATTENDANCE RECORDS FOR PAST WEEK
-- ============================================

-- Yesterday - 45 Present, 5 Absent
INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '1 day', 'PRESENT', NOW() - INTERVAL '1 day'
FROM employees_employee
WHERE employee_id NOT IN ('EMP009', 'EMP019', 'EMP029', 'EMP039', 'EMP049');

INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '1 day', 'ABSENT', NOW() - INTERVAL '1 day'
FROM employees_employee
WHERE employee_id IN ('EMP009', 'EMP019', 'EMP029', 'EMP039', 'EMP049');

-- 2 Days Ago - 48 Present, 2 Absent
INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '2 days', 'PRESENT', NOW() - INTERVAL '2 days'
FROM employees_employee
WHERE employee_id NOT IN ('EMP015', 'EMP030');

INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '2 days', 'ABSENT', NOW() - INTERVAL '2 days'
FROM employees_employee
WHERE employee_id IN ('EMP015', 'EMP030');

-- 3 Days Ago - 47 Present, 3 Absent
INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '3 days', 'PRESENT', NOW() - INTERVAL '3 days'
FROM employees_employee
WHERE employee_id NOT IN ('EMP005', 'EMP025', 'EMP045');

INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '3 days', 'ABSENT', NOW() - INTERVAL '3 days'
FROM employees_employee
WHERE employee_id IN ('EMP005', 'EMP025', 'EMP045');

-- 4 Days Ago - 46 Present, 4 Absent
INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '4 days', 'PRESENT', NOW() - INTERVAL '4 days'
FROM employees_employee
WHERE employee_id NOT IN ('EMP010', 'EMP020', 'EMP030', 'EMP040');

INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '4 days', 'ABSENT', NOW() - INTERVAL '4 days'
FROM employees_employee
WHERE employee_id IN ('EMP010', 'EMP020', 'EMP030', 'EMP040');

-- 5 Days Ago - 49 Present, 1 Absent
INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '5 days', 'PRESENT', NOW() - INTERVAL '5 days'
FROM employees_employee
WHERE employee_id != 'EMP007';

INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '5 days', 'ABSENT', NOW() - INTERVAL '5 days'
FROM employees_employee
WHERE employee_id = 'EMP007';

-- 6 Days Ago - 50 Present, 0 Absent (everyone present)
INSERT INTO attendance_attendance (employee_id, date, status, created_at)
SELECT id, CURRENT_DATE - INTERVAL '6 days', 'PRESENT', NOW() - INTERVAL '6 days'
FROM employees_employee;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count total employees (should be 50)
-- SELECT COUNT(*) as total_employees FROM employees_employee;

-- Count employees by department
-- SELECT department, COUNT(*) as count FROM employees_employee GROUP BY department ORDER BY count DESC;

-- Count today's attendance
-- SELECT status, COUNT(*) FROM attendance_attendance WHERE date = CURRENT_DATE GROUP BY status;

-- View all attendance for past 7 days
-- SELECT date, status, COUNT(*) FROM attendance_attendance GROUP BY date, status ORDER BY date DESC;
