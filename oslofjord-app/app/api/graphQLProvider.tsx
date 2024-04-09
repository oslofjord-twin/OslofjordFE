'use client'; 
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

interface GraphQlProps {
    children: React.ReactNode; 
}

//Used to wrap the body of the code in layout.tsx
const GraphQlProvider: React.FC<GraphQlProps> = ({
    children
}) => {
    return (
        <ApolloProvider client={client()}>
            {children}
        </ApolloProvider>

    )
}

export default GraphQlProvider; 