# QuoteStory

- **Component**: `QuoteStory`
- **Tier**: hardcoded
- **Aspect ratio**: 9:16
- **Dimensions**: 1080×1920 | 30fps | 240 frames | 8s
- **Tags**: Social, Short-form

## Description

Vertical quote card with elegant author reveal for social media stories.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Quote text | `"Code is poetry. Motion is music. Together, they tell stories that data alone never could."` | edit `QUOTE` constant |
| Author name | `"Alex Kim"` | edit `AUTHOR` constant |
| Author role | `"CEO, SwiftClip"` | edit `ROLE` constant |
| Background | `#ffffff` | edit `AbsoluteFill` background |

## Visual style

Vertical white background. Frosted glass card with large quote icon. Words reveal one by one (typewriter cadence). Author name + role fade in after quote completes.

## Use cases

Inspirational story posts, CEO quotes, thought leadership shorts, vertical social content.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Quote, User } from "lucide-react";

const QUOTE = "Code is poetry. Motion is music. Together, they tell stories that data alone never could.";
const AUTHOR = "Alex Kim";
const ROLE = "CEO, SwiftClip";

export const QuoteStory: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardY = interpolate(frame, [10, 30], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cardOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const words = QUOTE.split(" ");
  const wordReveal = interpolate(frame, [25, 180], [0, words.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const visibleWords = Math.floor(wordReveal);

  const authorOpacity = interpolate(frame, [185, 215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 64px",
        opacity: bgOpacity,
      }}
    >
      <div style={{
        transform: `translateY(${cardY}px)`,
        opacity: cardOpacity,
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
        borderRadius: 48,
        padding: "80px",
        maxWidth: 900,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{ color: "rgba(0,0,0,0.1)", marginBottom: 40 }}>
          <Quote size={80} fill="currentColor" strokeWidth={0} />
        </div>

        <p style={{
          fontSize: 48,
          lineHeight: 1.4,
          fontWeight: 800,
          color: "#1d1d1f",
          textAlign: "center",
          margin: "0 0 48px",
          letterSpacing: "-0.04em",
        }}>
          {words.map((word, i) => (
            <span
              key={i}
              style={{
                opacity: i < visibleWords ? 1 : 0,
                color: i < visibleWords && i >= visibleWords - 3 ? "#0066cc" : "#1d1d1f",
                transition: "none",
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: authorOpacity,
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            background: "rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <User size={24} color="#1d1d1f" />
          </div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
              {AUTHOR}
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#86868b" }}>{ROLE}</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
