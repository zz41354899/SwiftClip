import type { ComponentType } from "react";

export type CompositionLoader = () => Promise<{
  default: ComponentType<Record<string, unknown>>;
}>;

/**
 * Per-template lazy loader. Keep keys in sync with `templates[].id`
 * in lib/templates.ts. Each detail page only ships its own composition.
 */
export const TEMPLATE_LOADERS: Record<string, CompositionLoader> = {
  "product-launch": () => import("@/remotion/ProductLaunch").then((m) => ({ default: m.ProductLaunch })),
  "tutorial-intro": () => import("@/remotion/TutorialIntro").then((m) => ({ default: m.TutorialIntro })),
  "saas-promo": () => import("@/remotion/SaaSPromo").then((m) => ({ default: m.SaaSPromo })),
  "social-story": () => import("@/remotion/SocialStory").then((m) => ({ default: m.SocialStory })),
  "data-viz": () => import("@/remotion/DataViz").then((m) => ({ default: m.DataViz })),
  "lower-third": () => import("@/remotion/LowerThird").then((m) => ({ default: m.LowerThird })),
  "testimonial-card": () => import("@/remotion/TestimonialCard").then((m) => ({ default: m.TestimonialCard })),
  "countdown-timer": () => import("@/remotion/CountdownTimer").then((m) => ({ default: m.CountdownTimer })),
  "brand-reveal": () => import("@/remotion/BrandReveal").then((m) => ({ default: m.BrandReveal })),
  "vertical-story": () => import("@/remotion/VerticalStory").then((m) => ({ default: m.VerticalStory })),
  "end-screen": () => import("@/remotion/EndScreen").then((m) => ({ default: m.EndScreen })),
  "metric-dashboard": () => import("@/remotion/MetricDashboard").then((m) => ({ default: m.MetricDashboard })),
  "typewriter-quote": () => import("@/remotion/TypewriterQuote").then((m) => ({ default: m.TypewriterQuote })),
  "dynamic-island": () => import("@/remotion/DynamicIsland").then((m) => ({ default: m.DynamicIsland })),
  "pricing-card": () => import("@/remotion/PricingCard").then((m) => ({ default: m.PricingCard })),
  "bar-chart": () => import("@/remotion/BarChart").then((m) => ({ default: m.BarChart })),
  "split-reveal": () => import("@/remotion/SplitReveal").then((m) => ({ default: m.SplitReveal })),
  "event-promo": () => import("@/remotion/EventPromo").then((m) => ({ default: m.EventPromo })),
  "subscribe-cta": () => import("@/remotion/SubscribeCTA").then((m) => ({ default: m.SubscribeCTA })),
  "news-breaking": () => import("@/remotion/NewsBreaking").then((m) => ({ default: m.NewsBreaking })),
  "minimal-title": () => import("@/remotion/MinimalTitle").then((m) => ({ default: m.MinimalTitle })),
  "gradient-reveal": () => import("@/remotion/GradientReveal").then((m) => ({ default: m.GradientReveal })),
  "team-grid": () => import("@/remotion/TeamGrid").then((m) => ({ default: m.TeamGrid })),
  "quote-story": () => import("@/remotion/QuoteStory").then((m) => ({ default: m.QuoteStory })),
  timeline: () => import("@/remotion/Timeline").then((m) => ({ default: m.Timeline })),
  "web-promo": () => import("@/remotion/WebPromo").then((m) => ({ default: m.WebPromo })),
  "celebration-burst": () => import("@/remotion/CelebrationBurst").then((m) => ({ default: m.CelebrationBurst })),
  "code-reveal": () => import("@/remotion/CodeReveal").then((m) => ({ default: m.CodeReveal })),
  "product-card": () => import("@/remotion/ProductCard").then((m) => ({ default: m.ProductCard })),
  "ai-animation": () => import("@/remotion/AiAnimation").then((m) => ({ default: m.AiAnimation })),
};
