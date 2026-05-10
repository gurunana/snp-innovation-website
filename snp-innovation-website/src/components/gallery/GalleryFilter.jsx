/* ========================================
   GALLERY FILTER - Filter tabs for photo gallery
   Displays category tabs to filter photos by category

   Props:
   - categories (array): List of category objects with id and name
   - activeFilter (string): Currently selected filter/category name
   - onFilterChange (function): Callback when filter is changed
======================================== */

import { Box, Chip, Stack } from '@mui/material';

const GalleryFilter = ({ categories, activeFilter, onFilterChange }) => {
  // All button is the first filter option
  const allButton = { id: 0, name: 'All' };
  const filterOptions = [allButton, ...categories];

  return (
    <Box className="my-12 text-center">
      <Stack
        direction="row"
        spacing={1.5}
        justifyContent="center"
        flexWrap="wrap"
        useFlexGap
      >
        {filterOptions.map((filter) => {
          const isActive = activeFilter === filter.name;

          return (
            <Chip
              key={filter.id}
              label={filter.name}
              onClick={() => onFilterChange(filter.name)}
              variant={isActive ? 'filled' : 'outlined'}
              sx={{
                borderColor: isActive ? 'var(--color-primary)' : 'var(--color-primary)',
                backgroundColor: isActive
                  ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                  : 'transparent',
                color: isActive ? 'white' : 'var(--color-primary)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                fontWeight: isActive ? 'bold' : '500',
                fontSize: '13px',
                borderWidth: '1.5px',
                padding: '8px 16px',
                borderRadius: '50px',
                boxShadow: isActive ? '0 8px 24px rgba(21, 101, 192, 0.25)' : 'none',
                '&:hover': {
                  backgroundColor: isActive
                    ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                    : 'rgba(21, 101, 192, 0.08)',
                  borderColor: 'var(--color-primary)',
                  transform: 'translateY(-2px)',
                  boxShadow: isActive ? '0 12px 32px rgba(21, 101, 192, 0.3)' : '0 4px 12px rgba(21, 101, 192, 0.1)',
                },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default GalleryFilter;
