/* ========================================
   LOADING SPINNER - Modern loading indicator
   Centered, full-section spinner with brand color
   Uses MUI CircularProgress for consistent UI

   Props:
   - size (number): Spinner size in pixels (default: 50)
   - text (string): Optional loading text below spinner
   - fullScreen (boolean): If true, takes full screen height
   ======================================== */

import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ size = 50, text = 'Loading...', fullScreen = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        height: fullScreen ? '100vh' : '400px',
        padding: fullScreen ? 0 : '60px 20px',
        backgroundColor: fullScreen ? '#F9FAFB' : 'transparent',
      }}
    >
      {/* Spinner with gradient track */}
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
        }}
      >
        <CircularProgress
          size={size}
          thickness={4}
          sx={{
            color: 'url(#spinnerGradient)',
            position: 'absolute',
          }}
        />
        <svg
          width="0"
          height="0"
          style={{ position: 'absolute', pointerEvents: 'none' }}
        >
          <defs>
            <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D5BE3" />
              <stop offset="100%" stopColor="#FF9500" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      {/* Loading text */}
      {text && (
        <Typography
          variant="body2"
          sx={{
            color: '#6B7280',
            fontSize: '14px',
            fontWeight: 500,
            textAlign: 'center',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          {text}
        </Typography>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </Box>
  );
};

export default LoadingSpinner;
