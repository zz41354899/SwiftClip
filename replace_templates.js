const fs = require('fs');
let content = fs.readFileSync('lib/templates.ts', 'utf8');
content = content.replace(/{[\s\S]*?id: "glitch-title",[\s\S]*?codeSnippet: `[\s\S]*?`\n  },/, `{
    id: "dynamic-island",
    title: "Apple Dynamic Island",
    description: "Smooth fluid Dynamic Island animation that expands to reveal content and collapses like Apple iOS.",
    tags: ["UI", "Motion"],
    duration: "5s",
    remotionId: "DynamicIsland",
    fps: 30,
    durationInFrames: 150,
    width: 1920,
    height: 1080,
    videoUrl: "/videos/dynamic-island.mp4",
    codeSnippet: \`import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from "react";

export const DynamicIsland: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const initialPop = spring({ frame, fps, config: { damping: 14 } });
  const expandProgress = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const collapseProgress = spring({ frame: frame - 110, fps, config: { damping: 14 } });

  const pillBaseWidth = 140;
  const pillBaseHeight = 44;
  const pillExpandedWidth = 380;
  const pillExpandedHeight = 100;

  const currentWidth = interpolate(collapseProgress, [0, 1], [
    interpolate(expandProgress, [0, 1], [pillBaseWidth, pillExpandedWidth]),
    pillBaseWidth
  ]);

  const currentHeight = interpolate(collapseProgress, [0, 1], [
    interpolate(expandProgress, [0, 1], [pillBaseHeight, pillExpandedHeight]),
    pillBaseHeight
  ]);

  const borderRadius = currentHeight / 2.5; 
  const topPadding = 20;

  const expandedContentOpacity = interpolate(collapseProgress, [0, 0.5], [
    interpolate(expandProgress, [0.5, 1], [0, 1]),
    0
  ]);

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
      <div
        style={{
          position: "absolute",
          top: topPadding,
          left: "50%",
          transform: \\\`translateX(-50%) scale(\\\${interpolate(initialPop, [0, 1], [0.8, 1])})\\\`,
          opacity: interpolate(initialPop, [0.5, 1], [0, 1]),
          width: currentWidth,
          height: currentHeight,
          backgroundColor: "#000000",
          borderRadius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ opacity: expandedContentOpacity, color: "white", display: "flex", flexDirection: "row", alignItems: "center", width: "100%", padding: "0 24px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: "#333", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #FF9F0A 0%, #FF375F 100%)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#8e8e93" }}>Incoming...</span>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>0:12</span>
                </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 14, height: 14, backgroundColor: "#FF453A", borderRadius: 7 }} />
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#32D74B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 16, height: 16, border: "2px solid #fff", borderRadius: 8 }} />
                </div>
            </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};\`
  },`);
fs.writeFileSync('lib/templates.ts', content);
