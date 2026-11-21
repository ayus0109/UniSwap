import React from 'react';
import { 
  RotateCcw, 
  Search, 
  BookOpen, 
  Laptop, 
  FlaskConical, 
  PenTool, 
  Package, 
  Layers, 
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { Category, Condition, ListingType, SortOption } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';

interface FilterSidebarProps {
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile }) => {
  const { filterState, updateFilter, resetFilters, getCategoryCount, products } = useMarketplace();

  const categories: { label: string; value: string; icon: any }[] = [
    { label: 'All Categories', value: 'All', icon: Layers },
    { label: 'Books & Notes', value: 'Books & Notes', icon: BookOpen },
    { label: 'Electronics', value: 'Electronics', icon: Laptop },
    { label: 'Lab Equipment', value: 'Lab Equipment', icon: FlaskConical },
    { label: 'Stationery', value: 'Stationery', icon: PenTool },
    { label: 'Other Supplies', value: 'Other Supplies', icon: Package },
  ];

  const conditions: { label: string; value: string }[] = [
    { label: 'All Conditions', value: 'All' },
    { label: 'Brand New', value: 'Brand New' },
    { label: 'Like New', value: 'Like New' },
    { label: 'Good', value: 'Good' },
    { label: 'Fair', value: 'Fair' },
  ];

  const listingTypes: { label: string; value: string; count: number }[] = [
    { label: 'All Listings', value: 'All', count: products.length },
    { label: 'For Sale', value: 'Sell', count: products.filter(p => p.listingType === 'Sell').length },
    { label: 'For Exchange', value: 'Exchange', count: products.filter(p => p.listingType === 'Exchange').length },
    { label: 'Free Donation', value: 'Donate', count: products.filter(p => p.listingType === 'Donate').length },
  ];

  const pricePresets = [
    { label: 'All Prices', min: 0, max: 2000 },
    { label: 'Free (₹0)', min: 0, max: 0 },
    { label: 'Under ₹150', min: 0, max: 150 },
    { label: '₹150 – ₹300', min: 150, max: 300 },
    { label: '₹300 – ₹500', min: 300, max: 500 },
    { label: '₹500 & Above', min: 500, max: 2000 },
  ];

  const hasActiveFilters = 
    filterState.category !== 'All' || 
    filterState.condition !== 'All' || 
    filterState.listingType !== 'All' || 
    filterState.search !== '' || 
    filterState.minPrice > 0 || 
    filterState.maxPrice < 2000;

  return (
    <div className="bg-white rounded-xl border border-[#E9E3DC] p-5 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E9E3DC]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#A51E2B]" />
          <h2 className="font-heading font-bold text-base text-[#242321]">
            Filters
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-[#A51E2B] hover:text-[#851621] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Search Input Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#85817C] block">
          Keyword Search
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-[#85817C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search books, drafter, calc..."
            value={filterState.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B] transition-colors"
          />
        </div>
      </div>

      {/* Listing Type Filter (Sell / Exchange / Donate) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#85817C] block">
          Listing Intent
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {listingTypes.map((type) => {
            const isSelected = filterState.listingType === type.value;
            return (
              <button
                key={type.value}
                onClick={() => updateFilter('listingType', type.value)}
                className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                  isSelected
                    ? 'bg-[#A51E2B] text-white border-[#A51E2B] shadow-warm-sm'
                    : 'bg-[#F8F6F2] text-[#242321] border-[#E9E3DC] hover:border-[#EF6938]/50'
                }`}
              >
                <span>{type.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#85817C]'
                }`}>
                  {type.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#85817C] block">
          Category
        </label>
        <div className="space-y-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = filterState.category === cat.value;
            const count = getCategoryCount(cat.value as any);
            return (
              <button
                key={cat.value}
                onClick={() => updateFilter('category', cat.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                  isSelected
                    ? 'bg-[#EF6938]/10 text-[#EF6938] font-semibold border border-[#EF6938]/30'
                    : 'text-[#242321] hover:bg-[#F8F6F2]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#EF6938]' : 'text-[#85817C]'}`} />
                  <span>{cat.label}</span>
                </div>
                <span className="text-[11px] text-[#85817C] font-normal">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pt-2 border-t border-[#E9E3DC]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#85817C]">
            Price Filter (₹)
          </label>
          <span className="text-xs font-semibold text-[#A51E2B]">
            ₹{filterState.minPrice} – {filterState.maxPrice >= 2000 ? '₹2000+' : `₹${filterState.maxPrice}`}
          </span>
        </div>

        {/* Quick price presets */}
        <div className="flex flex-wrap gap-1.5">
          {pricePresets.map((preset) => {
            const isPresetActive = 
              filterState.minPrice === preset.min && filterState.maxPrice === preset.max;
            return (
              <button
                key={preset.label}
                onClick={() => {
                  updateFilter('minPrice', preset.min);
                  updateFilter('maxPrice', preset.max);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                  isPresetActive
                    ? 'bg-[#242321] text-white border-[#242321]'
                    : 'bg-white text-[#242321] border-[#E9E3DC] hover:border-[#85817C]'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Sliders / Range */}
        <div className="space-y-2 pt-1">
          <input
            type="range"
            min={0}
            max={2000}
            step={25}
            value={filterState.maxPrice}
            onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
            className="w-full accent-[#A51E2B] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#85817C]">
            <span>₹0 (Free)</span>
            <span>₹500</span>
            <span>₹1000</span>
            <span>₹2000+</span>
          </div>
        </div>
      </div>

      {/* Condition Filter */}
      <div className="space-y-2 pt-2 border-t border-[#E9E3DC]">
        <label className="text-xs font-bold uppercase tracking-wider text-[#85817C] block">
          Item Condition
        </label>
        <div className="flex flex-wrap gap-1.5">
          {conditions.map((cond) => {
            const isSelected = filterState.condition === cond.value;
            return (
              <button
                key={cond.value}
                onClick={() => updateFilter('condition', cond.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#242321] text-white border-[#242321]'
                    : 'bg-[#F8F6F2] text-[#242321] border-[#E9E3DC] hover:border-[#85817C]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-[#EF6938]" />}
                <span>{cond.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile close button */}
      {onCloseMobile && (
        <div className="pt-4 border-t border-[#E9E3DC] md:hidden">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-[#A51E2B] text-white rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
