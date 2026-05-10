/* ========================================
   SUCCESS STORIES - 3 dummy startup success cards
   Showcases graduated startups with problem, outcome, and funding
   ======================================== */

import { Box, Typography, Card, CardContent, CardMedia, Chip } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const SuccessStories = () => {
  // Success stories data - defined outside return
  const stories = [
    {
      id: 1,
      startupName: 'AgroSense AI',
      domain: 'AgriTech',
      founderQuote: "SNP's mentorship and lab access turned our university project into a product used by 8,000 farmers.",
      problem: 'Indian smallholder farmers lack real-time soil and crop health data, leading to 30% yield losses annually.',
      outcome: 'AI-powered IoT sensor kit deployed across 5 states; 8,000+ farmers onboarded.',
      funding: 'Raised ₹1.8 Cr — Startup India Seed Fund + Angel Round',
      image: 'https://picsum.photos/seed/agrosense/800/500',
    },
    {
      id: 2,
      startupName: 'MediTrack Diagnostics',
      domain: 'HealthTech',
      founderQuote: 'From a BTech final year project to a ₹3 Cr Series A — SNP made it possible in 18 months.',
      problem: 'Rural clinics in Tier 2/3 cities have no access to affordable portable diagnostic devices.',
      outcome: 'Portable multi-parameter diagnostic kit deployed in 75+ rural clinics across Maharashtra and Gujarat.',
      funding: 'Raised ₹3 Cr Series A — BIRAC BIG Grant + Impact VC',
      image: 'https://picsum.photos/seed/meditrack/800/500',
    },
    {
      id: 3,
      startupName: 'RoboLearn EdTech',
      domain: 'EdTech',
      founderQuote: "SNP's STEM network gave us our first 200 school partnerships and the credibility to raise funding.",
      problem: 'Government schools in India lack hands-on STEM learning infrastructure and trained educators.',
      outcome: 'Affordable robotics kits + teacher training deployed in 200+ government schools; 15,000 students impacted.',
      funding: 'Raised ₹2.5 Cr — DST NM-ICPS Grant + CSR partnerships',
      image: 'https://picsum.photos/seed/robolearn/800/500',
    },
  ];

  return (
    <Box className="py-16 px-4">
      <div className="container">
        <SectionHeader
          title="Success Stories"
          subtitle="Meet the innovators who went from idea to impact through SNP Innovation Incubation"
          gradient
        />

        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            flexDirection: 'row',
            overflowX: { xs: 'auto', md: 'visible' },
            flexWrap: 'nowrap',
            gridTemplateColumns: { md: 'repeat(3, 1fr)' },
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            pb: { xs: 1.5, md: 0 },
            gap: 4,
          }}
        >
          {stories.map((story) => (
            <Card
              key={story.id}
                className="reveal"
              sx={{
                minWidth: { xs: '270px', md: 'auto' },
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 24px 48px rgba(59, 130, 246, 0.15)',
                  borderColor: '#93C5FD',
                },
              }}
            >
                {/* Cover Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={story.image}
                  alt={story.startupName}
                  sx={{ objectFit: 'cover' }}
                />

                <CardContent
                  sx={{
                    padding: '24px',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  {/* Domain Badge */}
                  <Chip
                    label={story.domain}
                    size="small"
                    sx={{
                      backgroundColor: '#EFF6FF',
                      color: '#1D4ED8',
                      fontWeight: 700,
                      fontSize: '11px',
                      width: 'fit-content',
                      border: '1px solid #BFDBFE',
                    }}
                  />

                  {/* Startup Name */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: '#1F2937', fontSize: '18px' }}
                  >
                    {story.startupName}
                  </Typography>

                  {/* Founder Quote */}
                  <Box
                    sx={{
                      backgroundColor: '#F8FAFC',
                      borderLeft: '3px solid #2D5BE3',
                      borderRadius: '0 8px 8px 0',
                      padding: '10px 14px',
                      position: 'relative',
                    }}
                  >
                    <FormatQuoteIcon
                      sx={{
                        fontSize: 18,
                        color: '#2D5BE3',
                        position: 'absolute',
                        top: 6,
                        left: 10,
                        opacity: 0.5,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#374151',
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        fontSize: '13px',
                        paddingLeft: '12px',
                      }}
                    >
                      {story.founderQuote}
                    </Typography>
                  </Box>

                  {/* Problem Solved */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                    >
                      Problem Solved
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#374151', lineHeight: 1.6, fontSize: '13px', marginTop: 0.5 }}
                    >
                      {story.problem}
                    </Typography>
                  </Box>

                  {/* Outcome */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                    >
                      Outcome
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#374151', lineHeight: 1.6, fontSize: '13px', marginTop: 0.5 }}
                    >
                      {story.outcome}
                    </Typography>
                  </Box>

                  {/* Funding Badge */}
                  <Box
                    sx={{
                      marginTop: 'auto',
                      paddingTop: 2,
                      borderTop: '1px solid #F1F5F9',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        borderRadius: '8px',
                        padding: '6px 12px',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: '#065F46', fontWeight: 700, fontSize: '13px' }}
                      >
                        {story.funding}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
            </Card>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default SuccessStories;
