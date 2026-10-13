// Synthetic Mechanical Camera Shutter Click Engine using Web Audio API
// 100% offline, zero-latency, realistic SLR mirror-slap and focal plane curtain

let audioCtx = null;
let isAudioEnabled = true;

export function initAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function toggleAudioFx(enabled) {
  isAudioEnabled = enabled !== undefined ? enabled : !isAudioEnabled;
  if (isAudioEnabled) initAudioContext();
  return isAudioEnabled;
}

export function getAudioFxState() {
  return isAudioEnabled;
}

export function playCameraShutterSound() {
  if (!isAudioEnabled) return;
  try {
    initAudioContext();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    // 1. Mirror slap thud (low sine frequency drop)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(320, now);
    osc1.frequency.exponentialRampToValueAtTime(60, now + 0.04);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.04);

    // 2. Focal plane metal curtain burst (filtered white noise)
    const bufferSize = audioCtx.sampleRate * 0.06;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.setValueAtTime(3.0, now);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.45, now + 0.015);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    whiteNoise.start(now + 0.015);
    whiteNoise.stop(now + 0.08);

    // 3. Shutter curtain second reset click
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(450, now + 0.055);
    osc2.frequency.exponentialRampToValueAtTime(90, now + 0.095);
    gain2.gain.setValueAtTime(0.25, now + 0.055);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.055);
    osc2.stop(now + 0.1);
  } catch (err) {
    console.warn('Audio FX could not play:', err);
  }
}
