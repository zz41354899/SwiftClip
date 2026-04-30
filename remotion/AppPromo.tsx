import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const FEATURES = [
  { title: "Smart Sync", desc: "Auto-syncs to beats", icon: "⚡" },
  { title: "One Click", desc: "Export anywhere", icon: "🚀" },
  { title: "Open Source", desc: "Fully customizable", icon: "💎" },
];

export const AppPromo: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerOpacity = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerY = interpolate(frame, [5, 30], [-50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // App mockup scales up from bottom
  const mockupScale = interpolate(frame, [20, 60], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.1)),
  });

  const mockupOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating notification badge
  const notifOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const notifY = interpolate(frame, [70, 90], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const ctaOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = interpolate(frame, [200, 230], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // Pulsing download button
  const pulseCycle = (frame - 240) % 50;
  const pulseScale = frame > 240
    ? interpolate(pulseCycle, [0, 25, 50], [1, 1.04, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.sin),
      })
    : 1;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #06060c 0%, #0f0e24 45%, #06060c 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 80,
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* BG blobs */}
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", top: "20%", filter: "blur(100px)" }} />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 48,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>
          Available Now
        </div>
        <div style={{ fontSize: 72, fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 0.95 }}>
          SwiftClip
          <br />
          <span style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mobile</span>
        </div>
      </div>

      {/* App mockup phone */}
      <div
        style={{
          width: 340,
          height: 520,
          transform: `scale(${mockupScale})`,
          opacity: mockupOpacity,
          position: "relative",
          marginBottom: 48,
        }}
      >
        {/* Phone frame */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.06)",
            border: "2px solid rgba(255,255,255,0.12)",
            borderRadius: 52,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
          }}
        >
          {/* Screen top bar */}
          <div style={{ height: 40, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 60, height: 6, borderRadius: 100, background: "rgba(255,255,255,0.15)" }} />
          </div>

          {/* Screen content */}
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ height: 140, borderRadius: 16, background: "linear-gradient(135deg, #6366f1, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 40 }}>▶</span>
            </div>
            {[80, 60, 70].map((w, i) => {
              const barOpacity = interpolate(frame, [55 + i * 12, 75 + i * 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ height: 16, borderRadius: 8, background: "rgba(255,255,255,0.07)", width: "100%", overflow: "hidden", opacity: barOpacity }}>
                  <div style={{ height: "100%", width: w + "%", background: `rgba(${i === 0 ? "99,102,241" : i === 1 ? "168,85,247" : "236,72,153"},0.5)`, borderRadius: 8 }} />
                </div>
              );
            })}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
              {[1, 2, 3, 4].map((n) => {
                const sqOpacity = interpolate(frame, [80 + n * 8, 100 + n * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return <div key={n} style={{ height: 60, borderRadius: 12, background: "rgba(255,255,255,0.05)", opacity: sqOpacity }} />;
              })}
            </div>
          </div>
        </div>

        {/* Floating notification */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: -80,
            background: "rgba(22,22,40,0.95)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            opacity: notifOpacity,
            transform: `translateY(${notifY}px)`,
            width: 180,
          }}
        >
          <div style={{ fontSize: 22 }}>🎬</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "white" }}>Render complete!</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>my-promo.mp4 ready</div>
          </div>
        </div>
      </div>

      {/* Feature pills */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 380 }}>
        {FEATURES.map((f, i) => {
          const fOpacity = interpolate(frame, [110 + i * 20, 135 + i * 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const fX = interpolate(frame, [110 + i * 20, 135 + i * 20], [-30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "14px 20px",
                opacity: fOpacity,
                transform: `translateX(${fX}px)`,
              }}
            >
              <span style={{ fontSize: 24 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{f.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: 40,
          background: "linear-gradient(135deg, #6366f1, #a855f7)",
          borderRadius: 100,
          padding: "20px 56px",
          fontSize: 22,
          fontWeight: 700,
          color: "white",
          opacity: ctaOpacity,
          transform: `scale(${ctaScale * pulseScale})`,
          boxShadow: "0 16px 50px rgba(99,102,241,0.35)",
        }}
      >
        Download Free →
      </div>
    </AbsoluteFill>
  );
};
