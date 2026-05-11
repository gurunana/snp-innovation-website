/* ========================================
   FEATURED VERTICAL SPOTLIGHT — Home Page Section 1.5
   4 alternating left-right image + content blocks,
   one per business vertical.
   ======================================== */

import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
import EngineeringIcon from '@mui/icons-material/Engineering';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// Spotlight data — one per vertical
const spotlightItems = [
  {
    id: 1,
    tag: 'EdTech & STEM Labs',
    title: 'Future-Ready STEM Innovation Labs for Schools & Colleges',
    description:
      'We design, deploy, and sustain complete STEM Innovation Lab ecosystems — covering Robotics, AI, IoT, Electronics, Coding, and Automation. From plug-and-play starter kits to advanced research labs, every institution can now participate in the innovation economy.',
    link: '/edtech',
    icon: ScienceIcon,
    image: '/images/gallery/verticals/1.png',
    overlayColor: 'rgba(30, 64, 175, 0.18)',
    chipBg: '#EFF6FF',
    chipColor: '#1A3A8F',
    gradient: 'linear-gradient(135deg, #1A3A8F 0%, #2D5BE3 100%)',
    badgeColor: '#1A3A8F',
  },
  {
    id: 2,
    tag: 'IT Resourcing',
    title: 'Skilled Tech Talent — Deployed On Demand, Built for Real Projects',
    description:
      "We don't just supply resumes — we deploy verified, project-ready IT professionals who integrate seamlessly with your team and deliver from Day 1. Software development, AI, embedded systems, cloud, and more.",
    link: '/it-resourcing',
    icon: ComputerIcon,
    image: '/images/gallery/verticals/2.png',
    overlayColor: 'rgba(21, 128, 61, 0.18)',
    chipBg: '#F0FDF4',
    chipColor: '#15803D',
    gradient: 'linear-gradient(135deg, #15803D 0%, #22C55E 100%)',
    badgeColor: '#15803D',
  },
  {
    id: 3,
    tag: 'R&D & Automation',
    title: 'From Concept to Commercialization — End-to-End Innovation Support',
    description:
      'We own the full development lifecycle — no fragmented handoffs. Hardware development, firmware, software, automation integration, certification support, and IP filing — all under one roof.',
    link: '/rd-automation',
    icon: EngineeringIcon,
    image: '/images/gallery/verticals/3.png',
    overlayColor: 'rgba(194, 65, 12, 0.18)',
    chipBg: '#FFF7ED',
    chipColor: '#C2410C',
    gradient: 'linear-gradient(135deg, #C2410C 0%, #CC2020 100%)',
    badgeColor: '#C2410C',
  },
  {
    id: 4,
    tag: 'Incubation Center',
    title: 'From Your Idea to the Market — We Build It With You',
    description:
      'Access R&D labs, IT development teams, STEM education networks, IP filing support, investor connections, and business design. We are more than an incubator — we are your innovation infrastructure partner.',
    link: '/incubation',
    icon: RocketLaunchIcon,
    image: '/images/gallery/verticals/4.png',
    overlayColor: 'rgba(126, 34, 206, 0.18)',
    chipBg: '#FAF5FF',
    chipColor: '#7E22CE',
    gradient: 'linear-gradient(135deg, #7E22CE 0%, #A855F7 100%)',
    badgeColor: '#7E22CE',
  },
];

const FeaturedVerticalSpotlight = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 7 }, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="xl">

        {/* ── Section Header — compact, no placeholder text ── */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="overline"
            sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', display: 'block', mb: 1 }}
          >
            FEATURED VERTICALS
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: '24px', md: '36px' }, color: '#0F172A', mb: 1.5 }}
          >
            Our Innovation Verticals
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#64748B', maxWidth: 540, mx: 'auto', fontSize: { xs: '14px', md: '16px' } }}
          >
            Four high-impact verticals, each built to create a self-sustaining innovation ecosystem across India.
          </Typography>
          <Box sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto', mt: 2 }} />
        </Box>

        {/* ── Alternating image-left / image-right blocks ── */}
        {spotlightItems.map((item, index) => {
          const isEven = index % 2 === 0;  // even → image left, odd → image right
          const IconComp = item.icon;

          return (
            <Box
              key={item.id}
              className="reveal"
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  md: isEven ? 'row' : 'row-reverse',
                },
                alignItems: 'center',
                gap: { xs: 3, md: 6 },
                mb: { xs: 4, md: 6 },
              }}
            >

              {/* ── Image Side (40%) ── */}
              <Box
                sx={{
                  flex: { md: '0 0 40%' },
                  maxWidth: { md: '40%' },
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: { xs: '220px', sm: '280px', md: '320px' },
                    position: 'relative',
                    boxShadow: '0 20px 56px rgba(0,0,0,0.14)',
                    transition: 'transform 0.4s ease',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.tag}
                    loading="lazy"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Colour tint overlay */}
                  <Box sx={{ position: 'absolute', inset: 0, background: item.overlayColor, mixBlendMode: 'multiply' }} />

                  {/* Bottom gradient */}
                  <Box
                    sx={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: '50%',
                      background: 'linear-gradient(0deg, rgba(0,0,0,0.6), transparent)',
                    }}
                  />

                  {/* Icon badge top-left */}
                  <Box
                    sx={{
                      position: 'absolute', top: 16, left: 16,
                      width: 46, height: 46, borderRadius: '12px',
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <IconComp sx={{ fontSize: 24, color: 'white' }} />
                  </Box>

                  {/* Label at bottom */}
                  <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>
                      {item.tag}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* ── Content Side (60%) ── */}
              <Box sx={{ flex: { md: '1 1 auto' }, width: '100%' }}>
                {/* Tag chip */}
                <Chip
                  icon={<IconComp sx={{ fontSize: '15px !important', color: `${item.chipColor} !important` }} />}
                  label={item.tag}
                  size="small"
                  sx={{
                    background: item.chipBg,
                    color: item.chipColor,
                    fontWeight: 700,
                    fontSize: '12px',
                    mb: 2,
                    border: `1px solid ${item.chipColor}33`,
                    px: 0.5,
                  }}
                />

                {/* Headline */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '20px', md: '26px' },
                    color: '#0F172A',
                    lineHeight: 1.3,
                    mb: 2,
                  }}
                >
                  {item.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{ color: '#475569', lineHeight: 1.8, fontSize: { xs: '14px', md: '15px' }, mb: 3 }}
                >
                  {item.description}
                </Typography>

                {/* Accent bar */}
                <Box sx={{ width: 44, height: 3, background: item.gradient, borderRadius: 2, mb: 3 }} />

                {/* CTA */}
                <Button
                  onClick={() => navigate(item.link)}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: item.gradient,
                    color: 'white',
                    borderRadius: '10px',
                    px: 3.5,
                    py: 1.25,
                    fontWeight: 700,
                    fontSize: '14px',
                    boxShadow: `0 6px 20px ${item.badgeColor}30`,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: `0 12px 28px ${item.badgeColor}40`,
                      transform: 'translateY(-2px)',
                      background: item.gradient,
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
};

export default FeaturedVerticalSpotlight;
