import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface ProductLaunchProps {
  title?: string;
  subtitle?: string;
  [key: string]: any;
}

export const ProductLaunch: React.FC<ProductLaunchProps> = ({
  title = "SwiftClip",
  subtitle = "High-performance Remotion templates",
}) => {
  const frame = useCurrentFrame();

  // Title entrance: fade in from frame 0-30
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 40], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Subtitle entrance: fade in from frame 30-60
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [30, 70], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Background glow scale
  const glowScale = interpolate(frame, [0, 150], [0.8, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#080810",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(192,192,192,0.3) 0%, transparent 70%)",
          filter: `blur(60px)`,
          opacity: 0.4,
          transform: `scale(${glowScale})`,
          top: "-20%",
          left: "-10%",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: 30,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            backgroundImage:
              "linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #8c8c8c 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 300,
            color: "rgba(255, 255, 255, 0.6)",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            maxWidth: 800,
            lineHeight: 1.4,
            letterSpacing: "0.5px",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          width: 120,
          height: 3,
          background:
            "linear-gradient(90deg, transparent, #c0c0c0, transparent)",
          opacity: interpolate(frame, [100, 150], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
