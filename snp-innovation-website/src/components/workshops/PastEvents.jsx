/* ========================================
   PAST EVENTS - Photo grid with stats per spec 7.4
   Shows previous workshops with participant counts and impact stats
   Uses picsum.photos for all images
   ======================================== */

import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import StarIcon from '@mui/icons-material/StarOutlined';

// Aggregate impact stats — rendered at top of section
const IMPACT_STATS = [
  { value: '5,000+', label: 'Students Trained', icon: SchoolIcon },
  { value: '120+', label: 'Workshops Conducted', icon: PeopleIcon },
  { value: '4.8 / 5', label: 'Avg. Participant Rating', icon: StarIcon },
];

// Past event gallery data — hardcoded, never blocks render
const PAST_EVENTS = [
  {
    id: 1,
    title: 'Robotics Summer Camp 2025',
    image: 'https://picsum.photos/seed/past-event-robotics/800/500',
    stat: '200+ students trained in Robotics',
    description: '5-day residential camp where students built fully autonomous line-follower bots.',
    year: '2025',
  },
  {
    id: 2,
    title: 'Industry 4.0 Masterclass — Auto Sector',
    image: 'https://picsum.photos/seed/past-event-industry4/800/500',
    stat: '120 engineers upskilled in IIoT & PLC',
    description: 'Two-day corporate workshop at a leading automotive manufacturing facility in Pune.',
    year: '2025',
  },
  {
    id: 3,
    title: 'Women in Tech Innovation Day',
    image: 'https://picsum.photos/seed/past-event-women/800/500',
    stat: '80 women founders & engineers participated',
    description: 'Inspiring talks, hands-on sessions, and networking to empower women in STEM careers.',
    year: '2024',
  },
  {
    id: 4,
    title: 'SNP Demo Day — Cohort 3',
    image: 'https://picsum.photos/seed/past-event-demoday/800/500',
    stat: '12 startups pitched; 5 received funding',
    description: 'Batch 3 graduation event with 200+ investors, corporates, and media in attendance.',
    year: '2024',
  },
  {
    id: 5,
    title: 'AI for Students — College Outreach',
    image: 'https://picsum.photos/seed/past-event-ai-college/800/500',
    stat: '500+ BTech students introduced to AI/ML',
    description: 'Free AI workshop conducted across 8 engineering colleges in Maharashtra.',
    year: '2025',
  },
  {
    id: 6,
    title: 'Rural Digital Literacy Camp — Vidarbha',
    image: 'https://picsum.photos/seed/past-event-rural/800/500',
    stat: '300 rural youth trained in digital skills',
    description: 'CSR-funded 3-day camp introducing smartphones, internet safety, and online job tools.',
    year: '2024',
  },
];

const PastEvents = () => {
  return (
    <Box className="py-16 px-4">
      <div className="container">
        <SectionHeader
          title="Past Events Highlights"
          subtitle="A look back at the learning journeys, milestones, and moments that defined our workshops"
        />

        {/* Impact Stats Strip */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
            marginBottom: 6,
          }}
        >
          {IMPACT_STATS.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <Box
                key={idx}
                sx={{
                  textAlign: 'center',
                  padding: '28px 20px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #2D5BE3 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(59,130,246,0.25)',
                }}
              >
                <StatIcon sx={{ fontSize: 36, color: '#FF9500', marginBottom: 1 }} />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: 'white', fontSize: { xs: '28px', sm: '32px' } }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', marginTop: 0.5 }}>
                  {stat.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Photo Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {PAST_EVENTS.map((event) => (
            <Card
              key={event.id}
              sx={{
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                },
              }}
            >
                {/* Event Photo */}
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  {/* Year Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: 'rgba(0,0,0,0.65)',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {event.year}
                  </Box>
                </Box>

                <CardContent sx={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: '#1F2937', fontSize: '15px', marginBottom: 1 }}
                  >
                    {event.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{ color: '#6B7280', lineHeight: 1.6, fontSize: '13px', marginBottom: 2, flexGrow: 1 }}
                  >
                    {event.description}
                  </Typography>

                  {/* Impact Stat Highlight */}
                  <Box
                    sx={{
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: 18, color: '#2D5BE3', flexShrink: 0 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: '#1D4ED8', fontWeight: 700, fontSize: '13px' }}
                    >
                      {event.stat}
                    </Typography>
                  </Box>
                </CardContent>
            </Card>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default PastEvents;
