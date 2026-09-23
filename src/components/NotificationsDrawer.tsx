import React from 'react';
import { useRentals } from '../context/RentalsContext';
import { 
  X, 
  Bell, 
  MessageSquare, 
  Smartphone, 
  Trash2, 
  CheckCheck,
  ShieldCheck,
  KeyRound
} from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const { 
    isNotificationDrawerOpen, 
    setIsNotificationDrawerOpen, 
    notifications, 
    dismissNotification, 
    clearNotifications 
  } = useRentals();

  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-[#00A3E0] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-slate-900">
                Automated Message Logs
              </h3>
              <p className="text-[10px] text-slate-500">
                Live WhatsApp & SMS alerts to +267 phones
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-200 transition-colors"
                title="Clear all alerts"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informational Banner */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#0077B6] shrink-0" />
          <span>
            Simulated live Botswana telecom gateway (+267 Mascom, Orange, BTC).
          </span>
        </div>

        {/* Notifications Feed */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              No recent automated messages. Book a viewing or submit an application to see instant alerts.
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative group hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`p-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                      n.channel === 'whatsapp' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      <MessageSquare className="w-3 h-3" />
                      {n.channel}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-700">
                      {n.recipientPhoneOrEmail}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400">
                    {n.timestamp}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900">
                  {n.subject}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans bg-white p-2.5 rounded-lg border border-slate-200/80">
                  {n.message}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Delivered to {n.recipientName}</span>
                  </span>
                  <button
                    onClick={() => dismissNotification(n.id)}
                    className="hover:text-rose-600 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
