import { Box, Card, Typography } from "@mui/material";
import { People, AttachMoney, TrendingUp, Healing } from "@mui/icons-material";
import AppLayout from "../components/layout/AppLayout";
import StatCard from "../components/ui/StatCard";
import { analyticsData } from "../data/mockData";
import { useAppStore } from "../store/appStore";
import MuiLineChart from "@/components/charts/MuiLineChart";
import MuiPieChart from "@/components/charts/MuiPieChart";

export default function Analytics() {
  const { patients } = useAppStore();
  const totalRevenue = analyticsData.monthlyPatients.reduce((s, m) => s + m.revenue, 0);

  const revenueTrendData = analyticsData.monthlyPatients.map((item) => ({
    month: item.month,
    revenue: Math.round(item.revenue / 10000),
    appointments: Math.round(item.patients * 1.4),
  }));

  const ageGroupData = [
    { name: "0-18", value: 18 },
    { name: "19-35", value: 34 },
    { name: "36-50", value: 26 },
    { name: "51-65", value: 21 },
    { name: "65+", value: 15 },
  ];

  return (
    <AppLayout title="Analytics" subtitle="Platform performance and patient statistics">
      {/* KPI Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
          gap: 2.5,
          mb: 3,
        }}
      >
        <StatCard label="Total Patients" value={patients.length} change={7.2} icon={<People />} color="#16a34a" />
        <StatCard
          label="Total Revenue"
          value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
          change={12.4}
          icon={<AttachMoney />}
          color="#22c55e"
        />
        <StatCard label="Recovery Rate" value="87.3%" change={2.1} icon={<Healing />} color="#8b5cf6" />
        <StatCard label="Avg. Stay (Days)" value="4.2" change={-0.8} icon={<TrendingUp />} color="#f59e0b" />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.4fr 1fr",
          },
          gap: 2.5,
          mb: 2.5,
        }}
      >
        <MuiLineChart
          title="Revenue & Appointment Trend"
          subTitle="Tracks monthly revenue movement and appointment volume."
          data={revenueTrendData}
          height={340}
        />

        <MuiPieChart
          title="Patient Age Group Split"
          subTitle="Shows the distribution of patients across age groups."
          data={ageGroupData}
          height={340}
        />
      </Box>

      {/* Status breakdown */}
      <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Patient Status Breakdown</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 2 }}>
          {analyticsData.statusBreakdown.map((s, i) => {
            const colors = ["#8b5cf6", "#16a34a", "#ef4444", "#64748b"];
            const total = analyticsData.statusBreakdown.reduce((sum, x) => sum + x.count, 0);
            return (
              <Box
                key={s.status}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: `${colors[i]}33`,
                  bgcolor: `${colors[i]}08`,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: 36, fontWeight: 800, color: colors[i], lineHeight: 1 }}>
                  {s.count}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>{s.status}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {((s.count / total) * 100).toFixed(1)}%
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Card>
    </AppLayout>
  );
}
