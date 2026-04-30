import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e293b", contrastText: "#ffffff" },
    secondary: { main: "#f8fafc", contrastText: "#334155" },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },
    error: { main: "#dc2626" },
    success: { main: "#16a34a" },
    warning: { main: "#ca8a04" },
    info: { main: "#2563eb" },
    divider: "#e2e8f0",
    black: { main: "#000000" },
  },

  typography: {
    fontFamily:
      "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",

    h1: {
      fontSize: "4.25rem",
      fontWeight: 400,
      lineHeight: 1.15,
      color: "#1e293b",
    },
    h2: {
      fontSize: "3.25rem",
      fontWeight: 400,
      lineHeight: 1.2,
      color: "#1e293b",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
      color: "#1e293b",
    },
    h4: {
      fontSize: "1.65rem",
      fontWeight: 700,
      color: "#1e293b",
    },
    h5: {
      fontSize: "1.35rem",
      fontWeight: 700,
      color: "#1e293b",
    },
    h6: {
      fontSize: "1.15rem",
      fontWeight: 700,
      color: "#1e293b",
    },
    body1: {
      fontSize: "1.05rem",
      lineHeight: 1.65,
      color: "#334155",
    },
    body2: {
      fontSize: "0.95rem",
      lineHeight: 1.6,
      color: "#475569",
    },
    caption: {
      fontSize: "0.82rem",
      lineHeight: 1.5,
      color: "#64748b",
    },
    button: {
      fontSize: "0.95rem",
      fontWeight: 600,
    },
  },

  shape: { borderRadius: 12 },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@import":
          "url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap')",

        body: {
          backgroundColor: "#f8fafc",
          color: "#1e293b",
        },

        "*": {
          boxSizing: "border-box",
        },

        ".great-vibes": {
          fontFamily: "'Great Vibes', cursive !important",
          fontWeight: "400 !important",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
          padding: "12px 24px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0 1px 4px rgba(15, 23, 42, 0.05)",
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: "0.95rem",
          color: "#334155",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#64748b",
          fontSize: "0.95rem",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#e2e8f0",
        },
      },
    },
  },
});