# HeyNeighbor Marketing Site

A Next.js marketing site for HeyNeighbor - helping people build community in their neighborhoods.

## Features

- 🏠 Clean, modern design with custom brand colors
- 📱 Fully responsive and mobile-friendly
- ✉️ Email capture with CSV fallback
- 🚀 Built with Next.js 14 and TailwindCSS
- ♿ Accessible design with proper contrast and focus states
- 📊 Analytics ready (Plausible integration)

## Getting Started

### Prerequisites

- Node.js 20.9.0 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Update the environment variables with your actual URLs
5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Environment Variables

Copy `.env.example` to `.env.local` and update with your values:

- `NEXT_PUBLIC_MEETING_URL` - URL for weekly community call
- `NEXT_PUBLIC_CHAPTER_START_URL` - URL for chapter application form
- `NEXT_PUBLIC_WHATSAPP_URL` - WhatsApp group invite link
- `NEXT_PUBLIC_FIND_URL` - URL for chapter directory

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/subscribe/     # Email capture API
│   ├── start/             # Start a chapter page
│   ├── find/              # Find a chapter page
│   ├── thanks/            # Thank you page
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Button.tsx
│   ├── Section.tsx
│   ├── EmailCapture.tsx
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── CalloutCard.tsx
│   └── TenStepGrid.tsx
├── content/              # Content files
│   └── steps.json        # 10-step program data
├── public/               # Static assets
│   ├── brand/logo.svg
│   └── docs/HeyNeighbor-10-Step.pdf
└── styles/               # Global styles
    └── globals.css
```

## Pages

- **Homepage** (`/`) - Main marketing page with hero, program preview, and CTAs
- **Start a Chapter** (`/start`) - Information and CTA for starting a new chapter
- **Find a Chapter** (`/find`) - Directory of existing chapters (placeholder)
- **Thank You** (`/thanks`) - Confirmation page after email signup

## Components

### Button
Reusable button component with variants (primary, secondary, ghost) and sizes.

### EmailCapture
Email signup form with validation, rate limiting, and CSV fallback.

### TenStepGrid
Grid display of the 10-step community building program.

### Section
Layout wrapper with background color options.

## Email Capture

The email capture system:
1. Validates email with Zod schema
2. Implements rate limiting (1 request per 5 seconds per IP)
3. Includes honeypot field for spam prevention
4. Saves to CSV file as fallback
5. Ready for email service provider integration

## Deployment

The site is optimized for Vercel deployment:

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## Performance

- Uses Next.js App Router for optimal performance
- Custom fonts loaded via next/font
- Optimized images and assets
- Minimal JavaScript bundle

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
