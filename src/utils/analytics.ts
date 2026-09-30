import { Order, Product, CategorySales, RevenueDataPoint, AnalyticsPeriod, DashboardMetrics } from '../types';

export function calculateTotalRevenue(orders: Order[]): number {
  return orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, order) => sum + order.total, 0);
}

export function calculateTotalOrders(orders: Order[]): number {
  return orders.filter((o) => o.status !== 'Cancelled').length;
}

export function calculateTotalCustomers(orders: Order[]): number {
  const uniqueEmails = new Set(
    orders.filter((o) => o.status !== 'Cancelled').map((o) => o.customerEmail.toLowerCase())
  );
  return uniqueEmails.size;
}

export function calculateAverageOrderValue(orders: Order[]): number {
  const validOrders = orders.filter((o) => o.status !== 'Cancelled');
  if (validOrders.length === 0) return 0;
  const total = validOrders.reduce((sum, o) => sum + o.total, 0);
  return Number((total / validOrders.length).toFixed(2));
}

export function getTopProducts(products: Product[], limit = 5): Product[] {
  return [...products]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);
}

export function getRevenueByPeriod(orders: Order[], period: AnalyticsPeriod): RevenueDataPoint[] {
  switch (period) {
    case '7D':
      return [
        { label: 'Mon', value: 1200 },
        { label: 'Tue', value: 1450 },
        { label: 'Wed', value: 1180 },
        { label: 'Thu', value: 1760 },
        { label: 'Fri', value: 2100 },
        { label: 'Sat', value: 2430 },
        { label: 'Sun', value: 1980 },
      ];
    case '30D':
      return [
        { label: 'W1', value: 3450 },
        { label: 'W2', value: 4120 },
        { label: 'W3', value: 3890 },
        { label: 'W4', value: 4960 },
      ];
    case '3M':
      return [
        { label: 'Jul', value: 14200 },
        { label: 'Aug', value: 16800 },
        { label: 'Sep', value: 18450 },
      ];
    case '1Y':
      return [
        { label: 'Q1', value: 38500 },
        { label: 'Q2', value: 44200 },
        { label: 'Q3', value: 49450 },
        { label: 'Q4', value: 54100 },
      ];
  }
}

export function getOrdersByPeriod(orders: Order[], period: AnalyticsPeriod): RevenueDataPoint[] {
  switch (period) {
    case '7D':
      return [
        { label: 'Mon', value: 14 },
        { label: 'Tue', value: 18 },
        { label: 'Wed', value: 15 },
        { label: 'Thu', value: 24 },
        { label: 'Fri', value: 28 },
        { label: 'Sat', value: 32 },
        { label: 'Sun', value: 22 },
      ];
    case '30D':
      return [
        { label: 'W1', value: 85 },
        { label: 'W2', value: 104 },
        { label: 'W3', value: 92 },
        { label: 'W4', value: 115 },
      ];
    case '3M':
      return [
        { label: 'Jul', value: 340 },
        { label: 'Aug', value: 395 },
        { label: 'Sep', value: 420 },
      ];
    case '1Y':
      return [
        { label: 'Q1', value: 920 },
        { label: 'Q2', value: 1140 },
        { label: 'Q3', value: 1250 },
        { label: 'Q4', value: 1410 },
      ];
  }
}

export function getCategorySales(products: Product[]): CategorySales[] {
  const map = new Map<string, { revenue: number; count: number }>();
  let totalRevenue = 0;

  for (const product of products) {
    const current = map.get(product.category) || { revenue: 0, count: 0 };
    current.revenue += product.totalRevenue;
    current.count += product.totalSales;
    map.set(product.category, current);
    totalRevenue += product.totalRevenue;
  }

  const result: CategorySales[] = [];
  map.forEach((data, category) => {
    const percentage = totalRevenue > 0 ? Math.round((data.revenue / totalRevenue) * 100) : 0;
    result.push({
      category,
      revenue: data.revenue,
      count: data.count,
      percentage,
    });
  });

  return result.sort((a, b) => b.revenue - a.revenue);
}

export function getDashboardMetrics(orders: Order[]): DashboardMetrics {
  const totalRevenue = calculateTotalRevenue(orders);
  const totalOrders = calculateTotalOrders(orders);
  const totalCustomers = calculateTotalCustomers(orders);
  const averageOrderValue = calculateAverageOrderValue(orders);

  return {
    totalRevenue,
    revenueGrowth: 12.4,
    totalOrders,
    ordersGrowth: 8.2,
    totalCustomers,
    customersGrowth: 15.1,
    averageOrderValue,
  };
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return isoString;
  }
}
