/* ========================================
   ABOUT SLICE — Manages About Us page data
   All initialState content taken directly from the PDF blueprint.
   When Spring Boot backend is live, API response will override this.
   ======================================== */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk — fetches live data from Spring Boot API
export const fetchAboutData = createAsyncThunk(
  'about/fetchAboutData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/about');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch about data');
    }
  }
);

// Hardcoded initial data — exact content from PDF blueprint Section 2
const initialState = {

  // ── 2.2 OUR STORY ───────────────────────────────────────────────
  story: {
    title: 'Our Story',
    yearFounded: 2015,
    // Three paragraphs verbatim from PDF section 2.2
    paragraphs: [
      'SNP Innovation was founded with a singular belief: that India\'s greatest untapped potential lies in the space between academic knowledge and real-world application. Our founders — technologists, educators, and innovators — recognized that students were graduating without hands-on skills, industries were struggling to find job-ready talent, and brilliant startup ideas were dying without the right infrastructure and mentorship.',
      'We set out to change that — by building Innovation Infrastructure that connects Education, Industry, Research, and Startups into one cohesive, technology-driven ecosystem.',
      'Today, SNP Innovation operates across four powerful verticals: EdTech & STEM Lab Setup, IT Resourcing, R&D & Automation Solutions, and Startup Incubation — serving schools, colleges, enterprises, MSMEs, government bodies, and innovators across India and internationally.',
    ],
    highlights: [
      '150+ Schools & Colleges Served',
      '500+ IT Professionals Deployed',
      '30+ Startups Incubated',
      'National & International Presence',
    ],
  },

  // ── 2.3 VISION ──────────────────────────────────────────────────
  vision:
    "To become India's most trusted Innovation Infrastructure Company — enabling every institution, enterprise, and individual to participate meaningfully in the technology-driven economy of tomorrow.",

  // ── 2.3 MISSION — 6 bullet points from PDF ──────────────────────
  mission: [
    'Enable hands-on, project-based technology education in every institution',
    'Bridge the industry-academia skill gap through real-world training and deployment',
    'Deliver end-to-end R&D solutions — from hardware to software, concept to certification',
    'Support startups from idea validation to market launch',
    'Encourage intellectual property development and innovation culture',
    'Create a self-sustaining innovation ecosystem across education, industry, and entrepreneurship',
  ],

  // ── 2.4 CORE VALUES — exact 6 from PDF ─────────────────────────
  values: [
    {
      id: 1,
      title: 'Innovation First',
      description: "We challenge convention. Every solution starts with 'why not?'",
      icon: 'Lightbulb',
    },
    {
      id: 2,
      title: 'Collaboration',
      description: 'We grow together — with clients, institutions, and our teams.',
      icon: 'People',
    },
    {
      id: 3,
      title: 'Practical Impact',
      description: 'Theory without application is incomplete. We build real-world skills.',
      icon: 'Build',
    },
    {
      id: 4,
      title: 'Inclusivity',
      description: 'From metro schools to rural communities, we bring innovation to all.',
      icon: 'Public',
    },
    {
      id: 5,
      title: 'Excellence',
      description: 'Highest quality in every lab, every deployment, every prototype.',
      icon: 'EmojiEvents',
    },
    {
      id: 6,
      title: 'Scalability',
      description: 'Solutions built to grow — from one school to a national network.',
      icon: 'TrendingUp',
    },
  ],

  // ── 2.5 OUR APPROACH — 6 steps from PDF ─────────────────────────
  approach: [
    {
      id: 1,
      step: 'Assess',
      title: 'Assess',
      description: 'Understand institutional/client needs, current gaps, and opportunity areas.',
    },
    {
      id: 2,
      step: 'Design',
      title: 'Design',
      description: 'Architect a customized solution: curriculum, technology stack, prototype plan.',
    },
    {
      id: 3,
      step: 'Deploy',
      title: 'Deploy',
      description: 'Implement with precision — labs, manpower, prototypes, incubation programs.',
    },
    {
      id: 4,
      step: 'Train',
      title: 'Train',
      description: 'Build internal capacity — teachers, employees, founders — for sustainable impact.',
    },
    {
      id: 5,
      step: 'Support',
      title: 'Support',
      description: 'Ongoing AMC, technical support, mentoring, and scaling assistance.',
    },
    {
      id: 6,
      step: 'Innovate',
      title: 'Innovate',
      description: 'Continuously improve, upgrade, and evolve with emerging technologies.',
    },
  ],

  // ── 2.6 TEAM & LEADERSHIP — exact bios from PDF ─────────────────
  team: [
    {
      id: 1,
      name: 'Mr. Saurabh Tiwari',
      shortName: 'Saurabh Tiwari',
      initials: 'ST',
      designation: 'Chief Executive Officer (CEO)',
      bio: "Visionary entrepreneur and education-technology leader, Saurabh drives SNP Innovation's overall strategy, growth, and stakeholder relationships. His deep passion for democratizing quality technical education has been the driving force behind SNP Innovation's expansion across EdTech, IT services, and innovation infrastructure.",
      // Dummy image — replace with real professional headshot
      image: 'https://picsum.photos/seed/ceo-saurabh/400/400',
      linkedin: '#',
      gradient: 'linear-gradient(135deg, #1A3A8F 0%, #2D5BE3 100%)',
    },
    {
      id: 2,
      name: 'Mr. Nikhil Gujar',
      shortName: 'Nikhil Gujar',
      initials: 'NG',
      designation: 'Chief Operating Officer (COO)',
      bio: 'The operational backbone of SNP Innovation, Nikhil oversees end-to-end execution across all four verticals — from lab installations and supply chain management to IT resourcing operations and cross-vertical coordination. His attention to detail and systems-thinking ensure that every client engagement is delivered with precision and excellence.',
      image: 'https://picsum.photos/seed/coo-nikhil/400/400',
      linkedin: '#',
      gradient: 'linear-gradient(135deg, #15803D 0%, #22C55E 100%)',
    },
    {
      id: 3,
      name: 'Mr. Pratik Warjurkar',
      shortName: 'Pratik Warjurkar',
      initials: 'PW',
      designation: 'Chief Technology Officer (CTO)',
      bio: "A hands-on technologist and innovator, Pratik leads SNP Innovation's technology architecture across robotics, AI, automation, and embedded systems. He spearheads all R&D initiatives, product development, and technology integration across the company's verticals — transforming ideas into working solutions.",
      image: 'https://picsum.photos/seed/cto-pratik/400/400',
      linkedin: '#',
      gradient: 'linear-gradient(135deg, #C2410C 0%, #CC2020 100%)',
    },
  ],

  // ── 2.7 CSR & SOCIAL IMPACT — exact bullet points from PDF ───────
  csr: {
    title: 'CSR & Social Impact',
    tagline: 'Technology should be a force for equity — not just efficiency.',
    description:
      'At SNP Innovation, we believe that technology should be a force for equity — not just efficiency. Through our foundation-led social initiatives, we have:',
    initiatives: [
      {
        id: 1,
        text: 'Supported rural and underserved schools with STEM innovation infrastructure',
        icon: 'School',
      },
      {
        id: 2,
        text: 'Conducted free robotics and coding workshops for underprivileged students',
        icon: 'PrecisionManufacturing',
      },
      {
        id: 3,
        text: 'Promoted skill development and digital literacy in remote communities',
        icon: 'Devices',
      },
      {
        id: 4,
        text: 'Sponsored young innovators and student entrepreneurs from Tier 2 & 3 cities',
        icon: 'EmojiPeople',
      },
    ],
    stats: [
      { value: '50+', label: 'Rural Schools Reached' },
      { value: '5000+', label: 'Students Impacted' },
      { value: '20+', label: 'Cities Covered' },
      { value: '100+', label: 'Free Workshops' },
    ],
  },

  // Redux loading state
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAboutData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchAboutData.rejected, (state, action) => {
        // Keep all initialState data intact — only flag the status
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default aboutSlice.reducer;
