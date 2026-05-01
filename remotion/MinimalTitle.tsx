import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const MinimalTitle: React.FC = () => {
  const frame = useCurrentFrame();

  const y = interpolate(frame, [10, 50], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#ffffff", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `translateY(${y}px)`, opacity,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 24
      }}>
        <div style={{ fontSize: 96, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>Supercharged.</div>
        <div style={{ fontSize: 32, fontWeight: 500, color: "#86868b", letterSpacing: "-0.02em" }}>For pros.</div>
      </div>
    </AbsoluteFill>
  );
};
