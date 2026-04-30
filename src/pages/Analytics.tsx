import { Box, Card, Typography, Divider } from "@mui/material";
import { People, AttachMoney, TrendingUp, Healing } from "@mui/icons-material";
import AppLayout from "../components/layout/AppLayout";
import StatCard from "../components/ui/StatCard";
import { analyticsData } from "../data/mockData";
import { useAppStore } from "../store/appStore";

const COLORS = ["#16a34a", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444", "#64748b"];

export default function Analytics() {
  const { patients } = useAppStore();
  const totalRevenue = analyticsData.monthlyPatients.reduce((s, m) => s + m.revenue, 0);

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

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1.4fr 1fr" }, gap: 2.5, mb: 2.5 }}>
        {/* Monthly bar chart */}
        <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Monthly Patients</Typography>
          <Typography variant="caption" color="text.secondary">Oct 2024 – Apr 2025</Typography>

          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, height: 180, mt: 3 }}>
            {analyticsData.monthlyPatients.map((m, i) => {
              const max = Math.max(...analyticsData.monthlyPatients.map((x) => x.patients));
              const h = (m.patients / max) * 100;
              return (
                <Box key={m.month} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, fontSize: 12 }}>{m.patients}</Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: `${h}%`,
                      background: i === 6
                        ? "linear-gradient(180deg, #16a34a, #0284c7)"
                        : "linear-gradient(180deg, #e2e8f0, #cbd5e1)",
                      borderRadius: "6px 6px 0 0",
                      minHeight: 8,
                      position: "relative",
                      "&:hover": { filter: "brightness(0.9)" },
                      transition: "all 0.3s",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11, fontWeight: 600 }}>
                    {m.month}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, height: 120 }}>
            {analyticsData.monthlyPatients.map((m, i) => {
              const max = Math.max(...analyticsData.monthlyPatients.map((x) => x.revenue));
              const h = (m.revenue / max) * 100;
              return (
                <Box key={m.month} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: `${h}%`,
                      background: i === 6
                        ? "linear-gradient(180deg, #8b5cf6, #6d28d9)"
                        : "linear-gradient(180deg, #ede9fe, #ddd6fe)",
                      borderRadius: "4px 4px 0 0",
                      minHeight: 4,
                    }}
                  />
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: "flex", gap: 3, mt: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: "#16a34a" }} />
              <Typography variant="caption" color="text.secondary">Patients</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: "#8b5cf6" }} />
              <Typography variant="caption" color="text.secondary">Revenue</Typography>
            </Box>
          </Box>
        </Card>

        {/* Department donut-style */}
        <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Department Split</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {analyticsData.departmentDistribution.map((d, i) => {
              const total = analyticsData.departmentDistribution.reduce((s, x) => s + x.count, 0);
              const pct = ((d.count / total) * 100).toFixed(1);
              return (
                <Box key={d.dept}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLORS[i] }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{d.dept}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{d.count}</Typography>
                      <Typography variant="body2" color="text.secondary">{pct}%</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ height: 6, borderRadius: 3, bgcolor: "grey.100", overflow: "hidden" }}>
                    <Box
                      sx={{
                        width: `${pct}%`,
                        height: "100%",
                        bgcolor: COLORS[i],
                        borderRadius: 3,
                        transition: "width 0.8s ease",
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Card>
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
