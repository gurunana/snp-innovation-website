/* ========================================
   UPCOMING EVENTS - 3 dummy event cards per spec 7.3
   Date, Venue, Registration CTA — hardcoded initial data
   Never blocks render on API failure
   ======================================== */

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Button,
} from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOnOutlined';
import GroupIcon from '@mui/icons-material/GroupOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Hardcoded event data — never replaced by API; page always renders
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Robotics Fundamentals — School Workshop',
    category: 'School & College',
    categoryColor: '#2D5BE3',
    date: 'May 10, 2026',
    time: '9:00 AM – 4:00 PM',
    venue: 'SNP Innovation Center, Navi Mumbai',
    description:
      'A full-day hands-on robotics session for students of Class 8–12. Build your first robot, learn line-following algorithms, and compete in a mini tournament.',
    seats: '60 seats',
    seatsLeft: '22 seats left',
    image: '/images/gallery/upcomingIvents/UpcomingEvent1.jpg',
  },
  {
    id: 2,
    title: 'Industry 4.0 & Digital Transformation Masterclass',
    category: 'Industry & Corporate',
    categoryColor: '#8B5CF6',
    date: 'May 24, 2026',
    time: '10:00 AM – 5:00 PM',
    venue: 'Hotel Novotel, Pune',
    description:
      'A power-packed masterclass for manufacturing and operations leaders on IIoT, AI-driven process optimization, and digital twin adoption strategies.',
    seats: '80 seats',
    seatsLeft: '35 seats left',
    image: '/images/gallery/upcomingIvents/UpcomingEvent2.jpg',
  },
  {
    id: 3,
    title: 'Pitch Perfect — Startup Investor Presentation Masterclass',
    category: 'Startup & Entrepreneurship',
    categoryColor: '#F59E0B',
    date: 'June 7, 2026',
    time: '2:00 PM – 6:00 PM',
    venue: 'SNP Innovation Center, Mumbai',
    description:
      'Learn the art of investor storytelling, financial slides, and live pitch practice with feedback from active angel investors and startup mentors.',
    seats: '40 seats',
    seatsLeft: '12 seats left',
    image: '/images/gallery/upcomingIvents/UpcomingEvent3.jpg',
  },
];

const UpcomingEvents = () => {
  return (
    <Box className="py-16 px-4" sx={{ backgroundColor: '#F8FAFC' }}>
      <div className="container">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Register now and secure your spot in our next transformative learning experience"
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
          {UPCOMING_EVENTS.map((event) => (
            <Card
              key={event.id}
                className="reveal"
              sx={{
                minWidth: { xs: '280px', md: 'auto' },
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 24px 48px ${event.categoryColor}18`,
                  borderColor: event.categoryColor,
                },
              }}
            >
                {/* Event Cover Image */}
                <Box
                  component="img"
                  src={event.image}
                  alt={event.title}
                  sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                />

                <CardContent sx={{ padding: '24px', flexGrow: 1 }}>
                  {/* Category Badge */}
                  <Chip
                    label={event.category}
                    size="small"
                    sx={{
                      backgroundColor: `${event.categoryColor}15`,
                      color: event.categoryColor,
                      fontWeight: 700,
                      fontSize: '11px',
                      border: `1px solid ${event.categoryColor}33`,
                      marginBottom: 2,
                    }}
                  />

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: '#1F2937', fontSize: '16px', marginBottom: 1.5, lineHeight: 1.4 }}
                  >
                    {event.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{ color: '#6B7280', lineHeight: 1.6, fontSize: '13px', marginBottom: 2 }}
                  >
                    {event.description}
                  </Typography>

                  {/* Date & Time */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: event.categoryColor }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', fontSize: '13px' }}>
                      {event.date}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9CA3AF', fontSize: '13px' }}>
                      • {event.time}
                    </Typography>
                  </Box>

                  {/* Venue */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1.5 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: event.categoryColor }} />
                    <Typography variant="body2" sx={{ color: '#374151', fontSize: '13px' }}>
                      {event.venue}
                    </Typography>
                  </Box>

                  {/* Seats */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      backgroundColor: '#FEF3C7',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      border: '1px solid #FDE68A',
                    }}
                  >
                    <GroupIcon sx={{ fontSize: 16, color: '#D97706' }} />
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#92400E', fontSize: '12px' }}>
                      {event.seatsLeft} of {event.seats}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ padding: '0 24px 24px' }}>
                  <Button
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      background: `linear-gradient(135deg, ${event.categoryColor} 0%, ${event.categoryColor}CC 100%)`,
                      color: 'white',
                      borderRadius: '10px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      fontWeight: 700,
                      textTransform: 'none',
                      boxShadow: `0 4px 12px ${event.categoryColor}33`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 20px ${event.categoryColor}44`,
                      },
                    }}
                  >
                    Register Now
                  </Button>
                </CardActions>
            </Card>
          ))}
        </Box>
      </div>
    </Box>
  );
};

export default UpcomingEvents;
