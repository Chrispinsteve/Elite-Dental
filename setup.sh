#!/bin/bash

echo "🏥 Elite Dental App - Setup & Image Verification"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the project root."
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Check public folder
echo "📁 Checking public folder..."
if [ ! -d "public" ]; then
    echo "❌ Error: public folder not found!"
    exit 1
fi

echo "✅ Public folder exists"
echo ""

# Check for required images
echo "🖼️  Verifying images..."
images=(
    "hero-dental.svg"
    "doctor-sarah.svg"
    "doctor-james.svg"
    "doctor-emily.svg"
    "doctor-michael.svg"
    "about-clinic.svg"
    "happy-patient.svg"
    "placeholder.svg"
    "placeholder-logo.svg"
)

missing_images=()
for img in "${images[@]}"; do
    if [ -f "public/$img" ]; then
        size=$(du -h "public/$img" | cut -f1)
        echo "  ✅ $img ($size)"
    else
        echo "  ❌ $img - MISSING!"
        missing_images+=("$img")
    fi
done

echo ""

if [ ${#missing_images[@]} -gt 0 ]; then
    echo "⚠️  Warning: ${#missing_images[@]} image(s) missing:"
    for img in "${missing_images[@]}"; do
        echo "   - $img"
    done
    echo ""
    echo "These images should be in the public/ folder."
    echo "The app will use placeholders for missing images."
    echo ""
fi

# Check node_modules
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found. Running install..."
    echo ""
    
    # Detect package manager
    if command -v pnpm &> /dev/null; then
        echo "Using pnpm..."
        pnpm install --no-frozen-lockfile
    elif command -v yarn &> /dev/null; then
        echo "Using yarn..."
        yarn install
    else
        echo "Using npm..."
        npm install --legacy-peer-deps
    fi
else
    echo "✅ node_modules exists"
fi

echo ""

# Clean .next folder
echo "🧹 Cleaning build cache..."
if [ -d ".next" ]; then
    rm -rf .next
    echo "✅ Removed .next folder"
else
    echo "✅ No .next folder to clean"
fi

echo ""
echo "================================================"
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run: npm run dev (or pnpm dev / yarn dev)"
echo "  2. Open: http://localhost:3000"
echo "  3. Test images: http://localhost:3000/test-images"
echo ""
echo "If images still don't load:"
echo "  - Check IMAGES_FIX.md for troubleshooting"
echo "  - Try clearing browser cache (Ctrl+Shift+Delete)"
echo "  - Hard reload (Ctrl+Shift+R)"
echo ""
