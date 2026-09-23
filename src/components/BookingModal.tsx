import React, { useState } from 'react';
import { useRentals } from '../context/RentalsContext';
import { X, Calendar, Clock, KeyRound, Check, ShieldCheck, MapPin } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { 
    isBookingOpen, 
    setIsBookingOpen, 
    selectedProperty, 
    bookViewing, 
    setIsNotificationDrawerOpen 
  } = useRentals();

  if (!isBookingOpen || !selectedProperty) return null;

  const [date, setDate] = useState('2026-09-26');
  const [slot, setSlot] = useState(selectedProperty.viewingSchedule[0] || 'Saturday 10:00 - 13:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+267 ');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [issuedPass, setIssuedPass] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const booking = bookViewing({
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title,
      propertyLocation: `${selectedProperty.neighborhood}, ${selectedProperty.district} (${selectedProperty.plotNumber})`,
      tenantName: name,
      tenantPhone: phone,
      tenantEmail: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      date,
      timeSlot: slot,
      notes,
    });

    setIssuedPass(booking.gatePassCode);
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setIssuedPass(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#0077B6]">
              Self-Service Viewing Scheduler
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900">
              Instant Gate Pass Booking
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Property Snapshot */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-5 flex items-center gap-3">
            <img 
              src={selectedProperty.images[0]} 
              alt={selectedProperty.title} 
              className="w-14 h-14 object-cover rounded-lg shrink-0" 
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {selectedProperty.title}
              </h4>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#00A3E0]" />
                <span>{selectedProperty.neighborhood}, {selectedProperty.district} · {selectedProperty.plotNumber}</span>
              </p>
              <span className="text-xs font-mono font-bold text-slate-800">
                P {selectedProperty.monthlyRentBWP.toLocaleString()} / mo
              </span>
            </div>
          </div>

          {issuedPass ? (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-lg font-bold text-emerald-950">
                Gate Pass Code Issued
              </h4>
              <p className="text-xs text-emerald-800">
                Show this code to the guard at the security boom gate or input into intercom.
              </p>
              <div className="p-3 bg-white border border-emerald-300 rounded-lg shadow-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Access Code
                </span>
                <span className="font-mono text-2xl font-extrabold text-slate-900 tracking-wider">
                  {issuedPass}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Scheduled: {date} · {slot}
                </span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Sent to <span className="font-mono font-semibold">{phone}</span> via WhatsApp & SMS. Landlord {selectedProperty.landlord.name} notified.
              </p>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    handleClose();
                    setIsNotificationDrawerOpen(true);
                  }}
                  className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  View Notification Feed
                </button>
                <button
                  onClick={handleClose}
                  className="py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Landlord Viewing Slot
                </label>
                <select
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                >
                  {selectedProperty.viewingSchedule.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  min="2026-09-24"
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Neo Sebego"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Botswana Cell Phone (+267)
                </label>
                <input
                  type="tel"
                  placeholder="+267 71..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  required
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  You will receive the gate access code and directions via SMS/WhatsApp.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Confirm & Generate Gate Code</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
