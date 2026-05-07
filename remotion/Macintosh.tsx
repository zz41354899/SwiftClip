import React, { useCallback, useRef } from 'react';
import {
  AbsoluteFill,
  HtmlInCanvas,
  type HtmlInCanvasOnPaint,
  type HtmlInCanvasOnInit,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  useRemotionEnvironment,
} from 'remotion';

// ── Screen dimensions (shared constant) ─────────────────────────────────────
const SCREEN_W = 512;
const SCREEN_H = 384;

// ── Mac Peripherals ─────────────────────────────────────────────────────────

// 1u = 20px, gap = 5px. Wider keys: 1.5u=32, 1.75u=39, 2u=45, 2.25u=52, 2.75u=65
const KW = 20;  // 1u key width
const KH = 19;  // key height
const KG = 5;   // gap between keys

const Key = ({ w = KW, isDown = false, style = {} }: {
  w?: number; isDown?: boolean; style?: React.CSSProperties;
}) => (
  <div style={{
    flexShrink: 0,
    width: w,
    height: KH,
    background: isDown ? '#b4b1a2' : '#e4e2d2',
    borderRadius: 3,
    boxShadow: isDown
      ? 'inset 0 2px 5px rgba(0,0,0,0.45)'
      : '0 2px 3px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.8)',
    ...style,
  }} />
);

const KbRow = ({ widths, downIdx }: { widths: number[]; downIdx?: number }) => (
  <div style={{ display: 'flex', gap: KG }}>
    {widths.map((w, i) => <Key key={i} w={w} isDown={i === downIdx} />)}
  </div>
);

const MacKeyboard: React.FC<{ enterPressed: boolean; style?: React.CSSProperties }> = ({ enterPressed, style }) => {
  // Each row widths in px. Total content ≈ 368px. Keyboard body = 420px (16px padding each side)
  // Row 1: ~ 1 2 3 4 5 6 7 8 9 0 - = [BS=2u]
  const r1 = [KW,KW,KW,KW,KW,KW,KW,KW,KW,KW,KW,KW,KW, 45];
  // Row 2: [Tab=1.5u] Q W E R T Y U I O P [ ] \
  const r2 = [32, KW,KW,KW,KW,KW,KW,KW,KW,KW,KW,KW,KW, 32];
  // Row 3: [Caps=1.75u] A S D F G H J K L ; ' [Return=2.25u]
  const r3 = [39, KW,KW,KW,KW,KW,KW,KW,KW,KW,KW,KW, 51];
  // Row 4: [LShift=2.25u] Z X C V B N M , . / [RShift=2.75u]
  const r4 = [52, KW,KW,KW,KW,KW,KW,KW,KW,KW, 65];
  // Row 5: [Ctrl] [Opt] [Space=wide] [Opt] [Ctrl]
  const r5 = [30, 30, 218, 30, 30];

  return (
    <div style={{
      width: 430, height: 170,
      background: '#d4d2c2',
      borderRadius: '4px 4px 10px 10px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.55), inset 0 2px 4px rgba(255,255,255,0.65)',
      border: '1px solid #b4b1a2',
      padding: '12px 16px 10px',
      display: 'flex', flexDirection: 'column', gap: KG,
      boxSizing: 'border-box',
      position: 'relative',
      ...style,
    }}>
      {/* ADB cable stub at top */}
      <div style={{
        position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
        width: 5, height: 18, background: '#888', borderRadius: '2px 2px 0 0',
      }} />
      <KbRow widths={r1} />
      <KbRow widths={r2} />
      <KbRow widths={r3} downIdx={enterPressed ? 12 : undefined} />
      <KbRow widths={r4} />
      <KbRow widths={r5} />
      {/* Palm rest */}
      <div style={{
        height: 16, marginTop: 2, marginLeft: -16, marginRight: -16,
        background: '#c8c6b5',
        borderRadius: '0 0 9px 9px',
        boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.12)',
      }} />
    </div>
  );
}

const MacMouse: React.FC<{ isPressed: boolean; style?: React.CSSProperties }> = ({ isPressed, style }) => {
  return (
    <div style={{
       width: 65, height: 100,
       background: '#e0ded0',
       borderRadius: '8px 8px 16px 16px',
       boxShadow: '0 12px 20px rgba(0,0,0,0.5)',
       border: '1px solid #b4b1a2',
       display:'flex', flexDirection: 'column',
       alignItems:'center', paddingTop: 10,
       ...style
    }}>
       {/* Button */}
       <div style={{
          width: 48, height: 36,
          background: isPressed ? '#c4c1af' : '#e4e2d2',
          borderRadius: '4px 4px 1px 1px',
          boxShadow: isPressed ? 'inset 0 4px 8px rgba(0,0,0,0.4)' : '0 2px 4px rgba(0,0,0,0.15)',
          borderBottom: '2px solid #a4a18f'
       }} />
       {/* Cable piece */}
       <div style={{
          position: 'absolute',
          top: -20, left: '50%', transform: 'translateX(-50%)',
          width: 4, height: 20,
          background: '#999',
          borderRadius: 2
       }} />
    </div>
  )
}

// ── Vintage Content ─────────────────────────────────────────────────────────
const VintageContent: React.FC = () => {
  const absoluteFrame = useCurrentFrame();
  const { fps: _fps } = useVideoConfig();
  
  const BOOT_FRAME = 120;
  const frame = Math.max(0, absoluteFrame - BOOT_FRAME);

  const isOff = absoluteFrame < 40;
  const isBooting = absoluteFrame >= 40 && absoluteFrame < 120;

  // Cursor Animation
  // 0-20: move to title bar (160, 59)
  // 20-30: press down
  // 30-70: drag to (60, 69)
  // 70-80: release
  // 80-110: move to Mac HD (480, 53)
  // 110-120: double click
  const cursorX = interpolate(frame, [0, 20, 30, 70, 80, 110], [SCREEN_W / 2, 160, 160, 60, 60, 480], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorY = interpolate(frame, [0, 20, 30, 70, 80, 110], [SCREEN_H / 2, 59, 59, 69, 69, 53], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const isClicking = (frame > 20 && frame < 75) || (frame > 110 && frame < 113) || (frame > 116 && frame < 119);

  // Floating Window animation (dragging About This Computer)
  const dragX = interpolate(frame, [30, 70], [0, -100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dragY = interpolate(frame, [30, 70], [0, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Icon Selection
  const hdSelected = frame > 110;

  if (isOff) {
    return <AbsoluteFill style={{ backgroundColor: '#020302' }} />;
  }

  if (isBooting) {
    const bootProgress = Math.max(0, absoluteFrame - 40) / 80;
    const barWidth = `${Math.min(100, bootProgress * 100)}%`;

    return (
      <AbsoluteFill style={{ 
         backgroundColor: '#7c91c3',
         backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg opacity='0.08' stroke='%23000' fill='none' stroke-width='2'%3E%3Crect x='30' y='25' width='40' height='40' /%3E%3Cpath d='M 50 20 Q 42 35 50 45 L 56 45 L 48 60' /%3E%3Cpath d='M 38 52 Q 50 63 62 52' /%3E%3Cline x1='40' y1='35' x2='40' y2='40' /%3E%3Cline x1='60' y1='35' x2='60' y2='40' /%3E%3C/g%3E%3Ctext x='50' y='80' font-family='serif' font-size='15' text-anchor='middle' fill='%23000' opacity='0.08' stroke='none'%3EMac OS%3C/text%3E%3C/svg%3E\")",
         backgroundSize: '100px 100px',
         display: 'flex', alignItems: 'center', justifyContent: 'center' 
      }}>
        {/* Central Modal */}
        <div style={{
           width: 360, height: 260,
           background: '#c5ccdc', 
           border: '1px solid #5a5a5a',
           boxShadow: '1px 1px 3px rgba(0,0,0,0.3)',
           display: 'flex', flexDirection: 'column', alignItems: 'center',
           padding: '24px',
           boxSizing: 'border-box'
        }}>
           <div style={{
              width: '100%', height: 160,
              background: '#fff',
              border: '1px solid #666',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center'
           }}>
              <div style={{ position: 'relative', width: 80, height: 80, marginTop: 10 }}>
                 <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <rect x="23" y="15" width="27" height="40" fill="#4a76c6" />
                    <rect x="50" y="15" width="27" height="40" fill="#88a5d6" />
                    <g fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M 50 10 C 40 30, 48 38, 50 43 L 60 43 L 53 58 C 55 64, 55 64, 55 68" />
                       <path d="M 33 46 Q 50 60 68 46" />
                    </g>
                    <line x1="36" y1="28" x2="36" y2="35" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="64" y1="28" x2="64" y2="35" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
                 </svg>
              </div>
              <div style={{ fontSize: 38, fontFamily: '"Times New Roman", Times, serif', color: '#000', letterSpacing: '0.02em', display: 'flex', alignItems: 'baseline', marginTop: 4 }}>
                 Mac OS
              </div>
           </div>

           <div style={{ alignSelf: 'center', marginTop: 18, fontSize: 11, fontFamily: 'sans-serif', fontWeight: 600, color: '#333', letterSpacing: '0.05em' }}>
              Starting Up...
           </div>

           <div style={{ width: '78%', height: 10, background: '#e4e4e4', border: '1px solid #777', marginTop: 6, position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: barWidth, background: '#5a5a5a' }} />
           </div>
        </div>
      </AbsoluteFill>
    );
  }

  // Desktop OS 9
  return (
    <AbsoluteFill style={{ 
       backgroundColor: '#5b719f',
       fontFamily: '"Geneva", "Tahoma", sans-serif',
       color: '#000',
       overflow: 'hidden',
       WebkitFontSmoothing: 'none'
    }}>
      {/* Top Menu Bar - Platinum Theme */}
      <div style={{ 
         height: 20, background: '#dddddd', borderBottom: '1px solid #111', 
         display: 'flex', alignItems: 'center', padding: '0 8px', gap: 16, 
         fontSize: 12, fontWeight: 500, boxShadow: '0 1px 1px rgba(0,0,0,0.4)', zIndex: 100 
      }}>
        <div style={{ fontSize: 13, backgroundImage: 'linear-gradient(180deg, #55C335 15%, #F0B71E 30%, #E78225 45%, #DF323A 60%, #90308C 75%, #2593CD 90%)', WebkitBackgroundClip: 'text', color: 'transparent', width: 14, textShadow: '0 0.5px 0 rgba(0,0,0,0.2)' }}></div>
        <div style={{ cursor: 'default' }}>File</div><div>Edit</div><div>View</div><div>Special</div><div>Help</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 400 }}>4:20 PM</div>
          {/* App Switcher Icon */}
          <div style={{width: 14, height: 14, position: 'relative', border: '1px solid #666', background: '#ccc', borderRadius: 1}}>
             <div style={{position: 'absolute', top: 2, left: 2, width: 8, height: 8, background: '#666', borderRadius: 1}}/>
             <div style={{position: 'absolute', top: 4, left: 4, width: 4, height: 4, background: '#ccc'}}/>
          </div>
        </div>
      </div>

      {/* Desktop Icons */}
      <div style={{ position: 'absolute', top: 36, right: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, filter: hdSelected ? 'invert(1)' : 'none' }}>
        <div style={{ width: 32, height: 32, position: 'relative' }}>
           {/* Classic Hard Drive Icon */}
           <div style={{ position: 'absolute', bottom: 2, left: 4, width: 24, height: 26, background: '#bbb', border: '1px solid #000', borderRadius: 2 }}/>
           <div style={{ position: 'absolute', bottom: 6, left: 8, width: 16, height: 18, background: '#eee', border: '1px solid #000' }}/>
           <div style={{ position: 'absolute', bottom: 22, left: 14, width: 4, height: 4, background: '#333', borderRadius: '50%' }}/>
           <div style={{ position: 'absolute', bottom: 8, left: 10, width: 12, height: 2, background: '#000' }}/>
        </div>
        <div style={{ background: hdSelected ? '#000' : 'transparent', color: hdSelected ? '#fff' : '#000', padding: '0 3px', fontSize: 10, letterSpacing: '0.02em', textShadow: hdSelected ? 'none' : '1px 1px 0 rgba(255,255,255,0.7)', borderRadius: 2 }}>Macintosh HD</div>
      </div>

      {/* Trash Icon */}
      <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <div style={{ width: 32, height: 32, position: 'relative' }}>
           <div style={{ position: 'absolute', bottom: 2, left: 6, width: 20, height: 24, background: '#ccc', border: '1px solid #000', borderTop: 'none', borderRadius: '0 0 2px 2px' }}/>
           {/* Trash lid */}
           <div style={{ position: 'absolute', bottom: 26, left: 4, width: 24, height: 4, background: '#e0e0e0', border: '1px solid #000', borderRadius: '2px 2px 0 0' }}/>
           <div style={{ position: 'absolute', bottom: 30, left: 12, width: 8, height: 2, background: '#ccc', border: '1px solid #000', borderBottom: 'none' }}/>
           {/* Ribs */}
           <div style={{ position: 'absolute', bottom: 6, left: 10, width: 1, height: 16, background: '#888' }}/>
           <div style={{ position: 'absolute', bottom: 6, left: 16, width: 1, height: 16, background: '#888' }}/>
           <div style={{ position: 'absolute', bottom: 6, left: 22, width: 1, height: 16, background: '#888' }}/>
        </div>
        <div style={{ color: '#000', fontSize: 10, textShadow: '1px 1px 0 rgba(255,255,255,0.7)' }}>Trash</div>
      </div>

      {/* A Cool System Folder Icon placed on Desktop */}
      <div style={{ position: 'absolute', top: 120, right: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <div style={{ width: 32, height: 32, position: 'relative' }}>
           <div style={{ position: 'absolute', bottom: 2, left: 2, width: 28, height: 20, background: '#9eb8d9', border: '1px solid #000', borderRadius: 2 }}/>
           <div style={{ position: 'absolute', bottom: 22, left: 2, width: 12, height: 6, background: '#9eb8d9', border: '1px solid #000', borderBottom: 'none', borderRadius: '2px 2px 0 0' }}/>
           <div style={{ position: 'absolute', bottom: 8, left: 10, width: 12, height: 12, opacity: 0.8 }}>
              {/* Mini finder face */}
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <rect x="23" y="15" width="27" height="40" fill="#4a76c6" />
                <rect x="50" y="15" width="27" height="40" fill="#88a5d6" />
                <g fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M 50 10 C 40 30, 48 38, 50 43 L 60 43 L 53 58 C 55 64, 55 64, 55 68" />
                   <path d="M 33 46 Q 50 60 68 46" />
                </g>
              </svg>
           </div>
        </div>
        <div style={{ color: '#000', fontSize: 10, textShadow: '1px 1px 0 rgba(255,255,255,0.7)' }}>System Folder</div>
      </div>

      {/* About This Computer Window */}
      <div style={{
        position: 'absolute', top: 50 + dragY, left: 80 + dragX,
        width: 320, height: 210,
        background: '#e8e8e8', border: '1px solid #000', 
        boxShadow: '1px 1px 0px rgba(0,0,0,1), 2px 2px 5px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Title Bar - Platinum Style With Grooves */}
        <div style={{ 
          height: 20, borderBottom: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          background: '#ccc', position: 'relative'
        }}>
          {/* Grooves */}
          <div style={{ position: 'absolute', left: 24, right: 24, top: 2, bottom: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', opacity: 0.5 }}>
            <div style={{ height: 1, background: '#fff', borderBottom: '1px solid #888' }}/>
            <div style={{ height: 1, background: '#fff', borderBottom: '1px solid #888' }}/>
            <div style={{ height: 1, background: '#fff', borderBottom: '1px solid #888' }}/>
            <div style={{ height: 1, background: '#fff', borderBottom: '1px solid #888' }}/>
          </div>
          
          <div style={{ background: '#ccc', padding: '0 8px', fontSize: 11, fontWeight: 'bold', color: '#000', position: 'relative', zIndex: 2 }}>About This Computer</div>
          <div style={{ position: 'absolute', left: 6, width: 11, height: 11, background: '#e0e0e0', border: '1px solid #555', boxShadow: 'inset 1px 1px 0 #fff' }} />
          <div style={{ position: 'absolute', right: 6, width: 11, height: 11, background: '#e0e0e0', border: '1px solid #555', boxShadow: 'inset 1px 1px 0 #fff' }} />
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: 8 }}>
          <div style={{ background: '#fff', border: '1px solid #555', borderRight: '1px solid #d0d0d0', borderBottom: '1px solid #d0d0d0', height: '100%', padding: '12px 18px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1.5px solid #000', paddingBottom: 16 }}>
              {/* Finder Logo */}
              <div style={{ width: 44, height: 44, position: 'relative' }}>
                 <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <rect x="23" y="15" width="27" height="40" fill="#4a76c6" />
                    <rect x="50" y="15" width="27" height="40" fill="#88a5d6" />
                    <g fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M 50 10 C 40 30, 48 38, 50 43 L 60 43 L 53 58 C 55 64, 55 64, 55 68" />
                       <path d="M 33 46 Q 50 60 68 46" />
                    </g>
                    <line x1="36" y1="28" x2="36" y2="35" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                    <line x1="64" y1="28" x2="64" y2="35" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                 </svg>
              </div>
              <div style={{ fontSize: 36, fontFamily: '"Times New Roman", Times, serif', letterSpacing: '-0.02em', WebkitFontSmoothing: 'antialiased' }}>Mac OS 9</div>
            </div>
            
            <div style={{ fontSize: 10, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              <div style={{display: 'flex'}}><strong style={{width: 100}}>Version:</strong> <span>Mac OS 9.2.2</span></div>
              <div style={{display: 'flex'}}><strong style={{width: 100}}>Built-in Memory:</strong> <span>64 MB</span></div>
              <div style={{display: 'flex'}}><strong style={{width: 100}}>Virtual Memory:</strong> <span>128 MB</span></div>
              
              {/* TM section */}
              <div style={{ marginTop: 'auto', fontSize: 8, color: '#555' }}>
                 ™ & © Apple Computer, Inc. 1983-2001
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor arrow */}
      <div style={{
        position: 'absolute',
        top: cursorY, left: cursorX,
        width: 14, height: 20,
        zIndex: 9999,
        transform: isClicking ? 'scale(0.85)' : 'scale(1)',
        transformOrigin: 'top left',
        transition: 'transform 0.05s'
      }}>
        <svg width="100%" height="100%" viewBox="0 0 14 20" style={{ filter: 'drop-shadow(1px 1px 0px rgba(0,0,0,0.5))' }}>
           <path d="M1 1 L1 15 L5 11 L8 18 L10 17 L7 10 L13 10 Z" fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </div>
    </AbsoluteFill>
  );
};

// ── Mac Shell ────────────────────────────────────────────────────────────────
const MAC_W = 640;
const MAC_H = 780;
const BODY_COLOR = '#e4e2d2';

const MacShell: React.FC<{ screen: React.ReactNode }> = ({ screen }) => (
  <div style={{
    width: MAC_W,
    height: MAC_H,
    position: 'relative',
    background: `linear-gradient(170deg, #f0ebd6 0%, ${BODY_COLOR} 40%, #c4c1af 100%)`,
    borderRadius: '24px 24px 8px 8px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 3px 8px rgba(255,255,255,0.7), inset 0 -4px 10px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 60,
    boxSizing: 'border-box',
    border: '1px solid #c4c0a8',
  }}>
    {/* Forehead groove */}
    <div style={{
      position: 'absolute',
      top: 30,
      left: '10%',
      width: '80%',
      height: 4,
      background: 'rgba(0,0,0,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.6)',
      borderRadius: 2,
    }} />

    {/* Screen Bezel (Indentation) */}
    <div style={{
      width: SCREEN_W + 40,
      height: SCREEN_H + 50,
      borderRadius: 16,
      background: 'linear-gradient(to bottom, #d2d0bf 0%, #cac6b5 100%)',
      boxShadow: 'inset 0 6px 12px rgba(0,0,0,0.3), 0 2px 4px rgba(255,255,255,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
    }}>
      {/* Black bezel surrounding screen */}
      <div style={{
        width: SCREEN_W + 16,
        height: SCREEN_H + 16,
        borderRadius: 12,
        background: '#151515',
        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Screen inner rounded clip — filter applied here so AbsoluteFill children position correctly */}
        <div style={{
          width: SCREEN_W,
          height: SCREEN_H,
          borderRadius: 8,
          overflow: 'hidden',
          position: 'relative',
          filter: 'sepia(0.42) contrast(1.16)',
        }}>
          {screen}

          {/* CRT scanlines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 8,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
            pointerEvents: 'none',
            zIndex: 10,
          }} />

          {/* Vignette */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 8,
            background: 'radial-gradient(ellipse 130% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)',
            pointerEvents: 'none',
            zIndex: 11,
          }} />

          {/* Convex glass reflection overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 8,
            background: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(255,255,255,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 12,
          }} />
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div style={{ width: '100%', flex: 1, position: 'relative' }}>
        {/* Rainbow badge */}
        <div style={{
          position: 'absolute',
          left: 60,
          top: 10,
          width: 20,
          height: 24,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <div style={{ flex: 1, background: '#61bb46' }} />
          <div style={{ flex: 1, background: '#fdb827' }} />
          <div style={{ flex: 1, background: '#f5821f' }} />
          <div style={{ flex: 1, background: '#e03a3e' }} />
          <div style={{ flex: 1, background: '#963d97' }} />
          <div style={{ flex: 1, background: '#009cdf' }} />
        </div>

        {/* Floppy Disk Drive */}
        <div style={{
           position: 'absolute',
           right: 60,
           top: 60,
           width: 100,
           height: 8,
           background: '#1a1a1a',
           borderRadius: 4,
           boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.5)',
        }} />

        {/* Brand label */}
        <div style={{
          position: 'absolute',
          left: 95,
          top: 16,
          fontFamily: 'sans-serif',
          fontSize: 14,
          fontStyle: 'italic',
          fontWeight: 700,
          color: '#555',
          letterSpacing: '0.05em',
          textShadow: '0 1px 1px rgba(255,255,255,0.5)',
        }}>
          Macmoshion
        </div>
    </div>

    {/* Bottom inset/ventilation grill (chin) */}
    <div style={{
      width: '100%',
      height: 45,
      background: 'linear-gradient(to bottom, #d2d0bf 0%, #b5b2a0 100%)',
      borderTop: '2px solid rgba(0,0,0,0.05)',
      borderRadius: '0 0 8px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.08)',
      gap: 10
    }}>
        {Array.from({length: 20}).map((_, i) => (
             <div key={i} style={{ width: 6, height: 20, background: 'rgba(0,0,0,0.15)', borderRadius: 2, boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)' }} />
        ))}
    </div>
  </div>
);

export const Macintosh: React.FC = () => {
  const frame = useCurrentFrame();
  const { isRendering } = useRemotionEnvironment();
  // HtmlInCanvas WebGL CRT effects are only supported in headless Remotion renders.
  // In the browser Player (even with Chrome Canary + flag), the Remotion capture
  // pipeline is not active, causing a runtime "No cached paint record" error.
  const screen = (isRendering && HtmlInCanvas.isHtmlInCanvasSupported())
    ? <VintageScreenInner />
    : <VintageContent />;
  
  // Timing parameters
  const CAMERA_START_ZOOM = 120; // when to start zooming
  const ZOOM_DURATION = 60;
  
  // Mouse and Keyboard action states
  const mousePressed = frame >= 30 && frame <= 40; // User initiates boot
  
  // Camera Animation
  // For the first 120 frames, stay zoomed out (scale 0.6) and panned up (translateY 150px) to show desk.
  // Then zoom in and pan down to focus on the screen.
  const zoomProgress = interpolate(frame, [CAMERA_START_ZOOM, CAMERA_START_ZOOM + ZOOM_DURATION], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  // easeInOutCubic for organic camera move
  const easeInOutCubic = zoomProgress < 0.5 
    ? 4 * zoomProgress * zoomProgress * zoomProgress 
    : 1 - Math.pow(-2 * zoomProgress + 2, 3) / 2;
    
  const scaleAnim = 0.6 + 0.4 * easeInOutCubic;
  const translateYAnim = -80 + 80 * easeInOutCubic; // Move computer down out of frame

  return (
    <AbsoluteFill style={{
      background: 'radial-gradient(ellipse at 50% 120%, #828893 0%, #4d5360 50%, #20242f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        position: 'relative',
        transform: `scale(${scaleAnim}) translateY(${translateYAnim}px)`,
        transformOrigin: 'center center',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        {/* Desk Surface (optional shadow cast) */}
        <div style={{
          position: 'absolute',
          bottom: -30,
          width: MAC_W * 1.5,
          height: 100,
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 60%)',
          filter: 'blur(10px)',
          zIndex: 0
        }} />
        
        {/* The Mac Shell */}
        <div style={{ position: 'relative', zIndex: 1 }}>
           <MacShell screen={screen} />
        </div>
        
        {/* Keyboard and Mouse placed below */}
        <div style={{
           position: 'absolute',
           bottom: -220,
           display: 'flex',
           gap: 40,
           alignItems: 'flex-start',
           zIndex: 2
        }}>
           <MacKeyboard enterPressed={false} />
           <MacMouse isPressed={mousePressed} style={{ marginTop: 20 }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Shader sources (module-level, compiled once) ───────────────────────────
const VERT = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = vec2(a_pos.x * 0.5 + 0.5, 1.0 - (a_pos.y * 0.5 + 0.5));
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// Fragment shader: barrel distortion + chromatic aberration + scanlines
// + vignette + glass glare + film grain + VHS roll bar + flicker
const FRAG = `
    precision mediump float;
    uniform sampler2D u_tex;
    uniform float u_flicker;
    uniform float u_time;
    uniform float u_chromOff;
    uniform float u_rollY;
    varying vec2 v_uv;

    // Barrel / pincushion distortion
    vec2 barrel(vec2 uv, float strength) {
      vec2 cc = uv - 0.5;
      float r2 = dot(cc, cc);
      return uv + cc * r2 * strength;
    }

    // Hash noise for film grain
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = v_uv;

      // 1. CRT barrel distortion (subtle)
      vec2 dUV = barrel(uv, 0.12);

      // Black outside the distorted boundary
      if (dUV.x < 0.0 || dUV.x > 1.0 || dUV.y < 0.0 || dUV.y > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
      }

      // 2. Chromatic aberration — sample R/G/B at slightly offset coords
      float off = u_chromOff;
      vec2 rUV = barrel(uv + vec2(-off, 0.0), 0.12);
      vec2 bUV = barrel(uv + vec2( off, 0.0), 0.12);
      float r = texture2D(u_tex, clamp(rUV, 0.0, 1.0)).r;
      float g = texture2D(u_tex, dUV).g;
      float b = texture2D(u_tex, clamp(bUV, 0.0, 1.0)).b;
      vec3 col = vec3(r, g, b);

      // 3. Sepia tone
      vec3 sep;
      sep.r = dot(col, vec3(0.393, 0.769, 0.189));
      sep.g = dot(col, vec3(0.349, 0.686, 0.168));
      sep.b = dot(col, vec3(0.272, 0.534, 0.131));
      col = mix(col, sep, 0.45);

      // 4. Contrast
      col = (col - 0.5) * 1.18 + 0.5;

      // 5. Phosphor scanlines — every 4 screen pixels
      float scanlineY = floor(dUV.y * 520.0);
      float line = mod(scanlineY, 4.0);
      float scanDark = (line >= 2.0) ? 0.82 : 1.0;
      float scanGlow = (line < 2.0) ? 1.018 : 1.0;
      col *= scanDark * scanGlow;

      // 6. VHS roll bar (16px wide)
      float pixY = dUV.y * 520.0;
      float dist = abs(mod(pixY - u_rollY, 520.0));
      if (dist < 6.0) {
        col *= 0.55;
      } else if (dist < 16.0) {
        col = mix(col, vec3(0.85, 0.9, 0.85), 0.055);
      }

      // 7. Flicker
      col *= u_flicker;

      // 8. Vignette (elliptical)
      vec2 vc = dUV - 0.5;
      vc.x *= 1.4; // wider ellipse
      float vDist = length(vc);
      float vig = smoothstep(0.1, 0.82, vDist);
      col *= 1.0 - vig * 0.82;

      // 9. CRT glass glare — top-center oval highlight
      vec2 gc = dUV - vec2(0.5, 0.13);
      gc.x *= 0.7;
      float glareDist = length(gc);
      float glare = smoothstep(0.38, 0.0, glareDist) * 0.055;
      col += glare;

      // 10. Film grain
      float noise = hash(dUV + vec2(u_time * 0.1, u_time * 0.07));
      col += (noise - 0.5) * 0.065;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

type GlState = {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  tex: WebGLTexture;
  uFlicker: WebGLUniformLocation;
  uTime: WebGLUniformLocation;
  uChromOff: WebGLUniformLocation;
  uRollY: WebGLUniformLocation;
};

const VintageScreenInner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glStateRef = useRef<GlState | null>(null);

  const onInit: HtmlInCanvasOnInit = useCallback(({ canvas, elementImage }) => {
    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
    if (!gl) throw new Error('WebGL not available');

    // Compile helpers
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(s) ?? 'shader error');
      }
      return s;
    };

    const vert = compile(gl.VERTEX_SHADER, VERT);
    const frag = compile(gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram()!;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? 'link error');
    }
    gl.useProgram(program);

    // Full-screen quad
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Texture
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // Seed initial texture from elementImage
    gl.texElementImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, elementImage);

    const uFlicker = gl.getUniformLocation(program, 'u_flicker')!;
    const uTime = gl.getUniformLocation(program, 'u_time')!;
    const uChromOff = gl.getUniformLocation(program, 'u_chromOff')!;
    const uRollY = gl.getUniformLocation(program, 'u_rollY')!;
    gl.uniform1i(gl.getUniformLocation(program, 'u_tex'), 0);

    glStateRef.current = { gl, program, tex, uFlicker, uTime, uChromOff, uRollY };

    return () => {
      gl.deleteTexture(tex);
      gl.deleteProgram(program);
      glStateRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPaint: HtmlInCanvasOnPaint = useCallback(
    ({ canvas, element, elementImage }) => {
      if (!glStateRef.current) return;
      const { gl, tex, uFlicker, uTime, uChromOff, uRollY } = glStateRef.current;

      // Upload fresh DOM snapshot to texture
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texElementImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, elementImage);

      // Move the original element off-screen so only the WebGL canvas is visible
      element.style.transform = 'translate(-99999px, 0)';

      const t = frame / fps;
      const baseFlicker =
        0.93 + 0.04 * Math.sin(frame * 1.3) + 0.025 * Math.sin(frame * 4.1);
      const hardDip = frame % 75 === 0 || frame % 75 === 1 ? 0.68 : 1;

      gl.viewport(0, 0, SCREEN_W, SCREEN_H);
      gl.uniform1f(uFlicker, baseFlicker * hardDip);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uChromOff, (3 + Math.sin(frame * 0.17)) / SCREEN_W);
      gl.uniform1f(uRollY, (frame * 2.4) % SCREEN_H);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      gl.flush();
    },
    [frame, fps],
  );

  return (
    <HtmlInCanvas width={SCREEN_W} height={SCREEN_H} onInit={onInit} onPaint={onPaint}>
      <VintageContent />
    </HtmlInCanvas>
  );
};
