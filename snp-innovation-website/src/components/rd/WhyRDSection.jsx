/* ========================================
   WHY R&D SECTION — Key differentiators
   Section 5.2: Four reasons to do R&D with SNP
   ======================================== */

import { Box, Typography } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import LoopIcon from '@mui/icons-material/Loop';
import MemoryIcon from '@mui/icons-material/Memory';
import VerifiedIcon from '@mui/icons-material/Verified';
import ApartmentIcon from '@mui/icons-material/Apartment';

// Benefits data defined outside return
const benefits = [
  {
    id: 1,
    icon: LoopIcon,
    color: '#2D5BE3',
    title: 'Full Development Lifecycle Ownership',
    description:
      'We own the end-to-end R&D journey — from ideation and prototyping to validation and market launch. No fragmented handoffs between vendors.',
  },
  {
    id: 2,
    icon: MemoryIcon,
    color: '#8B5CF6',
    title: 'Hardware & Software Under One Roof',
    description:
      'Our team spans embedded hardware, PCB design, firmware, cloud software, and AI — giving you a single partner for fully integrated solutions.',
  },
  {
    id: 3,
    icon: VerifiedIcon,
    color: '#10B981',
    title: 'IP Filing & Certification Support',
    description:
      'We support patent search, provisional and complete patent drafting, and national (BIS/NABL/MeitY) as well as international (CE/FCC/RoHS/ISO) certification.',
  },
  {
    id: 4,
    icon: ApartmentIcon,
    color: '#F59E0B',
    title: 'Dedicated R&D Arm for Your Organisation',
    description:
      'SNP can operate as a fully dedicated R&D division embedded within your organisation — handling all research, development, and innovation mandates.',
  },
];

const WhyRDSection = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#ffffff' }}>
      <div className="container">
        <SectionHeader
          title="Why R&D with SNP Innovation?"
          subtitle="Four core strengths that make SNP the right partner for serious innovation projects"
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3, mt: 4 }}>
          {benefits.map((item) => {
            const IconComponent = item.icon;
            return (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    gap: 3,
                    p: 3.5,
                    borderRadius: 2,
                    border: '1px solid #E2E8F0',
                    boxShadow: 'var(--shadow-sm)',
                    height: '100%',
                    width: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 'var(--shadow-md)',
                      borderColor: item.color,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937', mb: 1, fontSize: '1rem' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
            );
          })}
        </Box>
      </div>
    </Box>
  );
};

export default WhyRDSection;
