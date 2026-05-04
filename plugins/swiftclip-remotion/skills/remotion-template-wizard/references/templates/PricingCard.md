# PricingCard

- **File**: `remotion/PricingCard.tsx`
- **Tier**: hardcoded
- **Aspect ratio**: 1:1
- **Dimensions**: 1080×1080 | 30fps | 240 frames | 8s
- **Tags**: SaaS, Marketing

## Description

Pricing plan card with animated feature list reveal, highlight badge, and CTA entrance.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Plan name | `"Pro Plan"` | edit text node |
| Price | `"$29"` | edit `<span>` text |
| Price period | `"/mo"` | edit `<span>` text |
| Feature list | `["All features included", "Unlimited projects", "Priority support"]` | edit array |
| Check icon color | `#0066cc` | edit `color` prop on `CheckCircle2` |

## Visual style

Square frosted glass card with scale-in entrance. Plan name → large price → feature checklist with `CheckCircle2` icons. Clean Apple Light Mode.

## Use cases

SaaS pricing pages, subscription promos, plan comparison clips, 1:1 social ads.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { CheckCircle2 } from "lucide-react";

export const PricingCard: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [10, 40], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.2)) });
  const opacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `scale(${scale})`, opacity,
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", borderRadius: 48, padding: 64, width: 600, color: "#1d1d1f", display: "flex", flexDirection: "column", gap: 32,
        boxShadow: "0 20px 40px rgba(0,0,0,0.06)"
      }}>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>Pro Plan</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }} >
          <span style={{ fontSize: 96, fontWeight: 900, letterSpacing: "-0.04em" }}>$29</span>
          <span style={{ fontSize: 24, color: "#86868b" }}>/mo</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
          {["All features included", "Unlimited projects", "Priority support"].map(f => (
            <div key={f} style={{ display: "flex", gap: 16, fontSize: 24, alignItems: "center" }}>
              <CheckCircle2 color="#0066cc" size={32} /> {f}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
