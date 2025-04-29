// utils/handleLogout.js
import axios from "axios";
import { logout as logoutAction } from "../redux/actions/authActions";
import { toast } from "react-toastify";

const handleLogout = (dispatch, navigate) => {
  const token = localStorage.getItem("token");
  //Blacklist token from backend
  try {
    axios.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    toast.error(err.response.data.message);
  }

  // Remove from Redux
  dispatch(logoutAction());
  // Remove from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("selectedAwsAccountId");
  localStorage.removeItem("selectedCaAccountId");

  if (navigate) navigate("/login");
  else window.location.href = "/login";
};

export default handleLogout;
