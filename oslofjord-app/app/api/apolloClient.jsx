"use client";

import { useState } from 'react';
import { makeVar } from '@apollo/client';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from '@auth0/auth0-react';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

const authLink = setContext(() => {
  return {
    headers: {
      "x-hasura-admin-secret": "mylongsecretkey",
    }
  }
});

const createApolloClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
};
    
const client = () => {
  const { loading, logout } = useAuth0();
  if (loading) {
    <div>Loading...</div>
  }

  const [apolloClient] = useState(createApolloClient());

  return (
    apolloClient
  )
}


export default client;