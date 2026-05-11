/* ========================================
   INTERNSHIP PROGRAM — 5 internship types + application form
   Exact 5 types from the spec.
   ======================================== */

import { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const INTERNSHIPS = [
  {
    id: 1,
    title: 'EdTech & STEM Lab Internship',
    tags: ['Lab Design', 'Curriculum Dev', 'Kit Testing', 'School Engagement'],
    description:
      'Work alongside our EdTech team on lab design, curriculum development, kit testing, and school engagement. Contribute to hands-on learning experiences that reach thousands of students.',
    duration: '3–6 months',
    mode: 'On-Site (Pune)',
  },
  {
    id: 2,
    title: 'IT Development Internship',
    tags: ['React', 'Node.js', 'Firmware', 'Real Projects'],
    description:
      'Contribute to real software and firmware projects. Work in a professional engineering team, ship production code, and gain exposure to the full software development lifecycle.',
    duration: '3–6 months',
    mode: 'On-Site / Remote',
  },
  {
    id: 3,
    title: 'R&D & Automation Internship',
    tags: ['Hardware', 'Prototyping', 'Testing', 'Automation'],
    description:
      'Hardware/software prototyping, testing, and automation projects. Gain hands-on experience with embedded systems, IoT, and cutting-edge R&D under the guidance of industry experts.',
    duration: '4–6 months',
    mode: 'On-Site (Pune)',
  },
  {
    id: 4,
    title: 'Business Development & Marketing',
    tags: ['Client Outreach', 'Content Creation', 'Event Coordination'],
    description:
      'Drive client outreach, content creation, and event coordination. Learn how a fast-growing innovation company expands its presence nationally and internationally.',
    duration: '3–4 months',
    mode: 'On-Site / Hybrid',
  },
  {
    id: 5,
    title: 'Startup & Incubation Support',
    tags: ['Startups', 'Founders', 'Growth', 'Operations'],
    description:
      'Work alongside incubated startups, support founders with operations, research, and growth initiatives. An immersive experience inside live startup environments.',
    duration: '3–6 months',
    mode: 'On-Site (Incubation Center)',
  },
];

const DOMAINS = [
  'EdTech & STEM Lab',
  'IT Development',
  'R&D & Automation',
  'Business Development & Marketing',
  'Startup & Incubation Support',
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'Recently Graduated'];

const EMPTY_FORM = {
  fullName: '', email: '', phone: '', college: '', department: '',
  degree: '', year: '', domain: '', duration: '', startDate: '',
  skills: '', whySNP: '', cvFile: null,
};

const InternshipProgram = ({ embedded = false }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [cvName, setCvName] = useState('');

  const current = INTERNSHIPS[activeTab];

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
    if (!form.college.trim()) e.college = 'Required';
    if (!form.degree.trim()) e.degree = 'Required';
    if (!form.year) e.year = 'Required';
    if (!form.domain) e.domain = 'Required';
    if (!form.skills.trim()) e.skills = 'Required';
    if (!form.whySNP.trim()) e.whySNP = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Internship application submitted:', form);
      setSubmitted(true);
      setForm(EMPTY_FORM);
      setCvName('');
    }
  };

  return (
    <Box sx={{ py: { xs: 4, md: 7 }, background: 'linear-gradient(135deg,#F8FAFC,#EFF6FF)' }}>
      <Container maxWidth="xl">
        {/* Section header — hidden when embedded inside the tabbed CareerApplications wrapper */}
        {!embedded && (
          <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
            <Typography sx={{ color: '#CC2020', fontWeight: 700, letterSpacing: '2px', fontSize: '12px', mb: 1 }}>
              GROW WITH US
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontWeight: 800, fontSize: { xs: '28px', md: '38px' }, color: '#0F172A', mb: 2 }}
            >
              Internship Program
            </Typography>
            <Typography sx={{ color: '#64748B', maxWidth: 560, mx: 'auto', fontSize: '16px' }}>
              5 tracks designed to give you real experience inside India's most dynamic innovation company.
            </Typography>
            <Box
              sx={{ width: 56, height: 4, background: 'linear-gradient(90deg,#1A3A8F,#CC2020)', borderRadius: 2, mx: 'auto', mt: 3 }}
            />
          </Box>
        )}

        {/* CSS Grid — left selector (5fr) + right form (7fr), proper side-by-side on desktop */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: { xs: 3, md: 5 },
            alignItems: 'start',
          }}
        >
          {/* Left — Internship type selector */}
          <Box>
            {/* Vertical tabs */}
            <Box sx={{ bgcolor: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden', mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={(_, v) => setActiveTab(v)}
                orientation="vertical"
                variant="scrollable"
                scrollButtons={false}
                sx={{
                  '& .MuiTab-root': {
                    textAlign: 'left',
                    alignItems: 'flex-start',
                    px: 3,
                    py: 2,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#64748B',
                    borderBottom: '1px solid #F1F5F9',
                    minHeight: '52px',
                    textTransform: 'none',
                  },
                  '& .Mui-selected': { color: '#1A3A8F', bgcolor: '#EFF6FF' },
                  '& .MuiTabs-indicator': { left: 0, width: '3px', bgcolor: '#1A3A8F', borderRadius: '0 4px 4px 0' },
                }}
              >
                {INTERNSHIPS.map((intern) => (
                  <Tab key={intern.id} label={intern.title} />
                ))}
              </Tabs>
            </Box>

            {/* Detail card */}
            <Card sx={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '16px', color: '#0F172A', mb: 1.5 }}>
                  {current.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mb: 2 }}>
                  {current.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{ bgcolor: '#EFF6FF', color: '#1A3A8F', fontSize: '11px', fontWeight: 600 }}
                    />
                  ))}
                </Box>
                <Typography sx={{ color: '#475569', fontSize: '14px', lineHeight: 1.75, mb: 2 }}>
                  {current.description}
                </Typography>
                <Box sx={{ pt: 2, borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                  <Typography sx={{ fontSize: '13px', color: '#64748B' }}>
                    <strong style={{ color: '#0F172A' }}>Duration:</strong> {current.duration}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', color: '#64748B' }}>
                    <strong style={{ color: '#0F172A' }}>Mode:</strong> {current.mode}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right — Application form */}
          <Box>
            <Card sx={{ borderRadius: '18px', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '18px', color: '#0F172A', mb: 3 }}>
                  Internship Application
                </Typography>

                {submitted && (
                  <Alert
                    icon={<CheckCircleIcon />}
                    severity="success"
                    sx={{ mb: 3, borderRadius: '10px' }}
                    onClose={() => setSubmitted(false)}
                  >
                    Application submitted! We will get back to you soon.
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  {/* CSS Grid for reliable responsive columns */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>

                    {/* Personal info */}
                    <TextField
                      fullWidth size="small" label="Full Name *" name="fullName"
                      value={form.fullName} onChange={handleChange}
                      error={!!errors.fullName} helperText={errors.fullName}
                    />
                    <TextField
                      fullWidth size="small" label="Email *" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      error={!!errors.email} helperText={errors.email}
                    />
                    <TextField
                      fullWidth size="small" label="Phone *" name="phone"
                      value={form.phone} onChange={handleChange}
                      error={!!errors.phone} helperText={errors.phone}
                    />
                    <TextField
                      fullWidth size="small" label="College / University *" name="college"
                      value={form.college} onChange={handleChange}
                      error={!!errors.college} helperText={errors.college}
                    />
                    <TextField
                      fullWidth size="small" label="Department *" name="department"
                      value={form.department} onChange={handleChange}
                    />
                    <TextField
                      fullWidth size="small" label="Degree *" name="degree"
                      value={form.degree} onChange={handleChange}
                      error={!!errors.degree} helperText={errors.degree}
                    />
                    <TextField
                      select fullWidth size="small" label="Year of Study *" name="year"
                      value={form.year} onChange={handleChange}
                      error={!!errors.year} helperText={errors.year}
                    >
                      {YEARS.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                    </TextField>
                    <TextField
                      select fullWidth size="small" label="Preferred Domain *" name="domain"
                      value={form.domain} onChange={handleChange}
                      error={!!errors.domain} helperText={errors.domain}
                    >
                      {DOMAINS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                    </TextField>
                    <TextField
                      fullWidth size="small" label="Duration (e.g. 3 months)" name="duration"
                      value={form.duration} onChange={handleChange}
                    />
                    <TextField
                      fullWidth size="small" label="Preferred Start Date" name="startDate"
                      type="date"
                      slotProps={{ inputLabel: { shrink: true } }}
                      value={form.startDate} onChange={handleChange}
                    />

                    {/* Full-width fields */}
                    <Box sx={{ gridColumn: '1 / -1' }}>
                      <TextField
                        fullWidth size="small" label="Key Skills *" name="skills"
                        placeholder="e.g. Python, React, PCB Design, Content Writing..."
                        value={form.skills} onChange={handleChange}
                        error={!!errors.skills} helperText={errors.skills}
                        multiline rows={2}
                      />
                    </Box>
                    <Box sx={{ gridColumn: '1 / -1' }}>
                      <TextField
                        fullWidth size="small" label="Why SNP Innovation? *" name="whySNP"
                        placeholder="Tell us what excites you about this opportunity..."
                        value={form.whySNP} onChange={handleChange}
                        error={!!errors.whySNP} helperText={errors.whySNP}
                        multiline rows={3}
                      />
                    </Box>

                    {/* CV Upload - full width */}
                    <Box sx={{ gridColumn: '1 / -1' }}>
                      <Box
                        component="label"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `2px dashed ${errors.cvFile ? '#d32f2f' : '#BFDBFE'}`,
                          borderRadius: '12px',
                          py: 3,
                          px: 2,
                          bgcolor: '#F8FAFF',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          '&:hover': { bgcolor: '#EFF6FF', borderColor: '#1A3A8F' },
                        }}
                      >
                        <CloudUploadIcon sx={{ fontSize: 38, color: '#1A3A8F', mb: 1 }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>
                          {cvName || 'Upload CV (PDF only, max 5 MB)'}
                        </Typography>
                        <Typography sx={{ fontSize: '12px', color: '#64748B', mt: 0.5 }}>
                          Click to browse
                        </Typography>
                        <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFile} />
                      </Box>
                      {errors.cvFile && (
                        <Typography sx={{ color: '#d32f2f', fontSize: '12px', mt: 0.5 }}>{errors.cvFile}</Typography>
                      )}
                    </Box>

                    {/* Submit - full width */}
                    <Box sx={{ gridColumn: '1 / -1' }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          py: 1.4,
                          fontWeight: 700,
                          fontSize: '15px',
                          background: 'linear-gradient(135deg,#1A3A8F,#CC2020)',
                          borderRadius: '10px',
                          textTransform: 'none',
                          boxShadow: 'none',
                          '&:hover': { opacity: 0.9, boxShadow: '0 8px 24px rgba(30,64,175,0.3)' },
                        }}
                      >
                        Submit Application
                      </Button>
                    </Box>
                  </Box> {/* end CSS Grid */}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default InternshipProgram;
