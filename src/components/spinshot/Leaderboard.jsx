import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Award, Crown, Calendar, Filter, User } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useSounds } from './useSounds';

export default function Leaderboard({ onBack }) {
  const sounds = useSounds();
  const [scores, setScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  useEffect(() => {
    loadScores();
    loadUser();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [scores, filterLevel, filterDate]);

  const loadUser = async () => {
    try {
      const user = await base44.auth.me();
      setCurrentUser(user);
    } catch (error) {
      console.log('User not authenticated');
    }
  };

  const loadScores = async () => {
    try {
      setLoading(true);
      const allScores = await base44.entities.Score.list('-total_score', 100);
      setScores(allScores);
    } catch (error) {
      console.error('Failed to load scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...scores];

    // Filter by level
    if (filterLevel !== 'all') {
      filtered = filtered.filter(s => s.level_reached === parseInt(filterLevel));
    }

    // Filter by date
    if (filterDate !== 'all') {
      const now = new Date();
      filtered = filtered.filter(s => {
        const scoreDate = new Date(s.game_date);
        const daysDiff = Math.floor((now - scoreDate) / (1000 * 60 * 60 * 24));
        
        if (filterDate === 'today') return daysDiff === 0;
        if (filterDate === 'week') return daysDiff <= 7;
        if (filterDate === 'month') return daysDiff <= 30;
        return true;
      });
    }

    // Sort by score
    filtered.sort((a, b) => b.total_score - a.total_score);
    setFilteredScores(filtered);

    // Calculate user rank
    if (currentUser) {
      const userScores = filtered.filter(s => s.created_by === currentUser.email);
      if (userScores.length > 0) {
        const bestUserScore = userScores[0];
        const rank = filtered.findIndex(s => s.id === bestUserScore.id) + 1;
        setUserRank({ rank, score: bestUserScore });
      } else {
        setUserRank(null);
      }
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Crown className="w-6 h-6 text-yellow-400" fill="currentColor" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />;
    if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="text-purple-400 font-bold">#{index + 1}</span>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-black text-center mb-8"
          style={{
            background: 'linear-gradient(135deg, #ffd93d 0%, #ff6b9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🏆 LEADERBOARD
        </motion.h1>

        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 bg-purple-900/40 backdrop-blur border border-purple-500/20 rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-purple-300" />
            <span className="text-purple-200 font-semibold">Filters</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-purple-800/60 text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400"
            >
              <option value="all">All Levels</option>
              {[1, 2, 3, 4, 5].map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
            
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-purple-800/60 text-white px-4 py-2 rounded-lg border border-purple-500/30 focus:outline-none focus:border-purple-400"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </motion.div>

        {/* My Rank Section */}
        {userRank && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 bg-gradient-to-r from-pink-900/60 to-purple-900/60 backdrop-blur border-2 border-pink-500/50 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-pink-400" />
                <div>
                  <div className="text-pink-300 text-sm font-medium">Your Best Rank</div>
                  <div className="text-2xl font-black text-white">#{userRank.rank}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-pink-300 text-sm">Score</div>
                <div className="text-2xl font-bold text-yellow-400">{userRank.score.total_score.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-pink-300 text-sm">Level</div>
                <div className="text-xl font-bold text-white">{userRank.score.level_reached}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Leaderboard List */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-900/40 backdrop-blur border border-purple-500/20 rounded-2xl p-4 mb-6"
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <div className="text-purple-300">Loading scores...</div>
            </div>
          ) : filteredScores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
              <div className="text-purple-300">No scores yet. Be the first!</div>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {filteredScores.slice(0, 50).map((score, index) => {
                  const isCurrentUser = currentUser && score.created_by === currentUser.email;
                  return (
                    <motion.div
                      key={score.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                        isCurrentUser 
                          ? 'bg-pink-900/40 border border-pink-500/30' 
                          : 'bg-purple-800/30 hover:bg-purple-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 flex items-center justify-center">
                          {getRankIcon(index)}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold ${isCurrentUser ? 'text-pink-300' : 'text-white'}`}>
                            {score.player_name || score.created_by?.split('@')[0] || 'Anonymous'}
                            {isCurrentUser && <span className="ml-2 text-xs text-pink-400">(You)</span>}
                          </div>
                          <div className="text-xs text-purple-400 flex items-center gap-2">
                            <span>Level {score.level_reached}</span>
                            <span>•</span>
                            <Calendar className="w-3 h-3 inline" />
                            <span>{formatDate(score.game_date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${
                          index === 0 ? 'text-yellow-400' : 
                          index === 1 ? 'text-gray-300' : 
                          index === 2 ? 'text-amber-600' : 
                          'text-purple-200'
                        }`}>
                          {score.total_score.toLocaleString()}
                        </div>
                        <div className="text-xs text-purple-400">points</div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
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