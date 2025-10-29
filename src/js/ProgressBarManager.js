/**
 * ProgressBarManager class - handles circular progress display
 */
export class ProgressBarManager {
    constructor() {
        this.elements = this._getElements();
        this.nudgeMarkers = [];
        this.CIRCLE_RADIUS = 80;
        this.CIRCLE_CIRCUMFERENCE = 2 * Math.PI * this.CIRCLE_RADIUS;
    }

    /**
     * Get DOM elements
     */
    _getElements() {
        return {
            circularContainer: document.getElementById('circularProgressContainer'),
            progressCircle: document.getElementById('progressCircle'),
            circularNudgeMarkers: document.getElementById('circularNudgeMarkers')
        };
    }

    /**
     * Create nudge markers for the current nudge configuration
     */
    createNudgeMarkers(nudgeTimes, totalSeconds) {
        this.nudgeMarkers = nudgeTimes;
        this._createCircularMarkers(nudgeTimes, totalSeconds);
    }    /**
     * Create circular progress nudge markers
     */
    _createCircularMarkers(nudgeTimes, totalSeconds) {
        this.elements.circularNudgeMarkers.innerHTML = '';

        nudgeTimes.forEach(nudgeTime => {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            marker.setAttribute('class', 'circular-nudge-marker');
            marker.dataset.time = nudgeTime;

            const percentage = nudgeTime / totalSeconds;
            const angle = percentage * 2 * Math.PI;
            const x = 100 + this.CIRCLE_RADIUS * Math.cos(angle);
            const y = 100 + this.CIRCLE_RADIUS * Math.sin(angle);

            marker.setAttribute('cx', x);
            marker.setAttribute('cy', y);
            marker.setAttribute('r', '6');

            this.elements.circularNudgeMarkers.appendChild(marker);
        });
    }

    /**
     * Update progress display with current timer state
     */
    updateProgress(progress, elapsedSeconds) {
        // Update circular progress
        const offset = this.CIRCLE_CIRCUMFERENCE - (progress / 100) * this.CIRCLE_CIRCUMFERENCE;
        this.elements.progressCircle.style.strokeDashoffset = offset;

        // Update nudge marker states
        this._updateMarkerStates(elapsedSeconds);
    }

    /**
     * Update nudge marker visual states based on elapsed time
     */
    _updateMarkerStates(elapsedSeconds) {
        // Update circular markers
        document.querySelectorAll('.circular-nudge-marker').forEach(marker => {
            const markerTime = parseInt(marker.dataset.time);
            if (elapsedSeconds >= markerTime) {
                marker.classList.add('completed');
            } else {
                marker.classList.remove('completed');
            }
        });
    }

    /**
     * Reset progress to initial state
     */
    reset() {
        this.updateProgress(0, 0);
        this.elements.circularNudgeMarkers.innerHTML = '';
    }
}