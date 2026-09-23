/**
 * Renders a JSON-LD <script> for structured data. Server component, so the graph
 * is serialised into the initial HTML so crawlers and AI systems read it without
 * running JavaScript.
 */
export default function JsonLd({ data }: { data: object }) {
  // Escape `<` so untrusted product/category names can't break out of the
  // <script> element (e.g. a name containing "</script>").
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
