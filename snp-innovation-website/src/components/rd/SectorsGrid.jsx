/* ========================================
   SECTORS GRID — 8 industries served
   Section 5.6: Sector cards with icons
   ======================================== */

import { Box, Typography } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import FactoryIcon from '@mui/icons-material/Factory';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SecurityIcon from '@mui/icons-material/Security';
import SchoolIcon from '@mui/icons-material/School';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Sectors defined outside return
const sectors = [
  {
    id: 1,
    icon: FactoryIcon,
    emoji: '🏭',
    name: 'Manufacturing & Industrial Automation',
    description:
      'Smart factories, automated quality control, predictive maintenance, and Industry 4.0 solutions.',
    color: '#2D5BE3',
  },
  {
    id: 2,
    icon: AgricultureIcon,
    emoji: '🌾',
    name: 'Agriculture & AgriTech',
    description:
      'Precision farming, IoT sensors, crop monitoring, farm automation, and post-harvest solutions.',
    color: '#10B981',
  },
  {
    id: 3,
    icon: LocalHospitalIcon,
    emoji: '🏥',
    name: 'Healthcare & MedTech',
    description:
      'Medical devices, diagnostic equipment, wearable health monitors, and patient data platforms.',
    color: '#EF4444',
  },
  {
    id: 4,
    icon: ApartmentIcon,
    emoji: '🏙️',
    name: 'Smart Infrastructure',
    description:
      'Smart building management, energy monitoring, water systems, and urban IoT deployments.',
    color: '#8B5CF6',
  },
  {
    id: 5,
    icon: SecurityIcon,
    emoji: '🛡️',
    name: 'Defense & Aerospace',
    description:
      'Ruggedised electronics, embedded systems, mission-critical software, and surveillance technology.',
    color: '#6B7280',
  },
  {
    id: 6,
    icon: SchoolIcon,
    emoji: '🎓',
    name: 'Education Technology',
    description:
      'Interactive learning systems, assessment tools, lab simulation hardware, and e-learning platforms.',
    color: '#F59E0B',
  },
  {
    id: 7,
    icon: SolarPowerIcon,
    emoji: '☀️',
    name: 'Renewable Energy',
    description:
      'Solar systems, energy storage, grid integration IoT, and EV charging infrastructure.',
    color: '#FBBF24',
  },
  {
    id: 8,
    icon: LocalShippingIcon,
    emoji: '📦',
    name: 'Retail & Logistics',
    description:
      'Warehouse automation, inventory tracking, cold-chain monitoring, and last-mile delivery tech.',
    color: '#06B6D4',
  },
];

const SectorsGrid = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#ffffff' }}>
      <div className="container">
        <SectionHeader
          title="Sectors We Serve"
          subtitle="SNP delivers R&D expertise across eight high-growth industries"
        />

        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            flexDirection: 'row',
            overflowX: { xs: 'auto', md: 'visible' },
            flexWrap: 'nowrap',
            gridTemplateColumns: { md: 'repeat(4, 1fr)' },
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            pb: { xs: 1.5, md: 0 },
            gap: 3,
            mt: 4,
          }}
        >
          {sectors.map((sector) => {
            const IconComponent = sector.icon;
            return (
              <Box
                key={sector.id}
                className="reveal"
                sx={{
                  p: 3,
                  borderRadius: 2,
                  minWidth: { xs: '220px', md: 'auto' },
                  flexShrink: 0,
                  border: '1px solid #E2E8F0',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s',
                  textAlign: 'center',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 'var(--shadow-md)',
                    borderColor: sector.color,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: `${sector.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <IconComponent sx={{ fontSize: 30, color: sector.color }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937', mb: 1, fontSize: '0.9rem' }}>
                  {sector.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                  {sector.description}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </div>
    </Box>
  );
};

export default SectorsGrid;
