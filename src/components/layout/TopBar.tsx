import { AppBar, Toolbar, Typography, IconButton, Badge, Box, InputBase, alpha } from "@mui/material";
import { Notifications, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const { unreadCount } = useAppStore();
  const navigate = useNavigate();
  const unread = unreadCount();

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "background.paper", borderBottom: "1px solid", borderColor: "divider", color: "text.primary" }}>
      <Toolbar sx={{ gap: 2, minHeight: "68px !important" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{title}</Typography>
          {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05), border: "1px solid", borderColor: "divider", borderRadius: 3, px: 2, py: 0.7, gap: 1, width: 220 }}>
          {/* <Search sx={{ fontSize: 18, color: "text.secondary" }} /> */}
          <InputBase placeholder="Search..." sx={{ fontSize: 14, flex: 1 }} />
        </Box>
        <IconButton onClick={() => navigate("/notifications")}>
          <Badge badgeContent={unread} color="error" max={9}>
            <Notifications />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}