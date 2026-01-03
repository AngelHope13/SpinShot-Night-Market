import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Target, Trophy } from 'lucide-react';
import { useSounds } from './useSounds';
import { GhibliMilktea, GhibliBalloon, GhibliLuckyCat, GhibliStinkyTofu, GhibliFortuneLantern, GhibliSplitter, GhibliTrap, GhibliOysterOmelet, GhibliShavedIce, GhibliFriedChicken, GhibliBubbleTea, GhibliSquid, GhibliSignboard } from './GhibliTargets';

const StepCard = ({ number, icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-purple-900/40 backdrop-blur border border-purple-500/20 rounded-2xl p-6 text-center"
  >
    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30">
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div className="text-pink-400 font-bold text-sm mb-1">STEP {number}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-purple-300 text-sm">{description}</p>
  </motion.div>
);

const TargetInfo = ({ component: Component, emoji, name, description, points, delay }) => (
  <motion.div
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay, duration: 0.4 }}
    className="flex items-center gap-4 bg-purple-900/30 backdrop-blur rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all"
  >
    <div className="w-16 h-16 flex items-center justify-center text-4xl">
      {Component ? <Component /> : emoji}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-white text-lg">{name}</h4>
      <p className="text-purple-300 text-sm">{description}</p>
    </div>
    <div className="text-right">
      <div className="text-yellow-400 font-bold text-2xl">+{points}</div>
      <div className="text-purple-400 text-xs">points</div>
    </div>
  </motion.div>
);

export default function HowToPlay({ onBack, onContinue }) {
  const sounds = useSounds();
  const targets = [
    { component: GhibliMilktea, name: 'Milk Tea', description: 'Smooth movement with short pauses', points: 100 },
    { component: GhibliBalloon, name: 'Balloon', description: 'Easy target, slow with longer pauses', points: 50 },
    { component: GhibliLuckyCat, name: 'Lucky Cat', description: 'Rare bonus target with high points!', points: 300 },
    { component: GhibliStinkyTofu, name: 'Stinky Tofu', description: 'Erratic movement, risk-reward target', points: 150 },
    { component: GhibliSplitter, name: 'Splitter', description: 'Splits into 2 smaller targets when hit', points: 200 },
    { component: GhibliTrap, name: 'Trap', description: 'AVOID! Costs 2 darts & -50 points', points: -100 },
    { component: GhibliOysterOmelet, name: 'Oyster Omelet', description: 'Requires 2 hits to break', points: 250 },
    { component: GhibliShavedIce, name: 'Shaved Ice', description: 'Freezes all targets for 3s', points: 200 },
    { component: GhibliFriedChicken, name: 'Fried Chicken', description: 'Greasy! 40% chance to deflect', points: 180 },
    { component: GhibliBubbleTea, name: 'Bubble Tea', description: 'Instant +50 score bonus', points: 150 },
    { component: GhibliSquid, name: 'Squid Stick', description: 'Fast wavy movement', points: 280 },
    { component: GhibliSignboard, name: 'Signboard', description: 'Grants Lucky Aim buff for 5s', points: 400 },
    { component: GhibliFortuneLantern, name: 'Fortune Lantern (Boss)', description: 'Level 5 only - slow, steady, very high points', points: 500 },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
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
          HOW TO PLAY
        </motion.h1>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <StepCard 
            number={1} 
            icon={RotateCcw} 
            title="Spin the Wheel"
            description="Spin is mandatory every round. Get buffs or curses!"
            delay={0.2}
          />
          <StepCard 
            number={2} 
            icon={Target} 
            title="Throw Darts"
            description="Click on moving targets before time or darts run out"
            delay={0.3}
          />
          <StepCard 
            number={3} 
            icon={Trophy} 
            title="Clear Levels"
            description="Beat all 5 levels and defeat the Fortune Boss!"
            delay={0.4}
          />
        </div>

        {/* Target Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-pink-400" />
            Target Guide
          </h2>
          <div className="space-y-3">
            {targets.map((target, i) => (
              <TargetInfo key={target.name} {...target} delay={0.6 + i * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4 justify-center"
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
          
          <motion.button
            onClick={() => {
              sounds.buttonClick();
              onContinue();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-400 rounded-xl font-bold text-white shadow-lg shadow-pink-500/30 flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}