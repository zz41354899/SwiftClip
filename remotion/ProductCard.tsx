import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const ProductCard: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardScale = interpolate(frame, [8, 38], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  const cardOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge
  const badgeOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const badgeX = interpolate(frame, [30, 50], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Stars
  const starsOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Price
  const priceOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const priceY = interpolate(frame, [60, 80], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // CTA
  const ctaOpacity = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = interpolate(frame, [90, 115], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });

  // Image shimmer
  const shimmerX = interpolate(frame, [20, 80], [-100, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#f8f8f5",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#e0e0e0 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.5 }} />

      {/* Card */}
      <div
        style={{
          width: 840,
          background: "white",
          borderRadius: 32,
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 24px 48px rgba(0,0,0,0.08)",
          overflow: "hidden",
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Product image area */}
        <div
          style={{
            height: 320,
            background: "linear-gradient(135deg, #0d0d1e 0%, #1a1a3a 50%, #0d1a2e 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Product icon */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 30,
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              boxShadow: "0 0 60px rgba(99,102,241,0.4)",
            }}
          >
            🎬
          </div>

          {/* Shimmer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 80,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              left: shimmerX + "%",
              transform: "skewX(-15deg)",
            }}
          />

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "#22c55e",
              color: "white",
              fontSize: 13,
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: 100,
              letterSpacing: "0.05em",
              opacity: badgeOpacity,
              transform: `translateX(${badgeX}px)`,
            }}
          >
            ✓ IN STOCK
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: "32px 36px 36px" }}>
          {/* Stars */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, opacity: starsOpacity }}>
            <div style={{ display: "flex", gap: 3 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ fontSize: 18, color: "#f59e0b" }}>★</span>
              ))}
            </div>
            <span style={{ fontSize: 14, color: "#888" }}>4.9 (2,341 reviews)</span>
          </div>

          {/* Product name */}
          <div style={{ fontSize: 36, fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.01em", marginBottom: 8 }}>
            SwiftClip Pro Bundle
          </div>
          <div style={{ fontSize: 18, color: "#888", marginBottom: 24, lineHeight: 1.5 }}>
            20 premium video templates for developers & creators — lifetime license.
          </div>

          {/* Price row */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 24, opacity: priceOpacity, transform: `translateY(${priceY}px)` }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: "#0a0a0a", letterSpacing: "-0.03em", lineHeight: 1 }}>$49</div>
            <div style={{ fontSize: 24, color: "#bbb", textDecoration: "line-through", marginBottom: 4 }}>$120</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#22c55e", background: "#dcfce7", padding: "4px 12px", borderRadius: 100, marginBottom: 4 }}>59% OFF</div>
          </div>

          {/* CTA */}
          <div
            style={{
              background: "#0a0a0a",
              borderRadius: 14,
              padding: "20px 0",
              textAlign: "center",
              fontSize: 20,
              fontWeight: 700,
              color: "white",
              opacity: ctaOpacity,
              transform: `scale(${ctaScale})`,
              letterSpacing: "0.02em",
            }}
          >
            Add to Cart →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
