import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Stack,
    Button,
} from "@mui/material";
import { Close, Download } from "@mui/icons-material";

type DocumentViewerDialogProps = {
    open: boolean;
    onClose: () => void;
    document: {
        title: string;
        type: string;
        size: string;
        url: string;
        icon: React.ReactNode;
    } | null;
};

const headerGradient = `
  linear-gradient(135deg, rgba(69, 56, 202, 0.94) 0%, rgba(45, 35, 128, 0.94) 50%, rgba(16, 185, 129, 0.92) 100%),
  linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)
`;

export default function DocumentViewerDialog({
    open,
    onClose,
    document,
}: DocumentViewerDialogProps) {
    if (!document) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth={false}
            slotProps={{
                paper: {
                    sx: {
                        width: "96vw",
                        height: "94vh",
                        maxWidth: "96vw",
                        borderRadius: 4,
                        overflow: "hidden",
                    },
                },
            }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    background: headerGradient,
                    backgroundSize: "auto, 22px 22px, 22px 22px",
                    color: "#fff",
                    px: 3,
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            bgcolor: "rgba(255,255,255,0.15)",
                            display: "grid",
                            placeItems: "center",
                        }}
                    >
                        {document.icon}
                    </Box>

                    <Box>
                        <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                            {document.title}
                        </Typography>
                        <Typography sx={{ fontSize: 13, opacity: 0.8 }}>
                            {document.type} · {document.size}
                        </Typography>
                    </Box>
                </Box>

                <Stack direction="row" spacing={1}>
                    <IconButton onClick={onClose} sx={{ color: "#fff" }}>
                        <Close />
                    </IconButton>
                </Stack>
            </Box>

            {/* PDF VIEW */}
            <DialogContent sx={{ p: 0, height: "calc(94vh - 80px)" }}>
                <iframe
                    src={document.url}
                    title={document.title}
                    style={{
                        width: "100%",
                        height: "100%",
                        border: 0,
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}