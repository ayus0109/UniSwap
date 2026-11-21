import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  RotateCcw, 
  PlusCircle, 
  PackageOpen,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from '../components/marketplace/ProductCard';
import { FilterSidebar } from '../components/marketplace/FilterSidebar';
import { SortOption } from '../types';

export const MarketplacePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, filterState, updateFilter, resetFilters } = useMarketplace();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL search params if present on initial load or change
  React.useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const typeParam = searchParams.get('type');

    if (categoryParam && categoryParam !== filterState.category) {
      updateFilter('category', categoryParam);
    }
    if (searchParam && searchParam !== filterState.search) {
      updateFilter('search', searchParam);
    }
    if (typeParam && typeParam !== filterState.listingType) {
      updateFilter('listingType', typeParam);
    }
  }, [searchParams]);

  // Apply full filtering and sorting
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Keyword search (title, description, seller, department, campus)
      if (filterState.search.trim()) {
        const query = filterState.search.toLowerCase().trim();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSeller = product.sellerName.toLowerCase().includes(query);
        const matchesDept = (product.department || '').toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSeller && !matchesDept && !matchesCat) {
          return false;
        }
      }

      // 2. Category
      if (filterState.category !== 'All' && product.category !== filterState.category) {
        return false;
      }

      // 3. Condition
      if (filterState.condition !== 'All' && product.condition !== filterState.condition) {
        return false;
      }

      // 4. Listing Type
      if (filterState.listingType !== 'All' && product.listingType !== filterState.listingType) {
        return false;
      }

      // 5. Price Range
      if (filterState.maxPrice > 0 || filterState.minPrice > 0) {
        // If maxPrice is at upper limit (2000), treat as open-ended unless free was selected
        if (filterState.maxPrice === 0 && filterState.minPrice === 0) {
          if (product.price !== 0 && product.listingType !== 'Donate') return false;
        } else {
          if (product.price < filterState.minPrice) return false;
          if (filterState.maxPrice < 2000 && product.price > filterState.maxPrice) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      switch (filterState.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popular':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [products, filterState]);

  const activeFilters = [];
  if (filterState.search) activeFilters.push({ key: 'search', label: `Search: "${filterState.search}"`, reset: () => updateFilter('search', '') });
  if (filterState.category !== 'All') activeFilters.push({ key: 'category', label: `Category: ${filterState.category}`, reset: () => updateFilter('category', 'All') });
  if (filterState.listingType !== 'All') activeFilters.push({ key: 'listingType', label: `Type: ${filterState.listingType}`, reset: () => updateFilter('listingType', 'All') });
  if (filterState.condition !== 'All') activeFilters.push({ key: 'condition', label: `Condition: ${filterState.condition}`, reset: () => updateFilter('condition', 'All') });
  if (filterState.minPrice > 0 || filterState.maxPrice < 2000) {
    activeFilters.push({
      key: 'price',
      label: `Price: ₹${filterState.minPrice} – ₹${filterState.maxPrice}`,
      reset: () => {
        updateFilter('minPrice', 0);
        updateFilter('maxPrice', 2000);
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-body">
      {/* Top Page Header */}
      <div className="bg-white rounded-2xl border border-[#E9E3DC] p-6 sm:p-8 shadow-warm-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A51E2B] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#EF6938]"></span>
            <span>MITAOE Campus Marketplace</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#242321] tracking-tight">
            Browse Study Materials
          </h1>
          <p className="text-xs sm:text-sm text-[#85817C] mt-1">
            Explore verified textbooks, calculators, lab coats and project components from fellow students.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/sell"
            className="px-5 py-2.5 rounded-xl bg-[#A51E2B] hover:bg-[#851621] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-warm flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List an Item</span>
          </Link>
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Filter Sidebar (4 cols) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24">
          <FilterSidebar />
        </aside>

        {/* Right Content Area (8 cols) */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* Controls Bar: Search + Sorting + Mobile Filter Trigger */}
          <div className="bg-white rounded-xl border border-[#E9E3DC] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-warm-sm">
            {/* Inline Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#85817C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterState.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                placeholder="Filter items by title, author, course..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
              />
              {filterState.search && (
                <button
                  onClick={() => updateFilter('search', '')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#85817C] hover:text-[#242321]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg border border-[#E9E3DC] bg-[#F8F6F2] text-xs font-semibold text-[#242321]"
            >
              <Filter className="w-4 h-4 text-[#A51E2B]" />
              <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-[#85817C] hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={filterState.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value as SortOption)}
                  className="px-3 py-2 pr-8 text-xs font-semibold rounded-lg border border-[#E9E3DC] bg-[#F8F6F2] hover:bg-white focus:outline-none cursor-pointer appearance-none text-[#242321]"
                >
                  <option value="newest">Recently Added</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#85817C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-[#85817C]">Active Filters:</span>
              {activeFilters.map((filter) => (
                <span
                  key={filter.key}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#A51E2B]/10 text-[#A51E2B] border border-[#A51E2B]/20"
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={filter.reset}
                    className="hover:text-black focus:outline-none"
                    aria-label="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-[#85817C] hover:text-[#A51E2B] underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results Summary & Count */}
          <div className="flex items-center justify-between text-xs text-[#85817C]">
            <span>
              Showing <strong className="text-[#242321]">{filteredProducts.length}</strong> of {products.length} items on campus
            </span>
            <span className="text-[11px] text-[#2C4A2E] bg-[#E8EFE8] px-2 py-0.5 rounded font-medium">
              MITAOE Student Verified
            </span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-[#E9E3DC] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F8F6F2] border border-[#E9E3DC] flex items-center justify-center mx-auto text-[#85817C]">
                <PackageOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-lg text-[#242321]">
                  No matching items found
                </h3>
                <p className="text-xs text-[#85817C] max-w-sm mx-auto">
                  We couldn't find any listings matching your current filter criteria. Try loosening your price range or clearing keyword filters.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-lg bg-[#A51E2B] text-white text-xs font-semibold hover:bg-[#851621] transition-colors"
                >
                  Reset All Filters
                </button>
                <Link
                  to="/sell"
                  className="px-4 py-2 rounded-lg border border-[#E9E3DC] text-xs font-semibold text-[#242321] hover:bg-[#F8F6F2]"
                >
                  Be the first to list this!
                </Link>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Slide-over Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div 
            className="w-full max-w-sm bg-white h-full min-h-screen p-5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E3DC] mb-4">
              <h3 className="font-heading font-bold text-base text-[#242321]">
                Filter Marketplace
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-md text-[#85817C] hover:text-[#242321]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
