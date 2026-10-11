import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import '@fontsource-variable/manrope';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import App from './App';
import './styles/global.scss';

// La copia HTML puede abrirse con doble clic; el sitio publicado usa URLs normales.
const Router = window.location.protocol === 'file:' || window.__DSM_HTML_PREVIEW__
  ? HashRouter : BrowserRouter;

const app = (
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
const root = document.getElementById('root');
if (root.dataset.prerendered && !window.__DSM_HTML_PREVIEW__ && window.location.protocol !== 'file:') hydrateRoot(root, app);
else createRoot(root).render(app);
