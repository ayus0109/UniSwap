import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw,
  ShoppingBag,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, ItemRequest } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CAMPUS_MEETUP_SPOTS } from '../../data/mockData';

interface RequestModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RequestModal: React.FC<RequestModalProps> = ({
  product,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user, isAuthenticated, loginAsDemo } = useAuth();
  const { createRequest } = useMarketplace();

  const [meetupLocation, setMeetupLocation] = useState(
    product.preferredMeetup || CAMPUS_MEETUP_SPOTS[0]
  );
  const [proposedDateTime, setProposedDateTime] = useState('Tomorrow during Lunch Break (1:15 PM - 2:00 PM)');
  const [exchangeItemOffered, setExchangeItemOffered] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('Please sign in as a student to send requests.');
      return;
    }

    if (product.listingType === 'Exchange' && !exchangeItemOffered.trim()) {
      setError('Please mention what book, tool or component you can offer in exchange.');
      return;
    }

    let requestType: 'Buy' | 'Exchange' | 'Donate' = 'Buy';
    if (product.listingType === 'Exchange') requestType = 'Exchange';
    if (product.listingType === 'Donate') requestType = 'Donate';

    createRequest({
      productId: product.id,
      productTitle: product.title,
      productPrice: product.price,
      productImageUrl: product.imageUrl,
      productListingType: product.listingType,
      requesterId: user.id,
      requesterName: user.name,
      requesterEmail: user.email,
      requesterBranch: `${user.branch} (${user.year})`,
      sellerId: product.sellerId,
      type: requestType,
      exchangeItemOffered: product.listingType === 'Exchange' ? exchangeItemOffered : undefined,
      meetupLocation,
      proposedDateTime,
      message: message || `Hi ${product.sellerName}, I am interested in this item. Let me know if the campus meetup time works for you!`
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore in environments without canvas
    }

    setSubmitted(true);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full border border-[#E9E3DC] shadow-warm-xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#F8F6F2] p-5 border-b border-[#E9E3DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#A51E2B] text-white flex items-center justify-center shadow-warm-sm">
              {product.listingType === 'Exchange' ? (
                <RefreshCw className="w-4 h-4" />
              ) : product.listingType === 'Donate' ? (
                <Gift className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-[#242321]">
                {product.listingType === 'Exchange'
                  ? 'Request Item Exchange'
                  : product.listingType === 'Donate'
                  ? 'Claim Free Donation'
                  : 'Send Purchase Request'}
              </h3>
              <p className="text-[11px] text-[#85817C]">
                Peer-to-peer campus transaction • Zero platform fees
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-md text-[#85817C] hover:text-[#242321] hover:bg-[#E9E3DC]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#E8EFE8] text-[#2C4A2E] rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="font-heading font-bold text-xl text-[#242321]">
                Request Sent Successfully!
              </h4>
              <p className="text-xs text-[#85817C] max-w-sm mx-auto">
                We've notified <span className="font-semibold text-[#242321]">{product.sellerName}</span> about your interest. You can track this under your Student Dashboard requests.
              </p>
            </div>

            <div className="bg-[#F8F6F2] rounded-xl p-4 text-left text-xs space-y-2 border border-[#E9E3DC]">
              <div className="flex justify-between">
                <span className="text-[#85817C]">Item:</span>
                <span className="font-semibold text-[#242321] truncate max-w-[200px]">{product.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85817C]">Meetup Spot:</span>
                <span className="font-medium text-[#242321]">{meetupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85817C]">Proposed Time:</span>
                <span className="font-medium text-[#242321]">{proposedDateTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#85817C]">Status:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                  Pending Seller Acceptance
                </span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-lg bg-[#242321] text-white font-semibold text-xs hover:bg-black transition-colors"
              >
                Close & Return to Item
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Product summary card */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F6F2] border border-[#E9E3DC]">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-14 h-14 rounded-lg object-cover border border-[#E9E3DC]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-[#242321] truncate">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm font-extrabold text-[#A51E2B]">
                    {product.listingType === 'Donate' ? 'Free (₹0)' : `₹${product.price}`}
                  </span>
                  <span className="text-[10px] text-[#85817C]">
                    Seller: {product.sellerName} ({product.sellerBranch})
                  </span>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                {error}
              </div>
            )}

            {/* Exchange Offer Field */}
            {product.listingType === 'Exchange' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#242321] flex items-center justify-between">
                  <span>What item are you offering in exchange? *</span>
                  <span className="text-[10px] font-normal text-purple-700">
                    Seller wants: {product.desiredExchangeItem || 'Academic materials'}
                  </span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2nd Year Discrete Mathematics book or ESP8266 Module"
                  value={exchangeItemOffered}
                  onChange={(e) => setExchangeItemOffered(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#E9E3DC] focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
                />
              </div>
            )}

            {/* Meetup Location selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#242321] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EF6938]" />
                <span>Campus Meetup Location</span>
              </label>
              <select
                value={meetupLocation}
                onChange={(e) => setMeetupLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E9E3DC] bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
              >
                {CAMPUS_MEETUP_SPOTS.map((spot) => (
                  <option key={spot} value={spot}>
                    {spot}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-[#85817C]">
                Always choose well-lit, public locations inside MITAOE campus.
              </p>
            </div>

            {/* Proposed Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#242321] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#EF6938]" />
                <span>Proposed Day & Time</span>
              </label>
              <input
                type="text"
                value={proposedDateTime}
                onChange={(e) => setProposedDateTime(e.target.value)}
                placeholder="e.g. Tomorrow 1:15 PM or Friday after 4 PM"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E9E3DC] focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
              />
            </div>

            {/* Optional Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#242321] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#85817C]" />
                <span>Note for Seller (Optional)</span>
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Can we meet near the reading hall? I have exact change or UPI ready."
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E9E3DC] focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
              />
            </div>

            {/* Safe campus note */}
            <div className="bg-[#E8EFE8] rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-[#2C4A2E] border border-[#CDE0CD]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#2C4A2E] mt-0.5" />
              <div>
                <span className="font-semibold">Safety Assurance: </span>
                No online payments are processed here. Inspect the item thoroughly in person on campus before handing over cash or completing exchange.
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-lg border border-[#E9E3DC] text-xs font-semibold text-[#85817C] hover:text-[#242321] hover:bg-[#F8F6F2] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-lg bg-[#A51E2B] hover:bg-[#851621] text-white text-xs font-bold uppercase tracking-wider shadow-warm transition-all"
              >
                Confirm & Send Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
