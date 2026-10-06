import { Order, Product, CategorySales, RevenueDataPoint, AnalyticsPeriod, DashboardMetrics } from '../types/index.js';

export function getReferenceDate(orders: Order[]): Date {
  if (orders.length === 0) return new Date();
  const timestamps = orders.map((o) => new Date(o.createdAt).getTime()).filter((t) => !isNaN(t));
  if (timestamps.length === 0) return new Date();
  return new Date(Math.max(...timestamps));
}

function getPeriodDurationMs(period: AnalyticsPeriod): number {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  switch (period) {
    case '7D':
      return 7 * ONE_DAY;
    case '30D':
      return 30 * ONE_DAY;
    case '3M':
      return 90 * ONE_DAY;
    case '1Y':
      return 365 * ONE_DAY;
  }
}

export function filterOrdersByDateRange(orders: Order[], startDate: Date, endDate: Date): Order[] {
  const start = startDate.getTime();
  const end = endDate.getTime();
  return orders.filter((o) => {
    const time = new Date(o.createdAt).getTime();
    return time >= start && time <= end;
  });
}

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

export function getRevenueByPeriod(
  orders: Order[],
  period: AnalyticsPeriod,
  refDate?: Date
): RevenueDataPoint[] {
  const reference = refDate || getReferenceDate(orders);
  const validOrders = orders.filter((o) => o.status !== 'Cancelled');
  const DAY_MS = 24 * 60 * 60 * 1000;

  switch (period) {
    case '7D': {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const buckets: RevenueDataPoint[] = [];

      for (let i = 6; i >= 0; i--) {
        const bucketDate = new Date(reference.getTime() - i * DAY_MS);
        const dayLabel = days[bucketDate.getDay()];
        const dayYear = bucketDate.getFullYear();
        const dayMonth = bucketDate.getMonth();
        const dayDate = bucketDate.getDate();

        const dayTotal = validOrders
          .filter((o) => {
            const d = new Date(o.createdAt);
            return (
              d.getFullYear() === dayYear &&
              d.getMonth() === dayMonth &&
              d.getDate() === dayDate
            );
          })
          .reduce((sum, o) => sum + o.total, 0);

        buckets.push({ label: dayLabel, value: Math.round(dayTotal) });
      }
      return buckets;
    }

    case '30D': {
      const buckets: RevenueDataPoint[] = [
        { label: 'W1', value: 0 },
        { label: 'W2', value: 0 },
        { label: 'W3', value: 0 },
        { label: 'W4', value: 0 },
      ];

      for (let w = 0; w < 4; w++) {
        const bucketStart = new Date(reference.getTime() - (4 - w) * 7.5 * DAY_MS).getTime();
        const bucketEnd = new Date(reference.getTime() - (3 - w) * 7.5 * DAY_MS).getTime();

        const total = validOrders
          .filter((o) => {
            const t = new Date(o.createdAt).getTime();
            return t >= bucketStart && t <= bucketEnd;
          })
          .reduce((sum, o) => sum + o.total, 0);

        buckets[w].value = Math.round(total);
      }
      return buckets;
    }

    case '3M': {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const buckets: RevenueDataPoint[] = [];

      for (let m = 2; m >= 0; m--) {
        const d = new Date(reference.getFullYear(), reference.getMonth() - m, 1);
        const targetYear = d.getFullYear();
        const targetMonth = d.getMonth();
        const label = monthNames[targetMonth];

        const total = validOrders
          .filter((o) => {
            const od = new Date(o.createdAt);
            return od.getFullYear() === targetYear && od.getMonth() === targetMonth;
          })
          .reduce((sum, o) => sum + o.total, 0);

        buckets.push({ label, value: Math.round(total) });
      }
      return buckets;
    }

    case '1Y': {
      const buckets: RevenueDataPoint[] = [
        { label: 'Q1', value: 0 },
        { label: 'Q2', value: 0 },
        { label: 'Q3', value: 0 },
        { label: 'Q4', value: 0 },
      ];

      for (let q = 0; q < 4; q++) {
        const start = new Date(reference.getTime() - (4 - q) * 91.25 * DAY_MS).getTime();
        const end = new Date(reference.getTime() - (3 - q) * 91.25 * DAY_MS).getTime();

        const total = validOrders
          .filter((o) => {
            const t = new Date(o.createdAt).getTime();
            return t >= start && t <= end;
          })
          .reduce((sum, o) => sum + o.total, 0);

        buckets[q].value = Math.round(total);
      }
      return buckets;
    }
  }
}

export function getOrdersByPeriod(
  orders: Order[],
  period: AnalyticsPeriod,
  refDate?: Date
): RevenueDataPoint[] {
  const reference = refDate || getReferenceDate(orders);
  const validOrders = orders.filter((o) => o.status !== 'Cancelled');
  const DAY_MS = 24 * 60 * 60 * 1000;

  switch (period) {
    case '7D': {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const buckets: RevenueDataPoint[] = [];

      for (let i = 6; i >= 0; i--) {
        const bucketDate = new Date(reference.getTime() - i * DAY_MS);
        const dayLabel = days[bucketDate.getDay()];
        const dayYear = bucketDate.getFullYear();
        const dayMonth = bucketDate.getMonth();
        const dayDate = bucketDate.getDate();

        const count = validOrders.filter((o) => {
          const d = new Date(o.createdAt);
          return (
            d.getFullYear() === dayYear &&
            d.getMonth() === dayMonth &&
            d.getDate() === dayDate
          );
        }).length;

        buckets.push({ label: dayLabel, value: count });
      }
      return buckets;
    }

    case '30D': {
      const buckets: RevenueDataPoint[] = [
        { label: 'W1', value: 0 },
        { label: 'W2', value: 0 },
        { label: 'W3', value: 0 },
        { label: 'W4', value: 0 },
      ];

      for (let w = 0; w < 4; w++) {
        const bucketStart = new Date(reference.getTime() - (4 - w) * 7.5 * DAY_MS).getTime();
        const bucketEnd = new Date(reference.getTime() - (3 - w) * 7.5 * DAY_MS).getTime();

        const count = validOrders.filter((o) => {
          const t = new Date(o.createdAt).getTime();
          return t >= bucketStart && t <= bucketEnd;
        }).length;

        buckets[w].value = count;
      }
      return buckets;
    }

    case '3M': {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const buckets: RevenueDataPoint[] = [];

      for (let m = 2; m >= 0; m--) {
        const d = new Date(reference.getFullYear(), reference.getMonth() - m, 1);
        const targetYear = d.getFullYear();
        const targetMonth = d.getMonth();
        const label = monthNames[targetMonth];

        const count = validOrders.filter((o) => {
          const od = new Date(o.createdAt);
          return od.getFullYear() === targetYear && od.getMonth() === targetMonth;
        }).length;

        buckets.push({ label, value: count });
      }
      return buckets;
    }

    case '1Y': {
      const buckets: RevenueDataPoint[] = [
        { label: 'Q1', value: 0 },
        { label: 'Q2', value: 0 },
        { label: 'Q3', value: 0 },
        { label: 'Q4', value: 0 },
      ];

      for (let q = 0; q < 4; q++) {
        const start = new Date(reference.getTime() - (4 - q) * 91.25 * DAY_MS).getTime();
        const end = new Date(reference.getTime() - (3 - q) * 91.25 * DAY_MS).getTime();

        const count = validOrders.filter((o) => {
          const t = new Date(o.createdAt).getTime();
          return t >= start && t <= end;
        }).length;

        buckets[q].value = count;
      }
      return buckets;
    }
  }
}

export function getCategorySales(products: Product[], orders?: Order[]): CategorySales[] {
  const map = new Map<string, { revenue: number; count: number }>();
  let totalRevenue = 0;

  if (orders && orders.length > 0) {
    const validOrders = orders.filter((o) => o.status !== 'Cancelled');
    const productCategoryMap = new Map<string, string>();
    products.forEach((p) => productCategoryMap.set(p.id, p.category));

    for (const order of validOrders) {
      for (const item of order.items) {
        const category = productCategoryMap.get(item.productId) || 'Other';
        const current = map.get(category) || { revenue: 0, count: 0 };
        const lineTotal = item.price * item.quantity;
        current.revenue += lineTotal;
        current.count += item.quantity;
        map.set(category, current);
        totalRevenue += lineTotal;
      }
    }
  } else {
    for (const product of products) {
      const current = map.get(product.category) || { revenue: 0, count: 0 };
      current.revenue += product.totalRevenue;
      current.count += product.totalSales;
      map.set(product.category, current);
      totalRevenue += product.totalRevenue;
    }
  }

  const result: CategorySales[] = [];
  map.forEach((data, category) => {
    const percentage = totalRevenue > 0 ? Math.round((data.revenue / totalRevenue) * 100) : 0;
    result.push({
      category,
      revenue: Math.round(data.revenue),
      count: data.count,
      percentage,
    });
  });

  return result.sort((a, b) => b.revenue - a.revenue);
}

export function getDashboardMetrics(
  orders: Order[],
  period: AnalyticsPeriod = '30D',
  refDate?: Date
): DashboardMetrics {
  const reference = refDate || getReferenceDate(orders);
  const duration = getPeriodDurationMs(period);

  const currentStart = new Date(reference.getTime() - duration);
  const currentOrders = filterOrdersByDateRange(orders, currentStart, reference);

  const prevEnd = new Date(currentStart.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - duration);
  const prevOrders = filterOrdersByDateRange(orders, prevStart, prevEnd);

  const totalRevenue = calculateTotalRevenue(currentOrders);
  const prevRevenue = calculateTotalRevenue(prevOrders);
  const revenueGrowth =
    prevRevenue > 0
      ? Number((((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1))
      : totalRevenue > 0
      ? 100
      : 0;

  const totalOrders = calculateTotalOrders(currentOrders);
  const prevTotalOrders = calculateTotalOrders(prevOrders);
  const ordersGrowth =
    prevTotalOrders > 0
      ? Number((((totalOrders - prevTotalOrders) / prevTotalOrders) * 100).toFixed(1))
      : totalOrders > 0
      ? 100
      : 0;

  const totalCustomers = calculateTotalCustomers(currentOrders);
  const prevCustomers = calculateTotalCustomers(prevOrders);
  const customersGrowth =
    prevCustomers > 0
      ? Number((((totalCustomers - prevCustomers) / prevCustomers) * 100).toFixed(1))
      : totalCustomers > 0
      ? 100
      : 0;

  const averageOrderValue = calculateAverageOrderValue(currentOrders);

  return {
    totalRevenue,
    revenueGrowth,
    totalOrders,
    ordersGrowth,
    totalCustomers,
    customersGrowth,
    averageOrderValue,
  };
}
