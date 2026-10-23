import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://lifesecure.com'),
  title: {
    default: 'LifeSecure | Simple, Affordable Life Insurance',
    template: '%s | LifeSecure',
  },
  description: 'Get affordable life insurance in minutes. No medical exam for most applicants. Compare term, whole, and universal life policies. Free quotes, instant decisions.',
  keywords: ['life insurance', 'term life', 'whole life', 'universal life', 'life insurance quotes', 'affordable life insurance'],
  authors: [{ name: 'LifeSecure Insurance Company' }],
  creator: 'LifeSecure',
  publisher: 'LifeSecure Insurance Company',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lifesecure.com',
    siteName: 'LifeSecure',
    title: 'LifeSecure | Simple, Affordable Life Insurance',
    description: 'Get affordable life insurance in minutes. No medical exam for most applicants.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LifeSecure - Life Insurance Made Simple',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeSecure | Simple, Affordable Life Insurance',
    description: 'Get affordable life insurance in minutes. No medical exam for most applicants.',
    images: ['/images/og-image.jpg'],
    creator: '@lifesecure',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-secondary-900 min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                borderRadius: '0.75rem',
                padding: '1rem 1.25rem',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
