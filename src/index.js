import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';  // Проверьте, что путь правильный
import './index.css';  // Ваш CSS файл для глобальных стилей
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




