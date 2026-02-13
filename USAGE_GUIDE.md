# HRMS Lite - Quick Start Guide

## 🚀 First Time Setup

### 1. Start the Application

```bash
# Navigate to project directory
cd Quess-Cross

# Start all services (first time)
docker-compose up --build
```

Wait for all services to start. You should see:
- ✅ Database ready
- ✅ Migrations applied
- ✅ Backend running on http://localhost:8000
- ✅ Frontend running on http://localhost:3000

### 2. Access the Application

Open your browser and go to: **http://localhost:3000**

---

## 📊 Adding Sample Data

### Method 1: Using the UI (Recommended)

#### Add Employees

1. Click **"👥 Employees"** in the navigation
2. Click **"+ Add Employee"** button
3. Fill in the form with sample data below

**Sample Employees:**

```
Employee 1:
- Employee ID: EMP001
- Full Name: John Doe
- Email: john.doe@company.com
- Department: Engineering

Employee 2:
- Employee ID: EMP002
- Full Name: Sarah Smith
- Email: sarah.smith@company.com
- Department: Human Resources

Employee 3:
- Employee ID: EMP003
- Full Name: Michael Chen
- Email: michael.chen@company.com
- Department: Finance

Employee 4:
- Employee ID: EMP004
- Full Name: Emily Johnson
- Email: emily.johnson@company.com
- Department: Marketing

Employee 5:
- Employee ID: EMP005
- Full Name: David Martinez
- Email: david.martinez@company.com
- Department: Engineering
```

#### Mark Attendance

1. Click **"📋 Attendance"** in the navigation
2. Select an employee from dropdown
3. Select today's date
4. Choose status: Present or Absent
5. Click **"✓ Mark Attendance"**

**Sample Attendance for Today:**
- EMP001 - Present
- EMP002 - Present
- EMP003 - Absent
- EMP004 - Present
- EMP005 - Present

---

### Method 2: Using Django Admin Panel

1. First, create a superuser:
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

2. Go to: http://localhost:8000/admin
3. Login with superuser credentials
4. Add employees and attendance records manually

---

### Method 3: Using API Directly (For Developers)

#### Add Employee via API

```bash
# Add Employee 1
curl -X POST http://localhost:8000/api/employees/ \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP001",
    "full_name": "John Doe",
    "email": "john.doe@company.com",
    "department": "Engineering"
  }'

# Add Employee 2
curl -X POST http://localhost:8000/api/employees/ \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "EMP002",
    "full_name": "Sarah Smith",
    "email": "sarah.smith@company.com",
    "department": "Human Resources"
  }'
```

#### Mark Attendance via API

First, get the employee ID (not employee_id field, but the database pk):

```bash
# List all employees
curl http://localhost:8000/api/employees/
```

Then mark attendance (replace `1` with actual employee pk):

```bash
curl -X POST http://localhost:8000/api/attendance/ \
  -H "Content-Type: application/json" \
  -d '{
    "employee": 1,
    "date": "2026-02-13",
    "status": "PRESENT"
  }'
```

---

## 🎯 Common Use Cases

### 1. Daily Attendance Workflow

**Morning Routine:**
1. Go to Attendance page
2. Mark attendance for each employee as they arrive
3. Check Dashboard to see present/absent count

**End of Day:**
1. View all attendance records
2. Verify all employees are marked
3. Export data if needed (future feature)

### 2. Managing New Hires

**When Adding New Employee:**
1. Go to Employee Management
2. Click Add Employee
3. Fill in details:
   - Unique Employee ID (e.g., EMP006)
   - Full name
   - Company email
   - Department
4. New employee appears in attendance dropdown immediately

### 3. Removing Employees

**When Employee Leaves:**
1. Go to Employee Management
2. Find employee in table
3. Click Delete button
4. Confirm deletion
5. All their attendance records are preserved

---

## 📋 Testing the Application

### Test Scenario 1: Happy Path

1. **Add 5 employees** using sample data above
2. **View Dashboard** - Should show 5 total employees
3. **Mark attendance** for 4 employees as Present
4. **Mark attendance** for 1 employee as Absent
5. **View Dashboard** - Should show:
   - Total Employees: 5
   - Present Today: 4
   - Absent Today: 1
6. **Filter attendance** by today's date
7. **View attendance** by specific employee

### Test Scenario 2: Validation Testing

**Test Duplicate Employee ID:**
1. Add employee with ID "EMP001"
2. Try adding another employee with same ID "EMP001"
3. Should see error: "Employee with this ID already exists"

**Test Invalid Email:**
1. Try adding employee with email "notanemail"
2. Should see validation error

**Test Duplicate Attendance:**
1. Mark attendance for EMP001 today
2. Try marking attendance for EMP001 again today
3. Should see error: "Attendance already marked"

**Test Required Fields:**
1. Try submitting employee form with empty fields
2. Should see "Field is required" errors

---

## 🔧 Troubleshooting

### If Frontend Shows "Failed to load"

```bash
# Check if backend is running
curl http://localhost:8000/api/employees/

# If not responding, restart services
docker-compose restart backend
```

### If Changes Don't Appear

```bash
# Clear browser cache
# Or open in incognito/private mode
# Or hard refresh: Ctrl + Shift + R (Windows/Linux) or Cmd + Shift + R (Mac)
```

### If Database Has Issues

```bash
# Stop everything
docker-compose down -v

# Rebuild from scratch
docker-compose up --build
```

---

## 📊 Sample Data Summary

After adding all sample data, your application will have:

**5 Employees:**
1. John Doe (Engineering) - EMP001
2. Sarah Smith (HR) - EMP002
3. Michael Chen (Finance) - EMP003
4. Emily Johnson (Marketing) - EMP004
5. David Martinez (Engineering) - EMP005

**Sample Attendance for 2026-02-13:**
- 4 Present: EMP001, EMP002, EMP004, EMP005
- 1 Absent: EMP003

**Dashboard Stats:**
- Total Employees: 5
- Present Today: 4
- Absent Today: 1

---

## 🎨 UI Features to Explore

1. **Smooth Animations**: Notice the fade-in effects when pages load
2. **Hover Effects**: Hover over cards, buttons, and table rows
3. **Toast Notifications**: Success/error messages appear top-right
4. **Modal Dialogs**: Add employee in a clean overlay
5. **Status Badges**: Green for Present, Red for Absent
6. **Empty States**: Try filtering with no results
7. **Loading States**: Watch spinners during API calls
8. **Responsive Design**: Resize browser window

---

## 🔄 Stopping the Application

```bash
# Stop services (keeps data)
docker-compose down

# Stop and remove all data (fresh start)
docker-compose down -v
```

---

## 📝 Next Steps

1. **Customize**: Modify colors in `frontend/src/index.css`
2. **Extend**: Add more fields to Employee model
3. **Deploy**: Follow README.md deployment section
4. **Backup**: Export database regularly
5. **Monitor**: Check logs with `docker-compose logs -f`

---

**Happy Testing! 🚀**
