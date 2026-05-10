/* ========================================
   R&D SLICE - Manages R&D page data
   Contains: services, lifecycle, IP support, sectors
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk to fetch R&D data from backend
export const fetchRdData = createAsyncThunk(
  'rd/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/rd');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch R&D data');
    }
  }
);

// Async thunk for project enquiry submission
export const submitRdEnquiry = createAsyncThunk(
  'rd/submitEnquiry',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/rd/enquiry', enquiryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit enquiry');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Service offerings
  services: [
    {
      id: 1,
      title: "Hardware Design & Development",
      description: "From concept to manufacturing-ready PCB design, embedded systems, and IoT hardware solutions.",
      icon: "Cpu",
      capabilities: [
        "Schematic design & simulation",
        "PCB layout & manufacturing",
        "Embedded systems development",
        "IoT device prototyping",
        "Testing & validation",
      ],
    },
    {
      id: 2,
      title: "Software Development & Integration",
      description: "Custom software solutions, firmware development, and system integration for research projects.",
      icon: "Code",
      capabilities: [
        "Firmware development",
        "Software architecture design",
        "API integrations",
        "Real-time systems",
        "Performance optimization",
      ],
    },
    {
      id: 3,
      title: "Research & Innovation Consulting",
      description: "Strategic guidance on technology trends, feasibility studies, and research direction.",
      icon: "Brain",
      capabilities: [
        "Technology assessment",
        "Market analysis",
        "Feasibility studies",
        "Innovation workshops",
        "Trend analysis",
      ],
    },
    {
      id: 4,
      title: "Automation & Robotics Solutions",
      description: "Design and deployment of automated systems, industrial robotics, and autonomous solutions.",
      icon: "Zap",
      capabilities: [
        "ROS development",
        "Control system design",
        "Industrial automation",
        "Autonomous systems",
        "System integration",
      ],
    },
    {
      id: 5,
      title: "IP Filing & Patent Support",
      description: "End-to-end intellectual property protection including patent filing, documentation, and prosecution.",
      icon: "Shield",
      capabilities: [
        "Prior art search",
        "Patent drafting",
        "Filing & prosecution",
        "International IP strategy",
        "Technology documentation",
      ],
    },
  ],
  // R&D project lifecycle
  projectLifecycle: [
    {
      id: 1,
      stage: "Ideation & Feasibility",
      duration: "2-4 weeks",
      activities: [
        "Idea validation workshop",
        "Market & technology research",
        "Technical feasibility study",
        "Resource requirement analysis",
        "Preliminary budget estimation",
      ],
    },
    {
      id: 2,
      stage: "Concept Design & Prototyping",
      duration: "6-12 weeks",
      activities: [
        "Technical design & planning",
        "Hardware & software prototyping",
        "Iterative testing & refinement",
        "Performance validation",
        "Design documentation",
      ],
    },
    {
      id: 3,
      stage: "Development & Testing",
      duration: "8-16 weeks",
      activities: [
        "Full-scale development",
        "Comprehensive testing & QA",
        "Performance optimization",
        "Security & safety validation",
        "Regulatory compliance review",
      ],
    },
    {
      id: 4,
      stage: "IP & Documentation",
      duration: "4-8 weeks",
      activities: [
        "Patent research & drafting",
        "Technical documentation",
        "Process documentation",
        "IP filing support",
        "Certification preparation",
      ],
    },
    {
      id: 5,
      stage: "Commercialization Support",
      duration: "Ongoing",
      activities: [
        "Manufacturing partnership",
        "Quality assurance protocols",
        "Market launch support",
        "Licensing assistance",
        "Continuous improvement",
      ],
    },
  ],
  // IP & Patent support details
  ipSupport: {
    title: "Intellectual Property Management",
    description: "Comprehensive IP protection and management services to safeguard your innovations.",
    services: [
      {
        id: 1,
        title: "Patent Consultation & Filing",
        description: "Expert guidance on patentability, prior art searches, and strategic IP filing across multiple jurisdictions.",
      },
      {
        id: 2,
        title: "Trade Secret Protection",
        description: "Strategies and documentation to protect proprietary processes, algorithms, and confidential information.",
      },
      {
        id: 3,
        title: "Design Protection",
        description: "Design patent filing for unique product designs and industrial designs.",
      },
      {
        id: 4,
        title: "Technology Licensing",
        description: "Support in licensing technologies, negotiating agreements, and monetizing IP.",
      },
      {
        id: 5,
        title: "IP Portfolio Management",
        description: "Strategic portfolio planning, maintenance, and optimization across jurisdictions.",
      },
    ],
  },
  // Industry sectors/domains
  sectors: [
    {
      id: 1,
      name: "AgriTech",
      description: "Precision agriculture, IoT sensors, farm automation, and data analytics for sustainable farming.",
      successStories: "5+ projects",
    },
    {
      id: 2,
      name: "HealthTech",
      description: "Medical devices, diagnostic systems, wearables, and health monitoring solutions.",
      successStories: "8+ projects",
    },
    {
      id: 3,
      name: "Clean Energy",
      description: "Solar systems, energy storage, IoT monitoring, and grid integration technologies.",
      successStories: "6+ projects",
    },
    {
      id: 4,
      name: "Smart Manufacturing",
      description: "Industry 4.0 solutions, automation, predictive maintenance, and IoT systems.",
      successStories: "10+ projects",
    },
    {
      id: 5,
      name: "Environmental Tech",
      description: "Water purification, waste management, environmental monitoring, and sustainability solutions.",
      successStories: "7+ projects",
    },
    {
      id: 6,
      name: "EdTech Solutions",
      description: "Learning platforms, interactive systems, assessment tools, and educational innovations.",
      successStories: "9+ projects",
    },
  ],
  // Success stories/case studies
  caseStudies: [
    {
      id: 1,
      title: "IoT-Based Crop Monitoring System",
      sector: "AgriTech",
      challenge: "Small farmers lacked real-time crop health monitoring",
      solution: "Developed low-cost IoT sensors and mobile app for crop monitoring and pest detection",
      outcome: "30% increase in yield, farmer adoption in 50+ villages",
    },
    {
      id: 2,
      title: "Portable Water Quality Analyzer",
      sector: "Environmental Tech",
      challenge: "Need for affordable, portable water testing in remote areas",
      solution: "Engineered compact IoT device with cloud-based data analysis",
      outcome: "Patent filed, pilot deployed across 10 districts",
    },
    {
      id: 3,
      title: "AI-Powered Defect Detection System",
      sector: "Smart Manufacturing",
      challenge: "Manual quality inspection was slow and error-prone",
      solution: "Developed AI vision system for real-time defect detection on production line",
      outcome: "98% accuracy, 40% reduction in quality control time",
    },
  ],
  // Enquiry form state
  enquiry: {
    formData: {
      projectTitle: '',
      organizationName: '',
      contactPersonName: '',
      contactEmail: '',
      contactPhone: '',
      sector: '',
      serviceType: '',
      timeline: '',
      budget: '',
      description: '',
    },
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    submissionError: null,
    submissionMessage: null,
  },
  // Loading and error states
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const rdSlice = createSlice({
  name: 'rd',
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
  },
  extraReducers: (builder) => {
    builder
      // Fetch R&D data
      .addCase(fetchRdData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRdData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchRdData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Submit enquiry
      .addCase(submitRdEnquiry.pending, (state) => {
        state.enquiry.submissionStatus = 'loading';
      })
      .addCase(submitRdEnquiry.fulfilled, (state, action) => {
        state.enquiry.submissionStatus = 'succeeded';
        state.enquiry.submissionMessage = action.payload.message || 'Enquiry submitted successfully!';
        state.enquiry.formData = initialState.enquiry.formData;
      })
      .addCase(submitRdEnquiry.rejected, (state, action) => {
        state.enquiry.submissionStatus = 'failed';
        state.enquiry.submissionError = action.payload;
      });
  },
});

export const { resetEnquiryForm, updateEnquiryField } = rdSlice.actions;
export default rdSlice.reducer;
