import useReveal from "../hooks/useReveal.js";
import useScrollShift from "../hooks/useScrollShift.js";
import SectionHeading from "./SectionHeading.jsx";
import { SETUP } from "../data/content.js";

export default function Setup() {
  const wordRef = useScrollShift(0.05);

  return (
    <section id="setup" className="section shell setup-section">
      <div className="bg-word" aria-hidden="true" ref={wordRef}>
        GEAR
      </div>

      <SectionHeading index="04" eyebrow="THE ARSENAL" prefix="THE " accent="SETUP." />

      <div className="setup-grid">
        {SETUP.map((item, index) => (
          <SetupCard key={item.category} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

function SetupCard({ item, index }) {
  const ref = useReveal();

  return (
    <article
      className="setup-card reveal"
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="setup-category">{item.category}</span>
      <h3>{item.name}</h3>
      <ul>
        {item.specs.map((spec) => (
          <li key={spec}>{spec}</li>
        ))}
      </ul>
    </article>
  );
}
