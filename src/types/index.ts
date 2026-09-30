export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  totalSales: number;
  totalRevenue: number;
  createdAt: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Completed'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export type AnalyticsPeriod = '7D' | '30D' | '3M' | '1Y';

export interface DashboardMetrics {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  totalCustomers: number;
  customersGrowth: number;
  averageOrderValue: number;
}

export interface RevenueDataPoint {
  label: string;
  value: number;
}

export interface CategorySales {
  category: string;
  revenue: number;
  percentage: number;
  count: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  businessName: string;
  category: string;
  avatarUrl?: string;
  joinedAt: string;
}
