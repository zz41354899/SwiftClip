# TypewriterQuote

- **Component**: `TypewriterQuote`
- **Tier**: prop-enabled
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 240 frames | 8s
- **Tags**: Social, Motion

## Description

Typewriter-style animated quote reveal with clean Apple Light Mode typography.

## Props

| prop | type | default | legacy aliases |
| --- | --- | --- | --- |
| `quote` | string | `"The best time to plant a tree was 20 years ago. The second best time is now."` | `text` |
| `author` | string | `"Chinese Proverb"` | `authorName` |


## Visual style

Centered frosted glass card. Quote reveals word-by-word with typewriter pacing. Author and attribution fade in after quote completes. Cursor blink during typing.

## Use cases

Inspirational quotes, customer testimonials, thought leadership, social proof clips.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Quote } from "lucide-react";

interface TypewriterQuoteTemplateProps {
  quote?: string;
  author?: string;
  text?: string;
  authorName?: string;
}

export const TypewriterQuote: React.FC<TypewriterQuoteTemplateProps> = (props) => {
  const quote = props.quote ?? props.text ?? "The best time to plant a tree was 20 years ago. The second best time is now.";
  const author = props.author ?? props.authorName ?? "Chinese Proverb";
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const charCount = Math.floor(
    interpolate(frame, [20, 160], [0, quote.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    })
  );

  const cursorVisible = frame % 15 < 8;
  const showCursor = charCount < quote.length || cursorVisible;

  const authorOpacity = interpolate(frame, [170, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const authorY = interpolate(frame, [170, 200], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const quoteScale = interpolate(frame, [5, 20], [1.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
  });

  const quoteOpacity = interpolate(frame, [5, 20], [0, 1], {
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
        opacity: bgOpacity,
      }}
    >
      <div style={{
          position: "relative",
          maxWidth: 900,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
      }}>
        <div style={{
            color: "#1d1d1f",
            opacity: quoteOpacity,
            transform: `scale(${quoteScale})`,
            marginBottom: 48,
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 48,
            background: "rgba(0,0,0,0.05)",
          }}
        >
          <Quote size={40} fill="#1d1d1f" strokeWidth={0} />
        </div>

        <p style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#1d1d1f",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.04em",
          }}
        >
          {quote.slice(0, charCount)}
          {showCursor && charCount < quote.length && (
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 64,
                background: "#0066cc",
                marginLeft: 8,
                verticalAlign: "text-bottom",
                borderRadius: 4,
              }}
            />
          )}
        </p>

        <div style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: authorOpacity,
            transform: `translateY(${authorY}px)`,
          }}
        >
          <div style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#86868b",
              letterSpacing: "-0.02em",
            }}
          >
            {author}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
