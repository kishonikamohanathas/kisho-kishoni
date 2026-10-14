import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Leaf,
  MapPin,
  Star,
  Check,
  Eye,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    t,
    addToCart,
    wishlist,
    toggleWishlist,
    farms,
    setSelectedFarmModal,
  } = useApp();

  const [isJustAdded, setIsJustAdded] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  const isFavorite = wishlist.includes(product.id);
  const farm = farms.find((f) => f.id === product.farmId);

  // Micro-interaction: Subtle 3D Card tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.3s ease-out',
    });
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, 1);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 1600);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="group relative rounded-2xl bg-white border border-emerald-950/10 shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Fallback overlay scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isOrganic && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#14532D]/90 backdrop-blur-md text-[#DCFCE7] text-[11px] font-bold shadow-xs">
              <Leaf className="w-3 h-3 text-[#22C55E]" />
              <span>Organic</span>
            </span>
          )}
          {product.isSlGapCertified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-emerald-950 text-[11px] font-bold shadow-xs">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              <span>SL-GAP</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-neutral-700 hover:text-red-500 hover:scale-110 transition-all shadow-md z-10 cursor-pointer"
          title={isFavorite ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-700'
            }`}
          />
        </button>

        {/* District & Harvest Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-medium z-10">
          <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-[#22C55E]" />
            <span>{product.district}</span>
          </span>
          <span className="text-[11px] text-emerald-100/90 font-mono">
            {product.category}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Farm Link */}
          <div className="flex items-center justify-between text-xs text-emerald-800 font-medium">
            <button
              onClick={() => {
                if (farm) setSelectedFarmModal(farm);
              }}
              className="hover:underline flex items-center gap-1 cursor-pointer text-left truncate max-w-[200px]"
              title="View Farm details"
            >
              <span className="truncate">{product.farmName}</span>
              <Eye className="w-3 h-3 text-emerald-600 shrink-0" />
            </button>
            <div className="flex items-center gap-1 text-amber-600 font-bold font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-emerald-950 font-display mt-1 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-neutral-600 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-emerald-950/10 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-extrabold text-emerald-950 font-display tabular-nums tracking-tight">
              LKR {product.priceLKR.toLocaleString()}
            </div>
            <div className="text-[11px] text-neutral-500 font-mono">
              per {product.unit}
            </div>
          </div>

          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer whitespace-nowrap ${
                isJustAdded
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#22C55E] hover:bg-emerald-400 text-emerald-950'
              }`}
            >
              {isJustAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.marketplace.addedToCart}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.marketplace.addToCart}</span>
                </>
              )}
            </button>
          ) : (
            <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-100 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
