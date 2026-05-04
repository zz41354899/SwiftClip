# EventPromo

- **Component**: `EventPromo`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 240 frames | 8s
- **Tags**: Events, Marketing

## Description

Stylish event promotion with animated date, venue, and speaker card reveals.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Event name | `"BuildConf 2026"` | edit text node |
| Event tagline | `"The Developer Conference"` | edit text node |
| Date + location | `"May 24, San Francisco"` | edit text node |
| Icon | `Calendar` (lucide-react) | swap icon |
| Date color | `#0066cc` | edit color on date text node |

## Visual style

Centered frosted glass card. Calendar icon top-center → event name (large bold) → tagline → date/location in accent color. Slide-up entrance.

## Use cases

Conference promos, meetup announcements, webinar invites, product launch events.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Calendar } from "lucide-react";

export const EventPromo: React.FC = () => {
  const frame = useCurrentFrame();

  const wrapY = interpolate(frame, [10, 50], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `translateY(${wrapY}px)`, opacity,
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", borderRadius: 48, padding: 64, width: 800,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 32
      }}>
        <Calendar size={64} color="#1d1d1f" style={{ opacity: 0.8 }} />
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>BuildConf 2026</div>
          <div style={{ fontSize: 24, fontWeight: 500, color: "#86868b" }}>The Developer Conference</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: "#0066cc", marginTop: 16 }}>May 24, San Francisco</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
