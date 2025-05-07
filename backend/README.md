# Employee Attendance & Leave Management System - Backend

## Description

This is the backend for the Employee Attendance & Leave Management System built with the MERN Stack (MongoDB, Express, React, Node.js). It allows tracking employee attendance, managing leave requests, and providing admin functionalities.

---

## Backend Models and Data

### 1. **Employee Model**

This model stores employee details, including authentication and role-based access.

**Fields:**
- `name` (String) – Full name of the employee.
- `email` (String, Unique) – Email address (used for login).
- `password` (String) – Hashed password for authentication.
- `role` (String) – Role of the employee (`admin`, `employee`).
- `department` (String) – Department of the employee (e.g., HR, IT).
- `leaveBalance` (Number) – Total remaining leave days.
- `attendance` (Array) – References to the attendance records.
- `leaveRequests` (Array) – References to the leave requests.

### 2. **Attendance Model**

This model tracks employee attendance with clock-in and clock-out times.

**Fields:**
- `employeeId` (ObjectId) – Reference to the Employee model.
- `status` (String) – `clock-in` or `clock-out`.
- `date` (Date) – The date of the attendance.
- `time` (String) – The exact time of clock-in/clock-out.

### 3. **Leave Model**

This model stores employee leave requests and their status.

**Fields:**
- `employeeId` (ObjectId) – Reference to the Employee model.
- `leaveType` (String) – Type of leave (`sick`, `vacation`, etc.).
- `startDate` (Date) – Start date of the leave.
- `endDate` (Date) – End date of the leave.
- `status` (String) – Leave status (`pending`, `approved`, `rejected`).

---

## API Endpoints

### Authentication
- **POST /api/auth/login**: Employee/Admin login (returns a JWT token).

### Employee Management (Admin only)
- **GET /api/employees**: List all employees.
- **POST /api/employees**: Add a new employee.
- **PUT /api/employees/:id**: Update employee details.
- **DELETE /api/employees/:id**: Delete an employee.

### Attendance
- **POST /api/attendance**: Mark attendance (clock-in/clock-out).
- **GET /api/attendance/:employeeId**: Get attendance records for an employee.

### Leave Management
- **POST /api/leave**: Request leave for an employee.
- **GET /api/leave/:employeeId**: Get leave records for an employee.
- **PATCH /api/leave/:id/approve**: Admin approves leave request.
- **PATCH /api/leave/:id/reject**: Admin rejects leave request.

---

## License

This project is licensed under the MIT License.

