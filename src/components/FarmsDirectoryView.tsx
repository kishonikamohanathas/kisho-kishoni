import React from 'react';
import { useApp } from '../context/AppContext';
import { Farm } from '../types';
import {
  MapPin,
  ShieldCheck,
  Star,
  Calendar,
  Layers,
  ArrowRight,
  Sprout,
  CheckCircle,
} from 'lucide-react';

export const FarmsDirectoryView: React.FC = () => {
  const { farms, products, setSelectedFarmModal, setSelectedDistrict, setActiveTab } = useApp();

  return (
    <section className="py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          <Sprout className="w-4 h-4 text-[#22C55E]" />
          <span>Island-wide Verified Producer Network</span>
        </div>
        <h2 className="text-3xl font-extrabold text-emerald-950 font-display">
          Sri Lankan Certified Agricultural Estates
        </h2>
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Discover verified multi-generational farms, bio-gardens, and eco-cooperatives across Ceylon. Each farm ships fresh produce directly under regulated quality standards.
        </p>
      </div>

      {/* Farms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => {
          const farmCropCount = products.filter((p) => p.farmId === farm.id).length;

          return (
            <div
              key={farm.id}
              className="bg-white rounded-3xl border border-emerald-950/10 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Media */}
              <div className="relative h-48 w-full bg-neutral-900 overflow-hidden">
                <img
                  src={farm.imageUrl}
                  alt={farm.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  {farm.isVerified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#22C55E] text-emerald-950 text-[11px] font-bold shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>SL-GAP Verified</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400 text-amber-950 text-[11px] font-bold shadow-xs">
                      <span>Verification Pending</span>
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
                    <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>{farm.location}</span>
                  </span>
                  <div className="flex items-center gap-1 font-mono font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{farm.rating}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-emerald-950 font-display group-hover:text-emerald-700 transition-colors">
                    {farm.name}
                  </h3>
                  <div className="text-xs text-emerald-800 font-medium mt-0.5">
                    Farmer: {farm.farmerName}
                  </div>
                  <p className="text-xs text-neutral-600 line-clamp-3 mt-2 leading-relaxed">
                    {farm.description}
                  </p>
                </div>

                {/* Certifications & Metrics */}
                <div className="space-y-3 pt-3 border-t border-neutral-100">
                  <div className="flex flex-wrap gap-1.5">
                    {farm.certifications.slice(0, 2).map((c) => (
                      <span
                        key={c}
                        className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span>{farm.acres} Acres</span>
                    <span>·</span>
                    <span>Est. {farm.establishedYear}</span>
                    <span>·</span>
                    <span className="text-emerald-900 font-bold">{farmCropCount} Active Crops</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setSelectedFarmModal(farm)}
                      className="flex-1 py-2 px-3 bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                    >
                      View Farm Profile
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDistrict(farm.district);
                        setActiveTab('marketplace');
                      }}
                      className="py-2 px-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      title="Filter market by this district"
                    >
                      Browse Crops
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
