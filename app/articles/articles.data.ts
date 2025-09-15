// app/articles/articles.data.ts

export type Article = {
  slug: string;                 // url: /articles/<slug>
  title: string;
  description?: string;
  date: string;                 // ISO or "YYYY-MM-DD"
  categories?: string[];        // ["Productivity", "Creativity"]
  hero: string;                 // e.g. "/articles/finding-flow.jpg"
  body: string[];               // each string = one paragraph
};

export const articles: Article[] = [
  {
    slug: "finding-flow",
    title: "Finding Flow in a World of Noise",
    description:
      "The hardest part of being a designer today isn’t finding inspiration. It’s filtering the noise.",
    date: "2025-09-10",
    categories: ["Productivity", "Creativity"],
    hero: "/articles/finding-flow.png",
    body: [
      "The hardest part of being a designer today isn’t finding inspiration. It’s filtering the noise.",
      "Every day, we’re hit with endless feeds: Behance, Dribbble, Instagram, TikTok, LinkedIn, Slack. Everyone has a hot take, a new tool, or a micro-trend that “everyone” will be using by next week. It’s thrilling, sure. But it’s also exhausting.",
      "The problem with too much inspiration is that it can leave you creatively paralyzed. When you’re always looking outward, you forget to look inward. And that’s where flow comes in.",

      "## My Way of Switching On",
      "I don’t have a candlelit ritual with matcha and lo-fi beats (though no judgment if you do). My version is more stripped back.",
      "Repetition over novelty. I put on looping music — ambient, minimal techno, or a soundtrack I know by heart. Repetition creates rhythm without demanding attention.",
      "Cutting noise at the source. I close unnecessary tabs, silence notifications, and leave only the essentials: my design tools, a sketchpad, and a coffee.",
      "One guiding question. I ask myself: What am I really solving right now? Not “what would look cool on Dribbble,” but the actual design problem at hand.",
      "That reset is like clearing a workspace before building something. It’s deceptively simple, but it flips my brain from “scrolling” to “making.”",

      "## Why Flow Matters",
      "When flow hits, it feels like stepping out of time. Hours disappear. Shapes, grids, colors, interactions — they start arranging themselves almost subconsciously. The work feels less like pushing pixels and more like uncovering something that was already there.",
      "That’s when good ideas surface: when I’m not forcing them but letting them unfold.",
      "In my world — branding, digital, and motion — flow is where connections spark. A logo sketch becomes the seed for a UI transition. A motion test suggests a social campaign. Disciplines blur, and instead of juggling “brand,” “product,” and “content” as separate silos, they weave together into something holistic. That’s the gold.",

      "## Noise Isn’t the Enemy",
      "Here’s the thing: I’m not anti-noise. I don’t believe in deleting apps or pretending trends don’t exist. The endless scroll does fuel me. Seeing what others are building keeps me connected, excited, and aware.",
      "But inspiration and imitation live close together. The difference is knowing when to turn the noise off — to let your mind remix all those fragments into something new. Flow is the filter that makes the noise useful instead of overwhelming.",

      "## Flow as a Skill",
      "A lot of people think flow is magic. It’s not. It’s a skill. It’s practice.",
      "It’s training your brain to recognize the signal in the noise, to settle into focus, and to trust instincts once you’re there. Some days it clicks in minutes. Other days it’s a grind — two hours of false starts before the gears finally catch. But it’s always worth it.",
      "Because when I find flow, design stops feeling like “work.” It shifts into something closer to play. And play is where the best design comes from.",

      "## A Designer’s Job in 2025",
      "In a world where AI can churn out ten versions of a logo in seconds, I think our real edge isn’t speed — it’s flow. Machines can remix; they can’t experience flow.",
      "That state where ideas blur together, where constraints spark creativity, where the noise of the outside world fades into the background — that’s human. That’s where design stops being about keeping up and starts being about making something original.",
      "So yes, I still scroll. I still collect references. I still dip into the noise. But when it’s time to create, I chase flow. Because that’s where design feels alive.",
      "— William, Multidisciplinary Designer"
    ],
  },
  {
    slug: "ai-expanding-playground",
    title: "AI Isn’t Replacing Designers... It’s Expanding the Playground",
    description:
      "AI isn’t shrinking the role of the designer — it’s giving us a bigger sandbox to play in.",
    date: "2025-09-12",
    categories: ["AI", "Design"],
    hero: "/articles/ai-expanding-playground.png",
    body: [
      "There’s a lot of hand-wringing about AI “replacing” creative work. Every week there’s a new thread, a new hot take, a new fear that the machines are coming for our jobs.",
      "But from where I’m sitting, AI hasn’t shrunk my role as a designer — it’s expanded my playground.",

      "## MidJourney and the End of Stock Image Déjà Vu",
      "Remember when every project pulled from the same pool of stock photos?",
      "For years, it was either:",
      "Pexels/Unsplash (the “hipster with laptop and coffee cup” starter pack)",
      "Paid stock libraries (great, but a quick way to balloon a client budget)",
      "After a while, the images became laughably recognizable. You’d be halfway through a pitch deck and someone would say: “Oh, I’ve seen that Unsplash guy before.” Not ideal.",
      "MidJourney changed that. Suddenly I could generate custom visuals — moody atmospheres, futuristic cityscapes, surreal mashups — tailored to a project. No more scraping the same three free-photo sites. No more awkward stock bills that blow up budgets. Just fresh, flexible imagery that actually matches the vibe.",
      "It’s not about replacing creativity. It’s about expanding the palette.",

      "## ChatGPT and the Surprise Skill Upgrade",
      "The other AI tool that’s reshaped my process? ChatGPT.",
      "Before, coding always felt like a separate universe. Something “devs do.” But with ChatGPT, I’ve been able to learn coding fast — not in the abstract, but in a way that immediately improves my work.",
      "I can build prototypes and MVPs at speed.",
      "I can bridge the gap between design and development without waiting for handoffs.",
      "I can experiment with interactions, animations, and micro-tools that would’ve been out of reach before.",
      "The result? My skill set feels more hybrid, more resilient, and honestly — more fun. Design is no longer just about the static canvas. It’s about making ideas move, testing them live, and shipping faster.",

      "## The Designer’s Role Isn’t Shrinking",
      "There’s a myth that AI makes us less valuable. I see the opposite. The tools are democratizing production, sure — but that makes the role of taste and direction even more important.",
      "Anyone can generate 100 options in MidJourney. The designer decides which one works, why it works, and how it integrates into a bigger system.",
      "Anyone can spin up code with ChatGPT. The designer decides how it should feel, how it should flow, and how to make it human.",
      "That judgment, that synthesis — that’s the job.",

      "## From Scarcity to Play",
      "What excites me most is how AI shifts design from scarcity to play.",
      "Before: limited stock photos, limited time, limited skills. Every experiment came with a cost.",
      "Now: an endless sandbox. Tools that free up budget, accelerate learning, and give you more chances to try wild ideas.",
      "It doesn’t mean every output is gold. It means the sandbox is bigger. The walls are further out. And that’s where the fun starts.",

      "So no — AI isn’t replacing designers. It’s giving us a bigger playground. And I, for one, plan on staying out there as long as possible.",
      "— William, Multidisciplinary Designer"
    ],
  },
  {
    slug: "designers-as-filmmakers",
    title: "Why Every Designer Should Think Like a Filmmaker",
    description:
      "Design isn’t decoration — it’s narrative. Lessons from Saul Bass, CulturePub, and cinematic branding.",
    date: "2025-09-14",
    categories: ["Storytelling", "Branding"],
    hero: "/articles/designers-as-filmmakers.png",
    body: [
      "Some of my earliest creative memories aren’t from sketchbooks or studios — they’re from movies.",
      "As a kid, I was hypnotized by the opening titles of the old Pink Panther films with Peter Sellers. Those Saul Bass sequences — playful, minimal, bold — weren’t just graphics. They were stories before the story. They told you how to feel before the first line of dialogue.",
      "And then there was It’s a Mad, Mad, Mad, Mad World. Pure chaos, but with rhythm and structure holding it together. Even as a kid, I noticed how the visuals carried you along — how energy could be designed. Saul Bass wasn’t just a graphic designer; he was a director of attention.",
      "That realization stuck with me: design isn’t decoration. It’s narrative.",

      "## Growing Up on CulturePub",
      "Growing up in France, I also had a secret weapon: CulturePub. If you know, you know. It was this legendary TV show that aired the best ads from around the world — and sometimes the censored ones too.",
      "For me, it was a masterclass in storytelling. You’d see:",
      "The Pepsi vs. Coca-Cola rivalry unfold like a blockbuster saga.",
      "Quirky, surreal ads from Japan and Thailand that felt more experimental than most art films.",
      "Clever, irreverent campaigns from Holland that rewired how you thought about humor and brand identity.",
      "It was an eye-opener. Advertising wasn’t just “selling stuff” — it was global storytelling. It was design, writing, filmmaking, psychology, and culture all woven together.",
      "Looking back, CulturePub was probably my first design school.",

      "## Branding Is a Narrative Too",
      "The same lesson carried into branding. The brands that stuck with us weren’t the ones with the prettiest logos — they were the ones with a clear plotline.",
      "Take Nike in the ’90s. They weren’t just selling shoes. They were telling a story: grit, rebellion, performance, possibility. The ads felt cinematic. They had arcs. And “Just Do It” wasn’t just a tagline — it was a three-act play compressed into three words.",
      "Apple, MTV, Coca-Cola — all of them built narratives. You weren’t just buying products; you were stepping into a story.",
      "Branding, when done well, is pure cinema. It has pacing. It has tension and release. It has themes and motifs that repeat until they feel mythic.",

      "## The Designer as Director",
      "Most designers think like set decorators: arranging elements, polishing type, adjusting grids. Useful, yes. But filmmakers think differently.",
      "Every frame matters. Nothing is random.",
      "The cut is as important as the shot. Transitions define rhythm.",
      "Characters drive everything. Without human presence, even the most beautiful visuals fall flat.",
      "When I approach a project — whether it’s a logo, a website, or a motion system — I try to direct it, not just design it.",
      "Is this homepage setting the scene?",
      "Is this logo the opening title?",
      "Is this interaction the cut to the next act?",
      "It’s not about making things “cinematic.” It’s about designing with narrative intent.",

      "## Why This Matters Now",
      "Today, we live in content overflow. There’s no shortage of beautiful visuals. But beauty isn’t what makes work memorable. It’s story.",
      "Brands that win aren’t the ones with the sharpest gradient or trendiest font — they’re the ones that pull you into a narrative. They give you a role in something bigger.",
      "And that’s where designers have an edge. We don’t just make assets. We build experiences that unfold. We set the pacing. We choose the frame. We direct the audience’s attention.",

      "## My Takeaway",
      "I still think back to those Saul Bass titles and those late-night CulturePub sessions. How design, when done with intent, moves beyond decoration into direction.",
      "That’s the opportunity we have as designers:",
      "Not just to make things look good, but to tell stories worth remembering.",
      "Not just to decorate, but to direct.",
      "So my advice is simple: don’t just think like a designer. Think like a filmmaker. Direct your audience. Set the scene. Build the tension. Deliver the release.",
      "Because in the end, design isn’t static. It moves. It breathes. It tells a story.",
      "— William, Multidisciplinary Designer"
    ],
  },
] as const;

// Helpers
export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
