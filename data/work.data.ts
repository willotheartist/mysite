// data/work.data.ts
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
    cover: { src: "/projects/project-1/cover.jpg", alt: "Upwork Presents cover" },
    roles: ["Development", "Branding", ],
    year: 2024,
  },
  {
    slug: "project-2",
    title: "Upwork Cookbook",
    client: "Upwork",
    cover: { src: "/projects/project-2/cover.jpg", alt: "Upwork Cookbook cover" },
    roles: ["Development"],
    year: 2024,
  },
  {
    slug: "project-3",
    title: "Reimagining Architecture Firm for the Web",
    client: "RLF Architects",
    cover: { src: "/projects/project-3/cover.jpg", alt: "RLF cover" },
    roles: ["Web Design", "Development"],
    year: 2023,
  },
  {
    slug: "project-4",
    title: "A New Look for Web3 Safety",
    client: "Harpie",
    cover: { src: "/projects/project-4/cover.jpg", alt: "Harpie cover" },
    roles: ["Branding", "Web Design", "Content"],
    year: 2023,
  },
  {
    slug: "project-5",
    title: "Connecting Talent through Design",
    client: "Nauwork",
    cover: { src: "/projects/project-5/cover.jpg", alt: "Nauwork cover" },
    roles: ["Web Design", "Content", "Development"],
    year: 2022,
  },
  {
    slug: "project-6",
    title: "Capital Feels Different Here",
    client: "Fisher James Capital",
    cover: { src: "/projects/project-6/cover.jpg", alt: "FJC cover" },
    roles: ["Branding", "Web Design", "Development"],
    year: 2022,
  },
  {
    slug: "project-7",
    title: "Formula 1 Las Vegas",
    client: "Formula 1",
    cover: { src: "/projects/project-7/cover.jpg", alt: "Formula 1 cover" },
    roles: ["Web Design", "Content", "Development"],
    year: 2022,
  },
  {
    slug: "project-8",
    title: "Digital Horizons Conference",
    client: "Horizons Inc.",
    cover: { src: "/projects/project-8/cover.jpg", alt: "Digital Horizons cover" },
    roles: ["Branding", "Content"],
    year: 2021,
  },
  {
    slug: "project-9",
    title: "NextGen Startup Portal",
    client: "NextGen Labs",
    cover: { src: "/projects/project-9/cover.jpg", alt: "NextGen cover" },
    roles: ["Web Design", "Development"],
    year: 2021,
  },
  {
    slug: "project-10",
    title: "Global Health Campaign",
    client: "HealthOrg",
    cover: { src: "/projects/project-10/cover.jpg", alt: "Health campaign cover" },
    roles: ["Branding", "Paid Ads", "Social Media"],
    year: 2020,
  },
];
