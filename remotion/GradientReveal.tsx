import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const DEFAULT_GRADIENT_STOPS = [
  "#007AFF 33%",
  "#5856D6 43%",
  "#AF52DE 53%",
  "#FF2D55 60%",
  "rgba(0,0,0,0.05) 75%",
  "rgba(0,0,0,0) 100%",
];

interface GradientRevealTemplateProps {
  symbol?: string;
  subtitle?: string;
  backgroundColor?: string;
  gradientStops?: string[];
  glyph?: string;
  subheadline?: string;
  bgColor?: string;
  gradientColors?: string[];
}

export const GradientReveal: React.FC<GradientRevealTemplateProps> = (props) => {
  const symbol = props.symbol ?? props.glyph ?? "apple";
  const subtitle = props.subtitle ?? props.subheadline ?? "Pro performance. Unprecedented reveal.";
  const backgroundColor = props.backgroundColor ?? props.bgColor ?? "#f5f5f7";
  const rawStops = (props.gradientStops ?? props.gradientColors ?? []).map((s) => s.trim()).filter(Boolean);
  const gradientStops = rawStops.length >= 2 ? rawStops : DEFAULT_GRADIENT_STOPS;
  const frame = useCurrentFrame();

  // Background fade in
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text scaling out slightly for cinematic feel
  const textScale = interpolate(frame, [20, 120], [0.92, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Gradient animation sweeping across the text
  const gradientPos = interpolate(frame, [20, 95], [100, 0], {
     extrapolateLeft: "clamp",
     extrapolateRight: "clamp",
     easing: Easing.inOut(Easing.cubic),
  });

  // Fade in subtitle
  const subOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subY = interpolate(frame, [80, 110], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        opacity: bgOpacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* 
        This is the Apple-style gradient text reveal. 
        Instead of moving the text itself, we move the background gradient 
        over the text, clipping the background to the text and dropping the fill.
      */}
      {/* Eyebrow label */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#86868b",
          marginBottom: 32,
          opacity: bgOpacity,
        }}
      >
        Introducing
      </div>

      <div
        style={{
          fontSize: 160,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 0.95,
          textAlign: "center",
          transform: `scale(${textScale})`,
          backgroundImage: `linear-gradient(90deg, #1d1d1f 0%, #1d1d1f 28%, #007AFF 40%, #5856D6 52%, #AF52DE 62%, #FF2D55 70%, #1d1d1f 85%, #1d1d1f 100%)`,
          backgroundSize: "300% auto",
          backgroundPosition: `${gradientPos}% center`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "#1d1d1f",
          padding: "10px 60px",
        }}
      >
        apple
      </div>

      {/* Subtitle fading in softly at the end */}
      <div
        style={{
          marginTop: 36,
          fontSize: 26,
          fontWeight: 400,
          color: "#86868b",
          letterSpacing: "-0.01em",
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
