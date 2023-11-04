"use client"
import { NavBar } from '@/components/NavBar';
import { Poppins } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Providers from './providers';
import { getYear } from 'date-fns';

export const poppins = Poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

/*export const metadata: Metadata = {
  title: 'Honda App',
  description: 'Monitoreo de motos',
}*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //-------------------

  return (

    <html lang="es">
      <head>
        <link rel="icon" href="/honda.png" sizes="any" />
      </head>
      <body >

        <div className="flex flex-col h-screen justify-between">
          <Providers>
            <NavBar />
            <div className="mb-auto px-4">
              <div className="flex flex-col">
                <div className="devider py-2" />
                <div className="gird">
                  {children}
                </div>
              </div>
            </div>
            <footer className="footer footer-center p-4 bg-base-100 text-base-content">
              <div>
                <p>Copyright © {getYear(new Date())} - JWP</p>
              </div>
            </footer>
          </Providers>
        </div>
      </body>
    </html>
  )
}
