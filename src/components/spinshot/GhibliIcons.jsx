
import React from 'react';

export const GhibliSparkle = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Bold 8-point star */}
    <path
      d="M24 2 L26 18 L40 10 L30 22 L46 24 L30 26 L40 38 L26 30 L24 46 L22 30 L8 38 L18 26 L2 24 L18 22 L8 10 L22 18 Z"
      fill="#ffd93d"
      stroke="#ffb700"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Inner glow */}
    <circle cx="24" cy="24" r="6" fill="white" opacity="0.9" />
    {/* Accent stars */}
    <circle cx="12" cy="12" r="3" fill="#fff9e6" />
    <circle cx="36" cy="12" r="2.5" fill="#fff9e6" />
    <circle cx="36" cy="36" r="3" fill="#fff9e6" />
    <circle cx="12" cy="36" r="2.5" fill="#fff9e6" />
  </svg>
);

export const GhibliLightning = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Bold lightning bolt */}
    <path
      d="M28 2 L16 22 L24 22 L14 46 L36 20 L28 20 L38 2 Z"
      fill="#ff6b9d"
      stroke="#ff4d88"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Inner highlight */}
    <path
      d="M30 8 L22 22 L26 22 L20 38"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Electric sparks */}
    <circle cx="33" cy="5" r="3" fill="white" />
    <circle cx="16" cy="24" r="2.5" fill="white" />
    <circle cx="36" cy="22" r="2.5" fill="white" />
  </svg>
);

export const GhibliWind = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Bold flowing wind lines */}
    <path
      d="M6 14 Q16 10, 26 14 Q36 18, 44 14"
      stroke="#6bcbff"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M4 24 Q14 20, 26 24 Q38 28, 44 24"
      stroke="#6bcbff"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M6 34 Q16 30, 26 34 Q36 38, 44 34"
      stroke="#6bcbff"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Bright highlights */}
    <circle cx="10" cy="14" r="3" fill="white" />
    <circle cx="32" cy="12" r="2.5" fill="white" />
    <circle cx="42" cy="24" r="3" fill="white" />
    <circle cx="18" cy="36" r="2.5" fill="white" />
  </svg>
);

export const GhibliTarget = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Bold target rings */}
    <circle cx="24" cy="24" r="20" stroke="#4ade80" strokeWidth="4" fill="none" />
    <circle cx="24" cy="24" r="14" stroke="#4ade80" strokeWidth="3.5" fill="none" />
    <circle cx="24" cy="24" r="8" stroke="#4ade80" strokeWidth="3" fill="none" />
    {/* Bullseye */}
    <circle cx="24" cy="24" r="5" fill="#4ade80" />
    <circle cx="24" cy="24" r="3" fill="white" />
    {/* Corner accents */}
    <circle cx="10" cy="10" r="3" fill="white" />
    <circle cx="38" cy="10" r="3" fill="white" />
    <circle cx="38" cy="38" r="3" fill="white" />
    <circle cx="10" cy="38" r="3" fill="white" />
  </svg>
);

export const GhibliGauge = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Bold speedometer arc */}
    <path
      d="M6 32 A20 20 0 0 1 42 32"
      stroke="#f97316"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Tick marks */}
    <line x1="8" y1="32" x2="12" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="13" y1="20" x2="16" y2="22" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="24" y1="12" x2="24" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="35" y1="20" x2="32" y2="22" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="40" y1="32" x2="36" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" />
    
    {/* Needle pointing to fast */}
    <line x1="24" y1="32" x2="36" y2="18" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <circle cx="24" cy="32" r="4" fill="#f97316" stroke="white" strokeWidth="2" />
    
    {/* Speed lines */}
    <line x1="38" y1="18" x2="44" y2="14" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="40" y1="26" x2="46" y2="24" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const GhibliClock = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Chain */}
    <line x1="24" y1="8" x2="24" y2="14" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="7" r="3" fill="white" />
    
    {/* Bold clock body */}
    <circle cx="24" cy="26" r="16" fill="#3730a3" stroke="white" strokeWidth="3.5" />
    
    {/* Hour markers */}
    <circle cx="24" cy="14" r="2.5" fill="white" />
    <circle cx="36" cy="26" r="2.5" fill="white" />
    <circle cx="24" cy="38" r="2.5" fill="white" />
    <circle cx="12" cy="26" r="2.5" fill="white" />
    
    {/* Clock hands */}
    <line x1="24" y1="26" x2="24" y2="18" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="24" y1="26" x2="31" y2="26" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="24" cy="26" r="3" fill="white" />
    
    {/* Magic sparkles */}
    <circle cx="9" cy="20" r="2" fill="white" opacity="0.8" />
    <circle cx="39" cy="30" r="2" fill="white" opacity="0.8" />
  </svg>
);

export const GhibliCross = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Bold X */}
    <line x1="10" y1="10" x2="38" y2="38" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" />
    <line x1="38" y1="10" x2="10" y2="38" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" />
    
    {/* Bright highlights */}
    <line x1="12" y1="12" x2="36" y2="36" stroke="#fecaca" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    <line x1="36" y1="12" x2="12" y2="36" stroke="#fecaca" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    
    {/* Warning circle accents */}
    <circle cx="8" cy="24" r="3" fill="white" />
    <circle cx="40" cy="24" r="3" fill="white" />
    <circle cx="24" cy="8" r="3" fill="white" />
    <circle cx="24" cy="40" r="3" fill="white" />
  </svg>
);

export const GhibliSmell = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Bold stink cloud base */}
    <ellipse cx="24" cy="38" rx="14" ry="6" fill="#a3e635" />
    <ellipse cx="16" cy="36" rx="7" ry="5" fill="#a3e635" />
    <ellipse cx="32" cy="36" rx="7" ry="5" fill="#a3e635" />
    <ellipse cx="24" cy="34" rx="5" ry="4" fill="#84cc16" />
    
    {/* Wavy stink lines - bold */}
    <path d="M16 30 Q14 22, 16 14 Q18 6, 16 2" stroke="#d9f99d" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M24 32 Q22 24, 24 16 Q26 8, 24 4" stroke="#d9f99d" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M32 30 Q34 22, 32 14 Q30 6, 32 2" stroke="#d9f99d" strokeWidth="4" strokeLinecap="round" fill="none" />
    
    {/* Top cloud puffs */}
    <circle cx="16" cy="2" r="3.5" fill="white" />
    <circle cx="20" cy="3" r="2.5" fill="white" />
    <circle cx="24" cy="4" r="3.5" fill="white" />
    <circle cx="28" cy="3" r="2.5" fill="white" />
    <circle cx="32" cy="2" r="3.5" fill="white" />
  </svg>
);
