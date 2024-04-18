"use client";
import { useState } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, from, split } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAuth0 } from '@auth0/auth0-react';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://localhost:8080/v1/graphql", {
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": "mylongsecretkey",
      }
    }
  })
);

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

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = typeof window !== "undefined" && wsLink != null 
? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
) : authLink.concat(httpLink);



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
    link: from([errorLink, splitLink]) ,
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
