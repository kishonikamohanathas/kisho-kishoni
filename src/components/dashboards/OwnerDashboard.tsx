import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { REGIONAL_GROWTH_DATA } from '../../data/mockData';
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Layers,
  Database,
  MapPin,
  Users,
  Copy,
  Check,
  Building,
  ArrowUpRight,
  ShieldCheck,
  Sprout,
} from 'lucide-react';

export const OwnerDashboard: React.FC = () => {
  const { orders, farms, products, users, t, showToast } = useApp();
  const [isCopied, setIsCopied] = useState(false);
  const [showSchemaDrawer, setShowSchemaDrawer] = useState(false);

  // Dynamic GMV Calculation
  const totalGMVLKR = orders.reduce((sum, o) => sum + o.subtotalLKR, 0) + 7450000; // includes historic Ceylon harvest volume
  const platformFeeRate = 0.05; // 5%
  const platformRevenueLKR = Math.round(totalGMVLKR * platformFeeRate);
  const activeFarmsCount = farms.length;
  const registeredUsersCount = users.length;

  const sqlSchemaDoc = `-- Sri Lanka AgriConnect PostgreSQL / Supabase Production Schema
-- Compatible with Cloud SQL PostgreSQL & Supabase migrations

-- 1. USERS & ROLES
CREATE TYPE user_role AS ENUM ('customer', 'farmer', 'admin', 'owner');
CREATE TYPE order_status AS ENUM ('Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    phone VARCHAR(20) NOT NULL, -- e.g. '+94 77 123 4567'
    district VARCHAR(50) NOT NULL, -- 'Jaffna', 'Kandy', 'Nuwara Eliya', etc.
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FARMS
CREATE TABLE farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_name VARCHAR(255) NOT NULL,
    district VARCHAR(50) NOT NULL,
    exact_location TEXT NOT NULL,
    established_year INT NOT NULL,
    acres NUMERIC(6, 2) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    sl_gap_certified BOOLEAN DEFAULT FALSE,
    organic_certified BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    cover_image_url TEXT,
    description TEXT,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS (HARVEST CATALOG)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    farmer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Vegetables', 'Fruits', 'Rice', 'Tea', 'Spices', 'Dairy'
    price_lkr NUMERIC(10, 2) NOT NULL, -- Sri Lankan Rupee pricing
    unit VARCHAR(50) NOT NULL, -- '1 kg', '500g pouch', 'clay pot'
    stock_quantity INT NOT NULL DEFAULT 0,
    in_stock BOOLEAN DEFAULT TRUE,
    is_organic BOOLEAN DEFAULT FALSE,
    is_sl_gap BOOLEAN DEFAULT FALSE,
    description TEXT,
    image_url TEXT,
    harvest_date VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MASTER ORDERS & MULTI-FARM SMART CART SPLITTING
CREATE TABLE master_orders (
    id VARCHAR(50) PRIMARY KEY, -- 'ORD-LK-2026-XXXX'
    customer_id UUID NOT NULL REFERENCES users(id),
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    delivery_address TEXT NOT NULL,
    district VARCHAR(50) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status order_status DEFAULT 'Pending',
    subtotal_lkr NUMERIC(12, 2) NOT NULL,
    delivery_fee_lkr NUMERIC(10, 2) NOT NULL,
    total_lkr NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. FARM-SPECIFIC SUB-ORDERS (DISPATCHED INDIVIDUALLY TO FARMERS)
CREATE TABLE farm_sub_orders (
    id VARCHAR(50) PRIMARY KEY, -- 'SUB-XXXX-A'
    master_order_id VARCHAR(50) NOT NULL REFERENCES master_orders(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES farms(id),
    farmer_id UUID NOT NULL REFERENCES users(id),
    subtotal_lkr NUMERIC(10, 2) NOT NULL,
    delivery_fee_lkr NUMERIC(10, 2) NOT NULL DEFAULT 250,
    total_lkr NUMERIC(10, 2) NOT NULL,
    status order_status DEFAULT 'Pending',
    farmer_notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SUB-ORDER ITEMS
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_order_id VARCHAR(50) NOT NULL REFERENCES farm_sub_orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    price_lkr NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. AUDIT TRAIL LOGS
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(100) NOT NULL,
    performed_by VARCHAR(255) NOT NULL,
    user_role user_role NOT NULL,
    details TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'info',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_district ON products(category, farm_id);
CREATE INDEX idx_sub_orders_farmer ON farm_sub_orders(farmer_id, status);
`;

  const copySchema = () => {
    navigator.clipboard.writeText(sqlSchemaDoc);
    setIsCopied(true);
    showToast('PostgreSQL schema copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xl shadow-xs">
            <TrendingUp className="w-7 h-7 text-blue-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-emerald-950 font-display">
                {t.ownerDashboard.title}
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Executive Owner
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t.ownerDashboard.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSchemaDrawer(!showSchemaDrawer)}
          className="px-4 py-2.5 bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
        >
          <Database className="w-4 h-4 text-[#22C55E]" />
          <span>{t.ownerDashboard.viewDbSchema}</span>
        </button>
      </div>

      {/* 4 Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>{t.ownerDashboard.gmvTitle}</span>
            <DollarSign className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-950 tabular-nums">
            LKR {totalGMVLKR.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24.5% vs previous harvest season</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-2 bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex items-center justify-between text-xs text-emerald-800 font-medium">
            <span>{t.ownerDashboard.platformRevenue}</span>
            <span className="font-mono text-xs font-bold text-emerald-900">5.0% Fee</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-900 tabular-nums">
            LKR {platformRevenueLKR.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Net automated commission earnings
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>{t.ownerDashboard.activeFarms}</span>
            <Sprout className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-950 tabular-nums">
            {activeFarmsCount} Farms
          </div>
          <div className="text-[11px] text-neutral-500">
            Across 8 agro-climatic zones
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>Ecosystem Direct Trade</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-950 tabular-nums">
            95.0%
          </div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Returned directly to local farmers
          </div>
        </div>
      </div>

      {/* Visual Chart: Monthly Revenue & GMV Trajectory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-emerald-950 font-display">
              GMV Volume & Platform Commission Curve (2026)
            </h3>
            <p className="text-xs text-neutral-500">
              Aggregated monthly harvest transactions in Sri Lankan Rupees (LKR).
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#14532D]" />
              <span>Gross Trade Volume (LKR)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#22C55E]" />
              <span>5% Platform Take Rate</span>
            </div>
          </div>
        </div>

        {/* SVG Bar / Area visualization */}
        <div className="h-64 w-full flex items-end gap-3 pt-8 pb-4 px-2 border-b border-neutral-200">
          {[
            { month: 'May', gmv: 850000, height: '40%' },
            { month: 'Jun', gmv: 1100000, height: '52%' },
            { month: 'Jul', gmv: 1350000, height: '64%' },
            { month: 'Aug', gmv: 1600000, height: '76%' },
            { month: 'Sep', gmv: 1850000, height: '88%' },
            { month: 'Oct (Current)', gmv: 2150000, height: '100%' },
          ].map((bar) => (
            <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                LKR {(bar.gmv / 1000).toFixed(0)}k
              </div>
              <div
                style={{ height: bar.height }}
                className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-[#14532D] to-emerald-600 group-hover:to-[#22C55E] transition-all relative cursor-pointer"
              >
                <div className="absolute top-1 left-1 right-1 h-1.5 bg-[#22C55E] rounded-full" />
              </div>
              <span className="text-[11px] text-neutral-600 font-medium whitespace-nowrap">
                {bar.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Regional District Performance Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-5">
        <div>
          <h3 className="text-lg font-bold text-emerald-950 font-display">
            {t.ownerDashboard.salesByDistrict}
          </h3>
          <p className="text-xs text-neutral-500">
            Regional performance metrics across Sri Lanka’s key agro-ecological zones.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 font-medium border-y border-neutral-200">
              <tr>
                <th className="py-3 px-4">Agricultural District</th>
                <th className="py-3 px-4">Active Farms</th>
                <th className="py-3 px-4">Gross Sales Volume</th>
                <th className="py-3 px-4">Platform Revenue (5%)</th>
                <th className="py-3 px-4 text-right">YoY Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono">
              {REGIONAL_GROWTH_DATA.map((row) => (
                <tr key={row.district} className="hover:bg-neutral-50/60">
                  <td className="py-3.5 px-4 font-sans font-bold text-emerald-950 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{row.district}</span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">{row.activeFarms} Producers</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-950">
                    LKR {row.salesLKR.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-800 font-semibold">
                    LKR {Math.round(row.salesLKR * 0.05).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right text-emerald-600 font-bold">
                    {row.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Architecture & Database Schema Drawer */}
      {showSchemaDrawer && (
        <div className="bg-[#17251B] text-emerald-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-800/40 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#22C55E]" />
              <h3 className="text-base font-bold text-white font-display">
                PostgreSQL / Supabase Production DDL Schema
              </h3>
            </div>
            <button
              onClick={copySchema}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isCopied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Copied' : 'Copy SQL Schema'}</span>
            </button>
          </div>

          <p className="text-xs text-emerald-300/80">
            Ready for execution on Google Cloud SQL (PostgreSQL) or Supabase. Includes multi-farm sub-order decomposition, users RBAC, and audit trail tables.
          </p>

          <pre className="p-4 rounded-2xl bg-black/50 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-96 border border-emerald-800/30">
            {sqlSchemaDoc}
          </pre>
        </div>
      )}
    </div>
  );
};
