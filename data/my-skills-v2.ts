// data/my-skills-v2.ts
export type SkillBlock =
  | { type: "word"; id: string; label: string }
  | { type: "image"; id: string; src: string; alt: string };

export const skillBlocks: SkillBlock[] = [
  // The curated "random" sequence you asked for:
  { type: "word", id: "graphic-design", label: "Graphic Design" },
  { type: "word", id: "illustration", label: "Illustration" },
  { type: "image", id: "asset-1", src: "/images/blockgrid/asset-1.png", alt: "Blockgrid asset 1" },
  { type: "word", id: "visual-identity", label: "Visual Identity" },
  { type: "image", id: "asset-2", src: "/images/blockgrid/asset-2.png", alt: "Blockgrid asset 2" },
  { type: "word", id: "identity", label: "Identity" },
  { type: "word", id: "brand-specialist", label: "Brand Specialist" },
  { type: "image", id: "asset-3", src: "/images/blockgrid/asset-3.png", alt: "Blockgrid asset 3" },
  { type: "word", id: "art-direction", label: "Art Direction" },
  { type: "image", id: "asset-4", src: "/images/blockgrid/asset-4.png", alt: "Blockgrid asset 4" },
  { type: "word", id: "editorial-layouts", label: "Editorial Layouts" },
  { type: "word", id: "web-design", label: "Web Design" },
  { type: "image", id: "asset-5", src: "/images/blockgrid/asset-5.png", alt: "Blockgrid asset 5" },
  { type: "word", id: "app-design", label: "App Design" },
  { type: "image", id: "asset-6", src: "/images/blockgrid/asset-6.png", alt: "Blockgrid asset 6" },
  { type: "word", id: "ux-thinking", label: "UX Thinking" },
  { type: "word", id: "interaction-design", label: "Interaction Design" },
  { type: "image", id: "asset-7", src: "/images/blockgrid/asset-7.png", alt: "Blockgrid asset 7" },
  { type: "word", id: "motion-prototyping", label: "Motion & Prototyping" },
  { type: "image", id: "asset-8", src: "/images/blockgrid/asset-8.png", alt: "Blockgrid asset 8" },
  { type: "word", id: "minimal", label: "Minimal" },
  { type: "word", id: "bold", label: "Bold" },
  { type: "image", id: "asset-9", src: "/images/blockgrid/asset-9.png", alt: "Blockgrid asset 9" },
  { type: "word", id: "high-contrast", label: "High Contrast" },
  { type: "image", id: "asset-10", src: "/images/blockgrid/asset-10.png", alt: "Blockgrid asset 10" },
  { type: "word", id: "crisp-layouts", label: "Crisp Layouts" },
  { type: "word", id: "whitespace", label: "Whitespace" },
  { type: "image", id: "asset-11", src: "/images/blockgrid/asset-11.png", alt: "Blockgrid asset 11" },
  { type: "image", id: "asset-12", src: "/images/blockgrid/asset-12.png", alt: "Blockgrid asset 12" },
];
