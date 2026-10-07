import { PARTNERS, CHANNEL } from "../data/content.js";

const ITEMS = [
  "VALORANT",
  "LIVE 5×/WEEK",
  "GTA V",
  "SHORTS",
  "MINECRAFT",
  "WATCH PARTIES",
  "FREE FIRE",
  CHANNEL.handle.replace("@", "").toUpperCase(),
  "GAMING.",
  "STREAMING.",
  "CREATING.",
  ...PARTNERS.map((p) => p.name.toUpperCase()),
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <i>◆</i>
          </span>
        ))}
      </div>
    </div>
  );
}
