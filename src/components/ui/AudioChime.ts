// Calming Web Audio API synthesizer for serene mindfulness chimes
// Completely self-contained: no external audio assets or network requests needed.

class CalmAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Play a gentle singing bowl chime (rich warm bell sound with natural harmonics)
  public playSingingBowl(freq = 396) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.2, now + 0.08);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
      masterGain.connect(ctx.destination);

      // Harmonics for rich Tibetan singing bowl sound
      const harmonics = [
        { mult: 1.0, gain: 0.5 },
        { mult: 2.76, gain: 0.2 },
        { mult: 5.4, gain: 0.08 },
      ];

      harmonics.forEach(({ mult, gain: hGain }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * mult, now);
        g.gain.setValueAtTime(hGain, now);
        osc.connect(g);
        g.connect(masterGain);
        osc.start(now);
        osc.stop(now + 4.0);
      });
    } catch {
      // Audio autoplay gracefully handled
    }
  }

  // Alias for ease of use across components
  public playBowlChime(freq = 396) {
    this.playSingingBowl(freq);
  }

  // Soft tone for Inhale cue
  public playBreathInCue() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.5);
    } catch {}
  }

  // Soft tone for Exhale cue
  public playBreathOutCue() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 1.5);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.07, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.0);
    } catch {}
  }

  // Soft celebration gentle harp arpeggio
  public playGentleCelebration() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A major pentatonic lift
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.09, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 1.3);
        } catch {}
      }, idx * 140);
    });
  }
}

export const calmAudio = new CalmAudioEngine();
