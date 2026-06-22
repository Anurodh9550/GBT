export type ErpNavLink = {
  label: string;
  href: string;
};

export type ErpNavGroup = {
  label: string;
  icon: string;
  items: ErpNavLink[];
};

export const studentErpNav: ErpNavLink[] = [
  { label: "Dashboard", href: "/student-erp" },
];

export const studentErpGroups: ErpNavGroup[] = [
  {
    label: "ACADEMIA",
    icon: "academia",
    items: [
      { label: "Announcement", href: "/student-erp/announcement" },
      { label: "Assignment", href: "/student-erp/assignment" },
      { label: "Course Content", href: "/student-erp/course-content" },
      { label: "Lectures", href: "/student-erp/lectures" },
      { label: "Rate Faculty", href: "/student-erp/rate-faculty" },
      { label: "Leave Application", href: "/student-erp/leave-application" },
      { label: "MST Marks", href: "/student-erp/mst-marks" },
      { label: "Final Evaluation", href: "/student-erp/final-evaluation" },
    ],
  },
  {
    label: "MY LIBRARY",
    icon: "library",
    items: [
      { label: "OPAC-Book Search", href: "/student-erp/library/opac-search" },
      { label: "OPAC-Issue Details", href: "/student-erp/library/issue-details" },
      { label: "Reservation Details", href: "/student-erp/library/reservation" },
      { label: "Book Suggestion", href: "/student-erp/library/book-suggestion" },
    ],
  },
  {
    label: "EXTRA FEATURES",
    icon: "extra",
    items: [
      { label: "My Files", href: "/student-erp/my-files" },
      { label: "My Profile", href: "/student-erp/my-profile" },
      { label: "Change Password", href: "/student-erp/change-password" },
      { label: "Time Table", href: "/student-erp/time-table" },
      { label: "My Lecture Schedule", href: "/student-erp/lecture-schedule" },
      { label: "Library Fine/Fee Detail", href: "/student-erp/library-fine" },
      { label: "My Attendance", href: "/student-erp/my-attendance" },
      { label: "My Total Attendance", href: "/student-erp/total-attendance" },
      { label: "Form Forward", href: "/student-erp/form-forward" },
      { label: "Documents", href: "/student-erp/documents" },
    ],
  },
];

export const studentErpSampleEvents = ["Annual Tech Fest 2026", "Mid-Semester Exam Schedule"];

export const studentErpSampleNotices = [
  "Admit cards for End Semester Examination are now available.",
  "Library timing extended during exam week — 8 AM to 8 PM.",
];
