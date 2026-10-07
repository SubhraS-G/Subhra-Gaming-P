import useReveal from "../hooks/useReveal.js";
import useCountUp from "../hooks/useCountUp.js";
import useScrollShift from "../hooks/useScrollShift.js";
import SectionHeading from "./SectionHeading.jsx";
import { useYouTubeStats } from "../hooks/useYouTube.js";

function Stat({ stat, index }) {
  const revealRef = useReveal();
  const { ref, display } = useCountUp(stat.value, {
    format: stat.format,
    suffix: stat.suffix,
  });

  return (
    <div
      className="stat reveal"
      ref={revealRef}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <strong ref={ref}>{display}</strong>
      <span>{stat.label}</span>
    </div>
  );
}

export default function Stats() {
  const { stats, live, error } = useYouTubeStats();
  const wordRef = useScrollShift(-0.05);

  return (
    <section className="section shell stats">
      <div className="bg-word" aria-hidden="true" ref={wordRef}>
        NUMBERS
      </div>

      <SectionHeading
        index="03"
        eyebrow={
          <>
            THE CREATOR{" "}
            <em className={`live-pill ${live ? "is-live" : ""}`}>
              {live ? "● LIVE FROM YOUTUBE" : error ? "○ OFFLINE CACHE" : "○ LOADING…"}
            </em>
          </>
        }
        prefix="BY THE "
        accent="NUMBERS."
      />

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Stat key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
