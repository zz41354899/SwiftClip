import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Bell, Heart, MousePointer2 } from "lucide-react";

export const SubscribeCTA: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cardScale = interpolate(frame, [10, 40], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const avatarOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subCountOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const buttonScale = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  const ctaOpacity = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bellAngle = frame > 110 && frame < 145
    ? Math.sin((frame - 110) * 0.7) * 20 * Math.max(0, 1 - (frame - 110) / 35)
    : 0;

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity,
      }}
    >
      <div style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(40px)",
        border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
        borderRadius: 48,
        padding: "80px 120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: `scale(${cardScale})`,
      }}>
        {/* Avatar */}
        <div style={{
          width: 160,
          height: 160,
          borderRadius: 80,
          background: "rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
          opacity: avatarOpacity,
        }}>
          <Bell size={64} color="#1d1d1f" />
        </div>

        {/* Name */}
        <div style={{ opacity: nameOpacity, textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#1d1d1f", letterSpacing: "-0.04em" }}>YourChannel</div>
        </div>

        <div style={{ fontSize: 24, fontWeight: 500, color: "#86868b", marginBottom: 56, opacity: subCountOpacity }}>
          1.2M Subscribers
        </div>

        {/* Button */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "#f5f5f7",
          border: "1px solid rgba(0,0,0,0.05)",
          borderRadius: 32,
          padding: "24px 64px",
          transform: `scale(${buttonScale})`,
        }}>
          <div style={{ transform: `rotate(${bellAngle}deg)`, transformOrigin: "top center" }}>
            <Bell size={28} color="black" />
          </div>
          <span style={{ fontSize: 24, fontWeight: 800, color: "black", letterSpacing: "-0.02em" }}>Subscribe</span>
        </div>

        <div style={{
          marginTop: 40,
          fontSize: 18,
          fontWeight: 600,
          color: "#86868b",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          opacity: ctaOpacity,
        }}>
          New videos every week
        </div>
      </div>
      
      {/* Interaction icons floating */}
      <div style={{
          position: "absolute",
          bottom: 120,
          right: 280,
          opacity: interpolate(frame, [90, 110, 130], [0, 1, 0]),
          transform: `translate(${interpolate(frame, [90, 110], [60, 0])}px, ${interpolate(frame, [90, 110], [60, 0])}px)`,
          color: "#1d1d1f",
          zIndex: 10,
        }}>
          <MousePointer2 size={64} fill="#1d1d1f" />
      </div>

    </AbsoluteFill>
  );
};
