# Golden Gate - EDM Event Site

A minimal, modern Next.js application for EDM, house, and afrohouse events. Features a clean white theme with a full-width background image and a simple text message sign-up form.

## Features

- 🎨 **Minimalist Design**: Clean white theme with modern aesthetics
- 📱 **Responsive**: Works beautifully on all devices
- 🖼️ **Full-Width Background**: Easy to customize with your own sunset/beachy image
- 📝 **Text Sign-Up Form**: Simple form to collect phone numbers for your text list
- ⚡ **Fast & Optimized**: Built with Next.js 16 and Tailwind CSS 4
- 🚀 **Vercel Ready**: Deploy with a single command

## Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

   Or use the Vercel dashboard:
   - Push your code to GitHub
   - Import your repository at [vercel.com/new](https://vercel.com/new)
   - Vercel will automatically detect Next.js and deploy

3. **Connect Custom Domain**:
   - Go to your project settings on Vercel
   - Navigate to "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

## Customization

### 1. Add Your Background Image

1. Place your background image in the `public/` folder (e.g., `public/background.jpg`)
2. The image should be high-quality and at least 1920px wide for best results
3. Recommended: Sunset, beachy, or modern vibe images work best

The image path is set in `app/page.tsx`:
```tsx
backgroundImage: 'url(/background.jpg)',
```

### 2. Update Site Title and Text

Edit `app/page.tsx` to customize:
- Event name (currently "Golden Gate")
- Tagline ("Join us for an unforgettable night")
- Form heading and description

### 3. Update Metadata

Edit `app/layout.tsx` to change:
- Page title
- Meta description
- Keywords

### 4. Connect Text Message Service

The sign-up form currently logs submissions to the console. To connect a real service:

1. **Option A: Twilio** (Recommended)
   ```bash
   npm install twilio
   ```
   
   Add to `.env.local`:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_phone_number
   ```
   
   Update `app/api/signup/route.ts` with Twilio integration (see comments in file).

2. **Option B: Other Services**
   - AWS SNS
   - MessageBird
   - Your custom API

3. **Store Submissions**
   - Add a database (Supabase, MongoDB, PostgreSQL)
   - Update `app/api/signup/route.ts` to save submissions

### 5. Styling Customization

All styles use Tailwind CSS. Key customization points:

- **Colors**: Edit classes in `app/page.tsx` (e.g., `bg-white`, `text-gray-900`)
- **Fonts**: Change font in `app/layout.tsx` (currently using Inter)
- **Spacing**: Adjust padding/margins using Tailwind utilities
- **Background Overlay**: Modify the gradient overlay in `app/page.tsx`

## Project Structure

```
goldengate-popups/
├── app/
│   ├── api/
│   │   └── signup/
│   │       └── route.ts      # API endpoint for form submissions
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main event page
├── public/
│   └── background.jpg        # Your background image (add this)
└── package.json
```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add your text message service credentials here
# Example for Twilio:
# TWILIO_ACCOUNT_SID=your_account_sid
# TWILIO_AUTH_TOKEN=your_auth_token
# TWILIO_PHONE_NUMBER=+1234567890
```

Add these same variables in your Vercel project settings for production.

## Tech Stack

- **Next.js 16**: React framework
- **Tailwind CSS 4**: Utility-first CSS
- **TypeScript**: Type safety
- **Vercel**: Hosting and deployment

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)
- [Vercel deployment guide](https://vercel.com/docs)

## License

MIT
