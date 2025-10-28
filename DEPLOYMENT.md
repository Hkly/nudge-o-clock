# GitHub Pages Deployment Checklist

## Setup (One-time)

### 1. Enable GitHub Pages
- Go to your repository on GitHub
- Navigate to **Settings** → **Pages**
- Under "Source", select **"GitHub Actions"**
- Save the settings

### 2. Verify Configuration
- ✅ Repository name matches the base path in `vite.config.js` (`/nudge-o-clock/`)
- ✅ Homepage URL in `package.json` points to the correct GitHub Pages URL
- ✅ GitHub Actions workflow file exists at `.github/workflows/deploy.yml`

## Deployment Process

### Automatic Deployment (Recommended)
1. **Push changes to main branch**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Check deployment status**
   - Go to Actions tab in your GitHub repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Deployment typically takes 2-3 minutes

3. **Access your site**
   - Site URL: https://Hkly.github.io/nudge-o-clock
   - May take a few minutes to update after deployment

### Manual Build (For testing)
```bash
# Test the build locally
npm run build

# Preview the production build
npm run preview
```

## Troubleshooting

### Common Issues
- **404 errors**: Check that base path in `vite.config.js` matches repository name
- **CSS not loading**: Ensure assets are properly referenced in build
- **Deployment fails**: Check GitHub Actions logs in the Actions tab

### Verification Steps
1. Build completes without errors: `npm run build`
2. Preview works locally: `npm run preview`
3. GitHub Actions workflow succeeds
4. Site loads at the GitHub Pages URL

## File Structure for Deployment
```
dist/                 # Production build output
├── index.html       # Main HTML file
└── assets/          # Bundled CSS and JS files
    ├── main-[hash].js
    └── style-[hash].css
```