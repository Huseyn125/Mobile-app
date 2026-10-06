-- ==============================================================================
-- NOVA STORE / BUSINESS ANALYTICS MOBILE — SUPABASE / POSTGRESQL SCHEMA
-- ==============================================================================

-- 1. Profiles Table (Linked to Supabase Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL DEFAULT 'Nova Store',
  category TEXT NOT NULL DEFAULT 'Retail & Electronics',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  category TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  image TEXT,
  total_sales INTEGER NOT NULL DEFAULT 0 CHECK (total_sales >= 0),
  total_revenue NUMERIC(12, 2) NOT NULL DEFAULT 0.00 CHECK (total_revenue >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY, -- e.g. 'ORD-1026'
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Confirmed', 'Processing', 'Completed', 'Cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- Indexes for high-performance analytics & query filters
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_profile ON public.products(profile_id);
CREATE INDEX IF NOT EXISTS idx_orders_profile ON public.orders(profile_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Users can only read and write their own data)
CREATE POLICY "Users can manage own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own products" ON public.products
  FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Users can manage own orders" ON public.orders
  FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Users can manage own order items" ON public.order_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE public.orders.id = public.order_items.order_id 
      AND public.orders.profile_id = auth.uid()
    )
  );
