import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create an HTTP link to your GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',  // Replace with your server URL if different
});

// Initialize Apollo Client with a cache and link
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

