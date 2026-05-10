/* ========================================
   CAREERS SLICE - Manages careers page data
   Contains: job openings, internship programs, application forms
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk to fetch careers data from backend
export const fetchCareersData = createAsyncThunk(
  'careers/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/careers');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch careers data');
    }
  }
);

// Async thunk for job application
export const submitJobApplication = createAsyncThunk(
  'careers/submitApplication',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/careers/apply', applicationData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit application');
    }
  }
);

// Async thunk for internship registration
export const registerForInternship = createAsyncThunk(
  'careers/registerInternship',
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/careers/internship-register', registrationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to register for internship');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Company culture overview
  culture: {
    headline: "Join a Team of Innovators",
    description: "At SNP Innovation, we believe in empowering talented individuals to create breakthrough solutions. We foster a culture of continuous learning, experimentation, and impact.",
    values: [
      "Innovation First - We push boundaries",
      "Ownership - Full responsibility for your work",
      "Collaboration - Great problems require great teams",
      "Excellence - Highest quality in everything",
      "Impact - Creating real-world positive change",
    ],
  },
  // Open job positions
  jobOpenings: [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      department: "Product Engineering",
      location: "Mumbai, India",
      type: "Full-Time",
      experience: "5-8 years",
      salary: "₹12-18 LPA",
      description: "We are looking for an experienced full-stack developer to lead our product development efforts.",
      responsibilities: [
        "Design and develop scalable web applications",
        "Lead technical discussions and architecture decisions",
        "Mentor junior developers",
        "Collaborate with product and design teams",
      ],
      requirements: [
        "5-8 years of professional development experience",
        "Expert in React.js, Node.js, and modern JavaScript",
        "Experience with cloud platforms (AWS/Azure)",
        "Strong problem-solving and communication skills",
      ],
      nice_to_have: [
        "Experience with machine learning or AI",
        "Contributions to open-source projects",
        "Experience with DevOps tools (Docker, Kubernetes)",
      ],
      benefits: [
        "Competitive salary and stock options",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "Paid time off",
      ],
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      department: "AI Research",
      location: "Bangalore, India",
      type: "Full-Time",
      experience: "3-6 years",
      salary: "₹10-16 LPA",
      description: "Build and deploy machine learning models that power our innovative products.",
      responsibilities: [
        "Develop ML models and algorithms",
        "Build data pipelines and preprocessing systems",
        "Optimize models for performance and scalability",
        "Collaborate with product teams on model deployment",
      ],
      requirements: [
        "3-6 years of ML/AI development experience",
        "Strong Python and deep learning frameworks (TensorFlow/PyTorch)",
        "Experience with data engineering and big data tools",
        "Understanding of ML best practices and deployment",
      ],
      nice_to_have: [
        "NLP or computer vision experience",
        "Published research papers",
        "Experience with cloud ML services",
      ],
      benefits: [
        "Competitive salary and stock options",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "GPU workstation for research",
      ],
    },
    {
      id: 3,
      title: "Robotics Engineer",
      department: "Hardware Engineering",
      location: "Delhi, India",
      type: "Full-Time",
      experience: "3-5 years",
      salary: "₹8-14 LPA",
      description: "Design and develop cutting-edge robotics solutions for education and industry.",
      responsibilities: [
        "Design and develop robotics systems",
        "Hardware selection and integration",
        "Firmware and embedded systems development",
        "Testing and optimization of robotic systems",
      ],
      requirements: [
        "3-5 years in robotics or embedded systems",
        "Proficiency in C/C++ and Python",
        "Experience with ROS and Linux",
        "Understanding of mechanical design and CAD",
      ],
      nice_to_have: [
        "Experience with Arduino and Raspberry Pi",
        "Published research in robotics",
        "Experience with real-time systems",
      ],
      benefits: [
        "Competitive salary and stock options",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Access to advanced robotics lab",
        "Professional development budget",
      ],
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-Time",
      experience: "4-7 years",
      salary: "₹11-17 LPA",
      description: "Drive product strategy and development for one of our core platforms.",
      responsibilities: [
        "Own product vision, strategy, and roadmap",
        "Conduct user research and market analysis",
        "Lead cross-functional teams",
        "Define and measure product success metrics",
      ],
      requirements: [
        "4-7 years of product management experience",
        "Strong understanding of B2B SaaS or EdTech",
        "Excellent communication and analytical skills",
        "Experience with product analytics tools",
      ],
      nice_to_have: [
        "Technical background or understanding",
        "Experience scaling B2B products",
        "MBA or relevant degree",
      ],
      benefits: [
        "Competitive salary and stock options",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "Learning and development allowance",
      ],
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Bangalore, India",
      type: "Full-Time",
      experience: "3-5 years",
      salary: "₹9-15 LPA",
      description: "Build and maintain robust infrastructure to support our growing platform.",
      responsibilities: [
        "Design and implement CI/CD pipelines",
        "Manage cloud infrastructure (AWS/Azure)",
        "Ensure system reliability and performance",
        "Implement monitoring and logging solutions",
      ],
      requirements: [
        "3-5 years of DevOps experience",
        "Expert in Docker and Kubernetes",
        "AWS or Azure cloud platform experience",
        "Strong scripting skills (Python, Bash)",
      ],
      nice_to_have: [
        "Experience with Terraform or Infrastructure as Code",
        "Security and compliance knowledge",
        "Experience with monitoring tools (Prometheus, Grafana)",
      ],
      benefits: [
        "Competitive salary and stock options",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Professional development budget",
        "On-call compensation",
      ],
    },
  ],
  // Internship programs
  internshipPrograms: [
    {
      id: 1,
      title: "Summer Internship - Engineering",
      duration: "10-12 weeks",
      startDate: "May 2025",
      locations: ["Mumbai", "Delhi", "Bangalore"],
      stipend: "₹15,000 - ₹25,000/month",
      description: "Gain hands-on experience working on real projects alongside our engineering teams.",
      requirements: [
        "Final year or recent grad (B.Tech/B.Sc in CS/IT/Electronics)",
        "Strong programming fundamentals",
        "Passion for learning and innovation",
      ],
      benefits: [
        "Hands-on project experience",
        "Mentorship from industry experts",
        "Certificate of completion",
        "Potential full-time offer",
        "Networking opportunities",
      ],
    },
    {
      id: 2,
      title: "Product & Design Internship",
      duration: "10-12 weeks",
      startDate: "May 2025",
      locations: ["Mumbai"],
      stipend: "₹12,000 - ₹20,000/month",
      description: "Work on user research, product design, and UX improvements for our platforms.",
      requirements: [
        "Final year student in Design, Product, or related field",
        "Portfolio showcasing design work or product thinking",
        "Strong communication skills",
      ],
      benefits: [
        "Real product experience",
        "Design portfolio building",
        "Industry mentorship",
        "Certificate and recommendations",
        "Potential full-time offer",
      ],
    },
    {
      id: 3,
      title: "AI/ML Internship",
      duration: "12-16 weeks",
      startDate: "May 2025",
      locations: ["Bangalore"],
      stipend: "₹20,000 - ₹30,000/month",
      description: "Contribute to cutting-edge AI and machine learning projects impacting education and industry.",
      requirements: [
        "Final year student in ML/AI/Data Science",
        "Strong Python programming skills",
        "Experience with ML frameworks (TensorFlow/PyTorch)",
      ],
      benefits: [
        "Research opportunity",
        "Potential conference papers",
        "Industry mentorship",
        "GPU workstation access",
        "Potential full-time offer",
      ],
    },
  ],
  // Application form state
  jobApplication: {
    formData: {
      jobId: '',
      fullName: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
      linkedinProfile: '',
      expectations: '',
    },
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    submissionError: null,
    submissionMessage: null,
  },
  // Internship registration form state
  internshipRegistration: {
    formData: {
      internshipId: '',
      fullName: '',
      email: '',
      phone: '',
      college: '',
      degree: '',
      cgpa: '',
      graduationYear: '',
      skills: '',
      expectations: '',
    },
    submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    submissionError: null,
    submissionMessage: null,
  },
  // Loading and error states
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const careersSlice = createSlice({
  name: 'careers',
  initialState,
  reducers: {
    // Reset job application form
    resetJobApplicationForm: (state) => {
      state.jobApplication.formData = initialState.jobApplication.formData;
      state.jobApplication.submissionStatus = 'idle';
      state.jobApplication.submissionError = null;
      state.jobApplication.submissionMessage = null;
    },
    // Update job application form field
    updateJobApplicationField: (state, action) => {
      const { field, value } = action.payload;
      state.jobApplication.formData[field] = value;
    },
    // Reset internship registration form
    resetInternshipRegistrationForm: (state) => {
      state.internshipRegistration.formData = initialState.internshipRegistration.formData;
      state.internshipRegistration.submissionStatus = 'idle';
      state.internshipRegistration.submissionError = null;
      state.internshipRegistration.submissionMessage = null;
    },
    // Update internship registration form field
    updateInternshipRegistrationField: (state, action) => {
      const { field, value } = action.payload;
      state.internshipRegistration.formData[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch careers data
      .addCase(fetchCareersData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCareersData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchCareersData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Submit job application
      .addCase(submitJobApplication.pending, (state) => {
        state.jobApplication.submissionStatus = 'loading';
      })
      .addCase(submitJobApplication.fulfilled, (state, action) => {
        state.jobApplication.submissionStatus = 'succeeded';
        state.jobApplication.submissionMessage = action.payload.message || 'Application submitted successfully! We will review your application soon.';
        state.jobApplication.formData = initialState.jobApplication.formData;
      })
      .addCase(submitJobApplication.rejected, (state, action) => {
        state.jobApplication.submissionStatus = 'failed';
        state.jobApplication.submissionError = action.payload;
      })
      // Register for internship
      .addCase(registerForInternship.pending, (state) => {
        state.internshipRegistration.submissionStatus = 'loading';
      })
      .addCase(registerForInternship.fulfilled, (state, action) => {
        state.internshipRegistration.submissionStatus = 'succeeded';
        state.internshipRegistration.submissionMessage = action.payload.message || 'Registration successful! We will contact you soon.';
        state.internshipRegistration.formData = initialState.internshipRegistration.formData;
      })
      .addCase(registerForInternship.rejected, (state, action) => {
        state.internshipRegistration.submissionStatus = 'failed';
        state.internshipRegistration.submissionError = action.payload;
      });
  },
});

export const {
  resetJobApplicationForm,
  updateJobApplicationField,
  resetInternshipRegistrationForm,
  updateInternshipRegistrationField,
} = careersSlice.actions;
export default careersSlice.reducer;
