import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Order, UserProfile, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_USER } from '../data/mockData';

interface AppContextType {
  user: UserProfile;
  products: Product[];
  orders: Order[];
  isAuthenticated: boolean;
  login: (email?: string) => void;
  logout: () => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'totalSales' | 'totalRevenue'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default true for convenient preview, with login flow supported

  const login = (email?: string) => {
    setIsAuthenticated(true);
    if (email) {
      setUser((prev) => ({ ...prev, email }));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addProduct = (
    data: Omit<Product, 'id' | 'createdAt' | 'totalSales' | 'totalRevenue'>
  ): Product => {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      totalSales: 0,
      totalRevenue: 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        products,
        orders,
        isAuthenticated,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
