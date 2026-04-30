import { create } from "zustand";
import type { User } from "firebase/auth";
import type { Patient, Notification } from "../types";
import { mockPatients } from "../data/mockData";

interface AppState {
  user: User | null;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthLoading: (loading: boolean) => void;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  patients: Patient[];
  patientView: "grid" | "list";
  setPatientView: (view: "grid" | "list") => void;
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  patientSearch: string;
  setPatientSearch: (search: string) => void;

  notifications: Notification[];
  addNotification: (n: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  unreadCount: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  authLoading: true,
  setUser: (user) => set({ user }),
  setAuthLoading: (authLoading) => set({ authLoading }),

  sidebarOpen: true,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

  patients: mockPatients,
  patientView: "grid",
  setPatientView: (patientView) => set({ patientView }),
  selectedPatient: null,
  setSelectedPatient: (selectedPatient) => set({ selectedPatient }),
  patientSearch: "",
  setPatientSearch: (patientSearch) => set({ patientSearch }),

  notifications: [
    {
      id: "n1",
      title: "Critical Patient Alert",
      message: "Samuel George's vitals require immediate attention.",
      type: "error",
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      read: false,
    },
    {
      id: "n2",
      title: "Appointment Reminder",
      message: "Divya Rajan has an appointment tomorrow at 10:00 AM.",
      type: "info",
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      read: false,
    },
    {
      id: "n3",
      title: "Lab Results Ready",
      message: "Lab results for Arjun Mehta are now available.",
      type: "success",
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
      read: false,
    },
  ],
  addNotification: (n) =>
    set((state) => ({
      notifications: [
        { ...n, id: `n${Date.now()}`, timestamp: new Date().toISOString(), read: false },
        ...state.notifications,
      ],
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));