/* ========================================
   KIT CATEGORIES - 4 kit categories from PDF 3.4
   Tab-based display with image + features grid
   ======================================== */

import { useState } from 'react';
import { Box, Typography, Container, Chip } from '@mui/material';
import SectionHeader from '../common/SectionHeader';

// All kit data defined outside return — no logic in JSX
const kitCategories = [
  {
    id: 1,
    name: 'Plug-and-Play Starter Kits',
    level: 'Class 5–8',
    image: 'https://picsum.photos/seed/kit-starter/800/500',
    tagline: 'First steps into the world of technology',
    description:
      'Designed for young learners, these kits introduce fundamental concepts in electronics, robotics, and coding through exciting, age-appropriate hands-on experiments.',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    bg: '#FFFBEB',
    items: [
      { label: 'Basic Electronics', icon: '⚡' },
      { label: 'Intro to Robotics', icon: '🤖' },
      { label: 'Automation & Sensor Kits', icon: '📡' },
      { label: 'Junior Coding', icon: '💻' },
      { label: 'Science Exploration', icon: '🔬' },
    ],
  },
  {
    id: 2,
    name: 'Robotics & Programming Kits',
    level: 'Class 8–12',
    image: 'https://picsum.photos/seed/kit-robotics/800/500',
    tagline: 'Build, program and race your own robots',
    description:
      'A hands-on robotics programme using Arduino, Raspberry Pi and Python/C++ to create autonomous line-followers, maze-solvers, robotic arms and more.',
    color: '#2D5BE3',
    gradient: 'linear-gradient(135deg, #2D5BE3, #2563EB)',
    bg: '#EFF6FF',
    items: [
      { label: 'Arduino Robotics', icon: '🔧' },
      { label: 'Line-Follower / Maze-Solver', icon: '🏁' },
      { label: 'Robotic Arm & Gripper', icon: '🦾' },
      { label: 'Raspberry Pi Projects', icon: '🍓' },
      { label: 'Python / C++ Programming', icon: '🐍' },
    ],
  },
  {
    id: 3,
    name: 'AI & Machine Learning Kits',
    level: 'Class 11+ / College',
    image: 'https://picsum.photos/seed/kit-ai/800/500',
    tagline: 'Train models, see AI think in real time',
    description:
      'Cutting-edge AI kits using Jetson Nano and Edge AI platforms to explore computer vision, NLP, gesture & facial recognition, and intelligent systems design.',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    bg: '#F5F3FF',
    items: [
      { label: 'Computer Vision', icon: '👁️' },
      { label: 'Voice Recognition / NLP', icon: '🗣️' },
      { label: 'Edge AI — Jetson Nano', icon: '🧠' },
      { label: 'Gesture & Facial Recognition', icon: '🤚' },
      { label: 'AI Smart Systems', icon: '🤖' },
    ],
  },
  {
    id: 4,
    name: 'IoT & Smart Systems',
    level: 'College / Research',
    image: 'https://picsum.photos/seed/kit-iot/800/500',
    tagline: 'Connect everything. Build smarter cities.',
    description:
      'Industrial and research-grade IoT kits covering smart home, smart city, agriculture IoT, MQTT/Cloud integration, and environmental sensor networks.',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
    bg: '#ECFDF5',
    items: [
      { label: 'Smart Home / Smart City', icon: '🏙️' },
      { label: 'Industrial IoT', icon: '🏭' },
      { label: 'Environmental Sensors', icon: '🌿' },
      { label: 'MQTT / Cloud IoT', icon: '☁️' },
      { label: 'Agriculture & Healthcare IoT', icon: '🌾' },
    ],
  },
];

const KitCategories = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeKit = kitCategories[activeTab];

  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        <SectionHeader
          title="Lab Offerings & Kit Categories"
          subtitle="Four tiers of STEM kits — from first electronics experiments to industrial IoT research"
        />

        {/* Tab pills */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
            mt: 4,
            mb: { xs: 2, md: 3 },
          }}
        >
          {kitCategories.map((kit, idx) => (
            <Box
              key={kit.id}
              onClick={() => setActiveTab(idx)}
              sx={{
                px: 3,
                py: 1.2,
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: activeTab === idx ? 700 : 500,
                fontSize: '14px',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                background: activeTab === idx ? kit.gradient : '#fff',
                color: activeTab === idx ? '#fff' : '#374151',
                border: activeTab === idx ? 'none' : '1.5px solid #E5E7EB',
                boxShadow: activeTab === idx ? `0 8px 24px ${kit.color}40` : '0 2px 6px rgba(0,0,0,0.05)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: activeTab === idx ? `0 12px 30px ${kit.color}50` : '0 6px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              {kit.name}
            </Box>
          ))}
        </Box>

        {/* Active kit content — CSS flex (no MUI Grid) prevents image overflow bug */}
        <Box
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            background: '#fff',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: { md: 320 },
          }}
        >
          {/* ── Image panel — fixed width on desktop ── */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: '40%' },
              height: { xs: 190, md: 'auto' },
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={activeKit.image}
              alt={activeKit.name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Dark gradient overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(160deg, ${activeKit.color}BB 0%, rgba(0,0,0,0.75) 100%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                p: 2.5,
              }}
            >
              <Chip
                label={activeKit.level}
                size="small"
                sx={{
                  mb: 1,
                  alignSelf: 'flex-start',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontWeight: 600,
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontSize: '11px',
                }}
              />
              <Typography
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: { xs: '17px', md: '20px' },
                  letterSpacing: '-0.3px',
                  mb: 0.5,
                  lineHeight: 1.25,
                }}
              >
                {activeKit.name}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: '12px',
                  fontStyle: 'italic',
                }}
              >
                {activeKit.tagline}
              </Typography>
            </Box>
          </Box>

          {/* ── Content panel ── */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2.5, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: activeKit.bg,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: '#374151', lineHeight: 1.7, fontSize: '14px', mb: 2 }}
            >
              {activeKit.description}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, color: '#1F2937', mb: 1.5, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px' }}
            >
              What's Included
            </Typography>

            {/* 2-column CSS grid for included items — avoids MUI Grid nesting issues */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1.5,
              }}
            >
              {activeKit.items.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    border: `1px solid ${activeKit.color}25`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: activeKit.color,
                      boxShadow: `0 4px 12px ${activeKit.color}20`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1.5,
                      background: activeKit.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '16px',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="body2" sx={{ color: '#374151', fontWeight: 600, fontSize: '12px' }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Mini navigation dots */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 4 }}>
          {kitCategories.map((kit, idx) => (
            <Box
              key={kit.id}
              onClick={() => setActiveTab(idx)}
              sx={{
                width: activeTab === idx ? 32 : 10,
                height: 10,
                borderRadius: '50px',
                cursor: 'pointer',
                background: activeTab === idx ? kit.gradient : '#D1D5DB',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default KitCategories;
