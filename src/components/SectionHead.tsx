interface SectionHeadProps {
  num: string;
  title: string;
  sub: string;
}

export function SectionHead({ num, title, sub }: SectionHeadProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        marginBottom: 28,
      }}
    >
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
      <h2
        style={{
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          flex: 1,
          height: 1,
          background: "var(--line)",
          alignSelf: "center",
          marginLeft: 10,
        }}
      />
      <span
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
