import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import ManagementScreen from "./screens/Dashboards/ManagementScreen/ManagementScreen";
import OnboardingScreen from "./screens/Dashboards/OnboardingScreen/OnboardingScreen";
import CostExplorerScreen from "./screens/Dashboards/CostExplorerScreen/CostExplorerScreen";
import AwsScreen from "./screens/Dashboards/AWSScreen/AwsScreen";
import Unauthorized from "./Routes/Unauthorized";
import Dashboard from "./screens/DashboardLayout/DashboardLayout";
import AddUser from "./screens/AddUser/AddUser";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/actions";
import { toast } from "react-toastify";
import UserInit from "./Routes/UserInit";
import Thankyou from "./Routes/Thankyou";
import EditUser from "./components/EditUser/EditUser";

const RootNavigation = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    if (!token) {
      setLoading(false);
      navigate("/login");
    }
    const fetchUser = async () => {
      try {
        const { data: user } = await axios.get("/auth/me");
        dispatch(setCurrentUser(user));
      } catch (e) {
        console.error("Error fetching users: ", e);
        toast.error("Couldn't fetch users!");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchUser();
    }
  }, []);

  return loading ? null : (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/" element={<UserInit />} />
      <Route
        element={
          <ProtectedRoutes allowedRoles={["ADMIN", "READ_ONLY", "CUSTOMER"]} />
        }
      >
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="user-management" element={<ManagementScreen />} />
          <Route path="user-management/create" element={<AddUser />} />
          <Route path="user-management/update" element={<EditUser />} />
          <Route path="onboarding" element={<OnboardingScreen />} />
          <Route path="cost-analysis" element={<CostExplorerScreen />} />
          <Route path="aws" element={<AwsScreen />} />
          <Route path="thankyou" element={<Thankyou />} />
        </Route>
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default RootNavigation;
