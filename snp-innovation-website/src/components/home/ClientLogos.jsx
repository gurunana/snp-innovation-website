/* ========================================
   CLIENT & PARTNER LOGOS — Home Page Section 1.6
   PDF: "Scrolling/Auto-carousel logo strip"
   PDF Note: "Organize into: Educational Institutions | Corporate Clients |
   Government Partners | International Collaborations"
   ======================================== */

import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PublicIcon from '@mui/icons-material/Public';

// 4 categories as PDF specifies
const CATEGORIES = [
  { label: 'Educational Institutions', icon: SchoolIcon, color: '#1A3A8F' },
  { label: 'Corporate Clients', icon: BusinessIcon, color: '#15803D' },
  { label: 'Government Partners', icon: AccountBalanceIcon, color: '#C2410C' },
  { label: 'International Collaborations', icon: PublicIcon, color: '#7E22CE' },
];

// Placeholder logos for each category (replace with real logos)
const LOGOS = {
  0: [
    { id: 1, name: 'DPS Schools', initials: 'DPS' },
    { id: 2, name: 'IIT Bombay', initials: 'IIT' },
    { id: 3, name: 'Symbiosis', initials: 'SYM' },
    { id: 4, name: 'VNIT', initials: 'VNIT' },
    { id: 5, name: 'MIT College', initials: 'MIT' },
    { id: 6, name: 'COEP', initials: 'COEP' },
  ],
  1: [
    { id: 1, name: 'TCS', initials: 'TCS' },
    { id: 2, name: 'Infosys', initials: 'INFY' },
    { id: 3, name: 'Wipro', initials: 'WIP' },
    { id: 4, name: 'Tech Mahindra', initials: 'TM' },
    { id: 5, name: 'L&T', initials: 'L&T' },
    { id: 6, name: 'TATA', initials: 'TATA' },
  ],
  2: [
    { id: 1, name: 'MeitY', initials: 'MEI' },
    { id: 2, name: 'NITI Aayog', initials: 'NITI' },
    { id: 3, name: 'DST', initials: 'DST' },
    { id: 4, name: 'MSME Ministry', initials: 'MSME' },
    { id: 5, name: 'Startup India', initials: 'SI' },
    { id: 6, name: 'AIM', initials: 'AIM' },
  ],
  3: [
    { id: 1, name: 'Singapore Partner', initials: 'SG' },
    { id: 2, name: 'UAE Collab', initials: 'UAE' },
    { id: 3, name: 'US Partner', initials: 'US' },
    { id: 4, name: 'EU Research', initials: 'EU' },
    { id: 5, name: 'UK Institute', initials: 'UK' },
    { id: 6, name: 'Global NGO', initials: 'NGO' },
  ],
};

const ClientLogos = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Get logos for active tab, duplicate for infinite scroll
  const currentLogos = LOGOS[activeTab] || [];
  const scrollingLogos = [...currentLogos, ...currentLogos, ...currentLogos];

  const activeCategory = CATEGORIES[activeTab];

  return (
    <Box sx={{ width: '100%', paddingY: { xs: 4, md: 6 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="xl">

        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 4 } }}>
          <Typography
            variant="overline"
            sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', display: 'block', mb: 1 }}
          >
            TRUSTED BY
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', mb: 1.5 }}>
            Our Partners & Clients
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', maxWidth: '580px', mx: 'auto', mb: 3, fontSize: '16px' }}>
            Trusted by leading educational institutions, enterprises, and government bodies across India and beyond.
          </Typography>
          <Box sx={{ width: 60, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto' }} />
        </Box>

        {/* 4-Tab filter — exact categories from PDF */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
              justifyContent: 'center',
              background: '#F8FAFC',
              p: 1,
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
            }}
          >
            {CATEGORIES.map((cat, index) => {
              const IconComp = cat.icon;
              const isActive = activeTab === index;
              return (
                <Box
                  key={index}
                  onClick={() => setActiveTab(index)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.5,
                    py: 1.2,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'white' : '#64748B',
                    background: isActive ? `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)` : 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: isActive
                        ? `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)`
                        : '#E2E8F0',
                      color: isActive ? 'white' : '#0F172A',
                    },
                  }}
                >
                  <IconComp sx={{ fontSize: 18 }} />
                  {cat.label}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Scrolling Logo Strip */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            py: 4,
            px: 2,
            // Gradient fade on left/right edges
            '&::before': {
              content: '""', position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
              background: 'linear-gradient(90deg,#F8FAFC,transparent)', zIndex: 2, pointerEvents: 'none',
            },
            '&::after': {
              content: '""', position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
              background: 'linear-gradient(270deg,#F8FAFC,transparent)', zIndex: 2, pointerEvents: 'none',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              animation: 'logoScroll 30s linear infinite',
              '&:hover': { animationPlayState: 'paused' },
              '@keyframes logoScroll': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(calc(-200px * 6))' },
              },
            }}
          >
            {scrollingLogos.map((logo, i) => (
              <Box
                key={i}
                sx={{
                  flexShrink: 0,
                  width: '170px',
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: activeCategory.color,
                    boxShadow: `0 8px 20px ${activeCategory.color}22`,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: '18px',
                    color: activeCategory.color,
                    letterSpacing: '1px',
                  }}
                >
                  {logo.initials}
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500, mt: 0.5 }}>
                  {logo.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Footer note */}
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', mt: 4, color: '#94A3B8', fontSize: '13px', fontWeight: 500 }}
        >
          200+ institutions and enterprises trust SNP Innovation across India and globally
        </Typography>
      </Container>
    </Box>
  );
};

export default ClientLogos;
