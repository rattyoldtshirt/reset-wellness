import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'RESET — A Little Care, Every Day | Women’s Gentle Wellness',
  description:
    'A peaceful, approachable wellness companion that helps women rebuild physical and mental wellbeing through small, sustainable daily habits.',
  keywords: [
    'womens wellness',
    'gentle fitness',
    'arthritis friendly exercise',
    'breathwork',
    'mindful habits',
    'cycle tracking',
    'intuitive nourishment',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8F5EE] text-[#2C382A] selection:bg-[#E8C4CA] selection:text-[#2C382A]">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
