import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const BARS = [
  { label: "Jan", value: 65, color: "#6366f1" },
  { label: "Feb", value: 82, color: "#6366f1" },
  { label: "Mar", value: 74, color: "#6366f1" },
  { label: "Apr", value: 91, color: "#a855f7" },
  { label: "May", value: 88, color: "#a855f7" },
  { label: "Jun", value: 100, color: "#ec4899" },
];

const MAX_BAR_HEIGHT = 320;

export const BarChart: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 30], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const axisOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #07070f 0%, #0d0b1e 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 100px 80px",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", width: 700, height: 300, bottom: "15%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 56, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#a5b4fc", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>2026 Growth Report</div>
        <div style={{ fontSize: 46, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>Monthly Revenue</div>
      </div>

      {/* Chart */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 32, position: "relative", paddingBottom: 48, opacity: axisOpacity }}>
        {/* Y-axis */}
        <div style={{ position: "absolute", left: -60, top: 0, bottom: 48, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {[100, 75, 50, 25, 0].map((v) => (
            <span key={v} style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "right", width: 40 }}>{v}%</span>
          ))}
        </div>

        {/* Horizontal grid lines */}
        <div style={{ position: "absolute", left: -20, right: 0, top: 0, bottom: 48 }}>
          {[0, 25, 50, 75, 100].map((v, i) => (
            <div
              key={v}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: (v / 100) * MAX_BAR_HEIGHT,
                height: 1,
                background: "rgba(255,255,255,0.05)",
              }}
            />
          ))}
        </div>

        {BARS.map((bar, i) => {
          const delay = 30 + i * 12;
          const barH = interpolate(frame, [delay, delay + 45], [0, (bar.value / 100) * MAX_BAR_HEIGHT], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          const labelOpacity = interpolate(frame, [delay + 40, delay + 60], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const valueOpacity = interpolate(frame, [delay + 50, delay + 70], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              {/* Value label above bar */}
              <div style={{ fontSize: 16, fontWeight: 700, color: bar.color, marginBottom: 8, opacity: valueOpacity }}>
                {bar.value}%
              </div>

              {/* Bar */}
              <div
                style={{
                  width: 72,
                  height: barH,
                  background: `linear-gradient(to top, ${bar.color}, ${bar.color}99)`,
                  borderRadius: "8px 8px 0 0",
                  boxShadow: `0 -4px 20px ${bar.color}50`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Shine */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)" }} />
              </div>

              {/* X label */}
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", marginTop: 12, opacity: labelOpacity }}>
                {bar.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 28, marginTop: 20, opacity: interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        {["Q1", "Q2", "Record High"].map((label, i) => {
          const colors = ["#6366f1", "#a855f7", "#ec4899"];
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: colors[i] }} />
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{label}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
