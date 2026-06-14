import { useEffect, useState } from "react";

interface NavProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "14px 28px",
        background: scrolled
          ? "color-mix(in oklab, var(--bg) 82%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: 13,
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <div
        style={{
          fontWeight: 600,
          letterSpacing: "0.3px",
          display: "flex",
          alignItems: "center",
          gap: 10,
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
          }}
        />
        shekhar.sh
      </div>

      <div
        style={{
          display: "flex",
          gap: 18,
          marginLeft: 24,
          color: "var(--ink-dim)",
        }}
      >
        {["about", "experience", "skills", "contact"].map((link) => (
          <a
            key={link}
            href={`#${link}`}
            style={{ padding: "4px 0", position: "relative" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--ink)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "var(--ink-dim)")
            }
          >
            <span style={{ color: "var(--ink-faint)", marginRight: 6 }}>·</span>
            {link}
          </a>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--ink-dim)",
          fontSize: 12,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 0 3px var(--accent-dim)",
          }}
          className="dot-pulse"
        />
        <span>open to roles</span>
      </div>

      <button
        onClick={onToggleTheme}
        title="Toggle theme"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          border: "1px solid var(--line-strong)",
          borderRadius: 999,
          color: "var(--ink-dim)",
          fontSize: 12,
          transition: "color 0.15s, border-color 0.15s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "var(--ink)";
          el.style.borderColor = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.color = "var(--ink-dim)";
          el.style.borderColor = "var(--line-strong)";
        }}
      >
        <span>{theme === "dark" ? "◐" : "◑"}</span>
        <span>{theme}</span>
      </button>
    </nav>
  );
}
