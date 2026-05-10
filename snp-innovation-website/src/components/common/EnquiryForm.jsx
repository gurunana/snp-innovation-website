/* ========================================
   ENQUIRY FORM - Modern form component
   Clean white card wrapper with shadow
   MUI TextFields with rounded corners
   Gradient submit button, success/error feedback

   Props:
   - fields (array): Array of field config objects:
     {
       name (string): Field name for form state and submission
       label (string): Display label
       type (string): 'text' | 'email' | 'tel' | 'textarea' | 'select'
       required (boolean): Is field required
       options (array): For select type - [{label, value}]
       placeholder (string): Input placeholder
       rows (number): For textarea type
     }
   - onSubmit (function): Callback with form data
   - buttonText (string): Submit button text (default: "Submit")
   - loading (boolean): Show loading state on button
   - title (string): Form title
   - subtitle (string): Form subtitle
   ======================================== */

import { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import PrimaryButton from './PrimaryButton';

const EnquiryForm = ({
  fields = [],
  onSubmit,
  buttonText = 'Submit',
  loading = false,
  title = 'Get in Touch',
  subtitle = 'We would love to hear from you',
}) => {
  // Initialize form state with empty values for all fields
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }

      // Email validation
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        onSubmit(formData);
        setShowSuccess(true);
        // Reset form after successful submission
        setFormData(initialState);
        // Hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } catch (error) {
        setErrorMessage(error.message || 'An error occurred. Please try again.');
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    } else {
      setErrorMessage('Please fill in all required fields correctly.');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      <CardContent sx={{ padding: { xs: '24px', sm: '40px' } }}>
        {/* Form Header */}
        {(title || subtitle) && (
          <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
            {title && (
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#1F2937',
                  marginBottom: 1,
                  fontSize: { xs: '20px', sm: '24px' },
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  fontSize: { xs: '13px', sm: '14px' },
                  lineHeight: 1.6,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {fields.map((field) => {
              // Render different input types
              if (field.type === 'select') {
                return (
                  <FormControl
                    fullWidth
                    key={field.name}
                    error={!!errors[field.name]}
                  >
                    <InputLabel
                      sx={{
                        color: '#6B7280',
                        '&.Mui-focused': {
                          color: '#2D5BE3',
                        },
                      }}
                    >
                      {field.label}
                    </InputLabel>
                    <Select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      label={field.label}
                      sx={{
                        borderRadius: '8px',
                        backgroundColor: '#F9FAFB',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#E5E7EB',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#D1D5DB',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2D5BE3',
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select {field.label.toLowerCase()}</em>
                      </MenuItem>
                      {field.options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              // Text, email, tel, textarea inputs
              return (
                <TextField
                  key={field.name}
                  fullWidth
                  name={field.name}
                  label={field.label}
                  type={field.type === 'textarea' ? 'text' : field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  multiline={field.type === 'textarea'}
                  rows={field.rows || 4}
                  required={field.required}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#F9FAFB',
                      transition: 'all 0.3s ease',
                      '& fieldset': {
                        borderColor: '#E5E7EB',
                      },
                      '&:hover fieldset': {
                        borderColor: '#D1D5DB',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2D5BE3',
                        borderWidth: '2px',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#1F2937',
                      fontSize: '14px',
                      '&::placeholder': {
                        color: '#9CA3AF',
                        opacity: 1,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#6B7280',
                      '&.Mui-focused': {
                        color: '#2D5BE3',
                      },
                    },
                  }}
                />
              );
            })}

            {/* Submit Button */}
            <Box sx={{ paddingTop: 2 }}>
              <PrimaryButton
                type="submit"
                disabled={loading}
                fullWidth
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={18} color="inherit" />
                    Submitting...
                  </Box>
                ) : (
                  buttonText
                )}
              </PrimaryButton>
            </Box>
          </Box>
        </Box>
      </CardContent>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            color: '#16A34A',
            border: '1px solid #86EFAC',
            borderRadius: '8px',
          }}
        >
          Form submitted successfully! We will get back to you soon.
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#DC2626',
            border: '1px solid #FCA5A5',
            borderRadius: '8px',
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default EnquiryForm;
