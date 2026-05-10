/* ========================================
   CAREERS BANNER — Page 9 hero section
   ======================================== */

import { Box, Container, Typography } from '@mui/material';

const CareersBanner = () => (
  <Box
    sx={{
      minHeight: { xs: '160px', md: '280px' },
      background: 'linear-gradient(135deg,#0F172A 0%,#0F2560 50%,#1A3A8F 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Background image */}
    <Box
      component="img"
      src="https://picsum.photos/seed/snp-careers-banner/1400/500"
      alt="Careers Banner"
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }}
    />
    {/* Dark overlay */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg,rgba(15,23,42,0.9),rgba(30,64,175,0.75))',
      }}
    />

    {/* Floating dots */}
    {[...Array(10)].map((_, i) => (
      <Box
        key={i}
        sx={{
          position: 'absolute',
          width: `${3 + (i % 4)}px`,
          height: `${3 + (i % 4)}px`,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          top: `${(i * 13 + 5) % 90}%`,
          left: `${(i * 17 + 5) % 95}%`,
          animation: `twinkleC ${2.5 + (i % 3)}s ease-in-out infinite`,
          '@keyframes twinkleC': { '0%,100%': { opacity: 0.1 }, '50%': { opacity: 0.45 } },
        }}
      />
    ))}

    <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
      <Box sx={{ textAlign: 'center', px: 2 }}>
        {/* Breadcrumb pill */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 2, py: 0.6,
            background: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.35)',
            borderRadius: '100px',
            mb: 3,
            fontSize: '12px',
            fontWeight: 600,
            color: '#FED7AA',
            letterSpacing: '1px',
          }}
        >
          HOME / CAREERS
        </Box>

        {/* Main headline */}
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '26px', sm: '38px', md: '52px' },
            fontWeight: 900,
            lineHeight: 1.15,
            background: 'linear-gradient(135deg,#FFFFFF,#BFDBFE)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            letterSpacing: '-1px',
          }}
        >
          BUILD YOUR CAREER AT THE INTERSECTION OF<br />
          EDUCATION, TECHNOLOGY &amp; INNOVATION
        </Typography>

        {/* Sub-headline */}
        <Typography
          sx={{
            fontSize: { xs: '15px', md: '18px' },
            color: 'rgba(255,255,255,0.78)',
            maxWidth: '620px',
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          At SNP Innovation, we don&apos;t just hire people — we grow innovators.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default CareersBanner;
