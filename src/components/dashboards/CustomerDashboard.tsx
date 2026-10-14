import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { ProductCard } from '../ProductCard';
import {
  ShoppingBag,
  Clock,
  PackageCheck,
  Truck,
  Heart,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CreditCard,
  User,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { orders, wishlist, products, activeUser, t } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(
    orders[0]?.id || null
  );

  const myOrders = orders.filter((o) => o.customerId === activeUser.id || true);
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Processing':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Shipped':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
    }
  };

  const statusSteps: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

  const getStepProgressIndex = (status: OrderStatus) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="py-8 space-y-6">
      {/* Dashboard Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-900/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl font-display">
            {activeUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-emerald-950 font-display">
                {activeUser.name}
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Customer
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">
              {activeUser.email} · {activeUser.district}, Sri Lanka
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-neutral-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-neutral-600 hover:text-emerald-950'
            }`}
          >
            My Orders ({myOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'wishlist'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-neutral-600 hover:text-emerald-950'
            }`}
          >
            Wishlist ({wishlistProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-neutral-600 hover:text-emerald-950'
            }`}
          >
            Delivery Profile
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-600 px-1">
            <span>
              Showing <strong className="text-emerald-950">{myOrders.length}</strong> master fulfillment orders
            </span>
            <span className="text-emerald-800 font-medium">
              Real-time farm split tracking active
            </span>
          </div>

          {myOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 space-y-3">
              <ShoppingBag className="w-10 h-10 text-neutral-400 mx-auto" />
              <h3 className="font-bold text-base text-emerald-950 font-display">
                No orders placed yet
              </h3>
              <p className="text-xs text-neutral-500">
                Browse our marketplace to support local farmers and receive island-fresh produce.
              </p>
            </div>
          ) : (
            myOrders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const currentStep = getStepProgressIndex(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl border border-emerald-900/10 shadow-xs overflow-hidden transition-all"
                >
                  {/* Master Order Top Row */}
                  <div
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/70 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-emerald-950">
                          {order.id}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500 flex items-center gap-2">
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        <span>·</span>
                        <span>{order.subOrders.length} Farm Sub-orders</span>
                        <span>·</span>
                        <span className="text-emerald-900 font-semibold">{order.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <div className="text-base font-extrabold text-emerald-950 font-mono">
                          LKR {order.totalLKR.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-neutral-400 font-mono">
                          Incl. logistics
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-neutral-100 text-neutral-600">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-neutral-100 bg-[#FFFEF5]/70 space-y-6">
                      {/* Stepper Status Progress */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-emerald-950 block">
                          Delivery Lifecycle
                        </span>
                        <div className="grid grid-cols-5 gap-2 pt-2">
                          {statusSteps.map((step, idx) => {
                            const isPassed = idx <= currentStep;
                            return (
                              <div key={step} className="space-y-1.5 text-center">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    isPassed ? 'bg-[#22C55E]' : 'bg-neutral-200'
                                  }`}
                                />
                                <span
                                  className={`text-[10px] block truncate font-medium ${
                                    isPassed ? 'text-emerald-950 font-bold' : 'text-neutral-400'
                                  }`}
                                >
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Farm Sub-orders breakdown */}
                      <div className="space-y-3">
                        <span className="text-xs font-bold text-emerald-950 block">
                          Farm-Specific Sub-Orders ({order.subOrders.length})
                        </span>

                        <div className="space-y-3">
                          {order.subOrders.map((sub) => (
                            <div
                              key={sub.id}
                              className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-3"
                            >
                              <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-100">
                                <div>
                                  <div className="font-bold text-emerald-950">
                                    {sub.farmName}
                                  </div>
                                  <div className="text-[11px] text-neutral-500 font-mono">
                                    Sub-Order #{sub.id} · Farmer: {sub.farmerName} ({sub.farmerPhone})
                                  </div>
                                </div>
                                <span
                                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                                    sub.status
                                  )}`}
                                >
                                  {sub.status}
                                </span>
                              </div>

                              {/* Items */}
                              <div className="space-y-2">
                                {sub.items.map((it) => (
                                  <div
                                    key={it.productId}
                                    className="flex items-center justify-between text-xs"
                                  >
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={it.imageUrl}
                                        alt={it.productName}
                                        referrerPolicy="no-referrer"
                                        className="w-9 h-9 rounded-lg object-cover"
                                      />
                                      <div>
                                        <span className="font-medium text-emerald-950">
                                          {it.productName}
                                        </span>
                                        <span className="text-[11px] text-neutral-500 ml-1 font-mono">
                                          × {it.quantity} {it.unit}
                                        </span>
                                      </div>
                                    </div>
                                    <span className="font-mono font-semibold text-emerald-900">
                                      LKR {(it.priceLKR * it.quantity).toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Farmer Notes */}
                              {sub.farmerNotes && (
                                <div className="text-[11px] bg-neutral-50 p-2 rounded-xl text-neutral-600 border border-neutral-100">
                                  <strong className="text-emerald-900">Farmer Dispatch Note:</strong>{' '}
                                  {sub.farmerNotes}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Address summary */}
                      <div className="p-3.5 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-700" />
                          <span>
                            Delivering to: <strong className="text-emerald-950">{order.deliveryAddress}, {order.district}</strong>
                          </span>
                        </div>
                        <span className="font-mono text-neutral-500">{order.customerPhone}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <div className="text-xs text-neutral-600 px-1">
            You have saved <strong className="text-emerald-950">{wishlistProducts.length}</strong> items to your harvest wishlist.
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 space-y-3">
              <Heart className="w-10 h-10 text-neutral-400 mx-auto" />
              <h3 className="font-bold text-base text-emerald-950 font-display">
                Wishlist is empty
              </h3>
              <p className="text-xs text-neutral-500">
                Click the heart icon on any crop in the marketplace to save it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-xs space-y-6 max-w-2xl">
          <h3 className="text-lg font-bold text-emerald-950 font-display">
            Delivery Address & Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-neutral-500 font-medium">Full Name</span>
              <div className="font-bold text-emerald-950">{activeUser.name}</div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-neutral-500 font-medium">Primary Mobile</span>
              <div className="font-bold text-emerald-950 font-mono">{activeUser.phone}</div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1 sm:col-span-2">
              <span className="text-neutral-500 font-medium">Default Delivery Address</span>
              <div className="font-bold text-emerald-950">No. 42, Peradeniya Road, Kandy, Sri Lanka</div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-neutral-500 font-medium">District</span>
              <div className="font-bold text-emerald-950">{activeUser.district}</div>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
              <span className="text-neutral-500 font-medium">Account Status</span>
              <div className="font-bold text-emerald-600 uppercase">Verified Active Customer</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
