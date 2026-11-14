/**
 * 足球代數 — Web Audio 音效（無需外部音檔）
 */
(function (global) {
  'use strict';

  function SoccerAudio() {
    this.ctx = null;
    this.muted = false;
  }

  SoccerAudio.prototype._ensureContext = function () {
    if (this.muted) return null;
    if (!this.ctx) {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(function () {});
    }
    return this.ctx;
  };

  SoccerAudio.prototype.setMuted = function (muted, playClick) {
    this.muted = !!muted;
    if (!this.muted && playClick !== false) this.playTap();
    return this.muted;
  };

  SoccerAudio.prototype.isMuted = function () {
    return this.muted;
  };

  SoccerAudio.prototype._tone = function (freq, startOffset, duration, type, volume) {
    var ctx = this._ensureContext();
    if (!ctx) return;
    var now = ctx.currentTime + (startOffset || 0);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume || 0.12, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  };

  SoccerAudio.prototype.playTap = function () {
    this._tone(480, 0, 0.055, 'triangle', 0.08);
  };

  SoccerAudio.prototype.playGoal = function () {
    this._tone(392, 0, 0.1, 'triangle', 0.12);
    this._tone(523.25, 0.08, 0.12, 'triangle', 0.14);
    this._tone(659.25, 0.16, 0.14, 'sine', 0.15);
    this._tone(784, 0.26, 0.22, 'triangle', 0.12);
  };

  SoccerAudio.prototype.playSave = function () {
    this._tone(220, 0, 0.12, 'sine', 0.1);
    this._tone(165, 0.1, 0.2, 'triangle', 0.1);
  };

  SoccerAudio.prototype.playStar = function () {
    var notes = [523.25, 659.25, 783.99, 1046.5];
    var times = [0, 0.09, 0.18, 0.3];
    var durs = [0.12, 0.12, 0.14, 0.32];
    for (var i = 0; i < notes.length; i++) {
      this._tone(notes[i], times[i], durs[i], i === 3 ? 'sine' : 'triangle', 0.14);
    }
  };

  global.soccerAudio = new SoccerAudio();
})(window);
