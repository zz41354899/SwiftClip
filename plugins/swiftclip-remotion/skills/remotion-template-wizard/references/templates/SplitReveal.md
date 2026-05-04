# SplitReveal

- **File**: `remotion/SplitReveal.tsx`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 180 frames | 6s
- **Tags**: Branding, Motion

## Description

Split-screen panel reveal with contrasting sides and animated text entrance.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Overline label | `"Introducing"` | edit text node |
| Main word | large text revealed after split | edit the large typography node |
| Left panel icon | `Scissors` (lucide-react) | swap icon |
| Right panel icon | `Rocket` (lucide-react) | swap icon |
| Left panel color | dark (`#1d1d1f` background implied) | edit left panel style |
| Right panel color | contrasting | edit right panel style |

## Visual style

Two panels (left dark / right light or contrasting colors) slide apart to reveal centered content. "Introducing" overline → large brand word → divider line grows → tag badge fades in.

## Use cases

Product reveals, brand launches, "before vs after" narratives, dramatic identity stings.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { MoveLeft, MoveRight, Scissors, Rocket } from "lucide-react";

export const SplitReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const leftX = interpolate(frame, [10, 55], [0, -960], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const rightX = interpolate(frame, [10, 55], [0, 960], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const contentOpacity = interpolate(frame, [40, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contentScale = interpolate(frame, [40, 70], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.1)),
  });

  const tagOpacity = interpolate(frame, [65, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tagY = interpolate(frame, [65, 90], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const lineWidth = interpolate(frame, [80, 120], [0, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // fade out panels
  const panelOpacity = interpolate(frame, [40, 60], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
  });

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
        overflow: "hidden",
      }}
    >
      {/* Hidden content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: contentOpacity,
          transform: `scale(${contentScale})`,
        }}
      >
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#0066cc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24 }}>
            Introducing
          </div>
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              color: "#1d1d1f",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              marginBottom: 40,
            }}
          >
            SWIFT
            <br />
            <span style={{ color: "#86868b" }}>CLIP</span>
          </div>
          <div style={{ height: 4, width: lineWidth, background: "rgba(0,0,0,0.1)", margin: "0 auto 32px", borderRadius: 2 }} />
          <div style={{ fontSize: 32, color: "#86868b", fontWeight: 500, opacity: tagOpacity, transform: `translateY(${tagY}px)` }}>
            Pro video templates.
          </div>
        </div>
      </div>

      {/* Left panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50%",
          background: "#f5f5f7",
          transform: `translateX(${leftX}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 80,
          zIndex: 10,
          borderRight: "1px solid rgba(255,255,255,0.1)",
          opacity: panelOpacity,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, color: "#1d1d1f", marginBottom: 20 }}>
            <Scissors size={64} color="rgba(255,255,255,0.4)" />
            <div style={{ fontSize: 80, fontWeight: 900, letterSpacing: "-0.04em" }}>BEFORE</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#86868b", fontWeight: 500 }}>
            Manual editing
            <MoveLeft size={24} color="#0066cc" />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "50%",
          background: "#ffffff",
          transform: `translateX(${rightX}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 80,
          zIndex: 10,
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          opacity: panelOpacity,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, color: "#1d1d1f", marginBottom: 20 }}>
            <div style={{ fontSize: 80, fontWeight: 900, letterSpacing: "-0.04em" }}>AFTER</div>
            <Rocket size={64} color="#0066cc" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#86868b", fontWeight: 500 }}>
            <MoveRight size={24} color="#0066cc" />
            SwiftClip
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
