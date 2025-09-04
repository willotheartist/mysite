// app/homev2/page.tsx
import Hero2 from "../../components/Hero2";

export default function HomeV2Page() {
  return (
    <main>
      <Hero2
        imageSrc="/hero.jpg"
        imageAlt="Atmospheric, high-contrast scene"
        headline={`Hi, I'm William. A digital designer with over 10 years of experience.`}
      />
    </main>
  );
}
