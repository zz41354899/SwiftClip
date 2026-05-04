import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { AtSign, Sparkles, Video } from "lucide-react";

interface SocialStoryTemplateProps {
  headline?: string;
  subheadline?: string;
  brandHandle?: string;
  subline?: string;
  handle?: string;
}

export const SocialStory: React.FC<SocialStoryTemplateProps> = (props) => {
  const headline = props.headline ?? "SwiftClip";
  const subheadline = props.subheadline ?? props.subline ?? "Remotion templates that ship fast";
  const brandHandle = props.brandHandle ?? props.handle ?? "@swiftclip";
  const frame = useCurrentFrame();

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

  return (
    <AbsoluteFill
      style={{
        background: "#f5f5f7",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(40px)",
            borderRadius: 64,
            padding: "16px 32px",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#0066cc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Video size={18} color="white" />
          </div>
          <span style={{ color: "#1d1d1f", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>
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
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            borderRadius: 64,
            padding: "12px 32px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 14,
            fontWeight: 700,
            color: "#1d1d1f",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          <Sparkles size={20} color="#0066cc" />
          New Template
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#1d1d1f",
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            letterSpacing: "-0.04em",
          }}
        >
          {headline}
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: "#86868b",
            opacity: sublineOpacity,
            transform: `translateY(${sublineY}px)`,
            letterSpacing: "-0.01em",
            maxWidth: 600,
          }}
        >
          {subheadline}
        </div>
      </div>

      {/* Bottom handle */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: handleOpacity,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 24,
          fontWeight: 600,
          color: "#86868b",
          letterSpacing: "-0.01em",
        }}
      >
        <AtSign size={24} />
        {brandHandle.replace("@", "")}
      </div>
    </AbsoluteFill>
  );
};
