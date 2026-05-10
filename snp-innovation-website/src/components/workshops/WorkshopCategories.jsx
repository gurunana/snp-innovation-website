/* ========================================
   WORKSHOP CATEGORIES - 4 tabs with sub-items per spec 7.2
   Tabs: School & College | Industry & Corporate | Startup & Entrepreneurship | CSR & Community
   No logic inside JSX return — all data computed above
   ======================================== */

import { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import FactoryIcon from '@mui/icons-material/FactoryOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunchOutlined';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivismOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// All category data — defined at module level, never blocks render
const CATEGORIES = [
  {
    id: 0,
    label: 'School & College',
    icon: SchoolIcon,
    color: '#2D5BE3',
    tagline: 'Igniting young minds with hands-on STEM exploration',
    image: 'https://picsum.photos/seed/school-workshops/800/500',
    workshops: [
      {
        title: 'Robotics Fundamentals',
        duration: '1-day, 2-day & 5-day programs',
        description: 'Build and program real robots — learn mechanics, electronics, and coding together.',
      },
      {
        title: 'Introduction to AI & Machine Learning',
        duration: 'Half-day to 1-day',
        description: 'Hands-on, beginner-friendly sessions exploring how AI works with live demos.',
      },
      {
        title: 'IoT Workshop — Build a Smart Device in a Day',
        duration: '1-day',
        description: 'Create a working IoT prototype using sensors, microcontrollers, and cloud connectivity.',
      },
      {
        title: 'Design Thinking & Innovation Bootcamp',
        duration: '1-day to 2-day',
        description: 'Human-centred design process — empathise, define, ideate, prototype, test.',
      },
      {
        title: 'Coding Bootcamp',
        duration: '2-day to 5-day',
        description: 'Learn Scratch, Python, and Arduino through project-based challenges.',
      },
      {
        title: 'Science Exhibition Project Support',
        duration: 'Customised',
        description: 'Guided mentorship to design, build, and present innovative science fair projects.',
      },
    ],
  },
  {
    id: 1,
    label: 'Industry & Corporate',
    icon: FactoryIcon,
    color: '#8B5CF6',
    tagline: 'Future-proofing your workforce with Industry 4.0 capabilities',
    image: 'https://picsum.photos/seed/corporate-workshops/800/500',
    workshops: [
      {
        title: 'Industry 4.0 & Digital Transformation Masterclass',
        duration: '1-day',
        description: 'Strategic overview of smart manufacturing, IIoT, digital twins, and AI-driven operations.',
      },
      {
        title: 'PLC & Industrial Automation Hands-on Workshop',
        duration: '2-day',
        description: 'Practical sessions on PLC programming, SCADA systems, and factory automation.',
      },
      {
        title: 'AI for Non-Technical Managers',
        duration: 'Half-day',
        description: 'Demystify AI — understand use cases, limitations, and business opportunities without coding.',
      },
      {
        title: 'IoT Integration for Manufacturing',
        duration: '1-day',
        description: 'Hands-on integration of IoT sensors and dashboards into existing manufacturing workflows.',
      },
      {
        title: 'Innovation Culture Building for Teams',
        duration: 'Half-day to 1-day',
        description: 'Structured activities to build creativity, ideation habits, and intrapreneurship skills.',
      },
    ],
  },
  {
    id: 2,
    label: 'Startup & Entrepreneurship',
    icon: RocketLaunchIcon,
    color: '#F59E0B',
    tagline: 'From zero to funded — practical skills for every founder',
    image: 'https://picsum.photos/seed/startup-workshops/800/500',
    workshops: [
      {
        title: 'Lean Startup & MVP Development Workshop',
        duration: '1-day',
        description: 'Apply Build-Measure-Learn cycles to develop and test your minimum viable product rapidly.',
      },
      {
        title: 'Pitch Perfect — Investor Presentation Masterclass',
        duration: '1-day',
        description: 'Learn narrative structure, financial storytelling, and live pitch practice with feedback.',
      },
      {
        title: 'IP Fundamentals — Protecting Your Innovation',
        duration: 'Half-day',
        description: 'Overview of patents, trademarks, copyrights, and trade secrets for technology startups.',
      },
      {
        title: 'Fundraising Readiness for Early-Stage Startups',
        duration: '1-day',
        description: 'Understand funding stages, term sheets, cap tables, and how to approach investors.',
      },
    ],
  },
  {
    id: 3,
    label: 'CSR & Community',
    icon: VolunteerActivismIcon,
    color: '#10B981',
    tagline: 'Technology for social good — empowering underserved communities',
    image: 'https://picsum.photos/seed/csr-workshops/800/500',
    workshops: [
      {
        title: 'Free Robotics Workshop for Government School Students',
        duration: '1-day',
        description: 'Fully sponsored hands-on robotics sessions for students in government schools.',
      },
      {
        title: 'Women in Technology Innovation Program',
        duration: '2-day',
        description: 'Mentorship, technical skills, and networking to empower women in STEM and entrepreneurship.',
      },
      {
        title: 'Rural Innovation & Digital Literacy Camps',
        duration: '2-day to 3-day',
        description: 'Digital literacy, mobile technology, and grassroots innovation workshops for rural communities.',
      },
      {
        title: 'Science Fair Mentoring for Underserved Communities',
        duration: 'Customised',
        description: 'Expert mentors guide students from low-income backgrounds to build impactful science projects.',
      },
    ],
  },
];

const WorkshopCategories = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Derive active category data outside JSX return
  const activeCategory = CATEGORIES[activeTab];
  const ActiveIcon = activeCategory.icon;

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box className="py-16 px-4">
      <div className="container">
        <SectionHeader
          title="Workshop Categories"
          subtitle="Choose from four curated program streams — each designed for a distinct audience and learning outcome"
        />

        {/* Tab Navigation */}
        <Box
          sx={{
            borderBottom: '1px solid #E2E8F0',
            marginBottom: 4,
            overflowX: 'auto',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '14px',
                color: '#6B7280',
                minWidth: 160,
                padding: '12px 20px',
              },
              '& .Mui-selected': {
                color: '#2D5BE3',
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: '#2D5BE3',
              },
            }}
          >
            {CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <Tab
                  key={cat.id}
                  label={cat.label}
                  icon={<CatIcon sx={{ fontSize: 20 }} />}
                  iconPosition="start"
                />
              );
            })}
          </Tabs>
        </Box>

        {/* Active Category Content */}
        <Grid container spacing={4} alignItems="flex-start">
          {/* Category Image + Tagline */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                border: `2px solid ${activeCategory.color}22`,
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={activeCategory.image}
                alt={activeCategory.label}
                sx={{ width: '100%', height: 200, objectFit: 'cover' }}
              />
              <CardContent sx={{ padding: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, marginBottom: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      backgroundColor: `${activeCategory.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ActiveIcon sx={{ fontSize: 22, color: activeCategory.color }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937', fontSize: '16px' }}>
                    {activeCategory.label}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.6 }}>
                  {activeCategory.tagline}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Chip
                    label={`${activeCategory.workshops.length} Workshops Available`}
                    size="small"
                    sx={{
                      backgroundColor: `${activeCategory.color}15`,
                      color: activeCategory.color,
                      fontWeight: 700,
                      border: `1px solid ${activeCategory.color}33`,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Workshop List */}
          <Grid item xs={12} md={8}>
            <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {activeCategory.workshops.map((workshop, idx) => (
                <Card
                  key={idx}
                  sx={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      borderColor: activeCategory.color,
                      boxShadow: `0 8px 24px ${activeCategory.color}18`,
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <CardContent sx={{ padding: '20px 24px' }}>
                    <ListItem disablePadding alignItems="flex-start">
                      <ListItemIcon sx={{ minWidth: 32, marginTop: '3px' }}>
                        <FiberManualRecordIcon sx={{ fontSize: 10, color: activeCategory.color }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 700, color: '#1F2937', fontSize: '15px' }}
                            >
                              {workshop.title}
                            </Typography>
                            <Chip
                              label={workshop.duration}
                              size="small"
                              sx={{
                                backgroundColor: '#F1F5F9',
                                color: '#475569',
                                fontSize: '11px',
                                fontWeight: 600,
                                height: 22,
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{ color: '#6B7280', lineHeight: 1.6, marginTop: 0.5, fontSize: '13px' }}
                          >
                            {workshop.description}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </Card>
              ))}
            </List>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default WorkshopCategories;
