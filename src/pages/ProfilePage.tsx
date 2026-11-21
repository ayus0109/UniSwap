import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  ShoppingBag, 
  Heart, 
  MessageSquare, 
  Edit3, 
  Trash2, 
  PlusCircle, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  LogOut, 
  Save, 
  ArrowRight,
  PackageOpen,
  Calendar,
  Gift,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from '../components/marketplace/ProductCard';
import { CAMPUS_MEETUP_SPOTS } from '../data/mockData';

export const ProfilePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile, loginAsDemo } = useAuth();
  const { 
    products, 
    favourites, 
    requests, 
    deleteProduct, 
    updateRequestStatus,
    getUserListings,
    getUserRequestsSent,
    getUserRequestsReceived
  } = useMarketplace();

  const initialTab = searchParams.get('tab') || 'listings';
  const [activeTab, setActiveTab] = useState<'listings' | 'saved' | 'requests' | 'edit'>(
    initialTab as any
  );

  // Edit form state
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editMeetup, setEditMeetup] = useState(user?.preferredMeetup || CAMPUS_MEETUP_SPOTS[0]);
  const [editBranch, setEditBranch] = useState(user?.branch || '');
  const [editSavedSuccess, setEditSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditPhone(user.phone || '');
      setEditBio(user.bio || '');
      setEditMeetup(user.preferredMeetup || CAMPUS_MEETUP_SPOTS[0]);
      setEditBranch(user.branch || '');
    }
  }, [user]);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['listings', 'saved', 'requests', 'edit'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'listings' | 'saved' | 'requests' | 'edit') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#A51E2B]/10 text-[#A51E2B] flex items-center justify-center mx-auto">
          <UserIcon className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-[#242321]">
          Sign In to Access Dashboard
        </h2>
        <p className="text-xs text-[#85817C]">
          Manage your campus listings, view requests, and check saved items.
        </p>
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => loginAsDemo()}
            className="w-full py-2.5 rounded-xl bg-[#A51E2B] text-white text-xs font-bold uppercase tracking-wider shadow-warm"
          >
            1-Click Demo Login
          </button>
          <Link
            to="/login"
            className="w-full py-2.5 rounded-xl border border-[#E9E3DC] text-xs font-semibold text-[#242321] hover:bg-[#F8F6F2]"
          >
            Go to Login Page
          </Link>
        </div>
      </div>
    );
  }

  // Get user items
  const myListings = getUserListings(user.id);
  const mySavedProducts = products.filter(p => favourites.includes(p.id));
  const myRequestsSent = getUserRequestsSent(user.id);
  const myRequestsReceived = getUserRequestsReceived(user.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      bio: editBio,
      preferredMeetup: editMeetup,
      branch: editBranch
    });
    setEditSavedSuccess(true);
    setTimeout(() => setEditSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-body">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-[#E9E3DC] p-6 sm:p-8 shadow-warm-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#E9E3DC]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567168544646-208fa5d408fb?auto=format&fit=crop&q=80&w=800';
              }}
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white" title="Verified Campus Student">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading font-extrabold text-2xl text-[#242321]">
                {user.name}
              </h1>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Verified Student
              </span>
            </div>

            <p className="text-xs text-[#85817C]">
              {user.email} • {user.branch} ({user.year})
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#85817C] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#EF6938]" />
                {user.preferredMeetup}
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">
                {user.trustScore}% Campus Trust
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link
            to="/sell"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-[#A51E2B] hover:bg-[#851621] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-warm flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Item</span>
          </Link>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl border border-[#E9E3DC] text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E9E3DC] pb-px overflow-x-auto">
        <button
          onClick={() => handleTabChange('listings')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'listings'
              ? 'border-[#A51E2B] text-[#A51E2B]'
              : 'border-transparent text-[#85817C] hover:text-[#242321]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Listings ({myListings.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('saved')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'saved'
              ? 'border-[#A51E2B] text-[#A51E2B]'
              : 'border-transparent text-[#85817C] hover:text-[#242321]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Items ({mySavedProducts.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('requests')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'requests'
              ? 'border-[#A51E2B] text-[#A51E2B]'
              : 'border-transparent text-[#85817C] hover:text-[#242321]'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Item Requests ({myRequestsSent.length + myRequestsReceived.length})</span>
        </button>

        <button
          onClick={() => handleTabChange('edit')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all shrink-0 ${
            activeTab === 'edit'
              ? 'border-[#A51E2B] text-[#A51E2B]'
              : 'border-transparent text-[#85817C] hover:text-[#242321]'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Tab 1: My Active Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#242321]">
              Items You've Listed on Campus
            </h3>
            <Link
              to="/sell"
              className="text-xs font-bold text-[#A51E2B] hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add New Item</span>
            </Link>
          </div>

          {myListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-[#E9E3DC] p-4 flex flex-col justify-between shadow-warm-sm space-y-4"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[#F8F6F2]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#242321] text-white">
                          {item.listingType}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white text-[#242321]">
                          {item.condition}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#242321] line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="font-extrabold text-[#A51E2B] text-base mt-0.5">
                        {item.listingType === 'Donate' ? 'Free (₹0)' : `₹${item.price}`}
                      </p>
                      <p className="text-[11px] text-[#85817C] line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E9E3DC] flex items-center justify-between gap-2">
                    <Link
                      to={`/item/${item.id}`}
                      className="px-3 py-1.5 rounded-lg border border-[#E9E3DC] hover:border-[#242321] text-xs font-semibold text-[#242321]"
                    >
                      View Live
                    </Link>

                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
                          deleteProduct(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1 text-xs font-semibold"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E9E3DC] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F8F6F2] border border-[#E9E3DC] flex items-center justify-center mx-auto text-[#85817C]">
                <PackageOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-lg text-[#242321]">
                  You have not listed any items yet
                </h4>
                <p className="text-xs text-[#85817C] max-w-sm mx-auto">
                  Have textbooks, drawing tools or electronics you no longer use? List them to earn cash or pass them on to junior peers.
                </p>
              </div>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A51E2B] text-white text-xs font-bold uppercase tracking-wider shadow-warm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>List Your First Item</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved / Favourites */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#242321]">
              Your Saved Study Materials ({mySavedProducts.length})
            </h3>
            <Link
              to="/marketplace"
              className="text-xs font-bold text-[#A51E2B] hover:underline"
            >
              Browse more items &rarr;
            </Link>
          </div>

          {mySavedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mySavedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E9E3DC] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-lg text-[#242321]">
                  No saved items in your list
                </h4>
                <p className="text-xs text-[#85817C] max-w-sm mx-auto">
                  Click the heart icon on any product in the marketplace to keep track of books, drafters, or notes you want to review later.
                </p>
              </div>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#242321] text-white text-xs font-semibold"
              >
                <span>Browse Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Item Requests (Sent & Received) */}
      {activeTab === 'requests' && (
        <div className="space-y-8">
          {/* Requests Received (as Seller) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-[#242321]">
                  Requests Received on Your Listings
                </h3>
                <p className="text-xs text-[#85817C]">
                  Students requesting to buy or exchange items you have listed.
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-[#EF6938]/10 text-[#EF6938] rounded">
                {myRequestsReceived.length} Incoming
              </span>
            </div>

            {myRequestsReceived.length > 0 ? (
              <div className="space-y-3">
                {myRequestsReceived.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-xl border border-[#E9E3DC] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-warm-sm"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={req.productImageUrl}
                        alt={req.productTitle}
                        className="w-14 h-14 rounded-lg object-cover border border-[#E9E3DC]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#242321]">{req.productTitle}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F8F6F2] text-[#85817C]">
                            {req.type} Request
                          </span>
                        </div>
                        <p className="text-xs text-[#85817C]">
                          From: <strong>{req.requesterName}</strong> ({req.requesterBranch}) • {req.requesterEmail}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#242321] pt-0.5">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#EF6938]" />
                            Meetup: {req.meetupLocation}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#85817C]" />
                            {req.proposedDateTime}
                          </span>
                        </div>
                        {req.exchangeItemOffered && (
                          <p className="text-xs text-purple-800 bg-purple-50 p-2 rounded-lg mt-1">
                            <strong>Trade Offered:</strong> {req.exchangeItemOffered}
                          </p>
                        )}
                        {req.message && (
                          <p className="text-xs text-[#85817C] italic">
                            "{req.message}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0">
                      {req.status === 'Pending' ? (
                        <>
                          <button
                            onClick={() => updateRequestStatus(req.id, 'Accepted')}
                            className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Accept Meetup</span>
                          </button>
                          <button
                            onClick={() => updateRequestStatus(req.id, 'Declined')}
                            className="px-3.5 py-2 rounded-lg border border-[#E9E3DC] text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          req.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                          {req.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-white border border-[#E9E3DC] text-center text-xs text-[#85817C]">
                No incoming requests yet on your listings.
              </div>
            )}
          </div>

          {/* Requests Sent (as Buyer) */}
          <div className="space-y-4 pt-4 border-t border-[#E9E3DC]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-[#242321]">
                  Requests You Sent to Other Students
                </h3>
                <p className="text-xs text-[#85817C]">
                  Track the status of study materials you've asked to buy, trade, or claim.
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-[#A51E2B]/10 text-[#A51E2B] rounded">
                {myRequestsSent.length} Outgoing
              </span>
            </div>

            {myRequestsSent.length > 0 ? (
              <div className="space-y-3">
                {myRequestsSent.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-xl border border-[#E9E3DC] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-warm-sm"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={req.productImageUrl}
                        alt={req.productTitle}
                        className="w-14 h-14 rounded-lg object-cover border border-[#E9E3DC]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-[#242321]">{req.productTitle}</h4>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-extrabold text-[#A51E2B]">
                            {req.productListingType === 'Donate' ? 'Free (₹0)' : `₹${req.productPrice}`}
                          </span>
                          <span className="text-[11px] text-[#85817C]">
                            Location: {req.meetupLocation}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#85817C]">
                          Proposed Time: {req.proposedDateTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        req.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : req.status === 'Declined'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {req.status === 'Accepted' ? 'Meetup Accepted' : req.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-white border border-[#E9E3DC] text-center text-xs text-[#85817C]">
                You haven't requested any items yet. Browse items and click "Request to Buy"!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Edit Profile */}
      {activeTab === 'edit' && (
        <div className="max-w-2xl bg-white rounded-2xl border border-[#E9E3DC] p-6 sm:p-8 shadow-warm-sm space-y-6">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#242321]">
              Edit Student Profile
            </h3>
            <p className="text-xs text-[#85817C]">
              Update your contact info and preferred campus meetup spot.
            </p>
          </div>

          {editSavedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                Display Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                  Branch / Department
                </label>
                <input
                  type="text"
                  value={editBranch}
                  onChange={(e) => setEditBranch(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                  WhatsApp / Phone (For Meetup)
                </label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                Preferred Campus Hand-off Spot
              </label>
              <select
                value={editMeetup}
                onChange={(e) => setEditMeetup(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2]"
              >
                {CAMPUS_MEETUP_SPOTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#242321] block">
                Short Student Bio
              </label>
              <textarea
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E9E3DC] bg-[#F8F6F2]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#A51E2B] hover:bg-[#851621] text-white text-xs font-bold uppercase tracking-wider shadow-warm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
