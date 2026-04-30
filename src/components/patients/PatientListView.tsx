import {
  Box,
  Card,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";

import StatusChip from "../ui/StatusChip";
import type { Patient } from "../../types";
import CustomAvatar from "../ui/CustomAvatar";

type Props = {
  patients: Patient[];
  onPatientClick: (patient: Patient) => void;
};

export default function PatientListView({
  patients = [],
  onPatientClick,
}: Props) {
  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 90px",
          gap: 2,
          px: 3,
          py: 1.5,
          bgcolor: "background.default",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        {[
          "Patient",
          "Condition / Dept",
          "Status",
          "Doctor",
          "Next Appt",
          "Actions",
        ].map((h) => (
          <Typography
            key={h}
            variant="caption"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              textAlign: h === "Actions" ? "right" : "left",
            }}
          >
            {h}
          </Typography>
        ))}
      </Box>

      {patients.map((patient, index) => (
        <Box key={patient.id}>
          <Box
            onClick={() => onPatientClick(patient)}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "2fr 1.5fr 1fr 1fr 1fr 90px",
              },
              gap: { xs: 1.4, md: 2 },
              px: { xs: 2, md: 3 },
              py: 2,
              alignItems: "center",
              cursor: "pointer",
              transition: "background-color 0.15s",
              "&:hover": { bgcolor: "background.default" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CustomAvatar
                name={patient.name}
                src={patient.avatar?.startsWith("http") ? patient.avatar : undefined}
                width={36}
                height={36}
              />

              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                  {patient.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {patient.id} · {patient.age}y · {patient.bloodType}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {patient.condition}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {patient.department}
              </Typography>
            </Box>

            <Box sx={{ justifySelf: "start" }}>
              <StatusChip status={patient.status} />
            </Box>

            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
              {patient.doctor.replace("Dr. ", "")}
            </Typography>

            <Typography sx={{ fontSize: 13 }}>
              {new Date(patient.nextAppointment).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </Typography>

            <Box sx={{ justifySelf: { xs: "start", md: "center" } }}>
              <Tooltip title="View Patient" arrow>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPatientClick(patient);
                  }}
                  color="secondary"
                >
                  <Visibility fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {index < patients.length - 1 && <Divider />}
        </Box>
      ))}

      {patients.length === 0 && (
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography color="text.secondary">
            No patients match your search.
          </Typography>
        </Box>
      )}
    </Card>
  );
}