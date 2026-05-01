import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Zap, Palette, Rocket, Sparkles, ArrowRight } from "lucide-react";

const FEATURES = [
  { icon: <Zap size={44} color="#6366f1" />, text: "10× faster than manual editing" },
  { icon: <Palette size={44} color="#a855f7" />, text: "Beautiful, production-ready templates" },
  { icon: <Rocket size={44} color="#ec4899" />, text: "Ship polished video in minutes" },
];
const FEATURE_DELAYS = [70, 92, 114];

export const VerticalStory: React.FC = () => {
  const frame = useCurrentFrame();

  const badgeOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineY = interpolate(frame, [20, 50], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subOpacity = interpolate(frame, [45, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [145, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = interpolate(frame, [145, 170], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  // Subtle pulse after CTA appears
  const pulseCycle = (frame - 170) % 60;
  const pulseScale =
    frame > 170
      ? interpolate(pulseCycle, [0, 30, 60], [1, 1.03, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.sin),
        })
      : 1;

  return (
    <AbsoluteFill
      style={{
        background: "#f5f5f7",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 72px",
        overflow: "hidden",
      }}
    >
      {/* Background glow blobs */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 60%)",
          top: "-20%",
          left: "-30%",
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)",
          bottom: "0%",
          right: "-20%",
          filter: "blur(80px)",
        }}
      />

      {/* Pill badge */}
      <div
        style={{
          padding: "16px 36px",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          borderRadius: 100,
          fontSize: 26,
          color: "#1d1d1f",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: 60,
          display: "flex",
          alignItems: "center",
          gap: 14,
          opacity: badgeOpacity,
        }}
      >
        New in 2026 <Sparkles size={28} color="#0066cc" strokeWidth={2} />
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: 104,
          fontWeight: 800,
          lineHeight: 1.05,
          textAlign: "center",
          color: "#1d1d1f",
          letterSpacing: "-0.04em",
          marginBottom: 32,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        Make Videos
        <br />
        <span
          style={{
            color: "#86868b"
          }}
        >
          10× Faster
        </span>
      </div>

      {/* Sub-headline */}
      <p
        style={{
          fontSize: 36,
          color: "#86868b",
          textAlign: "center",
          lineHeight: 1.4,
          marginBottom: 80,
          opacity: subOpacity,
          maxWidth: 900,
          letterSpacing: "-0.01em",
        }}
      >
        Production-ready Remotion templates
        <br />
        for developers & creators
      </p>

      {/* Feature cards */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          marginBottom: 80,
        }}
      >
        {FEATURES.map((f, i) => {
          const delay = FEATURE_DELAYS[i];
          const fOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const fX = interpolate(frame, [delay, delay + 20], [-40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
                borderRadius: 32,
                padding: "32px 40px",
                opacity: fOpacity,
                transform: `translateX(${fX}px)`,
              }}
            >
              <div style={{ background: "rgba(0,102,204,0.1)", padding: 12, borderRadius: 16 }}>
                {React.cloneElement(f.icon, { color: "#ffffff", strokeWidth: 2 })}
              </div>
              <span
                style={{
                  fontSize: 32,
                  color: "#1d1d1f",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {f.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* CTA Button */}
      <div
        style={{
          background: "white",
          borderRadius: 48,
          padding: "30px 60px",
          fontSize: 34,
          fontWeight: 600,
          color: "black",
          opacity: ctaOpacity,
          transform: `scale(${ctaScale * pulseScale})`,
          boxShadow: "0 20px 40px rgba(255,255,255,0.15)",
          letterSpacing: "-0.01em",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        Browse Templates <ArrowRight size={36} color="black" strokeWidth={2} />
      </div>
    </AbsoluteFill>
  );
};
