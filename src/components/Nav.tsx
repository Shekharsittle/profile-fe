import { useEffect, useState } from "react";

interface NavProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const LINKS = ["about", "experience", "skills", "contact"];

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dismiss the menu on Escape, and when the viewport grows back past the
  // breakpoint where the full nav returns — otherwise it would stay mounted
  // and duplicate the links already visible in the bar.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  // The bar goes opaque once scrolled, and also whenever the menu is open so
  // the dropdown never renders over bare page content.
  const raised = scrolled || menuOpen;

  return (
    <nav
      className="nav"
      style={{
        background: raised
          ? "color-mix(in oklab, var(--bg) 82%, transparent)"
          : "transparent",
        backdropFilter: raised ? "blur(10px)" : "none",
        borderBottom: raised
          ? "1px solid var(--line)"
          : "1px solid transparent",
      }}
    >
      <div className="nav-row">
        <div
          style={{
            fontWeight: 600,
            letterSpacing: "0.3px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              background: "var(--accent)",
              display: "inline-block",
              borderRadius: 2,
              boxShadow: "0 0 0 4px var(--accent-dim)",
              flexShrink: 0,
            }}
          />
          shekhar.sh
        </div>

        <div className="nav-links">
          {LINKS.map((link) => (
            <a key={link} href={`#${link}`} className="nav-link">
              <span style={{ color: "var(--ink-faint)", marginRight: 6 }}>·</span>
              {link}
            </a>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <div className="nav-status">
          <span
            className="dot-pulse"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 0 3px var(--accent-dim)",
              flexShrink: 0,
            }}
          />
          <span>open to roles</span>
        </div>

        <button
          onClick={onToggleTheme}
          title="Toggle theme"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="btn-outline"
          style={{ fontSize: 12, flexShrink: 0 }}
        >
          <span>{theme === "dark" ? "◐" : "◑"}</span>
          <span>{theme}</span>
        </button>

        <button
          className="nav-burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div id="nav-menu" className="nav-menu">
          {LINKS.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => setMenuOpen(false)}
            >
              <span style={{ color: "var(--ink-faint)" }}>·</span>
              {link}
            </a>
          ))}
          <div
            className="nav-status"
            style={{ display: "flex", paddingTop: 12 }}
          >
            <span
              className="dot-pulse"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 0 3px var(--accent-dim)",
              }}
            />
            <span>open to roles</span>
          </div>
        </div>
      )}
    </nav>
  );
}
