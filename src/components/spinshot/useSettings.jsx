import { useState, useEffect, createContext, useContext } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: 'night', // 'night', 'day', 'neon', 'sunset', 'retro', 'festival'
    soundEnabled: true,
    soundVolume: 0.7,
    musicEnabled: true,
    musicVolume: 0.5,
    dartTrail: 'sparkle', // 'classic', 'sparkle', 'glow', 'neon', 'none'
    targetSkin: 'ghibli', // 'default', 'kawaii', 'pixel', 'minimal', 'bubble', 'ghibli'
    crosshair: 'default', // 'default', 'dot', 'cross', 'circle'
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('spinshot-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
  }, []);

  // Save to localStorage
  const updateSettings = (newSettings) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('spinshot-settings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};