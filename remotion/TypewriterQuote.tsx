import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const QUOTE = "The best time to plant a tree was 20 years ago. The second best time is now.";
const AUTHOR = "Chinese Proverb";

export const TypewriterQuote: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Characters revealed over frames 20–140
  const charCount = Math.floor(
    interpolate(frame, [20, 160], [0, QUOTE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    })
  );

  // Cursor blink (every 15 frames)
  const cursorVisible = frame % 15 < 8;
  const showCursor = charCount < QUOTE.length || cursorVisible;

  const authorOpacity = interpolate(frame, [170, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const authorX = interpolate(frame, [170, 200], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineScale = interpolate(frame, [168, 195], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Opening quote mark drops in
  const quoteScale = interpolate(frame, [5, 20], [2, 1], {
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
        background: "#080808",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 160px",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Opening quotation mark */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 100,
          fontSize: 180,
          color: "rgba(255,255,255,0.07)",
          lineHeight: 1,
          fontFamily: "Georgia, serif",
          opacity: quoteOpacity,
          transform: `scale(${quoteScale})`,
          transformOrigin: "top left",
          userSelect: "none",
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        style={{
          fontSize: 52,
          lineHeight: 1.7,
          color: "white",
          fontWeight: 400,
          margin: 0,
          textAlign: "center",
          fontStyle: "italic",
          letterSpacing: "0.01em",
          position: "relative",
        }}
      >
        {QUOTE.slice(0, charCount)}
        {showCursor && charCount < QUOTE.length && (
          <span
            style={{
              display: "inline-block",
              width: 3,
              height: "1em",
              background: "white",
              marginLeft: 2,
              verticalAlign: "text-bottom",
            }}
          />
        )}
      </p>

      {/* Author separator line + name */}
      <div
        style={{
          marginTop: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: authorOpacity,
          transform: `translateX(${authorX}px)`,
        }}
      >
        <div
          style={{
            height: 1,
            width: 120 * lineScale,
            background: "rgba(255,255,255,0.25)",
          }}
        />
        <div
          style={{
            fontSize: 22,
            fontStyle: "normal",
            fontFamily: "Inter, system-ui, sans-serif",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.25em",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          — {AUTHOR}
        </div>
      </div>
    </AbsoluteFill>
  );
};
