import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Crosshair, Sparkles, Zap, Wind, Gauge, XCircle, Plus, Snowflake, TrendingUp } from 'lucide-react';
import { useSounds } from './useSounds';
import { useSettings } from './useSettings';
import { GhibliMilktea, GhibliBalloon, GhibliStinkyTofu, GhibliLuckyCat, GhibliFortuneLantern } from './GhibliTargets';

const TARGETS = [
  { type: 'milktea', emoji: '🧋', points: 100, size: 60, spawnChance: 0.35, ghibliComponent: GhibliMilktea },
  { type: 'balloon', emoji: '🎈', points: 50, size: 70, spawnChance: 0.35, ghibliComponent: GhibliBalloon },
  { type: 'stinkytofu', emoji: '🤢', points: 150, size: 65, spawnChance: 0.2, ghibliComponent: GhibliStinkyTofu },
  { type: 'luckycat', emoji: '🐱', points: 300, size: 65, spawnChance: 0.1, ghibliComponent: GhibliLuckyCat },
];

const BOSS_TARGET = { 
  type: 'fortunelantern', 
  emoji: '🏮', 
  points: 500, 
  size: 100, 
  ghibliComponent: GhibliFortuneLantern 
};

const EFFECT_ICONS = {
  x2: Sparkles,
  x3: Zap,
  windy: Wind,
  lucky: Target,
  chaos: Gauge,
  slow: Clock,
  rubber: XCircle,
  stinky: () => <span>🤢</span>,
};

const POWERUPS = [
  { id: 'extra-darts', name: 'Extra Darts', icon: Plus, emoji: '🎯', color: '#3b82f6', description: '+5 Darts' },
  { id: 'freeze-time', name: 'Freeze Time', icon: Snowflake, emoji: '❄️', color: '#06b6d4', description: '5s Freeze' },
  { id: 'score-boost', name: 'Score Boost', icon: TrendingUp, emoji: '⭐', color: '#f59e0b', description: '2x for 10s' },
];

export default function GameplayArena({ level, totalScore, wheelEffect, onRoundEnd }) {
  const isBoss = level === 5;
  const initialDarts = isBoss ? 20 : 15;
  const initialTime = isBoss ? 60 : 30;
  const bossTargetScore = 2000;

  const [darts, setDarts] = useState(initialDarts);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [roundScore, setRoundScore] = useState(0);
  const [targets, setTargets] = useState([]);
  const [hitEffects, setHitEffects] = useState([]);
  const [windOffset, setWindOffset] = useState({ x: 0, y: 0 });
  const [powerups, setPowerups] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [activePowerups, setActivePowerups] = useState({});
  const arenaRef = useRef(null);
  const gameEndedRef = useRef(false);
  const sounds = useSounds();
  const { settings } = useSettings();

  const renderTargetVisual = (target) => {
    if (settings.targetSkin === 'ghibli') {
      const Component = target.ghibliComponent;
      return Component ? <Component /> : target.emoji;
    }
    
    const emojiMap = {
      default: { milktea: '🧋', balloon: '🎈', stinkytofu: '🤢', luckycat: '🐱', fortunelantern: '🏮' },
      kawaii: { milktea: '🥤', balloon: '🎀', stinkytofu: '😋', luckycat: '😻', fortunelantern: '🎏' },
      pixel: { milktea: '🟫', balloon: '🔴', stinkytofu: '🟢', luckycat: '🟡', fortunelantern: '🟠' },
      minimal: { milktea: '⚪', balloon: '⚫', stinkytofu: '⭕', luckycat: '✨', fortunelantern: '⭕' },
      bubble: { milktea: '🫧', balloon: '💭', stinkytofu: '🫧', luckycat: '✨', fortunelantern: '💭' },
    };
    return emojiMap[settings.targetSkin]?.[target.type] || emojiMap.default[target.type];
  };

  const getCrosshairStyle = () => {
    const styles = {
      default: 'cursor-crosshair',
      dot: 'cursor-none',
      cross: 'cursor-none',
      circle: 'cursor-none',
    };
    return styles[settings.crosshair] || styles.default;
  };

  // Speed multiplier based on wheel effect
  const getSpeedMultiplier = () => {
    if (wheelEffect?.id === 'chaos') return 1.5;
    if (wheelEffect?.id === 'slow') return 0.5;
    return 1;
  };

  // Pause duration based on wheel effect
  const getPauseDuration = () => {
    if (wheelEffect?.id === 'stinky') return 200;
    return 800;
  };

  // Score multiplier
  const getScoreMultiplier = () => {
    let multiplier = 1;
    if (wheelEffect?.id === 'x2') multiplier = 2;
    if (wheelEffect?.id === 'x3') multiplier = 3;
    if (activePowerups['score-boost']) multiplier *= 2;
    return multiplier;
  };

  // Spawn targets with level-appropriate scaling
  useEffect(() => {
    const spawnTarget = () => {
      if (gameEndedRef.current) return;
      
      const arena = arenaRef.current;
      if (!arena) return;
      
      const rect = arena.getBoundingClientRect();
      const padding = 80;
      
      let selectedTarget;
      
      // Boss level: spawn Fortune Lantern occasionally
      if (isBoss && Math.random() < 0.15) {
        selectedTarget = BOSS_TARGET;
      } else {
        // Level-based target distribution
        let availableTargets = [...TARGETS];
        
        // Levels 1-2: Only Milk Tea and Balloon
        if (level <= 2) {
          availableTargets = TARGETS.filter(t => t.type === 'milktea' || t.type === 'balloon');
        }
        // Levels 3-4: Add Lucky Cat and Stinky Tofu occasionally
        else if (level <= 4) {
          const rand = Math.random();
          if (rand > 0.7) {
            availableTargets = TARGETS;
          } else {
            availableTargets = TARGETS.filter(t => t.type === 'milktea' || t.type === 'balloon');
          }
        }
        
        const rand = Math.random();
        let cumulative = 0;
        const totalChance = availableTargets.reduce((sum, t) => sum + t.spawnChance, 0);
        
        for (const target of availableTargets) {
          cumulative += target.spawnChance / totalChance;
          if (rand <= cumulative) {
            selectedTarget = target;
            break;
          }
        }
        
        if (!selectedTarget) selectedTarget = availableTargets[0];
      }

      const newTarget = {
        id: Date.now() + Math.random(),
        ...selectedTarget,
        x: padding + Math.random() * (rect.width - padding * 2),
        y: padding + Math.random() * (rect.height - padding * 2),
        direction: { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 },
        isPaused: false,
        pauseTimer: 0,
      };

      setTargets(prev => [...prev.slice(-7), newTarget]);
    };

    const interval = setInterval(spawnTarget, 1200);
    spawnTarget();
    
    return () => clearInterval(interval);
  }, [level, isBoss]);

  // Spawn powerups
  useEffect(() => {
    const spawnPowerup = () => {
      if (gameEndedRef.current || Math.random() > 0.3) return;

      const arena = arenaRef.current;
      if (!arena) return;
      
      const rect = arena.getBoundingClientRect();
      const padding = 100;

      const powerup = POWERUPS[Math.floor(Math.random() * POWERUPS.length)];
      const newPowerup = {
        id: Date.now() + Math.random(),
        ...powerup,
        x: padding + Math.random() * (rect.width - padding * 2),
        y: padding + Math.random() * (rect.height - padding * 2),
      };

      setPowerups(prev => [...prev.slice(-2), newPowerup]);
    };

    const interval = setInterval(spawnPowerup, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Move targets
  useEffect(() => {
    const moveTargets = () => {
      if (gameEndedRef.current) return;
      
      const arena = arenaRef.current;
      if (!arena) return;
      const rect = arena.getBoundingClientRect();
      const speed = activePowerups['freeze-time'] ? 0 : 2 * getSpeedMultiplier();
      const pauseDuration = getPauseDuration();

      setTargets(prev => prev.map(target => {
        if (activePowerups['freeze-time']) {
          return target;
        }

        if (target.isPaused) {
          if (Date.now() - target.pauseTimer > pauseDuration) {
            return { ...target, isPaused: false };
          }
          return target;
        }

        // Random pause chance
        if (Math.random() < 0.01) {
          return { ...target, isPaused: true, pauseTimer: Date.now() };
        }

        let newX = target.x + target.direction.x * speed;
        let newY = target.y + target.direction.y * speed;
        let newDir = { ...target.direction };

        const padding = 40;
        if (newX < padding || newX > rect.width - padding) {
          newDir.x *= -1;
          newX = Math.max(padding, Math.min(rect.width - padding, newX));
        }
        if (newY < padding || newY > rect.height - padding) {
          newDir.y *= -1;
          newY = Math.max(padding, Math.min(rect.height - padding, newY));
        }

        return { ...target, x: newX, y: newY, direction: newDir };
      }));
    };

    const interval = setInterval(moveTargets, 16);
    return () => clearInterval(interval);
  }, [wheelEffect, activePowerups]);

  // Wind effect
  useEffect(() => {
    if (wheelEffect?.id === 'windy') {
      const interval = setInterval(() => {
        setWindOffset({
          x: (Math.random() - 0.5) * 30,
          y: (Math.random() - 0.5) * 15,
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [wheelEffect]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0 || gameEndedRef.current) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          gameEndedRef.current = true;
          setTimeout(() => {
            const cleared = isBoss ? roundScore >= bossTargetScore : true;
            onRoundEnd(roundScore, cleared);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, roundScore, isBoss, bossTargetScore, onRoundEnd]);

  // Check game end conditions
  useEffect(() => {
    if (darts <= 0 && !gameEndedRef.current) {
      gameEndedRef.current = true;
      setTimeout(() => {
        const cleared = isBoss ? roundScore >= bossTargetScore : true;
        onRoundEnd(roundScore, cleared);
      }, 500);
    }
  }, [darts, roundScore, isBoss, bossTargetScore, onRoundEnd]);

  const handleTargetClick = useCallback((target, e) => {
    if (darts <= 0 || gameEndedRef.current) return;
    
    e.stopPropagation();
    sounds.dartThrow();
    setDarts(prev => prev - 1);

    // Rubber darts = no score
    if (wheelEffect?.id === 'rubber') {
      setHitEffects(prev => [...prev, { id: Date.now(), x: target.x, y: target.y, text: 'BOUNCE!', color: '#ef4444' }]);
      return;
    }

    // Lucky aim = bonus points
    const luckyBonus = wheelEffect?.id === 'lucky' ? 1.5 : 1;
    const points = Math.round(target.points * getScoreMultiplier() * luckyBonus);
    
    sounds.targetHit(points);
    setRoundScore(prev => prev + points);
    setTargets(prev => prev.filter(t => t.id !== target.id));
    
    setHitEffects(prev => [...prev, { 
      id: Date.now(), 
      x: target.x, 
      y: target.y, 
      text: `+${points}`,
      color: target.type === 'luckycat' ? '#ffd93d' : '#4ade80'
    }]);
  }, [darts, wheelEffect, sounds]);

  const handleMiss = useCallback((e) => {
    if (darts <= 0 || gameEndedRef.current) return;
    
    const rect = arenaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    let x = e.clientX - rect.left + windOffset.x;
    let y = e.clientY - rect.top + windOffset.y;
    
    sounds.dartThrow();
    sounds.targetMiss();
    setDarts(prev => prev - 1);
    setHitEffects(prev => [...prev, { id: Date.now(), x, y, text: 'MISS', color: '#ef4444' }]);
  }, [darts, windOffset, sounds]);

  const handlePowerupClick = useCallback((powerup, e) => {
    e.stopPropagation();
    sounds.targetHit(100);
    setPowerups(prev => prev.filter(p => p.id !== powerup.id));
    setInventory(prev => [...prev, { ...powerup, inventoryId: Date.now() }]);
    setHitEffects(prev => [...prev, { 
      id: Date.now(), 
      x: powerup.x, 
      y: powerup.y, 
      text: 'POWERUP!',
      color: powerup.color
    }]);
  }, [sounds]);

  const activatePowerup = useCallback((powerup) => {
    if (activePowerups[powerup.id]) return;

    sounds.buttonClick();
    setInventory(prev => prev.filter(p => p.inventoryId !== powerup.inventoryId));

    if (powerup.id === 'extra-darts') {
      setDarts(prev => prev + 5);
      setHitEffects(prev => [...prev, { 
        id: Date.now(), 
        x: window.innerWidth / 2, 
        y: 100, 
        text: '+5 DARTS!',
        color: powerup.color
      }]);
    } else {
      setActivePowerups(prev => ({ ...prev, [powerup.id]: true }));
      
      const duration = powerup.id === 'freeze-time' ? 5000 : 10000;
      setTimeout(() => {
        setActivePowerups(prev => {
          const updated = { ...prev };
          delete updated[powerup.id];
          return updated;
        });
      }, duration);
    }
  }, [activePowerups, sounds]);

  // Clean up hit effects
  useEffect(() => {
    if (hitEffects.length > 0) {
      const timer = setTimeout(() => {
        setHitEffects(prev => prev.slice(1));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [hitEffects]);

  const EffectIcon = EFFECT_ICONS[wheelEffect?.id] || Sparkles;

  return (
    <div className="min-h-screen flex flex-col">
      {/* HUD */}
      <div className="bg-gradient-to-b from-indigo-950 to-transparent p-4">
        <div className="max-w-4xl mx-auto">
          {/* Top row */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-4">
              <div className="bg-purple-900/60 backdrop-blur px-4 py-2 rounded-xl border border-purple-500/30">
                <div className="text-purple-300 text-xs">LEVEL</div>
                <div className="text-2xl font-black text-white">{level}</div>
              </div>
              
              <div className="bg-purple-900/60 backdrop-blur px-4 py-2 rounded-xl border border-purple-500/30 flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-pink-400" />
                <div>
                  <div className="text-purple-300 text-xs">DARTS</div>
                  <div className="text-2xl font-black text-white">{darts}</div>
                </div>
              </div>
              
              <div className="bg-purple-900/60 backdrop-blur px-4 py-2 rounded-xl border border-purple-500/30 flex items-center gap-2">
                <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-teal-400'}`} />
                <div>
                  <div className="text-purple-300 text-xs">TIME</div>
                  <div className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="bg-purple-900/60 backdrop-blur px-4 py-2 rounded-xl border border-purple-500/30">
                <div className="text-purple-300 text-xs">ROUND SCORE</div>
                <div className="text-2xl font-black text-yellow-400">{roundScore.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Second row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-purple-900/40 backdrop-blur px-3 py-1.5 rounded-lg border border-purple-500/20">
                <EffectIcon className="w-4 h-4" style={{ color: wheelEffect?.color || '#a78bfa' }} />
                <span className="text-sm font-semibold text-purple-200">{wheelEffect?.name || 'No Effect'}</span>
              </div>
              
              {/* Active powerup indicators */}
              {activePowerups['freeze-time'] && (
                <div className="flex items-center gap-1 bg-cyan-900/60 px-2 py-1 rounded-lg border border-cyan-500/30 animate-pulse">
                  <Snowflake className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs text-cyan-300 font-medium">FREEZE</span>
                </div>
              )}
              {activePowerups['score-boost'] && (
                <div className="flex items-center gap-1 bg-amber-900/60 px-2 py-1 rounded-lg border border-amber-500/30 animate-pulse">
                  <TrendingUp className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-amber-300 font-medium">2X SCORE</span>
                </div>
              )}
            </div>

            <div className="text-purple-300 text-sm">
              Total: <span className="text-white font-bold">{(totalScore + roundScore).toLocaleString()}</span>
            </div>
          </div>

          {/* Powerup Inventory */}
          {inventory.length > 0 && (
            <div className="mt-3 flex justify-center gap-2">
              {inventory.map((powerup) => (
                <motion.button
                  key={powerup.inventoryId}
                  onClick={() => activatePowerup(powerup)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative group"
                  disabled={activePowerups[powerup.id]}
                >
                  <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
                    activePowerups[powerup.id] 
                      ? 'border-gray-600 bg-gray-800/50 opacity-50 cursor-not-allowed'
                      : 'border-purple-400 bg-purple-900/60 hover:bg-purple-800/80 cursor-pointer'
                  }`}
                    style={{ boxShadow: `0 0 20px ${powerup.color}40` }}
                  >
                    {powerup.emoji}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    <div className="bg-black/90 text-white text-xs px-2 py-1 rounded">
                      {powerup.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Boss target score */}
          {isBoss && (
            <div className="mt-3 text-center">
              <div className="inline-block bg-gradient-to-r from-red-900/60 to-orange-900/60 backdrop-blur px-6 py-2 rounded-xl border border-red-500/30">
                <div className="text-red-300 text-xs">⚔️ BOSS TARGET SCORE ⚔️</div>
                <div className="text-2xl font-black text-red-400">{bossTargetScore.toLocaleString()}</div>
                <div className="h-2 bg-red-900/50 rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-500 to-orange-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (roundScore / bossTargetScore) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Game Arena */}
      <div 
        ref={arenaRef}
        onClick={handleMiss}
        className={`flex-1 relative overflow-hidden ${getCrosshairStyle()}`}
        style={{
          background: 'radial-gradient(ellipse at center, #312e81 0%, #1e1b4b 50%, #0f0d24 100%)',
        }}
      >
        {/* Custom Crosshair */}
        {settings.crosshair !== 'default' && (
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="fixed w-8 h-8 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-2xl font-bold text-white opacity-70"
              style={{ 
                left: 'var(--mouse-x, 50%)', 
                top: 'var(--mouse-y, 50%)',
                filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.8))',
              }}
              ref={(el) => {
                if (el) {
                  const parent = el.parentElement.parentElement;
                  parent.addEventListener('mousemove', (e) => {
                    const rect = parent.getBoundingClientRect();
                    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  });
                }
              }}
            >
              {settings.crosshair === 'dot' && '•'}
              {settings.crosshair === 'cross' && '+'}
              {settings.crosshair === 'circle' && '◯'}
            </div>
          </div>
        )}
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        {/* Boss level dramatic effect */}
        {isBoss && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-red-900/30 to-transparent" />
          </div>
        )}

        {/* Targets */}
        <AnimatePresence>
          {targets.map((target) => (
            <motion.div
              key={target.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: target.isPaused || activePowerups['freeze-time'] ? 1.1 : 1, 
                opacity: 1,
                x: target.x,
                y: target.y,
              }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              onClick={(e) => handleTargetClick(target, e)}
              className="absolute cursor-pointer select-none"
              style={{ 
                width: target.size, 
                height: target.size,
                marginLeft: -target.size / 2,
                marginTop: -target.size / 2,
              }}
            >
              <div className={`w-full h-full flex items-center justify-center transition-transform hover:scale-110 ${target.isPaused || activePowerups['freeze-time'] ? 'animate-bounce' : ''} ${settings.targetSkin === 'ghibli' ? '' : 'text-4xl md:text-5xl'}`}
                style={{ 
                  filter: activePowerups['freeze-time'] ? 'drop-shadow(0 0 15px rgba(6,182,212,0.8))' : 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
                  ...(settings.targetSkin === 'bubble' && { 
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent)',
                    borderRadius: '50%',
                  })
                }}
              >
                {renderTargetVisual(target)}
              </div>
              {target.type === 'luckycat' && (
                <div className="absolute inset-0 animate-ping">
                  <div className="w-full h-full rounded-full bg-yellow-400/30" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Powerups */}
        <AnimatePresence>
          {powerups.map((powerup) => (
            <motion.div
              key={powerup.id}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: 1,
                rotate: 360,
                x: powerup.x,
                y: powerup.y,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
              onClick={(e) => handlePowerupClick(powerup, e)}
              className="absolute cursor-pointer select-none"
              style={{ 
                width: 70, 
                height: 70,
                marginLeft: -35,
                marginTop: -35,
              }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${powerup.color}40` }} />
                <div 
                  className="absolute inset-0 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg"
                  style={{ 
                    backgroundColor: `${powerup.color}60`,
                    border: `3px solid ${powerup.color}`,
                    boxShadow: `0 0 30px ${powerup.color}`
                  }}
                >
                  {powerup.emoji}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Hit effects */}
        <AnimatePresence>
          {hitEffects.map((effect) => (
            <motion.div
              key={effect.id}
              initial={{ scale: 0.5, opacity: 1, y: 0 }}
              animate={{ scale: 1.2, opacity: 0, y: -40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute pointer-events-none font-black text-2xl"
              style={{ 
                left: effect.x, 
                top: effect.y,
                color: effect.color,
                textShadow: `0 0 10px ${effect.color}`,
              }}
            >
              {effect.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Wind indicator */}
        {wheelEffect?.id === 'windy' && (
          <div className="absolute bottom-4 left-4 bg-purple-900/60 backdrop-blur px-3 py-2 rounded-lg border border-purple-500/30 flex items-center gap-2">
            <Wind className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-sm font-medium">Wind Active</span>
          </div>
        )}
      </div>
    </div>
  );
}