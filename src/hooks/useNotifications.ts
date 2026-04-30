import { useEffect } from "react";
import { useAppStore } from "../store/appStore";

export function useNotifications() {
  const { addNotification } = useAppStore();

  const requestPermission = async () => {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    const perm = await Notification.requestPermission();
    return perm === "granted";
  };

  const sendBrowserNotification = async (title: string, body: string) => {
    const granted = await requestPermission();
    if (granted) {
      new Notification(title, {
        body,
        icon: "/vite.svg",
        badge: "/vite.svg",
      });
    }
    // Also add to in-app store
    addNotification({ title, message: body, type: "info" });
  };

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch(() => {/* sw not critical */});
    }
  }, []);

  // Demo: send a notification after 10s of being logged in
  useEffect(() => {
    const timer = setTimeout(() => {
      sendBrowserNotification(
        "Daily Report Ready",
        "Your daily patient summary for April 30 is now available."
      );
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return { sendBrowserNotification, requestPermission };
}
