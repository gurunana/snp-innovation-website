/* ========================================
   HOME SLICE - Manages home page data
   Contains: stats, verticals, testimonials, news
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk to fetch home page data from backend
export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/home');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch home data');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Hero section content
  hero: {
    headline: 'Empowering the Next Generation of Innovators',
    subHeadline: "India's Innovation Infrastructure Company — Bridging the gap between Education, Industry, Research & Startups through cutting-edge technology solutions.",
  },
  // Impact counter stats
  stats: [
    { label: 'Schools & Colleges Served', count: 150 },
    { label: 'STEM Lab Installations', count: 100 },
    { label: 'IT Professionals Deployed', count: 500 },
    { label: 'R&D Projects Completed', count: 75 },
    { label: 'Startups Supported', count: 30 },
    { label: 'National & International Clients', count: 200 },
  ],
  // Four main verticals
  verticals: [
    {
      id: 1,
      title: 'EdTech & STEM Innovation Labs',
      description: 'Plug-and-play lab setups, AI/Robotics/IoT kits, and project-based learning for schools & colleges.',
      icon: 'Science',
      link: '/edtech',
    },
    {
      id: 2,
      title: 'IT Resourcing & Technology Services',
      description: 'Skilled IT manpower supply, dedicated developer teams, and technology deployment for enterprises & startups.',
      icon: 'Computer',
      link: '/it-resourcing',
    },
    {
      id: 3,
      title: 'R&D & Automation Solutions',
      description: 'End-to-end research, hardware/software development, automation, and IP filing support.',
      icon: 'Engineering',
      link: '/rd-automation',
    },
    {
      id: 4,
      title: 'Incubation & Startup Support',
      description: 'Idea to market — validation, prototyping, mentorship, funding guidance, and commercialization.',
      icon: 'RocketLaunch',
      link: '/incubation',
    },
  ],
  // Why SNP Innovation features
  features: [
    'End-to-End Solution Provider — from concept to commercialization',
    'Plug-and-Play Infrastructure — zero-friction lab setup for institutions',
    'Transdisciplinary Learning Approach — breaking silos between subjects',
    'Industry-Linked Training — real projects, real skills, real outcomes',
    'IP & Certification Support — patents, national & international certifications',
    'National & International Client Network — proven track record across verticals',
  ],
  // Testimonials
  testimonials: [
    {
      id: 1,
      quote: 'SNP Innovation transformed our school with a world-class STEM lab. Students are now building real projects!',
      name: 'Dr. Priya Sharma',
      designation: 'Principal',
      organization: 'Delhi Public School',
    },
    {
      id: 2,
      quote: 'Their IT resourcing team deployed skilled developers within a week. Exceptional quality and professionalism.',
      name: 'Rajesh Kumar',
      designation: 'CTO',
      organization: 'TechVentures Pvt. Ltd.',
    },
    {
      id: 3,
      quote: 'From prototype to patent — SNP Innovation supported our entire R&D journey seamlessly.',
      name: 'Amit Deshmukh',
      designation: 'Founder',
      organization: 'GreenTech Solutions',
    },
    {
      id: 4,
      quote: 'The incubation program gave us the mentorship and resources to go from idea to our first paying customer.',
      name: 'Sneha Patil',
      designation: 'Co-Founder',
      organization: 'EduBot Startup',
    },
  ],
  // Latest news/blog items
  latestNews: [
    { id: 1, title: 'New STEM Lab Launched at Model School, Pune', date: '2025-03-15', category: 'Lab Launch' },
    { id: 2, title: 'SNP Innovation Hosts National Robotics Workshop', date: '2025-02-20', category: 'Workshop' },
    { id: 3, title: 'Startup from Incubation Center Raises Seed Funding', date: '2025-01-10', category: 'Startup' },
  ],
  // Loading and error states
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // You can add manual state updates here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Merge API data into state
        Object.assign(state, action.payload);
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        // Mark as failed but DO NOT wipe the data.
        // The hardcoded initialState values (hero, stats, verticals, etc.)
        // stay in place so the page renders correctly without a backend.
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
