import React, { useState, useCallback } from 'react';
import IntroScreen from '@/components/spinshot/IntroScreen';
import HowToPlay from '@/components/spinshot/HowToPlay';
import WheelOfFate from '@/components/spinshot/WheelOfFate';
import GameplayArena from '@/components/spinshot/GameplayArena';
import RoundResults from '@/components/spinshot/RoundResults';
import GameOver from '@/components/spinshot/GameOver';
import Victory from '@/components/spinshot/Victory';
import Credits from '@/components/spinshot/Credits';

const INITIAL_STATE = {
  screen: 'intro',
  level: 1,
  totalScore: 0,
  lives: 3,
  roundScore: 0,
  wheelEffect: null,
  roundCleared: false,
};

export default function SpinShot() {
  const [gameState, setGameState] = useState(INITIAL_STATE);

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
    setGameState(prev => ({
      ...prev,
      screen: 'results',
      roundScore,
      roundCleared: cleared,
      totalScore: prev.totalScore + roundScore,
    }));
  }, []);

  const nextLevel = useCallback(() => {
    if (gameState.level >= 5 && gameState.roundCleared) {
      setGameState(prev => ({ ...prev, screen: 'victory' }));
    } else {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        screen: 'wheel',
        wheelEffect: null,
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-violet-950 overflow-hidden">
      {gameState.screen === 'intro' && (
        <IntroScreen 
          onStart={startGame} 
          onHowToPlay={() => goToScreen('howtoplay')}
          onCredits={() => goToScreen('credits')}
        />
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
      {gameState.screen === 'wheel' && (
        <WheelOfFate 
          level={gameState.level}
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
    </div>
  );
}