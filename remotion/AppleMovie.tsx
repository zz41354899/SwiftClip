import React, { useCallback, useRef } from 'react';
import {
    AbsoluteFill,
    HtmlInCanvas,
    type HtmlInCanvasOnInit,
    type HtmlInCanvasOnPaint,
    useCurrentFrame,
    useVideoConfig,
    useRemotionEnvironment,
    Img,
    staticFile,
} from 'remotion';
import { Monitor, Compass, MessageCircle, Mail, Image as ImageIcon, Music, Terminal as TerminalIcon, Settings, FileText, Map as MapIcon, Video, Hammer, Palette, Code, Folder, File, Download, Cloud, HardDrive, Globe, Search, Trash2 , Calculator , Users, Mountain, PieChart, PenTool, Sun, ShoppingBag, Grid} from 'lucide-react';

const SCREEN_W = 1920;
const SCREEN_H = 1080;
const DESKTOP_W = 1900;
const DESKTOP_H = 980;
const FINDER_X = 40;
const FINDER_Y = 46;
const FINDER_W = 760;
const FINDER_H = 500;
const DOCK_H = 84;
const DOCK_BOTTOM = 24;
const DOCK_ICON = 54;
const DOCK_GAP = 8;
const DOCK_PADDING_X = 12;
const DOCK_TRAILING_X = 66;
const DOCK_SEPARATOR_W = 10;
const DOCK_APP_COUNT = 8;
const LAUNCHPAD_ICON = 96;
const LAUNCHPAD_GAP = 45;
const LAUNCHPAD_ROW_WIDTH = 5 * 110 + 4 * LAUNCHPAD_GAP;
const CALCULATOR_W = 240;
const CALCULATOR_H = 330;

const getDockMetrics = () => {
    const appsWidth = DOCK_APP_COUNT * DOCK_ICON + (DOCK_APP_COUNT - 1) * DOCK_GAP;
    const width = (DOCK_PADDING_X * 2) + appsWidth + DOCK_SEPARATOR_W + DOCK_GAP + DOCK_TRAILING_X;
    const left = (DESKTOP_W - width) / 2;
    const top = DESKTOP_H - DOCK_BOTTOM - DOCK_H;

    return {
        left,
        top,
        width,
        iconCenterX: (index: number) => left + DOCK_PADDING_X + (DOCK_ICON / 2) + index * (DOCK_ICON + DOCK_GAP),
        iconCenterY: top + 28 + (DOCK_ICON / 2),
    };
};

const getLaunchpadCalculatorCenter = () => ({
    x: DESKTOP_W / 2,
    y: (DESKTOP_H / 2) - 12,
});

const getCalculatorWindowMetrics = () => ({
    left: (DESKTOP_W - CALCULATOR_W) / 2,
    top: (DESKTOP_H - CALCULATOR_H) / 2,
});

const getCalculatorButtonCenter = (label: string) => {
    const windowMetrics = getCalculatorWindowMetrics();
    const keypadTop = windowMetrics.top + 28 + 58;
    const keypadHeight = CALCULATOR_H - 28 - 58;
    const rowHeight = (keypadHeight - 4) / 5;
    const colWidth = (CALCULATOR_W - 3) / 4;
    const buttons = [
        ['AC', '+/-', '%', '÷'],
        ['7', '8', '9', '×'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '='],
    ];

    for (let rowIndex = 0; rowIndex < buttons.length; rowIndex++) {
        const row = buttons[rowIndex];
        const buttonIndex = row.indexOf(label);
        if (buttonIndex === -1) {
            continue;
        }

        if (label === '0') {
            return {
                x: windowMetrics.left + colWidth,
                y: keypadTop + rowHeight * rowIndex + rowHeight / 2,
            };
        }

        const colIndex = rowIndex === 4 && label === '=' ? 3 : buttonIndex;
        return {
            x: windowMetrics.left + colWidth * colIndex + colWidth / 2,
            y: keypadTop + rowHeight * rowIndex + rowHeight / 2,
        };
    }

    throw new Error(`Unknown calculator button: ${label}`);
};

const VERT = `
attribute vec3 a_pos;
varying vec2 v_uv;
uniform float u_time;
uniform float u_is_reflection;

mat4 getRotationY(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(c, 0.0, s, 0.0, 0.0, 1.0, 0.0, 0.0, -s, 0.0, c, 0.0, 0.0, 0.0, 0.0, 1.0);
}
mat4 getRotationX(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat4(1.0, 0.0, 0.0, 0.0, 0.0, c, -s, 0.0, 0.0, s, c, 0.0, 0.0, 0.0, 0.0, 1.0);
}

void main() {
    v_uv = vec2(a_pos.x * 0.5 + 0.5, 1.0 - (a_pos.y * 0.5 + 0.5));
    vec4 pos = vec4(a_pos, 1.0);
    
    // Cylindrical curvature to wrap around the user
    float curve = 0.25; 
    float radius = 1.0 / curve;
    float theta = pos.x * curve;
    pos.x = sin(theta) * radius;
    pos.z = cos(theta) * radius - radius;
    
    if (u_is_reflection > 0.5) {
        pos.y = -pos.y - 2.0; // Mirror Y down (exactly matches the 980px UI bounds)
    }
    
    // Gentle natural head drifting (no drag)
    float rx = sin(u_time * 0.3) * 0.01;
    float ry = cos(u_time * 0.2) * 0.02;
    
    pos = getRotationX(rx) * getRotationY(ry) * pos;
    
    // Perspective
    float perspective = 1.0 - pos.z * 0.8;
    pos.x /= perspective; 
    pos.y /= perspective;
    
    // Fit to screen perfectly
    pos.x *= 0.85;
    pos.y *= 0.85;
    
    // Shift global scene UP slightly to make room for reflection!
    pos.y += 0.08;
    
    gl_Position = vec4(pos.x, pos.y, pos.z, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_tex; // The UI layer (transparent)
uniform float u_is_reflection;

void main() {
    if (v_uv.x < 0.0 || v_uv.x > 1.0 || v_uv.y < 0.0 || v_uv.y > 1.0) {
        discard;
    }
    vec4 ui = texture2D(u_tex, v_uv);
    
    // Reverse pre-multiplied alpha from Canvas API if necessary
    if (ui.a > 0.0) {
        ui.rgb /= ui.a;
    }
    
    gl_FragColor = ui;
    
    // Discard empty space
    if (gl_FragColor.a < 0.05) discard;
    
    if (u_is_reflection > 0.5) {
        // Fade out the reflection. v_uv.y = 1.0 is the physical bottom edge.
        float fade = smoothstep(0.1, 0.95, v_uv.y);
        // Add a slight blueish mirror tint to the reflection
        gl_FragColor.rgb += vec3(0.0, 0.05, 0.1) * ui.a;
        gl_FragColor.a *= fade * 0.45;
    }
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'compile error');
    return shader;
}

function isWebGlAvailable() {
    if (typeof document === 'undefined') {
        return false;
    }

    const canvas = document.createElement('canvas');
    return canvas.getContext('webgl') !== null;
}

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

const MacOsDesktopUI: React.FC = () => {
    const frame = useCurrentFrame();
    const dock = getDockMetrics();
    const launchpadCalculator = getLaunchpadCalculatorCenter();
    const calculatorWindow = getCalculatorWindowMetrics();
    const calculatorSix = getCalculatorButtonCenter('6');
    const calculatorMultiply = getCalculatorButtonCenter('×');
    const calculatorSeven = getCalculatorButtonCenter('7');
    const calculatorEquals = getCalculatorButtonCenter('=');

    const getMousePos = (f: number) => {
        // --- 1. DOCK SWEEP & CLICK SAFARI ---
        if (f < 80) return { x: DESKTOP_W + 120, y: DESKTOP_H + 160, scale: 1 };
        
        // Move to left of Dock
        if (f < 100) return { 
            x: DESKTOP_W + 120 + ((dock.iconCenterX(0) - 80) - (DESKTOP_W + 120)) * ((f - 80) / 20), 
            y: DESKTOP_H + 120 + (dock.iconCenterY - (DESKTOP_H + 120)) * ((f - 80) / 20),
            scale: 1 
        };
        
        // Sweep across dock following the wave
        if (f < 155) {
            const waveCenter = (f - 100) * 0.15;
            return {
                x: dock.iconCenterX(0) - 80 + waveCenter * (DOCK_ICON + DOCK_GAP + 3),
                y: dock.iconCenterY,
                scale: 1
            };
        }
        
        // Move to Safari icon
        if (f < 165) return {
            x: dock.iconCenterX(7) + (dock.iconCenterX(1) - (dock.iconCenterX(7) + 16)) * ((f - 155) / 10),
            y: dock.iconCenterY,
            scale: 1
        };
        
        // Click Safari
        if (f < 170) return { x: dock.iconCenterX(1), y: dock.iconCenterY, scale: 0.85 };
        
        // Move away from dock, hide offscreen right until Calculator
        if (f < 200) return {
            x: dock.iconCenterX(1) + ((DESKTOP_W + 120) - dock.iconCenterX(1)) * ((f - 170) / 30),
            y: dock.iconCenterY + ((DESKTOP_H + 80) - dock.iconCenterY) * ((f - 170) / 30),
            scale: 1
        };

        // --- 2. LAUNCHPAD CLICK & CALCULATOR APP ---
        if (f < 260) return { x: DESKTOP_W + 120, y: DESKTOP_H + 80, scale: 1 };
        
        // Move to Calculator Icon in Launchpad
        if (f < 290) return {
            x: DESKTOP_W + 120 + (launchpadCalculator.x - (DESKTOP_W + 120)) * ((f - 260) / 30),
            y: DESKTOP_H + 80 + (launchpadCalculator.y - (DESKTOP_H + 80)) * ((f - 260) / 30),
            scale: 1
        };
        
        // Hover at Calculator
        if (f < 305) return { x: launchpadCalculator.x, y: launchpadCalculator.y, scale: 1 };
        // Click Calculator
        if (f < 310) return { x: launchpadCalculator.x, y: launchpadCalculator.y, scale: 0.85 };
        
        // Wait and drift while Launchpad closes & calculator app opens (310 -> 360)
        if (f < 360) return {
            x: launchpadCalculator.x,
            y: launchpadCalculator.y + (220 * ((f - 310) / 50)),
            scale: 1
        };
        
        // Move to '6'
        if (f < 380) return { 
            x: DESKTOP_W + 120 + (calculatorSix.x - (DESKTOP_W + 120)) * ((f - 360) / 20), 
            y: DESKTOP_H + 80 + (calculatorSix.y - (DESKTOP_H + 80)) * ((f - 360) / 20),
            scale: 1 
        };
        // Click '6' (380-385)
        if (f < 385) return { x: calculatorSix.x, y: calculatorSix.y, scale: 0.85 };
        
        // Move to '×'
        if (f < 387) return {
            x: calculatorSix.x + (calculatorMultiply.x - calculatorSix.x) * ((f - 385) / 2),
            y: calculatorSix.y + (calculatorMultiply.y - calculatorSix.y) * ((f - 385) / 2),
            scale: 1
        };
        // Click 'x'
        if (f < 390) return { x: calculatorMultiply.x, y: calculatorMultiply.y, scale: 0.85 };
        
        // Move to '7'
        if (f < 392) return {
            x: calculatorMultiply.x + (calculatorSeven.x - calculatorMultiply.x) * ((f - 390) / 2),
            y: calculatorMultiply.y + (calculatorSeven.y - calculatorMultiply.y) * ((f - 390) / 2),
            scale: 1
        };
        // Click '7'
        if (f < 395) return { x: calculatorSeven.x, y: calculatorSeven.y, scale: 0.85 };
        
        // Move to '='
        if (f < 397) return {
            x: calculatorSeven.x + (calculatorEquals.x - calculatorSeven.x) * ((f - 395) / 2),
            y: calculatorSeven.y + (calculatorEquals.y - calculatorSeven.y) * ((f - 395) / 2),
            scale: 1
        };
        // Click '='
        if (f < 400) return { x: calculatorEquals.x, y: calculatorEquals.y, scale: 0.85 };
        
        // Move to Finder red button
        if (f < 420) return {
            x: calculatorEquals.x + ((FINDER_X + 22) - calculatorEquals.x) * ((f - 400) / 20),
            y: calculatorEquals.y + ((FINDER_Y + 22) - calculatorEquals.y) * ((f - 400) / 20),
            scale: 1
        };
        // Click red button (420-425)
        if (f < 425) return { x: FINDER_X + 22, y: FINDER_Y + 22, scale: 0.85 };
        
        // Move away from red button
        return {
            x: FINDER_X + 22 + 200 * ((f - 425) / 25),
            y: FINDER_Y + 22 + 200 * ((f - 425) / 25),
            scale: 1
        };
    };
    
    const mouseRaw = getMousePos(frame);
    const shiftX = (f: number) => {
        const centeredDelta = (DESKTOP_W - 1560) / 2;
        if (f < 400) return centeredDelta;
        if (f < 420) return centeredDelta * (1 - (f - 400) / 20);
        return 0;
    };
    const mouse = { ...mouseRaw, x: mouseRaw.x + shiftX(frame) };

    return (
        <AbsoluteFill
            className="bg-transparent flex items-center justify-center font-sans text-white"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif' }}
        >
            {/* Screen frame (Wider form factor) */}
            <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-[0_0_120px_rgba(0,0,0,0.9)]"
                style={{ width: DESKTOP_W, height: DESKTOP_H }}>
                {/* Desktop Wallpaper */}
                <Img 
                    src={staticFile("desktop.png")} 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Mac Wallpaper" 
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
                        <span>Wed May 8  08:41 AM</span>
                    </div>
                </div>

                {/* Finder Window */}
                {frame <= 423 && (
                <div 
                    className="absolute rounded-[14px] overflow-hidden flex flex-col shadow-[0_32px_80px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.4)] border border-white/20 bg-gradient-to-br from-white/10 via-transparent to-black/30 origin-top-left"
                    style={{ top: FINDER_Y, left: FINDER_X, width: FINDER_W, height: FINDER_H, transform: 'scale(1)' }}
                >
                    {/* Glass Refraction Sheen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 pointer-events-none z-[-1]"></div>

                    {/* Title bar */}
                    <div className="h-[44px] bg-black/20 border-b border-white/8 flex items-center px-4 gap-3 shrink-0 relative">
                        <div className="flex gap-2">
                            <div className={`w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center ${frame > 415 && frame < 425 ? "brightness-75" : ""}`}>{frame > 415 && frame < 425 && <span className="text-black/50 text-[8px] leading-none mb-[2px]">x</span>}</div>
                            <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
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
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                            ))}
                            <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1 px-2 mt-3">Locations</div>
                            {[
                                { label: 'Macintosh HD', icon: <HardDrive size={14} /> },
                                { label: 'Network',      icon: <Globe size={14} /> },
                            ].map((item, i) => (
                                <div key={i} className="px-2 py-[5px] rounded-[6px] flex items-center gap-2 text-white/60">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* App Grid */}
                        <div className="flex-1 bg-transparent text-shadow-sm p-6 grid grid-cols-6 gap-5 content-start overflow-hidden">
                            {FINDER_APPS.map((app, i) => (
                                <div key={i} className="flex flex-col items-center gap-[6px]">
                                    <div className={`w-14 h-14 rounded-[14px] bg-gradient-to-b ${app.bg} flex items-center justify-center text-[28px] shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}>
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
                <div className="absolute bg-gradient-to-b from-white/20 to-white/5 border border-white/30 border-b-white/10 rounded-[22px] px-3 flex items-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.5)] select-none"
                    style={{ left: dock.left, top: dock.top, height: DOCK_H, width: dock.width }}>
                    {DOCK_APPS.map((app, i) => {
                        // Simulated Mac Dock Magnification Interaction driven by Remotion timeline
                        // Mouse sweeps across dock from frame 30 to 180
                        const waveCenter = (frame - 100) * 0.15; 
                        const dist = Math.abs(waveCenter - i);
                        const isHovering = frame > 100 && frame < 240 && dist < 2.5;
                        
                        const scale = isHovering ? 1 + Math.max(0, (2.5 - dist) * 0.25) : 1;
                        const yOffset = isHovering ? -Math.max(0, (2.5 - dist) * 8) : 0;
                        const margin = isHovering ? Math.max(0, (2.5 - dist) * 5) : 0;

                        // App Launch Bounce Interaction (Clicking Safari at frame 110)
                        let jumpY = 0;
                        if (i === 1 && frame > 170) { 
                            jumpY = -Math.abs(Math.sin((frame - 170) * 0.25) * 25) * Math.max(0, 1 - (frame - 170)*0.015);
                        }

                        return (
                            <div key={i} className="relative flex flex-col items-center justify-end h-full pb-4"
                                 style={{ transform: `scale(${scale}) translateY(${yOffset + jumpY}px)`, margin: `0 ${margin}px` }}>
                                <div className={`w-[54px] h-[54px] rounded-[14px] ${app.bg} flex items-center justify-center text-[28px] shadow-[0_4px_18px_rgba(0,0,0,0.55)] border border-white/15 relative`}>
                                    {app.icon}
                                </div>
                                {/* App Label Tooltip */}
                                <div className={`absolute -top-12 bg-black/60 px-3 py-[4px] rounded-md text-white text-[12px] shadow-md whitespace-nowrap pointer-events-none ${isHovering && dist < 0.5 ? 'opacity-100' : 'opacity-0'}`}>
                                    {app.name}
                                </div>
                                {i < 3 && (
                                    <div className="absolute bottom-[6px] w-[5px] h-[5px] bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"></div>
                                )}
                            </div>
                        );
                    })}
                    <div className="w-px h-10 bg-white/25 mx-1"></div>
                    <div className="flex flex-col items-center justify-end h-full pb-4">
                        <div className="w-[54px] h-[54px] rounded-[14px] bg-gradient-to-b from-[#aaaaaa] to-[#666] flex items-center justify-center text-[28px] shadow-[0_4px_18px_rgba(0,0,0,0.55)] border border-white/15">
                            <Trash2 size={28} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Launchpad (Vision OS / macOS style) */}
                {frame > 260 && frame < 330 && (
                    <div 
                        className="absolute inset-0 bg-transparent z-[900] flex flex-col items-center justify-center pointer-events-none"
                        style={{
                            opacity: frame < 315 ? Math.min(1, (frame - 260) / 15) : Math.max(0, 1 - (frame - 315) / 15),
                        }}
                    >
                        {/* Vignette & Blur Background matching the Vision OS style exactly */}
                        <div className="absolute inset-0 bg-[rgba(0,0,0,0.15)] backdrop-blur-[60px]" style={{
                            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 95%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 95%)'
                        }}></div>
                        {/* Ultra strong dark vignette for corners */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            background: 'radial-gradient(circle at center, rgba(0,0,0,0) 15%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.98) 100%)'
                        }}></div>

                        {/* App Grid - staggered VisionOS Style (4 - 5 - 4) */}
                        <div 
                            className="flex flex-col gap-[45px] relative z-10"
                            style={{
                                transform: 'scale(1)',
                                transformOrigin: 'center center'
                            }}
                        >
                            {/* Row 1: 4 icons */}
                            <div className="flex justify-center gap-[45px]">
                                {[
                                    { name: 'TV',          icon: <Monitor size={48} className="text-white" />, bg: 'from-[#000000] to-[#2a2a2a]' },
                                    { name: 'Music',       icon: <Music size={48} className="text-white" />, bg: 'from-[#ff3b68] to-[#ff2a55]' },
                                    { name: 'Mindfulness', icon: <Sun size={48} className="text-white" />, bg: 'from-[#4eedd5] to-[#25cbaf]' },
                                    { name: 'Settings',    icon: <Settings size={48} className="text-white" />, bg: 'from-[#737373] to-[#424242]' },
                                ].map((app, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 w-[110px]">
                                        <div className={`w-[96px] h-[96px] rounded-full bg-gradient-to-b ${app.bg} flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)]`}>
                                            {app.icon}
                                        </div>
                                        <span className="text-white/90 text-[14px] font-normal drop-shadow-md tracking-wide">{app.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Row 2: 5 icons (Calculator is centered here!) */}
                            <div className="flex justify-center gap-[45px]">
                                {[
                                    { name: 'Freeform',   icon: <PenTool size={48} className="text-white" />, bg: 'from-[#ffffff] to-[#e4e4e4]' },
                                    { name: 'Safari',     icon: <Compass size={48} className="text-white" />, bg: 'from-[#4cd4ff] to-[#007aff]' },
                                    { name: 'Calculator', icon: <Calculator size={48} className="text-white" />, bg: 'from-[#ffb347] to-[#ff7b00]' },
                                    { name: 'Photos',     icon: <ImageIcon size={48} className="text-white" />, bg: 'from-[#ffffff] to-[#f4f4f4]' },
                                    { name: 'App Store',  icon: <ShoppingBag size={48} className="text-white" />, bg: 'from-[#5bd4ff] to-[#298de8]' },
                                ].map((app, i) => {
                                    const isCalc = app.name === 'Calculator';
                                    const isHovered = isCalc && frame > 280 && frame < 305;
                                    const isClicked = isCalc && frame > 305 && frame < 312;
                                    
                                    // Custom styling for icons that should have colorful centers like Freeform/Photos
                                    let IconWrapper = app.icon;
                                    if (app.name === 'Photos') {
                                        IconWrapper = <div className="text-[#ff9500]"><ImageIcon size={48} /></div>;
                                    } else if (app.name === 'Freeform') {
                                        IconWrapper = <div className="text-[#007aff]"><PenTool size={48} /></div>;
                                    }

                                    return (
                                        <div key={i} className="flex flex-col items-center gap-3 w-[110px]">
                                            <div 
                                                className={`w-[96px] h-[96px] rounded-full bg-gradient-to-b ${app.bg} flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] transition-transform duration-[0.4s] ease-out`}
                                                style={{
                                                    transform: isClicked ? 'scale(0.85)' : isHovered ? 'scale(1.15)' : 'scale(1)'
                                                }}
                                            >
                                                {IconWrapper}
                                            </div>
                                            <span className="text-white/90 text-[14px] font-normal drop-shadow-md tracking-wide">{app.name}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Row 3: 4 icons */}
                            <div className="flex justify-center gap-[45px]">
                                {[
                                    { name: 'Mail',       icon: <Mail size={48} className="text-white" />, bg: 'from-[#5ac8fa] to-[#007aff]' },
                                    { name: 'Messages',   icon: <MessageCircle size={48} className="text-white" />, bg: 'from-[#5bf07a] to-[#28cd41]' },
                                    { name: 'Keynote',    icon: <PieChart size={48} className="text-white" />, bg: 'from-[#5b7fff] to-[#2957e8]' },
                                    { name: 'Folder',     icon: <Grid size={48} className="text-white" />, bg: 'from-[#737373] to-[#424242]' },
                                ].map((app, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 w-[110px]">
                                        <div className={`w-[96px] h-[96px] rounded-full bg-gradient-to-b ${app.bg} flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)]`}>
                                            {app.icon}
                                        </div>
                                        <span className="text-white/90 text-[14px] font-normal drop-shadow-md tracking-wide">{app.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Side Pill Control (like VisionOS sidebar) */}
                        <div className="absolute left-[8%] top-1/2 -translate-y-1/2 w-[68px] py-10 rounded-[34px] bg-[rgba(26,28,30,0.6)] border border-[rgba(255,255,255,0.15)] flex flex-col items-center gap-10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] z-20 overflow-hidden">
                            <ShoppingBag size={26} strokeWidth={1.5} className="text-white/80 drop-shadow-sm hover:text-white transition-colors" />
                            <Users size={26} strokeWidth={1.5} className="text-white/80 drop-shadow-sm hover:text-white transition-colors" />
                            <Mountain size={26} strokeWidth={1.5} className="text-white/80 drop-shadow-sm hover:text-white transition-colors" />
                        </div>
                        
                        {/* Bottom Pagination Dots */}
                        <div className="absolute bottom-36 flex items-center gap-3 z-20">
                            <div className="w-[8px] h-[8px] rounded-full bg-white opacity-100 shadow-[0_1px_3px_rgba(0,0,0,0.5)]"></div>
                            <div className="w-[8px] h-[8px] rounded-full bg-white opacity-40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-all"></div>
                        </div>
                    </div>
                )}

                {/* Calculator App Window (Appears after Enter is clicked) */}
                {frame > 320 && (
                    <div 
                        className="absolute bg-[rgba(40,40,40,0.98)] border border-[rgba(255,255,255,0.2)] rounded-xl shadow-2xl flex flex-col overflow-hidden z-[850]"
                        style={{ left: calculatorWindow.left, top: calculatorWindow.top, width: CALCULATOR_W, height: CALCULATOR_H, transform: 'scale(1)' }}
                    >
                        {/* Title Bar */}
                        <div className="h-[28px] bg-white/5 flex items-center px-3 gap-2">
                            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f56] border border-black/10"></div>
                            <div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e] border border-black/10"></div>
                            <div className="w-[10px] h-[10px] rounded-full bg-[#27c93f] border border-black/10"></div>
                        </div>
                        {/* Display */}
                        <div className="px-4 py-4 flex justify-end text-white text-[42px] font-light leading-none">
                            {frame > 390 ? "42" : "0"}
                        </div>
                        {/* Keypad */}
                        <div className="flex flex-col flex-1 bg-black/40 gap-[1px] p-[1px]">
                            {[
                                ['AC', '+/-', '%', '÷'],
                                ['7', '8', '9', '×'],
                                ['4', '5', '6', '-'],
                                ['1', '2', '3', '+'],
                                ['0', '.', '=']
                            ].map((row, rIndex) => (
                                <div key={rIndex} className="flex flex-1 gap-[1px]">
                                    {row.map((btn) => {
                                        const isOrange = btn === '÷' || btn === '×' || btn === '-' || btn === '+' || btn === '=';
                                        const isLightGray = btn === 'AC' || btn === '+/-' || btn === '%';
                                        return (
                                            <div 
                                                key={btn}
                                                className={`flex items-center text-[18px] font-medium ${isOrange ? 'bg-[#f4a331] text-white' : isLightGray ? 'bg-white/20 text-white' : 'bg-white/10 text-white'} ${btn === '0' ? 'justify-start pl-[28px]' : 'justify-center'}`}
                                                style={{
                                                    width: btn === '0' ? 'calc(50% + 0.5px)' : '25%',
                                                    backgroundColor: (btn === '6' && frame > 380 && frame < 385) || 
                                                                     (btn === '×' && frame > 385 && frame < 390) || 
                                                                     (btn === '7' && frame > 390 && frame < 395) ||
                                                                     (btn === '=' && frame > 395 && frame < 400) ? 'rgba(255,255,255,0.4)' : undefined
                                                }}
                                            >
                                                {btn}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Apple Boot Screen Overlay */}
                {frame < 120 && (
                    <div 
                        className="absolute inset-0 bg-black flex flex-col items-center justify-center z-[999] pointer-events-none"
                        style={{ opacity: Math.max(0, 1 - (frame - 70) / 25) }}
                    >
                        <div className="text-white text-[130px] mb-14 leading-none" style={{ fontWeight: 900 }}>&#xF8FF;</div>
                        <div className="w-[240px] h-[6px] bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-white rounded-full"
                                style={{ width: `${Math.min(100, (frame / 60) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* macOS Mouse Cursor */}
                {frame > 80 && (
                    <div 
                        className="absolute z-[9999] pointer-events-none"
                        style={{ 
                            left: `${mouse.x}px`, 
                            top: `${mouse.y}px`,
                            transform: `translate(-20%, -10%) scale(${mouse.scale})`,
                            opacity: 1,
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))'
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 28L18 20L26 23L9 3L12 28Z" fill="black" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                    </div>
                )}

            </div>
        </AbsoluteFill>
    );
};

export const HoloDashboard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();
    const { isRendering } = useRemotionEnvironment();
    const shouldUseHtmlInCanvas = isRendering && HtmlInCanvas.isHtmlInCanvasSupported() && isWebGlAvailable();

    type GlState = {
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        tex: WebGLTexture;
        uTime: WebGLUniformLocation;
        uIsReflection: WebGLUniformLocation;
        vertexCount: number;
    };
    const glStateRef = useRef<GlState | null>(null);

    const onInit: HtmlInCanvasOnInit = useCallback(({ canvas, elementImage }) => {
        const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
        if (!gl) {
            glStateRef.current = null;
            return () => {
                glStateRef.current = null;
            };
        }

        const vert = compile(gl, gl.VERTEX_SHADER, VERT);
        const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
        const program = gl.createProgram()!;
        gl.attachShader(program, vert); gl.attachShader(program, frag); gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link error');
        gl.useProgram(program);

        const cols = 60;
        const rows = 30;
        const verts: number[] = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const x0 = (x / cols) * 2.0 - 1.0;
                const x1 = ((x + 1) / cols) * 2.0 - 1.0;
                const y0 = (y / rows) * 2.0 - 1.0;
                const y1 = ((y + 1) / rows) * 2.0 - 1.0;
                verts.push(x0, y0, 0,  x1, y0, 0,  x0, y1, 0);
                verts.push(x0, y1, 0,  x1, y0, 0,  x1, y1, 0);
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
        // Seed initial texture using Remotion's native API
        gl.texElementImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, elementImage);

        const uTime = gl.getUniformLocation(program, 'u_time')!;
        const uIsReflection = gl.getUniformLocation(program, 'u_is_reflection')!;
        gl.uniform1i(gl.getUniformLocation(program, 'u_tex'), 0);

        gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

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

        // Upload fresh DOM snapshot using Remotion's native texElementImage2D
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texElementImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, elementImage);

        element.style.transform = 'translate(-99999px, 0)';

        gl.viewport(0, 0, width, height);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniform1f(uTime, frame / fps);

        gl.uniform1f(uIsReflection, 0.0);
        gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

        gl.uniform1f(uIsReflection, 1.0);
        gl.drawArrays(gl.TRIANGLES, 0, vertexCount);

        gl.flush();
    }, [frame, fps, width, height]);

    const background = `radial-gradient(circle at ${50 + Math.sin(frame / 40) * 10}% ${50 + Math.cos(frame / 30) * 8}%, rgba(80,90,110,1) 0%, rgba(15,18,24,1) 40%, rgba(0,0,0,1) 100%)`;

    return (
        <AbsoluteFill className="overflow-hidden relative" style={{ background }}>
            {shouldUseHtmlInCanvas ? (
                <div className="absolute inset-0 bg-transparent pointer-events-none">
                    <HtmlInCanvas width={SCREEN_W} height={SCREEN_H} onInit={onInit} onPaint={onPaint}>
                        <MacOsDesktopUI />
                    </HtmlInCanvas>
                </div>
            ) : (
                <MacOsDesktopUI />
            )}
        </AbsoluteFill>
    );
};

export const AppleMovie = HoloDashboard;
