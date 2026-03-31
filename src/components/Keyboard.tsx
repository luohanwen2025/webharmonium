import type { ReactElement } from 'react';
import { KEY_DEFS } from '../utils/constants';
import './Keyboard.css';

interface KeyboardProps {
  onNoteOn: (midiNote: number) => void;
  onNoteOff: (midiNote: number) => void;
  activeKeys: Set<number>;
}

export function Keyboard({ onNoteOn, onNoteOff, activeKeys }: KeyboardProps) {
  const whiteKeys = KEY_DEFS.filter((k) => !k.isBlack);

  const WHITE_KEY_WIDTH = 21;
  const WHITE_KEY_HEIGHT = 100;
  const BLACK_KEY_WIDTH = 14;
  const BLACK_KEY_HEIGHT = 50;

  return (
    <div className="keyboard-container">
      <svg
        viewBox={`0 0 ${whiteKeys.length * WHITE_KEY_WIDTH} ${WHITE_KEY_HEIGHT}`}
        className="keyboard-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* White keys */}
        {whiteKeys.map((keyDef, index) => {
          const x = index * WHITE_KEY_WIDTH;
          const isActive = activeKeys.has(keyDef.midiNote);
          return (
            <g key={keyDef.key}>
              <polygon
                points={`${x},0 ${x + WHITE_KEY_WIDTH},0 ${x + WHITE_KEY_WIDTH},${WHITE_KEY_HEIGHT} ${x},${WHITE_KEY_HEIGHT}`}
                className={`key white-key ${isActive ? 'white-key-active' : ''}`}
                onMouseDown={() => onNoteOn(keyDef.midiNote)}
                onMouseUp={() => onNoteOff(keyDef.midiNote)}
                onMouseLeave={() => {
                  if (isActive) onNoteOff(keyDef.midiNote);
                }}
                onTouchStart={(e) => { e.preventDefault(); onNoteOn(keyDef.midiNote); }}
                onTouchEnd={(e) => { e.preventDefault(); onNoteOff(keyDef.midiNote); }}
              />
              <text
                x={x + WHITE_KEY_WIDTH / 2}
                y={WHITE_KEY_HEIGHT - 35}
                textAnchor="middle"
                className="key-label"
              >
                {keyDef.label}
              </text>
            </g>
          );
        })}

        {/* Black keys */}
        {(() => {
          const elements: ReactElement[] = [];
          for (let i = 0; i < KEY_DEFS.length; i++) {
            const keyDef = KEY_DEFS[i];
            if (!keyDef.isBlack) continue;

            // Find the white key index of the previous white key
            const prevWhiteKeyIndex = findPrevWhiteKeyIndex(i);
            if (prevWhiteKeyIndex === -1) continue;

            const x = prevWhiteKeyIndex * WHITE_KEY_WIDTH + WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2;
            const isActive = activeKeys.has(keyDef.midiNote);

            elements.push(
              <g key={keyDef.key}>
                <polygon
                  points={`${x},0 ${x + BLACK_KEY_WIDTH},0 ${x + BLACK_KEY_WIDTH},${BLACK_KEY_HEIGHT} ${x},${BLACK_KEY_HEIGHT}`}
                  className={`key black-key ${isActive ? 'black-key-active' : ''}`}
                  onMouseDown={() => onNoteOn(keyDef.midiNote)}
                  onMouseUp={() => onNoteOff(keyDef.midiNote)}
                  onMouseLeave={() => {
                    if (isActive) onNoteOff(keyDef.midiNote);
                  }}
                  onTouchStart={(e) => { e.preventDefault(); onNoteOn(keyDef.midiNote); }}
                  onTouchEnd={(e) => { e.preventDefault(); onNoteOff(keyDef.midiNote); }}
                />
                <text
                  x={x + BLACK_KEY_WIDTH / 2}
                  y={BLACK_KEY_HEIGHT - 20}
                  textAnchor="middle"
                  className="key-label-black"
                >
                  {keyDef.label}
                </text>
              </g>
            );
          }
          return elements;
        })()}

        {/* Note names on white keys (C, D, E, F, G, A, B) */}
        {whiteKeys.map((keyDef, index) => {
          const noteNames: Record<number, string> = {
            60: 'C', 62: 'D', 64: 'E', 65: 'F', 67: 'G', 69: 'A', 71: 'B',
            72: 'C', 74: 'D', 76: 'E',
          };
          const noteName = noteNames[keyDef.midiNote];
          if (!noteName) return null;
          const x = index * WHITE_KEY_WIDTH;
          return (
            <text
              key={`note-${keyDef.key}`}
              x={x + WHITE_KEY_WIDTH / 2}
              y={WHITE_KEY_HEIGHT - 12}
              textAnchor="middle"
              className="note-label"
            >
              {noteName}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function findPrevWhiteKeyIndex(keyDefIndex: number): number {
  let whiteCount = 0;
  for (let i = 0; i < keyDefIndex; i++) {
    if (!KEY_DEFS[i].isBlack) {
      whiteCount++;
    }
  }
  return whiteCount - 1;
}
