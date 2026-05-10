/* ========================================
   ENQUIRY SLICE - Manages enquiry hub data
   Contains: vertical-wise form submissions, enquiry management
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk to fetch enquiry hub data from backend
export const fetchEnquiryData = createAsyncThunk(
  'enquiry/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/enquiry');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch enquiry data');
    }
  }
);

// Async thunk for general enquiry submission
export const submitGeneralEnquiry = createAsyncThunk(
  'enquiry/submitGeneral',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/enquiry/submit', enquiryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit enquiry');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Enquiry hub overview
  overview: {
    headline: "Get in Touch with SNP Innovation",
    tagline: "Have questions about our services? We are here to help!",
    description: "Whether you are an institution looking to set up a STEM lab, an enterprise seeking IT talent, or a startup ready to scale - we have the right solutions for you.",
  },
  // Enquiry categories and forms
  categories: [
    {
      id: 1,
      name: "EdTech & STEM Labs",
      icon: "Science",
      description: "Inquire about lab setups, kits, training, and customization options",
      fields: [
        { name: "institutionName", label: "Institution Name", type: "text", required: true },
        { name: "contactPerson", label: "Contact Person Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: true },
        { name: "location", label: "Location/City", type: "text", required: true },
        { name: "studentCount", label: "Estimated Student Count", type: "number", required: false },
        { name: "labType", label: "Lab Type of Interest", type: "select", options: ["AI/ML", "Robotics", "IoT", "Electronics", "Game Dev", "Not Sure"], required: true },
        { name: "message", label: "Message", type: "textarea", required: false },
      ],
    },
    {
      id: 2,
      name: "IT Resourcing & Services",
      icon: "Computer",
      description: "Find skilled developers, teams, and technology services",
      fields: [
        { name: "companyName", label: "Company Name", type: "text", required: true },
        { name: "contactPerson", label: "Contact Person Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: true },
        { name: "serviceType", label: "Service Type of Interest", type: "select", options: ["Dedicated Team", "Project-Based", "Staff Augmentation", "Consulting", "QA/Testing"], required: true },
        { name: "requiredSkills", label: "Required Skills/Tech Stack", type: "textarea", required: false },
        { name: "budget", label: "Approximate Budget Range", type: "text", required: false },
        { name: "message", label: "Project Details", type: "textarea", required: false },
      ],
    },
    {
      id: 3,
      name: "R&D & Automation",
      icon: "Engineering",
      description: "Support for research projects, automation solutions, and IP filing",
      fields: [
        { name: "projectTitle", label: "Project Title", type: "text", required: true },
        { name: "organizationName", label: "Organization Name", type: "text", required: true },
        { name: "contactPerson", label: "Contact Person Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: true },
        { name: "sector", label: "Industry Sector", type: "select", options: ["AgriTech", "HealthTech", "CleanEnergy", "Manufacturing", "Environmental", "Other"], required: true },
        { name: "serviceType", label: "Service Required", type: "select", options: ["Hardware Design", "Software Development", "Automation", "IP/Patents", "Consulting"], required: true },
        { name: "description", label: "Project Description", type: "textarea", required: true },
      ],
    },
    {
      id: 4,
      name: "Incubation & Startups",
      icon: "RocketLaunch",
      description: "Startup mentorship, funding guidance, and acceleration programs",
      fields: [
        { name: "startupName", label: "Startup/Idea Name", type: "text", required: true },
        { name: "founderNames", label: "Founder Names", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: true },
        { name: "sector", label: "Sector/Industry", type: "text", required: true },
        { name: "stage", label: "Current Stage", type: "select", options: ["Idea", "MVP", "Early Traction", "Pre-Series A", "Series A Ready"], required: true },
        { name: "fundingNeeded", label: "Funding Needed (in INR)", type: "text", required: false },
        { name: "description", label: "Brief Description of Idea/Problem", type: "textarea", required: true },
      ],
    },
  ],
  // FAQs
  faqs: [
    {
      id: 1,
      category: "EdTech",
      question: "How long does it take to set up a STEM lab?",
      answer: "A typical STEM lab setup takes 4-6 weeks from requirement assessment to complete operational readiness. This includes design, equipment installation, faculty training, and student onboarding.",
    },
    {
      id: 2,
      category: "IT Resourcing",
      question: "What is the typical onboarding timeline for developers?",
      answer: "We can deploy experienced developers within 1-2 weeks. Our streamlined hiring process ensures quality talent with minimal administrative overhead. A typical team can be fully operational within 3-4 weeks.",
    },
    {
      id: 3,
      category: "R&D",
      question: "How much does R&D project support cost?",
      answer: "Costs vary based on project scope, duration, and complexity. We provide customized quotes after detailed requirement analysis. Typical projects range from 5 lakhs to 50+ lakhs depending on scope.",
    },
    {
      id: 4,
      category: "Incubation",
      question: "What is the typical duration of incubation?",
      answer: "Our standard program is 12-18 months with flexibility based on startup progress. Most startups achieve product-market fit and initial traction within the first 6-9 months.",
    },
    {
      id: 5,
      category: "General",
      question: "Do you provide customized solutions?",
      answer: "Yes, all our services are highly customized. We work closely with clients to understand their specific needs and develop tailored solutions that align with their goals and constraints.",
    },
    {
      id: 6,
      category: "General",
      question: "What support is provided after implementation?",
      answer: "Post-implementation support includes technical assistance, regular updates, training, performance monitoring, and continuous optimization. Support packages are customized based on client needs.",
    },
  ],
  // General enquiry form state
  generalEnquiry: {
    formData: {
      vertical: '', // EdTech, IT Resourcing, R&D, Incubation
      fullName: '',
      email: '',
      phone: '',
      organizationName: '',
      message: '',
      preferredContact: 'email', // email or phone
    },
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    submissionError: null,
    submissionMessage: null,
  },
  // Contact information
  contactInfo: {
    headoffice: {
      address: "SNP Innovation Pvt. Ltd., Mumbai, India",
      phone: "+91-XXX-XXXX-XXXX",
      email: "info@snpinnovation.com",
    },
    offices: [
      { city: "Mumbai", address: "Bandra, Mumbai", phone: "+91-XXXX-XXXX", email: "mumbai@snpinnovation.com" },
      { city: "Delhi", address: "Delhi", phone: "+91-XXXX-XXXX", email: "delhi@snpinnovation.com" },
      { city: "Bangalore", address: "Bangalore", phone: "+91-XXXX-XXXX", email: "bangalore@snpinnovation.com" },
      { city: "Pune", address: "Pune", phone: "+91-XXXX-XXXX", email: "pune@snpinnovation.com" },
    ],
    businessHours: "Monday - Friday: 9:00 AM - 6:00 PM IST",
    socialLinks: {
      linkedin: "https://linkedin.com/company/snp-innovation",
      twitter: "https://twitter.com/snpinnovation",
      facebook: "https://facebook.com/snpinnovation",
      instagram: "https://instagram.com/snpinnovation",
      youtube: "https://youtube.com/@snpinnovation",
    },
  },
  // Loading and error states
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    // Reset general enquiry form
    resetGeneralEnquiryForm: (state) => {
      state.generalEnquiry.formData = initialState.generalEnquiry.formData;
      state.generalEnquiry.submissionStatus = 'idle';
      state.generalEnquiry.submissionError = null;
      state.generalEnquiry.submissionMessage = null;
    },
    // Update general enquiry form field
    updateGeneralEnquiryField: (state, action) => {
      const { field, value } = action.payload;
      state.generalEnquiry.formData[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch enquiry data
      .addCase(fetchEnquiryData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEnquiryData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchEnquiryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Submit general enquiry
      .addCase(submitGeneralEnquiry.pending, (state) => {
        state.generalEnquiry.submissionStatus = 'loading';
      })
      .addCase(submitGeneralEnquiry.fulfilled, (state, action) => {
        state.generalEnquiry.submissionStatus = 'succeeded';
        state.generalEnquiry.submissionMessage = action.payload.message || 'Enquiry received! We will contact you soon.';
        state.generalEnquiry.formData = initialState.generalEnquiry.formData;
      })
      .addCase(submitGeneralEnquiry.rejected, (state, action) => {
        state.generalEnquiry.submissionStatus = 'failed';
        state.generalEnquiry.submissionError = action.payload;
      });
  },
});

export const { resetGeneralEnquiryForm, updateGeneralEnquiryField } = enquirySlice.actions;
export default enquirySlice.reducer;
