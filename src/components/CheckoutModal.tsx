import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { District, MasterOrder } from '../types';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Truck,
  CreditCard,
  Building,
  Banknote,
  Sparkles,
  MapPin,
  ArrowRight,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    t,
    cart,
    cartSubtotalLKR,
    cartFarmsCount,
    placeOrder,
    activeUser,
  } = useApp();

  const [fullName, setFullName] = useState(activeUser.name || 'Dilshan Perera');
  const [phone, setPhone] = useState(activeUser.phone || '+94 77 123 4567');
  const [email, setEmail] = useState(activeUser.email || 'dilshan.perera@gmail.com');
  const [address, setAddress] = useState('No. 42, Peradeniya Road, Kandy');
  const [district, setDistrict] = useState<District>('Kandy');
  const [postalCode, setPostalCode] = useState('20000');
  const [paymentMethod, setPaymentMethod] = useState<MasterOrder['paymentMethod']>(
    'Cash on Delivery'
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>('');

  if (!isOpen) return null;

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

  // Flat 250 LKR logistics fee per participating farm
  const totalDeliveryFeeLKR = cartFarmsCount * 250;
  const grandTotalLKR = cartSubtotalLKR + totalDeliveryFeeLKR;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = placeOrder({
      fullName,
      phone,
      email,
      address,
      district,
      postalCode,
      paymentMethod,
    });
    setPlacedOrderId(orderId);
    setIsSuccess(true);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#FFFEF5] rounded-3xl shadow-2xl border border-emerald-900/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#14532D] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-[#22C55E]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">
                {isSuccess ? t.checkout.orderSuccess : t.checkout.title}
              </h2>
              <p className="text-xs text-emerald-200/80">
                {isSuccess
                  ? t.checkout.orderSuccessSubtitle
                  : `Split Across ${cartFarmsCount} Direct Farm Suppliers`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
                Master Order #{placedOrderId}
              </span>
              <h3 className="text-2xl font-bold text-emerald-950 font-display">
                Fulfillment In Motion
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                {t.checkout.multiOrderNotice} Each farmer has received a simulated SMS notification and has begun preparing your harvest.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-emerald-900/10 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>Delivery Destination:</span>
                <span className="font-semibold text-emerald-950">{district}, Sri Lanka</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Payment Mode:</span>
                <span className="font-semibold text-emerald-950">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Direct Farmer Farms:</span>
                <span className="font-semibold text-emerald-950">{cartFarmsCount} Farm Hubs</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-950 pt-2 border-t border-neutral-200 text-sm">
                <span>Total Amount:</span>
                <span className="font-mono text-emerald-800">LKR {grandTotalLKR.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="px-6 py-3 bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Continue to Marketplace
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Multi-Farm Smart Notice Box */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Smart Multi-Farm Splitting:</strong>{' '}
                Your cart contains items from <strong>{cartFarmsCount} different farms</strong>.
                Our engine automatically dispatches separate sub-orders so each farmer receives their exact item list and payout.
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-emerald-950 font-display">
                {t.checkout.deliveryDetails}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    {t.checkout.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    {t.checkout.phoneNumber} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none font-mono"
                    placeholder="+94 7X XXX XXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    {t.checkout.address} *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    placeholder="House / Street / Road"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">
                    {t.checkout.district} *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value as District)}
                    className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-emerald-950 block">
                {t.checkout.paymentMethod}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                      : 'border-neutral-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-700 mb-1" />
                  <div className="text-xs font-bold text-emerald-950">Cash on Delivery</div>
                  <div className="text-[10px] text-neutral-500">Island-wide upon arrival</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Bank Transfer (FriMi / Genie)')}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'Bank Transfer (FriMi / Genie)'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                      : 'border-neutral-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <Building className="w-4 h-4 text-emerald-700 mb-1" />
                  <div className="text-xs font-bold text-emerald-950">Bank Transfer / FriMi</div>
                  <div className="text-[10px] text-neutral-500">Commercial Bank / BOC / Genie</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Credit / Debit Card')}
                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                    paymentMethod === 'Credit / Debit Card'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                      : 'border-neutral-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-700 mb-1" />
                  <div className="text-xs font-bold text-emerald-950">Card Payment</div>
                  <div className="text-[10px] text-neutral-500">Visa / Mastercard / UnionPay</div>
                </button>
              </div>
            </div>

            {/* Cost Summary Breakdown */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 text-xs space-y-2">
              <div className="flex justify-between text-neutral-600">
                <span>Fresh Harvest Subtotal:</span>
                <span className="font-mono font-semibold text-emerald-950">
                  LKR {cartSubtotalLKR.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Multi-Farm Logistics ({cartFarmsCount} Farms × LKR 250):</span>
                <span className="font-mono font-semibold text-emerald-950">
                  LKR {totalDeliveryFeeLKR.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-bold text-emerald-950 text-sm pt-2 border-t border-neutral-200">
                <span>Payable Total:</span>
                <span className="font-mono text-emerald-800">
                  LKR {grandTotalLKR.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#14532D] hover:bg-emerald-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.checkout.placeOrderBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
