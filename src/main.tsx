import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PortfolioContentProvider } from './context/PortfolioContentContext.tsx';
import './index.css';
import 'lenis/dist/lenis.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioContentProvider>
      <App />
    </PortfolioContentProvider>
  </StrictMode>,
);
