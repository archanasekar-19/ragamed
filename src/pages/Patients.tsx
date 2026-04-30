import {
  Box,
  Card,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Search,
  GridView,
  ViewList,
  Phone,
  Email,
  ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import StatusChip from "../components/ui/StatusChip";
import { useAppStore } from "../store/appStore";

const AVATAR_COLORS = ["#16a34a", "#8b5cf6", "#ef4444", "#22c55e", "#f59e0b", "#0284c7", "#a855f7", "#16a34a"];

export default function Patients() {
  const { patients, patientView, setPatientView, patientSearch, setPatientSearch, setSelectedPatient } = useAppStore();
  const navigate = useNavigate();

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.condition.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.department.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const handlePatientClick = (patient: typeof patients[0]) => {
    setSelectedPatient(patient);
    navigate(`/patients/${patient.id}`);
  };

  return (
    <AppLayout title="Patients" subtitle={`${patients.length} total patients registered`}>
      {/* Controls */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          placeholder="Search patients, conditions, departments..."
          value={patientSearch}
          onChange={(e) => setPatientSearch(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 260 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 18, color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
        />

        <ToggleButtonGroup
          value={patientView}
          exclusive
          onChange={(_, v) => v && setPatientView(v)}
          size="small"
        >
          <ToggleButton value="grid" sx={{ px: 1.5 }}>
            <GridView fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list" sx={{ px: 1.5 }}>
            <ViewList fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Chip
          label={`${filtered.length} results`}
          size="small"
          sx={{ bgcolor: "primary.main", color: "primary.contrastText", fontWeight: 600 }}
        />
      </Box>

      {/* Grid View */}
      {patientView === "grid" && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" },
            gap: 2.5,
          }}
        >
          {filtered.map((patient, i) => (
            <Card
              key={patient.id}
              onClick={() => handlePatientClick(patient)}
              sx={{
                p: 2.5,
                cursor: "pointer",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "all 0.2s",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                  borderColor: "info.main",
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Avatar
                  sx={{
                    width: 46,
                    height: 46,
                    fontSize: 16,
                    fontWeight: 800,
                    bgcolor: AVATAR_COLORS[i % AVATAR_COLORS.length],
                  }}
                >
                  {patient.avatar}
                </Avatar>
                <StatusChip status={patient.status} />
              </Box>

              <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.3 }}>{patient.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
                {patient.id} · {patient.age}y · {patient.gender}
              </Typography>

              <Chip
                label={patient.department}
                size="small"
                sx={{ bgcolor: "background.default", border: "1px solid", borderColor: "divider", fontSize: 11, mb: 2 }}
              />

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="caption" color="text.secondary" sx={{ width: 80, flexShrink: 0 }}>Condition</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{patient.condition}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="caption" color="text.secondary" sx={{ width: 80, flexShrink: 0 }}>Doctor</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{patient.doctor}</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="caption" color="text.secondary" sx={{ width: 80, flexShrink: 0 }}>Next Appt</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {new Date(patient.nextAppointment).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      )}

      {/* List View */}
      {patientView === "list" && (
        <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", overflow: "hidden" }}>
          {/* Header */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 40px",
              gap: 2,
              px: 3,
              py: 1.5,
              bgcolor: "background.default",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            {["Patient", "Condition / Dept", "Status", "Doctor", "Next Appt", ""].map((h) => (
              <Typography key={h} variant="caption" sx={{ fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.5 }}>
                {h}
              </Typography>
            ))}
          </Box>

          {filtered.map((patient, i) => (
            <Box key={patient.id}>
              <Box
                onClick={() => handlePatientClick(patient)}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 40px",
                  gap: 2,
                  px: 3,
                  py: 2,
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "bgcolor 0.15s",
                  "&:hover": { bgcolor: "background.default" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar
                    sx={{ width: 36, height: 36, fontSize: 12, fontWeight: 700, bgcolor: AVATAR_COLORS[i % AVATAR_COLORS.length], flexShrink: 0 }}
                  >
                    {patient.avatar}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{patient.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{patient.id} · {patient.age}y · {patient.bloodType}</Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{patient.condition}</Typography>
                  <Typography variant="caption" color="text.secondary">{patient.department}</Typography>
                </Box>

                <StatusChip status={patient.status} />

                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>{patient.doctor.replace("Dr. ", "")}</Typography>

                <Typography sx={{ fontSize: 13 }}>
                  {new Date(patient.nextAppointment).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </Typography>

                <IconButton size="small">
                  <ArrowForward fontSize="small" sx={{ color: "text.secondary" }} />
                </IconButton>
              </Box>
              {i < filtered.length - 1 && <Divider />}
            </Box>
          ))}

          {filtered.length === 0 && (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography color="text.secondary">No patients match your search.</Typography>
            </Box>
          )}
        </Card>
      )}
    </AppLayout>
  );
}
