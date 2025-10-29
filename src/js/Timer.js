/**
 * Timer class - handles core timer logic and state
 */
export class Timer {
    constructor() {
        this.totalSeconds = 0;
        this.remainingSeconds = 0;
        this.interval = null;
        this.isPaused = false;
        this.callbacks = {
            onTick: [],
            onComplete: [],
            onNudge: []
        };
    }

    /**
     * Start the timer with given duration in minutes
     */
    start(minutes) {
        if (this.interval) {
            this.stop();
        }

        this.totalSeconds = minutes * 60;
        this.remainingSeconds = this.totalSeconds;
        this.isPaused = false;

        this.interval = setInterval(() => {
            if (this.isPaused) return;

            this.remainingSeconds--;
            this._triggerCallbacks('onTick', this.getState());

            if (this.remainingSeconds <= 0) {
                this.stop();
                this._triggerCallbacks('onComplete', this.getState());
            }
        }, 1000);
    }

    /**
     * Stop the timer
     */
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    /**
     * Pause/resume the timer
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        return this.isPaused;
    }

    /**
     * Reset the timer to initial state
     */
    reset() {
        this.stop();
        this.totalSeconds = 0;
        this.remainingSeconds = 0;
        this.isPaused = false;
    }

    /**
     * Get current timer state
     */
    getState() {
        return {
            totalSeconds: this.totalSeconds,
            remainingSeconds: this.remainingSeconds,
            elapsedSeconds: this.totalSeconds - this.remainingSeconds,
            isPaused: this.isPaused,
            isRunning: this.interval !== null,
            progress: this.totalSeconds > 0 ? ((this.totalSeconds - this.remainingSeconds) / this.totalSeconds) * 100 : 0
        };
    }

    /**
     * Check if timer is running
     */
    isRunning() {
        return this.interval !== null;
    }

    /**
     * Add callback for timer events
     */
    on(event, callback) {
        if (this.callbacks[event]) {
            this.callbacks[event].push(callback);
        }
    }

    /**
     * Remove callback for timer events
     */
    off(event, callback) {
        if (this.callbacks[event]) {
            const index = this.callbacks[event].indexOf(callback);
            if (index > -1) {
                this.callbacks[event].splice(index, 1);
            }
        }
    }

    /**
     * Trigger callbacks for given event
     */
    _triggerCallbacks(event, data) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => callback(data));
        }
    }
}