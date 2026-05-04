import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

interface LowerThirdTemplateProps {
  headline?: string;
  subheadline?: string;
  name?: string;
  title?: string;
}

export const LowerThird: React.FC<LowerThirdTemplateProps> = (props) => {
  const headline = props.headline ?? props.name ?? "Craig Federighi";
  const subheadline = props.subheadline ?? props.title ?? "Senior Vice President";
  const frame = useCurrentFrame();

  const wrapX = interpolate(frame, [10, 50], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "transparent", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "flex-end", flexDirection: "column", padding: 80 }}>
      <div style={{
        transform: `translateX(${wrapX}px)`, opacity,
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", borderRadius: 32, padding: "32px 48px", width: "fit-content",
        display: "flex", flexDirection: "column", gap: 8
      }}>
        <div style={{ fontSize: 48, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>{headline}</div>
        <div style={{ fontSize: 24, fontWeight: 500, color: "#86868b" }}>{subheadline}</div>
      </div>
    </AbsoluteFill>
  );
};
