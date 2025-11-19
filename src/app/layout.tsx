import type { Metadata } from 'next'
import StyledComponentsRegistry from '@/lib/registry'
import Providers from '@/lib/providers'
import Header from '../../components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Movies - Search for your favorite films',
  description: 'Descubre y explora películas populares',
  icons: {
    icon: '/triangle.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;400;900&family=Oswald:wght@700&family=Advent+Pro:wght@300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Header />
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
