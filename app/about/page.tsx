import type { JSX } from "react";
import TextRevealImpl from "../../components/magicui/text-reveal";

// Force the correct prop shape locally to avoid any barrel/auto-import collisions.
type RevealProps = { text: string };
const Reveal = TextRevealImpl as unknown as (props: RevealProps) => JSX.Element;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="space-y-[10vh]">
        <Reveal text="I’m an interdisciplinary designer working at the intersection of branding, digital products and storytelling. Since 2015, I’ve worked as a freelance creative helping more than 50 brands launch or reinvent — across 30+ industries from hospitality and fashion to tech, wellness and publishing." />

        <Reveal text="Born in France to British parents and raised in Spain, I’ve lived in over ten cities. The tricky question of where I’m from turned into an advantage: three cultures, multiple languages, and a comfort with collaborating across time zones." />

        <Reveal text="My toolkit spans Illustrator, Photoshop, Procreate and the wider Adobe Creative Suite, with a soft spot for lettering and brand systems. I’ve designed identities for Barcelona restaurants, rebrands for London tech, posters for Valencia events, and ecommerce experiences for teams in New York and Madrid." />

        <Reveal text="I spent a year in Barcelona as a freelance Senior Creative with Criteo, helping bring global campaigns and design projects to life. The through-line in my work is clarity with personality — visuals that scale, copy that carries, and interactions that feel human." />

        <Reveal text="Today I’m based in London, designing, prototyping, and shipping. I believe design should read like good conversation: honest, precise, and impossible to misinterpret." />
      </section>
    </main>
  );
}
