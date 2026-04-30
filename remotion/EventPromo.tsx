import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const EVENT_DATE = "MAY 24, 2026";
const EVENT_NAME = "BuildConf";
const EVENT_SUBTITLE = "The Developer Conference";

// Digit flip animation for countdown
function FlipDigit({ value, frame, delay }: { value: string; frame: number; delay: number }) {
  const flipOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flipY = interpolate(frame, [delay, delay + 15], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        width: 90,
        height: 110,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,200,50,0.2)",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 64,
        fontWeight: 800,
        color: "#fbbf24",
        opacity: flipOpacity,
        transform: `translateY(${flipY}px)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(255,200,50,0.12)" }} />
      {value}
    </div>
  );
}

export const EventPromo: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [10, 45], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  const titleOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const countdownOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const detailsOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const detailsY = interpolate(frame, [120, 150], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0a0800, #1a1200, #0a0600)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Gold glow */}
      <div style={{ position: "absolute", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(251,191,36,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />

      {/* Particle dots */}
      {[...Array(12)].map((_, i) => {
        const px = (i * 137.5) % 100;
        const py = (i * 89.3) % 100;
        const pOpacity = interpolate(frame, [i * 3, i * 3 + 20], [0, 0.3], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px + "%",
              top: py + "%",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#fbbf24",
              opacity: pOpacity,
            }}
          />
        );
      })}

      {/* Event name */}
      <div style={{ transform: `scale(${titleScale})`, opacity: titleOpacity, textAlign: "center" }}>
        <div style={{ fontSize: 130, fontWeight: 900, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 0.9 }}>
          {EVENT_NAME}
        </div>
      </div>

      <div style={{ fontSize: 22, fontWeight: 500, color: "rgba(251,191,36,0.55)", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 16, marginBottom: 48, opacity: subtitleOpacity }}>
        {EVENT_SUBTITLE}
      </div>

      {/* Countdown */}
      <div style={{ opacity: countdownOpacity }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.4em", textTransform: "uppercase", textAlign: "center", marginBottom: 16 }}>
          Countdown to Launch
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          {[["0", "2"], [":", ""], ["1", "4"], [":", ""], ["0", "8"]].map((pair, i) => {
            if (pair[0] === ":") {
              return <div key={i} style={{ fontSize: 48, color: "rgba(251,191,36,0.4)", fontWeight: 700, marginBottom: 8 }}>:</div>;
            }
            return (
              <div key={i} style={{ display: "flex", gap: 6 }}>
                <FlipDigit value={pair[0]} frame={frame} delay={60 + i * 8} />
                <FlipDigit value={pair[1]} frame={frame} delay={65 + i * 8} />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8, justifyContent: "center" }}>
          {["Days", "Hours", "Mins"].map((u, i) => (
            <div key={i} style={{ width: 190, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>{u}</div>
          ))}
        </div>
      </div>

      {/* Details row */}
      <div style={{ display: "flex", gap: 40, marginTop: 48, opacity: detailsOpacity, transform: `translateY(${detailsY}px)` }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", marginBottom: 6 }}>DATE</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fbbf24" }}>{EVENT_DATE}</div>
        </div>
        <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", marginBottom: 6 }}>LOCATION</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fbbf24" }}>San Francisco, CA</div>
        </div>
        <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", marginBottom: 6 }}>TICKETS</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fbbf24" }}>Limited Seats</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
