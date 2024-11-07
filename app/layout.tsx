import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AppSidebar } from "@/components/sidebar"
import { cn } from '@/lib/utils';
import { JetBrains_Mono } from "next/font/google";
import { Courier_Prime } from 'next/font/google'
import { SettingsProvider } from './providers/settings-provider'

const inter = Inter({ subsets: ['latin'] });
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
});

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PaperParsley - Modern Document Processing',
  description: 'Intelligent document processing and management platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/courier-prime.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={cn(
        courierPrime.className, 
        'min-h-screen bg-background antialiased',
        jetbrainsMono.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <main className="flex-1 overflow-hidden">
                {children}
              </main>
            </div>
            <Toaster />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}