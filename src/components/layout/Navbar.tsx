import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  PlusCircle, 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  HelpCircle, 
  Building2, 
  ChevronDown,
  Sparkles,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { favourites, requests } = useMarketplace();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const pendingRequestsCount = user 
    ? requests.filter(r => r.sellerId === user.id && r.status === 'Pending').length
    : 0;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Items', path: '/marketplace' },
    { name: 'Sell / Donate', path: '/sell' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F2]/95 backdrop-blur-md border-b border-[#E9E3DC] transition-all">
      {/* Top micro campus announcement bar */}
      <div className="bg-[#242321] text-[#F8F6F2] text-xs py-1.5 px-4 font-body border-b border-[#383633]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#EF6938] text-white uppercase tracking-wider">
              Pilot Campus
            </span>
            <span className="hidden sm:inline text-white/80">
              MIT Academy of Engineering, Alandi, Pune (Autonomous)
            </span>
            <span className="sm:hidden text-white/80">MITAOE, Pune</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-white/70">
            <span className="hidden md:flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Verified Student Peer Exchange
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/90 font-medium">Wadhwani Foundation Project Demo</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#A51E2B] flex items-center justify-center text-white shadow-warm group-hover:bg-[#851621] transition-colors">
              <div className="relative">
                <span className="font-heading font-extrabold text-xl tracking-tight">U</span>
                <span className="absolute -bottom-1 -right-1.5 w-2 h-2 rounded-full bg-[#EF6938] ring-2 ring-[#A51E2B]"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xl tracking-tight text-[#242321]">
                  Uni<span className="text-[#A51E2B]">Swap</span>
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-[#E8EFE8] text-[#2C4A2E] rounded border border-[#CDE0CD]">
                  Campus
                </span>
              </div>
              <p className="text-[10px] text-[#85817C] font-medium tracking-tight -mt-0.5 hidden sm:block">
                MITAOE Marketplace
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    active 
                      ? 'text-[#A51E2B] font-semibold' 
                      : 'text-[#242321] hover:text-[#A51E2B] hover:bg-[#E9E3DC]/40'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#A51E2B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Quick Sell CTA Button */}
            <Link
              to="/sell"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium bg-[#A51E2B] hover:bg-[#851621] text-white shadow-warm-sm transition-all hover:shadow-warm active:translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Item</span>
            </Link>

            {/* Favourites Button */}
            <Link
              to="/profile?tab=saved"
              aria-label="Saved items"
              className="relative p-2 rounded-md text-[#242321] hover:text-[#A51E2B] hover:bg-[#E9E3DC]/50 transition-colors"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {favourites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#EF6938] text-white text-[10px] font-bold flex items-center justify-center">
                  {favourites.length}
                </span>
              )}
            </Link>

            {/* User Profile or Login */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-md hover:bg-[#E9E3DC]/50 border border-transparent hover:border-[#E9E3DC] transition-all"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-[#E9E3DC]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567168544646-208fa5d408fb?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-[#242321] leading-tight flex items-center gap-1">
                      {user.name.split(' ')[0]}
                      {pendingRequestsCount > 0 && (
                        <span className="w-2 h-2 rounded-full bg-[#EF6938]"></span>
                      )}
                    </p>
                    <p className="text-[10px] text-[#85817C] leading-tight">Student</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#85817C]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-warm-lg border border-[#E9E3DC] py-2 z-50">
                    <div className="px-4 py-2 border-b border-[#E9E3DC]">
                      <p className="text-xs font-semibold text-[#242321] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#85817C] truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-[#E8EFE8] text-[#2C4A2E] rounded font-medium">
                        {user.branch}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-[#242321] hover:bg-[#F8F6F2] hover:text-[#A51E2B]"
                    >
                      <UserIcon className="w-4 h-4 text-[#85817C]" />
                      <span>My Profile & Dashboard</span>
                    </Link>

                    <Link
                      to="/profile?tab=requests"
                      className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#242321] hover:bg-[#F8F6F2] hover:text-[#A51E2B]"
                    >
                      <span className="flex items-center gap-2.5">
                        <ShoppingBag className="w-4 h-4 text-[#85817C]" />
                        <span>Item Requests</span>
                      </span>
                      {pendingRequestsCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#EF6938] text-white rounded">
                          {pendingRequestsCount} new
                        </span>
                      )}
                    </Link>

                    <div className="border-t border-[#E9E3DC] mt-1 pt-1">
                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-[#242321] hover:text-[#A51E2B] transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/login?mode=signup"
                  className="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#242321] text-white hover:bg-black transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center md:hidden space-x-2">
            <Link
              to="/sell"
              className="p-1.5 text-white bg-[#A51E2B] rounded-md text-xs flex items-center gap-1 font-medium px-2.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Sell</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#242321] hover:bg-[#E9E3DC]/60 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E9E3DC] bg-[#F8F6F2] px-4 pt-3 pb-6 space-y-2">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    active
                      ? 'bg-[#E9E3DC]/60 text-[#A51E2B] font-semibold'
                      : 'text-[#242321] hover:bg-[#E9E3DC]/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-[#E9E3DC] pt-3 space-y-2">
            <Link
              to="/profile?tab=saved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-[#242321]"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#A51E2B]" />
                Saved Items
              </span>
              <span className="px-2 py-0.5 bg-[#E9E3DC] rounded text-xs">
                {favourites.length}
              </span>
            </Link>

            {isAuthenticated && user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium text-[#242321]"
                >
                  <img
                    src={user.avatar}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567168544646-208fa5d408fb?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <span>My Profile ({user.name})</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-rose-700 hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 px-3 border border-[#E9E3DC] rounded-md text-sm font-medium text-[#242321]"
                >
                  Log In
                </Link>
                <Link
                  to="/login?mode=signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 px-3 bg-[#A51E2B] text-white rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
