import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sun, Moon, Zap, Sunset, Volume2, VolumeX, Sparkles, Circle, Square, Target, GraduationCap } from 'lucide-react';
import { useSounds } from './useSounds';
import { useSettings } from './useSettings';

const themes = [
  { id: 'night', name: 'Night Market', icon: Moon, gradient: 'from-indigo-950 via-purple-950 to-violet-950' },
  { id: 'day', name: 'Daytime Market', icon: Sun, gradient: 'from-sky-400 via-blue-300 to-cyan-200' },
  { id: 'neon', name: 'Neon Nights', icon: Zap, gradient: 'from-purple-900 via-pink-800 to-fuchsia-900' },
  { id: 'sunset', name: 'Sunset Fair', icon: Sunset, gradient: 'from-orange-600 via-red-500 to-pink-600' },
  { id: 'retro', name: 'Retro Arcade', icon: Square, gradient: 'from-purple-950 via-indigo-900 to-blue-950' },
  { id: 'festival', name: 'Lantern Festival', icon: Sparkles, gradient: 'from-red-900 via-orange-800 to-yellow-700' },
];

const dartTrails = [
  { id: 'classic', name: 'Classic', description: 'Simple and clean' },
  { id: 'sparkle', name: 'Sparkle', description: 'Magical sparkles' },
  { id: 'glow', name: 'Glow Trail', description: 'Glowing path' },
  { id: 'neon', name: 'Neon Glow', description: 'Bright neon streak' },
  { id: 'none', name: 'None', description: 'No trail' },
];

const targetSkins = [
  { id: 'default', name: 'Default', emoji: '🧋' },
  { id: 'kawaii', name: 'Kawaii', emoji: '🥰' },
  { id: 'pixel', name: 'Pixel Art', emoji: '🟦' },
  { id: 'minimal', name: 'Minimal', emoji: '⭕' },
  { id: 'bubble', name: 'Bubble Pop', emoji: '🫧' },
  { id: 'ghibli', name: 'Studio Ghibli', emoji: '🌿' },
];

const crosshairs = [
  { id: 'default', name: 'Default', icon: '✕' },
  { id: 'dot', name: 'Dot', icon: '•' },
  { id: 'cross', name: 'Cross', icon: '+' },
  { id: 'circle', name: 'Circle', icon: '◯' },
];

export default function Settings({ onBack, onStartTutorial }) {
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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

          {/* Volume Sliders */}
          {settings.soundEnabled && (
            <>
              <div>
                <div className="flex justify-between text-purple-200 text-sm mb-2">
                  <span>Sound Effects</span>
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
              
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-200 text-sm">Background Music</span>
                  <motion.button
                    onClick={() => updateSettings({ musicEnabled: !settings.musicEnabled })}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      settings.musicEnabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-lg"
                      animate={{ left: settings.musicEnabled ? '24px' : '2px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>
                {settings.musicEnabled && (
                  <div className="flex justify-between text-purple-200 text-sm mb-2">
                    <span>Music Volume</span>
                    <span>{Math.round(settings.musicVolume * 100)}%</span>
                  </div>
                )}
                {settings.musicEnabled && (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.musicVolume * 100}
                    onChange={(e) => updateSettings({ musicVolume: e.target.value / 100 })}
                    className="w-full h-2 bg-purple-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                )}
              </div>
            </>
          )}
        </motion.div>



        {/* Aim Assist Setting */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 bg-purple-900/40 backdrop-blur border border-purple-500/20 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-pink-400" />
            Aim Assist
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-purple-200 block">Enable Aim Assist</span>
              <span className="text-purple-400 text-xs">Darts snap to nearby targets</span>
            </div>
            <motion.button
              onClick={() => {
                sounds.buttonClick();
                updateSettings({ aimAssistEnabled: !settings.aimAssistEnabled });
              }}
              whileTap={{ scale: 0.95 }}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                settings.aimAssistEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <motion.div
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                animate={{ left: settings.aimAssistEnabled ? '28px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Tutorial Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 bg-purple-900/40 backdrop-blur border border-purple-500/20 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-yellow-400" />
            Tutorial
          </h2>
          <p className="text-purple-200 text-sm mb-4">
            Need a refresher? Replay the interactive tutorial to learn game mechanics.
          </p>
          <motion.button
            onClick={() => {
              sounds.buttonClick();
              onStartTutorial?.();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold text-white shadow-lg"
          >
            Start Tutorial
          </motion.button>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
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