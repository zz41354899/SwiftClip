import React, { useCallback, useRef } from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  HtmlInCanvas,
  type HtmlInCanvasOnInit,
  type HtmlInCanvasOnPaint,
  useRemotionEnvironment,
} from 'remotion';
import {
  Monitor, Compass, MessageCircle, Mail, Image as ImageIcon, Music,
  Terminal as TerminalIcon, Settings, FileText, Map as MapIcon, Video,
  Hammer, Palette, Code, Folder, File, Download, Cloud, HardDrive,
  Globe, Search, Trash2, Calculator, Users, Mountain, PieChart,
  PenTool, Sun, ShoppingBag, Grid,
} from 'lucide-react';

const SCREEN_W = 1920;
const SCREEN_H = 1080;

// ── WebGL Shaders ────────────────────────────────────────────────────────────
const VERT = `
attribute vec3 a_pos;
varying vec2 v_uv;
uniform float u_time;
uniform float u_is_reflection;

mat4 getRotationY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(c,0.0,s,0.0, 0.0,1.0,0.0,0.0, -s,0.0,c,0.0, 0.0,0.0,0.0,1.0);
}
mat4 getRotationX(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(1.0,0.0,0.0,0.0, 0.0,c,-s,0.0, 0.0,s,c,0.0, 0.0,0.0,0.0,1.0);
}

void main() {
    v_uv = vec2(a_pos.x * 0.5 + 0.5, 1.0 - (a_pos.y * 0.5 + 0.5));
    vec4 pos = vec4(a_pos, 1.0);

    float curve = 0.25;
    float radius = 1.0 / curve;
    float theta = pos.x * curve;
    pos.x = sin(theta) * radius;
    pos.z = cos(theta) * radius - radius;

    if (u_is_reflection > 0.5) {
        pos.y = -pos.y - 2.0;
    }

    float rx = sin(u_time * 0.3) * 0.01;
    float ry = cos(u_time * 0.2) * 0.02;
    pos = getRotationX(rx) * getRotationY(ry) * pos;

    float perspective = 1.0 - pos.z * 0.8;
    pos.x /= perspective;
    pos.y /= perspective;
    pos.x *= 0.85;
    pos.y *= 0.85;
    pos.y += 0.08;

    gl_Position = vec4(pos.x, pos.y, pos.z, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform float u_is_reflection;

void main() {
    if (v_uv.x < 0.0 || v_uv.x > 1.0 || v_uv.y < 0.0 || v_uv.y > 1.0) discard;
    vec4 ui = texture2D(u_tex, v_uv);
    if (ui.a > 0.0) ui.rgb /= ui.a;
    gl_FragColor = ui;
    if (gl_FragColor.a < 0.05) discard;
    if (u_is_reflection > 0.5) {
        float fade = smoothstep(0.1, 0.95, v_uv.y);
        gl_FragColor.rgb += vec3(0.0, 0.05, 0.1) * ui.a;
        gl_FragColor.a *= fade * 0.45;
    }
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(shader) ?? 'compile error');
  return shader;
}

// ── Static data ──────────────────────────────────────────────────────────────
const DOCK_APPS = [
  { name: 'Finder',   icon: <Monitor size={28} className="text-white" />,  bg: 'bg-gradient-to-b from-[#19bbf0] to-[#0473e6]' },
  { name: 'Safari',   icon: <Compass size={34} className="text-[#007aff]" strokeWidth={1.5} />,  bg: 'bg-white' },
  { name: 'Messages', icon: <MessageCircle size={28} className="text-[#34c759] fill-[#34c759]" />,  bg: 'bg-white' },
  { name: 'Mail',     icon: <Mail size={28} className="text-white fill-[#4bc0f6]/50" />,  bg: 'bg-gradient-to-b from-[#4bc0f6] to-[#0d78fa]' },
  { name: 'Photos',   icon: <ImageIcon size={28} className="text-[#ff2d55]" />,  bg: 'bg-gradient-to-b from-white to-[#f0f0f0]' },
  { name: 'Music',    icon: <Music size={28} className="text-white" />,  bg: 'bg-gradient-to-b from-[#fb4b67] to-[#e4214f]' },
  { name: 'Terminal', icon: <TerminalIcon size={28} className="text-black" />,  bg: 'bg-gradient-to-b from-white to-[#e0e0e0] border border-gray-300' },
  { name: 'Settings', icon: <Settings size={28} className="text-[#444]" />,  bg: 'bg-gradient-to-b from-[#e4e4e4] to-[#999999]' },
];

const FINDER_APPS = [
  { name: 'Safari',   icon: <Compass size={28} className="text-white" />, bg: 'from-[#4cd4ff] to-[#007aff]' },
  { name: 'Messages', icon: <MessageCircle size={28} className="text-white" />, bg: 'from-[#5bf07a] to-[#28cd41]' },
  { name: 'Mail',     icon: <Mail size={28} className="text-white" />, bg: 'from-[#5ac8fa] to-[#007aff]' },
  { name: 'Photos',   icon: <ImageIcon size={28} className="text-white" />, bg: 'from-[#ffcc02] to-[#ff9500]' },
  { name: 'Music',    icon: <Music size={28} className="text-white" />, bg: 'from-[#fc5c7d] to-[#9733ee]' },
  { name: 'Terminal', icon: <TerminalIcon size={28} className="text-white" />, bg: 'from-[#3d3d3d] to-[#1a1a1a]' },
  { name: 'Notes',    icon: <FileText size={28} className="text-white" />, bg: 'from-[#ffe066] to-[#ffc200]' },
  { name: 'Maps',     icon: <MapIcon size={28} className="text-white" />, bg: 'from-[#62d26f] to-[#1a9e2e]' },
  { name: 'FaceTime', icon: <Video size={28} className="text-white" />, bg: 'from-[#5cf07a] to-[#28cd41]' },
  { name: 'Xcode',    icon: <Hammer size={28} className="text-white" />, bg: 'from-[#5b7fff] to-[#2957e8]' },
  { name: 'Figma',    icon: <Palette size={28} className="text-white" />, bg: 'from-[#ff7262] to-[#a259ff]' },
  { name: 'VS Code',  icon: <Code size={28} className="text-white" />, bg: 'from-[#3c8ee7] to-[#1a5dc8]' },
];

// ── macOS Desktop UI ─────────────────────────────────────────────────────────
const MacOsDesktopUI: React.FC = () => {
  const frame = useCurrentFrame();

  const getMousePos = (f: number) => {
    if (f < 80)  return { x: 1200, y: 1200, scale: 1 };
    if (f < 100) return { x: 1200 + (520 - 1200) * ((f - 80) / 20), y: 1100 + (840 - 1100) * ((f - 80) / 20), scale: 1 };
    if (f < 155) return { x: 520 + (f - 100) * 0.15 * 65, y: 840, scale: 1 };
    if (f < 165) return { x: 1056 + (585 - 1056) * ((f - 155) / 10), y: 840, scale: 1 };
    if (f < 170) return { x: 585, y: 840, scale: 0.85 };
    if (f < 200) return { x: 585 + (1200 - 585) * ((f - 170) / 30), y: 840 + (1000 - 840) * ((f - 170) / 30), scale: 1 };
    if (f < 260) return { x: 1200, y: 1000, scale: 1 };
    if (f < 290) return { x: 1200 + (960 - 1200) * ((f - 260) / 30), y: 1000 + (540 - 1000) * ((f - 260) / 30), scale: 1 };
    if (f < 305) return { x: 960, y: 540, scale: 1 };
    if (f < 310) return { x: 960, y: 540, scale: 0.85 };
    if (f < 360) return { x: 960, y: 510 + 230 * ((f - 310) / 50), scale: 1 };
    if (f < 380) return { x: 1200 + (810 - 1200) * ((f - 360) / 20), y: 800 + (490 - 800) * ((f - 360) / 20), scale: 1 };
    if (f < 385) return { x: 810, y: 490, scale: 0.85 };
    if (f < 387) return { x: 810 + (870 - 810) * ((f - 385) / 2), y: 490 + (444 - 490) * ((f - 385) / 2), scale: 1 };
    if (f < 390) return { x: 870, y: 444, scale: 0.85 };
    if (f < 392) return { x: 870 + (690 - 870) * ((f - 390) / 2), y: 444, scale: 1 };
    if (f < 395) return { x: 690, y: 444, scale: 0.85 };
    if (f < 397) return { x: 690 + (870 - 690) * ((f - 395) / 2), y: 444 + (582 - 444) * ((f - 395) / 2), scale: 1 };
    if (f < 400) return { x: 870, y: 582, scale: 0.85 };
    if (f < 420) return { x: 870 + (62 - 870) * ((f - 400) / 20), y: 582 + (68 - 582) * ((f - 400) / 20), scale: 1 };
    if (f < 425) return { x: 62, y: 68, scale: 0.85 };
    return { x: 62 + 200 * ((f - 425) / 25), y: 68 + 200 * ((f - 425) / 25), scale: 1 };
  };

  const mouseRaw = getMousePos(frame);
  const shiftX = (f: number) => {
    if (f < 400) return 170;
    if (f < 420) return 170 * (1 - (f - 400) / 20);
    return 0;
  };
  const mouse = { ...mouseRaw, x: mouseRaw.x + shiftX(frame) };

  return (
    <AbsoluteFill
      className="bg-transparent flex items-center justify-center font-sans text-white"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif' }}
    >
      {/* Screen frame */}
      <div className="relative w-[1900px] h-[980px] rounded-[28px] overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.9)]">
        {/* Desktop Wallpaper — gradient fallback (no static file dependency) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a3e 75%, #0d0d1a 100%)',
          }}
        />
        {/* Subtle aurora overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at ${50 + Math.sin(frame / 60) * 15}% 40%, rgba(99,102,241,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at ${40 + Math.cos(frame / 80) * 10}% 70%, rgba(16,185,129,0.12) 0%, transparent 55%)`,
          }}
        />

        {/* macOS Menu Bar */}
        <div className="absolute top-0 w-full h-[30px] bg-black/55 flex items-center px-5 text-[13px] justify-between z-50 border-b border-white/8">
          <div className="flex items-center gap-5">
            <span className="font-bold text-[15px]">&#xF8FF;</span>
            <span className="font-semibold">Finder</span>
            <span className="opacity-70">File</span>
            <span className="opacity-70">Edit</span>
            <span className="opacity-70">View</span>
            <span className="opacity-70">Go</span>
            <span className="opacity-70">Window</span>
            <span className="opacity-70">Help</span>
          </div>
          <div className="flex items-center gap-5 opacity-80 text-[12px]">
            <span>100%</span>
            <span>Thu May 8  09:41 AM</span>
          </div>
        </div>

        {/* Finder Window */}
        {frame <= 423 && (
          <div className="absolute top-[46px] left-[40px] w-[760px] h-[500px] rounded-[14px] overflow-hidden flex flex-col shadow-[0_32px_80px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)] border border-white/20 bg-gradient-to-br from-white/10 via-transparent to-black/30">
            {/* Title bar */}
            <div className="h-[44px] bg-black/20 border-b border-white/8 flex items-center px-4 gap-3 shrink-0 relative">
              <div className="flex gap-2">
                <div className={`w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center ${frame > 415 && frame < 425 ? 'brightness-75' : ''}`}>
                  {frame > 415 && frame < 425 && <span className="text-black/50 text-[8px] leading-none mb-[2px]">x</span>}
                </div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex gap-[2px] ml-2 opacity-50 text-[18px] font-bold leading-none">
                <span>&#8249;</span>
                <span>&#8250;</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[13px] font-medium opacity-80">Applications</span>
              </div>
              <div className="ml-auto bg-white/10 rounded-[6px] px-3 py-1 text-[12px] opacity-60 min-w-[130px] flex items-center gap-2">
                <Search size={14} />
                <span>Search</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar */}
              <div className="w-[180px] bg-black/40 backdrop-blur-md border-r border-white/8 p-3 flex flex-col gap-[2px] text-[12px] shrink-0">
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1 px-2 mt-1">Favorites</div>
                {[
                  { label: 'Applications', icon: <Folder size={14} /> },
                  { label: 'Desktop',      icon: <Monitor size={14} /> },
                  { label: 'Documents',    icon: <File size={14} /> },
                  { label: 'Downloads',    icon: <Download size={14} /> },
                  { label: 'iCloud Drive', icon: <Cloud size={14} /> },
                ].map((item, i) => (
                  <div key={i} className={`px-2 py-[5px] rounded-[6px] flex items-center gap-2 ${i === 0 ? 'bg-white/15 text-white' : 'text-white/60'}`}>
                    {item.icon}<span>{item.label}</span>
                  </div>
                ))}
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1 px-2 mt-3">Locations</div>
                {[
                  { label: 'Macintosh HD', icon: <HardDrive size={14} /> },
                  { label: 'Network',      icon: <Globe size={14} /> },
                ].map((item, i) => (
                  <div key={i} className="px-2 py-[5px] rounded-[6px] flex items-center gap-2 text-white/60">
                    {item.icon}<span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* App Grid */}
              <div className="flex-1 p-6 grid grid-cols-6 gap-5 content-start overflow-hidden">
                {FINDER_APPS.map((app, i) => (
                  <div key={i} className="flex flex-col items-center gap-[6px]">
                    <div className={`w-14 h-14 rounded-[14px] bg-gradient-to-b ${app.bg} flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}>
                      {app.icon}
                    </div>
                    <span className="text-[11px] text-white/75 text-center leading-tight">{app.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dock */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-[84px] bg-gradient-to-b from-white/20 to-white/5 border border-white/30 border-b-white/10 rounded-[22px] px-3 flex items-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.5)]">
          {DOCK_APPS.map((app, i) => {
            const waveCenter = (frame - 100) * 0.15;
            const dist = Math.abs(waveCenter - i);
            const isHovering = frame > 100 && frame < 240 && dist < 2.5;
            const scale = isHovering ? 1 + Math.max(0, (2.5 - dist) * 0.25) : 1;
            const yOffset = isHovering ? -Math.max(0, (2.5 - dist) * 8) : 0;
            const margin = isHovering ? Math.max(0, (2.5 - dist) * 5) : 0;
            let jumpY = 0;
            if (i === 1 && frame > 170) {
              jumpY = -Math.abs(Math.sin((frame - 170) * 0.25) * 25) * Math.max(0, 1 - (frame - 170) * 0.015);
            }
            return (
              <div key={i} className="relative flex flex-col items-center justify-end h-full pb-4"
                style={{ transform: `scale(${scale}) translateY(${yOffset + jumpY}px)`, margin: `0 ${margin}px` }}>
                <div className={`w-[54px] h-[54px] rounded-[14px] ${app.bg} flex items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.55)] border border-white/15`}>
                  {app.icon}
                </div>
                <div className={`absolute -top-12 bg-black/60 px-3 py-[4px] rounded-md text-white text-[12px] whitespace-nowrap ${isHovering && dist < 0.5 ? 'opacity-100' : 'opacity-0'}`}>
                  {app.name}
                </div>
                {i < 3 && <div className="absolute bottom-[6px] w-[5px] h-[5px] bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]" />}
              </div>
            );
          })}
          <div className="w-px h-10 bg-white/25 mx-1" />
          <div className="flex flex-col items-center justify-end h-full pb-4">
            <div className="w-[54px] h-[54px] rounded-[14px] bg-gradient-to-b from-[#aaaaaa] to-[#666] flex items-center justify-center shadow-[0_4px_18px_rgba(0,0,0,0.55)] border border-white/15">
              <Trash2 size={28} className="text-white" />
            </div>
          </div>
        </div>

        {/* Launchpad */}
        {frame > 260 && frame < 330 && (
          <div
            className="absolute inset-0 z-[900] flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: frame < 315 ? Math.min(1, (frame - 260) / 15) : Math.max(0, 1 - (frame - 315) / 15) }}
          >
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.15)] backdrop-blur-[60px]" style={{ maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 95%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 95%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0) 15%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.98) 100%)' }} />

            <div className="flex flex-col gap-[45px] relative z-10">
              {/* Row 1 */}
              <div className="flex justify-center gap-[45px]">
                {[
                  { name: 'TV',          icon: <Monitor size={48} className="text-white" />, bg: 'from-[#000000] to-[#2a2a2a]' },
                  { name: 'Music',       icon: <Music size={48} className="text-white" />, bg: 'from-[#ff3b68] to-[#ff2a55]' },
                  { name: 'Mindfulness', icon: <Sun size={48} className="text-white" />, bg: 'from-[#4eedd5] to-[#25cbaf]' },
                  { name: 'Settings',    icon: <Settings size={48} className="text-white" />, bg: 'from-[#737373] to-[#424242]' },
                ].map((app, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 w-[110px]">
                    <div className={`w-[96px] h-[96px] rounded-full bg-gradient-to-b ${app.bg} flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)]`}>{app.icon}</div>
                    <span className="text-white/90 text-[14px] font-normal tracking-wide">{app.name}</span>
                  </div>
                ))}
              </div>

              {/* Row 2 — Calculator centered */}
              <div className="flex justify-center gap-[45px]">
                {[
                  { name: 'Freeform',   icon: <PenTool size={48} className="text-[#007aff]" />, bg: 'from-[#ffffff] to-[#e4e4e4]' },
                  { name: 'Safari',     icon: <Compass size={48} className="text-white" />, bg: 'from-[#4cd4ff] to-[#007aff]' },
                  { name: 'Calculator', icon: <Calculator size={48} className="text-white" />, bg: 'from-[#ffb347] to-[#ff7b00]' },
                  { name: 'Photos',     icon: <ImageIcon size={48} className="text-[#ff9500]" />, bg: 'from-[#ffffff] to-[#f4f4f4]' },
                  { name: 'App Store',  icon: <ShoppingBag size={48} className="text-white" />, bg: 'from-[#5bd4ff] to-[#298de8]' },
                ].map((app, i) => {
                  const isCalc = app.name === 'Calculator';
                  const isHovered = isCalc && frame > 280 && frame < 305;
                  const isClicked = isCalc && frame > 305 && frame < 312;
                  return (
                    <div key={i} className="flex flex-col items-center gap-3 w-[110px]">
                      <div
                        className={`w-[96px] h-[96px] rounded-full bg-gradient-to-b ${app.bg} flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)]`}
                        style={{ transform: isClicked ? 'scale(0.85)' : isHovered ? 'scale(1.15)' : 'scale(1)' }}
                      >
                        {app.icon}
                      </div>
                      <span className="text-white/90 text-[14px] font-normal tracking-wide">{app.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Row 3 */}
              <div className="flex justify-center gap-[45px]">
                {[
                  { name: 'Mail',     icon: <Mail size={48} className="text-white" />, bg: 'from-[#5ac8fa] to-[#007aff]' },
                  { name: 'Messages', icon: <MessageCircle size={48} className="text-white" />, bg: 'from-[#5bf07a] to-[#28cd41]' },
                  { name: 'Keynote',  icon: <PieChart size={48} className="text-white" />, bg: 'from-[#5b7fff] to-[#2957e8]' },
                  { name: 'Folder',   icon: <Grid size={48} className="text-white" />, bg: 'from-[#737373] to-[#424242]' },
                ].map((app, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 w-[110px]">
                    <div className={`w-[96px] h-[96px] rounded-full bg-gradient-to-b ${app.bg} flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)]`}>{app.icon}</div>
                    <span className="text-white/90 text-[14px] font-normal tracking-wide">{app.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Pill */}
            <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-[68px] py-10 rounded-[34px] bg-[rgba(26,28,30,0.6)] border border-[rgba(255,255,255,0.15)] flex flex-col items-center gap-10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-20 overflow-hidden">
              <ShoppingBag size={26} strokeWidth={1.5} className="text-white/80" />
              <Users size={26} strokeWidth={1.5} className="text-white/80" />
              <Mountain size={26} strokeWidth={1.5} className="text-white/80" />
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-36 flex items-center gap-3 z-20">
              <div className="w-[8px] h-[8px] rounded-full bg-white opacity-100" />
              <div className="w-[8px] h-[8px] rounded-full bg-white opacity-40" />
            </div>
          </div>
        )}

        {/* Calculator App */}
        {frame > 320 && (
          <div className="absolute inset-0 m-auto w-[240px] h-[330px] bg-[rgba(40,40,40,0.98)] border border-[rgba(255,255,255,0.2)] rounded-xl shadow-2xl flex flex-col overflow-hidden z-[850]">
            <div className="h-[28px] bg-white/5 flex items-center px-3 gap-2">
              <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f56]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
              <div className="w-[10px] h-[10px] rounded-full bg-[#27c93f]" />
            </div>
            <div className="px-4 py-4 flex justify-end text-white text-[42px] font-light leading-none">
              {frame > 390 ? '42' : '0'}
            </div>
            <div className="flex flex-col flex-1 bg-black/40 gap-[1px] p-[1px]">
              {[['AC', '+/-', '%', '÷'], ['7', '8', '9', '×'], ['4', '5', '6', '-'], ['1', '2', '3', '+'], ['0', '.', '=']].map((row, rIndex) => (
                <div key={rIndex} className="flex flex-1 gap-[1px]">
                  {row.map((btn) => {
                    const isOrange = ['÷','×','-','+','='].includes(btn);
                    const isLight  = ['AC','+/-','%'].includes(btn);
                    const isLit    = (btn === '6' && frame > 380 && frame < 385) ||
                                     (btn === '×' && frame > 385 && frame < 390) ||
                                     (btn === '7' && frame > 390 && frame < 395) ||
                                     (btn === '=' && frame > 395 && frame < 400);
                    return (
                      <div
                        key={btn}
                        className={`flex items-center text-[18px] font-medium text-white ${isOrange ? 'bg-[#f4a331]' : isLight ? 'bg-white/20' : 'bg-white/10'} ${btn === '0' ? 'justify-start pl-[28px]' : 'justify-center'}`}
                        style={{ width: btn === '0' ? 'calc(50% + 0.5px)' : '25%', backgroundColor: isLit ? 'rgba(255,255,255,0.4)' : undefined }}
                      >{btn}</div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Boot Screen Overlay */}
        {frame < 120 && (
          <div
            className="absolute inset-0 bg-black flex flex-col items-center justify-center z-[999] pointer-events-none"
            style={{ opacity: Math.max(0, 1 - (frame - 70) / 25) }}
          >
            <div className="text-white text-[130px] mb-14 leading-none" style={{ fontWeight: 900 }}>&#xF8FF;</div>
            <div className="w-[240px] h-[6px] bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(100, (frame / 60) * 100)}%` }} />
            </div>
          </div>
        )}

        {/* Mouse Cursor */}
        {frame > 80 && (
          <div
            className="absolute z-[9999] pointer-events-none"
            style={{ left: `${mouse.x}px`, top: `${mouse.y}px`, transform: `translate(-20%, -10%) scale(${mouse.scale})`, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12 28L18 20L26 23L9 3L12 28Z" fill="black" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ── WebGL Holographic Wrapper (headless render only) ─────────────────────────
const HoloDashboardInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  type GlState = {
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    tex: WebGLTexture;
    uTime: WebGLUniformLocation;
    uIsReflection: WebGLUniformLocation;
    vertexCount: number;
  };
  const glStateRef = useRef<GlState | null>(null);

  const onInit: HtmlInCanvasOnInit = useCallback(({ canvas }) => {
    const gl = canvas.getContext('webgl')!;
    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram()!;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program) ?? 'link error');
    gl.useProgram(program);

    const cols = 60, rows = 30;
    const verts: number[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const x0 = (x / cols) * 2 - 1, x1 = ((x + 1) / cols) * 2 - 1;
        const y0 = (y / rows) * 2 - 1, y1 = ((y + 1) / rows) * 2 - 1;
        verts.push(x0,y0,0, x1,y0,0, x0,y1,0);
        verts.push(x0,y1,0, x1,y0,0, x1,y1,0);
      }
    }
    const vertexCount = cols * rows * 6;
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const uTime = gl.getUniformLocation(program, 'u_time')!;
    const uIsReflection = gl.getUniformLocation(program, 'u_is_reflection')!;
    gl.uniform1i(gl.getUniformLocation(program, 'u_tex'), 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    glStateRef.current = { gl, program, tex, uTime, uIsReflection, vertexCount };
    return () => {
      gl.deleteTexture(tex);
      gl.deleteProgram(program);
      glStateRef.current = null;
    };
  }, []);

  const onPaint: HtmlInCanvasOnPaint = useCallback(({ element, elementImage }) => {
    if (!glStateRef.current) return;
    const { gl, tex, uTime, uIsReflection, vertexCount } = glStateRef.current;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = SCREEN_W;
    tempCanvas.height = SCREEN_H;
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx && typeof (tempCtx as any).drawElementImage === 'function') {
      (tempCtx as any).drawElementImage(elementImage, 0, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tempCanvas);
    }
    element.style.transform = 'translate(-99999px, 0)';

    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniform1f(uTime, frame / fps);
    gl.uniform1f(uIsReflection, 0.0);
    gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
    gl.uniform1f(uIsReflection, 1.0);
    gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
    gl.flush();
  }, [frame, fps, width, height]);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${50 + Math.sin(frame / 40) * 10}% ${50 + Math.cos(frame / 30) * 8}%, rgba(80,90,110,1) 0%, rgba(15,18,24,1) 40%, rgba(0,0,0,1) 100%)`,
      }}
    >
      <HtmlInCanvas width={SCREEN_W} height={SCREEN_H} onInit={onInit} onPaint={onPaint}>
        <MacOsDesktopUI />
      </HtmlInCanvas>
    </AbsoluteFill>
  );
};

// ── CSS-only wrapper for browser Player ─────────────────────────────────────
const HoloDashboardPlain: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${50 + Math.sin(frame / 40) * 10}% ${50 + Math.cos(frame / 30) * 8}%, rgba(80,90,110,1) 0%, rgba(15,18,24,1) 40%, rgba(0,0,0,1) 100%)`,
      }}
    >
      <MacOsDesktopUI />
    </AbsoluteFill>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export const AppleMovie: React.FC = () => {
  const { isRendering } = useRemotionEnvironment();
  if (isRendering && HtmlInCanvas.isHtmlInCanvasSupported()) {
    return <HoloDashboardInner />;
  }
  return <HoloDashboardPlain />;
};
