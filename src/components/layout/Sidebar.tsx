import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider, Tooltip, IconButton, Badge } from "@mui/material";
import { Dashboard, Analytics, People, Notifications, Logout, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAppStore } from "../../store/appStore";
import Logo from "./Logo";
import { theme } from "@/app/theme";
import toast from "react-hot-toast";


const SIDEBAR_W = 260;
const SIDEBAR_MINI = 72;

const navItems = [
  { label: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { label: "Analytics", icon: <Analytics />, path: "/analytics" },
  { label: "Patients", icon: <People />, path: "/patients" },
  { label: "Notifications", icon: <Notifications />, path: "/notifications" },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, user, unreadCount } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const unread = unreadCount();

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const userInitials = user?.email ? user.email.slice(0, 2).toUpperCase() : "US";

  return (
    <Drawer
      variant="permanent"

      sx={{
        width: sidebarOpen ? SIDEBAR_W : SIDEBAR_MINI,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? SIDEBAR_W : SIDEBAR_MINI,
          boxSizing: "border-box",
          background: "linear-gradient(135deg, rgba(69, 56, 202, 0.95) 0%, rgba(45, 35, 128, 0.95) 50%, rgba(16, 185, 129, 0.95) 100%)",
          color: "white",
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ height: 68, display: "flex", alignItems: "center", px: sidebarOpen ? 2.5 : 1.5, gap: 1.5, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <Logo textFallback="HB" src="/logo.png" />
        {sidebarOpen && (
          <Box sx={{ overflow: "hidden" }}>
            <Typography sx={{ color: theme.palette.primary.contrastText, fontWeight: 800, fontSize: 15, lineHeight: 1.2, whiteSpace: "nowrap" }}>RagaMed</Typography>
            <Typography sx={{ color: theme.palette.primary.contrastText, fontSize: 11, whiteSpace: "nowrap", mt: 1 }}>Healthcare Platform</Typography>
          </Box>
        )}
      </Box>

      {/* Toggle */}
      <Box sx={{ display: "flex", justifyContent: sidebarOpen ? "flex-end" : "center", px: 1, pt: 1 }}>
        <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} size="small" sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.08)" } }}>
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      {/* Nav */}
      <List sx={{ px: 1, pt: 1, flex: 1 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          const isNotif = item.path === "/notifications";
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip title={sidebarOpen ? "" : item.label} placement="right">
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 3,
                    minHeight: 46,
                    px: sidebarOpen ? 2 : 1.5,
                    justifyContent: sidebarOpen ? "initial" : "center",
                    position: "relative",
                    ...(active && {
                      background: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    }),

                    "&:hover": {
                      background: active
                        ? "rgba(255,255,255,0.16)"
                        : "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: sidebarOpen ? 36 : "auto",
                      transition: "0.2s",
                      color: theme.palette.primary.contrastText
                    }}
                  >
                    {isNotif && unread > 0 ? (
                      <Badge badgeContent={unread} color="error" max={9}>
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>

                  {sidebarOpen && (
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: 14,
                            fontWeight: active ? 600 : 500,
                            color: "#ffffff",
                            transition: "0.2s",
                          },
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mx: 1 }} />

      {/* User + Logout */}
      <Box sx={{ p: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: 2.5, bgcolor: "rgba(255,255,255,0.05)", mb: 1, overflow: "hidden" }}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: 13,
              fontWeight: 600,
              bgcolor: "#ffffff",
              color: "#1e293b",
              border: "1px solid rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}
          >
            {userInitials}
          </Avatar>
          {sidebarOpen && (
            <Box sx={{ overflow: "hidden", flex: 1 }}>
              <Typography sx={{ color: "#fff", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user?.email || "User Email"}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: 11, whiteSpace: "nowrap" }}>Admin</Typography>
            </Box>
          )}
        </Box>
        <Tooltip title={sidebarOpen ? "" : "Logout"} placement="right">
          <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2.5, px: sidebarOpen ? 2 : 1.5, justifyContent: sidebarOpen ? "initial" : "center", "&:hover": { bgcolor: "rgba(239,68,68,0.15)" } }}>
            <ListItemIcon sx={{ minWidth: sidebarOpen ? 36 : "auto", color: theme.palette.primary.contrastText }}>
              <Logout fontSize="small" />
            </ListItemIcon>
            {sidebarOpen &&
              <ListItemText
                primary="Logout"
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 14,
                      fontWeight: 500,
                    },
                  },
                }}
              />}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}