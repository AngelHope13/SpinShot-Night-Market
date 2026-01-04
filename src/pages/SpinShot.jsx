import React, { useState, useCallback, useEffect } from 'react';
import IntroScreen from '@/components/spinshot/IntroScreen';
import HowToPlay from '@/components/spinshot/HowToPlay';
import WheelOfFate from '@/components/spinshot/WheelOfFate';
import GameplayArena from '@/components/spinshot/GameplayArena';
import RoundResults from '@/components/spinshot/RoundResults';
import GameOver from '@/components/spinshot/GameOver';
import Victory from '@/components/spinshot/Victory';
import Credits from '@/components/spinshot/Credits';
import Settings from '@/components/spinshot/Settings';
import Leaderboard from '@/components/spinshot/Leaderboard';
import Tutorial from '@/components/spinshot/Tutorial';
import { SettingsProvider, useSettings } from '@/components/spinshot/useSettings';
import { base44 } from '@/api/base44Client';

const INITIAL_STATE = {
  screen: 'intro',
  level: 1,
  totalScore: 0,
  lives: 3,
  roundScore: 0,
  wheelEffect: null,
  roundCleared: false,
  xp: 0,
  xpGained: 0,
  leveledUp: false,
};

// XP requirements for each level
const XP_REQUIREMENTS = [
  0,     // Level 1 starts at 0
  100,   // Level 2 requires 100 XP
  250,   // Level 3 requires 250 XP
  450,   // Level 4 requires 450 XP
  700,   // Level 5 requires 700 XP (Boss)
  1000,  // Level 6+ (endless mode)
];

function SpinShotGame() {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [showTutorial, setShowTutorial] = useState(false);
  const { settings, updateSettings } = useSettings();

  // Show tutorial on first launch
  useEffect(() => {
    if (!settings.tutorialCompleted) {
      setShowTutorial(true);
    }
  }, []);

  const getXpRequirement = (lvl) => {
    if (lvl < XP_REQUIREMENTS.length) {
      return XP_REQUIREMENTS[lvl];
    }
    return XP_REQUIREMENTS[XP_REQUIREMENTS.length - 1] + (lvl - XP_REQUIREMENTS.length + 1) * 300;
  };
  
  const calculateXpGain = (score, cleared, lvl) => {
    let baseXp = Math.floor(score / 10); // 1 XP per 10 points
    if (cleared) {
      baseXp += 50; // Bonus for clearing the round
    }
    if (lvl === 5) {
      baseXp *= 2; // Double XP for boss level
    }
    return baseXp;
  };

  const goToScreen = useCallback((screen) => {
    setGameState(prev => ({ ...prev, screen }));
  }, []);

  const startGame = useCallback(() => {
    setGameState({
      ...INITIAL_STATE,
      screen: 'wheel',
    });
  }, []);

  const setWheelEffect = useCallback((effect) => {
    setGameState(prev => ({ ...prev, wheelEffect: effect }));
  }, []);

  const startRound = useCallback(() => {
    setGameState(prev => ({ ...prev, screen: 'gameplay' }));
  }, []);

  const endRound = useCallback((roundScore, cleared) => {
    setGameState(prev => {
      // Calculate XP gained
      const gainedXp = calculateXpGain(roundScore, cleared, prev.level);
      const newXp = prev.xp + gainedXp;
      const xpRequired = getXpRequirement(prev.level);
      
      // Check for level up
      let newLevel = prev.level;
      let finalXp = newXp;
      let didLevelUp = false;
      
      if (newXp >= xpRequired && prev.level < 5) {
        newLevel = prev.level + 1;
        finalXp = newXp - xpRequired; // Carry over excess XP
        didLevelUp = true;
      }
      
      return {
        ...prev,
        screen: 'results',
        roundScore,
        roundCleared: cleared,
        totalScore: prev.totalScore + roundScore,
        xp: finalXp,
        xpGained: gainedXp,
        level: newLevel,
        leveledUp: didLevelUp,
      };
    });
  }, []);

  const nextLevel = useCallback(() => {
    if (gameState.level >= 5 && gameState.roundCleared) {
      setGameState(prev => ({ ...prev, screen: 'victory' }));
    } else {
      setGameState(prev => ({
        ...prev,
        screen: 'wheel',
        wheelEffect: null,
        xpGained: 0,
        leveledUp: false,
      }));
    }
  }, [gameState.level, gameState.roundCleared]);

  const retryLevel = useCallback(() => {
    const newLives = gameState.lives - 1;
    if (newLives <= 0) {
      setGameState(prev => ({ ...prev, screen: 'gameover' }));
    } else {
      setGameState(prev => ({
        ...prev,
        lives: newLives,
        screen: 'wheel',
        wheelEffect: null,
      }));
    }
  }, [gameState.lives]);

  const playAgain = useCallback(() => {
    setGameState({ ...INITIAL_STATE, screen: 'wheel' });
  }, []);

  const backToMenu = useCallback(() => {
    setGameState(INITIAL_STATE);
  }, []);

  const startTutorial = useCallback(() => {
    setShowTutorial(true);
    setGameState(INITIAL_STATE);
  }, []);

  const completeTutorial = useCallback(() => {
    updateSettings({ tutorialCompleted: true });
  }, [updateSettings]);

  const skipTutorial = useCallback(() => {
    setShowTutorial(false);
    updateSettings({ tutorialCompleted: true });
  }, [updateSettings]);

  const themeGradients = {
    night: 'from-indigo-950 via-purple-950 to-violet-950',
    day: 'from-sky-400 via-blue-300 to-cyan-200',
    neon: 'from-purple-900 via-pink-800 to-fuchsia-900',
    sunset: 'from-orange-600 via-red-500 to-pink-600',
    retro: 'from-purple-950 via-indigo-900 to-blue-950',
    festival: 'from-red-900 via-orange-800 to-yellow-700',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${themeGradients[settings.theme]} overflow-hidden`}>
      {gameState.screen === 'intro' && (
        <IntroScreen 
          onStart={startGame} 
          onHowToPlay={() => goToScreen('howtoplay')}
          onCredits={() => goToScreen('credits')}
          onSettings={() => goToScreen('settings')}
          onLeaderboard={() => goToScreen('leaderboard')}
        />
      )}
      {gameState.screen === 'settings' && (
        <Settings onBack={backToMenu} onStartTutorial={startTutorial} />
      )}
      {gameState.screen === 'howtoplay' && (
        <HowToPlay 
          onBack={backToMenu}
          onContinue={startGame}
        />
      )}
      {gameState.screen === 'credits' && (
        <Credits onBack={backToMenu} />
      )}
      {gameState.screen === 'leaderboard' && (
        <Leaderboard onBack={backToMenu} />
      )}
      {gameState.screen === 'wheel' && (
        <WheelOfFate 
          level={gameState.level}
          currentXp={gameState.xp}
          xpRequired={getXpRequirement(gameState.level)}
          onEffectSelected={setWheelEffect}
          selectedEffect={gameState.wheelEffect}
          onStartRound={startRound}
        />
      )}
      {gameState.screen === 'gameplay' && (
        <GameplayArena 
          level={gameState.level}
          totalScore={gameState.totalScore}
          wheelEffect={gameState.wheelEffect}
          onRoundEnd={endRound}
        />
      )}
      {gameState.screen === 'results' && (
        <RoundResults 
          level={gameState.level}
          roundScore={gameState.roundScore}
          totalScore={gameState.totalScore}
          cleared={gameState.roundCleared}
          isBossLevel={gameState.level === 5}
          xpGained={gameState.xpGained}
          currentXp={gameState.xp}
          xpRequired={getXpRequirement(gameState.level)}
          leveledUp={gameState.leveledUp}
          onNextLevel={nextLevel}
          onRetry={retryLevel}
          onMenu={backToMenu}
        />
      )}
      {gameState.screen === 'gameover' && (
        <GameOver 
          totalScore={gameState.totalScore}
          levelReached={gameState.level}
          onPlayAgain={playAgain}
          onMenu={backToMenu}
        />
      )}
      {gameState.screen === 'victory' && (
        <Victory 
          totalScore={gameState.totalScore}
          onPlayAgain={playAgain}
          onMenu={backToMenu}
        />
      )}

      {/* Tutorial Overlay */}
      {showTutorial && (
        <Tutorial
          currentScreen={gameState.screen}
          onComplete={completeTutorial}
          onSkip={skipTutorial}
        />
      )}
    </div>
  );
}

export default function SpinShot() {
  return (
    <SettingsProvider>
      <SpinShotGame />
    </SettingsProvider>
  );
}