import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import Login from "./pages/Login";

function Dashboard() {
  return <h1>Dashboard</h1>;
}

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
  palette: {
    primary: {
      main: "#0f766e",
    },
  },
});

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}