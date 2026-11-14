/**
 * Web Audio API 太空音效合成器（無需外部音檔）
 */
class SpaceAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    try {
      const saved = localStorage.getItem('space_fraction_muted');
      if (saved === 'true') this.muted = true;
    } catch (_) {
      // ignore storage errors in restricted environments
    }
  }

  _ensureContext() {
    if (this.muted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('space_fraction_muted', String(this.muted));
    } catch (_) {}
    if (!this.muted) {
      this.playClick();
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  _playTone(freq, startOffset, duration, type = 'sine', volume = 0.14) {
    const ctx = this._ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + startOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playClick() {
    this._playTone(520, 0, 0.07, 'triangle', 0.1);
  }

  playCorrect() {
    // 輕快太空跳躍音階 C5 -> E5 -> G5 -> C6
    this._playTone(523.25, 0.0, 0.12, 'triangle', 0.14);
    this._playTone(659.25, 0.07, 0.12, 'triangle', 0.14);
    this._playTone(783.99, 0.14, 0.14, 'triangle', 0.14);
    this._playTone(1046.5, 0.21, 0.26, 'sine', 0.16);
  }

  playWrong() {
    // 溫和提示音（絕非刺耳警報）
    this._playTone(300, 0.0, 0.14, 'sine', 0.1);
    this._playTone(250, 0.11, 0.2, 'sine', 0.1);
  }

  playVictory() {
    const notes = [523.25, 659.25, 783.99, 659.25, 1046.5];
    const times = [0, 0.1, 0.2, 0.3, 0.42];
    const durs = [0.12, 0.12, 0.12, 0.12, 0.45];
    notes.forEach((n, i) => {
      this._playTone(n, times[i], durs[i], 'triangle', 0.15);
    });
  }
}

window.spaceAudio = new SpaceAudio();
