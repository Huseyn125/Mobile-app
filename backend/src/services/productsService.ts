import { Product } from '../types/index.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { MOCK_PRODUCTS } from '../data/mockData.js';

let inMemoryProducts: Product[] = [...MOCK_PRODUCTS];

export const productsService = {
  async getAll(): Promise<Product[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(`Supabase query failed: ${error.message}`);
      return data as Product[];
    }
    return inMemoryProducts;
  },

  async getById(id: string): Promise<Product | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) return null;
      return data as Product;
    }
    return inMemoryProducts.find((p) => p.id === id) || null;
  },

  async create(payload: Omit<Product, 'id' | 'createdAt' | 'totalSales' | 'totalRevenue'>): Promise<Product> {
    const newProduct: Product = {
      ...payload,
      id: `prod-${Date.now()}`,
      totalSales: 0,
      totalRevenue: 0,
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: payload.name,
          description: payload.description,
          price: payload.price,
          category: payload.category,
          stock: payload.stock,
          image: payload.image,
        })
        .select()
        .single();

      if (error) throw new Error(`Supabase insert failed: ${error.message}`);
      return data as Product;
    }

    inMemoryProducts.unshift(newProduct);
    return newProduct;
  },

  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) return null;
      return data as Product;
    }

    const index = inMemoryProducts.findIndex((p) => p.id === id);
    if (index === -1) return null;

    inMemoryProducts[index] = { ...inMemoryProducts[index], ...updates };
    return inMemoryProducts[index];
  },

  async delete(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      return !error;
    }

    const initialLength = inMemoryProducts.length;
    inMemoryProducts = inMemoryProducts.filter((p) => p.id !== id);
    return inMemoryProducts.length < initialLength;
  },
};
