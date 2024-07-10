"use client";

import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noNavAndFooter = pathname === '/register' || pathname === '/login';

  return (
    <html lang="en" className="h-full">
      <head />
      <body className="flex flex-col min-h-screen">
        {!noNavAndFooter && <Navbar />}
        <main className={`flex-grow ${noNavAndFooter ? '' : 'pt-16'} w-full`}>
          {children}
        </main>
        {!noNavAndFooter && <Footer />}
      </body>
    </html>
  );
}
