export type Role =
  | "Branding"
  | "Web Design"
  | "Development"
  | "Paid Ads"
  | "Social Media"
  | "Content";

export type WorkItem = {
  slug: string; // routes to /mysite/projects/[slug]
  title: string;
  client?: string;
  cover: {
    src: string; // e.g. /projects/project-1/cover.jpg (under /public)
    alt: string;
    width?: number;
    height?: number;
  };
  roles: readonly Role[];
  year?: number;
};

export const workItems: WorkItem[] = [
  {
    slug: "project-1",
    title: "Branding & App Development",
    client: "Jimbo",
    cover: { src: "/case-studies/project-1/asset-2.jpg", alt: "Jimbo Branding & App Design" },
    roles: ["Development", "Branding"],
    year: 2024,
  },
  {
    slug: "project-2",
    title: "Branding & App Development",
    client: "Zefa",
    cover: { src: "/case-studies/project-z/asset-1.jpg", alt: "Upwork Cookbook cover" },
    roles: ["Development"],
    year: 2024,
  },
  {
    slug: "project-3",
    title: "Branding & Web Design & Pitch Deck",
    client: "Archi AI",
    cover: { src: "/case-studies/project-aai/asset-1.jpg", alt: "RLF cover" },
    roles: ["Web Design", "Development"],
    year: 2023,
  },
  {
    slug: "project-4",
    title: "Web Redesign",
    client: "Gourmet Hunters",
    cover: { src: "/case-studies/project-gh/asset-1.jpg", alt: "Harpie cover" },
    roles: ["Branding", "Web Design", "Content"],
    year: 2023,
  },
  {
    slug: "project-5",
    title: "Concept Branding",
    client: "IceDream",
    cover: { src: "/case-studies/project-2/asset-5.jpg", alt: "Nauwork cover" },
    roles: ["Web Design", "Content", "Development"],
    year: 2022,
  },
  {
    slug: "project-6",
    title: "Branding & Web Design",
    client: "MindHappy",
    cover: { src: "/case-studies/project-mh/asset-1.jpg", alt: "FJC cover" },
    roles: ["Branding", "Web Design", "Development"],
    year: 2022,
  },
  {
    slug: "project-7",
    title: "Digital Design",
    client: "Criteo",
    cover: { src: "/case-studies/criteo/asset-1.jpg", alt: "Formula 1 cover" },
    roles: ["Web Design", "Content", "Development"],
    year: 2022,
  },
  {
    slug: "project-8",
    title: "Limited Edition Clothing Line",
    client: "AFP Milano.",
    cover: { src: "/case-studies/project-afp/asset-1.jpg", alt: "Digital Horizons cover" },
    roles: ["Branding", "Content"],
    year: 2021,
  },
  {
    slug: "project-9",
    title: "Motion & Web Design",
    client: "Bouygues Construction",
    cover: { src: "/case-studies/bouygues/asset-1.jpg", alt: "NextGen cover" },
    roles: ["Web Design", "Development"],
    year: 2021,
  },
  {
    slug: "project-10",
    title: "Web Redesign",
    client: "CoWorkUp",
    cover: { src: "/projects/project-10/cover.jpg", alt: "Health campaign cover" },
    roles: ["Branding", "Paid Ads", "Social Media"],
    year: 2020,
  },
    {
    slug: "project-11",
    title: "Concept Branding",
    client: "F*ckoffee",
    cover: { src: "/case-studies/project-fc/asset-1.jpg", alt: "Health campaign cover" },
    roles: ["Branding", "Paid Ads", "Social Media"],
    year: 2020,
  },
];
