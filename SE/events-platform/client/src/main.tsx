import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';

const qc = new QueryClient();

createRoot(
  document.getElementById('root')!
).render(
  <AuthProvider>
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={qc}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  </AuthProvider>
);
