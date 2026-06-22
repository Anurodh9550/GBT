export type FacultyErpNavLink = {
  label: string;
  href: string;
};

export type FacultyErpNavGroup = {
  label: string;
  icon: string;
  items: FacultyErpNavLink[];
};

export const facultyErpNav: FacultyErpNavLink[] = [
  { label: "Dashboard", href: "/faculty-erp" },
];

export const facultyErpGroups: FacultyErpNavGroup[] = [
  {
    label: "TEACHING",
    icon: "teaching",
    items: [
      { label: "My Classes", href: "/faculty-erp/my-classes" },
      { label: "Mark Attendance", href: "/faculty-erp/mark-attendance" },
      { label: "Upload Assignment", href: "/faculty-erp/upload-assignment" },
      { label: "Upload Course Content", href: "/faculty-erp/upload-course-content" },
      { label: "Upload Lecture", href: "/faculty-erp/upload-lecture" },
      { label: "Enter MST Marks", href: "/faculty-erp/enter-mst-marks" },
      { label: "Enter Final Marks", href: "/faculty-erp/enter-final-marks" },
      { label: "Post Announcement", href: "/faculty-erp/announcement" },
    ],
  },
  {
    label: "ADMINISTRATION",
    icon: "admin",
    items: [
      { label: "Leave Application", href: "/faculty-erp/leave-application" },
      { label: "Form Forward", href: "/faculty-erp/form-forward" },
      { label: "Time Table", href: "/faculty-erp/time-table" },
      { label: "Lecture Schedule", href: "/faculty-erp/lecture-schedule" },
    ],
  },
  {
    label: "EXTRA FEATURES",
    icon: "extra",
    items: [
      { label: "My Profile", href: "/faculty-erp/my-profile" },
      { label: "Change Password", href: "/faculty-erp/change-password" },
      { label: "My Files", href: "/faculty-erp/my-files" },
      { label: "Documents", href: "/faculty-erp/documents" },
    ],
  },
];

export const facultyErpSampleEvents = [
  "Faculty Development Program — 25 June 2026",
  "Department Meeting — CSE Block, Room 301",
];

export const facultyErpSampleNotices = [
  "Mid-semester mark entry deadline: 30 June 2026.",
  "Submit attendance sheets for all sections before 5 PM today.",
];
