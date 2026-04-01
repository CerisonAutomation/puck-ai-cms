import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Puck AI CMS',
  description: 'Visual page builder powered by Puck + AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
