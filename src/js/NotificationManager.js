/**
 * NotificationManager class - handles browser notifications
 */
export class NotificationManager {
    constructor() {
        this.requestPermission();
    }

    /**
     * Request notification permission
     */
    async requestPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    }

    /**
     * Show nudge notification
     */
    showNudge(remainingSeconds) {
        if ('Notification' in window && Notification.permission === 'granted') {
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            new Notification('Nudge O\'Clock', {
                body: `Time check! ${timeString} remaining`,
                icon: '/favicon.ico' // You can add an icon if you have one
            });
        }
    }

    /**
     * Show completion notification
     */
    showComplete() {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nudge O\'Clock', {
                body: 'Timer complete!',
                icon: '/favicon.ico'
            });
        }
    }

    /**
     * Check if notifications are supported and permitted
     */
    isAvailable() {
        return 'Notification' in window && Notification.permission === 'granted';
    }

}