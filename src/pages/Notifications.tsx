import {
  Box,
  Card,
  Typography,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import {
  NotificationsActive,
  CheckCircle,
  Warning,
  Info,
  Error,
  DoneAll,
} from "@mui/icons-material";
import AppLayout from "../components/layout/AppLayout";
import { useAppStore } from "../store/appStore";
import { useNotifications } from "../hooks/useNotifications";
import type { Notification } from "../types";

const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  error: { icon: <Error fontSize="small" />, color: "#dc2626", bg: "#fee2e2" },
  warning: { icon: <Warning fontSize="small" />, color: "#d97706", bg: "#fef3c7" },
  success: { icon: <CheckCircle fontSize="small" />, color: "#16a34a", bg: "#dcfce7" },
  info: { icon: <Info fontSize="small" />, color: "#0284c7", bg: "#e0f2fe" },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function NotifCard({ notif, onRead }: { notif: Notification; onRead: (id: string) => void }) {
  const cfg = typeConfig[notif.type];
  return (
    <Box
      onClick={() => onRead(notif.id)}
      sx={{
        display: "flex",
        gap: 2,
        p: 2.5,
        cursor: "pointer",
        bgcolor: notif.read ? "transparent" : "rgba(6,182,212,0.04)",
        borderLeft: notif.read ? "3px solid transparent" : `3px solid ${cfg.color}`,
        transition: "all 0.15s",
        "&:hover": { bgcolor: "background.default" },
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          bgcolor: cfg.bg,
          color: cfg.color,
          flexShrink: 0,
        }}
      >
        {cfg.icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <Typography sx={{ fontWeight: notif.read ? 600 : 700, fontSize: 14 }}>{notif.title}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>{timeAgo(notif.timestamp)}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>{notif.message}</Typography>
      </Box>
      {!notif.read && (
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "info.main", mt: 1, flexShrink: 0 }} />
      )}
    </Box>
  );
}

export default function Notifications() {
  const { notifications, markAllRead, markRead, unreadCount } = useAppStore();
  const { sendBrowserNotification } = useNotifications();
  const unread = unreadCount();

  const handleTestNotif = () => {
    sendBrowserNotification(
      "Test Notification",
      "This is a test push notification from HealthOS."
    );
  };

  return (
    <AppLayout title="Notifications" subtitle="Stay updated on patient alerts and appointments">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5, flexWrap: "wrap", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>All Notifications</Typography>
          {unread > 0 && (
            <Chip
              label={`${unread} unread`}
              size="small"
              sx={{ bgcolor: "error.main", color: "#fff", fontWeight: 700 }}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<NotificationsActive />}
            onClick={handleTestNotif}
          >
            Test Notification
          </Button>
          {unread > 0 && (
            <Button
              size="small"
              variant="contained"
              startIcon={<DoneAll />}
              onClick={markAllRead}
            >
              Mark All Read
            </Button>
          )}
        </Box>
      </Box>

      <Card sx={{ border: "1px solid", borderColor: "divider", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        {notifications.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <NotificationsActive sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
            <Typography color="text.secondary">No notifications yet.</Typography>
          </Box>
        ) : (
          notifications.map((n, i) => (
            <Box key={n.id}>
              <NotifCard notif={n} onRead={markRead} />
              {i < notifications.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </Card>
    </AppLayout>
  );
}
