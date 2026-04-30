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
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

export type LineChartDatum = {
    month: string;
    revenue: number;
    appointments: number;
};

type Props = {
    title: string;
    subTitle?: string;
    data: LineChartDatum[];
    height?: number;
    isLoading?: boolean;
};

export default function MuiLineChart({
    title,
    subTitle,
    data,
    height = 320,
    isLoading = false,
}: Props) {
    const theme = useTheme();
    const isEmpty = !data || data.length === 0;

    const chartData = isEmpty
        ? [
            { month: "Jan", revenue: 0, appointments: 0 },
            { month: "Feb", revenue: 0, appointments: 0 },
            { month: "Mar", revenue: 0, appointments: 0 },
            { month: "Apr", revenue: 0, appointments: 0 },
            { month: "May", revenue: 0, appointments: 0 },
            { month: "Jun", revenue: 0, appointments: 0 },
        ]
        : data;

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
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />

                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                                />

                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: theme.palette.background.paper,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 10,
                                        boxShadow: theme.shadows[4],
                                    }}
                                />

                                <Legend iconType="circle" />

                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue"
                                    stroke={isEmpty ? theme.palette.grey[300] : theme.palette.primary.main}
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="appointments"
                                    name="Appointments"
                                    stroke={isEmpty ? theme.palette.grey[300] : theme.palette.success.main}
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
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