export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  status: "Active" | "Discharged" | "Critical" | "Stable";
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
}
