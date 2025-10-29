/**
 * NudgeManager class - handles nudge calculations and notifications
 */
export class NudgeManager {
    constructor(audioManager, notificationManager) {
        this.audioManager = audioManager;
        this.notificationManager = notificationManager;
        this.nudgeTimes = [];
        this.completedNudges = new Set();
    }

    /**
     * Calculate nudge times based on configuration
     */
    calculateNudgeTimes(totalMinutes, config) {
        const times = [];
        const totalSecs = totalMinutes * 60;

        if (config.type === 'count') {
            // Evenly distributed nudges
            const count = config.value;
            for (let i = 1; i <= count; i++) {
                const time = Math.floor((totalSecs * i) / (count + 1));
                times.push(time);
            }
        } else if (config.type === 'percent') {
            // Nudge at specific percentage
            const percent = config.value;
            const time = Math.floor((totalSecs * percent) / 100);
            times.push(time);
        }

        this.nudgeTimes = times.sort((a, b) => a - b);
        this.completedNudges.clear();
        return this.nudgeTimes;
    }

    /**
     * Check if any nudges should be triggered
     */
    checkNudges(elapsedSeconds, remainingSeconds) {
        const triggered = [];

        this.nudgeTimes.forEach(nudgeTime => {
            if (elapsedSeconds >= nudgeTime && !this.completedNudges.has(nudgeTime)) {
                this.completedNudges.add(nudgeTime);
                triggered.push(nudgeTime);

                // Trigger audio and notification
                this.audioManager.playChime();
                this.notificationManager.showNudge(remainingSeconds);
            }
        });

        return triggered;
    }

    /**
     * Get next upcoming nudge information
     */
    getNextNudge(elapsedSeconds) {
        const upcomingNudges = this.nudgeTimes.filter(t => t > elapsedSeconds && !this.completedNudges.has(t));

        if (upcomingNudges.length > 0) {
            const nextNudgeTime = upcomingNudges[0];
            const timeUntilNudge = nextNudgeTime - elapsedSeconds;
            return {
                time: nextNudgeTime,
                timeUntil: timeUntilNudge,
                hasNext: true
            };
        }

        return {
            hasNext: false,
            allCompleted: this.completedNudges.size > 0 && this.completedNudges.size === this.nudgeTimes.length
        };
    }

    /**
     * Get all nudge times
     */
    getNudgeTimes() {
        return [...this.nudgeTimes];
    }

    /**
     * Get completed nudges
     */
    getCompletedNudges() {
        return new Set(this.completedNudges);
    }

    /**
     * Reset nudge state
     */
    reset() {
        this.nudgeTimes = [];
        this.completedNudges.clear();
    }
}