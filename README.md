# Nudge O'Clock

A simple interval timer with customizable nudges/chimes to help with time blindness.

## Features

- **Basic Timer**: Set a timer for any duration (1-1440 minutes)
- **Customizable Nudges**: Get audio and visual reminders at specific intervals:
  - **Evenly Spaced Nudges**: Split your time evenly with 1-10 nudges
  - **Percentage-Based Nudges**: Get a nudge at a specific percentage of time (e.g., 50% for halfway, 80% for the last 20%)

## How to Use

1. Open `index.html` in a web browser
2. Set your desired timer duration in minutes
3. Choose your nudge preference:
   - **Number of nudges (evenly spaced)**: Creates multiple nudges distributed evenly. For example, setting 2 nudges on a 30-minute timer will nudge at 10 and 20 minutes
   - **Nudge at percentage**: Creates a single nudge at a specific percentage. For example, 50% on a 30-minute timer will nudge at 15 minutes, or 80% will nudge at 24 minutes
4. Click "Start Timer"
5. The timer will display remaining time, a progress bar with visual markers for nudges, and countdown to the next nudge
6. When a nudge occurs, you'll hear a chime sound and see a visual pulse effect
7. Use Pause/Resume and Reset buttons to control the timer

## Use Cases

- **Half-way reminder**: Set 1 nudge or 50% to know when you're halfway done
- **Regular check-ins**: Set 2-3 nudges to check in multiple times during the duration
- **End warning**: Use 80% to get reminded when you're approaching the end (entering the last 20% of time)
- **Study/work sessions**: Set a 25-minute timer with a nudge at 80% (20 minutes) for Pomodoro-style work

## Technical Details

- Pure HTML/CSS/JavaScript - no build process required
- Uses Web Audio API for chime sounds
- Supports browser notifications (with permission)
- Responsive design works on desktop and mobile

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- Web Audio API
- CSS Grid and Flexbox
