import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const TEAM = [
  { initials: "AK", name: "Alex Kim", role: "CEO & Founder", color: "#6366f1" },
  { initials: "SL", name: "Sarah Lin", role: "Head of Design", color: "#ec4899" },
  { initials: "MT", name: "Marco Torres", role: "Lead Engineer", color: "#22c55e" },
  { initials: "YC", name: "Yuki Chen", role: "Product Manager", color: "#f59e0b" },
  { initials: "RB", name: "Ryan Blake", role: "Marketing Lead", color: "#06b6d4" },
  { initials: "NP", name: "Nina Park", role: "Data Scientist", color: "#a855f7" },
];

export const TeamGrid: React.FC = () => {
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

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(145deg, #08080f, #0d0c1e)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 80px",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px",
        }}
      />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 52, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 12 }}>
          Meet the team
        </div>
        <div style={{ fontSize: 52, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
          The People Behind SwiftClip
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          width: "100%",
        }}
      >
        {TEAM.map((member, i) => {
          const delay = 30 + i * 14;
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardY = interpolate(frame, [delay, delay + 25], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20,
                padding: "28px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Left color accent */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: member.color, opacity: 0.8 }} />

              {/* Avatar */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: member.color + "22",
                  border: "2px solid " + member.color + "55",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  color: member.color,
                  flexShrink: 0,
                }}
              >
                {member.initials}
              </div>

              {/* Info */}
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {member.name}
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>
                  {member.role}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
