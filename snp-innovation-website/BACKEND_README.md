# SNP Innovation Website — Backend & Deployment Guide

> **Owner:** Ayush Dhoke · ayushdhoke315@gmail.com  
> **Stack:** React 19 + Vite · Redux Toolkit · Material UI v6 · Tailwind CSS  
> **Backend options:** Google Apps Script (instant, free) · Supabase (free PostgreSQL) · Spring Boot (production)  
> **Hosting:** Hostinger / GoDaddy

---

## Table of Contents

1. [Forms in the Project](#1-forms-in-the-project)
2. [Option A — Google Apps Script → Google Sheets (Simplest, Zero Cost)](#2-option-a--google-apps-script--google-sheets)
3. [Option B — Supabase Free Database](#3-option-b--supabase-free-database)
4. [Option C — Spring Boot REST API (Future Production)](#4-option-c--spring-boot-rest-api)
5. [How to Connect Each React Form](#5-how-to-connect-each-react-form)
6. [How to Run the Project Locally](#6-how-to-run-the-project-locally)
7. [Deploying the React Frontend on Hostinger](#7-deploying-the-react-frontend-on-hostinger)
8. [Deploying Spring Boot API on Hostinger VPS](#8-deploying-spring-boot-api-on-hostinger-vps)
9. [Environment Variables Reference](#9-environment-variables-reference)
10. [Folder Structure Reference](#10-folder-structure-reference)

---

## 1. Forms in the Project

Every form's submit handler currently has a `console.log()` placeholder.
The table below lists each form, its file, and the data fields it collects.

| # | Form | File | Fields Collected |
|---|------|------|-----------------|
| 1 | **Contact Form** | `src/components/contact/ContactForm.jsx` | fullName, email, phone, subject, message |
| 2 | **General Enquiry** | `src/components/common/EnquiryForm.jsx` | Dynamic (passed as `fields` prop) |
| 3 | **STEM Lab Enquiry** | `src/components/edtech/StemEnquiryForm.jsx` | institutionName, contactPerson, designation, email, phone, city, state, institutionType, studentCount, labArea, budgetRange, requirements, callbackDate |
| 4 | **IT Enquiry** | `src/components/itresourcing/ITEnquiryForm.jsx` | Organization, contact, requirements, budget |
| 5 | **R&D Enquiry** | `src/components/rd/RDEnquiryForm.jsx` | Name, organization, research area, message |
| 6 | **Incubation Form** | `src/components/incubation/IncubationForm.jsx` | Startup name, stage, founders, idea, funding |
| 7 | **IT Candidate Registration** | `src/components/careers/CandidateRegistration.jsx` | fullName, email, phone, location, workMode, yearsExp, primarySkills, secondarySkills, domain, employmentStatus, noticePeriod, expectedCTC, roleType, **CV PDF file** |
| 8 | **Newsletter** | `src/components/layout/Footer.jsx` | email |

---

## 2. Option A — Google Apps Script → Google Sheets

### Why choose this?

- Completely **free** (no server, no database needed)
- Data goes directly into **Google Sheets** on your Google Drive
- Takes **15 minutes** to set up
- No coding experience needed beyond copy-paste
- Each form can have its own Google Sheet, or all forms in one Sheet with separate tabs

---

### Step 1 — Create a Google Sheet

1. Go to [https://sheets.google.com](https://sheets.google.com) and sign in with `ayushdhoke315@gmail.com`
2. Create a new spreadsheet, name it **"SNP Innovation Website Submissions"**
3. Create separate sheets (tabs) at the bottom for each form:
   - `Contact`
   - `STEM_Enquiry`
   - `IT_Enquiry`
   - `RD_Enquiry`
   - `Incubation`
   - `Candidate_Registration`
   - `Newsletter`

---

### Step 2 — Create the Google Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete all existing code in the editor
3. Paste the following code:

```javascript
// ============================================================
// Google Apps Script Web App
// Receives POST requests from the React website
// Saves data into the correct Google Sheet tab
// ============================================================

// IMPORTANT: Replace this with your actual Google Spreadsheet ID
// You can find the ID in the URL: docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// This function runs for every POST request from your website
function doPost(e) {
  try {
    // Parse the incoming JSON data from the React form
    const data = JSON.parse(e.postData.contents);
    
    // Get which form submitted the data
    const formType = data.formType || 'Contact';
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get or create the correct sheet tab
    let sheet = spreadsheet.getSheetByName(formType);
    if (!sheet) {
      // If the tab doesn't exist, create it
      sheet = spreadsheet.insertSheet(formType);
    }
    
    // Add timestamp to every submission
    data.submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    // If this is the first row, add column headers
    if (sheet.getLastRow() === 0) {
      const headers = Object.keys(data);
      sheet.appendRow(headers);
    }
    
    // Add the form data as a new row
    const values = Object.values(data);
    sheet.appendRow(values);
    
    // Send email notification to yourself (optional - remove if not needed)
    sendEmailNotification(formType, data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// This function sends you an email when a new form is submitted
// You can remove this if you don't want email notifications
function sendEmailNotification(formType, data) {
  const ownerEmail = 'ayushdhoke315@gmail.com';
  const subject = `New ${formType} submission — SNP Innovation Website`;
  
  // Build email body from form data
  let body = `New form submission received on SNP Innovation website.\n\n`;
  body += `Form Type: ${formType}\n`;
  body += `Time: ${data.submittedAt}\n\n`;
  body += `--- Form Data ---\n`;
  
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'formType' && key !== 'submittedAt') {
      body += `${key}: ${value}\n`;
    }
  });
  
  try {
    MailApp.sendEmail(ownerEmail, subject, body);
  } catch (err) {
    // Email failed — data is still saved in Sheet
    console.log('Email notification failed:', err);
  }
}

// This handles GET requests (used for testing the script URL in browser)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'SNP Innovation Script is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Save** (Ctrl+S), give the project a name like "SNP Forms Handler"

---

### Step 3 — Deploy the Script as a Web App

1. Click **Deploy → New Deployment**
2. Click the ⚙️ gear icon next to "Select type" and choose **Web app**
3. Fill in the settings:
   - **Description:** `SNP Website Forms v1`
   - **Execute as:** `Me (ayushdhoke315@gmail.com)`
   - **Who has access:** `Anyone` ← This is important, the website needs to call it without login
4. Click **Deploy**
5. Click **Authorize access** → Choose your Google account → Click **Allow**
6. **Copy the Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
   **Save this URL** — you will need it in the React code.

> **Note:** Every time you change the Apps Script code, you must click Deploy → New Deployment to publish the update. The old URL keeps working with old code.

---

### Step 4 — Add the URL to your React project

Open the file `src/utils/api.js` and add this:

```javascript
// ============================================================
// Google Apps Script Web App URL
// This URL receives form submissions and saves to Google Sheets
// Change this URL after deploying a new version of the script
// ============================================================
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// Function to submit any form to Google Sheets
// formType: 'Contact' | 'STEM_Enquiry' | 'IT_Enquiry' | 'RD_Enquiry' | 'Incubation' | 'Candidate_Registration' | 'Newsletter'
export const submitToGoogleSheets = async (formType, formData) => {
  const payload = {
    formType,   // tells the script which Sheet tab to use
    ...formData,
  };

  // Google Apps Script requires 'no-cors' mode from a browser
  // This means we don't get a response back, but the data IS saved
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',  // required for Google Apps Script
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // Since no-cors gives no response, we assume success
  // You will receive an email and see the data in Google Sheets
  return { success: true };
};
```

---

## 3. Option B — Supabase Free Database

### Why choose Supabase?

- **Free tier:** 500 MB storage, 50,000 rows, unlimited API calls
- **No server needed** — Supabase has a built-in REST API
- **PostgreSQL** — proper relational database
- Real-time updates, authentication built-in
- Dashboard to view all submissions like a spreadsheet
- Free forever for small websites

---

### Step 1 — Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project**
3. Name it `snp-innovation`
4. Choose a database password (save it somewhere safe)
5. Select region: `Southeast Asia (Singapore)` — closest to India
6. Click **Create new project** (takes ~2 minutes to set up)

---

### Step 2 — Create Database Tables

After your project is ready, click **SQL Editor** in the left sidebar and run this SQL:

```sql
-- ============================================================
-- SNP Innovation Website — Database Tables
-- Run this SQL in Supabase SQL Editor to create all tables
-- ============================================================

-- Contact form submissions
CREATE TABLE contact_submissions (
  id          BIGSERIAL PRIMARY KEY,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- STEM Lab enquiries
CREATE TABLE stem_enquiries (
  id                BIGSERIAL PRIMARY KEY,
  institution_name  TEXT NOT NULL,
  contact_person    TEXT NOT NULL,
  designation       TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT NOT NULL,
  city              TEXT NOT NULL,
  state             TEXT NOT NULL,
  institution_type  TEXT,
  student_count     INTEGER,
  lab_area          TEXT,
  budget_range      TEXT,
  requirements      TEXT,
  callback_date     DATE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- IT Resourcing enquiries
CREATE TABLE it_enquiries (
  id            BIGSERIAL PRIMARY KEY,
  company_name  TEXT,
  contact_name  TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  requirements  TEXT,
  budget        TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- R&D enquiries
CREATE TABLE rd_enquiries (
  id              BIGSERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  organization    TEXT,
  email           TEXT NOT NULL,
  phone           TEXT,
  research_area   TEXT,
  message         TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Incubation applications
CREATE TABLE incubation_applications (
  id              BIGSERIAL PRIMARY KEY,
  startup_name    TEXT NOT NULL,
  stage           TEXT,
  founder_name    TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  idea_summary    TEXT,
  funding_status  TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- IT Candidate registrations
CREATE TABLE candidate_registrations (
  id                 BIGSERIAL PRIMARY KEY,
  full_name          TEXT NOT NULL,
  email              TEXT NOT NULL,
  phone              TEXT NOT NULL,
  location           TEXT,
  work_mode          TEXT,
  years_exp          TEXT,
  primary_skills     TEXT NOT NULL,
  secondary_skills   TEXT,
  domain             TEXT,
  employment_status  TEXT,
  notice_period      TEXT,
  expected_ctc       TEXT,
  role_type          TEXT,
  cv_file_url        TEXT,   -- Supabase Storage URL for uploaded CV
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);
```

Click **Run** to create all tables.

---

### Step 3 — Get your API Keys

1. In Supabase, click **Settings → API** in the left sidebar
2. Copy these two values:
   - **Project URL** — looks like `https://xyzabc.supabase.co`
   - **anon public key** — a long JWT token

---

### Step 4 — Install Supabase in React

```bash
# Run this in your project folder
npm install @supabase/supabase-js
```

---

### Step 5 — Create the Supabase client

Create a new file: `src/utils/supabaseClient.js`

```javascript
// ============================================================
// SUPABASE CLIENT
// This connects the React app to your Supabase database
// ============================================================
import { createClient } from '@supabase/supabase-js';

// These values are safe to expose in frontend code
// They only allow read/write, not admin actions
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
```

---

### Step 6 — Create a `.env` file in your project root

```env
# Supabase Connection (free tier)
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here

# Google Apps Script URL (if using both)
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec

# Spring Boot API URL (for future use)
VITE_API_BASE_URL=http://localhost:8080/api
```

> **IMPORTANT:** Never commit `.env` to GitHub. Add `.env` to your `.gitignore` file.

---

## 4. Option C — Spring Boot REST API

> Use this when you are ready to move to full production with your own server.
> The React frontend already has `src/utils/api.js` set up for this.

### API Endpoint Structure

Your Spring Boot application should expose these REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Save contact form submission |
| POST | `/api/enquiry/stem` | Save STEM lab enquiry |
| POST | `/api/enquiry/it` | Save IT resourcing enquiry |
| POST | `/api/enquiry/rd` | Save R&D enquiry |
| POST | `/api/incubation/apply` | Save incubation application |
| POST | `/api/careers/register` | Save IT candidate registration |
| POST | `/api/newsletter/subscribe` | Save newsletter email |
| GET | `/api/contact` | Get all contact submissions (admin) |

---

### Spring Boot Controller Example

```java
// ContactController.java
// Place this in: src/main/java/com/snpinnovation/controller/ContactController.java

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")  // Allow requests from React frontend
public class ContactController {

    @Autowired
    private ContactService contactService;

    // POST /api/contact — receives form data from React
    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContact(
            @RequestBody ContactRequest request) {
        
        // Save to database
        contactService.save(request);
        
        // Return success response
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Your message has been received. We will contact you soon.");
        
        return ResponseEntity.ok(response);
    }
}
```

```java
// ContactRequest.java — Data Transfer Object (DTO)
// Place in: src/main/java/com/snpinnovation/dto/ContactRequest.java

public class ContactRequest {
    private String fullName;
    private String email;
    private String phone;
    private String subject;
    private String message;

    // Getters and setters (or use Lombok @Data)
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    // ... repeat for all fields
}
```

### application.properties for Spring Boot

```properties
# src/main/resources/application.properties

# Server port
server.port=8080

# Database — use Supabase PostgreSQL connection string
spring.datasource.url=jdbc:postgresql://db.YOUR_PROJECT_ID.supabase.co:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=YOUR_DATABASE_PASSWORD

# Hibernate auto creates tables from your @Entity classes
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# Email — to send notification emails when forms are submitted
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=ayushdhoke315@gmail.com
spring.mail.password=YOUR_GMAIL_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

---

## 5. How to Connect Each React Form

### Form 1 — Contact Form (`ContactForm.jsx`)

Open `src/components/contact/ContactForm.jsx` and update the `handleFormSubmit` function:

```javascript
// Add this import at the top of ContactForm.jsx
import { submitToGoogleSheets } from '../../utils/api';

// Replace the handleFormSubmit function with this:
const handleFormSubmit = async (formData) => {
  try {
    // Submit to Google Sheets
    await submitToGoogleSheets('Contact', formData);
    console.log('Contact form submitted successfully');
    // The EnquiryForm component shows its own success message
  } catch (error) {
    console.error('Form submission failed:', error);
  }
};
```

---

### Form 2 — STEM Enquiry Form (`StemEnquiryForm.jsx`)

The STEM form already uses Redux. Open `src/store/slices/edtechSlice.js` and update the `submitEdtechEnquiry` thunk:

```javascript
// In edtechSlice.js — update the submitEdtechEnquiry async thunk:

import { submitToGoogleSheets } from '../../utils/api';

export const submitEdtechEnquiry = createAsyncThunk(
  'edtech/submitEnquiry',
  async (formData, { rejectWithValue }) => {
    try {
      // Send to Google Sheets
      await submitToGoogleSheets('STEM_Enquiry', formData);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

---

### Form 3 — IT Candidate Registration (`CandidateRegistration.jsx`)

This form has a **CV file upload**. For the CV, you have two options:

**Option A (Simple):** Skip file upload, just save form text data to Google Sheets.

**Option B (With file upload):** Use Supabase Storage to save the PDF.

```javascript
// Add these imports at the top of CandidateRegistration.jsx
import supabase from '../../utils/supabaseClient';
import { submitToGoogleSheets } from '../../utils/api';

// Replace the handleSubmit function with this:
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    let cvFileUrl = '';

    // Step 1: Upload CV to Supabase Storage (if file was selected)
    if (form.cvFile) {
      const fileName = `${Date.now()}_${form.cvFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('candidate-cvs')  // create this bucket in Supabase dashboard
        .upload(fileName, form.cvFile);

      if (uploadError) {
        console.error('CV upload failed:', uploadError);
      } else {
        // Get the public URL of the uploaded file
        const { data } = supabase.storage
          .from('candidate-cvs')
          .getPublicUrl(fileName);
        cvFileUrl = data.publicUrl;
      }
    }

    // Step 2: Save all form data to Google Sheets
    const dataToSave = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      location: form.location,
      workMode: form.workMode,
      yearsExp: form.yearsExp,
      primarySkills: form.primarySkills,
      secondarySkills: form.secondarySkills,
      domain: form.domain,
      employmentStatus: form.employmentStatus,
      noticePeriod: form.noticePeriod,
      expectedCTC: form.expectedCTC,
      roleType: form.roleType,
      cvFileUrl: cvFileUrl,  // link to the uploaded CV
    };

    await submitToGoogleSheets('Candidate_Registration', dataToSave);

    // Show success message
    setSubmitted(true);
    setForm(EMPTY);
    setCvName('');

  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

---

### Form 4 — Newsletter (`Footer.jsx`)

Open `src/components/layout/Footer.jsx` and update `handleSubscribe`:

```javascript
// Add this import at the top of Footer.jsx
import { submitToGoogleSheets } from '../../utils/api';

// Replace the handleSubscribe function with this:
const handleSubscribe = async (e) => {
  e.preventDefault();

  // Basic email validation
  if (!email || !email.includes('@')) {
    setSubscribeError('Please enter a valid email address');
    setSubscribeMessage('');
    return;
  }

  try {
    // Save email to Google Sheets
    await submitToGoogleSheets('Newsletter', { email });

    setSubscribeMessage('Thank you for subscribing! Check your email.');
    setSubscribeError('');
    setEmail('');

    // Clear message after 5 seconds
    setTimeout(() => setSubscribeMessage(''), 5000);

  } catch (error) {
    setSubscribeError('Something went wrong. Please try again.');
    console.error('Newsletter subscription failed:', error);
  }
};
```

---

### Forms 5, 6, 7 — IT Enquiry, R&D Enquiry, Incubation

Follow the same pattern. In each form file, find the `handleSubmit` function and add:

```javascript
// Import at the top of each form file
import { submitToGoogleSheets } from '../../utils/api';

// Inside handleSubmit, after your validate() check:
await submitToGoogleSheets('IT_Enquiry', formData);    // for IT form
await submitToGoogleSheets('RD_Enquiry', formData);    // for R&D form
await submitToGoogleSheets('Incubation', formData);    // for Incubation form
```

---

## 6. How to Run the Project Locally

### Prerequisites

Make sure you have these installed on your computer:
- **Node.js** (version 18 or higher) — download from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** — download from [git-scm.com](https://git-scm.com)

---

### Step 1 — Clone the Project

```bash
# Open terminal (Command Prompt or Git Bash on Windows)
git clone https://github.com/YOUR_USERNAME/snp-innovation-website.git

# Go into the project folder
cd snp-innovation-website
```

---

### Step 2 — Install Dependencies

```bash
# Install all packages listed in package.json
npm install
```

This downloads all libraries (React, MUI, Redux, etc.) into the `node_modules` folder.

---

### Step 3 — Create `.env` File

In the project root folder, create a file named `.env` (no extension):

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_API_BASE_URL=http://localhost:8080/api
```

---

### Step 4 — Start the Development Server

```bash
npm run dev
```

Open your browser and go to: **http://localhost:5173**

The page reloads automatically every time you save a file.

---

### Step 5 — Build for Production

```bash
# Creates an optimized build in the 'dist' folder
npm run build
```

The `dist` folder contains the production-ready website files that you upload to Hostinger.

---

### Available Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start local development server at localhost:5173 |
| `npm run build` | Build optimized files for deployment into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check code for errors |

---

## 7. Deploying the React Frontend on Hostinger

### Step 1 — Build the project

```bash
npm run build
```

This creates a `dist/` folder with all the website files.

---

### Step 2 — Login to Hostinger Control Panel

1. Go to [hostinger.com](https://hostinger.com) and log in
2. Click **Hosting** → Click **Manage** next to your domain

---

### Step 3 — Upload Files via File Manager

**Method A: File Manager (Easiest)**

1. In Hostinger hPanel, click **File Manager**
2. Navigate to the `public_html` folder
3. Delete any existing files in `public_html` (the default "Welcome" page)
4. Click **Upload** → Select all files from your local `dist/` folder
5. Upload them — make sure all files and folders inside `dist/` are placed directly inside `public_html/`

**Method B: FTP (Using FileZilla)**

1. Download FileZilla from [filezilla-project.org](https://filezilla-project.org)
2. In Hostinger hPanel → **FTP Accounts** → Note your FTP credentials
3. Open FileZilla, enter:
   - **Host:** `ftp.yourdomain.com`
   - **Username:** your FTP username
   - **Password:** your FTP password
   - **Port:** `21`
4. Click **Quickconnect**
5. On the right side, navigate to `public_html/`
6. On the left side, navigate to your local `dist/` folder
7. Select all files in `dist/` and drag them to `public_html/`

---

### Step 4 — Fix React Router (IMPORTANT)

React Router handles URLs like `/about`, `/gallery` etc. on the client side.
When you refresh the page on `/about`, the server looks for a file named `about` which doesn't exist, and shows a 404 error.

**Fix this by creating a `.htaccess` file:**

1. In Hostinger File Manager, open `public_html/`
2. Click **New File** → Name it `.htaccess`
3. Paste this content:

```apache
# Fix React Router — redirect all URLs to index.html
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

4. Save the file

Now refreshing on any page (like `/about`, `/careers`) will work correctly.

---

### Step 5 — Connect your Domain

1. In Hostinger hPanel, go to **Domains**
2. If you bought the domain on **GoDaddy**, you need to point it to Hostinger:
   - Log in to GoDaddy → **My Products → Domains → DNS**
   - Update the **Nameservers** to Hostinger's nameservers (shown in your Hostinger panel under **DNS / Nameservers**)
   - Changes take 24-48 hours to propagate

3. If your domain is on Hostinger, it connects automatically to `public_html/`

---

### Step 6 — Enable HTTPS (SSL Certificate)

1. In Hostinger hPanel, click **SSL**
2. Click **Install** next to your domain
3. Select **Let's Encrypt** (free SSL)
4. Click **Install**
5. SSL takes a few minutes to activate
6. Your site will now load at `https://yourdomain.com` with the green lock

---

### Updating the Website After Changes

Every time you make changes to the React code:

```bash
# 1. Build the new version
npm run build

# 2. Upload the new dist/ folder to public_html/
# (Delete old files first, then upload new ones)
```

**Tip:** Set up a GitHub repository and use **Hostinger Git integration** for automatic deployments — ask Hostinger support to enable it.

---

## 8. Deploying Spring Boot API on Hostinger VPS

> This is for future use when you are ready for a full backend.
> You need a **VPS (Virtual Private Server)** plan on Hostinger — starts at ~₹200/month.

---

### Step 1 — Buy a VPS on Hostinger

1. In Hostinger, click **VPS Hosting**
2. Choose the **KVM 1** plan (cheapest, enough for this website)
3. Select **Ubuntu 22.04 LTS** as the operating system

---

### Step 2 — Connect to VPS via SSH

```bash
# Replace 123.456.789.0 with your VPS IP from Hostinger dashboard
ssh root@123.456.789.0
```

---

### Step 3 — Install Java on VPS

```bash
# Update the server
apt update && apt upgrade -y

# Install Java 17
apt install openjdk-17-jdk -y

# Verify Java is installed
java -version
```

---

### Step 4 — Build your Spring Boot project

On your local computer (in the Spring Boot project folder):

```bash
# Build a JAR file (single executable file)
./mvnw clean package -DskipTests

# The JAR file will be created in: target/snp-innovation-0.0.1-SNAPSHOT.jar
```

---

### Step 5 — Upload JAR to VPS

```bash
# Upload the JAR file to your VPS
scp target/snp-innovation-0.0.1-SNAPSHOT.jar root@YOUR_VPS_IP:/home/snpapp/
```

---

### Step 6 — Run the Spring Boot API

```bash
# On your VPS, navigate to the folder
cd /home/snpapp/

# Run the application (runs in background)
nohup java -jar snp-innovation-0.0.1-SNAPSHOT.jar --server.port=8080 &

# Check if it's running
curl http://localhost:8080/api/contact
```

---

### Step 7 — Update React to use Production API URL

In your `.env` file (or Hostinger environment settings):

```env
# Change this from localhost to your VPS IP or domain
VITE_API_BASE_URL=http://YOUR_VPS_IP:8080/api
```

Rebuild the React project and re-upload to `public_html/`.

---

## 9. Environment Variables Reference

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| `VITE_GOOGLE_SCRIPT_URL` | Google Apps Script Web App URL | `https://script.google.com/macros/s/ABC.../exec` |
| `VITE_SUPABASE_URL` | Supabase project URL | `https://xyzabc.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase public API key | `eyJhbGc...` |
| `VITE_API_BASE_URL` | Spring Boot API URL | `http://localhost:8080/api` |

> **Rule:** In React + Vite, all environment variables must start with `VITE_` to be accessible in the browser code.
> Access them in code using `import.meta.env.VITE_VARIABLE_NAME`.

---

## 10. Folder Structure Reference

```
snp-innovation-website/
│
├── public/
│   └── images/
│       └── logo.png              ← SNP Innovation logo (transparent PNG)
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        ← Top navigation bar
│   │   │   ├── Navbar.css        ← Navbar styles
│   │   │   ├── Footer.jsx        ← Footer with newsletter form
│   │   │   └── Footer.css        ← Footer styles
│   │   │
│   │   ├── common/
│   │   │   ├── EnquiryForm.jsx   ← Reusable form component
│   │   │   ├── PrimaryButton.jsx ← Global button (change here = changes everywhere)
│   │   │   └── SectionHeader.jsx ← Reusable section header
│   │   │
│   │   ├── contact/
│   │   │   └── ContactForm.jsx   ← Contact page form
│   │   │
│   │   ├── edtech/
│   │   │   └── StemEnquiryForm.jsx ← STEM Lab enquiry form
│   │   │
│   │   ├── itresourcing/
│   │   │   └── ITEnquiryForm.jsx ← IT Resourcing enquiry
│   │   │
│   │   ├── rd/
│   │   │   └── RDEnquiryForm.jsx ← R&D enquiry form
│   │   │
│   │   ├── incubation/
│   │   │   └── IncubationForm.jsx ← Incubation application
│   │   │
│   │   └── careers/
│   │       └── CandidateRegistration.jsx ← IT Candidate form with CV upload
│   │
│   ├── pages/                    ← One file per route/page
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── ...
│   │
│   ├── store/
│   │   ├── store.js              ← Redux store setup
│   │   └── slices/
│   │       ├── edtechSlice.js    ← State + API calls for EdTech page
│   │       └── ...               ← Add a slice for each page/feature
│   │
│   ├── utils/
│   │   ├── api.js                ← Axios instance + Google Sheets helper
│   │   └── supabaseClient.js     ← Supabase client (create this file)
│   │
│   ├── theme/
│   │   └── muiTheme.js           ← Material UI global theme (fonts, colors)
│   │
│   ├── index.css                 ← Global CSS variables (colors, spacing)
│   │                                Change colors here → changes everywhere
│   ├── App.jsx                   ← Main app with routes
│   └── main.jsx                  ← React app entry point
│
├── .env                          ← Secret keys (DO NOT commit to Git)
├── .gitignore                    ← Files to exclude from Git
├── index.html                    ← HTML entry point
├── vite.config.js                ← Vite build configuration
└── package.json                  ← Project dependencies

```

---

## Quick Reference — Changing Global Styles

**To change button colors globally:**
- Edit `src/components/common/PrimaryButton.jsx`
- Or update `--color-primary` and `--color-secondary` in `src/index.css`
- Every button and accent on the site will update automatically

**To change fonts globally:**
- Edit `src/theme/muiTheme.js` — change the `fontFamily` property
- Edit `src/index.css` — update the `font-family` in the `body` selector

**To add a new page:**
1. Create `src/pages/NewPage.jsx`
2. Add the route in `src/App.jsx`: `<Route path="/new-page" element={<NewPage />} />`
3. Add the link in `src/components/layout/Navbar.jsx` inside the `navItems` array

---

## Contact

For any questions about this project, contact:  
📧 **ayushdhoke315@gmail.com**

---

*Last updated: April 2026*
