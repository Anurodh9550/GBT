export const siteConfig = {
  name: "Gautam Buddha College",
  shortName: "GBT",
  tagline: "Excellence in Education Since 1998",
  trust: "Gautam Buddha Educational Trust",
  established: "1998",
  phone: "+91 98765 43210",
  email: "info@gbtedtrust.edu.in",
  address: "123 Education Lane, Knowledge Park, New Delhi - 110001",
  logo: "/logo.png",
  admissionBatch: "2026–27",
  colors: {
    orange: "#e8751a",
    green: "#2d6a2e",
    maroon: "#5c2e2e",
    black: "#0a0a0a",
  },
  social: {
    facebook: "#",
    twitter: "#",
    youtube: "#",
    instagram: "#",
  },
};

export type NavItem = {
  label: string;
  href: string;
  matchPaths?: string[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-trust" },
  {
    label: "Academics",
    href: "/academics",
    matchPaths: ["/academics", "/courses"],
  },
  { label: "Admissions", href: "/admissions" },
  {
    label: "Campus",
    href: "/campus-life",
    matchPaths: ["/campus-life", "/placements", "/news-events", "/gallery"],
  },
  { label: "Contact", href: "/contact" },
  {
    label: "Portal",
    href: "/portal",
    matchPaths: [
      "/portal",
      "/student-login",
      "/student-erp",
      "/faculty-login",
      "/faculty-erp",
      "/online-classes",
      "/study-materials",
      "/assignments",
      "/online-exams",
      "/results",
    ],
  },
];

export const academicsDropdown = [
  { label: "Academic Overview", href: "/academics" },
  { label: "Our Courses", href: "/courses" },
];

export const campusDropdown = [
  { label: "Campus Life", href: "/campus-life" },
  { label: "Placements", href: "/placements" },
  { label: "News & Events", href: "/news-events" },
  { label: "Photo Gallery", href: "/gallery" },
];

export const portalDropdown = [
  { label: "Student ERP", href: "/student-login", icon: "student" as const },
  { label: "Faculty ERP", href: "/faculty-login", icon: "faculty" as const },
];

export const portalNav = [
  { label: "Student Login", href: "/student-login" },
  { label: "Faculty Login", href: "/faculty-login" },
  { label: "Online Classes", href: "/online-classes" },
  { label: "Study Materials", href: "/study-materials" },
  { label: "Assignments", href: "/assignments" },
  { label: "Online Exams", href: "/online-exams" },
  { label: "Results", href: "/results" },
];
