interface SectionHeadProps {
  num: string;
  title: string;
  sub: string;
}

export function SectionHead({ num, title, sub }: SectionHeadProps) {
  return (
    <div className="sec-head">
      <span
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          color: "var(--accent)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {num}
      </span>
      <h2 className="sec-head-title">{title}</h2>
      <div className="sec-head-rule" />
      <span
        className="sec-head-sub"
        style={{
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          color: "var(--ink-faint)",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        {sub}
      </span>
    </div>
  );
}
