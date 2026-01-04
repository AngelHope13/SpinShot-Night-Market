import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, TrendingUp, Target, Award, Zap, ChevronRight } from 'lucide-react';
import { useSounds } from './useSounds';
import { base44 } from '@/api/base44Client';

export default function AICoach({ playerStats, onClose, onStartDrill }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDrill, setSelectedDrill] = useState(null);
  const sounds = useSounds();

  useEffect(() => {
    analyzePerformance();
  }, []);

  const analyzePerformance = async () => {
    setLoading(true);
    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are an AI coach for a dart throwing game called SpinShot. Analyze this player's performance data and provide personalized feedback:

Player Statistics:
- Total Darts Thrown: ${playerStats.totalDarts}
- Hits: ${playerStats.hits}
- Misses: ${playerStats.misses}
- Accuracy: ${playerStats.accuracy}%
- Average Score per Dart: ${playerStats.avgScorePerDart}
- High-Value Targets Hit: ${playerStats.highValueHits}
- Trap Targets Hit: ${playerStats.trapHits}
- Consecutive Hits Streak: ${playerStats.bestStreak}
- Recent Performance Trend: ${playerStats.recentTrend}

Based on this data, provide:
1. A brief performance summary (2-3 sentences)
2. Your TOP weakness (just one specific issue)
3. Your TOP strength (just one thing they're doing well)
4. THREE specific practice drills to improve (each with name and brief description)
5. One motivational tip

Format as JSON.`,
        response_json_schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            weakness: { type: "string" },
            strength: { type: "string" },
            drills: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  focus: { type: "string" }
                }
              }
            },
            motivation: { type: "string" }
          }
        }
      });

      setAnalysis(response);
    } catch (error) {
      console.error('AI Coach analysis failed:', error);
      setAnalysis({
        summary: "Keep practicing! Every throw gets you closer to mastery.",
        weakness: "Focus on timing your throws when targets are near the center.",
        strength: "You have great dedication and consistent play style!",
        drills: [
          { name: "Center Focus", description: "Only aim for targets in the center third of the screen", focus: "accuracy" },
          { name: "Speed Challenge", description: "Hit 10 targets as fast as possible", focus: "speed" },
          { name: "Combo Master", description: "Get 5 consecutive hits without missing", focus: "consistency" }
        ],
        motivation: "Every champion was once a beginner. Keep throwing!"
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-500/20">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-purple-300 text-sm">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950 rounded-3xl border-2 border-purple-400/50 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-900/95 to-indigo-900/95 backdrop-blur-xl p-6 border-b border-purple-400/30 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">AI Performance Coach</h2>
                <p className="text-purple-300 text-sm">Personalized analysis & training</p>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.buttonClick();
                onClose();
              }}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-purple-300" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Your Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={Target} label="Accuracy" value={`${playerStats.accuracy}%`} color="text-cyan-400" />
              <StatCard icon={Zap} label="Avg Score" value={playerStats.avgScorePerDart} color="text-yellow-400" />
              <StatCard icon={Award} label="Best Streak" value={playerStats.bestStreak} color="text-green-400" />
              <StatCard icon={TrendingUp} label="Total Darts" value={playerStats.totalDarts} color="text-pink-400" />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-purple-500 border-t-pink-500 rounded-full mx-auto mb-4"
              />
              <p className="text-purple-300">AI is analyzing your performance...</p>
            </div>
          ) : analysis && (
            <>
              {/* Performance Summary */}
              <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Performance Analysis
                </h3>
                <p className="text-purple-100 leading-relaxed">{analysis.summary}</p>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-5">
                  <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Your Strength
                  </h4>
                  <p className="text-green-100 text-sm">{analysis.strength}</p>
                </div>
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-5">
                  <h4 className="font-bold text-orange-400 mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Area to Improve
                  </h4>
                  <p className="text-orange-100 text-sm">{analysis.weakness}</p>
                </div>
              </div>

              {/* Practice Drills */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Recommended Practice Drills
                </h3>
                <div className="space-y-3">
                  {analysis.drills.map((drill, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        sounds.buttonClick();
                        setSelectedDrill(drill);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                        selectedDrill?.name === drill.name
                          ? 'bg-purple-800/50 border-purple-400'
                          : 'bg-purple-900/30 border-purple-500/30 hover:border-purple-400/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-bold text-white">{drill.name}</span>
                            <span className="px-2 py-1 bg-purple-600/50 rounded text-xs text-purple-200">
                              {drill.focus}
                            </span>
                          </div>
                          <p className="text-purple-300 text-sm">{drill.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0 ml-3" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Motivation */}
              <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-xl p-5 border border-pink-500/30">
                <p className="text-pink-100 italic text-center">💪 {analysis.motivation}</p>
              </div>

              {/* Action Button */}
              {selectedDrill && (
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() => {
                    sounds.buttonClick();
                    onStartDrill(selectedDrill);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold text-white text-lg shadow-lg"
                >
                  Start {selectedDrill.name} Drill
                </motion.button>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}