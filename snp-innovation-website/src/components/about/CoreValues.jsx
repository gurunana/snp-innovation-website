/* ========================================
   CORE VALUES — About Page Section 2.4
   PDF: 6 exact values — Innovation First, Collaboration, Practical Impact,
        Inclusivity, Excellence, Scalability
   Layout: 3×2 card grid
   ======================================== */

import { Box, Container, Card, CardContent, Typography } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Icon + colour map — one per value
const VALUE_CONFIG = [
  { icon: LightbulbIcon, gradient: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)', light: '#EFF6FF', border: '#BFDBFE' },
  { icon: PeopleIcon, gradient: 'linear-gradient(135deg,#15803D,#22C55E)', light: '#F0FDF4', border: '#BBF7D0' },
  { icon: BuildIcon, gradient: 'linear-gradient(135deg,#C2410C,#CC2020)', light: '#FFF7ED', border: '#FED7AA' },
  { icon: PublicIcon, gradient: 'linear-gradient(135deg,#7E22CE,#A855F7)', light: '#FAF5FF', border: '#E9D5FF' },
  { icon: EmojiEventsIcon, gradient: 'linear-gradient(135deg,#0369A1,#0EA5E9)', light: '#F0F9FF', border: '#BAE6FD' },
  { icon: TrendingUpIcon, gradient: 'linear-gradient(135deg,#B45309,#F59E0B)', light: '#FFFBEB', border: '#FDE68A' },
];

const CoreValues = ({ valuesData = [] }) => {

  // Fallback from PDF exact 2.4 content
  const defaultValues = [
    { id: 1, title: 'Innovation First', description: "We challenge convention. Every solution starts with 'why not?'" },
    { id: 2, title: 'Collaboration', description: 'We grow together — with clients, institutions, and our teams.' },
    { id: 3, title: 'Practical Impact', description: 'Theory without application is incomplete. We build real-world skills.' },
    { id: 4, title: 'Inclusivity', description: 'From metro schools to rural communities, we bring innovation to all.' },
    { id: 5, title: 'Excellence', description: 'Highest quality in every lab, every deployment, every prototype.' },
    { id: 6, title: 'Scalability', description: 'Solutions built to grow — from one school to a national network.' },
  ];

  const values = valuesData.length > 0 ? valuesData : defaultValues;

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 7 }, background: 'linear-gradient(135deg,#F8FAFC 0%,#EFF6FF 100%)' }}>
      <Container maxWidth="xl">

        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}>
            WHAT DRIVES US
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', mb: 2 }}
          >
            Our Core Values
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#64748B', maxWidth: 520, mx: 'auto', fontSize: '16px', mb: 3 }}
          >
            The six principles that guide every decision, every deployment, and every partnership.
          </Typography>
          <Box sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto' }} />
        </Box>

        {/* 3×2 Card Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {values.map((value, index) => {
            const config = VALUE_CONFIG[index % VALUE_CONFIG.length];
            const IconComp = config.icon;

            return (
                <Card
                  key={value.id}
                  sx={{
                    height: '100%',
                    width: '100%',
                    background: 'white',
                    border: `1px solid ${config.border}`,
                    borderRadius: '18px',
                    boxShadow: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 24px 56px rgba(0,0,0,0.1)',
                      '& .value-icon-bg': { transform: 'scale(1.12) rotate(5deg)' },
                    },
                    // Top colour accent
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: '4px',
                      background: config.gradient,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3.5, md: 4 }, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Step number */}
                    <Typography
                      sx={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        color: '#94A3B8',
                        mb: 2,
                      }}
                    >
                      VALUE {String(index + 1).padStart(2, '0')}
                    </Typography>

                    {/* Icon circle */}
                    <Box
                      className="value-icon-bg"
                      sx={{
                        width: 72, height: 72,
                        borderRadius: '20px',
                        background: config.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: `0 12px 28px ${config.border}`,
                        transition: 'transform 0.35s ease',
                      }}
                    >
                      <IconComp sx={{ fontSize: 36, color: 'white' }} />
                    </Box>

                    {/* Title — exact from PDF */}
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 800, fontSize: '18px', color: '#0F172A', mb: 1.5 }}
                    >
                      {value.title}
                    </Typography>

                    {/* Description — exact from PDF */}
                    <Typography
                      variant="body2"
                      sx={{ color: '#475569', lineHeight: 1.75, fontSize: '14px', flexGrow: 1 }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default CoreValues;
