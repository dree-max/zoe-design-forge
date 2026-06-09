export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  scope: string;
  description: string;
  images: string[];
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
    id: "kmt-plaza",
    title: "KMT Plaza",
    category: "Commercial",
    location: "Kampala, Uganda",
    year: "2025",
    scope: "Architectural Design, Interior Design, Project Management",
    description: "A 12-storey mixed-use commercial tower featuring premium office spaces, retail outlets, and a rooftop restaurant. The design emphasizes natural ventilation, daylight optimization, and a striking facade that has become a landmark on Kampala's skyline.",
    images: ["/images/projects/kmt-plaza-1.jpg", "/images/projects/kmt-plaza-2.jpg"],
  },
  {
    id: "otra-vida-hotel",
    title: "Otra Vida Hotel",
    category: "Hospitality",
    location: "Entebbe, Uganda",
    year: "2024",
    scope: "Full Architectural Design, Interior Design, Landscape Design",
    description: "A boutique lakeside hotel with 24 rooms, a spa, infinity pool, and waterfront dining. Every detail was crafted to create a seamless indoor-outdoor experience, taking full advantage of the Lake Victoria vista.",
    images: ["/images/projects/otra-vida-1.jpg", "/images/projects/otra-vida-2.jpg"],
  },
  {
    id: "grace-residence",
    title: "Grace Luxury Residence",
    category: "Residential",
    location: "Kololo, Kampala",
    year: "2025",
    scope: "Architectural Design, Interior Design, Custom Furniture",
    description: "A 6-bedroom luxury home featuring an open-plan layout, private courtyard pool, and a rooftop terrace. The design seamlessly integrates modern aesthetics with local materials and craftsmanship.",
    images: ["/images/projects/grace-res-1.jpg", "/images/projects/grace-res-2.jpg"],
  },
  {
    id: "bugolobi-offices",
    title: "Bugolobi Business Centre",
    category: "Commercial",
    location: "Bugolobi, Kampala",
    year: "2024",
    scope: "Architectural Design, Project Management",
    description: "Grade-A office space designed for the modern professional. Features include flexible floor plates, green building principles, and integrated smart building technology.",
    images: ["/images/projects/bugolobi-1.jpg", "/images/projects/bugolobi-2.jpg"],
  },
  {
    id: "munyonyo-villa",
    title: "Munyonyo Lake View Villa",
    category: "Residential",
    location: "Munyonyo, Kampala",
    year: "2023",
    scope: "Full Architectural Design, Interior Design, Landscape Design",
    description: "A Mediterranean-inspired lakeside villa with 5 bedrooms, private beach access, and panoramic views of Lake Victoria. The design emphasizes indoor-outdoor living and natural stone finishes.",
    images: ["/images/projects/munyonyo-1.jpg", "/images/projects/munyonyo-2.jpg"],
  },
  {
    id: "nakasero-penthouse",
    title: "Nakasero Penthouse",
    category: "Residential",
    location: "Nakasero, Kampala",
    year: "2024",
    scope: "Interior Design, Custom Furniture",
    description: "A top-floor penthouse transformation featuring custom millwork, curated art pieces, and a breathtaking city-view terrace. Every piece of furniture was custom-designed for the space.",
    images: ["/images/projects/nakasero-1.jpg", "/images/projects/nakasero-2.jpg"],
  },
  {
    id: "jinja-resort",
    title: "Jinja Eco-Lodge Resort",
    category: "Hospitality",
    location: "Jinja, Uganda",
    year: "2023",
    scope: "Architectural Design, Master Planning, Landscape Design",
    description: "An eco-luxury resort on the banks of the Nile. 16 sustainably-built villas with thatched roofs, solar power, and rainwater harvesting. The master plan preserves 80% of the natural landscape.",
    images: ["/images/projects/jinja-1.jpg", "/images/projects/jinja-2.jpg"],
  },
  {
    id: "acacia-mall",
    title: "Acacia Mall Extension",
    category: "Commercial",
    location: "Kampala, Uganda",
    year: "2023",
    scope: "Architectural Design, Project Management",
    description: "A 5-storey retail and entertainment extension to one of Kampala's premier shopping destinations. Features a food court, cinema complex, and rooftop event space.",
    images: ["/images/projects/acacia-1.jpg", "/images/projects/acacia-2.jpg"],
  },
  {
    id: "kigo-estate",
    title: "Kigo Executive Estate",
    category: "Residential",
    location: "Kigo, Kampala",
    year: "2025",
    scope: "Master Planning, Architectural Design",
    description: "A 20-acre gated community featuring 40 executive homes, community clubhouse, swimming pool, and landscaped gardens. Each home is individually designed while maintaining cohesive estate aesthetics.",
    images: ["/images/projects/kigo-1.jpg", "/images/projects/kigo-2.jpg"],
  },
  {
    id: "garden-city-furniture",
    title: "Garden City Restaurant Collection",
    category: "Furniture",
    location: "Kampala, Uganda",
    year: "2024",
    scope: "Custom Furniture Design & Fabrication",
    description: "A complete furniture collection for a multi-restaurant food court. Over 200 custom pieces including dining tables, lounge seating, bar counters, and decorative screens — each designed for its specific venue.",
    images: ["/images/projects/garden-city-1.jpg", "/images/projects/garden-city-2.jpg"],
  },
];