import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory, District, OrderStatus, FarmSubOrder } from '../../types';
import {
  Tractor,
  Package,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Truck,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  MapPin,
  X,
  Smartphone,
  Save,
  Layers,
  Leaf,
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const {
    activeUser,
    farms,
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStock,
    updateFarmProfile,
    updateSubOrderStatus,
    t,
  } = useApp();

  // Find farmer's farm (default to farm-1 Jaffna Heritage Agro if none explicitly mapped)
  const myFarm = farms.find((f) => f.id === activeUser.farmId) || farms[0];
  const myProducts = products.filter((p) => p.farmId === myFarm.id);

  // Extract all sub-orders destined for THIS farm across all master orders!
  const mySubOrders: FarmSubOrder[] = orders
    .flatMap((m) => m.subOrders)
    .filter((s) => s.farmId === myFarm.id);

  // Calculations
  const grossSalesLKR = mySubOrders.reduce((sum, s) => sum + s.subtotalLKR, 0);
  const platformFeeLKR = Math.round(grossSalesLKR * 0.05); // 5% fee
  const netEarningsLKR = grossSalesLKR - platformFeeLKR;

  // Add/Edit Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Vegetables');
  const [formPriceLKR, setFormPriceLKR] = useState<number>(500);
  const [formUnit, setFormUnit] = useState('1 kg');
  const [formStock, setFormStock] = useState<number>(100);
  const [formIsOrganic, setFormIsOrganic] = useState(true);
  const [formIsSlGap, setFormIsSlGap] = useState(true);
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('/src/assets/images/crop_fields_jaffna_1791975194985.jpg');

  // Farm Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(myFarm.name);
  const [profileLocation, setProfileLocation] = useState(myFarm.location);
  const [profilePhone, setProfilePhone] = useState(myFarm.phone);
  const [profileAcres, setProfileAcres] = useState(myFarm.acres);
  const [profileDesc, setProfileDesc] = useState(myFarm.description);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('Vegetables');
    setFormPriceLKR(450);
    setFormUnit('1 kg');
    setFormStock(80);
    setFormIsOrganic(true);
    setFormIsSlGap(true);
    setFormDescription('Freshly harvested from our fields with zero synthetic additives.');
    setFormImageUrl(myFarm.imageUrl);
    setIsProductModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPriceLKR(p.priceLKR);
    setFormUnit(p.unit);
    setFormStock(p.stockQuantity);
    setFormIsOrganic(p.isOrganic);
    setFormIsSlGap(p.isSlGapCertified);
    setFormDescription(p.description);
    setFormImageUrl(p.imageUrl);
    setIsProductModalOpen(true);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        category: formCategory,
        priceLKR: Number(formPriceLKR),
        unit: formUnit,
        stockQuantity: Number(formStock),
        inStock: Number(formStock) > 0,
        isOrganic: formIsOrganic,
        isSlGapCertified: formIsSlGap,
        description: formDescription,
        imageUrl: formImageUrl,
      });
    } else {
      addProduct({
        farmId: myFarm.id,
        farmName: myFarm.name,
        farmerId: activeUser.id,
        farmerName: activeUser.name,
        name: formName,
        nameTa: formName,
        nameSi: formName,
        category: formCategory,
        priceLKR: Number(formPriceLKR),
        unit: formUnit,
        stockQuantity: Number(formStock),
        inStock: Number(formStock) > 0,
        district: myFarm.district,
        imageUrl: formImageUrl,
        isOrganic: formIsOrganic,
        isSlGapCertified: formIsSlGap,
        description: formDescription,
        harvestDate: 'Just now',
      });
    }
    setIsProductModalOpen(false);
  };

  const handleSaveFarmProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmProfile({
      id: myFarm.id,
      name: profileName,
      location: profileLocation,
      phone: profilePhone,
      acres: Number(profileAcres),
      description: profileDesc,
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="py-8 space-y-8">
      {/* Top Banner / Farm Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#14532D] text-white flex items-center justify-center shadow-md">
            <Tractor className="w-8 h-8 text-[#22C55E]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-emerald-950 font-display">
                {myFarm.name}
              </h2>
              {myFarm.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>SL-GAP Verified</span>
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-600 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{myFarm.location} ({myFarm.district})</span>
              <span>·</span>
              <span>Head Farmer: <strong className="text-emerald-950">{activeUser.name}</strong></span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Farm Profile'}</span>
          </button>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#22C55E]" />
            <span>{t.farmerDashboard.addProduct}</span>
          </button>
        </div>
      </div>

      {/* Farm Profile Inline Editor */}
      {isEditingProfile && (
        <form onSubmit={handleSaveFarmProfile} className="bg-emerald-50/70 rounded-3xl p-6 border border-emerald-200 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-emerald-950 font-display">
            Update Farm & Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Farm Public Name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Exact Location
              </label>
              <input
                type="text"
                value={profileLocation}
                onChange={(e) => setProfileLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Farmer Direct Phone (+94)
              </label>
              <input
                type="text"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
              Farm Philosophy & Bio
            </label>
            <textarea
              rows={2}
              value={profileDesc}
              onChange={(e) => setProfileDesc(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#14532D] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Farm Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* 4 Financial & Order Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>{t.farmerDashboard.grossSales}</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-display text-emerald-950 tabular-nums">
            LKR {grossSalesLKR.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            From {mySubOrders.length} processed sub-orders
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>{t.farmerDashboard.commissionFee}</span>
            <span className="text-neutral-400 font-mono">5.0%</span>
          </div>
          <div className="text-2xl font-bold font-display text-neutral-600 tabular-nums">
            -LKR {platformFeeLKR.toLocaleString()}
          </div>
          <div className="text-[11px] text-neutral-400">
            Automated platform clearing fee
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs space-y-1 bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex items-center justify-between text-xs text-emerald-800 font-medium">
            <span>{t.farmerDashboard.netPayout}</span>
            <TrendingUp className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-bold font-display text-emerald-900 tabular-nums">
            LKR {netEarningsLKR.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Transferred directly to Bank of Ceylon
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-900/10 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>{t.farmerDashboard.totalOrders}</span>
            <Package className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-display text-emerald-950 tabular-nums">
            {mySubOrders.length} Sub-Orders
          </div>
          <div className="text-[11px] text-neutral-500">
            {myProducts.length} Active crop listings
          </div>
        </div>
      </div>

      {/* Section 1: Incoming Farm Orders (Filtered to this farm only!) */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-emerald-950 font-display">
              {t.farmerDashboard.incomingOrders} ({mySubOrders.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Only items belonging to <strong className="text-emerald-950">{myFarm.name}</strong> appear here via smart cart splitting.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Smart Farm Isolation: ON
          </span>
        </div>

        {mySubOrders.length === 0 ? (
          <div className="text-center py-12 text-neutral-400 text-xs">
            No active sub-orders for your farm at the moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500 font-medium border-y border-neutral-200">
                <tr>
                  <th className="py-3 px-4">Sub-Order ID</th>
                  <th className="py-3 px-4">Items Harvested</th>
                  <th className="py-3 px-4">Gross LKR</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Update Order Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {mySubOrders.map((sub) => (
                  <tr key={sub.id} className="hover:bg-neutral-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-950">
                      <div>{sub.id}</div>
                      <div className="text-[10px] text-neutral-400 font-normal">
                        Master: {sub.masterOrderId}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        {sub.items.map((it) => (
                          <div key={it.productId} className="text-neutral-700">
                            • {it.productName}{' '}
                            <span className="text-neutral-400 font-mono">
                              ({it.quantity} {it.unit})
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-950">
                      LKR {sub.subtotalLKR.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          sub.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : sub.status === 'Shipped'
                            ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                            : sub.status === 'Processing'
                            ? 'bg-purple-100 text-purple-800 border-purple-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {/* Status changer select triggers simulated SMS to customer */}
                      <select
                        value={sub.status}
                        onChange={(e) =>
                          updateSubOrderStatus(sub.id, e.target.value as OrderStatus)
                        }
                        className="px-2.5 py-1.5 text-xs bg-white border border-neutral-300 rounded-xl font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section 2: Farm Crop Inventory Manager */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-emerald-950 font-display">
              {t.farmerDashboard.inventory} ({myProducts.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Set your Sri Lankan Rupee pricing, stock quantities, and availability tags.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="px-3.5 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Crop</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 font-medium border-y border-neutral-200">
              <tr>
                <th className="py-3 px-4">Crop Listing</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (LKR)</th>
                <th className="py-3 px-4">Stock Level</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {myProducts.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-bold text-emerald-950">{p.name}</div>
                        <div className="text-[11px] text-neutral-400">
                          {p.isOrganic ? '🌱 Organic' : 'Conventional'}{' '}
                          {p.isSlGapCertified && '· SL-GAP'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-neutral-700">{p.category}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-950">
                    LKR {p.priceLKR.toLocaleString()}{' '}
                    <span className="text-[10px] text-neutral-400 font-normal">/ {p.unit}</span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span
                      className={`font-semibold ${
                        p.stockQuantity > 0 ? 'text-emerald-700' : 'text-red-500'
                      }`}
                    >
                      {p.stockQuantity} {p.unit}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleProductStock(p.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                        p.inStock
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-800 hover:bg-neutral-100 cursor-pointer"
                        title="Edit product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        title="Delete listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#FFFEF5] rounded-3xl shadow-2xl border border-emerald-900/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#14532D] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-bold font-display">
                {editingProduct ? 'Edit Crop Listing' : 'Add New Crop to Marketplace'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">
                  Crop Name (English / Sinhala / Tamil) *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Jaffna Red Shallots or Organic Cinnamon"
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Rice">Rice</option>
                    <option value="Tea">Tea</option>
                    <option value="Spices">Spices</option>
                    <option value="Dairy">Dairy</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Unit of Measure *</label>
                  <input
                    type="text"
                    required
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="e.g. 1 kg, 500g pouch, pot"
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">
                    Price in LKR *
                  </label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={formPriceLKR}
                    onChange={(e) => setFormPriceLKR(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">
                    Available Stock *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={formIsOrganic}
                    onChange={(e) => setFormIsOrganic(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>100% Organically Grown</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={formIsSlGap}
                    onChange={(e) => setFormIsSlGap(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>SL-GAP Certified</span>
                </label>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#14532D] hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Crop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
