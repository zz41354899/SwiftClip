import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const DIGITS = [5, 4, 3, 2, 1];
const FRAMES_PER_DIGIT = 36;
const TOTAL_COUNTDOWN = DIGITS.length * FRAMES_PER_DIGIT; // 180
const DIGIT_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#6366f1"];

export const CountdownTimer: React.FC = () => {
  const frame = useCurrentFrame();

  const isGo = frame >= TOTAL_COUNTDOWN;
  const digitIndex = Math.min(
    Math.floor(frame / FRAMES_PER_DIGIT),
    DIGITS.length - 1
  );
  const frameInDigit = frame % FRAMES_PER_DIGIT;
  const color = DIGIT_COLORS[digitIndex];
  const digit = DIGITS[digitIndex];

  // Flash on each new digit
  const flashOpacity = !isGo
    ? interpolate(frameInDigit, [0, 6], [0.25, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Number scale + opacity
  const numScale = !isGo
    ? interpolate(frameInDigit, [0, 18, FRAMES_PER_DIGIT], [1.5, 1, 0.9], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      })
    : 1;

  const numOpacity = !isGo
    ? interpolate(
        frameInDigit,
        [0, 6, 28, FRAMES_PER_DIGIT],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  // GO! animation
  const goScale = interpolate(frame, [TOTAL_COUNTDOWN, TOTAL_COUNTDOWN + 20], [1.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.1)),
  });

  const goOpacity = interpolate(frame, [TOTAL_COUNTDOWN, TOTAL_COUNTDOWN + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Circular countdown ring
  const radius = 180;
  const circumference = 2 * Math.PI * radius;
  const ringProgress = isGo ? 1 : frameInDigit / FRAMES_PER_DIGIT;
  const dashOffset = circumference * ringProgress;

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#06060e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "100px 100px",
        }}
      />

      {/* Dynamic color glow behind center */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, " + color + "18 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* White flash on digit change */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "white",
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />

      {/* SVG countdown ring */}
      {!isGo && (
        <svg
          width={420}
          height={420}
          style={{ position: "absolute" }}
          viewBox="0 0 420 420"
        >
          {/* Track ring */}
          <circle
            cx={210}
            cy={210}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={8}
          />
          {/* Progress ring (depletes clockwise) */}
          <circle
            cx={210}
            cy={210}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 210 210)"
            style={{ filter: "drop-shadow(0 0 16px " + color + ")" }}
          />
        </svg>
      )}

      {/* Digit */}
      {!isGo && (
        <div
          style={{
            fontSize: 260,
            fontWeight: 900,
            color: "white",
            lineHeight: 1,
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            letterSpacing: "-0.06em",
            textShadow: "0 0 80px " + color + "80, 0 0 160px " + color + "30",
            userSelect: "none",
          }}
        >
          {digit}
        </div>
      )}

      {/* GO! */}
      {isGo && (
        <div
          style={{
            fontSize: 260,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            opacity: goOpacity,
            transform: `scale(${goScale})`,
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.5))",
            userSelect: "none",
          }}
        >
          GO!
        </div>
      )}

      {/* "Starting in" label */}
      {!isGo && (
        <div
          style={{
            position: "absolute",
            bottom: 100,
            fontSize: 22,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.35em",
            fontWeight: 600,
            textTransform: "uppercase",
            opacity: labelOpacity,
          }}
        >
          Starting in
        </div>
      )}

      {/* Corner accent dots */}
      <div style={{ position: "absolute", top: 48, left: 48, width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
      <div style={{ position: "absolute", top: 48, right: 48, width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
      <div style={{ position: "absolute", bottom: 48, left: 48, width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
      <div style={{ position: "absolute", bottom: 48, right: 48, width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
    </AbsoluteFill>
  );
};
