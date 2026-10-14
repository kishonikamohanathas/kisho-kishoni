import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Smartphone, Bell, CheckCheck, Trash2 } from 'lucide-react';

export const SmsNotificationToast: React.FC = () => {
  const { smsNotifications, dismissSms, clearAllSms, toastMessage } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // If there's an active regular toast
  const activeGeneralToast = toastMessage;

  return (
    <>
      {/* 1. Standard Floating Toast Notification */}
      {activeGeneralToast && (
        <div className="fixed bottom-5 left-5 z-50 animate-in slide-in-from-bottom-3 fade-in duration-200">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 max-w-md ${
              activeGeneralToast.type === 'success'
                ? 'bg-[#14532D] text-white border-emerald-400/40'
                : activeGeneralToast.type === 'warning'
                ? 'bg-amber-900 text-white border-amber-500/40'
                : 'bg-neutral-900 text-white border-neutral-700'
            }`}
          >
            <div className="p-1 rounded-full bg-white/20 text-[#22C55E]">
              <CheckCheck className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm font-medium leading-snug">
              {activeGeneralToast.text}
            </p>
          </div>
        </div>
      )}

      {/* 2. Simulated SMS Dispatch Tray (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50">
        {smsNotifications.length > 0 && !isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#14532D] text-white shadow-2xl hover:bg-emerald-800 transition-all cursor-pointer border border-emerald-400/30 group animate-bounce"
            title="Open Sri Lanka SMS Dispatch Console"
          >
            <div className="relative">
              <Smartphone className="w-4 h-4 text-[#22C55E]" />
              <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-[#F97316] animate-ping" />
            </div>
            <span className="text-xs font-bold tracking-tight">
              SMS Gateway ({smsNotifications.length})
            </span>
          </button>
        )}

        {isOpen && (
          <div className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-neutral-300 overflow-hidden animate-in slide-in-from-bottom-5 duration-200 flex flex-col max-h-[460px]">
            {/* Header */}
            <div className="bg-[#14532D] text-white px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#22C55E]" />
                <span className="text-xs font-bold font-display">
                  Sri Lanka Direct SMS Gateway
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearAllSms}
                  className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10"
                  title="Clear all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated SMS Message Feed */}
            <div className="p-3.5 overflow-y-auto space-y-2.5 flex-1 bg-neutral-50">
              <div className="text-[11px] text-neutral-500 font-medium text-center pb-1">
                Real-time carrier dispatch simulation (+94 SLT / Mobitel / Dialog)
              </div>

              {smsNotifications.length === 0 ? (
                <div className="text-center py-8 text-neutral-400 text-xs">
                  No pending SMS dispatches.
                </div>
              ) : (
                smsNotifications.map((sms) => (
                  <div
                    key={sms.id}
                    className="p-3 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-1.5 relative group"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-950 truncate max-w-[190px]">
                        {sms.recipientName}
                      </span>
                      <span className="font-mono text-neutral-400 text-[10px]">
                        {sms.timestamp}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-emerald-800">
                      To: {sms.recipientPhone}
                    </div>

                    <p className="text-xs text-neutral-700 bg-neutral-100 p-2 rounded-xl font-sans leading-snug border border-neutral-200/60">
                      {sms.message}
                    </p>

                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-[10px] text-emerald-600 font-semibold uppercase">
                        Delivered via GSM
                      </span>
                      <button
                        onClick={() => dismissSms(sms.id)}
                        className="text-[10px] text-neutral-400 hover:text-neutral-700 font-medium"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
