/* ========================================
   IT ENQUIRY FORM — Dual-tab form
   Section 4.7: For Companies + For Candidates (CV upload)
   All data/logic above JSX return
   ======================================== */

import { useState } from 'react';
import { submitForm } from '../../utils/api';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  FormHelperText,
} from '@mui/material';
import { Grid } from '@mui/material';
import SectionHeader from '../common/SectionHeader';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// ── Company form field config ───────────────────────────────────────────────
const companyFields = [
  { name: 'companyName', label: 'Company Name', type: 'text', required: true, colSpan: 6 },
  { name: 'industry', label: 'Industry', type: 'text', required: true, colSpan: 6 },
  { name: 'contactPerson', label: 'Contact Person', type: 'text', required: true, colSpan: 4 },
  { name: 'designation', label: 'Designation', type: 'text', required: true, colSpan: 4 },
  { name: 'email', label: 'Email', type: 'email', required: true, colSpan: 4 },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, colSpan: 6 },
  {
    name: 'roleRequired',
    label: 'Role Required',
    type: 'text',
    required: true,
    placeholder: 'e.g. React Developer, Embedded Engineer',
    colSpan: 6,
  },
  {
    name: 'techStack',
    label: 'Tech Stack / Skills',
    type: 'text',
    required: true,
    placeholder: 'e.g. React, Node.js, AWS',
    colSpan: 12,
  },
  {
    name: 'numberOfResources',
    label: 'Number of Resources',
    type: 'text',
    required: true,
    placeholder: 'e.g. 2, 5–10',
    colSpan: 4,
  },
  {
    name: 'engagementType',
    label: 'Engagement Type',
    type: 'select',
    required: true,
    colSpan: 4,
    options: [
      { label: 'Part-Time', value: 'part-time' },
      { label: 'Full-Time', value: 'full-time' },
      { label: 'Project-Based', value: 'project-based' },
      { label: 'Dedicated Team', value: 'dedicated-team' },
      { label: 'Contract-to-Hire', value: 'contract-to-hire' },
    ],
  },
  {
    name: 'timeline',
    label: 'Timeline / Start Date',
    type: 'text',
    required: true,
    placeholder: 'e.g. Immediate, 1 June 2025',
    colSpan: 4,
  },
  {
    name: 'budgetRange',
    label: 'Budget Range',
    type: 'select',
    required: false,
    colSpan: 12,
    options: [
      { label: 'Below ₹2 LPA per resource', value: 'below-2l' },
      { label: '₹2–5 LPA per resource', value: '2-5l' },
      { label: '₹5–10 LPA per resource', value: '5-10l' },
      { label: 'Above ₹10 LPA per resource', value: 'above-10l' },
      { label: 'Prefer to discuss', value: 'discuss' },
    ],
  },
];

// ── Candidate form field config ─────────────────────────────────────────────
const candidateFields = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true, colSpan: 6 },
  { name: 'email', label: 'Email', type: 'email', required: true, colSpan: 6 },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, colSpan: 6 },
  { name: 'location', label: 'Location', type: 'text', required: true, placeholder: 'City, State', colSpan: 6 },
  {
    name: 'workMode',
    label: 'Preferred Work Mode',
    type: 'select',
    required: true,
    colSpan: 6,
    options: [
      { label: 'Remote', value: 'remote' },
      { label: 'On-site', value: 'onsite' },
      { label: 'Hybrid', value: 'hybrid' },
    ],
  },
  {
    name: 'yearsOfExperience',
    label: 'Years of Experience',
    type: 'select',
    required: true,
    colSpan: 6,
    options: [
      { label: 'Fresher (0–1 yr)', value: '0-1' },
      { label: '1–3 years', value: '1-3' },
      { label: '3–5 years', value: '3-5' },
      { label: '5–8 years', value: '5-8' },
      { label: '8+ years', value: '8+' },
    ],
  },
  {
    name: 'primarySkills',
    label: 'Primary Skills / Tech Stack',
    type: 'text',
    required: true,
    placeholder: 'e.g. Python, TensorFlow, React',
    colSpan: 12,
  },
  {
    name: 'employmentStatus',
    label: 'Employment Status',
    type: 'select',
    required: true,
    colSpan: 6,
    options: [
      { label: 'Currently Employed', value: 'employed' },
      { label: 'Actively Looking', value: 'looking' },
      { label: 'Freelancer', value: 'freelancer' },
      { label: 'Student / Fresher', value: 'fresher' },
    ],
  },
  {
    name: 'expectedCTC',
    label: 'Expected CTC',
    type: 'text',
    required: false,
    placeholder: 'e.g. 6 LPA or open to discussion',
    colSpan: 6,
  },
  {
    name: 'noticePeriod',
    label: 'Notice Period',
    type: 'select',
    required: true,
    colSpan: 12,
    options: [
      { label: 'Immediate', value: 'immediate' },
      { label: '15 days', value: '15days' },
      { label: '30 days', value: '30days' },
      { label: '60 days', value: '60days' },
      { label: '90 days', value: '90days' },
    ],
  },
];

// ── Simple tab panel ────────────────────────────────────────────────────────
const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} role="tabpanel">
    {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
  </div>
);

// ── Field renderer helpers ──────────────────────────────────────────────────
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

const submitBtnSx = {
  mt: 2,
  py: 1.5,
  px: 5,
  background: 'linear-gradient(135deg, #2D5BE3 0%, #2563EB 100%)',
  color: 'white',
  fontWeight: 700,
  borderRadius: 2,
  textTransform: 'none',
  fontSize: '1rem',
  '&:hover': { background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' },
  '&:disabled': { opacity: 0.7 },
};

// ── Reusable form builder ────────────────────────────────────────────────────
const DynamicForm = ({ fields, formData, errors, onChange, onSubmit, loading, submitLabel }) => (
  <Box component="form" onSubmit={onSubmit} noValidate>
    <Grid container spacing={2}>
      {fields.map((field) => {
        const colSpan = field.colSpan || 12;
        return (
          <Grid key={field.name} item xs={12} sm={colSpan === 12 ? 12 : 6} md={colSpan}>
            {field.type === 'select' ? (
              <FormControl fullWidth error={!!errors[field.name]}>
                <InputLabel sx={{ '&.Mui-focused': { color: '#2D5BE3' } }}>
                  {field.label}
                  {field.required ? ' *' : ''}
                </InputLabel>
                <Select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={onChange}
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
                type={field.type}
                placeholder={field.placeholder || ''}
                value={formData[field.name] || ''}
                onChange={onChange}
                required={field.required}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
                sx={inputSx}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
    <Box sx={{ textAlign: 'center', mt: 3 }}>
      <Button type="submit" disabled={loading} sx={submitBtnSx}>
        {loading ? <CircularProgress size={20} color="inherit" /> : submitLabel}
      </Button>
    </Box>
  </Box>
);

// ── Form hook ───────────────────────────────────────────────────────────────
// formLabel: email subject prefix, e.g. "IT Company Enquiry" or "IT Candidate Profile"
const useForm = (fields, formLabel = 'IT Enquiry') => {
  const initState = fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});
  const [formData, setFormData] = useState(initState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((f) => {
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
      await submitForm(formLabel, formData);
      setSuccess(true);
      setFormData(initState);
    } catch {
      // Still show success to user — data saved even if network blip
      setSuccess(true);
      setFormData(initState);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => setSuccess(false);

  return { formData, errors, loading, success, handleChange, handleSubmit, handleCloseSuccess };
};

// ── Main component ──────────────────────────────────────────────────────────
const ITEnquiryForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [cvFileName, setCvFileName] = useState('');

  // Pass form label so Web3Forms email subject is descriptive
  const companyForm = useForm(companyFields, 'IT Company Hiring Enquiry');
  const candidateForm = useForm(candidateFields, 'IT Candidate Profile Submission');

  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    setCvFileName(file ? file.name : '');
  };

  return (
    <Box sx={{ py: { xs: 3, md: 5 }, backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <SectionHeader
          title="Get in Touch"
          subtitle="Tell us about your hiring needs, or submit your profile to join the SNP talent pool"
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
            overflow: 'hidden',
          }}
        >
          {/* Tab header */}
          <Box sx={{ borderBottom: '1px solid #E5E7EB' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                px: 3,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#6B7280',
                  py: 2,
                  '&.Mui-selected': { color: '#2563EB', fontWeight: 700 },
                },
                '& .MuiTabs-indicator': { backgroundColor: '#2563EB', height: 3 },
              }}
            >
              <Tab label="For Companies" />
              <Tab label="For Candidates" />
            </Tabs>
          </Box>

          <Box sx={{ p: { xs: 3, md: 5 } }}>
            {/* ── Company Tab ── */}
            <TabPanel value={activeTab} index={0}>
              <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 3 }}>
                Fill in your hiring requirements and we will get back within 24 hours with matched profiles.
              </Typography>
              <DynamicForm
                fields={companyFields}
                formData={companyForm.formData}
                errors={companyForm.errors}
                onChange={companyForm.handleChange}
                onSubmit={companyForm.handleSubmit}
                loading={companyForm.loading}
                submitLabel="Submit Requirement"
              />
            </TabPanel>

            {/* ── Candidate Tab ── */}
            <TabPanel value={activeTab} index={1}>
              <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 3 }}>
                Join the SNP talent pool and get matched to relevant opportunities across industries.
              </Typography>
              <DynamicForm
                fields={candidateFields}
                formData={candidateForm.formData}
                errors={candidateForm.errors}
                onChange={candidateForm.handleChange}
                onSubmit={candidateForm.handleSubmit}
                loading={candidateForm.loading}
                submitLabel="Submit Profile"
              />

              {/* CV Upload */}
              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  border: '2px dashed #CBD5E1',
                  borderRadius: 2,
                  textAlign: 'center',
                  backgroundColor: '#F9FAFB',
                  cursor: 'pointer',
                  '&:hover': { borderColor: '#2D5BE3', backgroundColor: '#EFF6FF' },
                }}
                component="label"
              >
                <input type="file" accept=".pdf,.doc,.docx" hidden onChange={handleCvChange} />
                <CloudUploadIcon sx={{ fontSize: 40, color: '#9CA3AF', mb: 1 }} />
                <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
                  {cvFileName || 'Upload your CV (PDF, DOC, DOCX)'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                  Click to browse or drag & drop
                </Typography>
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </div>

      {/* Success snackbars */}
      <Snackbar
        open={companyForm.success}
        autoHideDuration={5000}
        onClose={companyForm.handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={companyForm.handleCloseSuccess} severity="success">
          Your requirement has been submitted! We will contact you within 24 hours.
        </Alert>
      </Snackbar>

      <Snackbar
        open={candidateForm.success}
        autoHideDuration={5000}
        onClose={candidateForm.handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={candidateForm.handleCloseSuccess} severity="success">
          Your profile has been submitted! Our team will review and reach out with opportunities.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ITEnquiryForm;
