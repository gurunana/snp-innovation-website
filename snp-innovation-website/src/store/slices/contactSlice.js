/* ========================================
   CONTACT SLICE - Manages contact page data
   Contains: office info, social links, form submission
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk to fetch contact data from backend
export const fetchContactData = createAsyncThunk(
  'contact/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/contact');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch contact data');
    }
  }
);

// Async thunk for contact form submission
export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/contact/submit', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit contact form');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Main office information
  mainOffice: {
    name: "SNP Innovation Pvt. Ltd. (Head Office)",
    address: "SNP Innovation Campus, Mumbai, Maharashtra, India",
    phone: "+91-XXXX-XXX-XXXX",
    email: "info@snpinnovation.com",
    website: "https://snpinnovation.com",
    timezone: "IST (Indian Standard Time)",
    mapEmbedUrl: "https://maps.google.com/maps?q=snp+innovation+mumbai",
  },
  // Regional offices
  offices: [
    {
      id: 1,
      name: "Delhi Office",
      address: "SNP Innovation, New Delhi, India",
      phone: "+91-XXXX-XXX-XXXX",
      email: "delhi@snpinnovation.com",
      region: "North India",
      services: ["EdTech Labs", "IT Resourcing", "R&D Support", "Incubation"],
      mapEmbedUrl: "https://maps.google.com/maps?q=snp+innovation+delhi",
    },
    {
      id: 2,
      name: "Bangalore Office",
      address: "SNP Innovation, Bangalore, Karnataka, India",
      phone: "+91-XXXX-XXX-XXXX",
      email: "bangalore@snpinnovation.com",
      region: "South India",
      services: ["AI/ML Labs", "IT Services", "R&D", "Incubation"],
      mapEmbedUrl: "https://maps.google.com/maps?q=snp+innovation+bangalore",
    },
    {
      id: 3,
      name: "Pune Office",
      address: "SNP Innovation, Pune, Maharashtra, India",
      phone: "+91-XXXX-XXX-XXXX",
      email: "pune@snpinnovation.com",
      region: "Western India",
      services: ["EdTech Labs", "Workshops", "R&D", "Incubation"],
      mapEmbedUrl: "https://maps.google.com/maps?q=snp+innovation+pune",
    },
    {
      id: 4,
      name: "Chennai Office",
      address: "SNP Innovation, Chennai, Tamil Nadu, India",
      phone: "+91-XXXX-XXX-XXXX",
      email: "chennai@snpinnovation.com",
      region: "South India",
      services: ["EdTech Labs", "IT Services", "Workshops"],
      mapEmbedUrl: "https://maps.google.com/maps?q=snp+innovation+chennai",
    },
  ],
  // Business hours
  businessHours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM IST",
    weekends: "Saturday & Sunday: Closed",
    holidays: "National holidays (Refer to official calendar)",
    note: "We are available for emergency consultations during extended hours. Contact support@snpinnovation.com",
  },
  // Contact categories
  contactCategories: [
    {
      id: 1,
      category: "General Enquiries",
      email: "info@snpinnovation.com",
      phone: "+91-XXXX-XXX-XXXX",
      response_time: "Within 24 hours",
    },
    {
      id: 2,
      category: "EdTech & Lab Enquiries",
      email: "edtech@snpinnovation.com",
      phone: "+91-XXXX-XXX-XXXX",
      response_time: "Within 12 hours",
    },
    {
      id: 3,
      category: "IT Resourcing & Services",
      email: "careers@snpinnovation.com",
      phone: "+91-XXXX-XXX-XXXX",
      response_time: "Within 6 hours",
    },
    {
      id: 4,
      category: "R&D & Innovation Projects",
      email: "innovation@snpinnovation.com",
      phone: "+91-XXXX-XXX-XXXX",
      response_time: "Within 12 hours",
    },
    {
      id: 5,
      category: "Incubation & Startup Support",
      email: "incubation@snpinnovation.com",
      phone: "+91-XXXX-XXX-XXXX",
      response_time: "Within 24 hours",
    },
    {
      id: 6,
      category: "Media & Press",
      email: "press@snpinnovation.com",
      phone: "+91-XXXX-XXX-XXXX",
      response_time: "Within 24 hours",
    },
  ],
  // Social media links
  socialLinks: {
    linkedin: {
      url: "https://linkedin.com/company/snp-innovation",
      followers: "15K+",
      description: "Follow us for company updates and industry insights",
    },
    twitter: {
      url: "https://twitter.com/snpinnovation",
      followers: "5K+",
      description: "Latest news, announcements, and tech updates",
    },
    facebook: {
      url: "https://facebook.com/snpinnovation",
      followers: "8K+",
      description: "Community engagement and event announcements",
    },
    instagram: {
      url: "https://instagram.com/snpinnovation",
      followers: "3K+",
      description: "Behind-the-scenes and visual stories",
    },
    youtube: {
      url: "https://youtube.com/@snpinnovation",
      subscribers: "10K+",
      description: "Tutorials, workshops, and company insights",
    },
  },
  // Newsletter subscription
  newsletter: {
    title: "Subscribe to Our Newsletter",
    description: "Stay updated with latest workshops, insights, and innovations from SNP",
    frequency: "Monthly digest with curated content",
  },
  // Contact form state
  contactForm: {
    formData: {
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      subject: '',
      message: '',
      category: '', // general, edtech, itresourcing, rd, incubation, media
      preferredContact: 'email', // email or phone
    },
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    submissionError: null,
    submissionMessage: null,
  },
  // Loading and error states
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    // Reset contact form
    resetContactForm: (state) => {
      state.contactForm.formData = initialState.contactForm.formData;
      state.contactForm.submissionStatus = 'idle';
      state.contactForm.submissionError = null;
      state.contactForm.submissionMessage = null;
    },
    // Update contact form field
    updateContactField: (state, action) => {
      const { field, value } = action.payload;
      state.contactForm.formData[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch contact data
      .addCase(fetchContactData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchContactData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Submit contact form
      .addCase(submitContactForm.pending, (state) => {
        state.contactForm.submissionStatus = 'loading';
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.contactForm.submissionStatus = 'succeeded';
        state.contactForm.submissionMessage = action.payload.message || 'Message sent successfully! We will contact you soon.';
        state.contactForm.formData = initialState.contactForm.formData;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.contactForm.submissionStatus = 'failed';
        state.contactForm.submissionError = action.payload;
      });
  },
});

export const { resetContactForm, updateContactField } = contactSlice.actions;
export default contactSlice.reducer;
