import "./field-notes.css";
import FieldNotesGrid from "@components/interactive/FieldNotesGrid";

export const metadata = {
  title: "Field Notes",
  description: "Interactive hover-reveal cards with React + GSAP.",
};

export default function FieldNotesPage() {
  return (
    <main className="fn-root">
      <header className="fn-header">
        <div className="fn-logo">field notes</div>
        <nav className="fn-nav">
          <a href="#stories">stories</a>
          <a href="#about">about</a>
        </nav>
      </header>

      <section className="fn-hero">
        <h1>
          <span>people.</span>
          <span>places.</span>
          <span>stories.</span>
        </h1>
        <p>hover a card to preview</p>
      </section>

      <section id="stories" className="fn-section">
        <FieldNotesGrid />
      </section>

      <section id="about" className="fn-about">
        <h2>about</h2>
        <p>
          Field Notes is your interactive wall of mini-stories. Hover reveals
          images or videos with parallax + glare, powered by GSAP.
        </p>
      </section>

      <footer className="fn-footer">
        <small>© {new Date().getFullYear()} field notes</small>
      </footer>
    </main>
  );
}
