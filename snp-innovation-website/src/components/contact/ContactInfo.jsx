/* ========================================
   CONTACT INFO - Display office information and contact details
   Shows main office, regional offices, business hours, and contact categories

   Props:
   - mainOffice (object): Main office details
   - offices (array): Regional offices
   - businessHours (object): Office hours
   - contactCategories (array): Contact categories and departments
======================================== */

import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SectionHeader from '../common/SectionHeader';

const ContactInfo = ({
  mainOffice,
  offices,
  businessHours,
  contactCategories,
}) => {
  return (
    <Box className="py-16">
      {/* Section Header */}
      <SectionHeader
        title="Contact Information"
        subtitle="Reach out to us across our offices in India"
      />

      {/* Main Office Card */}
      {mainOffice && (
        <Box className="mb-12">
          <Typography
            variant="h6"
            className="font-bold mb-4 text-center"
            sx={{ color: 'var(--color-primary)' }}
          >
            Head Office
          </Typography>
          <Card
            sx={{
              maxWidth: '600px',
              margin: '0 auto',
              backgroundColor: 'var(--color-primary-light, #e3f2fd)',
            }}
          >
            <CardContent className="space-y-4">
              <Box className="flex gap-3">
                <LocationOnIcon sx={{ color: 'var(--color-primary)' }} />
                <Box>
                  <Typography variant="body2" className="font-semibold">
                    {mainOffice.name}
                  </Typography>
                  <Typography variant="body2">
                    {mainOffice.address}
                  </Typography>
                </Box>
              </Box>
              <Box className="flex gap-3">
                <PhoneIcon sx={{ color: 'var(--color-primary)' }} />
                <Typography variant="body2">{mainOffice.phone}</Typography>
              </Box>
              <Box className="flex gap-3">
                <EmailIcon sx={{ color: 'var(--color-primary)' }} />
                <Typography variant="body2">{mainOffice.email}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Regional Offices */}
      {offices && offices.length > 0 && (
        <Box className="mb-12">
          <Typography
            variant="h6"
            className="font-bold mb-6 text-center"
            sx={{ color: 'var(--color-primary)' }}
          >
            Regional Offices
          </Typography>
          <Grid container spacing={4}>
            {offices.map((office) => (
              <Grid key={office.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 'var(--shadow-lg)',
                    },
                  }}
                >
                  <CardContent className="space-y-3">
                    <Typography variant="h6" className="font-bold">
                      {office.name}
                    </Typography>

                    <Box className="flex gap-2">
                      <LocationOnIcon
                        sx={{
                          fontSize: 18,
                          color: 'var(--color-primary)',
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">
                        {office.address}
                      </Typography>
                    </Box>

                    <Box className="flex gap-2">
                      <PhoneIcon
                        sx={{
                          fontSize: 18,
                          color: 'var(--color-primary)',
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">{office.phone}</Typography>
                    </Box>

                    <Box className="flex gap-2">
                      <EmailIcon
                        sx={{
                          fontSize: 18,
                          color: 'var(--color-primary)',
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">{office.email}</Typography>
                    </Box>

                    {office.services && office.services.length > 0 && (
                      <Box className="border-t pt-3 mt-3">
                        <Typography variant="caption" className="font-semibold">
                          Services:
                        </Typography>
                        <Typography variant="caption" className="block">
                          {office.services.join(', ')}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Business Hours */}
      {businessHours && (
        <Box className="mb-12">
          <Typography
            variant="h6"
            className="font-bold mb-4 text-center"
            sx={{ color: 'var(--color-primary)' }}
          >
            Business Hours
          </Typography>
          <Card sx={{ maxWidth: '600px', margin: '0 auto' }}>
            <CardContent className="space-y-3">
              <Box className="flex gap-3">
                <AccessTimeIcon sx={{ color: 'var(--color-primary)' }} />
                <Box>
                  <Typography variant="body2" className="font-semibold">
                    Weekdays
                  </Typography>
                  <Typography variant="body2">
                    {businessHours.weekdays}
                  </Typography>
                </Box>
              </Box>

              <Box className="flex gap-3">
                <AccessTimeIcon sx={{ color: 'var(--color-secondary)' }} />
                <Box>
                  <Typography variant="body2" className="font-semibold">
                    Weekends
                  </Typography>
                  <Typography variant="body2">
                    {businessHours.weekends}
                  </Typography>
                </Box>
              </Box>

              {businessHours.note && (
                <Box className="border-t pt-3 mt-3">
                  <Typography variant="caption">
                    {businessHours.note}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Contact Categories */}
      {contactCategories && contactCategories.length > 0 && (
        <Box>
          <Typography
            variant="h6"
            className="font-bold mb-4 text-center"
            sx={{ color: 'var(--color-primary)' }}
          >
            Department Contacts
          </Typography>
          <Grid container spacing={3}>
            {contactCategories.map((category) => (
              <Grid key={category.id} size={{ xs: 12, sm: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" className="font-bold mb-2">
                      {category.category}
                    </Typography>
                    {category.email && (
                      <Box className="flex gap-2 mb-1">
                        <EmailIcon
                          sx={{
                            fontSize: 16,
                            color: 'var(--color-primary)',
                          }}
                        />
                        <Typography variant="caption">
                          {category.email}
                        </Typography>
                      </Box>
                    )}
                    {category.phone && (
                      <Box className="flex gap-2">
                        <PhoneIcon
                          sx={{
                            fontSize: 16,
                            color: 'var(--color-primary)',
                          }}
                        />
                        <Typography variant="caption">
                          {category.phone}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ContactInfo;
