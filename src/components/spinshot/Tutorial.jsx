import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useSounds } from './useSounds';

const TUTORIAL_STEPS = {
  intro: [
    {
      id: 'welcome',
      title: 'Welcome to SpinShot!',
      description: 'A fast-paced dart throwing game inspired by Philippine Peryahan and Taiwanese Night Markets. Let me show you how to play!',
      highlight: null,
      position: 'center',
    },
    {
      id: 'start-button',
      title: 'Ready to Begin?',
      description: 'Click the START GAME button to begin your adventure. You can also check the leaderboard, settings, or how to play guide anytime.',
      highlight: 'start-button',
      position: 'bottom',
    },
  ],
  wheel: [
    {
      id: 'wheel-intro',
      title: 'The Wheel of Fate',
      description: 'Before each level, you\'ll spin the wheel to get a special effect. Effects can help or challenge you!',
      highlight: 'wheel',
      position: 'center',
    },
    {
      id: 'spin-action',
      title: 'Spin the Wheel',
      description: 'Click SPIN THE WHEEL to discover your fate. You might get score multipliers (x2, x3), special conditions (Windy, Slow Motion), or challenges (Rubber Darts)!',
      highlight: 'spin-button',
      position: 'bottom',
    },
    {
      id: 'xp-bar',
      title: 'Level Progress',
      description: 'Earn XP by scoring points and clearing levels. Fill the bar to unlock the next level!',
      highlight: 'xp-bar',
      position: 'top',
    },
  ],
  gameplay: [
    {
      id: 'gameplay-intro',
      title: 'Time to Play!',
      description: 'Hit targets by clicking anywhere on the screen. Your dart will fly toward your cursor with an arc trajectory.',
      highlight: null,
      position: 'center',
    },
    {
      id: 'aim-guide',
      title: 'Aiming System',
      description: 'A line shows where your dart will go. With Aim Assist ON, the dart snaps to nearby targets (shown by a green glow). Try clicking near a target!',
      highlight: 'arena',
      position: 'top',
    },
    {
      id: 'targets',
      title: 'Different Targets',
      description: '🧋 Milk Tea (100pts), 🎈 Balloon (50pts), 🐱 Lucky Cat (300pts). Watch out for 💀 Trap targets - they cost you darts and points!',
      highlight: 'arena',
      position: 'top',
    },
    {
      id: 'resources',
      title: 'Darts & Time',
      description: 'You have limited darts and time each round. Make every shot count! Boss levels (Level 5) give you more darts and time.',
      highlight: 'hud',
      position: 'bottom',
    },
    {
      id: 'powerups',
      title: 'Powerups',
      description: 'Collect floating powerups during gameplay: 🎯 Extra Darts, ❄️ Freeze Time, ⭐ Score Boost. Click them to add to your inventory!',
      highlight: null,
      position: 'center',
    },
  ],
  results: [
    {
      id: 'results-screen',
      title: 'Round Complete!',
      description: 'See your score, XP gained, and whether you cleared the level. Clear all 5 levels to win the game!',
      highlight: null,
      position: 'center',
    },
  ],
};

export default function Tutorial({ currentScreen, onComplete, onSkip }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const sounds = useSounds();

  const steps = TUTORIAL_STEPS[currentScreen] || [];
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    setCurrentStepIndex(0);
    setDismissed(false);
  }, [currentScreen]);

  if (!currentStep || dismissed || steps.length === 0) return null;

  const handleNext = () => {
    sounds.buttonClick();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    sounds.buttonClick();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    sounds.buttonClick();
    setDismissed(true);
    onSkip?.();
  };

  const handleComplete = () => {
    sounds.buttonClick();
    setDismissed(true);
    onComplete?.();
  };

  const getPositionStyles = () => {
    switch (currentStep.position) {
      case 'top':
        return 'top-24 left-1/2 -translate-x-1/2';
      case 'bottom':
        return 'bottom-24 left-1/2 -translate-x-1/2';
      case 'center':
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
          onClick={handleNext}
        />

        {/* Tutorial card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20 }}
          className={`absolute ${getPositionStyles()} w-full max-w-md pointer-events-auto`}
        >
          <div className="mx-4 bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-xl rounded-2xl border-2 border-purple-400/50 shadow-2xl shadow-purple-500/50 overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4 border-b border-purple-400/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <h3 className="text-xl font-bold text-white">{currentStep.title}</h3>
                </div>
                <button
                  onClick={handleSkip}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-purple-300" />
                </button>
              </div>
              
              {/* Progress dots */}
              <div className="flex gap-1 mt-3">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      idx === currentStepIndex
                        ? 'bg-yellow-400'
                        : idx < currentStepIndex
                        ? 'bg-purple-400'
                        : 'bg-purple-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-purple-100 text-base leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Footer */}
            <div className="p-4 bg-purple-950/50 border-t border-purple-400/30 flex justify-between items-center">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-purple-300 hover:text-white transition-colors text-sm font-semibold"
              >
                Skip Tutorial
              </button>
              
              <div className="flex gap-2">
                {currentStepIndex > 0 && (
                  <button
                    onClick={handlePrev}
                    className="p-2 bg-purple-800/50 hover:bg-purple-700/50 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-lg font-bold text-white flex items-center gap-2 transition-all shadow-lg"
                >
                  {currentStepIndex === steps.length - 1 ? 'Got it!' : 'Next'}
                  {currentStepIndex < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Pointer arrow */}
          {currentStep.position !== 'center' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute left-1/2 -translate-x-1/2 ${
                currentStep.position === 'top' ? '-bottom-3' : '-top-3'
              }`}
            >
              <div
                className={`w-6 h-6 bg-purple-900 border-2 border-purple-400/50 ${
                  currentStep.position === 'top' ? 'rotate-45' : '-rotate-45'
                }`}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Pulsing highlight hint */}
        {currentStep.highlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 to-transparent" />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}