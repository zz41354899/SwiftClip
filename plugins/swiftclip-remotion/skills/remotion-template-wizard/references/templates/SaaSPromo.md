# SaaSPromo

- **Component**: `SaaSPromo`
- **Tier**: prop-enabled
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 900 frames | 30s
- **Tags**: SaaS, Marketing

## Description

Feature showcase animation for SaaS products with animated metric cards and smooth transitions.

## Props

| prop | type | default | legacy aliases |
| --- | --- | --- | --- |
| `headline` | string | `"SwiftClip Features"` | — |
| `featureItems` | string[] | `["Code-Driven", "Highly Customizable", "Lightning Fast"]` | `features` |


## Visual style

Multi-scene composition. Title section → feature list with staggered item reveals → closing beat. Frosted glass cards, Apple Light Mode palette.

## Use cases

SaaS feature showcases, product capability reels, multi-beat marketing narratives, investor demos.

## Source

```tsx
import { Zap, Laptop, Rocket, ArrowRight } from "lucide-react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
interface SaaSPromoTemplateProps {
  headline?: string;
  featureItems?: string[];
  features?: string[];
}

export const SaaSPromo: React.FC<SaaSPromoTemplateProps> = (props) => {
  const headline = props.headline ?? "SwiftClip Features";
  const featureItems = (props.featureItems ?? props.features ?? ["Code-Driven", "Highly Customizable", "Lightning Fast"])
    .map((item) => item.trim())
    .filter(Boolean);
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 60%)",
          filter: `blur(100px)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Title sequence */}
      <Sequence from={0} durationInFrames={150}>
        <TitlePart headline={headline} />
      </Sequence>

      {/* Features sequence */}
      <Sequence from={120} durationInFrames={750}>
        <FeaturesList features={featureItems} />
      </Sequence>

      {/* Closing sequence */}
      <Sequence from={700} durationInFrames={200}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};

interface TitlePartProps {
  headline: string;
}

function TitlePart({ headline }: TitlePartProps) {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [0, 40], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        fontSize: 80,
        fontWeight: 900,
        color: "#1d1d1f",
        opacity: titleOpacity,
        transform: `scale(${titleScale})`,
        backgroundImage:
          "linear-gradient(135deg, #1d1d1f 0%, #86868b 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.02em",
      }}
    >
      {headline}
    </div>
  );
}

interface FeaturesListProps {
  features: string[];
}

function FeaturesList({ features }: FeaturesListProps) {
  const frame = useCurrentFrame();

  const containerOpacity = interpolate(frame, [0, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        gap: 40,
        opacity: containerOpacity,
      }}
    >
      {features.map((feature, idx) => (
        <FeatureItem key={feature} text={feature} index={idx} />
      ))}
    </div>
  );
}

interface FeatureItemProps {
  text: string;
  index: number;
}

function FeatureItem({ text, index }: FeatureItemProps) {
  const frame = useCurrentFrame();
  const delay = index * 80;

  const itemOpacity = interpolate(frame, [delay, delay + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const itemX = interpolate(frame, [delay, delay + 60], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scaleVal = interpolate(frame, [delay, delay + 40], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const renderIcon = () => {
    const iconProps = { size: 44, color: "#0066cc", strokeWidth: 2 };
    if (index === 0) return <Zap {...iconProps} />;
    if (index === 1) return <Laptop {...iconProps} />;
    return <Rocket {...iconProps} />;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        opacity: itemOpacity,
        transform: `translateX(${itemX}px) scale(${scaleVal})`,
      }}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: 24,
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(20px)",
        }}
      >
        {renderIcon()}
      </div>
      <div
        style={{
          fontSize: 48,
          fontWeight: 600,
          color: "#1d1d1f",
          maxWidth: 400,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        {text}
      </div>
    </div>
  );
}

function Closing() {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 40], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "15%",
        left: 0,
        right: 0,
        textAlign: "center",
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 600,
          color: "#1d1d1f",
          transform: `scale(${scale})`,
          display: "flex",
          alignItems: "center",
          gap: 20,
          letterSpacing: "-0.01em"
        }}
      >
        <span>Ready to create?</span>
        <ArrowRight size={56} color="#ffffff" strokeWidth={2} />
      </div>
    </div>
  );
}
```
