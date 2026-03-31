import { useEffect, useCallback } from 'react';
import { KEYBOARD_MAP } from '../utils/constants';

interface UseKeyboardOptions {
  onNoteOn: (midiNote: number) => void;
  onNoteOff: (midiNote: number) => void;
  enabled: boolean;
}

export function useKeyboard({ onNoteOn, onNoteOff, enabled }: UseKeyboardOptions) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    if (event.repeat) return;
    const midiNote = KEYBOARD_MAP[event.key];
    if (midiNote !== undefined) {
      event.preventDefault();
      onNoteOn(midiNote);
    }
  }, [enabled, onNoteOn]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    const midiNote = KEYBOARD_MAP[event.key];
    if (midiNote !== undefined) {
      event.preventDefault();
      onNoteOff(midiNote);
    }
  }, [enabled, onNoteOff]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
}
