import { Chip } from "@mui/material";

const statusConfig: Record<string, { color: string; bg: string; border: string }> = {
  Active: {
    color: "#15803d",
    bg: "#dcfce7",
    border: "#86efac",
  },
  Stable: {
    color: "#0369a1",
    bg: "#e0f2fe",
    border: "#7dd3fc",
  },
  Critical: {
    color: "#b91c1c",
    bg: "#fee2e2",
    border: "#fca5a5",
  },
  Discharged: {
    color: "#475569",
    bg: "#f1f5f9",
    border: "#cbd5e1",
  },
};

interface StatusChipProps {
  status: string;
  size?: "small" | "medium";
  rounded?: boolean;
}

export default function StatusChip({
  status,
  size = "small",
  rounded = true,
}: StatusChipProps) {
  const cfg = statusConfig[status] ?? {
    color: "#475569",
    bg: "#f1f5f9",
    border: "#cbd5e1",
  };

  return (
    <Chip
      label={status}
      size={size}
      variant="filled"
      sx={{
        bgcolor: cfg.bg,
        color: cfg.color,
        borderRadius: rounded ? "4px" : "8px",
        fontWeight: 600,
        fontSize: size === "small" ? 12 : 14,
        height: size === "small" ? 26 : 32,
        px: 0.5,

        "& .MuiChip-label": {
          px: size === "small" ? 1.2 : 1.6,
          lineHeight: 1,
        },

        "&.MuiChip-light": {
          bgcolor: cfg.bg,
          color: cfg.color,
        },

        "&.MuiChip-rounded": {
          borderRadius: "999px",
        },
      }}
    />
  );
}