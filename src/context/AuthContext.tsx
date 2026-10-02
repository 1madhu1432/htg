import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types';
import { DEMO_CUSTOMER, DEMO_ADMIN } from '../data/mockCustomers';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginCustomer: (email: string, password?: string) => boolean;
  loginAdmin: (email: string, password?: string) => boolean;
  registerCustomer: (data: Partial<AuthUser>) => void;
  logout: () => void;
  updateProfile: (updated: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'sai_hygiene_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return DEMO_CUSTOMER;
      }
    }
    return DEMO_CUSTOMER; // Default logged in as DEMO CUSTOMER for immediate rich testing
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user]);

  const loginCustomer = (email: string): boolean => {
    if (email === 'demo@business.com' || email.includes('@')) {
      const cust: AuthUser = {
        ...DEMO_CUSTOMER,
        email: email || DEMO_CUSTOMER.email
      };
      setUser(cust);
      return true;
    }
    return false;
  };

  const loginAdmin = (email: string): boolean => {
    if (email === 'admin@saihygiene.com' || email.includes('admin')) {
      setUser(DEMO_ADMIN);
      return true;
    }
    return false;
  };

  const registerCustomer = (data: Partial<AuthUser>) => {
    const newUser: AuthUser = {
      id: `cust-${Date.now()}`,
      name: data.contactPerson || data.name || 'New Customer',
      email: data.email || 'customer@example.com',
      role: 'customer',
      businessName: data.businessName || 'My Business Pvt Ltd',
      contactPerson: data.contactPerson || data.name || 'Manager',
      phone: data.phone || '+91 9999999999',
      gstNumber: data.gstNumber || '37XXXXX0000X1Z0',
      businessType: data.businessType || 'Retailer',
      billingAddress: data.billingAddress || 'Billing Address',
      deliveryAddress: data.deliveryAddress || 'Delivery Address',
      city: data.city || 'Tirupati',
      state: data.state || 'Andhra Pradesh',
      pincode: data.pincode || '517501'
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const updateProfile = (updated: Partial<AuthUser>) => {
    setUser(prev => prev ? { ...prev, ...updated } : null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      loginCustomer,
      loginAdmin,
      registerCustomer,
      logout,
      updateProfile
    }}>
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
