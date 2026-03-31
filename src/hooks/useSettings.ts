import { useState, useCallback } from 'react';
import { loadSetting, saveSetting } from '../utils/settings';

interface Settings {
  useReverb: boolean;
  transpose: number;
  octave: number;
  stackCount: number;
}

const DEFAULT_SETTINGS: Settings = {
  useReverb: false,
  transpose: 0,
  octave: 3,
  stackCount: 0,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => ({
    useReverb: loadSetting('useReverb', DEFAULT_SETTINGS.useReverb),
    transpose: loadSetting('transpose', DEFAULT_SETTINGS.transpose),
    octave: loadSetting('octave', DEFAULT_SETTINGS.octave),
    stackCount: loadSetting('stack', DEFAULT_SETTINGS.stackCount),
  }));

  const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      const storageKey = key === 'stackCount' ? 'stack' : key;
      saveSetting(storageKey, value);
      return next;
    });
  }, []);

  return { settings, updateSetting };
}
