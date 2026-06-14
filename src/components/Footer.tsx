export function Footer() {
  return (
    <footer
      style={{
        padding: "40px 0 24px",
        borderTop: "1px solid var(--line)",
        color: "var(--ink-faint)",
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: 11,
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
      <div>© 2026 Shekhar Singh — all rights reserved</div>
      <div>built with React · served with ♥</div>
      <div>v1.0 · dark by default</div>
    </footer>
  );
}
