# WebPromo

- **Component**: `WebPromo`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 300 frames | 10s
- **Tags**: Marketing, SaaS

## Description

Browser mockup promo with animated UI elements and feature highlights for web apps.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Browser chrome dots | red / yellow / green | standard browser chrome, edit colors |
| App URL / title | shown in browser bar area | edit URL bar text |
| Feature highlights | overlay text nodes | edit text nodes in JSX |
| Radial glow blob | `rgba(0,0,0,0.03)` | edit background/filter |
| Browser frame size | `540×340` | edit `width` and `height` in style |

## Visual style

Centered browser mockup frame with traffic-light dots. App UI wireframe inside the browser. Radial glow blob in background. Feature callouts animate in around the browser. Apple Light Mode.

## Use cases

SaaS landing page promos, web app feature showcases, browser-based product demos.

## Source

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Globe, MousePointer2, LayoutTemplate, ArrowRight, MousePointer } from "lucide-react";

const FEATURES = [
  { title: "Native Web", desc: "Built for modern browsers", icon: <Globe size={24} color="#0066cc" /> },
  { title: "Interactive", desc: "Engaging scroll effects", icon: <MousePointer2 size={24} color="#0066cc" /> },
  { title: "Templates", desc: "High conversion layouts", icon: <LayoutTemplate size={24} color="#0066cc" /> },
];

export const WebPromo: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerOpacity = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerY = interpolate(frame, [5, 30], [-50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Safari window mockup scales up from bottom
  const mockupScale = interpolate(frame, [20, 60], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.1)),
  });

  const mockupOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Floating cursor notification
  const notifOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const notifY = interpolate(frame, [70, 90], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const ctaOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = interpolate(frame, [200, 230], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.3)),
  });

  const pulseCycle = (frame - 240) % 50;
  const pulseScale = frame > 240
    ? interpolate(pulseCycle, [0, 25, 50], [1, 1.04, 1], {
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
        justifyContent: "flex-start",
        paddingTop: 80,
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)", top: "20%", filter: "blur(120px)" }} />

      <div
        style={{
          textAlign: "center",
          marginBottom: 48,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "#86868b", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>
          Showcase Your Web
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 0.95 }}>
          SwiftClip
          <br />
          <span style={{ color: "#86868b", opacity: 0.8 }}>Browser</span>
        </div>
      </div>

      <div
        style={{
          width: 540,
          height: 340,
          transform: `scale(${mockupScale})`,
          opacity: mockupOpacity,
          position: "relative",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: 32,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ height: 32, display: "flex", alignItems: "center", paddingLeft: 16, gap: 6, background: "rgba(0,0,0,0.02)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#ff5f56" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#ffbd2e" }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#27c93f" }} />
            <div style={{ height: 18, width: "60%", background: "rgba(0,0,0,0.04)", borderRadius: 6, marginLeft: "auto", marginRight: "auto" }}></div>
          </div>

          {/* Browser content */}
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
             <div style={{ height: 100, borderRadius: 16, background: "rgba(0,102,204,0.05)", border: "1px solid rgba(0,102,204,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
               <Globe size={44} color="#0066cc" />
             </div>
             <div style={{ display: "flex", gap: 12 }}>
                <div style={{ height: 14, width: "70%", borderRadius: 7, background: "rgba(0,0,0,0.1)", overflow: "hidden" }} />
                <div style={{ height: 14, width: "30%", borderRadius: 7, background: "rgba(0,0,0,0.05)", overflow: "hidden" }} />
             </div>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 8 }}>
              {[1, 2, 3].map((n) => {
                const sqOpacity = interpolate(frame, [80 + n * 8, 100 + n * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return <div key={n} style={{ height: 80, borderRadius: 12, background: "rgba(0,0,0,0.03)", opacity: sqOpacity }} />;
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: -60,
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: 24,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            opacity: notifOpacity,
            transform: `translateY(${notifY}px)`,
            width: 220,
          }}
        >
          <div style={{ background: "rgba(0,102,204,0.1)", padding: 8, borderRadius: 12 }}>
            <MousePointer size={20} color="#0066cc" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.01em" }}>Interactive Elements</div>
            <div style={{ fontSize: 11, color: "#86868b", marginTop: 2 }}>Scroll & Hover states</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, width: 680, justifyContent: "center" }}>
        {FEATURES.map((f, i) => {
          const fOpacity = interpolate(frame, [110 + i * 20, 135 + i * 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const fY = interpolate(frame, [110 + i * 20, 135 + i * 20], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 12,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                borderRadius: 24,
                padding: "24px",
                opacity: fOpacity,
                transform: `translateY(${fY}px)`,
                flex: 1,
              }}
            >
              <div style={{ background: "rgba(0,102,204,0.1)", padding: 8, borderRadius: 12 }}>
                {f.icon}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.02em" }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "#86868b", marginTop: 4 }}>{f.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 48,
          background: "#1d1d1f",
          borderRadius: 40,
          padding: "20px 48px",
          fontSize: 20,
          fontWeight: 600,
          color: "white",
          letterSpacing: "-0.01em",
          opacity: ctaOpacity,
          transform: `scale(${ctaScale * pulseScale})`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        View Demo <ArrowRight size={22} color="white" />
      </div>
    </AbsoluteFill>
  );
};
```
