export interface Template {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration: string;
  codeSnippet: string;
  remotionId: string;
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
  videoUrl: string;
}

export const templates: Template[] = [
  {
    id: "product-launch",
    title: "Product Launch",
    description: "Cinematic reveal animation for product announcements with smooth transitions.",
    tags: ["Marketing", "Branding"],
    duration: "15s",
    remotionId: "product-launch",
    fps: 30,
    durationInFrames: 450,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/product-launch.mp4",
    codeSnippet: `import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface ProductLaunchProps {
  title?: string;
  subtitle?: string;
  [key: string]: any;
}

export const ProductLaunch: React.FC<ProductLaunchProps> = ({
  title = "SwiftClip",
  subtitle = "High-performance Remotion templates",
}) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 40], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [30, 70], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const glowScale = interpolate(frame, [0, 150], [0.8, 1.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#080810",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,192,192,0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.4,
          transform: \`scale(\${glowScale})\`,
          top: "-20%",
          left: "-10%",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: 30,
            opacity: titleOpacity,
            transform: \`translateY(\${titleY}px)\`,
            backgroundImage: "linear-gradient(135deg, #ffffff 0%, #c0c0c0 50%, #8c8c8c 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 300,
            color: "rgba(255, 255, 255, 0.6)",
            opacity: subtitleOpacity,
            transform: \`translateY(\${subtitleY}px)\`,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};`,
  },
  {
    id: "tutorial-intro",
    title: "Tutorial Intro",
    description: "Clean animated intro card for YouTube tutorials and educational content.",
    tags: ["Education", "YouTube"],
    duration: "8s",
    remotionId: "tutorial-intro",
    fps: 30,
    durationInFrames: 240,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/tutorial-intro.mp4",
    codeSnippet: `import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface TutorialIntroProps {
  title?: string;
  duration?: string;
  [key: string]: any;
}

export const TutorialIntro: React.FC<TutorialIntroProps> = ({
  title = "Getting Started",
  duration = "5 min",
}) => {
  const frame = useCurrentFrame();

  const cardX = interpolate(frame, [0, 40], [-200, 0], {
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
        background: "linear-gradient(135deg, #080810 0%, #0a0a14 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          transform: \`translateX(\${cardX}px)\`,
          opacity: cardOpacity,
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            border: "2px solid rgba(192, 192, 192, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: \`scale(\${playScale})\`,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ffffff 0%, #c0c0c0 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ color: "#080810", marginLeft: 3 }}>\u25B6</div>
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            opacity: textOpacity,
            padding: "8px 16px",
            borderRadius: 24,
            background: "rgba(192, 192, 192, 0.1)",
            border: "1px solid rgba(192, 192, 192, 0.2)",
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.6)",
          }}
        >
          ⏱️ {duration}
        </div>
      </div>
    </AbsoluteFill>
  );
};`,
  },
  {
    id: "saas-promo",
    title: "SaaS Promo",
    description: "Feature highlight reel with glassmorphism UI mockups and smooth data animations.",
    tags: ["Marketing", "Business"],
    duration: "30s",
    remotionId: "saas-promo",
    fps: 30,
    durationInFrames: 900,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/saas-promo.mp4",
    codeSnippet: `import {
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
        background: "linear-gradient(135deg, #080810 0%, #0a0515 50%, #080810 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      <Sequence from={0} durationInFrames={150}>
        <TitlePart />
      </Sequence>
      <Sequence from={120} durationInFrames={750}>
        <FeaturesList features={features} />
      </Sequence>
      <Sequence from={700} durationInFrames={200}>
        <Closing />
      </Sequence>
    </AbsoluteFill>
  );
};

function TitlePart() {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleScale = interpolate(frame, [0, 40], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ position: "absolute", top: "20%", left: 0, right: 0, textAlign: "center" }}>
      <div style={{ fontSize: 80, fontWeight: 900, color: "#ffffff", opacity: titleOpacity, transform: \`scale(\${titleScale})\`, backgroundImage: "linear-gradient(135deg, #c0c0c0 0%, #ffffff 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        SwiftClip Features
      </div>
    </div>
  );
}

function FeaturesList({ features }: { features: string[] }) {
  const frame = useCurrentFrame();
  const containerOpacity = interpolate(frame, [0, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", gap: 40, opacity: containerOpacity }}>
      {features.map((feature, idx) => (
        <FeatureItem key={feature} text={feature} index={idx} />
      ))}
    </div>
  );
}

function FeatureItem({ text, index }: { text: string; index: number }) {
  const frame = useCurrentFrame();
  const delay = index * 80;
  const itemOpacity = interpolate(frame, [delay, delay + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const itemX = interpolate(frame, [delay, delay + 60], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, opacity: itemOpacity, transform: \`translateX(\${itemX}px)\` }}>
      <div style={{ width: 80, height: 80, borderRadius: 12, background: "rgba(192,192,192,0.15)", border: "2px solid rgba(192,192,192,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
        {index === 0 ? "\u26A1" : index === 1 ? "\u1F4BB" : "\u1F680"}
      </div>
      <div style={{ fontSize: 42, fontWeight: 700, color: "#ffffff", maxWidth: 400, lineHeight: 1.3 }}>{text}</div>
    </div>
  );
}

function Closing() {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", bottom: "15%", left: 0, right: 0, textAlign: "center", opacity }}>
      <div style={{ fontSize: 48, fontWeight: 600, color: "#c0c0c0" }}>Ready to create?</div>
    </div>
  );
}`,
  },
  {
    id: "social-story",
    title: "Social Story",
    description: "Vertical 9:16 story template optimised for Instagram and TikTok reels.",
    tags: ["Social", "Reels"],
    duration: "10s",
    remotionId: "social-story",
    fps: 30,
    durationInFrames: 300,
    width: 1080,
    height: 1920,
    videoUrl: "/videos/social-story.mp4",
    codeSnippet: `import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface SocialStoryProps {
  headline?: string;
  subline?: string;
  handle?: string;
  [key: string]: any;
}

export const SocialStory: React.FC<SocialStoryProps> = ({
  headline = "SwiftClip",
  subline = "Remotion templates that ship fast",
  handle = "@swiftclip",
}) => {
  const frame = useCurrentFrame();

  const headlineY = interpolate(frame, [20, 60], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const headlineOpacity = interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sublineY = interpolate(frame, [50, 90], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const sublineOpacity = interpolate(frame, [50, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeScale = interpolate(frame, [80, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const handleOpacity = interpolate(frame, [220, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(to bottom, #0f0a1e 0%, #1a0533 60%, #0d0d1a 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "0 80px", textAlign: "center" }}>
        <div style={{ transform: \`scale(\${badgeScale})\`, background: "linear-gradient(135deg, #8b5cf6, #ec4899)", borderRadius: 100, padding: "10px 32px", fontSize: 26, fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>
          New Template
        </div>
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.05, color: "#ffffff", opacity: headlineOpacity, transform: \`translateY(\${headlineY}px)\`, letterSpacing: "-0.03em" }}>
          {headline}
        </div>
        <div style={{ fontSize: 38, fontWeight: 400, color: "rgba(255,255,255,0.65)", opacity: sublineOpacity, transform: \`translateY(\${sublineY}px)\`, lineHeight: 1.4 }}>
          {subline}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 100, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: handleOpacity }}>
        <span style={{ fontSize: 30, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{handle}</span>
      </div>
    </AbsoluteFill>
  );
};`,
  },
  {
    id: "data-viz",
    title: "Data Visualisation",
    description: "Animated bar charts, line graphs, and KPI counters for reports and dashboards.",
    tags: ["Business", "Data"],
    duration: "20s",
    remotionId: "data-viz",
    fps: 30,
    durationInFrames: 600,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/data-viz.mp4",
    codeSnippet: `import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface DataVizProps {
  title?: string;
  metric?: string;
  label?: string;
  [key: string]: any;
}

const BAR_DATA = [
  { label: "Q1", value: 0.55, color: "#6366f1" },
  { label: "Q2", value: 0.72, color: "#8b5cf6" },
  { label: "Q3", value: 0.48, color: "#6366f1" },
  { label: "Q4", value: 0.91, color: "#a78bfa" },
  { label: "Jan", value: 0.64, color: "#6366f1" },
  { label: "Feb", value: 0.83, color: "#8b5cf6" },
  { label: "Mar", value: 0.76, color: "#6366f1" },
];

export const DataViz: React.FC<DataVizProps> = ({
  title = "Revenue Growth",
  metric = "+91%",
  label = "Year-over-Year",
}) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 40], [-30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const metricOpacity = interpolate(frame, [20, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const counterValue = interpolate(frame, [40, 200], [0, 91], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const lineWidth = interpolate(frame, [0, 80], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a14 0%, #0d0821 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        padding: "80px 100px",
        overflow: "hidden",
      }}
    >
      <div style={{ opacity: titleOpacity, transform: \`translateY(\${titleY}px)\`, marginBottom: 40 }}>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1", marginBottom: 12 }}>Analytics</div>
        <div style={{ fontSize: 56, fontWeight: 800, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>{title}</div>
        <div style={{ height: 3, width: \`\${lineWidth}%\`, background: "linear-gradient(90deg, #6366f1, #8b5cf6, transparent)", borderRadius: 4, marginTop: 16 }} />
      </div>
      <div style={{ opacity: metricOpacity, marginBottom: 48, display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontSize: 88, fontWeight: 900, color: "#a78bfa", letterSpacing: "-0.04em", lineHeight: 1 }}>
          +{Math.round(counterValue)}%
        </span>
        <span style={{ fontSize: 24, color: "rgba(255,255,255,0.4)" }}>{label}</span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 20 }}>
        {BAR_DATA.map((bar, i) => {
          const barH = interpolate(frame, [60 + i * 15, 110 + i * 15], [0, bar.value * 340], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          const opacity = interpolate(frame, [60 + i * 15, 80 + i * 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={bar.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 12, flex: 1, opacity }}>
              <div style={{ width: "100%", height: barH, background: \`linear-gradient(to top, \${bar.color}, \${bar.color}99)\`, borderRadius: "8px 8px 0 0" }} />
              <span style={{ fontSize: 22, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{bar.label}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};`,
  },
  {
    id: "lower-third",
    title: "Lower Third",
    description: "Elegant animated lower-third overlays for interviews and presentations.",
    tags: ["Broadcast", "YouTube"],
    duration: "5s",
    remotionId: "lower-third",
    fps: 30,
    durationInFrames: 150,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/lower-third.mp4",
    codeSnippet: `import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";

interface LowerThirdProps {
  name?: string;
  title?: string;
  company?: string;
  [key: string]: any;
}

export const LowerThird: React.FC<LowerThirdProps> = ({
  name = "Alex Johnson",
  title = "Head of Design",
  company = "SwiftClip",
}) => {
  const frame = useCurrentFrame();

  const barX = interpolate(frame, [0, 35], [-600, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const nameOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nameX = interpolate(frame, [20, 50], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const subOpacity = interpolate(frame, [35, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subX = interpolate(frame, [35, 65], [-30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const overallOpacity = interpolate(frame, [110, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        display: "flex",
        alignItems: "flex-end",
        padding: "0 80px 120px",
        overflow: "hidden",
      }}
    >
      <div style={{ opacity: overallOpacity, display: "flex", flexDirection: "row", alignItems: "stretch", gap: 0, transform: \`translateX(\${barX}px)\`, overflow: "hidden" }}>
        <div style={{ width: 6, background: "linear-gradient(to bottom, #6366f1, #8b5cf6)", borderRadius: "4px 0 0 4px", minHeight: 80 }} />
        <div style={{ background: "rgba(9, 9, 15, 0.82)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderLeft: "none", borderRadius: "0 12px 12px 0", padding: "20px 32px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 42, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em", lineHeight: 1.1, opacity: nameOpacity, transform: \`translateX(\${nameX}px)\` }}>
            {name}
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.55)", fontWeight: 400, opacity: subOpacity, transform: \`translateX(\${subX}px)\`, display: "flex", alignItems: "center", gap: 12 }}>
            <span>{title}</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
            <span style={{ color: "#8b5cf6", fontWeight: 600 }}>{company}</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "testimonial-card",
    title: "Testimonial Card",
    description: "Animated customer quote card with star rating, glassmorphism design, and author slide-in reveal.",
    tags: ["Marketing", "Social"],
    duration: "8s",
    remotionId: "TestimonialCard",
    fps: 30,
    durationInFrames: 240,
    width: 1080,
    height: 1080,
    videoUrl: "/videos/testimonial-card.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const TestimonialCard: React.FC = () => {
  const frame = useCurrentFrame();

  const cardScale = interpolate(frame, [10, 45], [0.88, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  const starsOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const quoteOpacity = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const quoteY = interpolate(frame, [55, 85], [30, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const authorOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #0a0a12, #12102a, #0a1020)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 36, padding: "72px 80px", width: 880, transform: \`scale(\${cardScale})\` }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 32, opacity: starsOpacity }}>
          {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 36, color: "#f59e0b" }}>★</span>)}
        </div>
        <p style={{ fontSize: 34, lineHeight: 1.65, color: "rgba(255,255,255,0.88)", margin: "0 0 48px", opacity: quoteOpacity, transform: \`translateY(\${quoteY}px)\` }}>
          "SwiftClip completely changed our content workflow. We produce 10× more video content at a fraction of the cost."
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 24, opacity: authorOpacity }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "white" }}>SL</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 600, color: "white" }}>Sarah Lin</div>
            <div style={{ fontSize: 18, color: "rgba(255,255,255,0.45)" }}>Head of Marketing · Acme Corp</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "countdown-timer",
    title: "Countdown Timer",
    description: "Dramatic 5-4-3-2-1-GO! countdown with animated SVG ring, color-per-digit, and explosive GO reveal.",
    tags: ["Events", "Broadcast"],
    duration: "7s",
    remotionId: "CountdownTimer",
    fps: 30,
    durationInFrames: 210,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/countdown-timer.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const DIGITS = [5, 4, 3, 2, 1];
const FRAMES_PER_DIGIT = 36;
const TOTAL = DIGITS.length * FRAMES_PER_DIGIT;
const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#6366f1"];

export const CountdownTimer: React.FC = () => {
  const frame = useCurrentFrame();
  const isGo = frame >= TOTAL;
  const idx = Math.min(Math.floor(frame / FRAMES_PER_DIGIT), DIGITS.length - 1);
  const inDigit = frame % FRAMES_PER_DIGIT;
  const color = COLORS[idx];
  const radius = 180;
  const circ = 2 * Math.PI * radius;

  const numOpacity = !isGo ? interpolate(inDigit, [0, 6, 28, FRAMES_PER_DIGIT], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
  const numScale = !isGo ? interpolate(inDigit, [0, 18, FRAMES_PER_DIGIT], [1.5, 1, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) : 1;
  const goOpacity = interpolate(frame, [TOTAL, TOTAL + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const goScale = interpolate(frame, [TOTAL, TOTAL + 20], [1.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.1)) });

  return (
    <AbsoluteFill style={{ background: "#06060e", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, " + color + "18 0%, transparent 70%)", filter: "blur(60px)" }} />
      {!isGo && (
        <svg width={420} height={420} style={{ position: "absolute" }} viewBox="0 0 420 420">
          <circle cx={210} cy={210} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
          <circle cx={210} cy={210} r={radius} fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (inDigit / FRAMES_PER_DIGIT)} transform="rotate(-90 210 210)" style={{ filter: "drop-shadow(0 0 16px " + color + ")" }} />
        </svg>
      )}
      {!isGo && <div style={{ fontSize: 260, fontWeight: 900, color: "white", opacity: numOpacity, transform: \`scale(\${numScale})\`, letterSpacing: "-0.06em" }}>{DIGITS[idx]}</div>}
      {isGo && <div style={{ fontSize: 260, fontWeight: 900, letterSpacing: "-0.04em", opacity: goOpacity, transform: \`scale(\${goScale})\`, background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>GO!</div>}
    </AbsoluteFill>
  );
};`
  },
  {
    id: "brand-reveal",
    title: "Brand Reveal",
    description: "Cinematic logo and brand name reveal with scan line sweep, corner markers, and character-by-character reveal.",
    tags: ["Branding", "Marketing"],
    duration: "6s",
    remotionId: "BrandReveal",
    fps: 30,
    durationInFrames: 180,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/brand-reveal.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const BRAND_NAME = "BRAND";

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const logoScale = interpolate(frame, [5, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const logoRotation = interpolate(frame, [5, 45], [45, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const charReveal = Math.floor(interpolate(frame, [35, 75], [0, BRAND_NAME.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const lineWidth = interpolate(frame, [70, 115], [0, 640], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const tagOpacity = interpolate(frame, [82, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#050508", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 100, height: 100, borderRadius: 24, background: "linear-gradient(135deg, #6366f1, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 40, transform: \`scale(\${logoScale}) rotate(\${logoRotation}deg)\`, boxShadow: "0 0 60px rgba(99,102,241,0.4)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.9)", transform: "rotate(15deg)" }} />
        </div>
        <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: "0.15em", color: "white", display: "flex" }}>
          {BRAND_NAME.split("").map((c, i) => <span key={i} style={{ opacity: i < charReveal ? 1 : 0 }}>{c}</span>)}
        </div>
        <div style={{ height: 2, width: lineWidth, background: "linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)", marginTop: 16, boxShadow: "0 0 20px rgba(99,102,241,0.5)" }} />
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.3)", letterSpacing: "0.4em", textTransform: "uppercase", marginTop: 24, opacity: tagOpacity }}>Your tagline goes here</div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "vertical-story",
    title: "Vertical Story",
    description: "Bold 9:16 vertical promo for Reels, TikTok & Shorts — badge, gradient headline, feature cards, pulsing CTA.",
    tags: ["Reels", "Social"],
    duration: "10s",
    remotionId: "VerticalStory",
    fps: 30,
    durationInFrames: 300,
    width: 1080,
    height: 1920,
    videoUrl: "/videos/vertical-story.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const FEATURES = [
  { emoji: "⚡", text: "10× faster than manual editing" },
  { emoji: "🎨", text: "Beautiful, production-ready templates" },
  { emoji: "🚀", text: "Ship polished video in minutes" },
];

export const VerticalStory: React.FC = () => {
  const frame = useCurrentFrame();

  const headlineOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headlineY = interpolate(frame, [20, 50], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #0a0a14, #12102a, #0d1a2e)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 72px" }}>
      <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.08, textAlign: "center", color: "white", letterSpacing: "-0.03em", marginBottom: 32, opacity: headlineOpacity, transform: \`translateY(\${headlineY}px)\` }}>
        Make Videos<br />
        <span style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>10× Faster</span>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 20, marginBottom: 72 }}>
        {FEATURES.map((f, i) => {
          const fOpacity = interpolate(frame, [70 + i * 22, 90 + i * 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "26px 36px", opacity: fOpacity }}>
            <span style={{ fontSize: 44 }}>{f.emoji}</span>
            <span style={{ fontSize: 30, color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>{f.text}</span>
          </div>;
        })}
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "end-screen",
    title: "End Screen",
    description: "YouTube-style end screen with subscribe button bounce, bell ring, and sliding video cards.",
    tags: ["YouTube", "Broadcast"],
    duration: "7s",
    remotionId: "EndScreen",
    fps: 30,
    durationInFrames: 210,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/end-screen.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const EndScreen: React.FC = () => {
  const frame = useCurrentFrame();

  const subScale = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.6)) });
  const card1X = interpolate(frame, [20, 55], [-500, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const card2X = interpolate(frame, [35, 70], [500, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const bellAngle = Math.sin((frame - 80) * 0.5) * 12;

  return (
    <AbsoluteFill style={{ background: "#0f0f0f", fontFamily: "Inter, sans-serif" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#ff0000" }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 60 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #ff0000, #cc0000)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: "white", marginBottom: 12 }}>YC</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "white" }}>YourChannel</div>
        <div style={{ transform: \`scale(\${subScale})\`, marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#ff0000", borderRadius: 100, padding: "14px 32px", fontSize: 18, fontWeight: 700, color: "white" }}>
            <span style={{ transform: \`rotate(\${bellAngle}deg)\`, display: "inline-block" }}>🔔</span>
            SUBSCRIBE
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 40 }}>
        <div style={{ width: 380, transform: \`translateX(\${card1X}px)\` }}>
          <div style={{ width: "100%", height: 214, background: "linear-gradient(135deg, #1a1a2e, #16213e)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 48, opacity: 0.4 }}>▶</div></div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white", marginTop: 12 }}>How to Build Animated Videos with Remotion</div>
        </div>
        <div style={{ width: 380, transform: \`translateX(\${card2X}px)\` }}>
          <div style={{ width: "100%", height: 214, background: "linear-gradient(135deg, #0d1117, #1a1a2e)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ fontSize: 48, opacity: 0.4 }}>▶</div></div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "white", marginTop: 12 }}>10 Best Free Video Templates for Developers</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "metric-dashboard",
    title: "Metric Dashboard",
    description: "Animated KPI dashboard with three counter cards — revenue, users, and churn rate — with progress bars.",
    tags: ["Business", "Data"],
    duration: "8s",
    remotionId: "MetricDashboard",
    fps: 30,
    durationInFrames: 240,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/metric-dashboard.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const METRICS = [
  { label: "Monthly Revenue", value: 128500, prefix: "$", color: "#22c55e" },
  { label: "Active Users", value: 24830, prefix: "", color: "#6366f1" },
  { label: "Churn Rate", value: 2.4, prefix: "", suffix: "%", color: "#f59e0b" },
];

export const MetricDashboard: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #060b14, #0a1628)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 80px" }}>
      <div style={{ fontSize: 46, fontWeight: 800, color: "white", marginBottom: 64 }}>Performance Overview</div>
      <div style={{ display: "flex", gap: 32, width: "100%" }}>
        {METRICS.map((m, i) => {
          const delay = 30 + i * 25;
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const val = interpolate(frame, [delay + 10, delay + 80], [0, m.value], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          const displayVal = m.suffix ? val.toFixed(1) : Math.floor(val).toLocaleString();
          return (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "40px 36px", opacity: cardOpacity, position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: m.color }} />
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>{m.label}</div>
              <div style={{ fontSize: 68, fontWeight: 900, color: "white" }}>{m.prefix}{displayVal}{m.suffix}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "typewriter-quote",
    title: "Typewriter Quote",
    description: "Classic black background quote that types itself character by character with a blinking cursor.",
    tags: ["Minimal", "Social"],
    duration: "8s",
    remotionId: "TypewriterQuote",
    fps: 30,
    durationInFrames: 240,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/typewriter-quote.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const QUOTE = "The best time to plant a tree was 20 years ago. The second best time is now.";

export const TypewriterQuote: React.FC = () => {
  const frame = useCurrentFrame();

  const charCount = Math.floor(interpolate(frame, [20, 160], [0, QUOTE.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const cursorVisible = frame % 15 < 8;
  const authorOpacity = interpolate(frame, [170, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#080808", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 160px" }}>
      <p style={{ fontSize: 52, lineHeight: 1.7, color: "white", fontStyle: "italic", textAlign: "center", margin: "0 0 60px" }}>
        {QUOTE.slice(0, charCount)}
        {charCount < QUOTE.length && cursorVisible && <span style={{ display: "inline-block", width: 3, height: "1em", background: "white", marginLeft: 2, verticalAlign: "text-bottom" }} />}
      </p>
      <div style={{ opacity: authorOpacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ height: 1, width: 120, background: "rgba(255,255,255,0.25)" }} />
        <div style={{ fontSize: 22, fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", letterSpacing: "0.25em", textTransform: "uppercase" }}>— Chinese Proverb</div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "dynamic-island",
    title: "Apple Dynamic Island",
    description: "Smooth fluid Dynamic Island animation that expands to reveal content and collapses like Apple iOS.",
    tags: ["UI", "Motion"],
    duration: "5s",
    remotionId: "DynamicIsland",
    fps: 30,
    durationInFrames: 150,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/dynamic-island.mp4",
    codeSnippet: `import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const DynamicIsland: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const initialPop = spring({ frame, fps, config: { damping: 14 } });
  const expandProgress = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const collapseProgress = spring({ frame: frame - 110, fps, config: { damping: 14 } });

  const pillBaseWidth = 140;
  const pillBaseHeight = 44;
  const pillExpandedWidth = 380;
  const pillExpandedHeight = 100;

  const currentWidth = interpolate(collapseProgress, [0, 1], [
    interpolate(expandProgress, [0, 1], [pillBaseWidth, pillExpandedWidth]),
    pillBaseWidth
  ]);

  const currentHeight = interpolate(collapseProgress, [0, 1], [
    interpolate(expandProgress, [0, 1], [pillBaseHeight, pillExpandedHeight]),
    pillBaseHeight
  ]);

  const borderRadius = currentHeight / 2.5; 
  const topPadding = 20;

  const expandedContentOpacity = interpolate(collapseProgress, [0, 0.5], [
    interpolate(expandProgress, [0.5, 1], [0, 1]),
    0
  ]);

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
      <div
        style={{
          position: "absolute",
          top: topPadding,
          left: "50%",
          transform: \`translateX(-50%) scale(\${interpolate(initialPop, [0, 1], [0.8, 1])})\`,
          opacity: interpolate(initialPop, [0.5, 1], [0, 1]),
          width: currentWidth,
          height: currentHeight,
          backgroundColor: "#000000",
          borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ opacity: expandedContentOpacity, color: "white", display: "flex", flexDirection: "row", alignItems: "center", width: "100%", padding: "0 24px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: "#333", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #FF9F0A 0%, #FF375F 100%)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#8e8e93" }}>Incoming...</span>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>0:12</span>
                </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 14, height: 14, backgroundColor: "#FF453A", borderRadius: 7 }} />
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#32D74B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 16, height: 16, border: "2px solid #fff", borderRadius: 8 }} />
                </div>
            </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "pricing-card",
    title: "Pricing Card",
    description: "SaaS pricing plan reveal with animated features list, rotating border ring, and spring CTA button.",
    tags: ["Marketing", "Business"],
    duration: "8s",
    remotionId: "PricingCard",
    fps: 30,
    durationInFrames: 240,
    width: 1080,
    height: 1080,
    videoUrl: "/videos/pricing-card.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const FEATURES = ["Real-time collaboration", "99.9% uptime SLA", "End-to-end encryption", "One-click integrations"];

export const PricingCard: React.FC = () => {
  const frame = useCurrentFrame();
  const cardScale = interpolate(frame, [10, 45], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.3)) });
  const priceOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaScale = interpolate(frame, [130, 160], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #09090f, #0f0e1f)", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", width: 820, height: 820, borderRadius: "50%", border: "1px dashed rgba(168,85,247,0.08)", transform: \`rotate(\${-frame * 0.2}deg)\` }} />
      <div style={{ width: 780, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 36, padding: "56px 64px", transform: \`scale(\${cardScale})\`, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)", borderRadius: "36px 36px 0 0" }} />
        <div style={{ fontSize: 14, color: "#a5b4fc", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Pro Plan</div>
        <div style={{ opacity: priceOpacity, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <span style={{ fontSize: 28, color: "rgba(255,255,255,0.6)", marginTop: 12 }}>$</span>
            <span style={{ fontSize: 100, fontWeight: 900, color: "white", lineHeight: 1 }}>79</span>
            <span style={{ fontSize: 22, color: "rgba(255,255,255,0.3)", marginTop: 18 }}>/mo</span>
          </div>
        </div>
        {FEATURES.map((f, i) => {
          const fOpacity = interpolate(frame, [70 + i * 15, 90 + i * 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, opacity: fOpacity }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(99,102,241,0.2)", border: "1px solid #6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1" }} /></div>
            <span style={{ fontSize: 18, color: "rgba(255,255,255,0.75)" }}>{f}</span>
          </div>;
        })}
        <div style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", borderRadius: 16, padding: "22px 0", textAlign: "center", fontSize: 20, fontWeight: 700, color: "white", transform: \`scale(\${ctaScale})\`, marginTop: 8 }}>Start Free Trial →</div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "bar-chart",
    title: "Bar Chart",
    description: "Monthly revenue bar chart that grows upward with staggered bars, gradient fills, and animated value labels.",
    tags: ["Business", "Data"],
    duration: "8s",
    remotionId: "BarChart",
    fps: 30,
    durationInFrames: 240,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/bar-chart.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const BARS = [
  { label: "Jan", value: 65 }, { label: "Feb", value: 82 }, { label: "Mar", value: 74 },
  { label: "Apr", value: 91 }, { label: "May", value: 88 }, { label: "Jun", value: 100 },
];
const MAX_H = 320;

export const BarChart: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #07070f, #0d0b1e)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 100px 80px" }}>
      <div style={{ fontSize: 46, fontWeight: 800, color: "white", marginBottom: 56, opacity: titleOpacity }}>Monthly Revenue</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 32 }}>
        {BARS.map((bar, i) => {
          const delay = 30 + i * 12;
          const barH = interpolate(frame, [delay, delay + 45], [0, (bar.value / 100) * MAX_H], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          const labelOpacity = interpolate(frame, [delay + 40, delay + 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#6366f1", marginBottom: 8, opacity: labelOpacity }}>{bar.value}%</div>
              <div style={{ width: 72, height: barH, background: "linear-gradient(to top, #6366f1, #a855f7)", borderRadius: "8px 8px 0 0", boxShadow: "0 -4px 20px rgba(99,102,241,0.4)" }} />
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", marginTop: 12, opacity: labelOpacity }}>{bar.label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "split-reveal",
    title: "Split Reveal",
    description: "Two panels slide apart to reveal a centered product name — before/after dramatic split-screen effect.",
    tags: ["Branding", "Motion"],
    duration: "6s",
    remotionId: "SplitReveal",
    fps: 30,
    durationInFrames: 180,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/split-reveal.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const SplitReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const leftX = interpolate(frame, [10, 55], [0, -960], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const rightX = interpolate(frame, [10, 55], [0, 960], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const contentOpacity = interpolate(frame, [40, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const contentScale = interpolate(frame, [40, 70], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.1)) });

  return (
    <AbsoluteFill style={{ background: "#f0ede8", fontFamily: "Inter, sans-serif", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: contentOpacity, transform: \`scale(\${contentScale})\` }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 140, fontWeight: 900, color: "#0a0a0a", letterSpacing: "-0.04em", lineHeight: 0.9 }}>SWIFT<br /><span style={{ color: "#6366f1" }}>CLIP</span></div>
        </div>
      </div>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "50%", background: "#1a1a2e", transform: \`translateX(\${leftX}px)\`, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 60, zIndex: 10 }}>
        <div style={{ fontSize: 80, fontWeight: 900, color: "white" }}>BEFORE</div>
      </div>
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "50%", background: "#6366f1", transform: \`translateX(\${rightX}px)\`, display: "flex", alignItems: "center", paddingLeft: 60, zIndex: 10 }}>
        <div style={{ fontSize: 80, fontWeight: 900, color: "white" }}>AFTER</div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "event-promo",
    title: "Event Promo",
    description: "Gold-themed event announcement with flipping countdown digits, particle dots, and venue details.",
    tags: ["Events", "Marketing"],
    duration: "8s",
    remotionId: "EventPromo",
    fps: 30,
    durationInFrames: 240,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/event-promo.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const EventPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const titleScale = interpolate(frame, [10, 45], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.2)) });
  const titleOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const detailsOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #0a0800, #1a1200, #0a0600)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: \`scale(\${titleScale})\`, opacity: titleOpacity, textAlign: "center" }}>
        <div style={{ fontSize: 130, fontWeight: 900, background: "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BuildConf</div>
      </div>
      <div style={{ fontSize: 22, color: "rgba(251,191,36,0.55)", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 16, marginBottom: 48 }}>The Developer Conference</div>
      <div style={{ display: "flex", gap: 40, opacity: detailsOpacity }}>
        {[["DATE", "MAY 24, 2026"], ["LOCATION", "San Francisco, CA"], ["TICKETS", "Limited Seats"]].map(([label, val]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fbbf24" }}>{val}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "subscribe-cta",
    title: "Subscribe CTA",
    description: "YouTube subscribe call-to-action with avatar spring-in, bell shake animation, and ripple pulse rings.",
    tags: ["YouTube", "Social"],
    duration: "6s",
    remotionId: "SubscribeCTA",
    fps: 30,
    durationInFrames: 180,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/subscribe-cta.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const SubscribeCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const avatarScale = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.6)) });
  const buttonScale = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const bellAngle = frame > 110 && frame < 145 ? Math.sin((frame - 110) * 0.7) * 20 * Math.max(0, 1 - (frame - 110) / 35) : 0;

  return (
    <AbsoluteFill style={{ background: "#0f0f0f", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#ff0000" }} />
      <div style={{ width: 140, height: 140, borderRadius: "50%", background: "linear-gradient(135deg, #ff0000, #cc0000)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, fontWeight: 900, color: "white", marginBottom: 28, transform: \`scale(\${avatarScale})\` }}>YT</div>
      <div style={{ fontSize: 40, fontWeight: 800, color: "white", marginBottom: 8 }}>YourChannel</div>
      <div style={{ fontSize: 20, color: "rgba(255,255,255,0.35)", marginBottom: 48 }}>1.2M subscribers</div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#ff0000", borderRadius: 100, padding: "20px 48px", fontSize: 26, fontWeight: 700, color: "white", transform: \`scale(\${buttonScale})\`, boxShadow: "0 8px 40px rgba(255,0,0,0.35)" }}>
        <span style={{ fontSize: 28, transform: \`rotate(\${bellAngle}deg)\`, display: "inline-block", transformOrigin: "top center" }}>🔔</span>
        SUBSCRIBE
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "news-breaking",
    title: "News Breaking",
    description: "TV-style breaking news template with sweeping red bar, scrolling ticker, LIVE badge, and headline drop.",
    tags: ["Broadcast", "News"],
    duration: "10s",
    remotionId: "NewsBreaking",
    fps: 30,
    durationInFrames: 300,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/news-breaking.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const NewsBreaking: React.FC = () => {
  const frame = useCurrentFrame();
  const headlineY = interpolate(frame, [25, 55], [-100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tickerX = interpolate(frame, [40, 280], [1920, -3000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tickerOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const livePulse = Math.sin(frame * 0.25) > 0;

  return (
    <AbsoluteFill style={{ background: "#0a0a0a", fontFamily: "Arial, sans-serif" }}>
      <div style={{ position: "absolute", top: 32, left: 40, display: "flex", gap: 12 }}>
        <div style={{ background: "#ff0000", color: "white", fontWeight: 900, fontSize: 20, padding: "8px 18px", borderRadius: 4 }}>NEWS24</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,0,0,0.15)", border: "1px solid rgba(255,0,0,0.4)", padding: "6px 14px", borderRadius: 4, opacity: livePulse ? 1 : 0.5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff0000" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#ff4444" }}>LIVE</span>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 100, left: 0, transform: \`translateY(\${headlineY}px)\` }}>
        <div style={{ background: "#ff0000", padding: "12px 40px", display: "inline-flex" }}><span style={{ fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "0.2em" }}>⚡ BREAKING NEWS</span></div>
        <div style={{ background: "rgba(0,0,0,0.88)", padding: "20px 40px", fontSize: 42, fontWeight: 800, color: "white", maxWidth: "80%" }}>Major Breakthrough in Video Automation Technology Announced</div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, background: "#ff0000", display: "flex", alignItems: "center", overflow: "hidden", opacity: tickerOpacity }}>
        <div style={{ transform: \`translateX(\${tickerX}px)\`, whiteSpace: "nowrap", fontSize: 18, fontWeight: 600, color: "white" }}>● SwiftClip launches 20 new video templates &nbsp;&nbsp;&nbsp;●&nbsp;&nbsp;&nbsp; Remotion v5 release expected Q3 2026</div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "minimal-title",
    title: "Minimal Title",
    description: "Ultra-clean serif typography on warm white — staggered word reveal with elegant decorative rules.",
    tags: ["Minimal", "Branding"],
    duration: "5s",
    remotionId: "MinimalTitle",
    fps: 30,
    durationInFrames: 150,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/minimal-title.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const MinimalTitle: React.FC = () => {
  const frame = useCurrentFrame();

  const word1Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const word1Y = interpolate(frame, [30, 50], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const word2Opacity = interpolate(frame, [42, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const word2Y = interpolate(frame, [42, 62], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const word3Opacity = interpolate(frame, [54, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const word3Y = interpolate(frame, [54, 74], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: "#fafaf8", fontFamily: "Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 110, fontWeight: 400, color: "#1a1a1a", opacity: word1Opacity, transform: \`translateY(\${word1Y}px)\` }}>The</div>
          <div style={{ fontSize: 110, fontWeight: 700, color: "#1a1a1a", opacity: word2Opacity, transform: \`translateY(\${word2Y}px)\` }}>Future</div>
          <div style={{ fontSize: 110, fontStyle: "italic", color: "#1a1a1a", opacity: word3Opacity, transform: \`translateY(\${word3Y}px)\` }}>Is Now</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "gradient-reveal",
    title: "Gradient Reveal",
    description: "Colorful animated mesh gradient background with frosted glass card, headline reveal, and pill tags.",
    tags: ["Branding", "Motion"],
    duration: "6s",
    remotionId: "GradientReveal",
    fps: 30,
    durationInFrames: 180,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/gradient-reveal.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const BLOBS = [
  { x: 20, y: 30, color: "#6366f1", size: 700 },
  { x: 75, y: 20, color: "#ec4899", size: 600 },
  { x: 85, y: 75, color: "#f59e0b", size: 550 },
  { x: 10, y: 80, color: "#22c55e", size: 500 },
];

export const GradientReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(frame, [25, 65], [120, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: "#06060a", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {BLOBS.map((b, i) => <div key={i} style={{ position: "absolute", width: b.size, height: b.size, borderRadius: "50%", background: \`radial-gradient(circle, \${b.color}55 0%, transparent 65%)\`, left: \`\${b.x + Math.sin(drift * Math.PI * 2 + i) * 3}%\`, top: \`\${b.y + Math.cos(drift * Math.PI * 2 + i) * 3}%\`, transform: "translate(-50%, -50%)", filter: "blur(80px)", mixBlendMode: "screen" }} />)}
      <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 40, padding: "72px 96px", width: 960, opacity: cardOpacity }}>
        <div style={{ fontSize: 96, fontWeight: 900, color: "white", textAlign: "center", transform: \`translateY(\${textY}px)\` }}>
          Create Without<br />
          <span style={{ background: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Limits</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "team-grid",
    title: "Team Grid",
    description: "Staggered team member card grid with avatar initials, role info, and per-member color accents.",
    tags: ["Business", "Branding"],
    duration: "8s",
    remotionId: "TeamGrid",
    fps: 30,
    durationInFrames: 240,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/team-grid.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const TEAM = [
  { initials: "AK", name: "Alex Kim", role: "CEO & Founder", color: "#6366f1" },
  { initials: "SL", name: "Sarah Lin", role: "Head of Design", color: "#ec4899" },
  { initials: "MT", name: "Marco Torres", role: "Lead Engineer", color: "#22c55e" },
  { initials: "YC", name: "Yuki Chen", role: "Product Manager", color: "#f59e0b" },
  { initials: "RB", name: "Ryan Blake", role: "Marketing Lead", color: "#06b6d4" },
  { initials: "NP", name: "Nina Park", role: "Data Scientist", color: "#a855f7" },
];

export const TeamGrid: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #08080f, #0d0c1e)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 80px" }}>
      <div style={{ fontSize: 52, fontWeight: 800, color: "white", marginBottom: 52 }}>The People Behind SwiftClip</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, width: "100%" }}>
        {TEAM.map((m, i) => {
          const delay = 30 + i * 14;
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const cardY = interpolate(frame, [delay, delay + 25], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          return (
            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "28px", display: "flex", alignItems: "center", gap: 20, opacity: cardOpacity, transform: \`translateY(\${cardY}px)\`, position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: m.color }} />
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: m.color + "22", border: "2px solid " + m.color + "55", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: m.color }}>{m.initials}</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "white" }}>{m.name}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{m.role}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "quote-story",
    title: "Quote Story",
    description: "Vertical format animated quote with word-by-word reveal, left accent bar, and elegant author byline.",
    tags: ["Minimal", "Reels"],
    duration: "8s",
    remotionId: "QuoteStory",
    fps: 30,
    durationInFrames: 240,
    width: 1080,
    height: 1920,
    videoUrl: "/videos/quote-story.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const QUOTE = "Code is poetry. Motion is music. Together, they tell stories that data alone never could.";

export const QuoteStory: React.FC = () => {
  const frame = useCurrentFrame();
  const words = QUOTE.split(" ");
  const wordReveal = Math.floor(interpolate(frame, [25, 180], [0, words.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }));
  const authorOpacity = interpolate(frame, [185, 215], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #06060c, #0e0b1e, #070612)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 64px" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(to bottom, transparent, #6366f1, #a855f7, transparent)" }} />
      <p style={{ fontSize: 52, lineHeight: 1.6, fontStyle: "italic", color: "rgba(255,255,255,0.9)", textAlign: "center", fontFamily: "Georgia, serif", margin: "0 0 56px" }}>
        {words.map((w, i) => <span key={i} style={{ opacity: i < wordReveal ? 1 : 0, color: i < wordReveal && i >= wordReveal - 3 ? "#a5b4fc" : "rgba(255,255,255,0.88)" }}>{w} </span>)}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: authorOpacity }}>
        <div style={{ width: 60, height: 2, background: "linear-gradient(to right, #6366f1, #a855f7)" }} />
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "white" }}>Alex Kim</div>
          <div style={{ fontSize: 18, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>CEO, SwiftClip</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "timeline",
    title: "Timeline",
    description: "Alternating left-right company timeline with gradient center line, milestone dots, and staggered card reveals.",
    tags: ["Business", "Data"],
    duration: "9s",
    remotionId: "Timeline",
    fps: 30,
    durationInFrames: 270,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/timeline.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const STEPS = [
  { year: "2021", title: "Founded", desc: "Started in a San Francisco garage", color: "#6366f1" },
  { year: "2022", title: "First Launch", desc: "10K users in the first month", color: "#8b5cf6" },
  { year: "2023", title: "Series A", desc: "$12M raised from top VCs", color: "#a855f7" },
  { year: "2024", title: "1M Users", desc: "Reached a global milestone", color: "#ec4899" },
];

export const Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const lineH = interpolate(frame, [20, 200], [0, 520], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg, #06060e, #0c0b1e)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 160px" }}>
      <div style={{ fontSize: 52, fontWeight: 800, color: "white", marginBottom: 56 }}>Building SwiftClip</div>
      <div style={{ position: "relative", width: "100%" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, width: 2, height: lineH, background: "linear-gradient(to bottom, #6366f1, #a855f7, #ec4899)", transform: "translateX(-50%)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            const delay = 25 + i * 28;
            const itemOpacity = interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", paddingRight: 48, opacity: itemOpacity }}>
                  {isLeft && <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 24px", maxWidth: 360, borderLeft: \`3px solid \${step.color}\` }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: step.color, marginBottom: 6 }}>{step.year}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "white" }}>{step.title}</div>
                    <div style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>{step.desc}</div>
                  </div>}
                </div>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: step.color, border: "3px solid #06060e", boxShadow: \`0 0 12px \${step.color}80\`, flexShrink: 0, zIndex: 1 }} />
                <div style={{ flex: 1, paddingLeft: 48, opacity: itemOpacity }}>
                  {!isLeft && <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 24px", maxWidth: 360 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: step.color, marginBottom: 6 }}>{step.year}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "white" }}>{step.title}</div>
                  </div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "web-promo",
    title: "Web Promo",
    description: "16:9 promotional video for websites with browser mockup, feature highlights, and elegant scroll effects.",
    tags: ["Marketing", "Web"],
    duration: "10s",
    remotionId: "WebPromo",
    fps: 30,
    durationInFrames: 300,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/web-promo.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const WebPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  
  return (
    <AbsoluteFill style={{ background: "#ffffff", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontSize: 96, fontWeight: 900, color: "#1d1d1f", opacity: titleOpacity, letterSpacing: "-0.04em" }}>
        Web Promo
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "celebration-burst",
    title: "Celebration Burst",
    description: "Achievement unlock animation with particle confetti explosion, bouncing trophy emoji, and gradient text reveal.",
    tags: ["Social", "Events"],
    duration: "6s",
    remotionId: "CelebrationBurst",
    fps: 30,
    durationInFrames: 180,
    width: 1080,
    height: 1080,
    videoUrl: "/videos/celebration-burst.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

function seededRand(seed: number) {
  return (Math.sin(seed + 1) * 43758.5453123) % 1;
}
const COLORS = ["#f59e0b", "#6366f1", "#ec4899", "#22c55e"];

export const CelebrationBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const trophyScale = interpolate(frame, [5, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const textOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(145deg, #07070e, #0f0c1e)", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {[...Array(40)].map((_, i) => {
        const angle = seededRand(i * 3) * Math.PI * 2;
        const speed = 4 + seededRand(i * 7) * 8;
        const pFrame = Math.max(0, frame - seededRand(i * 13) * 20);
        const px = Math.cos(angle) * pFrame * speed;
        const py = Math.sin(angle) * pFrame * speed - pFrame * pFrame * 0.08;
        const pOpacity = interpolate(pFrame, [0, 5, 60, 120], [0, 1, 0.8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return <div key={i} style={{ position: "absolute", left: "50%", top: "40%", width: 8, height: 8, borderRadius: "50%", background: COLORS[i % COLORS.length], transform: \`translate(\${px}px, \${py}px)\`, opacity: pOpacity }} />;
      })}
      <div style={{ fontSize: 140, marginBottom: 24, transform: \`scale(\${trophyScale}) translateY(\${Math.sin(frame * 0.08) * 8}px)\`, filter: "drop-shadow(0 0 40px rgba(245,158,11,0.6))" }}>🏆</div>
      <div style={{ fontSize: 80, fontWeight: 900, color: "white", opacity: textOpacity, textAlign: "center" }}>
        Achievement<br />
        <span style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Unlocked!</span>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "code-reveal",
    title: "Code Reveal",
    description: "Developer-focused animated code editor window with character-by-character typewriter and syntax highlighting.",
    tags: ["Developer", "Motion"],
    duration: "10s",
    remotionId: "CodeReveal",
    fps: 30,
    durationInFrames: 300,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/code-reveal.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const CODE = \`import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  return (
    <AbsoluteFill style={{ opacity }}>
      <h1>Hello, Remotion!</h1>
    </AbsoluteFill>
  );
};\`;

export const CodeReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const totalChars = Math.max(0, (frame - 20) * 3);
  const displayCode = CODE.slice(0, totalChars);
  const cursorBlink = frame % 12 < 6;

  return (
    <AbsoluteFill style={{ background: "#0a0a10", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 100px" }}>
      <div style={{ fontSize: 42, fontWeight: 800, color: "white", marginBottom: 40 }}>Build Your First Video</div>
      <div style={{ width: "100%", background: "#1e1e2e", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div style={{ background: "#2a2a3e", padding: "14px 20px", display: "flex", gap: 8 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
        </div>
        <pre style={{ padding: "24px", fontFamily: "Fira Code, monospace", fontSize: 17, color: "#c3e88d", lineHeight: 1.8, margin: 0 }}>
          {displayCode}
          {cursorBlink && <span style={{ display: "inline-block", width: 2, height: 18, background: "#6366f1", marginLeft: 1, verticalAlign: "middle" }} />}
        </pre>
      </div>
    </AbsoluteFill>
  );
};`
  },
  {
    id: "product-card",
    title: "Product Card",
    description: "Clean e-commerce product card on white background with shimmer, badge reveal, star rating, price, and CTA.",
    tags: ["eCommerce", "Marketing"],
    duration: "6s",
    remotionId: "ProductCard",
    fps: 30,
    durationInFrames: 180,
    width: 1080,
    height: 1080,
    videoUrl: "/videos/product-card.mp4",
    codeSnippet: `import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

export const ProductCard: React.FC = () => {
  const frame = useCurrentFrame();
  const cardScale = interpolate(frame, [8, 38], [0.88, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.2)) });
  const priceOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaScale = interpolate(frame, [90, 115], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });

  return (
    <AbsoluteFill style={{ background: "#f8f8f5", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 840, background: "white", borderRadius: 32, boxShadow: "0 24px 48px rgba(0,0,0,0.08)", overflow: "hidden", transform: \`scale(\${cardScale})\` }}>
        <div style={{ height: 320, background: "linear-gradient(135deg, #0d0d1e, #1a1a3a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 120, height: 120, borderRadius: 30, background: "linear-gradient(135deg, #6366f1, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, boxShadow: "0 0 60px rgba(99,102,241,0.4)" }}>🎬</div>
        </div>
        <div style={{ padding: "32px 36px 36px" }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#0a0a0a", marginBottom: 24 }}>SwiftClip Pro Bundle</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 24, opacity: priceOpacity }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: "#0a0a0a", lineHeight: 1 }}>$49</div>
            <div style={{ fontSize: 24, color: "#bbb", textDecoration: "line-through", marginBottom: 4 }}>$120</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#22c55e", background: "#dcfce7", padding: "4px 12px", borderRadius: 100 }}>59% OFF</div>
          </div>
          <div style={{ background: "#0a0a0a", borderRadius: 14, padding: "20px 0", textAlign: "center", fontSize: 20, fontWeight: 700, color: "white", transform: \`scale(\${ctaScale})\` }}>Add to Cart →</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};`
  },
];

export const TAG_COLORS: Record<string, string> = {
  Marketing: "bg-blue-50 text-blue-600 border-blue-200",
  SaaS: "bg-purple-50 text-purple-600 border-purple-200",
  Tutorial: "bg-green-50 text-green-600 border-green-200",
  Education: "bg-teal-50 text-teal-600 border-teal-200",
  Social: "bg-pink-50 text-pink-600 border-pink-200",
  "Short-form": "bg-rose-50 text-rose-600 border-rose-200",
  Data: "bg-amber-50 text-amber-600 border-amber-200",
  Business: "bg-orange-50 text-orange-600 border-orange-200",
  Broadcast: "bg-cyan-50 text-cyan-600 border-cyan-200",
  Events: "bg-indigo-50 text-indigo-600 border-indigo-200",
};
