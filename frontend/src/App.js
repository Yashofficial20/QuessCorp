import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard onNavigate={setCurrentPage} />;
            case 'employees':
                return <EmployeeManagement />;
            case 'attendance':
                return <AttendanceManagement />;
            default:
                return <Dashboard onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="app">
            {/* Header */}
            <header className="app-header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <span className="logo-icon">🏢</span>
                            <span className="logo-text">HRMS Lite</span>
                        </div>
                        <nav className="nav">
                            <button
                                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setCurrentPage('dashboard')}
                            >
                                📊 Dashboard
                            </button>
                            <button
                                className={`nav-link ${currentPage === 'employees' ? 'active' : ''}`}
                                onClick={() => setCurrentPage('employees')}
                            >
                                👥 Employees
                            </button>
                            <button
                                className={`nav-link ${currentPage === 'attendance' ? 'active' : ''}`}
                                onClick={() => setCurrentPage('attendance')}
                            >
                                📋 Attendance
                            </button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="app-main">
                <div className="container">
                    {renderPage()}
                </div>
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <div className="container">
                    <p>© 2026 HRMS Lite. Built with ❤️ using Django & React</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
