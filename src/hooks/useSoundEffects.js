import { useCallback, useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Sound effects store
export const useSoundStore = create(
  persist(
    (set) => ({
      soundEnabled: false,
      volume: 0.5,
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
    }),
    { name: "sound-settings" },
  ),
);

// Audio cache for better performance
const audioCache = new Map();

// Sound file paths (using base64 for small sounds or paths for real files)
const SOUNDS = {
  click: "/sounds/click.mp3",
  pop: "/sounds/pop.mp3",
  swoosh: "/sounds/swoosh.mp3",
  chime: "/sounds/chime.mp3",
  error: "/sounds/error.mp3",
  trash: "/sounds/trash.mp3",
};

// Fallback to Web Audio API synthesized sounds
const createSyntheticSound = (type) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  return () => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const now = audioContext.currentTime;

    switch (type) {
      case "click":
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        oscillator.type = "sine";
        oscillator.start(now);
        oscillator.stop(now + 0.05);
        break;

      case "pop":
        oscillator.frequency.setValueAtTime(600, now);
        oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.1);
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.type = "sine";
        oscillator.start(now);
        oscillator.stop(now + 0.1);
        break;

      case "swoosh":
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(1000, now + 0.15);
        oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        oscillator.type = "sawtooth";
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      case "chime":
        oscillator.frequency.setValueAtTime(523.25, now); // C5
        oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        oscillator.type = "sine";
        oscillator.start(now);
        oscillator.stop(now + 0.4);
        break;

      case "error":
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.setValueAtTime(150, now + 0.1);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        oscillator.type = "square";
        oscillator.start(now);
        oscillator.stop(now + 0.2);
        break;

      case "trash":
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        oscillator.type = "triangle";
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      default:
        break;
    }
  };
};

// Create synthetic sounds as fallbacks
const syntheticSounds = {
  click: createSyntheticSound("click"),
  pop: createSyntheticSound("pop"),
  swoosh: createSyntheticSound("swoosh"),
  chime: createSyntheticSound("chime"),
  error: createSyntheticSound("error"),
  trash: createSyntheticSound("trash"),
};

const useSoundEffects = () => {
  const { soundEnabled, volume } = useSoundStore();

  const playSound = useCallback(
    (soundName) => {
      if (!soundEnabled) return;

      // Try to play from file first
      const soundPath = SOUNDS[soundName];

      if (soundPath) {
        // Check cache first
        let audio = audioCache.get(soundName);

        if (!audio) {
          audio = new Audio(soundPath);
          audioCache.set(soundName, audio);
        }

        audio.volume = volume;
        audio.currentTime = 0;

        audio.play().catch(() => {
          // Fallback to synthetic sound if file fails
          try {
            syntheticSounds[soundName]?.();
          } catch (e) {
            // Silently fail if audio is blocked
          }
        });
      } else {
        // Use synthetic sound
        try {
          syntheticSounds[soundName]?.();
        } catch (e) {
          // Silently fail
        }
      }
    },
    [soundEnabled, volume],
  );

  // Memoized sound functions for convenience
  const sounds = useMemo(
    () => ({
      playClick: () => playSound("click"),
      playPop: () => playSound("pop"),
      playSwoosh: () => playSound("swoosh"),
      playChime: () => playSound("chime"),
      playError: () => playSound("error"),
      playTrash: () => playSound("trash"),
    }),
    [playSound],
  );

  return {
    ...sounds,
    playSound,
    soundEnabled,
    volume,
  };
};

export default useSoundEffects;
