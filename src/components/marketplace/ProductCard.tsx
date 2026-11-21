import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, ArrowRight, RefreshCw, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isFavourite, toggleFavourite } = useMarketplace();
  const saved = isFavourite(product.id);

  const getConditionColor = (cond: Product['condition']) => {
    switch (cond) {
      case 'Brand New':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Like New':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Good':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Fair':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  const getListingBadge = () => {
    if (product.listingType === 'Donate') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8EFE8] text-[#2C4A2E] border border-[#CDE0CD]">
          <Gift className="w-3 h-3" />
          Free Donation
        </span>
      );
    }
    if (product.listingType === 'Exchange') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
          <RefreshCw className="w-3 h-3" />
          For Exchange
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F8F6F2] text-[#242321] border border-[#E9E3DC]">
        For Sale
      </span>
    );
  };

  return (
    <div className="group bg-white rounded-xl border border-[#E9E3DC] overflow-hidden hover:border-[#EF6938]/40 hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[4/3] bg-[#F8F6F2] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top Overlay Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            {getListingBadge()}
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${getConditionColor(product.condition)}`}>
              {product.condition}
            </span>
          </div>

          {/* Favourite button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavourite(product.id);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#242321] hover:text-[#A51E2B] transition-colors shadow-warm-sm z-10"
            title={saved ? 'Remove from saved' : 'Save item'}
            aria-label="Save item"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                saved ? 'fill-[#A51E2B] text-[#A51E2B]' : 'stroke-current'
              }`}
            />
          </button>

          {/* Category Tag bottom pill */}
          <div className="absolute bottom-2 left-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#242321]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5">
          {/* Price & Name */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-heading font-bold text-lg text-[#242321] group-hover:text-[#A51E2B] transition-colors line-clamp-1">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              {product.listingType === 'Donate' ? (
                <span className="font-heading text-lg font-extrabold text-[#2C4A2E]">
                  Free (₹0)
                </span>
              ) : (
                <>
                  <span className="font-heading text-xl font-extrabold text-[#A51E2B]">
                    ₹{product.price}
                  </span>
                  {product.listingType === 'Exchange' && (
                    <span className="text-xs text-[#85817C] font-medium">or Trade</span>
                  )}
                </>
              )}
            </div>

            {product.listingType === 'Exchange' && product.desiredExchangeItem && (
              <span className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded truncate max-w-[130px]" title={product.desiredExchangeItem}>
                Wants: {product.desiredExchangeItem}
              </span>
            )}
          </div>

          <p className="text-xs text-[#85817C] line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Seller & Campus Info */}
          <div className="pt-2 border-t border-[#E9E3DC]/70 flex items-center justify-between text-xs text-[#85817C]">
            <div className="flex items-center gap-2 truncate">
              {product.sellerAvatar ? (
                <img
                  src={product.sellerAvatar}
                  alt={product.sellerName}
                  className="w-5 h-5 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#E9E3DC] flex items-center justify-center font-bold text-[10px] text-[#242321]">
                  {product.sellerName[0]}
                </div>
              )}
              <span className="truncate text-[#242321] font-medium">
                {product.sellerName}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] shrink-0 text-[#85817C]">
              <MapPin className="w-3 h-3 text-[#EF6938]" />
              <span>MITAOE, Pune</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-0">
        <Link
          to={`/item/${product.id}`}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-[#242321] bg-[#F8F6F2] hover:bg-[#A51E2B] hover:text-white border border-[#E9E3DC] hover:border-[#A51E2B] transition-all group-hover:border-[#EF6938]/30"
        >
          <span>View Details & Request</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
