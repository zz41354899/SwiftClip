import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface SaaSPromoProps {
  features?: string[];
  [key: string]: any;
}

export const SaaSPromo: React.FC<SaaSPromoProps> = ({
  features = ["Code-Driven", "Highly Customizable", "Lightning Fast"],
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #080810 0%, #0a0515 50%, #080810 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Title sequence */}
      <Sequence from={0} durationInFrames={150}>
        <TitlePart />
      </Sequence>

      {/* Features sequence */}
      <Sequence from={120} durationInFrames={750}>
        <FeaturesList features={features} />
      </Sequence>

      {/* Closing sequence */}
      <Sequence from={700} durationInFrames={200}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};

function TitlePart() {
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
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 1,
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: "#ffffff",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          backgroundImage:
            "linear-gradient(135deg, #c0c0c0 0%, #ffffff 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em",
        }}
      >
        SwiftClip Features
      </div>
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

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        opacity: itemOpacity,
        transform: `translateX(${itemX}px) scale(${scaleVal})`,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 12,
          background:
            "linear-gradient(135deg, rgba(192,192,192,0.2) 0%, rgba(192,192,192,0.1) 100%)",
          border: "2px solid rgba(192, 192, 192, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          backdropFilter: "blur(12px)",
        }}
      >
        {index === 0 ? "⚡" : index === 1 ? "💻" : "🚀"}
      </div>
      <div
        style={{
          fontSize: 42,
          fontWeight: 700,
          color: "#ffffff",
          maxWidth: 400,
          lineHeight: 1.3,
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
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 600,
          color: "#c0c0c0",
          transform: `scale(${scale})`,
        }}
      >
        Ready to create?
      </div>
    </div>
  );
}
