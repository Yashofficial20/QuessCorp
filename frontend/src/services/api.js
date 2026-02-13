import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API
export const employeeAPI = {
  getAll: () => api.get('/employees/'),
  create: (data) => api.post('/employees/', data),
  delete: (id) => api.delete(`/employees/${id}/`),
};

// Attendance API
export const attendanceAPI = {
  mark: (data) => api.post('/attendance/', data),
  getByEmployee: (empId) => api.get(`/attendance/${empId}/`),
  getAll: (date = null) => {
    const params = date ? { date } : {};
    return api.get('/attendance/all/', { params });
  },
};

export default api;
