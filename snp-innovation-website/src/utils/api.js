/* ========================================
   API UTILITY
   1. Web3Forms - free email API (sends to nikhilgujar902@gmail.com)
   2. Supabase  - saves every form submission to DB for reports
   3. Axios     - Spring Boot backend (future use)
   ======================================== */

import axios from 'axios';
import { saveFormSubmission } from '../lib/supabase';

const WEB3FORMS_ACCESS_KEY = 'f783b04f-828e-4e54-adfe-264b4020a68e';
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

/**
 * submitForm - sends form data via email AND saves to Supabase DB
 * @param {string} formName - e.g. "Contact Form", "STEM Lab Enquiry"
 * @param {object} formData - key-value pairs from the form
 */
export const submitForm = async (formName, formData) => {
  // 1. Save to Supabase (silent - never blocks form submission)
  saveFormSubmission(
    formName,
    formData,
    formData.email || formData.Email || '',
    formData.fullName || formData.name || formData.contactPerson || '',
    formData.phone || formData.Phone || '',
  ).catch(() => {});

  // 2. Send email via Web3Forms
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New ${formName} - SNP Innovation Website`,
    from_name: 'SNP Innovation Website',
    ...formData,
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

// Axios instance for Spring Boot backend (future use)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
