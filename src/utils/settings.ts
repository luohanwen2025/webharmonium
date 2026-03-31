const STORAGE_PREFIX = 'webharmonium.';

export function loadSetting<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    if (stored !== null) {
      return JSON.parse(stored) as T;
    }
  } catch {
    // ignore parse errors
  }
  return defaultValue;
}

export function saveSetting(key: string, value: unknown): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}
