import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Skull, RotateCcw, Home, Star, Trophy } from 'lucide-react';
import { useSounds } from './useSounds';
import { base44 } from '@/api/base44Client';

export default function GameOver({ totalScore, levelReached, onPlayAgain, onMenu }) {
  const sounds = useSounds();

  useEffect(() => {
    saveScore();
  }, []);

  const saveScore = async () => {
    try {
      await base44.entities.Score.create({
        total_score: totalScore,
        level_reached: levelReached,
        game_date: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to save score:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-purple-900/50 backdrop-blur-lg border border-red-500/30 rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
      >
        {/* Dark overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-purple-900/20" />
        
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl shadow-red-500/30"
          >
            <Skull className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-black text-red-400 mb-2"
          >
            GAME OVER
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-purple-300"
          >
            Out of lives!
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-4"
          >
            <div className="bg-purple-800/40 rounded-xl p-4">
              <div className="text-purple-300 text-sm mb-1 flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                Total Score
              </div>
              <div className="text-4xl font-black text-yellow-400">{totalScore.toLocaleString()}</div>
            </div>

            <div className="bg-purple-800/40 rounded-xl p-4">
              <div className="text-purple-300 text-sm mb-1 flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4" />
                Level Reached
              </div>
              <div className="text-3xl font-bold text-white">{levelReached}</div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 space-y-3"
          >
            <motion.button
              onClick={() => {
                sounds.buttonClick();
                onPlayAgain();
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-xl font-bold text-lg text-white shadow-xl shadow-pink-500/30 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              PLAY AGAIN
            </motion.button>

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