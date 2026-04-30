import { useEffect, useState } from "react";
import { useAppStore } from "../store/appStore";
import { formatDate } from "@/lib/utils";

export function useNotifications() {
  const { addNotification } = useAppStore();

  // toggle state (persisted)
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem("notifications_enabled");
    return saved ? JSON.parse(saved) : true;
  });

  const toggleNotifications = () => {
    setEnabled((prev:any) => {
      localStorage.setItem("notifications_enabled", JSON.stringify(!prev));
      return !prev;
    });
  };

  const requestPermission = async () => {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    const perm = await Notification.requestPermission();
    return perm === "granted";
  };

  const sendBrowserNotification = async (title: string, body: string) => {
    // if disabled → skip browser notif
    if (!enabled) {
      addNotification({ title, message: body, type: "info" });
      return;
    }

    const granted = await requestPermission();

    if (granted) {
      new Notification(title, {
        body,
        icon: "/notification-icon.png",
        badge: "/notification-icon.png",
      });
    }

    addNotification({ title, message: body, type: "info" });
  };

  // service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch(() => {});
    }
  }, []);

  // demo notification
  useEffect(() => {
    const timer = setTimeout(() => {
      const today = formatDate(new Date(), {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      });

      sendBrowserNotification(
        "Daily Report Ready",
        `Your daily patient summary for ${today} is now available.`
      );
    }, 10000);

    return () => clearTimeout(timer);
  }, [enabled]);

  return {
    sendBrowserNotification,
    requestPermission,
    enabled,
    toggleNotifications,
  };
}