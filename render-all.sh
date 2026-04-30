#!/bin/bash
set -e
cd "$(dirname "$0")"

COMPOSITIONS=(
  "TestimonialCard:testimonial-card"
  "CountdownTimer:countdown-timer"
  "BrandReveal:brand-reveal"
  "VerticalStory:vertical-story"
  "EndScreen:end-screen"
  "MetricDashboard:metric-dashboard"
  "TypewriterQuote:typewriter-quote"
  "GlitchTitle:glitch-title"
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
  "AppPromo:app-promo"
  "CelebrationBurst:celebration-burst"
  "CodeReveal:code-reveal"
  "ProductCard:product-card"
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
