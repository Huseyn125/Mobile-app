import { Product, Order, AnalyticsPeriod, DashboardMetrics, RevenueDataPoint } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/mockData';
import { getDashboardMetrics, getRevenueByPeriod, getOrdersByPeriod } from '../utils/analytics';

/**
 * Placeholder API service layer.
 * Currently uses local mock data, cleanly separated so it can be swapped
 * for real HTTP requests (e.g. fetch / axios / Supabase) later without altering UI components.
 */

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    return Promise.resolve([...INITIAL_PRODUCTS]);
  },

  async getProduct(id: string): Promise<Product | undefined> {
    return Promise.resolve(INITIAL_PRODUCTS.find((p) => p.id === id));
  },

  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'totalSales' | 'totalRevenue'>): Promise<Product> {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      totalSales: 0,
      totalRevenue: 0,
    };
    return Promise.resolve(newProduct);
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const found = INITIAL_PRODUCTS.find((p) => p.id === id);
    if (!found) return Promise.resolve(null);
    return Promise.resolve({ ...found, ...updates });
  },

  async deleteProduct(id: string): Promise<boolean> {
    return Promise.resolve(true);
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    return Promise.resolve([...INITIAL_ORDERS]);
  },

  async getOrder(id: string): Promise<Order | undefined> {
    return Promise.resolve(INITIAL_ORDERS.find((o) => o.id === id));
  },

  // Analytics
  async getDashboardAnalytics(): Promise<DashboardMetrics> {
    return Promise.resolve(getDashboardMetrics(INITIAL_ORDERS));
  },

  async getAnalytics(period: AnalyticsPeriod): Promise<{ revenue: RevenueDataPoint[]; orders: RevenueDataPoint[] }> {
    return Promise.resolve({
      revenue: getRevenueByPeriod(INITIAL_ORDERS, period),
      orders: getOrdersByPeriod(INITIAL_ORDERS, period),
    });
  },
};
