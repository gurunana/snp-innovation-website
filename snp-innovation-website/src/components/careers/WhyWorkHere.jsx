/* ========================================
   WHY WORK HERE — 6 exact reasons from the spec
   ======================================== */

import { Box, Container, Card, CardContent, Typography } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import PublicIcon from '@mui/icons-material/Public';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const REASONS = [
  {
    id: 1,
    icon: RocketLaunchIcon,
    title: 'Real Impact Projects',
    body: 'Work on real impact projects — labs, products, startups, R&D. Your contributions ship into schools, industries, and communities.',
    gradient: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)',
    border: '#BFDBFE',
  },
  {
    id: 2,
    icon: SchoolIcon,
    title: 'Continuous Learning',
    body: 'Continuous learning — workshops, mentorship, exposure to all 4 verticals: EdTech, IT Resourcing, R&D, and Incubation.',
    gradient: 'linear-gradient(135deg,#15803D,#22C55E)',
    border: '#BBF7D0',
  },
  {
    id: 3,
    icon: PublicIcon,
    title: 'National & International Exposure',
    body: 'National and international project exposure — from rural India to global innovation forums and partnerships.',
    gradient: 'linear-gradient(135deg,#7E22CE,#A855F7)',
    border: '#E9D5FF',
  },
  {
    id: 4,
    icon: AccountBalanceIcon,
    title: "India's Innovation Infrastructure",
    body: "Be part of India's innovation infrastructure movement — helping build the systems that will power the next generation.",
    gradient: 'linear-gradient(135deg,#C2410C,#CC2020)',
    border: '#FED7AA',
  },
  {
    id: 5,
    icon: GroupsIcon,
    title: 'Collaborative Culture',
    body: 'Collaborative, non-hierarchical work culture where every voice matters and ideas are welcomed from all levels.',
    gradient: 'linear-gradient(135deg,#0369A1,#0EA5E9)',
    border: '#BAE6FD',
  },
  {
    id: 6,
    icon: TrendingUpIcon,
    title: 'Fast Career Growth',
    body: 'Fast career growth in a rapidly scaling organization — with clear milestones, mentorship, and leadership tracks.',
    gradient: 'linear-gradient(135deg,#B45309,#F59E0B)',
    border: '#FDE68A',
  },
];

const WhyWorkHere = () => (
  <Box sx={{ py: { xs: 4, md: 7 }, background: '#F8FAFC' }}>
    <Container maxWidth="xl">
      {/* Section header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
        <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}>
          WHY JOIN US
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', mb: 2 }}
        >
          Why Work at SNP Innovation?
        </Typography>
        <Typography sx={{ color: '#64748B', maxWidth: 560, mx: 'auto', fontSize: '16px' }}>
          Six compelling reasons thousands of professionals choose to grow with us.
        </Typography>
        <Box
          sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto', mt: 3 }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        {REASONS.map((reason, idx) => {
          const IconComp = reason.icon;
          return (
              <Card
                key={reason.id}
                sx={{
                  height: '100%',
                  width: '100%',
                  border: `1px solid ${reason.border}`,
                  borderRadius: '18px',
                  boxShadow: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 24px 56px rgba(0,0,0,0.1)',
                    '& .wi-icon': { transform: 'scale(1.12) rotate(5deg)' },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '4px',
                    background: reason.gradient,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#94A3B8', mb: 2 }}>
                    REASON {String(idx + 1).padStart(2, '0')}
                  </Typography>
                  <Box
                    className="wi-icon"
                    sx={{
                      width: 68, height: 68,
                      borderRadius: '18px',
                      background: reason.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mx: 'auto', mb: 3,
                      transition: 'transform 0.35s ease',
                    }}
                  >
                    <IconComp sx={{ fontSize: 34, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '17px', color: '#0F172A', mb: 1.5 }}>
                    {reason.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.75, fontSize: '14px', flexGrow: 1 }}>
                    {reason.body}
                  </Typography>
                </CardContent>
              </Card>
          );
        })}
      </Box>
    </Container>
  </Box>
);

export default WhyWorkHere;
