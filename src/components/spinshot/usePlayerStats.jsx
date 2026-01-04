import { useState, useEffect, useCallback } from 'react';

export const usePlayerStats = () => {
  const [stats, setStats] = useState({
    totalDarts: 0,
    hits: 0,
    misses: 0,
    accuracy: 0,
    totalScore: 0,
    avgScorePerDart: 0,
    highValueHits: 0, // 200+ points
    trapHits: 0,
    bestStreak: 0,
    currentStreak: 0,
    recentTrend: 'stable',
    dartHistory: [], // Last 20 throws
  });

  // Load stats from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('spinshot-player-stats');
    if (saved) {
      try {
        setStats(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load player stats:', e);
      }
    }
  }, []);

  // Save stats to localStorage
  const saveStats = useCallback((newStats) => {
    localStorage.setItem('spinshot-player-stats', JSON.stringify(newStats));
    setStats(newStats);
  }, []);

  const recordDartThrow = useCallback((result) => {
    setStats(prev => {
      const newDartHistory = [...prev.dartHistory, result].slice(-20);
      const newTotalDarts = prev.totalDarts + 1;
      const newHits = result.hit ? prev.hits + 1 : prev.hits;
      const newMisses = result.hit ? prev.misses : prev.misses + 1;
      const newAccuracy = Math.round((newHits / newTotalDarts) * 100);
      const newTotalScore = prev.totalScore + (result.points || 0);
      const newAvgScore = Math.round(newTotalScore / newTotalDarts);
      const newHighValueHits = result.points >= 200 ? prev.highValueHits + 1 : prev.highValueHits;
      const newTrapHits = result.isTrap ? prev.trapHits + 1 : prev.trapHits;
      
      const newCurrentStreak = result.hit ? prev.currentStreak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newCurrentStreak);

      // Calculate trend (last 10 throws)
      const recent10 = newDartHistory.slice(-10);
      const recentHits = recent10.filter(d => d.hit).length;
      let newTrend = 'stable';
      if (recentHits >= 8) newTrend = 'improving';
      else if (recentHits <= 4) newTrend = 'declining';

      const newStats = {
        totalDarts: newTotalDarts,
        hits: newHits,
        misses: newMisses,
        accuracy: newAccuracy,
        totalScore: newTotalScore,
        avgScorePerDart: newAvgScore,
        highValueHits: newHighValueHits,
        trapHits: newTrapHits,
        bestStreak: newBestStreak,
        currentStreak: newCurrentStreak,
        recentTrend: newTrend,
        dartHistory: newDartHistory,
      };

      saveStats(newStats);
      return newStats;
    });
  }, [saveStats]);

  const resetStats = useCallback(() => {
    const initialStats = {
      totalDarts: 0,
      hits: 0,
      misses: 0,
      accuracy: 0,
      totalScore: 0,
      avgScorePerDart: 0,
      highValueHits: 0,
      trapHits: 0,
      bestStreak: 0,
      currentStreak: 0,
      recentTrend: 'stable',
      dartHistory: [],
    };
    saveStats(initialStats);
  }, [saveStats]);

  return {
    stats,
    recordDartThrow,
    resetStats,
  };
};