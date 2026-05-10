/* ========================================
   WHY HIRE SECTION — Benefits of hiring through SNP
   Section 4.4: Seven key differentiators
   ======================================== */

import { Box, Typography } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SpeedIcon from '@mui/icons-material/Speed';
import TuneIcon from '@mui/icons-material/Tune';
import CategoryIcon from '@mui/icons-material/Category';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GavelIcon from '@mui/icons-material/Gavel';

// Benefits data defined outside return
const benefits = [
  {
    id: 1,
    icon: VerifiedUserIcon,
    title: 'Pre-Screened Candidates',
    description:
      'Every professional passes rigorous technical assessments covering coding, domain knowledge, and soft skills before joining our talent pool.',
  },
  {
    id: 2,
    icon: RocketLaunchIcon,
    title: 'Project-Ready Talent',
    description:
      'Candidates are trained on real industry projects, so they contribute immediately without lengthy ramp-up periods.',
  },
  {
    id: 3,
    icon: SpeedIcon,
    title: 'Quick Deployment',
    description:
      'Our streamlined matching process delivers shortlisted, interview-ready candidates within days, not weeks.',
  },
  {
    id: 4,
    icon: TuneIcon,
    title: 'Flexible Engagement Models',
    description:
      'Choose from part-time, full-time, project-based, or dedicated team models — tailored to your timeline and budget.',
  },
  {
    id: 5,
    icon: CategoryIcon,
    title: 'Domain-Specific Talent',
    description:
      'We maintain specialists across every major tech domain — software, AI, embedded, cloud, cybersecurity, IoT, design, and QA.',
  },
  {
    id: 6,
    icon: SupportAgentIcon,
    title: 'Continuous Support',
    description:
      'Dedicated account managers monitor performance and a replacement guarantee ensures you always have the right resource.',
  },
  {
    id: 7,
    icon: GavelIcon,
    title: 'Compliance Managed',
    description:
      'PF, ESI, contracts, and statutory compliance are fully handled by SNP — reducing your administrative overhead.',
  },
];

const WhyHireSection = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#ffffff' }}>
      <div className="container">
        <SectionHeader
          title="Why Hire Through SNP Innovation?"
          subtitle="Seven advantages that make SNP the preferred talent partner for India's leading tech teams"
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mt: 4 }}>
          {benefits.map((item) => {
            const IconComponent = item.icon;
            return (
                <Box
                  key={item.id}
                  sx={{
                    p: 3.5,
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    border: '1px solid #E2E8F0',
                    boxShadow: 'var(--shadow-sm)',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 'var(--shadow-md)',
                      borderColor: 'var(--color-primary)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2D5BE3 0%, #2563EB 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 26, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1F2937', fontSize: '1rem' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, flexGrow: 1 }}>
                    {item.description}
                  </Typography>
                </Box>
            );
          })}
        </Box>
      </div>
    </Box>
  );
};

export default WhyHireSection;
