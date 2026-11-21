import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  RefreshCw, 
  ShoppingBag, 
  Gift, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  Sparkles,
  Building,
  GraduationCap
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { RequestModal } from '../components/marketplace/RequestModal';
import { ProductCard } from '../components/marketplace/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, getProductById, isFavourite, toggleFavourite } = useMarketplace();
  const { user } = useAuth();

  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const product = id ? getProductById(id) : undefined;
  const saved = product ? isFavourite(product.id) : false;

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-heading font-extrabold text-2xl text-[#242321]">
          Item Not Found
        </h2>
        <p className="text-sm text-[#85817C]">
          The product listing you are looking for may have been completed, exchanged, or removed by the seller.
        </p>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#A51E2B] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Find 3 similar products in same category
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const isOwner = user && user.id === product.sellerId;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 font-body">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#85817C] hover:text-[#A51E2B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Items</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E9E3DC] bg-white text-xs font-medium text-[#242321] hover:bg-[#F8F6F2] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Item'}</span>
          </button>
          
          <button
            onClick={() => toggleFavourite(product.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              saved 
                ? 'bg-rose-50 border-rose-200 text-[#A51E2B]' 
                : 'border-[#E9E3DC] bg-white text-[#242321] hover:bg-[#F8F6F2]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-[#A51E2B]' : ''}`} />
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Gallery + Right Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Product Image Section (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F8F6F2] border border-[#E9E3DC] shadow-warm">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.listingType === 'Donate' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#E8EFE8] text-[#2C4A2E] border border-[#CDE0CD] shadow-sm">
                  <Gift className="w-3.5 h-3.5" />
                  Free Donation
                </span>
              ) : product.listingType === 'Exchange' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200 shadow-sm">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Campus Exchange
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#242321] text-white shadow-sm">
                  For Sale
                </span>
              )}

              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-sm text-[#242321] border border-[#E9E3DC] shadow-sm">
                Condition: {product.condition}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-[#242321]/80 backdrop-blur-md rounded-xl p-3 text-white text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EF6938]" />
                <span>Preferred Hand-off: <strong>{product.preferredMeetup}</strong></span>
              </div>
              <span className="text-white/70 text-[11px]">MITAOE Alandi</span>
            </div>
          </div>

          {/* Condition Inspector Box */}
          <div className="p-4 rounded-xl bg-white border border-[#E9E3DC] space-y-2 text-xs">
            <h4 className="font-heading font-bold text-[#242321] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Condition Assessment: {product.condition}</span>
            </h4>
            <p className="text-[#85817C] leading-relaxed">
              {product.condition === 'Brand New' && 'Unused item, original packaging or completely intact with zero wear.'}
              {product.condition === 'Like New' && 'Practically new, minimal to zero cosmetic marks, fully functional.'}
              {product.condition === 'Good' && 'Gently used in previous semester. Minor cosmetic wear, all features or pages completely intact.'}
              {product.condition === 'Fair' && 'Shows visible wear or pencil markings, but 100% usable for college coursework.'}
            </p>
          </div>
        </div>

        {/* Right: Product Details & Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Category & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EF6938] bg-[#EF6938]/10 px-2 py-0.5 rounded">
                {product.category}
              </span>
              <span className="text-xs text-[#85817C]">•</span>
              <span className="text-xs text-[#85817C] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Listed {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#242321] leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Pricing Row */}
          <div className="p-5 rounded-2xl bg-white border border-[#E9E3DC] shadow-warm-sm space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs font-semibold text-[#85817C] block uppercase tracking-wider">
                  Campus Price
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  {product.listingType === 'Donate' ? (
                    <span className="font-heading text-3xl font-extrabold text-[#2C4A2E]">
                      Free (₹0)
                    </span>
                  ) : (
                    <>
                      <span className="font-heading text-3xl font-extrabold text-[#A51E2B]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-[#85817C]">INR</span>
                    </>
                  )}
                </div>
              </div>

              {product.listingType === 'Exchange' && (
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-1 rounded block">
                    Trade Preferred
                  </span>
                </div>
              )}
            </div>

            {/* Exchange Requirement Notice */}
            {product.listingType === 'Exchange' && product.desiredExchangeItem && (
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-purple-700" />
                  <span>Seller wants in exchange:</span>
                </p>
                <p className="font-medium">{product.desiredExchangeItem}</p>
              </div>
            )}

            {/* Main Action Buttons */}
            <div className="pt-2">
              {isOwner ? (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 text-center">
                  This is your listing. You can manage or delete it in your{' '}
                  <Link to="/profile" className="font-bold underline text-[#A51E2B]">
                    Student Dashboard
                  </Link>.
                </div>
              ) : (
                <button
                  onClick={() => setRequestModalOpen(true)}
                  className={`w-full py-3.5 rounded-xl font-heading font-bold text-sm uppercase tracking-wider transition-all shadow-warm flex items-center justify-center gap-2 ${
                    product.listingType === 'Donate'
                      ? 'bg-[#2C4A2E] hover:bg-[#1E341F] text-white'
                      : product.listingType === 'Exchange'
                      ? 'bg-purple-800 hover:bg-purple-900 text-white'
                      : 'bg-[#A51E2B] hover:bg-[#851621] text-white'
                  }`}
                >
                  {product.listingType === 'Donate' ? (
                    <>
                      <Gift className="w-4 h-4" />
                      <span>Request Free Claim</span>
                    </>
                  ) : product.listingType === 'Exchange' ? (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>Request Exchange</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Request to Buy (Meet on Campus)</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <p className="text-[11px] text-[#85817C] text-center">
              Direct student-to-student handover • No advance payment required
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#242321]">
              Item Description & Syllabus Notes
            </h3>
            <div className="p-4 rounded-xl bg-white border border-[#E9E3DC] text-xs leading-relaxed text-[#242321] whitespace-pre-line">
              {product.description}
            </div>
          </div>

          {/* Seller Profile Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E9E3DC] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#85817C]">
                Seller Information
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Student
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              {product.sellerAvatar ? (
                <img
                  src={product.sellerAvatar}
                  alt={product.sellerName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#E9E3DC]"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#A51E2B] text-white font-heading font-bold text-lg flex items-center justify-center">
                  {product.sellerName[0]}
                </div>
              )}

              <div className="min-w-0">
                <h4 className="font-heading font-bold text-sm text-[#242321]">
                  {product.sellerName}
                </h4>
                <p className="text-xs text-[#85817C]">
                  {product.sellerBranch} • {product.sellerYear}
                </p>
                <p className="text-[11px] text-[#85817C] flex items-center gap-1 mt-0.5">
                  <GraduationCap className="w-3 h-3 text-[#EF6938]" />
                  <span>MIT Academy of Engineering, Pune</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E9E3DC] grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F8F6F2] p-2.5 rounded-lg">
                <span className="text-[#85817C] block text-[10px]">Campus Trust Score</span>
                <span className="font-extrabold text-[#242321] text-sm">98% Positive</span>
              </div>
              <div className="bg-[#F8F6F2] p-2.5 rounded-lg">
                <span className="text-[#85817C] block text-[10px]">Response Time</span>
                <span className="font-extrabold text-[#242321] text-sm">&lt; 30 Mins</span>
              </div>
            </div>
          </div>

          {/* Safety & Hand-off Reminder */}
          <div className="p-4 rounded-xl bg-[#E8EFE8] border border-[#CDE0CD] flex items-start gap-3 text-xs text-[#2C4A2E]">
            <Building className="w-5 h-5 shrink-0 text-[#2C4A2E] mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Campus Meetup Recommendation</span>
              <p className="leading-relaxed text-[11px]">
                Coordinate to meet at <strong>{product.preferredMeetup}</strong> during day hours. Inspect books, calculator keys or lab kit before concluding the exchange.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Similar Items Section */}
      {similarProducts.length > 0 && (
        <section className="pt-8 border-t border-[#E9E3DC] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-xl text-[#242321]">
              More from {product.category}
            </h3>
            <Link
              to={`/marketplace?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-bold text-[#A51E2B] hover:underline"
            >
              View all in {product.category} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Request Modal */}
      <RequestModal
        product={product}
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
      />
    </div>
  );
};
