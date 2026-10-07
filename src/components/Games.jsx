import useReveal from "../hooks/useReveal.js";
import useScrollShift from "../hooks/useScrollShift.js";
import SectionHeading from "./SectionHeading.jsx";
import { GAMES } from "../data/content.js";

export default function Games() {
  const cardRefs = GAMES.map(() => useReveal());
  const wordRef = useScrollShift(0.06);

  return (
    <section id="games" className="section shell games-section">
      <div className="bg-word" aria-hidden="true" ref={wordRef}>
        PLAY
      </div>

      <SectionHeading index="01" eyebrow="THE GAMES" prefix="WHAT I " accent="PLAY." />

      <div className="game-grid">
        {GAMES.map((game, index) => (
          <article
            className="game-card reveal"
            ref={cardRefs[index]}
            key={game.id}
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <span>{game.id}</span>
            <h3>{game.name}</h3>
            <p>{game.tags}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
