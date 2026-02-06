# Elite Dental App - Patient and Staff Zones

A Next.js application with separate patient and staff dashboards for dental practice management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

#### Option 1: Using pnpm (Recommended)
```bash
# Install dependencies
pnpm install

# If you get a frozen-lockfile error, use:
pnpm install --no-frozen-lockfile

# Run development server
pnpm dev
```

#### Option 2: Using npm
```bash
# Install dependencies
npm install

# If you get dependency conflicts, use:
npm install --legacy-peer-deps

# Run development server
npm run dev
```

#### Option 3: Using yarn
```bash
# Install dependencies
yarn install

# Run development server
yarn dev
```

## 🔧 Dependency Issues Fixed

### Changes Made:
1. **Updated `react-day-picker`** from `8.10.1` to `^9.4.3`
   - Version 9.x supports `date-fns@4.x`
   - Fixes peer dependency conflicts

2. **Removed old lockfile**
   - Clean slate for dependency resolution
   - Regenerates on install

### If You Still Have Issues:

#### For pnpm users:
```bash
# Remove node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install --no-frozen-lockfile
```

#### For npm users:
```bash
# Remove node_modules and lockfile
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install --legacy-peer-deps
```

## 📦 Key Dependencies

- **Next.js 16.0.7** - React framework
- **React 19** - UI library
- **date-fns 4.1.0** - Date utility library
- **react-day-picker ^9.4.3** - Calendar component (updated)
- **Radix UI** - Headless UI components
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library

## 🏗️ Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── elite-dental-app.tsx # Main app component
│   ├── patient-dashboard.tsx # Patient interface
│   ├── staff-dashboard.tsx   # Staff interface
│   └── ui/                   # Reusable UI components
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
├── public/                   # Static assets
└── styles/                   # Additional styles
```

## 🎯 Features

### Patient Dashboard
- View appointments
- Access medical records
- Manage prescriptions
- Communicate with staff

### Staff Dashboard
- Patient management
- Appointment scheduling
- Treatment planning
- Administrative tools

### 🎨 Simple SVG Images
All images are now lightweight SVG graphics (~19KB total) instead of large JPG files. This ensures:
- ✅ Instant loading
- ✅ No image optimization issues
- ✅ Works everywhere without configuration
- ✅ Clean, professional appearance
- ✅ Perfect for development and production

### 📱 Mobile Input Zoom Fix
No more annoying zoom when tapping input fields! The app now:
- ✅ Prevents automatic zoom on mobile devices
- ✅ Uses 16px font size for inputs on mobile (prevents iOS Safari zoom)
- ✅ Provides smooth, professional mobile experience
- ✅ See `MOBILE_ZOOM_FIX.md` for technical details

## 🛠️ Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## 🌐 Environment

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Notes

- The `react-day-picker` component was updated to v9 for compatibility with `date-fns` v4
- If you're using the calendar component, the API may have minor changes from v8 to v9
- Check [react-day-picker documentation](https://react-day-picker.js.org/) for migration details if needed

## 🐛 Troubleshooting

### Issue: `ERESOLVE unable to resolve dependency tree`
**Solution:** Use `npm install --legacy-peer-deps`

### Issue: `Cannot install with "frozen-lockfile"`
**Solution:** Use `pnpm install --no-frozen-lockfile` or delete lockfile and reinstall

### Issue: Calendar component not working
**Solution:** Ensure you're using the updated `react-day-picker` v9 API

### Issue: Images not loading or showing placeholders
**Good news:** All images are now simple SVG files that should load instantly! If you still have issues:

1. **Quick fix - Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Test images directly:**
   - Visit: `http://localhost:3000/test-images`
   - Or try: `http://localhost:3000/doctor-sarah.svg`

4. **Check browser console** (F12) for 404 errors or image loading issues

5. **Clear browser cache:**
   - Chrome/Edge: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Cmd+Option+E

6. **Hard reload page:**
   - Windows/Linux: Ctrl+Shift+R
   - Mac: Cmd+Shift+R

7. **Verify images exist:**
   ```bash
   ls -la public/
   # Should show: hero-dental.svg, doctor-*.svg, etc.
   ```

**For detailed image troubleshooting, see IMAGES_FIX.md**

## 📄 License

This project is private and proprietary.
