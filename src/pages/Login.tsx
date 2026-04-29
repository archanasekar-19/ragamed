import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, LocalHospital } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login success");
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
                    background:
                        "linear-gradient(135deg, #0f3d68 0%, #155e75 50%, #0f766e 100%)",
                    color: "#fff",
                }}
            >
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 4,
                        bgcolor: "rgba(255,255,255,0.16)",
                        display: "grid",
                        placeItems: "center",
                        mb: 4,
                    }}
                >
                    <LocalHospital fontSize="large" />
                </Box>

                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        lineHeight: 1.15,
                    }}
                >
                    B2B Healthcare Operations Platform
                </Typography>

                <Typography variant="h6" sx={{ mt: 3, opacity: 0.9, maxWidth: 520 }}>
                    Securely manage patient workflows, analytics, and healthcare
                    operations from one modern dashboard.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mt: 5 }}>
                    {["Secure Login", "Patient Insights", "Smart Analytics"].map(
                        (item) => (
                            <Box
                                key={item}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    borderRadius: 99,
                                    bgcolor: "rgba(255,255,255,0.14)",
                                    fontSize: 14,
                                }}
                            >
                                {item}
                            </Box>
                        )
                    )}
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
                        borderRadius: 5,
                        boxShadow: "0 24px 70px rgba(15, 61, 104, 0.16)",
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{ fontWeight: 800 }}
                        >
                            Welcome back
                        </Typography>

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
                                sx={{ mb: 3 }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    py: 1.4,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    bgcolor: "#0f766e",
                                    "&:hover": {
                                        bgcolor: "#115e59",
                                    },
                                }}
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