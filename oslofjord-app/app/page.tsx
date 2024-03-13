'use client';
import { ApolloProvider } from '@apollo/client';
import client from './api/apolloClient';
import Dashboard from './pages/Dashboard/page';

export default function Home() {
  return (
    <main>
      <ApolloProvider client={client()}>
        <Dashboard/>
      </ApolloProvider>
      {/*<BottomNav/> ? show only on mobile; alt - MUI drawer*/}
    </main>
  )
}
