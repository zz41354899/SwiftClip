import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const EndScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subscribe button bounces in
  const subScale = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.6)),
  });
  const subOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bell icon ring
  const bellRing = Math.sin((frame - 80) * 0.5) * 12;
  const bellOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card 1 slides from left
  const card1X = interpolate(frame, [20, 55], [-500, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Card 2 slides from right
  const card2X = interpolate(frame, [35, 70], [500, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // CTA text types in
  const ctaOpacity = interpolate(frame, [65, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing ring around subscribe
  const pulseScale = interpolate(
    (frame - 120) % 60,
    [0, 30, 60],
    [1, 1.08, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.sin) }
  );

  return (
    <AbsoluteFill
      style={{
        background: "#0f0f0f",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Subtle top red bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#ff0000" }} />

      {/* Channel info top center */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 60, gap: 0 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #ff0000, #cc0000)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: "white", marginBottom: 12 }}>
          YC
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "white" }}>YourChannel</div>
        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>1.2M subscribers</div>

        {/* Subscribe button */}
        <div
          style={{
            transform: `scale(${frame > 120 ? subScale * pulseScale : subScale})`,
            opacity: subOpacity,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#ff0000",
              borderRadius: 100,
              padding: "14px 32px",
              fontSize: 18,
              fontWeight: 700,
              color: "white",
              boxShadow: "0 0 40px rgba(255,0,0,0.3)",
            }}
          >
            {/* Bell */}
            <div
              style={{
                opacity: bellOpacity,
                transform: frame > 80 && frame < 130 ? `rotate(${bellRing}deg)` : "rotate(0deg)",
                fontSize: 20,
              }}
            >
              🔔
            </div>
            SUBSCRIBE
          </div>
        </div>
      </div>

      {/* Video cards */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            width: 380,
            transform: `translateX(${card1X}px)`,
            opacity: frame > 20 ? 1 : 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 214,
              background: "linear-gradient(135deg, #1a1a2e, #16213e)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 48, opacity: 0.4 }}>▶</div>
            <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.8)", color: "white", fontSize: 12, fontWeight: 600, padding: "3px 8px", borderRadius: 4 }}>8:42</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white", lineHeight: 1.4, marginBottom: 4 }}>How to Build Animated Videos with Remotion</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>142K views · 3 days ago</div>
        </div>

        {/* Card 2 */}
        <div
          style={{
            width: 380,
            transform: `translateX(${card2X}px)`,
            opacity: frame > 35 ? 1 : 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 214,
              background: "linear-gradient(135deg, #0d1117, #1a1a2e)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div style={{ fontSize: 48, opacity: 0.4 }}>▶</div>
            <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.8)", color: "white", fontSize: 12, fontWeight: 600, padding: "3px 8px", borderRadius: 4 }}>12:15</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white", lineHeight: 1.4, marginBottom: 4 }}>10 Best Free Video Templates for Developers</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>98K views · 1 week ago</div>
        </div>
      </div>

      {/* CTA overlay text */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: ctaOpacity,
        }}
      >
        <div style={{ fontSize: 20, color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", fontWeight: 500 }}>
          THANKS FOR WATCHING
        </div>
      </div>
    </AbsoluteFill>
  );
};
