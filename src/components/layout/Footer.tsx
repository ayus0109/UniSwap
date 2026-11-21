import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Leaf, 
  Heart, 
  ArrowUpRight,
  BookOpen,
  Laptop,
  FlaskConical,
  PenTool,
  Package
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#242321] text-[#F8F6F2] border-t border-[#383633] pt-16 pb-12 mt-20 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner */}
        <div className="bg-[#A51E2B]/20 border border-[#A51E2B]/40 rounded-xl p-6 sm:p-8 mb-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#EF6938]">
              <Leaf className="w-4 h-4" />
              Circular Campus Economy
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Have textbooks or lab gear sitting idle in your hostel?
            </h3>
            <p className="text-white/70 text-sm max-w-2xl">
              Turn your unused semester books, calculator, drafter, or lab coat into cash or pass them on to junior students.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/sell"
              className="px-5 py-2.5 rounded-lg bg-[#EF6938] hover:bg-[#E05523] text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 flex-1 md:flex-initial shadow-warm"
            >
              <span>List Your Item</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#A51E2B] flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-warm">
                U
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                Uni<span className="text-[#EF6938]">Swap</span>
              </span>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              UniSwap is a verified campus marketplace built for college students to buy, sell, exchange and donate study materials. Less waste, more value, stronger campus community.
            </p>

            <div className="space-y-2 pt-2 text-xs text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#EF6938] shrink-0 mt-0.5" />
                <span>MIT Academy of Engineering (MITAOE), Dehu Phata, Alandi (D.), Pune - 412105, Maharashtra</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified student peer community • Safe on-campus meetups</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-white transition-colors">Browse Marketplace</Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-white transition-colors">Sell or Donate Item</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">Student Dashboard</Link>
              </li>
              <li>
                <Link to="/profile?tab=saved" className="hover:text-white transition-colors">Saved Favourites</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/marketplace?category=Books%20%26%20Notes" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <BookOpen className="w-3.5 h-3.5 text-[#EF6938]" />
                  <span>Books & Notes</span>
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Electronics" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <Laptop className="w-3.5 h-3.5 text-[#EF6938]" />
                  <span>Electronics</span>
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Lab%20Equipment" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <FlaskConical className="w-3.5 h-3.5 text-[#EF6938]" />
                  <span>Lab Equipment</span>
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Stationery" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <PenTool className="w-3.5 h-3.5 text-[#EF6938]" />
                  <span>Stationery & Drafters</span>
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=Other%20Supplies" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <Package className="w-3.5 h-3.5 text-[#EF6938]" />
                  <span>Other Hostel Supplies</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Venture Viability info */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Project Context
            </h4>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10 space-y-2 text-xs text-white/70">
              <p className="font-semibold text-white">
                Wadhwani Foundation Venture Viability Project
              </p>
              <p className="leading-relaxed">
                UniSwap addresses the acute lack of affordable, transparent, on-campus circulation of academic assets in collegiate clusters.
              </p>
              <div className="pt-1 text-[11px] text-[#EF6938] font-medium">
                Pilot Target: 5,000+ MITAOE Students
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} UniSwap. Developed for Venture Viability Presentation.
          </p>

          <p className="flex items-center gap-1 text-white/70">
            <span>Tagline:</span>
            <span className="font-medium text-white italic">"Your Campus. Your Marketplace. Your UniSwap."</span>
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-amber-300/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
              Prototype Demo Mode
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
