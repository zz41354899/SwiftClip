import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const TITLE_TEXT = "GLITCH";

export const GlitchTitle: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mainOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glitch trigger cycles — every ~20 frames after frame 30
  const glitchCycle = (frame - 30) % 22;
  const isGlitching = glitchCycle < 5 && frame > 30 && frame < 130;

  // RGB split offsets
  const redX = isGlitching ? (glitchCycle < 2 ? 12 : -6) : 0;
  const blueX = isGlitching ? (glitchCycle < 2 ? -12 : 8) : 0;
  const greenY = isGlitching ? (glitchCycle < 3 ? 4 : -2) : 0;

  // Scanline flicker during glitch
  const scanOpacity = isGlitching ? interpolate(glitchCycle, [0, 5], [0.3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  // Subtitle slides up after glitch settles
  const subOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [100, 130], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Bar at bottom
  const barWidth = interpolate(frame, [80, 130], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fontSize = 220;

  return (
    <AbsoluteFill
      style={{
        background: "#020202",
        fontFamily: "Inter, 'Helvetica Neue', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Scanlines overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)",
          opacity: 0.15 + (isGlitching ? 0.3 : 0),
          pointerEvents: "none",
        }}
      />

      {/* Glitch flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#00ff88",
          opacity: scanOpacity * 0.05,
          pointerEvents: "none",
        }}
      />

      {/* Title stack — RGB split layers */}
      <div style={{ position: "relative", opacity: mainOpacity }}>
        {/* Red channel */}
        <div
          style={{
            position: "absolute",
            fontSize,
            fontWeight: 900,
            color: "#ff003c",
            mixBlendMode: "screen",
            transform: `translate(${redX}px, 0px)`,
            opacity: isGlitching ? 0.7 : 0,
            letterSpacing: "0.06em",
            userSelect: "none",
            left: 0,
          }}
        >
          {TITLE_TEXT}
        </div>

        {/* Blue channel */}
        <div
          style={{
            position: "absolute",
            fontSize,
            fontWeight: 900,
            color: "#00c8ff",
            mixBlendMode: "screen",
            transform: `translate(${blueX}px, ${greenY}px)`,
            opacity: isGlitching ? 0.7 : 0,
            letterSpacing: "0.06em",
            userSelect: "none",
            left: 0,
          }}
        >
          {TITLE_TEXT}
        </div>

        {/* Main white text */}
        <div
          style={{
            fontSize,
            fontWeight: 900,
            color: "white",
            letterSpacing: "0.06em",
            userSelect: "none",
            textShadow: isGlitching ? "0 0 30px rgba(255,255,255,0.8)" : "none",
          }}
        >
          {TITLE_TEXT}
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 500,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          marginTop: 24,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        System Overload
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          width: barWidth + "%",
          background: "linear-gradient(90deg, #00ff88, #00c8ff, #ff003c)",
        }}
      />
    </AbsoluteFill>
  );
};
