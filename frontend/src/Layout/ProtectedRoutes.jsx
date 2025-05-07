import Loading from "@/components/Loading";
import { useAuth } from "@/Context/AuthProvider";
import { Axios } from "@/lib/Axios";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoutes = ({ allowedRoles, children }) => {
  const { user, setUser, loading, setLoading, someChange, SetChange } =
    useAuth();
  const token = localStorage.getItem("auth");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await Axios.get("/auth/me");
        setUser(res.data.user);
        SetChange(false);
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("auth");
        toast.error("Not Authorized");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (token && (!user || someChange)) {
      fetchUser();
    }
  }, [token, user, someChange, setUser, setLoading, SetChange]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading || !user) {
    return <Loading />;
  }

  if (Array.isArray(allowedRoles)) {
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/login" replace />;
    }
  } else if (user.role !== allowedRoles) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
