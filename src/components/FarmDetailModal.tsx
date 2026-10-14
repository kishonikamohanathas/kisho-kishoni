import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  Star,
  CheckCircle,
  Leaf,
  Layers,
  ShoppingBag,
} from 'lucide-react';

export const FarmDetailModal: React.FC = () => {
  const {
    selectedFarmModal,
    setSelectedFarmModal,
    products,
    addToCart,
    t,
  } = useApp();

  if (!selectedFarmModal) return null;

  const farm = selectedFarmModal;
  const farmProducts = products.filter((p) => p.farmId === farm.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#FFFEF5] rounded-3xl shadow-2xl border border-emerald-900/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Farm Hero Image Header */}
        <div className="relative h-56 sm:h-64 w-full bg-neutral-900 overflow-hidden">
          <img
            src={farm.imageUrl}
            alt={farm.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14532D] via-black/40 to-black/20" />

          {/* Close button */}
          <button
            onClick={() => setSelectedFarmModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Farm Header Title */}
          <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {farm.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#22C55E] text-emerald-950 text-xs font-bold shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SL-GAP Verified Farm</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-emerald-100">
                <MapPin className="w-3 h-3 text-[#22C55E]" />
                <span>{farm.location}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              {farm.name}
            </h2>
          </div>
        </div>

        {/* Farm Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-emerald-900/10 text-xs">
            <div>
              <div className="text-neutral-500 font-medium">Head Farmer</div>
              <div className="font-bold text-emerald-950 mt-0.5">{farm.farmerName}</div>
            </div>
            <div>
              <div className="text-neutral-500 font-medium">Established</div>
              <div className="font-bold text-emerald-950 mt-0.5 font-mono">
                {farm.establishedYear} ({2026 - farm.establishedYear} yrs)
              </div>
            </div>
            <div>
              <div className="text-neutral-500 font-medium">Acreage</div>
              <div className="font-bold text-emerald-950 mt-0.5 font-mono">
                {farm.acres} Acres Cultivated
              </div>
            </div>
            <div>
              <div className="text-neutral-500 font-medium">Farm Rating</div>
              <div className="font-bold text-amber-600 mt-0.5 flex items-center gap-1 font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{farm.rating} / 5.0</span>
              </div>
            </div>
          </div>

          {/* Farm Bio & Certifications */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-emerald-950 font-display">
              About the Farm & Cultivation Philosophy
            </h4>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {farm.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {farm.certifications.map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/60 text-emerald-900 text-xs font-semibold"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{cert}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Farm's Product Catalog */}
          <div className="space-y-3 pt-2 border-t border-emerald-900/10">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-emerald-950 font-display">
                Current Harvest Catalog ({farmProducts.length})
              </h4>
              <span className="text-xs text-neutral-500">Direct from field</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {farmProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-200 hover:border-emerald-300 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-emerald-950 line-clamp-1">
                      {p.name}
                    </div>
                    <div className="text-xs font-mono font-semibold text-emerald-800">
                      LKR {p.priceLKR.toLocaleString()} / {p.unit}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(p, 1)}
                    disabled={!p.inStock}
                    className={`p-2 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      p.inStock
                        ? 'bg-[#22C55E] hover:bg-emerald-400 text-emerald-950 shadow-xs'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Farmer Contact Direct Call simulation */}
          <div className="pt-2 flex items-center justify-between text-xs text-neutral-600 bg-neutral-100 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>Direct Inquiries: <strong className="font-mono text-neutral-800">{farm.phone}</strong></span>
            </div>
            <span className="text-neutral-500">Verified Mobile Dispatch</span>
          </div>
        </div>
      </div>
    </div>
  );
};
