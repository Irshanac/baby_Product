// index.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './contexts/ContextCard.jsx'; // Import Provider
import { FavoriteProvider } from './contexts/ContextFavorite.jsx' // Import Provider
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminContext from './contexts/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <FavoriteProvider>
        <AdminContext>
        <App />
        </AdminContext>
       
      </FavoriteProvider>
    </CartProvider>
  </StrictMode>,
);
