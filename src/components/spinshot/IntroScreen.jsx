import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, HelpCircle, Users, Settings, Trophy } from 'lucide-react';
import { useSounds } from './useSounds';


const Lantern = ({ delay, x }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%` }}
    initial={{ y: -20, opacity: 0 }}
    animate={{ 
      y: [0, 15, 0],
      opacity: [0.6, 1, 0.6],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div className="w-8 h-10 md:w-12 md:h-14 bg-gradient-to-b from-orange-400 to-red-500 rounded-full relative shadow-lg shadow-orange-500/50">
      <div className="absolute inset-1 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-full opacity-80" />
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-amber-800 rounded-t" />
    </div>
  </motion.div>
);

const NeonGlow = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px]" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-[80px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
  </div>
);

export default function IntroScreen({ onStart, onHowToPlay, onCredits, onSettings, onLeaderboard }) {
  const [particles, setParticles] = useState([]);
  const sounds = useSounds();

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <NeonGlow />
      
      {/* Floating Lanterns */}
      <div className="absolute top-8 w-full">
        {[10, 25, 45, 65, 85].map((x, i) => (
          <Lantern key={i} x={x} delay={i * 0.5} />
        ))}
      </div>

      {/* Sparkle particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{ left: `${p.x}%` }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Main Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-black tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #ff6b9d 0%, #ffd93d 50%, #6bcbff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(255, 107, 157, 0.5)',
          }}
        >
          SPINSHOT
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-purple-200 mt-2 tracking-wide">
            Night Market Mayhem
          </h2>
          <p className="text-sm md:text-base text-purple-300/80 mt-3 font-medium">
            ✨ Philippine Peryahan × Taiwanese Night Market ✨
          </p>
        </motion.div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-12 flex flex-col gap-4 z-10"
      >
        <motion.button
          onClick={() => {
            sounds.buttonClick();
            onStart();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 rounded-2xl font-bold text-lg text-white shadow-xl shadow-pink-500/30 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Play className="w-6 h-6" fill="currentColor" />
            START GAME
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-300"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.button
          onClick={() => {
            sounds.buttonClick();
            onLeaderboard();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-2xl font-bold text-white shadow-xl shadow-yellow-500/30 flex items-center justify-center gap-2"
        >
          <Trophy className="w-5 h-5" />
          LEADERBOARD
        </motion.button>

        <div className="grid grid-cols-3 gap-3">
          <motion.button
            onClick={() => {
              sounds.buttonClick();
              onHowToPlay();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-purple-800/50 backdrop-blur border border-purple-500/30 rounded-xl font-semibold text-purple-200 hover:bg-purple-700/50 transition-colors flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="hidden sm:inline">HOW TO PLAY</span>
          </motion.button>

          <motion.button
            onClick={() => {
              sounds.buttonClick();
              onSettings();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-purple-800/50 backdrop-blur border border-purple-500/30 rounded-xl font-semibold text-purple-200 hover:bg-purple-700/50 transition-colors flex items-center justify-center gap-2"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">SETTINGS</span>
          </motion.button>



          <motion.button
            onClick={() => {
              sounds.buttonClick();
              onCredits();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-purple-800/50 backdrop-blur border border-purple-500/30 rounded-xl font-semibold text-purple-200 hover:bg-purple-700/50 transition-colors flex items-center justify-center gap-2"
          >
            <Users className="w-5 h-5" />
            <span className="hidden sm:inline">CREDITS</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-950 to-transparent" />
    </div>
  );
}