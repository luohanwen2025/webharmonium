export const SAMPLE_URL = '/harmonium-kannan-orig.wav';
export const REVERB_URL = '/reverb.wav';

export const BASE_KEY_NAMES = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
];

export const MIDDLE_C = 60;
export const ROOT_KEY = 62;

export const OCTAVE_MAP = [-36, -24, -12, 0, 12, 24, 36];

export const LOOP_START = 0.5;

export interface KeyboardMapEntry {
  key: string;
  midiNote: number;
  swaram: string;
}

export const KEYBOARD_ENTRIES: KeyboardMapEntry[] = [
  { key: 's', midiNote: 53, swaram: 'Ṃ' },
  { key: 'S', midiNote: 53, swaram: 'Ṃ' },
  { key: 'a', midiNote: 54, swaram: 'Ṃ' },
  { key: 'A', midiNote: 54, swaram: 'Ṃ' },
  { key: '`', midiNote: 55, swaram: 'P̣' },
  { key: '1', midiNote: 56, swaram: 'Ḍ' },
  { key: 'q', midiNote: 57, swaram: 'Ḍ' },
  { key: 'Q', midiNote: 57, swaram: 'Ḍ' },
  { key: '2', midiNote: 58, swaram: 'Ṇ' },
  { key: 'w', midiNote: 59, swaram: 'Ṇ' },
  { key: 'W', midiNote: 59, swaram: 'Ṇ' },
  { key: 'e', midiNote: 60, swaram: 'S' },
  { key: 'E', midiNote: 60, swaram: 'S' },
  { key: '4', midiNote: 61, swaram: 'R' },
  { key: 'r', midiNote: 62, swaram: 'R' },
  { key: 'R', midiNote: 62, swaram: 'R' },
  { key: '5', midiNote: 63, swaram: 'G' },
  { key: 't', midiNote: 64, swaram: 'G' },
  { key: 'T', midiNote: 64, swaram: 'G' },
  { key: 'y', midiNote: 65, swaram: 'M' },
  { key: 'Y', midiNote: 65, swaram: 'M' },
  { key: '7', midiNote: 66, swaram: 'M' },
  { key: 'u', midiNote: 67, swaram: 'P' },
  { key: 'U', midiNote: 67, swaram: 'P' },
  { key: '8', midiNote: 68, swaram: 'D' },
  { key: 'i', midiNote: 69, swaram: 'D' },
  { key: 'I', midiNote: 69, swaram: 'D' },
  { key: '9', midiNote: 70, swaram: 'N' },
  { key: 'o', midiNote: 71, swaram: 'N' },
  { key: 'O', midiNote: 71, swaram: 'N' },
  { key: 'p', midiNote: 72, swaram: 'Ṡ' },
  { key: 'P', midiNote: 72, swaram: 'Ṡ' },
  { key: '-', midiNote: 73, swaram: 'Ṙ' },
  { key: '[', midiNote: 74, swaram: 'Ṙ' },
  { key: '=', midiNote: 75, swaram: 'Ġ' },
  { key: ']', midiNote: 76, swaram: 'Ġ' },
  { key: '\\', midiNote: 77, swaram: 'Ṁ' },
  { key: "'", midiNote: 78, swaram: 'Ṁ' },
  { key: ';', midiNote: 79, swaram: 'Ṗ' },
];

export const KEYBOARD_MAP: Record<string, number> = {};
KEYBOARD_ENTRIES.forEach((entry) => {
  KEYBOARD_MAP[entry.key] = entry.midiNote;
});

export interface KeyDef {
  key: string;
  label: string;
  isBlack: boolean;
  midiNote: number;
}

export const KEY_DEFS: KeyDef[] = [
  { key: '`', label: '`', isBlack: false, midiNote: 55 },
  { key: '1', label: '1', isBlack: true, midiNote: 56 },
  { key: 'q', label: 'q', isBlack: false, midiNote: 57 },
  { key: '2', label: '2', isBlack: true, midiNote: 58 },
  { key: 'w', label: 'w', isBlack: false, midiNote: 59 },
  { key: 'e', label: 'e', isBlack: false, midiNote: 60 },
  { key: '4', label: '4', isBlack: true, midiNote: 61 },
  { key: 'r', label: 'r', isBlack: false, midiNote: 62 },
  { key: '5', label: '5', isBlack: true, midiNote: 63 },
  { key: 't', label: 't', isBlack: false, midiNote: 64 },
  { key: 'y', label: 'y', isBlack: false, midiNote: 65 },
  { key: '7', label: '7', isBlack: true, midiNote: 66 },
  { key: 'u', label: 'u', isBlack: false, midiNote: 67 },
  { key: '8', label: '8', isBlack: true, midiNote: 68 },
  { key: 'i', label: 'i', isBlack: false, midiNote: 69 },
  { key: '9', label: '9', isBlack: true, midiNote: 70 },
  { key: 'o', label: 'o', isBlack: false, midiNote: 71 },
  { key: 'p', label: 'p', isBlack: false, midiNote: 72 },
  { key: '-', label: '-', isBlack: true, midiNote: 73 },
  { key: '[', label: '[', isBlack: false, midiNote: 74 },
  { key: '=', label: '=', isBlack: true, midiNote: 75 },
  { key: ']', label: ']', isBlack: false, midiNote: 76 },
  { key: '\\', label: '\\', isBlack: false, midiNote: 77 },
];
