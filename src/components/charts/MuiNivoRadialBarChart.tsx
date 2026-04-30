import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

export type RadialBarDatum = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
};

type Props = {
  title: string;
  subTitle?: string;
  data: RadialBarDatum[];
  height?: number;
  isLoading?: boolean;
};

export default function MuiNivoRadialBarChart({
  title,
  subTitle,
  data,
  height = 340,
  isLoading = false,
}: Props) {
  const theme = useTheme();

  // ✅ check empty
  const isEmpty =
    !data ||
    data.length === 0 ||
    data.every((d) => d.data.every((item) => item.y === 0));

  // ✅ fallback grey data
  const fallbackData: RadialBarDatum[] = [
    {
      id: "No Data",
      data: [{ x: "No Data", y: 1 }],
    },
  ];

  const chartData = isEmpty ? fallbackData : data;

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
        title={
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        }
        subheader={
          subTitle ? (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.5 }}
            >
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
          <Box
            sx={{
              height,
              width: "100%",
              position: "relative",
            }}
          >
            <ResponsiveRadialBar
              data={chartData}
              valueFormat=">-.0f"
              padding={0.35}
              cornerRadius={8}
              margin={{ top: 24, right: 40, bottom: 40, left: 40 }}
              colors={
                isEmpty
                  ? ["#e5e7eb"] // ✅ grey fallback
                  : [
                      theme.palette.primary.main,
                      theme.palette.success.main,
                      theme.palette.warning.main,
                      theme.palette.error.main,
                    ]
              }
              radialAxisStart={null}
              circularAxisOuter={
                isEmpty
                  ? null // ✅ hide ticks when empty
                  : {
                      tickSize: 4,
                      tickPadding: 8,
                      tickRotation: 0,
                    }
              }
              enableTracks
              tracksColor={theme.palette.action.hover}
              theme={{
                text: {
                  fill: theme.palette.text.secondary,
                  fontSize: 11,
                  fontFamily: theme.typography.fontFamily,
                },
                tooltip: {
                  container: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderRadius: 8,
                    boxShadow: theme.shadows[4],
                    padding: "8px 10px",
                  },
                },
              }}
            />

            {/* ✅ Center text when empty */}
            {isEmpty && (
              <Typography
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 13,
                  color: "text.secondary",
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