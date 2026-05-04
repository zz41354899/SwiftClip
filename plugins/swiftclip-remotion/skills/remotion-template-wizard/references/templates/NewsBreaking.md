# NewsBreaking

- **File**: `remotion/NewsBreaking.tsx`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 300 frames | 10s
- **Tags**: Broadcast, Motion

## Description

Apple Light Mode news broadcast with floating frosted-glass cards, animated ticker, and LIVE badge.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Headline text | main news headline node | edit text node in JSX |
| Ticker text | scrolling ticker string | edit ticker content string |
| LIVE badge | flashing red dot + "LIVE" | edit `livePulse` display logic |
| Red accent bar | sweeps in from left | edit `barX` interpolation or color |
| Network badge | top-left logo area | edit badge content |
| Time display | Clock icon area | edit time string |

## Visual style

Light mode broadcast layout. Red sweep bar bottom-left → "BREAKING" badge → main headline drops from top → scrolling ticker scrolls right-to-left → info bar fades in. Flashing LIVE indicator.

## Use cases

News-style announcements, product breaking news, dramatic reveal broadcasts, tech launch moments.

## Source

```tsx
import { Zap, Radio, Clock } from "lucide-react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const NewsBreaking: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red bar sweeps in from left
  const barX = interpolate(frame, [5, 30], [-300, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const breakingOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ticker scrolls right to left from frame 40 onward
  const tickerX = interpolate(frame, [40, 280], [1920, -3000], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tickerOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main headline drops in
  const headlineY = interpolate(frame, [25, 55], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const headlineOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo/network badge
  const badgeOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flashing "LIVE" indicator
  const livePulse = Math.sin(frame * 0.25) > 0;

  // Time and info bar
  const infoOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#f5f5f7",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Background photo placeholder */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #ffffff 0%, #f5f5f7 50%, #eaeaea 100%)",
          opacity: 0.8,
        }}
      />

      {/* Network logo top-left */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 48,
          opacity: badgeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            color: "#1d1d1f",
            fontWeight: 800,
            fontSize: 22,
            padding: "8px 20px",
            borderRadius: 16,
            letterSpacing: "0.05em",
          }}
        >
          NEWS<span style={{ color: "#ff3b30" }}>24</span>
        </div>
        {/* LIVE badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255, 59, 48, 0.1)",
            border: "1px solid rgba(255, 59, 48, 0.2)",
            padding: "8px 16px",
            borderRadius: 16,
            opacity: livePulse ? 1 : 0.5,
            backdropFilter: "blur(8px)",
          }}
        >
          <Radio size={18} color="#ff3b30" strokeWidth={3} />
          <span style={{ fontSize: 15, fontWeight: 800, color: "#ff3b30", letterSpacing: "0.15em" }}>LIVE</span>
        </div>
      </div>

      {/* Time */}
      <div
        style={{
          position: "absolute",
          top: 48,
          right: 48,
          fontSize: 18,
          color: "#86868b",
          fontWeight: 500,
          opacity: badgeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Clock size={18} />
        09:42 AM <span style={{ color: "rgba(0,0,0,0.2)" }}>|</span> APR 30, 2026
      </div>

      {/* Main headline area */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 80,
          right: 80,
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* BREAKING bar */}
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(255, 59, 48, 0.4)",
            padding: "12px 32px",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            transform: `translateX(${barX}px)`,
            boxShadow: "0 10px 30px rgba(255, 59, 48, 0.15)",
            borderRadius: 32,
            marginBottom: 20,
            zIndex: 2,
          }}
        >
          <Zap size={24} color="#ff3b30" fill="#ff3b30" strokeWidth={2.5} />
          <span style={{ fontSize: 20, fontWeight: 900, color: "#ff3b30", letterSpacing: "0.05em" }}>
            BREAKING NEWS
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            padding: "24px 48px",
            fontSize: 46,
            fontWeight: 800,
            color: "#1d1d1f",
            lineHeight: 1.25,
            maxWidth: "85%",
            letterSpacing: "-0.04em",
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
        >
          Major Breakthrough in Video Automation Technology Announced
        </div>

        {/* Sub-headline */}
        <div
          style={{
            background: "rgba(255,255,255,0.6)",
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "16px 48px",
            opacity: infoOpacity,
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(0,0,0,0.05)",
            color: "#86868b",
            fontSize: 20,
            fontWeight: 500,
            borderTop: "none",
            borderBottomRightRadius: 32,
            borderBottomLeftRadius: 32,
            marginTop: -1,
          }}
        >
          <span>SwiftClip releases 20 new templates for developers</span>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff3b30" }} />
          <span style={{ color: "#ff3b30", fontWeight: 700 }}>Full story developing</span>
        </div>
      </div>

      {/* Ticker */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 80,
          right: 80,
          height: 64,
          background: "rgba(255,255,255,0.6)",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          borderRadius: 32,
          backdropFilter: "blur(40px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          opacity: tickerOpacity,
        }}
      >
        <div
          style={{
            background: "#1d1d1f",
            padding: "0 32px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 900, color: "white", letterSpacing: "0.1em" }}>LATEST</span>
        </div>
        <div style={{ transform: `translateX(${tickerX}px)`, whiteSpace: "nowrap", fontSize: 20, fontWeight: 600, color: "#1d1d1f", letterSpacing: "0.02em", paddingLeft: 32 }}>
          ●&nbsp;&nbsp;&nbsp; SwiftClip launches 20 new video templates &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Remotion v5 release expected Q3 2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Video automation market hits $12B &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Developer tools surge in popularity
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
