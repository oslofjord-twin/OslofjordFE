import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ApolloProvider } from '@apollo/client';
import client from './api/apolloClient';

export const metadata: Metadata = {
  title: 'Oslofjord Climate Barometer',
  description: 'A project developed at the University of Oslo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='layout bg-slate-800'>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>        
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" 
        crossOrigin=""/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""></script>
      </head>
      <body>
        <Header/>
        <main className='overflow-hidden'>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
