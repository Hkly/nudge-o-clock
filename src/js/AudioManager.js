/**
 * AudioManager class - handles audio notifications
 */
export class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    /**
     * Play a chime sound
     */
    playChime() {
        this._playTone(800, 0.5);
        // Play a second tone for a pleasant chime
        setTimeout(() => this._playTone(1000, 0.5), 100);
    }

    /**
     * Play completion sound (multiple chimes)
     */
    playComplete() {
        this.playChime();
        setTimeout(() => this.playChime(), 300);
    }

    /**
     * Play a single tone
     */
    _playTone(frequency, duration) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
}