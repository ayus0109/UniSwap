import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SellPage } from './pages/SellPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { HowItWorksPage } from './pages/HowItWorksPage';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#F8F6F2] text-[#242321]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/item/:id" element={<ProductDetailPage />} />
                <Route path="/sell" element={<SellPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                {/* Fallback route */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MarketplaceProvider>
    </AuthProvider>
  );
};

export default App;
