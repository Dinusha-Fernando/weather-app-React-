import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-vecgv0gen2ax4m0w.au.auth0.com"
      clientId="fV3O7xkL4Byu0BDTWGZB3kn00dzVc5xV"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);
