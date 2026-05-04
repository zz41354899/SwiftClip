# Timeline

- **File**: `remotion/Timeline.tsx`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 270 frames | 9s
- **Tags**: Business, Tutorial

## Description

Alternating card timeline with staggered reveal animations for company history or roadmaps.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Section headline | (inferred from layout, set in header) | edit title text node |
| Timeline steps | `STEPS` array (5 steps) | edit `STEPS` array at top of file |
| Step year | `"2021"` – `"2025"` | edit `year` field |
| Step title | `"Founded"`, `"First Launch"`, etc. | edit `title` field |
| Step description | short desc per step | edit `desc` field |
| Step color | `#34c759`, `#5856d6`, etc. | edit `color` field |
| Step icon | `Building2`, `Rocket`, etc. (lucide-react) | edit `icon` field |

`STEPS` array structure: `{ year, title, desc, color, icon }`

## Visual style

Center vertical line grows from top. Step cards alternate left/right with colored dot on the line. Each card fades in as the line reaches it. Staggered timing based on `STEPS` array index.

## Use cases

Company history, product roadmaps, milestone recaps, educational timelines.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Milestone, Flag, Star, Rocket, Building2 } from "lucide-react";

const STEPS = [
  { year: "2021", title: "Founded", desc: "Started in a San Francisco garage", color: "#34c759", icon: Building2 },
  { year: "2022", title: "First Launch", desc: "10K users in the first month", color: "#5856d6", icon: Rocket },
  { year: "2023", title: "Series A", desc: "$12M raised from top VCs", color: "#ff9500", icon: Milestone },
  { year: "2024", title: "1M Users", desc: "Reached a global milestone", color: "#ff2d55", icon: Star },
  { year: "2025", title: "Enterprise", desc: "500+ companies onboard", color: "#007aff", icon: Flag },
];

export const Timeline: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 30], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // The center line grows from top to bottom
  const lineH = interpolate(frame, [20, 200], [0, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "#f5f5f7",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 160px",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 56, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#86868b", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
          Our Journey
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em" }}>
          Building SwiftClip
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", width: "100%" }}>
        {/* Vertical center line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 2,
            height: lineH,
            background: "rgba(0,0,0,0.1)",
            transform: "translateX(-50%)",
          }}
        />

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            const delay = 25 + i * 28;
            const itemOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const itemX = interpolate(frame, [delay, delay + 25], [isLeft ? -40 : 40, 0], {
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
                  gap: 0,
                  position: "relative",
                }}
              >
                {/* Left side */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: 48,
                    opacity: itemOpacity,
                    transform: `translateX(${itemX}px)`,
                  }}
                >
                  {isLeft ? (
                    <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", backdropFilter: "blur(40px)", borderRadius: 32, padding: "24px 32px", maxWidth: 360, display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{ color: step.color, marginTop: 4 }}><step.icon size={24} /></div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: step.color, letterSpacing: "0.15em", marginBottom: 6 }}>{step.year}</div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: "#1d1d1f", marginBottom: 8, letterSpacing: "-0.02em" }}>{step.title}</div>
                        <div style={{ fontSize: 16, color: "#86868b", fontWeight: 500 }}>{step.desc}</div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Center dot */}
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: step.color, boxShadow: `0 0 12px ${step.color}40`, flexShrink: 0, zIndex: 1 }} />

                {/* Right side */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: 48,
                    opacity: itemOpacity,
                    transform: `translateX(${-itemX}px)`,
                  }}
                >
                  {!isLeft ? (
                    <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", backdropFilter: "blur(40px)", borderRadius: 32, padding: "24px 32px", maxWidth: 360, display: "flex", gap: 16, alignItems: "flex-start", textAlign: "left" }}>
                      <div style={{ color: step.color, marginTop: 4 }}><step.icon size={24} /></div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: step.color, letterSpacing: "0.15em", marginBottom: 6 }}>{step.year}</div>
                        <div style={{ fontSize: 24, fontWeight: 800, color: "#1d1d1f", marginBottom: 8, letterSpacing: "-0.02em" }}>{step.title}</div>
                        <div style={{ fontSize: 16, color: "#86868b", fontWeight: 500 }}>{step.desc}</div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
