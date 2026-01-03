import React from 'react';

export const GhibliSparkle = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Soft glow background */}
    <circle cx="24" cy="24" r="20" fill="url(#sparkle-glow)" opacity="0.4" />
    
    {/* Main sparkle star */}
    <path
      d="M24 8 C25 16, 26 18, 32 20 C26 22, 25 24, 24 32 C23 24, 22 22, 16 20 C22 18, 23 16, 24 8 Z"
      fill="white"
      opacity="0.95"
    />
    
    {/* Small accent sparkles */}
    <circle cx="14" cy="14" r="2.5" fill="white" opacity="0.8" />
    <circle cx="34" cy="14" r="2" fill="white" opacity="0.7" />
    <circle cx="34" cy="34" r="2.5" fill="white" opacity="0.8" />
    
    <defs>
      <radialGradient id="sparkle-glow">
        <stop offset="0%" stopColor="#ffd93d" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ffd93d" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const GhibliLightning = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Soft glow */}
    <ellipse cx="24" cy="24" rx="18" ry="22" fill="url(#lightning-glow)" opacity="0.4" />
    
    {/* Lightning bolt with soft curves */}
    <path
      d="M26 6 L16 24 L22 24 L18 42 L32 20 L26 20 Z"
      fill="white"
      opacity="0.95"
      strokeLinejoin="round"
    />
    
    {/* Accent dots */}
    <circle cx="28" cy="14" r="2" fill="white" opacity="0.7" />
    <circle cx="20" cy="32" r="2" fill="white" opacity="0.7" />
    
    <defs>
      <radialGradient id="lightning-glow">
        <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const GhibliWind = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Soft background glow */}
    <ellipse cx="24" cy="24" rx="22" ry="16" fill="url(#wind-glow)" opacity="0.3" />
    
    {/* Playful wind swirls */}
    <path
      d="M10 18 Q16 16, 22 18 T34 18"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.9"
    />
    <path
      d="M12 24 Q18 22, 24 24 T36 24"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M10 30 Q16 28, 22 30 T34 30"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    
    {/* Floating particles */}
    <circle cx="38" cy="20" r="1.5" fill="white" opacity="0.7" />
    <circle cx="40" cy="26" r="1.8" fill="white" opacity="0.6" />
    <circle cx="36" cy="32" r="1.3" fill="white" opacity="0.7" />
    
    <defs>
      <radialGradient id="wind-glow">
        <stop offset="0%" stopColor="#6bcbff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#6bcbff" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const GhibliTarget = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Soft glow */}
    <circle cx="24" cy="24" r="20" fill="url(#target-glow)" opacity="0.4" />
    
    {/* Friendly target circles */}
    <circle cx="24" cy="24" r="16" stroke="white" strokeWidth="2.5" opacity="0.9" fill="none" />
    <circle cx="24" cy="24" r="11" stroke="white" strokeWidth="2.5" opacity="0.85" fill="none" />
    <circle cx="24" cy="24" r="6" fill="white" opacity="0.95" />
    
    {/* Sparkle accent on center */}
    <path
      d="M24 20 L24 28 M20 24 L28 24"
      stroke="rgba(78, 222, 128, 0.4)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    
    <defs>
      <radialGradient id="target-glow">
        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const GhibliGauge = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Glow */}
    <ellipse cx="24" cy="28" rx="20" ry="18" fill="url(#gauge-glow)" opacity="0.4" />
    
    {/* Speedometer arc */}
    <path
      d="M10 30 A16 16 0 0 1 38 30"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.9"
      fill="none"
    />
    
    {/* Needle pointing right (fast) */}
    <line x1="24" y1="30" x2="34" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
    <circle cx="24" cy="30" r="3" fill="white" opacity="0.95" />
    
    {/* Speed lines */}
    <line x1="36" y1="18" x2="40" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <line x1="38" y1="24" x2="42" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    
    <defs>
      <radialGradient id="gauge-glow">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const GhibliClock = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Soft glow */}
    <circle cx="24" cy="24" r="20" fill="url(#clock-glow)" opacity="0.4" />
    
    {/* Clock circle */}
    <circle cx="24" cy="24" r="14" stroke="white" strokeWidth="2.5" opacity="0.9" fill="none" />
    
    {/* Clock hands */}
    <line x1="24" y1="24" x2="24" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
    <line x1="24" y1="24" x2="30" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
    
    {/* Center dot */}
    <circle cx="24" cy="24" r="2.5" fill="white" opacity="0.95" />
    
    {/* Time marks */}
    <circle cx="24" cy="12" r="1.5" fill="white" opacity="0.7" />
    <circle cx="36" cy="24" r="1.5" fill="white" opacity="0.7" />
    <circle cx="24" cy="36" r="1.5" fill="white" opacity="0.7" />
    <circle cx="12" cy="24" r="1.5" fill="white" opacity="0.7" />
    
    {/* Gentle motion arc */}
    <path
      d="M18 10 Q14 14, 14 20"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.5"
      fill="none"
    />
    
    <defs>
      <radialGradient id="clock-glow">
        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const GhibliCross = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Ominous glow */}
    <circle cx="24" cy="24" r="20" fill="url(#cross-glow)" opacity="0.4" />
    
    {/* Mischievous X with rounded ends */}
    <path
      d="M14 14 L34 34"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.9"
    />
    <path
      d="M34 14 L14 34"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.9"
    />
    
    {/* Small warning dots */}
    <circle cx="10" cy="24" r="2" fill="white" opacity="0.6" />
    <circle cx="38" cy="24" r="2" fill="white" opacity="0.6" />
    <circle cx="24" cy="10" r="2" fill="white" opacity="0.6" />
    <circle cx="24" cy="38" r="2" fill="white" opacity="0.6" />
    
    <defs>
      <radialGradient id="cross-glow">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export const GhibliSmell = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Green stinky glow */}
    <ellipse cx="24" cy="28" rx="18" ry="22" fill="url(#smell-glow)" opacity="0.4" />
    
    {/* Wavy stink lines rising */}
    <path
      d="M18 32 Q16 26, 18 20 Q20 14, 18 8"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.85"
      fill="none"
    />
    <path
      d="M24 34 Q22 28, 24 22 Q26 16, 24 10"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.9"
      fill="none"
    />
    <path
      d="M30 32 Q32 26, 30 20 Q28 14, 30 8"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.85"
      fill="none"
    />
    
    {/* Cloud puffs at bottom */}
    <circle cx="18" cy="36" r="4" fill="white" opacity="0.6" />
    <circle cx="24" cy="38" r="5" fill="white" opacity="0.7" />
    <circle cx="30" cy="36" r="4" fill="white" opacity="0.6" />
    
    <defs>
      <radialGradient id="smell-glow">
        <stop offset="0%" stopColor="#84cc16" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);