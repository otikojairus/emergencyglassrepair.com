export type FaqEntry = { q: string; a: string };

type FaqSectionProps = {
  title: string;
  id?: string;
  items: FaqEntry[];
};

/** H2 section title + H3 per question (no skipped heading levels). */
export function FaqSection({ title, id = "faq-heading", items }: FaqSectionProps) {
  return (
    <section className="faq-block" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {items.map((faq) => (
        <div className="faq-item" key={faq.q}>
          <h3>{faq.q}</h3>
          <p>{faq.a}</p>
        </div>
      ))}
    </section>
  );
}
