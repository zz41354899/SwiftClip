import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const CountdownTimer: React.FC = () => {
  const frame = useCurrentFrame();

  const textY = interpolate(frame, [10, 50], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `translateY(${textY}px)`, opacity,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 40
      }}>
        <div style={{ fontSize: 32, fontWeight: 600, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.2em" }}>Event Starts In</div>
        
        <div style={{ display: "flex", gap: 24 }}>
          {[{v: "03", l: "Days"}, {v: "14", l: "Hrs"}, {v: "45", l: "Min"}].map((t, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.7)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", backdropFilter: "blur(40px)",
              border: "1px solid rgba(0,0,0,0.05)", borderRadius: 32,
              width: 200, height: 240, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 16
            }}>
              <div style={{ fontSize: 96, fontWeight: 800, color: i === 0 ? "#0066cc" : "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>{t.v}</div>
              <div style={{ fontSize: 20, fontWeight: 500, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.l}</div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
