import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Zap } from "lucide-react";
import {
  resolveBrandRevealCopy,
  type BrandRevealTemplateProps,
} from "./firstBatchProps";

export const BrandReveal: React.FC<BrandRevealTemplateProps> = (props) => {
  const { brandName, tagline, accentColor } = resolveBrandRevealCopy(props);
  const frame = useCurrentFrame();

  const logoScale = interpolate(frame, [10, 50], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const logoOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const nameY = interpolate(frame, [30, 60], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const nameOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        <div style={{
          transform: `scale(${logoScale})`, opacity: logoOpacity,
          width: 160, height: 160, borderRadius: 48, background: accentColor,
          display: "flex", justifyContent: "center", alignItems: "center",
          boxShadow: `0 20px 60px ${accentColor}4d`
        }}>
          <Zap size={80} color="white" fill="white" />
        </div>

        <div style={{
          transform: `translateY(${nameY}px)`, opacity: nameOpacity,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16
        }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>{brandName}</div>
          <div style={{ fontSize: 24, fontWeight: 500, color: "#86868b", letterSpacing: "0.2em", textTransform: "uppercase" }}>{tagline}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
