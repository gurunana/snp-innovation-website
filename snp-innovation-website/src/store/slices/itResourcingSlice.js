/* ========================================
   IT RESOURCING SLICE - Manages IT services data
   Contains: services, domains, talent pipeline, enquiry/CV uploads
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk to fetch IT resourcing data from backend
export const fetchItResourcingData = createAsyncThunk(
  'itResourcing/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/it-resourcing');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch IT resourcing data');
    }
  }
);

// Async thunk for enquiry submission
export const submitItResourcingEnquiry = createAsyncThunk(
  'itResourcing/submitEnquiry',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/it-resourcing/enquiry', enquiryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit enquiry');
    }
  }
);

// Async thunk for CV upload
export const uploadCV = createAsyncThunk(
  'itResourcing/uploadCV',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/it-resourcing/cv-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to upload CV');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Service offerings
  services: [
    {
      id: 1,
      title: "Dedicated Developer Teams",
      description: "Hire full teams of experienced developers (frontend, backend, DevOps, QA) dedicated to your product.",
      icon: "Users",
      benefits: [
        "Scalable team composition",
        "Agile methodology",
        "Daily standups and transparency",
        "Flexible engagement terms",
      ],
    },
    {
      id: 2,
      title: "Project-Based Development",
      description: "End-to-end software development from concept to deployment with fixed timelines and deliverables.",
      icon: "Briefcase",
      benefits: [
        "Full responsibility ownership",
        "Quality assurance included",
        "On-time delivery",
        "Technology consulting",
      ],
    },
    {
      id: 3,
      title: "Technology Consulting",
      description: "Strategic technology advice, architecture design, and technology stack recommendations.",
      icon: "Brain",
      benefits: [
        "Expert guidance",
        "Cost optimization",
        "Risk mitigation",
        "Future-ready solutions",
      ],
    },
    {
      id: 4,
      title: "QA & Testing Services",
      description: "Comprehensive quality assurance, functional testing, automation, and performance testing.",
      icon: "CheckCircle",
      benefits: [
        "Bug-free delivery",
        "Automation frameworks",
        "Performance optimization",
        "Compliance testing",
      ],
    },
    {
      id: 5,
      title: "DevOps & Infrastructure",
      description: "Cloud infrastructure, CI/CD pipelines, monitoring, and deployment automation.",
      icon: "Zap",
      benefits: [
        "Scalable infrastructure",
        "Zero-downtime deployments",
        "24/7 monitoring",
        "Cost optimization",
      ],
    },
    {
      id: 6,
      title: "Staff Augmentation",
      description: "Skilled individual developers integrated into your existing teams on contract basis.",
      icon: "User",
      benefits: [
        "Quick hiring",
        "Flexible duration",
        "Seamless integration",
        "Expertise filling",
      ],
    },
  ],
  // Technology domains/expertise
  domains: [
    {
      id: 1,
      name: "Web Development",
      technologies: ["React.js", "Vue.js", "Angular", "Next.js", "Node.js", "Python Django", "Laravel"],
      expertise: "Full-stack web applications, SPAs, responsive design, PWAs",
    },
    {
      id: 2,
      name: "Mobile Development",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Native iOS/Android"],
      expertise: "iOS, Android apps, cross-platform solutions, app optimization",
    },
    {
      id: 3,
      name: "Cloud & DevOps",
      technologies: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "GitLab CI/CD"],
      expertise: "Cloud migration, microservices, CI/CD pipelines, infrastructure automation",
    },
    {
      id: 4,
      name: "AI & Machine Learning",
      technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenAI APIs", "LangChain"],
      expertise: "ML models, NLP, computer vision, AI chatbots, data analysis",
    },
    {
      id: 5,
      name: "Data Engineering",
      technologies: ["SQL", "NoSQL", "Spark", "Hadoop", "Kafka", "Data Warehousing"],
      expertise: "Data pipelines, ETL, analytics, big data solutions",
    },
    {
      id: 6,
      name: "Enterprise Solutions",
      technologies: ["Java", "Spring Boot", "SAP", "Oracle", "Salesforce", "Microsoft Dynamics"],
      expertise: "Enterprise apps, ERP/CRM systems, API integrations, legacy modernization",
    },
  ],
  // Talent pipeline overview
  talentPipeline: {
    totalTalentAvailable: 1500,
    averageExperience: "5-12 years",
    certifications: [
      "AWS Certified Solutions Architect",
      "Azure Certified Associate",
      "Google Cloud Professional",
      "Kubernetes Certified Developer",
      "Scrum Master",
      "Project Management Professional",
    ],
    highlights: [
      "Vetted through rigorous technical interviews",
      "Industry certifications and continuous learning",
      "Proven track record across Fortune 500 clients",
      "Multilingual and globally distributed teams",
    ],
  },
  // Enquiry form state
  enquiry: {
    formData: {
      companyName: '',
      contactPersonName: '',
      contactEmail: '',
      contactPhone: '',
      serviceType: '',
      requiredSkills: '',
      teamSize: '',
      duration: '',
      budget: '',
      message: '',
    },
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    submissionError: null,
    submissionMessage: null,
  },
  // CV upload state
  cvUpload: {
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      expertise: '',
      resume: null,
    },
    uploadStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    uploadError: null,
    uploadMessage: null,
  },
  // Loading and error states
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const itResourcingSlice = createSlice({
  name: 'itResourcing',
  initialState,
  reducers: {
    // Reset enquiry form
    resetEnquiryForm: (state) => {
      state.enquiry.formData = initialState.enquiry.formData;
      state.enquiry.submissionStatus = 'idle';
      state.enquiry.submissionError = null;
      state.enquiry.submissionMessage = null;
    },
    // Update enquiry form field
    updateEnquiryField: (state, action) => {
      const { field, value } = action.payload;
      state.enquiry.formData[field] = value;
    },
    // Reset CV upload form
    resetCVForm: (state) => {
      state.cvUpload.formData = initialState.cvUpload.formData;
      state.cvUpload.uploadStatus = 'idle';
      state.cvUpload.uploadError = null;
      state.cvUpload.uploadMessage = null;
    },
    // Update CV form field
    updateCVField: (state, action) => {
      const { field, value } = action.payload;
      state.cvUpload.formData[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch IT resourcing data
      .addCase(fetchItResourcingData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItResourcingData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchItResourcingData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Submit enquiry
      .addCase(submitItResourcingEnquiry.pending, (state) => {
        state.enquiry.submissionStatus = 'loading';
      })
      .addCase(submitItResourcingEnquiry.fulfilled, (state, action) => {
        state.enquiry.submissionStatus = 'succeeded';
        state.enquiry.submissionMessage = action.payload.message || 'Enquiry submitted successfully!';
        state.enquiry.formData = initialState.enquiry.formData;
      })
      .addCase(submitItResourcingEnquiry.rejected, (state, action) => {
        state.enquiry.submissionStatus = 'failed';
        state.enquiry.submissionError = action.payload;
      })
      // Upload CV
      .addCase(uploadCV.pending, (state) => {
        state.cvUpload.uploadStatus = 'loading';
      })
      .addCase(uploadCV.fulfilled, (state, action) => {
        state.cvUpload.uploadStatus = 'succeeded';
        state.cvUpload.uploadMessage = action.payload.message || 'CV uploaded successfully!';
        state.cvUpload.formData = initialState.cvUpload.formData;
      })
      .addCase(uploadCV.rejected, (state, action) => {
        state.cvUpload.uploadStatus = 'failed';
        state.cvUpload.uploadError = action.payload;
      });
  },
});

export const { resetEnquiryForm, updateEnquiryField, resetCVForm, updateCVField } = itResourcingSlice.actions;
export default itResourcingSlice.reducer;
