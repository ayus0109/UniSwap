import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User as UserIcon, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_USERS } from '../data/mockData';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginAsDemo, loginWithEmail, registerUser, isAuthenticated, user } = useAuth();

  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [branch, setBranch] = useState('Computer Engineering');
  const [year, setYear] = useState('Second Year (SE)');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      if (!name.trim() || !email.trim()) {
        setError('Please fill in your name and college email.');
        return;
      }
      registerUser({
        name: name.trim(),
        email: email.trim(),
        branch,
        year
      });
      navigate('/marketplace');
    } else {
      if (!email.trim()) {
        setError('Please enter your college email or use 1-Click Demo Login.');
        return;
      }
      loginWithEmail(email, name);
      navigate('/marketplace');
    }
  };

  const handleDemoLogin = (userId: string) => {
    loginAsDemo(userId);
    navigate('/marketplace');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 sm:py-16 font-body space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-[#A51E2B] text-white flex items-center justify-center font-heading font-extrabold text-2xl mx-auto shadow-warm">
          U
        </div>
        <h1 className="font-heading font-extrabold text-3xl text-[#242321] tracking-tight">
          {isSignUp ? 'Create Student Account' : 'Student Sign In'}
        </h1>
        <p className="text-xs sm:text-sm text-[#85817C] max-w-sm mx-auto">
          Pilot Campus: <strong>MIT Academy of Engineering, Alandi, Pune</strong>
        </p>
      </div>

      {/* 1-Click Quick Demo Login Box */}
      <div className="bg-gradient-to-br from-[#FDF2F3] to-[#FEF5F1] rounded-2xl border-2 border-[#A51E2B]/20 p-5 shadow-warm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A51E2B] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#EF6938]" />
            <span>Instant Demo Access (Recommended)</span>
          </span>
          <span className="text-[10px] bg-[#A51E2B] text-white px-2 py-0.5 rounded font-semibold">
            One-Click
          </span>
        </div>
        <p className="text-xs text-[#242321]">
          No real password needed for venture project evaluation. Log in as one of our simulated MITAOE student personas:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {SAMPLE_USERS.slice(0, 2).map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleDemoLogin(sample.id)}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#E9E3DC] hover:border-[#A51E2B] hover:shadow-warm transition-all text-left group"
            >
              <img
                src={sample.avatar}
                alt={sample.name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-[#E9E3DC]"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#242321] group-hover:text-[#A51E2B] truncate">
                  {sample.name}
                </p>
                <p className="text-[10px] text-[#85817C] truncate">
                  {sample.branch}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white rounded-2xl border border-[#E9E3DC] p-6 sm:p-8 shadow-warm space-y-6">
        {/* Toggle Sign In / Sign Up */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#F8F6F2] rounded-xl border border-[#E9E3DC]">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(''); }}
            className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              !isSignUp ? 'bg-white text-[#A51E2B] shadow-sm' : 'text-[#85817C]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(''); }}
            className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              isSignUp ? 'bg-white text-[#A51E2B] shadow-sm' : 'text-[#85817C]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                Student Full Name *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#85817C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sahil Shinde"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
              College Email (@mitaoe.ac.in) *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#85817C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student.name@mitaoe.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
              />
            </div>
          </div>

          {isSignUp && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2]"
                >
                  <option value="Computer Engineering">Computer Engg</option>
                  <option value="Electronics & Telecom">ENTC</option>
                  <option value="Mechanical Engineering">Mechanical</option>
                  <option value="Chemical Engineering">Chemical</option>
                  <option value="First Year Common">First Year (FE)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                  Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2]"
                >
                  <option value="First Year (FE)">FE (1st Year)</option>
                  <option value="Second Year (SE)">SE (2nd Year)</option>
                  <option value="Third Year (TE)">TE (3rd Year)</option>
                  <option value="Final Year (BE)">BE (Final Year)</option>
                </select>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                Password *
              </label>
              <span className="text-[10px] text-[#85817C]">Demo Mode: Any text</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#85817C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#A51E2B] hover:bg-[#851621] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-warm flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Create My Account' : 'Sign In as Student'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Prototype Verification Simulation Notice */}
        <div className="pt-2 border-t border-[#E9E3DC] flex items-start gap-2.5 text-xs text-[#85817C]">
          <Info className="w-4 h-4 shrink-0 text-[#EF6938] mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>Prototype Disclaimer:</strong> Student identity and email verification is simulated for demonstration purposes. No paid email OTP or external auth services are required.
          </p>
        </div>
      </div>
    </div>
  );
};
