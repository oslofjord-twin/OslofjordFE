'use client';
import Dashboard from './pages/Dashboard/page';
import client from './api/apolloClient';
import { ApolloProvider } from '@apollo/client';


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
