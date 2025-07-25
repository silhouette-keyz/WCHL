import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AuthProvider } from './auth';
import { LayoutProvider } from "./contexts/LayoutContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LayoutProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LayoutProvider>
  </React.StrictMode>,
);
