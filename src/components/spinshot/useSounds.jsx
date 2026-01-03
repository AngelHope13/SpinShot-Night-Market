import { useCallback, useRef, useEffect } from 'react';
import { useSettings } from './useSettings';

export const useSounds = () => {
  const audioContextRef = useRef(null);
  const settingsContextRef = useRef(null);
  const musicIntervalsRef = useRef([]);
  const musicOscillatorsRef = useRef([]);

  // Try to get settings, but don't fail if not available
  try {
    settingsContextRef.current = useSettings();
  } catch (e) {
    // Settings context not available
  }

  useEffect(() => {
    // Initialize AudioContext on mount
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Background music - Upbeat arcade-style energetic track
  useEffect(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;

    if (!ctx || !settings?.musicEnabled) {
      // Stop all music
      musicIntervalsRef.current.forEach(clearInterval);
      musicIntervalsRef.current = [];
      musicOscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      musicOscillatorsRef.current = [];
      return;
    }

    const musicVolume = (settings.musicVolume || 0.5) * 0.08;

    // Fast-paced, energetic arcade melody
    const melody = [
      { freq: 659.25, time: 0, duration: 0.2 },      // E5
      { freq: 659.25, time: 0.25, duration: 0.2 },   // E5
      { freq: 783.99, time: 0.5, duration: 0.2 },    // G5
      { freq: 987.77, time: 0.75, duration: 0.3 },   // B5
      { freq: 880.00, time: 1.1, duration: 0.2 },    // A5
      { freq: 783.99, time: 1.35, duration: 0.2 },   // G5
      { freq: 659.25, time: 1.6, duration: 0.3 },    // E5
      { freq: 523.25, time: 2.0, duration: 0.2 },    // C5
      { freq: 587.33, time: 2.25, duration: 0.2 },   // D5
      { freq: 659.25, time: 2.5, duration: 0.2 },    // E5
      { freq: 783.99, time: 2.75, duration: 0.4 },   // G5
    ];

    // Bass line for rhythm
    const bass = [
      { freq: 130.81, time: 0, duration: 0.4 },      // C3
      { freq: 146.83, time: 0.5, duration: 0.4 },    // D3
      { freq: 164.81, time: 1.0, duration: 0.4 },    // E3
      { freq: 130.81, time: 1.5, duration: 0.4 },    // C3
      { freq: 196.00, time: 2.0, duration: 0.4 },    // G3
      { freq: 164.81, time: 2.5, duration: 0.4 },    // E3
    ];

    // Arpeggio for texture
    const arp = [
      { freq: 523.25, time: 0, duration: 0.15 },
      { freq: 659.25, time: 0.15, duration: 0.15 },
      { freq: 783.99, time: 0.3, duration: 0.15 },
      { freq: 659.25, time: 0.45, duration: 0.15 },
      { freq: 523.25, time: 0.75, duration: 0.15 },
      { freq: 659.25, time: 0.9, duration: 0.15 },
      { freq: 783.99, time: 1.05, duration: 0.15 },
      { freq: 659.25, time: 1.2, duration: 0.15 },
      { freq: 523.25, time: 1.5, duration: 0.15 },
      { freq: 659.25, time: 1.65, duration: 0.15 },
      { freq: 783.99, time: 1.8, duration: 0.15 },
      { freq: 659.25, time: 1.95, duration: 0.15 },
      { freq: 523.25, time: 2.25, duration: 0.15 },
      { freq: 659.25, time: 2.4, duration: 0.15 },
      { freq: 783.99, time: 2.55, duration: 0.15 },
      { freq: 659.25, time: 2.7, duration: 0.15 },
    ];

    const playMusicLoop = () => {
      const startTime = ctx.currentTime;
      const oscillators = [];

      // Melody (bright and forward)
      melody.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'square';
        osc.frequency.value = note.freq;
        
        gain.gain.setValueAtTime(0, startTime + note.time);
        gain.gain.linearRampToValueAtTime(musicVolume * 0.5, startTime + note.time + 0.02);
        gain.gain.setValueAtTime(musicVolume * 0.5, startTime + note.time + note.duration - 0.05);
        gain.gain.linearRampToValueAtTime(0, startTime + note.time + note.duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime + note.time);
        osc.stop(startTime + note.time + note.duration);
        oscillators.push(osc);
      });

      // Bass (punchy and rhythmic)
      bass.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.value = note.freq;
        
        gain.gain.setValueAtTime(0, startTime + note.time);
        gain.gain.linearRampToValueAtTime(musicVolume * 0.4, startTime + note.time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + note.time + note.duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime + note.time);
        osc.stop(startTime + note.time + note.duration);
        oscillators.push(osc);
      });

      // Arpeggio (subtle background texture)
      arp.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = note.freq;
        
        gain.gain.setValueAtTime(0, startTime + note.time);
        gain.gain.linearRampToValueAtTime(musicVolume * 0.15, startTime + note.time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + note.time + note.duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime + note.time);
        osc.stop(startTime + note.time + note.duration);
        oscillators.push(osc);
      });

      musicOscillatorsRef.current = oscillators;
    };

    // Start music immediately
    playMusicLoop();

    // Loop every 3 seconds for faster-paced feel
    const interval = setInterval(playMusicLoop, 3000);
    musicIntervalsRef.current.push(interval);

    return () => {
      musicIntervalsRef.current.forEach(clearInterval);
      musicIntervalsRef.current = [];
      musicOscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      musicOscillatorsRef.current = [];
    };
  }, [settingsContextRef.current?.settings?.musicEnabled, settingsContextRef.current?.settings?.musicVolume]);

  const playTone = useCallback((frequency, duration, type = 'sine', volume = 0.3) => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const adjustedVolume = settings ? volume * settings.soundVolume : volume;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    
    gainNode.gain.setValueAtTime(adjustedVolume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, []);

  const dartThrow = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.2;

    // Sharp whoosh sound
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  }, []);

  const targetHit = useCallback((points = 100) => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.25;
    const basePitch = points > 200 ? 900 : points > 100 ? 700 : 550;
    
    // Magical sparkle hit sound
    [basePitch, basePitch * 1.3, basePitch * 1.6].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.04);
      gainNode.gain.setValueAtTime(volume * (1 - i * 0.2), startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.12);
    });

    // Extra chime for high-value targets
    if (points >= 200) {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.value = basePitch * 2;
        gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      }, 120);
    }
  }, []);

  const targetMiss = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.2;

    // Sad descending tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }, []);

  const buttonClick = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.25;

    // Crisp button click with two tones
    [1000, 1200].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.03);
      gainNode.gain.setValueAtTime(volume * (1 - i * 0.3), startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.06);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.06);
    });
  }, []);

  const wheelSpin = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.15;
    
    // Magical spinning sound that rises
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 1.8);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(volume, ctx.currentTime + 1.5);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 1.8);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.8);
  }, []);

  const wheelStop = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.25;

    // Magical "click" with shimmer
    [900, 1200, 1500, 1800].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.05);
      gainNode.gain.setValueAtTime(volume * (1 - i * 0.15), startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  }, []);

  const levelComplete = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.28;

    // Triumphant ascending melody with sparkle
    const melody = [523.25, 659.25, 783.99, 1046.50];
    melody.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.13);
      const duration = i === melody.length - 1 ? 0.4 : 0.2;
      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });

    // Add magical sparkle
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.value = 1568;
      gain.gain.setValueAtTime(volume * 0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    }, 500);
  }, []);

  const levelFailed = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Descending sad tones
    const melody = [440, 392, 349, 311];
    melody.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.15);
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  }, []);

  const victory = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Epic victory theme
    const melody = [523.25, 659.25, 783.99, 1046.50, 1046.50, 1046.50];
    melody.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'triangle';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.15);
      const duration = i >= 3 ? 0.5 : 0.2;
      gainNode.gain.setValueAtTime(0.25, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
  }, []);

  return {
    dartThrow,
    targetHit,
    targetMiss,
    buttonClick,
    wheelSpin,
    wheelStop,
    levelComplete,
    levelFailed,
    victory,
  };
};