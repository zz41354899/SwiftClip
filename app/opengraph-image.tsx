import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SwiftClip — React video templates";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#09090b",
          position: "relative",
          fontFamily: "Inter, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient Glow */}
        <div
          style={{
            position: "absolute",
            top: "-300px",
            left: "-100px",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 60%)",
            borderRadius: "50%",
          }}
        />

        {/* Left Side: Copy & Branding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "80px",
            width: "600px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              background: "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "999px",
              color: "#e4e4e7",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "32px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            Open Source Templates
          </div>

          <div style={{ fontSize: "72px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "8px" }}>
            Ship videos
          </div>
          <div style={{ fontSize: "72px", fontWeight: 800, color: "#a1a1aa", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "32px" }}>
            faster.
          </div>

          <div style={{ fontSize: "24px", color: "#a1a1aa", lineHeight: 1.5, fontWeight: 400, maxWidth: "480px", marginBottom: "48px" }}>
            Production-ready Remotion templates you can copy, customize, and render in minutes.
          </div>

          {/* Logo Group */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 3L19 12L5 21V3Z" fill="#000000" />
              </svg>
            </div>
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.02em" }}>
              SwiftClip
            </span>
          </div>
        </div>

        {/* Right Side: Hero Visual (Code/App Preview) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "600px",
            paddingRight: "80px",
          }}
        >
          {/* Abstract Code / Player Window */}
          <div
            style={{
              width: "500px",
              height: "400px",
              background: "rgba(24,24,27,0.8)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
            }}
          >
            {/* Window Header */}
            <div style={{ height: "48px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", paddingLeft: "16px", paddingRight: "16px", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e" }} />
              <div style={{ marginLeft: "16px", fontSize: "13px", color: "#52525b", fontFamily: "monospace" }}>remotion/Template.tsx</div>
            </div>

            {/* Window Content (Code lines) */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ width: "80%", height: "16px", background: "rgba(59,130,246,0.2)", borderRadius: "4px" }} />
              <div style={{ width: "60%", height: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
              <div style={{ width: "90%", height: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
              <div style={{ width: "40%", height: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
              <div style={{ width: "70%", height: "16px", background: "rgba(168,85,247,0.2)", borderRadius: "4px", marginTop: "16px" }} />
              <div style={{ width: "85%", height: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
            </div>

            {/* Faux Render Progress Bar */}
            <div style={{ display: "flex", flexDirection: "column", padding: "20px", marginTop: "32px" }}>
              <div style={{ display: "flex", fontSize: "12px", color: "#52525b", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2px" }}>Rendering...</div>
              <div style={{ display: "flex", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
                <div style={{ width: "65%", height: "4px", background: "linear-gradient(90deg, #3b82f6, #a855f7)", borderRadius: "2px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
