import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider } from './context/RouterContext';
import { SocialShareProvider } from './context/SocialShareContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider>
        <SocialShareProvider>
          <App />
        </SocialShareProvider>
      </RouterProvider>
    </ErrorBoundary>
  </StrictMode>,
);
