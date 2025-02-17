import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './components/providers/theme-provider.tsx';
import { ErrorBoundary } from './components/views';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
