#!/usr/bin/env bash

set -euo pipefail

workspace="${PWD}"
root_file="$workspace/remotion/Root.tsx"
templates_file="$workspace/lib/templates.ts"

if [[ ! -f "$root_file" ]]; then
  echo "swiftclip-remotion hook: remotion/Root.tsx not found; skipping validation."
  exit 0
fi

if [[ ! -f "$templates_file" ]]; then
  echo "swiftclip-remotion hook: lib/templates.ts not found; skipping validation."
  exit 0
fi

if ! grep -q "Composition" "$root_file"; then
  echo "swiftclip-remotion hook: remotion/Root.tsx does not contain a Composition registration."
  exit 1
fi

echo "swiftclip-remotion hook: basic Remotion validation passed."