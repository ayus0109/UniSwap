import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Laptop, 
  FlaskConical, 
  PenTool, 
  Package, 
  ShieldCheck, 
  HeartHandshake, 
  Leaf, 
  MapPin, 
  CheckCircle2, 
  Users, 
  Zap, 
  TrendingUp, 
  Clock,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from '../components/marketplace/ProductCard';
import { CAMPUS_STATS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { products, updateFilter } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      updateFilter('search', searchQuery.trim());
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/marketplace');
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    updateFilter('category', categoryName);
    navigate(`/marketplace?category=${encodeURIComponent(categoryName)}`);
  };

  // Featured sample items specifically requested in the prompt
  const featuredProducts = products.slice(0, 8);

  const categories = [
    {
      name: 'Books & Notes',
      icon: BookOpen,
      count: products.filter(p => p.category === 'Books & Notes').length,
      description: 'Syllabus textbooks, topper notes & semester guides',
      color: 'from-amber-500/10 to-orange-500/10 border-amber-200/60 text-amber-900'
    },
    {
      name: 'Electronics',
      icon: Laptop,
      count: products.filter(p => p.category === 'Electronics').length,
      description: 'Scientific calculators, pen drives, cables & audio',
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-200/60 text-blue-900'
    },
    {
      name: 'Lab Equipment',
      icon: FlaskConical,
      count: products.filter(p => p.category === 'Lab Equipment').length,
      description: 'Lab coats, breadboards, components & kits',
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/60 text-emerald-900'
    },
    {
      name: 'Stationery',
      icon: PenTool,
      count: products.filter(p => p.category === 'Stationery').length,
      description: 'Mini drafters, roller scales & sheet containers',
      color: 'from-purple-500/10 to-pink-500/10 border-purple-200/60 text-purple-900'
    },
    {
      name: 'Other Supplies',
      icon: Package,
      count: products.filter(p => p.category === 'Other Supplies').length,
      description: 'Hostel desk lamps, kettles, organisers & essentials',
      color: 'from-rose-500/10 to-orange-500/10 border-rose-200/60 text-rose-900'
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-20 border-b border-[#E9E3DC]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8EFE8] border border-[#CDE0CD] text-[#2C4A2E] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Made for the campus community</span>
                <span className="text-[#85817C]">•</span>
                <span className="text-[#85817C]">MITAOE Alandi Pilot</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#242321] tracking-tight leading-[1.12]">
                Your campus has it.{' '}
                <span className="text-[#A51E2B] underline decoration-[#EF6938] decoration-4 underline-offset-4">
                  Someone else needs it.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-[#85817C] text-base sm:text-lg max-w-xl font-body leading-relaxed">
                Buy, sell, exchange and donate useful study materials with students from your campus. Save money, discover great deals and give unused items a second life.
              </p>

              {/* Prominent Search Bar */}
              <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
                <div className="relative flex items-center bg-white rounded-xl border-2 border-[#E9E3DC] hover:border-[#EF6938]/60 focus-within:border-[#A51E2B] shadow-warm transition-all p-1.5">
                  <div className="pl-3 text-[#85817C]">
                    <Search className="w-5 h-5 text-[#A51E2B]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by book name, author, calculator model..."
                    className="w-full px-3 py-2.5 text-sm sm:text-base text-[#242321] placeholder-[#85817C]/70 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-5 py-2.5 rounded-lg bg-[#A51E2B] hover:bg-[#851621] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-warm-sm"
                  >
                    Search
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2.5 text-[11px] text-[#85817C]">
                  <span className="font-medium text-[#242321]">Popular:</span>
                  <button type="button" onClick={() => handleCategoryClick('Books & Notes')} className="underline hover:text-[#A51E2B]">Higher Engg Maths</button>
                  <span>•</span>
                  <button type="button" onClick={() => handleCategoryClick('Electronics')} className="underline hover:text-[#A51E2B]">Casio fx-991EX</button>
                  <span>•</span>
                  <button type="button" onClick={() => handleCategoryClick('Stationery')} className="underline hover:text-[#A51E2B]">Mini Drafter</button>
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/marketplace"
                  className="px-6 py-3.5 rounded-xl bg-[#242321] hover:bg-black text-white text-sm font-semibold transition-all shadow-warm flex items-center gap-2 group"
                >
                  <span>Browse Marketplace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/sell"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F8F6F2] text-[#A51E2B] border-2 border-[#A51E2B] text-sm font-semibold transition-all shadow-warm-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#EF6938]" />
                  <span>List an Item (Sell/Donate)</span>
                </Link>
              </div>

              {/* Safety Trust Points */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#85817C]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% On-Campus Hand-offs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Verified MITAOE Student Community</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Zero Packaging & Zero Shipping Waste</span>
                </div>
              </div>
            </div>

            {/* Right Hero Composition: Floating & Overlapping Product Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none h-[420px] sm:h-[480px]">
                {/* Background decorative warm ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#EF6938]/10 via-[#A51E2B]/5 to-transparent border border-[#E9E3DC] transform rotate-1 scale-95 -z-10"></div>

                {/* Card 1: Engineering Maths Textbook (Top Left) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-2 left-0 sm:left-4 w-60 sm:w-64 bg-white rounded-xl border border-[#E9E3DC] p-3 shadow-warm-lg z-20"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800"
                      alt="Engineering Maths"
                      className="w-16 h-16 rounded-lg object-cover border border-[#E9E3DC]"
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#A51E2B] bg-[#A51E2B]/10 px-1.5 py-0.5 rounded">
                        Books & Notes
                      </span>
                      <h4 className="text-xs font-bold text-[#242321] truncate mt-0.5">
                        Higher Engg Maths (B.S. Grewal)
                      </h4>
                      <p className="text-sm font-extrabold text-[#A51E2B]">₹180</p>
                      <p className="text-[10px] text-[#85817C]">By Ananya • BE ENTC</p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: Scientific Calculator (Right / Center) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-24 right-0 sm:right-2 w-64 bg-white rounded-xl border-2 border-[#EF6938]/30 p-3.5 shadow-warm-xl z-30"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1632571401005-458e9d244591?auto=format&fit=crop&q=80&w=800"
                      alt="Calculator"
                      className="w-16 h-16 rounded-lg object-cover border border-[#E9E3DC]"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Like New
                        </span>
                        <span className="text-[9px] text-[#85817C]">Verified</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#242321] truncate mt-0.5">
                        Casio fx-991EX ClassWiz
                      </h4>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-extrabold text-[#A51E2B]">₹450</span>
                        <span className="text-[10px] text-[#85817C] line-through">₹1,295 MRP</span>
                      </div>
                      <p className="text-[10px] text-[#85817C] flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-[#EF6938]" />
                        Library Ground Floor
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3: Free Donation Book / Notes (Bottom Left) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-12 left-2 sm:left-6 w-56 sm:w-60 bg-white rounded-xl border border-[#CDE0CD] p-3 shadow-warm-lg z-20 bg-gradient-to-br from-white to-[#E8EFE8]/40"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-lg bg-[#E8EFE8] flex items-center justify-center text-[#2C4A2E] shrink-0 font-bold">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold uppercase text-[#2C4A2E] bg-[#E8EFE8] px-1.5 py-0.5 rounded">
                        Free Donation
                      </span>
                      <h4 className="text-xs font-bold text-[#242321] truncate mt-0.5">
                        C++ Notes & DSA Guide
                      </h4>
                      <p className="text-xs font-extrabold text-[#2C4A2E]">₹0 (Free)</p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 4: Lab Coat & Drawing Kit (Bottom Right) */}
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute bottom-2 right-2 sm:right-6 w-52 sm:w-56 bg-white rounded-xl border border-[#E9E3DC] p-2.5 shadow-warm z-10"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"
                      alt="Lab Coat"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] text-[#85817C] uppercase font-bold">Lab Kit</span>
                      <h5 className="text-[11px] font-bold text-[#242321] truncate">Lab Coat (Size L)</h5>
                      <p className="text-xs font-bold text-[#A51E2B]">₹250</p>
                    </div>
                  </div>
                </motion.div>

                {/* Center Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#242321] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-warm-xl flex items-center gap-2 z-40 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#EF6938]"></span>
                  <span>MITAOE Campus Exchange</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A51E2B] mb-1">
              <Layers className="w-4 h-4" />
              <span>Explore by Category</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#242321] tracking-tight">
              What do you need for this semester?
            </h2>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-bold text-[#A51E2B] hover:text-[#851621] flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`text-left p-5 rounded-xl border bg-white hover:border-[#A51E2B] hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 bg-[#F8F6F2] border border-[#E9E3DC] text-[#A51E2B]`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#242321] group-hover:text-[#A51E2B] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#85817C] mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E9E3DC]/60 flex items-center justify-between text-xs font-medium text-[#85817C]">
                  <span>{cat.count} items active</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EF6938] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EF6938] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Campus Verified Deals</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#242321] tracking-tight">
              Featured Study Materials
            </h2>
            <p className="text-xs text-[#85817C] mt-1">
              Realistic demo listings curated for MIT Academy of Engineering students.
            </p>
          </div>

          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F8F6F2] hover:bg-[#E9E3DC]/60 border border-[#E9E3DC] text-xs font-bold text-[#242321] transition-colors"
          >
            <span>Explore All {products.length} Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner inside Featured */}
        <div className="mt-10 p-6 rounded-2xl bg-[#F8F6F2] border border-[#E9E3DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-base text-[#242321]">
              Looking for a specific subject book or semester kit?
            </h4>
            <p className="text-xs text-[#85817C]">
              Filter by syllabus, branch (Computer, ENTC, Mechanical, Chemical) or price range.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="px-5 py-2.5 rounded-lg bg-[#A51E2B] hover:bg-[#851621] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-warm-sm"
          >
            Open Full Marketplace
          </Link>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="bg-white border-y border-[#E9E3DC] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A51E2B] px-3 py-1 bg-[#A51E2B]/10 rounded-full">
              Simple 3-Step Campus Flow
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#242321] tracking-tight">
              How UniSwap Works on Campus
            </h2>
            <p className="text-sm text-[#85817C]">
              No shipping delays, no courier charges, no awkward strangers. Just your fellow college students meeting safely between lectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-[#F8F6F2] rounded-2xl p-8 border border-[#E9E3DC] relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#A51E2B] text-white font-heading font-extrabold text-lg flex items-center justify-center shadow-warm">
                1
              </div>
              <h3 className="font-heading font-bold text-xl text-[#242321]">
                Discover
              </h3>
              <p className="text-sm text-[#85817C] leading-relaxed">
                Find affordable textbooks, calculators, lab coats and drafters listed directly by students from your campus and semester.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#A51E2B] flex items-center gap-1">
                <span>Filter by condition & price</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F8F6F2] rounded-2xl p-8 border border-[#E9E3DC] relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EF6938] text-white font-heading font-extrabold text-lg flex items-center justify-center shadow-warm">
                2
              </div>
              <h3 className="font-heading font-bold text-xl text-[#242321]">
                Connect
              </h3>
              <p className="text-sm text-[#85817C] leading-relaxed">
                Express interest, propose an exchange item, or click "Request to Buy" and select your preferred campus spot like Central Library or Nescafe Canteen.
              </p>
              <div className="pt-2 text-xs font-semibold text-[#EF6938] flex items-center gap-1">
                <span>Direct on-campus coordination</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F8F6F2] rounded-2xl p-8 border border-[#E9E3DC] relative space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#242321] text-white font-heading font-extrabold text-lg flex items-center justify-center shadow-warm">
                3
              </div>
              <h3 className="font-heading font-bold text-xl text-[#242321]">
                Exchange
              </h3>
              <p className="text-sm text-[#85817C] leading-relaxed">
                Meet in person between classes, inspect the study materials thoroughly, hand over cash or UPI, and give unused resources a second life.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span>Zero packaging waste • Instant handoff</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Campus Meetup Hotspots Showcase */}
          <div className="mt-14 p-6 rounded-2xl bg-[#E8EFE8]/70 border border-[#CDE0CD] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2C4A2E] text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-[#2C4A2E]">
                  Designated Campus Meetup Spots
                </h4>
                <p className="text-xs text-[#2C4A2E]/80">
                  Central Library 1st Floor • Nescafe Canteen Foyer • Mechanical Workshop Porch • Main Gate 1
                </p>
              </div>
            </div>
            <Link
              to="/how-it-works"
              className="text-xs font-bold text-[#2C4A2E] underline shrink-0 hover:text-black"
            >
              Read Full Campus Safety Guidelines &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 5. MISSION & IMPACT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#242321] text-white rounded-3xl p-8 sm:p-14 border border-[#383633] shadow-warm-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A51E2B]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/15">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Our Core Mission</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                Less waste. More value.{' '}
                <span className="text-[#EF6938]">Stronger campus connections.</span>
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
                Every year, thousands of textbooks, lab coats, and costly calculators sit abandoned in dorms after final exams, while new incoming students spend ₹10,000+ purchasing the exact same items brand new.
              </p>

              <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                UniSwap creates a localized, circular peer economy at MIT Academy of Engineering that keeps study essentials circulating affordably, eliminates middleman commissions, and builds mutual support among engineering batches.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/sell"
                  className="px-6 py-3 rounded-xl bg-[#EF6938] hover:bg-[#E05523] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-warm"
                >
                  List An Item to Donate or Sell
                </Link>
                <Link
                  to="/how-it-works"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/20"
                >
                  Learn About Our Pilot
                </Link>
              </div>
            </div>

            {/* Impact numbers */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {CAMPUS_STATS.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-1">
                  <p className="font-heading font-extrabold text-2xl sm:text-3xl text-[#EF6938]">
                    {stat.value}
                  </p>
                  <p className="text-xs font-bold text-white">
                    {stat.label}
                  </p>
                  <p className="text-[11px] text-white/50">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BAR */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#242321]">
          Ready to discover deals or clear your study table?
        </h3>
        <p className="text-sm text-[#85817C] max-w-lg mx-auto">
          Join your peers at MIT Academy of Engineering in building a cleaner, smarter campus marketplace.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/marketplace"
            className="px-6 py-3 rounded-xl bg-[#A51E2B] hover:bg-[#851621] text-white text-xs font-bold uppercase tracking-wider shadow-warm"
          >
            Start Browsing
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-white border border-[#E9E3DC] hover:border-[#242321] text-[#242321] text-xs font-semibold"
          >
            Demo Student Login
          </Link>
        </div>
      </section>
    </div>
  );
};
