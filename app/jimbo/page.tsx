// app/jimbo/page.tsx
"use client";

import { useEffect } from "react";
import type { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function JimboCaseStudy(): JSX.Element {
  // Ensure this page always uses light tokens even if a previous route set dark
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("theme-dark");
  }, []);

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header / Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-foreground">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="underline-offset-4 hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li className="text-foreground">Case Studies</li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="font-medium text-foreground">
            Jimbo
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/10">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl text-foreground"
            >
              Social Sports, Designed for Connection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 max-w-xl text-base leading-relaxed text-foreground"
            >
              Jimbo is a social sports app I co-founded and designed. It helps people meet
              through sports—from casual runs to competitive games. I shaped everything:
              brand, product, and the team that built it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Tag>Brand</Tag>
              <Tag>Product Design</Tag>
              <Tag>UX / Flows</Tag>
              <Tag>Design System</Tag>
              <Tag>Flutter</Tag>
              <Tag>MapBox</Tag>
              <Tag>Payments</Tag>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-black/10"
          >
            <Image
              src="/case-studies/project-1/asset-1.jpg"
              alt="Jimbo app overview mockups"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Role" value="Co-founder & Design Lead" />
        <StatCard label="Scope" value="Brand → UX → System → Launch" />
        <StatCard label="Team" value="Co-founder + 4 Freelance Devs" />
        <StatCard label="Tech" value="Flutter, Figma, MapBox, Stripe/MangoPay" />
      </section>

      {/* Problem */}
      <Section
        id="challenge"
        eyebrow="The Challenge"
        title="Finding people to play with is harder than playing"
        copy={
          <>
            Playing sports is social. Finding people to play with isn’t. Most tools optimise
            for booking, not connection. Jimbo’s goal: make joining a game feel as easy as
            sending a message—and keep people connected before and after.
          </>
        }
        media={{
          src: "/case-studies/project-1/asset-1.jpg",
          alt: "Legacy flows vs. Jimbo simplified flow",
        }}
      />

      {/* Approach */}
      <Section
        id="approach"
        eyebrow="Approach"
        title="Simple flows, social at the core, systemised for scale"
        copy={
          <>
            I led design and product strategy around three principles:
            <ul className="ml-5 mt-3 list-disc space-y-1 text-foreground">
              <li>
                <strong>Simple flows</strong> — joining a group takes seconds.
              </li>
              <li>
                <strong>Social first</strong> — conversations, groups and challenges feel
                like community.
              </li>
              <li>
                <strong>Scalable system</strong> — a cohesive brand &amp; UI from
                Manchester to Madrid to Miami.
              </li>
            </ul>
          </>
        }
        media={{
          src: "/case-studies/project-1/asset-1.jpg",
          alt: "Sketch → wireframe → polished UI sequence",
        }}
        reversed
      />

      {/* Team & Scaling */}
      <section id="team" className="mt-16 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/10">
        <Eyebrow>Building the Team & Scaling Delivery</Eyebrow>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Lead, delegate, learn—then move faster
        </h2>
        <p className="mt-3 max-w-3xl text-foreground">
          Designing Jimbo meant designing the process. I brought on a co-founder to drive
          outreach, partnerships and community. I hired and directed four freelance
          developers to build Jimbo’s second and third iterations in Flutter. To keep
          velocity high, I learned coding fundamentals and built a custom GPT/AI assistant
          to help me code, debug and iterate. I delegate across design, dev and marketing
          while keeping strategy, UI/UX and brand at the core.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Pill title="Co-founder">
            Partnerships, outreach, collaborations, growth loops
          </Pill>
          <Pill title="4× Freelance Devs">Flutter builds for v2 &amp; v3</Pill>
          <Pill title="Design Lead">
            Flows, UI kits, tokens, motion, QA, handoff
          </Pill>
          <Pill title="Custom GPT/AI">
            Coding assistant for speed &amp; reliability
          </Pill>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mt-16">
        <Eyebrow>Key Product Capabilities</Eyebrow>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">What we built</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <FeatureCard
            title="Groups & Events"
            copy="From 1v1 squash to 200-person runs—create, join, and manage with minimal friction."
            src="/case-studies/project-1/asset-1.jpg"
            alt="Groups and events UI"
          />
          <FeatureCard
            title="Challenges & Scoring"
            copy="Push-ups, streaks, leaderboards and squash scoring to motivate participation."
            src="/case-studies/project-1/asset-1.jpg"
            alt="Challenges UI"
          />
          <FeatureCard
            title="Wallet & Payments"
            copy="Stripe + MangoPay integrations for paid events, memberships and organiser payouts."
            src="/case-studies/project-1/asset-1.jpg"
            alt="Wallet UI"
          />
          <FeatureCard
            title="Map & Discovery"
            copy="MapBox for routes and real-time discovery of nearby games and communities."
            src="/case-studies/project-1/asset-1.jpg"
            alt="Map and discovery UI"
          />
        </div>
      </section>

      {/* Design System */}
      <Section
        id="system"
        eyebrow="Design System"
        title="Consistency builds trust"
        copy={
          <>
            I built Jimbo’s design system in Figma—tokens, components, grids and patterns—so
            teams can move quickly without breaking clarity. From a button to a global flow,
            the system keeps quality high and shipping fast.
          </>
        }
        media={{
          src: "/case-studies/project-1/asset-1.jpg",
          alt: "Design system components and tokens",
        }}
      />

      {/* Workshops & Community */}
      <Section
        id="community"
        eyebrow="Workshops & Community"
        title="Bridge product and people"
        copy={
          <>
            Jimbo lived online and offline. We organised runs in Manchester and padel events
            in Barcelona to validate and grow. I designed sessions to align teams, gather
            insights and translate them into tangible product improvements.
          </>
        }
        media={{
          src: "/case-studies/project-1/asset-1.jpg",
          alt: "Community events and workshop snapshots",
        }}
        reversed
      />

      {/* Outcomes */}
      <section id="outcomes" className="mt-16 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/10">
        <Eyebrow>Outcome & Impact</Eyebrow>
        <div className="grid gap-6 lg:grid-cols-4">
          <Outcome stat="10+" label="Social events hosted" />
          <Outcome stat="1,000+" label="Early users across UK & Spain" />
          <Outcome stat="Partnerships" label="Sports organisers & venues" />
          <Outcome stat="Jimbo+" label="Paid tier: health, tracking & challenges" />
        </div>
      </section>

      {/* Reflection */}
      <section id="reflection" className="mt-16">
        <Eyebrow>Reflection</Eyebrow>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/10">
          <blockquote className="text-lg leading-relaxed text-foreground">
            Jimbo taught me how to be more than a designer—to be a founder, collaborator and
            builder. I learned to direct a team, communicate across design and engineering,
            and even train my own AI assistant to ship faster. From sketch to prototype to
            ship, I own the cycle.
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 flex flex-col items-start gap-4 rounded-3xl border border-black/10 bg-white p-6">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          Let’s design the future of connection
        </h3>
        <p className="max-w-2xl text-foreground">
          Interested in end-to-end product design, design systems, and shipping at pace? I’d
          love to chat.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/#projects"
            className="rounded-full border border-foreground bg-foreground px-4 py-2 text-background transition hover:opacity-90"
          >
            See more projects
          </Link>
          <Link
            href="mailto:hello@yourdomain.com"
            className="rounded-full border border-foreground px-4 py-2 text-foreground transition hover:bg-foreground/5"
          >
            Contact me
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ---------- UI Primitives ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
      {children}
    </p>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/15 bg-white px-3 py-1 text-xs text-foreground">
      {children}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10">
      <p className="text-xs uppercase tracking-wide text-foreground">{label}</p>
      <p className="mt-1 text-base font-medium text-foreground">{value}</p>
    </div>
  );
}

function Outcome({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/10">
      <div className="text-2xl font-semibold text-foreground">{stat}</div>
      <div className="mt-1 text-sm text-foreground">{label}</div>
    </div>
  );
}

function Pill({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <div className="text-sm font-medium text-foreground">{title}</div>
      <div className="mt-1 text-sm text-foreground">{children}</div>
    </div>
  );
}

type Media = { src: string; alt: string };

function Section({
  id,
  eyebrow,
  title,
  copy,
  media,
  reversed = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  copy: React.ReactNode;
  media: Media;
  reversed?: boolean;
}) {
  return (
    <section
      id={id}
      className={[
        "mt-16 grid items-center gap-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/10",
        reversed ? "lg:grid-cols-2 lg:[&>*:first-child]:order-2" : "lg:grid-cols-2",
      ].join(" ")}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        {/* No Typography plugin here: keep tokens authoritative */}
        <div className="mt-3 max-w-none text-foreground space-y-3 [&_p]:m-0 [&_li]:m-0 [&_ul]:pl-5 [&_ul]:list-disc">
          {copy}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-black/10"
      >
        <Image src={media.src} alt={media.alt} fill className="object-cover" />
      </motion.div>
    </section>
  );
}

/* ---------- Feature Card ---------- */

function FeatureCard({
  title,
  copy,
  src,
  alt,
}: {
  title: string;
  copy: string;
  src: string;
  alt: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="group grid grid-rows-[auto_1fr] gap-3 overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/10"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-black/10">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition group-hover:scale-[1.02]"
        />
      </div>
      <div>
        <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-foreground">{copy}</p>
      </div>
    </motion.article>
  );
}
