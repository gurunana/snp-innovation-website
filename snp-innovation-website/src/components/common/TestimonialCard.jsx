/* ========================================
   TESTIMONIAL CARD - Modern testimonial component
   Large decorative quote mark, white card with border
   Avatar circle with initials, divider line

   Props:
   - quote (string): The testimonial quote text
   - name (string): Client name
   - designation (string): Job title/position
   - organization (string): Company/organization name
   - image (string): Optional profile image URL
   ======================================== */

import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const TestimonialCard = ({
  quote,
  name,
  designation,
  organization,
  image,
}) => {
  // Generate initials from name
  const getInitials = () => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.12)',
          borderColor: '#CBD5E1',
          transform: 'translateY(-8px)',
        },
      }}
    >
      {/* Large decorative quote mark - background */}
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          left: -10,
          fontSize: '120px',
          color: '#E0E7FF',
          lineHeight: 1,
          fontWeight: 900,
          zIndex: 0,
        }}
      >
        "
      </Box>

      <CardContent
        sx={{
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Quote Text */}
        <Typography
          variant="body1"
          sx={{
            color: '#374151',
            fontStyle: 'italic',
            marginBottom: '24px',
            flexGrow: 1,
            fontSize: '15px',
            lineHeight: 1.7,
            fontWeight: 500,
            position: 'relative',
            zIndex: 2,
          }}
        >
          "{quote}"
        </Typography>

        {/* Divider Line */}
        <Box
          sx={{
            height: 2,
            background: 'linear-gradient(90deg, #2D5BE3, #FF9500)',
            marginBottom: 3,
            borderRadius: 1,
          }}
        />

        {/* Client Info - always at bottom */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            src={image}
            alt={name}
            sx={{
              width: 56,
              height: 56,
              backgroundColor: image
                ? 'transparent'
                : 'linear-gradient(135deg, #2D5BE3 0%, #FF9500 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '18px',
              flexShrink: 0,
              border: '2px solid #F3F4F6',
            }}
          >
            {!image && getInitials()}
          </Avatar>

          {/* Name & Details */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: '#1F2937',
                marginBottom: '2px',
                fontSize: '15px',
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#6B7280',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              {designation}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#9CA3AF',
                display: 'block',
                fontSize: '12px',
              }}
            >
              {organization}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
