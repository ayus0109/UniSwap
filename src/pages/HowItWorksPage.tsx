import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Leaf, 
  Coins, 
  Users, 
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { CAMPUS_MEETUP_SPOTS, CAMPUS_STATS } from '../data/mockData';

export const HowItWorksPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I have to pay online or enter credit card details?',
      a: 'No. UniSwap strictly operates on safe, in-person campus exchanges. When you request an item, you propose a meetup spot on campus (like the Central Library or Nescafe Canteen). You inspect the textbook or device in person before paying with cash or UPI.'
    },
    {
      q: 'How does item exchange (barter) work?',
      a: 'When a student lists an item as "For Exchange", they specify what they need (e.g. trading an Arduino kit for a Scientific Calculator). Interested students submit what they can trade, and both agree on a campus meetup to swap items.'
    },
    {
      q: 'Can I give away items for free (Donations)?',
      a: 'Yes! Select the "Donate" listing type. The price will automatically lock at ₹0. Donations help juniors who cannot afford new materials and earn you campus trust karma.'
    },
    {
      q: 'Where do students meet on the MITAOE campus?',
      a: 'We recommend well-lit, public spots during college hours (9:00 AM - 5:30 PM): Central Library Ground Floor Reading Hall, Nescafe Canteen & Amphitheater, Main Building Foyer, and Gate No. 1 security booth.'
    },
    {
      q: 'What is the Wadhwani Foundation Venture Viability connection?',
      a: 'UniSwap is an entrepreneurial initiative developed under the Wadhwani Foundation Venture Viability framework, targeting sustainability, circular campus resource economics, and reducing students\' cost of engineering education.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 font-body">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#A51E2B] bg-[#A51E2B]/10 px-3 py-1 rounded-full border border-[#A51E2B]/20">
          Campus Peer-to-Peer Protocol
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#242321] tracking-tight">
          How UniSwap Works on Campus
        </h1>
        <p className="text-sm sm:text-base text-[#85817C] leading-relaxed">
          Designed specifically for college students: buy, sell, exchange and donate study essentials without shipping costs, courier delays, or stranger danger.
        </p>
      </div>

      {/* 3 Step Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl border border-[#E9E3DC] p-8 shadow-warm-sm space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-[#A51E2B] text-white font-heading font-extrabold text-xl flex items-center justify-center shadow-warm">
            1
          </div>
          <h3 className="font-heading font-bold text-xl text-[#242321]">
            1. Discover
          </h3>
          <p className="text-xs sm:text-sm text-[#85817C] leading-relaxed">
            Browse verified listings from students in your department or senior batches. Filter by course, branch, price range, and condition (Brand New to Fair).
          </p>
          <div className="pt-2 text-xs font-semibold text-[#A51E2B] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Search by semester syllabus</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E9E3DC] p-8 shadow-warm-sm space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-[#EF6938] text-white font-heading font-extrabold text-xl flex items-center justify-center shadow-warm">
            2
          </div>
          <h3 className="font-heading font-bold text-xl text-[#242321]">
            2. Connect
          </h3>
          <p className="text-xs sm:text-sm text-[#85817C] leading-relaxed">
            Click "Request to Buy", propose an item exchange, or request a donation. Choose your preferred campus location (Library, Canteen, Foyer) and proposed day & time.
          </p>
          <div className="pt-2 text-xs font-semibold text-[#EF6938] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Direct campus meetup proposal</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E9E3DC] p-8 shadow-warm-sm space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-[#242321] text-white font-heading font-extrabold text-xl flex items-center justify-center shadow-warm">
            3
          </div>
          <h3 className="font-heading font-bold text-xl text-[#242321]">
            3. Exchange
          </h3>
          <p className="text-xs sm:text-sm text-[#85817C] leading-relaxed">
            Meet between lectures, inspect the book or instrument to make sure it matches the description, and pay via UPI or cash. Zero commissions, zero waste.
          </p>
          <div className="pt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Instant handoff & inspection</span>
          </div>
        </div>
      </div>

      {/* Safety Guidelines */}
      <div className="bg-white rounded-2xl border border-[#E9E3DC] p-8 shadow-warm space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#A51E2B]" />
          <h2 className="font-heading font-extrabold text-2xl text-[#242321]">
            Campus Safety & Code of Conduct
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-5 rounded-xl bg-[#F8F6F2] border border-[#E9E3DC] space-y-2">
            <h4 className="font-heading font-bold text-[#242321] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#EF6938]" />
              <span>Recommended Meetup Spots at MITAOE</span>
            </h4>
            <p className="text-[#85817C] leading-relaxed">
              Always schedule trades in public campus zones:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-[#242321]">
              {CAMPUS_MEETUP_SPOTS.slice(0, 4).map((spot, i) => (
                <li key={i}>{spot}</li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-[#E8EFE8] border border-[#CDE0CD] space-y-2 text-[#2C4A2E]">
            <h4 className="font-heading font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Best Practices for Buyers & Sellers</span>
            </h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Test electronics (calculators, pen drives) on your laptop or power outlet before parting.</li>
              <li>Check book editions and syllabus coverage.</li>
              <li>Be punctual for lunch break or practical break meetups.</li>
              <li>Never wire funds in advance before meeting in person.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sustainability & Venture Impact */}
      <div className="bg-[#242321] text-white rounded-2xl p-8 sm:p-12 space-y-6 border border-[#383633]">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EF6938]">
            Circular Campus Impact
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            The Economics of Student Resource Circulation
          </h2>
          <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
            Every engineering student buys an average of ₹4,500 worth of textbooks, drafters and lab coats in their first year alone. 80% of these materials are only needed for a single semester.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          {CAMPUS_STATS.map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="font-heading font-extrabold text-2xl text-[#EF6938]">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-white">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion FAQ */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="text-center space-y-1 mb-8">
          <h3 className="font-heading font-extrabold text-2xl text-[#242321]">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-[#85817C]">
            Everything you need to know about trading on UniSwap.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#E9E3DC] overflow-hidden transition-all shadow-warm-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm text-[#242321] hover:text-[#A51E2B]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#A51E2B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#85817C] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#85817C] leading-relaxed border-t border-[#E9E3DC]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-8 space-y-4">
        <h4 className="font-heading font-bold text-xl text-[#242321]">
          Ready to experience the campus marketplace?
        </h4>
        <div className="flex items-center justify-center gap-3">
          <Link
            to="/marketplace"
            className="px-6 py-3 rounded-xl bg-[#A51E2B] hover:bg-[#851621] text-white text-xs font-bold uppercase tracking-wider shadow-warm"
          >
            Browse All Items
          </Link>
          <Link
            to="/sell"
            className="px-6 py-3 rounded-xl bg-white border border-[#E9E3DC] text-[#242321] text-xs font-semibold hover:bg-[#F8F6F2]"
          >
            List an Item Now
          </Link>
        </div>
      </div>
    </div>
  );
};
