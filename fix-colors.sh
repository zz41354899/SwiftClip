#!/bin/bash

FILES=(
  "components/ShowcaseSection.tsx"
  "components/WorkflowSection.tsx"
  "components/FeatureSection.tsx"
  "components/TemplateShowcase.tsx"
  "components/CTASection.tsx"
  "components/Footer.tsx"
  "components/CodeSnippet.tsx"
  "components/TestimonialSlider.tsx"
  "components/StatsSection.tsx"
  "components/LogoMarquee.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # General dark to light swaps using sed
    # Note: we already stripped "dark:" prefixes. Now we invert the "light vs dark" color assumptions.
    sed -i '' 's/text-white/text-zinc-900/g' "$file"
    sed -i '' 's/text-zinc-400/text-zinc-500/g' "$file"
    sed -i '' 's/text-white\/60/text-zinc-500/g' "$file"
    sed -i '' 's/text-white\/70/text-zinc-600/g' "$file"
    sed -i '' 's/text-white\/80/text-zinc-700/g' "$file"
    sed -i '' 's/text-white\/40/text-zinc-400/g' "$file"
    
    sed -i '' 's/bg-black\/50/bg-white\/50/g' "$file"
    sed -i '' 's/bg-black\/40/bg-zinc-100/g' "$file"
    sed -i '' 's/bg-black/bg-white/g' "$file"
    sed -i '' 's/bg-\[#0a0a0a\]/bg-zinc-50/g' "$file"
    sed -i '' 's/bg-\[#111\]/bg-white/g' "$file"
    sed -i '' 's/bg-white\/5/bg-zinc-100/g' "$file"
    sed -i '' 's/bg-white\/10/bg-zinc-100/g' "$file"

    sed -i '' 's/border-white\/10/border-zinc-200/g' "$file"
    sed -i '' 's/border-white\/5/border-zinc-100/g' "$file"
    
    sed -i '' 's/from-black/from-white/g' "$file"
    sed -i '' 's/to-black/to-white/g' "$file"
    sed -i '' 's/from-white\/10/from-zinc-100/g' "$file"
    sed -i '' 's/from-white\/5/from-zero/g' "$file"
    
    # Specific buttons/badges (invert back back to dark for contrast)
    sed -i '' 's/bg-white text-zinc-900/bg-zinc-900 text-white/g' "$file"
  fi
done
