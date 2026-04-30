import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface SocialStoryProps {
  headline?: string;
  subline?: string;
  handle?: string;
  [key: string]: any;
}

export const SocialStory: React.FC<SocialStoryProps> = ({
  headline = "SwiftClip",
  subline = "Remotion templates that ship fast",
  handle = "@swiftclip",
}) => {
  const frame = useCurrentFrame();

  const bgGradientY = interpolate(frame, [0, 300], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineY = interpolate(frame, [20, 60], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const headlineOpacity = interpolate(frame, [20, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sublineY = interpolate(frame, [50, 90], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const sublineOpacity = interpolate(frame, [50, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeScale = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const handleOpacity = interpolate(frame, [220, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated gradient blob
  const blob1X = interpolate(frame, [0, 300], [-100, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blob2X = interpolate(frame, [0, 300], [200, -60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(to bottom, #0f0a1e ${bgGradientY}%, #1a0533 60%, #0d0d1a 100%)`,
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated blobs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 65%)",
          filter: "blur(60px)",
          top: -200,
          left: blob1X,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 65%)",
          filter: "blur(80px)",
          bottom: -150,
          right: blob2X,
        }}
      />

      {/* Top logo / handle */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: logoOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            borderRadius: 100,
            padding: "12px 28px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            }}
          />
          <span style={{ color: "#fff", fontSize: 28, fontWeight: 600 }}>
            SwiftClip
          </span>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            borderRadius: 100,
            padding: "10px 32px",
            fontSize: 26,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          New Template
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#ffffff",
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            letterSpacing: "-0.03em",
            backgroundImage:
              "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {headline}
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 400,
            color: "rgba(255,255,255,0.65)",
            opacity: sublineOpacity,
            transform: `translateY(${sublineY}px)`,
            lineHeight: 1.4,
          }}
        >
          {subline}
        </div>
      </div>

      {/* Bottom handle */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: handleOpacity,
        }}
      >
        <span
          style={{
            fontSize: 30,
            color: "rgba(255,255,255,0.45)",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {handle}
        </span>
      </div>
    </AbsoluteFill>
  );
};
