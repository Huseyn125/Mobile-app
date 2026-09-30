# Business Analytics Mobile

## 1. Project Overview

**Business Analytics Mobile** is a mobile application designed for small and medium-sized businesses.

The purpose of the application is to help a business owner monitor the most important business and economic indicators from a mobile device.

The application will eventually connect to a backend and database. However, the **current development phase is FRONTEND ONLY**.

The first version must be a fully functional React Native mobile UI using mock/local data.

The backend, database, authentication, API and real analytics will be implemented later.

---

# 2. Main Goal

Create a professional mobile business analytics application where a business owner can:

* View business performance
* View revenue
* View orders
* View customers
* View products
* View analytics
* View individual orders
* Manage products
* View and edit their profile

The application should look like a realistic modern business/fintech product rather than a university prototype.

---

# 3. Target User

The main user is:

> A small or medium-sized business owner who wants to monitor business performance from a smartphone.

Example business:

* Online shop
* Small retail business
* Cafe
* Electronics shop
* Clothing store
* Local service business

For the frontend demo, use a fictional business.

Example:

**Business name:** Nova Store

---

# 4. Current Development Scope

## IMPORTANT

The current phase is **frontend only**.

Do NOT implement:

* Backend
* Node.js
* Express
* Supabase
* PostgreSQL
* Real API requests
* JWT
* Real authentication
* Real payment processing
* Cloud services
* Real-time synchronization

Use mock/local data.

The architecture must, however, be designed so that mock data can later be replaced with API responses without rebuilding the UI.

---

# 5. Technology Stack

Use:

* React Native
* Expo
* TypeScript
* Expo Router

Recommended supporting libraries may be used when necessary, but avoid unnecessary dependencies.

The project should remain lightweight.

---

# 6. Design Direction

The application should have a:

**Modern / Professional / Fintech / Business Analytics**

visual style.

The UI should feel similar to a modern SaaS dashboard adapted for mobile.

### Design principles

* Clean
* Minimal
* Professional
* Easy to scan
* Good spacing
* Clear typography
* Consistent components
* Rounded cards
* Subtle borders
* Clear status indicators
* Good use of whitespace

Avoid:

* Excessive gradients
* Excessive animations
* Cartoon-like UI
* Excessive shadows
* Too many colors
* Overly complicated layouts

The application should look like a real commercial product.

---

# 7. Color System

Use a consistent color system.

Suggested colors:

```text
Primary:        #2563EB
Primary Dark:   #1D4ED8

Background:     #F8FAFC
Surface:        #FFFFFF

Text Primary:   #0F172A
Text Secondary: #64748B

Success:        #16A34A
Warning:        #F59E0B
Danger:         #DC2626

Border:         #E2E8F0
```

Do not hardcode these colors repeatedly throughout the application.

Create a centralized theme/constants system.

---

# 8. Typography

Use a clear hierarchy.

Example:

```text
Large heading
24–28 px

Section heading
18–20 px

Body
14–16 px

Secondary text
12–14 px

Large KPI numbers
24–32 px
```

Use font weights consistently.

---

# 9. Application Structure

Use Expo Router.

Recommended structure:

```text
app/
│
├── _layout.tsx
│
├── (auth)/
│   ├── _layout.tsx
│   ├── login.tsx
│   └── register.tsx
│
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── products.tsx
│   ├── orders.tsx
│   ├── analytics.tsx
│   └── profile.tsx
│
├── products/
│   ├── [id].tsx
│   ├── create.tsx
│   └── edit/
│       └── [id].tsx
│
└── orders/
    └── [id].tsx
```

Additional folders:

```text
components/
│
├── ui/
├── dashboard/
├── products/
├── orders/
├── analytics/
└── profile/

data/
└── mockData.ts

types/
└── index.ts

constants/
└── theme.ts

utils/
└── analytics.ts

services/
└── api.ts
```

The `api.ts` file can initially contain placeholders. Do not make real API requests.

---

# 10. Navigation

The main application should use bottom tab navigation.

Tabs:

```text
Dashboard
Products
Orders
Analytics
Profile
```

Suggested icons:

```text
Dashboard → Home
Products  → Package
Orders    → Shopping Bag
Analytics → Bar Chart
Profile   → User
```

Use a consistent icon library compatible with Expo.

The active tab should be visually distinct.

---

# 11. Authentication Screens

Authentication is only UI at this stage.

## Login

Screen contains:

* Application logo/name
* Welcome message
* Email input
* Password input
* Show/hide password
* Login button
* "Forgot password?" text
* Link to Register

Example:

```text
Business Analytics

Welcome back

Email
[________________]

Password
[________________]

[      Login       ]

Forgot password?

Don't have an account?
Create account
```

The Login button can navigate to the main application for demo purposes.

No real authentication should be implemented.

---

# 12. Register Screen

Fields:

* Full name
* Email
* Password
* Confirm password
* Business name
* Business category

Button:

```text
Create Account
```

At this stage the form is UI only.

Basic frontend validation may be implemented.

Example validation:

* Required fields
* Valid email format
* Password minimum length
* Password confirmation matches

Do not connect it to a backend.

---

# 13. Dashboard

The Dashboard is the main screen.

It should contain the following sections.

---

## 13.1 Header

Display:

```text
Good morning, Huseyn 👋

Nova Store
```

Include:

* Profile/avatar
* Optional notification icon

The header should not take excessive space.

---

# 13.2 Revenue Card

Main KPI card.

Display:

```text
Total Revenue

$15,420.00

+12.4%
vs last month
```

The growth indicator should use the success color.

---

# 13.3 KPI Cards

Display:

### Orders

```text
386
Total Orders
```

### Customers

```text
241
Customers
```

### Average Order Value

```text
$39.95
Average Order
```

These cards should be reusable components.

---

# 13.4 Revenue Chart

Display revenue over the last 7 days.

Example mock data:

```text
Monday      $1,200
Tuesday     $1,450
Wednesday   $1,180
Thursday    $1,760
Friday      $2,100
Saturday    $2,430
Sunday      $1,980
```

The chart should be mobile-friendly.

Include:

* Chart title
* Current period
* Optional period selector

Possible periods:

```text
7D
30D
3M
1Y
```

For the frontend version, chart data is local/mock data.

---

# 13.5 Top Products

Display the best-performing products.

Example:

```text
Top Products

1. iPhone Case
   124 sales
   $2,480 revenue

2. AirPods
   87 sales
   $1,920 revenue

3. Fast Charger
   65 sales
   $1,120 revenue
```

Use reusable product summary components.

---

# 13.6 Recent Orders

Display the latest orders.

Example:

```text
Recent Orders

#1024
Ali M.
$120.00
Completed

#1023
John S.
$85.00
Processing

#1022
Sarah A.
$230.00
Completed
```

Each order should be clickable and navigate to Order Details.

---

# 14. Products Screen

The Products screen displays all products.

Features:

* Search
* Category filter
* Product list
* Product image
* Product name
* Price
* Stock
* Category
* Add Product button

Example:

```text
Products

[ Search products... ]

[All] [Electronics] [Accessories]

iPhone Case
Accessories
$20.00
Stock: 124

AirPods
Electronics
$180.00
Stock: 42

Fast Charger
Accessories
$35.00
Stock: 76

             [+ Add Product]
```

---

# 15. Product Data Model

Use the following TypeScript type:

```ts
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
```

---

# 16. Product Details

When the user taps a product, navigate to:

```text
/products/[id]
```

Display:

* Product image
* Product name
* Description
* Category
* Price
* Stock
* Total sales
* Total revenue
* Created date

Actions:

```text
Edit Product
Delete Product
```

Deletion can be simulated locally for now.

---

# 17. Create Product

Route:

```text
/products/create
```

Fields:

```text
Product Name
Description
Price
Category
Stock
Image
```

Button:

```text
Create Product
```

For now, add the product to local/mock state.

No backend.

---

# 18. Edit Product

Route:

```text
/products/edit/[id]
```

Display the same fields as Create Product.

Pre-fill the fields with existing product data.

Button:

```text
Save Changes
```

---

# 19. Orders Screen

Display all orders.

Features:

* Search
* Status filter
* Order list
* Total amount
* Customer
* Date
* Status

Statuses:

```text
Pending
Confirmed
Processing
Completed
Cancelled
```

Example:

```text
Orders

[ Search orders... ]

[All] [Pending] [Processing] [Completed]

#1024
Ali M.
3 items
$120.00
Completed

#1023
John S.
2 items
$85.00
Processing
```

---

# 20. Order Data Model

```ts
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
  status:
    | "Pending"
    | "Confirmed"
    | "Processing"
    | "Completed"
    | "Cancelled";
  createdAt: string;
}
```

---

# 21. Order Details

Route:

```text
/orders/[id]
```

Display:

```text
Order #1024

Customer
Ali M.
ali@example.com

Products

iPhone Case
2 × $20

Fast Charger
1 × $35

Subtotal
$75

Total
$75

Status
Completed

Order Date
September 28, 2026
```

Include a back button.

---

# 22. Analytics Screen

This screen should provide a more detailed view of business performance.

Sections:

### Revenue

```text
Total Revenue
$15,420
+12.4%
```

### Orders

```text
386
+8.2%
```

### Customers

```text
241
+15.1%
```

### Average Order Value

```text
$39.95
```

---

# 23. Analytics Charts

Include:

### Revenue Over Time

Line chart.

### Orders Over Time

Bar chart.

### Sales by Category

Pie/donut chart.

Example:

```text
Electronics       45%
Accessories       30%
Clothing          15%
Other             10%
```

### Top Products

Rank products by revenue.

---

# 24. Analytics Period Selector

Provide:

```text
7 Days
30 Days
3 Months
1 Year
```

The UI should update the displayed mock data when the period changes.

The calculations should be implemented through reusable functions rather than hardcoded values inside the UI.

---

# 25. Profile Screen

Display:

```text
Profile

[Avatar]

Huseyn Hasanzade
huseyn@example.com

Nova Store
Retail

────────────────

Account

Edit Profile
Business Information
Settings

────────────────

Logout
```

---

# 26. Reusable UI Components

Create reusable components where appropriate.

Examples:

```text
Button
Input
Card
Badge
Avatar
Header
SearchBar
KpiCard
ProductCard
OrderCard
SectionHeader
EmptyState
LoadingState
ErrorState
```

Do not duplicate the same UI code across multiple screens.

---

# 27. Mock Data

Create realistic mock data.

At minimum:

### Users

3–5 users are enough.

### Products

10–15 products.

### Orders

20–30 orders.

The data should look realistic.

Use categories such as:

```text
Electronics
Accessories
Clothing
Home
Other
```

Products should have different:

* prices
* stock levels
* sales
* revenue

Orders should have different:

* customers
* dates
* totals
* statuses

---

# 28. Analytics Calculations

Do not hardcode every analytics number.

Create reusable functions.

Examples:

```ts
calculateTotalRevenue(orders)
calculateTotalOrders(orders)
calculateTotalCustomers(orders)
calculateAverageOrderValue(orders)
getTopProducts(products)
getRevenueByDay(orders)
getRevenueByCategory(orders)
```

Example:

```ts
const totalRevenue = orders.reduce(
  (sum, order) => sum + order.total,
  0
);
```

This is important because later the mock data will be replaced by real backend data.

---

# 29. State Management

For the first version, keep state management simple.

Use React state/context where appropriate.

Do not introduce Redux unless there is a real need.

The main objective is a clean and understandable frontend.

---

# 30. API Preparation

Create:

```text
services/api.ts
```

But do not make real API calls yet.

Prepare a simple structure that can later contain functions such as:

```ts
getProducts()
getProduct(id)
createProduct(data)
updateProduct(id, data)
deleteProduct(id)

getOrders()
getOrder(id)

getDashboardAnalytics()
getAnalytics(period)
```

For now these functions can remain placeholders or use mock data.

---

# 31. Error, Loading and Empty States

Every major list should have:

### Loading state

```text
Loading products...
```

### Empty state

```text
No products found.

Add your first product.
```

### Error state

```text
Something went wrong.

Try again.
```

These should be reusable components.

---

# 32. Responsive Design

The application must work on different phone sizes.

Do not rely on fixed widths.

Use:

* Flexbox
* Dimensions when necessary
* ScrollView
* FlatList
* SafeAreaView / appropriate Expo components

The application must work correctly on a physical Expo device.

---

# 33. Accessibility

Use:

* readable text
* sufficient contrast
* meaningful button labels
* reasonable touch target sizes

Avoid tiny buttons.

---

# 34. Performance

Prefer:

* FlatList for long lists
* memoization only when needed
* reusable components
* local mock data
* minimal dependencies

Do not over-engineer the application.

---

# 35. Navigation Rules

Navigation should work as follows:

```text
Login
  ↓
Dashboard

Dashboard
  ↓
Product → Product Details
  ↓
Edit Product

Products
  ↓
Create Product

Orders
  ↓
Order Details

Bottom Tabs
  ↓
Dashboard
Products
Orders
Analytics
Profile
```

Back navigation must work correctly.

---

# 36. Frontend Development Rules for AI

When implementing this project:

1. First inspect the existing code.
2. Do not overwrite working code unnecessarily.
3. Reuse existing components.
4. Follow the established folder structure.
5. Use TypeScript.
6. Avoid unnecessary dependencies.
7. Keep components small and reusable.
8. Do not implement backend functionality during the frontend phase.
9. Do not create fake API requests unless explicitly requested.
10. Use mock data for now.
11. Keep the architecture ready for future backend integration.
12. After each major change, verify that the application still runs.

---

# 37. Development Order

Implement the frontend in this order:

## Phase 1 — Project Setup

* Expo
* React Native
* TypeScript
* Expo Router
* Theme
* Folder structure

## Phase 2 — Navigation

* Auth navigation
* Tab navigation
* Stack navigation
* Routes

## Phase 3 — Shared UI

* Button
* Input
* Card
* Badge
* Header
* Search bar
* Loading state
* Empty state

## Phase 4 — Authentication UI

* Login
* Register

## Phase 5 — Dashboard

* Header
* Revenue card
* KPI cards
* Revenue chart
* Top products
* Recent orders

## Phase 6 — Products

* Product list
* Search
* Filters
* Product details
* Create product
* Edit product

## Phase 7 — Orders

* Order list
* Search
* Filters
* Order details
* Status badges

## Phase 8 — Analytics

* KPI metrics
* Revenue chart
* Orders chart
* Category chart
* Top products
* Period selection

## Phase 9 — Profile

* Profile
* Business information
* Settings UI
* Logout

## Phase 10 — Polish

* Loading states
* Empty states
* Error states
* Responsive layout
* UI consistency
* Navigation testing
* Physical device testing

---

# 38. Future Backend Architecture

This section is informational only.

Do NOT implement it during the current frontend phase.

Later the application will use:

```text
React Native
      ↓
REST API
      ↓
Node.js
      ↓
Express.js
      ↓
Supabase
      ↓
PostgreSQL
```

Future database entities may include:

```text
users
profiles
businesses
products
orders
order_items
customers
categories
```

Later analytics will be calculated from real database data.

---

# 39. Future API

The future backend may expose:

```http
POST   /api/auth/login
POST   /api/auth/register

GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id

GET    /api/analytics/dashboard
GET    /api/analytics/revenue
GET    /api/analytics/orders
GET    /api/analytics/products
GET    /api/analytics/customers

GET    /api/profile
PUT    /api/profile
```

Again, these are **future requirements**, not current implementation requirements.

---

# 40. Definition of Done — Frontend

The frontend phase is complete when:

* [ ] Expo application starts successfully
* [ ] TypeScript works without errors
* [ ] Login screen works
* [ ] Register screen works
* [ ] Dashboard works
* [ ] Products screen works
* [ ] Product details work
* [ ] Create Product works locally
* [ ] Edit Product works locally
* [ ] Orders screen works
* [ ] Order details work
* [ ] Analytics screen works
* [ ] Profile screen works
* [ ] Bottom navigation works
* [ ] All important routes work
* [ ] Mock data is realistic
* [ ] Charts render correctly
* [ ] Search works
* [ ] Filters work
* [ ] Loading states exist
* [ ] Empty states exist
* [ ] Error states exist
* [ ] Application works on a physical Expo device
* [ ] No critical TypeScript/runtime errors remain

---

# 41. Important Instruction for Antigravity

Do NOT attempt to implement the entire project in one step.

Implement the project incrementally.

After each phase:

1. Inspect the current implementation.
2. Make the requested changes.
3. Run/type-check the application.
4. Fix errors.
5. Explain what was changed.
6. Wait for the next development instruction.

The current priority is:

**BUILD A HIGH-QUALITY FRONTEND FIRST.**

Backend integration will happen later.

Do not implement future backend functionality unless explicitly instructed.
