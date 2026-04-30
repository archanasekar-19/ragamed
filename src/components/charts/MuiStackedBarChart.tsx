import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Skeleton,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export type StackedBarDatum = {
    month: string;
    Active: number;
    Recovered: number;
    Critical: number;
};

type Props = {
    title: string;
    subTitle?: string;
    data: StackedBarDatum[];
    height?: number;
    isLoading?: boolean;
};

const allMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function MuiStackedBarChart({
    title,
    subTitle,
    data,
    height = 300,
    isLoading = false,
}: Props) {
    const theme = useTheme();

    const chartData = allMonths.map((month) => {
        const found = data.find((item) => item.month === month);

        return {
            month,
            Active: found?.Active ?? 0,
            Recovered: found?.Recovered ?? 0,
            Critical: found?.Critical ?? 0,
        };
    });

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
                ) : chartData.length > 0 ? (
                    <Box sx={{ width: "100%", height }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} barSize={22}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke={theme.palette.divider}
                                />

                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{
                                        fill: theme.palette.text.secondary,
                                        fontSize: 12,
                                    }}
                                />

                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{
                                        fill: theme.palette.text.secondary,
                                        fontSize: 12,
                                    }}
                                />

                                <Tooltip
                                    cursor={{ fill: theme.palette.action.hover }}
                                    contentStyle={{
                                        background: theme.palette.background.paper,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 10,
                                        boxShadow: theme.shadows[4],
                                    }}
                                    labelStyle={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 700,
                                    }}
                                />

                                <Legend
                                    iconType="circle"
                                    wrapperStyle={{
                                        fontSize: 12,
                                        color: theme.palette.text.secondary,
                                        paddingTop: 12,
                                    }}
                                />

                                <Bar
                                    dataKey="Active"
                                    stackId="patients"
                                    fill={theme.palette.primary.main}
                                    radius={[0, 0, 0, 0]}
                                />
                                <Bar
                                    dataKey="Recovered"
                                    stackId="patients"
                                    fill={theme.palette.success.main}
                                    radius={[0, 0, 0, 0]}
                                />
                                <Bar
                                    dataKey="Critical"
                                    stackId="patients"
                                    fill={theme.palette.error.main}
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                ) : (
                    <Stack sx={{
                        height,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            No chart data found
                        </Typography>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
}