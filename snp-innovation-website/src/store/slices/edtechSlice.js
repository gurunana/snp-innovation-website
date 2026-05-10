/* ========================================
   EDTECH SLICE - Manages edtech page data
   Contains: lab info, kit categories, methodology, lab setup process, packages
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { submitForm } from '../../utils/api';

// Async thunk to fetch edtech data from backend
export const fetchEdtechData = createAsyncThunk(
  'edtech/fetchEdtechData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/edtech');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch edtech data');
    }
  }
);

// Async thunk for STEM lab enquiry form submission
// Sends data to dhokeayush0@gmail.com via Web3Forms (free, no server needed)
export const submitEdtechEnquiry = createAsyncThunk(
  'edtech/submitEnquiry',
  async (enquiryData, { rejectWithValue }) => {
    try {
      const result = await submitForm('STEM Lab Enquiry', enquiryData);
      return result;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to submit enquiry');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Lab overview
  labOverview: {
    title: "EdTech & STEM Innovation Labs",
    description: "World-class plug-and-play lab infrastructure for schools and colleges. Empowering students with hands-on learning in AI, Robotics, IoT, Electronics, and Automation.",
  },
  // Lab features
  features: [
    "Fully equipped workstations with latest hardware",
    "Curriculum-aligned project-based learning modules",
    "Expert faculty training and continuous support",
    "Industry partnerships for real-world projects",
    "Regular skill assessment and certification",
    "Student competition and hackathon opportunities",
  ],
  // Kit categories/offerings
  kitCategories: [
    {
      id: 1,
      name: "AI & Machine Learning Kit",
      description: "Beginner to advanced AI/ML projects with Python, TensorFlow, and real datasets.",
      features: ["Python IDE", "ML libraries", "Dataset access", "Project modules"],
      targetAudience: "Class 8-12 & College",
    },
    {
      id: 2,
      name: "Robotics & Automation Kit",
      description: "Build autonomous robots, drones, and automated systems with ROS, Arduino, and Raspberry Pi.",
      features: ["Robot platforms", "Sensors & actuators", "Programming interface", "Lab manual"],
      targetAudience: "Class 10-12 & College",
    },
    {
      id: 3,
      name: "IoT & Smart Systems Kit",
      description: "Develop connected smart devices, home automation, and industrial IoT solutions.",
      features: ["Microcontrollers", "Wireless modules", "Cloud integration", "Mobile app dev"],
      targetAudience: "Class 9-12 & College",
    },
    {
      id: 4,
      name: "Electronics & Hardware Kit",
      description: "Hands-on learning with circuit design, embedded systems, and hardware prototyping.",
      features: ["PCB design tools", "Soldering station", "Test equipment", "Components library"],
      targetAudience: "Class 8-12 & College",
    },
    {
      id: 5,
      name: "Game Development Kit",
      description: "Create 2D/3D games, interactive simulations, and digital storytelling projects.",
      features: ["Game engines", "3D modeling tools", "Asset libraries", "Publishing guide"],
      targetAudience: "Class 9-12 & College",
    },
  ],
  // Learning methodology
  methodology: [
    {
      id: 1,
      phase: "Orientation",
      description: "Students understand core concepts through interactive learning modules and expert guidance.",
    },
    {
      id: 2,
      phase: "Hands-On Experimentation",
      description: "Build and test prototypes using provided kits and hardware in a supervised lab environment.",
    },
    {
      id: 3,
      phase: "Project Development",
      description: "Design and execute real-world projects aligned with curriculum and industry needs.",
    },
    {
      id: 4,
      phase: "Presentation & Evaluation",
      description: "Present projects to peers, faculty, and industry experts; receive feedback and certification.",
    },
    {
      id: 5,
      phase: "Skill Certification",
      description: "Earn recognized certifications demonstrating proficiency in STEM domains.",
    },
  ],
  // Lab setup process/timeline
  setupProcess: [
    {
      id: 1,
      step: "Requirement Assessment",
      duration: "1-2 weeks",
      description: "Analyze institution's needs, space, and curriculum alignment.",
    },
    {
      id: 2,
      step: "Design & Planning",
      duration: "1-2 weeks",
      description: "Create lab layout, equipment list, and setup plan customized for your needs.",
    },
    {
      id: 3,
      step: "Equipment Procurement & Installation",
      duration: "2-3 weeks",
      description: "Deliver, install, and configure all equipment and software.",
    },
    {
      id: 4,
      step: "Faculty Training",
      duration: "1-2 weeks",
      description: "Comprehensive training for teachers on equipment, curriculum, and pedagogy.",
    },
    {
      id: 5,
      step: "Student Onboarding",
      duration: "1 week",
      description: "Orientation for students, safety briefing, and first hands-on session.",
    },
    {
      id: 6,
      step: "Support & Optimization",
      duration: "Ongoing",
      description: "Continuous technical support, updates, and curriculum enhancements.",
    },
  ],
  // Package options
  packages: [
    {
      id: 1,
      name: "Starter Lab",
      price: "₹8-12 Lakhs",
      description: "Perfect for schools beginning their STEM journey",
      includes: [
        "1 kit category (choice of AI, Robotics, or IoT)",
        "10 workstations",
        "Faculty training for 5 teachers",
        "6 months support",
        "Basic curriculum modules",
      ],
      setupTime: "4-6 weeks",
    },
    {
      id: 2,
      name: "Standard Lab",
      price: "₹18-25 Lakhs",
      description: "Comprehensive lab with multiple technology domains",
      includes: [
        "2-3 kit categories",
        "20 workstations",
        "Faculty training for 10 teachers",
        "12 months support",
        "Complete curriculum modules",
        "Monthly webinars & updates",
      ],
      setupTime: "6-8 weeks",
    },
    {
      id: 3,
      name: "Premium Lab",
      price: "₹35-50 Lakhs",
      description: "Full-featured innovation hub with all domains",
      includes: [
        "All 5 kit categories",
        "30+ workstations",
        "Faculty training for 15 teachers",
        "24-month support with on-site visits",
        "Advanced curriculum + custom projects",
        "Industry partnerships & internships",
        "Annual hackathon sponsorship",
      ],
      setupTime: "8-10 weeks",
    },
  ],
  // Form submission state
  enquiry: {
    formData: {
      institutionName: '',
      contactPersonName: '',
      contactEmail: '',
      contactPhone: '',
      state: '',
      city: '',
      labType: '',
      studentCount: '',
      message: '',
    },
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    submissionError: null,
    submissionMessage: null,
  },
  // Loading and error states
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const edtechSlice = createSlice({
  name: 'edtech',
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
      // Fetch edtech data
      .addCase(fetchEdtechData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEdtechData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchEdtechData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Submit enquiry
      .addCase(submitEdtechEnquiry.pending, (state) => {
        state.enquiry.submissionStatus = 'loading';
      })
      .addCase(submitEdtechEnquiry.fulfilled, (state, action) => {
        state.enquiry.submissionStatus = 'succeeded';
        state.enquiry.submissionMessage = action.payload.message || 'Enquiry submitted successfully!';
        state.enquiry.formData = initialState.enquiry.formData;
      })
      .addCase(submitEdtechEnquiry.rejected, (state, action) => {
        state.enquiry.submissionStatus = 'failed';
        state.enquiry.submissionError = action.payload;
      });
  },
});

export const { resetEnquiryForm, updateEnquiryField } = edtechSlice.actions;
export default edtechSlice.reducer;
