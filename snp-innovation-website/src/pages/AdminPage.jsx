/* ========================================
   ADMIN DASHBOARD — /admin
   Password-protected management panel
   Manage: Products · Job Openings · Form Submissions · Orders
   Password set in .env: VITE_ADMIN_PASSWORD=yourPassword
   Default password (if env not set): snpadmin2025
   ======================================== */

import { useState, useEffect, useCallback } from 'react';
import {
  Box, Container, Typography, Paper, Tabs, Tab, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Chip, Stack, Alert, CircularProgress, Tooltip, MenuItem, Select,
  FormControl, InputLabel, Switch, FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import supabase, { isSupabaseReady, uploadProductImage } from '../lib/supabase';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'snpadmin2025';
const fmt = (n) => n ? `₹${Number(n).toLocaleString('en-IN')}` : '—';

/* ─────────────────────────────────────────
   LOGIN SCREEN
───────────────────────────────────────── */
const LoginScreen = ({ onLogin }) => {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) { onLogin(); }
    else { setErr('Wrong password. Try again.'); setPwd(''); }
  };
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
      <Paper sx={{ p: 5, borderRadius: '20px', width: '100%', maxWidth: 380, textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
        <Box sx={{ width: 64, height: 64, borderRadius: '16px', background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
          <LockOutlinedIcon sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>Admin Panel</Typography>
        <Typography sx={{ color: '#64748B', fontSize: '14px', mb: 3 }}>SNP Innovation Dashboard</Typography>
        {err && <Alert severity="error" sx={{ mb: 2, borderRadius: '8px' }}>{err}</Alert>}
        <Box component="form" onSubmit={submit}>
          <TextField fullWidth type="password" label="Admin Password" value={pwd}
            onChange={e => { setPwd(e.target.value); setErr(''); }}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
          <Button type="submit" fullWidth variant="contained" sx={{
            background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)', borderRadius: '10px',
            fontWeight: 700, py: 1.3, textTransform: 'none', fontSize: '15px',
          }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

/* ─────────────────────────────────────────
   PRODUCTS TAB
───────────────────────────────────────── */
const ProductsTab = () => {
  const [rows, setRows]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [dlgOpen, setDlgOpen]   = useState(false);
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState({});
  const [saving, setSaving]     = useState(false);
  const [msg, setMsg]           = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState('');

  const load = useCallback(async () => {
    if (!isSupabaseReady()) { setMsg('⚠️ Supabase not configured. Add .env variables.'); return; }
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setRows(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing(null);
    setUploadErr('');
    setForm({ name: '', subtitle: '', price_inr: '', original_price_inr: '', badge: '', badge_color: '#F59E0B', class_level: '', category: '', image_url: '', rating: 4.5, review_count: 0, tags: '', description: '', active: true });
    setDlgOpen(true);
  };
  const openEdit = (row) => { setEditing(row.id); setUploadErr(''); setForm({ ...row, tags: Array.isArray(row.tags) ? row.tags.join(', ') : '' }); setDlgOpen(true); };
  const handleField = (e) => { const { name, value, type, checked } = e.target; setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value })); };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-selecting the same file
    if (!file) return;
    setUploadErr('');
    setUploading(true);
    const res = await uploadProductImage(file);
    setUploading(false);
    if (res.success) setForm(f => ({ ...f, image_url: res.url }));
    else setUploadErr(res.error || 'Upload failed.');
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      ...form,
      price_inr: Number(form.price_inr),
      original_price_inr: Number(form.original_price_inr),
      rating: Number(form.rating),
      review_count: Number(form.review_count),
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };
    if (editing) { await supabase.from('products').update(payload).eq('id', editing); }
    else { delete payload.id; await supabase.from('products').insert([payload]); }
    setSaving(false); setDlgOpen(false); load();
  };

  const del = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    load();
  };

  return (
    <Box>
      {msg && <Alert severity="warning" sx={{ mb: 2 }}>{msg}</Alert>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>Products ({rows.length})</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<RefreshIcon />} onClick={load} size="small" variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none' }}>Refresh</Button>
          <Button startIcon={<AddIcon />} onClick={openAdd} variant="contained" size="small"
            sx={{ background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)', borderRadius: '8px', textTransform: 'none' }}>
            Add Product
          </Button>
        </Box>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: 'none', border: '1px solid #E2E8F0' }}>
          <Table size="small">
            <TableHead sx={{ background: '#F8FAFC' }}>
              <TableRow>
                {['Image', 'Name', 'Category', 'Price', 'Rating', 'Active', 'Actions'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, color: '#475569', fontSize: '12px' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell><Box component="img" src={row.image_url} sx={{ width: 50, height: 40, objectFit: 'cover', borderRadius: '6px' }} /></TableCell>
                  <TableCell sx={{ fontWeight: 600, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.name}</TableCell>
                  <TableCell><Chip label={row.category} size="small" sx={{ fontSize: '11px' }} /></TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#1A3A8F' }}>{fmt(row.price_inr)}</TableCell>
                  <TableCell>⭐ {row.rating}</TableCell>
                  <TableCell><Chip label={row.active ? 'Active' : 'Hidden'} size="small" color={row.active ? 'success' : 'default'} /></TableCell>
                  <TableCell>
                    <Tooltip title="Edit"><IconButton size="small" onClick={() => openEdit(row)}><EditIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small" sx={{ color: '#EF4444' }} onClick={() => del(row.id)}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 4, color: '#94A3B8' }}>No products yet. Click "Add Product" to get started.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dlgOpen} onClose={() => setDlgOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>{editing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {[
              { name: 'name', label: 'Product Name *' },
              { name: 'subtitle', label: 'Subtitle' },
              { name: 'category', label: 'Category (e.g. Robotics, IoT, AI/ML)' },
              { name: 'class_level', label: 'Class Level (e.g. Class 5-8)' },
              { name: 'price_inr', label: 'Price (₹)', type: 'number' },
              { name: 'original_price_inr', label: 'Original Price (₹)', type: 'number' },
              { name: 'badge', label: 'Badge (e.g. Bestseller, New, Popular)' },
              { name: 'badge_color', label: 'Badge Color (hex)', type: 'color' },
              { name: 'rating', label: 'Rating (0-5)', type: 'number' },
              { name: 'review_count', label: 'Review Count', type: 'number' },
              { name: 'tags', label: 'Tags (comma separated)' },
              { name: 'description', label: 'Description', multiline: true, rows: 3 },
            ].map(f => (
              <TextField key={f.name} name={f.name} label={f.label} type={f.type || 'text'}
                value={form[f.name] || ''} onChange={handleField} fullWidth size="small"
                multiline={f.multiline} rows={f.rows}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            ))}

            {/* ── Product image: upload to Supabase Storage ── */}
            <Box sx={{ border: '1px dashed #CBD5E1', borderRadius: '10px', p: 2 }}>
              <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#475569', mb: 1 }}>Product Image</Typography>
              {form.image_url && (
                <Box component="img" src={form.image_url} alt="preview"
                  sx={{ width: '100%', maxHeight: 170, objectFit: 'cover', borderRadius: '8px', mb: 1.5, border: '1px solid #E2E8F0' }} />
              )}
              <Button component="label" variant="outlined" size="small" disabled={uploading}
                startIcon={uploading ? <CircularProgress size={16} /> : <AddIcon />}
                sx={{ textTransform: 'none', borderRadius: '8px' }}>
                {uploading ? 'Uploading…' : (form.image_url ? 'Replace Image' : 'Upload Image')}
                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
              </Button>
              {uploadErr && <Alert severity="error" sx={{ mt: 1.5, borderRadius: '8px' }}>{uploadErr}</Alert>}
              <TextField name="image_url" label="Image URL (auto-filled after upload — or paste a link)"
                value={form.image_url || ''} onChange={handleField} fullWidth size="small"
                sx={{ mt: 1.5, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            </Box>

            <FormControlLabel control={<Switch name="active" checked={!!form.active} onChange={handleField} />} label="Active (visible on website)" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDlgOpen(false)} sx={{ textTransform: 'none', borderRadius: '8px' }}>Cancel</Button>
          <Button onClick={save} variant="contained" disabled={saving}
            sx={{ background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)', textTransform: 'none', borderRadius: '8px' }}>
            {saving ? <CircularProgress size={18} sx={{ color: 'white' }} /> : (editing ? 'Save Changes' : 'Add Product')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

/* ─────────────────────────────────────────
   JOB OPENINGS TAB
───────────────────────────────────────── */
const JobsTab = () => {
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [dlgOpen, setDlgOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState({});
  const [saving, setSaving]   = useState(false);

  const DEPT_PRESETS = {
    EdTech:       { dept_color: '#EFF6FF', dept_text_color: '#1A3A8F', accent_gradient: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)' },
    'IT Resourcing': { dept_color: '#F0FDF4', dept_text_color: '#15803D', accent_gradient: 'linear-gradient(135deg,#15803D,#22C55E)' },
    'R&D':        { dept_color: '#FFF7ED', dept_text_color: '#C2410C', accent_gradient: 'linear-gradient(135deg,#C2410C,#CC2020)' },
    Incubation:   { dept_color: '#F5F3FF', dept_text_color: '#7C3AED', accent_gradient: 'linear-gradient(135deg,#7C3AED,#A78BFA)' },
    Other:        { dept_color: '#F1F5F9', dept_text_color: '#475569', accent_gradient: 'linear-gradient(135deg,#475569,#94A3B8)' },
  };

  const load = useCallback(async () => {
    if (!isSupabaseReady()) return;
    setLoading(true);
    const { data } = await supabase.from('job_openings').select('*').order('created_at', { ascending: false });
    setRows(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', department: 'EdTech', location: 'Pune', type: 'Full-time', description: '', active: true, ...DEPT_PRESETS.EdTech });
    setDlgOpen(true);
  };
  const openEdit = (row) => { setEditing(row.id); setForm({ ...row }); setDlgOpen(true); };
  const handleField = (e) => {
    const { name, value, type, checked } = e.target;
    const update = { [name]: type === 'checkbox' ? checked : value };
    // Auto-fill colors when department changes
    if (name === 'department' && DEPT_PRESETS[value]) Object.assign(update, DEPT_PRESETS[value]);
    setForm(f => ({ ...f, ...update }));
  };

  const save = async () => {
    setSaving(true);
    if (editing) { await supabase.from('job_openings').update(form).eq('id', editing); }
    else { const p = { ...form }; delete p.id; await supabase.from('job_openings').insert([p]); }
    setSaving(false); setDlgOpen(false); load();
  };
  const del = async (id) => {
    if (!window.confirm('Delete this job opening?')) return;
    await supabase.from('job_openings').delete().eq('id', id);
    load();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>Job Openings ({rows.length})</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<RefreshIcon />} onClick={load} size="small" variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none' }}>Refresh</Button>
          <Button startIcon={<AddIcon />} onClick={openAdd} variant="contained" size="small"
            sx={{ background: 'linear-gradient(135deg,#CC2020,#EF4444)', borderRadius: '8px', textTransform: 'none' }}>
            Add Opening
          </Button>
        </Box>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: 'none', border: '1px solid #E2E8F0' }}>
          <Table size="small">
            <TableHead sx={{ background: '#F8FAFC' }}>
              <TableRow>
                {['Title', 'Department', 'Location', 'Type', 'Active', 'Actions'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, color: '#475569', fontSize: '12px' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.title}</TableCell>
                  <TableCell><Chip label={row.department} size="small" sx={{ background: row.dept_color, color: row.dept_text_color, fontWeight: 700, fontSize: '11px' }} /></TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell><Chip label={row.active ? 'Active' : 'Hidden'} size="small" color={row.active ? 'success' : 'default'} /></TableCell>
                  <TableCell>
                    <Tooltip title="Edit"><IconButton size="small" onClick={() => openEdit(row)}><EditIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                    <Tooltip title="Delete"><IconButton size="small" sx={{ color: '#EF4444' }} onClick={() => del(row.id)}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 4, color: '#94A3B8' }}>No job openings. Click "Add Opening" to post a new role.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={dlgOpen} onClose={() => setDlgOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>{editing ? 'Edit Job Opening' : 'Add Job Opening'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField name="title" label="Job Title *" value={form.title || ''} onChange={handleField} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            <FormControl fullWidth size="small">
              <InputLabel>Department</InputLabel>
              <Select name="department" value={form.department || 'EdTech'} onChange={handleField} label="Department" sx={{ borderRadius: '8px' }}>
                {Object.keys(DEPT_PRESETS).map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField name="location" label="Location (e.g. Pune, Remote)" value={form.location || ''} onChange={handleField} fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select name="type" value={form.type || 'Full-time'} onChange={handleField} label="Type" sx={{ borderRadius: '8px' }}>
                {['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField name="description" label="Job Description *" value={form.description || ''} onChange={handleField} fullWidth size="small" multiline rows={4} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }} />
            <FormControlLabel control={<Switch name="active" checked={!!form.active} onChange={handleField} />} label="Active (visible on Careers page)" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setDlgOpen(false)} sx={{ textTransform: 'none', borderRadius: '8px' }}>Cancel</Button>
          <Button onClick={save} variant="contained" disabled={saving}
            sx={{ background: 'linear-gradient(135deg,#CC2020,#EF4444)', textTransform: 'none', borderRadius: '8px' }}>
            {saving ? <CircularProgress size={18} sx={{ color: 'white' }} /> : (editing ? 'Save' : 'Post Job')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

/* ─────────────────────────────────────────
   SUBMISSIONS TAB
───────────────────────────────────────── */
const SubmissionsTab = () => {
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);
  const [filter, setFilter]   = useState('All');

  const load = useCallback(async () => {
    if (!isSupabaseReady()) return;
    setLoading(true);
    const { data } = await supabase.from('form_submissions').select('*').order('created_at', { ascending: false });
    setRows(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const formTypes = ['All', ...new Set(rows.map(r => r.form_type).filter(Boolean))];
  const visible = filter === 'All' ? rows : rows.filter(r => r.form_type === filter);

  const markRead = async (id) => {
    await supabase.from('form_submissions').update({ status: 'read' }).eq('id', id);
    load();
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>Form Submissions ({visible.length})</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {formTypes.map(t => (
            <Chip key={t} label={t} clickable onClick={() => setFilter(t)}
              color={filter === t ? 'primary' : 'default'} size="small"
              sx={{ fontWeight: 600, ...(filter === t && { background: 'linear-gradient(135deg,#1A3A8F,#2D5BE3)', color: 'white' }) }} />
          ))}
          <Button startIcon={<RefreshIcon />} onClick={load} size="small" variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none' }}>Refresh</Button>
        </Box>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: 'none', border: '1px solid #E2E8F0' }}>
          <Table size="small">
            <TableHead sx={{ background: '#F8FAFC' }}>
              <TableRow>
                {['Form', 'Name', 'Email', 'Phone', 'Date', 'Status', ''].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, color: '#475569', fontSize: '12px' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visible.map(row => (
                <TableRow key={row.id} hover sx={{ background: row.status === 'new' ? '#FEFCE8' : 'white' }}>
                  <TableCell><Chip label={row.form_type} size="small" sx={{ fontSize: '11px', fontWeight: 600 }} /></TableCell>
                  <TableCell sx={{ fontWeight: row.status === 'new' ? 700 : 400 }}>{row.name || '—'}</TableCell>
                  <TableCell sx={{ fontSize: '13px' }}>{row.email || '—'}</TableCell>
                  <TableCell sx={{ fontSize: '13px' }}>{row.phone || '—'}</TableCell>
                  <TableCell sx={{ fontSize: '12px', color: '#64748B' }}>{fmtDate(row.created_at)}</TableCell>
                  <TableCell>
                    <Chip label={row.status || 'new'} size="small"
                      color={row.status === 'new' ? 'warning' : row.status === 'replied' ? 'success' : 'default'} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View details"><IconButton size="small" onClick={() => { setViewRow(row); if (row.status === 'new') markRead(row.id); }}><VisibilityIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {visible.length === 0 && <TableRow><TableCell colSpan={7} sx={{ textAlign: 'center', py: 4, color: '#94A3B8' }}>No submissions yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* View submission dialog */}
      <Dialog open={Boolean(viewRow)} onClose={() => setViewRow(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Submission Details — {viewRow?.form_type}</DialogTitle>
        <DialogContent dividers>
          {viewRow && (
            <Stack spacing={1}>
              <Typography sx={{ fontSize: '12px', color: '#64748B' }}>{new Date(viewRow.created_at).toLocaleString('en-IN')}</Typography>
              {Object.entries(viewRow.data || {}).map(([k, v]) => (
                <Box key={k}>
                  <Typography sx={{ fontWeight: 700, fontSize: '12px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{k.replace(/_/g, ' ')}</Typography>
                  <Typography sx={{ fontSize: '14px', color: '#0F172A' }}>{typeof v === 'object' ? JSON.stringify(v) : String(v || '—')}</Typography>
                  <Box sx={{ height: 1, background: '#F1F5F9', mt: 1 }} />
                </Box>
              ))}
            </Stack>
          )}
        </DialogContent>
        <DialogActions><Button onClick={() => setViewRow(null)} sx={{ textTransform: 'none' }}>Close</Button></DialogActions>
      </Dialog>
    </Box>
  );
};

/* ─────────────────────────────────────────
   ORDERS TAB
───────────────────────────────────────── */
const OrdersTab = () => {
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(false);
  const fmt = (n) => n ? `₹${Number(n).toLocaleString('en-IN')}` : '—';

  const load = useCallback(async () => {
    if (!isSupabaseReady()) return;
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setRows(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id, status) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    load();
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
  const statusColor = { pending: 'warning', confirmed: 'info', shipped: 'primary', delivered: 'success', cancelled: 'error' };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>Orders ({rows.length})</Typography>
        <Button startIcon={<RefreshIcon />} onClick={load} size="small" variant="outlined" sx={{ borderRadius: '8px', textTransform: 'none' }}>Refresh</Button>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: 'none', border: '1px solid #E2E8F0' }}>
          <Table size="small">
            <TableHead sx={{ background: '#F8FAFC' }}>
              <TableRow>
                {['Customer', 'Email', 'Phone', 'Items', 'Total', 'Date', 'Status', 'Update'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, color: '#475569', fontSize: '12px' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.customer_name}</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>{row.customer_email}</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>{row.customer_phone}</TableCell>
                  <TableCell sx={{ fontSize: '12px', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {Array.isArray(row.items) ? row.items.map(i => `${i.name} ×${i.qty}`).join(', ') : '—'}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#15803D' }}>{fmt(row.total_amount)}</TableCell>
                  <TableCell sx={{ fontSize: '12px', color: '#64748B' }}>{fmtDate(row.created_at)}</TableCell>
                  <TableCell><Chip label={row.status} size="small" color={statusColor[row.status] || 'default'} sx={{ fontWeight: 600, fontSize: '11px' }} /></TableCell>
                  <TableCell>
                    <Select size="small" value={row.status} onChange={e => updateStatus(row.id, e.target.value)}
                      sx={{ fontSize: '12px', borderRadius: '6px', minWidth: 100 }}>
                      {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => <MenuItem key={s} value={s} sx={{ fontSize: '12px' }}>{s}</MenuItem>)}
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && <TableRow><TableCell colSpan={8} sx={{ textAlign: 'center', py: 4, color: '#94A3B8' }}>No orders yet.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

/* ─────────────────────────────────────────
   MAIN ADMIN PAGE
───────────────────────────────────────── */
const AdminPage = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('snp_admin') === '1');
  const [tab, setTab]       = useState(0);

  const login = () => { sessionStorage.setItem('snp_admin', '1'); setAuthed(true); };
  const logout = () => { sessionStorage.removeItem('snp_admin'); setAuthed(false); };

  if (!authed) return <LoginScreen onLogin={login} />;

  const TABS = [
    { label: '🛒 Products',    component: <ProductsTab /> },
    { label: '💼 Job Openings', component: <JobsTab /> },
    { label: '📩 Submissions',  component: <SubmissionsTab /> },
    { label: '📦 Orders',       component: <OrdersTab /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg,#0F172A,#1A3A8F)', py: 2.5, px: 3 }}>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '20px' }}>SNP Innovation — Admin</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Manage products, jobs, form submissions & orders</Typography>
          </Box>
          <Button onClick={logout} variant="outlined" size="small"
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', textTransform: 'none', borderRadius: '8px', '&:hover': { borderColor: 'white' } }}>
            Logout
          </Button>
        </Container>
      </Box>

      {/* Supabase not configured warning */}
      {!isSupabaseReady() && (
        <Box sx={{ background: '#FEF9C3', py: 1.5, px: 3, borderBottom: '1px solid #FDE68A' }}>
          <Container maxWidth="xl">
            <Typography sx={{ fontSize: '14px', color: '#92400E' }}>
              ⚠️ <strong>Supabase not connected.</strong> Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file to enable live data. See <strong>SETUP_GUIDE.md</strong> for instructions.
            </Typography>
          </Container>
        </Box>
      )}

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Paper sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'none', border: '1px solid #E2E8F0' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}
            sx={{ borderBottom: '1px solid #E2E8F0', background: 'white', px: 2, pt: 1 }}
            TabIndicatorProps={{ sx: { background: 'linear-gradient(90deg,#1A3A8F,#2D5BE3)', height: 3, borderRadius: '3px 3px 0 0' } }}>
            {TABS.map((t, i) => (
              <Tab key={i} label={t.label} sx={{ textTransform: 'none', fontWeight: 600, fontSize: '14px', mr: 1, minHeight: 48 }} />
            ))}
          </Tabs>
          <Box sx={{ p: 3, background: 'white' }}>
            {TABS[tab].component}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminPage;
