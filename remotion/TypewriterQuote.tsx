import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Quote } from "lucide-react";

const QUOTE = "The best time to plant a tree was 20 years ago. The second best time is now.";
const AUTHOR = "Chinese Proverb";

export const TypewriterQuote: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const charCount = Math.floor(
    interpolate(frame, [20, 160], [0, QUOTE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    })
  );

  const cursorVisible = frame % 15 < 8;
  const showCursor = charCount < QUOTE.length || cursorVisible;

  const authorOpacity = interpolate(frame, [170, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const authorY = interpolate(frame, [170, 200], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const quoteScale = interpolate(frame, [5, 20], [1.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  const quoteOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity,
      }}
    >
      <div style={{
          position: "relative",
          maxWidth: 900,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
      }}>
        <div style={{
            color: "#1d1d1f",
            opacity: quoteOpacity,
            transform: `scale(${quoteScale})`,
            marginBottom: 48,
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 48,
            background: "rgba(0,0,0,0.05)",
          }}
        >
          <Quote size={40} fill="#1d1d1f" strokeWidth={0} />
        </div>

        <p style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#1d1d1f",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.04em",
          }}
        >
          {QUOTE.slice(0, charCount)}
          {showCursor && charCount < QUOTE.length && (
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 64,
                background: "#0066cc",
                marginLeft: 8,
                verticalAlign: "text-bottom",
                borderRadius: 4,
              }}
            />
          )}
        </p>

        <div style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: authorOpacity,
            transform: `translateY(${authorY}px)`,
          }}
        >
          <div style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#86868b",
              letterSpacing: "-0.02em",
            }}
          >
            {AUTHOR}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
