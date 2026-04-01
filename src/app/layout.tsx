import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Puck AI CMS',
  description: 'Visual page builder powered by @measured/puck, Vercel KV, and Gemini AI.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Puck AI CMS',
    description: 'Drag-and-drop CMS with AI generation',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
