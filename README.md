# LifeSecure Insurance Website

A modern, production-ready life insurance website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Phase 1 (MVP) - Included
- **Public Marketing Site**
  - Homepage with hero, services overview, trust indicators, testimonials
  - Services pages (Term, Whole, Universal, Indexed Universal Life)
  - Quote form with real-time premium estimation
  - Contact form with validation
  - About page with company history, values, leadership
  - Responsive design with mobile-first approach

- **Client Portal**
  - Secure authentication with NextAuth.js
  - Dashboard with policy overview, payments, notifications
  - Policy management (view details, beneficiaries, riders, documents)
  - Payment history and document access

- **Integrations Ready**
  - Mailchimp for lead nurturing and email marketing
  - HubSpot CRM for lead management
  - Extensible for Salesforce, SendGrid, AWS S3

### Phase 2+ (Planned)
- Online application flow with e-signature
- Policy comparison tool
- Coverage calculators
- Blog/learning center
- Agent portal
- Admin dashboard

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js (Credentials provider)
- **State Management**: React Context + Hooks
- **UI Components**: Headless UI + Heroicons
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (for production)

### Installation

```bash
# Clone and navigate
cd life-insurance-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Demo Credentials
- Email: `demo@example.com`
- Password: `password123`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public routes (home, services, quote, contact, about)
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (client)/          # Protected client portal routes
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── providers.tsx      # Context providers
├── components/
│   ├── ui/                # Reusable UI components (Button, Input, Card, Modal, Badge)
│   ├── layout/            # Layout components (Header, Footer, Hero, CTA, TrustBar)
│   ├── forms/             # Form components (QuoteForm, ContactForm)
│   ├── services/          # Service components (ServiceCard)
│   └── client/            # Client portal components
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── utils.ts           # Utility functions
│   ├── validations.ts     # Zod validation schemas
│   ├── data.ts            # Mock data and content
│   └── integrations/      # Third-party integrations (Mailchimp, HubSpot)
├── types/                 # TypeScript type definitions
├── hooks/                 # Custom React hooks
└── styles/                # Global styles
```

## Key Components

### UI Components
- `Button` - Multiple variants (primary, secondary, outline, ghost, danger)
- `Input` / `Select` / `Textarea` - Form inputs with validation states
- `Card` - Flexible card component with header, content, footer
- `Badge` - Status badges with variants
- `Modal` / `ConfirmDialog` - Accessible dialogs

### Layout Components
- `Header` - Responsive navigation with mobile menu
- `Footer` - Comprehensive footer with links
- `Hero` - Flexible hero sections for different page types
- `CTASection` - Call-to-action sections
- `TrustBar` - Trust indicators and ratings
- `Testimonials` - Carousel component

### Forms
- `QuoteForm` - Multi-step quote with real-time premium estimation
- `ContactForm` - Contact form with subject routing

## Integrations

### Mailchimp
Configure in `.env.local`:
```env
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_AUDIENCE_ID=your-audience-id
MAILCHIMP_SERVER_PREFIX=us1
```

Features:
- Automatic lead capture from quote/contact forms
- Tag-based segmentation
- Event tracking

### HubSpot CRM
Configure in `.env.local`:
```env
HUBSPOT_API_KEY=your-api-key
HUBSPOT_PORTAL_ID=your-portal-id
```

Features:
- Contact creation/update
- Deal creation for quotes
- Note attachment for contact forms
- Lead status tracking

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker
```bash
docker build -t life-insurance-website .
docker run -p 3000:3000 life-insurance-website
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Production |
| `NEXTAUTH_SECRET` | NextAuth secret (32+ chars) | Yes |
| `NEXTAUTH_URL` | Site URL | Yes |
| `MAILCHIMP_API_KEY` | Mailchimp API key | For leads |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp audience ID | For leads |
| `HUBSPOT_API_KEY` | HubSpot API key | For CRM |
| `HUBSPOT_PORTAL_ID` | HubSpot portal ID | For CRM |

## Customization

### Branding
Update `tailwind.config.js` with your colors:
```js
colors: {
  primary: { /* your brand colors */ },
  secondary: { /* your neutral colors */ },
  accent: { /* your accent colors */ },
}
```

### Fonts
Update `globals.css` CSS variables:
```css
:root {
  --font-inter: 'Your Font', sans-serif;
  --font-heading: 'Your Heading Font', sans-serif;
}
```

### Content
Edit `src/lib/data.ts` for:
- Services and features
- Testimonials
- Company stats
- FAQs

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## License

Private - All rights reserved.