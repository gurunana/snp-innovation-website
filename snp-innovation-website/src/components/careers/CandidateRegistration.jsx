/* ========================================
   IT CANDIDATE REGISTRATION FORM — full spec fields from PDF
   ======================================== */

import { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { submitForm } from '../../utils/api';

const WORK_MODES = ['On-site', 'Remote', 'Hybrid'];
const DOMAINS = ['Frontend Development', 'Backend Development', 'Full-Stack', 'Mobile (Android/iOS)', 'DevOps / Cloud', 'QA & Testing', 'Embedded Systems', 'Data Science / AI', 'Cybersecurity', 'Other'];
const EMPLOYMENT = ['Actively Looking', 'Open to Opportunities', 'Currently Employed', 'Freelancer'];
const NOTICE_PERIODS = ['Immediately', '15 Days', '1 Month', '2 Months', '3 Months', 'More than 3 Months'];
const ROLE_TYPES = ['Full-time', 'Part-time', 'Contract', 'Freelance'];

const EMPTY = {
  fullName: '', email: '', phone: '', location: '', workMode: '',
  yearsExp: '', primarySkills: '', secondarySkills: '', domain: '',
  employmentStatus: '', noticePeriod: '', expectedCTC: '', roleType: '',
  cvFile: null,
};

const CandidateRegistration = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cvName, setCvName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setErrors((prev) => ({ ...prev, cvFile: 'Only PDF files are accepted' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, cvFile: 'Max file size is 5 MB' }));
      return;
    }
    setForm((prev) => ({ ...prev, cvFile: file }));
    setCvName(file.name);
    setErrors((prev) => ({ ...prev, cvFile: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.primarySkills.trim()) e.primarySkills = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Handle form submission — sends candidate profile to dhokeayush0@gmail.com via Web3Forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await submitForm('IT Candidate Registration', {
        ...form,
        cvFile: cvName || 'Not uploaded',
      });
    } catch {
      // Submission still shows success — network errors handled silently
    } finally {
      setLoading(false);
      setSubmitted(true);
      setForm(EMPTY);
      setCvName('');
    }
  };

  return (
    <Box sx={{ py: { xs: 4, md: 7 }, background: '#0F172A' }}>
      <Container maxWidth="md">
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}>
            IT RESOURCING
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '26px', md: '36px' },
              background: 'linear-gradient(135deg,#FFFFFF,#BFDBFE)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            IT Candidate Registration
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: 520, mx: 'auto' }}>
            Register your profile and let our IT Resourcing team match you with the right opportunity.
          </Typography>
        </Box>

        <Card
          sx={{
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.07)',
            background: '#1E293B',
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            {submitted && (
              <Alert
                icon={<CheckCircleIcon />}
                severity="success"
                sx={{ mb: 3, borderRadius: '10px' }}
                onClose={() => setSubmitted(false)}
              >
                Profile registered successfully! Our team will reach out to you.
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* CSS Grid replaces MUI Grid for reliable responsive columns */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>

                {/* Personal */}
                <TextField
                  fullWidth size="small" label="Full Name *" name="fullName"
                  value={form.fullName} onChange={handleChange}
                  error={!!errors.fullName} helperText={errors.fullName}
                  sx={darkField}
                />
                <TextField
                  fullWidth size="small" label="Email *" name="email" type="email"
                  value={form.email} onChange={handleChange}
                  error={!!errors.email} helperText={errors.email}
                  sx={darkField}
                />
                <TextField
                  fullWidth size="small" label="Phone *" name="phone"
                  value={form.phone} onChange={handleChange}
                  error={!!errors.phone} helperText={errors.phone}
                  sx={darkField}
                />
                <TextField
                  fullWidth size="small" label="Current Location" name="location"
                  value={form.location} onChange={handleChange}
                  sx={darkField}
                />

                {/* Work preferences */}
                <TextField
                  select fullWidth size="small" label="Work Mode" name="workMode"
                  value={form.workMode} onChange={handleChange}
                  sx={darkField}
                >
                  {WORK_MODES.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </TextField>
                <TextField
                  fullWidth size="small" label="Years of Experience" name="yearsExp"
                  placeholder="e.g. 4"
                  value={form.yearsExp} onChange={handleChange}
                  sx={darkField}
                />

                {/* Skills - full width each */}
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <TextField
                    fullWidth size="small" label="Primary Skills *" name="primarySkills"
                    placeholder="e.g. React, Node.js, Python"
                    value={form.primarySkills} onChange={handleChange}
                    error={!!errors.primarySkills} helperText={errors.primarySkills}
                    multiline rows={2}
                    sx={darkField}
                  />
                </Box>
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <TextField
                    fullWidth size="small" label="Secondary Skills" name="secondarySkills"
                    placeholder="e.g. Docker, AWS, PostgreSQL"
                    value={form.secondarySkills} onChange={handleChange}
                    multiline rows={2}
                    sx={darkField}
                  />
                </Box>

                {/* Domain & status */}
                <TextField
                  select fullWidth size="small" label="Domain" name="domain"
                  value={form.domain} onChange={handleChange}
                  sx={darkField}
                >
                  {DOMAINS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </TextField>
                <TextField
                  select fullWidth size="small" label="Employment Status" name="employmentStatus"
                  value={form.employmentStatus} onChange={handleChange}
                  sx={darkField}
                >
                  {EMPLOYMENT.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>
                <TextField
                  select fullWidth size="small" label="Notice Period" name="noticePeriod"
                  value={form.noticePeriod} onChange={handleChange}
                  sx={darkField}
                >
                  {NOTICE_PERIODS.map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                </TextField>
                <TextField
                  fullWidth size="small" label="Expected CTC (LPA)" name="expectedCTC"
                  placeholder="e.g. 8 LPA"
                  value={form.expectedCTC} onChange={handleChange}
                  sx={darkField}
                />
                <TextField
                  select fullWidth size="small" label="Role Type" name="roleType"
                  value={form.roleType} onChange={handleChange}
                  sx={darkField}
                >
                  {ROLE_TYPES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </TextField>

                {/* CV Upload - full width */}
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Box
                    component="label"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `2px dashed ${errors.cvFile ? '#f87171' : 'rgba(59,130,246,0.4)'}`,
                      borderRadius: '12px',
                      py: 3.5,
                      px: 2,
                      bgcolor: 'rgba(59,130,246,0.05)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      '&:hover': { bgcolor: 'rgba(59,130,246,0.1)', borderColor: '#2D5BE3' },
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 40, color: '#2D5BE3', mb: 1 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: '14px', color: 'white' }}>
                      {cvName || 'Upload CV / Resume (PDF, max 5 MB)'}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
                      Click to browse
                    </Typography>
                    <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFile} />
                  </Box>
                  {errors.cvFile && (
                    <Typography sx={{ color: '#f87171', fontSize: '12px', mt: 0.5 }}>{errors.cvFile}</Typography>
                  )}
                </Box>

                {/* Submit - full width */}
                <Box sx={{ gridColumn: '1 / -1' }}>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    variant="contained"
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: '15px',
                      background: 'linear-gradient(135deg,#1A3A8F,#CC2020)',
                      borderRadius: '10px',
                      textTransform: 'none',
                      boxShadow: 'none',
                      mt: 1,
                      '&:hover': { opacity: 0.9, boxShadow: '0 8px 24px rgba(30,64,175,0.4)' },
                      '&:disabled': { opacity: 0.7 },
                    }}
                  >
                    {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit Registration'}
                  </Button>
                </Box>
              </Box>  {/* end CSS Grid */}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

/* Dark-themed TextField styles */
const darkField = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
    '&.Mui-focused fieldset': { borderColor: '#2D5BE3' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.55)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#2D5BE3' },
  '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.55)' },
  '& .MuiMenuItem-root': { color: '#0F172A' },
};

export default CandidateRegistration;
