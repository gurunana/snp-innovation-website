/* ========================================
   API UTILITY
   Two layers:
   1. Web3Forms — free pre-built email API (active now for testing)
      → Form data goes to dhokeayush0@gmail.com
      → No server needed, completely free
      → Replace ACCESS_KEY with key from web3forms.com
   2. Axios instance for Spring Boot (future production backend)
   ======================================== */

import axios from 'axios';

// ─────────────────────────────────────────────────────────────
// WEB3FORMS CONFIG
// Step 1: Go to https://web3forms.com
// Step 2: Enter dhokeayush0@gmail.com → click "Create Access Key"
// Step 3: Check your email and copy the key here
// ─────────────────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = '2c45df89-7659-443e-b4fb-5d6ecd2d40eb';

// Web3Forms endpoint — this is a public pre-built API, no server needed
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/**
 * submitForm — sends any form data to dhokeayush0@gmail.com via Web3Forms
 *
 * @param {string} formName  - Label shown in the email subject line
 *                             e.g. "Contact Form", "STEM Lab Enquiry", "Career Registration"
 * @param {object} formData  - Key-value pairs from the form
 * @returns {Promise<{success: boolean, message: string}>}
 *
 * Usage in any component:
 *   import { submitForm } from '../../utils/api';
 *   const result = await submitForm('Contact Form', { name, email, message });
 */
export const submitForm = async (formName, formData) => {
  // Build the payload Web3Forms expects
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,       // your free API key
    subject: `New ${formName} — SNP Innovation Website`,  // email subject
    from_name: 'SNP Innovation Website',    // sender name in email
    ...formData,                            // all form fields spread in
  };

  const response = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || 'Form submission failed');
  }

  return { success: true, message: result.message };
};

// ─────────────────────────────────────────────────────────────
// AXIOS INSTANCE — for future Spring Boot backend
// Change API_BASE_URL when your backend is deployed
// ─────────────────────────────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Request interceptor — add auth token here in the future if needed
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor — global error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
