# BarChart

- **File**: `remotion/BarChart.tsx`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 240 frames | 8s
- **Tags**: Data, Business

## Description

Animated bar chart with smooth grow-in effects and data labels for presentations.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Chart title | `"Revenue"` | edit text node |
| Chart subtitle | `"H1 Performance"` | edit text node |
| Growth badge | `"+42%"` | edit `<span>` text |
| Data labels | `["Jan", "Feb", "Mar", "Apr", "May", "Jun"]` | edit `data` array `label` fields |
| Data values | `[30, 45, 65, 40, 85, 100]` | edit `data` array `value` fields |
| Highlight bar | last bar (`i === data.length - 1`) → `#0066cc` | change condition or color |

## Visual style

Frosted glass card with title + trend badge top. Six bars grow up from baseline with staggered delay. Last bar highlighted in blue. Month labels below.

## Use cases

Revenue charts, growth reports, performance comparisons, data-driven presentations.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { TrendingUp } from "lucide-react";

export const BarChart: React.FC = () => {
  const frame = useCurrentFrame();

  const data = [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 65 },
    { label: "Apr", value: 40 },
    { label: "May", value: 85 },
    { label: "Jun", value: 100 },
  ];

  const MAX_BAR_HEIGHT = 400;

  const y = interpolate(frame, [0, 40], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `translateY(${y}px)`, opacity,
        background: "rgba(255,255,255,0.7)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", borderRadius: 48, padding: 64, width: 900,
        display: "flex", flexDirection: "column", gap: 48
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 48, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>Revenue</div>
            <div style={{ fontSize: 24, fontWeight: 500, color: "#86868b", marginTop: 8 }}>H1 Performance</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#0066cc", fontSize: 24, fontWeight: 600 }}>
            <TrendingUp size={32} />
            <span>+42%</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, height: MAX_BAR_HEIGHT + 40 }}>
          {data.map((bar, i) => {
            const delay = 10 + i * 8;
            const barH = interpolate(frame, [delay, delay + 40], [0, (bar.value / 100) * MAX_BAR_HEIGHT], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
            });

            const barOp = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ 
                  width: "100%", height: barH, opacity: barOp,
                  background: i === data.length - 1 ? "#0066cc" : "rgba(0,0,0,0.05)",
                  borderRadius: 16 
                }} />
                <div style={{ fontSize: 18, color: "#86868b", fontWeight: 500, opacity: barOp }}>{bar.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
