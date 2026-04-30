import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Divider,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  LinearProgress,
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
  Description,
  ReceiptLong,
  HealthAndSafety,
  Visibility,
  Download,
  Payments,
  Assignment,
  Medication,
  Science,
  TrendingUp,
  WarningAmber,
  CheckCircle,
  EventAvailable,
} from "@mui/icons-material";

import AppLayout from "../components/layout/AppLayout";
import StatusChip from "../components/ui/StatusChip";
import { useAppStore } from "../store/appStore";
import CustomAvatar from "@/components/ui/CustomAvatar";
import DocumentViewerDialog from "@/components/ui/DocumentViewerDialog";
import type { PatientDocument } from "../types";

const cardSx = {
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 4,
  boxShadow: "0 8px 28px rgba(15, 23, 42, 0.06)",
};

const fallbackInsurance = {
  provider: "Not Available",
  policyNumber: "Not Available",
  coverage: "₹0",
  validTill: "",
};

const fallbackBilling = {
  total: 0,
  covered: 0,
  payable: 0,
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date?: string) => {
  if (!date) return "Not Available";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getDocIcon = (type: PatientDocument["type"]) => {
  switch (type) {
    case "Insurance":
      return <HealthAndSafety fontSize="small" />;
    case "Billing":
      return <ReceiptLong fontSize="small" />;
    case "Lab Report":
      return <Science fontSize="small" />;
    case "Prescription":
      return <Medication fontSize="small" />;
    case "Summary":
      return <Assignment fontSize="small" />;
    default:
      return <Description fontSize="small" />;
  }
};

const getDocColor = (type: PatientDocument["type"]) => {
  switch (type) {
    case "Insurance":
      return "#10b981";
    case "Billing":
      return "#f59e0b";
    case "Lab Report":
      return "#2563eb";
    case "Prescription":
      return "#8b5cf6";
    case "Summary":
      return "#06b6d4";
    default:
      return "#64748b";
  }
};

function InfoRow({
  icon,
  label,
  value,
  color = "primary.main",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, py: 1.35 }}>
      <Box sx={{ color, mt: 0.2, flexShrink: 0 }}>{icon}</Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            color: "text.secondary",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 0.6,
            fontSize: 10,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 14.5,
            color: "text.primary",
            wordBreak: "break-word",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, selectedPatient, setSelectedPatient } = useAppStore();

  const patient = selectedPatient ?? patients.find((p) => p.id === id);
  const [selectedDoc, setSelectedDoc] = useState<PatientDocument | null>(null);

  if (!patient) {
    return (
      <AppLayout title="Patient Not Found">
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Patient not found.
          </Typography>

          <Button variant="contained" onClick={() => navigate("/patients")}>
            Back to Patients
          </Button>
        </Box>
      </AppLayout>
    );
  }

  const insurance = patient.insurance ?? fallbackInsurance;
  const billing = patient.billing ?? fallbackBilling;
  const documents = patient.documents ?? [];

  const insuranceUsage =
    billing.total > 0 ? Math.round((billing.covered / billing.total) * 100) : 0;

  return (
    <AppLayout title="Patient Details" subtitle={patient.id}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          setSelectedPatient(null);
          navigate("/patients");
        }}
        sx={{ mb: 2.5, fontWeight: 800 }}
      >
        Back to Patients
      </Button>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "360px 1fr" },
          gap: 2.5,
          alignItems: "start",
        }}
      >
        {/* LEFT SECTION */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Card
            sx={{
              ...cardSx,
              p: 3,
              minHeight: { lg: 380 },
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background:
                "linear-gradient(180deg, rgba(37,99,235,0.05), rgba(255,255,255,1))",
            }}
          >
            <CustomAvatar
              name={patient.name}
              src={patient.avatar?.startsWith("http") ? patient.avatar : undefined}
              width={88}
              height={88}
              sx={{ mx: "auto", mb: 2 }}
            />

            <Typography
              variant="h5"
              sx={{ fontWeight: 900, color: "#0f172a", mb: 0.5 }}
            >
              {patient.name}
            </Typography>

            <Typography sx={{ color: "#475569", fontWeight: 600, mb: 1.5 }}>
              {patient.age} years · {patient.gender}
            </Typography>

            <Box>
              <StatusChip status={patient.status} size="medium" />
            </Box>

            <Divider sx={{ my: 2.2 }} />

            <Stack direction="row" sx={{justifyContent:"center",gap:1, flexWrap:"wrap"}}>
              <Chip label={patient.department} color="primary" variant="outlined" />

              <Chip
                icon={<Bloodtype sx={{ fontSize: "14px !important" }} />}
                label={patient.bloodType}
                sx={{ fontWeight: 800, bgcolor: "#eef2ff", color: "#3730a3" }}
              />
            </Stack>
          </Card>

          <Card sx={{ ...cardSx, p: 2.5 }}>
            <Typography sx={{ fontWeight: 900, mb: 1, color: "#0f172a" }}>
              Contact Information
            </Typography>

            <Divider />

            <InfoRow
              icon={<Phone fontSize="small" />}
              label="Phone"
              value={patient.phone}
              color="#2563eb"
            />
            <Divider />

            <InfoRow
              icon={<Email fontSize="small" />}
              label="Email"
              value={patient.email}
              color="#8b5cf6"
            />
            <Divider />

            <InfoRow
              icon={<LocationOn fontSize="small" />}
              label="Address"
              value={patient.address}
              color="#10b981"
            />
          </Card>

          <Card sx={{ ...cardSx, p: 2.5 }}>
            <Typography sx={{ fontWeight: 900, mb: 1, color: "#0f172a" }}>
              Insurance Details
            </Typography>

            <Divider />

            <InfoRow
              icon={<HealthAndSafety fontSize="small" />}
              label="Provider"
              value={insurance.provider}
              color="#10b981"
            />
            <Divider />

            <InfoRow
              icon={<Description fontSize="small" />}
              label="Policy No"
              value={insurance.policyNumber}
              color="#6366f1"
            />
            <Divider />

            <InfoRow
              icon={<Payments fontSize="small" />}
              label="Coverage"
              value={insurance.coverage}
              color="#f59e0b"
            />
            <Divider />

            <InfoRow
              icon={<CalendarMonth fontSize="small" />}
              label="Valid Till"
              value={formatDate(insurance.validTill)}
              color="#06b6d4"
            />
          </Card>
        </Box>

        {/* RIGHT SECTION */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Card sx={{ ...cardSx, p: 3, minHeight: { lg: 380 } }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, color: "#0f172a", mb: 2 }}
            >
              Medical Information
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: { xs: 0, sm: 4 },
              }}
            >
              <Box>
                <InfoRow
                  icon={<LocalHospital fontSize="small" />}
                  label="Primary Condition"
                  value={patient.condition}
                  color="#ef4444"
                />
                <Divider />

                <InfoRow
                  icon={<Person fontSize="small" />}
                  label="Attending Physician"
                  value={patient.doctor}
                  color="#2563eb"
                />
                <Divider />

                <InfoRow
                  icon={<LocalHospital fontSize="small" />}
                  label="Department"
                  value={patient.department}
                  color="#10b981"
                />
              </Box>

              <Box
                sx={{
                  pl: { sm: 3 },
                  borderLeft: { sm: "1px solid" },
                  borderColor: "divider",
                }}
              >
                <InfoRow
                  icon={<CalendarMonth fontSize="small" />}
                  label="Admission Date"
                  value={formatDate(patient.admissionDate)}
                  color="#6366f1"
                />
                <Divider />

                <InfoRow
                  icon={<CalendarMonth fontSize="small" />}
                  label="Last Visit"
                  value={formatDate(patient.lastVisit)}
                  color="#06b6d4"
                />
                <Divider />

                <InfoRow
                  icon={<EventAvailable fontSize="small" />}
                  label="Next Appointment"
                  value={formatDate(patient.nextAppointment)}
                  color="#10b981"
                />
              </Box>
            </Box>

            <Box
              sx={{
                mt: 2.5,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 1.5,
              }}
            >
              {[
                {
                  icon: <CheckCircle />,
                  label: "Risk Level",
                  value: patient.status === "Critical" ? "High" : "Low",
                  color: patient.status === "Critical" ? "#ef4444" : "#10b981",
                },
                {
                  icon: <TrendingUp />,
                  label: "Recovery Trend",
                  value: patient.status === "Discharged" ? "Recovered" : "Improving",
                  color: "#2563eb",
                },
                {
                  icon: <WarningAmber />,
                  label: "Attention",
                  value: patient.condition,
                  color: "#f59e0b",
                },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: `${item.color}12`,
                    border: `1px solid ${item.color}35`,
                    display: "flex",
                    gap: 1.2,
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ color: item.color, display: "grid" }}>
                    {item.icon}
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "text.secondary",
                        fontWeight: 800,
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 900,
                        color: item.color,
                        fontSize: 14,
                      }}
                      noWrap
                    >
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>

          <Card sx={{ ...cardSx, p: 2.5 }}>
            <Typography sx={{ fontWeight: 900, mb: 2, color: "#0f172a" }}>
              Billing Summary
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: 1.5,
              }}
            >
              {[
                {
                  label: "Total Bill",
                  value: formatCurrency(billing.total),
                  color: "#6366f1",
                },
                {
                  label: "Insurance Covered",
                  value: formatCurrency(billing.covered),
                  color: "#10b981",
                },
                {
                  label: "Patient Payable",
                  value: formatCurrency(billing.payable),
                  color: "#f59e0b",
                },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: `${item.color}12`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <Typography sx={{ fontSize: 12, fontWeight: 900, color: "#334155" }}>
                    {item.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 950,
                      fontSize: 26,
                      color: item.color,
                      mt: 0.5,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: 2 }}>
              <Stack direction="row" sx={{ mb: 0.7, justifyContent:"space-between" }}>
                <Typography sx={{ fontSize: 12, fontWeight: 800, color: "#475569" }}>
                  Insurance utilization
                </Typography>

                <Typography sx={{ fontSize: 12, fontWeight: 900, color: "#10b981" }}>
                  {insuranceUsage}%
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={insuranceUsage}
                sx={{
                  height: 8,
                  borderRadius: 99,
                  bgcolor: "#e2e8f0",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 99,
                    bgcolor: "#10b981",
                  },
                }}
              />
            </Box>
          </Card>

          <Card sx={{ ...cardSx, p: 2.5 }}>
            <Typography sx={{ fontWeight: 900, mb: 2, color: "#0f172a" }}>
              Patient Documents
            </Typography>

            {documents.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 5,
                  px: 2,
                  border: "1px dashed",
                  borderColor: "divider",
                  borderRadius: 3,
                  bgcolor: "background.default",
                }}
              >
                <Description sx={{ color: "text.disabled", fontSize: 42, mb: 1 }} />

                <Typography sx={{ fontWeight: 800, color: "text.secondary" }}>
                  No documents available
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Insurance, bill, prescription and lab reports will appear once uploaded.
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 1.5,
                }}
              >
                {documents.map((doc) => {
                  const color = getDocColor(doc.type);

                  return (
                    <Box
                      key={doc.id}
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        border: `1px solid ${color}30`,
                        bgcolor: `${color}10`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1.3, minWidth: 0 }}>
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2,
                            bgcolor: color,
                            color: "#fff",
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                          }}
                        >
                          {getDocIcon(doc.type)}
                        </Box>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 900, fontSize: 13.5 }} noWrap>
                            {doc.title}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 11.5,
                              color: "text.secondary",
                              fontWeight: 700,
                            }}
                          >
                            {doc.type} · {doc.size}
                          </Typography>
                        </Box>
                      </Box>

                      <Stack direction="row" spacing={0.3}>
                        <Tooltip title="View Document">
                          <IconButton size="small" onClick={() => setSelectedDoc(doc)}>
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Download">
                          <IconButton
                            size="small"
                            component="a"
                            href={doc.url}
                            target="_blank"
                          >
                            <Download fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Card>
        </Box>
      </Box>

      <DocumentViewerDialog
        open={Boolean(selectedDoc)}
        onClose={() => setSelectedDoc(null)}
        document={
          selectedDoc
            ? {
              ...selectedDoc,
              icon: getDocIcon(selectedDoc.type),
            }
            : null
        }
      />
    </AppLayout>
  );
}