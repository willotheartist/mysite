import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact — /mysite",
  description: "Start a project or ask a question.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#F1F1F1] text-black selection:bg-black selection:text-[#F1F1F1]">
      <section className="min-h-[80svh] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Let’s make it unmistakable
          </h1>
          <p className="mt-4 text-neutral-800 text-[15px] leading-7">
            Tell me a bit about your project, goals, timeline, and budget.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-black/10 bg-white p-6 md:p-10 shadow-sm">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
