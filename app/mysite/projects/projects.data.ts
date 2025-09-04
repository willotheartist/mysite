// app/mysite/projects/projects.data.ts

export type ProjectMedia =
  | { kind: "image"; src: string; alt?: string; width?: number; height?: number }
  | { kind: "video"; src: string; poster?: string; caption?: string }
  | { kind: "embed"; html: string; caption?: string };

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  year?: string | number;
  role?: string;
  client?: string;
  summary?: string;
  credits?: Array<{ label: string; value: string }>;
  media: ProjectMedia[];
  /** NEW: tags / labels (roles, tasks, software, etc.) */
  tags?: string[];
};

export const projects: Project[] = [
  {
    slug: "project-1",
    title: "Jimbo: Get Social · Get Active",
    subtitle: "Branding & UI/UX",
    year: "2024",
    role: "Creative Lead & Designer",
    client: "Jimbo Connect Ltd.",
    summary: "I founded and built Jimbo, a sports-social platform from the ground up. I created the entire brand identity, including the logo, visual language, and overall look and feel. I designed and developed the website, the app’s UI and UX, and produced all creative assets—from social media content and posters to merchandise and event materials. Through Jimbo, I not only grew as a designer but also expanded into development. The project sparked my journey into coding, and I now actively practice and build in Flutter every week to further develop the product and my technical skills.",
    credits: [{ label: "Stack", value: "Next.js, Tailwind, Framer Motion" }],
    tags: [
      "branding",
      "web design",
      "wordpress",
      "css",
      "elementor",
      "reactjs",
      "flutter",
      "illustrator",
      "adobe",
    ],
    media: [
  { kind: "image", src: "/case-studies/project-1/asset-1.jpg", alt: "Asset 1" },
  { kind: "image", src: "/case-studies/project-1/asset-2.jpg", alt: "Asset 2" },
  { kind: "image", src: "/case-studies/project-1/asset-3.jpg", alt: "Asset 3" },
  { kind: "image", src: "/case-studies/project-1/asset-4.jpg", alt: "Asset 4" },
  { kind: "image", src: "/case-studies/project-1/asset-5.jpg", alt: "Asset 5" },
  { kind: "image", src: "/case-studies/project-1/asset-6.jpg", alt: "Asset 6" },
  { kind: "image", src: "/case-studies/project-1/asset-7.jpg", alt: "Asset 7" },
  { kind: "image", src: "/case-studies/project-1/asset-8.jpg", alt: "Asset 8" },
  { kind: "image", src: "/case-studies/project-1/asset-9.jpg", alt: "Asset 9" },
  { kind: "image", src: "/case-studies/project-1/asset-10.jpg", alt: "Asset 10" },
  { kind: "image", src: "/case-studies/project-1/asset-11.jpg", alt: "Asset 11" },
  { kind: "image", src: "/case-studies/project-1/asset-12.jpg", alt: "Asset 12" },
  { kind: "image", src: "/case-studies/project-1/asset-13.jpg", alt: "Asset 13" },
  { kind: "image", src: "/case-studies/project-1/asset-14.jpg", alt: "Asset 14" },
],

  },
];

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function findProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
