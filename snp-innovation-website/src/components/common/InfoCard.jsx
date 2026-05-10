/* ========================================
   INFO CARD - Modern card component
   Used for verticals, features, services display
   Icon in gradient circle, hover lift effect with glow shadow
   Link at bottom with arrow

   Props:
   - title (string): Card heading
   - description (string): Card description text
   - icon (React component): MUI Icon component to display
   - link (string): Route path to navigate on click
   - onClick (function): Callback function on click
   ======================================== */

import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const InfoCard = ({ title, description, icon: IconComponent, link, onClick }) => {
  const navigate = useNavigate();

  // Handle card click - navigate if link provided, otherwise call onClick
  const handleCardClick = () => {
    if (link) navigate(link);
    if (onClick) onClick();
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: link || onClick ? 'pointer' : 'default',
        height: '100%',
        width: '100%',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        border: '1px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
        '&:hover': {
          transform: 'translateY(-12px)',
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)',
          borderColor: '#CBD5E1',
        },
      }}
    >
      <CardContent
        sx={{
          padding: '32px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Icon in Gradient Circle */}
        {IconComponent && (
          <Box
            sx={{
              marginBottom: 3,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2D5BE3 0%, #2563EB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="icon-circle"
            >
              <IconComponent
                sx={{
                  fontSize: 36,
                  color: '#FFFFFF',
                  transition: 'transform 0.3s ease',
                }}
              />
              {/* Pulse animation */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '2px solid rgba(59, 130, 246, 0.4)',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            </Box>
          </Box>
        )}

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            marginBottom: 2,
            color: '#1F2937',
            fontSize: '18px',
            letterSpacing: '-0.3px',
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#6B7280',
            marginBottom: 3,
            flexGrow: 1,
            fontSize: '14px',
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>

        {/* Learn More Link */}
        {(link || onClick) && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              color: '#2D5BE3',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&:hover': {
                color: '#FF9500',
                gap: 1.5,
              },
            }}
          >
            Learn More
            <ArrowForwardIcon sx={{ fontSize: '16px' }} />
          </Box>
        )}
      </CardContent>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
        }
      `}</style>
    </Card>
  );
};

export default InfoCard;
