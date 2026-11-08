import './globals.css';
import type { Metadata } from 'next';
import { Poppins, Inter, Playfair_Display } from 'next/font/google';
import AnnouncementPopup from '@/components/announcements/AnnouncementPopup';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://loveedify.com'),
  title: {
    default: 'Love Edify Child Care Services | Faith-Based Daycare & Early Childhood Education',
    template: '%s | Love Edify Child Care Services',
  },
  description:
    'Love Edify Child Care Services provides a safe, nurturing, faith-centered environment where children grow in love, learning, and faith. Enroll today in our Christian daycare and early childhood education programs.',
  keywords: [
    'faith-based child care',
    'Christian child care',
    'Christian daycare',
    'early childhood education',
    'biblical child care',
    'child development programs',
    'safe child care environment',
    'family-centered child care',
    'Love Edify',
    'daycare center',
    'loving daycare',
    'child care services',
  ],
  authors: [{ name: 'Love Edify Child Care Services' }],
  creator: 'Love Edify Child Care Services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://loveedify.com',
    siteName: 'Love Edify Child Care Services',
    title: 'Love Edify Child Care Services | Faith-Based Daycare & Early Childhood Education',
    description:
      'A safe, nurturing, faith-centered environment where children grow in love, learning, and faith. Serving families with excellence and biblical values.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1578349035260-9f3d4042f1f7?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        width: 1200,
        height: 630,
        alt: 'Love Edify Child Care Services - Children Learning Together',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Love Edify Child Care Services',
    description: 'Faith-based child care where children grow in love, learning & faith.',
    images: ['https://images.unsplash.com/photo-1578349035260-9f3d4042f1f7?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
  },
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
  verification: {
    google: 'loveedify-google-verification',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="canonical" href="https://loveedify.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#184D47" />
      </head>
      <body className="font-inter bg-cream text-charcoal antialiased">
        {children}
        <AnnouncementPopup />
      </body>
    </html>
  );
}
