/**
 * Renders a JSON-LD <script> for structured data. Server component — the graph
 * is serialised into the initial HTML so crawlers and AI systems read it without
 * running JavaScript.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
