import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { MarketplaceView } from './components/MarketplaceView';
import { FarmsDirectoryView } from './components/FarmsDirectoryView';
import { CustomerDashboard } from './components/dashboards/CustomerDashboard';
import { FarmerDashboard } from './components/dashboards/FarmerDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { OwnerDashboard } from './components/dashboards/OwnerDashboard';
import { FarmDetailModal } from './components/FarmDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { RoleSelectorModal } from './components/RoleSelectorModal';
import { SmsNotificationToast } from './components/SmsNotificationToast';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFEF5] text-[#17251B] selection:bg-emerald-200 selection:text-emerald-950">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activeTab === 'marketplace' && (
          <>
            <HeroCarousel />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <MarketplaceView />
            </div>
          </>
        )}

        {activeTab === 'farms' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FarmsDirectoryView />
          </div>
        )}

        {activeTab === 'customer_dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CustomerDashboard />
          </div>
        )}

        {activeTab === 'farmer_dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FarmerDashboard />
          </div>
        )}

        {activeTab === 'admin_dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdminDashboard />
          </div>
        )}

        {activeTab === 'owner_dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <OwnerDashboard />
          </div>
        )}
      </main>

      {/* Global Interactive Modals & Drawers */}
      <FarmDetailModal />
      <CartDrawer />
      <RoleSelectorModal />
      <SmsNotificationToast />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
