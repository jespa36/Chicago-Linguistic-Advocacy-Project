//tsx Root layout for the LinguaChicago app
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { asset } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })

export const metadata: Metadata = {
  title: {
    default: 'LinguaChicago — Language Equity & Visibility Map',
    template: '%s · LinguaChicago',
  },
  description:
    'An interactive map of language equity in Chicago: compare the languages residents speak with the languages visible in public space across all 77 community areas.',
  icons: {
    icon: [
      { url: asset('/icon-light-32x32.png'), media: '(prefers-color-scheme: light)' },
      { url: asset('/icon-dark-32x32.png'), media: '(prefers-color-scheme: dark)' },
      { url: asset('/icon.svg'), type: 'image/svg+xml' },
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
