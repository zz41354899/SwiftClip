import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const DataViz: React.FC = () => {
  const frame = useCurrentFrame();

  const wrapY = interpolate(frame, [10, 50], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const progress = interpolate(frame, [20, 60], [0, 0.75], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <div style={{
        transform: `translateY(${wrapY}px)`, opacity,
        background: "rgba(255,255,255,0.7)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", borderRadius: 48, padding: 64, width: 800,
        display: "flex", flexDirection: "column", gap: 48
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>System Load</div>
            <div style={{ fontSize: 24, fontWeight: 500, color: "#86868b", marginTop: 8 }}>Real-time usage</div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#0066cc", letterSpacing: "-0.04em" }}>75%</div>
        </div>

        <div style={{ width: "100%", height: 32, background: "rgba(0,0,0,0.05)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", background: "#0066cc", borderRadius: 16 }} />
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", color: "#86868b", fontSize: 18, fontWeight: 500 }}>
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
