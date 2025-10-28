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
- `npm run build` - Build for production to `dist/` folder
- `npm run preview` - Preview production build
- `npm run clean` - Clean build directory

### GitHub Pages Deployment
This project is configured for automatic deployment to GitHub Pages:

#### Automatic Deployment
1. **Push to main branch** - Automatic deployment via GitHub Actions
2. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - The site will be available at: `https://Hkly.github.io/nudge-o-clock`

#### Manual Deployment (if needed)
```bash
# Build the project
npm run build

# The dist/ folder contains the static files ready for deployment
# You can upload the contents of dist/ to any static hosting service
```

#### GitHub Actions Workflow
The project includes a `.github/workflows/deploy.yml` file that:
- Automatically builds the project when code is pushed to main
- Deploys the built files to GitHub Pages
- Uses Node.js 18 and caches dependencies for faster builds

### CSS Architecture
The project uses a sophisticated CSS setup with:
- **CSS Custom Properties** for dynamic theming
- **Tailwind Components** for reusable UI elements
- **CSS Variables** that adapt to light/dark themes
- **Utility Classes** for rapid development

### Custom CSS Variables
The application uses CSS custom properties for theming:
```css
:root {
  --color-primary: theme('colors.primary.500');
  --color-background: theme('colors.white');
  --gradient-primary: linear-gradient(...);
}

.dark {
  --color-primary: theme('colors.primary.400');
  --color-background: theme('colors.gray.800');
}
```

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
├── dist/                 # Production build output
├── index.html           # Main application file
├── timer.js            # JavaScript functionality
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── package.json        # Dependencies and scripts
└── README.md          # This documentation
```

## 🎯 Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Semantic HTML and proper ARIA labels
- **High Contrast**: Excellent contrast ratios in both themes
- **Visual Indicators**: Clear progress visualization with color coding
- **Audio Feedback**: Optional sound alerts for time events

## 🔄 Migration from CSS to Tailwind

This application has been fully migrated from custom CSS to Tailwind CSS with a proper build system, providing:
- **Consistent Design**: Utility classes ensure design consistency
- **Better Maintainability**: Atomic CSS approach reduces style conflicts
- **Responsive Design**: Built-in responsive utilities
- **Advanced Theming**: CSS custom properties with Tailwind integration
- **Performance**: Optimized CSS output with PurgeCSS
- **Developer Experience**: Hot reload and build optimization with Vite
- **CSS Variables**: Theme-aware custom properties for dynamic styling

## 📱 Responsive Design

The application adapts seamlessly across devices:
- **Desktop**: Full-featured interface with hover effects
- **Tablet**: Touch-friendly controls with appropriate sizing
- **Mobile**: Optimized layout for small screens

## 🎵 Audio Features

- **Pleasant Chimes**: Dual-tone alert system using Web Audio API
- **No External Files**: Sounds generated programmatically
- **Respectful Volume**: Moderate volume levels for workplace use

---

**Made with ❤️ for people with time blindness and anyone who needs gentle time reminders.**
