/* ========================================
   SUPPORT PILLARS - 8 core pillars of incubation support
   Numbered card grid showing each support area in detail
   ======================================== */

import { Box, Typography, Card, CardContent } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import BuildIcon from '@mui/icons-material/BuildOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined';
import GavelIcon from '@mui/icons-material/GavelOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalanceOutlined';
import StorefrontIcon from '@mui/icons-material/StorefrontOutlined';
import PresentToAllIcon from '@mui/icons-material/PresentToAllOutlined';

const SupportPillars = () => {
  // Pillars data - defined outside return
  const pillars = [
    {
      number: '01',
      title: 'Idea Validation',
      description:
        'Market research, feasibility analysis, and competitive landscape study to validate your concept before building.',
      icon: SearchIcon,
    },
    {
      number: '02',
      title: 'Prototype Development',
      description:
        'Access to R&D lab, hardware and software development team, and rapid prototyping facilities to build your MVP.',
      icon: BuildIcon,
    },
    {
      number: '03',
      title: 'Expert Mentorship',
      description:
        'One-on-one sessions with technology experts, seasoned industry veterans, and successful entrepreneurs.',
      icon: PeopleIcon,
    },
    {
      number: '04',
      title: 'Business Model Design',
      description:
        'Revenue model development, unit economics, pricing strategy, and comprehensive business plan creation.',
      icon: DescriptionIcon,
    },
    {
      number: '05',
      title: 'IP & Legal Support',
      description:
        'Patent filing, trademark registration, legal entity formation, and regulatory compliance advisory.',
      icon: GavelIcon,
    },
    {
      number: '06',
      title: 'Funding Connections',
      description:
        'Introductions to angel investors, VC firms, and government grant programs including Startup India, BIRAC, and DST.',
      icon: AccountBalanceIcon,
    },
    {
      number: '07',
      title: 'Industry & Market Access',
      description:
        "Connections to potential customers, distribution partners, and enterprise clients through SNP's industry network.",
      icon: StorefrontIcon,
    },
    {
      number: '08',
      title: 'Pitch & Demo Support',
      description:
        'Pitch deck creation, demo day preparation, and investor presentation coaching to make your best impression.',
      icon: PresentToAllIcon,
    },
  ];

  return (
    <Box
      className="py-16 px-4"
      sx={{ backgroundColor: '#F8FAFC' }}
    >
      <div className="container">
        <SectionHeader
          title="Our Incubation Support Pillars"
          subtitle="Eight structured pillars of comprehensive support across your entire startup journey"
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
          {pillars.map((pillar) => (
              <Card
                key={pillar.number}
                sx={{
                  height: '100%',
                  width: '100%',
                  textAlign: 'center',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.12)',
                    borderColor: '#93C5FD',
                  },
                }}
              >
                <CardContent sx={{ padding: '32px 20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Phase Number Badge */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2D5BE3 0%, #2563EB 100%)',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '14px',
                      marginBottom: 2,
                    }}
                  >
                    {pillar.number}
                  </Box>

                  {/* Icon */}
                  <Box sx={{ marginBottom: 2 }}>
                    <pillar.icon
                      sx={{ fontSize: 40, color: '#FF9500' }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, marginBottom: 1.5, fontSize: '16px', color: '#1F2937' }}
                  >
                    {pillar.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{ color: '#6B7280', lineHeight: 1.6, fontSize: '13px', flexGrow: 1 }}
                  >
                    {pillar.description}
                  </Typography>
                </CardContent>
              </Card>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default SupportPillars;
