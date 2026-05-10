/* ========================================
   LAB INFO - What is a SNP STEM Innovation Lab?
   Fully integrated, curriculum-aligned, plug-and-play
   learning environment. 6 feature bullet points + image.
   PDF Section 3.3
   ======================================== */

import { Box, Typography, Container, Chip } from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import BuildIcon from '@mui/icons-material/Build';
import SchoolIcon from '@mui/icons-material/School';
import DevicesIcon from '@mui/icons-material/Devices';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

// Features defined outside return — no logic in JSX
const features = [
  {
    id: 1,
    icon: BuildIcon,
    title: 'Modular & Scalable',
    description: 'Purpose-built modular units that grow with your institution — from a single classroom kit to a full innovation floor.',
    color: '#2D5BE3',
    bg: '#EFF6FF',
  },
  {
    id: 2,
    icon: SchoolIcon,
    title: 'Age-Appropriate Design',
    description: 'Carefully curated learning experiences from Class 5 to postgraduate — meeting students exactly where they are.',
    color: '#8B5CF6',
    bg: '#F5F3FF',
  },
  {
    id: 3,
    icon: DevicesIcon,
    title: 'Technology-Integrated',
    description: 'Robotics, AI, IoT, Electronics, Coding & Automation all under one roof — real tools for real-world learning.',
    color: '#F59E0B',
    bg: '#FFFBEB',
  },
  {
    id: 4,
    icon: AutoStoriesIcon,
    title: 'Pedagogically Sound',
    description: 'Built on Project-Based Learning & Design Thinking — students solve genuine problems, not just textbook exercises.',
    color: '#10B981',
    bg: '#ECFDF5',
  },
  {
    id: 5,
    icon: PeopleAltIcon,
    title: 'Teacher-Ready',
    description: 'Comprehensive teacher training programme included — your faculty become confident STEM facilitators from day one.',
    color: '#EF4444',
    bg: '#FEF2F2',
  },
  {
    id: 6,
    icon: AccountTreeIcon,
    title: 'Curriculum-Aligned',
    description: 'Fully mapped to CBSE, ICSE, IGCSE & NEP 2020 — seamless integration with existing school timetables.',
    color: '#06B6D4',
    bg: '#ECFEFF',
  },
];

// Board alignment chips
const boards = ['CBSE', 'ICSE', 'IGCSE', 'NEP 2020', 'State Boards'];

const LabInfo = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#fff' }}>
      <Container maxWidth="xl">
        <SectionHeader
          title="What Is a SNP STEM Innovation Lab?"
          subtitle="A fully integrated, curriculum-aligned, plug-and-play learning environment built to deliver world-class hands-on STEM education."
        />

        <Grid container spacing={4} sx={{ mt: 1 }} alignItems="stretch">
          {/* Left: image + quick facts */}
          <Grid item xs={12} md={5}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Main image */}
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(59,130,246,0.15)',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src="https://picsum.photos/seed/snp-stem-lab/800/500"
                  alt="SNP STEM Innovation Lab"
                  sx={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 50%)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: '#fff', fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}
                  >
                    Built for Every Learner
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', mt: 0.5 }}>
                    Class 5 → Postgraduate Level
                  </Typography>
                </Box>
              </Box>

              {/* Board alignment */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)',
                  border: '1px solid #E5E7EB',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: '#1F2937', mb: 1.5, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                >
                  Curriculum Aligned With
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {boards.map((board) => (
                    <Chip
                      key={board}
                      label={board}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: '12px',
                        backgroundColor: '#2D5BE3',
                        color: '#fff',
                        borderRadius: '20px',
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Quick stat row */}
              <Grid container spacing={2}>
                {[
                  { value: '500+', label: 'Labs Deployed' },
                  { value: '20+', label: 'States Covered' },
                  { value: '1L+', label: 'Students Reached' },
                ].map((stat) => (
                  <Grid item xs={4} key={stat.label}>
                    <Box
                      sx={{
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, color: '#2D5BE3', fontSize: '22px' }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '11px' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {/* Right: 6 feature cards — 2 cols from xs up */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {features.map((feat) => {
                const IconComp = feat.icon;
                return (
                  <Grid item xs={6} key={feat.id}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: feat.bg,
                        border: `1px solid ${feat.color}22`,
                        height: '100%',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'flex-start',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 12px 30px ${feat.color}25`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: 1.5,
                          backgroundColor: feat.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: `0 4px 10px ${feat.color}40`,
                        }}
                      >
                        <IconComp sx={{ color: '#fff', fontSize: 20 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: '#1F2937', fontSize: '14px', mb: 0.5 }}
                      >
                        {feat.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.65 }}
                      >
                        {feat.description}
                      </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LabInfo;
