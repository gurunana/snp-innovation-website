# SNP Innovation — Dynamic Features Setup Guide

**For Nikhil Gujar** · All steps below are 100% FREE ✅

---

## What you now have

| Feature | Status | How |
|---------|--------|-----|
| **Shop page** (`/shop`) | ✅ Ready | Products fetched from Supabase |
| **Cart + Checkout** | ✅ Ready | Redux cart, order saved to DB + email |
| **Dynamic Job Openings** | ✅ Ready | Fetch from Supabase `job_openings` table |
| **All forms save to DB** | ✅ Ready | Supabase `form_submissions` table |
| **All forms send email** | ✅ Ready | Web3Forms (already working) |
| **Admin Dashboard** | ✅ Ready | `/admin` — password protected |
| **Shop in Navbar** | ✅ Ready | + cart badge shows item count |

---

## STEP 1 — Create a FREE Supabase account (10 minutes)

1. Go to **https://supabase.com** → click **Start your project**
2. Sign in with GitHub or email (free, no credit card)
3. Click **New Project**
4. Fill in:
   - **Project name:** `snp-innovation`
   - **Database Password:** (save this somewhere safe)
   - **Region:** `Southeast Asia (Singapore)` — closest to India
5. Click **Create new project** — wait 1-2 minutes

---

## STEP 2 — Run the SQL schema

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open the file `supabase-schema.sql` from this project
4. Copy the entire content and paste it into the SQL editor
5. Click **Run** (green button)
6. You should see: "Success. No rows returned"

This creates 4 tables: `products`, `job_openings`, `form_submissions`, `orders`
And inserts the 3 job openings + 6 products as starting data.

> **⚠️ IMPORTANT — Disable RLS for Admin Access:**
> In the SQL editor, also run these 4 lines so the admin dashboard can read/write everything:
> ```sql
> ALTER TABLE products          DISABLE ROW LEVEL SECURITY;
> ALTER TABLE job_openings      DISABLE ROW LEVEL SECURITY;
> ALTER TABLE form_submissions  DISABLE ROW LEVEL SECURITY;
> ALTER TABLE orders            DISABLE ROW LEVEL SECURITY;
> ```

---

## STEP 3 — Get your API keys

1. In Supabase, go to **Settings → API** (left sidebar)
2. Copy:
   - **Project URL** — looks like `https://xxxxxxxxxxxx.supabase.co`
   - **anon / public** key — long string starting with `eyJ...`

---

## STEP 4 — Create `.env` file

In the root of `snp-innovation-website/`, create a file called `.env`:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_PASSWORD=yourChosenPassword123
```

- Replace the URL and key with YOUR values from Step 3
- Choose any password for `VITE_ADMIN_PASSWORD` — this protects the `/admin` page
- **Never share this file or commit it to GitHub**

---

## STEP 5 — Run locally to test

```bash
cd snp-innovation-website
npm run dev
```

Open `http://localhost:5173/shop` — you should see 6 products loaded!
Open `http://localhost:5173/admin` — login with your admin password

---

## STEP 6 — Build and deploy to Hostinger

### ⚠️ CRITICAL — Do these steps in ORDER or Supabase won't work on production:

**Step 6a — Create your `.env` file FIRST** (before building)

In the root of `snp-innovation-website/`, create a file called `.env`:
```
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_PASSWORD=yourChosenPassword123
```

> **Why this matters:** Vite bakes environment variables INTO the build at compile time.
> If `.env` is not present when you run `npm run build`, the Supabase URL/key
> become empty strings in the deployed site — so Supabase will NOT work.
> This is why the admin panel and shop show no data after deployment.

**Step 6b — Add your domain to Supabase allowed origins**

1. Go to Supabase → **Authentication → URL Configuration**
2. Add `https://snpinnovation.in` to **Site URL**
3. Also add `https://www.snpinnovation.in` to **Redirect URLs** if you use www
4. Click **Save**

**Step 6c — Build**

```bash
# Make sure .env file is created first!
npm run build
```

This creates a `dist/` folder. The `dist/.htaccess` file is **automatically included** (no need to create it manually).

**Step 6d — Upload to Hostinger**

1. Login to Hostinger → **File Manager**
2. Navigate to `public_html/`
3. Delete old files (keep any database/config files if you have them)
4. Upload ALL files from `dist/` — including the hidden `.htaccess` file!

> **Important:** When uploading, make sure `.htaccess` is included — some FTP clients
> hide files starting with a dot. The `.htaccess` fixes "404 not found" when refreshing.

**Step 6e — Verify deployment**

1. Visit `https://snpinnovation.in/shop` — products should load from Supabase
2. Visit `https://snpinnovation.in/admin` — login should work, tables should show data
3. If shop/admin still shows no data, the `.env` was missing during build → redo Steps 6a–6d

---

## How to add products (Admin Dashboard)

1. Go to `yourwebsite.com/admin`
2. Enter your admin password
3. Go to **🛒 Products** tab
4. Click **Add Product**
5. Fill in: name, price, image URL, category, tags, etc.
6. Toggle **Active** = ON to show it on the shop
7. Click **Add Product** — instantly appears on `/shop`!

For image URLs, you can:
- Upload images to Supabase Storage (free)
- Use ImgBB (https://imgbb.com) — free image hosting
- Use any direct image URL

---

## How to add job openings

1. Go to `/admin` → **💼 Job Openings** tab
2. Click **Add Opening**
3. Fill in title, department (auto-colors!), location, type, description
4. Toggle **Active** = ON
5. Click **Post Job** — instantly appears on the Careers page!

---

## How to view form submissions (Reports)

1. Go to `/admin` → **📩 Submissions** tab
2. Filter by form type (Contact, STEM Enquiry, Career, etc.)
3. Click the 👁️ eye icon to view full details
4. New submissions are highlighted in yellow
5. They auto-mark as "read" when you open them

**You also receive an email** for every submission (Web3Forms → dhokeayush0@gmail.com)

---

## How to manage orders

1. Go to `/admin` → **📦 Orders** tab
2. See all shop orders with customer details + items
3. Change order status: pending → confirmed → shipped → delivered
4. Customer info (name, email, phone, address) is all there

---

## Free tier limits (what you get for free)

| Service | Free Limit | What you use it for |
|---------|-----------|---------------------|
| **Supabase** | 500MB DB, unlimited API calls | Database + REST API |
| **Web3Forms** | 250 emails/month | Form submission emails |
| **Hostinger** | Your existing plan | Frontend hosting |

---

## Spring Boot integration (when you're ready)

Since you know Spring Boot, you can later replace the Supabase direct calls with your own Spring Boot API:

1. Connect Spring Boot to Supabase PostgreSQL (use the DB connection string from Supabase Settings → Database)
2. Update `src/utils/api.js` — change `API_BASE_URL` to your Spring Boot server URL
3. Deploy Spring Boot free on **Render.com** (750 hours/month free)

The database schema is already created — just point JPA to the same Supabase PostgreSQL.

**Spring Boot connection string** (from Supabase → Settings → Database → Connection string → JDBC):
```
jdbc:postgresql://db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

---

## Need help?

- Supabase docs: https://supabase.com/docs
- Web3Forms docs: https://web3forms.com
- Contact: check the admin dashboard for your own form submissions!
