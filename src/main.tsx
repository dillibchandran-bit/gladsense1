import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider } from './context/RouterContext';
import { SocialShareProvider } from './context/SocialShareContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <SocialShareProvider>
        <App />
      </SocialShareProvider>
    </RouterProvider>
  </StrictMode>,
);
