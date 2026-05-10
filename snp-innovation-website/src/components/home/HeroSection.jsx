/* ========================================
   HERO SECTION — Home Page Section 1.1
   PDF: "Full-width Banner / Animated Slider"
   Layout: Left column = text + CTAs | Right column = hero image
   ======================================== */

import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
import EngineeringIcon from '@mui/icons-material/Engineering';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Hero banner images — auto-cycling slideshow
const HERO_IMAGES = [
  '/images/gallery/homePageImages/HomePageBanner1.png',
  '/images/gallery/homePageImages/HomePageBanner2.png',
  '/images/gallery/homePageImages/HomePageBanner3.png',
];

// Floating stat badges shown on top of hero image
const HERO_STATS = [
  { value: '500+', label: 'IT Professionals', color: '#1A3A8F' },
  { value: '150+', label: 'Labs Installed', color: '#15803D' },
  { value: '30+', label: 'Startups Supported', color: '#C2410C' },
];

// Vertical tags shown below headline
const VERTICAL_TAGS = [
  { label: 'EdTech & STEM', icon: ScienceIcon, color: '#1A3A8F' },
  { label: 'IT Resourcing', icon: ComputerIcon, color: '#15803D' },
  { label: 'R&D & Automation', icon: EngineeringIcon, color: '#C2410C' },
  { label: 'Incubation', icon: RocketLaunchIcon, color: '#7E22CE' },
];

const HeroSection = ({ heroData }) => {
  const { headline = 'Empowering the Next Generation of Innovators', subHeadline = '' } = heroData || {};
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();

  // Fade-in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through hero images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll down to next section smoothly
  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '65vh', md: '85vh' },
        backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.78) 0%, rgba(15,37,96,0.72) 55%, rgba(26,58,143,0.70) 100%), url('/images/gallery/homePageImages/HomePageHeader.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Background decorative circles ── */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Top-right glow */}
        <Box
          sx={{
            position: 'absolute',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
            borderRadius: '50%',
            top: '-200px', right: '-200px',
            animation: 'slowFloat 10s ease-in-out infinite',
            '@keyframes slowFloat': {
              '0%,100%': { transform: 'translate(0,0)' },
              '50%': { transform: 'translate(-30px,30px)' },
            },
          }}
        />
        {/* Bottom-left glow */}
        <Box
          sx={{
            position: 'absolute',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(249,115,22,0.1), transparent 70%)',
            borderRadius: '50%',
            bottom: '-100px', left: '-100px',
            animation: 'slowFloat 12s ease-in-out infinite reverse',
            '@keyframes slowFloat': {
              '0%,100%': { transform: 'translate(0,0)' },
              '50%': { transform: 'translate(30px,-30px)' },
            },
          }}
        />

        {/* Subtle grid lines */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              left: 0, right: 0,
              top: `${(i + 1) * 16}%`,
              height: '1px',
              background: 'rgba(255,255,255,0.04)',
            }}
          />
        ))}

        {/* Floating dots */}
        {[...Array(12)].map((_, i) => (
          <Box
            key={`dot-${i}`}
            sx={{
              position: 'absolute',
              width: `${3 + (i % 4)}px`,
              height: `${3 + (i % 4)}px`,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: '50%',
              top: `${(i * 13 + 5) % 90}%`,
              left: `${(i * 17 + 5) % 95}%`,
              animation: `twinkle ${2.5 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
              '@keyframes twinkle': {
                '0%,100%': { opacity: 0.1 },
                '50%': { opacity: 0.4 },
              },
            }}
          />
        ))}
      </Box>

      {/* ── Main content ── */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 5 } }}>
        {/* Flexbox row — left 58% text, right 42% image. Stacks on mobile. */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
            minHeight: { md: '82vh' },
          }}
        >
          {/* ── LEFT: Text + CTAs ── */}
          <Box sx={{ flex: { md: '0 0 58%' }, maxWidth: { md: '58%' }, width: '100%' }}>
            <Box
              sx={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s ease',
              }}
            >
              {/* Tag pill */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2, py: 0.8,
                  background: 'rgba(249,115,22,0.15)',
                  border: '1px solid rgba(249,115,22,0.35)',
                  borderRadius: '100px',
                  mb: 3,
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#CC2020', animation: 'pulse 2s infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }} />
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#FED7AA', letterSpacing: '0.5px' }}>
                  India's Innovation Infrastructure Company
                </Typography>
              </Box>

              {/* Headline */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '34px', sm: '46px', md: '56px', lg: '64px' },
                  fontWeight: 900,
                  lineHeight: 1.12,
                  mb: 3,
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #BFDBFE 60%, #93C5FD 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {headline}
              </Typography>

              {/* Sub-headline */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '16px', md: '18px' },
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.78)',
                  mb: 4,
                  maxWidth: '560px',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'all 0.8s ease 0.15s',
                }}
              >
                {subHeadline || "Bridging the gap between Education, Industry, Research & Startups through cutting-edge technology solutions."}
              </Typography>

              {/* Vertical tags */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  mb: 5,
                  opacity: isLoaded ? 1 : 0,
                  transition: 'all 0.8s ease 0.25s',
                }}
              >
                {VERTICAL_TAGS.map((tag) => {
                  const IconComp = tag.icon;
                  return (
                    <Box
                      key={tag.label}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                        px: 1.8,
                        py: 0.6,
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.85)',
                        cursor: 'default',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: `${tag.color}33`,
                          borderColor: `${tag.color}77`,
                        },
                      }}
                    >
                      <IconComp sx={{ fontSize: 15, color: tag.color }} />
                      {tag.label}
                    </Box>
                  );
                })}
              </Box>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: { xs: 6, md: 0 },
                  opacity: isLoaded ? 1 : 0,
                  transition: 'all 0.8s ease 0.35s',
                }}
              >
                {/* Primary CTA — pulse animation draws the eye */}
                <Box
                  component="button"
                  className="btn-pulse"
                  onClick={() => navigate('/edtech')}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: '28px', py: '14px',
                    background: 'linear-gradient(135deg, #CC2020, #E53535)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 16px 32px rgba(249,115,22,0.45)',
                    },
                  }}
                >
                  Explore Our Solutions
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Box>

                {/* Secondary CTA */}
                <Box
                  component="button"
                  onClick={() => navigate('/enquiry')}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: '28px', py: '14px',
                    background: 'transparent',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.5)',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.1)',
                      borderColor: 'white',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <CalendarMonthIcon sx={{ fontSize: 18 }} />
                  Book a Free Demo
                </Box>

                {/* Text CTA */}
                <Box
                  component="button"
                  onClick={() => navigate('/contact')}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: '16px', py: '14px',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.8)',
                    border: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': { color: 'white', gap: 2 },
                  }}
                >
                  Partner With Us →
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ── RIGHT: Hero image with floating stat badges ── */}
          <Box
            sx={{
              flex: { md: '0 0 42%' },
              maxWidth: { md: '42%' },
              width: '100%',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.9s ease 0.2s',
            }}
          >
            <Box sx={{ position: 'relative' }}>
              {/* Main hero image — cycling through 3 dummy images */}
              <Box
                sx={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  height: { xs: '300px', sm: '380px', md: '480px' },
                  position: 'relative',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {HERO_IMAGES.map((src, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={src}
                    alt={`SNP Innovation Lab ${idx + 1}`}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: activeImage === idx ? 1 : 0,
                      transition: 'opacity 1s ease',
                    }}
                  />
                ))}

                {/* Dark gradient overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)',
                    zIndex: 1,
                  }}
                />

                {/* Image slide indicators */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                    zIndex: 2,
                  }}
                >
                  {HERO_IMAGES.map((_, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      sx={{
                        width: activeImage === idx ? '20px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: activeImage === idx ? '#CC2020' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* ── Floating stat badge — top left ── */}
              <Box
                className="badge-float"
                sx={{
                  position: 'absolute',
                  top: { xs: -16, md: -20 },
                  left: { xs: 16, md: -24 },
                  background: 'white',
                  borderRadius: '14px',
                  px: 2.5,
                  py: 1.5,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                  zIndex: 3,
                  minWidth: '130px',
                  animationDelay: '0s',
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: '22px', color: '#1A3A8F', lineHeight: 1 }}>
                  500+
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#64748B', fontWeight: 500, mt: 0.3 }}>
                  IT Professionals Deployed
                </Typography>
              </Box>

              {/* ── Floating stat badge — bottom right ── */}
              <Box
                className="badge-float"
                sx={{
                  position: 'absolute',
                  bottom: { xs: -16, md: -20 },
                  right: { xs: 16, md: -24 },
                  background: 'white',
                  borderRadius: '14px',
                  px: 2.5,
                  py: 1.5,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                  zIndex: 3,
                  minWidth: '130px',
                  animationDelay: '1.4s',
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: '22px', color: '#CC2020', lineHeight: 1 }}>
                  150+
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#64748B', fontWeight: 500, mt: 0.3 }}>
                  STEM Labs Installed
                </Typography>
              </Box>

              {/* ── Floating badge — middle right ── */}
              <Box
                className="badge-float"
                sx={{
                  position: 'absolute',
                  top: '40%',
                  right: { xs: 16, md: -28 },
                  background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
                  borderRadius: '14px',
                  px: 2,
                  py: 1.5,
                  boxShadow: '0 12px 32px rgba(30,64,175,0.4)',
                  zIndex: 3,
                  display: { xs: 'none', md: 'block' },
                  animationDelay: '0.7s',
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1 }}>
                  30+
                </Typography>
                <Typography sx={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', fontWeight: 500, mt: 0.3 }}>
                  Startups Supported
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Scroll down indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 24, md: 32 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            opacity: 0.6,
            transition: 'opacity 0.3s ease',
            '&:hover': { opacity: 1 },
          }}
          onClick={handleScrollDown}
        >
          <Typography sx={{ fontSize: '11px', fontWeight: 600, letterSpacing: '2px', color: 'white' }}>
            SCROLL
          </Typography>
          <Box
            sx={{
              animation: 'bounce 2s ease-in-out infinite',
              '@keyframes bounce': {
                '0%,100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(8px)' },
              },
            }}
          >
            <ArrowDownwardIcon sx={{ color: 'white', fontSize: 22 }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
