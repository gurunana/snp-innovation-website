/* ========================================
   LATEST NEWS SECTION — Home Page Section 1.8
   PDF: "3-column card grid — Stay updated with workshops, lab launches,
         startup stories, and innovation milestones."
   ======================================== */

import { Box, Container, Card, CardContent, Typography, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SectionHeader from '../common/SectionHeader';
import PrimaryButton from '../common/PrimaryButton';

// Dummy cover images per news card — replace with real blog/event images
const NEWS_IMAGES = [
  'https://picsum.photos/seed/stem-lab-launch-pune/700/380',
  'https://picsum.photos/seed/national-robotics-workshop/700/380',
  'https://picsum.photos/seed/startup-seed-funding/700/380',
];

// Chip colour map per category
const CATEGORY_COLORS = {
  'Lab Launch': { bg: '#EFF6FF', color: '#1A3A8F' },
  Workshop: { bg: '#F0FDF4', color: '#15803D' },
  Startup: { bg: '#FAF5FF', color: '#7E22CE' },
  News: { bg: '#FFF7ED', color: '#C2410C' },
  Event: { bg: '#ECFDF5', color: '#059669' },
};

const LatestNewsSection = ({ newsData = [] }) => {
  const navigate = useNavigate();

  // Take first 3 items
  const newsItems = newsData.slice(0, 3);

  // Format date — logic outside return
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get chip colours for a category
  const getCategoryStyle = (category) => {
    return CATEGORY_COLORS[category] || CATEGORY_COLORS['News'];
  };

  // Navigate to single article (placeholder)
  const handleReadMore = (news) => {
    navigate(news.link || '/news');
  };

  return (
    <Box sx={{ width: '100%', paddingY: { xs: 4, md: 6 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="xl">

        {/* ── Section Header ── */}
        <SectionHeader
          title="Latest News & Updates"
          subtitle="Stay updated with our latest workshops, lab launches, startup success stories, and innovation milestones."
        />

        {/* ── News Grid — 3 columns ── */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'grid' },
            flexDirection: 'row',
            overflowX: { xs: 'auto', md: 'visible' },
            flexWrap: 'nowrap',
            gridTemplateColumns: { md: 'repeat(3, 1fr)' },
            gap: { xs: 2.5, md: 4 },
            mt: 2,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            pb: { xs: 1.5, md: 0 },
          }}
        >
          {newsItems.map((news, index) => {
            const catStyle = getCategoryStyle(news.category);
            const dummyImage = NEWS_IMAGES[index] || NEWS_IMAGES[0];

            return (
              <Card
                key={news.id}
                className={`reveal reveal-delay-${(index % 3) + 1}`}
                onClick={() => handleReadMore(news)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 24px 56px rgba(0,0,0,0.12)',
                    borderColor: '#CBD5E1',
                    '& .news-cover-img': { transform: 'scale(1.06)' },
                    '& .read-more': { gap: '12px', color: '#1A3A8F' },
                  },
                }}
              >
                  {/* ── Cover Image ── */}
                  <Box
                    sx={{
                      width: '100%',
                      height: '210px',
                      overflow: 'hidden',
                      position: 'relative',
                      flexShrink: 0,
                    }}
                  >
                    {/* Dummy cover image — replace src in production */}
                    <Box
                      component="img"
                      className="news-cover-img"
                      src={dummyImage}
                      alt={news.title}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.5s ease',
                      }}
                    />

                    {/* Gradient overlay on image bottom */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: '50%',
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.45), transparent)',
                      }}
                    />

                    {/* Category chip on image */}
                    <Box sx={{ position: 'absolute', top: 14, left: 14 }}>
                      <Chip
                        label={news.category || 'News'}
                        size="small"
                        sx={{
                          background: catStyle.bg,
                          color: catStyle.color,
                          fontWeight: 700,
                          fontSize: '11px',
                          height: '26px',
                          borderRadius: '6px',
                          backdropFilter: 'blur(8px)',
                          border: `1px solid ${catStyle.color}33`,
                        }}
                      />
                    </Box>
                  </Box>

                  {/* ── Card Body ── */}
                  <CardContent
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      gap: 1.5,
                    }}
                  >
                    {/* Title — 2-line clamp */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: '#0F172A',
                        fontSize: { xs: '15px', md: '16px' },
                        lineHeight: 1.55,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {news.title}
                    </Typography>

                    {/* Description (optional) */}
                    {news.excerpt && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64748B',
                          fontSize: '14px',
                          lineHeight: 1.65,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {news.excerpt}
                      </Typography>
                    )}

                    {/* ── Footer: date + Read More ── */}
                    <Box
                      sx={{
                        mt: 'auto',
                        pt: 2,
                        borderTop: '1px solid #F1F5F9',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {/* Date */}
                      <Typography
                        variant="caption"
                        sx={{ color: '#94A3B8', fontSize: '12px', fontWeight: 500 }}
                      >
                        {formatDate(news.date)}
                      </Typography>

                      {/* Read More link */}
                      <Box
                        className="read-more"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#64748B',
                          fontWeight: 600,
                          fontSize: '13px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Read More
                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                      </Box>
                    </Box>
                  </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* ── View All Button ── */}
        <Box sx={{ textAlign: 'center', mt: { xs: 3, md: 4 } }}>
          <PrimaryButton to="/news">
            View All News & Updates
          </PrimaryButton>
        </Box>
      </Container>
    </Box>
  );
};

export default LatestNewsSection;
