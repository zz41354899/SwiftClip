# TeamGrid

- **Component**: `TeamGrid`
- **Tier**: hardcoded
- **Aspect ratio**: 16:9
- **Dimensions**: 1920×1080 | 30fps | 240 frames | 8s
- **Tags**: Business, Marketing

## Description

Animated team member grid with staggered card entrances for company introductions.

## Key hardcoded values

| element | current value | how to change |
| --- | --- | --- |
| Section label | `"Meet the team"` | edit text node |
| Section headline | `"The People Behind SwiftClip"` | edit text node |
| Team members | `TEAM` array (6 members) | edit `TEAM` array at top of file |
| Member initials | `"AK"`, `"SL"`, etc. | edit `initials` field |
| Member name | `"Alex Kim"`, etc. | edit `name` field |
| Member role | `"CEO & Founder"`, etc. | edit `role` field |
| Avatar color | `#34c759`, `#ff2d55`, etc. | edit `color` field per member |

`TEAM` array structure: `{ initials, name, role, color }`

## Visual style

3-column grid of frosted glass member cards. Each card: colored initial avatar + name + role. Header with Users icon + section label + headline. Staggered card entrance with spring physics.

## Use cases

Team introductions, about us videos, company profiles, org announcements.

## Source

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Users, User, ExternalLink } from "lucide-react";

const TEAM = [
  { initials: "AK", name: "Alex Kim", role: "CEO & Founder", color: "#34c759" },
  { initials: "SL", name: "Sarah Lin", role: "Head of Design", color: "#ff2d55" },
  { initials: "MT", name: "Marco Torres", role: "Lead Engineer", color: "#5856d6" },
  { initials: "YC", name: "Yuki Chen", role: "Product Manager", color: "#ff9500" },
  { initials: "RB", name: "Ryan Blake", role: "Marketing Lead", color: "#32ade6" },
  { initials: "NP", name: "Nina Park", role: "Data Scientist", color: "#af52de" },
];

export const TeamGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 30], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "#f5f5f7",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 80px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
          <Users size={20} color="#86868b" />
          <div style={{ fontSize: 13, fontWeight: 700, color: "#86868b", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Meet the team
          </div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em" }}>
          The People Behind SwiftClip
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          width: "100%",
        }}
      >
        {TEAM.map((member, i) => {
          const delay = 30 + i * 14;
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardY = interpolate(frame, [delay, delay + 25], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
                backdropFilter: "blur(40px)",
                borderRadius: 32,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                position: "relative",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 800,
                  color: member.color,
                  flexShrink: 0,
                }}
              >
                {member.initials}
              </div>

              {/* Name and role */}
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#1d1d1f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", letterSpacing: "-0.02em" }}>
                  {member.name}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#86868b", marginTop: 4 }}>
                  {member.role}
                </div>
              </div>

              {/* Icon link */}
              <div style={{ opacity: 0.5, color: "#1d1d1f" }}>
                <ExternalLink size={20} />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```
