import React from 'react';

// Milk Tea Target - "Boba Spirit"
export const GhibliMilktea = () => (
  <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
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
  <svg viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
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
  <svg viewBox="0 0 65 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
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
  <svg viewBox="0 0 65 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
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
  <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
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

// Splitter Target - "Cosmic Orb"
export const GhibliSplitter = () => (
  <svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      <radialGradient id="splitterGrad" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#E0C3FC" />
        <stop offset="100%" stopColor="#A855F7" />
      </radialGradient>
      <filter id="splitterGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#splitterGlow)">
      {/* Main sphere */}
      <circle cx="35" cy="35" r="25" fill="url(#splitterGrad)" stroke="#C084FC" strokeWidth="2"/>
      {/* Split line indication */}
      <path d="M35 10 L35 60" stroke="#F5F3FF" strokeWidth="1" strokeDasharray="3 2" opacity="0.6"/>
      {/* Swirling energy */}
      <path d="M20 35 Q25 25 35 25 Q45 25 50 35" stroke="#F5F3FF" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M20 35 Q25 45 35 45 Q45 45 50 35" stroke="#DDD6FE" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
      {/* Twin orbs hint */}
      <circle cx="28" cy="32" r="8" fill="#C084FC" opacity="0.4"/>
      <circle cx="42" cy="38" r="8" fill="#A855F7" opacity="0.4"/>
      {/* Sparkles */}
      <circle cx="15" cy="20" r="2" fill="#F5F3FF" opacity="0.8"/>
      <circle cx="55" cy="25" r="1.5" fill="#F5F3FF" opacity="0.7"/>
      <circle cx="20" cy="50" r="1.5" fill="#DDD6FE" opacity="0.8"/>
      <circle cx="50" cy="50" r="2" fill="#E0E7FF" opacity="0.6"/>
    </g>
  </svg>
);

// Trap Target - "Skull Curse"
export const GhibliTrap = () => (
  <svg viewBox="0 0 65 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="trapGrad" x1="32" y1="10" x2="32" y2="65">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
      <filter id="trapGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#trapGlow)">
      {/* Skull shape */}
      <ellipse cx="32" cy="30" rx="18" ry="20" fill="url(#trapGrad)" stroke="#991B1B" strokeWidth="2"/>
      {/* Eye sockets */}
      <ellipse cx="24" cy="27" rx="5" ry="7" fill="#450A0A"/>
      <ellipse cx="40" cy="27" rx="5" ry="7" fill="#450A0A"/>
      {/* Eye glow */}
      <circle cx="24" cy="26" r="2" fill="#DC2626" opacity="0.8"/>
      <circle cx="40" cy="26" r="2" fill="#DC2626" opacity="0.8"/>
      {/* Nose hole */}
      <path d="M30 36 L32 40 L34 36 Z" fill="#450A0A"/>
      {/* Teeth */}
      <path d="M20 45 L44 45" stroke="#450A0A" strokeWidth="2"/>
      <path d="M22 45 L22 48" stroke="#450A0A" strokeWidth="1.5"/>
      <path d="M27 45 L27 48" stroke="#450A0A" strokeWidth="1.5"/>
      <path d="M32 45 L32 48" stroke="#450A0A" strokeWidth="1.5"/>
      <path d="M37 45 L37 48" stroke="#450A0A" strokeWidth="1.5"/>
      <path d="M42 45 L42 48" stroke="#450A0A" strokeWidth="1.5"/>
      {/* Danger aura */}
      <circle cx="32" cy="30" r="28" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.3" strokeDasharray="4 4"/>
      {/* Crossed bones hint */}
      <path d="M10 55 L18 60" stroke="#FCA5A5" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
      <path d="M10 60 L18 55" stroke="#FCA5A5" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
      <path d="M46 55 L54 60" stroke="#FCA5A5" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
      <path d="M46 60 L54 55" stroke="#FCA5A5" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
    </g>
  </svg>
);

// Oyster Omelet Target - "Egg Shield"
export const GhibliOysterOmelet = () => (
  <svg viewBox="0 0 70 65" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      <radialGradient id="omeletGrad" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FCD34D" />
      </radialGradient>
      <filter id="omeletGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#omeletGlow)">
      {/* Omelet base */}
      <ellipse cx="35" cy="35" rx="28" ry="25" fill="url(#omeletGrad)" stroke="#F59E0B" strokeWidth="2"/>
      {/* Texture bubbles */}
      <circle cx="22" cy="28" r="4" fill="#FDE68A" opacity="0.6"/>
      <circle cx="35" cy="25" r="5" fill="#FDE68A" opacity="0.5"/>
      <circle cx="45" cy="30" r="3.5" fill="#FDE68A" opacity="0.6"/>
      <circle cx="28" cy="40" r="3" fill="#FDE68A" opacity="0.5"/>
      <circle cx="42" cy="42" r="4" fill="#FDE68A" opacity="0.6"/>
      {/* Oyster pieces */}
      <ellipse cx="25" cy="35" rx="4" ry="3" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1"/>
      <ellipse cx="38" cy="37" rx="3.5" ry="2.5" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1"/>
      <ellipse cx="32" cy="42" rx="3" ry="2" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1"/>
      {/* Shield glint lines */}
      <path d="M15 20 L20 25" stroke="#FEF9C3" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
      <path d="M50 18 L55 23" stroke="#FEF9C3" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
      {/* Protective aura */}
      <ellipse cx="35" cy="35" rx="30" ry="27" fill="none" stroke="#60A5FA" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3"/>
    </g>
  </svg>
);

// Shaved Ice Target - "Frost Spirit"
export const GhibliShavedIce = () => (
  <svg viewBox="0 0 65 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="iceGrad" x1="32" y1="10" x2="32" y2="60">
        <stop offset="0%" stopColor="#E0F2FE" />
        <stop offset="100%" stopColor="#22D3EE" />
      </linearGradient>
      <filter id="iceGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#iceGlow)">
      {/* Cup */}
      <path d="M20 25 L16 55 C16 58 18 60 22 60 L42 60 C46 60 48 58 48 55 L44 25 Z" 
        fill="#FFF7ED" stroke="#FB923C" strokeWidth="1.5"/>
      {/* Shaved ice mound */}
      <ellipse cx="32" cy="25" rx="16" ry="12" fill="url(#iceGrad)" stroke="#06B6D4" strokeWidth="1.5"/>
      <ellipse cx="28" cy="18" rx="10" ry="8" fill="#E0F2FE" stroke="#22D3EE" strokeWidth="1"/>
      <ellipse cx="36" cy="20" rx="8" ry="6" fill="#BAE6FD" stroke="#0EA5E9" strokeWidth="1"/>
      {/* Rainbow syrup drizzle */}
      <path d="M25 22 Q28 28 26 35" stroke="#F472B6" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
      <path d="M32 20 Q34 26 32 33" stroke="#A78BFA" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
      <path d="M38 22 Q36 28 38 35" stroke="#FBBF24" strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
      {/* Ice crystals */}
      <path d="M24 15 L26 15 M25 14 L25 16" stroke="#DBEAFE" strokeWidth="1" opacity="0.8"/>
      <path d="M40 16 L42 16 M41 15 L41 17" stroke="#DBEAFE" strokeWidth="1" opacity="0.8"/>
      <path d="M30 12 L32 12 M31 11 L31 13" stroke="#F0F9FF" strokeWidth="1" opacity="0.8"/>
      {/* Frost aura */}
      <circle cx="32" cy="20" r="22" fill="none" stroke="#67E8F9" strokeWidth="1" opacity="0.3" strokeDasharray="2 2"/>
    </g>
  </svg>
);

// Fried Chicken Target - "Greasy Drumstick"
export const GhibliFriedChicken = () => (
  <svg viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="chickenGrad" x1="30" y1="15" x2="30" y2="60">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="chickenGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#chickenGlow)">
      {/* Drumstick meat */}
      <ellipse cx="30" cy="35" rx="16" ry="20" fill="url(#chickenGrad)" stroke="#92400E" strokeWidth="2"/>
      {/* Crispy coating texture */}
      <circle cx="22" cy="28" r="2.5" fill="#FDE68A" opacity="0.7"/>
      <circle cx="30" cy="25" r="3" fill="#FDE68A" opacity="0.6"/>
      <circle cx="38" cy="30" r="2" fill="#FDE68A" opacity="0.7"/>
      <circle cx="25" cy="38" r="2.5" fill="#FDE047" opacity="0.6"/>
      <circle cx="35" cy="40" r="2.5" fill="#FDE047" opacity="0.7"/>
      <circle cx="28" cy="48" r="2" fill="#FEF3C7" opacity="0.6"/>
      {/* Bone handle */}
      <ellipse cx="30" cy="60" rx="5" ry="8" fill="#F3E8D7" stroke="#D4A574" strokeWidth="1.5"/>
      <ellipse cx="30" cy="68" rx="6" ry="4" fill="#F3E8D7" stroke="#D4A574" strokeWidth="1.5"/>
      {/* Grease drips */}
      <ellipse cx="18" cy="50" rx="3" ry="2" fill="#F59E0B" opacity="0.5"/>
      <ellipse cx="42" cy="52" rx="2.5" ry="1.5" fill="#F59E0B" opacity="0.5"/>
      <path d="M20 52 Q19 56 20 58" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
      <path d="M40 54 Q41 57 40 59" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
      {/* Shine highlight */}
      <ellipse cx="25" cy="32" rx="6" ry="8" fill="#FEF3C7" opacity="0.4"/>
    </g>
  </svg>
);

// Bubble Tea Target - "Sweet Sip"
export const GhibliBubbleTea = () => (
  <svg viewBox="0 0 60 75" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="bubbleTeaGrad" x1="30" y1="15" x2="30" y2="65">
        <stop offset="0%" stopColor="#FBCFE8" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <filter id="bubbleTeaGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#bubbleTeaGlow)">
      {/* Cup body */}
      <path d="M20 20 L18 58 C18 61 20 63 23 63 L37 63 C40 63 42 61 42 58 L40 20 Z" 
        fill="url(#bubbleTeaGrad)" stroke="#BE185D" strokeWidth="1.5"/>
      {/* Lid */}
      <ellipse cx="30" cy="20" rx="11" ry="4" fill="#FDE047" stroke="#EAB308" strokeWidth="1"/>
      {/* Dome lid top */}
      <ellipse cx="30" cy="18" rx="9" ry="3" fill="#FEF3C7" stroke="#EAB308" strokeWidth="1"/>
      {/* Straw */}
      <rect x="27" y="8" width="3" height="50" rx="1.5" fill="#A855F7" opacity="0.8"/>
      {/* Tapioca pearls */}
      <circle cx="24" cy="52" r="3" fill="#1F2937" opacity="0.8"/>
      <circle cx="32" cy="55" r="2.5" fill="#1F2937" opacity="0.7"/>
      <circle cx="28" cy="48" r="2" fill="#374151" opacity="0.7"/>
      <circle cx="36" cy="50" r="2.5" fill="#1F2937" opacity="0.8"/>
      {/* Happy face */}
      <circle cx="24" cy="35" r="1.5" fill="#BE185D"/>
      <circle cx="36" cy="35" r="1.5" fill="#BE185D"/>
      <path d="M26 40 Q30 43 34 40" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Sparkles */}
      <circle cx="12" cy="30" r="1.5" fill="#FDE68A" opacity="0.8"/>
      <circle cx="48" cy="35" r="2" fill="#FDE68A" opacity="0.7"/>
      <circle cx="15" cy="45" r="1" fill="#FBBF24" opacity="0.8"/>
    </g>
  </svg>
);

// Squid Stick Target - "Tentacle Twist"
export const GhibliSquid = () => (
  <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="squidGrad" x1="30" y1="15" x2="30" y2="55">
        <stop offset="0%" stopColor="#FED7AA" />
        <stop offset="100%" stopColor="#FB923C" />
      </linearGradient>
      <filter id="squidGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#squidGlow)">
      {/* Squid body/head */}
      <ellipse cx="30" cy="28" rx="14" ry="18" fill="url(#squidGrad)" stroke="#C2410C" strokeWidth="2"/>
      {/* Grilled marks */}
      <path d="M18 22 L42 22" stroke="#92400E" strokeWidth="1.5" opacity="0.6"/>
      <path d="M18 28 L42 28" stroke="#92400E" strokeWidth="1.5" opacity="0.6"/>
      <path d="M18 34 L42 34" stroke="#92400E" strokeWidth="1.5" opacity="0.6"/>
      {/* Tentacles (wavy) */}
      <path d="M22 45 Q20 52 22 58 Q24 64 22 70" stroke="url(#squidGrad)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M26 46 Q24 53 26 59 Q28 65 26 71" stroke="url(#squidGrad)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M30 46 Q28 53 30 59 Q32 65 30 72" stroke="url(#squidGrad)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M34 46 Q36 53 34 59 Q32 65 34 71" stroke="url(#squidGrad)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M38 45 Q40 52 38 58 Q36 64 38 70" stroke="url(#squidGrad)" strokeWidth="4" strokeLinecap="round"/>
      {/* Suckers on tentacles */}
      <circle cx="22" cy="55" r="2" fill="#EA580C" opacity="0.6"/>
      <circle cx="26" cy="57" r="1.5" fill="#EA580C" opacity="0.6"/>
      <circle cx="30" cy="58" r="2" fill="#EA580C" opacity="0.6"/>
      <circle cx="34" cy="57" r="1.5" fill="#EA580C" opacity="0.6"/>
      <circle cx="38" cy="55" r="2" fill="#EA580C" opacity="0.6"/>
      {/* Eyes */}
      <circle cx="24" cy="24" r="2" fill="#1F2937"/>
      <circle cx="36" cy="24" r="2" fill="#1F2937"/>
      <circle cx="25" cy="23" r="1" fill="#FFF" opacity="0.8"/>
      <circle cx="37" cy="23" r="1" fill="#FFF" opacity="0.8"/>
      {/* Skewer stick */}
      <rect x="28" y="70" width="4" height="8" rx="1" fill="#92400E"/>
    </g>
  </svg>
);

// Signboard Target - "Lucky Lantern Sign"
export const GhibliSignboard = () => (
  <svg viewBox="0 0 80 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="signGrad" x1="40" y1="20" x2="40" y2="70">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
      <filter id="signGlow">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#signGlow)">
      {/* Hanging string */}
      <path d="M40 5 L40 15" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
      {/* Lantern top cap */}
      <ellipse cx="40" cy="15" rx="12" ry="4" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5"/>
      {/* Main lantern body */}
      <ellipse cx="40" cy="45" rx="24" ry="28" fill="url(#signGrad)" stroke="#F59E0B" strokeWidth="2"/>
      {/* Red decorative bands */}
      <ellipse cx="40" cy="25" rx="22" ry="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1"/>
      <ellipse cx="40" cy="65" rx="22" ry="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1"/>
      {/* Chinese character for "luck" (simplified) */}
      <path d="M35 38 L45 38 M40 35 L40 52 M32 45 L48 45" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"/>
      {/* Vertical accent lines */}
      <path d="M28 35 L28 55" stroke="#F59E0B" strokeWidth="1" opacity="0.4"/>
      <path d="M52 35 L52 55" stroke="#F59E0B" strokeWidth="1" opacity="0.4"/>
      {/* Lantern bottom tassel */}
      <ellipse cx="40" cy="73" rx="6" ry="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1"/>
      <path d="M38 76 Q37 80 38 82" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
      <path d="M40 76 Q39 81 40 84" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
      <path d="M42 76 Q43 80 42 82" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
      {/* Golden sparkles */}
      <circle cx="20" cy="35" r="2" fill="#FEF3C7" opacity="0.9"/>
      <circle cx="60" cy="40" r="2.5" fill="#FDE68A" opacity="0.9"/>
      <circle cx="25" cy="55" r="1.5" fill="#FEF3C7" opacity="0.8"/>
      <circle cx="55" cy="50" r="2" fill="#FDE68A" opacity="0.9"/>
      {/* Lucky glow aura */}
      <ellipse cx="40" cy="45" rx="30" ry="33" fill="none" stroke="#FCD34D" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3"/>
    </g>
  </svg>
);

// Dragon Boss - "Eastern Red Dragon" - Majestic serpentine boss
export const GhibliDragon = ({ health, maxHealth }) => {
  const healthPercent = (health / maxHealth) * 100;
  
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <linearGradient id="dragonBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="30%" stopColor="#ea580c" />
          <stop offset="70%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="dragonBellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fcd34d" />
        </linearGradient>
        <radialGradient id="dragonGlowAura">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#f97316" opacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="dragonGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Mystical glow aura */}
      <circle cx="60" cy="60" r="55" fill="url(#dragonGlowAura)" opacity="0.3" />
      
      {/* Coiled serpentine body - dramatic S-curve */}
      <path 
        d="M 25 90 Q 18 70 25 50 Q 32 30 50 25 Q 68 22 82 35 Q 95 48 98 65 Q 100 82 85 95"
        fill="url(#dragonBodyGrad)"
        stroke="#7c2d12"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#dragonGlow)"
      />
      
      {/* Segmented belly scales - golden cream */}
      <ellipse cx="30" cy="65" rx="8" ry="5" fill="url(#dragonBellyGrad)" opacity="0.85" />
      <ellipse cx="40" cy="42" rx="7" ry="4.5" fill="url(#dragonBellyGrad)" opacity="0.85" />
      <ellipse cx="55" cy="28" rx="8" ry="5" fill="url(#dragonBellyGrad)" opacity="0.85" />
      <ellipse cx="72" cy="32" rx="7" ry="4.5" fill="url(#dragonBellyGrad)" opacity="0.85" />
      <ellipse cx="85" cy="50" rx="8" ry="5" fill="url(#dragonBellyGrad)" opacity="0.85" />
      <ellipse cx="90" cy="70" rx="7" ry="4.5" fill="url(#dragonBellyGrad)" opacity="0.85" />
      
      {/* Scale texture on body */}
      <ellipse cx="28" cy="75" rx="5" ry="3" fill="#c2410c" opacity="0.6" />
      <ellipse cx="38" cy="50" rx="4.5" ry="2.5" fill="#c2410c" opacity="0.6" />
      <ellipse cx="52" cy="32" rx="5" ry="3" fill="#c2410c" opacity="0.6" />
      <ellipse cx="68" cy="28" rx="4.5" ry="2.5" fill="#c2410c" opacity="0.6" />
      <ellipse cx="82" cy="42" rx="5" ry="3" fill="#c2410c" opacity="0.6" />
      <ellipse cx="92" cy="62" rx="4.5" ry="2.5" fill="#c2410c" opacity="0.6" />
      
      {/* Main dragon head - elongated and fierce */}
      <ellipse cx="60" cy="52" rx="20" ry="16" fill="url(#dragonBodyGrad)" stroke="#7c2d12" strokeWidth="3" filter="url(#dragonGlow)" />
      
      {/* Extended snout */}
      <ellipse cx="60" cy="60" rx="12" ry="9" fill="url(#dragonBodyGrad)" stroke="#7c2d12" strokeWidth="2.5" />
      <ellipse cx="60" cy="63" rx="9" ry="5" fill="url(#dragonBellyGrad)" opacity="0.7" />
      
      {/* Fierce nostrils */}
      <ellipse cx="55" cy="64" rx="2" ry="1.5" fill="#1c1917" />
      <ellipse cx="65" cy="64" rx="2" ry="1.5" fill="#1c1917" />
      
      {/* Menacing slanted eyes */}
      <ellipse cx="52" cy="48" rx="5" ry="7" fill="#fef3c7" transform="rotate(-20 52 48)" stroke="#7c2d12" strokeWidth="1" />
      <ellipse cx="68" cy="48" rx="5" ry="7" fill="#fef3c7" transform="rotate(20 68 48)" stroke="#7c2d12" strokeWidth="1" />
      <ellipse cx="52" cy="48" rx="2.5" ry="5" fill="#dc2626" />
      <ellipse cx="68" cy="48" rx="2.5" ry="5" fill="#dc2626" />
      <rect x="51" y="46" width="2" height="4" fill="#000" />
      <rect x="67" y="46" width="2" height="4" fill="#000" />
      <circle cx="52" cy="46" r="1" fill="#fff" opacity="0.8" />
      <circle cx="68" cy="46" r="1" fill="#fff" opacity="0.8" />
      
      {/* Majestic antler horns */}
      <path d="M 46 40 L 38 22 M 38 22 L 42 30 M 38 22 L 35 28" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" filter="url(#dragonGlow)" />
      <path d="M 43 38 L 35 20 M 35 20 L 38 27" fill="none" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 74 40 L 82 22 M 82 22 L 78 30 M 82 22 L 85 28" fill="none" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" filter="url(#dragonGlow)" />
      <path d="M 77 38 L 85 20 M 85 20 L 82 27" fill="none" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Long prominent whiskers */}
      <line x1="42" y1="54" x2="10" y2="48" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
      <line x1="40" y1="58" x2="5" y2="55" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <line x1="42" y1="62" x2="12" y2="65" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
      <line x1="78" y1="54" x2="110" y2="48" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
      <line x1="80" y1="58" x2="115" y2="55" stroke="#fcd34d" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      <line x1="78" y1="62" x2="108" y2="65" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
      
      {/* Flowing mane/beard */}
      <path d="M 52 68 L 48 80" stroke="#fb923c" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
      <path d="M 56 70 L 54 83" stroke="#fdba74" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M 60 71 L 60 86" stroke="#f97316" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
      <path d="M 64 70 L 66 83" stroke="#fdba74" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M 68 68 L 72 80" stroke="#fb923c" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
      
      {/* Fire breath when weak */}
      {healthPercent < 30 && (
        <>
          <ellipse cx="60" cy="68" rx="5" ry="4" fill="#fb923c" opacity="0.95" filter="url(#dragonGlow)" />
          <circle cx="55" cy="73" r="3.5" fill="#fbbf24" opacity="0.9" />
          <circle cx="65" cy="73" r="3.5" fill="#fbbf24" opacity="0.9" />
          <circle cx="57" cy="78" r="3" fill="#fb923c" opacity="0.8" />
          <circle cx="63" cy="78" r="3" fill="#fb923c" opacity="0.8" />
          <circle cx="60" cy="82" r="2.5" fill="#fde68a" opacity="0.7" />
        </>
      )}
      
      {/* Mystical pearl/orb */}
      <circle cx="60" cy="58" r="5" fill="#fbbf24" opacity="0.98" stroke="#f59e0b" strokeWidth="1.5" filter="url(#dragonGlow)" />
      <circle cx="58" cy="57" r="2" fill="#fef3c7" opacity="0.95" />
      <circle cx="59" cy="59" r="1" fill="#fde68a" opacity="0.8" />
      
      {/* Mystical sparkles */}
      <circle cx="25" cy="30" r="2.5" fill="#fbbf24" opacity="0.9">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="95" cy="35" r="2" fill="#fef3c7" opacity="0.95">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="78" cy="22" r="2.5" fill="#fbbf24" opacity="0.85">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="42" cy="25" r="1.8" fill="#fde68a" opacity="0.9">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.8s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      
      {/* Health bar */}
      <rect x="10" y="8" width="100" height="7" fill="#7c2d12" rx="3.5" />
      <rect x="10" y="8" width={healthPercent} height="7" fill="#f97316" rx="3.5">
        <animate attributeName="fill" values="#f97316;#fb923c;#f97316" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="10" y="8" width="100" height="7" fill="none" stroke="#fbbf24" strokeWidth="1.5" rx="3.5" />
    </svg>
  );
};