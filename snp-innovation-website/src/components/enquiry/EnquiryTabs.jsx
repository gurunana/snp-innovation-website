/* ========================================
   ENQUIRY TABS - Tabbed enquiry forms for different categories
   Each tab shows a different enquiry form (STEM Lab, IT Resourcing, etc.)
   Uses EnquiryForm reusable component for form rendering

   Props:
   - categories (array): Array of enquiry category objects with fields
======================================== */

import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import EnquiryForm from '../common/EnquiryForm';

const EnquiryTabs = ({ categories = [] }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // Handle tab change
  const handleTabChange = (e, newValue) => {
    setSelectedTabIndex(newValue);
  };

  // Get current selected category
  const currentCategory = categories[selectedTabIndex];

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log('Enquiry submitted:', {
      category: currentCategory?.name,
      data: formData,
    });
    // TODO: Dispatch Redux action to submit enquiry
  };

  if (!categories || categories.length === 0) {
    return (
      <Box className="text-center py-12">
        <Typography variant="body1">No enquiry categories available</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Tab Navigation */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          marginBottom: 4,
        }}
      >
        <Tabs
          value={selectedTabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: { xs: 'auto', sm: 'auto' },
              padding: { xs: '8px 12px', sm: '12px 24px' },
              fontSize: { xs: '12px', sm: '14px' },
              fontWeight: 500,
            },
            '& .Mui-selected': {
              color: 'var(--color-primary)',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--color-primary)',
            },
          }}
        >
          {categories.map((category, index) => (
            <Tab
              key={category.id}
              label={category.name}
              id={`enquiry-tab-${index}`}
              aria-controls={`enquiry-panel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content - Form */}
      {currentCategory && (
        <Card>
          <CardContent className="p-8">
            {/* Category Description */}
            {currentCategory.description && (
              <Box className="mb-6">
                <Typography
                  variant="body2"
                  sx={{ color: 'var(--color-text-secondary)' }}
                >
                  {currentCategory.description}
                </Typography>
              </Box>
            )}

            {/* Enquiry Form */}
            {currentCategory.fields && currentCategory.fields.length > 0 ? (
              <EnquiryForm
                fields={currentCategory.fields}
                onSubmit={handleFormSubmit}
                buttonText="Submit Enquiry"
              />
            ) : (
              <Typography variant="body2" className="text-center py-6">
                No form fields available for this category
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default EnquiryTabs;
