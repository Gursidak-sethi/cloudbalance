import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/actions";
import { toast } from "react-toastify";
import handleLogout from "../utils/Logout";

const UserInit = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log("extracting token in dashboard from localstorage", token);
        const { data: user } = await axios.get("/auth/me");
        dispatch(setCurrentUser(user));

        if (user.role === "ADMIN" || user.role === "READ_ONLY") {
          navigate("/dashboard/user-management");
        } else if (user.role === "CUSTOMER") {
          navigate("/dashboard/cost-analysis");
        } else {
          toast.error("Unauthorized!");
          handleLogout(dispatch);
        }
      } catch (e) {
        console.error("Error fetching user in homescreen/dashboard: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return loading ? null : <div></div>;
};

export default UserInit;
