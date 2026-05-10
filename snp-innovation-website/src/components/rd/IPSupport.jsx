/* ========================================
   IP & CERTIFICATION SUPPORT
   Section 5.5: Patent support + national/international certs
   ======================================== */

import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedIcon from '@mui/icons-material/Verified';

// IP services defined outside return
const ipServices = [
  {
    id: 1,
    title: 'Patent Search & Prior Art Analysis',
    description:
      'Thorough prior art searches to assess patentability and identify white spaces for protection before filing.',
  },
  {
    id: 2,
    title: 'Provisional & Complete Patent Drafting',
    description:
      'Expert drafting of provisional applications to establish priority dates, followed by complete specification filing.',
  },
  {
    id: 3,
    title: 'Design Registration',
    description:
      'Protect the aesthetic and visual elements of your product through industrial design registration.',
  },
];

// Certification categories defined outside return
const certCategories = [
  {
    id: 1,
    label: 'National Certifications',
    icon: '🇮🇳',
    certs: ['BIS', 'NABL', 'STQC', 'MeitY'],
  },
  {
    id: 2,
    label: 'International Certifications',
    icon: '🌐',
    certs: ['CE Mark', 'FCC', 'RoHS', 'ISO Standards'],
  },
];

const IPSupport = () => {
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <SectionHeader
          title="IP & Certification Support"
          subtitle="End-to-end intellectual property protection and regulatory certification — handled by SNP so you focus on innovation"
        />

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Patent / IP column */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                border: '1px solid #E2E8F0',
                boxShadow: 'var(--shadow-md)',
                borderTop: '4px solid #2D5BE3',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: '#2D5BE3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <GavelIcon sx={{ fontSize: 24, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
                    Intellectual Property Filing
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {ipServices.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', gap: 1.5 }}>
                      <Typography sx={{ color: '#2D5BE3', fontWeight: 'bold', flexShrink: 0, mt: 0.2 }}>✓</Typography>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1F2937', mb: 0.3 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Certification column */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                border: '1px solid #E2E8F0',
                boxShadow: 'var(--shadow-md)',
                borderTop: '4px solid #10B981',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <VerifiedIcon sx={{ fontSize: 24, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
                    Regulatory Certifications
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 3, lineHeight: 1.7 }}>
                  SNP guides you through the full certification preparation process — preparing technical files,
                  coordinating with test labs, and supporting you through regulatory submissions.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {certCategories.map((cat) => (
                    <Box key={cat.id}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, color: '#374151', mb: 1.5 }}
                      >
                        {cat.icon} {cat.label}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {cat.certs.map((cert, i) => (
                          <Chip
                            key={i}
                            label={cert}
                            size="small"
                            sx={{
                              backgroundColor: '#F0FDF4',
                              color: '#16A34A',
                              fontWeight: 600,
                              border: '1px solid #86EFAC',
                              fontSize: '0.75rem',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default IPSupport;
