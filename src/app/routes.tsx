import { Navigate, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Patients from "../pages/Patients";
import PatientDetail from "../pages/PatientDetail";
import Notifications from "../pages/Notifications";
import ProtectedRoute from "../components/ui/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="main"
    sx={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", backgroundColor: "background.default" }}
  >
    {children}
  </Box>
);

export default function AppRoutes() {
  const { authLoading, user } = useAuth();

  if (authLoading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "100vh", color: "text.primary" }}>
        <CircularProgress size={36} />
        <Box sx={{ color: "text.secondary", fontSize: 14, mt: 2 }}>Loading HealthOS...</Box>
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <PageWrapper><Login /></PageWrapper>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
      <Route path="/patients/:id" element={<ProtectedRoute><PatientDetail /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
