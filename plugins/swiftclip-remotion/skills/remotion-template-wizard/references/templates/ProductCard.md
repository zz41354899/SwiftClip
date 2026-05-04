# ProductCard

- **Component**: `ProductCard`
- **Tier**: prop-enabled
- **Aspect ratio**: 1:1
- **Dimensions**: 1080×1080 | 30fps | 180 frames | 6s
- **Tags**: eCommerce, Marketing

## Description

E-commerce product card animation with shimmer reveal, pricing, star rating, and CTA button.

## Props

| prop | type | default | legacy aliases |
| --- | --- | --- | --- |
| `productName` | string | `"Vision Pro"` | `title` |
| `category` | string | `"Spatial Computing"` | `subtitle` |
| `ctaLabel` | string | `"Pre-order Now"` | `buttonLabel` |


## Visual style

Square centered card with product icon circle, product name, category label, star rating row, and CTA button. Frosted glass card with shimmer entrance. Apple Light Mode.

## Use cases

E-commerce product highlights, app store features, product social posts, 1:1 ad creatives.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { ShoppingBag } from "lucide-react";

interface ProductCardTemplateProps {
  productName?: string;
  category?: string;
  ctaLabel?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

export const ProductCard: React.FC<ProductCardTemplateProps> = (props) => {
  const productName = props.productName ?? props.title ?? "Vision Pro";
  const category = props.category ?? props.subtitle ?? "Spatial Computing";
  const ctaLabel = props.ctaLabel ?? props.buttonLabel ?? "Pre-order Now";
  const frame = useCurrentFrame();

  const cardY = interpolate(frame, [10, 50], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `translateY(${cardY}px)`, opacity,
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", borderRadius: 48, padding: 64, width: 600,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 40
      }}>
        <div style={{ width: 240, height: 240, background: "rgba(255,255,255,0.7)", borderRadius: 120, display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 10px 20px rgba(0,0,0,0.03)" }}>
           <ShoppingBag size={80} color="#1d1d1f" style={{ opacity: 0.8 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em", lineHeight: 1 }}>{productName}</div>
          <div style={{ fontSize: 24, fontWeight: 500, color: "#86868b" }}>{category}</div>
        </div>
        <div style={{ background: "#1d1d1f", color: "#ffffff", padding: "16px 40px", borderRadius: 32, fontSize: 20, fontWeight: 600 }}>
          {ctaLabel}
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
