import {
  Box,
  Card,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  People,
  LocalHospital,
  EventAvailable,
  Warning,
} from "@mui/icons-material";

import AppLayout from "../components/layout/AppLayout";
import StatCard from "../components/ui/StatCard";
import StatusChip from "../components/ui/StatusChip";
import { useAppStore } from "../store/appStore";
import { analyticsData } from "../data/mockData";
import MuiStackedBarChart from "@/components/charts/MuiStackedBarChart";
import MuiNivoRadialBarChart from "@/components/charts/MuiNivoRadialBarChart";
import { useNavigate } from "react-router-dom";

const chartPalette = {
  active: "#2563eb",
  recovered: "#16a34a",
  critical: "#dc2626",
  emergency: "#f59e0b",
  muted: "#64748b",
};

const monthlyStackedData = analyticsData.monthlyPatients.map((item) => ({
  month: item.month,
  Active: Math.round(item.patients * 0.55),
  Recovered: Math.round(item.patients * 0.32),
  Critical: Math.max(2, Math.round(item.patients * 0.08)),
  Emergency: Math.max(1, Math.round(item.patients * 0.05)),
}));

export default function Dashboard() {
  const { patients } = useAppStore();
  const navigate = useNavigate();

  const safePatients = patients || [];

  const active = safePatients.filter((p) => p.status === "Active").length;

  const urgentPatients = safePatients.filter(
    (p) => p.status === "Critical" || p.status === "Emergency"
  );

  const critical = safePatients.filter((p) => p.status === "Critical").length;
  const emergency = safePatients.filter((p) => p.status === "Emergency").length;

  const departments = analyticsData.departmentDistribution.slice(0, 6);
  const maxDeptCount = Math.max(...departments.map((d) => d.count), 1);

  const doctorWorkloadData = [
    {
      id: "Appointments",
      data: [
        { x: "Dr. Kumar", y: 18 },
        { x: "Dr. Meera", y: 14 },
        { x: "Dr. John", y: 11 },
        { x: "Dr. Priya", y: 9 },
      ],
    },
  ];

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Track patients, departments, appointments, and healthcare activity trends in real time."
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Healthcare Operations Overview
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
          Monitor patient flow, department load, critical alerts, and appointment activity.
        </Typography>
      </Box>

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
        <StatCard
          label="Total Patients"
          value={safePatients.length}
          change={7.2}
          icon={<People />}
          color={chartPalette.active}
        />
        <StatCard
          label="Active Cases"
          value={active}
          change={3.1}
          icon={<LocalHospital />}
          color={chartPalette.recovered}
        />
        <StatCard
          label="Critical / Emergency"
          value={critical + emergency}
          change={-2}
          icon={<Warning />}
          color={chartPalette.critical}
        />
        <StatCard
          label="Appointments Today"
          value={12}
          change={15}
          icon={<EventAvailable />}
          color={chartPalette.muted}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.25fr 0.75fr" },
          gap: 2.5,
          alignItems: "stretch",
        }}
      >
        <Card
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Critical & Emergency Patients
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Immediate attention required
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
            {urgentPatients.length === 0 ? (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px dashed",
                  borderColor: "divider",
                  bgcolor: "background.default",
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  No critical or emergency patients right now.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Urgent patient cases will appear here automatically.
                </Typography>
              </Box>
            ) : (
              urgentPatients.slice(0, 6).map((patient) => {
                const isEmergency = patient.status === "Emergency";

                return (
                  <Box
                    key={patient.id}
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    sx={{
                      p: 1.6,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: isEmergency ? "warning.light" : "error.light",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: isEmergency
                          ? "rgba(245,158,11,0.14)"
                          : "rgba(220,38,38,0.1)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: 13.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {patient.name}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: isEmergency ? "warning.dark" : "error.main",
                          mt: 0.2,
                        }}
                      >
                        {patient.condition}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {patient.department} · {patient.doctor.replace("Dr. ", "")}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgColor: isEmergency ? "warning.main" : "error.main",
                          animation: "pulse 1.2s infinite",
                          "@keyframes pulse": {
                            "0%": { opacity: 0.4 },
                            "50%": { opacity: 1 },
                            "100%": { opacity: 0.4 },
                          },
                        }}
                      />

                      <StatusChip status={patient.status} />
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Card>

        <Card
          sx={{
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            height: "100%",
            minHeight: { xs: "auto", lg: 682 },
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Departments
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Patient distribution by department.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {departments.map((dept) => {
              const value = Math.round((dept.count / maxDeptCount) * 100);

              return (
                <Box
                  key={dept.dept}
                  sx={{
                    p: 1.5,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    bgcolor: "background.paper",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                        {dept.dept}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {value}% of highest department load
                      </Typography>
                    </Box>

                    <Chip
                      label={`${dept.count} patients`}
                      size="small"
                      sx={{
                        bgcolor: `${dept.color}14`,
                        color: dept.color,
                        fontWeight: 700,
                      }}
                    />
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={value}
                    sx={{
                      height: 8,
                      borderRadius: 99,
                      bgcolor: "background.default",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 99,
                        bgcolor: dept.color,
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Card>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 2.5,
          mt: 2.5,
        }}
      >
        <MuiStackedBarChart
          title="Monthly Patient Trend"
          subTitle="Shows how patient cases are distributed monthly across active, recovered, critical, and emergency categories."
          data={monthlyStackedData}
          height={300}
        />

        <MuiNivoRadialBarChart
          title="Doctor Workload"
          subTitle="Shows appointment load handled by doctors for the selected period."
          data={doctorWorkloadData}
          height={340}
        />
      </Box>
    </AppLayout>
  );
}