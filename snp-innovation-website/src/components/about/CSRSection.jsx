/* ========================================
   CSR & SOCIAL IMPACT — About Page Section 2.7
   PDF: "Image + stats + impact stories"
   4 bullet points verbatim from PDF + 4 impact stats
   ======================================== */

import { Box, Container, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DevicesIcon from '@mui/icons-material/Devices';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Icon map for CSR initiatives
const CSR_ICONS = {
  School: SchoolIcon,
  PrecisionManufacturing: PrecisionManufacturingIcon,
  Devices: DevicesIcon,
  EmojiPeople: EmojiPeopleIcon,
};

const CSRSection = ({ csrData = {} }) => {

  // Fallback — exact bullet points from PDF 2.7
  const defaultCsr = {
    title: 'CSR & Social Impact',
    tagline: 'Technology should be a force for equity — not just efficiency.',
    description:
      'At SNP Innovation, we believe that technology should be a force for equity — not just efficiency. Through our foundation-led social initiatives, we have:',
    initiatives: [
      { id: 1, text: 'Supported rural and underserved schools with STEM innovation infrastructure', icon: 'School' },
      { id: 2, text: 'Conducted free robotics and coding workshops for underprivileged students', icon: 'PrecisionManufacturing' },
      { id: 3, text: 'Promoted skill development and digital literacy in remote communities', icon: 'Devices' },
      { id: 4, text: 'Sponsored young innovators and student entrepreneurs from Tier 2 & 3 cities', icon: 'EmojiPeople' },
    ],
    stats: [
      { value: '50+', label: 'Rural Schools Reached' },
      { value: '5,000+', label: 'Students Impacted' },
      { value: '20+', label: 'Cities Covered' },
      { value: '100+', label: 'Free Workshops' },
    ],
  };

  const csr = (csrData && csrData.initiatives) ? csrData : defaultCsr;

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 4, md: 7 },
        backgroundColor: '#FFFFFF',
      }}
    >
      <Container maxWidth="xl">

        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}>
            GIVING BACK
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', mb: 2 }}
          >
            CSR & Social Impact
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 560, mx: 'auto', fontSize: '16px', mb: 3 }}>
            {csr.tagline}
          </Typography>
          <Box sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto' }} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'stretch',
          }}
        >

          {/* ── LEFT: CSR image ── */}
          <Box sx={{ position: 'relative', display: 'flex' }}>
            <Box
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                width: '100%',
                minHeight: { xs: '280px', md: '100%' },
                boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="/images/gallery/headers/Impact.jpg"
                alt="SNP Innovation CSR — Rural STEM Labs"
                loading="lazy"
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Bottom gradient for text legibility */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '40%',
                  background: 'linear-gradient(0deg,rgba(0,0,0,0.65),transparent)',
                }}
              />

              {/* Heart icon overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 20, left: 20,
                  width: 52, height: 52,
                  borderRadius: '14px',
                  background: 'rgba(249,115,22,0.92)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <FavoriteIcon sx={{ fontSize: 28, color: 'white' }} />
              </Box>

              {/* Bottom label */}
              <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '16px' }}>
                  Social Innovation in Action
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', mt: 0.3 }}>
                  Reaching every corner of India
                </Typography>
              </Box>

              {/* Stat badge — moved inside image, top-right */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 20, right: 20,
                  background: 'white',
                  borderRadius: '14px',
                  px: 2, py: 1.5,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: '22px', color: '#CC2020', lineHeight: 1 }}>
                  5,000+
                </Typography>
                <Typography sx={{ fontSize: '11px', color: '#64748B', fontWeight: 600, mt: 0.3 }}>
                  Students Impacted
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── RIGHT: Text + initiatives ── */}
          <Box>
            <Box sx={{ pl: { xs: 0, md: 2 } }}>

              {/* Intro text — exact from PDF */}
              <Typography
                variant="body1"
                sx={{ color: '#475569', lineHeight: 1.85, fontSize: '16px', mb: 4 }}
              >
                {csr.description}
              </Typography>

              {/* 4 bullet points — exact verbatim from PDF */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
                {csr.initiatives.map((item) => {
                  const IconComp = CSR_ICONS[item.icon] || CheckCircleIcon;
                  return (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2.5,
                        p: 2.5,
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg,#FFF7ED,#FFFBEB)',
                        border: '1px solid #FED7AA',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#CC2020',
                          transform: 'translateX(6px)',
                          boxShadow: '0 8px 24px rgba(249,115,22,0.1)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 44, height: 44,
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg,#C2410C,#CC2020)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 6px 16px rgba(249,115,22,0.25)',
                        }}
                      >
                        <IconComp sx={{ fontSize: 22, color: 'white' }} />
                      </Box>
                      <Typography
                        sx={{ color: '#334155', fontSize: '15px', lineHeight: 1.7, fontWeight: 500, mt: 0.5 }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Impact stats strip */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 2,
                }}
              >
                {csr.stats.map((stat, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2.5,
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg,#0F172A,#0F2560)',
                      textAlign: 'center',
                    }}
                  >
                    <Typography sx={{ fontWeight: 900, fontSize: '26px', color: '#CC2020', lineHeight: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 500, mt: 0.5 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CSRSection;
