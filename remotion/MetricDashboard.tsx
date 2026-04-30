import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const METRICS = [
  { label: "Monthly Revenue", value: 128500, prefix: "$", suffix: "", color: "#22c55e" },
  { label: "Active Users", value: 24830, prefix: "", suffix: "", color: "#6366f1" },
  { label: "Churn Rate", value: 2.4, prefix: "", suffix: "%", color: "#f59e0b", decimals: 1 },
];

function easeCounter(frame: number, start: number, end: number, target: number): number {
  return interpolate(frame, [start, end], [0, target], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
}

export const MetricDashboard: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 30], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const CARD_DELAYS = [30, 55, 80];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #060b14 0%, #0a1628 50%, #060b14 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        overflow: "hidden",
      }}
    >
      {/* Grid lines */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: (i / 5) * 100 + "%",
            width: 1,
            background: "rgba(255,255,255,0.03)",
          }}
        />
      ))}

      {/* Glow */}
      <div style={{ position: "absolute", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", top: "10%", filter: "blur(60px)" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 64, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#6366f1", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Q2 2026 · Live Dashboard</div>
        <div style={{ fontSize: 52, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>Performance Overview</div>
      </div>

      {/* Cards row */}
      <div style={{ display: "flex", gap: 32, width: "100%" }}>
        {METRICS.map((metric, i) => {
          const delay = CARD_DELAYS[i];
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardY = interpolate(frame, [delay, delay + 25], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const rawVal = easeCounter(frame, delay + 10, delay + 80, metric.value);
          const displayVal = metric.decimals
            ? rawVal.toFixed(1)
            : Math.floor(rawVal).toLocaleString();

          const barWidth = interpolate(frame, [delay + 20, delay + 100], [0, 100], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 24,
                padding: "40px 36px",
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: metric.color, opacity: 0.8 }} />

              <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
                {metric.label}
              </div>

              <div style={{ fontSize: 68, fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 24, letterSpacing: "-0.02em" }}>
                <span style={{ color: metric.color, fontSize: 40 }}>{metric.prefix}</span>
                {displayVal}
                <span style={{ color: metric.color, fontSize: 36 }}>{metric.suffix}</span>
              </div>

              {/* Progress bar */}
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: barWidth + "%", background: metric.color, borderRadius: 4, boxShadow: "0 0 10px " + metric.color + "80" }} />
              </div>

              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 10 }}>vs last quarter ↑</div>
            </div>
          );
        })}
      </div>

      {/* Footer bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #6366f1, #a855f7, #6366f1)", opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
    </AbsoluteFill>
  );
};
