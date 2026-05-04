---
name: remotion-template-wizard
description: "Guide users through aligning a SwiftClip video brief, choosing the best Remotion template, confirming a storyboard plan, and optionally generating code. Use when the user wants help deciding which template fits, wants an planning workflow before code generation, or wants to build a new Remotion composition."
argument-hint: "describe the video goal, duration, and format"
---

# SwiftClip Remotion Template Wizard

This skill is self-contained. All 30 template references are bundled in `./references/templates/`. The planning and recommendation workflow runs regardless of whether the user has Remotion installed.

Code generation is conditional: only write files to disk if `remotion/Root.tsx` is detected in the workspace.

## Goals

- Understand the user's real video goal before picking a template.
- Narrow available options down to the best 2-3 instead of dumping the full list.
- Produce a confirmed brief and storyboard plan before any code is generated.
- Generate code only after the brief is explicitly confirmed.

## Source of Truth

- Template index: `./references/template-catalog.md`
- Individual template refs (props, visual style, embedded source): `./references/templates/<TemplateName>.md`
- Prop schemas and resolve helpers: embedded in each ref's `## Props` section

Do NOT rely on local `remotion/*.tsx` files for planning or recommendation. Use the ref files. The embedded `## Source` in each ref is the canonical source for code generation.

## Remotion Detection

Check once before Step 4 (code generation). Do not check before planning.

- **Remotion present**: `remotion/Root.tsx` exists in the workspace → write files directly, register in `Root.tsx`
- **Remotion absent**: skip file writes → output the component code as a code block the user can add manually, and note where to register it in `Root.tsx`

Do not block or interrupt the planning workflow based on Remotion presence.

## Workflow

### Fast onboarding

Start with a short routing pass before the full workflow.

Ask only these 3 questions first:

1. What kind of video is this: product promo, tutorial, social short, speaker overlay, or SaaS feature showcase?
2. What format is it: 16:9, 9:16, or 1:1?
3. Roughly how long is it: short 5s-8s, medium 9s-15s, or long 16s-30s?

Then propose one best-fit template first, plus at most one fallback. Read `./references/template-catalog.md` for the quick routing table.

If the user answer already maps cleanly to one template, do not ask the full 5-question alignment set immediately. Confirm the likely template first, then ask only the missing questions needed for Step 3.

### Step 1: Align the brief

If fast onboarding did not produce a confident base template, ask only the minimum questions needed to reduce ambiguity:

1. What is the video trying to achieve?
2. Where will it be published: 16:9, 9:16, or 1:1?
3. How many seconds should it be?
4. What tone should it feel like: product, social, cinematic, data-driven, educational, broadcast, or brand-led?
5. What is the key message or CTA?

If the user already provided enough detail, do not repeat questions. Summarize the brief in 4-6 lines.

If fast onboarding already identified a strong template, compress Step 1 into only the missing details:

- key message or CTA
- headline and supporting copy
- visual tone or brand color direction
- whether they want a direct derivative or just a planning brief

### Step 2: Recommend templates

Read `./references/template-catalog.md` and shortlist the best 2-3 templates based on:

- aspect ratio: 16:9, 9:16, or 1:1
- duration bucket: short 5s-8s, medium 9s-15s, long 16s-30s
- matching tags
- closest visual intent from title and description
- tier preference: prefer prop-enabled templates when the user wants quick parameterized generation; hardcoded templates when visual style matches exactly

For each recommendation, read its ref file (`./references/templates/<Name>.md`) and explain:

- why it fits
- key visual style
- tier (prop-enabled or hardcoded) and what that means for customization

Then ask the user to choose one template.

### Step 3: Confirm the production brief

Read the chosen template's ref file (`./references/templates/<Name>.md`) for its exact props, defaults, and visual style.

Before code generation, produce a compact plan with:

- chosen template name and tier (prop-enabled or hardcoded)
- target duration in seconds and frames
- aspect ratio and dimensions
- for prop-enabled: canonical prop values to pass
- for hardcoded: list of values to change and where in the source
- headline and supporting copy
- scene-by-scene beat list
- brand colors or visual direction
- whether the result should be a new derivative component or an in-place edit

Wait for explicit confirmation before generating code.

Include the preflight block:

```json
{
    "selectedTemplate": "TemplateName",
    "tier": "prop-enabled | hardcoded",
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
    },
    "remotionDetected": true
}
```

Rules:

- `tier` is `prop-enabled` or `hardcoded`, from the ref file.
- `storyboard` must be written before handoff. Each beat must include `beat`, `startFrame`, `endFrame`, `purpose`, `content`, and `motion`.
- Storyboard timing must fit inside `dimensions.durationInFrames`.
- `props.canonical` uses exact canonical keys from the ref file. Only set for prop-enabled templates.
- `remotionDetected` is determined at Step 4 — set it based on whether `remotion/Root.tsx` exists.

### Step 4: Code generation

After the brief is confirmed, check for Remotion:

- Look for `remotion/Root.tsx` in the workspace.
- Set `remotionDetected` in the preflight block accordingly.

**If Remotion is present** (`remotion/Root.tsx` found):

- Use the `## Source` in the template ref file as the base.
- For prop-enabled templates: pass the confirmed canonical props.
- For hardcoded templates: apply the value changes listed in the brief to the source.
- Write the new component to `remotion/<NewComponentName>.tsx`.
- Register it in `remotion/Root.tsx` with the confirmed dimensions and `compositionId`.
- If the user asked for in-place edits, modify the existing file instead of creating a new one.

**If Remotion is absent**:

- Output the component code as a code block.
- Tell the user which file to create (`remotion/<NewComponentName>.tsx`).
- Show the `<Composition>` registration snippet they need to add to `Root.tsx`.
- Do not write to disk.

In both cases, the generated component must match the confirmed storyboard and dimensions exactly.

## Operating Rules

- Do not start with all 30 templates at once unless the user explicitly asks for the full catalog.
- Prefer alignment and confirmation over speculative code generation.
- Use the `## Source` in each ref file as the sole source for code generation. Do not read local `remotion/*.tsx` files.
- For hardcoded templates, apply only the changes listed in the confirmed brief — do not refactor the source.
- Keep the brief concise and decision-oriented.
- Do not invent new prop names when a canonical schema already exists in the ref file.
- Treat legacy aliases as input compatibility only, not as the preferred output contract.