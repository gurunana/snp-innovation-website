/* ========================================
   MAIN.JSX - Application Entry Point
   Renders the App component into the DOM
   ======================================== */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initScrollAnimations } from './utils/scrollAnimations.js';

// Start scroll-reveal observer after first paint
// This watches all .reveal / .reveal-left elements and adds .is-visible
// when they enter the viewport, triggering the CSS transition in index.css
window.addEventListener('load', initScrollAnimations);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
