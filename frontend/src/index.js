import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // так как App.js в одной папке с index.js
import './styles/global.css'; // проверьте, что styles/global.css существует
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
