import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useAppStore } from "../../store/appStore";
import { useNotifications } from "../../hooks/useNotifications";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AppLayout({ children, title, subtitle }: AppLayoutProps) {
  const { sidebarOpen } = useAppStore();
  useNotifications(); // register SW and schedule demo notification

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          transition: "all 0.25s",
        }}
      >
        <TopBar title={title} subtitle={subtitle} />
        <Box sx={{ flex: 1, p: { xs: 2, md: 3 }, overflow: "auto" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
