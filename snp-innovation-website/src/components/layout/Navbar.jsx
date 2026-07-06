/* ========================================
   NAVBAR.JSX - Modern Sticky Navigation Bar
   ======================================== */

import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar, Toolbar, Box, IconButton, Drawer, List, ListItem,
  ListItemText, Collapse, Menu, MenuItem, Button, Badge, Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import ScienceOutlined from '@mui/icons-material/ScienceOutlined';
import ComputerOutlined from '@mui/icons-material/ComputerOutlined';
import EngineeringOutlined from '@mui/icons-material/EngineeringOutlined';
import RocketLaunchOutlined from '@mui/icons-material/RocketLaunchOutlined';
import EventNoteOutlined from '@mui/icons-material/EventNoteOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectCartCount, toggleCart } from '../../store/slices/shopSlice';
import './Navbar.css';

const Navbar = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const cartCount = useSelector(selectCartCount);

  // Open the cart: ensure we're on /shop (where the cart drawer lives), then open it
  const openCart = () => {
    if (location.pathname !== '/shop') navigate('/shop');
    dispatch(toggleCart(true));
  };

  const [mobileOpen, setMobileOpen]   = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [anchorEl, setAnchorEl]       = useState(null);
  const [isScrolled, setIsScrolled]   = useState(false);

  const solutionsMenu = [
    { label: 'EdTech STEM Labs',   path: '/edtech',        icon: <ScienceOutlined /> },
    { label: 'IT Resourcing',      path: '/it-resourcing', icon: <ComputerOutlined /> },
    { label: 'R&D & Automation',   path: '/rd-automation', icon: <EngineeringOutlined /> },
    { label: 'Incubation Center',  path: '/incubation',    icon: <RocketLaunchOutlined /> },
    { label: 'Workshops & Events', path: '/workshops',     icon: <EventNoteOutlined /> },
  ];

  const navItems = [
    { label: 'About Us',   path: '/about' },
    { label: 'Gallery',    path: '/gallery' },
    { label: 'Careers',    path: '/careers' },
    { label: 'Contact Us', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname === path;

  const isSolutionsActive = solutionsMenu.some((item) => location.pathname === item.path);

  const handleSolutionsClick  = (e) => setAnchorEl(e.currentTarget);
  const handleSolutionsClose  = ()  => setAnchorEl(null);
  const handleMobileToggle    = ()  => setMobileOpen(!mobileOpen);
  const handleMobileSolutionsToggle = () => setSolutionsOpen(!solutionsOpen);
  const handleNavClick        = ()  => setMobileOpen(false);

  const linkColor   = isScrolled ? '#0D1B3E' : 'rgba(255,255,255,0.90)';
  const activeColor = isScrolled ? '#1B3D8A' : '#ffffff';

  const desktopNav = (
    <Box className="navbar-desktop-nav">
      <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}
        style={{ color: isActive('/') ? activeColor : linkColor }}>
        Home
      </Link>

      <Box className={`navbar-link solutions-trigger ${isSolutionsActive ? 'active' : ''}`}
        onClick={handleSolutionsClick}
        style={{ color: isSolutionsActive ? activeColor : linkColor }}>
        Solutions
        {Boolean(anchorEl) ? <KeyboardArrowUp className="dropdown-icon" /> : <KeyboardArrowDown className="dropdown-icon" />}
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleSolutionsClose}
        className="solutions-menu"
        PaperProps={{ sx: {
          backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(13,36,85,0.13)', marginTop: '12px',
          borderRadius: '12px', minWidth: '280px', border: '1px solid rgba(27,61,138,0.10)',
        }}}>
        {solutionsMenu.map((item) => (
          <MenuItem key={item.path} component={Link} to={item.path}
            onClick={handleSolutionsClose}
            className={`solutions-menu-item ${isActive(item.path) ? 'active' : ''}`}>
            <Box className="solutions-item-icon">{item.icon}</Box>
            <Box className="solutions-item-text">
              <Box className="solutions-item-label">{item.label}</Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      {navItems.map((item) => (
        <Link key={item.path} to={item.path}
          className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
          style={{ color: isActive(item.path) ? activeColor : linkColor }}>
          {item.label}
        </Link>
      ))}

      <Link to="/shop" className={`navbar-link ${isActive('/shop') ? 'active' : ''}`}
        style={{ color: isActive('/shop') ? activeColor : linkColor }}>
        Shop
      </Link>

      <Tooltip title="View cart">
        <IconButton onClick={openCart} size="small" aria-label="View cart"
          sx={{ color: isScrolled ? '#1B3D8A' : 'white', ml: 0.5,
                '&:hover': { background: 'rgba(255,255,255,0.12)' } }}>
          <Badge badgeContent={cartCount} color="error" overlap="circular">
            <ShoppingCartIcon sx={{ fontSize: 22 }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Button variant="contained" className="cta-button"
        onClick={() => (window.location.href = '/contact')}
        style={{
          backgroundColor: isScrolled ? '#1B3D8A' : '#D42B1E', color: '#ffffff',
          fontWeight: 600, padding: '10px 24px', borderRadius: '8px',
          textTransform: 'none', fontSize: '14px', whiteSpace: 'nowrap',
          boxShadow: isScrolled ? '0 4px 15px rgba(27,61,138,0.30)' : '0 4px 15px rgba(212,43,30,0.35)',
          transition: 'all 0.3s ease',
        }}>
        Get a Quote
      </Button>
    </Box>
  );

  const mobileNav = (
    <Drawer anchor="right" open={mobileOpen} onClose={handleMobileToggle}
      className="navbar-mobile-drawer"
      PaperProps={{ sx: {
        backgroundColor: '#ffffff', width: '100%', maxWidth: '320px',
        display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden',
      }}}>
      <Box className="navbar-mobile-header">
        <Box component="img" src="/images/logo.png" alt="SNP Innovation"
          sx={{ height: '40px', width: 'auto', mr: 'auto', ml: 1 }} />
        <IconButton onClick={handleMobileToggle} size="large"><CloseIcon /></IconButton>
      </Box>

      <List className="navbar-mobile-list" sx={{ flex: 1, overflowY: 'auto' }}>
        <ListItem button component={Link} to="/" onClick={handleNavClick}
          className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button onClick={handleMobileSolutionsToggle}
          className={`mobile-nav-item solutions-item ${isSolutionsActive ? 'active' : ''}`}>
          <ListItemText primary="Solutions" />
          {solutionsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </ListItem>

        <Collapse in={solutionsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {solutionsMenu.map((item) => (
              <ListItem key={item.path} button component={Link} to={item.path}
                onClick={handleNavClick}
                className={`mobile-submenu-item ${isActive(item.path) ? 'active' : ''}`}>
                <Box className="mobile-submenu-icon">{item.icon}</Box>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {navItems.map((item) => (
          <ListItem key={item.path} button component={Link} to={item.path}
            onClick={handleNavClick}
            className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        <ListItem button component={Link} to="/shop" onClick={handleNavClick}
          className={`mobile-nav-item ${isActive('/shop') ? 'active' : ''}`}>
          <ShoppingCartIcon sx={{ fontSize: 18, mr: 1, color: '#1A3A8F' }} />
          <ListItemText primary={cartCount > 0 ? `Shop (${cartCount} in cart)` : 'Shop'} />
        </ListItem>
      </List>

      <Box className="mobile-cta-container">
        <Button variant="contained" fullWidth className="cta-button"
          onClick={() => { handleNavClick(); window.location.href = '/contact'; }}>
          Get a Quote
        </Button>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar position="fixed" elevation={0} color="inherit"
        style={{
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(13,36,85,0.96)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isScrolled ? '1px solid rgba(27,61,138,0.12)' : '1px solid rgba(255,255,255,0.08)',
          boxShadow: isScrolled ? '0 4px 24px rgba(13,36,85,0.10)' : '0 2px 20px rgba(0,0,0,0.25)',
          transition: 'background-color 0.4s ease, box-shadow 0.4s ease',
          top: 0, width: '100%', zIndex: 1000,
        }}>
        <Toolbar className="navbar-toolbar">
          <Link to="/" className="navbar-logo-container">
            <Box style={{
              backgroundColor: '#ffffff', borderRadius: '10px', padding: '6px 12px',
              display: 'flex', alignItems: 'center',
              boxShadow: isScrolled ? 'none' : '0 2px 12px rgba(0,0,0,0.20)',
              transition: 'box-shadow 0.4s ease',
            }}>
              <Box component="img" src="/images/logo.png" alt="SNP Innovation"
                style={{ height: '42px', width: 'auto', display: 'block' }} />
            </Box>
          </Link>

          <Box className="navbar-desktop">{desktopNav}</Box>

          <Box className="navbar-mobile-button">
            <IconButton size="large" onClick={handleMobileToggle}
              style={{ color: isScrolled ? '#1B3D8A' : '#ffffff' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {mobileNav}
    </>
  );
};

export default Navbar;
