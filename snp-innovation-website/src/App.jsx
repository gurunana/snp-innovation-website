/* ========================================
   APP.JSX - Main Application Entry Point
   ======================================== */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import store from './store/store';
import muiTheme from './theme/muiTheme';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EdtechPage from './pages/EdtechPage';
import ITResourcingPage from './pages/ITResourcingPage';
import RDPage from './pages/RDPage';
import IncubationPage from './pages/IncubationPage';
import WorkshopsPage from './pages/WorkshopsPage';
import GalleryPage from './pages/GalleryPage';
import CareersPage from './pages/CareersPage';
import EnquiryPage from './pages/EnquiryPage';
import ContactPage from './pages/ContactPage';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <Navbar />
          <div style={{ height: '72px', flexShrink: 0 }} />
          <main style={{ overflowX: 'hidden', width: '100%' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/edtech" element={<EdtechPage />} />
              <Route path="/it-resourcing" element={<ITResourcingPage />} />
              <Route path="/rd-automation" element={<RDPage />} />
              <Route path="/incubation" element={<IncubationPage />} />
              <Route path="/workshops" element={<WorkshopsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/enquiry" element={<EnquiryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
