import React from 'react';
import { RentalsProvider, useRentals } from './context/RentalsContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AutomationPillars } from './components/AutomationPillars';
import { ListingCard } from './components/ListingCard';
import { ListingFilters } from './components/ListingFilters';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { BookingModal } from './components/BookingModal';
import { ListPropertyModal } from './components/ListPropertyModal';
import { LandlordDashboardModal } from './components/LandlordDashboardModal';
import { TenantPortalModal } from './components/TenantPortalModal';
import { DigitalLeaseModal } from './components/DigitalLeaseModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { RentAffordabilityCalculator } from './components/RentAffordabilityCalculator';
import { Footer } from './components/Footer';
import { 
  Building2, 
  KeyRound, 
  ShieldCheck, 
  FileText, 
  Zap, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Lock
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeNavTab, 
    setActiveNavTab, 
    filteredListings, 
    resetFilters,
    setIsListPropertyOpen,
    setIsTenantPortalOpen,
    setIsLandlordDashOpen,
    setIsLeasePreviewOpen
  } = useRentals();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        {/* TAB 1: BROWSE HOMES */}
        {activeNavTab === 'browse' && (
          <>
            <HeroSection />
            <AutomationPillars />

            {/* Property Catalog Section */}
            <section id="rental-listings" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0077B6] mb-1">
                    Available Listings Across Botswana
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                    Verified House Rentals
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Direct landlord listings. Book self-service viewings with automated security gate passes.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsListPropertyOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#0077B6]" />
                    <span>Post Your Property</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <ListingFilters />

              {/* Listings Grid */}
              {filteredListings.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 max-w-md mx-auto shadow-2xs">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-base font-bold text-slate-900 mb-1">
                    No houses match your current filters
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Try adjusting your price range, district selection, or removing amenities filters.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredListings.map((property) => (
                    <ListingCard key={property.id} property={property} />
                  ))}
                </div>
              )}

              {/* Bottom Quick Callout */}
              <div className="mt-14 p-6 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="font-heading text-base font-bold text-slate-900">
                    Looking for a house in another Botswana district?
                  </h4>
                  <p className="text-xs text-slate-600">
                    We cover Gaborone, Francistown, Maun, Palapye, Tlokweng, Kasane, and Jwaneng. Tell us your requirements for automated SMS matching.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveNavTab('calculator')}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
                  >
                    Check Affordability
                  </button>
                  <button
                    onClick={() => setIsListPropertyOpen(true)}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-[#0077B6] transition-colors whitespace-nowrap"
                  >
                    Landlord Signup
                  </button>
                </div>
              </div>

            </section>
          </>
        )}

        {/* TAB 2: HOW AUTOMATION WORKS */}
        {activeNavTab === 'how_it_works' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0077B6] mb-2">
                Automated Rental Infrastructure
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
                End-to-End Botswana Tenancy Without Middlemen
              </h1>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Ntlokgolo eliminates real estate agent commission markups, untruthful availability, and manual paper lease disputes.
              </p>
            </div>

            {/* Detailed 4-Step Diagram */}
            <div className="space-y-12">
              
              {/* Step 1 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="md:col-span-5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#00A3E0] flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    Self-Service Viewing & Gate Pass
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Landlords pre-configure their weekly viewing windows (e.g. Wednesday afternoons or Saturday mornings). When a tenant selects a slot, the Ntlokgolo engine generates a verified Gate Pass Code (<strong className="font-mono text-slate-900">NTL-XXXX</strong>).
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Instant SMS & WhatsApp delivery to tenant & landlord</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pre-authorized for gated estate security guards</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-7 bg-slate-50 p-5 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">
                    Automated WhatsApp Message Simulation
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-3 rounded-lg text-xs leading-relaxed">
                    "Dumela Kagiso! Your viewing for Phakalane Villa (Plot 43918) is confirmed for Saturday 10:00 - 13:00. Your Security Gate Access Code is <strong>NTL-8419</strong>. Present to security boom gate."
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="md:col-span-5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    Automated Omang & Income Screening
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tenants apply online in 3 minutes. The system verifies national ID (Omang or Passport), calculates the rent-to-income ratio, and flags whether the applicant satisfies the Botswana standard 35% affordability limit.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Protects landlords from rent defaults</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Empowers tenants to establish credible rental track record</span>
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-7 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">
                    Landlord Screening View
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Applicant: Lorato Motsepe</span>
                      <span className="text-emerald-700">Affordability: 27% (Passed)</span>
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Employer: De Beers Global · Monthly Net: P 28,500 · Rent: P 7,800
                    </div>
                    <div className="text-emerald-700 text-[11px] font-semibold">
                      ✓ Omang Verified · Zero Default History
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="md:col-span-5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    Botswana Digital Tenancy Agreement
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Once the landlord taps "Approve", an official Memorandum of Residential Tenancy Agreement governed by the laws of the Republic of Botswana is generated instantly with prefilled plot coordinates, BPC token meter numbers, and deposit terms.
                  </p>
                  <button
                    onClick={() => setIsLeasePreviewOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077B6] hover:underline"
                  >
                    <span>Preview Official Lease Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="md:col-span-7 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">
                    Contract Clauses Generated
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-serif space-y-1">
                    <div className="font-bold text-slate-900 font-sans text-[11px]">
                      REPUBLIC OF BOTSWANA RESIDENTIAL LEASE
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      "Plot 28711, Block 6 · Monthly Rent: P 6,500 · BPC Token Meter: 01-4492-3810-7 · Deposit held under statutory common law escrow..."
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="md:col-span-5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#00A3E0] flex items-center justify-center font-bold text-sm">
                    04
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    BPC Token & Keys Handover
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Both parties complete an automated digital move-in checklist. Electricity prepaid meter readings and water utility accounts are recorded with zero ambiguity.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveNavTab('browse')}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Explore Verified Homes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="md:col-span-7 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">
                    Move-In Checklist Audit
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-700">
                      <span>✓ Prepaid BPC Token Meter Verified</span>
                      <span className="font-mono text-slate-500">0 kWh Arrears</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>✓ Water Utilities Corporation (WUC)</span>
                      <span className="font-mono text-slate-500">Account Zeroed</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>✓ Gate Remote & Keys Handed Over</span>
                      <span className="text-emerald-700 font-bold">Confirmed</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: DIGITAL LEASE GENERATOR */}
        {activeNavTab === 'leases' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0077B6] mb-2">
                Botswana Residential Tenancy Law
              </div>
              <h1 className="font-heading text-3xl font-extrabold text-slate-900">
                Official Digital Lease Agreement
              </h1>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Review and execute legally compliant Botswana tenancy agreements online. No costly lawyer drafting fees or outdated boilerplate.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    Republic of Botswana Tenancy Contract Generator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Includes automatic escrow deposit clauses, BPC prepaid token rules, and 30-day notice provisions.
                  </p>
                </div>
                <button
                  onClick={() => setIsLeasePreviewOpen(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap self-start sm:self-auto"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Launch Interactive Lease Document</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Statutory Compliance</span>
                  </div>
                  <p className="text-slate-600">
                    Structured under the Common Law of Botswana and applicable magistrate court jurisdictions.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#00A3E0]" />
                    <span>BPC & WUC Utility Protection</span>
                  </div>
                  <p className="text-slate-600">
                    Explicit clauses protect landlords against unpaid utility liabilities and electricity token debt.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-slate-700" />
                    <span>Digital E-Signature</span>
                  </div>
                  <p className="text-slate-600">
                    Legally valid electronic signatures with Omang verification timestamps and downloadable PDF copies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CALCULATOR */}
        {activeNavTab === 'calculator' && (
          <RentAffordabilityCalculator />
        )}
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <PropertyDetailModal />
      <BookingModal />
      <ListPropertyModal />
      <LandlordDashboardModal />
      <TenantPortalModal />
      <DigitalLeaseModal />
      <NotificationsDrawer />
    </div>
  );
};

export function App() {
  return (
    <RentalsProvider>
      <MainContent />
    </RentalsProvider>
  );
}

export default App;
