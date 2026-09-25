/**
 * THE GREY · NATHIA GALI, PAKISTAN
 * A Table in the Hills · Quiet Mountain Luxury
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { trackPageView } from './services/trafficTracker';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Story } from './pages/Story';
import { Gallery } from './pages/Gallery';
import { Reservations } from './pages/Reservations';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

function TrafficTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <TrafficTracker />
        <div className="min-h-screen flex flex-col bg-[#111215] text-[#F5F3EF]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/story" element={<Story />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              {/* Fallback to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
