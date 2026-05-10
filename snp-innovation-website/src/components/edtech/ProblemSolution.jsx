/* ========================================
   PROBLEM SOLUTION - Split screen layout
   Left: The Problem  |  Right: Our Solution
   With dummy images and content from PDF 3.2
   ======================================== */

import { Box, Typography, Container } from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';

// Data defined outside return — no logic in JSX
const problems = [
  'Students study technology but never actually build anything real',
  'Schools lack hands-on STEM infrastructure for practical learning',
  'Teachers trained in theory but not in modern pedagogy or tools',
  'Robotics, AI & IoT remain inaccessible to the majority of students',
  'Graduates know concepts but cannot apply them in real-world settings',
];

const solutionText =
  'We design, deploy, and sustain complete STEM Innovation Lab ecosystems — so that every student, from Class 5 to postgraduate level, gets access to real technology, real projects, and real problem-solving experiences.';

const solutionPoints = [
  'End-to-end lab design, deployment & annual maintenance',
  'Curriculum-aligned kits from basic electronics to industrial IoT',
  'Pedagogically trained faculty support & continuous teacher upskilling',
  'Affordable plug-and-play packages ready in 4–8 weeks',
  'Scalable for 20 to 100+ students across all board curricula',
];

const ProblemSolution = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#F8FAFC' }}>
      <Container maxWidth="xl">
        <SectionHeader
          title="The Problem We Solve"
          subtitle="Bridging the gap between theoretical knowledge and real-world technology skills"
        />

        <Grid container spacing={0} sx={{ mt: 4, borderRadius: 4, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.1)' }}>

          {/* ── Left: Problem Panel ── */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Problem image */}
              <Box
                sx={{
                  position: 'relative',
                  height: 180,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src="https://picsum.photos/seed/edtech-problem/800/500"
                  alt="The STEM Education Challenge"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.55)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(220,38,38,0.7) 0%, rgba(153,27,27,0.85) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 48, mb: 1 }}>⚠️</Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '22px', md: '28px' }, letterSpacing: '-0.5px' }}
                    >
                      The Challenge
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', mt: 1 }}>
                      Why STEM education is falling short
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Problem list */}
              <Box
                sx={{
                  flex: 1,
                  background: 'linear-gradient(160deg, #FEF2F2 0%, #FFF7F7 100%)',
                  p: { xs: 2.5, md: 3.5 },
                }}
              >
                {problems.map((point, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      mb: 1.5,
                      pb: 1.5,
                      borderBottom: idx < problems.length - 1 ? '1px solid rgba(239,68,68,0.15)' : 'none',
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    >
                      <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>✕</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#374151', lineHeight: 1.65, fontSize: '14px' }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* ── Right: Solution Panel ── */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Solution image */}
              <Box
                sx={{
                  position: 'relative',
                  height: 180,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src="https://picsum.photos/seed/edtech-solution/800/500"
                  alt="SNP STEM Lab Solution"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.55)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.7) 0%, rgba(5,150,105,0.85) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 48, mb: 1 }}>🚀</Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '22px', md: '28px' }, letterSpacing: '-0.5px' }}
                    >
                      Our Solution
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', mt: 1 }}>
                      End-to-end STEM Lab ecosystems
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Solution content */}
              <Box
                sx={{
                  flex: 1,
                  background: 'linear-gradient(160deg, #F0FDF4 0%, #F7FEFF 100%)',
                  p: { xs: 2.5, md: 3.5 },
                }}
              >
                {/* Solution statement */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    mb: 2,
                    boxShadow: '0 8px 20px rgba(5,150,105,0.25)',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#fff',
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      fontSize: '13.5px',
                    }}
                  >
                    "{solutionText}"
                  </Typography>
                </Box>

                {/* Solution bullet points */}
                {solutionPoints.map((point, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      mb: 1.5,
                      pb: 1.5,
                      borderBottom: idx < solutionPoints.length - 1 ? '1px solid rgba(16,185,129,0.15)' : 'none',
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    >
                      <Typography sx={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>✓</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#374151', lineHeight: 1.65, fontSize: '14px' }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProblemSolution;
