import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface LowerThirdProps {
  name?: string;
  title?: string;
  company?: string;
  [key: string]: any;
}

export const LowerThird: React.FC<LowerThirdProps> = ({
  name = "Alex Johnson",
  title = "Head of Design",
  company = "SwiftClip",
}) => {
  const frame = useCurrentFrame();

  // Bar slide in from left
  const barX = interpolate(frame, [0, 35], [-600, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Name text
  const nameOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameX = interpolate(frame, [20, 50], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Title / company text
  const subOpacity = interpolate(frame, [35, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subX = interpolate(frame, [35, 65], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Fade out near end
  const overallOpacity = interpolate(frame, [110, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        // Transparent background — this overlays on any video
        background: "transparent",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        alignItems: "flex-end",
        padding: "0 80px 120px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          opacity: overallOpacity,
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: 0,
          transform: `translateX(${barX}px)`,
          overflow: "hidden",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: 6,
            background: "linear-gradient(to bottom, #6366f1, #8b5cf6)",
            borderRadius: "4px 0 0 4px",
            minHeight: 80,
          }}
        />

        {/* Text block */}
        <div
          style={{
            background: "rgba(9, 9, 15, 0.82)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0 12px 12px 0",
            padding: "20px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              opacity: nameOpacity,
              transform: `translateX(${nameX}px)`,
            }}
          >
            {name}
          </div>

          {/* Title + company */}
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.55)",
              fontWeight: 400,
              opacity: subOpacity,
              transform: `translateX(${subX}px)`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span>{title}</span>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#6366f1",
                display: "inline-block",
              }}
            />
            <span
              style={{
                color: "#8b5cf6",
                fontWeight: 600,
              }}
            >
              {company}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
