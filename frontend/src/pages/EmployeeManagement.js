import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Toast from '../components/Toast';
import Spinner from '../components/Spinner';
import { employeeAPI } from '../services/api';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        department: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const response = await employeeAPI.getAll();
            setEmployees(response.data);
        } catch (error) {
            showToast('Failed to load employees', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Full name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.department.trim()) {
            newErrors.department = 'Department is required';
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
            await employeeAPI.create(formData);
            showToast('Employee added successfully', 'success');
            setShowModal(false);
            setFormData({ full_name: '', email: '', department: '' });
            loadEmployees();
        } catch (error) {
            if (error.response?.status === 409) {
                showToast('Employee with this ID already exists', 'error');
            } else {
                showToast('Failed to add employee', 'error');
            }
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) {
            return;
        }

        try {
            await employeeAPI.delete(id);
            showToast('Employee deleted successfully', 'success');
            loadEmployees();
        } catch (error) {
            showToast('Failed to delete employee', 'error');
        }
    };

    const showToast = (message, type) => {
        setToast({ message, type });
    };

    const columns = [
        { key: 'employee_id', label: 'Employee ID' },
        { key: 'full_name', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'department', label: 'Department' },
        {
            key: 'created_at',
            label: 'Joined Date',
            render: (row) => new Date(row.created_at).toLocaleDateString(),
        },
    ];

    if (loading && employees.length === 0) {
        return <Spinner />;
    }

    return (
        <div className="fade-in" style={{ padding: '2rem 0' }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                            Employee Management
                        </h1>
                        <p style={{ color: 'var(--neutral-500)', fontSize: '0.875rem' }}>
                            Manage your workforce efficiently
                        </p>
                    </div>
                    <Button onClick={() => setShowModal(true)} variant="primary">
                        + Add Employee
                    </Button>
                </div>

                {loading ? <Spinner /> : <Table columns={columns} data={employees} onDelete={handleDelete} />}
            </Card>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Employee">
                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '1rem', backgroundColor: 'var(--primary-50)', borderRadius: '8px', marginBottom: '1rem' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--primary-700)' }}>
                            <strong>ℹ️ Employee ID will be auto-generated</strong><br />
                            The system will automatically assign the next available ID (e.g., EMP051, EMP052)
                        </p>
                    </div>
                    <Input
                        label="Full Name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        error={errors.full_name}
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@company.com"
                        required
                        error={errors.email}
                    />
                    <Input
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="Engineering"
                        required
                        error={errors.department}
                    />
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                        <Button type="submit" variant="primary" style={{ flex: 1 }}>
                            Add Employee
                        </Button>
                        <Button type="button" variant="secondary" onClick={() => setShowModal(false)} style={{ flex: 1 }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

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

export default EmployeeManagement;
