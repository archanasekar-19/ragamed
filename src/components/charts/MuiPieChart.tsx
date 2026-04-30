import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export type PieChartDatum = {
  name: string;
  value: number;
};

type Props = {
  title: string;
  subTitle?: string;
  data: PieChartDatum[];
  height?: number;
  isLoading?: boolean;
};

export default function MuiPieChart({
  title,
  subTitle,
  data,
  height = 320,
  isLoading = false,
}: Props) {
  const theme = useTheme();

  const isEmpty =
    !data || data.length === 0 || data.every((item) => item.value === 0);

  const chartData = isEmpty ? [{ name: "No Data", value: 1 }] : data;

  const colors = isEmpty
    ? [theme.palette.grey[300]]
    : [
        theme.palette.primary.main,
        theme.palette.success.main,
        theme.palette.warning.main,
        theme.palette.error.main,
        theme.palette.secondary.main,
      ];

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        transition: "0.25s ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 12px 32px rgba(15, 23, 42, 0.1)",
        },
      }}
    >
      <CardHeader
        title={<Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>}
        subheader={
          subTitle ? (
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
              {subTitle}
            </Typography>
          ) : null
        }
        sx={{ pb: 1 }}
      />

      <CardContent sx={{ pt: 1 }}>
        {isLoading ? (
          <Skeleton variant="rounded" height={height} animation="wave" />
        ) : (
          <Box sx={{ height, width: "100%", position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={isEmpty ? 0 : 4}
                  cornerRadius={8}
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                </Pie>

                {!isEmpty && (
                  <>
                    <Tooltip
                      contentStyle={{
                        background: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 10,
                        boxShadow: theme.shadows[4],
                      }}
                    />
                    <Legend iconType="circle" />
                  </>
                )}
              </PieChart>
            </ResponsiveContainer>

            {isEmpty && (
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "text.secondary",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                No Data
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}