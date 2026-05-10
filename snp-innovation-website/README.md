# SNP Innovation Website

A modern, responsive React-based website for SNP Innovation Pvt. Ltd., a leading company in EdTech, IT Resourcing, R&D, and business incubation.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Prerequisites](#prerequisites)
5. [Installation & Setup](#installation--setup)
6. [Running the Project](#running-the-project)
7. [Building for Production](#building-for-production)
8. [Deployment](#deployment)
9. [Theme Customization](#theme-customization)
10. [Connecting to Spring Boot Backend](#connecting-to-spring-boot-backend)
11. [Redux Store Pattern](#redux-store-pattern)
12. [Adding a New Page](#adding-a-new-page)
13. [Adding a Reusable Component](#adding-a-reusable-component)
14. [Available npm Scripts](#available-npm-scripts)
15. [Backend API Structure](#backend-api-structure)
16. [Environment Variables](#environment-variables)
17. [Browser Support](#browser-support)
18. [Contributing Guidelines](#contributing-guidelines)
19. [License](#license)

---

## Project Overview

The SNP Innovation website is a comprehensive platform showcasing the company's diverse service offerings and expertise. It features:

- **11 Main Pages**: Home, About Us, EdTech & STEM Labs, IT Resourcing, R&D & Automation, Incubation Center, Workshops & Events, Gallery, Careers, Enquiry Hub, and Contact Us
- **Dynamic Content Management**: All page data flows through Redux store for centralized state management
- **Responsive Design**: Fully mobile-responsive using Tailwind CSS
- **Multiple Enquiry Forms**: Service-specific enquiry forms integrated throughout the platform
- **Media Gallery**: Photo and video galleries with filtering capabilities
- **Career Portal**: Job listings and internship opportunities with candidate registration
- **SEO Optimized**: Clean semantic HTML structure for search engine optimization

---

## Tech Stack

### Core Framework
- **React 19**: Latest React version for building UI components
- **Vite 8**: Ultra-fast build tool and development server

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework for responsive design
- **Material UI (MUI) v9**: Pre-built component library with Material Design

### State Management
- **Redux Toolkit**: Simplified Redux for predictable state management
- **React Redux**: React bindings for Redux

### Routing
- **React Router v7**: Client-side routing for single-page application navigation

### HTTP Requests
- **Axios**: Promise-based HTTP client for API communication

### Language
- **JavaScript (ES6+)**: No TypeScript used in this project for simpler onboarding

---

## Folder Structure

Here's the complete project structure with detailed explanations:

```
snp-innovation-website/
│
├── src/                                  # Main source code directory
│   │
│   ├── assets/
│   │   └── images/                      # Static image files (logos, icons, photos)
│   │
│   ├── components/                      # Reusable React components
│   │   │
│   │   ├── common/                      # Globally reusable components
│   │   │   ├── SectionHeader.jsx        # Heading component for sections
│   │   │   ├── PrimaryButton.jsx        # Main call-to-action button
│   │   │   ├── InfoCard.jsx             # Card component for displaying info
│   │   │   ├── StatCounter.jsx          # Animated number counter for stats
│   │   │   ├── TestimonialCard.jsx      # Testimonial display component
│   │   │   ├── EnquiryForm.jsx          # Base enquiry form component
│   │   │   ├── PageBanner.jsx           # Header banner for each page
│   │   │   ├── LoadingSpinner.jsx       # Loading indicator
│   │   │   └── ScrollToTop.jsx          # Scroll-to-top utility component
│   │   │
│   │   ├── layout/                      # Layout components (appear on every page)
│   │   │   ├── Navbar.jsx               # Navigation bar with menu
│   │   │   └── Footer.jsx               # Footer with links and info
│   │   │
│   │   ├── home/                        # Home page specific components
│   │   │   ├── HeroSection.jsx          # Large banner with main message
│   │   │   ├── ImpactStats.jsx          # Key statistics display
│   │   │   ├── VerticalsGrid.jsx        # Grid showing business verticals
│   │   │   ├── WhySnpSection.jsx        # Why choose SNP section
│   │   │   ├── FeaturedVerticalSpotlight.jsx  # Featured service showcase
│   │   │   ├── ClientLogos.jsx          # Client company logos
│   │   │   ├── TestimonialsSection.jsx  # Customer testimonials
│   │   │   ├── LatestNewsSection.jsx    # Recent news and updates
│   │   │   └── FooterCTA.jsx            # Call-to-action before footer
│   │   │
│   │   ├── about/                       # About Us page components
│   │   │   ├── OurStory.jsx             # Company history and background
│   │   │   ├── VisionMission.jsx        # Vision and mission statements
│   │   │   ├── CoreValues.jsx           # Company core values display
│   │   │   ├── ApproachTimeline.jsx     # Timeline of company journey
│   │   │   ├── TeamSection.jsx          # Team members showcase
│   │   │   └── CSRSection.jsx           # Corporate social responsibility
│   │   │
│   │   ├── edtech/                      # EdTech & STEM Labs page components
│   │   │   ├── ProblemSolution.jsx      # Problem statement and solution
│   │   │   ├── LabInfo.jsx              # Lab information and details
│   │   │   ├── KitCategories.jsx        # Different kit types available
│   │   │   ├── LearningMethodology.jsx  # Teaching approach explanation
│   │   │   ├── LabSetupProcess.jsx      # How to setup labs
│   │   │   ├── LabPackages.jsx          # Different packages offered
│   │   │   ├── ShopSection.jsx          # E-commerce section for kits
│   │   │   └── StemEnquiryForm.jsx      # EdTech-specific enquiry form
│   │   │
│   │   ├── itresourcing/                # IT Resourcing page components
│   │   │   ├── ServicesOverview.jsx     # IT services overview
│   │   │   ├── TechDomains.jsx          # Technology expertise areas
│   │   │   ├── WhyHireSection.jsx       # Benefits of hiring from SNP
│   │   │   ├── TalentPipeline.jsx       # Talent availability info
│   │   │   └── ITEnquiryForm.jsx        # IT resourcing enquiry form
│   │   │
│   │   ├── rd/                          # R&D & Automation page components
│   │   │   ├── WhyRDSection.jsx         # Why R&D is important
│   │   │   ├── RDServices.jsx           # R&D services offered
│   │   │   ├── InnovationLifecycle.jsx  # Product development process
│   │   │   ├── IPSupport.jsx            # Intellectual property support
│   │   │   ├── SectorsGrid.jsx          # Industry sectors served
│   │   │   └── RDEnquiryForm.jsx        # R&D enquiry form
│   │   │
│   │   ├── incubation/                  # Incubation Center page components
│   │   │   ├── WhyIncubate.jsx          # Benefits of incubation
│   │   │   ├── SupportPillars.jsx       # 4 main support areas
│   │   │   ├── IncubationJourney.jsx    # Startup journey stages
│   │   │   ├── EligibilitySection.jsx   # Eligibility criteria
│   │   │   ├── SuccessStories.jsx       # Case studies of successful startups
│   │   │   └── IncubationForm.jsx       # Incubation application form
│   │   │
│   │   ├── workshops/                   # Workshops & Events page components
│   │   │   ├── WorkshopCategories.jsx   # Different workshop types
│   │   │   ├── UpcomingEvents.jsx       # Upcoming workshops and events
│   │   │   ├── PastEvents.jsx           # Past events archive
│   │   │   └── HostWorkshop.jsx         # Form to host a workshop
│   │   │
│   │   ├── gallery/                     # Gallery page components
│   │   │   ├── GalleryFilter.jsx        # Filter buttons for photos/videos
│   │   │   ├── PhotoGrid.jsx            # Photo gallery grid layout
│   │   │   └── VideoGallery.jsx         # Video gallery section
│   │   │
│   │   ├── careers/                     # Careers page components
│   │   │   ├── WhyWorkHere.jsx          # Company benefits and culture
│   │   │   ├── JobListings.jsx          # Active job openings
│   │   │   ├── InternshipProgram.jsx    # Internship opportunities
│   │   │   └── CandidateRegistration.jsx # Resume submission form
│   │   │
│   │   ├── enquiry/                     # Enquiry Hub page components
│   │   │   └── EnquiryTabs.jsx          # Tabbed enquiry form interface
│   │   │
│   │   └── contact/                     # Contact Us page components
│   │       ├── ContactInfo.jsx          # Office addresses and phone
│   │       ├── ContactForm.jsx          # General contact form
│   │       └── SocialLinks.jsx          # Social media links
│   │
│   ├── pages/                           # Full page components (each page combines multiple components)
│   │   ├── HomePage.jsx
│   │   ├── AboutUsPage.jsx
│   │   ├── EdTechPage.jsx
│   │   ├── ITResourcingPage.jsx
│   │   ├── RDPage.jsx
│   │   ├── IncubationPage.jsx
│   │   ├── WorkshopsPage.jsx
│   │   ├── GalleryPage.jsx
│   │   ├── CareersPage.jsx
│   │   ├── EnquiryPage.jsx
│   │   └── ContactPage.jsx
│   │
│   ├── store/                           # Redux store configuration
│   │   ├── store.js                     # Redux store setup
│   │   └── slices/                      # Redux reducers (one per page)
│   │       ├── homeSlice.js             # Home page state
│   │       ├── aboutSlice.js            # About page state
│   │       ├── edtechSlice.js           # EdTech page state
│   │       ├── itresourcingSlice.js     # IT Resourcing page state
│   │       ├── rdSlice.js               # R&D page state
│   │       ├── incubationSlice.js       # Incubation page state
│   │       ├── workshopsSlice.js        # Workshops page state
│   │       ├── gallerySlice.js          # Gallery page state
│   │       ├── careersSlice.js          # Careers page state
│   │       ├── enquirySlice.js          # Enquiry page state
│   │       └── contactSlice.js          # Contact page state
│   │
│   ├── theme/
│   │   └── muiTheme.js                  # Material UI theme configuration
│   │
│   ├── utils/
│   │   └── api.js                       # Axios instance and API configuration
│   │
│   ├── App.jsx                          # Main app component with Router setup
│   ├── main.jsx                         # Entry point of the application
│   └── index.css                        # Global CSS with theme variables
│
├── public/                              # Public static files
│   └── favicon.ico                      # Website icon
│
├── node_modules/                        # Installed dependencies (auto-generated)
│
├── .env.example                         # Example environment variables template
├── .gitignore                           # Git ignore file
├── vite.config.js                       # Vite configuration
├── tailwind.config.js                   # Tailwind CSS configuration
├── package.json                         # Project dependencies and scripts
├── package-lock.json                    # Locked dependency versions
└── README.md                            # This file
```

---

## Prerequisites

Before you start, make sure you have the following installed on your computer:

### Required Software

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation by running: `node --version`

2. **npm** (Node Package Manager - comes with Node.js)
   - Verify installation by running: `npm --version`

3. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Verify installation by running: `git --version`

4. **Code Editor** (Optional but recommended)
   - VS Code: https://code.visualstudio.com/
   - Or any text editor of your choice

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Material Icon Theme

---

## Installation & Setup

Follow these step-by-step instructions to set up the project on your local machine:

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd snp-innovation-website
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This command reads `package.json` and downloads all listed dependencies into the `node_modules` folder.

### Step 3: Create Environment File

Copy the example environment file and create your own:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your configuration values (see [Environment Variables](#environment-variables) section).

### Step 4: Verify Installation

Check if everything is installed correctly:

```bash
npm --version
node --version
```

You're now ready to run the project!

---

## Running the Project

### Development Server

Start the development server with hot module reloading (HMR):

```bash
npm run dev
```

The application will automatically open in your browser at: `http://localhost:5173`

### Features of Development Mode
- **Hot Module Reloading (HMR)**: Changes are instantly reflected in the browser without full page refresh
- **Fast Compilation**: Vite uses esbuild for extremely fast builds
- **Source Maps**: Better debugging with proper source maps
- **CSS Hot Reload**: CSS changes appear instantly

### Accessing the Application

Once the dev server is running:
- Open your browser
- Navigate to `http://localhost:5173`
- You should see the SNP Innovation website homepage
- Open Developer Tools (F12) to see console and debug

### Stopping the Server

Press `Ctrl+C` in your terminal to stop the development server.

---

## Building for Production

### Create Optimized Build

Build the project for production deployment:

```bash
npm run build
```

This command:
1. Minifies all JavaScript and CSS files
2. Optimizes images and assets
3. Creates static files in the `dist/` folder
4. Reduces bundle size significantly

### What Gets Created

After running `npm run build`, you'll see a `dist/` folder containing:
- `index.html` - Main HTML file
- `assets/` - Optimized CSS, JS, and image files
- All static assets required for the website

### Preview Production Build Locally

Before deploying, preview the production build on your local machine:

```bash
npm run preview
```

This starts a local server serving the `dist/` folder at `http://localhost:4173`

### Important Notes
- Only commit source code to git, NOT the `dist/` folder
- Production builds are optimized and cannot be easily modified
- Always test the preview build before actual deployment
- Bundle size is reduced by 60-80% compared to development build

---

## Deployment

Choose one of the following deployment options:

### Option 1: Deploy to Netlify (Recommended for Beginners)

Netlify automatically builds and deploys your site. No need to manually build.

#### Step 1: Create Netlify Account
- Go to https://www.netlify.com
- Sign up with GitHub account

#### Step 2: Connect GitHub Repository
- Click "New site from Git"
- Select GitHub and authorize
- Choose your `snp-innovation-website` repository

#### Step 3: Configure Build Settings
- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variables in Netlify dashboard

#### Step 4: Deploy
- Click Deploy button
- Netlify automatically builds and deploys on every push to main branch
- Your site will be live at: `https://your-site-name.netlify.app`

#### Continuous Deployment
- Every push to `main` branch triggers automatic rebuild and deployment
- Previous deployments can be rolled back if needed

---

### Option 2: Deploy to Vercel (Also Recommended)

Vercel is optimized for React and Vite projects.

#### Step 1: Create Vercel Account
- Go to https://vercel.com
- Sign up with GitHub account

#### Step 2: Import Project
- Click "New Project"
- Select your GitHub repository
- Vercel auto-detects React/Vite settings

#### Step 3: Add Environment Variables
- Go to Project Settings → Environment Variables
- Add your `.env` variables
- Apply to Production/Preview/Development environments

#### Step 4: Deploy
- Click Deploy button
- Vercel builds and deploys your project
- Get a live URL immediately

#### Custom Domain
- Go to Settings → Domains
- Add your custom domain (e.g., snp-innovation.com)
- Follow DNS configuration instructions

---

### Option 3: Traditional Hosting (Server-Based Deployment)

For shared hosting or VPS servers:

#### Step 1: Build Locally
```bash
npm run build
```

#### Step 2: Upload to Server
Upload the `dist/` folder contents to your hosting server via:
- FTP
- SFTP
- Git push
- cPanel File Manager

#### Step 3: Server Configuration (If Using Node.js Server)

If your server supports Node.js, run:
```bash
npm install
npm run build
npm run preview
```

#### Step 4: Configure Web Server

If using Nginx or Apache:

**For Nginx:**
```nginx
server {
    listen 80;
    server_name example.com;
    
    root /var/www/snp-innovation-website/dist;
    index index.html;
    
    # Redirect all routes to index.html for SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**For Apache:**
Add `.htaccess` in `dist/` folder:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Step 5: SSL Certificate
- Install SSL certificate (Let's Encrypt is free)
- Update site URL to use HTTPS

#### Step 6: Enable Caching
- Configure server-side caching for static assets
- Set proper cache headers for CSS/JS files

---

## Theme Customization

### Changing Global Colors

All global colors are defined in two places:

#### 1. Tailwind CSS Colors (`tailwind.config.js`)

This file configures Tailwind's color palette:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      // Define your brand colors here
      primary: '#2563eb',      // Main brand color (blue)
      secondary: '#f59e0b',    // Accent color (amber)
      success: '#10b981',      // Success color (green)
      danger: '#ef4444',       // Error/danger color (red)
      // ... more colors
    },
  },
}
```

**How to Update:**
1. Open `tailwind.config.js`
2. Find the `colors` section
3. Change hex color values to your brand colors
4. Save the file
5. Changes apply instantly in development mode

**Usage in Components:**
```jsx
// Using Tailwind color classes
<button className="bg-primary text-white">Click Me</button>
<div className="border-secondary border-2">Content</div>
```

#### 2. Material UI Theme (`src/theme/muiTheme.js`)

MUI components use this theme configuration:

```javascript
// src/theme/muiTheme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',       // Main brand color
    },
    secondary: {
      main: '#f59e0b',       // Secondary color
    },
    // ... more theme properties
  },
});
```

**How to Update:**
1. Open `src/theme/muiTheme.js`
2. Modify the `palette` object
3. All MUI components will use the new colors
4. Changes apply instantly

#### 3. CSS Variables (`src/index.css`)

For additional customization:

```css
/* src/index.css */
:root {
  --color-primary: #2563eb;
  --color-secondary: #f59e0b;
  --font-family: 'Segoe UI', sans-serif;
  --border-radius: 8px;
}
```

**Usage:**
```css
.custom-button {
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
}
```

### Complete Color Update Workflow

To change your brand colors across the entire website:

1. **Update Tailwind colors** in `tailwind.config.js`
2. **Update MUI theme** in `src/theme/muiTheme.js`
3. **Update CSS variables** in `src/index.css`
4. **Test in browser** - dev server auto-refreshes
5. **Verify all pages** - check every page for consistency

### Color Reference

Common colors used throughout the site:
- **Primary**: Used for buttons, links, main CTAs
- **Secondary**: Used for accents and highlights
- **Success**: Used for positive messages
- **Warning**: Used for caution messages
- **Danger/Error**: Used for error messages
- **Neutral**: Used for text, backgrounds, borders

---

## Connecting to Spring Boot Backend

The website communicates with a Spring Boot backend API for data fetching and form submissions.

### API Configuration

All API calls are configured through the Axios instance in `src/utils/api.js`:

```javascript
// src/utils/api.js
import axios from 'axios';

// Get base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Create Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,            // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor (runs before every API call)
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor (runs after every API response)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Environment Variable Setup

Add your backend URL to `.env.local`:

```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

For production:
```env
REACT_APP_API_BASE_URL=https://api.snp-innovation.com
```

### Making API Calls in Components

Here's how to fetch data from your Spring Boot backend:

#### Example 1: Fetching Data in a Component

```javascript
import { useEffect, useState } from 'react';
import apiClient from '../utils/api.js';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/api/products');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array = runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

#### Example 2: Submitting Form Data

```javascript
async function handleFormSubmit(formData) {
  try {
    const response = await apiClient.post('/api/enquiries', {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
    
    console.log('Success:', response.data);
    alert('Enquiry submitted successfully!');
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Failed to submit enquiry');
  }
}
```

#### Example 3: Updating Data

```javascript
async function updateProduct(id, updatedData) {
  try {
    const response = await apiClient.put(`/api/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
  }
}
```

#### Example 4: Deleting Data

```javascript
async function deleteProduct(id) {
  try {
    await apiClient.delete(`/api/products/${id}`);
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}
```

### Handling Different Response Types

#### JSON Response
```javascript
const response = await apiClient.get('/api/data');
console.log(response.data); // Parsed JSON object
```

#### File Download
```javascript
const response = await apiClient.get('/api/export/csv', {
  responseType: 'blob'
});
// Save file
const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = url;
link.setAttribute('download', 'data.csv');
link.click();
```

### Common HTTP Methods

```javascript
// GET - Retrieve data
apiClient.get('/api/users')

// POST - Create new data
apiClient.post('/api/users', { name: 'John', email: 'john@example.com' })

// PUT - Update entire resource
apiClient.put('/api/users/1', { name: 'Jane', email: 'jane@example.com' })

// PATCH - Update partial resource
apiClient.patch('/api/users/1', { name: 'Jane' })

// DELETE - Remove data
apiClient.delete('/api/users/1')
```

### Error Handling Best Practices

```javascript
try {
  const response = await apiClient.post('/api/enquiry', data);
  // Success handling
} catch (error) {
  // Check error type
  if (error.response) {
    // Server responded with error status (4xx, 5xx)
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  } else if (error.request) {
    // Request made but no response (network issue)
    console.error('No response from server');
  } else {
    // Error setting up request
    console.error('Error:', error.message);
  }
}
```

---

## Redux Store Pattern

Redux is used for centralized state management. Here's how the pattern works:

### What is Redux?

Redux is a predictable state management container that helps you:
- Keep all app data in one place (the "store")
- Make data changes predictable and traceable
- Share data between components without prop drilling

### Redux Flow Diagram

```
User Action (click button)
    ↓
Component dispatches Action
    ↓
Reducer processes Action and updates State
    ↓
Store notifies subscribed Components
    ↓
Components re-render with new data
    ↓
UI Updates
```

### Store Setup (`src/store/store.js`)

```javascript
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';
import aboutReducer from './slices/aboutSlice';
// ... import other slices

// Create the store with all slices
export const store = configureStore({
  reducer: {
    home: homeReducer,       // Store home page data
    about: aboutReducer,     // Store about page data
    // ... other page states
  },
});
```

### Creating a Redux Slice (`src/store/slices/homeSlice.js`)

A slice is a collection of Redux logic for a specific feature:

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/api';

// Step 1: Create async thunk for API calls
// Thunks are functions that handle async operations
export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',  // Unique action name
  async (_, { rejectWithValue }) => {
    try {
      // Make API call to Spring Boot backend
      const response = await apiClient.get('/api/home');
      return response.data; // Return fetched data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Step 2: Create slice with reducers and state
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // When fetch starts
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When fetch succeeds
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Store fetched data
      })
      // When fetch fails
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
```

### Using Redux Data in Components

#### Example: Displaying Home Page Data

```javascript
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHomeData } from '../store/slices/homeSlice';

function HomePage() {
  // Get dispatch function to trigger actions
  const dispatch = useDispatch();
  
  // Get data from Redux store
  const { data, loading, error } = useSelector((state) => state.home);

  // Fetch data when component mounts
  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  // Show loading state
  if (loading) return <div>Loading...</div>;
  
  // Show error state
  if (error) return <div>Error: {error}</div>;

  // Render data when loaded
  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.description}</p>
      <img src={data?.imageUrl} alt="Hero" />
    </div>
  );
}

export default HomePage;
```

### Redux Data Flow Example

Here's a complete step-by-step example:

```
1. Component Mounts
   └─> useEffect triggers dispatch(fetchHomeData())

2. Async Thunk Starts
   └─> homeSlice state.loading = true
   └─> API call to /api/home begins

3. API Response Received
   └─> homeSlice.fulfilled triggered
   └─> state.data = response.data
   └─> state.loading = false

4. Component Re-renders
   └─> useSelector updates with new data
   └─> UI displays fetched content
```

### Common Redux Patterns

#### Pattern 1: Fetch and Display Data
```javascript
// In component
const { products, loading } = useSelector((state) => state.products);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchProducts());
}, []);

return loading ? <Spinner /> : <ProductGrid products={products} />;
```

#### Pattern 2: Filter Data in Store
```javascript
// In slice
extraReducers: (builder) => {
  builder.addCase(fetchProducts.fulfilled, (state, action) => {
    state.products = action.payload;
    // Auto-filter based on category
    state.filtered = action.payload.filter(p => p.category === state.selectedCategory);
  });
}
```

#### Pattern 3: Handle Form Data
```javascript
// In slice
const slice = createSlice({
  name: 'form',
  initialState: {
    formData: {},
    submitted: false,
  },
  reducers: {
    updateFormField: (state, action) => {
      state.formData[action.payload.name] = action.payload.value;
    },
    resetForm: (state) => {
      state.formData = {};
      state.submitted = false;
    },
  },
});
```

---

## Adding a New Page

To add a new page to the website, follow these step-by-step instructions:

### Step 1: Create the Page Component

Create a new file in `src/pages/` directory:

```javascript
// src/pages/MyNewPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPageData } from '../store/slices/myPageSlice';
import PageBanner from '../components/common/PageBanner';
import SectionHeader from '../components/common/SectionHeader';

function MyNewPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.myPage);

  useEffect(() => {
    // Fetch page data when component mounts
    dispatch(fetchMyPageData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Page header/banner */}
      <PageBanner 
        title="My New Page" 
        subtitle="Welcome to this amazing page"
      />

      {/* Page content */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <SectionHeader 
          title="Section Title"
          subtitle="Section description"
        />
        
        {/* Your content here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {data?.items?.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default MyNewPage;
```

### Step 2: Create Redux Slice

Create a new slice in `src/store/slices/`:

```javascript
// src/store/slices/myPageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../utils/api';

// Fetch data from backend
export const fetchMyPageData = createAsyncThunk(
  'myPage/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/api/my-page');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const myPageSlice = createSlice({
  name: 'myPage',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPageData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMyPageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default myPageSlice.reducer;
```

### Step 3: Add Slice to Redux Store

Update `src/store/store.js`:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import myPageReducer from './slices/myPageSlice'; // Add this import
import homeReducer from './slices/homeSlice';
// ... other imports

export const store = configureStore({
  reducer: {
    myPage: myPageReducer,  // Add this line
    home: homeReducer,
    // ... other slices
  },
});
```

### Step 4: Add Route to App

Update `src/App.jsx` to add routing:

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNewPage from './pages/MyNewPage';
import HomePage from './pages/HomePage';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-new-page" element={<MyNewPage />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;
```

### Step 5: Add Navigation Link

Update `src/components/layout/Navbar.jsx` to include link to new page:

```javascript
<nav className="navbar">
  <Link to="/">Home</Link>
  <Link to="/about">About Us</Link>
  <Link to="/my-new-page">My New Page</Link>  {/* Add this */}
  {/* ... other links */}
</nav>
```

### Step 6: Create Page Components (Optional)

If your page is complex, create sub-components in `src/components/mynewpage/`:

```javascript
// src/components/mynewpage/SectionOne.jsx
function SectionOne({ data }) {
  return (
    <section className="py-12">
      <h2>{data.title}</h2>
      {/* Component content */}
    </section>
  );
}

export default SectionOne;
```

Then use in your page component:
```javascript
import SectionOne from '../components/mynewpage/SectionOne';

function MyNewPage() {
  // ... rest of code
  return (
    <>
      <PageBanner ... />
      <SectionOne data={data} />
    </>
  );
}
```

### Complete Checklist

- [ ] Created page component in `src/pages/`
- [ ] Created Redux slice in `src/store/slices/`
- [ ] Added slice to `src/store/store.js`
- [ ] Added route in `src/App.jsx`
- [ ] Added navigation link in Navbar
- [ ] Created sub-components if needed
- [ ] Backend API endpoint exists at `/api/my-page`
- [ ] Tested page in browser

---

## Adding a Reusable Component

Reusable components are stored in `src/components/common/` and can be used across multiple pages.

### Step 1: Create Component File

Create a new component file:

```javascript
// src/components/common/MyCustomComponent.jsx
import PropTypes from 'prop-types';

/**
 * MyCustomComponent - A reusable component
 * 
 * Props:
 * - title (string): Component title
 * - description (string): Component description
 * - onClick (function): Callback when clicked
 * - variant (string): 'light' or 'dark' styling
 */
function MyCustomComponent({ title, description, onClick, variant = 'light' }) {
  const variantClasses = variant === 'dark' 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900';

  return (
    <div className={`p-6 rounded-lg shadow-md ${variantClasses}`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <button 
        onClick={onClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Learn More
      </button>
    </div>
  );
}

// PropTypes for type checking (catches bugs early)
MyCustomComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['light', 'dark']),
};

export default MyCustomComponent;
```

### Step 2: Use Component in Pages

Import and use the component anywhere:

```javascript
// In any page component
import MyCustomComponent from '../components/common/MyCustomComponent';

function HomePage() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <MyCustomComponent 
        title="Welcome"
        description="This is a reusable component"
        onClick={handleClick}
        variant="dark"
      />
    </div>
  );
}
```

### Step 3: Component Best Practices

#### Keep It Simple
```javascript
// Good - Does one thing well
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// Avoid - Too many responsibilities
function SuperComponent({ /* 20 props */ }) {
  // Complex logic
}
```

#### Use Default Props
```javascript
function Card({ title, description, variant = 'default', size = 'md' }) {
  // variant and size have defaults if not provided
}
```

#### Document Your Component
```javascript
/**
 * Badge Component - Displays a colored badge
 * 
 * Usage:
 * <Badge label="New" color="success" />
 * 
 * Props:
 * - label (string): Badge text
 * - color (string): 'success', 'warning', 'danger', or 'info'
 * - size (string): 'sm', 'md', or 'lg' (default: 'md')
 */
function Badge({ label, color = 'info', size = 'md' }) {
  // Implementation
}
```

#### Accept Children
```javascript
/**
 * Card component that can wrap content
 */
function Card({ children, title, onClick }) {
  return (
    <div onClick={onClick} className="card">
      {title && <h3>{title}</h3>}
      {children} {/* Content passed between tags */}
    </div>
  );
}

// Usage
<Card title="My Card">
  <p>This content goes inside the card</p>
  <Button>Action</Button>
</Card>
```

### Component Organization Tips

**Create a component folder for complex components:**
```
src/components/common/
├── Button/
│   ├── Button.jsx
│   ├── Button.module.css
│   └── Button.test.js
├── Card/
│   ├── Card.jsx
│   └── Card.module.css
```

**Export multiple related components:**
```javascript
// src/components/common/Form/index.js
export { default as FormInput } from './FormInput';
export { default as FormSelect } from './FormSelect';
export { default as FormCheckbox } from './FormCheckbox';

// Usage
import { FormInput, FormSelect } from '../components/common/Form';
```

---

## Available npm Scripts

Here are all the npm commands available in this project:

### Development Commands

#### `npm run dev`
Starts the development server with hot module reloading.
```bash
npm run dev
```
- Access at: `http://localhost:5173`
- Auto-refreshes when you change files
- Shows errors in browser console

#### `npm run build`
Creates an optimized production build.
```bash
npm run build
```
- Minifies code and assets
- Creates `dist/` folder with production files
- Reduces bundle size by 60-80%
- Takes 1-2 minutes to complete

#### `npm run preview`
Previews the production build locally.
```bash
npm run preview
```
- Access at: `http://localhost:4173`
- Serves files from `dist/` folder
- Shows exactly what users will see in production
- Useful for testing before deployment

### Utility Commands

#### `npm install`
Installs all project dependencies.
```bash
npm install
```
- Run this after cloning the project
- Run when `package.json` changes
- Creates/updates `node_modules/` folder

#### `npm test`
Runs automated tests (if configured).
```bash
npm test
```
- Tests component logic and functionality
- Ensures code quality
- Run before committing code changes

#### `npm run lint`
Checks code quality and style (if configured).
```bash
npm run lint
```
- Identifies code style issues
- Catches potential bugs
- Run before submitting pull requests

### Package.json Scripts Reference

All available scripts are defined in `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest"
  }
}
```

### Running Multiple Commands

You can chain commands together:

```bash
# Run lint, test, then build
npm run lint && npm run test && npm run build

# Run development server
npm run dev

# After development, build and preview
npm run build && npm run preview
```

---

## Backend API Structure

The Spring Boot backend should provide REST API endpoints following this structure:

### API URL Format

All API endpoints should follow this pattern:
```
GET    /api/{resource}              - Get all resources
GET    /api/{resource}/{id}         - Get single resource
POST   /api/{resource}              - Create new resource
PUT    /api/{resource}/{id}         - Update resource
DELETE /api/{resource}/{id}         - Delete resource
```

### Expected Response Format

All endpoints should return JSON in this format:

#### Success Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Example",
    "description": "Sample data"
  },
  "message": "Operation successful"
}
```

#### Error Response (400/500)
```json
{
  "success": false,
  "error": "error_code",
  "message": "Human-readable error message",
  "details": {}
}
```

### Required API Endpoints

Here are the recommended endpoints for each page:

#### Home Page
```
GET /api/home                    - Get home page data (hero, stats, news)
GET /api/testimonials            - Get customer testimonials
GET /api/news                    - Get latest news/blog posts
```

#### About Us
```
GET /api/about                   - Get company story and info
GET /api/team                    - Get team members
GET /api/values                  - Get company values
GET /api/csr                     - Get CSR initiatives
```

#### EdTech & STEM Labs
```
GET /api/edtech/labs             - Get lab information
GET /api/edtech/kits             - Get kit listings
GET /api/edtech/packages         - Get package details
POST /api/edtech/enquiry         - Submit EdTech enquiry
```

#### IT Resourcing
```
GET /api/itresourcing/services   - Get IT services
GET /api/itresourcing/domains    - Get tech domains
GET /api/itresourcing/talent     - Get talent pipeline info
POST /api/itresourcing/enquiry   - Submit IT enquiry
POST /api/itresourcing/cv-upload - Upload CV
```

#### R&D & Automation
```
GET /api/rd/services             - Get R&D services
GET /api/rd/sectors              - Get industry sectors
GET /api/rd/lifecycle            - Get innovation lifecycle
POST /api/rd/enquiry             - Submit R&D enquiry
```

#### Incubation Center
```
GET /api/incubation/pillars      - Get support pillars
GET /api/incubation/journey      - Get journey stages
GET /api/incubation/stories      - Get success stories
POST /api/incubation/apply       - Submit incubation application
```

#### Workshops & Events
```
GET /api/workshops/categories    - Get workshop categories
GET /api/workshops/upcoming      - Get upcoming events
GET /api/workshops/past          - Get past events
POST /api/workshops/register     - Register for workshop
POST /api/workshops/host         - Host a workshop
```

#### Gallery
```
GET /api/gallery/photos          - Get photo list
GET /api/gallery/videos          - Get video list
```

#### Careers
```
GET /api/careers/jobs            - Get active job listings
GET /api/careers/internships     - Get internship programs
POST /api/careers/register       - Register as candidate
POST /api/careers/cv-upload      - Upload resume
```

#### Enquiry Hub
```
POST /api/enquiries              - Submit general enquiry
POST /api/enquiries/bulk         - Submit multiple enquiries
```

#### Contact Us
```
GET /api/contact/info            - Get office information
POST /api/contact/message        - Submit contact form
```

### Data Pagination (For Large Datasets)

For endpoints returning many items:

```json
{
  "success": true,
  "data": [
    { "id": 1, "title": "Item 1" },
    { "id": 2, "title": "Item 2" }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 150,
    "totalPages": 15
  }
}
```

Frontend consumption:
```javascript
const response = await apiClient.get('/api/jobs?page=1&pageSize=10');
const { data, pagination } = response.data;
```

### Authentication (Optional)

If your backend requires authentication:

```
POST /api/auth/login             - Get JWT token
POST /api/auth/logout            - Invalidate token
GET  /api/auth/me                - Get current user info
POST /api/auth/refresh           - Refresh expired token
```

Token should be sent in request header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

This is automatically handled in `src/utils/api.js` interceptor.

### Example Spring Boot Endpoint

Here's an example Spring Boot endpoint that matches the expected format:

```java
@RestController
@RequestMapping("/api/edtech")
public class EdTechController {
  
  @GetMapping("/labs")
  public ResponseEntity<?> getLabs() {
    try {
      List<Lab> labs = edTechService.getAllLabs();
      return ResponseEntity.ok(new ApiResponse(
        true,
        labs,
        "Labs retrieved successfully"
      ));
    } catch (Exception e) {
      return ResponseEntity.status(500).body(new ApiResponse(
        false,
        null,
        "Error fetching labs: " + e.getMessage()
      ));
    }
  }

  @PostMapping("/enquiry")
  public ResponseEntity<?> submitEnquiry(@RequestBody EnquiryRequest request) {
    try {
      Enquiry enquiry = edTechService.saveEnquiry(request);
      return ResponseEntity.ok(new ApiResponse(
        true,
        enquiry,
        "Enquiry submitted successfully"
      ));
    } catch (Exception e) {
      return ResponseEntity.status(400).body(new ApiResponse(
        false,
        null,
        "Error submitting enquiry: " + e.getMessage()
      ));
    }
  }
}
```

---

## Environment Variables

Environment variables store sensitive information and configuration that changes between environments (development, staging, production).

### Creating .env Files

1. **Copy the template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** with your values:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:8080
   REACT_APP_APP_NAME=SNP Innovation
   REACT_APP_ENVIRONMENT=development
   ```

### Available Environment Variables

```env
# Backend API Configuration
REACT_APP_API_BASE_URL=http://localhost:8080        # Backend API URL
REACT_APP_API_TIMEOUT=10000                          # API request timeout (ms)

# Application Info
REACT_APP_APP_NAME=SNP Innovation                    # Application name
REACT_APP_APP_VERSION=1.0.0                          # Current version
REACT_APP_ENVIRONMENT=development                    # Environment (dev, staging, prod)

# Analytics (Optional)
REACT_APP_GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X       # Google Analytics ID
REACT_APP_MIXPANEL_TOKEN=abcdef123456               # Mixpanel token

# Feature Flags (For A/B testing)
REACT_APP_ENABLE_BETA_FEATURES=false                # Enable experimental features
REACT_APP_ENABLE_ANALYTICS=true                     # Enable analytics tracking

# Miscellaneous
REACT_APP_CONTACT_EMAIL=contact@snp-innovation.com  # Support email
REACT_APP_SUPPORT_PHONE=+91-XXXXXXXXXX              # Support phone
```

### Using Environment Variables in Code

Variables are accessed via `process.env`:

```javascript
// In any JavaScript file
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const appName = process.env.REACT_APP_APP_NAME;

console.log(`Connecting to ${apiUrl}`);
console.log(`Running ${appName}`);
```

In JSX:
```jsx
<h1>{process.env.REACT_APP_APP_NAME}</h1>
<a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>
  Contact Us
</a>
```

### Environment-Specific Configuration

```javascript
// src/config.js - Centralized configuration
const config = {
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
  },
  app: {
    name: process.env.REACT_APP_APP_NAME || 'SNP Innovation',
    env: process.env.REACT_APP_ENVIRONMENT || 'development',
  },
  features: {
    enableBeta: process.env.REACT_APP_ENABLE_BETA_FEATURES === 'true',
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS !== 'false',
  },
};

export default config;
```

### Different Configurations by Environment

#### Development (.env.local)
```env
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_ENVIRONMENT=development
REACT_APP_ENABLE_ANALYTICS=false
```

#### Staging (.env.staging)
```env
REACT_APP_API_BASE_URL=https://api-staging.snp-innovation.com
REACT_APP_ENVIRONMENT=staging
REACT_APP_ENABLE_ANALYTICS=true
```

#### Production (.env.production)
```env
REACT_APP_API_BASE_URL=https://api.snp-innovation.com
REACT_APP_ENVIRONMENT=production
REACT_APP_ENABLE_ANALYTICS=true
```

### Important Security Notes

**NEVER commit sensitive data to git!**

```bash
# These files are in .gitignore and should NOT be committed:
.env.local
.env.staging
.env.production
```

**Only commit `.env.example`:**
```env
# .env.example - This CAN be committed
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_APP_NAME=SNP Innovation
REACT_APP_ENVIRONMENT=development
```

---

## Browser Support

This application supports the following browsers:

### Minimum Requirements

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Safari (iOS) | 14+ |
| Chrome Mobile (Android) | 90+ |

### Not Supported

- Internet Explorer (all versions)
- Opera Mini
- Old Android browsers

### Testing on Different Browsers

#### Test on Chrome DevTools
1. Open browser DevTools (F12)
2. Click device toolbar icon (mobile/tablet view)
3. Select different devices to test responsive design

#### Test on Real Devices
```bash
# Get your local IP
ipconfig getifaddr en0  # macOS
hostname -I             # Linux

# Access from mobile: http://YOUR_IP:5173
```

#### BrowserStack (For Professional Testing)
- Visit https://www.browserstack.com
- Test on real devices and browsers
- Required for production deployment testing

### Responsive Design Breakpoints

The site is optimized for:
```
Mobile:      320px - 639px   (phones)
Tablet:      640px - 1023px  (iPad, tablets)
Desktop:     1024px+         (laptops, desktops)
```

Test these breakpoints in DevTools.

---

## Contributing Guidelines

### Code Standards

#### 1. Component Structure

```javascript
// ✅ Good Component Structure
import PropTypes from 'prop-types';

/**
 * MyComponent - Description of what this does
 * 
 * Props:
 * - title: string - Component title
 * - onClick: function - Click handler
 */
function MyComponent({ title, onClick }) {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MyComponent;
```

#### 2. File Naming

```
Components:      PascalCase (MyComponent.jsx)
Utilities:       camelCase (apiClient.js)
Constants:       UPPER_SNAKE_CASE (API_BASE_URL)
Folders:         lowercase (components, utils, pages)
Redux slices:    camelCase (homeSlice.js)
```

#### 3. Imports

Organize imports in this order:
```javascript
// 1. Third-party libraries
import React, { useState } from 'react';
import axios from 'axios';

// 2. Redux
import { useSelector, useDispatch } from 'react-redux';

// 3. Internal components
import Button from '../components/Button';
import Navbar from '../components/layout/Navbar';

// 4. Utilities and configs
import { API_BASE_URL } from '../config';
import apiClient from '../utils/api';

// 5. Styles
import './MyComponent.css';
```

#### 4. Code Style

```javascript
// ✅ Use meaningful variable names
const userEmailAddress = "user@example.com";
const isLoading = true;

// ❌ Avoid unclear names
const uel = "user@example.com";
const load = true;

// ✅ Use const by default
const message = "Hello";

// ❌ Avoid var
var message = "Hello";

// ✅ Use template literals
const greeting = `Hello, ${name}!`;

// ❌ Avoid string concatenation
const greeting = "Hello, " + name + "!";
```

### Commit Message Guidelines

Write clear, descriptive commit messages:

```
Format: [TYPE] Brief description

Types:
- [FEAT] New feature
- [FIX] Bug fix
- [DOCS] Documentation changes
- [STYLE] Code style changes
- [REFACTOR] Code refactoring
- [TEST] Test additions or changes
- [CHORE] Maintenance tasks

Examples:
[FEAT] Add EdTech enquiry form functionality
[FIX] Fix responsive navbar on mobile devices
[DOCS] Update API documentation
[REFACTOR] Simplify Redux store structure
```

### Pull Request Process

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Keep commits small and focused
   - Write descriptive commit messages
   - Test your code thoroughly

3. **Push to your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request:**
   - Title: Brief description of changes
   - Description: What changed and why
   - Reference related issues: "Fixes #123"

5. **Code Review:**
   - Address feedback from reviewers
   - Make requested changes
   - Request re-review

6. **Merge:**
   - Once approved, merge to main branch
   - Delete feature branch

### Testing Before Submitting

```bash
# Run lint check
npm run lint

# Run tests
npm run test

# Build for production
npm run build

# Preview production build
npm run preview
```

### Common Mistakes to Avoid

❌ **Don't:**
- Commit `.env` files or sensitive data
- Leave console.log() statements in code
- Write overly complex functions
- Ignore linting errors
- Skip testing
- Make huge commits with many unrelated changes

✅ **Do:**
- Keep functions small and focused
- Add comments for complex logic
- Use meaningful variable names
- Follow the established code style
- Write tests for new features
- Make focused, related commits

---

## License

This project is proprietary software owned by SNP Innovation Pvt. Ltd.

### Usage Rights

- The source code is confidential and proprietary
- Unauthorized copying, modification, or distribution is prohibited
- All rights reserved

### For Employees and Contractors

This code is provided for development and maintenance purposes only. Any external distribution, sharing, or use of this code outside the organization is strictly prohibited without written permission from SNP Innovation Pvt. Ltd.

### Copyright

© 2024 SNP Innovation Pvt. Ltd. All rights reserved.

---

## Support & Resources

### Getting Help

- **Documentation**: Check this README first
- **Issues**: Report bugs or feature requests in the project repository
- **Team**: Reach out to the development team for questions
- **Email**: contact@snp-innovation.com

### Useful Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Redux Documentation](https://redux.js.org)
- [Material UI Docs](https://mui.com)
- [Axios Documentation](https://axios-http.com)

### Troubleshooting

#### Port 5173 Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

#### node_modules Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Build Size Too Large
- Check unused dependencies: `npm list`
- Optimize images in `src/assets/images/`
- Enable code splitting in vite.config.js

#### API Connection Issues
- Verify backend is running at REACT_APP_API_BASE_URL
- Check CORS configuration on backend
- Review network tab in DevTools for error details

---

**Last Updated**: April 15, 2026  
**Maintained By**: SNP Innovation Development Team  
**Version**: 1.0.0

