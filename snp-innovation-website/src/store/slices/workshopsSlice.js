/* ========================================
   WORKSHOPS SLICE - Manages workshops data
   Contains: categories, upcoming/past events, registrations
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk to fetch workshops data from backend
export const fetchWorkshopsData = createAsyncThunk(
  'workshops/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/workshops');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch workshops data');
    }
  }
);

// Async thunk for workshop registration
export const registerForWorkshop = createAsyncThunk(
  'workshops/registerForWorkshop',
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/workshops/register', registrationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to register for workshop');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Workshop categories
  categories: [
    {
      id: 1,
      name: "Technical Workshops",
      description: "Hands-on training in cutting-edge technologies like AI, Robotics, IoT, and Software Development.",
      icon: "Cpu",
    },
    {
      id: 2,
      name: "Entrepreneurship & Startup",
      description: "Business model development, pitching, fundraising, and scaling strategies for startups.",
      icon: "RocketLaunch",
    },
    {
      id: 3,
      name: "Leadership & Skills",
      description: "Soft skills, communication, project management, and leadership development programs.",
      icon: "Users",
    },
    {
      id: 4,
      name: "Innovation & Design Thinking",
      description: "Problem solving, design thinking methodology, and innovation framework training.",
      icon: "Lightbulb",
    },
  ],
  // Upcoming workshops
  upcomingWorkshops: [
    {
      id: 1,
      title: "AI for Beginners: Machine Learning Essentials",
      category: "Technical Workshops",
      description: "Learn fundamental concepts of machine learning, build your first ML model, and explore real-world applications.",
      instructor: "Dr. Ramesh Kumar",
      instructorBio: "AI researcher with 10+ years experience in machine learning and deep learning applications.",
      date: "2025-04-25",
      time: "10:00 AM - 1:00 PM",
      duration: "3 hours",
      location: "SNP Innovation Lab, Delhi",
      mode: "Hybrid (In-person & Online)",
      capacity: 50,
      registered: 32,
      fee: "INR 999 (Students) / INR 2999 (Professionals)",
      learningOutcomes: [
        "Understand core ML concepts and algorithms",
        "Build your first machine learning model",
        "Learn practical applications in industry",
      ],
      curriculum: [
        "Introduction to ML and real-world applications",
        "Supervised vs Unsupervised learning",
        "Building a simple predictive model",
        "Model evaluation and performance metrics",
      ],
    },
    {
      id: 2,
      title: "Robotics Workshop: Build Your First Robot",
      category: "Technical Workshops",
      description: "Hands-on workshop to build and program a robot. Perfect for students interested in robotics and automation.",
      instructor: "Pratik Warjurkar",
      instructorBio: "CTO at SNP Innovation with expertise in robotics, IoT, and hardware integration.",
      date: "2025-05-02",
      time: "2:00 PM - 5:00 PM",
      duration: "3 hours",
      location: "SNP Innovation Lab, Pune",
      mode: "In-Person",
      capacity: 30,
      registered: 18,
      fee: "INR 1499 (Students) / INR 3999 (Professionals)",
      learningOutcomes: [
        "Understand robotics fundamentals",
        "Assemble and test a working robot",
        "Program robot behaviors using ROS",
      ],
      curriculum: [
        "Robotics hardware fundamentals",
        "Motor control and sensors",
        "Introduction to ROS",
        "Hands-on robot assembly and programming",
      ],
    },
    {
      id: 3,
      title: "Pitching Your Startup Idea",
      category: "Entrepreneurship & Startup",
      description: "Learn to craft compelling pitch decks and present your startup idea to investors convincingly.",
      instructor: "Saurabh Tiwari",
      instructorBio: "CEO of SNP Innovation and serial entrepreneur with successful exits.",
      date: "2025-05-10",
      time: "6:00 PM - 8:00 PM",
      duration: "2 hours",
      location: "SNP Innovation HQ, Mumbai",
      mode: "Hybrid (In-person & Online)",
      capacity: 100,
      registered: 67,
      fee: "FREE",
      learningOutcomes: [
        "Create a compelling pitch deck",
        "Master investor communication",
        "Overcome common pitching mistakes",
      ],
      curriculum: [
        "Pitch deck structure and design",
        "Storytelling for entrepreneurs",
        "Investor expectations and questions",
        "Live pitching practice session",
      ],
    },
    {
      id: 4,
      title: "IoT & Smart Systems Development",
      category: "Technical Workshops",
      description: "Build connected IoT devices and smart systems with Arduino, Raspberry Pi, and cloud platforms.",
      instructor: "Nikhil Sharma",
      instructorBio: "IoT specialist with 8+ years of experience in smart city and industrial IoT projects.",
      date: "2025-05-18",
      time: "10:00 AM - 1:00 PM",
      duration: "3 hours",
      location: "SNP Innovation Lab, Bangalore",
      mode: "In-Person",
      capacity: 25,
      registered: 12,
      fee: "INR 1299 (Students) / INR 3499 (Professionals)",
      learningOutcomes: [
        "Design IoT architectures",
        "Develop smart device firmware",
        "Cloud platform integration",
      ],
      curriculum: [
        "IoT architecture and protocols",
        "Microcontroller programming",
        "Cloud platform integration (AWS/Azure)",
        "Hands-on smart device building",
      ],
    },
  ],
  // Past workshops (testimonials and highlights)
  pastWorkshops: [
    {
      id: 1,
      title: "Data Science Masterclass",
      category: "Technical Workshops",
      date: "2025-03-15",
      attendees: 85,
      rating: 4.8,
      feedback: "Excellent content with practical examples. Instructor was very knowledgeable.",
    },
    {
      id: 2,
      title: "Startup Scaling Strategies",
      category: "Entrepreneurship & Startup",
      date: "2025-03-08",
      attendees: 120,
      rating: 4.7,
      feedback: "Very practical workshop with real-world case studies and investor insights.",
    },
    {
      id: 3,
      title: "Design Thinking Workshop",
      category: "Innovation & Design Thinking",
      date: "2025-02-28",
      attendees: 60,
      rating: 4.9,
      feedback: "Interactive and engaging. Great way to learn innovation methodology.",
    },
    {
      id: 4,
      title: "Full-Stack Web Development",
      category: "Technical Workshops",
      date: "2025-02-15",
      attendees: 95,
      rating: 4.6,
      feedback: "Well-structured curriculum from basics to deployment. Highly recommend.",
    },
  ],
  // Workshop features/benefits
  benefits: [
    "Learn from industry experts and practitioners",
    "Hands-on practical training with real projects",
    "Certificate of completion for all participants",
    "Networking opportunities with peers and mentors",
    "Access to workshop materials and recordings",
    "Job placement assistance for deserving candidates",
    "Lifetime access to workshop community",
  ],
  // Registration form state
  registration: {
    formData: {
      workshopId: '',
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      designation: '',
      experience: '',
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

const workshopsSlice = createSlice({
  name: 'workshops',
  initialState,
  reducers: {
    // Reset registration form
    resetRegistrationForm: (state) => {
      state.registration.formData = initialState.registration.formData;
      state.registration.submissionStatus = 'idle';
      state.registration.submissionError = null;
      state.registration.submissionMessage = null;
    },
    // Update registration form field
    updateRegistrationField: (state, action) => {
      const { field, value } = action.payload;
      state.registration.formData[field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch workshops data
      .addCase(fetchWorkshopsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWorkshopsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchWorkshopsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Register for workshop
      .addCase(registerForWorkshop.pending, (state) => {
        state.registration.submissionStatus = 'loading';
      })
      .addCase(registerForWorkshop.fulfilled, (state, action) => {
        state.registration.submissionStatus = 'succeeded';
        state.registration.submissionMessage = action.payload.message || 'Registration successful! Check your email for confirmation.';
        state.registration.formData = initialState.registration.formData;
      })
      .addCase(registerForWorkshop.rejected, (state, action) => {
        state.registration.submissionStatus = 'failed';
        state.registration.submissionError = action.payload;
      });
  },
});

export const { resetRegistrationForm, updateRegistrationField } = workshopsSlice.actions;
export default workshopsSlice.reducer;
