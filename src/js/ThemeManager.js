/**
 * ThemeManager class - handles theme switching and persistence
 */
export class ThemeManager {
    constructor() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.themeIcon = document.getElementById('themeIcon');
        this.initialize();
    }

    /**
     * Initialize theme based on stored preference
     */
    initialize() {
        this.updateTheme();
    }

    /**
     * Toggle between light and dark themes
     */
    toggle() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode.toString());
        this.updateTheme();
        return this.isDarkMode;
    }

    /**
     * Update the theme classes and icon
     */
    updateTheme() {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
            if (this.themeIcon) {
                this.themeIcon.textContent = '☀️';
            }
        } else {
            document.documentElement.classList.remove('dark');
            if (this.themeIcon) {
                this.themeIcon.textContent = '🌙';
            }
        }
    }

    /**
     * Get current theme state
     */
    isDark() {
        return this.isDarkMode;
    }
}