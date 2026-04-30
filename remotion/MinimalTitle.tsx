import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const MinimalTitle: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Thin line draws from center outward
  const lineWidth = interpolate(frame, [5, 35], [0, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Eyebrow label
  const eyebrowOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const eyebrowX = interpolate(frame, [15, 35], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Main title — word by word
  const word1Opacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const word1Y = interpolate(frame, [30, 50], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const word2Opacity = interpolate(frame, [42, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const word2Y = interpolate(frame, [42, 62], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const word3Opacity = interpolate(frame, [54, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const word3Y = interpolate(frame, [54, 74], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Body text
  const bodyOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bodyY = interpolate(frame, [80, 110], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Bottom line
  const bottomLineWidth = interpolate(frame, [100, 135], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "#fafaf8",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Subtle texture lines */}
      {[0.25, 0.5, 0.75].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: pos * 100 + "%",
            width: 1,
            background: "rgba(0,0,0,0.04)",
          }}
        />
      ))}
      {[0.3, 0.5, 0.7].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: pos * 100 + "%",
            height: 1,
            background: "rgba(0,0,0,0.04)",
          }}
        />
      ))}

      {/* Center content */}
      <div style={{ textAlign: "center", maxWidth: 1000 }}>
        {/* Top rule */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 32, opacity: lineOpacity }}>
          <div style={{ height: 1, width: lineWidth / 2, background: "#1a1a1a", opacity: 0.4 }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a1a1a", opacity: 0.4 }} />
          <div style={{ height: 1, width: lineWidth / 2, background: "#1a1a1a", opacity: 0.4 }} />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            fontSize: 14,
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 700,
            color: "#666",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: 24,
            opacity: eyebrowOpacity,
            transform: `translateX(${eyebrowX}px)`,
          }}
        >
          2026 Annual Report
        </div>

        {/* Main title — staggered words */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
          <div style={{ fontSize: 110, fontWeight: 400, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1, opacity: word1Opacity, transform: `translateY(${word1Y}px)` }}>
            The
          </div>
          <div style={{ fontSize: 110, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1, opacity: word2Opacity, transform: `translateY(${word2Y}px)` }}>
            Future
          </div>
          <div style={{ fontSize: 110, fontStyle: "italic", fontWeight: 400, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1, opacity: word3Opacity, transform: `translateY(${word3Y}px)` }}>
            Is Now
          </div>
        </div>

        {/* Body copy */}
        <div
          style={{
            fontSize: 22,
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 400,
            color: "#888",
            lineHeight: 1.7,
            opacity: bodyOpacity,
            transform: `translateY(${bodyY}px)`,
            maxWidth: 700,
            margin: "0 auto",
          }}
        >
          A minimal, high-impact title card for your most important announcements, presentations, and documentary intros.
        </div>

        {/* Bottom rule */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 40 }}>
          <div style={{ height: 1, width: bottomLineWidth / 2, background: "#1a1a1a", opacity: 0.3 }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#1a1a1a", opacity: bottomLineWidth > 0 ? 0.3 : 0 }} />
          <div style={{ height: 1, width: bottomLineWidth / 2, background: "#1a1a1a", opacity: 0.3 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
