import React from 'react';
import { useRentals } from '../context/RentalsContext';
import { Search, MapPin, Home, ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { BotswanaDistrict, PropertyType } from '../types';
import heroImg from '../assets/images/hero_botswana_home_1790161561812.jpg';

export const HeroSection: React.FC = () => {
  const { filters, setFilters, setIsListPropertyOpen, setActiveNavTab } = useRentals();

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, district: e.target.value as BotswanaDistrict | 'all' }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, propertyType: e.target.value as PropertyType | 'all' }));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = Number(e.target.value);
    setFilters(prev => ({ ...prev, maxPrice: val === 0 ? 30000 : val }));
  };

  const quickFilter = (district: BotswanaDistrict, type: PropertyType | 'all' = 'all') => {
    setFilters(prev => ({
      ...prev,
      district,
      propertyType: type,
    }));
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Contemporary residential home in Gaborone Botswana"
          className="w-full h-full object-cover object-center filter brightness-65"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        
        {/* Editorial Headline & Intro */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-[#00A3E0]">
            <span>Botswana's Automated Property Ecosystem</span>
            <span aria-hidden="true">·</span>
            <span>Direct Landlord To Tenant</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Rent your next home in Botswana <span className="text-[#00A3E0]">without the middleman runaround.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed mb-8 max-w-2xl">
            Ntlokgolo connects property owners with verified tenants. Book automated viewing appointments with instant gate security passes, complete 3-minute Omang screening, and sign legally binding Botswana tenancy agreements online.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Omang & Title Plots
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#00A3E0]" />
              Automated Gate Access Passes
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Prepaid BPC & WUC Records</span>
          </div>
        </div>

        {/* Unified Automated Search Console */}
        <div className="bg-white/95 backdrop-blur-md text-slate-900 p-4 sm:p-5 rounded-2xl shadow-xl border border-white/20 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* 1. Location / District */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                District / Town
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={filters.district}
                  onChange={handleDistrictChange}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                >
                  <option value="all">All Botswana Locations</option>
                  <option value="Gaborone">Gaborone (Capital)</option>
                  <option value="Tlokweng">Tlokweng</option>
                  <option value="Mogoditshane">Mogoditshane</option>
                  <option value="Francistown">Francistown</option>
                  <option value="Maun">Maun (Riverside)</option>
                  <option value="Palapye">Palapye</option>
                  <option value="Kasane">Kasane</option>
                  <option value="Jwaneng">Jwaneng</option>
                  <option value="Lobatse">Lobatse</option>
                </select>
              </div>
            </div>

            {/* 2. Property Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Property Type
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={filters.propertyType}
                  onChange={handleTypeChange}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                >
                  <option value="all">All Property Types</option>
                  <option value="house">Standalone Family House</option>
                  <option value="apartment">Modern City Apartment</option>
                  <option value="townhouse">Townhouse / Gated</option>
                  <option value="villa">Executive Villa with Pool</option>
                  <option value="bachelor_cottage">Bachelor Pad / Cottage</option>
                </select>
              </div>
            </div>

            {/* 3. Monthly Budget in BWP */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Max Monthly Rent
              </label>
              <select
                value={filters.maxPrice >= 30000 ? 0 : filters.maxPrice}
                onChange={handleBudgetChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
              >
                <option value={0}>Any Budget (Up to P30k+)</option>
                <option value={4000}>Under P 4,000 / mo</option>
                <option value={6000}>Under P 6,000 / mo</option>
                <option value={8000}>Under P 8,000 / mo</option>
                <option value={12000}>Under P 12,000 / mo</option>
                <option value={18000}>Under P 18,000 / mo</option>
              </select>
            </div>

            {/* 4. Action Trigger */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  const el = document.getElementById('rental-listings');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-[#0077B6] text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>Search Homes</span>
              </button>
            </div>
          </div>

          {/* Quick neighborhood chips */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-600 font-semibold">Popular Wards:</span>
            <button
              onClick={() => quickFilter('Gaborone')}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              Phakalane
            </button>
            <button
              onClick={() => quickFilter('Gaborone')}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              Block 6 & 8
            </button>
            <button
              onClick={() => quickFilter('Gaborone', 'apartment')}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              CBD Apartments
            </button>
            <button
              onClick={() => quickFilter('Tlokweng')}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              Tlokweng
            </button>
            <button
              onClick={() => quickFilter('Francistown')}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              Francistown Donga
            </button>
            <button
              onClick={() => quickFilter('Maun')}
              className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              Maun Riverside
            </button>

            <span className="ml-auto text-slate-600 hidden sm:inline">
              Landlord?{' '}
              <button
                onClick={() => setIsListPropertyOpen(true)}
                className="text-[#0077B6] font-semibold underline underline-offset-2 hover:text-[#005f92]"
              >
                List your house in 4 mins
              </button>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
