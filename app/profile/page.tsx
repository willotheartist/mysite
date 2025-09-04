// app/profile/page.tsx
import type { JSX } from "react";
import TextRevealImpl from "../../components/magicui/text-reveal";

// Keep your local alias
type RevealProps = { text: string };
const Reveal = TextRevealImpl as unknown as (props: RevealProps) => JSX.Element;

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Intro (one screen) */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal text="Designer • Product thinker • Prototyper • Motion-first • Accessible • Systems-led • Fast to value." />
        </div>
      </section>

      {/* Capabilities */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal text="Capabilities" />
          <ul className="mt-4 space-y-2 list-disc list-inside text-lg leading-7">
            <li>Brand Strategy</li>
            <li>Brand Identity Design</li>
            <li>Website Design</li>
            <li>App & Product Design</li>
            <li>Design Systems</li>
            <li>CRM</li>
            <li>Digital Marketing</li>
            <li>Content Creation</li>
            <li>Creative Direction</li>
            <li>Mentoring Design Leaders</li>
            <li>Brand Consulting</li>
            <li>DEI Leadership</li>
          </ul>
        </div>
      </section>

      {/* Currently Learning */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal text="Currently Learning" />
          <ul className="mt-4 space-y-2 list-disc list-inside text-lg leading-7">
            <li>Coding fundamentals</li>
            <li>Flutter</li>
            <li>Next.js</li>
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal text="Experience Highlights" />
          <div className="mt-4 text-lg leading-7">
            Roles, companies, dates, and measurable outcomes will live here.
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal text="Industries I’ve served" />
          <ul className="mt-4 space-y-2 list-disc list-inside text-lg leading-7">
            <li>SaaS & B2B platforms</li>
            <li>Fintech & payments</li>
            <li>E-commerce & marketplaces</li>
            <li>AI tools & developer UX</li>
            <li>Health & wellness</li>
            <li>Media & content</li>
            <li>Education & learning</li>
          </ul>
        </div>
      </section>

      {/* Tools */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal text="Tools I use daily" />
          <ul className="mt-4 space-y-2 list-disc list-inside text-lg leading-7">
            <li>Figma, FigJam</li>
            <li>Adobe Creative Suite (Illustrator, Photoshop, After Effects)</li>
            <li>Procreate</li>
            <li>Blender</li>
            <li>Framer Motion, GSAP</li>
            <li>WordPress, GitHub, Linear/Jira, Notion</li>
            <li>Pen on paper</li>
          </ul>
        </div>
      </section>

      {/* Languages */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal text="Languages" />
          <ul className="mt-4 space-y-2 list-disc list-inside text-lg leading-7">
            <li>English (native)</li>
            <li>French (native)</li>
            <li>Spanish (native)</li>
            <li>Italian (medium)</li>
            <li>Catalan (A2)</li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal text="Projects I created for fun and from the ground up" />
          <ul className="mt-4 space-y-2 list-disc list-inside text-lg leading-7">
            <li>Jimbo</li>
            <li>Zefa</li>
            <li>LocoWeekend</li>
            <li>Inwan Studio</li>
            <li>Wall&Fifth</li>
            <li>F*ckoffee</li>
          </ul>
        </div>
      </section>

      {/* Personal art */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal text="Personal art" />
          <div className="mt-4 text-lg leading-7">
            AFP a Milano produced a limited edition of my prints, worn at Red Bull sporting events and major festivals; my prints are also represented and sold by two agencies.
          </div>
        </div>
      </section>
    </main>
  );
}
