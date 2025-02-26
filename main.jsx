// src/index.js
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store';
import { Provider } from 'react-redux';
import SuspenseContent from './containers/SuspenseContent';
import ErrorBoundary from './components/ErrorBoundary';
import axios from 'axios';  // Importa axios
import { getAuthToken } from './app/authUtils'; // Cambia esto
import { FilterProvider } from './contexts/FilterContext';

// Configura axios con el token almacenado, si existe
const token = getAuthToken();
if (token) {
    axios.defaults.headers.common['authorization'] = `${token}`;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<SuspenseContent />}>
    <Provider store={store}>
      <ErrorBoundary>
        <FilterProvider>
          <App />
        </FilterProvider>
      </ErrorBoundary>
    </Provider>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
