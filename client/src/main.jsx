import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import './index.css';
import { ScanProvider } from './context/ScanContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <ScanProvider>
        <App />
      </ScanProvider>
    </ToastProvider>
  </React.StrictMode>,
);
