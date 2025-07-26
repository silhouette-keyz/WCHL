import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AuthProvider } from './auth';
import { LayoutProvider } from "./contexts/LayoutContext";
import { EventProvider } from "./contexts/EventContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LayoutProvider>
      <EventProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </EventProvider>
    </LayoutProvider>
  </React.StrictMode>,
);
