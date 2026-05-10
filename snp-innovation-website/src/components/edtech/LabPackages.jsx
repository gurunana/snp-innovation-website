/* ========================================
   LAB PACKAGES - 3 tier pricing cards
   Starter / Advanced / Research & Automation
   PDF Section 3.7
   ======================================== */

import { Box, Typography, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import PrimaryButton from '../common/PrimaryButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// All package data defined outside return — no logic in JSX
const packages = [
  {
    id: 1,
    name: 'Starter Innovation Lab',
    badge: null,
    level: 'Primary & Middle Schools',
    price: 'Contact for Pricing',
    tagline: 'The perfect first step into hands-on STEM',
    capacity: '20–30 Students',
    focus: 'Basic Robotics, Electronics & Coding',
    color: '#2D5BE3',
    gradient: 'linear-gradient(135deg, #2D5BE3, #2563EB)',
    includes: [
      'Plug-and-Play Starter Kit (Class 5–8)',
      'Basic Electronics & Intro Robotics',
      'Junior Coding modules',
      'Teacher training (3-day programme)',
      'Curriculum aligned with CBSE/ICSE',
      '6-month AMC support',
    ],
    image: 'https://picsum.photos/seed/lab-starter/800/500',
  },
  {
    id: 2,
    name: 'Advanced STEM Lab',
    badge: 'MOST POPULAR',
    level: 'Senior Secondary & Junior College',
    price: 'Contact for Pricing',
    tagline: 'AI, Robotics & IoT under one roof',
    capacity: '30–40 Students',
    focus: 'Robotics, AI, IoT, Arduino, Raspberry Pi',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    includes: [
      'Robotics & Programming Kits (Class 8–12)',
      'AI & Machine Learning Kit (Class 11+)',
      'IoT Starter modules',
      'Arduino & Raspberry Pi lab',
      'Teacher training (5-day residential)',
      'Competition prep — ATL, Olympiads',
      '12-month AMC with on-site visits',
    ],
    image: 'https://picsum.photos/seed/lab-advanced/800/500',
  },
  {
    id: 3,
    name: 'Research & Automation Lab',
    badge: null,
    level: 'Engineering Colleges, Polytechnics & Research',
    price: 'Contact for Pricing',
    tagline: 'Industrial-grade AI, IoT & automation research',
    capacity: '40+ Students / Researchers',
    focus: 'PLC, Industrial Automation, Full AI/IoT Stack',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    includes: [
      'Full AI & ML Lab (Jetson Nano, Edge AI)',
      'Industrial IoT & MQTT/Cloud stack',
      'PLC & Industrial Automation',
      'Smart City & Agriculture IoT modules',
      'Research project mentorship',
      'IP support & hackathon sponsorship',
      '24-month AMC + dedicated support engineer',
    ],
    image: 'https://picsum.photos/seed/lab-research/800/500',
  },
];

const LabPackages = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        <SectionHeader
          title="Lab Packages & Levels"
          subtitle="Three tiers of STEM Innovation Labs — scaled to match your institution's size, level and ambitions"
        />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3, mt: 3 }}>
          {packages.map((pkg, idx) => {
            const isHighlighted = idx === 1;
            return (
                              <Box
                  key={pkg.id}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: isHighlighted
                      ? `0 24px 60px ${pkg.color}30`
                      : '0 8px 30px rgba(0,0,0,0.08)',
                    border: isHighlighted ? `2px solid ${pkg.color}` : '1px solid #E5E7EB',
                    transform: isHighlighted ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                    backgroundColor: '#fff',
                    position: 'relative',
                    '&:hover': {
                      transform: isHighlighted ? 'scale(1.06)' : 'scale(1.03)',
                      boxShadow: `0 30px 70px ${pkg.color}25`,
                    },
                  }}
                >
                  {/* Popular badge */}
                  {pkg.badge && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -1,
                        left: 0,
                        right: 0,
                        py: 0.75,
                        background: pkg.gradient,
                        textAlign: 'center',
                        zIndex: 2,
                      }}
                    >
                      <Typography sx={{ color: '#fff', fontSize: '11px', fontWeight: 800, letterSpacing: '1px' }}>
                        {pkg.badge}
                      </Typography>
                    </Box>
                  )}

                  {/* Header image */}
                  <Box
                    sx={{
                      position: 'relative',
                      height: 130,
                      mt: pkg.badge ? 3.5 : 0,
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={pkg.image}
                      alt={pkg.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.45)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `${pkg.gradient.replace('linear-gradient(135deg, ', '').replace(')', '')}`.split(',').map((c, i) => `${c.trim()}${i === 0 ? '99' : 'BB'}`).join(''),
                        opacity: 0.75,
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.6) 100%)`,
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2.5,
                      }}
                    >
                      <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: 600, mb: 0.5 }}>
                        {pkg.level}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ color: '#fff', fontWeight: 800, fontSize: '18px', lineHeight: 1.3 }}
                      >
                        {pkg.name}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      sx={{
                        color: '#6B7280',
                        fontSize: '13px',
                        fontStyle: 'italic',
                        mb: 2,
                        lineHeight: 1.5,
                      }}
                    >
                      {pkg.tagline}
                    </Typography>

                    {/* Capacity & focus row */}
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        mb: 2.5,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box
                        sx={{
                          px: 2,
                          py: 0.6,
                          borderRadius: '20px',
                          background: `${pkg.color}15`,
                          border: `1px solid ${pkg.color}30`,
                        }}
                      >
                        <Typography sx={{ color: pkg.color, fontSize: '12px', fontWeight: 600 }}>
                          👥 {pkg.capacity}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        mb: 1.5,
                      }}
                    >
                      What's Included
                    </Typography>

                    <List disablePadding sx={{ mb: 3, flex: 1 }}>
                      {pkg.includes.map((item, featureIdx) => (
                        <ListItem key={featureIdx} disableGutters sx={{ py: 0.6, alignItems: 'flex-start' }}>
                          <ListItemIcon sx={{ minWidth: 28, mt: 0.4 }}>
                            <CheckCircleIcon sx={{ fontSize: 16, color: pkg.color }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              sx: { color: '#374151', fontSize: '13px', lineHeight: 1.5 },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <PrimaryButton
                      fullWidth
                      to="/contact"
                      variant={isHighlighted ? 'contained' : 'outlined'}
                      sx={{
                        background: isHighlighted ? pkg.gradient : undefined,
                        borderColor: isHighlighted ? 'transparent' : pkg.color,
                        color: isHighlighted ? '#fff' : pkg.color,
                        fontWeight: 700,
                        '&:hover': {
                          background: isHighlighted ? pkg.gradient : `${pkg.color}15`,
                          borderColor: pkg.color,
                        },
                      }}
                    >
                      Get a Free Quote
                    </PrimaryButton>
                  </Box>
                </Box>
            );
          })}
        </Box>

        {/* CSR note */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)',
            border: '1px solid #DBEAFE',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937', mb: 1 }}>
            💼 CSR & Government Funding Available
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', maxWidth: 600, mx: 'auto', lineHeight: 1.65 }}>
            We help institutions access CSR grants, government schemes, and NITI Aayog ATL funding to
            offset lab costs. Speak to our team for a customised funding proposal.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LabPackages;
