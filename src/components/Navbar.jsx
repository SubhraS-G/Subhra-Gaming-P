import { useEffect, useState } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#content", label: "Content" },
  { href: "#games", label: "Games" },
  { href: "#setup", label: "Setup" },
  { href: "#collaborate", label: "Collaborate" },
  { href: "#media-kit", label: "Media Kit" },
];

export default function Navbar() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onHash = () => setActive(window.location.hash || "#home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <header className="nav shell">
      <a className="brand" href="#home" aria-label="Subhra Gaming home">
        <span className="brand-mark">SG</span>
        <span>SUBHRA GAMING</span>
      </a>

      <nav>
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={active === link.href ? "active" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a className="nav-cta" href="#collaborate">
        JOIN
      </a>
    </header>
  );
}
