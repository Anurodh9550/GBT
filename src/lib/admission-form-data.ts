/** Branches per course — admission registration portal */
export const ADMISSION_BRANCHES: Record<string, string[]> = {
  "d-pharma": ["Pharmacy (General)", "Other"],
  bba: ["General Management", "Marketing", "Finance", "Other"],
  bds: ["General Dentistry", "Oral Surgery", "Orthodontics", "Other"],
  bcom: ["General", "Honours", "Other"],
  bsc: ["PCM", "PCB", "Other"],
  mba: ["Finance", "Marketing", "HR", "Operations", "Other"],
  ma: ["English", "History", "Political Science", "Other"],
  paramedical: [
    "X-Ray / Radiology Technician",
    "DMLT (Lab Technician)",
    "OT Technician",
    "ECG Technician",
    "Dialysis Technician",
    "Other",
  ],
  veterinary: [
    "Veterinary Assistant",
    "Animal Husbandry",
    "Livestock Care",
    "Poultry Management",
    "Other",
  ],
};

export const ADMISSION_CATEGORIES = ["General", "OBC", "SC", "ST", "EWS", "Other"] as const;
export const ADMISSION_GENDERS = ["Male", "Female", "Other"] as const;
export const ADMISSION_STREAMS = ["PCM", "Commerce", "Arts", "Other"] as const;

export const ADMISSION_DOCUMENTS_CHECKLIST = [
  "10th Mark Sheet & Certificate",
  "12th Mark Sheet & Certificate",
  "Transfer / Migration Certificate",
  "Character Certificate",
  "Aadhaar Card (self-attested copy)",
  "Passport size photographs (4)",
  "Category certificate (if applicable)",
  "Domicile certificate (if applicable)",
] as const;
