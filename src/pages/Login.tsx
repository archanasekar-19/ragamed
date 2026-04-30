import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Button } from "@/components/ui/styled/button";
import { theme } from "@/app/theme";
import Logo from "@/components/layout/Logo";
import toast from "react-hot-toast";
import { isValidEmail } from "@/lib/utils/validation";

const ADMIN_EMAIL = import.meta.env.VITE_FIREBASE_ADMIN;
const ADMIN_PASSWORD = import.meta.env.VITE_FIREBASE_PASSWORD;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    setError("");
    setLoading(true);

    try {
      if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        throw new Error("Missing env credentials");
      }

      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      toast.success("Welcome back! Logged in successfully 🎉");
      navigate("/dashboard");
    } catch {
      setError("Unable to continue as guest. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back! Logged in successfully 🎉");
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          px: 10,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          background: `
            linear-gradient(135deg, rgba(69, 56, 202, 0.94) 0%, rgba(45, 35, 128, 0.94) 50%, rgba(16, 185, 129, 0.92) 100%),
            linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 28px 28px, 28px 28px",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 800, lineHeight: 1.2 }}
        >
          Manage patients faster.
          <br />
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #10b981, #22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Without the chaos.
          </Box>
        </Typography>

        <Typography variant="h6" sx={{ mt: 3, opacity: 0.9, maxWidth: 520 }}>
          Track patient journeys, monitor operations, and make confident
          decisions from one clean healthcare dashboard.
        </Typography>

        <Box sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            "Real-time patient tracking",
            "Centralized patient management",
            "Analytics-ready healthcare workflows",
            "Instant critical alerts & notifications",
          ].map((item) => (
            <Box
              key={item}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                fontSize: 15,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#10b981",
                }}
              />
              {item}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 430,
            borderRadius: theme.shape.borderRadius,
            boxShadow: "0 24px 70px rgba(0, 0, 0, 0.10)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 1,
              }}
            >
              <Logo
                src="/logo.png"
                size={40}
                textFallback="RM"
              />

              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.15,
                }}
              >
                Welcome back !
              </Typography>
            </Box>

            <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
              Login to access your healthcare dashboard.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="button"
                variantType="outline"
                sizeType="lg"
                fullWidth
                onClick={handleGuestLogin}
                disabled={loading}
                sx={{ mb: 2 }}
              >
                Continue as Guest
              </Button>

              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "center",
                  mb: 2,
                  color: "text.secondary",
                }}
              >
                or
              </Typography>

              <Button
                type="submit"
                variantType="default"
                sizeType="lg"
                disabled={
                  loading ||
                  !email ||
                  !password}
                fullWidth
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}