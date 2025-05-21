import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import i18n from './i18n.ts';
import './index.css';

// Extract language from current path (e.g., "/en", "/ka")
const language = window.location.pathname.split('/')[1] || 'en';

// Set initial language in i18n
if (i18n.language !== language) {
  i18n.changeLanguage(language);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={`/${language}`}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
