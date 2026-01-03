import React from 'react';

// Milk Tea Target - "Boba Spirit"
export const GhibliMilktea = () => (
  <svg width="100%" height="100%" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="milkteaGrad" x1="30" y1="10" x2="30" y2="65">
        <stop offset="0%" stopColor="#E0BBE4" />
        <stop offset="100%" stopColor="#D4A5D8" />
      </linearGradient>
      <filter id="milkteaGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#milkteaGlow)">
      {/* Cup body */}
      <path d="M20 15 L18 55 C18 58 20 60 23 60 L37 60 C40 60 42 58 42 55 L40 15 Z" 
        fill="url(#milkteaGrad)" stroke="#957DAD" strokeWidth="1.5"/>
      {/* Lid */}
      <ellipse cx="30" cy="15" rx="11" ry="4" fill="#FFC72C" stroke="#E0A800" strokeWidth="1"/>
      {/* Straw */}
      <rect x="26" y="5" width="3" height="50" rx="1.5" fill="#FF6B9D" opacity="0.8"/>
      {/* Boba pearls */}
      <circle cx="25" cy="48" r="3" fill="#6D597A" opacity="0.7"/>
      <circle cx="32" cy="52" r="2.5" fill="#6D597A" opacity="0.6"/>
      <circle cx="28" cy="45" r="2" fill="#6D597A" opacity="0.5"/>
      {/* Cute face */}
      <circle cx="24" cy="30" r="1.5" fill="#957DAD"/>
      <circle cx="36" cy="30" r="1.5" fill="#957DAD"/>
      <path d="M26 36 Q30 38 34 36" stroke="#957DAD" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </g>
  </svg>
);

// Balloon Target - "Sky Lantern Buddy"
export const GhibliBalloon = () => (
  <svg width="100%" height="100%" viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="balloonGrad" cx="50%" cy="30%">
        <stop offset="0%" stopColor="#FF8E8E" />
        <stop offset="100%" stopColor="#FF5757" />
      </radialGradient>
      <filter id="balloonGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#balloonGlow)">
      {/* Balloon body */}
      <ellipse cx="30" cy="30" rx="20" ry="28" fill="url(#balloonGrad)" stroke="#E63946" strokeWidth="1.5"/>
      {/* Shine highlight */}
      <ellipse cx="22" cy="18" rx="8" ry="12" fill="#FFB4B4" opacity="0.6"/>
      {/* Paper texture lines */}
      <path d="M30 8 L30 52" stroke="#E63946" strokeWidth="0.5" opacity="0.3"/>
      <path d="M15 30 L45 30" stroke="#E63946" strokeWidth="0.5" opacity="0.3"/>
      {/* Knot */}
      <ellipse cx="30" cy="58" rx="3" ry="4" fill="#C1121F"/>
      {/* String */}
      <path d="M30 62 Q28 68 30 75" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="2 2"/>
      {/* Cute face */}
      <circle cx="23" cy="28" r="2" fill="#8B0000"/>
      <circle cx="37" cy="28" r="2" fill="#8B0000"/>
      <path d="M25 35 Q30 38 35 35" stroke="#8B0000" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </g>
  </svg>
);

// Lucky Cat Target - "Maneki-Neko Charm"
export const GhibliLuckyCat = () => (
  <svg width="100%" height="100%" viewBox="0 0 65 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="catGrad" x1="32" y1="10" x2="32" y2="65">
        <stop offset="0%" stopColor="#FFE4B5" />
        <stop offset="100%" stopColor="#FFD700" />
      </linearGradient>
      <filter id="catGlow">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#catGlow)">
      {/* Body */}
      <ellipse cx="32" cy="45" rx="18" ry="20" fill="url(#catGrad)" stroke="#DAA520" strokeWidth="1.5"/>
      {/* Head */}
      <ellipse cx="32" cy="22" rx="15" ry="16" fill="url(#catGrad)" stroke="#DAA520" strokeWidth="1.5"/>
      {/* Left ear */}
      <path d="M20 18 L17 8 L24 15 Z" fill="url(#catGrad)" stroke="#DAA520" strokeWidth="1.5"/>
      {/* Right ear */}
      <path d="M44 18 L47 8 L40 15 Z" fill="url(#catGrad)" stroke="#DAA520" strokeWidth="1.5"/>
      {/* Left paw (waving) */}
      <ellipse cx="18" cy="38" rx="5" ry="8" fill="url(#catGrad)" stroke="#DAA520" strokeWidth="1.5" transform="rotate(-20 18 38)"/>
      {/* Right paw */}
      <ellipse cx="46" cy="50" rx="5" ry="7" fill="url(#catGrad)" stroke="#DAA520" strokeWidth="1.5"/>
      {/* Bell */}
      <circle cx="32" cy="55" r="4" fill="#FF6B6B" stroke="#C1121F" strokeWidth="1"/>
      <circle cx="32" cy="56" r="1.5" fill="#FFD700"/>
      {/* Face */}
      <circle cx="26" cy="22" r="2" fill="#2D3748"/>
      <circle cx="38" cy="22" r="2" fill="#2D3748"/>
      <circle cx="32" cy="26" r="1.5" fill="#FF6B6B"/>
      <path d="M28 28 Q32 30 36 28" stroke="#2D3748" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Sparkles */}
      <circle cx="12" cy="20" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="52" cy="25" r="1.5" fill="#FFD700" opacity="0.6"/>
      <circle cx="20" cy="55" r="1.5" fill="#FFD700" opacity="0.7"/>
    </g>
  </svg>
);

// Stinky Tofu Target - "Fermented Friend"
export const GhibliStinkyTofu = () => (
  <svg width="100%" height="100%" viewBox="0 0 65 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="tofuGrad" x1="32" y1="15" x2="32" y2="50">
        <stop offset="0%" stopColor="#A8B894" />
        <stop offset="100%" stopColor="#8B9A7B" />
      </linearGradient>
      <filter id="tofuGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#tofuGlow)">
      {/* Tofu body */}
      <rect x="15" y="20" width="35" height="30" rx="4" fill="url(#tofuGrad)" stroke="#6B7A5A" strokeWidth="1.5"/>
      {/* Texture holes */}
      <circle cx="22" cy="28" r="2" fill="#6B7A5A" opacity="0.5"/>
      <circle cx="32" cy="32" r="2.5" fill="#6B7A5A" opacity="0.4"/>
      <circle cx="42" cy="30" r="2" fill="#6B7A5A" opacity="0.5"/>
      <circle cx="26" cy="40" r="1.5" fill="#6B7A5A" opacity="0.4"/>
      <circle cx="38" cy="42" r="2" fill="#6B7A5A" opacity="0.5"/>
      {/* Grumpy face */}
      <circle cx="24" cy="32" r="1.5" fill="#4A5340"/>
      <circle cx="40" cy="32" r="1.5" fill="#4A5340"/>
      <path d="M26 42 L38 42" stroke="#4A5340" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Stink clouds */}
      <g opacity="0.6">
        <ellipse cx="10" cy="15" rx="4" ry="3" fill="#90C878" stroke="#6B9A5A" strokeWidth="1"/>
        <ellipse cx="14" cy="10" rx="3" ry="2.5" fill="#90C878" stroke="#6B9A5A" strokeWidth="1"/>
        <ellipse cx="54" cy="12" rx="3.5" ry="3" fill="#90C878" stroke="#6B9A5A" strokeWidth="1"/>
        <ellipse cx="50" cy="8" rx="3" ry="2" fill="#90C878" stroke="#6B9A5A" strokeWidth="1"/>
      </g>
      {/* Wavy stink lines */}
      <path d="M8 18 Q10 15 12 18" stroke="#90C878" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M52 15 Q54 12 56 15" stroke="#90C878" strokeWidth="1" fill="none" opacity="0.5"/>
    </g>
  </svg>
);

// Fortune Lantern Boss Target - "Grand Spirit Orb"
export const GhibliFortuneLantern = () => (
  <svg width="100%" height="100%" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lanternGrad" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="50%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#5B21B6" />
      </radialGradient>
      <filter id="lanternGlow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#lanternGlow)">
      {/* Main orb */}
      <circle cx="50" cy="50" r="35" fill="url(#lanternGrad)" stroke="#FFD700" strokeWidth="2"/>
      {/* Inner glow */}
      <circle cx="50" cy="50" r="28" fill="#C4B5FD" opacity="0.3"/>
      {/* Decorative patterns */}
      <circle cx="50" cy="50" r="20" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.6"/>
      <circle cx="50" cy="50" r="25" fill="none" stroke="#FDE047" strokeWidth="0.5" opacity="0.4" strokeDasharray="3 3"/>
      {/* Swirling patterns */}
      <path d="M50 30 Q60 40 50 50 Q40 60 50 70" stroke="#FDE047" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M50 70 Q60 60 50 50 Q40 40 50 30" stroke="#FBBF24" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
      {/* Top decoration */}
      <rect x="45" y="10" width="10" height="8" rx="2" fill="#FFD700" stroke="#F59E0B" strokeWidth="1"/>
      <path d="M48 10 L50 5 L52 10" fill="#FDE047"/>
      {/* Bottom decoration */}
      <ellipse cx="50" cy="88" rx="8" ry="5" fill="#7C3AED" stroke="#FFD700" strokeWidth="1"/>
      {/* Light ribbons */}
      <path d="M85 50 Q90 40 85 30" stroke="#FBBF24" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round"/>
      <path d="M15 50 Q10 40 15 30" stroke="#FBBF24" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round"/>
      <path d="M85 50 Q90 60 85 70" stroke="#FDE047" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M15 50 Q10 60 15 70" stroke="#FDE047" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round"/>
      {/* Central star */}
      <circle cx="50" cy="50" r="5" fill="#FFD700" opacity="0.8"/>
      <path d="M50 42 L50 58 M42 50 L58 50" stroke="#FFF" strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
    </g>
  </svg>
);