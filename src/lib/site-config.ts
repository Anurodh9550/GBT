export const siteConfig = {
  name: "Gautam Buddha College of Education",
  shortName: "GBCE",
  tagline: "Excellence in Education Since 1998",
  trust: "Gautam Buddha Educational Trust",
  established: "1998",
  phone: "+91 99191 61119",
  phones: ["+91 99191 61119"],
  email: "info@gbcollege.org",
  emails: ["info@gbcollege.org"],
  address: "Village Nagara, Post Itahiya, District Jalaun, Uttar Pradesh - 285123",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Village%20Nagara%2C%20Post%20Itahiya%2C%20District%20Jalaun%2C%20Uttar%20Pradesh%20285123&z=15&output=embed",
  logo: "/logo.png",
  admissionBatch: "2026–27",
  /** Official GBCE admission / registration form (public/) */
  admissionFormPdf: "/gbce-admission-form.pdf",
  ctaRegisterLabel: "Register Now for Admission",
  enquiryCtaLabel: "Enquiry Now",
  registerCtaLabel: "Register",
  /** College Enquiry Form (on-site) */
  enquiryFormUrl: "/enquiry",
  /** Full admission registration portal */
  admissionRegisterUrl: "/admissions/register",
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
  /** Render backend — update if your service URL changes */
  productionApiUrl: "https://backend-gbt.onrender.com",
  localApiUrl: "http://127.0.0.1:8000",
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
