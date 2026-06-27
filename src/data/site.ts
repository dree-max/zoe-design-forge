export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export interface ProjectImage {
  src: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  description: string;
  images: ProjectImage[];
  team?: string;
  timeline?: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  process: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  qualifications: string[];
  image?: string;
  bio: string;
}

export const brand = {
  name: "ZOE DESIGN FORGE",
  tagline: "Architectural & Interior Consultants",
  slogan: "Design. Build. Inspire.",
  subtitle: "Crafting exceptional spaces that combine creativity, functionality, and lasting impact.",
  mission: "We don't just design buildings; we curate lifestyles.",
  email: "info@zoeforge.com",
  phone: "+256 700 000 000",
  address: "Nansana Heights, Kampala, Uganda",
  whatsapp: "+256700000000",
  social: {
    instagram: "https://instagram.com/zoedesignsforge",
    facebook: "https://facebook.com/zoedesignsforge",
    linkedin: "https://linkedin.com/company/zoe-designs-forge",
  },
};

export const services: Service[] = [
  {
    id: "architectural-design",
    icon: "bi-bricks",
    title: "Architectural Design",
    description: "From concept to completion, we craft buildings that inspire. Our designs blend contemporary aesthetics with functional excellence, tailored to East Africa's unique climate and culture.",
    process: [
      "Client consultation & site analysis",
      "Concept design & schematic drawings",
      "Detailed architectural drawings & 3D visualization",
      "Permitting & regulatory approvals",
      "Construction documentation & supervision",
    ],
  },
  {
    id: "interior-design",
    icon: "bi-house-heart",
    title: "Interior Design",
    description: "Transform spaces into experiences. We create interiors that reflect your personality while optimizing comfort, flow, and functionality.",
    process: [
      "Space planning & mood board creation",
      "Material & finish selection",
      "Furniture design & specification",
      "Lighting design & installation oversight",
      "Styling & final reveal",
    ],
  },
  {
    id: "master-planning",
    icon: "bi-vector-pen",
    title: "Master Planning",
    description: "Strategic vision for large-scale developments. We design comprehensive master plans that balance growth, sustainability, and community needs.",
    process: [
      "Site analysis & feasibility studies",
      "Land-use planning & zoning",
      "Infrastructure & utility planning",
      "Phased development strategy",
      "Environmental impact assessment",
    ],
  },
  {
    id: "landscape-design",
    icon: "bi-flower1",
    title: "Landscape Design",
    description: "Bringing the outdoors to life. Our landscape designs create harmonious environments that connect people with nature.",
    process: [
      "Site assessment & soil analysis",
      "Concept landscape master plan",
      "Planting design & irrigation planning",
      "Hardscape & outdoor structure design",
      "Installation supervision",
    ],
  },
  {
    id: "custom-furniture",
    icon: "bi-chair",
    title: "Custom Furniture",
    description: "Bespoke pieces that define your space. We design and fabricate unique furniture that complements your architectural vision.",
    process: [
      "Design consultation & concept development",
      "Material selection & prototyping",
      "Custom fabrication",
      "Quality control & finishing",
      "Delivery & installation",
    ],
  },
  {
    id: "project-management",
    icon: "bi-ruler-combined",
    title: "Project Management",
    description: "From groundbreaking to handover, we ensure your project is delivered on time, within budget, and to the highest standards.",
    process: [
      "Project planning & scheduling",
      "Contractor procurement & management",
      "Quality control & site supervision",
      "Budget tracking & cost control",
      "Handover & post-occupancy evaluation",
    ],
  },
];

export const team: TeamMember[] = [
  {
    name: "Eng. John Muwonge",
    role: "Principal Engineer & Managing Director",
    qualifications: ["BSc. Civil Engineering (Mak)", "MIE (U)", "Registered Engineer (ERB)"],
    bio: "Over 15 years of experience leading complex engineering and architectural projects across Uganda. Passionate about sustainable design and construction innovation.",
  },
  {
    name: "Sarah Nantongo",
    role: "Lead Architect",
    qualifications: ["BArch (Mak)", "MSc. Sustainable Architecture (UCL)", "AAU Member"],
    bio: "Award-winning architect with a focus on contemporary African design. Sarah brings global perspective to local projects, blending tradition with modernity.",
  },
  {
    name: "David Okello",
    role: "Interior Design Director",
    qualifications: ["BA Interior Design (Kyambogo)", "NCIDQ Certified"],
    bio: "David transforms spaces into stunning experiences. His portfolio spans luxury residences, hotels, and corporate offices across East Africa.",
  },
];

export const projects: Project[] = [
  {
    id: "kmt-plaza-nansana",
    title: "KMT Plaza Nansana",
    category: "Commercial",
    location: "Nansana, Uganda",
    year: "2025",
    scope: "Architectural Design, Interior Design, Project Management",
    description:
      "A multi-storey mixed-use commercial development featuring premium retail spaces, modern glass facades, and landmark branding. Designed for high visibility along Nansana's growing commercial corridor.",
    images: [
      { src: "/images/projects/kmt-plaza-nansana-day.png", label: "KMT Plaza Nansana — Day View" },
      { src: "/images/projects/kmt-plaza-nansana-night.png", label: "KMT Plaza Nansana — Night View" },
    ],
  },
  {
    id: "kyankwazi-country-home",
    title: "Kyankwazi Country Home",
    category: "Residential",
    location: "Kyankwazi, Uganda",
    year: "2024",
    scope: "Architectural Design, Interior Design, Landscape Design",
    description:
      "An elegant country residence with classical arched balconies, a gated entrance, and expansive landscaped grounds. The design balances formal architecture with comfortable family living.",
    images: [
      { src: "/images/projects/kyankwazi-country-home-day.png", label: "Kyankwazi Country Home — Day View" },
      { src: "/images/projects/kyankwazi-country-home-dusk.png", label: "Kyankwazi Country Home — Dusk View" },
      { src: "/images/projects/kyankwazi-country-home-aerial.png", label: "Kyankwazi Country Home — Aerial View" },
    ],
  },
  {
    id: "residential-wakiso-buyera",
    title: "Residential Wakiso Buyera",
    category: "Residential",
    location: "Buyera, Wakiso",
    year: "2024",
    scope: "Architectural Design, Landscape Design",
    description:
      "A contemporary multi-level residence built into terraced stone landscaping, with warm brick and stone finishes, outdoor lighting, and integrated parking — designed for hillside terrain.",
    images: [
      { src: "/images/projects/residential-wakiso-buyera.png", label: "Residential Wakiso Buyera — Exterior View" },
    ],
  },
  {
    id: "apartments-garuga-entebbe",
    title: "Apartments Garuga Entebbe",
    category: "Residential",
    location: "Garuga, Entebbe",
    year: "2025",
    scope: "Architectural Design, Interior Design",
    description:
      "A modern multi-unit apartment block with glass balconies, decorative screening, and premium exterior lighting. Designed for comfortable urban living near Entebbe.",
    images: [
      { src: "/images/projects/apartments-garuga-entebbe-day.png", label: "Apartments Garuga Entebbe — Day View" },
      { src: "/images/projects/apartments-garuga-entebbe-night.png", label: "Apartments Garuga Entebbe — Night View" },
    ],
  },
  {
    id: "residential-entebbe-akright",
    title: "Residential Entebbe Akright",
    category: "Residential",
    location: "Akright, Entebbe",
    year: "2024",
    scope: "Architectural Design, Interior Design, Landscape Design",
    description:
      "A luxury two-storey residence with terracotta roofing, stone accents, columned porticos, and manicured gardens — crafted for upscale living in the Akright estate.",
    images: [
      { src: "/images/projects/residential-entebbe-akright-day.png", label: "Residential Entebbe Akright — Day View" },
      { src: "/images/projects/residential-entebbe-akright-dusk.png", label: "Residential Entebbe Akright — Dusk View" },
    ],
  },
  {
    id: "wakiso-gardens",
    title: "Wakiso Gardens",
    category: "Residential",
    location: "Wakiso, Uganda",
    year: "2023",
    scope: "Landscape Design, Master Planning",
    description:
      "A landscaped garden and fountain feature with tiered stonework, colourful planting beds, and paved walkways — creating a welcoming outdoor environment for a residential community.",
    images: [
      { src: "/images/projects/wakiso-gardens.png", label: "Wakiso Gardens — Landscape View" },
    ],
  },
];