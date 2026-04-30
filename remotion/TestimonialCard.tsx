import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const TestimonialCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardScale = interpolate(frame, [10, 45], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const cardOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const starsOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quoteOpacity = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quoteY = interpolate(frame, [55, 85], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const authorOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const authorX = interpolate(frame, [90, 120], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const quoteMarkOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quoteMarkScale = interpolate(frame, [20, 45], [1.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(145deg, #0a0a12 0%, #12102a 50%, #0a1020 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        opacity: bgOpacity,
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          top: "-5%",
          right: "5%",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          bottom: "10%",
          left: "0%",
          filter: "blur(40px)",
        }}
      />

      {/* Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 36,
          padding: "72px 80px",
          width: 880,
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Inner top border highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />

        {/* Quote mark */}
        <div
          style={{
            fontSize: 160,
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#6366f1",
            lineHeight: 0.7,
            marginBottom: 24,
            opacity: quoteMarkOpacity * 0.5,
            transform: `scale(${quoteMarkScale})`,
            transformOrigin: "left center",
            display: "block",
          }}
        >
          ❝
        </div>

        {/* Stars */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 32,
            opacity: starsOpacity,
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              style={{
                fontSize: 36,
                color: "#f59e0b",
                textShadow: "0 0 20px rgba(245,158,11,0.5)",
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Quote text */}
        <p
          style={{
            fontSize: 34,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.88)",
            fontWeight: 400,
            margin: "0 0 48px",
            opacity: quoteOpacity,
            transform: `translateY(${quoteY}px)`,
          }}
        >
          "SwiftClip completely changed our content workflow. We produce 10×
          more video content at a fraction of the cost — and the team loves it."
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.08)",
            marginBottom: 40,
            opacity: authorOpacity,
          }}
        />

        {/* Author row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            opacity: authorOpacity,
            transform: `translateX(${authorX}px)`,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "white",
              flexShrink: 0,
              boxShadow: "0 0 0 2px rgba(99,102,241,0.4)",
            }}
          >
            SL
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "white",
                marginBottom: 4,
              }}
            >
              Sarah Lin
            </div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.45)" }}>
              Head of Marketing · Acme Corp
            </div>
          </div>

          {/* Company badge */}
          <div
            style={{
              padding: "8px 20px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 100,
              fontSize: 16,
              fontWeight: 600,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.08em",
            }}
          >
            ACME
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
