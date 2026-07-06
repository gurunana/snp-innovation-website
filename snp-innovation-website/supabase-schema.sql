-- ============================================================
-- SNP INNOVATION — SUPABASE DATABASE SCHEMA
-- Run this ENTIRE file in: Supabase → SQL Editor → New Query
-- ============================================================

-- ── 1. PRODUCTS (Shop) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name                TEXT NOT NULL,
  subtitle            TEXT,
  price_inr           INTEGER NOT NULL DEFAULT 0,
  original_price_inr  INTEGER,
  badge               TEXT,
  badge_color         TEXT DEFAULT '#F59E0B',
  class_level         TEXT,
  category            TEXT,
  image_url           TEXT,
  rating              DECIMAL(3,1) DEFAULT 4.5,
  review_count        INTEGER DEFAULT 0,
  tags                TEXT[] DEFAULT '{}',
  description         TEXT,
  save_percent        INTEGER,
  active              BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. JOB OPENINGS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS job_openings (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title            TEXT NOT NULL,
  department       TEXT NOT NULL DEFAULT 'EdTech',
  location         TEXT NOT NULL DEFAULT 'Pune',
  type             TEXT DEFAULT 'Full-time',
  description      TEXT,
  dept_color       TEXT DEFAULT '#EFF6FF',
  dept_text_color  TEXT DEFAULT '#1A3A8F',
  accent_gradient  TEXT DEFAULT 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
  active           BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. FORM SUBMISSIONS (single table for ALL forms) ────────
--    form_type: 'Contact Form' | 'STEM Lab Enquiry' | 'IT Enquiry'
--               'R&D Enquiry' | 'Incubation Form' | 'Career Registration'
--               'Newsletter' | 'Shop Order'
--    data: all form fields stored as JSON
CREATE TABLE IF NOT EXISTS form_submissions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type   TEXT NOT NULL,
  name        TEXT,
  email       TEXT,
  phone       TEXT,
  data        JSONB NOT NULL DEFAULT '{}',
  status      TEXT DEFAULT 'new',   -- 'new' | 'read' | 'replied'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 4. ORDERS (Shop) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name     TEXT,
  customer_email    TEXT,
  customer_phone    TEXT,
  customer_address  TEXT,
  items             JSONB NOT NULL DEFAULT '[]',
  -- items format: [{ product_id, name, qty, price }]
  total_amount      INTEGER,
  status            TEXT DEFAULT 'pending',
  -- 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  notes             TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security (RLS) ─────────────────────────────────
-- Allow anyone to READ active products and active jobs (public)
-- Allow anyone to INSERT form submissions and orders (forms)
-- ONLY the admin dashboard (service role) can update/delete

ALTER TABLE products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_openings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders          ENABLE ROW LEVEL SECURITY;

-- Public: read active products
CREATE POLICY "Public read active products" ON products
  FOR SELECT USING (active = true);

-- Public: read active job openings
CREATE POLICY "Public read active jobs" ON job_openings
  FOR SELECT USING (active = true);

-- Public: insert form submissions (forms)
CREATE POLICY "Anyone can submit forms" ON form_submissions
  FOR INSERT WITH CHECK (true);

-- Public: insert orders (checkout)
CREATE POLICY "Anyone can place orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Admin: full access to all tables (uses service role / anon with RLS disabled)
-- For the admin dashboard to work you have two options:
--   Option A (easiest): Disable RLS on all tables (fine for solo projects)
--   Option B: Use Supabase Auth + RLS policy for authenticated users

-- Option A — uncomment these lines if you want full admin access:
-- ALTER TABLE products         DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE job_openings     DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders           DISABLE ROW LEVEL SECURITY;

-- ── SEED DATA — 3 job openings ───────────────────────────────
INSERT INTO job_openings (title, department, location, type, description, dept_color, dept_text_color, accent_gradient) VALUES
(
  'STEM Lab Coordinator',
  'EdTech',
  'Pune',
  'Full-time',
  'Lead the setup and daily operations of STEM labs in partner schools. Coordinate with educators to deliver engaging science, technology, engineering, and math programs. Provide training, monitor lab usage, and ensure kit maintenance.',
  '#EFF6FF',
  '#1A3A8F',
  'linear-gradient(135deg,#1A3A8F,#2D5BE3)'
),
(
  'Full-Stack Developer',
  'IT Resourcing',
  'Remote',
  'Full-time',
  'Design, build, and maintain scalable web applications for internal platforms and client projects. Work with React, Node.js, and cloud infrastructure. Collaborate with product, design, and QA teams in an agile environment.',
  '#F0FDF4',
  '#15803D',
  'linear-gradient(135deg,#15803D,#22C55E)'
),
(
  'R&D Engineer (Embedded Systems)',
  'R&D',
  'Pune',
  'Full-time',
  'Develop and prototype embedded systems, IoT devices, and automation hardware for R&D projects. Work across the full hardware-software stack — from circuit design and firmware to testing and documentation.',
  '#FFF7ED',
  '#C2410C',
  'linear-gradient(135deg,#C2410C,#CC2020)'
);

-- ── SEED DATA — 6 products ───────────────────────────────────
INSERT INTO products (name, subtitle, price_inr, original_price_inr, badge, badge_color, class_level, category, image_url, rating, review_count, tags, description, save_percent) VALUES
(
  'Plug-and-Play Starter Kit', 'Class 5–8 Essentials',
  24999, 29999, 'Bestseller', '#F59E0B', 'Class 5–8', 'Starter',
  'https://picsum.photos/seed/shop-kit-1/800/500', 4.8, 312,
  ARRAY['Basic Electronics','Sensor Kits','Junior Coding','Lab Manual'],
  'The perfect starter kit for young learners. Includes all essential electronics, sensor kits, and a full lab manual.', 17
),
(
  'Arduino Robotics Kit', 'Build & Program Real Robots',
  39999, 49999, 'Popular', '#2D5BE3', 'Class 8–12', 'Robotics',
  'https://picsum.photos/seed/shop-kit-2/800/500', 4.9, 487,
  ARRAY['Arduino Uno','Servo & DC Motors','Ultrasonic Sensors','Python Interface'],
  'Build and program real robots using Arduino. Includes full robotics components and programming guide.', 20
),
(
  'AI & Vision Kit', 'Machine Learning for Schools',
  64999, 79999, 'New', '#8B5CF6', 'Class 11+ / College', 'AI/ML',
  'https://picsum.photos/seed/shop-kit-3/800/500', 4.7, 128,
  ARRAY['Jetson Nano','Camera Module','TensorFlow Lite','Gesture Recognition'],
  'Dive into AI and machine learning with Jetson Nano. Includes camera module and gesture recognition projects.', 19
),
(
  'IoT Smart Home Kit', 'Connect & Automate Everything',
  34999, 44999, 'Sale', '#EF4444', 'College / Research', 'IoT',
  'https://picsum.photos/seed/shop-kit-4/800/500', 4.6, 203,
  ARRAY['NodeMCU','MQTT Broker','Cloud Dashboard','Smart Sensors Pack'],
  'Build smart home automation with NodeMCU and cloud connectivity. Full IoT stack included.', 22
),
(
  'Raspberry Pi Lab Kit', 'Full Linux Computer in Your Kit',
  44999, 54999, 'Pro', '#0EA5E9', 'Class 10–12 / College', 'Computing',
  'https://picsum.photos/seed/shop-kit-5/800/500', 4.8, 176,
  ARRAY['Raspberry Pi 4','Python & C++','GPIO Projects','Touchscreen Display'],
  'A full Linux computer in your lab kit. Run Python, GPIO projects and connect a touchscreen display.', 18
),
(
  'Science Exploration Kit', 'Hands-On STEM for Juniors',
  14999, 18999, 'Starter', '#10B981', 'Class 5–7', 'Science',
  'https://picsum.photos/seed/shop-kit-6/800/500', 4.9, 421,
  ARRAY['Physics Experiments','Chemistry Kits','Biology Slides','Experiment Manual'],
  'Explore science with hands-on physics, chemistry and biology experiments. Perfect for juniors.', 21
);

-- ── Useful queries for the admin ─────────────────────────────
-- See all form submissions:
--   SELECT * FROM form_submissions ORDER BY created_at DESC;
--
-- See all orders:
--   SELECT * FROM orders ORDER BY created_at DESC;
--
-- Mark submission as read:
--   UPDATE form_submissions SET status = 'read' WHERE id = 'your-uuid';
--
-- Count by form type:
--   SELECT form_type, COUNT(*) FROM form_submissions GROUP BY form_type;
