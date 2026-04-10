import { useCallback, useRef, useState } from 'react';
import { SAMPLE_URL, REVERB_URL, MIDDLE_C, ROOT_KEY, OCTAVE_MAP, BASE_KEY_NAMES } from '../utils/constants';

interface AudioEngine {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  load: () => Promise<void>;
  noteOn: (note: number, currentOctave: number, stackCount: number) => void;
  noteOff: (note: number, currentOctave: number, stackCount: number) => void;
  updateReverb: (enabled: boolean) => void;
  shiftSemitone: (semitone: number) => void;
  getTranspose: () => number;
  getRootNote: () => string;
}

export function useAudioEngine(): AudioEngine {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadCalledRef = useRef(false);
  const contextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const reverbNodeRef = useRef<ConvolverNode | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceNodesRef = useRef<(AudioBufferSourceNode | null)[]>([]);
  const sourceNodeStateRef = useRef<number[]>([]);
  const keyMapRef = useRef<number[]>([]);
  const transposeRef = useRef(0);
  const useReverbRef = useRef(false);

  const buildKeyMap = useCallback(() => {
    const transpose = transposeRef.current;
    const startKey = (MIDDLE_C - 124) + (ROOT_KEY - MIDDLE_C);
    const keyMap: number[] = [];
    for (let i = 0; i < 128; i++) {
      keyMap[i] = startKey + i + transpose;
    }
    return keyMap;
  }, []);

  const setSourceNode = useCallback((i: number) => {
    const nodes = sourceNodesRef.current;
    const states = sourceNodeStateRef.current;
    const gain = gainNodeRef.current;
    const ctx = contextRef.current;
    const buffer = audioBufferRef.current;
    const keyMap = keyMapRef.current;
    const reverb = reverbNodeRef.current;
    const useReverb = useReverbRef.current;

    if (!ctx || !gain || !buffer) return;

    if (nodes[i] != null && states[i] === 1) {
      try { nodes[i]!.stop(0); } catch { /* ignore */ }
    }
    states[i] = 0;
    nodes[i] = null;
    const source = ctx.createBufferSource();
    if (useReverb && reverb) {
      source.connect(gain).connect(reverb).connect(ctx.destination);
    } else {
      source.connect(gain).connect(ctx.destination);
    }
    source.buffer = buffer;
    source.loop = true;
    source.loopStart = 0.5;
    if (keyMap[i] !== 0) {
      source.detune.value = keyMap[i] * 100;
    }
    nodes[i] = source;
  }, []);

  const init = useCallback(() => {
    keyMapRef.current = buildKeyMap();
    const nodes: (AudioBufferSourceNode | null)[] = [];
    const states: number[] = [];
    for (let i = 0; i < 128; i++) {
      nodes[i] = null;
      states[i] = 0;
    }
    sourceNodesRef.current = nodes;
    sourceNodeStateRef.current = states;
    for (let i = 0; i < 128; i++) {
      setSourceNode(i);
    }
  }, [buildKeyMap, setSourceNode]);

  const load = useCallback(async (): Promise<void> => {
    if (loadCalledRef.current) return;
    loadCalledRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const ctx = new AudioContext();
      contextRef.current = ctx;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.3;
      gainNode.connect(ctx.destination);
      gainNodeRef.current = gainNode;

      // Load reverb
      const reverbResponse = await fetch(REVERB_URL);
      const reverbArrayBuffer = await reverbResponse.arrayBuffer();
      const reverbBuffer = await ctx.decodeAudioData(reverbArrayBuffer);
      const convolver = ctx.createConvolver();
      convolver.buffer = reverbBuffer;
      convolver.connect(ctx.destination);
      reverbNodeRef.current = convolver;

      // Load sample
      const response = await fetch(SAMPLE_URL);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await ctx.decodeAudioData(arrayBuffer);
      audioBufferRef.current = buffer;

      init();
      setIsLoaded(true);
    } catch (err) {
      loadCalledRef.current = false;
      setError(err instanceof Error ? err.message : 'Failed to load audio engine');
    } finally {
      setIsLoading(false);
    }
  }, [init]);

  const noteOn = useCallback((note: number, currentOctave: number, stackCount: number) => {
    const nodes = sourceNodesRef.current;
    const states = sourceNodeStateRef.current;
    let i = note + OCTAVE_MAP[currentOctave];
    if (i >= 0 && i < nodes.length && states[i] === 0) {
      try { nodes[i]!.start(0); } catch { /* ignore */ }
      states[i] = 1;
    }
    for (let c = 1; c <= stackCount; c++) {
      i = note + OCTAVE_MAP[currentOctave + c];
      if (i >= 0 && i < nodes.length && states[i] === 0) {
        try { nodes[i]!.start(0); } catch { /* ignore */ }
        states[i] = 1;
      }
    }
  }, []);

  const noteOff = useCallback((note: number, currentOctave: number, stackCount: number) => {
    const nodes = sourceNodesRef.current;
    let i = note + OCTAVE_MAP[currentOctave];
    if (i >= 0 && i < nodes.length) {
      setSourceNode(i);
    }
    for (let c = 1; c <= stackCount; c++) {
      i = note + OCTAVE_MAP[currentOctave + c];
      if (i >= 0 && i < nodes.length) {
        setSourceNode(i);
      }
    }
  }, [setSourceNode]);

  const updateReverb = useCallback((enabled: boolean) => {
    useReverbRef.current = enabled;
    // Re-initialize to apply reverb to all source nodes
    init();
  }, [init]);

  const shiftSemitone = useCallback((semitone: number) => {
    const current = transposeRef.current;
    const next = current + semitone;
    if (next >= -11 && next <= 11) {
      transposeRef.current = next;
      init();
    }
  }, [init]);

  const getTranspose = useCallback(() => transposeRef.current, []);

  const getRootNote = useCallback(() => {
    const t = transposeRef.current;
    return BASE_KEY_NAMES[t >= 0 ? t % 12 : t + 12];
  }, []);

  return {
    isLoaded,
    isLoading,
    error,
    load,
    noteOn,
    noteOff,
    updateReverb,
    shiftSemitone,
    getTranspose,
    getRootNote,
  };
}
