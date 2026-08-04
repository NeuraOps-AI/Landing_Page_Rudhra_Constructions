export type SiteProject = {
  slug: string;
  name: string;
  category: string;
  location: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  progress: number;
  image: string;
  alt: string;
};

export const siteProjects: SiteProject[] = [
  {
    slug: "rudhra-heights",
    name: "Rudhra Heights",
    category: "Luxury Residences",
    location: "Hyderabad, Telangana",
    status: "Ongoing",
    progress: 65,
    image: "/images/project-gallery/park-avenue-arrival.jpg",
    alt: "Rudhra Heights residential tower under construction",
  },
  {
    slug: "rudhra-villas",
    name: "Rudhra Villas",
    category: "Premium Villas",
    location: "Kokapet, Hyderabad",
    status: "Ongoing",
    progress: 40,
    image: "/images/project-gallery/royal-village-villas.jpg",
    alt: "Contemporary Rudhra villa with warm architectural lighting",
  },
  {
    slug: "rudhra-greens",
    name: "Rudhra Greens",
    category: "Gated Community Apartments",
    location: "Tellapur, Hyderabad",
    status: "Ongoing",
    progress: 30,
    image: "/images/project-gallery/rudhra-estates.jpg",
    alt: "Rudhra Greens apartment community",
  },
  {
    slug: "rudhra-square",
    name: "Rudhra Square",
    category: "Commercial Spaces",
    location: "Financial District, Hyderabad",
    status: "Ongoing",
    progress: 55,
    image: "/images/project-gallery/hasthina-residences.jpg",
    alt: "Rudhra Square contemporary commercial development",
  },
  {
    slug: "royal-village",
    name: "Royal Village",
    category: "Premium Villas",
    location: "Pragathi Nagar, Hyderabad",
    status: "Completed",
    progress: 100,
    image: "/images/project-gallery/community-living.jpg",
    alt: "Completed Royal Village community",
  },
  {
    slug: "hasthina-residences",
    name: "Hasthina Residences",
    category: "Luxury Apartments",
    location: "Kollur, Hyderabad",
    status: "Upcoming",
    progress: 0,
    image: "/images/project-gallery/green-courts.jpg",
    alt: "Upcoming Hasthina Residences landscaped community",
  },
];

export const benefits = [
  {
    icon: "handshake",
    title: "Trusted Expertise",
    description: "25+ years of experience in architectural design and construction.",
  },
  {
    icon: "home",
    title: "End-to-End Solutions",
    description: "From concept to completion, we handle everything seamlessly.",
  },
  {
    icon: "award",
    title: "Quality Assured",
    description: "Committed to the highest standards in quality, safety, and sustainability.",
  },
  {
    icon: "people",
    title: "Client First",
    description: "Your vision is our priority. We build lasting relationships through trust and transparency.",
  },
] as const;

export const projectGallery = [
  { src: "/images/project-gallery/royal-village-villas.jpg", alt: "Rudhra Villas exterior" },
  { src: "/images/project-gallery/community-living.jpg", alt: "Rudhra Villas living room" },
  { src: "/images/project-gallery/green-courts.jpg", alt: "Rudhra Villas bedroom" },
  { src: "/images/project-gallery/rudhra-estates.jpg", alt: "Rudhra Villas pool and exterior" },
  { src: "/images/project-gallery/park-avenue-arrival.jpg", alt: "Rudhra Villas dining room" },
  { src: "/images/project-gallery/hasthina-residences.jpg", alt: "Rudhra Villas aerial view" },
];

export const amenities = [
  ["home", "Clubhouse"],
  ["pool", "Swimming Pool"],
  ["dumbbell", "Fully Equipped Gym"],
  ["leaf", "Landscaped Gardens"],
  ["home", "Children’s Play Area"],
  ["shield", "24/7 Security"],
  ["home", "Gated Community"],
  ["power", "Power Backup"],
  ["water", "Rainwater Harvesting"],
  ["home", "Smart Home Features"],
  ["car", "Ample Car Parking"],
  ["phone", "Intercom Facility"],
] as const;
