# CelebrationBurst

- **File**: `remotion/CelebrationBurst.tsx`
- **Tier**: hardcoded
- **Aspect ratio**: 1:1
- **Dimensions**: 1080×1080 | 30fps | 180 frames | 6s
- **Tags**: Events, Social

## Description

Confetti burst celebration animation with particle physics for announcements and milestones.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Trophy icon | `Trophy` (lucide-react) | swap icon |
| Icon color | `#0066cc` | edit `color` prop |
| Icon background | `rgba(10,132,255,0.1)` | edit `background` style |
| Headline | celebration text node | edit text node |
| Subline | secondary celebration text | edit text node |

## Visual style

Centered square frosted glass card. Trophy icon in blue-tinted circle. Headline + subline. Scale-in with back-spring. Confetti particles burst around the card.

## Use cases

Milestone announcements, launch celebrations, award reveals, achievement badges.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Trophy } from "lucide-react";

export const CelebrationBurst: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [10, 50], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `scale(${scale})`, opacity,
        background: "rgba(255,255,255,0.7)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", borderRadius: 48, padding: 80,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 40
      }}>
        <div style={{
          width: 140, height: 140, borderRadius: 40, background: "rgba(10,132,255,0.1)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <Trophy size={72} color="#0066cc" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>Goal Reached</div>
          <div style={{ fontSize: 24, fontWeight: 500, color: "#86868b" }}>1,000,000 active users</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
