import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { INITIAL_USER, SAMPLE_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginAsDemo: (userId?: string) => void;
  loginWithEmail: (email: string, name?: string) => boolean;
  registerUser: (userData: { name: string; email: string; branch: string; year: string; phone?: string }) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'uniswap_current_user_v4';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!parsed.avatar?.includes('1534528741775')) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
    // Default to the demo student Rohan Sharma for instant out-of-the-box prototype demonstration
    return INITIAL_USER;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [user]);

  const loginAsDemo = (userId?: string) => {
    const selected = SAMPLE_USERS.find(u => u.id === (userId || 'user-mitaoe-101')) || INITIAL_USER;
    setUser(selected);
  };

  const loginWithEmail = (email: string, name?: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = SAMPLE_USERS.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      setUser(existing);
      return true;
    }

    const newUser: User = {
      id: `user-mitaoe-${Date.now()}`,
      name: name || cleanEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email: cleanEmail,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      campus: 'MIT Academy of Engineering, Alandi, Pune',
      branch: 'Computer Engineering',
      year: 'Second Year (SE)',
      collegeId: `MITAOE/${new Date().getFullYear()}/GEN/${Math.floor(100 + Math.random() * 900)}`,
      phone: '+91 98000 00000',
      bio: 'Verified student on UniSwap campus marketplace.',
      memberSince: 'Nov 2026',
      trustScore: 100,
      preferredMeetup: 'Central Library Ground Floor'
    };
    setUser(newUser);
    return true;
  };

  const registerUser = (userData: { name: string; email: string; branch: string; year: string; phone?: string }) => {
    const newUser: User = {
      id: `user-mitaoe-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      campus: 'MIT Academy of Engineering, Alandi, Pune',
      branch: userData.branch || 'Engineering',
      year: userData.year || 'First Year',
      collegeId: `MITAOE/${new Date().getFullYear()}/STU/${Math.floor(100 + Math.random() * 900)}`,
      phone: userData.phone || '+91 99999 88888',
      bio: 'New student on UniSwap campus marketplace.',
      memberSince: 'Nov 2026',
      trustScore: 100,
      preferredMeetup: 'Nescafe Canteen'
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const switchUser = (userId: string) => {
    const target = SAMPLE_USERS.find(u => u.id === userId);
    if (target) {
      setUser(target);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAsDemo,
        loginWithEmail,
        registerUser,
        logout,
        updateProfile,
        switchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
