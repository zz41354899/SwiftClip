import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { Play } from "lucide-react";

interface TutorialIntroProps {
  title?: string;
  duration?: string;
  [key: string]: any;
}

export const TutorialIntro: React.FC<TutorialIntroProps> = ({
  title = "Getting Started",
  duration = "5 min",
}) => {
  const frame = useCurrentFrame();

  // Card slide in from left
  const cardX = interpolate(frame, [0, 40], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cardOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Play icon scale
  const playScale = interpolate(frame, [30, 80], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Bottom text fade
  const textOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #080810 0%, #0a0a14 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(100,140,255,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.5,
        }}
      />

      {/* Main card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          transform: `translateX(${cardX}px)`,
          opacity: cardOpacity,
        }}
      >
        {/* Play button circle */}
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            border: "2px solid rgba(192, 192, 192, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${playScale})`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ffffff 0%, #c0c0c0 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ color: "#080810", marginLeft: 3 }}>▶</div>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>

        {/* Duration badge */}
        <div
          style={{
            opacity: textOpacity,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 24,
            background: "rgba(192, 192, 192, 0.1)",
            border: "1px solid rgba(192, 192, 192, 0.2)",
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <span>⏱️</span>
          <span>{duration}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
