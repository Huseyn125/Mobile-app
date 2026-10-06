import { AnalyticsPeriod, DashboardMetrics, RevenueDataPoint, CategorySales, Product } from '../types/index.js';
import { ordersService } from './ordersService.js';
import { productsService } from './productsService.js';
import {
  getDashboardMetrics,
  getRevenueByPeriod,
  getOrdersByPeriod,
  getCategorySales,
  getTopProducts,
} from '../utils/analyticsCalculator.js';

export const analyticsService = {
  async getDashboard(period: AnalyticsPeriod = '30D'): Promise<{
    metrics: DashboardMetrics;
    revenueTrend: RevenueDataPoint[];
    topProducts: Product[];
  }> {
    const orders = await ordersService.getAll();
    const products = await productsService.getAll();

    const metrics = getDashboardMetrics(orders, period);
    const revenueTrend = getRevenueByPeriod(orders, period);
    const topProducts = getTopProducts(products, 3);

    return {
      metrics,
      revenueTrend,
      topProducts,
    };
  },

  async getAnalytics(period: AnalyticsPeriod = '30D'): Promise<{
    metrics: DashboardMetrics;
    revenueTrend: RevenueDataPoint[];
    ordersVolume: RevenueDataPoint[];
    categorySales: CategorySales[];
    rankedProducts: Product[];
  }> {
    const orders = await ordersService.getAll();
    const products = await productsService.getAll();

    const metrics = getDashboardMetrics(orders, period);
    const revenueTrend = getRevenueByPeriod(orders, period);
    const ordersVolume = getOrdersByPeriod(orders, period);
    const categorySales = getCategorySales(products, orders);
    const rankedProducts = getTopProducts(products, 5);

    return {
      metrics,
      revenueTrend,
      ordersVolume,
      categorySales,
      rankedProducts,
    };
  },
};
