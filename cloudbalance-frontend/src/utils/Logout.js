// utils/handleLogout.js
import axios from "axios";
import { logout as logoutAction } from "../redux/actions/authActions";

const handleLogout = (dispatch, navigate) => {
  const token = localStorage.getItem("token");
  //Blacklist token from backend
  axios.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Remove from Redux
  dispatch(logoutAction());
  // Remove from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("selectedAwsAccountId");
  localStorage.removeItem("selectedCaAccountId");
  // toast.success("Logged Out successfully");

  if (navigate) navigate("/login");
  else window.location.href = "/login";
};

export default handleLogout;
