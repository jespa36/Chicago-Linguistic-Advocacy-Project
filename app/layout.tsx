//tsx Root layout for the LinguaChicago app
import type { Metadata, Viewport } from 'next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SITE, asset } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'LinguaChicago — Language Equity & Visibility Map',
    template: '%s · LinguaChicago',
  },
  description:
    'An interactive map of language equity in Chicago: compare the languages residents speak with the languages visible in public space across all 77 community areas.',
  metadataBase: new URL(SITE.origin),
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'LinguaChicago — Language Equity & Visibility Map',
    description:
      'Compare the languages Chicagoans speak at home with the languages visible in public space across all 77 community areas.',
    url: asset('/'),
    images: [{ url: asset('/og-image.png'), width: 1200, height: 630, alt: 'LinguaChicago: Language Equity & Visibility Map' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinguaChicago — Language Equity & Visibility Map',
    description:
      'Compare the languages Chicagoans speak at home with the languages visible in public space across all 77 community areas.',
    images: [asset('/og-image.png')],
  },
  icons: {
    icon: [
      { url: asset('/icon.svg'), type: 'image/svg+xml' },
      { url: asset('/icon-32x32.png'), sizes: '32x32', type: 'image/png' },
    ],
    apple: asset('/apple-icon.png'),
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
