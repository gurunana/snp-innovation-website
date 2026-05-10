/* ========================================
   ELIGIBILITY SECTION - Who can apply for SNP Incubation
   Lists 5 eligible applicant profiles with highlight card
   ======================================== */

import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunchOutlined';
import WorkIcon from '@mui/icons-material/Work';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivismOutlined';
import BiotechIcon from '@mui/icons-material/BiotechOutlined';

const EligibilitySection = () => {
  // Who can apply profiles - defined outside return
  const profiles = [
    {
      icon: SchoolIcon,
      label: 'Student entrepreneurs and final year project teams (BTech, MTech, MBA)',
    },
    {
      icon: RocketLaunchIcon,
      label: 'Early-stage startup founders with a technology-driven idea',
    },
    {
      icon: WorkIcon,
      label: 'Professionals with validated ideas ready to build a venture',
    },
    {
      icon: VolunteerActivismIcon,
      label: 'Social entrepreneurs solving real-world problems',
    },
    {
      icon: BiotechIcon,
      label: 'Innovators seeking to commercialize research or patents',
    },
  ];

  // Application timeline steps - defined outside return
  const timelineSteps = [
    { label: 'Applications Open', detail: 'Rolling admissions throughout the year' },
    { label: 'Initial Screening', detail: '1–2 weeks after submission' },
    { label: 'Mentor Interview', detail: 'Shortlisted candidates invited for pitch' },
    { label: 'Final Decisions', detail: 'Results communicated within 1 week' },
    { label: 'Onboarding', detail: 'Formal program start within 2 weeks of selection' },
  ];

  return (
    <Box className="py-16 px-4" sx={{ backgroundColor: '#F8FAFC' }}>
      <div className="container">
        <SectionHeader
          title="Who Can Apply?"
          subtitle="Our incubation program welcomes diverse innovators at various stages of their journey"
        />

        <Grid container spacing={4}>
          {/* Eligibility Profiles */}
          <Grid item xs={12} md={7}>
            <Card sx={{ height: '100%', border: '1px solid #E2E8F0' }}>
              <CardContent sx={{ padding: { xs: '24px', sm: '40px' } }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#1F2937', marginBottom: 3 }}
                >
                  Eligible Applicants
                </Typography>
                <List disablePadding>
                  {profiles.map((profile, index) => (
                    <ListItem
                      key={index}
                      alignItems="flex-start"
                      sx={{
                        py: 2,
                        px: 0,
                        borderBottom:
                          index < profiles.length - 1 ? '1px solid #F1F5F9' : 'none',
                        gap: 1,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, marginTop: '2px' }}>
                        <CheckCircleIcon sx={{ color: '#2D5BE3', fontSize: 22 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={profile.label}
                        primaryTypographyProps={{
                          variant: 'body1',
                          sx: { color: '#374151', fontSize: '15px', lineHeight: 1.6 },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Domains accepted note */}
                <Box
                  sx={{
                    marginTop: 3,
                    padding: '16px 20px',
                    borderRadius: '12px',
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: '#1D4ED8', fontWeight: 600, marginBottom: 0.5 }}
                  >
                    Technology Domains Welcomed
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2D5BE3', fontSize: '13px' }}>
                    AI / IoT / EdTech / HealthTech / AgriTech / CleanTech / Manufacturing Tech / Fintech / Any Deep-Tech Domain
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Application Timeline */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #1E3A8A 0%, #2D5BE3 100%)',
                color: 'white',
                border: 'none',
              }}
            >
              <CardContent sx={{ padding: { xs: '24px', sm: '40px' } }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: 'white', marginBottom: 3 }}
                >
                  Application Timeline
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {timelineSteps.map((step, index) => (
                    <Box
                      key={index}
                      sx={{ display: 'flex', gap: 2, position: 'relative' }}
                    >
                      {/* Connector line */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: '#FF9500',
                            flexShrink: 0,
                            marginTop: '4px',
                            boxShadow: '0 0 0 3px rgba(255,149,0,0.3)',
                          }}
                        />
                        {index < timelineSteps.length - 1 && (
                          <Box
                            sx={{
                              width: 2,
                              flex: 1,
                              minHeight: 32,
                              backgroundColor: 'rgba(255,255,255,0.25)',
                              marginY: 0.5,
                            }}
                          />
                        )}
                      </Box>
                      <Box sx={{ paddingBottom: index < timelineSteps.length - 1 ? 2 : 0 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700, color: 'white', fontSize: '14px' }}
                        >
                          {step.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}
                        >
                          {step.detail}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* CTA Note */}
                <Box
                  sx={{
                    marginTop: 4,
                    padding: '14px 18px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                    Applications are open year-round. Apply today and take the first step toward building your startup.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default EligibilitySection;
