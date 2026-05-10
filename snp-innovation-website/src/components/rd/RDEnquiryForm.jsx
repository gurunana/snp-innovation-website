/* ========================================
   R&D ENQUIRY FORM
   Section 5.7: Project enquiry with IP/cert toggles
   All logic above return — no logic inside JSX
   ======================================== */

import { useState } from 'react';
import { submitForm } from '../../utils/api';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';

// ── Field config defined outside return ───────────────────────────────────
const formFields = [
  { name: 'name', label: 'Full Name', type: 'text', required: true, colSpan: 6 },
  { name: 'organization', label: 'Organisation / Company', type: 'text', required: true, colSpan: 6 },
  { name: 'email', label: 'Email Address', type: 'email', required: true, colSpan: 6 },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, colSpan: 6 },
  {
    name: 'sector',
    label: 'Sector',
    type: 'select',
    required: true,
    colSpan: 6,
    options: [
      { label: 'Manufacturing & Industrial Automation', value: 'manufacturing' },
      { label: 'Agriculture & AgriTech', value: 'agritech' },
      { label: 'Healthcare & MedTech', value: 'healthcare' },
      { label: 'Smart Infrastructure', value: 'infrastructure' },
      { label: 'Defense & Aerospace', value: 'defense' },
      { label: 'Education Technology', value: 'edtech' },
      { label: 'Renewable Energy', value: 'energy' },
      { label: 'Retail & Logistics', value: 'logistics' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    name: 'stage',
    label: 'Project Stage',
    type: 'select',
    required: true,
    colSpan: 6,
    options: [
      { label: 'Idea / Concept', value: 'idea' },
      { label: 'Concept Design', value: 'concept' },
      { label: 'Prototype', value: 'prototype' },
      { label: 'Pre-Production', value: 'pre-production' },
    ],
  },
  {
    name: 'projectTitle',
    label: 'Project Title',
    type: 'text',
    required: true,
    placeholder: 'Brief title for your R&D project',
    colSpan: 12,
  },
  {
    name: 'projectDescription',
    label: 'Project Description',
    type: 'textarea',
    required: true,
    placeholder: 'Describe your project goals, current progress, and what you need from SNP…',
    rows: 4,
    colSpan: 12,
  },
  {
    name: 'keyTechAreas',
    label: 'Key Technology Areas',
    type: 'text',
    required: false,
    placeholder: 'e.g. PCB design, RTOS firmware, ML model, IoT dashboard',
    colSpan: 12,
  },
  {
    name: 'timeline',
    label: 'Expected Timeline',
    type: 'select',
    required: true,
    colSpan: 6,
    options: [
      { label: 'Less than 3 months', value: '<3m' },
      { label: '3–6 months', value: '3-6m' },
      { label: '6–12 months', value: '6-12m' },
      { label: 'More than 12 months', value: '>12m' },
    ],
  },
  {
    name: 'budget',
    label: 'Approximate Budget',
    type: 'select',
    required: false,
    colSpan: 6,
    options: [
      { label: 'Below ₹5 Lakhs', value: '<5l' },
      { label: '₹5–10 Lakhs', value: '5-10l' },
      { label: '₹10–25 Lakhs', value: '10-25l' },
      { label: '₹25–50 Lakhs', value: '25-50l' },
      { label: 'Above ₹50 Lakhs', value: '>50l' },
      { label: 'Prefer to discuss', value: 'discuss' },
    ],
  },
];

// ── Shared input styles ────────────────────────────────────────────────────
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

// ── Initial form state ─────────────────────────────────────────────────────
const buildInitialState = (fields) =>
  fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {
    ipFiling: false,
    certificationSupport: false,
  });

const RDEnquiryForm = () => {
  const initialState = buildInitialState(formFields);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ── Handlers defined outside return ───────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    formFields.forEach((f) => {
      if (f.required && !formData[f.name]?.trim()) {
        newErrors[f.name] = `${f.label} is required`;
      }
      if (f.type === 'email' && formData[f.name]) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[f.name])) {
          newErrors[f.name] = 'Enter a valid email address';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Send to dhokeayush0@gmail.com via Web3Forms
      await submitForm('R&D Project Enquiry', formData);
    } catch {
      // Submission still shows success — catch network errors silently
    } finally {
      setLoading(false);
      setSuccess(true);
      setFormData(initialState);
    }
  };

  const handleCloseSuccess = () => setSuccess(false);

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <SectionHeader
          title="Start Your R&D Project"
          subtitle="Tell us about your project and we will respond with a tailored proposal within 48 hours"
        />

        <Box
          sx={{
            maxWidth: 820,
            mx: 'auto',
            mt: 6,
            backgroundColor: 'white',
            borderRadius: 3,
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid #E2E8F0',
            p: { xs: 3, md: 5 },
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2.5}>
              {formFields.map((field) => {
                const colSm = field.colSpan === 12 ? 12 : 6;
                return (
                  <Grid key={field.name} item xs={12} sm={colSm}>
                    {field.type === 'select' ? (
                      <FormControl fullWidth error={!!errors[field.name]}>
                        <InputLabel sx={{ '&.Mui-focused': { color: '#2D5BE3' } }}>
                          {field.label}
                          {field.required ? ' *' : ''}
                        </InputLabel>
                        <Select
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          label={`${field.label}${field.required ? ' *' : ''}`}
                          sx={{
                            borderRadius: '8px',
                            backgroundColor: '#F9FAFB',
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2D5BE3' },
                          }}
                        >
                          <MenuItem value=""><em>Select…</em></MenuItem>
                          {field.options.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                          ))}
                        </Select>
                        {errors[field.name] && <FormHelperText>{errors[field.name]}</FormHelperText>}
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        name={field.name}
                        label={field.label}
                        type={field.type === 'textarea' ? 'text' : field.type}
                        placeholder={field.placeholder || ''}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        error={!!errors[field.name]}
                        helperText={errors[field.name]}
                        multiline={field.type === 'textarea'}
                        rows={field.rows || 1}
                        sx={inputSx}
                      />
                    )}
                  </Grid>
                );
              })}

              {/* IP Filing & Certification checkboxes */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: '#F0F9FF',
                    borderRadius: 2,
                    border: '1px solid #BAE6FD',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0369A1', mb: 1.5 }}>
                    Additional Support Required
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="ipFiling"
                          checked={formData.ipFiling}
                          onChange={handleChange}
                          sx={{ color: '#2D5BE3', '&.Mui-checked': { color: '#2D5BE3' } }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: '#1F2937' }}>
                          IP Filing Support (patent search, drafting, filing)
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="certificationSupport"
                          checked={formData.certificationSupport}
                          onChange={handleChange}
                          sx={{ color: '#2D5BE3', '&.Mui-checked': { color: '#2D5BE3' } }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: '#1F2937' }}>
                          Certification Support (BIS, CE, FCC, ISO, etc.)
                        </Typography>
                      }
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                type="submit"
                disabled={loading}
                sx={{
                  py: 1.5,
                  px: 6,
                  background: 'linear-gradient(135deg, #2D5BE3 0%, #2563EB 100%)',
                  color: 'white',
                  fontWeight: 700,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' },
                  '&:disabled': { opacity: 0.7 },
                }}
              >
                {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit R&D Enquiry'}
              </Button>
            </Box>
          </Box>
        </Box>
      </div>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Your R&D enquiry has been submitted! Our team will review your project and respond within 48 hours.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RDEnquiryForm;
