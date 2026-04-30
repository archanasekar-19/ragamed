import { Box, Card, Typography } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: string;
  subtitle?: string;
}

export default function StatCard({ label, value, change, icon, color = "#16a34a", subtitle }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <Card
      sx={{
        p: 3,
        position: "relative",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
            {label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
              {subtitle}
            </Typography>
          )}
          {change !== undefined && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
              {isPositive ? (
                <TrendingUp sx={{ fontSize: 16, color: "success.main" }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: "error.main" }} />
              )}
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: isPositive ? "success.main" : "error.main" }}
              >
                {isPositive ? "+" : ""}{change}% vs last month
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 1,
            display: "grid",
            placeItems: "center",
            bgcolor: `${color}18`,
            color: color,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );
}
