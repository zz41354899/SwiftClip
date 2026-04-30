import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const QUOTE = "Code is poetry. Motion is music. Together, they tell stories that data alone never could.";
const AUTHOR = "Alex Kim";
const ROLE = "CEO, SwiftClip";

export const QuoteStory: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background blobs
  const blob1X = Math.sin(frame * 0.02) * 3;
  const blob1Y = Math.cos(frame * 0.015) * 3;

  // Ornament mark slides in
  const ornamentOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ornamentY = interpolate(frame, [10, 30], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Quote reveals word by word
  const words = QUOTE.split(" ");
  const wordReveal = interpolate(frame, [25, 180], [0, words.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const visibleWords = Math.floor(wordReveal);

  // Author reveal
  const authorOpacity = interpolate(frame, [185, 215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const authorY = interpolate(frame, [185, 215], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Bottom line extends
  const lineH = interpolate(frame, [195, 225], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #06060c 0%, #0e0b1e 50%, #070612 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 64px",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Blob bg */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 65%)",
          top: `${15 + blob1Y}%`,
          left: `${-10 + blob1X}%`,
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 65%)",
          bottom: "10%",
          right: "-5%",
          filter: "blur(60px)",
        }}
      />

      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: "linear-gradient(to bottom, transparent, #6366f1, #a855f7, transparent)",
        }}
      />

      {/* Ornament — decorative quote symbol */}
      <div
        style={{
          fontSize: 200,
          fontFamily: "Georgia, serif",
          color: "rgba(99,102,241,0.15)",
          lineHeight: 0.8,
          marginBottom: 8,
          opacity: ornamentOpacity,
          transform: `translateY(${ornamentY}px)`,
          alignSelf: "flex-start",
          marginLeft: 16,
          userSelect: "none",
        }}
      >
        "
      </div>

      {/* Quote text — word by word */}
      <p
        style={{
          fontSize: 52,
          lineHeight: 1.6,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.9)",
          textAlign: "center",
          margin: "0 0 56px",
          fontFamily: "'Georgia', serif",
          letterSpacing: "0.01em",
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              opacity: i < visibleWords ? 1 : 0,
              color: i < visibleWords && i >= visibleWords - 3 ? "#a5b4fc" : "rgba(255,255,255,0.88)",
              transition: "none",
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>

      {/* Author block */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: authorOpacity,
          transform: `translateY(${authorY}px)`,
        }}
      >
        {/* Line */}
        <div
          style={{
            width: lineH,
            height: 2,
            background: "linear-gradient(to right, #6366f1, #a855f7)",
          }}
        />

        <div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "white" }}>{AUTHOR}</div>
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{ROLE}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
