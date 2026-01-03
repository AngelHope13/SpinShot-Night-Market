import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, RotateCcw, Home, Star, Sparkles } from 'lucide-react';

export default function Victory({ totalScore, onPlayAgain, onMenu }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: ['#ffd93d', '#ff6b9d', '#6bcbff', '#4ade80', '#a78bfa'][i % 5],
      size: 4 + Math.random() * 8,
    }));
    setConfetti(particles);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ 
            y: '100vh', 
            opacity: [0, 1, 1, 0],
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-yellow-900/40 to-purple-900/50 backdrop-blur-lg border border-yellow-500/30 rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden z-10"
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />

        <div className="relative z-10">
          {/* Crown Icon */}
          <motion.div
            initial={{ scale: 0, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            className="relative"
          >
            <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50">
              <Crown className="w-14 h-14 text-white" />
            </div>
            <motion.div
              className="absolute -top-2 left-1/2 -translate-x-1/2"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-black mb-2"
            style={{
              background: 'linear-gradient(135deg, #ffd93d 0%, #ff6b9d 50%, #ffd93d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            VICTORY!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-yellow-200 font-semibold"
          >
            Night Market Champion!
          </motion.p>

          {/* Score */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <div className="bg-gradient-to-br from-yellow-800/40 to-orange-800/40 rounded-2xl p-6 border border-yellow-500/30">
              <div className="text-yellow-300 text-sm mb-2 flex items-center justify-center gap-2">
                <Star className="w-4 h-4" fill="currentColor" />
                FINAL SCORE
                <Star className="w-4 h-4" fill="currentColor" />
              </div>
              <motion.div 
                className="text-5xl font-black text-yellow-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
              >
                {totalScore.toLocaleString()}
              </motion.div>
            </div>
          </motion.div>

          {/* Achievement */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-pink-500/30"
          >
            <span className="text-2xl">🏆</span>
            <span className="text-pink-300 font-semibold">Fortune Boss Defeated!</span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 space-y-3"
          >
            <motion.button
              onClick={onPlayAgain}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-xl font-bold text-lg text-white shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              PLAY AGAIN
            </motion.button>

            <motion.button
              onClick={onMenu}
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