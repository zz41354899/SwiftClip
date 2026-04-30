import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// Simple pseudo-random number seeded by index
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 43758.5453123;
  return x - Math.floor(x);
}

const PARTICLE_COUNT = 60;

export const CelebrationBurst: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Trophy scales in
  const trophyScale = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const trophyOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const trophyBounce = Math.sin(frame * 0.08) * 8;

  // Main text
  const textOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = interpolate(frame, [30, 55], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subOpacity = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const COLORS = ["#f59e0b", "#6366f1", "#ec4899", "#22c55e", "#06b6d4", "#a855f7"];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(145deg, #07070e, #0f0c1e)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Particles */}
      {[...Array(PARTICLE_COUNT)].map((_, i) => {
        const angle = seededRand(i * 3) * Math.PI * 2;
        const speed = 4 + seededRand(i * 7) * 8;
        const pDelay = seededRand(i * 13) * 20;
        const pFrame = Math.max(0, frame - pDelay);
        const traveled = pFrame * speed;
        const px = Math.cos(angle) * traveled;
        const py = Math.sin(angle) * traveled - pFrame * pFrame * 0.08;
        const pOpacity = interpolate(pFrame, [0, 5, 60, 120], [0, 1, 0.8, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const size = 6 + seededRand(i * 17) * 10;
        const color = COLORS[i % COLORS.length];
        const rotation = pFrame * (seededRand(i * 23) > 0.5 ? 8 : -6);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              width: size,
              height: size * (seededRand(i * 19) > 0.5 ? 2 : 1),
              background: color,
              borderRadius: seededRand(i * 31) > 0.5 ? "50%" : 2,
              transform: `translate(${px}px, ${py}px) rotate(${rotation}deg) translateX(-50%) translateY(-50%)`,
              opacity: pOpacity,
            }}
          />
        );
      })}

      {/* Glow rings */}
      {[1, 2].map((ring) => {
        const ringOpacity = interpolate(frame, [5 + ring * 10, 25 + ring * 15, 60 + ring * 10], [0, 0.15, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const ringScale = interpolate(frame, [5 + ring * 10, 80 + ring * 10], [0.5, 3], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={ring}
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: "3px solid #f59e0b",
              opacity: ringOpacity,
              transform: `scale(${ringScale})`,
            }}
          />
        );
      })}

      {/* Trophy */}
      <div
        style={{
          fontSize: 140,
          marginBottom: 24,
          transform: `scale(${trophyScale}) translateY(${trophyBounce}px)`,
          opacity: trophyOpacity,
          filter: "drop-shadow(0 0 40px rgba(245,158,11,0.6))",
        }}
      >
        🏆
      </div>

      {/* Text */}
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: "white",
          letterSpacing: "-0.03em",
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
          lineHeight: 1,
          marginBottom: 20,
        }}
      >
        Achievement
        <br />
        <span
          style={{
            background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 30px rgba(245,158,11,0.5))",
          }}
        >
          Unlocked!
        </span>
      </div>

      <div
        style={{
          fontSize: 26,
          color: "rgba(255,255,255,0.4)",
          fontWeight: 500,
          opacity: subOpacity,
          textAlign: "center",
        }}
      >
        1,000,000 users reached 🎉
      </div>
    </AbsoluteFill>
  );
};
