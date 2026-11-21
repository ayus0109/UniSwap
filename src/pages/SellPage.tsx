import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Image as ImageIcon, 
  Gift, 
  RefreshCw, 
  ShoppingBag,
  ArrowRight,
  Info,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Category, Condition, ListingType, Product } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { CAMPUS_MEETUP_SPOTS, PRESET_IMAGES } from '../data/mockData';

export const SellPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useMarketplace();
  const { user, isAuthenticated, loginAsDemo } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Books & Notes');
  const [listingType, setListingType] = useState<ListingType>('Sell');
  const [price, setPrice] = useState<number | ''>(150);
  const [desiredExchangeItem, setDesiredExchangeItem] = useState('');
  const [condition, setCondition] = useState<Condition>('Good');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [preferredMeetup, setPreferredMeetup] = useState(CAMPUS_MEETUP_SPOTS[0]);
  const [department, setDepartment] = useState('Computer Engineering');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [publishedProduct, setPublishedProduct] = useState<Product | null>(null);

  // Handle image upload from computer (FileReader base64)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be under 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setErrors(prev => ({ ...prev, image: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = 'Please enter a clear product title';
    if (!description.trim() || description.trim().length < 15) {
      newErrors.description = 'Please provide at least 15 characters of detail';
    }
    if (listingType === 'Sell' && (price === '' || price < 0)) {
      newErrors.price = 'Please enter a valid price in INR';
    }
    if (listingType === 'Exchange' && !desiredExchangeItem.trim()) {
      newErrors.desiredExchangeItem = 'Specify what you would like in exchange';
    }
    if (!imageUrl) {
      newErrors.image = 'Please upload an image or select a preset photo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Use current user or fallback to demo student
    const activeUser = user || {
      id: 'user-mitaoe-101',
      name: 'Rohan Sharma',
      branch: 'Computer Engineering',
      year: 'Third Year (TE)',
      avatar: 'https://images.unsplash.com/photo-1567168544646-208fa5d408fb?auto=format&fit=crop&q=80&w=800',
      campus: 'MIT Academy of Engineering, Pune'
    };

    const finalPrice = listingType === 'Donate' ? 0 : Number(price) || 0;

    const newProd = addProduct({
      title: title.trim(),
      description: description.trim(),
      price: finalPrice,
      category,
      condition,
      listingType,
      desiredExchangeItem: listingType === 'Exchange' ? desiredExchangeItem.trim() : undefined,
      imageUrl,
      sellerId: activeUser.id,
      sellerName: activeUser.name,
      sellerBranch: activeUser.branch,
      sellerYear: (activeUser as any).year || 'Student',
      sellerAvatar: activeUser.avatar,
      campus: 'MIT Academy of Engineering, Pune',
      department,
      preferredMeetup
    });

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setPublishedProduct(newProd);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-body">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#E9E3DC] p-6 sm:p-8 shadow-warm-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#A51E2B] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-[#EF6938]" />
            <span>Campus Circulation</span>
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#242321] tracking-tight">
            List an Item for Your Campus
          </h1>
          <p className="text-xs sm:text-sm text-[#85817C] mt-1">
            Sell your semester books, exchange lab equipment, or donate unused stationery to junior peers.
          </p>
        </div>

        {!isAuthenticated && (
          <div className="bg-[#E8EFE8] border border-[#CDE0CD] p-3 rounded-xl flex items-center gap-3 text-xs text-[#2C4A2E]">
            <Info className="w-4 h-4 shrink-0" />
            <span>Listing in Demo Student Mode (Rohan Sharma)</span>
          </div>
        )}
      </div>

      {publishedProduct ? (
        /* SUCCESS CONFIRMATION MODAL / VIEW */
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E9E3DC] p-8 sm:p-12 shadow-warm-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-[#E8EFE8] text-[#2C4A2E] rounded-full flex items-center justify-center mx-auto border-4 border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Listing Live on MITAOE Marketplace
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#242321]">
              "{publishedProduct.title}" is published!
            </h2>
            <p className="text-xs sm:text-sm text-[#85817C] max-w-md mx-auto">
              Your item is now visible to all students on campus. Students can find it in Browse Items and request a meetup at {publishedProduct.preferredMeetup}.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E9E3DC] flex items-center gap-4 text-left">
            <img
              src={publishedProduct.imageUrl}
              alt={publishedProduct.title}
              className="w-16 h-16 rounded-lg object-cover border border-[#E9E3DC]"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-[#242321] truncate">
                {publishedProduct.title}
              </h4>
              <p className="text-sm font-extrabold text-[#A51E2B] mt-0.5">
                {publishedProduct.listingType === 'Donate' ? 'Free (₹0)' : `₹${publishedProduct.price}`}
              </p>
              <p className="text-[11px] text-[#85817C]">
                Category: {publishedProduct.category} • Condition: {publishedProduct.condition}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={`/item/${publishedProduct.id}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#A51E2B] hover:bg-[#851621] text-white text-xs font-bold uppercase tracking-wider shadow-warm"
            >
              View Live Listing
            </Link>
            <Link
              to="/marketplace"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#242321] hover:bg-black text-white text-xs font-semibold"
            >
              Go to Marketplace
            </Link>
            <button
              onClick={() => {
                setPublishedProduct(null);
                setTitle('');
                setDescription('');
                setPrice(150);
                setDesiredExchangeItem('');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E9E3DC] text-xs font-semibold text-[#85817C] hover:text-[#242321]"
            >
              List Another Item
            </button>
          </div>
        </div>
      ) : (
        /* MAIN LISTING FORM + LIVE PREVIEW GRID */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form (8 cols) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-2xl border border-[#E9E3DC] p-6 sm:p-8 shadow-warm-sm space-y-6">
            
            {/* 1. Listing Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#85817C] block">
                1. Select Listing Type *
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setListingType('Sell');
                    if (price === 0) setPrice(150);
                  }}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    listingType === 'Sell'
                      ? 'bg-[#A51E2B] text-white border-[#A51E2B] shadow-warm-sm'
                      : 'bg-[#F8F6F2] text-[#242321] border-[#E9E3DC] hover:border-[#EF6938]'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-xs font-bold">Sell</span>
                  <span className={`text-[10px] ${listingType === 'Sell' ? 'text-white/80' : 'text-[#85817C]'}`}>
                    Set cash price
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setListingType('Exchange')}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    listingType === 'Exchange'
                      ? 'bg-purple-800 text-white border-purple-800 shadow-warm-sm'
                      : 'bg-[#F8F6F2] text-[#242321] border-[#E9E3DC] hover:border-purple-400'
                  }`}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span className="text-xs font-bold">Exchange</span>
                  <span className={`text-[10px] ${listingType === 'Exchange' ? 'text-white/80' : 'text-[#85817C]'}`}>
                    Item for item
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setListingType('Donate');
                    setPrice(0);
                  }}
                  className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    listingType === 'Donate'
                      ? 'bg-[#2C4A2E] text-white border-[#2C4A2E] shadow-warm-sm'
                      : 'bg-[#F8F6F2] text-[#242321] border-[#E9E3DC] hover:border-emerald-400'
                  }`}
                >
                  <Gift className="w-5 h-5" />
                  <span className="text-xs font-bold">Donate</span>
                  <span className={`text-[10px] ${listingType === 'Donate' ? 'text-white/80' : 'text-[#85817C]'}`}>
                    ₹0 (Free giveaway)
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Product Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                Product Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Higher Engineering Mathematics - B.S. Grewal (44th Ed)"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
              />
              {errors.title && <p className="text-xs text-rose-600">{errors.title}</p>}
            </div>

            {/* 3. Category & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
                >
                  <option value="Books & Notes">Books & Notes</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Lab Equipment">Lab Equipment</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Other Supplies">Other Supplies</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as Condition)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
                >
                  <option value="Brand New">Brand New (Unopened / Pristine)</option>
                  <option value="Like New">Like New (Barely used)</option>
                  <option value="Good">Good (Minor wear, fully functional)</option>
                  <option value="Fair">Fair (Noticeable wear, still usable)</option>
                </select>
              </div>
            </div>

            {/* 4. Price & Exchange details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                  Price (INR ₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#85817C]">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    disabled={listingType === 'Donate'}
                    value={listingType === 'Donate' ? 0 : price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0"
                    className="w-full pl-8 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E9E3DC] bg-[#F8F6F2] disabled:opacity-60 disabled:cursor-not-allowed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
                  />
                </div>
                {listingType === 'Donate' && (
                  <p className="text-[11px] text-[#2C4A2E] font-medium">
                    Donations are listed as ₹0 (Free for fellow students)
                  </p>
                )}
                {errors.price && <p className="text-xs text-rose-600">{errors.price}</p>}
              </div>

              {listingType === 'Exchange' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-900 block">
                    Desired Exchange Item *
                  </label>
                  <input
                    type="text"
                    required
                    value={desiredExchangeItem}
                    onChange={(e) => setDesiredExchangeItem(e.target.value)}
                    placeholder="e.g. Scientific Calculator or FE Drafter"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-purple-300 bg-purple-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  {errors.desiredExchangeItem && (
                    <p className="text-xs text-rose-600">{errors.desiredExchangeItem}</p>
                  )}
                </div>
              )}
            </div>

            {/* 5. Product Image: File upload + Presets */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                Product Image *
              </label>

              {/* Upload file box */}
              <div className="border-2 border-dashed border-[#E9E3DC] hover:border-[#EF6938] rounded-2xl p-4 bg-[#F8F6F2] text-center space-y-2 transition-colors">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E9E3DC] text-xs font-semibold text-[#242321] hover:bg-[#F8F6F2] shadow-warm-sm"
                >
                  <Upload className="w-4 h-4 text-[#A51E2B]" />
                  <span>Choose file from device</span>
                </label>
                <p className="text-[11px] text-[#85817C]">
                  PNG, JPG, WebP up to 5MB. Or pick a sample photo below:
                </p>

                {/* Preset image selector for quick demo testing */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`text-[10px] px-2.5 py-1 rounded-md border transition-all ${
                        imageUrl === preset.url
                          ? 'bg-[#242321] text-white border-[#242321]'
                          : 'bg-white text-[#85817C] border-[#E9E3DC] hover:border-[#85817C]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              {errors.image && <p className="text-xs text-rose-600">{errors.image}</p>}
            </div>

            {/* 6. Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                Description & Course Details *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe edition, highlighting, condition, semester relevance (e.g. FE Sem 2, SPPU syllabus)..."
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
              />
              {errors.description && (
                <p className="text-xs text-rose-600">{errors.description}</p>
              )}
            </div>

            {/* 7. Preferred Meetup Spot */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242321] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EF6938]" />
                <span>Preferred Campus Hand-off Location *</span>
              </label>
              <select
                value={preferredMeetup}
                onChange={(e) => setPreferredMeetup(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A51E2B]/20 focus:border-[#A51E2B]"
              >
                {CAMPUS_MEETUP_SPOTS.map((spot) => (
                  <option key={spot} value={spot}>{spot}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#E9E3DC]">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#A51E2B] hover:bg-[#851621] text-white font-heading font-bold text-sm uppercase tracking-wider shadow-warm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#EF6938]" />
                <span>Publish Listing to MITAOE Campus</span>
              </button>
            </div>
          </form>

          {/* Right Live Preview Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-[#242321] uppercase tracking-wider">
                Live Preview Card
              </h3>
              <span className="text-[11px] text-[#85817C]">
                How students will see it
              </span>
            </div>

            {/* Simulated Product Card */}
            <div className="bg-white rounded-2xl border border-[#E9E3DC] overflow-hidden shadow-warm-lg">
              <div className="relative aspect-[4/3] bg-[#F8F6F2]">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    listingType === 'Donate' 
                      ? 'bg-[#E8EFE8] text-[#2C4A2E]' 
                      : listingType === 'Exchange' 
                      ? 'bg-purple-100 text-purple-900' 
                      : 'bg-[#242321] text-white'
                  }`}>
                    {listingType === 'Donate' ? 'Free Donation' : listingType === 'Exchange' ? 'Exchange' : 'For Sale'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/90 text-[#242321] border border-[#E9E3DC]">
                    {condition}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#242321]/80 text-white px-2 py-0.5 rounded">
                    {category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h4 className="font-heading font-bold text-base text-[#242321] line-clamp-1">
                  {title || 'Your Product Title Goes Here'}
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-xl font-extrabold text-[#A51E2B]">
                    {listingType === 'Donate' ? 'Free (₹0)' : `₹${price || 0}`}
                  </span>
                  {listingType === 'Exchange' && desiredExchangeItem && (
                    <span className="text-[11px] text-purple-700 font-medium">
                      (Wants: {desiredExchangeItem})
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#85817C] line-clamp-2">
                  {description || 'Product description, condition notes, and syllabus details will appear here.'}
                </p>

                <div className="pt-2 border-t border-[#E9E3DC] flex items-center justify-between text-xs text-[#85817C]">
                  <span>{user ? user.name : 'Rohan Sharma'}</span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-[#EF6938]" />
                    {preferredMeetup.split('(')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Campus guidelines card */}
            <div className="p-4 rounded-xl bg-[#F8F6F2] border border-[#E9E3DC] space-y-2 text-xs text-[#85817C]">
              <div className="font-bold text-[#242321] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>UniSwap Campus Listing Policy</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px]">
                <li>Only academic and hostel-relevant items are permitted.</li>
                <li>Ensure accurate representation of book edition and calculator state.</li>
                <li>Free donations help students in financial need and earn campus trust badges.</li>
              </ul>
            </div>

          </div>

        </div>
      )}
    </div>
  );
};
