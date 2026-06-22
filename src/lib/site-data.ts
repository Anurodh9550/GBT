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
    slug: "computer-science-and-engineering",
    name: "Computer Science and Engineering",
    icon: "computer",
    duration: "B.Tech — 4 Years",
    desc: "Software development, algorithms, data structures, and full-stack engineering.",
  },
  {
    slug: "electronics-and-communication",
    name: "Electronics and Communication",
    icon: "electronics",
    duration: "B.Tech — 4 Years",
    desc: "Embedded systems, VLSI, communication networks, and signal processing.",
  },
  {
    slug: "electrical-and-electronics",
    name: "Electrical and Electronics",
    icon: "electrical",
    duration: "B.Tech — 4 Years",
    desc: "Power systems, control engineering, electrical machines, and energy systems.",
  },
  {
    slug: "applied-sciences-and-humanities",
    name: "Applied Sciences and Humanities",
    icon: "science",
    duration: "B.Sc. / B.A. — 3 Years",
    desc: "Physics, chemistry, mathematics, languages, and foundational sciences.",
  },
  {
    slug: "information-technology",
    name: "Information Technology",
    icon: "it",
    duration: "B.Tech — 4 Years",
    desc: "Cloud computing, cybersecurity, networking, and enterprise IT solutions.",
  },
  {
    slug: "artificial-intelligence-machine-learning",
    name: "Artificial Intelligence / Machine Learning",
    icon: "ai",
    duration: "B.Tech — 4 Years",
    desc: "Deep learning, NLP, computer vision, and intelligent systems development.",
  },
  {
    slug: "mechanical-engineering",
    name: "Mechanical Engineering",
    icon: "mechanical",
    duration: "B.Tech — 4 Years",
    desc: "Thermodynamics, manufacturing, CAD/CAM, and machine design.",
  },
  {
    slug: "automobile-engineering",
    name: "Automobile Engineering",
    icon: "automobile",
    duration: "B.Tech — 4 Years",
    desc: "Vehicle dynamics, automotive design, engines, and modern mobility systems.",
  },
  {
    slug: "mba",
    name: "MBA",
    icon: "mba",
    duration: "MBA — 2 Years",
    desc: "Business administration, leadership, finance, marketing, and entrepreneurship.",
  },
  {
    slug: "civil-engineering",
    name: "Civil Engineering",
    icon: "civil",
    duration: "B.Tech — 4 Years",
    desc: "Structural design, construction management, surveying, and infrastructure planning.",
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
    desc: "Strong industry partnerships with leading companies, driving excellent placement outcomes and career opportunities for every graduate.",
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
  { value: "50+", label: "Modern Classrooms" },
  { value: "10+", label: "Specialized Labs" },
  { value: "5000+", label: "Library Books" },
  { value: "100+", label: "Industry Partners" },
];

export const testimonials = [
  {
    name: "Rahul Sharma",
    role: "BCA Graduate, 2024",
    quote: "GBT College gave me the skills and confidence to land my dream job in IT. The faculty support was exceptional.",
  },
  {
    name: "Priya Verma",
    role: "B.Com. Graduate, 2023",
    quote: "The campus environment and practical learning approach helped me excel in my career from day one.",
  },
  {
    name: "Amit Patel",
    role: "B.Sc. CS Graduate, 2024",
    quote: "From labs to placements, every aspect of GBT prepared me for the real world. Proud to be an alumnus.",
  },
];

export const newsItems = [
  { date: "15 Jun 2026", title: "Annual Convocation 2026 Announced", tag: "Event", href: "/news-events" },
  { date: "10 Jun 2026", title: "Campus Placement Drive – Top Recruiters", tag: "Placement", href: "/news-events" },
  { date: "05 Jun 2026", title: "Admission Open for Session 2026-27", tag: "Admission", href: "/admissions" },
];

export type GalleryItem = {
  title: string;
  image: string;
  category: "Campus" | "Events" | "Sports" | "Classroom" | "Labs";
};

export const galleryItems: GalleryItem[] = [
  { title: "Main Campus", image: "/gallery/main-campus.jpg", category: "Campus" },
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

export const galleryPreview = galleryItems.slice(0, 6);

export const aboutContent = {
  intro: {
    eyebrow: "About Us",
    title: "Our University",
    paragraphs: [
      `${siteConfig.trust} is committed to bringing quality education to students across urban and rural communities. Through ${siteConfig.name}, we provide affordable programs, modern infrastructure, and skilled faculty that help every learner build a brighter future.`,
      "Our trust is registered under the Societies Registration Act and works with government skill-development initiatives to offer industry-relevant training, ethical values, and lifelong learning opportunities for youth nationwide.",
    ],
    image: "/about/knowledge-power.jpg",
    badge: "About GBT",
  },
  mission: {
    title: "Our Mission",
    paragraphs: [
      `At ${siteConfig.trust}, our mission is to illuminate minds and empower hearts through education inspired by the teachings of Gautam Buddha. We are dedicated to nurturing holistic development, fostering ethical values, and cultivating a spirit of compassion and wisdom in our students.`,
      "Our aim is to create lifelong learners who embrace diversity, seek knowledge, and contribute positively to the betterment of society.",
    ],
    tagline: `Best Education For ${siteConfig.trust}`,
    image: "/about/mission.jpg",
    badge: "About GBET",
  },
  vision: {
    title: "Our Vision",
    paragraphs: [
      `Our vision is to be a beacon of enlightenment, guiding individuals on a transformative journey of self-discovery and intellectual growth. We aspire to create an educational ecosystem that not only imparts knowledge but also instils a deep sense of responsibility towards society and the environment.`,
      "Through innovative teaching methodologies and a commitment to academic excellence, we envision a future where our graduates emerge as compassionate leaders, critical thinkers, and catalysts for positive change.",
    ],
    tagline: `Best Education For ${siteConfig.trust}`,
    image: "/about/vision.jpg",
    badge: "About GBET",
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
    code: "B.Tech",
    slug: "btech",
    title: "Bachelor of Technology",
    posterTitle: "Bachelor of Technology (B.Tech)",
    desc: "The Bachelor of Technology (B.Tech) is an undergraduate engineering program offering a comprehensive understanding of various engineering disciplines.",
    icon: "⚙️",
    figure: "👩‍🎓",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/btech.jpg",
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
    code: "BCA",
    slug: "bca",
    title: "Bachelor of Computer Applications",
    posterTitle: "Bachelor of Computer Applications (BCA)",
    desc: "The Bachelor of Computer Applications (BCA) program builds strong foundations in programming, software development, and IT systems.",
    icon: "💻",
    figure: "👩‍💻",
    posterBg: "from-cyan-100 via-sky-100 to-cyan-50",
    posterImage: "/courses/bca.jpg",
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
    id: "btech",
    label: "B.Tech (4 Years)",
    criteria: [
      { icon: "document", text: "Passed 10+2 with Physics, Chemistry & Mathematics (PCM) from a recognized board." },
      { icon: "medal", text: "Minimum 45% aggregate marks in PCM (40% for reserved categories)." },
      { icon: "check", text: "Valid JEE Main score or State Level Engineering Entrance Exam." },
    ],
  },
  {
    id: "bca",
    label: "BCA (3 Years)",
    criteria: [
      { icon: "document", text: "Passed 10+2 in any stream from a recognized board with Mathematics as a subject." },
      { icon: "medal", text: "Minimum 45% aggregate marks (40% for reserved categories)." },
      { icon: "check", text: "Merit-based selection or institute entrance test where applicable." },
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
