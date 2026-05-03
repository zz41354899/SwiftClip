export interface ProductLaunchTemplateProps {
  headline?: string;
  subheadline?: string;
  title?: string;
  subtitle?: string;
}

export const resolveProductLaunchCopy = (
  props: ProductLaunchTemplateProps
) => ({
  headline: props.headline ?? props.title ?? "SwiftClip",
  subheadline:
    props.subheadline ??
    props.subtitle ??
    "High-performance Remotion templates",
});

export interface TutorialIntroTemplateProps {
  headline?: string;
  durationLabel?: string;
  title?: string;
  duration?: string;
}

export const resolveTutorialIntroCopy = (
  props: TutorialIntroTemplateProps
) => ({
  headline: props.headline ?? props.title ?? "Getting Started",
  durationLabel: props.durationLabel ?? props.duration ?? "5 min",
});

export interface SocialStoryTemplateProps {
  headline?: string;
  subheadline?: string;
  brandHandle?: string;
  subline?: string;
  handle?: string;
}

export const resolveSocialStoryCopy = (props: SocialStoryTemplateProps) => ({
  headline: props.headline ?? "SwiftClip",
  subheadline:
    props.subheadline ?? props.subline ?? "Remotion templates that ship fast",
  brandHandle: props.brandHandle ?? props.handle ?? "@swiftclip",
});

export interface LowerThirdTemplateProps {
  headline?: string;
  subheadline?: string;
  name?: string;
  title?: string;
}

export const resolveLowerThirdCopy = (props: LowerThirdTemplateProps) => ({
  headline: props.headline ?? props.name ?? "Craig Federighi",
  subheadline: props.subheadline ?? props.title ?? "Senior Vice President",
});

export interface SaaSPromoTemplateProps {
  headline?: string;
  featureItems?: string[];
  features?: string[];
}

export const resolveSaaSPromoCopy = (props: SaaSPromoTemplateProps) => {
  const normalized = (props.featureItems ?? props.features ?? [
    "Code-Driven",
    "Highly Customizable",
    "Lightning Fast",
  ])
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    headline: props.headline ?? "SwiftClip Features",
    featureItems: normalized,
  };
};

export interface EndScreenTemplateProps {
  brandName?: string;
  siteUrl?: string;
  title?: string;
  url?: string;
}

export const resolveEndScreenCopy = (props: EndScreenTemplateProps) => ({
  brandName: props.brandName ?? props.title ?? "SwiftClip",
  siteUrl: props.siteUrl ?? props.url ?? "swiftclip.com",
});

export interface BrandRevealTemplateProps {
  brandName?: string;
  tagline?: string;
  accentColor?: string;
  title?: string;
  subtitle?: string;
  color?: string;
}

export const resolveBrandRevealCopy = (props: BrandRevealTemplateProps) => ({
  brandName: props.brandName ?? props.title ?? "SwiftClip",
  tagline: props.tagline ?? props.subtitle ?? "Creative Automation",
  accentColor: props.accentColor ?? props.color ?? "#0066cc",
});

const DEFAULT_GRADIENT_STOPS = [
  "#007AFF 33%",
  "#5856D6 43%",
  "#AF52DE 53%",
  "#FF2D55 60%",
  "rgba(0,0,0,0.05) 75%",
  "rgba(0,0,0,0) 100%",
];

export interface GradientRevealTemplateProps {
  symbol?: string;
  subtitle?: string;
  backgroundColor?: string;
  gradientStops?: string[];
  glyph?: string;
  subheadline?: string;
  bgColor?: string;
  gradientColors?: string[];
}

export const resolveGradientRevealCopy = (
  props: GradientRevealTemplateProps
) => {
  const gradientStops = (props.gradientStops ?? props.gradientColors ?? [])
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    symbol: props.symbol ?? props.glyph ?? "",
    subtitle:
      props.subtitle ?? props.subheadline ?? "Pro performance. Unprecedented reveal.",
    backgroundColor: props.backgroundColor ?? props.bgColor ?? "#f5f5f7",
    gradientStops:
      gradientStops.length >= 2 ? gradientStops : DEFAULT_GRADIENT_STOPS,
  };
};

export interface TypewriterQuoteTemplateProps {
  quote?: string;
  author?: string;
  text?: string;
  authorName?: string;
}

export const resolveTypewriterQuoteCopy = (
  props: TypewriterQuoteTemplateProps
) => ({
  quote:
    props.quote ??
    props.text ??
    "The best time to plant a tree was 20 years ago. The second best time is now.",
  author: props.author ?? props.authorName ?? "Chinese Proverb",
});

export interface ProductCardTemplateProps {
  productName?: string;
  category?: string;
  ctaLabel?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}

export const resolveProductCardCopy = (
  props: ProductCardTemplateProps
) => ({
  productName: props.productName ?? props.title ?? "Vision Pro",
  category: props.category ?? props.subtitle ?? "Spatial Computing",
  ctaLabel: props.ctaLabel ?? props.buttonLabel ?? "Pre-order Now",
});