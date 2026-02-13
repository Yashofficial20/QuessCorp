# How to Load Sample Data

This file explains how to load the 50 sample employees and attendance records into your HRMS Lite database.

## 📊 What's Included

The `sample_data.sql` file contains:
- **50 Employees** across 6 departments:
  - Engineering (16 employees)
  - Finance (6 employees)
  - Human Resources (5 employees)
  - Marketing (6 employees)
  - Operations (6 employees)
  - Sales (6 employees)

- **Attendance Records** for the past 7 days:
  - Today: 40 Present, 10 Absent
  - Yesterday: 45 Present, 5 Absent
  - 2 days ago: 48 Present, 2 Absent
  - 3 days ago: 47 Present, 3 Absent
  - 4 days ago: 46 Present, 4 Absent
  - 5 days ago: 49 Present, 1 Absent
  - 6 days ago: 50 Present, 0 Absent

**Total Records**: 350 attendance records (50 employees × 7 days)

---

## 🚀 Method 1: Using Docker (Recommended)

### Step 1: Ensure Services Are Running

```bash
docker-compose up
```

Wait until you see:
```
hrms_backend   | Django version 5.0.1, using settings 'core.settings'
hrms_backend   | Starting development server at http://0.0.0.0:8000/
hrms_backend   | Quit the server with CONTROL-C.
```

### Step 2: Load the SQL File

Open a **NEW terminal** and run:

```bash
docker-compose exec db psql -U hrms_user -d hrms_db -f /sample_data.sql
```

**If that doesn't work** (file not found), copy the file into the container first:

```bash
# Copy SQL file into database container
docker cp sample_data.sql hrms_db:/sample_data.sql

# Run the SQL file
docker-compose exec db psql -U hrms_user -d hrms_db -f /sample_data.sql
```

### Step 3: Verify Data Loaded

```bash
# Check employee count (should be 50)
docker-compose exec db psql -U hrms_user -d hrms_db -c "SELECT COUNT(*) FROM employees_employee;"

# Check today's attendance  
docker-compose exec db psql -U hrms_user -d hrms_db -c "SELECT status, COUNT(*) FROM attendance_attendance WHERE date = CURRENT_DATE GROUP BY status;"
```

---

## 🔄 Method 2: Using Django Shell

```bash
# Open Django shell
docker-compose exec backend python manage.py shell

# Then paste and run this Python code:
import os
os.system('psql -h db -U hrms_user -d hrms_db -f /app/../sample_data.sql')
```

---

## 💻 Method 3: Using pgAdmin or Database Client

1. Connect to PostgreSQL:
   - Host: `localhost`
   - Port: `5432`
   - Database: `hrms_db`
   - Username: `hrms_user`
   - Password: `hrms_password`

2. Open `sample_data.sql` in the query editor

3. Execute the entire script

---

## 🎯 Method 4: Manual Copy-Paste

1. Visit http://localhost:8000/admin
2. Create superuser first:
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```
3. Login to admin panel
4. Manually add employees and attendance using admin interface

---

## ✅ Verification

After loading data, visit http://localhost:3000 and you should see:

**Dashboard:**
- Total Employees: **50**
- Present Today: **40**
- Absent Today: **10**

**Employee Management:**
- Table showing all 50 employees

**Attendance Management:**
- Filter by today's date to see 50 attendance records

---

## 🔍 Sample Employee Details

**Engineering Team (16 employees):**
- EMP001 - John Doe
- EMP005 - David Martinez
- EMP007 - Robert Brown
- EMP011 - William Rodriguez
- ... and 12 more

**Finance Team (6 employees):**
- EMP003 - Michael Chen
- EMP009 - James Wilson
- EMP016 - Barbara Hernandez
- ... and 3 more

**Human Resources (5 employees):**
- EMP002 - Sarah Smith
- EMP012 - Linda Martinez
- EMP020 - Karen Thompson
- ... and 2 more

**Marketing (6 employees):**
- EMP004 - Emily Johnson
- EMP010 - Jennifer Davis
- ... and 4 more

**Operations (6 employees):**
- EMP008 - Maria Garcia
- EMP014 - Patricia Taylor
- ... and 4 more

**Sales (6 employees):**
- EMP006 - Jessica Williams
- EMP013 - Richard Anderson
- ... and 4 more

---

## 🐛 Troubleshooting

### Error: "relation does not exist"

**Solution**: Migrations haven't run. Restart with:
```bash
docker-compose down
docker-compose up --build
```

Wait for migrations to complete, then load data.

### Error: "duplicate key value violates unique constraint"

**Solution**: Data already loaded. To reload:
```bash
# Clear existing data
docker-compose exec db psql -U hrms_user -d hrms_db -c "TRUNCATE TABLE attendance_attendance, employees_employee CASCADE;"

# Load sample data again
docker cp sample_data.sql hrms_db:/sample_data.sql
docker-compose exec db psql -U hrms_user -d hrms_db -f /sample_data.sql
```

### Error: "connection refused"

**Solution**: Database not ready yet. Wait 30 seconds and try again.

---

## 🔄 Reset Database

To start fresh:

```bash
# Stop and remove volumes
docker-compose down -v

# Rebuild and start
docker-compose up --build

# Wait for migrations, then load data
docker cp sample_data.sql hrms_db:/sample_data.sql
docker-compose exec db psql -U hrms_user -d hrms_db -f /sample_data.sql
```

---

## 📝 Notes

- The SQL file uses `NOW()` and `CURRENT_DATE` so dates are always relative to when you run it
- Today's attendance will always be for the current date
- Past attendance goes back 6 days from today
- All employee emails follow pattern: `firstname.lastname@company.com`
- All Employee IDs follow pattern: `EMP001` to `EMP050`

---

**After loading, your application will be fully populated and ready to demonstrate!** 🎉
