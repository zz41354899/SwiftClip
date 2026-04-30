import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const FEATURES = [
  { emoji: "⚡", text: "10× faster than manual editing" },
  { emoji: "🎨", text: "Beautiful, production-ready templates" },
  { emoji: "🚀", text: "Ship polished video in minutes" },
];
const FEATURE_DELAYS = [70, 92, 114];

export const VerticalStory: React.FC = () => {
  const frame = useCurrentFrame();

  const badgeOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineY = interpolate(frame, [20, 50], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subOpacity = interpolate(frame, [45, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [145, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = interpolate(frame, [145, 170], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // Subtle pulse after CTA appears
  const pulseCycle = (frame - 170) % 60;
  const pulseScale =
    frame > 170
      ? interpolate(pulseCycle, [0, 30, 60], [1, 1.03, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.sin),
        })
      : 1;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0a0a14 0%, #12102a 45%, #0d1a2e 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 72px",
        overflow: "hidden",
      }}
    >
      {/* Background glow blobs */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          top: "-15%",
          left: "-25%",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          bottom: "5%",
          right: "-15%",
          filter: "blur(60px)",
        }}
      />

      {/* Pill badge */}
      <div
        style={{
          padding: "14px 32px",
          background: "rgba(99,102,241,0.12)",
          border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: 100,
          fontSize: 28,
          color: "#a5b4fc",
          fontWeight: 600,
          letterSpacing: "0.04em",
          marginBottom: 52,
          opacity: badgeOpacity,
        }}
      >
        New in 2026 ✦
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          lineHeight: 1.08,
          textAlign: "center",
          color: "white",
          letterSpacing: "-0.03em",
          marginBottom: 32,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        Make Videos
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          10× Faster
        </span>
      </div>

      {/* Sub-headline */}
      <p
        style={{
          fontSize: 34,
          color: "rgba(255,255,255,0.45)",
          textAlign: "center",
          lineHeight: 1.55,
          marginBottom: 72,
          opacity: subOpacity,
          maxWidth: 860,
        }}
      >
        Production-ready Remotion templates
        <br />
        for developers & creators
      </p>

      {/* Feature cards */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginBottom: 72,
        }}
      >
        {FEATURES.map((f, i) => {
          const delay = FEATURE_DELAYS[i];
          const fOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fX = interpolate(frame, [delay, delay + 20], [-40, 0], {
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
                gap: 24,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "26px 36px",
                opacity: fOpacity,
                transform: `translateX(${fX}px)`,
              }}
            >
              <span style={{ fontSize: 44 }}>{f.emoji}</span>
              <span
                style={{
                  fontSize: 30,
                  color: "rgba(255,255,255,0.82)",
                  fontWeight: 500,
                }}
              >
                {f.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      <div
        style={{
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          borderRadius: 22,
          padding: "34px 72px",
          fontSize: 38,
          fontWeight: 700,
          color: "white",
          opacity: ctaOpacity,
          transform: `scale(${ctaScale * pulseScale})`,
          boxShadow: "0 20px 60px rgba(99,102,241,0.35)",
          letterSpacing: "0.01em",
        }}
      >
        Browse Templates →
      </div>
    </AbsoluteFill>
  );
};
