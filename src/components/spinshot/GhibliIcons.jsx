import React from 'react';

export const GhibliSparkle = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <defs>
      <radialGradient id="sparkle-glow">
        <stop offset="0%" stopColor="#ffd93d" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ffd93d" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sparkle-shine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff9e6" />
        <stop offset="50%" stopColor="#ffd93d" />
        <stop offset="100%" stopColor="#ffb700" />
      </linearGradient>
    </defs>
    
    {/* Glow */}
    <circle cx="24" cy="24" r="20" fill="url(#sparkle-glow)" opacity="0.5" />
    
    {/* Main 8-point star */}
    <path
      d="M24 4 L25.5 18 L38 12 L27 22 L42 24 L27 26 L38 36 L25.5 30 L24 44 L22.5 30 L10 36 L21 26 L6 24 L21 22 L10 12 L22.5 18 Z"
      fill="url(#sparkle-shine)"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    
    {/* Center glow */}
    <circle cx="24" cy="24" r="4" fill="white" opacity="0.9" />
    
    {/* Accent sparkles */}
    <circle cx="14" cy="14" r="2.5" fill="white" opacity="0.8" />
    <circle cx="34" cy="14" r="2" fill="white" opacity="0.7" />
    <circle cx="34" cy="34" r="2.5" fill="white" opacity="0.8" />
    <circle cx="14" cy="34" r="2" fill="white" opacity="0.7" />
  </svg>
);

export const GhibliLightning = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <defs>
      <radialGradient id="lightning-glow">
        <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="bolt-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffe0ec" />
        <stop offset="50%" stopColor="#ff6b9d" />
        <stop offset="100%" stopColor="#ff4d88" />
      </linearGradient>
    </defs>
    
    {/* Glow */}
    <ellipse cx="24" cy="24" rx="18" ry="22" fill="url(#lightning-glow)" opacity="0.6" />
    
    {/* Lightning bolt */}
    <path
      d="M27 4 L17 24 L23 24 L16 44 L34 20 L28 20 L35 4 Z"
      fill="url(#bolt-grad)"
      stroke="white"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    
    {/* Inner highlight */}
    <path
      d="M30 8 L24 24 L26 24 L21 36"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    
    {/* Sparks */}
    <circle cx="32" cy="6" r="2" fill="white" opacity="0.8" />
    <circle cx="18" cy="26" r="1.5" fill="white" opacity="0.8" />
    <circle cx="33" cy="22" r="1.5" fill="white" opacity="0.8" />
  </svg>
);

export const GhibliWind = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <defs>
      <radialGradient id="wind-glow">
        <stop offset="0%" stopColor="#6bcbff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#6bcbff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="wind-flow" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#d4f1ff" opacity="0.4" />
        <stop offset="50%" stopColor="white" />
        <stop offset="100%" stopColor="#d4f1ff" opacity="0.4" />
      </linearGradient>
    </defs>
    
    {/* Glow */}
    <ellipse cx="24" cy="24" rx="22" ry="16" fill="url(#wind-glow)" opacity="0.5" />
    
    {/* Wind swirls */}
    <path
      d="M8 16 Q16 12, 24 16 Q32 20, 42 16"
      stroke="url(#wind-flow)"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M6 24 Q14 20, 24 24 Q34 28, 42 24"
      stroke="url(#wind-flow)"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M8 32 Q16 28, 24 32 Q32 36, 42 32"
      stroke="url(#wind-flow)"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Floating sparkles */}
    <circle cx="12" cy="18" r="2" fill="white" opacity="0.9" />
    <circle cx="30" cy="14" r="1.5" fill="white" opacity="0.7" />
    <circle cx="40" cy="20" r="2" fill="white" opacity="0.9" />
    <circle cx="22" cy="26" r="1.5" fill="white" opacity="0.7" />
    <circle cx="38" cy="28" r="2" fill="white" opacity="0.9" />
    <circle cx="16" cy="34" r="1.5" fill="white" opacity="0.7" />
  </svg>
);

export const GhibliTarget = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <defs>
      <radialGradient id="target-glow">
        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="target-center">
        <stop offset="0%" stopColor="white" />
        <stop offset="50%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#22c55e" />
      </radialGradient>
    </defs>
    
    {/* Glow */}
    <circle cx="24" cy="24" r="20" fill="url(#target-glow)" opacity="0.6" />
    
    {/* Target rings */}
    <circle cx="24" cy="24" r="18" stroke="white" strokeWidth="3" opacity="0.9" fill="none" />
    <circle cx="24" cy="24" r="18" stroke="#d4ffde" strokeWidth="1.5" opacity="0.4" fill="none" />
    
    <circle cx="24" cy="24" r="13" stroke="white" strokeWidth="2.5" opacity="0.9" fill="none" />
    
    <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="2.5" opacity="0.9" fill="none" />
    
    {/* Bullseye */}
    <circle cx="24" cy="24" r="4" fill="url(#target-center)" />
    <circle cx="24" cy="24" r="2" fill="white" opacity="0.9" />
    
    {/* Corner sparkles */}
    <circle cx="12" cy="12" r="2" fill="white" opacity="0.8" />
    <circle cx="36" cy="12" r="2" fill="white" opacity="0.8" />
    <circle cx="36" cy="36" r="2" fill="white" opacity="0.8" />
    <circle cx="12" cy="36" r="2" fill="white" opacity="0.8" />
  </svg>
);

export const GhibliGauge = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <defs>
      <radialGradient id="gauge-glow">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="needle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
    </defs>
    
    {/* Glow */}
    <ellipse cx="24" cy="30" rx="20" ry="18" fill="url(#gauge-glow)" opacity="0.6" />
    
    {/* Speedometer arc */}
    <path
      d="M8 32 A18 18 0 0 1 40 32"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      opacity="0.9"
      fill="none"
    />
    <path
      d="M8 32 A18 18 0 0 1 40 32"
      stroke="#fed7aa"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
      fill="none"
    />
    
    {/* Tick marks */}
    <g stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9">
      <line x1="10" y1="30" x2="12" y2="30" />
      <line x1="14" y1="20" x2="16" y2="21" />
      <line x1="24" y1="14" x2="24" y2="16" />
      <line x1="34" y1="20" x2="32" y2="21" />
      <line x1="38" y1="30" x2="36" y2="30" />
    </g>
    
    {/* Needle pointing right (fast) */}
    <g transform="rotate(45 24 32)">
      <line x1="24" y1="32" x2="24" y2="18" stroke="url(#needle-grad)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="32" r="3" fill="#f97316" stroke="white" strokeWidth="1.5" />
    </g>
    
    {/* Speed lines */}
    <g stroke="white" strokeWidth="2" opacity="0.7" strokeLinecap="round">
      <line x1="36" y1="20" x2="40" y2="16" />
      <line x1="38" y1="26" x2="42" y2="24" />
      <line x1="36" y1="32" x2="40" y2="32" />
    </g>
  </svg>
);

export const GhibliClock = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <defs>
      <radialGradient id="clock-glow">
        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#c4b5fd" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="clock-face">
        <stop offset="0%" stopColor="#3730a3" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </radialGradient>
    </defs>
    
    {/* Glow */}
    <ellipse cx="25" cy="26" rx="22" ry="20" fill="url(#clock-glow)" opacity="0.6" />
    
    {/* Chain */}
    <path
      d="M24 8 Q26 10, 25 13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.9"
      fill="none"
    />
    <circle cx="24" cy="8" r="2" fill="white" opacity="0.9" />
    
    {/* Watch body */}
    <circle cx="25" cy="26" r="14" fill="url(#clock-face)" stroke="white" strokeWidth="3" opacity="0.95" />
    <circle cx="25" cy="26" r="14" stroke="#ddd6fe" strokeWidth="1.5" opacity="0.4" fill="none" />
    
    {/* Hour markers */}
    <g fill="white" opacity="0.9">
      <circle cx="25" cy="16" r="1.5" />
      <circle cx="33" cy="26" r="1.5" />
      <circle cx="25" cy="36" r="1.5" />
      <circle cx="17" cy="26" r="1.5" />
      <circle cx="30" cy="20" r="1" opacity="0.7" />
      <circle cx="30" cy="32" r="1" opacity="0.7" />
      <circle cx="20" cy="32" r="1" opacity="0.7" />
      <circle cx="20" cy="20" r="1" opacity="0.7" />
    </g>
    
    {/* Clock hands */}
    <line x1="25" y1="26" x2="25" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
    <line x1="25" y1="26" x2="30" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
    <circle cx="25" cy="26" r="2.5" fill="white" opacity="0.9" />
    
    {/* Time magic swirls */}
    <g stroke="white" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round">
      <path d="M12 20 Q10 22, 11 25" />
      <path d="M38 32 Q40 30, 39 27" />
      <circle cx="11" cy="25" r="1" fill="white" />
      <circle cx="39" cy="27" r="1" fill="white" />
    </g>
    
    {/* Floating sparkles */}
    <circle cx="12" cy="18" r="1.5" fill="white" opacity="0.7" />
    <circle cx="38" cy="20" r="1.3" fill="white" opacity="0.6" />
    <circle cx="16" cy="36" r="1.2" fill="white" opacity="0.65" />
    <circle cx="36" cy="34" r="1.5" fill="white" opacity="0.7" />
  </svg>
);

export const GhibliCross = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <defs>
      <radialGradient id="cross-glow">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="x-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fecaca" />
        <stop offset="50%" stopColor="white" />
        <stop offset="100%" stopColor="#fecaca" />
      </linearGradient>
    </defs>
    
    {/* Glow */}
    <circle cx="24" cy="24" r="20" fill="url(#cross-glow)" opacity="0.6" />
    
    {/* Bold X */}
    <path
      d="M12 12 L36 36"
      stroke="url(#x-grad)"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M36 12 L12 36"
      stroke="url(#x-grad)"
      strokeWidth="5"
      strokeLinecap="round"
    />
    
    {/* Inner highlight */}
    <path
      d="M14 14 L34 34"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M34 14 L14 34"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
    />
    
    {/* Warning dots */}
    <circle cx="10" cy="24" r="2.5" fill="white" stroke="#fecaca" strokeWidth="0.5" opacity="0.9" />
    <circle cx="38" cy="24" r="2.5" fill="white" stroke="#fecaca" strokeWidth="0.5" opacity="0.9" />
    <circle cx="24" cy="10" r="2.5" fill="white" stroke="#fecaca" strokeWidth="0.5" opacity="0.9" />
    <circle cx="24" cy="38" r="2.5" fill="white" stroke="#fecaca" strokeWidth="0.5" opacity="0.9" />
  </svg>
);

export const GhibliSmell = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <defs>
      <radialGradient id="smell-glow">
        <stop offset="0%" stopColor="#84cc16" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="cloud-grad">
        <stop offset="0%" stopColor="#d9f99d" />
        <stop offset="100%" stopColor="#a3e635" />
      </radialGradient>
    </defs>
    
    {/* Glow */}
    <ellipse cx="24" cy="28" rx="18" ry="22" fill="url(#smell-glow)" opacity="0.6" />
    
    {/* Base cloud */}
    <g opacity="0.9">
      <ellipse cx="24" cy="38" rx="12" ry="7" fill="url(#cloud-grad)" />
      <ellipse cx="18" cy="36" rx="6" ry="5" fill="url(#cloud-grad)" />
      <ellipse cx="30" cy="36" rx="6" ry="5" fill="url(#cloud-grad)" />
      <ellipse cx="24" cy="34" rx="4" ry="3" fill="url(#cloud-grad)" />
    </g>
    
    {/* Wavy stink lines */}
    <g stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.95">
      <path d="M16 30 Q14 24, 16 18 Q18 12, 16 6" />
      <path d="M24 32 Q22 26, 24 20 Q26 14, 24 8" />
      <path d="M32 30 Q34 24, 32 18 Q30 12, 32 6" />
    </g>
    
    {/* Top cloud puffs */}
    <g fill="white" opacity="0.8">
      <circle cx="16" cy="5" r="3" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="24" cy="7" r="3" />
      <circle cx="29" cy="6" r="2" />
      <circle cx="32" cy="5" r="3" />
    </g>
  </svg>
);