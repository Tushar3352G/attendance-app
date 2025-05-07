import axios from "axios";
import { toast } from "sonner";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: {
    authorization: getToken() ? `Bearer ${getToken()}` : "",
  },
});

let refreshTimeout = null;

function getToken() {
  return localStorage.getItem("auth");
}

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
}

function scheduleTokenRefresh() {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout); // Avoid multiple timers
  }

  const token = getToken();
  if (!token) return;

  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return;

  const currentTime = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = decoded.exp - currentTime;

  const refreshTime = Math.max(0, (timeUntilExpiry - 120) * 1000); // 2 min before expiry

  refreshTimeout = setTimeout(async () => {
    try {
      const latestToken = getToken(); // Always re-read current token
      const response = await Axios.get("/auth/refresh", {
        headers: {
          authorization: `Bearer ${latestToken}`,
        },
      });

      if (response.status === 200 && response.data.token) {
        // console.log("✅ Token refreshed successfully");
        setToken(response.data.token); // this will re-trigger scheduling
      } else {
        console.error("❌ Token refresh failed", response);
      }
    } catch (error) {
      console.error("❌ Error during token refresh:", error);
    }
  }, refreshTime);
}

function setToken(token) {
  localStorage.setItem("auth", token);
  Axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  scheduleTokenRefresh();
}

scheduleTokenRefresh();

Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("auth");
      window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);

export { getToken, setToken, decodeJWT };
