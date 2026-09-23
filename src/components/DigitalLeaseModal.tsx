import React, { useState } from 'react';
import { useRentals } from '../context/RentalsContext';
import { 
  X, 
  FileText, 
  Check, 
  Printer, 
  ShieldCheck, 
  Calendar, 
  PenTool, 
  Stamp,
  Download
} from 'lucide-react';
import { DigitalLease } from '../types';

export const DigitalLeaseModal: React.FC = () => {
  const { 
    isLeasePreviewOpen, 
    setIsLeasePreviewOpen, 
    selectedLease, 
    setSelectedLease,
    signLease,
    leases,
    setIsNotificationDrawerOpen
  } = useRentals();

  if (!isLeasePreviewOpen) return null;

  // If no selected lease, fallback to first lease or sample
  const lease: DigitalLease = selectedLease || leases[0] || {
    id: 'lease-preview-template',
    applicationId: 'app-preview',
    propertyId: 'prop-sample',
    propertyTitle: 'Sample Modern 3-Bedroom Family Home',
    plotNumber: 'Plot 48291',
    district: 'Gaborone',
    neighborhood: 'Phakalane',
    landlordName: 'Rre Kgosietsile Molosiwa',
    landlordPhone: '+267 71 839 201',
    tenantName: 'Lorato Motsepe',
    tenantPhone: '+267 71 550 491',
    tenantOmang: '849201948',
    monthlyRentBWP: 7800,
    securityDepositBWP: 7800,
    bpcMeterNumber: '04-9281-7462-1',
    leaseStartDate: '2026-10-01',
    leaseDurationMonths: 12,
    isSignedByTenant: false,
    isSignedByLandlord: true,
    createdAt: new Date().toISOString(),
  };

  const [signatureName, setSignatureName] = useState(lease.tenantName);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [signingSuccess, setSigningSuccess] = useState(false);

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signatureName.trim() || !agreementChecked) return;

    signLease(lease.id, signatureName);
    setSigningSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0 print:bg-white">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Control Bar (Hidden during printing) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-[#00A3E0] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Republic of Botswana
              </div>
              <h3 className="font-heading text-base font-bold text-slate-900">
                Standard Residential Tenancy Agreement
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                setIsLeasePreviewOpen(false);
                setSelectedLease(null);
                setSigningSuccess(false);
              }}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Agreement Content */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed font-serif print:p-0">
          
          {/* Document Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
            <div className="text-xs font-sans font-bold tracking-widest uppercase text-slate-600">
              REPUBLIC OF BOTSWANA
            </div>
            <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-950 uppercase tracking-tight">
              Memorandum of Residential Tenancy Agreement
            </h1>
            <p className="text-xs font-sans text-slate-500">
              Concluded in accordance with the Common Law of the Republic of Botswana
            </p>
          </div>

          {/* Parties Summary Box */}
          <div className="font-sans bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold uppercase text-slate-500 block text-[10px]">
                PART A: THE LESSOR (LANDLORD)
              </span>
              <p className="font-bold text-slate-900 mt-0.5">{lease.landlordName}</p>
              <p className="text-slate-600">Contact: {lease.landlordPhone}</p>
              <p className="text-emerald-700 font-semibold mt-1">Verified Botswana Property Titleholder</p>
            </div>

            <div>
              <span className="font-bold uppercase text-slate-500 block text-[10px]">
                PART B: THE LESSEE (TENANT)
              </span>
              <p className="font-bold text-slate-900 mt-0.5">{lease.tenantName}</p>
              <p className="text-slate-600">Omang / Passport No: <span className="font-mono font-bold text-slate-900">{lease.tenantOmang}</span></p>
              <p className="text-slate-600">Contact: {lease.tenantPhone}</p>
            </div>
          </div>

          {/* Legal Clauses */}
          <div className="space-y-4 text-justify">
            
            {/* Clause 1 */}
            <div>
              <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-1">
                1. PREMISES & LEASED PROPERTY
              </h4>
              <p>
                The Lessor hereby lets to the Lessee, who hereby hires, the residential premises situated at <strong className="font-mono">{lease.plotNumber}</strong>, located within the ward of <strong>{lease.neighborhood}</strong>, District of <strong>{lease.district}</strong>, Botswana (hereinafter referred to as "the Premises"), for strictly private residential purposes.
              </p>
            </div>

            {/* Clause 2 */}
            <div>
              <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-1">
                2. DURATION OF TENANCY
              </h4>
              <p>
                This lease shall commence on <strong>{lease.leaseStartDate}</strong> and shall endure for a fixed initial period of <strong>{lease.leaseDurationMonths} (Twelve) calendar months</strong>. Either party may terminate at expiry or thereafter by delivering thirty (30) calendar days written notice.
              </p>
            </div>

            {/* Clause 3 */}
            <div>
              <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-1">
                3. MONTHLY RENT & CURRENCY
              </h4>
              <p>
                The monthly rent payable by the Lessee to the Lessor is <strong className="font-mono font-bold">P {lease.monthlyRentBWP.toLocaleString()} (Botswana Pula)</strong> per month. Rent is payable in advance on or before the 1st (first) day of every calendar month without deduction, set-off, or bank transfer fee reductions.
              </p>
            </div>

            {/* Clause 4 */}
            <div>
              <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-1">
                4. SECURITY DEPOSIT & ESCROW
              </h4>
              <p>
                Upon execution of this Agreement, the Lessee shall deposit with the Lessor a refundable security deposit of <strong className="font-mono font-bold">P {lease.securityDepositBWP.toLocaleString()}</strong>. The said deposit shall be held to cover damages beyond fair wear and tear or unpaid utility balances, and shall be fully refunded within fourteen (14) business days of exit inspection.
              </p>
            </div>

            {/* Clause 5 */}
            <div>
              <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-1">
                5. BOTSWANA POWER CORP (BPC) & WATER UTILITIES (WUC)
              </h4>
              <p>
                (a) <strong>Electricity:</strong> The Premises is equipped with a Botswana Power Corporation (BPC) prepaid token meter (Meter No: <span className="font-mono font-bold">{lease.bpcMeterNumber}</span>). The Lessee shall purchase their own prepaid electricity tokens.<br />
                (b) <strong>Water:</strong> The Lessee shall be liable for monthly Water Utilities Corporation (WUC) water consumption metered to the Premises as invoiced.
              </p>
            </div>

            {/* Clause 6 */}
            <div>
              <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-1">
                6. PEACEABLE POSSESSION & SECURITY
              </h4>
              <p>
                The Lessee shall ensure that the electric fence and security installations are not obstructed by overgrown trees or debris. The Lessee shall not cause excessive disturbance to adjoining neighbors in the neighborhood.
              </p>
            </div>

            {/* Clause 7 */}
            <div>
              <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider mb-1">
                7. GOVERNING LAW & JURISDICTION
              </h4>
              <p>
                This Agreement shall be governed by, construed, and enforced in accordance with the laws of the Republic of Botswana. The parties consent to the jurisdiction of the Magistrate’s Court or the High Court of Botswana for any proceedings arising hereunder.
              </p>
            </div>

          </div>

          {/* SIGNATURE SECTION */}
          <div className="font-sans pt-6 border-t-2 border-slate-900 space-y-6">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              SIGNATURES & EXECUTION
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Landlord Execution Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Executed by Lessor (Landlord)
                </span>
                <div className="py-2 font-serif italic text-base text-slate-900 border-b border-slate-300">
                  {lease.landlordName}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Status: <strong className="text-emerald-700">Digitally Verified Titleholder</strong></span>
                  <span className="font-mono text-[10px] text-slate-400">Ref: BW-TITL-OK</span>
                </div>
              </div>

              {/* Tenant Execution Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Executed by Lessee (Tenant)
                </span>
                {lease.isSignedByTenant || signingSuccess ? (
                  <div>
                    <div className="py-2 font-serif italic text-base text-slate-900 border-b border-slate-300">
                      {lease.signatureTenant || signatureName}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Legally Executed ({lease.signedAt ? new Date(lease.signedAt).toLocaleDateString() : 'Signed Today'})</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSign} className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Type Full Name to Sign Electronically:
                      </label>
                      <input
                        type="text"
                        value={signatureName}
                        onChange={(e) => setSignatureName(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-serif italic text-slate-900"
                        required
                      />
                    </div>

                    <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreementChecked}
                        onChange={(e) => setAgreementChecked(e.target.checked)}
                        className="mt-0.5 rounded text-[#00A3E0]"
                        required
                      />
                      <span>
                        I accept all clauses of this Botswana Residential Tenancy Agreement and confirm my Omang ID.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={!agreementChecked || !signatureName.trim()}
                      className="w-full py-2 bg-slate-900 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Execute & Sign Agreement</span>
                    </button>
                  </form>
                )}
              </div>

            </div>

            {/* Official Legal Seal */}
            <div className="p-3 bg-slate-100 rounded-lg border border-slate-200 text-center text-[10px] text-slate-500 uppercase tracking-wider">
              Ntlokgolo Automated Tenancy Generator · Certified Common Law Lease Record · Republic of Botswana
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
