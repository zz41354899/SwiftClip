# MinimalTitle

- **Component**: `MinimalTitle`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 150 frames | 5s
- **Tags**: Motion, Branding

## Description

Ultra-minimal title card with precise typography animation and subtle fade transitions.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Main headline | `"Supercharged."` | edit text node |
| Subline | `"For pros."` | edit text node |
| Background | `#ffffff` (pure white) | edit `AbsoluteFill` background |
| Headline color | `#1d1d1f` | edit color in style |
| Subline color | `#86868b` | edit color in style |

## Visual style

Pure white background. Two lines center-aligned: a large heavy headline and a smaller secondary line. Both slide up and fade in together. No cards, no glass — just typography.

## Use cases

Title cards, chapter headers, interstitial slides, minimalist openers, keynote-style text transitions.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const MinimalTitle: React.FC = () => {
  const frame = useCurrentFrame();

  const y = interpolate(frame, [10, 50], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#ffffff", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `translateY(${y}px)`, opacity,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 24
      }}>
        <div style={{ fontSize: 96, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>Supercharged.</div>
        <div style={{ fontSize: 32, fontWeight: 500, color: "#86868b", letterSpacing: "-0.02em" }}>For pros.</div>
      </div>
    </AbsoluteFill>
  );
};
```
