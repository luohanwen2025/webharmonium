import { useState } from 'react';
import { useMIDI } from '../hooks/useMIDI';
import { BASE_KEY_NAMES } from '../utils/constants';
import './Controls.css';

interface ControlsProps {
  useReverb: boolean;
  transpose: number;
  octave: number;
  stackCount: number;
  onReverbChange: (enabled: boolean) => void;
  onTransposeChange: (semitone: number) => void;
  onOctaveChange: (octave: number) => void;
  onStackChange: (stack: number) => void;
  midiOnNoteOn: (note: number, velocity: number) => void;
  midiOnNoteOff: (note: number) => void;
}

export function Controls({
  useReverb,
  transpose,
  octave,
  stackCount,
  onReverbChange,
  onTransposeChange,
  onOctaveChange,
  onStackChange,
  midiOnNoteOn,
  midiOnNoteOff,
}: ControlsProps) {
  const rootNote = BASE_KEY_NAMES[transpose >= 0 ? transpose % 12 : transpose + 12];

  const {
    isSupported: midiSupported,
    devices: midiDevices,
    selectedDeviceId,
    setSelectedDeviceId,
    refresh: refreshMIDI,
  } = useMIDI({
    onNoteOn: midiOnNoteOn,
    onNoteOff: midiOnNoteOff,
    enabled: true,
  });

  const [midiInfo, setMidiInfo] = useState<string>('');

  const handleRefreshMIDI = () => {
    refreshMIDI();
    setMidiInfo('Refreshed');
    setTimeout(() => setMidiInfo(''), 2000);
  };

  return (
    <div className="controls-panel">
      {/* Reverb */}
      <div className="control-card">
        <div className="control-header">
          <span>Reverb</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={useReverb}
              onChange={(e) => onReverbChange(e.target.checked)}
              aria-label="Toggle reverb effect"
            />
            <span className="toggle-slider" />
          </label>
        </div>
      </div>

      {/* MIDI */}
      <div className="control-card">
        <div className="control-header">
          <span>
            MIDI Keyboard
            <span className="midi-status">
              {midiSupported ? 'Supported' : 'Not Supported'}
            </span>
          </span>
          <button className="btn-icon" onClick={handleRefreshMIDI} title="Refresh MIDI devices" aria-label="Refresh MIDI devices">
            &#x21bb;
          </button>
        </div>
        {midiSupported && (
          <select
            className="midi-select"
            value={selectedDeviceId || ''}
            aria-label="Select MIDI device"
            onChange={(e) => setSelectedDeviceId(e.target.value || null)}
          >
            <option value="">-- Select Device --</option>
            {midiDevices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.manufacturer})
              </option>
            ))}
          </select>
        )}
        {midiInfo && <span className="midi-info">{midiInfo}</span>}
      </div>

      {/* Transpose */}
      <div className="control-card">
        <div className="control-header">
          <span>Transpose &mdash; {rootNote}</span>
        </div>
        <div className="control-adjust">
          <button className="btn-adjust" onClick={() => onTransposeChange(-1)} aria-label="Decrease transpose">&minus;</button>
          <span className="control-value">{transpose}</span>
          <button className="btn-adjust" onClick={() => onTransposeChange(1)} aria-label="Increase transpose">+</button>
        </div>
      </div>

      {/* Octave */}
      <div className="control-card">
        <div className="control-header">
          <span>Octave</span>
        </div>
        <div className="control-adjust">
          <button className="btn-adjust" onClick={() => onOctaveChange(-1)} aria-label="Decrease octave">&minus;</button>
          <span className="control-value">{octave}</span>
          <button className="btn-adjust" onClick={() => onOctaveChange(1)} aria-label="Increase octave">+</button>
        </div>
      </div>

      {/* Additional Reeds */}
      <div className="control-card">
        <div className="control-header">
          <span>Additional Reeds</span>
        </div>
        <div className="control-adjust">
          <button className="btn-adjust" onClick={() => onStackChange(-1)} aria-label="Decrease additional reeds">&minus;</button>
          <span className="control-value">{stackCount}</span>
          <button className="btn-adjust" onClick={() => onStackChange(1)} aria-label="Increase additional reeds">+</button>
        </div>
      </div>
    </div>
  );
}
