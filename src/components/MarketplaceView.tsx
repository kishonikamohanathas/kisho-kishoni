import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { District, ProductCategory, Product } from '../types';
import { ProductCard } from './ProductCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Leaf,
  ShieldCheck,
  Package,
  Layers,
  ArrowUpDown,
  X,
  Sparkles,
} from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const {
    products,
    farms,
    t,
    selectedDistrict,
    setSelectedDistrict,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [organicOnly, setOrganicOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(3000);

  const districts: District[] = [
    'Jaffna',
    'Kandy',
    'Nuwara Eliya',
    'Anuradhapura',
    'Badulla',
    'Kilinochchi',
    'Kurunegala',
    'Matale',
  ];

  const categories: ProductCategory[] = [
    'Vegetables',
    'Fruits',
    'Rice',
    'Tea',
    'Spices',
    'Dairy',
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        // District filter
        if (selectedDistrict !== 'All' && prod.district !== selectedDistrict) {
          return false;
        }
        // Category filter
        if (selectedCategory !== 'All' && prod.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = prod.name.toLowerCase().includes(q);
          const matchFarm = prod.farmName.toLowerCase().includes(q);
          const matchDesc = prod.description.toLowerCase().includes(q);
          const matchDistrict = prod.district.toLowerCase().includes(q);
          if (!matchName && !matchFarm && !matchDesc && !matchDistrict) {
            return false;
          }
        }
        // Organic filter
        if (organicOnly && !prod.isOrganic) return false;
        // Verified Farm filter
        if (verifiedOnly) {
          const farm = farms.find((f) => f.id === prod.farmId);
          if (!farm || !farm.isVerified) return false;
        }
        // In-stock filter
        if (inStockOnly && !prod.inStock) return false;
        // Price filter
        if (prod.priceLKR > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceLow') return a.priceLKR - b.priceLKR;
        if (sortBy === 'priceHigh') return b.priceLKR - a.priceLKR;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [
    products,
    farms,
    selectedDistrict,
    selectedCategory,
    searchQuery,
    organicOnly,
    verifiedOnly,
    inStockOnly,
    maxPrice,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSelectedDistrict('All');
    setSelectedCategory('All');
    setSearchQuery('');
    setOrganicOnly(false);
    setVerifiedOnly(false);
    setInStockOnly(false);
    setMaxPrice(3000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedDistrict !== 'All' ||
    selectedCategory !== 'All' ||
    searchQuery !== '' ||
    organicOnly ||
    verifiedOnly ||
    inStockOnly ||
    maxPrice < 3000;

  return (
    <section id="marketplace-section" className="py-10 space-y-8">
      {/* Search & Main Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-900/10 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-800 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.marketplace.searchPlaceholder}
              className="w-full pl-11 pr-10 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-emerald-950 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-3 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-emerald-950 cursor-pointer"
              >
                <option value="featured">{t.marketplace.sortFeatured}</option>
                <option value="priceLow">{t.marketplace.sortPriceLow}</option>
                <option value="priceHigh">{t.marketplace.sortPriceHigh}</option>
                <option value="rating">{t.marketplace.sortRating}</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-3 rounded-2xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* District Filter Segmented Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.marketplace.filterByDistrict}</span>
            </div>
            {selectedDistrict !== 'All' && (
              <span className="text-emerald-700 font-medium">
                Active: {selectedDistrict}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedDistrict('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedDistrict === 'All'
                  ? 'bg-[#14532D] text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              {t.marketplace.allDistricts}
            </button>
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedDistrict === d
                    ? 'bg-[#14532D] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Categories & Secondary Toggles */}
        <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-emerald-100 text-emerald-900 font-bold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-100 text-emerald-900 font-bold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Filter Checkboxes */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-950">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>{t.marketplace.organicOnly}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>{t.marketplace.verifiedOnly}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>{t.marketplace.inStockOnly}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-neutral-600 px-1">
        <div>
          Showing <strong className="text-emerald-950 font-mono">{filteredProducts.length}</strong>{' '}
          {t.marketplace.productsFound}
        </div>
        {selectedDistrict !== 'All' && (
          <span className="text-emerald-800 font-medium">
            Sourced exclusively from {selectedDistrict} district farms
          </span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-emerald-950 font-display">
            No harvest items found
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            No products match the selected combination of district, category, and filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-[#14532D] text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
