import { useMemo, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Pagination,
  Tooltip,
} from "@mui/material";
import { Search, GridView, ViewList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import { useAppStore } from "../store/appStore";
import PatientGridView from "../components/patients/PatientGridView";
import PatientListView from "../components/patients/PatientListView";
import type { Patient } from "../types";

const ROWS_PER_PAGE = 9;

export default function Patients() {
  const {
    patients,
    patientView,
    setPatientView,
    patientSearch,
    setPatientSearch,
    setSelectedPatient,
  } = useAppStore();

  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const safePatients = patients || [];

  const filtered = useMemo(() => {
    const search = patientSearch.toLowerCase().trim();

    return safePatients.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.condition.toLowerCase().includes(search) ||
        p.department.toLowerCase().includes(search) ||
        p.status.toLowerCase().includes(search) ||
        p.doctor.toLowerCase().includes(search)
    );
  }, [safePatients, patientSearch]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));

  const paginatedPatients = filtered.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const handleSearch = (value: string) => {
    setPatientSearch(value);
    setPage(1);
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    navigate(`/patients/${patient.id}`);
  };

  return (
    <AppLayout
      title="Patients"
      subtitle={`${safePatients.length} total patients registered`}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <TextField
          placeholder="Search patients, conditions, departments..."
          value={patientSearch}
          onChange={(e) => handleSearch(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: { xs: "100%", sm: 260 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 18, color: "text.secondary" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <ToggleButtonGroup
          value={patientView}
          exclusive
          onChange={(_, value) => value && setPatientView(value)}
          size="small"
        >
          <Tooltip title="Grid View" arrow>
            <ToggleButton value="grid" sx={{ px: 1.5 }}>
              <GridView fontSize="small" />
            </ToggleButton>
          </Tooltip>

          <Tooltip title="List View" arrow>
            <ToggleButton value="list" sx={{ px: 1.5 }}>
              <ViewList fontSize="small" />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>

        <Chip
          label={`${filtered.length} results`}
          size="small"
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontWeight: 600,
          }}
        />
      </Box>

      {patientView === "grid" ? (
        <PatientGridView
          patients={paginatedPatients}
          onPatientClick={handlePatientClick}
        />
      ) : (
        <PatientListView
          patients={paginatedPatients}
          onPatientClick={handlePatientClick}
        />
      )}

      {filtered.length > ROWS_PER_PAGE && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            siblingCount={0}
            boundaryCount={1}
          />
        </Box>
      )}
    </AppLayout>
  );
}