# Quick Customization Guide

## 🖼️ Add Your Background Image

1. Add your image to the `public/` folder
2. Name it `background.jpg` (or update the path in `app/page.tsx`)
3. Recommended size: 1920x1080px or larger
4. Formats: JPG, PNG, or WebP

## 🎨 Change Colors & Text

### Main Page (`app/page.tsx`)

**Event Name:**
```tsx
<h1 className="...">Golden Gate</h1>  // Line ~25
```

**Tagline:**
```tsx
<p className="...">Join us for an unforgettable night</p>  // Line ~28
```

**Form Title:**
```tsx
<h2 className="...">Stay Connected</h2>  // Line ~40
```

**Button Color:**
```tsx
className="... bg-gray-900 ... hover:bg-gray-800"  // Line ~70
// Change to: bg-blue-600 hover:bg-blue-700 for blue
```

## 📝 Update Metadata

Edit `app/layout.tsx`:
- Title (line 9)
- Description (line 10)
- Keywords (line 11)

## 🔗 Connect Text Service

See `app/api/signup/route.ts` for integration examples. Currently logs to console.

## 🚀 Deploy

```bash
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.
