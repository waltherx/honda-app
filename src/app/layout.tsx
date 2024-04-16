import { poppins } from '@/config/fonts';
import { Metadata } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Providers from './providers';

/*
export const meta: Metadata = {
  title: 'Vian motos',
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
      <body className={poppins.className} >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
