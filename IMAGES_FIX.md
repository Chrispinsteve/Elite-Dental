# Image Loading Issues - Troubleshooting Guide

## Problem: Images Not Appearing

If doctor images, hero image, or other images are not showing up, follow these steps:

## Quick Fixes

### 1. Clear Next.js Cache
```bash
# Delete .next folder and rebuild
rm -rf .next
npm run dev
# or
pnpm dev
```

### 2. Check Public Folder
Verify all images exist in the `public/` folder:
```bash
ls -la public/
```

Expected files (all SVG - lightweight and guaranteed to load):
- ✅ hero-dental.svg
- ✅ doctor-sarah.svg
- ✅ doctor-james.svg
- ✅ doctor-emily.svg
- ✅ doctor-michael.svg
- ✅ about-clinic.svg
- ✅ happy-patient.svg
- ✅ placeholder.svg
- ✅ placeholder-logo.svg

**Note:** All images are now simple SVG files (total ~19KB) instead of large JPG files. This ensures fast loading and eliminates image loading issues!

### 3. Restart Development Server
```bash
# Kill the current process (Ctrl+C)
# Then restart
npm run dev
# or
pnpm dev
```

### 4. Check Browser Console
Open your browser's developer tools (F12) and check the Console tab for errors like:
- `404 Not Found` - Image file missing
- `Failed to load resource` - Path incorrect
- CORS errors - Image blocking issue

## Common Issues & Solutions

### Issue 1: Images Show Placeholder
**Symptom**: Gray boxes or placeholder SVG instead of actual images

**Solution**:
1. Check if images are actually in `public/` folder
2. Verify file names match exactly (case-sensitive!)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard reload page (Ctrl+Shift+R or Cmd+Shift+R)

### Issue 2: Images Load Slowly
**Symptom**: Images take long time to appear or don't load at all

**Solution**:
1. The images might be large. They're already in the public folder
2. Next.js is configured with `unoptimized: true` for faster development
3. Make sure you're not throttling network in dev tools

### Issue 3: 404 Errors for Images
**Symptom**: Console shows "GET /doctor-sarah.jpg 404"

**Solution**:
```bash
# Ensure images are in public folder, not src/public or app/public
ls -la public/

# Images should be directly in public/, not in a subfolder
# ✅ Correct: public/doctor-sarah.jpg
# ❌ Wrong: public/images/doctor-sarah.jpg
```

### Issue 4: Images Work Locally But Not in Production Build
**Symptom**: Images show in `npm run dev` but not in `npm run build && npm start`

**Solution**:
```bash
# Clean build and try again
rm -rf .next
npm run build
npm start
```

## Testing Images

### Test 1: Direct Access
Try accessing an image directly in your browser:
```
http://localhost:3000/doctor-sarah.svg
```

If this doesn't work:
- Image is missing from `public/`
- Development server isn't running
- Port 3000 is being used by another process

### Test 2: Image Component
Create a simple test page to verify Next.js Image component works:

```tsx
// app/test-images/page.tsx
import Image from 'next/image'

export default function TestImages() {
  return (
    <div className="p-8">
      <h1>Image Test Page</h1>
      
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <h2>Using img tag:</h2>
          <img src="/doctor-sarah.svg" alt="Doctor Sarah" width="200" />
        </div>
        
        <div>
          <h2>Using Next Image:</h2>
          <Image 
            src="/doctor-sarah.svg" 
            alt="Doctor Sarah" 
            width={200} 
            height={200}
          />
        </div>
      </div>
    </div>
  )
}
```

Visit `http://localhost:3000/test-images` to see if images load.

## Alternative: Using Standard img Tags

If Next.js Image component continues to have issues, you can temporarily use standard `img` tags:

### Find and Replace in page.tsx:

**Replace:**
```tsx
<Image
  src="/hero-dental.svg"
  alt="Modern dental clinic interior"
  fill
  className="object-cover"
  priority
/>
```

**With:**
```tsx
<img
  src="/hero-dental.svg"
  alt="Modern dental clinic interior"
  className="absolute inset-0 w-full h-full object-cover"
/>
```

**For doctor cards, replace:**
```tsx
<Image
  src={d.photo || "/placeholder.svg"}
  alt={d.name}
  fill
  className="object-cover group-hover:scale-105 transition-transform duration-300"
/>
```

**With:**
```tsx
<img
  src={d.photo || "/placeholder.svg"}
  alt={d.name}
  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
/>
```

## Fallback Plan: Use Placeholder Images

If images still don't load, use colored placeholders:

```tsx
// Replace image src with placeholder
<div className="w-full h-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
  <User className="w-20 h-20 text-white opacity-50" />
</div>
```

## Still Having Issues?

1. **Check file permissions**: Ensure images are readable
   ```bash
   chmod 644 public/*.jpg public/*.svg
   ```

2. **Check if Next.js is serving static files**: Visit `http://localhost:3000/placeholder.svg` - if this doesn't work, Next.js isn't serving the public folder correctly

3. **Try a fresh install**:
   ```bash
   rm -rf node_modules .next
   npm install
   npm run dev
   ```

4. **Check Next.js version**: Ensure you're on a stable version
   ```bash
   npm list next
   # Should show: next@16.0.7
   ```

## Image Sizes Reference

Current images in public folder (all SVG - super lightweight!):
- hero-dental.svg: ~2KB
- doctor-sarah.svg: ~1.3KB  
- doctor-james.svg: ~1.3KB
- doctor-emily.svg: ~1.5KB
- doctor-michael.svg: ~1.5KB
- about-clinic.svg: ~1.8KB
- happy-patient.svg: ~2.7KB

**Total: ~19KB** (vs previous 700KB+ with JPG images!)

All images are simple SVG graphics that load instantly and work everywhere.

## Need More Help?

If none of these solutions work:
1. Check that you're on the correct port (default: 3000)
2. Try a different browser
3. Disable browser extensions temporarily
4. Check your antivirus/firewall isn't blocking local resources
