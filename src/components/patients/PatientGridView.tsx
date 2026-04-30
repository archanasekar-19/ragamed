import {
  Box,
  Card,
  Chip,
  Divider,
  Typography,
} from "@mui/material";

import StatusChip from "../ui/StatusChip";
import type { Patient } from "../../types";
import CustomAvatar from "../ui/CustomAvatar";

type Props = {
  patients: Patient[];
  onPatientClick: (patient: Patient) => void;
};

export default function PatientGridView({ patients, onPatientClick }: Props) {
  if (!patients.length) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography color="text.secondary">
          No patients match your search.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: "repeat(3, 1fr)",
        },
        gap: 2.5,
      }}
    >
      {patients.map((patient) => (
        <Card
          key={patient.id}
          onClick={() => onPatientClick(patient)}
          sx={{
            p: 2.5,
            cursor: "pointer",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            transition: "all 0.2s",
            minHeight: 240,
            "&:hover": {
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              transform: "translateY(-2px)",
              borderColor: "info.main",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <CustomAvatar
              name={patient.name}
              src={patient.avatar?.startsWith("http") ? patient.avatar : undefined}
              width={36}
              height={36}
            />

            <StatusChip status={patient.status} />
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.3 }}>
            {patient.name}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 1.5 }}
          >
            {patient.id} · {patient.age}y · {patient.gender}
          </Typography>

          <Chip
            label={patient.department}
            size="small"
            sx={{
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
              fontSize: 11,
              mb: 2,
              maxWidth: "100%",
            }}
          />

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
            <PatientInfo label="Condition" value={patient.condition} />
            <PatientInfo label="Doctor" value={patient.doctor} noWrap />
            <PatientInfo
              label="Next Appt"
              value={new Date(patient.nextAppointment).toLocaleDateString(
                "en-IN",
                { day: "numeric", month: "short" }
              )}
            />
          </Box>
        </Card>
      ))}
    </Box>
  );
}

function PatientInfo({
  label,
  value,
  noWrap,
}: {
  label: string;
  value: string;
  noWrap?: boolean;
}) {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", minWidth: 0 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ width: 80, flexShrink: 0 }}
      >
        {label}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          fontWeight: 600,
          minWidth: 0,
          overflow: noWrap ? "hidden" : "visible",
          textOverflow: noWrap ? "ellipsis" : "clip",
          whiteSpace: noWrap ? "nowrap" : "normal",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}