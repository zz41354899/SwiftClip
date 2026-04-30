export function GlowOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top-left orb — silver/white */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(192,192,192,0.4) 0%, rgba(192,192,192,0.1) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Top-right orb — blue tint */}
      <div
        className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(100,140,255,0.5) 0%, rgba(100,140,255,0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Center orb — purple tint */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(ellipse, rgba(160,100,255,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Bottom-right orb */}
      <div
        className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(192,192,192,0.3) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
