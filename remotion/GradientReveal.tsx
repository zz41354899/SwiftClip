import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const GradientReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 25], [0, 1], {
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
        background: "#f5f5f7",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: "hidden",
        opacity: bgOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Frosted glass card */}
      <div
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          borderRadius: 64,
          padding: "72px 96px",
          width: 960,
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Main headline */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#1d1d1f",
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
              marginBottom: 28,
            }}
          >
            Create Without
            <br />
            <span
              style={{
                color: "#0066cc",
              }}
            >
              Limits
            </span>
          </div>

          {/* Sub */}
          <p
            style={{
              fontSize: 24,
              color: "#86868b",
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
              marginBottom: 40,
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
              fontWeight: 500,
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
                  background: "#0066cc",
                  border: "1px solid rgba(0,0,0,0.05)",
                  borderRadius: 32,
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
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
