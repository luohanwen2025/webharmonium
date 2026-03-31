import { useState, useCallback } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { useKeyboard } from '../hooks/useKeyboard';
import { useSettings } from '../hooks/useSettings';
import { Keyboard } from './Keyboard';
import { Controls } from './Controls';
import './Harmonium.css';

export function Harmonium() {
  const { settings, updateSetting } = useSettings();
  const engine = useAudioEngine();
  const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set());

  const handleNoteOn = useCallback((midiNote: number) => {
    engine.noteOn(midiNote, settings.octave, settings.stackCount);
    setActiveKeys((prev) => new Set(prev).add(midiNote));
  }, [engine, settings.octave, settings.stackCount]);

  const handleNoteOff = useCallback((midiNote: number) => {
    engine.noteOff(midiNote, settings.octave, settings.stackCount);
    setActiveKeys((prev) => {
      const next = new Set(prev);
      next.delete(midiNote);
      return next;
    });
  }, [engine, settings.octave, settings.stackCount]);

  const handleMidiNoteOn = useCallback((_note: number, _velocity: number) => {
    // MIDI noteOn uses the raw MIDI note number directly
    engine.noteOn(_note, settings.octave, settings.stackCount);
    setActiveKeys((prev) => new Set(prev).add(_note));
  }, [engine, settings.octave, settings.stackCount]);

  const handleMidiNoteOff = useCallback((_note: number) => {
    engine.noteOff(_note, settings.octave, settings.stackCount);
    setActiveKeys((prev) => {
      const next = new Set(prev);
      next.delete(_note);
      return next;
    });
  }, [engine, settings.octave, settings.stackCount]);

  useKeyboard({
    onNoteOn: handleNoteOn,
    onNoteOff: handleNoteOff,
    enabled: engine.isLoaded,
  });

  const handleReverbChange = useCallback((enabled: boolean) => {
    updateSetting('useReverb', enabled);
    engine.updateReverb(enabled);
  }, [updateSetting, engine]);

  const handleTransposeChange = useCallback((semitone: number) => {
    const next = settings.transpose + semitone;
    if (next >= -11 && next <= 11) {
      updateSetting('transpose', next);
      engine.shiftSemitone(semitone);
    }
  }, [settings.transpose, updateSetting, engine]);

  const handleOctaveChange = useCallback((delta: number) => {
    const next = settings.octave + delta;
    if (next >= 0 && next <= 6) {
      updateSetting('octave', next);
    }
  }, [settings.octave, updateSetting]);

  const handleStackChange = useCallback((delta: number) => {
    let next = settings.stackCount + delta;
    if (next < 0) next = 0;
    if (settings.octave + next > 6) next = 6 - settings.octave;
    updateSetting('stackCount', next);
  }, [settings.stackCount, settings.octave, updateSetting]);

  if (!engine.isLoaded) {
    return (
      <section className="harmonium-section" id="harmonium">
        <div className="load-container">
          <button className="load-button" onClick={engine.load}>
            Load Harmonium
          </button>
          <p className="load-hint">Click to initialize the audio engine</p>
        </div>
      </section>
    );
  }

  return (
    <section className="harmonium-section" id="harmonium">
      <div className="harmonium-inner">
        <Keyboard
          onNoteOn={handleNoteOn}
          onNoteOff={handleNoteOff}
          activeKeys={activeKeys}
        />
        <Controls
          useReverb={settings.useReverb}
          transpose={settings.transpose}
          octave={settings.octave}
          stackCount={settings.stackCount}
          onReverbChange={handleReverbChange}
          onTransposeChange={handleTransposeChange}
          onOctaveChange={handleOctaveChange}
          onStackChange={handleStackChange}
          midiOnNoteOn={handleMidiNoteOn}
          midiOnNoteOff={handleMidiNoteOff}
        />
      </div>
    </section>
  );
}
