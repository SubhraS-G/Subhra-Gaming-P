import useReveal from "../hooks/useReveal.js";
import { COLLAB_CATEGORIES, CHANNEL, PARTNERS } from "../data/content.js";

export default function Collaborate() {
  const innerRef = useReveal();

  return (
    <section id="collaborate" className="collab shell">
      <div className="collab-inner reveal" ref={innerRef}>
        <span className="section-index">05</span>
        <span className="eyebrow">{CHANNEL.badge} • FOR GAMING BRANDS</span>
        <h2>
          LET'S <span>GAME.</span>
        </h2>
        <p>
          Have a gaming product, launch or campaign? Let's build something
          around it.
        </p>

        <div className="collab-grid">
          {COLLAB_CATEGORIES.map((category, index) => (
            <div className="collab-cat" key={category.title}>
              <span className="cat-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{category.title}</h3>
              <ul>
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a className="button primary" href={`mailto:${CHANNEL.email}`}>
          START A COLLAB <span>↗</span>
        </a>
        <p className="collab-email">{CHANNEL.email}</p>

        <div className="partners">
          <span className="partners-label">AFFILIATES & PARTNERS</span>
          <div className="partners-row">
            {PARTNERS.map((partner) => (
              <a
                className="partner-card"
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noreferrer"
              >
                <strong>{partner.name}</strong>
                <span>{partner.tagline}</span>
                <em>{partner.cta} ↗</em>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
