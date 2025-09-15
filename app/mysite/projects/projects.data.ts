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
    summary:
      "I founded and built Jimbo, a sports-social platform from the ground up. I created the entire brand identity, including the logo, visual language, and overall look and feel. I designed and developed the website, the app’s UI and UX, and produced all creative assets—from social media content and posters to merchandise and event materials. Through Jimbo, I not only grew as a designer but also expanded into development. The project sparked my journey into coding, and I now actively practice and build in Flutter every week to further develop the product and my technical skills.",
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
  {
    slug: "project-2",
    title: "Zefa: Social City Guide",
    subtitle: "Social City Guide App Design",
    year: "2023",
    role: "Lead Designer",
    client: "Zefa",
    summary:
      "A social city guide app where I shaped the brand identity, designed the app’s UI/UX, and created the marketing site, ensuring a smooth and calming digital experience.",
    credits: [{ label: "Stack", value: "Next.js, Tailwind, Figma" }],
    tags: ["branding", "ui/ux", "mobile app", "website design"],
    media: [{ kind: "image", src: "/case-studies/project-z/asset-1.jpg", alt: "Zefa Asset 1" },
      { kind: "image", src: "/case-studies/project-z/asset-2.jpg", alt: "Zefa Asset 1" },
      { kind: "image", src: "/case-studies/project-z/asset-3.jpg", alt: "Zefa Asset 1" },
      { kind: "image", src: "/case-studies/project-z/asset-4.jpg", alt: "Zefa Asset 1" },
      
    ],
  },
  {
    slug: "project-3",
    title: "Archi AI: Smart Design Tool",
    subtitle: "AI Product & Interface Design",
    year: "2023",
    role: "Product Designer",
    client: "Archi AI",
    summary:
      "An AI-powered architectural design tool where I built the visual identity and designed a clear, functional interface for generating and refining proposals.",
    credits: [{ label: "Stack", value: "Next.js, Tailwind, Figma, Framer" }],
    tags: ["branding", "ui/ux", "product design", "ai"],
    media: [{ kind: "image", src: "/case-studies/project-aai/asset-1.jpg", alt: "Archi AI Asset 1" }],
  },
  {
    slug: "project-4",
    title: "Gourmet Hunters",
    subtitle: "E-Commerce Redesign",
    year: "2022",
    role: "Lead Designer",
    client: "Gourmet Hunters",
    summary:
      "A leading wine e-commerce in Spain, where I delivered a complete redesign of their website along with supporting digital design assets.",
    credits: [{ label: "Stack", value: "E-commerce, Figma" }],
    tags: ["ecommerce", "web design", "branding"],
    media: [
      { kind: "image", src: "/case-studies/project-gh/asset-1.jpg", alt: "Gourmet Hunters Asset 1" },
    ],
  },
  {
    slug: "project-5",
    title: "Icedream",
    subtitle: "Branding & E-Commerce",
    year: "2022",
    role: "Brand Designer",
    client: "Icedream",
    summary:
      "A playful ice cream brand and e-commerce site where I developed the brand identity, packaging, and digital storefront design.",
    credits: [{ label: "Stack", value: "Shopify, Figma, Photoshop, Reactjs, Flutter, Illustrator" }],
    tags: ["branding", "packaging", "ecommerce", "web design"],
    media: [{ kind: "image", src: "/case-studies/project-id/asset-1.jpg", alt: "Icedream Asset 1" },
      { kind: "image", src: "/case-studies/project-id/asset-2.jpg", alt: "Icedream Asset 1" },
      { kind: "image", src: "/case-studies/project-id/asset-3.jpg", alt: "Icedream Asset 1" },
      { kind: "image", src: "/case-studies/project-id/asset-4.jpg", alt: "Icedream Asset 1" },
      { kind: "image", src: "/case-studies/project-id/asset-5.jpg", alt: "Icedream Asset 1" },
      { kind: "image", src: "/case-studies/project-id/asset-6.jpg", alt: "Icedream Asset 1" },
      { kind: "image", src: "/case-studies/project-id/asset-7.jpg", alt: "Icedream Asset 1" },
    ],
  },
  {
    slug: "project-6",
    title: "Mindhappy",
    subtitle: "Branding & Website",
    year: "2021",
    role: "Brand Designer",
    client: "Mindhappy",
    summary:
      "I designed the logo, full brand system, and website for this mental health and mindfulness startup.",
    credits: [{ label: "Stack", value: "WordPress, Figma" }],
    tags: ["branding", "logo design", "web design"],
    media: [{ kind: "image", src: "/case-studies/project-mh/asset-1.jpg", alt: "Mindhappy Asset 1" },
      { kind: "image", src: "/case-studies/project-mh/asset-2.jpg", alt: "Mindhappy Asset 1" },
      { kind: "image", src: "/case-studies/project-mh/asset-3.jpg", alt: "Mindhappy Asset 1" },
      { kind: "image", src: "/case-studies/project-mh/asset-4.jpg", alt: "Mindhappy Asset 1" },
      { kind: "image", src: "/case-studies/project-mh/asset-5.jpg", alt: "Mindhappy Asset 1" },
      { kind: "image", src: "/case-studies/project-mh/asset-6.jpg", alt: "Mindhappy Asset 1" },
      { kind: "image", src: "/case-studies/project-mh/asset-7.jpg", alt: "Mindhappy Asset 1" },
      { kind: "image", src: "/case-studies/project-mh/asset-8.jpg", alt: "Mindhappy Asset 1" },
      { kind: "image", src: "/case-studies/project-mh/asset-9.jpg", alt: "Mindhappy Asset 1" },
      { kind: "image", src: "/case-studies/project-mh/asset-10.jpg", alt: "Mindhappy Asset 1" },
    ],
  },
  {
    slug: "project-7",
    title: "Criteo",
    subtitle: "Creative Freelance Role",
    year: "2021",
    role: "Senior Freelance Creative",
    client: "Criteo (New York & Barcelona)",
    summary:
      "Senior freelance creative role collaborating with New York and Barcelona teams, delivering design solutions for advertising and marketing projects.",
    credits: [{ label: "Stack", value: "Figma, Adobe CC" }],
    tags: ["creative direction", "advertising", "branding"],
    media: [{ kind: "image", src: "/case-studies/project-7/asset-1.jpg", alt: "Criteo Asset 1" }],
  },
  {
    slug: "project-8",
    title: "AFP Milano",
    subtitle: "Limited Edition Clothing Line",
    role: "Designer",
    client: "AFP Milano",
    summary:
      "My graphic designs were produced for a limited edition clothing line in Milan, covering apparel graphics, typography systems, and production-ready artwork.",
    credits: [{ label: "Stack", value: "Illustrator, Photoshop" }],
    tags: ["apparel design", "merch", "print", "branding"],
    media: [{ kind: "image", src: "/case-studies/project-8/asset-1.jpg", alt: "AFP Milano Asset 1" }],
  },
  {
    slug: "project-9",
    title: "Bouygues Construction",
    subtitle: "Prototype Landing & Motion",
    year: "2020",
    role: "UI/UX Designer",
    client: "Bouygues Construction",
    summary:
      "I designed a prototype landing page and produced motion design elements for their digital innovation initiatives.",
    credits: [{ label: "Stack", value: "After Effects, Figma" }],
    tags: ["ui/ux", "motion design", "landing page"],
    media: [
      { kind: "image", src: "/case-studies/project-9/asset-1.jpg", alt: "Bouygues Asset 1" },
    ],
  },
  {
    slug: "project-10",
    title: "Coworkup",
    subtitle: "Coworking Platform",
    year: "2019",
    role: "Brand & Product Designer",
    client: "Coworkup",
    summary:
      "Branding and product design for a coworking platform, creating a modular system for space management, members, and events.",
    credits: [{ label: "Stack", value: "React, Figma" }],
    tags: ["branding", "ui/ux", "web app"],
    media: [{ kind: "image", src: "/case-studies/project-10/asset-1.jpg", alt: "Coworkup Asset 1" }],
  },
  {
    slug: "project-11",
    title: "FCKOFFEE",
    subtitle: "Bold Brand Identity",
    year: "2019",
    role: "Brand Designer",
    client: "FCKOFFEE",
    summary:
      "A bold, irreverent coffee brand where I crafted the logo, brand identity, packaging, merchandise, and e-commerce design.",
    credits: [{ label: "Stack", value: "Shopify, Figma, Illustrator" }],
    tags: ["branding", "logo design", "packaging", "ecommerce"],
    media: [
      { kind: "image", src: "/case-studies/project-11/asset-1.jpg", alt: "FCKOFFEE Asset 1" },
    ],
  },
];

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function findProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
