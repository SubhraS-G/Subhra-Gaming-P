import useReveal from "../hooks/useReveal.js";

/**
 * Shared section heading: HUD index number, eyebrow, big display title,
 * and a rule line that draws itself on reveal.
 */
export default function SectionHeading({ index, eyebrow, prefix = "", accent, suffix = "" }) {
  const ref = useReveal();

  return (
    <div className="section-heading reveal" ref={ref}>
      <span className="section-index">{index}</span>
      <span className="eyebrow">{eyebrow}</span>
      <h2>
        {prefix}
        <span>{accent}</span>
        {suffix}
      </h2>
      <span className="heading-rule" aria-hidden="true" />
    </div>
  );
}
