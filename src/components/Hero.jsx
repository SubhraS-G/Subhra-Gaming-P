import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal.js";
import { SOCIALS } from "../data/content.js";
import SocialIcon from "./icons.jsx";

const PARALLAX_AMOUNTS = { portrait: 10, ui: 5, word: -4 };

/** AI cutout first (transparent PNG); falls back to the masked photo treatment. */
const PORTRAIT_CANDIDATES = [
  "/images/portrait-cutout.png",
  "/images/portrait.jpg",
];
const CUTOUT_INDEX = 0;

export default function Hero() {
  const heroRef = useRef(null);
  const copyRef = useReveal();
  const statusRef = useReveal();
  const [portraitIndex, setPortraitIndex] = useState(0);
  const portraitSrc = PORTRAIT_CANDIDATES[portraitIndex] ?? PORTRAIT_CANDIDATES.at(-1);
  const isCutout = portraitIndex === CUTOUT_INDEX;
  const tiltRef = useRef(null);

  // Subtle 3D tilt on the cutout subject (reference-style depth)
  useEffect(() => {
    const el = tiltRef.current;
    if (!el || !isCutout) return undefined;
    let raf = 0;
    const onMove = (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--tilt", `${(nx * 7).toFixed(2)}deg`);
        });
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isCutout]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const items = hero.querySelectorAll("[data-parallax]");
    let raf = 0;
    let latestX = 0;
    let latestY = 0;

    const applyParallax = () => {
      raf = 0;
      items.forEach((item) => {
        const amount = PARALLAX_AMOUNTS[item.dataset.parallax] ?? 5;
        item.style.transform = `translate3d(${latestX * amount}px, ${latestY * amount}px, 0)`;
      });
    };

    const onMove = (event) => {
      latestX = event.clientX / window.innerWidth - 0.5;
      latestY = event.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(applyParallax);
    };

    const onLeave = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      items.forEach((item) => {
        item.style.transform = "";
      });
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" className="hero shell" ref={heroRef}>
      <div className="hero-bg-word" aria-hidden="true" data-parallax="word">
        SUBHRA
      </div>

      <div className="hero-copy hero-left reveal" ref={copyRef}>
        <span className="eyebrow">GAMER • STREAMER</span>
        <h1>
          Gaming.
          <br />
          Streaming.
          <br />
          <span>Creating.</span>
        </h1>
        <p>
          A gamer at heart, a streamer by choice, and a creator through
          everything I do.
        </p>

        <div className="hero-actions">
          <a className="button primary" href="#content">
            WATCH CONTENT <span>↗</span>
          </a>
          <a className="button ghost" href="#collaborate">
            COLLABORATE <span>↗</span>
          </a>
        </div>
      </div>

      <div className="portrait-wrap" data-parallax="portrait">
        <div className="portrait-glow" />
        <div className="portrait-cutout" ref={tiltRef}>
          <img
            src={portraitSrc}
            onError={() => setPortraitIndex((i) => i + 1)}
            alt="Subhra Gaming"
            className="portrait"
          />
        </div>
      </div>

      <aside className="hero-status reveal" ref={statusRef} data-parallax="ui">
        <div className="status-card">
          <span className="label">CURRENTLY PLAYING</span>
          <strong>VALORANT</strong>
          <span className="online">
            <i /> ONLINE
          </span>
        </div>

        <div className="status-card">
          <span className="label">CONTENT</span>
          <strong>LIVE • GAMEPLAY • SHORTS</strong>
        </div>

        <div className="social-stack">
          {SOCIALS.map((social) => (
            <a
              key={social.short}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
            >
              <SocialIcon short={social.short} size={17} />
            </a>
          ))}
        </div>
      </aside>

      <div className="hero-bottom">
        <span>SUBHRA GAMING</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
}
