import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const CODE_LINES = [
  { text: "import { AbsoluteFill, useCurrentFrame } from 'remotion';", color: "#c792ea", indent: 0 },
  { text: "", color: "", indent: 0 },
  { text: "export const MyVideo = () => {", color: "#82aaff", indent: 0 },
  { text: "  const frame = useCurrentFrame();", color: "#c3e88d", indent: 1 },
  { text: "", color: "", indent: 0 },
  { text: "  const opacity = interpolate(", color: "#f07178", indent: 1 },
  { text: "    frame, [0, 30], [0, 1],", color: "#c3e88d", indent: 2 },
  { text: "    { extrapolateRight: 'clamp' }", color: "#c3e88d", indent: 2 },
  { text: "  );", color: "#f07178", indent: 1 },
  { text: "", color: "", indent: 0 },
  { text: "  return (", color: "#82aaff", indent: 1 },
  { text: "    <AbsoluteFill style={{ opacity }}>", color: "#89ddff", indent: 2 },
  { text: "      <h1>Hello, Remotion!</h1>", color: "#c3e88d", indent: 3 },
  { text: "    </AbsoluteFill>", color: "#89ddff", indent: 2 },
  { text: "  );", color: "#82aaff", indent: 1 },
  { text: "};", color: "#82aaff", indent: 0 },
];

const LINE_HEIGHT = 42;
const CHARS_PER_FRAME = 3;

export const CodeReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const windowOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const windowScale = interpolate(frame, [5, 30], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // How many total characters have been typed
  const totalChars = Math.max(0, (frame - 20) * CHARS_PER_FRAME);

  // Calculate per-line display
  let charsRemaining = totalChars;
  const lineDisplays: string[] = [];
  for (const line of CODE_LINES) {
    if (charsRemaining <= 0) {
      lineDisplays.push("");
    } else if (charsRemaining >= line.text.length) {
      lineDisplays.push(line.text);
      charsRemaining -= line.text.length + 1; // +1 for newline
    } else {
      lineDisplays.push(line.text.slice(0, charsRemaining));
      charsRemaining = 0;
    }
  }

  const cursorBlink = frame % 12 < 6;

  // Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a10",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 100px",
        opacity: bgOpacity,
        overflow: "hidden",
      }}
    >
      {/* Subtle glow */}
      <div style={{ position: "absolute", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(80px)", top: "20%" }} />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 40, opacity: titleOpacity }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>Just a few lines of code</div>
        <div style={{ fontSize: 42, fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>Build Your First Video</div>
      </div>

      {/* Code window */}
      <div
        style={{
          width: "100%",
          background: "#1e1e2e",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
          transform: `scale(${windowScale})`,
          opacity: windowOpacity,
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            background: "#2a2a3e",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          <div style={{ flex: 1, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
            MyVideo.tsx
          </div>
        </div>

        {/* Code area */}
        <div style={{ padding: "24px 0", fontFamily: "'Fira Code', 'Courier New', monospace" }}>
          {CODE_LINES.map((line, i) => {
            const displayed = lineDisplays[i] || "";
            const isCurrentLine = displayed.length < line.text.length && displayed.length > 0;
            const lineNum = i + 1;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  height: LINE_HEIGHT,
                  alignItems: "center",
                  paddingLeft: 24,
                  background: isCurrentLine ? "rgba(99,102,241,0.05)" : "transparent",
                }}
              >
                {/* Line number */}
                <div style={{ width: 40, fontSize: 14, color: "rgba(255,255,255,0.15)", textAlign: "right", paddingRight: 20, flexShrink: 0, userSelect: "none" }}>
                  {lineNum}
                </div>
                {/* Code */}
                <div style={{ fontSize: 17, color: line.color || "#546e7a", letterSpacing: "-0.01em", whiteSpace: "pre" }}>
                  {displayed}
                  {isCurrentLine && cursorBlink && (
                    <span style={{ display: "inline-block", width: 2, height: 18, background: "#6366f1", marginLeft: 1, verticalAlign: "middle" }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
