import { Order, OrderStatus } from '../types/index.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { MOCK_ORDERS } from '../data/mockData.js';

let inMemoryOrders: Order[] = [...MOCK_ORDERS];

export const ordersService = {
  async getAll(): Promise<Order[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('orders')
        .select('*, items:order_items(*)')
        .order('created_at', { ascending: false });

      if (error) throw new Error(`Supabase query failed: ${error.message}`);
      return data as Order[];
    }
    return inMemoryOrders;
  },

  async getById(id: string): Promise<Order | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('orders')
        .select('*, items:order_items(*)')
        .eq('id', id)
        .single();

      if (error) return null;
      return data as Order;
    }
    return inMemoryOrders.find((o) => o.id === id) || null;
  },

  async updateStatus(id: string, status: OrderStatus): Promise<Order | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select('*, items:order_items(*)')
        .single();

      if (error) return null;
      return data as Order;
    }

    const index = inMemoryOrders.findIndex((o) => o.id === id);
    if (index === -1) return null;

    inMemoryOrders[index] = { ...inMemoryOrders[index], status };
    return inMemoryOrders[index];
  },
};
