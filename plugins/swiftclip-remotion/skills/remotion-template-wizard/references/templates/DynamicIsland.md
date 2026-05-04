# DynamicIsland

- **Component**: `DynamicIsland`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 150 frames | 5s
- **Tags**: Tech, Motion

## Description

Apple Dynamic Island notification animation with spring physics and incoming call UI.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Pill base width | `240px` | edit `pillBaseWidth` |
| Pill expanded width | `600px` | edit `pillExpandedWidth` |
| Call status label | `"Incoming..."` | edit span text |
| Call duration | `"0:12"` | edit span text |
| Decline button color | `#FF453A` | edit `backgroundColor` |
| Accept button color | `#32D74B` | edit `backgroundColor` |
| Avatar gradient | `#FF9F0A → #FF375F` | edit gradient string |

## Visual style

Black pill at top-center of frame. Pops in with spring physics → expands to show incoming call UI (avatar + status + accept/decline buttons) → collapses back. White background with centered pill.

## Use cases

iOS feature demos, Dynamic Island explainers, tech product showcases, app UI walkthroughs.

## Source

```tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const DynamicIsland: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const initialPop = spring({ frame, fps, config: { damping: 14 } });
  const expandProgress = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const collapseProgress = spring({ frame: frame - 110, fps, config: { damping: 14 } });

  const pillBaseWidth = 240;
  const pillBaseHeight = 64;
  const pillExpandedWidth = 600;
  const pillExpandedHeight = 160;

  const currentWidth = interpolate(collapseProgress, [0, 1], [
    interpolate(expandProgress, [0, 1], [pillBaseWidth, pillExpandedWidth]),
    pillBaseWidth
  ]);

  const currentHeight = interpolate(collapseProgress, [0, 1], [
    interpolate(expandProgress, [0, 1], [pillBaseHeight, pillExpandedHeight]),
    pillBaseHeight
  ]);

  const borderRadius = currentHeight / 2; 
  const topPadding = 40;

  const expandedContentOpacity = interpolate(collapseProgress, [0, 0.5], [
    interpolate(expandProgress, [0.5, 1], [0, 1]),
    0
  ]);

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
      <div
        style={{
          position: "absolute",
          top: topPadding,
          left: "50%",
          transform: `translateX(-50%) scale(${interpolate(initialPop, [0, 1], [0.8, 1])})`,
          opacity: interpolate(initialPop, [0.5, 1], [0, 1]),
          width: currentWidth,
          height: currentHeight,
          backgroundColor: "#000000",
          borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ opacity: expandedContentOpacity, color: "white", display: "flex", flexDirection: "row", alignItems: "center", width: "100%", padding: "0 40px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: "#333", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #FF9F0A 0%, #FF375F 100%)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <span style={{ fontSize: 24, fontWeight: 500, color: "#8e8e93" }}>Incoming...</span>
                    <span style={{ fontSize: 32, fontWeight: 600 }}>0:12</span>
                </div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
                <div style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 24, height: 24, backgroundColor: "#FF453A", borderRadius: 12 }} />
                </div>
                <div style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: "#32D74B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 24, height: 24, border: "4px solid #fff", borderRadius: 12 }} />
                </div>
            </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
