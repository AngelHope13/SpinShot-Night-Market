import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Clock, Crosshair, Sparkles, Zap, Wind, Gauge, XCircle, Plus, Snowflake, TrendingUp } from 'lucide-react';
import { useSounds } from './useSounds';
import { useSettings } from './useSettings';
import { GhibliMilktea, GhibliBalloon, GhibliStinkyTofu, GhibliLuckyCat, GhibliFortuneLantern } from './GhibliTargets';

const TARGETS = [
  { type: 'milktea', emoji: '🧋', points: 100, size: 60, spawnChance: 0.25, ghibliComponent: GhibliMilktea },
  { type: 'balloon', emoji: '🎈', points: 50, size: 70, spawnChance: 0.25, ghibliComponent: GhibliBalloon },
  { type: 'stinkytofu', emoji: '🤢', points: 150, size: 65, spawnChance: 0.15, ghibliComponent: GhibliStinkyTofu, movePattern: 'zigzag' },
  { type: 'luckycat', emoji: '🐱', points: 300, size: 65, spawnChance: 0.08, ghibliComponent: GhibliLuckyCat },
  { type: 'splitter', emoji: '💫', points: 200, size: 70, spawnChance: 0.12, ghibliComponent: null, movePattern: 'spiral', splits: true },
  { type: 'trap', emoji: '💀', points: -100, size: 60, spawnChance: 0.15, ghibliComponent: null, isTrap: true },
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
  const [particles, setParticles] = useState([]);
  const [windOffset, setWindOffset] = useState({ x: 0, y: 0 });
  const [powerups, setPowerups] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [activePowerups, setActivePowerups] = useState({});
  const [screenShake, setScreenShake] = useState(0);
  const [scoreAnimation, setScoreAnimation] = useState(0);
  const [dartTrails, setDartTrails] = useState([]);
  const [impactWaves, setImpactWaves] = useState([]);
  const [projectiles, setProjectiles] = useState([]);
  const [aimPosition, setAimPosition] = useState(null);
  const arenaRef = useRef(null);
  const projectileSpeed = 200; // pixels per frame - super fast!
  const gameEndedRef = useRef(false);
  const sounds = useSounds();
  const { settings } = useSettings();

  const renderTargetVisual = (target) => {
    if (settings.targetSkin === 'ghibli' && target.ghibliComponent) {
      const Component = target.ghibliComponent;
      return <Component />;
    }
    
    const emojiMap = {
      default: { milktea: '🧋', balloon: '🎈', stinkytofu: '🤢', luckycat: '🐱', fortunelantern: '🏮', splitter: '💫', trap: '💀' },
      kawaii: { milktea: '🥤', balloon: '🎀', stinkytofu: '😋', luckycat: '😻', fortunelantern: '🎏', splitter: '⭐', trap: '👻' },
      pixel: { milktea: '🟫', balloon: '🔴', stinkytofu: '🟢', luckycat: '🟡', fortunelantern: '🟠', splitter: '🔵', trap: '⬛' },
      minimal: { milktea: '⚪', balloon: '⚫', stinkytofu: '⭕', luckycat: '✨', fortunelantern: '⭕', splitter: '◆', trap: '✕' },
      bubble: { milktea: '🫧', balloon: '💭', stinkytofu: '🫧', luckycat: '✨', fortunelantern: '💭', splitter: '🫧', trap: '💭' },
    };
    return emojiMap[settings.targetSkin]?.[target.type] || target.emoji;
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
        movePattern: selectedTarget.movePattern || 'normal',
        patternTime: 0,
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

        let newX = target.x;
        let newY = target.y;
        let newDir = { ...target.direction };
        const patternTime = (target.patternTime || 0) + 0.05;

        // Apply movement patterns
        if (target.movePattern === 'zigzag') {
          const zigzagOffset = Math.sin(patternTime * 3) * 15;
          newX = target.x + target.direction.x * speed + zigzagOffset;
          newY = target.y + target.direction.y * speed;
        } else if (target.movePattern === 'spiral') {
          const spiralRadius = 3;
          const spiralSpeed = 2;
          newX = target.x + target.direction.x * speed + Math.cos(patternTime * spiralSpeed) * spiralRadius;
          newY = target.y + target.direction.y * speed + Math.sin(patternTime * spiralSpeed) * spiralRadius;
        } else {
          newX = target.x + target.direction.x * speed;
          newY = target.y + target.direction.y * speed;
        }

        const padding = 40;
        if (newX < padding || newX > rect.width - padding) {
          newDir.x *= -1;
          newX = Math.max(padding, Math.min(rect.width - padding, newX));
        }
        if (newY < padding || newY > rect.height - padding) {
          newDir.y *= -1;
          newY = Math.max(padding, Math.min(rect.height - padding, newY));
        }

        return { ...target, x: newX, y: newY, direction: newDir, patternTime };
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

  const createParticles = useCallback((x, y, color, count = 15) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + Math.random() + i,
      x,
      y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 2,
      color,
      size: Math.random() * 6 + 3,
      life: 1,
    }));
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const triggerScreenShake = useCallback((intensity = 1) => {
    setScreenShake(intensity);
    setTimeout(() => setScreenShake(0), 200);
  }, []);

  const checkCollision = useCallback((projX, projY, target) => {
    const distance = Math.sqrt(
      Math.pow(projX - target.x, 2) + Math.pow(projY - target.y, 2)
    );
    return distance < (target.size / 2 + 15); // 15px collision buffer for better accuracy
  }, []);

  const handleProjectileHit = useCallback((projectile, hitTargets) => {
    // Create impact wave
    setImpactWaves(prev => [...prev, {
      id: Date.now(),
      x: projectile.x,
      y: projectile.y,
    }]);
    setTimeout(() => setImpactWaves(prev => prev.slice(1)), 600);

    let totalPoints = 0;
    const targetIds = [];
    const splitTargetsToAdd = [];

    hitTargets.forEach(target => {

      // Rubber darts = no score
      if (wheelEffect?.id === 'rubber') {
        createParticles(projectile.x, projectile.y, '#ef4444', 8);
        return;
      }

      // Trap target - penalty!
      if (target.isTrap) {
        sounds.targetMiss();
        triggerScreenShake(2);
        createParticles(projectile.x, projectile.y, '#dc2626', 20);
        setDarts(prev => Math.max(0, prev - 2));
        setRoundScore(prev => Math.max(0, prev - 50));
        targetIds.push(target.id);
        setHitEffects(prev => [...prev, { 
          id: Date.now() + Math.random(), 
          x: projectile.x, 
          y: projectile.y, 
          text: '-50 💀',
          color: '#dc2626'
        }]);
        return;
      }

      // Lucky aim = bonus points
      const luckyBonus = wheelEffect?.id === 'lucky' ? 1.5 : 1;
      const points = Math.round(target.points * getScoreMultiplier() * luckyBonus);
      
      totalPoints += points;
      targetIds.push(target.id);
      
      // Particle colors based on target type
      let particleColor = '#4ade80';
      if (target.type === 'luckycat') particleColor = '#ffd93d';
      else if (target.splits) particleColor = '#a855f7';
      else if (target.type === 'stinkytofu') particleColor = '#22c55e';
      
      createParticles(projectile.x, projectile.y, particleColor, points >= 200 ? 25 : 15);
      
      // Split target - create smaller targets
      if (target.splits) {
        splitTargetsToAdd.push(
          {
            id: Date.now() + Math.random(),
            type: 'milktea',
            emoji: '🧋',
            points: 50,
            size: 40,
            ghibliComponent: GhibliMilktea,
            x: projectile.x - 30,
            y: projectile.y - 30,
            direction: { x: -1.5, y: -1.5 },
            isPaused: false,
            pauseTimer: 0,
            movePattern: 'normal',
            patternTime: 0,
          },
          {
            id: Date.now() + Math.random() + 0.1,
            type: 'balloon',
            emoji: '🎈',
            points: 50,
            size: 40,
            ghibliComponent: GhibliBalloon,
            x: projectile.x + 30,
            y: projectile.y - 30,
            direction: { x: 1.5, y: -1.5 },
            isPaused: false,
            pauseTimer: 0,
            movePattern: 'normal',
            patternTime: 0,
          }
        );
      }
      
      setHitEffects(prev => [...prev, { 
        id: Date.now() + Math.random(), 
        x: projectile.x, 
        y: projectile.y, 
        text: target.splits ? `+${points} SPLIT!` : `+${points}`,
        color: target.type === 'luckycat' ? '#ffd93d' : target.splits ? '#a855f7' : '#4ade80',
        isLarge: points >= 200
      }]);
    });

    // Handle rubber dart bounce effect
    if (wheelEffect?.id === 'rubber') {
      setHitEffects(prev => [...prev, { 
        id: Date.now(), 
        x: projectile.x, 
        y: projectile.y, 
        text: 'BOUNCE!', 
        color: '#ef4444' 
      }]);
      setProjectiles(prev => prev.filter(p => p.id !== projectile.id));
      return;
    }

    // Update score and remove projectile
    if (totalPoints > 0) {
      sounds.targetHit(totalPoints);
      setRoundScore(prev => prev + totalPoints);
      setScoreAnimation(Date.now());
      
      // Screen shake for high value
      if (totalPoints >= 300) triggerScreenShake(3);
      else if (totalPoints >= 150) triggerScreenShake(1.5);

      // Multi-hit bonus text
      if (hitTargets.length > 1) {
        setHitEffects(prev => [...prev, { 
          id: Date.now(), 
          x: projectile.x, 
          y: projectile.y - 30, 
          text: `${hitTargets.length}x COMBO!`,
          color: '#ffd93d',
          isLarge: true
        }]);
      }
    }

    // Remove hit targets and add split targets
    setTargets(prev => [...prev.filter(t => !targetIds.includes(t.id)), ...splitTargetsToAdd]);
    setProjectiles(prev => prev.filter(p => p.id !== projectile.id));
  }, [wheelEffect, sounds, createParticles, triggerScreenShake, getScoreMultiplier]);

  const handleTargetClick = useCallback((target, e) => {
    e.stopPropagation();
    // Targets are no longer clickable, firing happens from handleMiss
  }, []);

  const handleMiss = useCallback((e) => {
    if (darts <= 0 || gameEndedRef.current) return;
    
    const rect = arenaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Starting position (center bottom of screen)
    const startX = rect.width / 2;
    const startY = rect.height - 50;
    
    // Target position with wind effect
    let targetX = e.clientX - rect.left + windOffset.x;
    let targetY = e.clientY - rect.top + windOffset.y;
    
    // Calculate trajectory
    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const vx = (dx / distance) * projectileSpeed;
    const vy = (dy / distance) * projectileSpeed;
    
    sounds.dartThrow();
    setDarts(prev => prev - 1);
    setAimPosition(null);
    
    // Create projectile
    const newProjectile = {
      id: Date.now(),
      x: startX,
      y: startY,
      vx,
      vy,
      targetX,
      targetY,
      distanceTraveled: 0,
      maxDistance: distance,
    };
    
    setProjectiles(prev => [...prev, newProjectile]);
  }, [darts, windOffset, sounds, projectileSpeed]);

  const handleMouseMove = useCallback((e) => {
    if (darts <= 0 || gameEndedRef.current) return;
    
    const rect = arenaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setAimPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [darts]);

  const handlePowerupClick = useCallback((powerup, e) => {
    e.stopPropagation();
    sounds.targetHit(100);
    createParticles(powerup.x, powerup.y, powerup.color, 20);
    setPowerups(prev => prev.filter(p => p.id !== powerup.id));
    setInventory(prev => [...prev, { ...powerup, inventoryId: Date.now() }]);
    setHitEffects(prev => [...prev, { 
      id: Date.now(), 
      x: powerup.x, 
      y: powerup.y, 
      text: 'POWERUP!',
      color: powerup.color,
      isLarge: true
    }]);
  }, [sounds, createParticles]);

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

  // Projectile movement and collision detection
  useEffect(() => {
    if (projectiles.length === 0) return;
    
    const interval = setInterval(() => {
      setProjectiles(prev => {
        const updated = [];
        
        prev.forEach(proj => {
          // Move projectile
          const newX = proj.x + proj.vx;
          const newY = proj.y + proj.vy;
          const newDistance = proj.distanceTraveled + projectileSpeed;
          
          // Check if projectile reached destination or went off screen
          if (newDistance >= proj.maxDistance || newX < 0 || newX > window.innerWidth || newY < 0 || newY > window.innerHeight) {
            // Projectile missed
            sounds.targetMiss();
            setHitEffects(prev => [...prev, { 
              id: Date.now(), 
              x: proj.targetX, 
              y: proj.targetY, 
              text: 'MISS', 
              color: '#ef4444' 
            }]);
            return; // Don't add to updated array
          }
          
          // Check collision with ALL targets (multi-hit support)
          const hitTargets = [];
          targets.forEach(target => {
            if (checkCollision(newX, newY, target)) {
              hitTargets.push(target);
            }
          });
          
          if (hitTargets.length > 0) {
            handleProjectileHit({ ...proj, x: newX, y: newY }, hitTargets);
            return; // Don't add to updated array
          }
          
          // Continue flying
          updated.push({
            ...proj,
            x: newX,
            y: newY,
            distanceTraveled: newDistance,
          });
        });
        
        return updated;
      });
    }, 16);
    
    return () => clearInterval(interval);
  }, [projectiles.length, targets, checkCollision, handleProjectileHit, sounds]);

  // Particle physics
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3, // gravity
            life: p.life - 0.02,
          }))
          .filter(p => p.life > 0)
      );
    }, 16);
    
    return () => clearInterval(interval);
  }, [particles.length]);

  const EffectIcon = EFFECT_ICONS[wheelEffect?.id] || Sparkles;

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      animate={{
        x: screenShake ? [0, -screenShake * 3, screenShake * 3, -screenShake * 2, screenShake * 2, 0] : 0,
        y: screenShake ? [0, -screenShake * 2, screenShake * 2, -screenShake, screenShake, 0] : 0,
      }}
      transition={{ duration: 0.2 }}
    >
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
              
              <motion.div 
                className="bg-purple-900/60 backdrop-blur px-4 py-2 rounded-xl border border-purple-500/30 flex items-center gap-2"
                animate={{
                  scale: [1, 0.95, 1],
                }}
                transition={{ duration: 0.2 }}
                key={darts}
              >
                <Crosshair className="w-5 h-5 text-pink-400" />
                <div>
                  <div className="text-purple-300 text-xs">DARTS</div>
                  <motion.div 
                    className="text-2xl font-black text-white"
                    animate={{
                      color: darts <= 5 ? ['#ffffff', '#ef4444', '#ffffff'] : '#ffffff',
                    }}
                    transition={{ duration: 0.5, repeat: darts <= 5 ? Infinity : 0 }}
                  >
                    {darts}
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-purple-900/60 backdrop-blur px-4 py-2 rounded-xl border border-purple-500/30 flex items-center gap-2"
                animate={{
                  scale: timeLeft <= 10 ? [1, 1.05, 1] : 1,
                }}
                transition={{ duration: 1, repeat: timeLeft <= 10 ? Infinity : 0 }}
              >
                <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-teal-400'}`} />
                <div>
                  <div className="text-purple-300 text-xs">TIME</div>
                  <div className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</div>
                </div>
              </motion.div>
            </div>

            <div className="text-right">
              <motion.div 
                className="bg-purple-900/60 backdrop-blur px-4 py-2 rounded-xl border border-purple-500/30"
                animate={{
                  scale: scoreAnimation ? [1, 1.15, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
                key={scoreAnimation}
              >
                <div className="text-purple-300 text-xs">ROUND SCORE</div>
                <motion.div 
                  className="text-2xl font-black text-yellow-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.2 }}
                  key={roundScore}
                >
                  {roundScore.toLocaleString()}
                </motion.div>
              </motion.div>
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
        onMouseMove={handleMouseMove}
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

        {/* Aiming Line */}
        {aimPosition && darts > 0 && !gameEndedRef.current && (
          <div className="absolute pointer-events-none">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="aimGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(236, 72, 153, 0.8)" />
                  <stop offset="100%" stopColor="rgba(236, 72, 153, 0.2)" />
                </linearGradient>
              </defs>
              <line
                x1={arenaRef.current?.getBoundingClientRect().width / 2}
                y1={(arenaRef.current?.getBoundingClientRect().height || 0) - 50}
                x2={aimPosition.x + windOffset.x}
                y2={aimPosition.y + windOffset.y}
                stroke="url(#aimGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
              />
              {/* Aim dots along the line */}
              {[0.25, 0.5, 0.75].map((ratio, i) => {
                const startX = (arenaRef.current?.getBoundingClientRect().width || 0) / 2;
                const startY = (arenaRef.current?.getBoundingClientRect().height || 0) - 50;
                const endX = aimPosition.x + windOffset.x;
                const endY = aimPosition.y + windOffset.y;
                const dotX = startX + (endX - startX) * ratio;
                const dotY = startY + (endY - startY) * ratio;
                return (
                  <circle
                    key={i}
                    cx={dotX}
                    cy={dotY}
                    r="3"
                    fill="rgba(236, 72, 153, 0.8)"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                );
              })}
            </svg>
          </div>
        )}

        {/* Flying Projectiles (Darts) */}
        <AnimatePresence>
          {projectiles.map((proj) => {
            const angle = Math.atan2(proj.vy, proj.vx) * 180 / Math.PI;
            return (
              <motion.div
                key={proj.id}
                className="absolute pointer-events-none top-0 left-0"
                style={{
                  width: 32,
                  height: 32,
                  willChange: 'transform',
                }}
                animate={{
                  x: proj.x - 16,
                  y: proj.y - 16,
                  rotate: angle,
                }}
                transition={{
                  type: "tween",
                  ease: "linear",
                  duration: 0,
                }}
              >
                {/* Dart visual */}
                <svg viewBox="0 0 32 32" className="w-full h-full">
                  <defs>
                    <linearGradient id={`dartGrad-${proj.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <filter id={`dartGlow-${proj.id}`}>
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Dart tip (sharp point) */}
                  <path d="M 2 16 L 12 16 L 16 14 L 16 18 L 12 16 Z" fill="#fbbf24" filter={`url(#dartGlow-${proj.id})`} />
                  {/* Dart body */}
                  <rect x="12" y="14" width="10" height="4" fill={`url(#dartGrad-${proj.id})`} filter={`url(#dartGlow-${proj.id})`} />
                  {/* Dart fins */}
                  <path d="M 22 12 L 28 10 L 22 14 Z" fill="#ec4899" opacity="0.8" />
                  <path d="M 22 18 L 28 22 L 22 18 Z" fill="#a855f7" opacity="0.8" />
                </svg>
                {/* Trail effect */}
                <div 
                  className="absolute top-1/2 right-full w-24 h-1 -translate-y-1/2"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(251,207,232,0.6), rgba(168,85,247,0.4))',
                    boxShadow: '0 0 10px rgba(251,207,232,0.5)',
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Impact Waves */}
        <AnimatePresence>
          {impactWaves.map((wave) => (
            <motion.div
              key={wave.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute pointer-events-none rounded-full border-4 border-white"
              style={{
                left: wave.x,
                top: wave.y,
                width: 40,
                height: 40,
                marginLeft: -20,
                marginTop: -20,
                boxShadow: '0 0 20px rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </AnimatePresence>

        {/* Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ scale: 1 }}
              animate={{ 
                scale: 0,
                x: particle.x,
                y: particle.y,
                opacity: particle.life,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.05 }}
              className="absolute pointer-events-none rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 10px ${particle.color}`,
                marginLeft: -particle.size / 2,
                marginTop: -particle.size / 2,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Targets */}
        <AnimatePresence>
          {targets.map((target) => (
            <motion.div
              key={target.id}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{ 
                scale: target.isPaused || activePowerups['freeze-time'] ? 1.1 : 1, 
                opacity: 1,
                x: target.x,
                y: target.y,
                rotate: target.movePattern === 'spiral' ? [0, 360] : 0,
              }}
              exit={{ 
                scale: [1, 1.3, 0],
                opacity: [1, 1, 0],
                rotate: target.splits ? 180 : 0,
              }}
              transition={{ 
                type: 'spring', 
                damping: 15,
                exit: { duration: 0.4 },
                rotate: target.movePattern === 'spiral' ? { duration: 2, repeat: Infinity, ease: "linear" } : {}
              }}
              className="absolute select-none pointer-events-none"
              style={{ 
                width: target.size, 
                height: target.size,
                marginLeft: -target.size / 2,
                marginTop: -target.size / 2,
              }}
            >
              <div className={`w-full h-full flex items-center justify-center transition-transform hover:scale-110 ${target.isPaused || activePowerups['freeze-time'] ? 'animate-bounce' : ''} ${settings.targetSkin === 'ghibli' ? '' : 'text-4xl md:text-5xl'} ${target.isTrap ? 'animate-pulse' : ''}`}
                style={{ 
                  filter: activePowerups['freeze-time'] ? 'drop-shadow(0 0 15px rgba(6,182,212,0.8))' : target.isTrap ? 'drop-shadow(0 0 15px rgba(220,38,38,0.8))' : 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
                  ...(settings.targetSkin === 'bubble' && { 
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent)',
                    borderRadius: '50%',
                  }),
                  ...(target.isTrap && {
                    background: 'radial-gradient(circle, rgba(220,38,38,0.3), transparent)',
                    borderRadius: '50%',
                  }),
                  ...(target.splits && {
                    background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent)',
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
              initial={{ scale: 0, opacity: 0, rotate: 0, y: -20 }}
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: 1,
                rotate: 360,
                y: [0, -10, 0],
                x: powerup.x,
              }}
              exit={{ 
                scale: [1, 1.5, 0],
                opacity: [1, 1, 0],
                y: -30,
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                exit: { duration: 0.5 }
              }}
              onClick={(e) => handlePowerupClick(powerup, e)}
              className="absolute cursor-pointer select-none"
              style={{ 
                width: 70, 
                height: 70,
                left: 0,
                top: powerup.y,
                marginLeft: -35,
                marginTop: -35,
              }}
            >
              <div className="relative w-full h-full">
                <motion.div 
                  className="absolute inset-0 rounded-full" 
                  style={{ backgroundColor: `${powerup.color}40` }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
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
              initial={{ scale: 0.3, opacity: 1, y: 0, rotate: -10 }}
              animate={{ 
                scale: effect.isLarge ? [1, 1.5, 1.3] : [1, 1.3, 1.2],
                opacity: [1, 1, 0],
                y: -50,
                rotate: 10,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.7, times: [0, 0.3, 1] }}
              className={`absolute pointer-events-none font-black ${effect.isLarge ? 'text-4xl' : 'text-2xl'}`}
              style={{ 
                left: effect.x, 
                top: effect.y,
                color: effect.color,
                textShadow: `0 0 20px ${effect.color}, 0 0 40px ${effect.color}`,
                filter: `drop-shadow(0 0 10px ${effect.color})`,
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
      </motion.div>
      );
      }