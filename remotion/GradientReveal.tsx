import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const MESH_COLORS = [
  { x: 20, y: 30, color: "#6366f1", size: 700 },
  { x: 75, y: 20, color: "#ec4899", size: 600 },
  { x: 85, y: 75, color: "#f59e0b", size: 550 },
  { x: 10, y: 80, color: "#22c55e", size: 500 },
  { x: 50, y: 55, color: "#06b6d4", size: 650 },
];

export const GradientReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blobs drift slowly
  const drift = interpolate(frame, [0, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main text reveal — slides up from behind a mask
  const textY = interpolate(frame, [25, 65], [120, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const textOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Frosted glass card expands
  const cardScale = interpolate(frame, [15, 50], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cardOpacity = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subY = interpolate(frame, [55, 85], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const pillsOpacity = interpolate(frame, [85, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pills = ["Design", "Motion", "Code", "Ship"];

  return (
    <AbsoluteFill
      style={{
        background: "#06060a",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        opacity: bgOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Mesh gradient blobs */}
      {MESH_COLORS.map((blob, i) => {
        const driftX = Math.sin(drift * Math.PI * 2 + i * 1.2) * 3;
        const driftY = Math.cos(drift * Math.PI * 2 + i * 0.8) * 3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: blob.size,
              height: blob.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${blob.color}55 0%, transparent 65%)`,
              left: `${blob.x + driftX}%`,
              top: `${blob.y + driftY}%`,
              transform: "translate(-50%, -50%)",
              filter: "blur(80px)",
              mixBlendMode: "screen",
            }}
          />
        );
      })}

      {/* Frosted glass card */}
      <div
        style={{
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 40,
          padding: "72px 96px",
          width: 960,
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glass shimmer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "200%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            transform: `translateX(${drift * 200}%)`,
          }}
        />

        <div style={{ textAlign: "center" }}>
          {/* Main headline */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "white",
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
              marginBottom: 28,
            }}
          >
            Create Without
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Limits
            </span>
          </div>

          {/* Sub */}
          <p
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
              marginBottom: 40,
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
            }}
          >
            Beautiful motion graphics, zero timeline editing
          </p>

          {/* Pills */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              opacity: pillsOpacity,
              flexWrap: "wrap",
            }}
          >
            {pills.map((pill, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 28px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 100,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
