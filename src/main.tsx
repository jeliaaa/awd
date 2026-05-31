import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import i18n from './i18n.ts'; // initialises i18n synchronously and exports the instance
import './index.css';

// Use the same language that i18n resolved synchronously from the path
const language = i18n.language as 'en' | 'ka';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={`/${language}`}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
