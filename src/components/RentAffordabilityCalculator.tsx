import React, { useState } from 'react';
import { useRentals } from '../context/RentalsContext';
import { Calculator, ArrowRight, ShieldCheck, Zap, Droplet, Sparkles, Building2 } from 'lucide-react';

export const RentAffordabilityCalculator: React.FC = () => {
  const { setFilters, setActiveNavTab } = useRentals();
  const [monthlySalary, setMonthlySalary] = useState<number>(18000);
  const [otherMonthlyDebt, setOtherMonthlyDebt] = useState<number>(2500); // e.g. vehicle or loan

  // Botswana financial benchmark:
  // Recommended rent is 30% of net income; absolute maximum healthy limit is 35%.
  const netDisposable = Math.max(monthlySalary - otherMonthlyDebt, 1000);
  const recommendedRent30 = Math.round(monthlySalary * 0.30);
  const maxRent35 = Math.round(monthlySalary * 0.35);
  const depositNeeded = recommendedRent30;
  const estimatedUtilities = 650; // Average BPC token + WUC water in Pula

  const applyBudgetFilter = (maxBudget: number) => {
    setFilters(prev => ({
      ...prev,
      maxPrice: maxBudget,
      minPrice: 0,
    }));
    setActiveNavTab('browse');
    const el = document.getElementById('rental-listings');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00A3E0] mb-2 flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>Botswana Pula Tenancy Benchmark</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            Rent Affordability & Budget Calculator
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Botswana landlords and credit screeners use a standard 30% - 35% income ceiling. Calculate your optimal rental bracket before applying to guarantee instant automated screening approval.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Inputs (5 Cols) */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Monthly Net Take-Home Salary (BWP)
                </label>
                <span className="font-mono text-base font-bold text-[#00A3E0]">
                  P {monthlySalary.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="80000"
                step="500"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="w-full accent-[#00A3E0] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>P 3,000</span>
                <span>P 40,000</span>
                <span>P 80,000+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Monthly Debt & Loan Commitments (BWP)
                </label>
                <span className="font-mono text-sm font-bold text-slate-200">
                  P {otherMonthlyDebt.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25000"
                step="250"
                value={otherMonthlyDebt}
                onChange={(e) => setOtherMonthlyDebt(Number(e.target.value))}
                className="w-full accent-[#00A3E0] cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Includes bank vehicle financing, store accounts, or personal loans.
              </span>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Gross Take-Home:</span>
                <span className="font-mono">P {monthlySalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Disposable Post-Debt:</span>
                <span className="font-mono font-bold text-white">P {netDisposable.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Right Results Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-white text-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Optimal Bracket (30%) */}
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Optimal Budget (30% Ratio)
                </span>
                <div className="font-heading text-2xl sm:text-3xl font-bold font-mono text-emerald-950">
                  P {recommendedRent30.toLocaleString()}
                  <span className="text-xs font-normal text-emerald-800 font-sans"> / mo</span>
                </div>
                <p className="text-xs text-emerald-800 mt-2 leading-relaxed">
                  Recommended sweet spot. Guaranteed high approval score across all Ntlokgolo landlord listings.
                </p>
              </div>

              {/* Max Ceiling (35%) */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Maximum Ceiling (35% Ratio)
                </span>
                <div className="font-heading text-2xl sm:text-3xl font-bold font-mono text-slate-900">
                  P {maxRent35.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500 font-sans"> / mo</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Upper ceiling acceptable under Botswana residential tenancy evaluation.
                </p>
              </div>

            </div>

            {/* Estimated Initial Move-In Cash Required */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Estimated Upfront Capital Needed:
              </h4>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">1st Month Rent</span>
                  <span className="font-mono font-bold text-slate-900">P {recommendedRent30.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">1-Mo Security Deposit</span>
                  <span className="font-mono font-bold text-slate-900">P {depositNeeded.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">BPC & Utilities Buffer</span>
                  <span className="font-mono font-bold text-slate-900">P {estimatedUtilities.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 text-xs font-bold border-t border-slate-200 text-slate-900">
                <span>Total Move-in Escrow Required:</span>
                <span className="font-mono text-base text-[#0077B6]">
                  P {(recommendedRent30 + depositNeeded + estimatedUtilities).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Suggested Botswana Neighborhoods */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Ideal Botswana Areas Within Your P {recommendedRent30.toLocaleString()} Budget:
              </h4>

              <div className="flex flex-wrap gap-2 text-xs">
                {recommendedRent30 >= 12000 ? (
                  <>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      Phakalane Golf Estate (Executive Villas)
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      Gaborone CBD Penthouses
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      Extension 9 & 11
                    </span>
                  </>
                ) : recommendedRent30 >= 6000 ? (
                  <>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      Block 6 & Block 8 (Modern Family Homes)
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      CBD 2-Bed Apartments
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      Francistown Donga
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      Tlokweng Townhouses
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      Mogoditshane Executive Bachelor Pads
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      Block 9 Townhouses
                    </span>
                    <span className="px-3 py-1.5 bg-slate-100 rounded-md font-semibold text-slate-800">
                      Palapye Standalone Homes
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Direct Browse with Budget Filter */}
            <button
              onClick={() => applyBudgetFilter(maxRent35)}
              className="w-full py-3 bg-slate-900 hover:bg-[#0077B6] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>View Verified Homes Under P {maxRent35.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
