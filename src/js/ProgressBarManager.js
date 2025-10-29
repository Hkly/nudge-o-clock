/**
 * ProgressBarManager class - handles both linear and circular progress displays
 */
export class ProgressBarManager {
    constructor() {
        this.isCircular = false;
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
            progressBar: document.getElementById('progressBar'),
            progressFill: document.getElementById('progressFill'),
            nudgeMarkers: document.getElementById('nudgeMarkers'),
            circularContainer: document.getElementById('circularProgressContainer'),
            progressCircle: document.getElementById('progressCircle'),
            circularNudgeMarkers: document.getElementById('circularNudgeMarkers'),
            toggleBtn: document.getElementById('progressToggleBtn'),
            toggleIcon: document.getElementById('toggleIcon')
        };
    }

    /**
     * Toggle between linear and circular progress display
     */
    toggle() {
        this.isCircular = !this.isCircular;
        this._updateToggleButton();
        this._updateDisplay();
        return this.isCircular;
    }

    /**
     * Update the toggle button appearance
     */
    _updateToggleButton() {
        if (this.isCircular) {
            this.elements.toggleIcon.textContent = '●';
            this.elements.toggleBtn.innerHTML = '<span id="toggleIcon">●</span> Circle';
        } else {
            this.elements.toggleIcon.textContent = '▬';
            this.elements.toggleBtn.innerHTML = '<span id="toggleIcon">▬</span> Bar';
        }
        // Re-get the toggle icon element after innerHTML change
        this.elements.toggleIcon = document.getElementById('toggleIcon');
    }

    /**
     * Update which progress display is visible
     */
    _updateDisplay() {
        if (this.isCircular) {
            this.elements.progressBar.classList.add('hidden');
            this.elements.circularContainer.classList.remove('hidden');
            this.elements.circularContainer.classList.add('flex');
        } else {
            this.elements.progressBar.classList.remove('hidden');
            this.elements.circularContainer.classList.add('hidden');
            this.elements.circularContainer.classList.remove('flex');
        }
    }

    /**
     * Create nudge markers for the current nudge configuration
     */
    createNudgeMarkers(nudgeTimes, totalSeconds) {
        this.nudgeMarkers = nudgeTimes;
        this._createLinearMarkers(nudgeTimes, totalSeconds);
        this._createCircularMarkers(nudgeTimes, totalSeconds);
    }

    /**
     * Create linear progress nudge markers
     */
    _createLinearMarkers(nudgeTimes, totalSeconds) {
        this.elements.nudgeMarkers.innerHTML = '';

        nudgeTimes.forEach(nudgeTime => {
            const marker = document.createElement('div');
            marker.className = 'nudge-marker';
            marker.dataset.time = nudgeTime;

            const percentage = (nudgeTime / totalSeconds) * 100;
            marker.style.left = `${percentage}%`;

            this.elements.nudgeMarkers.appendChild(marker);
        });
    }

    /**
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
        // Update linear progress
        this.elements.progressFill.style.width = `${progress}%`;

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
        // Update linear markers
        document.querySelectorAll('.nudge-marker').forEach(marker => {
            const markerTime = parseInt(marker.dataset.time);
            if (elapsedSeconds >= markerTime) {
                marker.classList.add('completed');
            } else {
                marker.classList.remove('completed');
            }
        });

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
        this.elements.nudgeMarkers.innerHTML = '';
        this.elements.circularNudgeMarkers.innerHTML = '';
    }
}