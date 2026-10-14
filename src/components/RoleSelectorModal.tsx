import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  User,
  Tractor,
  ShieldCheck,
  LineChart,
  CheckCircle2,
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const RoleSelectorModal: React.FC = () => {
  const {
    isRoleSelectorOpen,
    setIsRoleSelectorOpen,
    activeRole,
    switchRole,
    users,
    t,
  } = useApp();

  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>(activeRole);
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('demo-password-123');
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isRoleSelectorOpen) return null;

  const roleCards: {
    role: UserRole;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    bgAccent: string;
    borderActive: string;
    demoUser: string;
    keyFeatures: string[];
  }[] = [
    {
      role: 'customer',
      title: t.roles.customer,
      description: t.roles.customerDesc,
      icon: User,
      accentColor: 'text-emerald-700',
      bgAccent: 'bg-emerald-50',
      borderActive: 'border-emerald-600 ring-2 ring-emerald-500/20',
      demoUser: 'Dilshan Perera (Kandy)',
      keyFeatures: [
        'Browse Ceylon fresh harvest',
        'Multi-district filtering',
        'Smart multi-farm cart splitting',
        'Track order fulfillment status',
      ],
    },
    {
      role: 'farmer',
      title: t.roles.farmer,
      description: t.roles.farmerDesc,
      icon: Tractor,
      accentColor: 'text-amber-700',
      bgAccent: 'bg-amber-50',
      borderActive: 'border-amber-600 ring-2 ring-amber-500/20',
      demoUser: 'K. Tharmalingam (Jaffna Heritage Agro)',
      keyFeatures: [
        'Edit farm profile & SL-GAP status',
        'Add, edit & delete crop listings',
        'Fulfill incoming orders & update status',
        'Gross sales & net earnings summary',
      ],
    },
    {
      role: 'admin',
      title: t.roles.admin,
      description: t.roles.adminDesc,
      icon: ShieldCheck,
      accentColor: 'text-purple-700',
      bgAccent: 'bg-purple-50',
      borderActive: 'border-purple-600 ring-2 ring-purple-500/20',
      demoUser: 'Nirosha Fernando (Platform Moderator)',
      keyFeatures: [
        'Farm verification approval queue',
        'Suspend or activate user accounts',
        'Product catalog moderation',
        'Platform security audit logs',
      ],
    },
    {
      role: 'owner',
      title: t.roles.owner,
      description: t.roles.ownerDesc,
      icon: LineChart,
      accentColor: 'text-blue-700',
      bgAccent: 'bg-blue-50',
      borderActive: 'border-blue-600 ring-2 ring-blue-500/20',
      demoUser: 'Dr. Rohan Jayasinghe (Platform Executive)',
      keyFeatures: [
        'Total GMV & platform 5% revenue metrics',
        'Regional district volume breakdown',
        'User acquisition & conversion curves',
        'PostgreSQL / Supabase schema explorer',
      ],
    },
  ];

  const handleRoleCardClick = (role: UserRole) => {
    setSelectedRoleTab(role);
    const targetUser = users.find((u) => u.role === role);
    if (targetUser) {
      setEmailInput(targetUser.email);
    }
  };

  const handleQuickSwitch = (role: UserRole) => {
    switchRole(role);
    setIsRoleSelectorOpen(false);
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (passwordInput.length < 4) {
      setAuthError('Password must be at least 4 characters.');
      return;
    }
    setAuthError(null);
    switchRole(selectedRoleTab);
    setIsRoleSelectorOpen(false);
  };

  const activeRoleCard = roleCards.find((r) => r.role === selectedRoleTab) || roleCards[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#FFFEF5] rounded-3xl shadow-2xl border border-emerald-900/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#14532D] text-white px-6 sm:px-8 py-6 flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Multi-Role Authentication & Simulation</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              {t.roles.selectRoleTitle}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              {t.roles.selectRoleSubtitle}
            </p>
          </div>
          <button
            onClick={() => setIsRoleSelectorOpen(false)}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 4 Interactive Role Cards */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roleCards.map((rc) => {
              const Icon = rc.icon;
              const isSelected = selectedRoleTab === rc.role;
              const isActiveCurrent = activeRole === rc.role;

              return (
                <div
                  key={rc.role}
                  onClick={() => handleRoleCardClick(rc.role)}
                  className={`rounded-2xl p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? `${rc.bgAccent} ${rc.borderActive} shadow-md`
                      : 'bg-white border-neutral-200 hover:border-emerald-300 hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${rc.bgAccent} ${rc.accentColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isActiveCurrent && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                          Active Now
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-emerald-950 font-display">
                        {rc.title}
                      </h3>
                      <p className="text-xs text-emerald-800/80 mt-1 line-clamp-2">
                        {rc.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 truncate max-w-[130px]">
                      {rc.demoUser}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickSwitch(rc.role);
                      }}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-950 flex items-center gap-0.5"
                    >
                      <span>Switch</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Persona Details & Role-Specific Login Form */}
          <div className="bg-white rounded-2xl border border-emerald-900/10 p-6 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left: Persona Capabilities */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    Persona Capabilities
                  </span>
                  <span className="text-xs text-neutral-400">·</span>
                  <span className="text-xs font-bold capitalize text-emerald-950">
                    {activeRoleCard.title} Mode
                  </span>
                </div>
                <h4 className="text-lg font-bold text-emerald-950 font-display">
                  {activeRoleCard.demoUser}
                </h4>
                <p className="text-xs text-emerald-900/70">
                  {activeRoleCard.description}
                </p>
                <div className="space-y-1.5 pt-1">
                  {activeRoleCard.keyFeatures.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-emerald-900">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Interactive Role Login Form */}
              <form onSubmit={handleFormLogin} className="space-y-3.5 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
                <div className="text-xs font-bold text-neutral-700 flex items-center justify-between">
                  <span>Sign In as {activeRoleCard.title}</span>
                  <span className="text-[11px] font-normal text-neutral-500">
                    Demo credentials pre-filled
                  </span>
                </div>

                {authError && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                    {authError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-700 block">
                    Account Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={
                        emailInput ||
                        users.find((u) => u.role === selectedRoleTab)?.email ||
                        ''
                      }
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-neutral-900"
                      placeholder="user@agriconnect.lk"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-700 block">
                    Security Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full pl-9 pr-9 py-2 text-xs bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-neutral-900"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Authenticate as {activeRoleCard.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickSwitch(selectedRoleTab)}
                    className="py-2.5 px-3 bg-[#22C55E] hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    title="Instant switch without re-typing"
                  >
                    1-Click Fast Switch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
