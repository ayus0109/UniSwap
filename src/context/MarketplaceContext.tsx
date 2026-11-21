import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ItemRequest, FilterState, Category } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REQUESTS } from '../data/mockData';

interface MarketplaceContextType {
  products: Product[];
  favourites: string[];
  requests: ItemRequest[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  addProduct: (productData: Omit<Product, 'id' | 'createdAt' | 'isAvailable'>) => Product;
  deleteProduct: (productId: string) => void;
  toggleFavourite: (productId: string) => void;
  isFavourite: (productId: string) => boolean;
  createRequest: (requestData: Omit<ItemRequest, 'id' | 'createdAt' | 'status'>) => ItemRequest;
  updateRequestStatus: (requestId: string, status: 'Accepted' | 'Declined' | 'Completed') => void;
  getProductById: (id: string) => Product | undefined;
  getUserListings: (userId: string) => Product[];
  getUserRequestsSent: (userId: string) => ItemRequest[];
  getUserRequestsReceived: (userId: string) => ItemRequest[];
  getCategoryCount: (category: Category | 'All') => number;
}

const PRODUCTS_STORAGE_KEY = 'uniswap_products_v4';
const FAVOURITES_STORAGE_KEY = 'uniswap_favourites_v4';
const REQUESTS_STORAGE_KEY = 'uniswap_requests_v4';

const defaultFilterState: FilterState = {
  search: '',
  category: 'All',
  minPrice: 0,
  maxPrice: 2000,
  condition: 'All',
  listingType: 'All',
  sortBy: 'newest'
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (stored) {
        const parsed: Product[] = JSON.parse(stored);
        // Self-heal check for stale cached URLs
        const hasStale = parsed.some(p => 
          p.imageUrl.includes('1624823183493') || 
          p.imageUrl.includes('1532012164546') || 
          p.imageUrl.includes('1582719478250') ||
          p.imageUrl.includes('1581291518857') ||
          p.imageUrl.includes('1584515979956') ||
          (p.sellerAvatar && p.sellerAvatar.includes('1534528741775'))
        );
        if (!hasStale && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVOURITES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading favourites from localStorage', e);
    }
    return ['prod-001', 'prod-002'];
  });

  const [requests, setRequests] = useState<ItemRequest[]>(() => {
    try {
      const stored = localStorage.getItem(REQUESTS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading requests from localStorage', e);
    }
    return INITIAL_REQUESTS;
  });

  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
    } catch (e) {
      console.error('Error saving favourites', e);
    }
  }, [favourites]);

  useEffect(() => {
    try {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
    } catch (e) {
      console.error('Error saving requests', e);
    }
  }, [requests]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilterState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilterState(defaultFilterState);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'isAvailable'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isAvailable: true,
      featured: false
    };

    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setFavourites(prev => prev.filter(id => id !== productId));
  };

  const toggleFavourite = (productId: string) => {
    setFavourites(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isFavourite = (productId: string) => {
    return favourites.includes(productId);
  };

  const createRequest = (requestData: Omit<ItemRequest, 'id' | 'createdAt' | 'status'>): ItemRequest => {
    const newRequest: ItemRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };

    setRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const updateRequestStatus = (requestId: string, status: 'Accepted' | 'Declined' | 'Completed') => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { ...req, status };
      }
      return req;
    }));
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const getUserListings = (userId: string) => {
    return products.filter(p => p.sellerId === userId);
  };

  const getUserRequestsSent = (userId: string) => {
    return requests.filter(r => r.requesterId === userId);
  };

  const getUserRequestsReceived = (userId: string) => {
    return requests.filter(r => r.sellerId === userId);
  };

  const getCategoryCount = (category: Category | 'All') => {
    if (category === 'All') return products.length;
    return products.filter(p => p.category === category).length;
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        favourites,
        requests,
        filterState,
        setFilterState,
        updateFilter,
        resetFilters,
        addProduct,
        deleteProduct,
        toggleFavourite,
        isFavourite,
        createRequest,
        updateRequestStatus,
        getProductById,
        getUserListings,
        getUserRequestsSent,
        getUserRequestsReceived,
        getCategoryCount
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
