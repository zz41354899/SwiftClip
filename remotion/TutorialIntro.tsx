import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { Play, Clock } from "lucide-react";

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

  const cardY = interpolate(frame, [0, 40], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cardOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const playScale = interpolate(frame, [30, 80], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const textOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 48,
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          borderRadius: 48,
          padding: "100px 140px",
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${playScale})`,
            backdropFilter: "blur(40px)",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={40} fill="#000" color="#000" style={{ marginLeft: 6 }} />
          </div>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#1d1d1f",
            textAlign: "center",
            letterSpacing: "-0.04em",
            maxWidth: 600,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>

        <div
          style={{
            opacity: textOpacity,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 32px",
            borderRadius: 32,
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.05)",
            fontSize: 24,
            fontWeight: 600,
            color: "#1d1d1f",
          }}
        >
          <Clock size={24} color="rgba(255,255,255,0.6)" />
          <span>{duration}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
