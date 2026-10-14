import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckoutModal } from './CheckoutModal';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  MapPin,
  Truck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotalCount,
    cartSubtotalLKR,
    cartFarmsCount,
    updateCartQuantity,
    removeFromCart,
    t,
  } = useApp();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  // Group items by farmId for visible multi-farm demonstration
  const groupedByFarm: { [farmId: string]: typeof cart } = {};
  cart.forEach((item) => {
    const fid = item.product.farmId;
    if (!groupedByFarm[fid]) groupedByFarm[fid] = [];
    groupedByFarm[fid].push(item);
  });

  const totalDeliveryFeeLKR = cartFarmsCount * 250;
  const grandTotalLKR = cartSubtotalLKR + totalDeliveryFeeLKR;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
        <div className="w-full max-w-md bg-[#FFFEF5] h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-emerald-950/10">
          {/* Header */}
          <div className="p-5 bg-[#14532D] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 text-[#22C55E]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display">
                  {t.cart.title} ({cartTotalCount})
                </h3>
                <span className="text-[11px] text-emerald-200/80">
                  {cartFarmsCount} Participating Farm Hub(s)
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div className="font-bold text-sm text-emerald-950 font-display">
                  {t.cart.emptyCart}
                </div>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  {t.cart.emptySubtitle}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              <>
                {/* Multi-farm notice badge */}
                {cartFarmsCount > 1 && (
                  <div className="p-3 rounded-2xl bg-emerald-100/70 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                      <span>{t.cart.multiFarmNotice}</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      {t.cart.farmSplitNotice}
                    </p>
                  </div>
                )}

                {/* Grouped Farm Sections */}
                {Object.entries(groupedByFarm).map(([farmId, items]) => {
                  const farmName = items[0].product.farmName;
                  const district = items[0].product.district;
                  const farmSubtotal = items.reduce(
                    (sum, i) => sum + i.product.priceLKR * i.quantity,
                    0
                  );

                  return (
                    <div
                      key={farmId}
                      className="rounded-2xl bg-white border border-neutral-200 p-4 space-y-3 shadow-xs"
                    >
                      {/* Farm Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-950 truncate max-w-[200px]">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{farmName}</span>
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-emerald-800">
                          {district}
                        </span>
                      </div>

                      {/* Items in this farm */}
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center gap-3 text-xs"
                          >
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-xl object-cover border border-neutral-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-emerald-950 truncate">
                                {item.product.name}
                              </h4>
                              <div className="text-[11px] text-neutral-500 font-mono">
                                LKR {item.product.priceLKR.toLocaleString()} / {item.product.unit}
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1.5 bg-neutral-100 rounded-lg p-1">
                              <button
                                onClick={() =>
                                  updateCartQuantity(item.product.id, item.quantity - 1)
                                }
                                className="p-1 rounded text-neutral-600 hover:text-neutral-950 hover:bg-white cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-bold font-mono text-xs w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartQuantity(item.product.id, item.quantity + 1)
                                }
                                className="p-1 rounded text-neutral-600 hover:text-neutral-950 hover:bg-white cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Sub-order subtotal */}
                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
                        <span>Farm subtotal ({items.length} items):</span>
                        <span className="font-mono font-bold text-emerald-950">
                          LKR {farmSubtotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer Checkout Bar */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-neutral-200 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>{t.cart.subtotal}:</span>
                  <span className="font-mono font-semibold text-emerald-950">
                    LKR {cartSubtotalLKR.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.cart.deliveryFee} ({cartFarmsCount} farms):</span>
                  <span className="font-mono font-semibold text-emerald-950">
                    LKR {totalDeliveryFeeLKR.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-emerald-950 text-sm pt-2 border-t border-neutral-100">
                  <span>Total Payable:</span>
                  <span className="font-mono text-emerald-800">
                    LKR {grandTotalLKR.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full py-3.5 bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.cart.checkoutBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(false);
        }}
      />
    </>
  );
};
