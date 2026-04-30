import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Divider,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import {
  ArrowBack,
  Phone,
  Email,
  LocationOn,
  Bloodtype,
  CalendarMonth,
  LocalHospital,
  Person,
} from "@mui/icons-material";
import AppLayout from "../components/layout/AppLayout";
import StatusChip from "../components/ui/StatusChip";
import { useAppStore } from "../store/appStore";

const AVATAR_COLORS = ["#16a34a", "#8b5cf6", "#ef4444", "#22c55e", "#f59e0b", "#0284c7", "#a855f7", "#16a34a"];

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, py: 1.5 }}>
      <Box sx={{ color: "info.main", mt: 0.2, flexShrink: 0 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, fontSize: 10 }}>
          {label}
        </Typography>
        <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{value}</Typography>
      </Box>
    </Box>
  );
}

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, selectedPatient, setSelectedPatient } = useAppStore();

  const patient = selectedPatient ?? patients.find((p) => p.id === id);

  if (!patient) {
    return (
      <AppLayout title="Patient Not Found">
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Patient not found.</Typography>
          <Button variant="contained" onClick={() => navigate("/patients")}>Back to Patients</Button>
        </Box>
      </AppLayout>
    );
  }

  const idx = patients.findIndex((p) => p.id === patient.id);
  const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];

  return (
    <AppLayout title="Patient Details" subtitle={patient.id}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => { setSelectedPatient(null); navigate("/patients"); }}
        sx={{ mb: 2.5, fontWeight: 600 }}
        variant="text"
      >
        Back to Patients
      </Button>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "340px 1fr" }, gap: 2.5 }}>
        {/* Left Panel */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* Profile Card */}
          <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                fontSize: 28,
                fontWeight: 800,
                bgcolor: avatarColor,
                mx: "auto",
                mb: 2,
                boxShadow: `0 8px 24px ${avatarColor}55`,
              }}
            >
              {patient.avatar}
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>{patient.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {patient.age} years · {patient.gender}
            </Typography>
            <StatusChip status={patient.status} size="medium" />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
              <Chip label={patient.department} size="small" color="info" variant="outlined" />
              <Chip
                icon={<Bloodtype sx={{ fontSize: "14px !important" }} />}
                label={patient.bloodType}
                size="small"
                sx={{ fontWeight: 700 }}
              />
            </Box>
          </Card>

          {/* Contact */}
          <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Contact Information</Typography>
            <Divider sx={{ mb: 1 }} />
            <InfoRow icon={<Phone fontSize="small" />} label="Phone" value={patient.phone} />
            <Divider />
            <InfoRow icon={<Email fontSize="small" />} label="Email" value={patient.email} />
            <Divider />
            <InfoRow icon={<LocationOn fontSize="small" />} label="Address" value={patient.address} />
          </Card>
        </Box>

        {/* Right Panel */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* Medical Info */}
          <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Medical Information</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 0,
              }}
            >
              <Box sx={{ pr: { sm: 3 } }}>
                <InfoRow icon={<LocalHospital fontSize="small" />} label="Primary Condition" value={patient.condition} />
                <Divider />
                <InfoRow icon={<Person fontSize="small" />} label="Attending Physician" value={patient.doctor} />
                <Divider />
                <InfoRow icon={<LocalHospital fontSize="small" />} label="Department" value={patient.department} />
              </Box>
              <Box sx={{ pl: { sm: 3 }, borderLeft: { sm: "1px solid" }, borderColor: { sm: "divider" } }}>
                <InfoRow icon={<CalendarMonth fontSize="small" />} label="Admission Date" value={new Date(patient.admissionDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
                <Divider />
                <InfoRow icon={<CalendarMonth fontSize="small" />} label="Last Visit" value={new Date(patient.lastVisit).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
                <Divider />
                <InfoRow icon={<CalendarMonth fontSize="small" />} label="Next Appointment" value={new Date(patient.nextAppointment).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
              </Box>
            </Box>
          </Card>

          {/* Treatment Timeline (mock) */}
          <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Treatment Timeline</Typography>
            {[
              { date: patient.admissionDate, event: "Patient admitted", note: `Admitted to ${patient.department}`, color: "#16a34a" },
              { date: patient.lastVisit, event: "Last consultation", note: `Reviewed by ${patient.doctor}`, color: "#8b5cf6" },
              { date: patient.nextAppointment, event: "Follow-up scheduled", note: "Upcoming appointment", color: "#22c55e" },
            ].map((ev, i) => (
              <Box key={i} sx={{ display: "flex", gap: 2, mb: i < 2 ? 2 : 0 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: ev.color, mt: 0.5, flexShrink: 0 }} />
                  {i < 2 && <Box sx={{ width: 2, flex: 1, bgcolor: "divider", mt: 0.5 }} />}
                </Box>
                <Box sx={{ pb: i < 2 ? 2 : 0 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{ev.event}</Typography>
                  <Typography variant="caption" color="text.secondary">{ev.note}</Typography>
                  <Typography variant="caption" sx={{ display: "block", color: "text.disabled", mt: 0.3 }}>
                    {new Date(ev.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Card>
        </Box>
      </Box>
    </AppLayout>
  );
}
