import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const SubscribeCTA: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Channel avatar springs in
  const avatarScale = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.6)),
  });

  const avatarOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameY = interpolate(frame, [35, 55], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subCountOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonScale = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const buttonOpacity = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bell shake
  const bellAngle = frame > 110 && frame < 145
    ? Math.sin((frame - 110) * 0.7) * 20 * Math.max(0, 1 - (frame - 110) / 35)
    : 0;

  // Ripple rings around button
  const ring1 = (frame - 100) % 60;
  const ring1Scale = interpolate(ring1, [0, 60], [1, 2.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ring1Opacity = frame > 100 ? interpolate(ring1, [0, 60], [0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  const ring2 = (frame - 120) % 60;
  const ring2Scale = interpolate(ring2, [0, 60], [1, 2.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ring2Opacity = frame > 120 ? interpolate(ring2, [0, 60], [0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;

  const ctaOpacity = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0f0f0f",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity,
        overflow: "hidden",
        gap: 0,
      }}
    >
      {/* Red top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#ff0000" }} />

      {/* Ambient glow */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />

      {/* Channel avatar */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ff0000, #cc0000)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
          fontWeight: 900,
          color: "white",
          marginBottom: 28,
          transform: `scale(${avatarScale})`,
          opacity: avatarOpacity,
          boxShadow: "0 0 0 4px rgba(255,0,0,0.2)",
        }}
      >
        YT
      </div>

      {/* Channel name */}
      <div style={{ opacity: nameOpacity, transform: `translateY(${nameY}px)`, textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 40, fontWeight: 800, color: "white", letterSpacing: "-0.01em" }}>YourChannel</div>
      </div>

      {/* Subscriber count */}
      <div style={{ fontSize: 20, color: "rgba(255,255,255,0.35)", marginBottom: 48, opacity: subCountOpacity }}>
        1.2M subscribers
      </div>

      {/* Subscribe button with ripple */}
      <div style={{ position: "relative", marginBottom: 36 }}>
        {/* Ripple rings */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 100, border: "2px solid rgba(255,0,0,0.5)", transform: `scale(${ring1Scale})`, opacity: ring1Opacity, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: 100, border: "2px solid rgba(255,0,0,0.5)", transform: `scale(${ring2Scale})`, opacity: ring2Opacity, pointerEvents: "none" }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "#ff0000",
            borderRadius: 100,
            padding: "20px 48px",
            fontSize: 26,
            fontWeight: 700,
            color: "white",
            transform: `scale(${buttonScale})`,
            opacity: buttonOpacity,
            boxShadow: "0 8px 40px rgba(255,0,0,0.35)",
          }}
        >
          <span style={{ fontSize: 28, transform: `rotate(${bellAngle}deg)`, display: "inline-block", transformOrigin: "top center" }}>🔔</span>
          SUBSCRIBE
        </div>
      </div>

      {/* "Don't miss out" text */}
      <div
        style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          opacity: ctaOpacity,
        }}
      >
        New videos every week
      </div>

      {/* Bottom bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "#ff0000" }} />
    </AbsoluteFill>
  );
};
