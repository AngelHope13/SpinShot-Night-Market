import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Zap, Wind, Target, Gauge, Clock, XCircle, Frown } from 'lucide-react';
import { 
  GhibliSparkle, 
  GhibliLightning, 
  GhibliWind, 
  GhibliTarget, 
  GhibliGauge, 
  GhibliClock, 
  GhibliCross, 
  GhibliSmell 
} from './GhibliIcons';
import { useSounds } from './useSounds';

const WHEEL_EFFECTS = [
  { id: 'x2', name: 'x2 Multiplier', description: 'Score is doubled this round', icon: Sparkles, ghibliIcon: GhibliSparkle, color: '#ffd93d', type: 'buff' },
  { id: 'x3', name: 'x3 Multiplier', description: 'Score is tripled this round', icon: Zap, ghibliIcon: GhibliLightning, color: '#ff6b9d', type: 'buff' },
  { id: 'windy', name: 'Windy Aim', description: 'Darts drift sideways slightly', icon: Wind, ghibliIcon: GhibliWind, color: '#6bcbff', type: 'neutral' },
  { id: 'lucky', name: 'Lucky Aim', description: 'Increased accuracy', icon: Target, ghibliIcon: GhibliTarget, color: '#4ade80', type: 'buff' },
  { id: 'chaos', name: 'Chaos Speed', description: 'Targets move faster', icon: Gauge, ghibliIcon: GhibliGauge, color: '#f97316', type: 'curse' },
  { id: 'slow', name: 'Slow Motion', description: 'Targets move slower', icon: Clock, ghibliIcon: GhibliClock, color: '#a78bfa', type: 'buff' },
  { id: 'rubber', name: 'Rubber Darts', description: 'Hits do not score', icon: XCircle, ghibliIcon: GhibliCross, color: '#ef4444', type: 'curse' },
  { id: 'stinky', name: 'Stinky Curse', description: 'Targets pause less frequently', icon: Frown, ghibliIcon: GhibliSmell, color: '#84cc16', type: 'curse' },
];

const SEGMENT_ANGLE = 360 / WHEEL_EFFECTS.length;

export default function WheelOfFate({ level, onEffectSelected, selectedEffect, onStartRound }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [sparks, setSparks] = useState([]);
  const spinCount = useRef(0);
  const sounds = useSounds();

  const spin = () => {
    if (isSpinning || selectedEffect) return;
    
    setIsSpinning(true);
    setShowResult(false);
    sounds.wheelSpin();
    
    // Random number of full rotations (5-8) plus random segment
    const fullRotations = 5 + Math.floor(Math.random() * 4);
    const randomSegment = Math.floor(Math.random() * WHEEL_EFFECTS.length);
    const targetRotation = fullRotations * 360 + (randomSegment * SEGMENT_ANGLE) + (SEGMENT_ANGLE / 2);
    
    spinCount.current += 1;
    const newRotation = rotation + targetRotation;
    setRotation(newRotation);
    
    // After spin completes
    setTimeout(() => {
      setIsSpinning(false);
      sounds.wheelStop();
      const selectedIndex = (WHEEL_EFFECTS.length - Math.floor(((newRotation % 360) / SEGMENT_ANGLE))) % WHEEL_EFFECTS.length;
      const effect = WHEEL_EFFECTS[selectedIndex];
      onEffectSelected(effect);
      setShowResult(true);
      
      // Create spark particles
      const newSparks = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: 50 + (Math.random() - 0.5) * 40,
        y: 45 + (Math.random() - 0.5) * 40,
        angle: Math.random() * 360,
      }));
      setSparks(newSparks);
      setTimeout(() => setSparks([]), 1000);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Level indicator */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 text-center"
      >
        <div className="text-purple-300 text-sm font-medium">LEVEL</div>
        <div className="text-4xl font-black text-white">{level}</div>
        {level === 5 && (
          <div className="text-pink-400 font-bold mt-1 animate-pulse">⚔️ FORTUNE BOSS ⚔️</div>
        )}
      </motion.div>

      {/* Wheel Container */}
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg" />
        </div>

        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 p-1 animate-spin-slow opacity-50" style={{ animationDuration: '10s' }} />

        {/* Wheel */}
        <motion.div
          className="absolute inset-2 rounded-full overflow-hidden shadow-2xl"
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {WHEEL_EFFECTS.map((effect, i) => {
              const startAngle = i * SEGMENT_ANGLE - 90;
              const endAngle = startAngle + SEGMENT_ANGLE;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);
              const largeArc = SEGMENT_ANGLE > 180 ? 1 : 0;

              return (
                <g key={effect.id}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={effect.color}
                    stroke="#1e1b4b"
                    strokeWidth="0.5"
                  />
                  {/* Soft inner glow */}
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill="url(#glow)"
                    opacity="0.3"
                  />
                </g>
              );
            })}
            {/* Gradient for soft glow */}
            <defs>
              <radialGradient id="glow">
                <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Center circle */}
            <circle cx="50" cy="50" r="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
            <circle cx="50" cy="50" r="8" fill="#4f46e5" />
          </svg>
          
          {/* Render Ghibli-style icon overlays */}
          {WHEEL_EFFECTS.map((effect, i) => {
            const iconAngle = (i * SEGMENT_ANGLE - 90 + SEGMENT_ANGLE / 2) * (Math.PI / 180);
            const iconX = 50 + 32 * Math.cos(iconAngle);
            const iconY = 50 + 32 * Math.sin(iconAngle);
            const GhibliIcon = effect.ghibliIcon;
            
            return (
              <motion.div
                key={`icon-${effect.id}`}
                className="absolute"
                style={{
                  left: `${iconX}%`,
                  top: `${iconY}%`,
                  transform: `translate(-50%, -50%) rotate(${(i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2)}deg)`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              >
                <div 
                  className="relative"
                  style={{
                    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4)) drop-shadow(0 0 12px rgba(255,255,255,0.3))',
                  }}
                >
                  <GhibliIcon className="w-11 h-11" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Spark particles */}
        <AnimatePresence>
          {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{ left: `${spark.x}%`, top: `${spark.y}%` }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                x: Math.cos(spark.angle) * 100,
                y: Math.sin(spark.angle) * 100,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Result display */}
      <AnimatePresence>
        {showResult && selectedEffect && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`mt-6 p-4 rounded-2xl backdrop-blur border text-center ${
              selectedEffect.type === 'buff' 
                ? 'bg-green-900/40 border-green-500/30' 
                : selectedEffect.type === 'curse'
                ? 'bg-red-900/40 border-red-500/30'
                : 'bg-purple-900/40 border-purple-500/30'
            }`}
          >
            <div className="text-3xl mb-2">{React.createElement(selectedEffect.icon, { className: 'w-8 h-8 mx-auto', style: { color: selectedEffect.color } })}</div>
            <h3 className="text-xl font-bold text-white">{selectedEffect.name}</h3>
            <p className="text-purple-200 text-sm mt-1">{selectedEffect.description}</p>
            <div className={`text-xs font-semibold mt-2 uppercase ${
              selectedEffect.type === 'buff' ? 'text-green-400' : selectedEffect.type === 'curse' ? 'text-red-400' : 'text-purple-400'
            }`}>
              {selectedEffect.type}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        {!selectedEffect && (
          <motion.button
            onClick={spin}
            disabled={isSpinning}
            whileHover={{ scale: isSpinning ? 1 : 1.05 }}
            whileTap={{ scale: isSpinning ? 1 : 0.95 }}
            className={`px-12 py-4 rounded-2xl font-bold text-lg text-white shadow-xl flex items-center gap-3 ${
              isSpinning 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 shadow-pink-500/30'
            }`}
          >
            <motion.div
              animate={isSpinning ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isSpinning ? Infinity : 0, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
          </motion.button>
        )}

        {selectedEffect && (
          <motion.button
            onClick={() => {
              sounds.buttonClick();
              onStartRound();
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-2xl font-bold text-lg text-white shadow-xl shadow-teal-500/30 flex items-center gap-3"
          >
            <Play className="w-6 h-6" fill="currentColor" />
            START ROUND
          </motion.button>
        )}
      </div>
    </div>
  );
}