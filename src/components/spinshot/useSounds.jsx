import { useCallback, useRef, useEffect } from 'react';
import { useSettings } from './useSettings';

export const useSounds = () => {
  const audioContextRef = useRef(null);
  const settingsContextRef = useRef(null);
  const musicAudioRef = useRef(null);
  const soundBuffersRef = useRef({});

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
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current = null;
      }
    };
  }, []);

  // Background music - HTML5 Audio (supports MP3/OGG files)
  useEffect(() => {
    const settings = settingsContextRef.current?.settings;

    if (!settings?.musicEnabled) {
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current.currentTime = 0;
      }
      return;
    }

    // You can replace this URL with your own music file
    // For now, using a data URI placeholder (silence) - replace with actual file
    const musicUrl = null; // Set to your music file URL: '/path/to/music.mp3'

    if (!musicUrl) {
      console.log('No background music file configured. Add your music file URL to useSounds.jsx');
      return;
    }

    if (!musicAudioRef.current) {
      musicAudioRef.current = new Audio(musicUrl);
      musicAudioRef.current.loop = true;
    }

    const volume = settings.musicVolume || 0.5;
    musicAudioRef.current.volume = volume;
    
    const playPromise = musicAudioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play was prevented, user needs to interact first
      });
    }

    return () => {
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
      }
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

    const volume = (settings?.soundVolume || 0.7) * 0.18;

    // Enhanced whoosh with multiple layers
    const noise = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    noise.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    noise.frequency.setValueAtTime(800, ctx.currentTime);
    noise.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
    
    noiseGain.gain.setValueAtTime(volume, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + 0.1);

    // Add a "punch" to the throw
    const punch = ctx.createOscillator();
    const punchGain = ctx.createGain();
    punch.connect(punchGain);
    punchGain.connect(ctx.destination);
    
    punch.type = 'sine';
    punch.frequency.value = 100;
    punchGain.gain.setValueAtTime(volume * 0.8, ctx.currentTime);
    punchGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    punch.start(ctx.currentTime);
    punch.stop(ctx.currentTime + 0.05);
  }, []);

  const targetHit = useCallback((points = 100) => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.28;
    const basePitch = points > 200 ? 1100 : points > 100 ? 850 : 650;
    
    // Impact sound
    const impact = ctx.createOscillator();
    const impactGain = ctx.createGain();
    impact.connect(impactGain);
    impactGain.connect(ctx.destination);
    impact.type = 'sine';
    impact.frequency.value = 150;
    impactGain.gain.setValueAtTime(volume * 0.6, ctx.currentTime);
    impactGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    impact.start(ctx.currentTime);
    impact.stop(ctx.currentTime + 0.08);
    
    // Sparkle cascade
    [basePitch, basePitch * 1.25, basePitch * 1.5, basePitch * 2].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'sine';
      filter.type = 'bandpass';
      filter.frequency.value = freq;
      filter.Q.value = 5;
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.035);
      gain.gain.setValueAtTime(volume * (1 - i * 0.15), startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });

    // Extra resonance for high-value targets
    if (points >= 200) {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.value = basePitch * 2.5;
        gain.gain.setValueAtTime(volume * 0.6, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      }, 100);
    }
  }, []);

  const targetMiss = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.22;

    // Descending "miss" tones with slight dissonance
    [400, 320, 240].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.06);
      gain.gain.setValueAtTime(volume * (1 - i * 0.25), startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.12);
      
      osc.start(startTime);
      osc.stop(startTime + 0.12);
    });

    // Dull thud
    const thud = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thud.connect(thudGain);
    thudGain.connect(ctx.destination);
    thud.type = 'sine';
    thud.frequency.value = 80;
    thudGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
    thudGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    thud.start(ctx.currentTime);
    thud.stop(ctx.currentTime + 0.1);
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

    const volume = (settings?.soundVolume || 0.7) * 0.16;
    
    // Mechanical spin with doppler effect
    const spin1 = ctx.createOscillator();
    const spin2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    spin1.type = 'sawtooth';
    spin2.type = 'square';
    filter.type = 'lowpass';
    
    spin1.connect(gain);
    spin2.connect(gain);
    gain.connect(filter);
    filter.connect(ctx.destination);
    
    spin1.frequency.setValueAtTime(180, ctx.currentTime);
    spin1.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 1.5);
    
    spin2.frequency.setValueAtTime(90, ctx.currentTime);
    spin2.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 1.5);
    
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 1.5);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(volume, ctx.currentTime + 1.3);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 1.8);
    
    spin1.start(ctx.currentTime);
    spin2.start(ctx.currentTime);
    spin1.stop(ctx.currentTime + 1.8);
    spin2.stop(ctx.currentTime + 1.8);
  }, []);

  const wheelStop = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.28;

    // Mechanical clunk
    const clunk = ctx.createOscillator();
    const clunkGain = ctx.createGain();
    clunk.connect(clunkGain);
    clunkGain.connect(ctx.destination);
    clunk.type = 'sine';
    clunk.frequency.value = 120;
    clunkGain.gain.setValueAtTime(volume * 0.7, ctx.currentTime);
    clunkGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    clunk.start(ctx.currentTime);
    clunk.stop(ctx.currentTime + 0.1);

    // Magical shimmer cascade
    [1000, 1300, 1650, 2100].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'sine';
      filter.type = 'bandpass';
      filter.frequency.value = freq;
      filter.Q.value = 8;
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + 0.08 + (i * 0.04);
      gain.gain.setValueAtTime(volume * (1 - i * 0.12), startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }, []);

  const levelComplete = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.3;

    // Triumphant fanfare with harmonics
    const melody = [523.25, 659.25, 783.99, 1046.50];
    melody.forEach((freq, i) => {
      // Main note
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.12);
      const duration = i === melody.length - 1 ? 0.45 : 0.22;
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);

      // Harmonic overtone
      const harm = ctx.createOscillator();
      const harmGain = ctx.createGain();
      harm.connect(harmGain);
      harmGain.connect(ctx.destination);
      harm.type = 'sine';
      harm.frequency.value = freq * 2;
      harmGain.gain.setValueAtTime(volume * 0.3, startTime);
      harmGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      harm.start(startTime);
      harm.stop(startTime + duration);
    });

    // Sparkle cascade
    setTimeout(() => {
      [1800, 2200, 2700].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = ctx.currentTime + (i * 0.05);
        gain.gain.setValueAtTime(volume * 0.5, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.25);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    }, 400);
  }, []);

  const levelFailed = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.2;

    // Descending dramatic failure
    const melody = [493, 440, 392, 349, 311];
    melody.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = 'triangle';
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.13);
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });

    // Dull thud at the end
    setTimeout(() => {
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.connect(thudGain);
      thudGain.connect(ctx.destination);
      thud.type = 'sine';
      thud.frequency.value = 60;
      thudGain.gain.setValueAtTime(volume * 0.8, ctx.currentTime);
      thudGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      thud.start(ctx.currentTime);
      thud.stop(ctx.currentTime + 0.2);
    }, 600);
  }, []);

  const victory = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.3;

    // Epic multi-layered victory fanfare
    const melody = [523.25, 659.25, 783.99, 1046.50, 1046.50, 1046.50];
    melody.forEach((freq, i) => {
      // Main melody
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + (i * 0.14);
      const duration = i >= 3 ? 0.55 : 0.22;
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);

      // Harmony layer
      const harm = ctx.createOscillator();
      const harmGain = ctx.createGain();
      harm.connect(harmGain);
      harmGain.connect(ctx.destination);
      harm.type = 'triangle';
      harm.frequency.value = freq * 1.5;
      harmGain.gain.setValueAtTime(volume * 0.4, startTime);
      harmGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      harm.start(startTime);
      harm.stop(startTime + duration);
    });

    // Celebratory shimmer
    setTimeout(() => {
      [2000, 2500, 3000, 3500].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = ctx.currentTime + (i * 0.04);
        gain.gain.setValueAtTime(volume * 0.4, start);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.3);
        osc.start(start);
        osc.stop(start + 0.3);
      });
    }, 700);
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