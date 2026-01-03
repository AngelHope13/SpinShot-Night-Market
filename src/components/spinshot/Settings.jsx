import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sun, Moon, Zap, Sunset, Volume2, VolumeX, Sparkles, Circle, Square } from 'lucide-react';
import { useSounds } from './useSounds';
import { useSettings } from './useSettings';

const themes = [
  { id: 'night', name: 'Night Market', icon: Moon, gradient: 'from-indigo-950 via-purple-950 to-violet-950' },
  { id: 'day', name: 'Daytime Market', icon: Sun, gradient: 'from-sky-400 via-blue-300 to-cyan-200' },
  { id: 'neon', name: 'Neon Nights', icon: Zap, gradient: 'from-purple-900 via-pink-800 to-fuchsia-900' },
  { id: 'sunset', name: 'Sunset Fair', icon: Sunset, gradient: 'from-orange-600 via-red-500 to-pink-600' },
];

const dartTrails = [
  { id: 'classic', name: 'Classic', description: 'Simple and clean' },
  { id: 'sparkle', name: 'Sparkle', description: 'Magical sparkles' },
  { id: 'glow', name: 'Glow Trail', description: 'Glowing path' },
  { id: 'none', name: 'None', description: 'No trail' },
];

const targetSkins = [
  { id: 'default', name: 'Default', emoji: '🧋' },
  { id: 'kawaii', name: 'Kawaii', emoji: '🥰' },
  { id: 'pixel', name: 'Pixel Art', emoji: '🟦' },
  { id: 'minimal', name: 'Minimal', emoji: '⭕' },
];

export default function Settings({ onBack }) {
  const sounds = useSounds();
  const { settings, updateSettings } = useSettings();

  return (
    <div className="min-h-screen p-4 md:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-black text-center mb-8"
          style={{
            background: 'linear-gradient(135deg, #ff6b9d 0%, #ffd93d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          SETTINGS
        </motion.h1>

        {/* Theme Selection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            Background Theme
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => {
                  sounds.buttonClick();
                  updateSettings({ theme: theme.id });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  settings.theme === theme.id
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/30'
                    : 'border-purple-500/30 hover:border-purple-400'
                }`}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${theme.gradient} opacity-80`} />
                <div className="relative z-10">
                  <theme.icon className="w-8 h-8 mx-auto mb-2 text-white" />
                  <div className="text-white font-semibold text-sm">{theme.name}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sound Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-purple-900/40 backdrop-blur border border-purple-500/20 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-pink-400" /> : <VolumeX className="w-5 h-5 text-pink-400" />}
            Sound Effects
          </h2>
          
          {/* Toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-purple-200">Enable Sound</span>
            <motion.button
              onClick={() => {
                updateSettings({ soundEnabled: !settings.soundEnabled });
              }}
              whileTap={{ scale: 0.95 }}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                settings.soundEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                animate={{ left: settings.soundEnabled ? '28px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>

          {/* Volume Slider */}
          {settings.soundEnabled && (
            <div>
              <div className="flex justify-between text-purple-200 text-sm mb-2">
                <span>Volume</span>
                <span>{Math.round(settings.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.soundVolume * 100}
                onChange={(e) => updateSettings({ soundVolume: e.target.value / 100 })}
                className="w-full h-2 bg-purple-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>
          )}
        </motion.div>

        {/* Dart Trail Effects */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-pink-400" />
            Dart Trail Effect
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dartTrails.map((trail) => (
              <motion.button
                key={trail.id}
                onClick={() => {
                  sounds.buttonClick();
                  updateSettings({ dartTrail: trail.id });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all bg-purple-900/40 backdrop-blur ${
                  settings.dartTrail === trail.id
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/30'
                    : 'border-purple-500/30 hover:border-purple-400'
                }`}
              >
                <div className="text-white font-semibold mb-1">{trail.name}</div>
                <div className="text-purple-300 text-xs">{trail.description}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Target Skins */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Circle className="w-5 h-5 text-pink-400" />
            Target Style
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {targetSkins.map((skin) => (
              <motion.button
                key={skin.id}
                onClick={() => {
                  sounds.buttonClick();
                  updateSettings({ targetSkin: skin.id });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all bg-purple-900/40 backdrop-blur ${
                  settings.targetSkin === skin.id
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/30'
                    : 'border-purple-500/30 hover:border-purple-400'
                }`}
              >
                <div className="text-4xl mb-2">{skin.emoji}</div>
                <div className="text-white font-semibold text-sm">{skin.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={() => {
              sounds.buttonClick();
              onBack();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-purple-800/50 backdrop-blur border border-purple-500/30 rounded-xl font-semibold text-purple-200 hover:bg-purple-700/50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}