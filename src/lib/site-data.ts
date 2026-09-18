import { siteConfig } from "@/lib/site-config";

export type Department = {
  slug: string;
  name: string;
  icon: DepartmentIconId;
  duration: string;
  desc: string;
};

export type DepartmentIconId =
  | "computer"
  | "electronics"
  | "electrical"
  | "science"
  | "it"
  | "ai"
  | "mechanical"
  | "automobile"
  | "mba"
  | "civil";

export const departments: Department[] = [
  {
    slug: "dental-sciences",
    name: "Dental Sciences",
    icon: "science",
    duration: "BDS — 5 Years",
    desc: "Clinical dentistry, oral health, and professional dental practice.",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    icon: "science",
    duration: "D-Pharma — 2 Years",
    desc: "Pharmaceutical sciences, drug formulation, and community pharmacy practice.",
  },
  {
    slug: "paramedical",
    name: "Paramedical Sciences",
    icon: "science",
    duration: "Diploma / Certificate — 1–2 Years",
    desc: "X-Ray / Radiology, DMLT, OT Technician, and allied health diploma courses.",
  },
  {
    slug: "veterinary",
    name: "Veterinary Sciences",
    icon: "science",
    duration: "Diploma / Certificate — 1–2 Years",
    desc: "Veterinary assistant, animal husbandry, and livestock care training programs.",
  },
  {
    slug: "commerce",
    name: "Commerce",
    icon: "mba",
    duration: "B.Com — 3 Years",
    desc: "Accounting, taxation, finance, and business commerce fundamentals.",
  },
  {
    slug: "management",
    name: "Management Studies",
    icon: "mba",
    duration: "MBA / BBA — 2–3 Years",
    desc: "Business administration, leadership, finance, marketing, and entrepreneurship.",
  },
  {
    slug: "applied-sciences-and-humanities",
    name: "Applied Sciences and Humanities",
    icon: "science",
    duration: "B.Sc. / M.A. — 2–3 Years",
    desc: "Sciences, languages, and foundational arts programs.",
  },
];

export function getDepartment(slug: string) {
  return departments.find((d) => d.slug === slug);
}

export const stats = [
  { value: "25+", label: "Years of Academic Excellence" },
  { value: "5000+", label: "Students Enrolled" },
  { value: "150+", label: "Expert Faculty Members" },
  { value: "95%", label: "Placement Success Rate" },
];

export const whyChoose = [
  {
    title: "Exceptional Placement Record",
    desc: "Hospital internships, dental clinics, pharmacies, and diagnostic partners — healthcare placements for BDS, pharmacy, and paramedical graduates.",
    icon: "placement" as const,
  },
  {
    title: "State-of-the-Art Infrastructure",
    desc: "Modern labs, digital library, smart classrooms, and cutting-edge facilities for holistic learning and research.",
    icon: "infrastructure" as const,
  },
  {
    title: "Distinguished Faculty",
    desc: "Experienced educators and industry veterans dedicated to mentoring students with personalized guidance.",
    icon: "teaching" as const,
  },
];

export const whyStudyHere = [
  {
    title: "Project-Based Learning",
    subtitle: "Real-world application from day one.",
    subtitleColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    icon: "lightbulb" as const,
    desc: "We believe learning extends beyond the classroom. From your very first semester, you will be immersed in hands-on projects that challenge you to apply theoretical knowledge to solve genuine, real-world problems. This practical approach builds portfolio-ready experience before you graduate.",
  },
  {
    title: "Industry-Aligned Curriculum",
    subtitle: "Stay ahead of the technological curve.",
    subtitleColor: "text-brand-green",
    iconBg: "bg-brand-green/10",
    iconColor: "text-brand-green",
    icon: "handshake" as const,
    desc: "Our syllabi are continuously refined and updated in direct consultation with leading industry experts and tech pioneers. We ensure that you are mastering the exact tools, languages, and methodologies that top-tier companies are actively seeking in the modern global landscape.",
  },
  {
    title: "Holistic Soft Skills Training",
    subtitle: "Communication is your superpower.",
    subtitleColor: "text-amber-600",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    icon: "chat" as const,
    desc: "Technical brilliance requires the voice to match it. Our dedicated training modules go far beyond engineering, focusing heavily on leadership, articulate communication, confident public speaking, and rigorous interview preparation to help you stand out in any boardroom.",
  },
];

export const campusHighlights = [
  { value: "25+", label: "Years of Service" },
  { value: "8+", label: "Academic Programmes" },
  { value: "4", label: "Healthcare Streams" },
  { value: "1998", label: "Established" },
];

export const testimonials = [
  {
    name: "Rahul Sharma",
    role: "BBA Graduate, 2024",
    quote: "GBCE gave me the skills and confidence to start my career in business. The faculty support was exceptional.",
  },
  {
    name: "Priya Verma",
    role: "B.Com. Graduate, 2023",
    quote: "The campus environment and practical learning approach helped me excel in my career from day one.",
  },
  {
    name: "Amit Patel",
    role: "BDS Graduate, 2024",
    quote: "From clinics to placements, every aspect of GBCE prepared me for professional practice. Proud to be an alumnus.",
  },
];

export const newsItems = [
  { date: "15 Jun 2026", title: "Annual Convocation 2026 Announced", tag: "Event", href: "/news-events" },
  { date: "10 Jun 2026", title: "Hospital Internship & Clinical Training Update", tag: "Training", href: "/news-events" },
  { date: "05 Jun 2026", title: "Admission Open for Session 2026-27", tag: "Admission", href: "/admissions" },
];

export type GalleryItem = {
  title: string;
  image: string;
  category: "Campus" | "Events" | "Sports" | "Classroom" | "Labs";
};

export const galleryItems: GalleryItem[] = [
  { title: "Campus Entrance", image: "/gallery/campus-entrance.png", category: "Campus" },
  { title: "Main Campus Building", image: "/gallery/campus-building.png", category: "Campus" },
  { title: "Campus Overview", image: "/gallery/campus-collage.png", category: "Campus" },
  { title: "College Main Gate", image: "/gallery/campus-gate.png", category: "Campus" },
  { title: "Campus Grounds", image: "/gallery/campus-view.png", category: "Campus" },
  { title: "Campus Lawn & Walkway", image: "/gallery/campus-overview.png", category: "Campus" },
  { title: "Central Library", image: "/gallery/library.jpg", category: "Campus" },
  { title: "Computer Lab", image: "/gallery/computer-lab.jpg", category: "Labs" },
  { title: "Sports Ground", image: "/gallery/sports-ground.jpg", category: "Sports" },
  { title: "Auditorium", image: "/gallery/auditorium.jpg", category: "Campus" },
  { title: "Smart Classroom", image: "/gallery/smart-classroom.jpg", category: "Classroom" },
  { title: "Annual Day 2025", image: "/gallery/annual-day.jpg", category: "Events" },
  { title: "Cricket Tournament", image: "/gallery/cricket.jpg", category: "Sports" },
  { title: "Science Exhibition", image: "/gallery/science-exhibition.jpg", category: "Events" },
  { title: "Basketball Court", image: "/gallery/basketball.jpg", category: "Sports" },
  { title: "Convocation 2025", image: "/gallery/convocation.jpg", category: "Events" },
  { title: "Football Ground", image: "/gallery/football.jpg", category: "Sports" },
];

export const galleryPreview: GalleryItem[] = [
  { title: "Main Academic Block", image: "/gallery/academic-block.png", category: "Campus" },
  { title: "Campus Entrance", image: "/gallery/campus-entrance.png", category: "Campus" },
  { title: "Campus Lawn", image: "/gallery/campus-lawn.png", category: "Campus" },
  { title: "College Approach", image: "/gallery/campus-approach.png", category: "Campus" },
  { title: "Campus Gate", image: "/gallery/campus-gate-wide.png", category: "Campus" },
];

export const aboutContent = {
  intro: {
    eyebrow: siteConfig.name,
    title: "Our College",
    paragraphs: [
      `${siteConfig.name} is committed to bringing quality education to students across urban and rural communities. Under ${siteConfig.trust}, we provide affordable programs, modern infrastructure, and skilled faculty that help every learner build a brighter future.`,
      "Our college is registered under the Societies Registration Act and works with government skill-development initiatives to offer industry-relevant training, ethical values, and lifelong learning opportunities for youth nationwide.",
    ],
    image: "/gallery/campus-approach.png",
    badge: "Our Campus",
  },
  mission: {
    title: "Our Mission",
    paragraphs: [
      `At ${siteConfig.trust}, our mission is to illuminate minds and empower hearts through education inspired by the teachings of Gautam Buddha. We are dedicated to nurturing holistic development, fostering ethical values, and cultivating a spirit of compassion and wisdom in our students.`,
      "Our aim is to create lifelong learners who embrace diversity, seek knowledge, and contribute positively to the betterment of society.",
    ],
    tagline: `Best Education For ${siteConfig.trust}`,
    image: "/courses/d-pharma.jpg",
    badge: "Our Mission",
  },
  vision: {
    title: "Our Vision",
    paragraphs: [
      `Our vision is to be a beacon of enlightenment, guiding individuals on a transformative journey of self-discovery and intellectual growth. We aspire to create an educational ecosystem that not only imparts knowledge but also instils a deep sense of responsibility towards society and the environment.`,
      "Through innovative teaching methodologies and a commitment to academic excellence, we envision a future where our graduates emerge as compassionate leaders, critical thinkers, and catalysts for positive change.",
    ],
    tagline: `Best Education For ${siteConfig.trust}`,
    image: "/courses/bba.jpg",
    badge: "Our Vision",
  },
};

export type FeaturedCourse = {
  code: string;
  slug: string;
  title: string;
  posterTitle: string;
  desc: string;
  icon: string;
  figure: string;
  posterBg: string;
  posterImage: string;
  href?: string;
};

export const featuredCourses: FeaturedCourse[] = [
  {
    code: "BDS",
    slug: "bds",
    title: "Bachelor of Dental Surgery",
    posterTitle: "Bachelor of Dental Surgery (BDS)",
    desc: "The Bachelor of Dental Surgery (BDS) is an undergraduate program that prepares students for a career in dentistry.",
    icon: "🦷",
    figure: "👨‍⚕️",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/bds.jpg",
  },
  {
    code: "D-Pharma",
    slug: "d-pharma",
    title: "Diploma in Pharmacy (D. Pharm.)",
    posterTitle: "Diploma in Pharmacy (D-Pharma)",
    desc: "The Diploma in Pharmacy (D-Pharma) is a foundational course that provides students with essential knowledge and skills in pharmaceutical sciences.",
    icon: "💊",
    figure: "👩‍⚕️",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/d-pharma.jpg",
  },
  {
    code: "Paramedical",
    slug: "paramedical",
    title: "Paramedical Courses",
    posterTitle: "Paramedical · X-Ray / Radiology",
    desc: "X-Ray / Radiology Technician, DMLT, OT Technician, ECG, Dialysis and other allied health diploma streams.",
    icon: "🏥",
    figure: "👨‍⚕️",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/d-pharma.jpg",
  },
  {
    code: "Veterinary",
    slug: "veterinary",
    title: "Veterinary Courses",
    posterTitle: "Veterinary Diploma Programs",
    desc: "Practical veterinary assistant and animal care programs for livestock and clinical support careers.",
    icon: "🐾",
    figure: "👩‍⚕️",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/bds.jpg",
  },
  {
    code: "B.Com",
    slug: "bcom",
    title: "Bachelor of Commerce",
    posterTitle: "Bachelor of Commerce (B.Com)",
    desc: "The B.Com program builds a strong foundation in accounting, finance, taxation, and business commerce.",
    icon: "📊",
    figure: "👨‍🎓",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/bba.jpg",
  },
  {
    code: "BBA",
    slug: "bba",
    title: "Bachelor of Business Administration",
    posterTitle: "Bachelor of Business Administration (BBA)",
    desc: "The BBA program provides a solid foundation in business management, finance, marketing, and organizational leadership.",
    icon: "📊",
    figure: "👨‍🎓",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/bba.jpg",
  },
  {
    code: "MBA",
    slug: "mba",
    title: "Master of Business Administration",
    posterTitle: "Master of Business Administration (MBA)",
    desc: "The MBA program develops leadership, strategic thinking, and management skills for careers in business and entrepreneurship.",
    icon: "🎓",
    figure: "👩‍🎓",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/mba.jpg",
  },
  {
    code: "M.A",
    slug: "ma",
    title: "Master of Arts",
    posterTitle: "Master of Arts (M.A)",
    desc: "The M.A. program offers advanced study in humanities and social sciences for academic and professional careers.",
    icon: "📚",
    figure: "👩‍🎓",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/mba.jpg",
  },
];

export type EligibilityCriterion = {
  icon: "document" | "medal" | "check";
  text: string;
};

export type AdmissionCourseTab = {
  id: string;
  label: string;
  criteria: EligibilityCriterion[];
};

export const admissionCourseTabs: AdmissionCourseTab[] = [
  {
    id: "bds",
    label: "BDS (5 Years)",
    criteria: [
      { icon: "document", text: "Passed 10+2 with Physics, Chemistry & Biology (PCB) from a recognized board." },
      { icon: "medal", text: "Minimum 50% aggregate marks in PCB (40% for reserved categories)." },
      { icon: "check", text: "Valid NEET-UG score as per current dental admission norms." },
    ],
  },
  {
    id: "d-pharma",
    label: "D-Pharma (2 Years)",
    criteria: [
      { icon: "document", text: "Passed 10+2 with Physics, Chemistry & Biology/Mathematics from a recognized board." },
      { icon: "medal", text: "Minimum 45% aggregate marks (40% for reserved categories)." },
      { icon: "check", text: "Merit-based selection or institute-level entrance test where applicable." },
    ],
  },
  {
    id: "paramedical",
    label: "Paramedical · X-Ray (1–2 Years)",
    criteria: [
      { icon: "document", text: "Passed 10th / 12th with Science (preferably PCB) from a recognized board." },
      { icon: "medal", text: "Minimum 40% aggregate marks (relaxation for reserved categories as per norms)." },
      { icon: "check", text: "X-Ray / Radiology, DMLT, OT Technician and other allied health streams — merit-based." },
    ],
  },
  {
    id: "veterinary",
    label: "Veterinary (1–2 Years)",
    criteria: [
      { icon: "document", text: "Passed 10th / 12th from a recognized board (Science preferred for advanced streams)." },
      { icon: "medal", text: "Minimum 40% aggregate marks (relaxation for reserved categories as per norms)." },
      { icon: "check", text: "Merit-based admission for Veterinary Assistant and animal husbandry programs." },
    ],
  },
  {
    id: "bcom",
    label: "B.Com (3 Years)",
    criteria: [
      { icon: "document", text: "Passed 10+2 in Commerce or any stream from a recognized board." },
      { icon: "medal", text: "Minimum 45% aggregate marks (40% for reserved categories)." },
      { icon: "check", text: "Merit-based admission as per institute norms." },
    ],
  },
  {
    id: "bba",
    label: "BBA (3 Years)",
    criteria: [
      { icon: "document", text: "Passed 10+2 in any stream from a recognized board." },
      { icon: "medal", text: "Minimum 45% aggregate marks (40% for reserved categories)." },
      { icon: "check", text: "Merit-based selection or personal interview where applicable." },
    ],
  },
  {
    id: "bsc",
    label: "B.Sc (3 Years)",
    criteria: [
      { icon: "document", text: "Passed 10+2 with Science stream (PCM/PCB) from a recognized board." },
      { icon: "medal", text: "Minimum 45% aggregate marks (40% for reserved categories)." },
      { icon: "check", text: "Merit-based admission as per chosen specialization." },
    ],
  },
  {
    id: "mba",
    label: "MBA (2 Years)",
    criteria: [
      { icon: "document", text: "Bachelor's degree in any discipline from a recognized university." },
      { icon: "medal", text: "Minimum 50% aggregate marks (45% for reserved categories)." },
      { icon: "check", text: "Valid CAT / MAT / CMAT score or institute-level entrance test." },
    ],
  },
  {
    id: "ma",
    label: "M.A (2 Years)",
    criteria: [
      { icon: "document", text: "Bachelor's degree in relevant discipline from a recognized university." },
      { icon: "medal", text: "Minimum 50% aggregate marks (45% for reserved categories)." },
      { icon: "check", text: "Merit-based selection or department entrance test where applicable." },
    ],
  },
];

export const admissionProcessSteps = [
  {
    step: "01",
    title: "Online Registration",
    desc: "Complete the official registration form with your personal and academic details.",
    icon: "form" as const,
  },
  {
    step: "02",
    title: "Counseling Session",
    desc: "Attend a one-on-one counseling session at campus or online with our admissions advisor.",
    icon: "counsel" as const,
  },
  {
    step: "03",
    title: "Document Verification",
    desc: "Submit mark sheets, entrance score card, ID proof, and passport photos for verification.",
    icon: "docs" as const,
  },
  {
    step: "04",
    title: "Fee Payment & Confirm",
    desc: "Complete fee payment online or at campus to secure your seat in the program.",
    icon: "payment" as const,
  },
];

export const admissionDocuments = [
  "10th & 12th Mark Sheets",
  "Transfer / Migration Certificate",
  "Character Certificate",
  "Aadhaar Card / ID Proof",
  "Passport Size Photographs (4)",
  "Category Certificate (if applicable)",
];
