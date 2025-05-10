import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import IntroAnimation from "@/components/IntroAnimation";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata = {
  title: 'Kiva - Join the Waitlist',
  description: 'Join the waitlist for Kiva, a community-powered marketplace platform connecting artisans with customers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <IntroAnimation />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
