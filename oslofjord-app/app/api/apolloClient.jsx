"use client";

import { useState } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAuth0 } from '@auth0/auth0-react';

const httpLink = createHttpLink({
  uri: 'http://172.17.0.1:8080/v1/graphql',
});

const authLink = setContext(() => {
  return {
    headers: {
      "x-hasura-admin-secret": "mylongsecretkey",
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});


const createApolloClient = () => {
  return new ApolloClient({
    //link: authLink.concat(httpLink),
    link: from([errorLink, authLink.concat(httpLink)]),
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