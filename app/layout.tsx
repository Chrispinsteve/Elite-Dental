import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Elite Dental - Premium Dental Care | Book Your Appointment',
  description: 'Experience world-class dental care with cutting-edge technology and a gentle touch. Expert dentists, advanced treatments, and comfortable care at Elite Dental.',
  keywords: ['dental care', 'dentist', 'teeth cleaning', 'cosmetic dentistry', 'orthodontics', 'dental clinic', 'teeth whitening', 'dental checkup'],
  authors: [{ name: 'Elite Dental' }],
  creator: 'Elite Dental',
  publisher: 'Elite Dental',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elitedental.com',
    title: 'Elite Dental - Premium Dental Care',
    description: 'Experience world-class dental care with cutting-edge technology and a gentle touch. Book your appointment today!',
    siteName: 'Elite Dental',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Elite Dental - Premium Dental Care',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Dental - Premium Dental Care',
    description: 'Experience world-class dental care with cutting-edge technology and a gentle touch. Book your appointment today!',
    images: ['/og-image.svg'],
    creator: '@elitedental',
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
  alternates: {
    canonical: 'https://elitedental.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Elite Dental',
    description: 'Premium dental care with cutting-edge technology and expert dentists',
    url: 'https://elitedental.com',
    logo: 'https://elitedental.com/placeholder-logo.svg',
    image: 'https://elitedental.com/og-image.svg',
    telephone: '(561) 432-1718',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Healthcare Blvd',
      addressLocality: 'Lake Worth',
      addressRegion: 'FL',
      postalCode: '33467',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '26.6156',
      longitude: '-80.0564',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    acceptsReservations: true,
    hasMap: 'https://maps.google.com',
    sameAs: [
      'https://facebook.com/elitedental',
      'https://instagram.com/elitedental',
      'https://twitter.com/elitedental',
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
