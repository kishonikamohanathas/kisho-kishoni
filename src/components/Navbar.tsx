import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  ShoppingBag,
  Heart,
  Globe,
  UserCheck,
  ChevronDown,
  Menu,
  X,
  Sprout,
  Store,
  Layers,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    activeRole,
    activeUser,
    cartTotalCount,
    setIsCartOpen,
    setIsRoleSelectorOpen,
    activeTab,
    setActiveTab,
    resetDemoData,
    wishlist,
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English (EN)', flag: '🇬🇧' },
    { code: 'ta', label: 'தமிழ் (TA)', flag: '🇱🇰' },
    { code: 'si', label: 'සිංහල (SI)', flag: '🇱🇰' },
  ];

  const getRoleBadgeColor = () => {
    switch (activeRole) {
      case 'customer':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'farmer':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'owner':
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getRoleDashboardTab = () => {
    switch (activeRole) {
      case 'customer':
        return 'customer_dashboard';
      case 'farmer':
        return 'farmer_dashboard';
      case 'admin':
        return 'admin_dashboard';
      case 'owner':
        return 'owner_dashboard';
    }
  };

  const getRoleDashboardLabel = () => {
    switch (activeRole) {
      case 'customer':
        return t.nav.customerDashboard;
      case 'farmer':
        return t.nav.farmerPortal;
      case 'admin':
        return t.nav.adminConsole;
      case 'owner':
        return t.nav.ownerAnalytics;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fffef5]/95 backdrop-blur-md border-b border-emerald-900/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-[#14532D] text-white flex items-center justify-center shadow-md group-hover:bg-emerald-700 transition-colors">
                <Sprout className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-[#14532D] font-display whitespace-nowrap">
                  {t.appName}
                </span>
                <span className="text-[11px] font-medium text-emerald-700/80 -mt-1 hidden sm:block whitespace-nowrap">
                  Ceylon Direct Agriculture
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single-line, clean unboxed typography) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-emerald-950">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`hover:text-emerald-600 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'marketplace' ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''
              }`}
            >
              {t.nav.marketplace}
            </button>
            <button
              onClick={() => setActiveTab('farms')}
              className={`hover:text-emerald-600 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'farms' ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''
              }`}
            >
              {t.nav.farms}
            </button>
            <button
              onClick={() => setActiveTab(getRoleDashboardTab())}
              className={`hover:text-emerald-600 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === getRoleDashboardTab() ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600' : ''
              }`}
            >
              {getRoleDashboardLabel()}
            </button>
            {activeRole === 'customer' && (
              <button
                onClick={() => setActiveTab('customer_dashboard')}
                className={`hover:text-emerald-600 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'customer_dashboard' ? 'text-emerald-700 font-semibold' : ''
                }`}
              >
                <Heart className="w-4 h-4 text-emerald-700" />
                <span>{t.nav.wishlist}</span>
                {wishlist.length > 0 && (
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.2 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}
          </nav>

          {/* Zone 3: Interactive Controls (Language, Role Switcher, Cart, Reset) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-900/15 hover:border-emerald-700 bg-white/80 text-xs font-semibold text-emerald-950 transition-colors cursor-pointer shadow-xs"
                title="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-700" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-emerald-800 opacity-60" />
              </button>

              {isLangMenuOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white border border-emerald-900/10 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setIsLangMenuOpen(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                        language === l.code ? 'bg-emerald-100/70 text-emerald-900 font-semibold' : 'text-emerald-950'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-xs">{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher Pill & Modal Trigger */}
            <button
              onClick={() => setIsRoleSelectorOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer shadow-xs hover:opacity-95 transition-all ${getRoleBadgeColor()}`}
              title="Change User Persona"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="capitalize">{activeRole}</span>
              <SlidersHorizontal className="w-3 h-3 opacity-60 ml-0.5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#14532D] text-white hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#22C55E]" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#F97316] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Reset Demo State Button */}
            <button
              onClick={resetDemoData}
              className="hidden md:flex items-center p-2 rounded-lg text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/60 transition-colors"
              title="Reset Demo Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-emerald-950 hover:bg-emerald-100/50"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-emerald-900/10 space-y-2 animate-in fade-in duration-200">
            <button
              onClick={() => {
                setActiveTab('marketplace');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-50 rounded-lg"
            >
              {t.nav.marketplace}
            </button>
            <button
              onClick={() => {
                setActiveTab('farms');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-50 rounded-lg"
            >
              {t.nav.farms}
            </button>
            <button
              onClick={() => {
                setActiveTab(getRoleDashboardTab());
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-sm font-medium text-emerald-950 hover:bg-emerald-50 rounded-lg"
            >
              {getRoleDashboardLabel()}
            </button>
            <div className="pt-2 border-t border-emerald-900/10 flex items-center justify-between px-3 text-xs text-emerald-800">
              <span>Logged in as: <strong className="capitalize">{activeRole}</strong> ({activeUser.name})</span>
              <button
                onClick={() => {
                  setIsRoleSelectorOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="underline font-semibold text-emerald-900"
              >
                {t.roles.switchPrompt}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
