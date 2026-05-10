/* ========================================
   R&D SERVICES — Five service category cards
   Compact 3-column grid — no tall images
   Section 5.3: Detailed capabilities per category
   ======================================== */

import { Box, Typography, Chip } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import MemoryIcon from '@mui/icons-material/Memory';
import CodeIcon from '@mui/icons-material/Code';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import WifiIcon from '@mui/icons-material/Wifi';

// Service categories defined outside return — no logic in JSX
const services = [
  {
    id: 1,
    icon: DesignServicesIcon,
    color: '#2D5BE3',
    bg: '#EFF6FF',
    title: 'Product Design & Prototyping',
    description:
      'From concept sketches to functional prototypes — industrial and consumer product design, 3D/CAD modelling, and rapid prototyping.',
    capabilities: [
      'Industrial product design',
      'Consumer product design',
      '3D / CAD modelling',
      'Rapid prototyping',
      'Design for manufacturability',
    ],
  },
  {
    id: 2,
    icon: MemoryIcon,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    title: 'Hardware Development',
    description:
      'Full-spectrum hardware engineering from schematic to functional board — including EMC/EMI testing and power electronics design.',
    capabilities: [
      'PCB design & layout',
      'Embedded systems',
      'Sensor integration',
      'Power electronics',
      'EMC / EMI testing',
    ],
  },
  {
    id: 3,
    icon: CodeIcon,
    color: '#10B981',
    bg: '#ECFDF5',
    title: 'Software Development',
    description:
      'Firmware to cloud — RTOS/Linux firmware, HMI/SCADA systems, cloud/edge computing, and mobile/web application development.',
    capabilities: [
      'Firmware (RTOS / Linux)',
      'Application software',
      'HMI / SCADA systems',
      'Cloud & edge computing',
      'Mobile & web apps',
    ],
  },
  {
    id: 4,
    icon: PrecisionManufacturingIcon,
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Automation & Industrial',
    description:
      'End-to-end automation solutions including PLC programming, process automation, robotics integration, and energy monitoring.',
    capabilities: [
      'PLC programming',
      'Process automation',
      'Robotics integration',
      'Smart agriculture systems',
      'Energy monitoring',
    ],
  },
  {
    id: 5,
    icon: WifiIcon,
    color: '#EF4444',
    bg: '#FEF2F2',
    title: 'IoT-Based Solutions',
    description:
      'Connected ecosystem design — IoT architecture, real-time monitoring dashboards, predictive maintenance, and smart building management.',
    capabilities: [
      'IoT architecture & design',
      'Real-time monitoring',
      'Data analytics dashboards',
      'Predictive maintenance',
      'Smart building management',
    ],
  },
];

const RDServices = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#F8FAFC' }}>
      <div className="container">
        <SectionHeader
          title="Services & Capabilities"
          subtitle="Five integrated service categories that take your idea from whiteboard to working product"
        />

        {/* 3-column grid on desktop, 2-column on tablet, 1-column on mobile */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2.5,
            mt: 4,
          }}
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Box
                key={service.id}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderTop: `3px solid ${service.color}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 12px 32px ${service.color}18`,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Icon + Title row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: service.bg,
                      border: `1.5px solid ${service.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 20, color: service.color }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: '#1F2937', fontSize: '14px', lineHeight: 1.3 }}
                  >
                    {service.title}
                  </Typography>
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{ color: '#6B7280', lineHeight: 1.65, fontSize: '13px', mb: 2 }}
                >
                  {service.description}
                </Typography>

                {/* Capability chips */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {service.capabilities.map((cap, i) => (
                    <Chip
                      key={i}
                      label={cap}
                      size="small"
                      sx={{
                        backgroundColor: service.bg,
                        color: service.color,
                        fontWeight: 600,
                        fontSize: '11px',
                        border: `1px solid ${service.color}25`,
                        height: 22,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      </div>
    </Box>
  );
};

export default RDServices;
