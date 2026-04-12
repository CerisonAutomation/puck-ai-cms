import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Puck AI CMS',
  description: 'AI-powered visual page builder — Puck v0.21.2 + Next.js 15 + Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
