# Nudge O'Clock - Interval Timer

A timer application with interval nudges designed to help with time blindness. Now featuring Tailwind CSS styling and dual theme support!

## ✨ Features

- **Customizable Timer**: Set timer duration from 1 to 1440 minutes
- **Flexible Nudges**: Choose between evenly spaced nudges or percentage-based alerts
- **Visual Progress**: Toggle between linear progress bar and circular progress display
- **Audio Alerts**: Pleasant chime sounds for nudges and completion
- **Desktop Notifications**: Browser notifications for nudges (with permission)
- **Dual Themes**: Toggle between light and dark modes with persistent settings
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Time Blindness Support**: Clear visual and audio cues to help track time passage

## 🎨 New Design Features

### Theme Switching
- **Light Theme**: Clean, bright interface with blue gradient background
- **Dark Theme**: Comfortable dark interface for low-light environments
- **Theme Toggle**: Floating button in bottom-right corner (🌙/☀️)
- **Persistent Settings**: Your theme preference is saved in localStorage

### Visual Improvements
- **Tailwind CSS**: Modern utility-first styling for consistent design
- **Smooth Transitions**: All interactions have elegant 300ms transitions
- **Enhanced Accessibility**: Better contrast ratios and focus states
- **Refined Typography**: System font stack for optimal readability

## 🚀 Usage

1. **Set Duration**: Enter your desired timer duration in minutes
2. **Configure Nudges**:
   - Choose "Number of nudges" for evenly spaced alerts
   - Or select "Nudge at percentage" for a specific time point
3. **Choose Display**: Toggle between bar and circular progress views
4. **Start Timer**: Click "Start Timer" or press Enter
5. **Manage Session**: Use Pause/Resume and Reset controls as needed
6. **Switch Themes**: Click the theme toggle button (🌙/☀️) anytime

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup structure
- **Tailwind CSS**: Utility-first CSS framework with custom build
- **Vite**: Fast build tool and development server
- **PostCSS**: CSS processing with Autoprefixer
- **Vanilla JavaScript**: No dependencies, pure JS functionality
- **Web Audio API**: For generating chime sounds
- **Notifications API**: For desktop notifications
- **localStorage**: For theme persistence

### Build System
This project uses **Vite** as the build tool with **Tailwind CSS** for styling:

#### GitHub Pages Configuration
- **Base Path**: Automatically configured for GitHub Pages (`/nudge-o-clock/`)
- **Static Assets**: All assets are properly referenced for subdirectory deployment
- **Production Build**: Optimized for static hosting with asset bundling

#### Development
```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev
```

#### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

#### Available Scripts
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production to `docs/` folder
- `npm run preview` - Preview production build
- `npm run clean` - Clean build directory



### Browser Compatibility
- Modern browsers with ES6+ support
- CSS Custom Properties support required
- Web Audio API support required for chimes
- Notifications API optional (graceful degradation)

### File Structure
```
nudge-o-clock/
├── src/
│   └── style.css         # Main CSS with Tailwind directives
├── docs/                 # Production build output (GitHub Pages)
├── index.html           # Main application file
├── timer.js            # JavaScript functionality
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── package.json        # Dependencies and scripts
└── README.md          # This documentation
```


## 🎵 Audio Features

- **Pleasant Chimes**: Dual-tone alert system using Web Audio API
- **No External Files**: Sounds generated programmatically
- **Respectful Volume**: Moderate volume levels for workplace use

---

**Made with ❤️ for people with time blindness and anyone who needs gentle time reminders.**
