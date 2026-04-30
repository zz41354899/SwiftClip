import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface DataVizProps {
  title?: string;
  metric?: string;
  label?: string;
  [key: string]: any;
}

const BAR_DATA = [
  { label: "Q1", value: 0.55, color: "#6366f1" },
  { label: "Q2", value: 0.72, color: "#8b5cf6" },
  { label: "Q3", value: 0.48, color: "#6366f1" },
  { label: "Q4", value: 0.91, color: "#a78bfa" },
  { label: "Jan", value: 0.64, color: "#6366f1" },
  { label: "Feb", value: 0.83, color: "#8b5cf6" },
  { label: "Mar", value: 0.76, color: "#6366f1" },
];

function AnimatedBar({
  value,
  label,
  color,
  delay,
  frame,
  maxHeight,
}: {
  value: number;
  label: string;
  color: string;
  delay: number;
  frame: number;
  maxHeight: number;
}) {
  const barH = interpolate(frame, [delay, delay + 50], [0, value * maxHeight], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 12,
        flex: 1,
        opacity,
      }}
    >
      <div
        style={{
          width: "100%",
          height: barH,
          background: `linear-gradient(to top, ${color}, ${color}99)`,
          borderRadius: "8px 8px 0 0",
          position: "relative",
        }}
      />
      <span
        style={{
          fontSize: 22,
          color: "rgba(255,255,255,0.45)",
          fontWeight: 500,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export const DataViz: React.FC<DataVizProps> = ({
  title = "Revenue Growth",
  metric = "+91%",
  label = "Year-over-Year",
}) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 40], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const metricOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const counterValue = interpolate(frame, [40, 200], [0, 91], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineWidth = interpolate(frame, [0, 80], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a14 0%, #0d0821 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        padding: "80px 100px",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid lines */}
      {[0.25, 0.5, 0.75, 1].map((v) => (
        <div
          key={v}
          style={{
            position: "absolute",
            left: 100,
            right: 100,
            bottom: `${v * 340 + 180}px`,
            height: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        />
      ))}

      {/* Header */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#6366f1",
            marginBottom: 12,
          }}
        >
          Analytics
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        {/* Underline */}
        <div
          style={{
            height: 3,
            width: `${lineWidth}%`,
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, transparent)",
            borderRadius: 4,
            marginTop: 16,
          }}
        />
      </div>

      {/* Metric counter */}
      <div
        style={{
          opacity: metricOpacity,
          marginBottom: 48,
          display: "flex",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: "#a78bfa",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          +{Math.round(counterValue)}%
        </span>
        <span
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {label}
        </span>
      </div>

      {/* Bars */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: 20,
        }}
      >
        {BAR_DATA.map((bar, i) => (
          <AnimatedBar
            key={bar.label}
            value={bar.value}
            label={bar.label}
            color={bar.color}
            delay={60 + i * 15}
            frame={frame}
            maxHeight={340}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
