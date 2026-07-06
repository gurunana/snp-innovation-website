/* ========================================
   SUPABASE CLIENT CONFIGURATION
   Free PostgreSQL database + auto REST API

   SETUP STEPS:
   1. Go to https://supabase.com -> "New Project"
   2. Copy your Project URL and anon/public key
   3. Create a .env file in the project root:
      VITE_SUPABASE_URL=https://xxxx.supabase.co
      VITE_SUPABASE_ANON_KEY=your-anon-key-here
      VITE_ADMIN_PASSWORD=yourAdminPassword123
   4. Run the SQL in /supabase-schema.sql in your Supabase SQL editor
   5. Run the SQL in /supabase-storage-setup.sql for image uploads
   ======================================== */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  || '';
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Returns null client (safe no-op) when env vars aren't set yet
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const isSupabaseReady = () => Boolean(supabase);

/* helper: save any form submission */
export const saveFormSubmission = async (formType, data, email = '', name = '', phone = '') => {
  if (!supabase) {
    console.warn('Supabase not configured - form saved only via email.');
    return { success: false };
  }
  const { error } = await supabase.from('form_submissions').insert([
    { form_type: formType, data, email, name, phone },
  ]);
  if (error) console.error('Supabase insert error:', error);
  return { success: !error };
};

/* helper: fetch all active products */
export const fetchProducts = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchProducts error:', error); return []; }
  return data || [];
};

/* helper: fetch all active job openings */
export const fetchJobOpenings = async () => {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('job_openings')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchJobOpenings error:', error); return []; }
  return data || [];
};

/* helper: upload a product image to Supabase Storage.
   Uploads to the public "product-images" bucket and returns its
   public URL. Save that URL in products.image_url.
   Run supabase-storage-setup.sql once before using this. */
export const uploadProductImage = async (file) => {
  if (!supabase) return { success: false, error: 'Supabase not configured.' };
  if (!file) return { success: false, error: 'No file selected.' };
  if (!file.type || file.type.indexOf('image/') !== 0) {
    return { success: false, error: 'Please choose an image file.' };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: 'Image must be under 5 MB.' };
  }

  const parts = file.name.split('.');
  const ext = (parts.length > 1 ? parts[parts.length - 1] : 'jpg').toLowerCase();
  const fileName = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false, contentType: file.type });

  if (error) {
    console.error('uploadProductImage error:', error);
    return { success: false, error: error.message };
  }

  const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
  return { success: true, url: data.publicUrl };
};

/* helper: save order */
export const saveOrder = async (orderData) => {
  if (!supabase) return { success: false };
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();
  if (error) { console.error('saveOrder error:', error); return { success: false }; }
  return { success: true, order: data };
};

export default supabase;
