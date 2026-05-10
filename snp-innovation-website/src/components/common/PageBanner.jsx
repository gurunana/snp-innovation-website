/* ========================================
   PAGE BANNER - Modern hero banner for inner pages
   Gradient background with breadcrumb, animated particles
   Usage: <PageBanner title="About Us" subtitle="Our story" />

   Props:
   - title (string): Main page heading
   - subtitle (string): Optional subheading text
   ======================================== */

import { Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const PageBanner = ({ title, subtitle }) => {
  const location = useLocation();

  // Generate breadcrumb from current path
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(p => p);
    return [
      { label: 'Home', path: '/' },
      ...paths.map((path, idx) => ({
        label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
        path: '/' + paths.slice(0, idx + 1).join('/'),
      })),
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #1E293B 100%)',
        color: 'white',
        padding: { xs: '80px 24px 120px', sm: '100px 24px 140px', md: '120px 24px 160px' },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background particles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.3,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: { xs: '60px', sm: '80px', md: '100px' },
              height: { xs: '60px', sm: '80px', md: '100px' },
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float 8s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </Box>

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Breadcrumb */}
        <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'center' }}>
          <Breadcrumbs
            separator={<NavigateNextIcon sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }} />}
            sx={{
              '& .MuiBreadcrumbs-li': {
                fontSize: '12px',
                fontWeight: 500,
              },
            }}
          >
            {breadcrumbs.map((crumb, idx) => (
              <Link
                key={crumb.path}
                color={idx === breadcrumbs.length - 1 ? 'inherit' : 'inherit'}
                href={crumb.path}
                underline="hover"
                sx={{
                  color: idx === breadcrumbs.length - 1 ? '#FF9500' : 'rgba(255,255,255,0.7)',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#FF9500',
                  },
                }}
              >
                {crumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        </Box>

        {/* Title */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            marginBottom: 2,
            fontSize: { xs: '32px', sm: '42px', md: '52px' },
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'slideDown 0.6s ease-out',
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: 700,
              margin: '0 auto',
              fontSize: { xs: '14px', sm: '16px', md: '18px' },
              color: '#CBD5E1',
              lineHeight: 1.6,
              animation: 'slideUp 0.6s ease-out 0.2s both',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export default PageBanner;
