# Nova Store — Backend API Service

Node.js + Express + TypeScript backend providing REST endpoints and data modeling for the **Nova Store / Business Analytics Mobile** application.

---

## 1. Architectural Overview

```text
┌──────────────────────────────────────────────┐
│       React Native / Expo Client             │
│   src/services/api.ts (REST Fetch Client)   │
└──────────────────────┬───────────────────────┘
                       │ HTTP / JSON
                       ▼
┌──────────────────────────────────────────────┐
│       Node.js + TypeScript + Express         │
│                                              │
│  Routes:       /api/products, /api/orders,   │
│                /api/analytics, /api/profile  │
│  Controllers:  HTTP parameter & response     │
│  Services:     Business logic & queries      │
│  Middleware:   CORS, Zod validation, error   │
└──────────────────────┬───────────────────────┘
                       │ SQL / REST
                       ▼
┌──────────────────────────────────────────────┐
│       Supabase (PostgreSQL 15)               │
│                                              │
│  Tables:       profiles, products, orders,   │
│                order_items                   │
│  Security:     Row-Level Security (RLS)      │
└──────────────────────────────────────────────┘
```

---

## 2. Directory Structure

```text
backend/
├── src/
│   ├── config/              # Environment (env.ts) and Supabase client (supabase.ts)
│   ├── controllers/         # HTTP request handlers (auth, products, orders, analytics, profile)
│   ├── data/                # In-memory development fallback data (mockData.ts)
│   ├── middleware/          # Central error handler and Zod validation middleware
│   ├── routes/              # Express API routers
│   ├── services/            # Domain service logic and Supabase query operations
│   ├── types/               # TypeScript domain models and API response types
│   ├── utils/               # Analytics calculation engine (time-series, growth %)
│   └── server.ts            # Express server initialization and entry point
├── .env.example             # Documented template of required environment variables
├── package.json             # Backend dependencies and execution scripts
├── schema.sql               # PostgreSQL DDL schema with RLS and indexes
├── tsconfig.json            # Strict TypeScript configuration
└── README.md                # Backend service documentation
```

---

## 3. Environment Configuration

Create a `.env` file in `backend/` by copying `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Local HTTP server port | `5001` |
| `NODE_ENV` | Runtime environment | `development` or `production` |
| `SUPABASE_URL` | Supabase Project URL | `https://xyzcompany.supabase.co` |
| `SUPABASE_ANON_KEY` | Public Anon key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret service key (server-side only) | `eyJhbGciOi...` |
| `CORS_ORIGIN` | Allowed client origins | `*` |

*Note*: If `SUPABASE_URL` is omitted, the backend automatically boots in **Offline / Development Fallback Mode**, serving deterministic in-memory mock records so API endpoints can be developed and tested immediately.

---

## 4. API Endpoints Reference

### System
* `GET /health` — Health check endpoint reporting service status and Supabase connectivity.
* `GET /` — API service info.

### Authentication (`/api/auth`)
* `POST /api/auth/login` — Sign in with email and password (`{ email, password }`).
* `POST /api/auth/register` — Register a merchant account (`{ fullName, email, password, businessName, category }`).
* `GET /api/auth/me` — Retrieve active merchant profile session.

### Products (`/api/products`)
* `GET /api/products` — Retrieve all catalog products.
* `GET /api/products/:id` — Retrieve single product details.
* `POST /api/products` — Create a product (`{ name, price, category, stock, description?, image? }`).
* `PUT /api/products/:id` — Update existing product.
* `DELETE /api/products/:id` — Delete product.

### Orders (`/api/orders`)
* `GET /api/orders` — Retrieve all merchant orders with line items.
* `GET /api/orders/:id` — Retrieve single order details.
* `PATCH /api/orders/:id/status` — Update fulfillment status (`{ status: 'Pending' | 'Confirmed' | 'Processing' | 'Completed' | 'Cancelled' }`).

### Profile (`/api/profile`)
* `GET /api/profile` — Retrieve merchant store details.
* `PUT /api/profile` — Update merchant store details (`{ name, email, businessName, category, avatarUrl }`).

### Analytics (`/api/analytics`)
* `GET /api/analytics/dashboard?period=7D|30D|3M|1Y` — Period-dependent KPI metrics, revenue trend, and top 3 performers.
* `GET /api/analytics?period=7D|30D|3M|1Y` — Full business intelligence suite: KPI metrics, revenue trend, order volume trend, category distribution, and ranked catalog performers.

---

## 5. Database Setup (Supabase / PostgreSQL)

1. Open your project on the [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to the **SQL Editor**.
3. Paste and run the entire contents of [`schema.sql`](file:///Users/huseynhesenzade/Documents/Programming%20/Mobile%20app/backend/schema.sql).
4. Retrieve your **Project URL** and **API Keys** from `Project Settings` → `API` and add them to your `backend/.env`.

---

## 6. Development & Verification Commands

```bash
cd backend
npm run dev        # Run in hot-reload mode via tsx watch
npm run typecheck  # Validate TypeScript strictly (tsc --noEmit)
npm run build      # Compile TypeScript to dist/
npm start          # Run compiled production server
```
