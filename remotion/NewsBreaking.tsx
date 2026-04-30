import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const NewsBreaking: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red bar sweeps in from left
  const barX = interpolate(frame, [5, 30], [-300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const breakingOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ticker scrolls right to left from frame 40 onward
  const tickerX = interpolate(frame, [40, 280], [1920, -3000], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tickerOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main headline drops in
  const headlineY = interpolate(frame, [25, 55], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const headlineOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo/network badge
  const badgeOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flashing "LIVE" indicator
  const livePulse = Math.sin(frame * 0.25) > 0;

  // Time and info bar
  const infoOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
        fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Background photo placeholder */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0d0d1a 0%, #1a1a0d 50%, #0d1a1a 100%)",
          opacity: 0.8,
        }}
      />

      {/* Network logo top-left */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 40,
          opacity: badgeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            background: "#ff0000",
            color: "white",
            fontWeight: 900,
            fontSize: 20,
            padding: "8px 18px",
            borderRadius: 4,
            letterSpacing: "0.1em",
          }}
        >
          NEWS24
        </div>
        {/* LIVE badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,0,0,0.15)",
            border: "1px solid rgba(255,0,0,0.4)",
            padding: "6px 14px",
            borderRadius: 4,
            opacity: livePulse ? 1 : 0.5,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff0000" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#ff4444", letterSpacing: "0.15em" }}>LIVE</span>
        </div>
      </div>

      {/* Time */}
      <div
        style={{
          position: "absolute",
          top: 38,
          right: 40,
          fontSize: 18,
          color: "rgba(255,255,255,0.5)",
          fontWeight: 500,
          opacity: badgeOpacity,
        }}
      >
        09:42 AM · APR 30, 2026
      </div>

      {/* Main headline area */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        {/* BREAKING bar */}
        <div
          style={{
            background: "#ff0000",
            padding: "12px 40px",
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            transform: `translateX(${barX}px)`,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "0.2em" }}>
            ⚡ BREAKING NEWS
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            background: "rgba(0,0,0,0.88)",
            padding: "20px 40px",
            fontSize: 42,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.3,
            maxWidth: "80%",
          }}
        >
          Major Breakthrough in Video Automation Technology Announced
        </div>

        {/* Sub-headline */}
        <div
          style={{
            background: "rgba(0,0,0,0.75)",
            padding: "12px 40px",
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
            opacity: infoOpacity,
          }}
        >
          SwiftClip releases 20 new templates for developers · Full story developing
        </div>
      </div>

      {/* Ticker */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 48,
          background: "#ff0000",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          opacity: tickerOpacity,
        }}
      >
        <div
          style={{
            background: "#cc0000",
            padding: "0 20px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 900, color: "white", letterSpacing: "0.1em" }}>LATEST</span>
        </div>
        <div style={{ transform: `translateX(${tickerX}px)`, whiteSpace: "nowrap", fontSize: 18, fontWeight: 600, color: "white", letterSpacing: "0.03em" }}>
          ● SwiftClip launches 20 new video templates &nbsp;&nbsp;&nbsp;●&nbsp;&nbsp;&nbsp; Remotion v5 release expected Q3 2026 &nbsp;&nbsp;&nbsp;●&nbsp;&nbsp;&nbsp; Video automation market hits $12B &nbsp;&nbsp;&nbsp;●&nbsp;&nbsp;&nbsp; Developer tools surge in popularity
        </div>
      </div>
    </AbsoluteFill>
  );
};
