/**
 * UIManager class - handles all UI interactions and state management
 */
export class UIManager {
    constructor(timer, nudgeManager, progressBarManager, themeManager) {
        this.timer = timer;
        this.nudgeManager = nudgeManager;
        this.progressBarManager = progressBarManager;
        this.themeManager = themeManager;

        this.elements = this._getElements();
        this._bindEvents();
        this._setupTimerCallbacks();
    }

    /**
     * Get all DOM elements
     */
    _getElements() {
        return {
            // Main containers
            timerSetup: document.getElementById('timerSetup'),
            timerDisplay: document.getElementById('timerDisplay'),
            nudgeOptions: document.getElementById('nudgeOptions'),

            // Input elements
            minutesInput: document.getElementById('minutes'),
            nudgeCountRadio: document.getElementById('nudgeCount'),
            nudgeCountValue: document.getElementById('nudgeCountValue'),
            nudgePercentRadio: document.getElementById('nudgePercent'),
            nudgePercentValue: document.getElementById('nudgePercentValue'),

            // Button elements
            startBtn: document.getElementById('startBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            resetBtn: document.getElementById('resetBtn'),
            themeToggle: document.getElementById('themeToggle'),
            presetBtns: document.querySelectorAll('.preset-btn'),

            // Display elements
            timeText: document.getElementById('timeText'),
            statusText: document.getElementById('statusText'),
            nextNudge: document.getElementById('nextNudge')
        };
    }

    /**
     * Bind all event listeners
     */
    _bindEvents() {
        // Timer controls
        this.elements.startBtn.addEventListener('click', () => this.startTimer());
        this.elements.pauseBtn.addEventListener('click', () => this.togglePause());
        this.elements.resetBtn.addEventListener('click', () => this.resetTimer());

        // Theme toggle
        this.elements.themeToggle.addEventListener('click', () => this.themeManager.toggle());

        // Settings change listeners
        this.elements.minutesInput.addEventListener('input', () => {
            this._updatePreview();
            this._updateActivePreset();
        });
        this.elements.nudgeCountRadio.addEventListener('change', () => this._updatePreview());
        this.elements.nudgeCountValue.addEventListener('input', () => {
            if (this.elements.nudgeCountRadio.checked) {
                this._updatePreview();
            }
        });
        this.elements.nudgePercentRadio.addEventListener('change', () => this._updatePreview());
        this.elements.nudgePercentValue.addEventListener('input', () => {
            if (this.elements.nudgePercentRadio.checked) {
                this._updatePreview();
            }
        });

        // Enter key to start timer
        this.elements.minutesInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.startTimer();
            }
        });

        // Preset button listeners
        this.elements.presetBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const minutes = parseInt(e.target.dataset.minutes);
                this._setMinutes(minutes);
            });
        });
    }

    /**
     * Setup timer event callbacks
     */
    _setupTimerCallbacks() {
        this.timer.on('onTick', (state) => this._onTimerTick(state));
        this.timer.on('onComplete', (state) => this._onTimerComplete(state));
    }

    /**
     * Start the timer
     */
    startTimer() {
        const minutes = parseInt(this.elements.minutesInput.value);
        if (!minutes || minutes < 1) {
            alert('Please enter a valid duration');
            return;
        }

        // Calculate nudge times
        const nudgeConfig = this._getNudgeConfig();
        this.nudgeManager.calculateNudgeTimes(minutes, nudgeConfig);

        // Start the timer
        this.timer.start(minutes);

        // Update UI
        this._showTimerDisplay();
        this.elements.statusText.textContent = 'Running...';
        this.elements.pauseBtn.textContent = 'Pause';

        // Setup progress bar with nudge markers
        const nudgeTimes = this.nudgeManager.getNudgeTimes();
        this.progressBarManager.createNudgeMarkers(nudgeTimes, minutes * 60);
    }

    /**
     * Toggle pause/resume
     */
    togglePause() {
        const isPaused = this.timer.togglePause();

        if (isPaused) {
            this.elements.pauseBtn.textContent = 'Resume';
            this.elements.statusText.textContent = 'Paused';
        } else {
            this.elements.pauseBtn.textContent = 'Pause';
            this.elements.statusText.textContent = 'Running...';
        }
    }

    /**
     * Reset the timer
     */
    resetTimer() {
        this.timer.reset();
        this.nudgeManager.reset();
        this.progressBarManager.reset();

        this._showSetupDisplay();
        this._updatePreview();
    }

    /**
     * Handle timer tick events
     */
    _onTimerTick(state) {
        this._updateTimeDisplay(state.remainingSeconds);
        this.progressBarManager.updateProgress(state.progress, state.elapsedSeconds);

        // Check for nudges
        const triggeredNudges = this.nudgeManager.checkNudges(state.elapsedSeconds, state.remainingSeconds);
        if (triggeredNudges.length > 0) {
            this._showNudgeAlert();
        }

        this._updateNextNudgeDisplay(state.elapsedSeconds);
    }

    /**
     * Handle timer completion
     */
    _onTimerComplete(state) {
        this.elements.statusText.textContent = 'Timer Complete!';
        this._showNudgeAlert();
        this.nudgeManager.triggerCompletion();
    }

    /**
     * Show nudge alert animation
     */
    _showNudgeAlert() {
        this.elements.timeText.classList.add('nudge-alert');
        setTimeout(() => {
            this.elements.timeText.classList.remove('nudge-alert');
        }, 1500);
    }

    /**
     * Update time display
     */
    _updateTimeDisplay(remainingSeconds) {
        this.elements.timeText.textContent = this._formatTime(remainingSeconds);
    }

    /**
     * Update next nudge display
     */
    _updateNextNudgeDisplay(elapsedSeconds) {
        const nextNudge = this.nudgeManager.getNextNudge(elapsedSeconds);

        if (nextNudge.hasNext) {
            const minutes = Math.floor(nextNudge.timeUntil / 60);
            const seconds = nextNudge.timeUntil % 60;
            this.elements.nextNudge.textContent = `Next nudge in ${minutes}:${seconds.toString().padStart(2, '0')}`;
        } else if (nextNudge.allCompleted) {
            this.elements.nextNudge.textContent = 'All nudges completed';
        } else {
            this.elements.nextNudge.textContent = '';
        }
    }

    /**
     * Get current nudge configuration
     */
    _getNudgeConfig() {
        if (this.elements.nudgeCountRadio.checked) {
            return {
                type: 'count',
                value: parseInt(this.elements.nudgeCountValue.value)
            };
        } else {
            return {
                type: 'percent',
                value: parseInt(this.elements.nudgePercentValue.value)
            };
        }
    }

    /**
     * Show timer display UI
     */
    _showTimerDisplay() {
        this.elements.nudgeOptions.classList.add('hidden');
        this.elements.startBtn.classList.add('hidden');
        this.elements.timerDisplay.classList.remove('hidden');
        this.elements.timeText.classList.remove('hidden');
    }

    /**
     * Show setup display UI
     */
    _showSetupDisplay() {
        this.elements.timerDisplay.classList.add('hidden');
        this.elements.timeText.classList.add('hidden');
        this.elements.nudgeOptions.classList.remove('hidden');
        this.elements.startBtn.classList.remove('hidden');
    }

    /**
     * Update preview display
     */
    _updatePreview() {
        const minutes = parseInt(this.elements.minutesInput.value) || 30;
        const nudgeConfig = this._getNudgeConfig();

        // Calculate nudge times for preview
        this.nudgeManager.calculateNudgeTimes(minutes, nudgeConfig);
        const nudgeTimes = this.nudgeManager.getNudgeTimes();

        // Create markers
        this.progressBarManager.createNudgeMarkers(nudgeTimes, minutes * 60);

        // Show preview at 50% progress
        const previewProgress = 50;
        const previewElapsed = (minutes * 60 * previewProgress) / 100;
        this.progressBarManager.updateProgress(previewProgress, previewElapsed);
    }

    /**
     * Format time as MM:SS
     */
    _formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Initialize the UI
     */
    initialize() {
        this._updatePreview();
        this._updateActivePreset();
    }

    /**
     * Set the minutes input value and update UI
     */
    _setMinutes(minutes) {
        this.elements.minutesInput.value = minutes;
        this._updatePreview();
        this._updateActivePreset();
    }

    /**
     * Update active preset button styling
     */
    _updateActivePreset() {
        const currentMinutes = parseInt(this.elements.minutesInput.value);

        this.elements.presetBtns.forEach(btn => {
            const btnMinutes = parseInt(btn.dataset.minutes);
            if (btnMinutes === currentMinutes) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}