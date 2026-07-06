/* ========================================
   CLIENT & PARTNER LOGOS — Home Page Section 1.6
   Continuous scrolling carousel of real client/partner logos
   ======================================== */

import { Box, Container, Typography } from '@mui/material';

// Real client / associate logos located in /public/images/gallery/client n associate logos/
// Path uses URL-encoded spaces so the browser can fetch correctly.
const LOGO_DIR = '/images/gallery/client%20n%20associate%20logos';

const LOGOS = [
  { src: `${LOGO_DIR}/17501801224914744.jpeg`,           alt: 'Client Logo 1' },
  { src: `${LOGO_DIR}/Successive_Technologies_Logo.jpg`, alt: 'Successive Technologies' },
  { src: `${LOGO_DIR}/download%20(2).png`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(3).jpg`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(3).png`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(4).png`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(5).png`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(6).jpg`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(6).png`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(7).jpg`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(7).png`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(8).jpg`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(8).png`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(9).jpg`,               alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(10).jpg`,              alt: 'Partner' },
  { src: `${LOGO_DIR}/download%20(11).jpg`,              alt: 'Partner' },
];

const ClientLogos = () => {
  // Duplicate the array so the marquee can scroll seamlessly
  const scrollingLogos = [...LOGOS, ...LOGOS];

  // Each logo card is 200px wide + 24px gap = 224px. Translate by full set width.
  const trackWidth = LOGOS.length * 224;

  return (
    <Box sx={{ width: '100%', paddingY: { xs: 4, md: 6 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="xl">

        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
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

        {/* Continuous scrolling logo strip */}
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
              width: 'max-content',
              animation: `logoScroll ${LOGOS.length * 3}s linear infinite`,
              '&:hover': { animationPlayState: 'paused' },
              '@keyframes logoScroll': {
                '0%':   { transform: 'translateX(0)' },
                '100%': { transform: `translateX(-${trackWidth}px)` },
              },
            }}
          >
            {scrollingLogos.map((logo, i) => (
              <Box
                key={i}
                sx={{
                  flexShrink: 0,
                  width: '200px',
                  height: '110px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'white',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  filter: 'grayscale(40%)',
                  opacity: 0.85,
                  '&:hover': {
                    borderColor: '#1A3A8F',
                    boxShadow: '0 8px 20px rgba(26,58,143,0.15)',
                    transform: 'scale(1.05)',
                    filter: 'grayscale(0%)',
                    opacity: 1,
                  },
                }}
              >
                <Box
                  component="img"
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
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
