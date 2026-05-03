# SwiftClip Publisher Copy Pack

This file is the shared product copy source for SwiftClip across Claude Code, Codex, GitHub Copilot CLI, GitHub repository metadata, README content, and marketplace submission forms.

## Primary Release Surface

- Primary release surface: Claude Code marketplace
- Secondary compatibility surface: Codex plugin and marketplace
- Planned surface: GitHub Copilot CLI plugin

## Shared Product Identity

- Product name: `SwiftClip`
- Plugin name: `swiftclip-remotion`
- Marketplace name: `swiftclip-tools`
- Core skill name: `remotion-template-wizard`
- Core agent name: `remotion-builder`
- Shared planning contract: `preflight JSON + storyboard beats`

All three platforms should use the same internal workflow shape:

1. align the video brief
2. recommend the best internal Remotion base template
3. emit machine-readable preflight JSON plus storyboard beats
4. generate a derivative component
5. register the composition in `remotion/Root.tsx`

## Shared Brand URLs

- Homepage: `https://swift-clip.vercel.app/`
- Repository: `https://github.com/zz41354899/SwiftClip`
- Privacy policy: `https://swift-clip.vercel.app/privacy`
- Terms of service: `https://swift-clip.vercel.app/terms`

## Core Product Description

### One-line summary

SwiftClip is a storyboard-driven Remotion workflow for turning a video brief into a production-ready composition.

### Short description

Storyboard-driven Remotion workflow for brief alignment, template selection, and composition generation.

### Medium description

SwiftClip helps users align a video brief, choose the best internal Remotion base template, generate machine-readable preflight JSON and storyboard beats, then create and register a derivative composition in `remotion/Root.tsx`.

### Long description

SwiftClip Remotion is a workflow plugin for storyboard-driven video generation in Remotion. It helps users align a video brief, choose the best internal base template, generate machine-readable preflight JSON and storyboard beats, then create and register a derivative composition in `remotion/Root.tsx`. The workflow is designed for teams already working inside a Remotion project who want a structured path from planning to executable composition output.

## GitHub Repository Copy

### GitHub About description

Production-ready Remotion templates and a storyboard-driven Claude workflow for composition generation.

### GitHub About topics

`remotion claude-code claude-plugin codex github-copilot video-templates storyboard video-generation react typescript nextjs`

### README homepage summary

SwiftClip is a Remotion-first template library and workflow toolkit for turning a video brief into a production-ready composition. Users can browse templates manually or install the workflow plugin to align the brief, choose an internal base template, generate storyboard-backed preflight JSON, and automatically register the resulting composition in `remotion/Root.tsx`.

## Claude Code Copy

### Marketplace description

Interactive workflow for aligning video requirements, selecting Remotion templates, and generating SwiftClip compositions.

### Submission description

SwiftClip Remotion is a Claude Code plugin and GitHub-backed marketplace for planning and generating Remotion video compositions. It helps users align a video brief, recommend the best internal base template, produce a machine-readable preflight JSON and storyboard beats, then generate a derivative component and register it in `remotion/Root.tsx`. The plugin is designed for teams already working inside a Remotion project who want a structured workflow for template selection, brief confirmation, and composition generation.

### Install commands

```text
/plugin marketplace add zz41354899/SwiftClip
/plugin install swiftclip-remotion@swiftclip-tools
/reload-plugins
```

## Codex Copy

### Plugin display name

`SwiftClip Remotion`

### Codex short description

Storyboard-driven Remotion composition workflow.

### Codex long description

Align video briefs, choose the best internal Remotion base template, generate machine-readable preflight JSON plus storyboard beats, and create derivative compositions registered in `remotion/Root.tsx`.

### Codex category

`Productivity`

### Codex default prompts

- Help me choose the right Remotion template for a product launch video.
- Turn my video brief into preflight JSON and storyboard beats.
- Generate a new Remotion derivative component and register it in Root.tsx.

## GitHub Copilot CLI Copy

### Plugin short description

Reusable Remotion workflow for brief alignment, storyboard planning, and composition generation.

### Plugin long description

SwiftClip Remotion extends GitHub Copilot CLI with a structured workflow for turning a video brief into a Remotion composition. It aligns the brief, recommends an internal base template, generates preflight JSON and storyboard beats, then creates and registers a derivative component in `remotion/Root.tsx`.

### Component naming

- plugin id: `swiftclip-remotion`
- marketplace id: `swiftclip-tools`
- skill id: `remotion-template-wizard`
- agent id: `remotion-builder`
- validation hook id: `validate-remotion`

For GitHub Copilot CLI, keep these names identical to the Claude Code and Codex surfaces so docs, onboarding, and install copy stay aligned.

## Shared Install Surface Language

Use this wording on all platforms:

- Requires an existing Remotion project
- Requires `remotion` in `package.json`
- Requires `remotion/Root.tsx`
- Not a replacement for `npx create-video@latest`

Standard prerequisite response:

1. Run `npx create-video@latest`
2. Enter the generated project folder
3. Re-enable the SwiftClip workflow in that Remotion project

## Shared Outcome Promise

Use this wording consistently across README files, manifests, and submission forms:

The workflow produces a machine-readable preflight JSON and storyboard beats before code generation. After confirmation, it generates a derivative Remotion component and automatically adds the matching `Composition` registration to `remotion/Root.tsx`.