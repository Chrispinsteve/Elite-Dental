# SEO & Social Sharing Setup

## 🎯 What's Included

Your Elite Dental app now has professional metadata for social media sharing and SEO!

### Social Media Preview
When you share your website link on:
- ✅ **WhatsApp** - Shows card with image, title, description
- ✅ **Facebook** - Beautiful preview with OG image
- ✅ **Twitter/X** - Large image card
- ✅ **LinkedIn** - Professional preview
- ✅ **iMessage** - Rich link preview
- ✅ **Telegram** - Image and text preview

### SEO Features
- ✅ Structured data (JSON-LD) for Google
- ✅ Meta tags for search engines
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Favicon
- ✅ Keywords optimization

## 📝 How to Customize

### 1. Update Your Domain URL

**File:** `app/layout.tsx`

Find and replace `https://elitedental.com` with your actual domain:

```typescript
url: 'https://YOUR-DOMAIN.com',
```

### 2. Update Business Information

**File:** `app/layout.tsx`

Update the structured data section:

```typescript
const structuredData = {
  name: 'Your Dental Clinic Name',
  telephone: '(555) 123-4567',
  address: {
    streetAddress: '456 Main Street',
    addressLocality: 'Your City',
    addressRegion: 'CA',
    postalCode: '90210',
    addressCountry: 'US',
  },
  // ... update other fields
}
```

### 3. Customize Social Media Image

**Option A: Use the included SVG**
The default OG image is at `/public/og-image.svg` - it's simple and professional.

**Option B: Create a custom image**
1. Create an image **1200x630 pixels** (required for social media)
2. Save as `og-image.png` or `og-image.jpg` in `/public/`
3. Update in `app/layout.tsx`:

```typescript
images: [
  {
    url: '/og-image.png',  // or .jpg
    width: 1200,
    height: 630,
    alt: 'Your Clinic Name',
  },
],
```

**Design Tips for OG Image:**
- Use your brand colors
- Include your logo
- Add a clear tagline
- Keep text large and readable
- Avoid small details

### 4. Update Meta Description

**File:** `app/layout.tsx`

```typescript
description: 'Your custom description here (155 characters or less)',
```

### 5. Add Your Social Media Handles

**File:** `app/layout.tsx`

```typescript
sameAs: [
  'https://facebook.com/yourpage',
  'https://instagram.com/yourhandle',
  'https://twitter.com/yourhandle',
],
```

```typescript
twitter: {
  creator: '@yourhandle',
},
```

## 🧪 Testing Your Setup

### Test Social Previews

1. **Facebook Debugger**
   - Visit: https://developers.facebook.com/tools/debug/
   - Enter your URL
   - Click "Scrape Again" to refresh

2. **Twitter Card Validator**
   - Visit: https://cards-dev.twitter.com/validator
   - Enter your URL

3. **LinkedIn Post Inspector**
   - Visit: https://www.linkedin.com/post-inspector/
   - Enter your URL

4. **WhatsApp**
   - Just paste your URL in a chat
   - Preview should appear automatically

### Test SEO

1. **Google Rich Results Test**
   - Visit: https://search.google.com/test/rich-results
   - Enter your URL
   - Should show "Dentist" structured data

2. **Google Mobile-Friendly Test**
   - Visit: https://search.google.com/test/mobile-friendly
   - Enter your URL

## 📱 Current Metadata

### Title
**Elite Dental - Premium Dental Care | Book Your Appointment**

### Description
**Experience world-class dental care with cutting-edge technology and a gentle touch. Expert dentists, advanced treatments, and comfortable care at Elite Dental.**

### OG Image
**/og-image.svg** (1200x630 SVG)
- Teal gradient background
- Tooth icon
- Company name
- Key features

### Favicon
**/favicon.svg** (32x32 SVG)
- Teal background
- White tooth icon

## 🎨 Customization Examples

### Example 1: Change OG Image to PNG

```typescript
// In app/layout.tsx
openGraph: {
  images: [
    {
      url: 'https://yourdomain.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Your Clinic Name - Dental Care',
    },
  ],
},
```

### Example 2: Different Title for Social vs SEO

```typescript
// Page title (shown in browser tab)
title: 'Elite Dental - Book Online',

// Social media title
openGraph: {
  title: 'Elite Dental - #1 Rated Dentist in Your City',
},
```

### Example 3: Add Multiple Languages

```typescript
openGraph: {
  locale: 'en_US',
  alternateLocale: ['es_ES', 'fr_FR'],
},
```

## 🔍 What Each Platform Shows

| Platform | Shows | Image Size |
|----------|-------|------------|
| WhatsApp | Title + Description + Image | 1200x630 |
| Facebook | Title + Description + Image + Domain | 1200x630 |
| Twitter | Large Image Card | 1200x630 |
| LinkedIn | Professional Card with Image | 1200x628 |
| iMessage | Rich Preview | 1200x630 |
| Telegram | Image + Title + Description | 1200x630 |

## 📊 Structured Data Benefits

The JSON-LD structured data helps Google show:
- ⭐ Star ratings (when you add reviews)
- 📍 Location in Google Maps
- 📞 Click-to-call phone number
- ⏰ Business hours
- 💰 Price range indicator

## 🚀 After Deployment

Once you deploy to production:

1. **Submit to Google**
   - Google Search Console: https://search.google.com/search-console
   - Submit your sitemap

2. **Monitor Performance**
   - Track social shares
   - Monitor SEO rankings
   - Check click-through rates

3. **Update Regularly**
   - Refresh OG image seasonally
   - Update business hours
   - Add new services

## ⚠️ Important Notes

- **Always use HTTPS** for production URLs
- **Test before going live** using the validators above
- **Update the domain** from placeholder to real domain
- **Keep images optimized** (under 300KB for fast loading)
- **Use absolute URLs** (include https://) for all images

## 🎁 Bonus: Quick Social Share Test

Want to test quickly? Use this bookmarklet:

```javascript
javascript:(function(){window.open('https://developers.facebook.com/tools/debug/?q='+encodeURIComponent(location.href),'_blank')})()
```

Drag to bookmarks bar → Click when on your site → Instantly see Facebook preview!

---

**Need help?** Check the official documentation:
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org](https://schema.org/Dentist)
