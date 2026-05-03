---
name: remotion-template-wizard
description: "Guide users through aligning a SwiftClip video brief, choosing the best Remotion template, confirming a storyboard plan, and preparing a new composition. Use when the user wants help deciding which template fits, wants an AI planning workflow before code generation, or wants to add a new Remotion composition in this repo."
argument-hint: "describe the video goal, duration, and format"
---

# SwiftClip Remotion Template Wizard

Use this skill for the SwiftClip repository to keep the conversation aligned before code generation.

## Goals

- Understand the user's real video goal before picking a template.
- Narrow available options down to the best 2-3 instead of dumping the full list.
- Produce a short confirmed brief before generating or editing any Remotion code.
- Only generate code after the brief, timing, and chosen template are explicit.

## Required Repository Anchors

- Template catalog: `lib/templates.ts`
- Composition registry: `remotion/Root.tsx`
- Existing template implementations: `remotion/*.tsx`
- Recommendation reference: `./references/template-catalog.md`

## Prerequisite Check

Before template alignment or code generation, confirm the workspace is already a Remotion project.

Minimum requirements:

- `remotion` is installed in `package.json`
- `remotion/Root.tsx` exists
- the user wants to generate into this existing Remotion codebase

If these requirements are missing, stop and tell the user to install or scaffold Remotion first. Do not pretend the skill can generate runnable output without a Remotion project.

Use this standard response when the prerequisite check fails:

1. Run `npx create-video@latest`
2. Enter the generated project folder
3. Re-enable the SwiftClip workflow in that Remotion project

## Workflow

### Fast onboarding

Start with a short routing pass before the full workflow.

Ask only these 3 questions first:

1. What kind of video is this: product promo, tutorial, social short, speaker overlay, or SaaS feature showcase?
2. What format is it: 16:9, 9:16, or 1:1?
3. Roughly how long is it: short 5s-8s, medium 9s-15s, or long 16s-30s?

Then propose one best-fit internal core template first, plus at most one fallback.

Use this quick routing table before asking any deeper follow-up questions:

| user intent | preferred internal base template | fallback | routing reason |
| --- | --- | --- | --- |
| product promo, launch, brand announcement | `ProductLaunch` | `TutorialIntro` | strongest internal base for polished hero-led marketing beats |
| tutorial, course intro, walkthrough opener | `TutorialIntro` | `SaaSPromo` | clean framed intro with a compact copy surface |
| social short, vertical brand post, quick hook | `SocialStory` | none | only internal 9:16 execution base |
| speaker nameplate, event lower-third, broadcast ID | `LowerThird` | `ProductLaunch` | direct match for overlay-style compositions |
| SaaS feature showcase, product capabilities, multi-beat feature story | `SaaSPromo` | `ProductLaunch` | strongest internal base for multi-scene feature storytelling |

If the user answer already maps cleanly to one internal base template, do not ask the full 5-question alignment set immediately. Confirm the likely base template first, then ask only the missing questions needed for Step 3.

### Step 1: Align the brief

If fast onboarding did not produce a confident base template, ask only the minimum questions needed to reduce ambiguity:

1. What is the video trying to achieve?
2. Where will it be published: 16:9, 9:16, or 1:1?
3. How many seconds should it be?
4. What tone should it feel like: product, social, cinematic, data-driven, educational, broadcast, or brand-led?
5. What is the key message or CTA?

If the user already provided enough detail, do not repeat questions. Summarize the brief in 4-6 lines.

If fast onboarding already identified a strong internal base template, compress Step 1 into only the missing details:

- key message or CTA
- headline and supporting copy
- visual tone or brand color direction
- whether they want a direct derivative or just a planning brief

### Step 2: Recommend templates

Read `lib/templates.ts` and `./references/template-catalog.md` and shortlist the best 2-3 templates based on:

- source group first: internal core templates vs external references
- aspect ratio next: 16:9, 9:16, or 1:1
- duration bucket after that: short 5s-8s, medium 9s-15s, long 16s-30s
- matching tags
- closest visual intent from title and description

Treat `./references/template-catalog.md` as the source of truth for:

- which 5 templates are internal core templates and support direct automatic generation
- which remaining templates are external references and should only influence recommendation or briefing

For each recommendation, explain:

- why it fits
- what tradeoff it has
- whether it is an internal core template or an external reference
- whether it is best used as-is, as a light variant, or only as style/planning inspiration

Then ask the user to choose one template.

When possible, keep the Step 2 response in this order:

1. best internal core base template
2. one fallback internal base template if needed
3. one external reference only if it adds useful style inspiration

Do not show three equal options by default. Bias toward a single recommended internal base template so the user can move into briefing faster.

### Step 3: Confirm the production brief

Before code generation, produce a compact plan with:

- chosen template
- whether it is an internal core template or an external reference
- internal base template that will actually drive generation
- short mapping reason when the chosen template is external
- target duration in seconds and frames
- aspect ratio
- headline and supporting copy
- scene-by-scene beat list
- brand colors or visual direction
- whether the result should modify an existing template or create a new derivative component
- canonical props schema to use for the chosen template
- any legacy aliases that should be accepted only for compatibility
- storyboard beats that can drive scene timing and content structure

Wait for explicit confirmation before generating code.

When you write the plan, use canonical prop names from `./references/template-catalog.md`, not ad hoc field names.

Use the same preflight JSON contract as the builder agent so the handoff shape stays identical.

If the chosen template is an external reference, do not present it as directly generatable. Instead:

- keep it as a visual or structural reference
- map the brief onto the closest internal core template
- make that mapping explicit before handing off to the builder agent

If the chosen template is an internal core template or has been mapped to an internal core template, include the preflight block in this shape:

```json
{
	"selectedTemplate": "TemplateName",
	"selectedTemplateClass": "internal-core | external-reference",
	"internalBaseTemplate": "TemplateName",
	"mappingReason": "short explanation",
	"newComponentName": "CustomTemplateName",
	"compositionId": "CustomTemplateName",
	"dimensions": {
		"width": 1920,
		"height": 1080,
		"fps": 30,
		"durationInFrames": 240
	},
	"storyboard": [
		{
			"beat": 1,
			"startFrame": 0,
			"endFrame": 60,
			"purpose": "Hero intro",
			"content": "headline enters",
			"motion": "fade + rise"
		}
	],
	"props": {
		"canonical": {},
		"legacyAliasesAccepted": []
	}
}
```

Rules:

- `selectedTemplate` is the template or reference the user actually chose.
- `selectedTemplateClass` must be `internal-core` or `external-reference`.
- `internalBaseTemplate` must always be one of the 5 internal core templates.
- `mappingReason` is required when `selectedTemplateClass` is `external-reference`.
- `storyboard` must describe the planned beat order before builder handoff.
- Each storyboard beat must include `beat`, `startFrame`, `endFrame`, `purpose`, `content`, and `motion`.
- Storyboard timing must fit inside `dimensions.durationInFrames`.
- `props.canonical` must use the exact canonical keys of the internal base template.
- `props.legacyAliasesAccepted` must list compatibility inputs only.

### Step 4: Hand off to the builder agent

After the brief is confirmed, delegate implementation to the `remotion-builder` agent.

The agent should:

- inspect the chosen source component under `remotion/`
- create a new derivative component instead of overwriting the original unless the user explicitly asks for in-place edits
- register the new composition in `remotion/Root.tsx`
- keep dimensions, fps, and duration aligned with the confirmed brief
- reuse the canonical props schema already confirmed in Step 3 instead of renaming fields during code generation

Expected output result:

- generate one new component file under `remotion/` unless the user explicitly asked to modify an existing one
- automatically add the matching `Composition` registration to `remotion/Root.tsx`
- keep the generated component aligned with the confirmed preflight JSON and storyboard beats

The builder agent should only generate directly from internal core templates.
If the user chose an external reference, the skill must first map it to an internal core base template.

The internal core templates for end-to-end automatic generation are:

- `ProductLaunch` -> `headline`, `subheadline`
- `TutorialIntro` -> `headline`, `durationLabel`
- `SocialStory` -> `headline`, `subheadline`, `brandHandle`
- `LowerThird` -> `headline`, `subheadline`
- `SaaSPromo` -> `headline`, `featureItems`

Do not present external references as part of the direct code-generation surface.

## Operating Rules

- Do not start with all 30 templates at once unless the user explicitly asks for the full catalog.
- Prefer alignment and confirmation over speculative code generation.
- If a template is mostly hardcoded, recommend a derivative component instead of risky in-place rewrites.
- Keep the brief concise and decision-oriented.
- If the user asks for a fully automatic first pass, steer toward the internal core templates from `./references/template-catalog.md`.
- Do not invent new prop names when a canonical schema already exists in `./references/template-catalog.md`.
- Treat legacy aliases as input compatibility only, not as the preferred output contract.
- Do not let external references bypass the internal core template gate for code generation.