import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { Sparkles, Ship, ArrowRightCircle } from "lucide-react";

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
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        overflow: "hidden",
      }}
    >
      {/* Background soft lighting */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)",
          filter: `blur(80px)`,
          opacity: 0.8,
          transform: `scale(${glowScale}) translate3d(0,0,0)`,
          top: "50%",
          left: "50%",
          marginTop: -400,
          marginLeft: -400,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
          <div
            style={{
              fontSize: 140,
              fontWeight: 800,
              lineHeight: 1,
              color: "#1d1d1f",
              letterSpacing: "-0.04em",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <Ship size={110} color="#1d1d1f" strokeWidth={2.5} />
            {title}
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 500,
            color: "#0066cc",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            maxWidth: 900,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            margin: "0 auto",
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Bottom accent area */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          opacity: interpolate(frame, [100, 150], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 12, 
          color: "#f5f5f7", 
          fontSize: 24, 
          fontWeight: 600, 
          letterSpacing: "-0.01em",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          padding: "16px 32px",
          borderRadius: 40,
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
        }}>
          <Sparkles size={24} color="#1d1d1f" strokeWidth={2} />
          Join the waitlist
          <ArrowRightCircle size={24} color="#1d1d1f" strokeWidth={2} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
