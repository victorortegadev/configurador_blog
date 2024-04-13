import { Inter } from 'next/font/google'
import './globals.css'

import { Providers } from './providers'
import ProviderBarra from '../context/ProviderBarra'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog app',
  description: 'Configurador del blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}> 
        <Providers>
          <ProviderBarra>
            {children}
          </ProviderBarra>
        </Providers>
      </body>
    </html>
  )
}