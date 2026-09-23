import React, { useState } from 'react';
import { useRentals } from '../context/RentalsContext';
import { 
  X, 
  UserCheck, 
  Check, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  Home, 
  KeyRound, 
  DollarSign, 
  AlertCircle,
  Building,
  Plus
} from 'lucide-react';

export const LandlordDashboardModal: React.FC = () => {
  const { 
    isLandlordDashOpen, 
    setIsLandlordDashOpen, 
    applications, 
    updateApplicationStatus, 
    viewings, 
    listings,
    setIsListPropertyOpen,
    setSelectedLease,
    setIsLeasePreviewOpen,
    leases,
  } = useRentals();

  const [activeTab, setActiveTab] = useState<'applications' | 'viewings' | 'properties'>('applications');
  const [declineNote, setDeclineNote] = useState('');
  const [decliningId, setDecliningId] = useState<string | null>(null);

  if (!isLandlordDashOpen) return null;

  const handleApprove = (appId: string) => {
    updateApplicationStatus(appId, 'approved');
  };

  const handleDeclineConfirm = (appId: string) => {
    updateApplicationStatus(appId, 'declined', declineNote || 'Criteria not met or position filled.');
    setDecliningId(null);
    setDeclineNote('');
  };

  const openLeaseForApp = (leaseId?: string) => {
    const targetLease = leases.find(l => l.id === leaseId);
    if (targetLease) {
      setSelectedLease(targetLease);
      setIsLeasePreviewOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#00A3E0] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Landlord Automation Manager
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Property Owner Dashboard
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsLandlordDashOpen(false);
                setIsListPropertyOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-[#0077B6] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Property</span>
            </button>
            <button
              onClick={() => setIsLandlordDashOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-white px-6 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'border-[#0077B6] text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Tenant Applications</span>
            <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono text-[10px]">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('viewings')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'viewings'
                ? 'border-[#0077B6] text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Automated Viewings</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px]">
              {viewings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'properties'
                ? 'border-[#0077B6] text-slate-900 font-bold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Managed Properties</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px]">
              {listings.length}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>
                  Automated background affordability scoring applies Botswana standard 35% income ceiling.
                </span>
                <span className="text-slate-400">Total: {applications.length}</span>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No tenant applications received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => {
                    const isAffordable = app.affordabilityRatio <= 0.35;
                    const isDecliningThis = decliningId === app.id;

                    return (
                      <div 
                        key={app.id}
                        className="p-4 bg-slate-50 rounded-xl border border-slate-200 transition-all space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-heading text-sm font-bold text-slate-900">
                                {app.tenantName}
                              </h4>
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                app.status === 'approved' 
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'declined'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {app.status}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 mt-1">
                              Applied for: <strong className="text-slate-800">{app.propertyTitle}</strong> ({app.propertyLocation})
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                              <span>Omang/Passport: <strong className="font-mono text-slate-800">{app.tenantOmangOrPassport}</strong></span>
                              <span>·</span>
                              <span>Employer: <strong className="text-slate-800">{app.employerName}</strong></span>
                              <span>·</span>
                              <span>Phone: <strong className="text-slate-800 font-mono">{app.tenantPhone}</strong></span>
                            </div>
                          </div>

                          {/* Financials & Affordability */}
                          <div className="sm:text-right shrink-0">
                            <div className="text-[11px] text-slate-500">Monthly Net Salary</div>
                            <div className="font-mono text-sm font-bold text-slate-900">
                              P {app.monthlyIncomeBWP.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">Rent / Salary Ratio:</div>
                            <div className={`font-mono text-xs font-bold ${isAffordable ? 'text-emerald-700' : 'text-amber-700'}`}>
                              {(app.affordabilityRatio * 100).toFixed(0)}% {isAffordable ? '(Safe ≤ 35%)' : '(High > 35%)'}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        {app.status === 'pending' && (
                          <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                            <div className="text-[11px] text-slate-500">
                              Approving will automatically generate the official Botswana Tenancy Agreement for tenant signature.
                            </div>

                            <div className="flex items-center gap-2">
                              {isDecliningThis ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    placeholder="Reason for declining..."
                                    value={declineNote}
                                    onChange={(e) => setDeclineNote(e.target.value)}
                                    className="p-1.5 text-xs border rounded bg-white"
                                  />
                                  <button
                                    onClick={() => handleDeclineConfirm(app.id)}
                                    className="px-2.5 py-1.5 bg-rose-600 text-white rounded text-xs font-semibold"
                                  >
                                    Confirm Decline
                                  </button>
                                  <button
                                    onClick={() => setDecliningId(null)}
                                    className="px-2 py-1.5 text-slate-500 text-xs"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <button
                                    onClick={() => setDecliningId(app.id)}
                                    className="px-3 py-1.5 text-slate-600 hover:text-rose-600 hover:bg-slate-200/50 rounded text-xs font-semibold transition-colors"
                                  >
                                    Decline
                                  </button>
                                  <button
                                    onClick={() => handleApprove(app.id)}
                                    className="px-4 py-1.5 bg-slate-900 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Approve & Generate Lease</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {app.status === 'approved' && app.digitalLeaseId && (
                          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                            <span className="text-emerald-700 font-medium flex items-center gap-1">
                              <Check className="w-4 h-4" />
                              Official Lease Agreement Generated
                            </span>
                            <button
                              onClick={() => openLeaseForApp(app.digitalLeaseId)}
                              className="text-[#0077B6] font-semibold underline underline-offset-2 flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View Generated Tenancy Agreement</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VIEWINGS */}
          {activeTab === 'viewings' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span>Gate pass codes are pre-authorized for complex guards and intercom entry.</span>
                <span>Active: {viewings.filter(v => v.status === 'confirmed').length}</span>
              </div>

              {viewings.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No viewings scheduled yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {viewings.map((view) => (
                    <div 
                      key={view.id}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading text-sm font-bold text-slate-900">
                            {view.tenantName}
                          </h4>
                          <span className="text-xs text-slate-500 font-mono">
                            {view.tenantPhone}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Property: <strong className="text-slate-800">{view.propertyTitle}</strong>
                        </p>
                        <p className="text-xs text-slate-500">
                          Scheduled: <strong className="text-slate-800">{view.date}</strong> ({view.timeSlot})
                        </p>
                      </div>

                      <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2">
                        <div className="p-2 bg-white border border-slate-200 rounded-lg text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">
                            Security Gate Pass
                          </span>
                          <span className="font-mono text-sm font-extrabold text-slate-900">
                            {view.gatePassCode}
                          </span>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          Confirmed & Notified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROPERTIES */}
          {activeTab === 'properties' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                All properties currently active on the automated marketplace:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listings.map((prop) => (
                  <div key={prop.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex gap-3">
                    <img 
                      src={prop.images[0]} 
                      alt={prop.title} 
                      className="w-16 h-16 object-cover rounded-lg shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {prop.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 truncate">
                        {prop.neighborhood}, {prop.district} · {prop.plotNumber}
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-900">
                          P {prop.monthlyRentBWP.toLocaleString()} / mo
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          prop.status === 'leased' ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {prop.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
