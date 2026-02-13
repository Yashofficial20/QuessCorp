# HRMS Lite - Human Resource Management System

A modern, production-ready HRMS Lite application for managing employees and tracking daily attendance. Built with Django REST Framework backend, React frontend, PostgreSQL database, and fully Dockerized.

![HRMS Lite](https://img.shields.io/badge/Status-Production%20Ready-success)
![Django](https://img.shields.io/badge/Django-5.0-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

---

## 🚀 Features

### Employee Management
- ✅ Add new employees with unique Employee ID
- ✅ View all employees in a clean, modern table
- ✅ Delete employees with confirmation
- ✅ Email validation and duplicate prevention
- ✅ Real-time form validation

### Attendance Tracking
- ✅ Mark daily attendance (Present/Absent)
- ✅ View attendance records by employee
- ✅ Filter attendance by date
- ✅ Prevent duplicate attendance entries
- ✅ Status badges and visual indicators

### Dashboard
- 📊 Total employee count
- ✓ Present employees today
- ✕ Absent employees today
- 🎯 Quick action buttons

---

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, professional interface with soft color palette (blues, purples, grays)
- **Smooth Animations**: Fade-in effects, hover transitions, and micro-interactions
- **Card-based Layout**: Glassmorphism and subtle shadows
- **Responsive**: Mobile-friendly design
- **Loading States**: Spinners and skeletons for better UX
- **Empty States**: Friendly messages with icons
- **Toast Notifications**: Success/error feedback
- **Modal Forms**: Clean, accessible form dialogs

---

## 🛠️ Tech Stack

### Backend
- **Django 5.0** - Web framework
- **Django REST Framework 3.14** - REST API
- **PostgreSQL 15** - Database
- **psycopg2** - PostgreSQL adapter
- **django-cors-headers** - CORS support

### Frontend
- **React 18.2** - UI library
- **Axios** - HTTP client
- **Modern CSS** - Custom design system
- **Inter Font** - Typography

### DevOps
- **Docker & Docker Compose** - Containerization
- **Nginx** - Production web server
- **PostgreSQL Alpine** - Lightweight database

---

## 📁 Project Structure

```
Quess-Cross/
├── docker-compose.yml          # Docker orchestration
├── .env.example                # Environment variables template
├── README.md                   # This file
│
├── backend/                    # Django Backend
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── manage.py
│   ├── wait-for-db.sh         # Database health check script
│   ├── core/                  # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── employees/             # Employee app
│   │   ├── models.py          # Employee model
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API views
│   │   └── urls.py
│   └── attendance/            # Attendance app
│       ├── models.py          # Attendance model
│       ├── serializers.py
│       ├── views.py
│       └── urls.py
│
└── frontend/                  # React Frontend
    ├── Dockerfile
    ├── nginx.conf             # Nginx configuration
    ├── package.json
    └── src/
        ├── components/        # Reusable components
        │   ├── Button.js
        │   ├── Input.js
        │   ├── Select.js
        │   ├── Card.js
        │   ├── Modal.js
        │   ├── Table.js
        │   ├── Toast.js
        │   └── Spinner.js
        ├── pages/             # Page components
        │   ├── Dashboard.js
        │   ├── EmployeeManagement.js
        │   └── AttendanceManagement.js
        ├── services/          # API layer
        │   └── api.js
        ├── App.js             # Main app component
        ├── App.css
        ├── index.js
        └── index.css          # Design system
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│                     (http://localhost:3000)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    NGINX (Frontend)                          │
│              Serves React Build / Proxies API                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ API Calls (/api/*)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 DJANGO REST FRAMEWORK                        │
│                  (http://backend:8000)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  employees/    │  attendance/                       │   │
│  │  - POST /api/employees/                             │   │
│  │  - GET  /api/employees/                             │   │
│  │  - DELETE /api/employees/{id}/                      │   │
│  │  - POST /api/attendance/                            │   │
│  │  - GET  /api/attendance/{emp_id}/                   │   │
│  │  - GET  /api/attendance/all/?date={date}            │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ SQL Queries
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   POSTGRESQL DATABASE                        │
│                      (postgres:15)                           │
│  ┌──────────────────┐      ┌────────────────────────┐      │
│  │ employees_employee│      │ attendance_attendance  │      │
│  ├──────────────────┤      ├────────────────────────┤      │
│  │ id (PK)          │      │ id (PK)                │      │
│  │ employee_id      │◄─────┤ employee_id (FK)       │      │
│  │ full_name        │      │ date                   │      │
│  │ email            │      │ status                 │      │
│  │ department       │      │ created_at             │      │
│  │ created_at       │      └────────────────────────┘      │
│  └──────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Code Flow

### Adding an Employee

1. **User Action**: User fills employee form and clicks "Add Employee"
2. **Frontend**: 
   - Validates form fields (required, email format)
   - Calls `employeeAPI.create(data)` via Axios
3. **API Request**: `POST /api/employees/` with JSON payload
4. **Backend**:
   - `EmployeeSerializer` validates data
   - Checks for duplicate `employee_id` (unique constraint)
   - Saves to PostgreSQL
   - Returns 201 Created or 409 Conflict
5. **Frontend**: 
   - Shows success toast
   - Closes modal
   - Refreshes employee list

### Marking Attendance

1. **User Action**: Selects employee, date, status and submits
2. **Frontend**: 
   - Validates employee selection and date
   - Calls `attendanceAPI.mark(data)`
3. **API Request**: `POST /api/attendance/`
4. **Backend**:
   - Validates employee exists
   - Checks unique constraint (employee + date)
   - Saves attendance record
   - Returns 201 or 409 for duplicates
5. **Frontend**: 
   - Shows toast notification
   - Refreshes attendance table

---

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```bash
# Database Configuration
DB_NAME=hrms_db
DB_USER=hrms_user
DB_PASSWORD=hrms_password
DB_HOST=db
DB_PORT=5432

# Django Configuration
SECRET_KEY=your-secret-key-here
DEBUG=True

# Frontend Configuration
REACT_APP_API_URL=http://localhost:8000/api
```

> **Note**: For production, set `DEBUG=False` and use a strong `SECRET_KEY`

---

## 🐳 Docker Setup & Running

### Prerequisites

- Docker (20.10+)
- Docker Compose (2.0+)

### Quick Start

1. **Clone & Navigate**
   ```bash
   cd Quess-Cross
   ```

2. **Create Environment File**
   ```bash
   copy .env.example .env
   ```

3. **Build & Start Services**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build backend and frontend Docker images
   - Start PostgreSQL database
   - Wait for database to be healthy
   - Run Django migrations automatically
   - Start Django dev server on port 8000
   - Build React app and serve via Nginx on port 3000

4. **Access Application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000/api
   - **Django Admin**: http://localhost:8000/admin

### Docker Commands

```bash
# Start services
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild images
docker-compose up --build

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v
```

---

## 💻 Local Development (Without Docker)

### Backend Setup

1. **Create Virtual Environment**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Database**
   - Install PostgreSQL locally
   - Create database: `hrms_db`
   - Update `.env` with credentials

4. **Run Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create Superuser (Optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start Server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Access**: http://localhost:3000

---

## 📡 API Endpoints

### Employees

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| GET | `/api/employees/` | List all employees | 200 OK |
| POST | `/api/employees/` | Create employee | 201 Created, 400 Bad Request, 409 Conflict |
| DELETE | `/api/employees/{id}/` | Delete employee | 200 OK, 404 Not Found |

**POST Payload Example:**
```json
{
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john.doe@company.com",
  "department": "Engineering"
}
```

### Attendance

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|--------------|
| POST | `/api/attendance/` | Mark attendance | 201 Created, 400 Bad Request, 409 Conflict |
| GET | `/api/attendance/{emp_id}/` | Get employee attendance | 200 OK, 404 Not Found |
| GET | `/api/attendance/all/?date={YYYY-MM-DD}` | Get all attendance (optional filter) | 200 OK |

**POST Payload Example:**
```json
{
  "employee": 1,
  "date": "2026-02-13",
  "status": "PRESENT"
}
```

---

## 🎯 UI/UX Decisions

### Design Philosophy
- **Professional First**: Corporate-friendly colors and clean layouts
- **User Delight**: Subtle animations and smooth transitions
- **Visual Hierarchy**: Clear typography and spacing
- **Accessibility**: Keyboard navigation, semantic HTML

### Color Palette
- **Primary**: Indigo (#6366f1) - Trust, professionalism
- **Secondary**: Purple (#8b5cf6) - Creativity
- **Success**: Green (#10b981) - Positive actions
- **Danger**: Red (#ef4444) - Destructive actions
- **Neutral Grays**: Clean, minimal backgrounds

### Component Decisions
- **Cards**: Elevated, rounded corners for modern feel
- **Buttons**: Gradient backgrounds with hover lift effect
- **Tables**: Striped rows with gradient header
- **Modals**: Backdrop blur for depth
- **Forms**: Inline validation with clear error messages

---

## 📋 Assumptions & Limitations

### Assumptions
1. **Single Admin**: No user authentication required
2. **Single Timezone**: All dates/times in UTC
3. **English Only**: No internationalization
4. **Desktop First**: Optimized for desktop, responsive for mobile
5. **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)

### Known Limitations
1. **No Authentication**: All users have full access
2. **No Role-Based Access**: Cannot restrict features by role
3. **No Employee Edit**: Can only add/delete, not update
4. **No Bulk Operations**: Must add/delete one at a time
5. **No Reporting**: No PDF/Excel export functionality
6. **No Photos**: Employee profiles don't include photos
7. **No Notifications**: No email/SMS alerts

### Future Enhancements
- Multi-user authentication (JWT)
- Employee profile editing
- Leave management
- Payroll integration
- Advanced reporting & analytics
- Mobile app (React Native)

---

## 🚀 Deployment Notes

### Render (Backend)

1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `pip install -r backend/requirements.txt`
4. Set start command: `cd backend && python manage.py migrate && gunicorn core.wsgi:application`
5. Add PostgreSQL database
6. Set environment variables

### Vercel (Frontend)

1. Import project from GitHub
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `build`
5. Set `REACT_APP_API_URL` environment variable

### Railway (Full Stack)

1. Deploy from GitHub
2. Add PostgreSQL plugin
3. Configure environment variables
4. Set up services for backend and frontend

---

## 🐛 Troubleshooting

### Docker Issues

**Problem**: `Backend exited with code 1`
```bash
# Check logs
docker-compose logs backend

# Common fix: Database not ready
# Solution: wait-for-db.sh should handle this automatically
```

**Problem**: `Port already in use`
```bash
# Stop existing services
docker-compose down

# Check ports
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# Kill process or change port in docker-compose.yml
```

### Database Issues

**Problem**: `relation "employees_employee" does not exist`
```bash
# Run migrations manually
docker-compose exec backend python manage.py migrate
```

**Problem**: Database connection refused
```bash
# Check database health
docker-compose ps

# Restart services
docker-compose restart db backend
```

---

## 📝 License

This project is built for educational and demonstration purposes.

---

## 👨‍💻 Author

Built with ❤️ using Django & React

**Contact**:
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn]
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Django REST Framework Community
- React Community
- Docker Community
- Inter Font by Rasmus Andersson

---

**Happy Coding! 🚀**
