import React, { useState } from 'react';
import { useRentals } from '../context/RentalsContext';
import { 
  X, 
  Key, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  KeyRound, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const TenantPortalModal: React.FC = () => {
  const { 
    isTenantPortalOpen, 
    setIsTenantPortalOpen, 
    viewings, 
    cancelViewing,
    applications, 
    leases,
    setSelectedLease,
    setIsLeasePreviewOpen,
    setActiveNavTab
  } = useRentals();

  const [activeTab, setActiveTab] = useState<'passes' | 'applications' | 'leases'>('passes');
  const [fullscreenPass, setFullscreenPass] = useState<string | null>(null);

  if (!isTenantPortalOpen) return null;

  const handleOpenLease = (leaseId: string) => {
    const l = leases.find(item => item.id === leaseId);
    if (l) {
      setSelectedLease(l);
      setIsLeasePreviewOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#00A3E0] flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Tenant Portal & Self-Service
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                My Bookings & Gate Passes
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsTenantPortalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-white px-6 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('passes')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'passes'
                ? 'border-[#0077B6] text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Gate Passes & Viewings</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px]">
              {viewings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'border-[#0077B6] text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>My Applications</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px]">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leases')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'leases'
                ? 'border-[#0077B6] text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Tenancy Leases</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px]">
              {leases.length}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: PASSES */}
          {activeTab === 'passes' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                Present your unique pass code to security personnel at gated estate boom barriers or enter via intercom.
              </div>

              {viewings.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No viewing reservations booked yet. Browse homes to schedule a self-service tour.
                </div>
              ) : (
                <div className="space-y-3">
                  {viewings.map((v) => (
                    <div 
                      key={v.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{v.propertyTitle}</span>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#00A3E0]" />
                          <span>{v.propertyLocation}</span>
                        </p>
                        <p className="text-xs text-slate-600">
                          Date: <strong className="text-slate-900">{v.date}</strong> · Slot: <strong className="text-slate-900">{v.timeSlot}</strong>
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                        <div className="p-3 bg-white border border-slate-300 rounded-xl text-center shadow-xs">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">
                            Security Gate Code
                          </span>
                          <span className="font-mono text-xl font-extrabold text-slate-950 tracking-wider">
                            {v.gatePassCode}
                          </span>
                        </div>

                        {v.status === 'confirmed' ? (
                          <button
                            onClick={() => cancelViewing(v.id)}
                            className="text-[11px] text-slate-400 hover:text-rose-600 underline"
                          >
                            Cancel Booking
                          </button>
                        ) : (
                          <span className="text-[11px] text-rose-600 font-semibold">Cancelled</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                Tracking of your rental applications across Botswana properties:
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No submitted applications.
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div 
                      key={app.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            {app.propertyTitle}
                          </h4>
                          <p className="text-xs text-slate-500">{app.propertyLocation}</p>
                          <div className="mt-1 text-xs text-slate-600">
                            Rent: <strong className="font-mono text-slate-900">P {app.monthlyRentBWP.toLocaleString()} / mo</strong>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          app.status === 'approved' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'declined'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      {app.status === 'approved' && app.digitalLeaseId && (
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                          <span className="text-xs text-emerald-700 font-medium">
                            Approved by Landlord! Tenancy agreement ready to sign.
                          </span>
                          <button
                            onClick={() => handleOpenLease(app.digitalLeaseId!)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Sign Lease Agreement</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LEASES */}
          {activeTab === 'leases' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                Official Republic of Botswana Tenancy Agreements generated for your rentals:
              </div>

              {leases.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No leases available yet. Once a landlord approves your application, your lease appears here.
                </div>
              ) : (
                <div className="space-y-3">
                  {leases.map((l) => (
                    <div 
                      key={l.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900">
                            {l.propertyTitle} ({l.plotNumber})
                          </h4>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            l.isSignedByTenant ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {l.isSignedByTenant ? 'Signed & Active' : 'Awaiting Tenant Signature'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Landlord: {l.landlordName} · Monthly Rent: <strong className="font-mono text-slate-900">P {l.monthlyRentBWP.toLocaleString()}</strong>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          BPC Token Meter Ref: {l.bpcMeterNumber} · Lease Start: {l.leaseStartDate}
                        </p>
                      </div>

                      <button
                        onClick={() => handleOpenLease(l.id)}
                        className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto ${
                          l.isSignedByTenant 
                            ? 'bg-slate-200 text-slate-800 hover:bg-slate-300' 
                            : 'bg-slate-900 hover:bg-[#0077B6] text-white shadow-sm'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{l.isSignedByTenant ? 'View Executed Agreement' : 'Review & Sign Lease'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
