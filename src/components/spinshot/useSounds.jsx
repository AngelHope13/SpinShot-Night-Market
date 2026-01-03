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

    // Background music URL - calm ambient music similar to Final Fantasy
    // Option 1: Use this ambient track
    const musicUrl = 'https://cdn.pixabay.com/audio/2022/05/13/audio_1e0e4c00d6.mp3';
    
    // Option 2: Upload your own MP3 file and use it like this:
    // const musicUrl = '/path/to/your-music.mp3';

    if (!settings?.musicEnabled) {
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current.currentTime = 0;
      }
      return;
    }

    if (!musicAudioRef.current) {
      const audio = new Audio(musicUrl);
      audio.loop = true;
      audio.volume = settings.musicVolume || 0.5;
      audio.preload = 'auto';
      musicAudioRef.current = audio;
      
      console.log('Background music initialized, volume:', settings.musicVolume);
      
      // Try to play immediately
      audio.play().then(() => {
        console.log('Music started playing');
      }).catch((err) => {
        console.log('Music autoplay blocked - will start on first interaction:', err.message);
      });
    } else {
      musicAudioRef.current.volume = settings.musicVolume || 0.5;
      if (musicAudioRef.current.paused && settings.musicEnabled) {
        console.log('Attempting to resume music...');
        musicAudioRef.current.play().then(() => {
          console.log('Music resumed');
        }).catch((err) => {
          console.log('Music play failed:', err.message);
        });
      }
    }
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
    // Try to start music on any user interaction
    if (musicAudioRef.current && musicAudioRef.current.paused && settingsContextRef.current?.settings?.musicEnabled) {
      console.log('Starting music from dart throw...');
      musicAudioRef.current.play().catch(() => {});
    }
    
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
    
    // Try to start background music on first user interaction
    if (musicAudioRef.current && musicAudioRef.current.paused && settings?.musicEnabled) {
      console.log('Starting music from button click...');
      musicAudioRef.current.play().then(() => {
        console.log('Music started successfully from button click!');
      }).catch((err) => {
        console.error('Failed to start music from button:', err);
      });
    }
    
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

    const volume = (settings?.soundVolume || 0.7) * 0.18;
    
    // Exciting accelerating ratchet sound
    const duration = 2.0;
    
    // Multiple layers for richness
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.type = i === 0 ? 'sawtooth' : i === 1 ? 'triangle' : 'square';
      filter.type = 'bandpass';
      filter.Q.value = 5;
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      const baseFreq = 150 + (i * 50);
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 5, ctx.currentTime + duration * 0.8);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 8, ctx.currentTime + duration);
      
      filter.frequency.setValueAtTime(600 + (i * 200), ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2500, ctx.currentTime + duration);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * (1 - i * 0.2), ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(volume * (1 - i * 0.2), ctx.currentTime + duration * 0.85);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    }
    
    // Add clicking/ticking for mechanical feel
    for (let i = 0; i < 25; i++) {
      const delay = i * 0.08 * Math.pow(0.9, i / 5);
      const click = ctx.createOscillator();
      const clickGain = ctx.createGain();
      
      click.type = 'square';
      click.frequency.value = 2000 + (i * 30);
      click.connect(clickGain);
      clickGain.connect(ctx.destination);
      
      const startTime = ctx.currentTime + delay;
      clickGain.gain.setValueAtTime(volume * 0.3, startTime);
      clickGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.02);
      
      click.start(startTime);
      click.stop(startTime + 0.02);
    }
  }, []);

  const wheelStop = useCallback(() => {
    const ctx = audioContextRef.current;
    const settings = settingsContextRef.current?.settings;
    if (!ctx || (settings && !settings.soundEnabled)) return;

    const volume = (settings?.soundVolume || 0.7) * 0.32;

    // Heavy mechanical CLUNK with resonance
    const clunk1 = ctx.createOscillator();
    const clunk2 = ctx.createOscillator();
    const clunkGain = ctx.createGain();
    const clunkFilter = ctx.createBiquadFilter();
    
    clunk1.type = 'sine';
    clunk2.type = 'triangle';
    clunkFilter.type = 'lowpass';
    clunkFilter.frequency.value = 250;
    
    clunk1.frequency.value = 80;
    clunk2.frequency.value = 120;
    
    clunk1.connect(clunkFilter);
    clunk2.connect(clunkFilter);
    clunkFilter.connect(clunkGain);
    clunkGain.connect(ctx.destination);
    
    clunkGain.gain.setValueAtTime(volume, ctx.currentTime);
    clunkGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    clunk1.start(ctx.currentTime);
    clunk2.start(ctx.currentTime);
    clunk1.stop(ctx.currentTime + 0.15);
    clunk2.stop(ctx.currentTime + 0.15);

    // Dramatic "ding" with reverb-like tail
    setTimeout(() => {
      [1200, 1800, 2400, 3000].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sine';
        filter.type = 'bandpass';
        filter.frequency.value = freq;
        filter.Q.value = 12;
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        
        const startTime = ctx.currentTime + (i * 0.03);
        gain.gain.setValueAtTime(volume * (1 - i * 0.1), startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
    }, 80);

    // Final resonant ping
    setTimeout(() => {
      const ping = ctx.createOscillator();
      const pingGain = ctx.createGain();
      ping.connect(pingGain);
      pingGain.connect(ctx.destination);
      ping.type = 'sine';
      ping.frequency.value = 1500;
      pingGain.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
      pingGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      ping.start(ctx.currentTime);
      ping.stop(ctx.currentTime + 0.6);
    }, 200);
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