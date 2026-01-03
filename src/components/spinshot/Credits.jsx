import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { useSounds } from './useSounds';

export default function Credits({ onBack }) {
  const sounds = useSounds();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-purple-900/40 backdrop-blur border border-purple-500/20 rounded-3xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
          <h1 className="text-3xl font-black mb-6"
            style={{
              background: 'linear-gradient(135deg, #ff6b9d 0%, #ffd93d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CREDITS
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 text-purple-200"
        >
          <div>
            <h3 className="text-pink-400 font-bold mb-1">Game Design & Development</h3>
            <p>SpinShot Team</p>
          </div>
          
          <div>
            <h3 className="text-pink-400 font-bold mb-1">Inspired By</h3>
            <p>Philippine Peryahan Fairs</p>
            <p>Taiwanese Night Markets</p>
          </div>
          
          <div>
            <h3 className="text-pink-400 font-bold mb-1">Built With</h3>
            <p>React & Framer Motion</p>
          </div>

          <div className="pt-4 border-t border-purple-500/20">
            <p className="flex items-center justify-center gap-2 text-sm">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> for arcade lovers
            </p>
          </div>
        </motion.div>

        <motion.button
          onClick={() => {
            sounds.buttonClick();
            onBack();
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 bg-purple-800/50 backdrop-blur border border-purple-500/30 rounded-xl font-semibold text-purple-200 hover:bg-purple-700/50 transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </motion.button>
      </motion.div>
    </div>
  );
}