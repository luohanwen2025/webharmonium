import { useEffect, useState, useCallback, useRef } from 'react';

interface MIDIDevice {
  id: string;
  name: string;
  manufacturer: string;
}

interface UseMIDIOptions {
  onNoteOn: (note: number, velocity: number) => void;
  onNoteOff: (note: number) => void;
  enabled: boolean;
}

interface UseMIDIResult {
  isSupported: boolean;
  devices: MIDIDevice[];
  selectedDeviceId: string | null;
  setSelectedDeviceId: (id: string | null) => void;
  refresh: () => void;
}

export function useMIDI({ onNoteOn, onNoteOff, enabled }: UseMIDIOptions): UseMIDIResult {
  const [isSupported, setIsSupported] = useState(false);
  const [devices, setDevices] = useState<MIDIDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const midiAccessRef = useRef<MIDIAccess | null>(null);
  const onNoteOnRef = useRef(onNoteOn);
  const onNoteOffRef = useRef(onNoteOff);
  const selectedDeviceIdRef = useRef(selectedDeviceId);

  onNoteOnRef.current = onNoteOn;
  onNoteOffRef.current = onNoteOff;
  selectedDeviceIdRef.current = selectedDeviceId;

  const getMIDIMessage = useCallback((message: MIDIMessageEvent) => {
    if (!enabled) return;
    const data = message.data;
    if (!data || data.length < 2) return;

    const command = data[0];
    const note = data[1];
    const velocity = data.length > 2 ? data[2] : 0;
    const deviceId = (message.target as MIDIInput).id;

    if (deviceId !== selectedDeviceIdRef.current) return;

    switch (command) {
      case 144: // noteOn
        if (velocity > 0) {
          onNoteOnRef.current(note, velocity);
        } else {
          onNoteOffRef.current(note);
        }
        break;
      case 128: // noteOff
        onNoteOffRef.current(note);
        break;
    }
  }, [enabled]);

  const setupInputs = useCallback((access: MIDIAccess) => {
    const deviceList: MIDIDevice[] = [];
    access.inputs.forEach((input) => {
      deviceList.push({
        id: input.id,
        name: input.name || 'Unknown',
        manufacturer: input.manufacturer || 'Unknown',
      });
      input.onmidimessage = getMIDIMessage;
    });
    setDevices(deviceList);
    if (deviceList.length > 0 && !selectedDeviceIdRef.current) {
      setSelectedDeviceId(deviceList[0].id);
    }
  }, [getMIDIMessage]);

  const requestAccess = useCallback(async () => {
    if (!navigator.requestMIDIAccess) {
      setIsSupported(false);
      return;
    }
    try {
      const access = await navigator.requestMIDIAccess({ sysex: false });
      midiAccessRef.current = access;
      setIsSupported(true);
      setupInputs(access);

      access.onstatechange = () => {
        if (midiAccessRef.current) {
          setupInputs(midiAccessRef.current);
        }
      };
    } catch {
      setIsSupported(false);
    }
  }, [setupInputs]);

  useEffect(() => {
    requestAccess();
  }, [requestAccess]);

  return {
    isSupported,
    devices,
    selectedDeviceId,
    setSelectedDeviceId,
    refresh: requestAccess,
  };
}
