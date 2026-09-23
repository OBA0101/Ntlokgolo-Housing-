import React from 'react';
import { 
  KeyRound, 
  FileCheck2, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useRentals } from '../context/RentalsContext';

export const AutomationPillars: React.FC = () => {
  const { setActiveNavTab, setIsListPropertyOpen } = useRentals();

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0077B6] mb-2">
            The Ntlokgolo Automation Advantage
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            How we automated the Botswana house rental experience.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            No more driving around chasing handwritten "House To Let" placards, waiting for estate agents who never pick up, or arguing over handwritten lease clauses.
          </p>
        </div>

        {/* 4 Automation Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-xl relative group hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-5">
              <KeyRound className="w-5 h-5 text-[#00A3E0]" />
            </div>
            <div className="text-xs font-mono font-semibold text-slate-500 mb-1">
              01 · SELF-SERVICE VIEWINGS
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Instant Gate-Pass Access
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Choose an available landlord viewing slot. Our engine automatically generates a temporary Gate Security Pass code (e.g. <span className="font-mono font-semibold text-slate-900">NTL-8419</span>) delivered by SMS & WhatsApp for immediate gate entry.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-xl relative group hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-xs font-mono font-semibold text-slate-500 mb-1">
              02 · DIGITAL SCREENING
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              3-Minute Omang Verification
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tenants submit identity (Omang/Passport) and employment status online. Our algorithm computes the rent-to-income ratio against Botswana’s recommended 33% threshold to protect both parties.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-xl relative group hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-5">
              <FileCheck2 className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-xs font-mono font-semibold text-slate-500 mb-1">
              03 · DIGITAL LEASE
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              Botswana Tenancy Agreement
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Once an application is approved, the system automatically drafts a legally sound Botswana Residential Tenancy Agreement with standard notice periods, deposit escrow terms, and digital e-signing.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-xl relative group hover:border-slate-300 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-5">
              <Zap className="w-5 h-5 text-[#00A3E0]" />
            </div>
            <div className="text-xs font-mono font-semibold text-slate-500 mb-1">
              04 · UTILITY TRANSPARENCY
            </div>
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">
              BPC & WUC Handover
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every home profile details prepaid BPC electricity token meter numbers, WUC water metering status, solar geysers, and high-speed fibre readiness to eliminate unexpected monthly costs.
            </p>
          </div>

        </div>

        {/* Informational Callout Bar */}
        <div className="mt-10 p-5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg text-[#00A3E0]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Are you a property owner or landlord with a house in Botswana?
              </p>
              <p className="text-xs text-slate-400">
                Automate viewing scheduling, tenant screening, and rent agreements in one dashboard.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsListPropertyOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A3E0] hover:bg-[#008cc2] text-slate-950 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>List Your House Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
