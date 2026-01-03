import { useCallback, useRef, useEffect } from 'react';
import { useSettings } from './useSettings';

export const useSounds = () => {
  const audioContextRef = useRef(null);
  const settingsContextRef = useRef(null);

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
    if (!ctx) return;

    // Whoosh sound
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }, []);

  const targetHit = useCallback((points = 100) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Higher pitch for higher points
    const basePitch = points > 200 ? 800 : points > 100 ? 600 : 500;
    
    // Two-tone hit sound
    [basePitch, basePitch * 1.5].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'square';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.05);
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.1);
    });
  }, []);

  const targetMiss = useCallback(() => {
    playTone(150, 0.15, 'sawtooth', 0.1);
  }, [playTone]);

  const buttonClick = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  }, []);

  const wheelSpin = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Spinning ratchet sound
    const duration = 0.05;
    for (let i = 0; i < 30; i++) {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'square';
      oscillator.frequency.value = 300 + (i * 10);
      
      const startTime = ctx.currentTime + (i * 0.05);
      gainNode.gain.setValueAtTime(0.1, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    }
  }, []);

  const wheelStop = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Triumphant chord
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.05);
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  }, []);

  const levelComplete = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Victory fanfare
    const melody = [523.25, 587.33, 659.25, 783.99, 880.00];
    melody.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'triangle';
      oscillator.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.12);
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
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