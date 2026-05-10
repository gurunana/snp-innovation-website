/* ========================================
   GALLERY SLICE - Manages gallery data
   Contains: categories, photos, videos
   ======================================== */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async thunk to fetch gallery data from backend
export const fetchGalleryData = createAsyncThunk(
  'gallery/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/gallery');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch gallery data');
    }
  }
);

// Initial hardcoded data (used until backend is ready)
const initialState = {
  // Gallery categories
  categories: [
    { id: 1, name: "STEM Labs", icon: "Science", count: 24 },
    { id: 2, name: "Workshops & Training", icon: "Users", count: 18 },
    { id: 3, name: "Student Projects", icon: "Lightbulb", count: 32 },
    { id: 4, name: "Incubation Hub", icon: "RocketLaunch", count: 15 },
    { id: 5, name: "Team & Culture", icon: "Heart", count: 12 },
    { id: 6, name: "Events & Celebrations", icon: "Gift", count: 28 },
  ],
  // Photo gallery items
  photos: [
    // STEM Labs category
    {
      id: 1,
      title: "Robotics Lab - Student Demo",
      category: "STEM Labs",
      description: "Students demonstrating their robotics project with obstacle avoidance robot",
      image: "/images/gallery/stem-lab-1.jpg",
      thumbnail: "/images/gallery/stem-lab-1-thumb.jpg",
      date: "2025-02-20",
      location: "Delhi Public School, Delhi",
    },
    {
      id: 2,
      title: "IoT Workstation Setup",
      category: "STEM Labs",
      description: "Complete IoT development workstation with Arduino, sensors, and cloud integration",
      image: "/images/gallery/stem-lab-2.jpg",
      thumbnail: "/images/gallery/stem-lab-2-thumb.jpg",
      date: "2025-02-18",
      location: "SNP Innovation Lab, Mumbai",
    },
    {
      id: 3,
      title: "AI/ML Workshop Session",
      category: "STEM Labs",
      description: "Students learning machine learning concepts with hands-on model building",
      image: "/images/gallery/stem-lab-3.jpg",
      thumbnail: "/images/gallery/stem-lab-3-thumb.jpg",
      date: "2025-02-15",
      location: "IIT Bombay Innovation Center",
    },
    {
      id: 4,
      title: "Electronics Lab - Circuit Design",
      category: "STEM Labs",
      description: "Students working on custom circuit design and PCB prototyping",
      image: "/images/gallery/stem-lab-4.jpg",
      thumbnail: "/images/gallery/stem-lab-4-thumb.jpg",
      date: "2025-02-10",
      location: "Nalanda Academy, Pune",
    },
    // Workshops category
    {
      id: 5,
      title: "Entrepreneurship Workshop - Pitching Session",
      category: "Workshops & Training",
      description: "Participants pitching their startup ideas to a panel of investors",
      image: "/images/gallery/workshop-1.jpg",
      thumbnail: "/images/gallery/workshop-1-thumb.jpg",
      date: "2025-02-28",
      location: "SNP Innovation HQ, Mumbai",
    },
    {
      id: 6,
      title: "Data Science Masterclass",
      category: "Workshops & Training",
      description: "Expert instructor teaching advanced data science techniques and applications",
      image: "/images/gallery/workshop-2.jpg",
      thumbnail: "/images/gallery/workshop-2-thumb.jpg",
      date: "2025-02-25",
      location: "Tech Hub, Bangalore",
    },
    {
      id: 7,
      title: "Full-Stack Development Training",
      category: "Workshops & Training",
      description: "Hands-on training session on web development with modern frameworks",
      image: "/images/gallery/workshop-3.jpg",
      thumbnail: "/images/gallery/workshop-3-thumb.jpg",
      date: "2025-02-22",
      location: "SNP Innovation Lab, Delhi",
    },
    // Student Projects category
    {
      id: 8,
      title: "Smart Plant Monitoring System",
      category: "Student Projects",
      description: "Student project combining IoT sensors with mobile app for plant care monitoring",
      image: "/images/gallery/project-1.jpg",
      thumbnail: "/images/gallery/project-1-thumb.jpg",
      date: "2025-02-20",
      location: "Delhi Public School, Delhi",
    },
    {
      id: 9,
      title: "Autonomous Delivery Robot",
      category: "Student Projects",
      description: "College students presenting their autonomous robot for last-mile delivery",
      image: "/images/gallery/project-2.jpg",
      thumbnail: "/images/gallery/project-2-thumb.jpg",
      date: "2025-02-18",
      location: "VJTI Mumbai Innovation Hub",
    },
    {
      id: 10,
      title: "AI-Based Handwriting Recognition",
      category: "Student Projects",
      description: "Deep learning project for real-time handwriting recognition and analysis",
      image: "/images/gallery/project-3.jpg",
      thumbnail: "/images/gallery/project-3-thumb.jpg",
      date: "2025-02-15",
      location: "Symbiosis Institute, Pune",
    },
    // Incubation Hub category
    {
      id: 11,
      title: "Incubation Center - Co-working Space",
      category: "Incubation Hub",
      description: "Modern co-working space equipped with all amenities for startup teams",
      image: "/images/gallery/incubation-1.jpg",
      thumbnail: "/images/gallery/incubation-1-thumb.jpg",
      date: "2025-02-12",
      location: "SNP Innovation Incubation Center, Delhi",
    },
    {
      id: 12,
      title: "Demo Day - Investor Showcase",
      category: "Incubation Hub",
      description: "Startups pitching their innovations to investors and industry leaders",
      image: "/images/gallery/incubation-2.jpg",
      thumbnail: "/images/gallery/incubation-2-thumb.jpg",
      date: "2025-02-05",
      location: "SNP Innovation HQ, Mumbai",
    },
    // Team & Culture category
    {
      id: 13,
      title: "SNP Innovation Leadership Team",
      category: "Team & Culture",
      description: "Leadership team with CEO, COO, CTO, and strategic advisors",
      image: "/images/gallery/team-1.jpg",
      thumbnail: "/images/gallery/team-1-thumb.jpg",
      date: "2025-01-30",
      location: "SNP Innovation HQ, Mumbai",
    },
    {
      id: 14,
      title: "Team Building Activity",
      category: "Team & Culture",
      description: "SNP Innovation team engaged in collaborative problem-solving activity",
      image: "/images/gallery/team-2.jpg",
      thumbnail: "/images/gallery/team-2-thumb.jpg",
      date: "2025-01-25",
      location: "SNP Innovation Office",
    },
    // Events & Celebrations category
    {
      id: 15,
      title: "National Robotics Championship",
      category: "Events & Celebrations",
      description: "SNP Innovation sponsoring India's premier robotics competition with 500+ participants",
      image: "/images/gallery/event-1.jpg",
      thumbnail: "/images/gallery/event-1-thumb.jpg",
      date: "2025-02-01",
      location: "New Delhi",
    },
    {
      id: 16,
      title: "Lab Inauguration Ceremony",
      category: "Events & Celebrations",
      description: "Ribbon-cutting ceremony for new STEM lab at premier school",
      image: "/images/gallery/event-2.jpg",
      thumbnail: "/images/gallery/event-2-thumb.jpg",
      date: "2025-01-20",
      location: "St. John's School, Bangalore",
    },
  ],
  // Video gallery items
  videos: [
    {
      id: 1,
      title: "SNP Innovation - Overview & Impact",
      category: "Company",
      description: "A comprehensive overview of SNP Innovation's services and impact across India",
      thumbnail: "/images/gallery/video-1-thumb.jpg",
      videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
      duration: "5:32",
      date: "2025-02-20",
    },
    {
      id: 2,
      title: "STEM Lab Setup - Time-lapse Installation",
      category: "STEM Labs",
      description: "Watch as a complete STEM lab is installed and configured in a school",
      thumbnail: "/images/gallery/video-2-thumb.jpg",
      videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
      duration: "3:45",
      date: "2025-02-15",
    },
    {
      id: 3,
      title: "Student Success Story - Robot Builder",
      category: "Student Projects",
      description: "Meet Arjun, a class 10 student who built a winning robotics project using our lab",
      thumbnail: "/images/gallery/video-3-thumb.jpg",
      videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
      duration: "8:22",
      date: "2025-02-10",
    },
    {
      id: 4,
      title: "Startup Journey - From Idea to Funding",
      category: "Incubation Hub",
      description: "EduBot founder Sneha Patil shares her incubation journey and success story",
      thumbnail: "/images/gallery/video-4-thumb.jpg",
      videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
      duration: "12:15",
      date: "2025-02-05",
    },
    {
      id: 5,
      title: "CEO Talk - The Future of Innovation in India",
      category: "Company",
      description: "Saurabh Tiwari on the role of innovation infrastructure in nation building",
      thumbnail: "/images/gallery/video-5-thumb.jpg",
      videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
      duration: "15:48",
      date: "2025-01-30",
    },
    {
      id: 6,
      title: "Workshop Highlight - Data Science Masterclass",
      category: "Workshops & Training",
      description: "Behind the scenes from our sold-out Data Science workshop",
      thumbnail: "/images/gallery/video-6-thumb.jpg",
      videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
      duration: "6:20",
      date: "2025-01-25",
    },
  ],
  // Loading and error states
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    // You can add manual state updates here if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch gallery data
      .addCase(fetchGalleryData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGalleryData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(fetchGalleryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default gallerySlice.reducer;
