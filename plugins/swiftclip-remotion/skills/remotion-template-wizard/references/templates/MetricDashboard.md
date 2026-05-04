# MetricDashboard

- **Component**: `MetricDashboard`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 240 frames | 8s
- **Tags**: Data, SaaS

## Description

Animated KPI metrics and dashboard with real-time counter effects and progress indicators.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Page title | `"Metrics"` | edit `<h1>` text |
| Metric values | `["10X", "99%", "24/7"]` | edit the array |
| Metric label | `"Performance"` (repeated) | edit text node under each metric |
| Background | `#f5f5f7` | edit `AbsoluteFill` style |

## Visual style

Full-page layout with large title top-left. Three equal frosted glass metric cards in a row below. Each card shows a large number + label. Slide-up entrance.

## Use cases

KPI dashboards, performance reports, investor metrics, SaaS stats, achievement highlights.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const MetricDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 40], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', padding: 80, display: "flex", flexDirection: "column", gap: 48 }}>
      <h1 style={{ fontSize: 80, fontWeight: 900, color: "#1d1d1f", letterSpacing: "-0.04em", margin: 0, opacity }}>Metrics</h1>
      <div style={{ display: "flex", gap: 32, flex: 1, transform: `translateY(${y}px)`, opacity }}>
        {["10X", "99%", "24/7"].map((metric, i) => (
          <div key={metric} style={{
            flex: 1, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(40px)",
            border: "1px solid rgba(0,0,0,0.05)", borderRadius: 48, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 16,
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
          }}>
            <div style={{ fontSize: 96, fontWeight: 900, color: "#1d1d1f", letterSpacing: "-0.04em" }}>{metric}</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: "#86868b" }}>Performance</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
```
