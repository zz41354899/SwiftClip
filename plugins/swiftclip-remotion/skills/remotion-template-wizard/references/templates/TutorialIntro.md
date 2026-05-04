# TutorialIntro

- **File**: `remotion/TutorialIntro.tsx`
- **Tier**: prop-enabled
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 240 frames | 8s
- **Tags**: Tutorial, Education

## Description

Clean animated intro card for tutorials and online courses with title and chapter reveal.

## Props

| prop | type | default | legacy aliases |
| --- | --- | --- | --- |
| `headline` | string | `"Getting Started"` | `title` |
| `durationLabel` | string | `"5 min"` | `duration` |

Resolve helper: `resolveTutorialIntroCopy(props)` in `remotion/firstBatchProps.ts`

## Visual style

Centered card layout with frosted glass panel. Headline with clean entrance, duration badge reveal. Apple Light Mode aesthetic (#f5f5f7 background).

## Use cases

Tutorial intros, course chapters, walkthrough openers, educational content.

## Source

```tsx
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { Play, Clock } from "lucide-react";
import {
  resolveTutorialIntroCopy,
  type TutorialIntroTemplateProps,
} from "./firstBatchProps";

export const TutorialIntro: React.FC<TutorialIntroTemplateProps> = (props) => {
  const { headline, durationLabel } = resolveTutorialIntroCopy(props);
  const frame = useCurrentFrame();

  const cardY = interpolate(frame, [0, 40], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cardOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const playScale = interpolate(frame, [30, 80], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const textOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 48,
          transform: `translateY(${cardY}px)`,
          opacity: cardOpacity,
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          borderRadius: 48,
          padding: "100px 140px",
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${playScale})`,
            backdropFilter: "blur(40px)",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={40} fill="#000" color="#000" style={{ marginLeft: 6 }} />
          </div>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#1d1d1f",
            textAlign: "center",
            letterSpacing: "-0.04em",
            maxWidth: 600,
            lineHeight: 1.1,
          }}
        >
          {headline}
        </div>

        <div
          style={{
            opacity: textOpacity,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 32px",
            borderRadius: 32,
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.05)",
            fontSize: 24,
            fontWeight: 600,
            color: "#1d1d1f",
          }}
        >
          <Clock size={24} color="rgba(255,255,255,0.6)" />
          <span>{durationLabel}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
```
