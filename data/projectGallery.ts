export type ProjectGalleryImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  kicker: string;
  title: string;
  location: string;
  description: string;
};

// Kept separate from the gallery UI so this can be replaced by CMS/API data later.
export const projectGalleryImages: ProjectGalleryImage[] = [
  {
    id: "royal-village-villas",
    src: "/images/project-gallery/royal-village-villas.jpg",
    alt: "Contemporary Rudhra villas along a landscaped residential street",
    width: 1920,
    height: 1080,
    kicker: "The next dimension of royal life",
    title: "Royal Village",
    location: "Pragathi Nagar, Hyderabad",
    description: "An established address that reflects Rudhra’s early promise of thoughtful family living.",
  },
  {
    id: "rudhra-estates",
    src: "/images/project-gallery/rudhra-estates.jpg",
    alt: "Aerial view of the Rudhra Estates residential development",
    width: 1920,
    height: 1080,
    kicker: "Master-planned for modern living",
    title: "Rudhra Estates",
    location: "Hyderabad",
    description: "A thoughtfully planned residential community shaped around comfort, connectivity and enduring value.",
  },
  {
    id: "park-avenue-arrival",
    src: "/images/project-gallery/park-avenue-arrival.jpg",
    alt: "Landscaped entrance to the Park Avenue community",
    width: 1920,
    height: 1080,
    kicker: "A distinctive sense of arrival",
    title: "Park Avenue",
    location: "Hyderabad",
    description: "A welcoming address where refined architecture and carefully considered landscapes come together.",
  },
  {
    id: "green-courts",
    src: "/images/project-gallery/green-courts.jpg",
    alt: "Rudhra community garden with shaded seating and lush landscaping",
    width: 1920,
    height: 1080,
    kicker: "Landscapes that bring people together",
    title: "Green Courts",
    location: "Hyderabad",
    description: "Calm garden spaces create a greener setting for everyday connection, recreation and wellbeing.",
  },
  {
    id: "community-living",
    src: "/images/project-gallery/community-living.jpg",
    alt: "Children's play area within a landscaped Rudhra community",
    width: 1920,
    height: 1080,
    kicker: "Designed around everyday joy",
    title: "Community Living",
    location: "Hyderabad",
    description: "Family-friendly shared spaces encourage active days, meaningful moments and a stronger community.",
  },
  {
    id: "hasthina-residences",
    src: "/images/project-gallery/hasthina-residences.jpg",
    alt: "Aerial architectural view of Hasthina residences",
    width: 1920,
    height: 1080,
    kicker: "Contemporary homes. Lasting value.",
    title: "Hasthina Residences",
    location: "Hyderabad",
    description: "A contemporary residential address balancing elegant design, practical planning and generous open space.",
  },
];
