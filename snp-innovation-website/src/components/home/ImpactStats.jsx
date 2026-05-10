/* ========================================
   IMPACT STATS — animated counter strip
   All stats in ONE row on desktop using CSS Grid.
   MUI Grid removed — it was wrapping the 6th stat
   to a second row because md=3 * 6 = 18 > 12.
   ======================================== */

import { Box, Container, Typography } from '@mui/material';
import StatCounter from '../common/StatCounter';

const ImpactStats = ({ statsData = [] }) => {
  const validStats = statsData.filter((stat) => stat && stat.label && stat.count);

  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 3, md: 5 },
        background: 'linear-gradient(135deg, #0F172A 0%, #1a2a3a 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/*
          CSS Grid — one column per stat.
          On desktop: all stats in a single row (repeat(N, 1fr)).
          On mobile: 2 cols grid, never wraps a lone stat.
        */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: `repeat(${validStats.length}, 1fr)`,
            },
            gap: { xs: 2, md: 0 },
          }}
        >
          {validStats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                textAlign: 'center',
                px: { xs: 1, md: 2 },
                borderTop: '3px solid #CC2020',
                pt: { xs: 2, md: 3 },
                pb: { xs: 2, md: 3 },
                /* Divider between stats on desktop */
                borderRight: {
                  md: index < validStats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                },
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-6px)' },
              }}
            >
              {/* Animated number */}
              <Box sx={{ mb: 1 }}>
                <StatCounter count={stat.count} />
              </Box>

              {/* Label */}
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: '12px', md: '14px' },
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.8)',
                  letterSpacing: '0.3px',
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ImpactStats;
