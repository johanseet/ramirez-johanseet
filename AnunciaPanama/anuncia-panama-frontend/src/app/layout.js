"use client"
import Navbar from '@components/navigation/Navbar';
import Footer from '@components/navigation/Footer';
import { AuthProvider } from '@contexts/authContext';
import { RouteProvider } from '@contexts/routeContext';
import { usePathname } from 'next/navigation';
import '@app/globals.css';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noNavAndFooterRoutes = ['/user/register', '/auth/login', '/business/onboarding/business-info', '/business/onboarding/user-info', '/business/onboarding/select-plan', '/business/onboarding/payment'];

  const shouldHide = noNavAndFooterRoutes.includes(pathname);

  return (
    <RouteProvider>
      <AuthProvider>
        <html lang="en" className="h-full">
          <head />
          <body className={`bg-gray-50 flex flex-col min-h-screen ${shouldHide ? '' : 'pt-16'}`}>
            {!shouldHide && <Navbar />}
            <main className="flex-grow w-full">
              {children}
            </main>
            {!shouldHide && <Footer />}
          </body>
        </html>
      </AuthProvider>
    </RouteProvider>
  );
}
