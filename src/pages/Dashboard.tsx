import {
  Box,
  Card,
  Typography,
  Avatar,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  People,
  LocalHospital,
  EventAvailable,
  Warning,
} from "@mui/icons-material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { ResponsiveCalendar } from "@nivo/calendar";

import AppLayout from "../components/layout/AppLayout";
import StatCard from "../components/ui/StatCard";
import StatusChip from "../components/ui/StatusChip";
import { useAppStore } from "../store/appStore";
import { analyticsData } from "../data/mockData";

const chartPalette = {
  active: "#2563eb",
  recovered: "#16a34a",
  critical: "#dc2626",
  muted: "#64748b",
};

const monthlyStackedData = analyticsData.monthlyPatients.map((item) => ({
  month: item.month,
  Active: Math.round(item.patients * 0.55),
  Recovered: Math.round(item.patients * 0.32),
  Critical: Math.max(2, Math.round(item.patients * 0.13)),
}));

const calendarData = [
  { day: "2026-04-01", value: 19 },
  { day: "2026-04-05", value: 28 },
  { day: "2026-04-10", value: 35 },
  { day: "2026-04-15", value: 22 },
  { day: "2026-04-20", value: 41 },
  { day: "2026-04-25", value: 30 },
];

export default function Dashboard() {
  const { patients } = useAppStore();

  const critical = patients.filter((p) => p.status === "Critical").length;
  const active = patients.filter((p) => p.status === "Active").length;

  const recent = patients.slice(0, 6);
  const departments = analyticsData.departmentDistribution.slice(0, 6);

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Track patients, departments, appointments, and healthcare activity trends in real time."
    >
      {/* 🔥 TOP SUPPORTING TEXT */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Healthcare Operations Overview
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
          Monitor patient flow, department load, critical alerts, and appointment activity.
          Use this dashboard to quickly understand hospital performance and identify areas needing attention.
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <StatCard label="Total Patients" value={patients.length} change={7.2} icon={<People />} color={chartPalette.active} />
        <StatCard label="Active Cases" value={active} change={3.1} icon={<LocalHospital />} color={chartPalette.recovered} />
        <StatCard label="Critical Alerts" value={critical} change={-2} icon={<Warning />} color={chartPalette.critical} />
        <StatCard label="Appointments Today" value={12} change={15} icon={<EventAvailable />} color={chartPalette.muted} />
      </Box>

      {/* Patients + Departments */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.25fr 0.75fr" },
          gap: 2.5,
        }}
      >
        {/* Recent Patients */}
        <Card sx={{ p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Recent Patients
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Displays the most recently added or updated patient records.
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.5 }}>
            {recent.map((patient) => (
              <Box key={patient.id} sx={{ p: 1.5, border: "1px solid", borderColor: "divider", borderRadius: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ width: 42, height: 42, bgcolor: "#eef2ff", color: "#3730a3" }}>
                  {patient.avatar}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600 }}>{patient.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {patient.department} · {patient.doctor}
                  </Typography>
                </Box>

                <StatusChip status={patient.status} />
              </Box>
            ))}
          </Box>
        </Card>

        {/* Departments */}
        <Card sx={{ p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Departments
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Overview of patient distribution across departments.
            </Typography>
          </Box>

          {departments.map((dept) => (
            <Box key={dept.dept} sx={{ mb: 3.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">{dept.dept}</Typography>
                <Typography variant="body2">{dept.count}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(dept.count / 89) * 100} />
            </Box>
          ))}
        </Card>
      </Box>

      {/* Charts */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" }, gap: 2.5, mt: 2.5 }}>
        
        {/* Monthly Trend */}
        <Card sx={{ p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Monthly Patient Trend
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Shows how patient cases are distributed monthly across active, recovered, and critical categories.
            </Typography>
          </Box>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyStackedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Active" stackId="a" fill={chartPalette.active} />
              <Bar dataKey="Recovered" stackId="a" fill={chartPalette.recovered} />
              <Bar dataKey="Critical" stackId="a" fill={chartPalette.critical} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Calendar */}
        <Card sx={{ p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Patient Activity Calendar
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Visualizes daily patient visits and activity intensity.
            </Typography>
          </Box>

          <Box sx={{ height: 300 }}>
            <ResponsiveCalendar
              data={calendarData}
              from="2026-04-01"
              to="2026-04-30"
              emptyColor="#f1f5f9"
              colors={["#dbeafe", "#93c5fd", "#3b82f6", "#1d4ed8"]}
            />
          </Box>
        </Card>
      </Box>
    </AppLayout>
  );
}