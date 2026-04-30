import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const FEATURES = [
  "Real-time collaboration",
  "99.9% uptime SLA",
  "End-to-end encryption",
  "One-click integrations",
];

export const PricingCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardScale = interpolate(frame, [10, 45], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  const cardOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const priceOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const priceY = interpolate(frame, [40, 65], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const ctaScale = interpolate(frame, [130, 160], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  const ctaOpacity = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge pulse
  const badgePulse = Math.sin(frame * 0.15) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(145deg, #09090f, #0f0e1f)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)", filter: "blur(80px)" }} />

      {/* Rotating border ring */}
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          border: "1px dashed rgba(99,102,241,0.12)",
          transform: `rotate(${frame * 0.3}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 820,
          height: 820,
          borderRadius: "50%",
          border: "1px dashed rgba(168,85,247,0.08)",
          transform: `rotate(${-frame * 0.2}deg)`,
        }}
      />

      {/* Card */}
      <div
        style={{
          width: 780,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 36,
          padding: "56px 64px",
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient border top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)" }} />

        {/* Popular badge */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            padding: "6px 16px",
            borderRadius: 100,
            letterSpacing: "0.05em",
            transform: `scale(${badgePulse})`,
            boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
          }}
        >
          MOST POPULAR
        </div>

        {/* Plan name */}
        <div style={{ fontSize: 14, fontWeight: 600, color: "#a5b4fc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
          Pro Plan
        </div>

        {/* Price */}
        <div
          style={{
            opacity: priceOpacity,
            transform: `translateY(${priceY}px)`,
            marginBottom: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>$</span>
            <span style={{ fontSize: 100, fontWeight: 900, color: "white", lineHeight: 1, letterSpacing: "-0.04em" }}>79</span>
            <span style={{ fontSize: 22, color: "rgba(255,255,255,0.3)", marginTop: 18, marginLeft: 4 }}>/mo</span>
          </div>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>Billed annually · Save 40%</div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 28 }} />

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {FEATURES.map((feat, i) => {
            const fOpacity = interpolate(frame, [70 + i * 15, 90 + i * 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const fX = interpolate(frame, [70 + i * 15, 90 + i * 15], [-20, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, opacity: fOpacity, transform: `translateX(${fX}px)` }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(99,102,241,0.2)", border: "1px solid #6366f1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1" }} />
                </div>
                <span style={{ fontSize: 18, color: "rgba(255,255,255,0.75)" }}>{feat}</span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            borderRadius: 16,
            padding: "22px 0",
            textAlign: "center",
            fontSize: 20,
            fontWeight: 700,
            color: "white",
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            boxShadow: "0 12px 40px rgba(99,102,241,0.35)",
            letterSpacing: "0.02em",
          }}
        >
          Start Free Trial →
        </div>
      </div>
    </AbsoluteFill>
  );
};
