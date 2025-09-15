// src/data/skills.ts

export type SkillCategory = "frontend" | "motion" | "3d" | "ui" | "system" | "devops";

export type Skill = {
  id: string;
  slug: string;
  title: string;
  categories: SkillCategory[];
  summary: string;
  highlights?: string[];
  media: { type: "blob" | "pill" | "cube"; hue?: number };
  meta?: { level?: "expert" | "advanced" | "intermediate"; since?: string };
};

export const skills: Skill[] = [
  // --- Core FE / UI you’re strong in ---
  {
    id: "react",
    slug: "react",
    title: "React",
    categories: ["frontend", "ui", "system"],
    summary:
      "Component-driven UIs with modern state patterns, accessibility, and performance budgeting.",
    highlights: ["Server/Client boundaries", "Suspense + streaming", "Accessibility-first"],
    media: { type: "cube", hue: 210 },
    meta: { level: "expert", since: "2016" },
  },
  {
    id: "nextjs",
    slug: "nextjs",
    title: "Next.js",
    categories: ["frontend", "system"],
    summary:
      "App Router, edge-aware rendering, and data-fetch composition with React Server Components.",
    highlights: ["RSC mental model", "Route groups & parallel routes", "Edge-friendly APIs"],
    media: { type: "pill", hue: 0 },
    meta: { level: "expert", since: "2017" },
  },
  {
    id: "framer",
    slug: "framer-motion",
    title: "Framer Motion",
    categories: ["motion", "ui"],
    summary:
      "Shared layout choreography, scroll reveals, and micro-interactions that feel premium.",
    highlights: ["Shared layout morphs", "Staggers & orchestration", "Reduced-motion fallbacks"],
    media: { type: "blob", hue: 320 },
    meta: { level: "expert", since: "2019" },
  },
  {
    id: "gsap",
    slug: "gsap",
    title: "GSAP",
    categories: ["motion"],
    summary:
      "ScrollTrigger scenes and FLIP for complex DOM with smooth Lenis pipelines.",
    highlights: ["ScrollTrigger x Lenis", "Performance tuning", "FLIP transitions"],
    media: { type: "pill", hue: 35 },
    meta: { level: "advanced", since: "2018" },
  },
  {
    id: "design-systems",
    slug: "design-systems",
    title: "Design Systems",
    categories: ["ui", "system"],
    summary:
      "Token-driven systems, shadcn/ui customization, and pragmatic documentation teams actually use.",
    highlights: ["Tokens & theming", "A11y baked-in", "Composable primitives"],
    media: { type: "cube", hue: 260 },
    meta: { level: "expert" },
  },

  // --- Frontend core ---
  {
    id: "typescript",
    slug: "typescript",
    title: "TypeScript",
    categories: ["frontend", "system"],
    summary: "Strict typing for safer apps, API contracts, and scalable architectures.",
    highlights: ["Utility types", "Generics", "API contract enforcement"],
    media: { type: "pill", hue: 200 },
    meta: { level: "expert", since: "2018" },
  },
  {
    id: "javascript",
    slug: "javascript",
    title: "JavaScript (ES6+)",
    categories: ["frontend", "system"],
    summary:
      "Modern syntax, async patterns, and clear module composition for maintainable UI logic.",
    highlights: ["Async/await discipline", "Immutability", "Tree-shakeable modules"],
    media: { type: "cube", hue: 205 },
    meta: { level: "expert", since: "2012" },
  },
  {
    id: "html-css",
    slug: "html-css",
    title: "HTML & Modern CSS",
    categories: ["frontend", "ui"],
    summary:
      "Semantic HTML and layered CSS (logical props, container queries) for resilient interfaces.",
    highlights: ["Container queries", "Fluid type/spacing", "prefers-* media"],
    media: { type: "pill", hue: 190 },
    meta: { level: "expert" },
  },
  {
    id: "tailwind",
    slug: "tailwindcss",
    title: "Tailwind CSS",
    categories: ["frontend", "ui"],
    summary:
      "Utility-first styling for consistent, scalable design systems without CSS fatigue.",
    highlights: ["Custom tokens", "Responsive grids", "Dark mode strategies"],
    media: { type: "cube", hue: 180 },
    meta: { level: "expert", since: "2019" },
  },
  {
    id: "radix-shadcn",
    slug: "radix-shadcn",
    title: "Radix UI / shadcn",
    categories: ["frontend", "ui", "system"],
    summary: "Accessible primitives and headless components tailored to brand systems.",
    highlights: ["Theming pipelines", "Composable patterns", "A11y defaults"],
    media: { type: "blob", hue: 170 },
    meta: { level: "advanced" },
  },
  {
    id: "testing",
    slug: "testing",
    title: "Testing (Jest/RTL)",
    categories: ["frontend", "system"],
    summary:
      "Confident UI changes through component tests and contract testing for key workflows.",
    highlights: ["React Testing Library", "Mocking strategies", "CI integration"],
    media: { type: "pill", hue: 150 },
    meta: { level: "advanced" },
  },
  {
    id: "performance",
    slug: "web-performance",
    title: "Web Performance",
    categories: ["frontend", "system"],
    summary:
      "Designing for speed: LCP/CLS/INP budgets, code-splitting, and lightweight image pipelines.",
    highlights: ["Lighthouse triage", "Preload/priorities", "Hydration costs"],
    media: { type: "cube", hue: 145 },
    meta: { level: "advanced" },
  },
  {
    id: "seo",
    slug: "seo",
    title: "SEO & Metadata",
    categories: ["frontend", "system"],
    summary:
      "Structured data and content architecture that supports discovery and shareability.",
    highlights: ["Open Graph", "Sitemaps/robots", "Schema basics"],
    media: { type: "pill", hue: 140 },
    meta: { level: "advanced" },
  },

  // --- Brand, Graphic, Print, Illustration (new + expanded) ---
  {
    id: "graphic-design",
    slug: "graphic-design",
    title: "Graphic Design",
    categories: ["ui"],
    summary:
      "High-impact compositions for campaigns and products across digital and print.",
    highlights: ["Hierarchy & rhythm", "Grids & alignment", "Contrast & clarity"],
    media: { type: "cube", hue: 236 },
    meta: { level: "expert" },
  },
  {
    id: "branding",
    slug: "branding",
    title: "Branding & Identity",
    categories: ["ui", "system"],
    summary:
      "Cohesive brand systems across touchpoints with scalable guidelines.",
    highlights: ["Logo systems", "Tone & voice alignment", "Usage rules"],
    media: { type: "blob", hue: 248 },
    meta: { level: "expert" },
  },
  {
    id: "brand-guidelines",
    slug: "brand-guidelines",
    title: "Brand Guidelines",
    categories: ["ui", "system"],
    summary:
      "Clear, practical documentation that teams actually follow.",
    highlights: ["Do/Don’t examples", "Component usage", "Asset kits"],
    media: { type: "pill", hue: 252 },
    meta: { level: "expert" },
  },
  {
    id: "logo-design",
    slug: "logo-design",
    title: "Logo Design",
    categories: ["ui"],
    summary:
      "Mark-making with scalability, optical balance, and system fit.",
    highlights: ["Geometry & grids", "Optical corrections", "Responsive marks"],
    media: { type: "cube", hue: 258 },
    meta: { level: "expert" },
  },
  {
    id: "illustration",
    slug: "illustration",
    title: "Illustration",
    categories: ["ui"],
    summary:
      "Vector/bitmap illustrations and custom iconography to extend brand voice.",
    highlights: ["Line & shape language", "Texture & shading", "Icon sets"],
    media: { type: "blob", hue: 266 },
    meta: { level: "advanced" },
  },
  {
    id: "posters",
    slug: "posters",
    title: "Poster Design",
    categories: ["ui"],
    summary:
      "Punchy large-format layouts with readable hierarchy from a distance.",
    highlights: ["Scale & legibility", "Type contrasts", "Print constraints"],
    media: { type: "pill", hue: 232 },
    meta: { level: "expert" },
  },
  {
    id: "billboards",
    slug: "billboards",
    title: "Billboards & OOH",
    categories: ["ui"],
    summary:
      "Bold concepts for split-second comprehension in real environments.",
    highlights: ["Distance legibility", "Message economy", "Night/day contrast"],
    media: { type: "cube", hue: 228 },
    meta: { level: "expert" },
  },
  {
    id: "packaging",
    slug: "packaging",
    title: "Packaging Design",
    categories: ["ui"],
    summary:
      "Die-lines, materials, and finishes that translate brand into shelf impact.",
    highlights: ["Dielines", "Print finishes", "Mockups"],
    media: { type: "blob", hue: 224 },
    meta: { level: "advanced" },
  },
  {
    id: "editorial",
    slug: "editorial",
    title: "Editorial & Layout",
    categories: ["ui"],
    summary:
      "Multi-page systems with typographic rhythm and content clarity.",
    highlights: ["Grid systems", "Baseline rhythm", "Imagery flow"],
    media: { type: "pill", hue: 220 },
    meta: { level: "expert" },
  },
  {
    id: "presentation-design",
    slug: "presentation-design",
    title: "Presentation Design",
    categories: ["ui"],
    summary:
      "Polished decks that sell the narrative with clear visuals and pacing.",
    highlights: ["Story arcs", "Visual hierarchy", "Speaker notes"],
    media: { type: "cube", hue: 216 },
    meta: { level: "advanced" },
  },
  {
    id: "photo-retouching",
    slug: "photo-retouching",
    title: "Photo Retouching",
    categories: ["ui"],
    summary:
      "Clean-ups, color work, and composites aligned to brand tone.",
    highlights: ["Non-destructive edits", "Color grading", "Composites"],
    media: { type: "blob", hue: 212 },
    meta: { level: "advanced" },
  },
  {
    id: "prepress",
    slug: "prepress",
    title: "Prepress & Production",
    categories: ["ui"],
    summary:
      "Production-ready files with correct profiles, bleeds, and specs.",
    highlights: ["CMYK/spot colors", "Bleeds & safety", "Proofing"],
    media: { type: "pill", hue: 208 },
    meta: { level: "expert" },
  },
  {
    id: "campaign-rollouts",
    slug: "campaign-rollouts",
    title: "Campaign Rollouts",
    categories: ["ui", "frontend"],
    summary:
      "Coherent multi-format suites: social, banners, OOH, email, landing pages.",
    highlights: ["Message hierarchy", "Variant systems", "Channel nuance"],
    media: { type: "cube", hue: 204 },
    meta: { level: "expert" },
  },

  // --- Web platforms / CMS you want to surface ---
  {
    id: "wordpress",
    slug: "wordpress",
    title: "WordPress",
    categories: ["frontend", "system", "ui"],
    summary:
      "Design-led sites with custom themes, Gutenberg blocks, and tidy content models.",
    highlights: ["Custom themes", "ACF/Gutenberg blocks", "Performance-minded builds"],
    media: { type: "pill", hue: 186 },
    meta: { level: "advanced", since: "2015" },
  },

  // --- Motion (kept) ---
  {
    id: "after-effects",
    slug: "after-effects",
    title: "After Effects",
    categories: ["motion"],
    summary:
      "Motion design for product/UI, social, and campaign spots with export-ready pipelines.",
    highlights: ["Graph editor", "Expressions basics", "Alpha exports"],
    media: { type: "cube", hue: 325 },
    meta: { level: "advanced" },
  },
  {
    id: "lottie",
    slug: "lottie",
    title: "Lottie",
    categories: ["motion", "frontend"],
    summary: "Vector animations delivered as JSON for crisp, tiny UI motion.",
    highlights: ["Bodymovin", "Performance tuning", "Fallbacks"],
    media: { type: "pill", hue: 330 },
    meta: { level: "advanced" },
  },
  {
    id: "lenis",
    slug: "lenis",
    title: "Lenis",
    categories: ["motion", "frontend"],
    summary:
      "Silky smooth scrolling paired with ScrollTrigger for narrative sections.",
    highlights: ["Sync with GSAP", "A11y safeguards", "Input performance"],
    media: { type: "blob", hue: 15 },
    meta: { level: "advanced" },
  },
  {
    id: "blender",
    slug: "blender",
    title: "Blender",
    categories: ["3d", "motion"],
    summary:
      "Modeling, lighting, and rendering for product visuals and motion plates.",
    highlights: ["Cycles/Eevee", "Camera moves", "Asset optimization"],
    media: { type: "pill", hue: 155 },
    meta: { level: "intermediate" },
  },
  {
    id: "video-editing",
    slug: "video-editing",
    title: "Video Editing",
    categories: ["motion"],
    summary:
      "Story-first edits with rhythm, pacing, and clean export profiles.",
    highlights: ["Narrative beats", "Transitions", "Audio polish"],
    media: { type: "blob", hue: 10 },
    meta: { level: "advanced" },
  },
  {
    id: "storyboarding",
    slug: "storyboarding",
    title: "Storyboarding",
    categories: ["motion", "ui"],
    summary:
      "Translate concepts into frames and beats that guide production efficiently.",
    highlights: ["Beat mapping", "Camera language", "Timing blocks"],
    media: { type: "cube", hue: 5 },
    meta: { level: "advanced" },
  },

  // --- Product/Process (kept) ---
  {
    id: "ux-strategy",
    slug: "ux-strategy",
    title: "UX Strategy",
    categories: ["ui", "system"],
    summary:
      "From problem framing and JTBD to measurable outcomes and iterative roadmaps.",
    highlights: ["JTBD framing", "KPI mapping", "Experiment loops"],
    media: { type: "blob", hue: 260 },
    meta: { level: "expert" },
  },
  {
    id: "wireframing",
    slug: "wireframing",
    title: "Wireframing & Prototyping",
    categories: ["ui", "frontend"],
    summary:
      "Intent-driven flows from low-fi sketches to interactive prototypes that de-risk delivery.",
    highlights: ["Click-through prototypes", "Interaction specs", "Design tokens early"],
    media: { type: "cube", hue: 255 },
    meta: { level: "expert" },
  },
  {
    id: "visual-identity",
    slug: "visual-identity",
    title: "Visual Identity",
    categories: ["ui", "system"],
    summary:
      "Logo systems, typography, color, and guidelines that scale across touchpoints.",
    highlights: ["Logo grids", "Type hierarchies", "Color contrast systems"],
    media: { type: "pill", hue: 250 },
    meta: { level: "expert" },
  },
  {
    id: "typography",
    slug: "typography",
    title: "Typography & Layout",
    categories: ["ui", "frontend"],
    summary:
      "Responsive type scales, rhythm, and layout systems with clarity and emphasis.",
    highlights: ["Fluid scales", "Optical alignment", "Language-aware kerning"],
    media: { type: "cube", hue: 245 },
    meta: { level: "expert" },
  },
  {
    id: "color-systems",
    slug: "color-systems",
    title: "Color Systems",
    categories: ["ui"],
    summary:
      "Contrast-aware palettes and modes (light/dark/system) with semantic tokens.",
    highlights: ["Contrast budgets", "Semantic mapping", "Theming pipelines"],
    media: { type: "blob", hue: 240 },
    meta: { level: "advanced" },
  },
  {
    id: "figma",
    slug: "figma",
    title: "Figma",
    categories: ["ui"],
    summary:
      "Collaborative design workflows bridging design and engineering.",
    highlights: ["Component libraries", "Auto layout", "Design tokens handoff"],
    media: { type: "blob", hue: 280 },
    meta: { level: "advanced", since: "2019" },
  },
  {
    id: "print",
    slug: "print-design",
    title: "Print Design",
    categories: ["ui"],
    summary:
      "Editorials, packaging, and OOH with production-ready files and color management.",
    highlights: ["Prepress", "Bleeds & dielines", "Color profiles"],
    media: { type: "cube", hue: 235 },
    meta: { level: "expert" },
  },
  {
    id: "ads",
    slug: "advertising",
    title: "Ad & Campaign Creatives",
    categories: ["ui", "frontend"],
    summary:
      "High-performing ad suites for Meta/Google/TikTok with iteration velocity.",
    highlights: ["Creative variants", "Message hierarchy", "Platform nuances"],
    media: { type: "pill", hue: 230 },
    meta: { level: "expert" },
  },
  {
    id: "banners",
    slug: "banners",
    title: "Banner Production",
    categories: ["ui", "frontend"],
    summary:
      "Static and animated banners built for clarity, weight, and quick turnarounds.",
    highlights: ["Dynamic templates", "Weight budgets", "QA checklists"],
    media: { type: "blob", hue: 225 },
    meta: { level: "expert" },
  },
  {
    id: "email-crm",
    slug: "email-crm",
    title: "Email & CRM Design",
    categories: ["ui", "frontend"],
    summary:
      "Modular email systems with dark-mode awareness and robust client compatibility.",
    highlights: ["Modular blocks", "Client quirks", "Accessibility"],
    media: { type: "pill", hue: 220 },
    meta: { level: "advanced" },
  },
  {
    id: "a11y",
    slug: "accessibility",
    title: "Accessibility (WCAG)",
    categories: ["ui", "frontend", "system"],
    summary:
      "Inclusive design from semantics and focus management to motion safety.",
    highlights: ["Keyboard flows", "Roles & landmarks", "Reduced-motion UX"],
    media: { type: "cube", hue: 200 },
    meta: { level: "expert" },
  },
  {
    id: "svg",
    slug: "svg",
    title: "SVG & Icon Systems",
    categories: ["ui", "frontend"],
    summary:
      "Flexible, crisp iconography and SVG pipelines that stay lightweight.",
    highlights: ["Symbols & sprites", "Pixel hinting", "Accessible labels"],
    media: { type: "blob", hue: 195 },
    meta: { level: "advanced" },
  },

  // --- System / Architecture (kept, design-adjacent) ---
  {
    id: "state-architecture",
    slug: "state-architecture",
    title: "State & Data Architecture",
    categories: ["system", "frontend"],
    summary:
      "Predictable state flows and data-fetch composition that remain debuggable at scale.",
    highlights: ["Server/Client boundaries", "Streaming & cache", "Error boundaries"],
    media: { type: "pill", hue: 120 },
    meta: { level: "expert" },
  },
  {
    id: "content-systems",
    slug: "content-systems",
    title: "Content Systems",
    categories: ["system", "frontend"],
    summary:
      "Headless CMS setups and schemas that empower teams without locking UX.",
    highlights: ["Sanity/Contentful", "Portable Text", "Preview flows"],
    media: { type: "cube", hue: 115 },
    meta: { level: "advanced" },
  },
  {
    id: "security-basics",
    slug: "security-basics",
    title: "Security Basics",
    categories: ["system"],
    summary:
      "Protecting sessions, inputs, and endpoints with a pragmatic approach.",
    highlights: ["Auth flows", "XSS/CSRF hygiene", "Secrets management"],
    media: { type: "blob", hue: 110 },
    meta: { level: "intermediate" },
  },
  {
    id: "analytics",
    slug: "analytics",
    title: "Analytics & Experimentation",
    categories: ["system", "frontend"],
    summary:
      "Measure what matters and close the loop from insight to iteration.",
    highlights: ["Event schemas", "A/B testing", "Dashboard literacy"],
    media: { type: "pill", hue: 105 },
    meta: { level: "advanced" },
  },

  // --- Platform / Collab (pared down to keep it relevant) ---
  {
    id: "vercel",
    slug: "vercel",
    title: "Vercel",
    categories: ["devops", "frontend"],
    summary:
      "Preview deployments, image/CDN pipelines, and edge routes that keep UX snappy.",
    highlights: ["Env management", "Edge functions", "Caching strategies"],
    media: { type: "blob", hue: 25 },
    meta: { level: "advanced" },
  },
  {
    id: "git",
    slug: "git",
    title: "Git & Collaboration",
    categories: ["devops", "system"],
    summary:
      "Clean history, review velocity, and low-friction collaboration with product/eng.",
    highlights: ["Branch strategies", "Conventional commits", "PR hygiene"],
    media: { type: "cube", hue: 35 },
    meta: { level: "expert" },
  },
];

export const allCategories: SkillCategory[] = ["frontend", "motion", "3d", "ui", "system", "devops"];
