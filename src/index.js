import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './assets/scss/styles.scss';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
