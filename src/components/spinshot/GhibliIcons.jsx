
import React from 'react';

export const GhibliSparkle = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Pixel-style 8-point star */}
    <g fill="#ffd93d">
      {/* Center cross */}
      <rect x="20" y="10" width="8" height="28" />
      <rect x="10" y="20" width="28" height="8" />
      {/* Diagonal arms */}
      <rect x="14" y="14" width="6" height="6" />
      <rect x="28" y="14" width="6" height="6" />
      <rect x="14" y="28" width="6" height="6" />
      <rect x="28" y="28" width="6" height="6" />
    </g>
    {/* Pixel glow */}
    <g fill="#fff9e6" opacity="0.6">
      <rect x="22" y="14" width="4" height="20" />
      <rect x="14" y="22" width="20" height="4" />
    </g>
    {/* Center pixel */}
    <rect x="22" y="22" width="4" height="4" fill="white" />
    {/* Corner sparkles */}
    <rect x="8" y="8" width="4" height="4" fill="white" opacity="0.8" />
    <rect x="36" y="8" width="4" height="4" fill="white" opacity="0.8" />
    <rect x="8" y="36" width="4" height="4" fill="white" opacity="0.8" />
    <rect x="36" y="36" width="4" height="4" fill="white" opacity="0.8" />
  </svg>
);

export const GhibliLightning = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Pixel lightning bolt */}
    <g fill="#ff6b9d">
      <rect x="22" y="4" width="6" height="6" />
      <rect x="20" y="10" width="6" height="6" />
      <rect x="18" y="16" width="6" height="6" />
      <rect x="16" y="22" width="12" height="6" />
      <rect x="22" y="28" width="6" height="6" />
      <rect x="24" y="34" width="6" height="10" />
    </g>
    {/* Highlight pixels */}
    <g fill="#ffe0ec" opacity="0.8">
      <rect x="24" y="6" width="2" height="4" />
      <rect x="22" y="12" width="2" height="4" />
      <rect x="20" y="18" width="2" height="4" />
    </g>
    {/* Side sparks */}
    <rect x="30" y="8" width="3" height="3" fill="white" opacity="0.8" />
    <rect x="14" y="24" width="3" height="3" fill="white" opacity="0.8" />
    <rect x="32" y="28" width="3" height="3" fill="white" opacity="0.8" />
  </svg>
);

export const GhibliWind = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Pixel wind lines */}
    <g fill="#6bcbff">
      {/* Top line */}
      <rect x="8" y="14" width="6" height="3" />
      <rect x="16" y="14" width="6" height="3" />
      <rect x="24" y="16" width="6" height="3" />
      <rect x="32" y="14" width="6" height="3" />
      {/* Middle line */}
      <rect x="6" y="22" width="6" height="3" />
      <rect x="14" y="22" width="6" height="3" />
      <rect x="22" y="24" width="6" height="3" />
      <rect x="30" y="22" width="8" height="3" />
      {/* Bottom line */}
      <rect x="8" y="30" width="6" height="3" />
      <rect x="16" y="32" width="6" height="3" />
      <rect x="24" y="30" width="6" height="3" />
      <rect x="32" y="32" width="6" height="3" />
    </g>
    {/* Bright pixels */}
    <g fill="white" opacity="0.9">
      <rect x="10" y="15" width="2" height="1" />
      <rect x="26" y="23" width="2" height="1" />
      <rect x="18" y="31" width="2" height="1" />
    </g>
  </svg>
);

export const GhibliTarget = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Pixel target rings */}
    {/* Outer ring */}
    <g fill="none" stroke="#4ade80" strokeWidth="3">
      <rect x="8" y="8" width="32" height="32" />
    </g>
    {/* Middle ring */}
    <rect x="14" y="14" width="20" height="20" fill="none" stroke="#4ade80" strokeWidth="2.5" />
    {/* Inner ring */}
    <rect x="18" y="18" width="12" height="12" fill="none" stroke="#4ade80" strokeWidth="2" />
    {/* Bullseye */}
    <rect x="22" y="22" width="4" height="4" fill="#4ade80" />
    <rect x="23" y="23" width="2" height="2" fill="white" opacity="0.9" />
    {/* Corner sparkles */}
    <rect x="6" y="6" width="3" height="3" fill="white" opacity="0.8" />
    <rect x="39" y="6" width="3" height="3" fill="white" opacity="0.8" />
    <rect x="6" y="39" width="3" height="3" fill="white" opacity="0.8" />
    <rect x="39" y="39" width="3" height="3" fill="white" opacity="0.8" />
  </svg>
);

export const GhibliGauge = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Pixel speedometer arc */}
    <g fill="#f97316">
      <rect x="10" y="32" width="4" height="4" />
      <rect x="14" y="28" width="4" height="4" />
      <rect x="16" y="22" width="4" height="4" />
      <rect x="18" y="16" width="4" height="4" />
      <rect x="22" y="12" width="4" height="4" />
      <rect x="26" y="12" width="4" height="4" />
      <rect x="30" y="16" width="4" height="4" />
      <rect x="32" y="22" width="4" height="4" />
      <rect x="34" y="28" width="4" height="4" />
      <rect x="34" y="32" width="4" height="4" />
    </g>
    {/* Needle pointing to fast */}
    <g fill="white">
      <rect x="24" y="24" width="4" height="4" />
      <rect x="28" y="20" width="4" height="4" />
      <rect x="32" y="16" width="4" height="4" />
    </g>
    {/* Speed lines */}
    <g fill="white" opacity="0.7">
      <rect x="38" y="18" width="4" height="2" />
      <rect x="40" y="24" width="4" height="2" />
      <rect x="38" y="30" width="4" height="2" />
    </g>
  </svg>
);

export const GhibliClock = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Pixel clock body */}
    <rect x="14" y="16" width="20" height="20" fill="#3730a3" stroke="white" strokeWidth="2" />
    {/* Chain */}
    <rect x="23" y="10" width="2" height="6" fill="white" />
    <rect x="22" y="8" width="4" height="3" fill="white" />
    {/* Hour markers */}
    <g fill="white">
      <rect x="23" y="18" width="2" height="2" />
      <rect x="30" y="25" width="2" height="2" />
      <rect x="23" y="32" width="2" height="2" />
      <rect x="16" y="25" width="2" height="2" />
    </g>
    {/* Clock hands */}
    <g fill="white">
      {/* Hour hand */}
      <rect x="23" y="23" width="2" height="4" />
      {/* Minute hand */}
      <rect x="23" y="23" width="6" height="2" />
    </g>
    {/* Center */}
    <rect x="22" y="24" width="4" height="4" fill="white" />
    {/* Magic sparkles */}
    <rect x="10" y="20" width="2" height="2" fill="white" opacity="0.7" />
    <rect x="36" y="28" width="2" height="2" fill="white" opacity="0.7" />
  </svg>
);

export const GhibliCross = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Pixel X */}
    <g fill="#fecaca">
      {/* Diagonal from top-left */}
      <rect x="12" y="12" width="4" height="4" />
      <rect x="16" y="16" width="4" height="4" />
      <rect x="20" y="20" width="4" height="4" />
      <rect x="24" y="24" width="4" height="4" />
      <rect x="28" y="28" width="4" height="4" />
      <rect x="32" y="32" width="4" height="4" />
      {/* Diagonal from top-right */}
      <rect x="32" y="12" width="4" height="4" />
      <rect x="28" y="16" width="4" height="4" />
      <rect x="24" y="20" width="4" height="4" />
      <rect x="20" y="24" width="4" height="4" />
      <rect x="16" y="28" width="4" height="4" />
      <rect x="12" y="32" width="4" height="4" />
    </g>
    {/* Bright center */}
    <rect x="22" y="22" width="4" height="4" fill="white" />
    {/* Corner warning pixels */}
    <rect x="8" y="24" width="3" height="3" fill="white" opacity="0.9" />
    <rect x="37" y="24" width="3" height="3" fill="white" opacity="0.9" />
    <rect x="24" y="8" width="3" height="3" fill="white" opacity="0.9" />
    <rect x="24" y="37" width="3" height="3" fill="white" opacity="0.9" />
  </svg>
);

export const GhibliSmell = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    {/* Pixel stink cloud base */}
    <g fill="#a3e635">
      <rect x="14" y="36" width="20" height="4" />
      <rect x="12" y="32" width="24" height="4" />
      <rect x="16" y="28" width="16" height="4" />
    </g>
    {/* Wavy stink lines - pixel style */}
    <g fill="#d9f99d">
      {/* Left line */}
      <rect x="16" y="6" width="3" height="4" />
      <rect x="14" y="12" width="3" height="4" />
      <rect x="16" y="18" width="3" height="4" />
      <rect x="14" y="24" width="3" height="4" />
      {/* Middle line */}
      <rect x="22" y="8" width="3" height="4" />
      <rect x="22" y="14" width="3" height="4" />
      <rect x="22" y="20" width="3" height="4" />
      <rect x="22" y="26" width="3" height="4" />
      {/* Right line */}
      <rect x="29" y="6" width="3" height="4" />
      <rect x="31" y="12" width="3" height="4" />
      <rect x="29" y="18" width="3" height="4" />
      <rect x="31" y="24" width="3" height="4" />
    </g>
    {/* Top cloud puffs */}
    <g fill="white" opacity="0.8">
      <rect x="16" y="4" width="3" height="3" />
      <rect x="23" y="6" width="3" height="3" />
      <rect x="30" y="4" width="3" height="3" />
    </g>
  </svg>
);
