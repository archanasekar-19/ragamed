export interface PatientDocument {
  id: string;
  title: string;
  type: "Insurance" | "Billing" | "Lab Report" | "Prescription" | "Summary";
  date: string;
  size: string;
  url: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  status: "Active" | "Discharged" | "Critical" | "Stable" | "Emergency";
  doctor: string;
  lastVisit: string;
  nextAppointment: string;
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
  admissionDate: string;
  department: string;
  insurance?: {
    provider: string;
    policyNumber: string;
    coverage: string;
    validTill: string;
  };

  billing?: {
    total: number;
    covered: number;
    payable: number;
  };

  documents?: PatientDocument[];
}