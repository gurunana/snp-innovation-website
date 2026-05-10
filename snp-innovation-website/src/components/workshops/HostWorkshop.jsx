/* ========================================
   HOST A WORKSHOP FORM - per spec 7.5
   Institution/Org Name, Contact, Email, Phone, Workshop Type,
   Participants, Dates, Specific Requirements
   Never blocks rendering — hardcoded initial state
   ======================================== */

import { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import SendIcon from '@mui/icons-material/Send';

// Hardcoded initial state — page renders instantly
const INITIAL_STATE = {
  institutionName: '',
  contactPerson: '',
  email: '',
  phone: '',
  preferredWorkshopType: '',
  approximateParticipants: '',
  preferredDates: '',
  specificRequirements: '',
};

const HostWorkshop = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate required fields
  const validate = () => {
    const required = [
      'institutionName',
      'contactPerson',
      'email',
      'phone',
      'preferredWorkshopType',
      'approximateParticipants',
      'preferredDates',
    ];
    const newErrors = {};
    required.forEach((field) => {
      if (!formData[field] || !String(formData[field]).trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission — never throws errors that block render
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // TODO: replace with actual API call / Redux dispatch
        console.log('Host Workshop Request Submitted:', formData);
        setShowSuccess(true);
        setFormData(INITIAL_STATE);
        setErrors({});
      } catch {
        setShowError(true);
      }
    } else {
      setShowError(true);
    }
  };

  // Shared input styling
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: '#F9FAFB',
      '& fieldset': { borderColor: '#E5E7EB' },
      '&:hover fieldset': { borderColor: '#D1D5DB' },
      '&.Mui-focused fieldset': { borderColor: '#2D5BE3', borderWidth: '2px' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#2D5BE3' },
  };

  const selectSx = {
    borderRadius: '8px',
    backgroundColor: '#F9FAFB',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2D5BE3' },
  };

  return (
    <Box className="py-16 px-4" sx={{ backgroundColor: '#F8FAFC' }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <SectionHeader
          title="Host a Workshop with SNP Innovation"
          subtitle="Bring world-class innovation workshops to your institution or organisation. Fill in your details and we'll craft a custom program for you."
        />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: { xs: '24px', sm: '40px' },
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 3,
            }}
          >

            {/* Institution / Organization Name */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                fullWidth
                name="institutionName"
                label="Institution / Organization Name"
                placeholder="e.g. ABC Engineering College, XYZ Pvt. Ltd."
                value={formData.institutionName}
                onChange={handleChange}
                error={!!errors.institutionName}
                helperText={errors.institutionName}
                sx={inputSx}
              />
            </Box>

            {/* Contact Person */}
            <TextField
              fullWidth
              name="contactPerson"
              label="Contact Person Name"
              placeholder="Full name of primary contact"
              value={formData.contactPerson}
              onChange={handleChange}
              error={!!errors.contactPerson}
              helperText={errors.contactPerson}
              sx={inputSx}
            />

            {/* Email */}
            <TextField
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              placeholder="contact@institution.edu"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={inputSx}
            />

            {/* Phone */}
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="+91-XXXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={inputSx}
            />

            {/* Preferred Workshop Type */}
            <FormControl fullWidth error={!!errors.preferredWorkshopType}>
              <InputLabel sx={{ '&.Mui-focused': { color: '#2D5BE3' } }}>
                Preferred Workshop Type
              </InputLabel>
              <Select
                name="preferredWorkshopType"
                value={formData.preferredWorkshopType}
                onChange={handleChange}
                label="Preferred Workshop Type"
                sx={selectSx}
              >
                <MenuItem value=""><em>Select workshop type</em></MenuItem>
                <MenuItem value="robotics">Robotics Fundamentals</MenuItem>
                <MenuItem value="ai-ml">AI & Machine Learning</MenuItem>
                <MenuItem value="iot">IoT — Build a Smart Device</MenuItem>
                <MenuItem value="design-thinking">Design Thinking & Innovation</MenuItem>
                <MenuItem value="coding-bootcamp">Coding Bootcamp (Scratch/Python/Arduino)</MenuItem>
                <MenuItem value="industry-4">Industry 4.0 & Digital Transformation</MenuItem>
                <MenuItem value="plc-automation">PLC & Industrial Automation</MenuItem>
                <MenuItem value="lean-startup">Lean Startup & MVP Development</MenuItem>
                <MenuItem value="pitch-perfect">Pitch Perfect — Investor Presentation</MenuItem>
                <MenuItem value="csr-digital">Rural Innovation & Digital Literacy</MenuItem>
                <MenuItem value="custom">Custom / Other (specify in requirements)</MenuItem>
              </Select>
              {errors.preferredWorkshopType && (
                <Typography variant="caption" sx={{ color: '#EF4444', marginLeft: '14px', marginTop: '3px' }}>
                  {errors.preferredWorkshopType}
                </Typography>
              )}
            </FormControl>

            {/* Approximate Participants */}
            <FormControl fullWidth error={!!errors.approximateParticipants}>
              <InputLabel sx={{ '&.Mui-focused': { color: '#2D5BE3' } }}>
                Approximate Participants
              </InputLabel>
              <Select
                name="approximateParticipants"
                value={formData.approximateParticipants}
                onChange={handleChange}
                label="Approximate Participants"
                sx={selectSx}
              >
                <MenuItem value=""><em>Select participant range</em></MenuItem>
                <MenuItem value="10-25">10–25</MenuItem>
                <MenuItem value="25-50">25–50</MenuItem>
                <MenuItem value="50-100">50–100</MenuItem>
                <MenuItem value="100-200">100–200</MenuItem>
                <MenuItem value="200+">200+</MenuItem>
              </Select>
              {errors.approximateParticipants && (
                <Typography variant="caption" sx={{ color: '#EF4444', marginLeft: '14px', marginTop: '3px' }}>
                  {errors.approximateParticipants}
                </Typography>
              )}
            </FormControl>

            {/* Preferred Dates */}
            <TextField
              fullWidth
              name="preferredDates"
              label="Preferred Dates"
              placeholder="e.g. June 15–16, 2026 or any date in July 2026"
              value={formData.preferredDates}
              onChange={handleChange}
              error={!!errors.preferredDates}
              helperText={errors.preferredDates}
              sx={inputSx}
            />

            {/* Specific Requirements */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                fullWidth
                name="specificRequirements"
                label="Specific Requirements (optional)"
                placeholder="Any particular topics, equipment needs, language preference, accessibility requirements, or special requests..."
                value={formData.specificRequirements}
                onChange={handleChange}
                multiline
                rows={4}
                sx={inputSx}
              />
            </Box>

            {/* Submit Button */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Button
                type="submit"
                fullWidth
                endIcon={<SendIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #2D5BE3 0%, #2563EB 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '14px 32px',
                  fontSize: '15px',
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
                  },
                }}
              >
                Submit Workshop Request
              </Button>
            </Box>
          </Box>
        </Box>
      </div>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Request received! Our workshops team will reach out within 48 hours to finalise details.
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          Please fill in all required fields correctly.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HostWorkshop;
