# SwiftClip Template Catalog

Index of all 30 templates. Each template has its own reference file under `./templates/` with props, visual style description, and embedded source code.

Two tiers:
- **Prop-enabled** — accept external props via a typed props object. Each ref file documents the canonical prop schema and how to pass values.
- **Hardcoded** — no external props. Source code in each ref file has key values annotated for direct editing.

## Prop-Enabled Templates

### Canonical Schemas

| template | props (canonical) | legacy aliases | ref |
| --- | --- | --- | --- |
| ProductLaunch | `headline`, `subheadline` | `title`, `subtitle` | `./templates/ProductLaunch.md` |
| TutorialIntro | `headline`, `durationLabel` | `title`, `duration` | `./templates/TutorialIntro.md` |
| SocialStory | `headline`, `subheadline`, `brandHandle` | `subline`, `handle` | `./templates/SocialStory.md` |
| LowerThird | `headline`, `subheadline` | `name`, `title` | `./templates/LowerThird.md` |
| SaaSPromo | `headline`, `featureItems` | `features` | `./templates/SaaSPromo.md` |
| EndScreen | `brandName`, `siteUrl` | `title`, `url` | `./templates/EndScreen.md` |
| BrandReveal | `brandName`, `tagline`, `accentColor` | `title`, `subtitle`, `color` | `./templates/BrandReveal.md` |
| GradientReveal | `symbol`, `subtitle`, `backgroundColor`, `gradientStops` | `glyph`, `subheadline`, `bgColor`, `gradientColors` | `./templates/GradientReveal.md` |
| TypewriterQuote | `quote`, `author` | `text`, `authorName` | `./templates/TypewriterQuote.md` |
| ProductCard | `productName`, `category`, `ctaLabel` | `title`, `subtitle`, `buttonLabel` | `./templates/ProductCard.md` |

### By Aspect Ratio — Prop-Enabled

#### 16:9 landscape

| template | duration | tags | ref |
| --- | --- | --- | --- |
| ProductLaunch | 15s | Marketing, Branding | `./templates/ProductLaunch.md` |
| TutorialIntro | 8s | Tutorial, Education | `./templates/TutorialIntro.md` |
| SaaSPromo | 30s | SaaS, Marketing | `./templates/SaaSPromo.md` |
| LowerThird | 5s | Broadcast, Motion | `./templates/LowerThird.md` |
| EndScreen | 7s | Marketing, Tutorial | `./templates/EndScreen.md` |
| BrandReveal | 6s | Branding, Marketing | `./templates/BrandReveal.md` |
| GradientReveal | 6s | Branding, Motion | `./templates/GradientReveal.md` |
| TypewriterQuote | 8s | Social, Motion | `./templates/TypewriterQuote.md` |

#### 9:16 vertical

| template | duration | tags | ref |
| --- | --- | --- | --- |
| SocialStory | 10s | Social, Short-form | `./templates/SocialStory.md` |

#### 1:1 square

| template | duration | tags | ref |
| --- | --- | --- | --- |
| ProductCard | 6s | eCommerce, Marketing | `./templates/ProductCard.md` |

## Hardcoded Templates

No external props. Builder reads the source file and edits values directly. Each ref file lists all key hardcoded values and where to change them.

### By Aspect Ratio — Hardcoded

#### 16:9 landscape

| template | duration | tags | ref |
| --- | --- | --- | --- |
| DataViz | 20s | Data, Business | `./templates/DataViz.md` |
| CountdownTimer | 7s | Events, Marketing | `./templates/CountdownTimer.md` |
| MetricDashboard | 8s | Data, SaaS | `./templates/MetricDashboard.md` |
| DynamicIsland | 5s | Tech, Motion | `./templates/DynamicIsland.md` |
| BarChart | 8s | Data, Business | `./templates/BarChart.md` |
| SplitReveal | 6s | Branding, Motion | `./templates/SplitReveal.md` |
| EventPromo | 8s | Events, Marketing | `./templates/EventPromo.md` |
| SubscribeCTA | 6s | Marketing, Social | `./templates/SubscribeCTA.md` |
| NewsBreaking | 10s | Broadcast, Motion | `./templates/NewsBreaking.md` |
| MinimalTitle | 5s | Motion, Branding | `./templates/MinimalTitle.md` |
| TeamGrid | 8s | Business, Marketing | `./templates/TeamGrid.md` |
| Timeline | 9s | Business, Tutorial | `./templates/Timeline.md` |
| WebPromo | 10s | Marketing, SaaS | `./templates/WebPromo.md` |
| CodeReveal | 10s | Developer, Tutorial | `./templates/CodeReveal.md` |
| AiAnimation | 8s | AI, Tech, SaaS | `./templates/AiAnimation.md` |

#### 9:16 vertical

| template | duration | tags | ref |
| --- | --- | --- | --- |
| VerticalStory | 10s | Social, Short-form | `./templates/VerticalStory.md` |
| QuoteStory | 8s | Social, Short-form | `./templates/QuoteStory.md` |

#### 1:1 square

| template | duration | tags | ref |
| --- | --- | --- | --- |
| TestimonialCard | 8s | Marketing, Social | `./templates/TestimonialCard.md` |
| PricingCard | 8s | SaaS, Marketing | `./templates/PricingCard.md` |
| CelebrationBurst | 6s | Events, Social | `./templates/CelebrationBurst.md` |

