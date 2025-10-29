/**
 * Main application entry point - assembles all components
 */
import { Timer } from './js/Timer.js';
import { NudgeManager } from './js/NudgeManager.js';
import { AudioManager } from './js/AudioManager.js';
import { NotificationManager } from './js/NotificationManager.js';
import { ThemeManager } from './js/ThemeManager.js';
import { ProgressBarManager } from './js/ProgressBarManager.js';
import { UIManager } from './js/UIManager.js';

/**
 * NudgeOClock application class
 */
class NudgeOClock {
    constructor() {
        this.audioManager = new AudioManager();
        this.notificationManager = new NotificationManager();
        this.themeManager = new ThemeManager();
        this.progressBarManager = new ProgressBarManager();
        this.timer = new Timer();
        this.nudgeManager = new NudgeManager(this.audioManager, this.notificationManager);
        this.uiManager = new UIManager(
            this.timer,
            this.nudgeManager,
            this.progressBarManager,
            this.themeManager
        );
    }

    /**
     * Initialize the application
     */
    initialize() {
        this.uiManager.initialize();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new NudgeOClock();
    app.initialize();
});