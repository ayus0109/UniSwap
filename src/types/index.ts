export type Category = 
  | 'Books & Notes'
  | 'Electronics'
  | 'Lab Equipment'
  | 'Stationery'
  | 'Other Supplies';

export type Condition = 'Brand New' | 'Like New' | 'Good' | 'Fair';

export type ListingType = 'Sell' | 'Exchange' | 'Donate';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  condition: Condition;
  listingType: ListingType;
  desiredExchangeItem?: string;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  sellerBranch: string;
  sellerYear: string;
  sellerAvatar?: string;
  sellerPhone?: string;
  campus: string;
  department?: string;
  preferredMeetup: string;
  createdAt: string;
  isAvailable: boolean;
  featured?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  campus: string;
  branch: string;
  year: string;
  collegeId: string;
  phone?: string;
  bio?: string;
  memberSince: string;
  trustScore: number; // e.g. 98%
  preferredMeetup: string;
}

export interface ItemRequest {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImageUrl: string;
  productListingType: ListingType;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  requesterBranch: string;
  sellerId: string;
  type: 'Buy' | 'Exchange' | 'Donate';
  exchangeItemOffered?: string;
  meetupLocation: string;
  proposedDateTime: string;
  message?: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Completed';
  createdAt: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  condition: string;
  listingType: string;
  sortBy: SortOption;
}
