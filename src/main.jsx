
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './contexts/ContextCard.jsx'; 
import { FavoriteProvider } from './contexts/ContextFavorite.jsx' 
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminContext from './contexts/AdminContext.jsx';
import UserContext from './contexts/UserContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <FavoriteProvider>
        <UserContext>
        <AdminContext>
        <App />
        </AdminContext>
        </UserContext>
      </FavoriteProvider>
    </CartProvider>
  </StrictMode>,
);
