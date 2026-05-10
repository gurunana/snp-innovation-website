/* ========================================
   VERTICALS GRID — Home Page Section 1.3
   DESKTOP : 4-column CSS grid
   MOBILE  : Auto-play carousel with ◀ ▶ arrows + dots
   ======================================== */

import { useState, useRef, useEffect } from 'react';
import { Box, Container, Card, CardContent, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';

import ScienceIcon      from '@mui/icons-material/Science';
import ComputerIcon     from '@mui/icons-material/Computer';
import EngineeringIcon  from '@mui/icons-material/Engineering';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon  from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Icon map
const iconMap = {
  Science:      ScienceIcon,
  Computer:     ComputerIcon,
  Engineering:  EngineeringIcon,
  RocketLaunch: RocketLaunchIcon,
};

// Color theme per card index
const colorMap = {
  1: { bg: '#EFF6FF', icon: '#1A3A8F', border: '#BFDBFE' },
  2: { bg: '#F0FDF4', icon: '#15803D', border: '#BBF7D0' },
  3: { bg: '#FFF7ED', icon: '#C2410C', border: '#FED7AA' },
  4: { bg: '#FAF5FF', icon: '#7E22CE', border: '#E9D5FF' },
};

const VerticalsGrid = ({ verticalsData = [] }) => {
  const navigate = useNavigate();

  // ── Compute derived data FIRST so hooks below can read `total` ──
  const enrichedVerticals = verticalsData.map((v) => ({
    ...v,
    IconComponent: iconMap[v.icon] || ComputerIcon,
    colors:        colorMap[v.id]  || colorMap[1],
  }));
  const total = enrichedVerticals.length;

  // ── Carousel state ───────────────────────────────────────────────
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef  = useRef(null);
  const touchStartX  = useRef(0);
  const touchEndX    = useRef(0);

  // Use a ref so the interval callback always reads the latest total
  const totalRef = useRef(total);
  useEffect(() => { totalRef.current = total; }, [total]);

  // Start / restart auto-play timer (3.5 s per slide)
  const startAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalRef.current);
    }, 3500);
  };

  // Mount: start auto-play. Unmount: clear timer.
  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  // startAutoPlay is stable (defined outside deps) — safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Navigation helpers ───────────────────────────────────────────
  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
    startAutoPlay(); // reset timer after manual tap
  };
  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    startAutoPlay();
  };
  const goTo = (idx) => {
    setActiveIndex(idx);
    startAutoPlay();
  };

  // Handle card click → navigate to vertical page
  const handleCardClick = (link) => {
    if (link) navigate(link);
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40)  goNext();
    if (diff < -40) goPrev();
  };

  return (
    <Box
      className="section-fade-top"
      sx={{ width: '100%', py: { xs: 4, md: 6 }, backgroundColor: '#FFFFFF' }}
    >
      <Container maxWidth="xl">

        {/* Section Header */}
        <SectionHeader
          title="What We Do"
          subtitle="SNP Innovation operates across four high-impact verticals, each designed to create a self-sustaining innovation ecosystem."
        />

        {/* ── DESKTOP: 4-column grid ─────────────────────────────── */}
        <Box
          sx={{
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2.5,
            mt: 3,
          }}
        >
          {enrichedVerticals.map((vertical) => (
            <VerticalCard
              key={vertical.id}
              vertical={vertical}
              onClick={() => handleCardClick(vertical.link)}
              className={`reveal reveal-delay-${vertical.id}`}
            />
          ))}
        </Box>

        {/* ── MOBILE: Auto-play carousel ─────────────────────────── */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 3 }}>

          {/* Clipping window */}
          <Box
            sx={{ overflow: 'hidden', borderRadius: '14px' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Sliding strip */}
            <Box
              sx={{
                display: 'flex',
                transition: 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateX(-${activeIndex * 100}%)`,
                willChange: 'transform',
              }}
            >
              {enrichedVerticals.map((vertical) => (
                <Box key={vertical.id} sx={{ minWidth: '100%', boxSizing: 'border-box' }}>
                  <VerticalCard
                    vertical={vertical}
                    onClick={() => handleCardClick(vertical.link)}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Controls: prev button — dots — next button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mt: 2.5,
            }}
          >
            <IconButton
              onClick={goPrev}
              size="small"
              sx={{
                width: 38, height: 38,
                backgroundColor: '#F1F5F9',
                border: '1px solid #E2E8F0',
                color: '#1A3A8F',
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: '#1A3A8F',
                  color: 'white',
                  borderColor: '#1A3A8F',
                  transform: 'scale(1.08)',
                },
              }}
            >
              <ChevronLeftIcon sx={{ fontSize: 20 }} />
            </IconButton>

            {/* Dot indicators */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {enrichedVerticals.map((v, idx) => (
                <Box
                  key={idx}
                  onClick={() => goTo(idx)}
                  sx={{
                    width:  idx === activeIndex ? '22px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: idx === activeIndex
                      ? enrichedVerticals[activeIndex].colors.icon
                      : '#CBD5E1',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>

            <IconButton
              onClick={goNext}
              size="small"
              sx={{
                width: 38, height: 38,
                backgroundColor: '#F1F5F9',
                border: '1px solid #E2E8F0',
                color: '#1A3A8F',
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: '#1A3A8F',
                  color: 'white',
                  borderColor: '#1A3A8F',
                  transform: 'scale(1.08)',
                },
              }}
            >
              <ChevronRightIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Card counter */}
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#94A3B8',
              fontWeight: 500,
              mt: 1,
            }}
          >
            {activeIndex + 1} / {total}
          </Typography>
        </Box>

        {/* Bottom CTA strip */}
        <Box
          sx={{
            mt: 3,
            p: 3,
            borderRadius: '12px',
            background: 'linear-gradient(135deg,#F8FAFC,#EFF6FF)',
            border: '1px solid #E2E8F0',
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" sx={{ color: '#475569', fontSize: '15px' }}>
            Not sure which vertical is right for you?{' '}
            <Box
              component="span"
              onClick={() => navigate('/contact')}
              sx={{
                color: '#1A3A8F',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': { color: '#CC2020' },
              }}
            >
              Talk to our team →
            </Box>
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

/* ──────────────────────────────────────────
   Sub-component: single vertical card
   Shared by desktop grid + mobile carousel
   ──────────────────────────────────────────  */
const VerticalCard = ({ vertical, onClick, className = '' }) => {
  const { IconComponent, colors } = vertical;

  return (
    <Card
      className={className}
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        border: `2px solid ${colors.border}`,
        borderRadius: '14px',
        boxShadow: 'none',
        height: '100%',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 56px rgba(0,0,0,0.10)',
          borderColor: colors.icon,
          '& .icon-circle': { transform: 'scale(1.15) rotate(5deg)' },
          '& .learn-more':  { gap: '12px', color: colors.icon },
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 3, md: 3.5 },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Icon box */}
        <Box
          className="icon-circle"
          sx={{
            width: 68, height: 68,
            borderRadius: '18px',
            backgroundColor: colors.bg,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2.5,
            flexShrink: 0,
            transition: 'transform 0.35s ease',
          }}
        >
          <IconComponent sx={{ fontSize: 34, color: colors.icon }} />
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '18px', md: '19px' },
            color: '#0F172A',
            mb: 1.5,
            lineHeight: 1.35,
          }}
        >
          {vertical.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#475569',
            lineHeight: 1.75,
            fontSize: '14px',
            flexGrow: 1,
            mb: 3,
          }}
        >
          {vertical.description}
        </Typography>

        {/* Learn More */}
        <Box
          className="learn-more"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748B',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 0.3s ease',
          }}
        >
          Learn More <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default VerticalsGrid;
