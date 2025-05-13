import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';

// Get client ID from environment variable
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Check if client ID is available
if (!clientId) {
  console.warn('No Google OAuth client ID found. Please set VITE_GOOGLE_CLIENT_ID in your .env file.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);