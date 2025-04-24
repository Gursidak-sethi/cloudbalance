// axiosConfig.js or wherever axios is configured
import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/actions/authActions";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:8082/api";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      store.dispatch(logout());
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
