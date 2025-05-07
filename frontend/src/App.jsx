import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Login from "./page/Login";
import Dashboard from "./page/employee/Dashboard";
import Attendance from "./page/employee/Attendance";
import Leaves from "./page/employee/Leaves";
import ProtectedRoutes from "./Layout/ProtectedRoutes";
import { AuthProvider, useAuth } from "./Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AdminDashboard from "./page/admin/AdminDashboard";
import AllEmployees from "./page/admin/AllEmployees";
import EmployeesLeaves from "./page/admin/EmployeeLeaves";

export const RoleRedirect = () => {
  const { user } = useAuth();

  if (user?.role === "admin") return <Navigate to="/admin" replace />;
  if (user?.role === "employee") return <Navigate to="/employee" replace />;

  return <Navigate to="/login" replace />;
};

const App = () => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster
            theme="system"
            toastOptions={{
              classNames: {
                toast:
                  "bg-popover text-popover-foreground border border-border",
              },
            }}
          />

          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/employee"
              element={
                <ProtectedRoutes allowedRoles="employee">
                  <MainLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="leave" element={<Leaves />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoutes allowedRoles="admin">
                  <MainLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="employees" element={<AllEmployees />} />
              <Route path="employees-leaves" element={<EmployeesLeaves />} />
            </Route>

            <Route
              path="/"
              element={
                <ProtectedRoutes allowedRoles={["admin", "employee"]}>
                  <RoleRedirect />
                </ProtectedRoutes>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
