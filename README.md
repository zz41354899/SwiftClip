# SwiftClip

> Production-ready [Remotion](https://remotion.dev) video templates — built with React & TypeScript.

SwiftClip is an open-source library of 29 copy-paste video composition templates. Instead of dragging keyframes in After Effects, you write React components. Every template is fully typed, zero-config, and renders to 4K MP4 in seconds.

🌐 **Live site:** [swiftclip.dev](https://swiftclip.dev) *(update with your actual URL)*

---

## ✨ Features

- **29 production-ready templates** — Marketing, Social, Data Viz, Titles, and more
- **Fully typed props** — every template has TypeScript interfaces for safe customisation
- **Frame-perfect animations** — powered by `useCurrentFrame()` and `interpolate()`
- **4K-ready** — render at any resolution via `--scale` flag
- **Zero dependencies†** — only Remotion + React; no proprietary SDKs
- **MIT licensed** — use in personal and commercial projects

---

## 🗂 Template Library

| # | Template | Category | Resolution | Duration |
|---|----------|----------|------------|----------|
| 1 | Product Launch | Marketing | 1920×1080 | 15s |
| 2 | Social Story | Social | 1080×1920 | 10s |
| 3 | Brand Reveal | Branding | 1920×1080 | 12s |
| 4 | Lower Third | Broadcast | 1920×1080 | 8s |
| 5 | Minimal Title | Typography | 1920×1080 | 10s |
| 6 | Typewriter Quote | Typography | 1920×1080 | 12s |
| 7 | Quote Story | Social | 1080×1920 | 10s |
| 8 | Countdown Timer | Event | 1920×1080 | 10s |
| 9 | Event Promo | Marketing | 1920×1080 | 15s |
| 10 | Subscribe CTA | YouTube | 1920×1080 | 8s |
| 11 | End Screen | YouTube | 1920×1080 | 20s |
| 12 | Tutorial Intro | Education | 1920×1080 | 12s |
| 13 | Code Reveal | Developer | 1920×1080 | 15s |
| 14 | Gradient Reveal | Abstract | 1920×1080 | 10s |
| 15 | Glitch Title | Abstract | 1920×1080 | 8s |
| 16 | Split Reveal | Branding | 1920×1080 | 10s |
| 17 | Celebration Burst | Social | 1080×1080 | 6s |
| 18 | News Breaking | Broadcast | 1920×1080 | 12s |
| 19 | Bar Chart | Data Viz | 1920×1080 | 12s |
| 20 | Data Viz | Data Viz | 1920×1080 | 15s |
| 21 | Metric Dashboard | Data Viz | 1920×1080 | 12s |
| 22 | Timeline | Data Viz | 1920×1080 | 18s |
| 23 | Product Card | E-commerce | 1920×1080 | 10s |
| 24 | Pricing Card | SaaS | 1920×1080 | 10s |
| 25 | SaaS Promo | SaaS | 1920×1080 | 15s |
| 26 | App Promo | Mobile | 1920×1080 | 15s |
| 27 | Testimonial Card | Marketing | 1920×1080 | 12s |
| 28 | Team Grid | Corporate | 1920×1080 | 15s |
| 29 | Vertical Story | Social | 1080×1920 | 10s |

Browse and preview all templates at the live site.

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | v16+ (v18+ recommended) |
| npm / yarn / pnpm / bun | any |

Chrome and FFmpeg are automatically downloaded by Remotion — no global installation needed.

### 1. Scaffold a Remotion project

```bash
npx create-video@latest
cd my-video-project
```

### 2. Copy a template

Browse the [Template Library](https://swiftclip.dev/templates) and copy any `.tsx` file into your `remotion/` folder.

### 3. Register it in `remotion/Root.tsx`

```tsx
import { Composition } from 'remotion';
import { ProductLaunch } from './ProductLaunch';

export const RemotionRoot = () => (
  <Composition
    id="ProductLaunch"
    component={ProductLaunch}
    durationInFrames={450}   // 15 s at 30 fps
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{
      title: 'My Product',
      subtitle: 'Ship faster with SwiftClip',
    }}
  />
);
```

### 4. Preview in Remotion Studio

```bash
npm run dev
# Open http://localhost:3000
```

### 5. Render to MP4

```bash
npx remotion render remotion/index.tsx ProductLaunch output.mp4
```

---

## 🎬 Rendering Options

```bash
# High-quality H.264 (default)
npx remotion render remotion/index.tsx ProductLaunch output.mp4

# 4K upscale
npx remotion render remotion/index.tsx ProductLaunch output-4k.mp4 --scale=2

# Fast parallel render (8 threads)
npx remotion render remotion/index.tsx ProductLaunch output.mp4 --concurrency=8

# Export as GIF
npx remotion render remotion/index.tsx ProductLaunch output.gif --codec=gif

# ProRes for post-production
npx remotion render remotion/index.tsx ProductLaunch output.mov --codec=prores

# Serverless via Lambda
npx remotion lambda render remotion/index.tsx ProductLaunch --region=us-east-1
```

---

## 🗄 Project Structure

```
swiftclip/
├── app/                    # Next.js App Router (website)
│   ├── page.tsx            # Homepage
│   ├── templates/          # Template browser
│   ├── docs/               # Documentation
│   ├── community/          # Community page
│   ├── privacy/            # Privacy Policy
│   └── terms/              # Terms of Service
├── components/             # Shared UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   └── ...
├── remotion/               # 📦 Video templates (the main product)
│   ├── Root.tsx            # Composition registry
│   ├── index.tsx           # Entry point
│   ├── ProductLaunch.tsx
│   ├── SocialStory.tsx
│   └── ... (29 templates total)
├── lib/
│   └── templates.ts        # Template metadata
└── public/
    └── videos/             # Rendered preview MP4s
```

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start the website (Next.js dev server)
npm run dev

# Build for production
npm run build

# Remotion Studio (for template preview/development)
npx remotion studio
```

---

## ✏️ Customising a Template

Every template accepts typed props. Example with `ProductLaunch`:

```tsx
// All props are optional — sensible defaults are provided
interface ProductLaunchProps {
  title?: string;        // Main headline
  subtitle?: string;     // Supporting text
  accentColor?: string;  // Hex colour for accents
  logoUrl?: string;      // URL to your logo image
}
```

Pass values via `defaultProps` in `Root.tsx` or at render time with `--props`:

```bash
npx remotion render remotion/index.tsx ProductLaunch output.mp4 \
  --props='{"title":"Acme 3.0","subtitle":"The fastest tool on earth"}'
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** this repository
2. **Clone** your fork: `git clone https://github.com/zz41354899/SwiftClip`
3. **Create a branch**: `git checkout -b feat/my-template`
4. **Add your template** to `remotion/` — follow the naming and prop conventions of existing templates
5. **Register** it in `remotion/Root.tsx` and add metadata to `lib/templates.ts`
6. **Open a Pull Request** with a short description and a rendered preview

### Template conventions

- File name: `PascalCase.tsx` matching the composition `id`
- All props should be optional with sensible defaults
- Use `useCurrentFrame()` + `interpolate()` — avoid `setTimeout` or imperative logic
- Keep animation logic co-located in a single file (no external style sheets)

---

## 📄 License

MIT © SwiftClip contributors

This project is free to use in personal and commercial projects. Attribution is appreciated but not required.

> **Note on Remotion licensing:** Remotion itself is free for individuals and small studios. Companies with more than 3 people must purchase a [Remotion company license](https://remotion.dev/license). SwiftClip templates are MIT licensed regardless of the Remotion license tier.

---

## 🔗 Links

- 📖 [Remotion Docs](https://remotion.dev/docs)
- 💬 [Community (LINE)](https://line.me/ti/g2/FO-LwoDfH0RrlsJ2hylmAyfA04-ZYNQBUWY-ow?utm_source=invitation&utm_medium=link_copy&utm_campaign=default)
- 🐛 [Report an Issue](https://github.com/zz41354899/SwiftClip/issues)
- ✨ [Request a Template](https://github.com/zz41354899/SwiftClip/issues/new?template=template_request.md)
