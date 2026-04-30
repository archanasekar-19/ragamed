import { Box } from "@mui/material";

interface LogoProps {
  src?: string;
  alt?: string;
  size?: number;
  textFallback?: string;
}

export default function Logo({
  src,
  alt = "Logo",
  size = 38,
  textFallback = "HB",
}: LogoProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2,
        bgcolor: "#fff",
        backdropFilter: "blur(4px)",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {src ? (
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            width: "70%",
            height: "70%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            fontWeight: 700,
            fontSize: size * 0.35,
            color: "#1e293b",
          }}
        >
          {textFallback}
        </Box>
      )}
    </Box>
  );
}