import React from 'react';
import { useApp } from '../context/AppContext';
import { Sprout, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setActiveTab, setSelectedDistrict } = useApp();

  return (
    <footer className="bg-[#14532D] text-white border-t border-emerald-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Wordmark */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                <Sprout className="w-5 h-5 text-[#22C55E]" />
              </div>
              <span className="text-lg font-bold font-display text-white">
                {t.appName}
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Empowering Sri Lankan smallholders, estate planters, and consumers through direct transparent digital trade and smart multi-farm logistics.
            </p>
            <div className="text-[11px] text-emerald-300 font-medium">
              Registered in Colombo & Kandy, Sri Lanka
            </div>
          </div>

          {/* Col 2: Agricultural Zones */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Key Agricultural Districts
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-100/80">
              {['Jaffna', 'Nuwara Eliya', 'Anuradhapura', 'Matale', 'Kandy'].map((d) => (
                <li key={d}>
                  <button
                    onClick={() => {
                      setSelectedDistrict(d as any);
                      setActiveTab('marketplace');
                      document.getElementById('marketplace-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {d} District Harvests
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Roles */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Platform Personas
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-100/80">
              <li>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Consumer Marketplace & Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('farmer_dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Farmer Operations & Sub-Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin_dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Administrative Compliance Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('owner_dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Executive GMV Business Intelligence
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Standards */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Standards & Integrity
            </h4>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              SL-GAP (Sri Lanka Good Agricultural Practices), Ceylon Tea Board standards, and National Organic Certification Department compliant.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>Certified Direct Farmer Commerce</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/70 gap-4">
          <div>
            © 2026 Sri Lanka AgriConnect. All rights reserved across English, தமிழ் & සිංහල.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Terms of Trade</span>
            <span>·</span>
            <span>Farmer Fair Compensation Charter</span>
            <span>·</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
