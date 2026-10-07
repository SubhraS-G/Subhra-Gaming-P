import { SOCIALS } from "../data/content.js";
import SocialIcon from "./icons.jsx";

export default function Footer() {
  return (
    <footer className="footer shell">
      <span>© 2026 SUBHRA GAMING</span>

      <div className="footer-social">
        {SOCIALS.map((social) => (
          <a
            key={social.short}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={social.href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={social.label}
          >
            <SocialIcon short={social.short} size={15} />
          </a>
        ))}
      </div>

      <a
        className="to-top"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        BACK TO TOP <i>↑</i>
      </a>
    </footer>
  );
}
