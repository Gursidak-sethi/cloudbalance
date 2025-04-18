import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BarChartIcon from "@mui/icons-material/BarChart";
import MemoryIcon from "@mui/icons-material/Memory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const RouteMapper = {
  "USER_MANAGEMENT": "/dashboard/user-management",
  "ONBOARDING": "/dashboard/onboarding",
  "COST_EXPLORER": "/dashboard/cost-analysis",
  "AWS": "/dashboard/aws",
};

export const IconMapper = {
  "USER_MANAGEMENT": <ManageAccountsIcon />,
  "ONBOARDING": <AssignmentIndIcon />,
  "COST_EXPLORER": <MemoryIcon />,
  "AWS": <BarChartIcon />,
};
