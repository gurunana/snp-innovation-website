/* ========================================
   INCUBATION SLICE - Manages incubation page data
   Contains: support pillars, journey phases, success stories, application form
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk to fetch incubation data from backend
export const fetchIncubationData = createAsyncThunk(
  'incubation/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/incubation');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch incubation data');
    }
  }
);

// Async thunk for startup application submission
export const submitStartupApplication = createAsyncThunk(
  'incubation/submitApplication',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/incubation/apply', applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit application');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Incubation program overview
  overview: {
    title: "SNP Incubation & Startup Support",
    tagline: "From Idea to Impact — End-to-End Startup Support",
    description: "We provide comprehensive support to transform your startup from ideation to market leadership through mentorship, resources, funding connections, and strategic guidance.",
  },
  // Core support pillars
  supportPillars: [
    {
      id: 1,
      title: "Idea Validation & Concept Development",
      description: "Validate your startup idea, refine business model, and develop proof-of-concept.",
      icon: "Lightbulb",
      activities: [
        "Market research & validation",
        "Business model canvas development",
        "Prototype/MVP creation",
        "Pitch deck preparation",
        "Competitive analysis",
      ],
    },
    {
      id: 2,
      title: "Mentorship & Guidance",
      description: "Access to seasoned entrepreneurs, industry experts, and successful founders for strategic guidance.",
      icon: "Users",
      activities: [
        "One-on-one mentorship sessions",
        "Business strategy workshops",
        "Technical architecture guidance",
        "Market entry planning",
        "Leadership development",
      ],
    },
    {
      id: 3,
      title: "Technology & Infrastructure",
      description: "State-of-the-art development facilities, cloud credits, and software licenses.",
      icon: "Zap",
      activities: [
        "Access to hardware & equipment",
        "Cloud computing credits",
        "Development software licenses",
        "Lab facilities",
        "API integrations",
      ],
    },
    {
      id: 4,
      title: "Funding & Finance",
      description: "Direct connections to investors, demo days, and guidance on fundraising strategies.",
      icon: "DollarSign",
      activities: [
        "Investor introductions",
        "Demo day opportunities",
        "Grant application support",
        "Fundraising coaching",
        "Financial planning",
      ],
    },
    {
      id: 5,
      title: "Legal & Compliance",
      description: "Support with incorporation, IP protection, regulatory compliance, and legal documentation.",
      icon: "Shield",
      activities: [
        "Company incorporation",
        "IP filing & patents",
        "Contract review",
        "Compliance guidance",
        "Data security setup",
      ],
    },
    {
      id: 6,
      title: "Marketing & Growth",
      description: "Go-to-market strategy, branding, customer acquisition, and network expansion.",
      icon: "TrendingUp",
      activities: [
        "Marketing strategy development",
        "Brand positioning",
        "Customer acquisition planning",
        "PR & media connections",
        "Network expansion",
      ],
    },
  ],
  // Incubation journey phases
  journeyPhases: [
    {
      id: 1,
      phase: "Pre-Incubation (4-6 weeks)",
      description: "Idea validation, feasibility study, MVP development, and readiness assessment.",
      milestones: [
        "Market validation completed",
        "MVP/Prototype developed",
        "Business model finalized",
        "Founding team confirmed",
        "Ready to launch",
      ],
    },
    {
      id: 2,
      phase: "Incubation (6-12 months)",
      description: "Core incubation phase with intensive mentorship, product development, and initial traction.",
      milestones: [
        "Product market fit achieved",
        "First 100 customers acquired",
        "Revenue generation started",
        "Team expansion completed",
        "Funding round preparation",
      ],
    },
    {
      id: 3,
      phase: "Growth (12-24 months)",
      description: "Scaling operations, market expansion, fundraising, and team building.",
      milestones: [
        "Series A preparation",
        "Market expansion initiated",
        "Team strength: 5-20 members",
        "Revenue targets achieved",
        "Strategic partnerships formed",
      ],
    },
    {
      id: 4,
      phase: "Exit & Beyond",
      description: "Transition to independent operation, Series B fundraising, or strategic acquisitions.",
      milestones: [
        "Series A/B funding closed",
        "Market leadership position",
        "Sustainable business model",
        "Exit or scaling trajectory",
        "Alumni network engagement",
      ],
    },
  ],
  // Success stories
  successStories: [
    {
      id: 1,
      name: "EduBot Solutions",
      elevator: "AI-powered educational chatbot for personalized learning",
      founder: "Sneha Patil",
      currentStage: "Series A - Raised $2M",
      impact: "Serving 50,000+ students across 100 schools; 40% improved learning outcomes",
      timeline: "Joined incubation 2020, Series A 2023",
      learnings: "Customer feedback validation was critical to product-market fit",
    },
    {
      id: 2,
      name: "GreenTech Solutions",
      elevator: "IoT-based energy monitoring for manufacturing units",
      founder: "Amit Deshmukh",
      currentStage: "Series B - Raised $8M",
      impact: "Helping 200+ industries save 25-30% energy costs; $50M annual savings across clients",
      timeline: "Joined incubation 2019, Series A 2022, Series B 2024",
      learnings: "B2B sales require longer cycles but offer stable revenue",
    },
    {
      id: 3,
      name: "SafeWater Technologies",
      elevator: "Affordable water purification devices for rural areas",
      founder: "Priya Rao",
      currentStage: "Acquired by leading water utility company",
      impact: "Over 100,000 families with access to clean water; Government partnership",
      timeline: "Joined incubation 2021, Acquisition 2024",
      learnings: "Social impact attracts investors and strategic partnerships",
    },
    {
      id: 4,
      name: "AgriSense IoT",
      elevator: "Precision agriculture platform with ML-based crop optimization",
      founder: "Vikram Singh",
      currentStage: "Series A - Raised $5M",
      impact: "Working with 5,000+ farmers; 35% yield increase average",
      timeline: "Joined incubation 2020, Series A 2024",
      learnings: "Sustainability in agriculture is a mega market opportunity",
    },
  ],
  // Program benefits
  benefits: [
    "Fully equipped co-working space with high-speed internet",
    "Up to INR 10 lakhs seed funding for pre-incubation",
    "Equity-free grants for development and market research",
    "Direct access to investor networks and VCs",
    "Mentorship from industry stalwarts and successful founders",
    "Subsidized legal, accounting, and IP consultation services",
    "Marketing and PR support for brand building",
    "Access to SNP Innovation's network across 200+ organizations",
    "Demo day opportunities to pitch to investors",
    "Networking events, masterclasses, and skill development workshops",
  ],
  // Eligibility criteria
  eligibility: [
    "Innovative business idea with potential for scalability",
    "Founding team with complementary skills and commitment",
    "Indian startup or willing to incorporate in India",
    "Innovation focus in any sector (tech, deep tech, agritech, edtech, etc.)",
    "No prior external funding (pre-seed stage ideal)",
    "Committed to 6-12 month intensive incubation program",
  ],
  // Application form state
  application: {
    formData: {
      startupName: '',
      founderNames: '',
      founderEmails: '',
      founderPhones: '',
      sector: '',
      problemStatement: '',
      solutionDescription: '',
      targetMarket: '',
      fundingRequired: '',
      businessModel: '',
      teamSize: '',
      applicationMessage: '',
    },
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    submissionError: null,
    submissionMessage: null,
  },
  // Loading and error states
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const incubationSlice = createSlice({
  name: 'incubation',
  initialState,
  reducers: {
    // Reset application form
    resetApplicationForm: (state) => {
      state.application.formData = initialState.application.formData;
      state.application.submissionStatus = 'idle';
      state.application.submissionError = null;
      state.application.submissionMessage = null;
    },
    // Update application form field
    updateApplicationField: (state, action) => {
      const { field, value } = action.payload;
      state.application.formData[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch incubation data
      .addCase(fetchIncubationData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIncubationData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchIncubationData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Submit application
      .addCase(submitStartupApplication.pending, (state) => {
        state.application.submissionStatus = 'loading';
      })
      .addCase(submitStartupApplication.fulfilled, (state, action) => {
        state.application.submissionStatus = 'succeeded';
        state.application.submissionMessage = action.payload.message || 'Application submitted successfully! We will review your application and contact you soon.';
        state.application.formData = initialState.application.formData;
      })
      .addCase(submitStartupApplication.rejected, (state, action) => {
        state.application.submissionStatus = 'failed';
        state.application.submissionError = action.payload;
      });
  },
});

export const { resetApplicationForm, updateApplicationField } = incubationSlice.actions;
export default incubationSlice.reducer;
