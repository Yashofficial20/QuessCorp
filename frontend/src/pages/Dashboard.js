import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { employeeAPI, attendanceAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = ({ onNavigate }) => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        presentToday: 0,
        absentToday: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);

            // Get total employees
            const employeesRes = await employeeAPI.getAll();
            const totalEmployees = employeesRes.data.length;

            // Get today's attendance
            const today = new Date().toISOString().split('T')[0];
            const attendanceRes = await attendanceAPI.getAll(today);

            const presentToday = attendanceRes.data.filter(a => a.status === 'PRESENT').length;
            const absentToday = attendanceRes.data.filter(a => a.status === 'ABSENT').length;

            setStats({ totalEmployees, presentToday, absentToday });
        } catch (error) {
            console.error('Error loading dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="dashboard fade-in">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">Welcome to HRMS Lite - Your employee management hub</p>
            </div>

            <div className="stats-grid">
                <Card className="stat-card stat-card-primary">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalEmployees}</div>
                        <div className="stat-label">Total Employees</div>
                    </div>
                </Card>

                <Card className="stat-card stat-card-success">
                    <div className="stat-icon">✓</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.presentToday}</div>
                        <div className="stat-label">Present Today</div>
                    </div>
                </Card>

                <Card className="stat-card stat-card-danger">
                    <div className="stat-icon">✕</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.absentToday}</div>
                        <div className="stat-label">Absent Today</div>
                    </div>
                </Card>
            </div>

            <div className="quick-actions">
                <Card>
                    <h2 className="section-title">Quick Actions</h2>
                    <p className="section-subtitle">Access key features quickly</p>
                    <div className="actions-grid">
                        <Button onClick={() => onNavigate('employees')} variant="primary">
                            👤 Manage Employees
                        </Button>
                        <Button onClick={() => onNavigate('attendance')} variant="secondary">
                            📋 Track Attendance
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
