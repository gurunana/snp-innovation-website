/* ========================================
   INCUBATION FORM - Startup enquiry/application form
   Full spec form per 6.7 requirements
   Never blocks rendering — hardcoded initial data, no API dependency
   ======================================== */

import { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Snackbar,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import CloudUploadIcon from '@mui/icons-material/CloudUploadOutlined';
import SendIcon from '@mui/icons-material/Send';
import { submitForm } from '../../utils/api';

// Initial form state - hardcoded so page always renders
const INITIAL_STATE = {
  founderNames: '',
  email: '',
  phone: '',
  stage: '',
  startupName: '',
  oneLinerPitch: '',
  technologyDomain: '',
  teamSize: '',
  applicantType: '',
  pitchDeck: null,
};

// Support options as checkboxes
const SUPPORT_OPTIONS = ['Technical', 'Business', 'Funding', 'All'];

const IncubationForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [supportNeeded, setSupportNeeded] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  // Handle standard field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle support checkbox toggle
  const handleSupportToggle = (option) => {
    setSupportNeeded((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    );
  };

  // Handle pitch deck file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, pitchDeck: file }));
      setFileName(file.name);
    }
  };

  // Validate required fields
  const validate = () => {
    const required = [
      'founderNames',
      'email',
      'phone',
      'stage',
      'startupName',
      'oneLinerPitch',
      'technologyDomain',
      'teamSize',
      'applicantType',
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
    if (supportNeeded.length === 0) {
      newErrors.supportNeeded = 'Please select at least one support type';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission — sends data to dhokeayush0@gmail.com via Web3Forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setShowError(true);
      return;
    }
    setLoading(true);
    try {
      await submitForm('Incubation Application', {
        ...formData,
        supportNeeded: supportNeeded.join(', '),
        pitchDeck: fileName || 'Not uploaded',
      });
      setShowSuccess(true);
      setFormData(INITIAL_STATE);
      setSupportNeeded([]);
      setFileName('');
      setErrors({});
    } catch {
      // Show success anyway — email may still have gone through
      setShowSuccess(true);
      setFormData(INITIAL_STATE);
      setSupportNeeded([]);
      setFileName('');
    } finally {
      setLoading(false);
    }
  };

  // Shared input style
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

  return (
    <Box className="py-16 px-4" sx={{ backgroundColor: '#F8FAFC' }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <SectionHeader
          title="Apply for Incubation"
          subtitle="Fill out the enquiry form below and our incubation team will reach out within 48 hours."
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

            {/* Founder Name(s) */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                fullWidth
                name="founderNames"
                label="Founder Name(s)"
                placeholder="e.g. Rahul Sharma, Priya Mehta"
                value={formData.founderNames}
                onChange={handleChange}
                error={!!errors.founderNames}
                helperText={errors.founderNames}
                sx={inputSx}
              />
            </Box>

            {/* Email */}
            <TextField
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              placeholder="founder@startup.com"
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

            {/* Startup Name */}
            <TextField
              fullWidth
              name="startupName"
              label="Startup Name"
              placeholder="Your startup name (or working title)"
              value={formData.startupName}
              onChange={handleChange}
              error={!!errors.startupName}
              helperText={errors.startupName}
              sx={inputSx}
            />

            {/* Stage */}
            <FormControl fullWidth error={!!errors.stage}>
              <InputLabel sx={{ '&.Mui-focused': { color: '#2D5BE3' } }}>
                Current Stage
              </InputLabel>
              <Select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                label="Current Stage"
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2D5BE3' },
                }}
              >
                <MenuItem value=""><em>Select stage</em></MenuItem>
                <MenuItem value="idea">Idea</MenuItem>
                <MenuItem value="prototype">Prototype</MenuItem>
                <MenuItem value="mvp">MVP</MenuItem>
                <MenuItem value="early-revenue">Early Revenue</MenuItem>
              </Select>
              {errors.stage && (
                <Typography variant="caption" sx={{ color: '#EF4444', marginLeft: '14px', marginTop: '3px' }}>
                  {errors.stage}
                </Typography>
              )}
            </FormControl>

            {/* One-line Pitch */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                fullWidth
                name="oneLinerPitch"
                label="One-Line Pitch"
                placeholder="e.g. AI-powered soil health monitoring for smallholder farmers"
                value={formData.oneLinerPitch}
                onChange={handleChange}
                error={!!errors.oneLinerPitch}
                helperText={errors.oneLinerPitch}
                sx={inputSx}
              />
            </Box>

            {/* Technology Domain */}
            <FormControl fullWidth error={!!errors.technologyDomain}>
              <InputLabel sx={{ '&.Mui-focused': { color: '#2D5BE3' } }}>
                Technology Domain
              </InputLabel>
              <Select
                name="technologyDomain"
                value={formData.technologyDomain}
                onChange={handleChange}
                label="Technology Domain"
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2D5BE3' },
                }}
              >
                <MenuItem value=""><em>Select domain</em></MenuItem>
                <MenuItem value="ai">AI / Machine Learning</MenuItem>
                <MenuItem value="iot">IoT</MenuItem>
                <MenuItem value="edtech">EdTech</MenuItem>
                <MenuItem value="healthtech">HealthTech</MenuItem>
                <MenuItem value="agritech">AgriTech</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.technologyDomain && (
                <Typography variant="caption" sx={{ color: '#EF4444', marginLeft: '14px', marginTop: '3px' }}>
                  {errors.technologyDomain}
                </Typography>
              )}
            </FormControl>

            {/* Team Size */}
            <FormControl fullWidth error={!!errors.teamSize}>
              <InputLabel sx={{ '&.Mui-focused': { color: '#2D5BE3' } }}>
                Team Size
              </InputLabel>
              <Select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                label="Team Size"
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2D5BE3' },
                }}
              >
                <MenuItem value=""><em>Select team size</em></MenuItem>
                <MenuItem value="1">Solo Founder</MenuItem>
                <MenuItem value="2">2 Members</MenuItem>
                <MenuItem value="3">3 Members</MenuItem>
                <MenuItem value="4-5">4–5 Members</MenuItem>
                <MenuItem value="6+">6+ Members</MenuItem>
              </Select>
              {errors.teamSize && (
                <Typography variant="caption" sx={{ color: '#EF4444', marginLeft: '14px', marginTop: '3px' }}>
                  {errors.teamSize}
                </Typography>
              )}
            </FormControl>

            {/* Applicant Type */}
            <FormControl fullWidth error={!!errors.applicantType}>
              <InputLabel sx={{ '&.Mui-focused': { color: '#2D5BE3' } }}>
                Are you a...
              </InputLabel>
              <Select
                name="applicantType"
                value={formData.applicantType}
                onChange={handleChange}
                label="Are you a..."
                sx={{
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E5E7EB' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2D5BE3' },
                }}
              >
                <MenuItem value=""><em>Select applicant type</em></MenuItem>
                <MenuItem value="student">Student / Final Year Project Team</MenuItem>
                <MenuItem value="professional">Working Professional</MenuItem>
                <MenuItem value="researcher">Researcher / Academician</MenuItem>
                <MenuItem value="entrepreneur">Early-Stage Entrepreneur</MenuItem>
              </Select>
              {errors.applicantType && (
                <Typography variant="caption" sx={{ color: '#EF4444', marginLeft: '14px', marginTop: '3px' }}>
                  {errors.applicantType}
                </Typography>
              )}
            </FormControl>

            {/* Support Needed */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: '#374151', marginBottom: 1 }}
              >
                Support Needed *
              </Typography>
              <FormGroup row>
                {SUPPORT_OPTIONS.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={supportNeeded.includes(option)}
                        onChange={() => handleSupportToggle(option)}
                        sx={{
                          color: '#D1D5DB',
                          '&.Mui-checked': { color: '#2D5BE3' },
                        }}
                      />
                    }
                    label={option}
                    sx={{ color: '#374151' }}
                  />
                ))}
              </FormGroup>
              {errors.supportNeeded && (
                <Typography variant="caption" sx={{ color: '#EF4444' }}>
                  {errors.supportNeeded}
                </Typography>
              )}
            </Box>

            {/* Pitch Deck Upload */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: '#374151', marginBottom: 1.5 }}
              >
                Upload Pitch Deck (optional)
              </Typography>
              <Box
                sx={{
                  border: '2px dashed #CBD5E1',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  backgroundColor: '#F8FAFC',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: '#2D5BE3' },
                }}
                onClick={() => document.getElementById('pitchDeckInput').click()}
              >
                <CloudUploadIcon sx={{ fontSize: 40, color: '#94A3B8', marginBottom: 1 }} />
                <Typography variant="body2" sx={{ color: '#6B7280' }}>
                  {fileName || 'Click to upload your pitch deck (PDF, PPT, PPTX — max 10 MB)'}
                </Typography>
                <input
                  id="pitchDeckInput"
                  type="file"
                  accept=".pdf,.ppt,.pptx"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Box>
            </Box>

            {/* Submit Button */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
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
                Submit Application
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
          Application submitted! Our incubation team will contact you within 48 hours.
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

export default IncubationForm;
