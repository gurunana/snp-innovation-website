-- ============================================================
-- SNP INNOVATION — SUPABASE STORAGE SETUP (Product Images)
-- Run this ONCE in: Supabase → SQL Editor → New Query → Run
--
-- This lets the admin panel upload product images to a free
-- Supabase Storage bucket and get a public URL that is saved
-- in products.image_url. No AWS / external host needed.
-- ============================================================

-- 1. Create a PUBLIC bucket called "product-images"
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- 2. Access policies on the storage.objects table
--    (matches your existing model: public read, anon can write)

-- Anyone can VIEW images (needed so they show on the website)
drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Anyone can UPLOAD an image (admin panel uses the anon key)
drop policy if exists "Anyone can upload product images" on storage.objects;
create policy "Anyone can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

-- Anyone can REPLACE / overwrite an image
drop policy if exists "Anyone can update product images" on storage.objects;
create policy "Anyone can update product images"
  on storage.objects for update
  using (bucket_id = 'product-images');

-- Anyone can DELETE an image (so you can clean up old ones)
drop policy if exists "Anyone can delete product images" on storage.objects;
create policy "Anyone can delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images');

-- ============================================================
-- DONE. Now go to the admin panel → Add/Edit Product →
-- "Upload Image", pick a file, and Save. The public URL is
-- stored automatically in products.image_url.
--
-- NOTE on security: uploads use the public (anon) key because
-- your admin panel is gated by a password on the front-end,
-- not Supabase Auth. This matches how products/orders already
-- work in your project. For ~200-300 kits this is fine. If you
-- later add real Supabase Auth login, tighten the insert/
-- update/delete policies to: to authenticated.
-- ============================================================
