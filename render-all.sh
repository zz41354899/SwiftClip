#!/bin/bash
set -e
cd "$(dirname "$0")"

COMPOSITIONS=(
  "ProductLaunch:product-launch"
  "TutorialIntro:tutorial-intro"
  "SaaSPromo:saas-promo"
  "SocialStory:social-story"
  "DataViz:data-viz"
  "LowerThird:lower-third"
  "TestimonialCard:testimonial-card"
  "CountdownTimer:countdown-timer"
  "BrandReveal:brand-reveal"
  "VerticalStory:vertical-story"
  "EndScreen:end-screen"
  "MetricDashboard:metric-dashboard"
  "TypewriterQuote:typewriter-quote"
  "DynamicIsland:dynamic-island"
  "PricingCard:pricing-card"
  "BarChart:bar-chart"
  "SplitReveal:split-reveal"
  "EventPromo:event-promo"
  "SubscribeCTA:subscribe-cta"
  "NewsBreaking:news-breaking"
  "MinimalTitle:minimal-title"
  "GradientReveal:gradient-reveal"
  "TeamGrid:team-grid"
  "QuoteStory:quote-story"
  "Timeline:timeline"
  "WebPromo:web-promo"
  "CelebrationBurst:celebration-burst"
  "CodeReveal:code-reveal"
  "ProductCard:product-card"
  "AiAnimation:ai-animation"
)

for ITEM in "${COMPOSITIONS[@]}"; do
  ID="${ITEM%%:*}"
  SLUG="${ITEM##*:}"
  OUTPUT="public/videos/${SLUG}.mp4"
  echo "▶ Rendering $ID → $OUTPUT"
  npx remotion render remotion/index.tsx "$ID" "$OUTPUT"
  echo "✓ Done: $OUTPUT"
done

echo ""
echo "All renders complete!"
