import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, XCircle, ArrowRight, RotateCcw, Home, Star } from 'lucide-react';
import { useSounds } from './useSounds';

export default function RoundResults({ level, roundScore, totalScore, cleared, isBossLevel, xpGained, currentXp, xpRequired, leveledUp, onNextLevel, onRetry, onMenu }) {
  const sounds = useSounds();

  useEffect(() => {
    if (cleared) {
      sounds.levelComplete();
    } else {
      sounds.levelFailed();
    }
  }, [cleared, sounds]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-purple-900/50 backdrop-blur-lg border border-purple-500/30 rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
      >
        {/* Background glow */}
        <div className={`absolute inset-0 ${cleared ? 'bg-gradient-to-br from-green-500/10 to-teal-500/10' : 'bg-gradient-to-br from-red-500/10 to-orange-500/10'}`} />
        
        {/* Celebration particles for cleared */}
        {cleared && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#ffd93d', '#ff6b9d', '#6bcbff', '#4ade80'][i % 4],
                  left: `${10 + (i * 7)}%`,
                }}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: '100vh', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10">
          {/* Status Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              cleared ? 'bg-gradient-to-br from-green-400 to-teal-500' : 'bg-gradient-to-br from-red-400 to-orange-500'
            } shadow-xl`}
          >
            {cleared ? (
              <Trophy className="w-10 h-10 text-white" />
            ) : (
              <XCircle className="w-10 h-10 text-white" />
            )}
          </motion.div>

          {/* Status Text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className={`text-3xl font-black mb-2 ${cleared ? 'text-green-400' : 'text-red-400'}`}>
              {cleared ? (isBossLevel ? 'BOSS DEFEATED!' : 'LEVEL CLEARED!') : 'LEVEL FAILED'}
            </h2>
            <p className="text-purple-300">Level {level}</p>
          </motion.div>

          {/* Scores */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 space-y-4"
          >
            <div className="bg-purple-800/40 rounded-xl p-4">
              <div className="text-purple-300 text-sm mb-1">Round Score</div>
              <div className="text-4xl font-black text-yellow-400 flex items-center justify-center gap-2">
                <Star className="w-6 h-6" fill="currentColor" />
                {roundScore.toLocaleString()}
              </div>
            </div>

            <div className="bg-purple-800/40 rounded-xl p-4">
              <div className="text-purple-300 text-sm mb-1">Total Score</div>
              <div className="text-3xl font-bold text-white">{totalScore.toLocaleString()}</div>
            </div>
          </motion.div>

          {/* XP Gained */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <div className="bg-purple-900/40 backdrop-blur border border-purple-500/30 rounded-xl px-6 py-4">
              <div className="text-purple-300 text-sm mb-2">EXPERIENCE GAINED</div>
              <motion.div 
                className="text-3xl font-black text-cyan-400 mb-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                +{xpGained} XP
              </motion.div>
              
              {level < 5 && (
                <>
                  <div className="flex justify-between text-xs text-purple-300 mb-2">
                    <span>Level {level}</span>
                    <span>{currentXp} / {xpRequired} XP</span>
                  </div>
                  <div className="h-4 bg-purple-900/50 rounded-full overflow-hidden border border-purple-500/30">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (currentXp / xpRequired) * 100)}%` }}
                      transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                      style={{
                        boxShadow: '0 0 15px rgba(236, 72, 153, 0.6)',
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
          
          {/* Level Up Notification */}
          {leveledUp && (
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8, delay: 1 }}
              className="mt-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 rounded-xl px-6 py-4 border-4 border-yellow-300"
              style={{
                boxShadow: '0 0 30px rgba(234, 179, 8, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-center"
              >
                <div className="text-4xl font-black text-white mb-1">
                  🎉 LEVEL UP! 🎉
                </div>
                <div className="text-xl font-bold text-yellow-100">
                  You reached Level {level}!
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-3"
          >
            {cleared ? (
              <motion.button
                onClick={() => {
                  sounds.buttonClick();
                  onNextLevel();
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-400 rounded-xl font-bold text-lg text-white shadow-xl shadow-green-500/30 flex items-center justify-center gap-2"
              >
                {isBossLevel ? 'CLAIM VICTORY' : 'NEXT LEVEL'}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.button
                onClick={() => {
                  sounds.buttonClick();
                  onRetry();
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-400 rounded-xl font-bold text-lg text-white shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                RETRY LEVEL
              </motion.button>
            )}

            <motion.button
              onClick={() => {
                sounds.buttonClick();
                onMenu();
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-6 py-3 bg-purple-800/50 backdrop-blur border border-purple-500/30 rounded-xl font-semibold text-purple-200 hover:bg-purple-700/50 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Menu
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}