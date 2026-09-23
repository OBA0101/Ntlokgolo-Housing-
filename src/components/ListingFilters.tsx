import React from 'react';
import { useRentals } from '../context/RentalsContext';
import { BotswanaDistrict, PropertyType } from '../types';
import { 
  Filter, 
  RotateCcw, 
  Search, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

export const ListingFilters: React.FC = () => {
  const { filters, setFilters, resetFilters, filteredListings } = useRentals();
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleBedroomsChange = (val: number | 'all') => {
    setFilters(prev => ({ ...prev, bedrooms: val }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs mb-8">
      
      {/* Top Filter Bar: Search, District, Type, Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by neighborhood, plot number, or town..."
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          />
        </div>

        {/* Quick Dropdowns */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          {/* District */}
          <select
            value={filters.district}
            onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value as BotswanaDistrict | 'all' }))}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          >
            <option value="all">All Locations</option>
            <option value="Gaborone">Gaborone</option>
            <option value="Tlokweng">Tlokweng</option>
            <option value="Mogoditshane">Mogoditshane</option>
            <option value="Francistown">Francistown</option>
            <option value="Maun">Maun</option>
            <option value="Palapye">Palapye</option>
            <option value="Kasane">Kasane</option>
            <option value="Jwaneng">Jwaneng</option>
            <option value="Lobatse">Lobatse</option>
          </select>

          {/* Property Type */}
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value as PropertyType | 'all' }))}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
            <option value="villa">Villa</option>
            <option value="bachelor_cottage">Bachelor Pad</option>
          </select>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
          >
            <option value="recommended">Featured First</option>
            <option value="price_low_high">Price: Low to High</option>
            <option value="price_high_low">Price: High to Low</option>
            <option value="newest">Newest Listed</option>
          </select>

          {/* Toggle Advanced */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              showAdvanced 
                ? 'bg-slate-900 text-white border-slate-900' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset filters"
            aria-label="Reset all filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Advanced Filter Expansion */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Bedrooms Segmented Buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Bedrooms
            </label>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(['all', 1, 2, 3, 4] as const).map((count) => (
                <button
                  key={count}
                  onClick={() => handleBedroomsChange(count)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    filters.bedrooms === count
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {count === 'all' ? 'Any' : count === 4 ? '4+' : `${count}`}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Max Monthly Rent:
              </label>
              <span className="text-xs font-mono font-bold text-slate-900 tabular-nums">
                {filters.maxPrice >= 25000 ? 'Any (P25k+)' : `P ${filters.maxPrice.toLocaleString()}`}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="25000"
              step="500"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-[#00A3E0] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>P2,000</span>
              <span>P12,000</span>
              <span>P25,000+</span>
            </div>
          </div>

          {/* Botswana Infrastructure & Amenities Checkboxes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Botswana Specifics
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.electricFence}
                  onChange={(e) => setFilters(prev => ({ ...prev, electricFence: e.target.checked }))}
                  className="rounded border-slate-300 text-[#00A3E0] focus:ring-[#0077B6]"
                />
                <span>Electric Fence</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.bpcPrepaid}
                  onChange={(e) => setFilters(prev => ({ ...prev, bpcPrepaid: e.target.checked }))}
                  className="rounded border-slate-300 text-[#00A3E0] focus:ring-[#0077B6]"
                />
                <span>Prepaid BPC</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.borehole}
                  onChange={(e) => setFilters(prev => ({ ...prev, borehole: e.target.checked }))}
                  className="rounded border-slate-300 text-[#00A3E0] focus:ring-[#0077B6]"
                />
                <span>Borehole Water</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={filters.petFriendly}
                  onChange={(e) => setFilters(prev => ({ ...prev, petFriendly: e.target.checked }))}
                  className="rounded border-slate-300 text-[#00A3E0] focus:ring-[#0077B6]"
                />
                <span>Pet Friendly</span>
              </label>
            </div>
          </div>

        </div>
      )}

      {/* Results Count & Active Status */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-slate-900 font-mono tabular-nums">{filteredListings.length}</strong> available homes across Botswana
        </span>
        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          Direct Landlord Postings Verified
        </span>
      </div>

    </div>
  );
};
