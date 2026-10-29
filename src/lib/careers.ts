export type CareerCategory = "Teaching" | "Non-teaching";

export type CareerOpening = {
  id: string;
  title: string;
  category: CareerCategory;
  department: string;
  type: "Full-time";
  qualification: string;
  experience: string;
  summary: string;
};

export const careerOpenings: CareerOpening[] = [
  {
    id: "assistant-professor-dental",
    title: "Assistant Professor — Dental Sciences",
    category: "Teaching",
    department: "Dental Sciences",
    type: "Full-time",
    qualification: "MDS in a relevant dental specialty, with BDS from a recognised institution.",
    experience: "Clinical and teaching experience preferred, as per council norms.",
    summary: "Teach BDS students in clinics and classrooms, and support patient care on campus.",
  },
  {
    id: "lecturer-pharmacy",
    title: "Lecturer — Pharmacy",
    category: "Teaching",
    department: "Pharmacy",
    type: "Full-time",
    qualification: "B.Pharm or M.Pharm from a PCI-recognised institution.",
    experience: "Teaching or hospital / community pharmacy experience preferred.",
    summary: "Take theory and practical classes for the Diploma in Pharmacy programme.",
  },
  {
    id: "lecturer-paramedical",
    title: "Lecturer — Paramedical Sciences",
    category: "Teaching",
    department: "Paramedical Sciences",
    type: "Full-time",
    qualification: "Relevant degree or diploma in radiology, medical laboratory technology, or allied health.",
    experience: "Hospital or teaching experience in the subject applied for.",
    summary: "Train students in X-ray, DMLT, OT, and other allied-health diploma courses.",
  },
  {
    id: "lecturer-veterinary",
    title: "Lecturer — Veterinary Sciences",
    category: "Teaching",
    department: "Veterinary Sciences",
    type: "Full-time",
    qualification: "Degree or diploma in veterinary science, animal husbandry, or a related field.",
    experience: "Clinical, farm, or teaching experience with livestock care.",
    summary: "Teach veterinary assistant and animal-husbandry programmes with practical sessions.",
  },
  {
    id: "assistant-professor-commerce",
    title: "Assistant Professor — Commerce",
    category: "Teaching",
    department: "Commerce",
    type: "Full-time",
    qualification: "Master’s degree in Commerce. NET / Ph.D. preferred.",
    experience: "College teaching in accounting, taxation, or finance is an advantage.",
    summary: "Teach B.Com classes in accounting, taxation, and business fundamentals.",
  },
  {
    id: "assistant-professor-management",
    title: "Assistant Professor — Management",
    category: "Teaching",
    department: "Management Studies",
    type: "Full-time",
    qualification: "MBA or equivalent master’s degree. NET / Ph.D. preferred.",
    experience: "Teaching or industry experience in marketing, finance, or HR.",
    summary: "Teach BBA and MBA papers and mentor students on projects and placements.",
  },
  {
    id: "lecturer-applied-sciences",
    title: "Lecturer — Applied Sciences & Humanities",
    category: "Teaching",
    department: "Applied Sciences and Humanities",
    type: "Full-time",
    qualification: "Master’s degree in the subject applied for (science, English, or related arts).",
    experience: "College-level teaching experience preferred.",
    summary: "Teach foundation papers that support professional and degree programmes.",
  },
  {
    id: "lab-technician",
    title: "Laboratory Technician",
    category: "Non-teaching",
    department: "Dental / Paramedical Laboratories",
    type: "Full-time",
    qualification: "Diploma or certificate in medical laboratory technology, radiology, or dental chair-side assisting.",
    experience: "Hands-on lab or hospital experience.",
    summary: "Prepare labs, assist practical classes, and keep equipment and records in order.",
  },
  {
    id: "librarian",
    title: "Librarian",
    category: "Non-teaching",
    department: "Central Library",
    type: "Full-time",
    qualification: "Bachelor’s or master’s degree in Library Science.",
    experience: "Experience in a college or institutional library.",
    summary: "Run circulation, catalogues, and reading-room services for students and faculty.",
  },
  {
    id: "office-assistant",
    title: "Office Assistant — Admissions",
    category: "Non-teaching",
    department: "College Office",
    type: "Full-time",
    qualification: "Graduate with working knowledge of computers and Hindi / English correspondence.",
    experience: "Office or admissions-desk experience preferred.",
    summary: "Support counselling, applications, and front-office work during the admission season.",
  },
];

export const generalApplicationId = "general";
