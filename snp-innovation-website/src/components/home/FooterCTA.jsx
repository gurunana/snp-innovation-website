/* ========================================
   FOOTER CTA - Home Page Section 1.9
   PDF Content: "Ready to Build Your Innovation Ecosystem?"
   3 CTAs: Schedule a Free Consultation, Send Us Your Requirement, Visit Our Innovation Hub
   ======================================== */

import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SendIcon from '@mui/icons-material/Send';

const FooterCTA = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // CTA actions — logic defined outside return
  const ctaItems = [
    {
      icon: CalendarMonthIcon,
      label: 'Schedule a Free Consultation',
      action: () => navigate('/enquiry'),
      style: 'filled', // white filled button
    },
    {
      icon: SendIcon,
      label: 'Send Us Your Requirement',
      action: () => navigate('/enquiry'),
      style: 'outlined', // white outlined
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        paddingY: { xs: 5, md: 8 },
        background: 'linear-gradient(135deg, #0F172A 0%, #0F2560 50%, #1A3A8F 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background particles */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {[...Array(18)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: `${3 + (i % 5)}px`,
              height: `${3 + (i % 5)}px`,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '50%',
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              animation: `floatParticle ${4 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              '@keyframes floatParticle': {
                '0%, 100%': { transform: 'translateY(0)', opacity: 0.08 },
                '50%': { transform: 'translateY(-20px)', opacity: 0.2 },
              },
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

        {/* Headline — exact from PDF */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '26px', sm: '36px', md: '48px' },
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 3,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          "Ready to Build Your Innovation Ecosystem?"
        </Typography>

        {/* Description — exact from PDF */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '15px', md: '18px' },
            fontWeight: 400,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '780px',
            marginX: 'auto',
            marginBottom: 6,
            lineHeight: 1.8,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.15s',
          }}
        >
          Whether you are a school looking to set up a future-ready STEM lab, a company needing
          skilled tech talent, a researcher seeking end-to-end R&D support, or a startup with a
          big idea — SNP Innovation is your partner in progress.
        </Typography>

        {/* 3 CTA Buttons — exactly as in PDF */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 2, sm: 3 },
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.3s',
          }}
        >
          {ctaItems.map((cta, index) => {
            const IconComp = cta.icon;

            // Filled style button
            if (cta.style === 'filled') {
              return (
                <Box
                  key={index}
                  component="button"
                  onClick={cta.action}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                    padding: '14px 32px',
                    background: 'white',
                    color: '#0F172A',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 16px 32px rgba(0,0,0,0.25)',
                      background: '#F0F9FF',
                    },
                  }}
                >
                  <IconComp sx={{ fontSize: 20 }} />
                  {cta.label}
                </Box>
              );
            }

            // Outlined style button
            if (cta.style === 'outlined') {
              return (
                <Box
                  key={index}
                  component="button"
                  onClick={cta.action}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                    padding: '14px 32px',
                    background: 'transparent',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.7)',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.1)',
                      borderColor: 'white',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <IconComp sx={{ fontSize: 20 }} />
                  {cta.label}
                </Box>
              );
            }

            // Text link style
            return (
              <Box
                key={index}
                component="button"
                onClick={cta.action}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: '14px 24px',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.85)',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.3)',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    color: 'white',
                    borderBottomColor: 'white',
                    gap: 2,
                  },
                }}
              >
                <IconComp sx={{ fontSize: 18 }} />
                {cta.label} →
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default FooterCTA;
