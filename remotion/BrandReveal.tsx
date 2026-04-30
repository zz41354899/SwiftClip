import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const BRAND_NAME = "BRAND";
const LINE_OFFSETS = [-240, -120, 0, 120, 240];

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();

  // Logo mark springs in
  const logoScale = interpolate(frame, [5, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const logoOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoRotation = interpolate(frame, [5, 45], [45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Brand name character reveal
  const charRevealCount = Math.floor(
    interpolate(frame, [35, 75], [0, BRAND_NAME.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const nameOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent line extends under name
  const lineWidth = interpolate(frame, [70, 115], [0, 640], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline fades up
  const tagOpacity = interpolate(frame, [82, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagY = interpolate(frame, [82, 115], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Corner markers
  const cornerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scan line sweeps top to bottom
  const scanY = interpolate(frame, [20, 130], [-50, 1130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scanOpacity = interpolate(frame, [20, 30, 120, 135], [0, 0.5, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#050508",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Horizontal grid lines expand from center */}
      {LINE_OFFSETS.map((offsetY, i) => {
        const delay = i * 3;
        const lp = interpolate(frame, [delay, delay + 25], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              height: 1,
              background: "rgba(255,255,255,0.05)",
              top: "50%",
              marginTop: offsetY,
              left: (1 - lp) * 50 + "%",
              right: (1 - lp) * 50 + "%",
            }}
          />
        );
      })}

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.8) 50%, transparent 100%)",
          top: scanY,
          opacity: scanOpacity,
          boxShadow: "0 0 20px rgba(99,102,241,0.6)",
        }}
      />

      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
            opacity: logoOpacity,
            transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
            boxShadow:
              "0 0 60px rgba(99,102,241,0.4), 0 0 120px rgba(99,102,241,0.2)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(255,255,255,0.9)",
              transform: "rotate(15deg)",
            }}
          />
        </div>

        {/* Brand name — character by character reveal */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: "0.15em",
            color: "white",
            opacity: nameOpacity,
            display: "flex",
          }}
        >
          {BRAND_NAME.split("").map((char, i) => {
            const visible = i < charRevealCount;
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0px)" : "translateY(24px)",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Accent line */}
        <div
          style={{
            height: 2,
            width: lineWidth,
            background:
              "linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)",
            marginTop: 16,
            opacity: lineOpacity,
            boxShadow: "0 0 20px rgba(99,102,241,0.5)",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.4em",
            fontWeight: 500,
            textTransform: "uppercase",
            marginTop: 24,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
          }}
        >
          Your tagline goes here
        </div>
      </div>

      {/* Corner frame markers */}
      <div style={{ position: "absolute", top: 60, left: 60, opacity: cornerOpacity }}>
        <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.25)" }} />
        <div style={{ width: 2, height: 40, background: "rgba(255,255,255,0.25)" }} />
      </div>
      <div style={{ position: "absolute", top: 60, right: 60, opacity: cornerOpacity, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.25)" }} />
        <div style={{ width: 2, height: 40, background: "rgba(255,255,255,0.25)" }} />
      </div>
      <div style={{ position: "absolute", bottom: 60, left: 60, opacity: cornerOpacity }}>
        <div style={{ width: 2, height: 40, background: "rgba(255,255,255,0.25)" }} />
        <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.25)" }} />
      </div>
      <div style={{ position: "absolute", bottom: 60, right: 60, opacity: cornerOpacity, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <div style={{ width: 2, height: 40, background: "rgba(255,255,255,0.25)" }} />
        <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.25)" }} />
      </div>
    </AbsoluteFill>
  );
};
