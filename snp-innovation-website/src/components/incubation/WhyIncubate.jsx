/* ========================================
   WHY INCUBATE SECTION - 7 key reasons to incubate with SNP Innovation
   Icon grid showing core facility and support offerings
   ======================================== */

import { Box } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import InfoCard from '../common/InfoCard';
import ScienceIcon from '@mui/icons-material/ScienceOutlined';
import CodeIcon from '@mui/icons-material/CodeOutlined';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import GavelIcon from '@mui/icons-material/GavelOutlined';
import HandshakeIcon from '@mui/icons-material/HandshakeOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUpOutlined';
import PublicIcon from '@mui/icons-material/PublicOutlined';

const WhyIncubate = () => {
  // Benefits data - defined outside return
  const benefits = [
    {
      title: 'R&D Lab and Prototyping Facilities',
      description:
        'Access to state-of-the-art research labs, hardware tools, and rapid prototyping equipment to build your product from scratch.',
      icon: ScienceIcon,
    },
    {
      title: 'IT Development Team Support',
      description:
        'Dedicated software and hardware engineers available to collaborate on your product development journey.',
      icon: CodeIcon,
    },
    {
      title: 'STEM & Technology Education Network',
      description:
        'Tap into a wide network of STEM educators, technology trainers, and academic institutions to enhance your team capabilities.',
      icon: SchoolIcon,
    },
    {
      title: 'IP Filing and Legal Support',
      description:
        'Expert guidance on patent filing, trademarks, legal entity formation, and regulatory compliance for your startup.',
      icon: GavelIcon,
    },
    {
      title: 'Investor & Industry Connections',
      description:
        'Get introduced to angel investors, venture capital firms, and industry leaders to fuel your growth and scale.',
      icon: HandshakeIcon,
    },
    {
      title: 'Business Model Structuring & Go-To-Market Strategy',
      description:
        'Structured frameworks to design your revenue model, unit economics, pricing strategy, and market entry plan.',
      icon: TrendingUpIcon,
    },
    {
      title: 'National & International Partner Ecosystem',
      description:
        "Leverage SNP Innovation's expansive network of national and global partners for market access and distribution.",
      icon: PublicIcon,
    },
  ];

  return (
    <Box className="py-16 px-4">
      <div className="container">
        <SectionHeader
          title="Why Incubate with SNP Innovation?"
          subtitle="A comprehensive ecosystem to nurture your startup — from lab bench to boardroom"
          gradient
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {benefits.map((benefit) => (
              <InfoCard
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
              />
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default WhyIncubate;
