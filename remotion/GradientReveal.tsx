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
  const symbol = props.symbol ?? props.glyph ?? "";
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
  const gradientPos = interpolate(frame, [20, 95], [250, -50], {
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
      <div
        style={{
          fontSize: 280,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          textAlign: "center",
          transform: `scale(${textScale})`,
          backgroundImage: `linear-gradient(75deg, #1d1d1f 0%, #1d1d1f 23%, ${gradientStops.join(", ")})`,
          backgroundSize: "300% auto",
          backgroundPosition: `${gradientPos}% center`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          // Fallback text color for transparency support
          color: "rgba(0,0,0,0.03)",
          padding: "20px 0", // Give breathing room so clipping doesn't cut tall letters
        }}
      >
        {symbol}
      </div>

      {/* Subtitle fading in softly at the end */}
      <div
        style={{
          marginTop: 40,
          fontSize: 32,
          fontWeight: 500,
          color: "#86868b", // Apple's signature gray for dark mode
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
