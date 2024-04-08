'use client';
import { ApolloProvider } from '@apollo/client';
import client from './api/apolloClient';
import Dashboard from './pages/Dashboard/page';

export default function Home() {
  return (
    <ApolloProvider client={client()}> 
    <main>
        <Dashboard/>
      {/*<BottomNav/> ? show only on mobile; alt - MUI drawer*/}
    </main>
    </ApolloProvider>
  )
}
