import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Select from '../components/Select';
import Input from '../components/Input';
import Toast from '../components/Toast';
import Spinner from '../components/Spinner';
import { employeeAPI, attendanceAPI } from '../services/api';

const AttendanceManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [formData, setFormData] = useState({
        employee: '',
        date: new Date().toISOString().split('T')[0],
        status: 'PRESENT',
    });
    const [filterDate, setFilterDate] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadEmployees();
        loadAttendance();
    }, []);

    useEffect(() => {
        loadAttendance();
    }, [filterDate]);

    const loadEmployees = async () => {
        try {
            const response = await employeeAPI.getAll();
            setEmployees(response.data);
        } catch (error) {
            showToast('Failed to load employees', 'error');
        }
    };

    const loadAttendance = async () => {
        try {
            setLoading(true);
            const response = await attendanceAPI.getAll(filterDate || null);
            setAttendanceRecords(response.data);
        } catch (error) {
            showToast('Failed to load attendance records', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.employee) {
            newErrors.employee = 'Please select an employee';
        }
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await attendanceAPI.mark(formData);
            showToast('Attendance marked successfully', 'success');
            setFormData({
                employee: '',
                date: new Date().toISOString().split('T')[0],
                status: 'PRESENT',
            });
            loadAttendance();
        } catch (error) {
            if (error.response?.status === 409) {
                showToast('Attendance already marked for this employee on this date', 'error');
            } else {
                showToast('Failed to mark attendance', 'error');
            }
        }
    };

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const employeeOptions = employees.map((emp) => ({
        value: emp.id,
        label: `${emp.employee_id} - ${emp.full_name}`,
    }));

    const statusOptions = [
        { value: 'PRESENT', label: 'Present' },
        { value: 'ABSENT', label: 'Absent' },
    ];

    const columns = [
        { key: 'employee_id_display', label: 'Employee ID' },
        { key: 'employee_name', label: 'Employee Name' },
        {
            key: 'date',
            label: 'Date',
            render: (row) => new Date(row.date).toLocaleDateString(),
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <span className={`badge ${row.status === 'PRESENT' ? 'badge-success' : 'badge-danger'}`}>
                    {row.status}
                </span>
            ),
        },
    ];

    return (
        <div className="fade-in" style={{ padding: '2rem 0' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {/* Mark Attendance Form */}
                <Card>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        Mark Attendance
                    </h2>
                    <p style={{ color: 'var(--neutral-500)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                        Record daily attendance for employees
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                            <Select
                                label="Employee"
                                name="employee"
                                value={formData.employee}
                                onChange={handleInputChange}
                                options={employeeOptions}
                                required
                                error={errors.employee}
                                placeholder="Select Employee"
                            />
                            <Input
                                label="Date"
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                error={errors.date}
                            />
                            <Select
                                label="Status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                options={statusOptions}
                                required
                            />
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Button type="submit" variant="success" style={{ width: '100%' }}>
                                    ✓ Mark Attendance
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>

                {/* Attendance Records */}
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                Attendance Records
                            </h2>
                            <p style={{ color: 'var(--neutral-500)', fontSize: '0.875rem' }}>
                                View and filter attendance history
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                placeholder="Filter by date"
                            />
                            {filterDate && (
                                <Button variant="secondary" onClick={() => setFilterDate('')}>
                                    Clear Filter
                                </Button>
                            )}
                        </div>
                    </div>

                    {loading ? <Spinner /> : <Table columns={columns} data={attendanceRecords} />}
                </Card>
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default AttendanceManagement;
