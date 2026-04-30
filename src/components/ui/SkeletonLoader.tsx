import { Box, Skeleton, Stack, useTheme } from "@mui/material";

type GlobalSkeletonLoaderProps = {
    variant?: "dashboard" | "page" | "list" | "detail";
};

export default function GlobalSkeletonLoader({
    variant = "dashboard",
}: GlobalSkeletonLoaderProps) {

    if (variant === "list") {
        return (
            <Box sx={{ minHeight: "100vh", p: 3, bgcolor: "background.default" }}>
                <Stack spacing={2}>
                    <Skeleton variant="rounded" height={56} />
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Skeleton key={item} variant="rounded" height={72} />
                    ))}
                </Stack>
            </Box>
        );
    }

    if (variant === "detail") {
        return (
            <Box sx={{ minHeight: "100vh", p: 3, bgcolor: "background.default" }}>
                <Stack spacing={3}>
                    <Skeleton variant="rounded" height={180} />

                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <Skeleton variant="rounded" height={240} sx={{ flex: 1 }} />
                        <Skeleton variant="rounded" height={240} sx={{ flex: 1 }} />
                    </Stack>

                    <Skeleton variant="rounded" height={280} />
                </Stack>
            </Box>
        );
    }

    if (variant === "page") {
        return (
            <Box sx={{ minHeight: "100vh", p: 3, bgcolor: "background.default" }}>
                <Stack spacing={3}>
                    <Skeleton variant="rounded" height={64} />
                    <Skeleton variant="rounded" height={180} />
                    <Skeleton variant="rounded" height={320} />
                </Stack>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: { xs: 2, md: 3 },
                bgcolor: "background.default",
            }}
        >
            <Stack spacing={3}>
                <Skeleton variant="rounded" height={64} />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    {[1, 2, 3, 4].map((item) => (
                        <Skeleton
                            key={item}
                            variant="rounded"
                            height={110}
                            sx={{ flex: 1 }}
                        />
                    ))}
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <Skeleton variant="rounded" height={300} sx={{ flex: 2 }} />
                    <Skeleton variant="rounded" height={300} sx={{ flex: 1 }} />
                </Stack>

                <Skeleton variant="rounded" height={320} />
            </Stack>
        </Box>
    );
}