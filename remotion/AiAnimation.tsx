import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Code2 } from "lucide-react";

export const AiAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Orb entrance
  const orbEntrance = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12 } });
  
  // 2. Morph from Orb to Chat Input Box
  // Morph starts at frame 35
  const morphProgress = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 16, mass: 0.8 }, durationInFrames: 30 });
  
  const boxWidth = interpolate(morphProgress, [0, 1], [140, 720]);
  const boxHeight = interpolate(morphProgress, [0, 1], [140, 88]);
  const boxBorderRadius = interpolate(morphProgress, [0, 1], [70, 44]);
  const inputOpacity = interpolate(morphProgress, [0.6, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 3. Typing text
  const promptText = "Siri, create a Dashboard layout...";
  const charsShown = Math.max(0, Math.floor((frame - 55) * 0.8));
  
  // 4. Layout moves up for results
  // Starts at frame 130
  const layoutShift = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 15 } });
  const containerY = interpolate(layoutShift, [0, 1], [0, -140]);

  // 5. Result card appears
  const cardEntrance = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 15 } });

  // Siri overlapping petal style
  const getPetalStyle = (color: string, rotStart: number, rotSpeed: number, width: number, height: number, offset: number) => ({
    position: "absolute" as const,
    width,
    height,
    background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
    borderRadius: "50%",
    mixBlendMode: "screen" as const,
    filter: "blur(4px)",
    transform: `rotate(${rotStart + frame * rotSpeed}deg) translateY(${offset}px)`,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#f5f5f7", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          transform: `translateY(${containerY}px)`
      }}>
        
        {/* Animated Input / Orb Container */}
        <div style={{
            position: "relative",
            width: boxWidth,
            height: boxHeight,
            borderRadius: boxBorderRadius,
            transform: `scale(${orbEntrance})`,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `rgba(255,255,255,${interpolate(morphProgress, [0, 1], [0, 0.7])})`,
            boxShadow: `0 20px 40px rgba(0,0,0,${interpolate(morphProgress, [0, 1], [0, 0.06])})`,
            border: `1px solid rgba(0,0,0,${interpolate(morphProgress, [0, 1], [0, 0.05])})`,
            backdropFilter: `blur(${interpolate(morphProgress, [0, 1], [0, 40])}px)`
        }}>
           
           {/* Siri Blob Container (Redesigned like the dark core with bright petals) */}
           <div style={{
               position: "absolute",
               left: "50%",
               transform: `translateX(-50%) translateX(${interpolate(morphProgress, [0, 1], [0, -300])}px) scale(${interpolate(morphProgress, [0, 1], [1, 0.45])})`,
               width: 140, height: 140,
               borderRadius: "50%",
               background: "radial-gradient(circle at center, #1b1b24 0%, #08080c 100%)", // Dark base
               display: "flex", justifyContent: "center", alignItems: "center",
               overflow: "hidden", // clip the petals to the sphere
               boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.1)",
               opacity: interpolate(morphProgress, [0, 1], [0.95, 1])
           }}>
              {/* Colorful overlapping petals */}
              <div style={getPetalStyle("rgba(90, 200, 250, 0.95)", 0, 1.5, 130, 80, -15)} />
              <div style={getPetalStyle("rgba(175, 82, 222, 0.95)", 120, -1.2, 140, 70, 20)} />
              <div style={getPetalStyle("rgba(255, 45, 85, 0.95)", 240, 1.8, 120, 80, -20)} />
              <div style={getPetalStyle("rgba(0, 122, 255, 0.95)", 60, -1.5, 130, 60, 15)} />
              
              {/* Inner bright white core */}
              <div style={{
                  position: "absolute", width: 50, height: 50, background: "white", borderRadius: "50%",
                  filter: "blur(6px)",
                  boxShadow: "0 0 25px 10px rgba(255,255,255,0.6)",
                  opacity: interpolate(morphProgress, [0, 1], [1, 0.8]),
                  transform: `scale(${1 + Math.sin(frame * 0.1) * 0.15})`
              }} />
           </div>

           {/* Input Text */}
           <div style={{
               position: "absolute",
               left: 110, // Space for the small orb
               right: 32,
               opacity: inputOpacity,
               fontSize: 28,
               fontWeight: 500,
               color: "#1d1d1f",
               letterSpacing: "-0.01em",
               display: "flex",
               alignItems: "center",
               whiteSpace: "nowrap",
               overflow: "hidden"
           }}>
              <span style={{ 
                  background: "linear-gradient(90deg, #1d1d1f 0%, #4a4a4d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
              }}>
                {promptText.slice(0, charsShown)}
              </span>
              <span style={{ 
                 opacity: frame % 30 < 15 ? 1 : 0, 
                 color: "#AF52DE",
                 marginLeft: 6,
                 transform: `scaleY(${frame % 30 < 15 ? 1 : 0.8})`
              }}>|</span>
           </div>
        </div>

        {/* Generated UI Component Card */}
        <div style={{
          position: "absolute",
          top: "50%",
          marginTop: 64,
          opacity: cardEntrance,
          transform: `scale(${cardEntrance}) translateY(${interpolate(cardEntrance, [0, 1], [60, 0])}px)`,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(40px)",
          padding: 40,
          borderRadius: 36,
          boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255,255,255,0.4)",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: 720,
          zIndex: 5
        }}>
           <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
             <div style={{ background: "linear-gradient(135deg, #AF52DE, #5AC8FA)", padding: 18, borderRadius: 20, boxShadow: "0 10px 20px rgba(175, 82, 222, 0.2)" }}>
                <Code2 color="white" size={32} strokeWidth={2.5} />
             </div>
             <div>
                <h3 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f" }}>DashboardLayout.tsx</h3>
                <p style={{ margin: "4px 0 0 0", color: "#86868b", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>Generated by Apple Intelligence</p>
             </div>
           </div>
           
           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[100, 85, 95, 60].map((w, i) => (
                 <div key={i} style={{ 
                    height: 16, 
                    width: `${w}%`, 
                    background: "rgba(0,0,0,0.05)", 
                    borderRadius: 8,
                    transform: `scaleX(${spring({ frame: Math.max(0, frame - 150 - i * 8), fps, config: { damping: 15 } })})`,
                    transformOrigin: "left"
                 }} />
              ))}
           </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
