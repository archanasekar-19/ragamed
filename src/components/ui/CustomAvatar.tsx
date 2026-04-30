import { Avatar, type SxProps, type Theme } from "@mui/material";

type Props = {
    name?: string;
    src?: string;
    width?: number;
    height?: number;
    fontSize?: number;
    sx?: SxProps<Theme>;
};

const AVATAR_COLORS = [
    "#16a34a",
    "#8b5cf6",
    "#ef4444",
    "#22c55e",
    "#f59e0b",
    "#0284c7",
    "#a855f7",
    "#16a34a",
];

function getInitials(name?: string) {
    if (!name) return "";
    const parts = name.split(" ");
    return parts.length > 1
        ? parts[0][0] + parts[1][0]
        : parts[0][0];
}

function getColor(name?: string) {
    if (!name) return AVATAR_COLORS[0];
    const index =
        name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

export default function CustomAvatar({
    name,
    src,
    width = 36,
    height = 36,
    fontSize = 12,
    sx,
}: Props) {
    const isImage = src?.startsWith("http");

    return (
        <Avatar
            src={isImage ? src : undefined}
            sx={{
                width,
                height,
                fontSize,
                fontWeight: 700,
                bgcolor: !isImage ? getColor(name) : undefined,
                ...sx,
            }}
        >
            {!isImage && getInitials(name)}
        </Avatar>
    );
}