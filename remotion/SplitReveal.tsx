import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const SplitReveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Panels slide apart to reveal content
  const leftX = interpolate(frame, [10, 55], [0, -960], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const rightX = interpolate(frame, [10, 55], [0, 960], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const contentOpacity = interpolate(frame, [40, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contentScale = interpolate(frame, [40, 70], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.1)),
  });

  const tagOpacity = interpolate(frame, [65, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagY = interpolate(frame, [65, 90], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineWidth = interpolate(frame, [80, 120], [0, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "#f0ede8",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Hidden content behind panels */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: contentOpacity,
          transform: `scale(${contentScale})`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#6366f1", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 20 }}>
            Introducing
          </div>
          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: "#0a0a0a",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              marginBottom: 32,
            }}
          >
            SWIFT
            <br />
            <span style={{ color: "#6366f1" }}>CLIP</span>
          </div>
          <div style={{ height: 3, width: lineWidth, background: "#0a0a0a", margin: "0 auto 28px" }} />
          <div style={{ fontSize: 28, color: "#666", fontWeight: 400, opacity: tagOpacity, transform: `translateY(${tagY}px)` }}>
            Video templates for developers
          </div>
        </div>
      </div>

      {/* Left panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50%",
          background: "#1a1a2e",
          transform: `translateX(${leftX}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 60,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            opacity: frame < 30 ? 1 : interpolate(frame, [30, 55], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>BEFORE</div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.35)", marginTop: 8, letterSpacing: "0.1em" }}>Manual editing</div>
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "50%",
          background: "#6366f1",
          transform: `translateX(${rightX}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 60,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            opacity: frame < 30 ? 1 : interpolate(frame, [30, 55], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>AFTER</div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)", marginTop: 8, letterSpacing: "0.1em" }}>SwiftClip</div>
        </div>
      </div>

      {/* Center split line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 2,
          background: "white",
          zIndex: 20,
          opacity: interpolate(frame, [50, 70], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
