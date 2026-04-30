import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const STEPS = [
  { year: "2021", title: "Founded", desc: "Started in a San Francisco garage", color: "#6366f1" },
  { year: "2022", title: "First Launch", desc: "10K users in the first month", color: "#8b5cf6" },
  { year: "2023", title: "Series A", desc: "$12M raised from top VCs", color: "#a855f7" },
  { year: "2024", title: "1M Users", desc: "Reached a global milestone", color: "#ec4899" },
  { year: "2025", title: "Enterprise", desc: "500+ companies onboard", color: "#f59e0b" },
];

export const Timeline: React.FC = () => {
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

  // The center line grows from top to bottom
  const lineH = interpolate(frame, [20, 200], [0, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #06060e 0%, #0c0b1e 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 160px",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 56, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>
          Our Journey
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
          Building SwiftClip
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", width: "100%" }}>
        {/* Vertical center line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 2,
            height: lineH,
            background: "linear-gradient(to bottom, #6366f1, #a855f7, #ec4899, #f59e0b)",
            transform: "translateX(-50%)",
          }}
        />

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            const delay = 25 + i * 28;
            const itemOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const itemX = interpolate(frame, [delay, delay + 25], [isLeft ? -40 : 40, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  position: "relative",
                }}
              >
                {/* Left side */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: 48,
                    opacity: itemOpacity,
                    transform: `translateX(${itemX}px)`,
                  }}
                >
                  {isLeft ? (
                    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 24px", maxWidth: 360, borderLeft: `3px solid ${step.color}` }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: step.color, letterSpacing: "0.15em", marginBottom: 6 }}>{step.year}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 4 }}>{step.title}</div>
                      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>{step.desc}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", fontWeight: 600, letterSpacing: "0.1em" }}>{step.year}</div>
                  )}
                </div>

                {/* Center dot */}
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: step.color, border: "3px solid #06060e", boxShadow: `0 0 12px ${step.color}80`, flexShrink: 0, zIndex: 1 }} />

                {/* Right side */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: 48,
                    opacity: itemOpacity,
                    transform: `translateX(${-itemX}px)`,
                  }}
                >
                  {!isLeft ? (
                    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 24px", maxWidth: 360, borderRight: `3px solid ${step.color}` }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: step.color, letterSpacing: "0.15em", marginBottom: 6 }}>{step.year}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 4 }}>{step.title}</div>
                      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>{step.desc}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", fontWeight: 600, letterSpacing: "0.1em" }}>{step.year}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
