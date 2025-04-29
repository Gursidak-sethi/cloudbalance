import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardRedirect = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "ADMIN" || user?.role === "READ_ONLY") {
      navigate("user-management");
    } else if (user?.role === "CUSTOMER") {
      navigate("cost-analysis");
    } else {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  return null;
};

export default DashboardRedirect;
