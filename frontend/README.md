# Employee Attendance & Leave Management System - Frontend

## Description

This is the frontend for the Employee Attendance & Leave Management System built with React and styled using Tailwind CSS. It allows employees to manage their attendance and leave requests, and for admins to manage employee data and approve/reject leave requests.

---

## Pages

### 1. **Login Page**
- **Purpose**: Allows employees and admins to log in using their email and password.
- **Fields**:
  - Email
  - Password
- **API Endpoint**: `POST /api/auth/login`

---

### 2. **Dashboard Page**
- **Purpose**: Displays the employee's dashboard with an overview of their attendance and leave status.
- **Key Features**:
  - Displays the employee's attendance summary (e.g., total days worked, leave balance).
  - Shows recent leave requests and status.
  - Provides a button to request new leave.
  - **API Endpoints**:
    - `GET /api/attendance/:employeeId`
    - `GET /api/leave/:employeeId`

---

### 3. **Attendance Page**
- **Purpose**: Allows employees to mark their attendance by clocking in and out.
- **Key Features**:
  - Button to clock-in.
  - Button to clock-out.
  - Display of current clock-in status (if any).
- **API Endpoint**:
  - `POST /api/attendance` (For clock-in/clock-out)

---

### 4. **Leave Request Page**
- **Purpose**: Allows employees to submit leave requests.
- **Fields**:
  - Leave Type (e.g., Sick, Vacation, Casual)
  - Start Date
  - End Date
- **Key Features**:
  - Form to submit a new leave request.
  - Displays current leave requests with their status (e.g., pending, approved, rejected).
- **API Endpoints**:
  - `POST /api/leave`
  - `GET /api/leave/:employeeId`

---

### 5. **Admin Panel (For Admin Users Only)**
- **Purpose**: Allows admins to manage employees and approve/reject leave requests.
- **Key Features**:
  - View list of all employees.
  - Manage employee details (Add, Edit, Delete).
  - View all leave requests and their status.
  - Approve or reject leave requests.
- **API Endpoints**:
  - `GET /api/employees`
  - `POST /api/employees`
  - `PUT /api/employees/:id`
  - `DELETE /api/employees/:id`
  - `PATCH /api/leave/:id/approve`
  - `PATCH /api/leave/:id/reject`

---

## Key Features for Employees
1. **Attendance**:
   - Employees can **clock-in** at the start of the day and **clock-out** at the end.
   - They can view their attendance record and leave balance.

2. **Leave Management**:
   - Employees can request leave and view their past leave requests with their current status.
   - The leave request form will include leave type, start date, and end date.

---

### Summary:

- The **Login Page** allows the user to authenticate.
- The **Dashboard Page** shows an overview of attendance and leave information.
- The **Attendance Page** provides buttons to **clock-in** and **clock-out**.
- The **Leave Request Page** allows employees to submit and view leave requests.
- The **Admin Panel** is available for admins to manage employees and approve/reject leave requests.

Let me know if you'd like to add more details or make any adjustments!