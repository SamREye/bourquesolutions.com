import type { Metadata } from 'next';
import { Fraunces, Manrope, Sora } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-hero',
});

export const metadata: Metadata = {
  title: 'Bourque Solutions',
  description:
    'Bourque Solutions helps businesses adopt practical AI tools, improve operational systems, and navigate procurement, supply, and export opportunities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${manrope.variable} ${sora.variable}`}>{children}</body>
    </html>
  );
}
