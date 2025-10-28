// Timer state
let timerInterval = null;
let totalSeconds = 0;
let remainingSeconds = 0;
let isPaused = false;
let nudgeTimes = [];
let completedNudges = new Set();

// Audio context for chime
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// DOM elements
const timerSetup = document.getElementById('timerSetup');
const timerDisplay = document.getElementById('timerDisplay');
const minutesInput = document.getElementById('minutes');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timeText = document.getElementById('timeText');
const progressFill = document.getElementById('progressFill');
const nudgeMarkers = document.getElementById('nudgeMarkers');
const statusText = document.getElementById('statusText');
const nextNudge = document.getElementById('nextNudge');

// Radio buttons and inputs
const nudgeCountRadio = document.getElementById('nudgeCount');
const nudgeCountValue = document.getElementById('nudgeCountValue');
const nudgePercentRadio = document.getElementById('nudgePercent');
const nudgePercentValue = document.getElementById('nudgePercentValue');

// Play a chime sound
function playChime() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Play a second tone for a pleasant chime
    setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        
        oscillator2.frequency.value = 1000;
        oscillator2.type = 'sine';
        
        gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.5);
    }, 100);
}

// Calculate nudge times based on selected option
function calculateNudgeTimes(totalMinutes) {
    const times = [];
    const totalSecs = totalMinutes * 60;
    
    if (nudgeCountRadio.checked) {
        // Evenly distributed nudges
        const count = parseInt(nudgeCountValue.value);
        for (let i = 1; i <= count; i++) {
            const time = Math.floor((totalSecs * i) / (count + 1));
            times.push(time);
        }
    } else if (nudgePercentRadio.checked) {
        // Nudge at specific percentage
        const percent = parseInt(nudgePercentValue.value);
        const time = Math.floor((totalSecs * percent) / 100);
        times.push(time);
    }
    
    return times.sort((a, b) => a - b);
}

// Create visual markers for nudges
function createNudgeMarkers() {
    nudgeMarkers.innerHTML = '';
    
    nudgeTimes.forEach(nudgeTime => {
        const marker = document.createElement('div');
        marker.className = 'nudge-marker';
        marker.dataset.time = nudgeTime;
        
        // Position based on percentage of total time
        const percentage = (nudgeTime / totalSeconds) * 100;
        marker.style.left = `${percentage}%`;
        
        nudgeMarkers.appendChild(marker);
    });
}

// Update the next nudge display
function updateNextNudgeDisplay() {
    const elapsed = totalSeconds - remainingSeconds;
    const upcomingNudges = nudgeTimes.filter(t => t > elapsed && !completedNudges.has(t));
    
    if (upcomingNudges.length > 0) {
        const nextNudgeTime = upcomingNudges[0];
        const timeUntilNudge = nextNudgeTime - elapsed;
        const minutes = Math.floor(timeUntilNudge / 60);
        const seconds = timeUntilNudge % 60;
        nextNudge.textContent = `Next nudge in ${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else if (completedNudges.size > 0 && completedNudges.size === nudgeTimes.length) {
        nextNudge.textContent = 'All nudges completed';
    } else {
        nextNudge.textContent = '';
    }
}

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update the timer display
function updateDisplay() {
    timeText.textContent = formatTime(remainingSeconds);
    
    // Update progress bar (showing time elapsed)
    const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update nudge markers
    const elapsed = totalSeconds - remainingSeconds;
    document.querySelectorAll('.nudge-marker').forEach(marker => {
        const markerTime = parseInt(marker.dataset.time);
        if (elapsed >= markerTime) {
            marker.classList.add('completed');
        }
    });
    
    updateNextNudgeDisplay();
}

// Check for nudges
function checkNudges() {
    const elapsed = totalSeconds - remainingSeconds;
    
    nudgeTimes.forEach(nudgeTime => {
        if (elapsed >= nudgeTime && !completedNudges.has(nudgeTime)) {
            completedNudges.add(nudgeTime);
            playChime();
            
            // Visual feedback
            timeText.classList.add('nudge-alert');
            setTimeout(() => {
                timeText.classList.remove('nudge-alert');
            }, 1500);
            
            // Show notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Nudge O\'Clock', {
                    body: `Time check! ${formatTime(remainingSeconds)} remaining`
                });
            }
        }
    });
}

// Timer tick
function tick() {
    if (isPaused) return;
    
    remainingSeconds--;
    updateDisplay();
    checkNudges();
    
    if (remainingSeconds <= 0) {
        stopTimer();
        statusText.textContent = 'Timer Complete!';
        playChime();
        setTimeout(() => playChime(), 300);
        
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nudge O\'Clock', {
                body: 'Timer complete!'
            });
        }
    }
}

// Start the timer
function startTimer() {
    const minutes = parseInt(minutesInput.value);
    if (!minutes || minutes < 1) {
        alert('Please enter a valid duration');
        return;
    }
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
    
    totalSeconds = minutes * 60;
    remainingSeconds = totalSeconds;
    nudgeTimes = calculateNudgeTimes(minutes);
    completedNudges.clear();
    
    timerSetup.style.display = 'none';
    timerDisplay.style.display = 'block';
    
    createNudgeMarkers();
    updateDisplay();
    
    statusText.textContent = 'Running...';
    pauseBtn.textContent = 'Pause';
    isPaused = false;
    
    timerInterval = setInterval(tick, 1000);
}

// Stop the timer
function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Pause/Resume the timer
function togglePause() {
    isPaused = !isPaused;
    
    if (isPaused) {
        pauseBtn.textContent = 'Resume';
        statusText.textContent = 'Paused';
    } else {
        pauseBtn.textContent = 'Pause';
        statusText.textContent = 'Running...';
    }
}

// Reset the timer
function resetTimer() {
    stopTimer();
    timerDisplay.style.display = 'none';
    timerSetup.style.display = 'block';
    completedNudges.clear();
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetTimer);

// Allow Enter key to start timer
minutesInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startTimer();
    }
});
