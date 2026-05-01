import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Globe, Video } from "lucide-react";

export const EndScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const logoY = interpolate(frame, [10, 50], [40, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic)
  });
  const logoOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 48 }}>
      <div style={{
        transform: `translateY(${logoY}px)`, opacity: logoOpacity,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 24
      }}>
        <div style={{ width: 120, height: 120, borderRadius: 32, background: "#1d1d1f", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}>
          <Video size={64} color="white" />
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, color: "#1d1d1f", letterSpacing: "-0.04em" }}>SwiftClip</div>
      </div>
      <div style={{
        transform: `translateY(${logoY}px)`, opacity: logoOpacity,
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(0,0,0,0.05)", borderRadius: 64, padding: "24px 48px",
        display: "flex", gap: 16, color: "#1d1d1f", fontSize: 32, fontWeight: 600, alignItems: "center",
        boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
      }}>
        <Globe size={32} color="#0066cc" /> swiftclip.com
      </div>
    </AbsoluteFill>
  );
};
