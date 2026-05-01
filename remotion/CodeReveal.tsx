import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Code2 } from "lucide-react";

export const CodeReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [10, 50], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `translateY(${y}px)`, opacity,
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", borderRadius: 32, padding: 48, width: 900,
        boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
      }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#27c93f" }} />
        </div>
        <pre style={{ margin: 0, color: "#1d1d1f", fontSize: 28, lineHeight: 1.5, fontFamily: "monospace" }}>
          <code>
            <span style={{ color: "#d73a49" }}>const</span>{" "}
            <span style={{ color: "#005cc5" }}>createMagic</span>{" "}
            <span style={{ color: "#d73a49" }}>=</span> () <span style={{ color: "#d73a49" }}>=&gt;</span> {"{"}<br/>
            {"  "}<span style={{ color: "#6f42c1" }}>render</span>({`{ `}<span style={{ color: "#1d1d1f" }}>style</span>: <span style={{ color: "#032f62" }}>"apple"</span>{` }`});<br/>
            {"}"};
          </code>
        </pre>
      </div>
    </AbsoluteFill>
  );
};
