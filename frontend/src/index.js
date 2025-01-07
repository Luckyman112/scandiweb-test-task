import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './styles/global.css';

// Создание Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000', // URL твоего GraphQL-сервера
  cache: new InMemoryCache(),
});

// Рендеринг приложения
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

