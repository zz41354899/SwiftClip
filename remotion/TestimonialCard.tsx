import { Quote, Star } from "lucide-react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const TestimonialCard: React.FC = () => {
  const frame = useCurrentFrame();

  const cardScale = interpolate(frame, [10, 45], [0.88, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.2))
  });
  const cardOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
      <div style={{
        transform: `scale(${cardScale})`, opacity: cardOpacity,
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", borderRadius: 48,
        padding: 64, width: 800, color: "#1d1d1f", display: "flex", flexDirection: "column", gap: 32,
        boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
      }}>
        <div style={{ display: "flex", color: "#0066cc" }}>
          {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={32} />)}
        </div>
        <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.2 }}>
          "This is exactly what I was looking for. Simply magical."
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#e5e5ea" }} />
          <div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Jane Doe</div>
            <div style={{ fontSize: 18, color: "#86868b" }}>CEO, TechCorp</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
