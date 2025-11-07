# PROMOSYONOYUNCAK.COM - Sistem Mimarisi Dokümantasyonu

> **Version:** 1.0
> **Last Update:** 2025-11-07
> **Author:** @kubilaiswf

---

## 📐 MİMARİ GENEL BAKIŞ

### **Mimari Tipi:** Decoupled Full-Stack (Frontend + Backend Separation)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │         Next.js 14 App Router (React 18)                    ││
│  │  ┌──────────────────────┐  ┌──────────────────────────────┐ ││
│  │  │  Server Components   │  │   Client Components          │ ││
│  │  │  - SEO Optimized     │  │   - Interactive UI           │ ││
│  │  │  - SSR               │  │   - State Management (Zustand)││
│  │  │  - ISR (revalidate)  │  │   - Animations (Framer)      │ ││
│  │  └──────────────────────┘  └──────────────────────────────┘ ││
│  │                                                               ││
│  │  Auth: NextAuth.js (JWT Strategy)                           ││
│  │  Styling: Tailwind CSS + Glassmorphism                      ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │ HTTP/REST API (Axios)
                              │ JSON Communication
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │            Express.js Backend API (Node.js 18+)             ││
│  │                                                               ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  ││
│  │  │  Middleware  │  │    Routes    │  │    Services      │  ││
│  │  │  - Auth      │  │  - Auth      │  │  - Email         │  ││
│  │  │  - CORS      │  │  - Products  │  │  - Payment       │  ││
│  │  │  - Rate Limit│  │  - Orders    │  │  - Analytics     │  ││
│  │  │  - Helmet    │  │  - Admin     │  │  - Upload        │  ││
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  ││
│  │                                                               ││
│  │  Auth: JWT (jsonwebtoken)                                   ││
│  │  Validation: Zod                                            ││
│  │  ORM: Prisma Client                                         ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │ Prisma Query Engine
                              │ SQL Commands
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                               │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │               PostgreSQL 14+ (Relational DB)                ││
│  │                                                               ││
│  │  Tables:                                                     ││
│  │  - User, Address, Category, Product, PriceRule              ││
│  │  - Cart, CartItem, Order, OrderItem, Setting                ││
│  │                                                               ││
│  │  Features:                                                   ││
│  │  - ACID Transactions                                        ││
│  │  - Foreign Keys & Constraints                               ││
│  │  - Indexes for Performance                                  ││
│  │  - Connection Pooling (Prisma)                              ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     EXTERNAL SERVICES                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Cloudinary  │  │   iyzico     │  │  Resend/SendGrid     │  │
│  │  (Images)    │  │  (Payments)  │  │  (Email)             │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔷 FRONTEND MİMARİSİ (Next.js 14)

### **Teknoloji Stack**
```typescript
{
  "framework": "Next.js 14.0.4",
  "runtime": "React 18",
  "language": "TypeScript 5.3",
  "styling": "Tailwind CSS 3.4",
  "stateManagement": {
    "global": "Zustand 4.4",
    "server": "React Server Components",
    "forms": "React Hook Form 7.49"
  },
  "authentication": "NextAuth.js 4.24",
  "httpClient": "Axios 1.7",
  "animations": "Framer Motion 10.16",
  "validation": "Zod 3.23"
}
```

### **Klasör Yapısı**
```
promosyonoyuncak/
├── app/                           # Next.js 14 App Router
│   ├── (dashboard)/              # Route group (layout wrapper)
│   │   └── admin/                # Admin panel pages
│   │       ├── layout.tsx        # Admin layout (sidebar, header)
│   │       ├── page.tsx          # Dashboard (analytics)
│   │       ├── urunler/          # Products management
│   │       ├── siparisler/       # Orders management
│   │       ├── kategoriler/      # Categories management
│   │       ├── musteriler/       # Customers management
│   │       └── ayarlar/          # Settings
│   ├── (public)/                 # Public route group (future)
│   │   ├── urunler/              # Product catalog
│   │   │   ├── page.tsx          # Product list
│   │   │   └── [slug]/           # Product detail
│   │   ├── kategoriler/          # Categories
│   │   │   └── [slug]/           # Category page
│   │   ├── sepet/                # Cart
│   │   ├── odeme/                # Checkout
│   │   └── hesabim/              # User account
│   │       ├── siparislerim/     # Orders
│   │       ├── adreslerim/       # Addresses
│   │       ├── profil/           # Profile
│   │       └── favorilerim/      # Wishlist
│   ├── giris/                    # Login page
│   ├── kayit/                    # Register page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   └── ...
│   ├── admin/                    # Admin-specific components
│   │   ├── ProductForm.tsx
│   │   ├── OrdersTable.tsx
│   │   ├── ImageUpload.tsx
│   │   └── ...
│   ├── products/                 # Product components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ImageGallery.tsx
│   │   └── ...
│   ├── cart/                     # Cart components
│   │   ├── CartDrawer.tsx
│   │   ├── CartIcon.tsx
│   │   └── ...
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Sidebar.tsx
│
├── lib/                          # Utilities & configurations
│   ├── auth/                     # Authentication
│   │   ├── auth-options.ts       # NextAuth config
│   │   └── auth.ts               # Auth utilities
│   ├── api/                      # API client
│   │   ├── client.ts             # Axios instance
│   │   ├── products.ts           # Product API calls
│   │   ├── orders.ts             # Order API calls
│   │   └── ...
│   ├── stores/                   # Zustand stores
│   │   ├── cart.ts               # Cart store
│   │   └── user.ts               # User store
│   ├── utils/                    # Utility functions
│   │   ├── format.ts             # formatPrice, formatDate
│   │   ├── validation.ts         # Zod schemas
│   │   └── slugify.ts            # Slug generation
│   └── constants/                # Constants
│       └── index.ts              # App constants
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── prisma/                       # Prisma schema (frontend copy)
│   └── schema.prisma
│
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

### **Rendering Stratejisi**

#### **1. Server Components (Default)**
- **Kullanım:** SEO-critical pages, static content
- **Örnekler:** Homepage, product detail, category pages
- **Avantajlar:**
  - SEO-friendly (HTML direkt server'dan)
  - Faster initial load
  - No JavaScript shipped to client (smaller bundle)

```tsx
// app/urunler/[slug]/page.tsx (Server Component)
export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Fetch data directly on server
  const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.slug}`)
    .then(res => res.json())

  return <ProductDetail product={product} />
}
```

#### **2. Client Components (Interactive)**
- **Kullanım:** Forms, modals, animations, state management
- **Örnekler:** Cart, search, filters, admin forms
- **Marker:** `'use client'` directive

```tsx
// components/cart/CartDrawer.tsx (Client Component)
'use client'

import { useCartStore } from '@/lib/stores/cart'

export default function CartDrawer() {
  const { items, removeItem } = useCartStore()
  // ... interactive logic
}
```

#### **3. ISR (Incremental Static Regeneration)**
- **Kullanım:** Product pages (frequently updated but cacheable)
- **Revalidate:** 60 seconds

```tsx
// app/urunler/[slug]/page.tsx
export const revalidate = 60 // Revalidate every 60 seconds

export default async function ProductPage({ params }) {
  // ...
}
```

#### **4. SSR (Server-Side Rendering)**
- **Kullanım:** Dynamic, user-specific pages
- **Örnekler:** User account, checkout, admin pages
- **Config:** No static optimization

```tsx
// app/hesabim/siparislerim/page.tsx
export const dynamic = 'force-dynamic' // Always server-render

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)
  const orders = await fetchUserOrders(session.user.id)
  // ...
}
```

### **State Management Stratejisi**

#### **1. Server State (React Server Components)**
- **Kullanım:** Initial data fetch
- **Avantajlar:** No client-side state, SEO-friendly

#### **2. Global Client State (Zustand)**
```typescript
// lib/stores/cart.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
)
```

#### **3. Form State (React Hook Form)**
```typescript
// components/admin/ProductForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '@/lib/utils/validation'

export default function ProductForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = async (data) => {
    // ...
  }
}
```

### **API Communication**

#### **Axios Client Setup**
```typescript
// lib/api/client.ts
import axios from 'axios'
import { getSession } from 'next-auth/react'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (add JWT token)
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession()
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`
  }
  return config
})

// Response interceptor (handle errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/giris'
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

#### **API Functions**
```typescript
// lib/api/products.ts
import apiClient from './client'

export const fetchProducts = async (params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
}) => {
  const { data } = await apiClient.get('/api/products', { params })
  return data
}

export const fetchProduct = async (id: string) => {
  const { data } = await apiClient.get(`/api/products/${id}`)
  return data
}

export const createProduct = async (productData: CreateProductDTO) => {
  const { data } = await apiClient.post('/api/admin/products', productData)
  return data
}
```

### **Authentication Flow (NextAuth.js)**

```typescript
// lib/auth/auth-options.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Call backend API
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          })

          if (data.token && data.user) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              role: data.user.role,
              accessToken: data.token,
            }
          }
          return null
        } catch (error) {
          throw new Error('Invalid credentials')
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: '/giris',
    signOut: '/giris',
    error: '/giris',
  }
}
```

---

## 🔶 BACKEND MİMARİSİ (Express.js)

### **Teknoloji Stack**
```typescript
{
  "runtime": "Node.js 18.17.0+",
  "framework": "Express.js 4.19.2",
  "language": "TypeScript 5.3",
  "orm": "Prisma 5.22.0",
  "database": "PostgreSQL 14+",
  "authentication": "JWT (jsonwebtoken 9.0.2)",
  "validation": "Zod 3.23.8",
  "security": {
    "helmet": "7.1.0",
    "cors": "2.8.5",
    "rateLimiting": "express-rate-limit 7.4.1",
    "passwordHashing": "bcryptjs 2.4.3"
  }
}
```

### **Klasör Yapısı**
```
backend/
├── src/
│   ├── config/                   # Configuration files
│   │   ├── database.ts           # Prisma client instance
│   │   ├── cloudinary.ts         # Cloudinary config (future)
│   │   ├── iyzico.ts             # iyzico payment config (future)
│   │   └── email.ts              # Email service config (future)
│   │
│   ├── middleware/               # Express middleware
│   │   ├── auth.middleware.ts    # JWT authentication
│   │   ├── error.middleware.ts   # Error handler (future)
│   │   ├── upload.middleware.ts  # File upload (future)
│   │   └── validation.middleware.ts # Request validation (future)
│   │
│   ├── routes/                   # API routes
│   │   ├── auth.routes.ts        # /api/auth/*
│   │   ├── product.routes.ts     # /api/products/*
│   │   ├── category.routes.ts    # /api/categories/*
│   │   ├── order.routes.ts       # /api/orders/*
│   │   ├── payment.routes.ts     # /api/payment/* (future)
│   │   └── admin/                # Admin routes
│   │       ├── product.routes.ts # /api/admin/products/*
│   │       ├── category.routes.ts # /api/admin/categories/*
│   │       ├── order.routes.ts   # /api/admin/orders/* (future)
│   │       ├── user.routes.ts    # /api/admin/users/* (future)
│   │       ├── analytics.routes.ts # /api/admin/analytics/* (future)
│   │       └── upload.routes.ts  # /api/admin/upload/* (future)
│   │
│   ├── services/                 # Business logic
│   │   ├── auth.service.ts       # Authentication logic (future)
│   │   ├── product.service.ts    # Product business logic (future)
│   │   ├── order.service.ts      # Order processing (future)
│   │   ├── payment.service.ts    # Payment integration (future)
│   │   ├── email.service.ts      # Email sending (future)
│   │   └── analytics.service.ts  # Analytics calculations (future)
│   │
│   ├── utils/                    # Utility functions
│   │   ├── slug.ts               # Slug generation (Turkish chars)
│   │   ├── validation.ts         # Zod schemas
│   │   └── logger.ts             # Winston logger (future)
│   │
│   ├── types/                    # TypeScript types
│   │   ├── express.d.ts          # Express type extensions
│   │   └── index.ts              # Shared types
│   │
│   └── index.ts                  # Express app entry point
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Database migrations
│   └── seed.ts                   # Seed data (future)
│
├── .env                          # Environment variables
├── Dockerfile                    # Docker configuration
├── package.json
└── tsconfig.json
```

### **Express App Setup**

```typescript
// src/index.ts
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'

// Routes
import authRoutes from './routes/auth.routes'
import productRoutes from './routes/product.routes'
import categoryRoutes from './routes/category.routes'
import orderRoutes from './routes/order.routes'
import adminProductRoutes from './routes/admin/product.routes'
import adminCategoryRoutes from './routes/admin/category.routes'

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})
app.use('/api/', limiter)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression
app.use(compression())

// Logging
app.use(morgan('combined'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/admin/products', adminProductRoutes)
app.use('/api/admin/categories', adminCategoryRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      status: err.status || 500,
    },
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🔒 Environment: ${process.env.NODE_ENV || 'development'}`)
})
```

### **Authentication Middleware**

```typescript
// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface JWTPayload {
  userId: string
  email: string
  role: string
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        role: string
      }
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload

    // Optionally: verify user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' })
  }
}

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}
```

### **API Route Example**

```typescript
// src/routes/product.routes.ts
import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET /api/products (Public)
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      search,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query

    const skip = (Number(page) - 1) * Number(limit)

    // Build where clause
    const where: any = { isActive: true }

    if (category) {
      where.categoryId = category
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { sku: { contains: search as string, mode: 'insensitive' } },
      ]
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = Number(minPrice)
      if (maxPrice) where.price.lte = Number(maxPrice)
    }

    // Fetch products
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { [sortBy as string]: sortOrder },
        select: {
          id: true,
          name: true,
          slug: true,
          sku: true,
          price: true,
          comparePrice: true,
          images: true,
          stock: true,
          category: {
            select: { id: true, name: true, slug: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ])

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// GET /api/products/:slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
        priceRules: {
          orderBy: { minQuantity: 'asc' },
        },
      },
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

export default router
```

---

## 🔸 VERİTABANI MİMARİSİ (PostgreSQL + Prisma)

### **Prisma Schema Overview**

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ========== USER MANAGEMENT ==========

model User {
  id         String    @id @default(uuid())
  email      String    @unique
  password   String
  name       String?
  phone      String?
  role       Role      @default(CUSTOMER)
  isVerified Boolean   @default(false)
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  addresses Address[]
  orders    Order[]
  cart      Cart?

  @@index([email])
}

enum Role {
  CUSTOMER
  ADMIN
}

model Address {
  id         String   @id @default(uuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  title      String
  fullName   String
  phone      String
  city       String
  district   String
  address    String   @db.Text
  zipCode    String?
  isDefault  Boolean  @default(false)

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  orders     Order[]

  @@index([userId])
}

// ========== PRODUCT CATALOG ==========

model Category {
  id          String     @id @default(uuid())
  name        String
  slug        String     @unique
  description String?    @db.Text
  image       String?
  parentId    String?
  parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")

  isActive    Boolean    @default(true)
  order       Int        @default(0)

  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  products    Product[]

  @@index([slug])
  @@index([parentId])
}

model Product {
  id            String      @id @default(uuid())
  name          String
  slug          String      @unique
  sku           String      @unique
  description   String?     @db.Text

  price         Float
  comparePrice  Float?
  cost          Float?

  images        String[]
  stock         Int         @default(0)
  lowStockAlert Int         @default(10)

  categoryId    String
  category      Category    @relation(fields: [categoryId], references: [id])

  weight        Float?
  dimensions    Json?       // { length, width, height }

  isActive      Boolean     @default(true)
  isFeatured    Boolean     @default(false)

  metaTitle     String?
  metaDesc      String?     @db.Text

  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  cartItems     CartItem[]
  orderItems    OrderItem[]
  priceRules    PriceRule[]

  @@index([slug])
  @@index([sku])
  @@index([categoryId])
  @@index([isActive])
}

model PriceRule {
  id          String   @id @default(uuid())
  productId   String
  product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  minQuantity Int
  maxQuantity Int?
  price       Float

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([productId])
}

// ========== CART ==========

model Cart {
  id        String     @id @default(uuid())
  userId    String     @unique
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)

  items     CartItem[]

  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model CartItem {
  id        String   @id @default(uuid())
  cartId    String
  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)

  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  quantity  Int      @default(1)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([cartId, productId])
  @@index([cartId])
  @@index([productId])
}

// ========== ORDERS ==========

model Order {
  id            String        @id @default(uuid())
  orderNumber   String        @unique

  userId        String
  user          User          @relation(fields: [userId], references: [id])

  addressId     String
  address       Address       @relation(fields: [addressId], references: [id])

  items         OrderItem[]

  subtotal      Float
  shippingCost  Float         @default(0)
  tax           Float         @default(0)
  total         Float

  status        OrderStatus   @default(PENDING)
  paymentStatus PaymentStatus @default(PENDING)

  paymentMethod String?
  paymentId     String?
  paymentToken  String?

  shippingMethod String?
  trackingNumber String?

  notes         String?       @db.Text

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@index([userId])
  @@index([status])
  @@index([createdAt])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

model OrderItem {
  id        String   @id @default(uuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)

  productId String
  product   Product  @relation(fields: [productId], references: [id])

  quantity  Int
  price     Float    // Price at time of order

  createdAt DateTime @default(now())

  @@index([orderId])
  @@index([productId])
}

// ========== SETTINGS ==========

model Setting {
  id        String   @id @default(uuid())
  key       String   @unique
  value     String   @db.Text

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([key])
}
```

### **Database Indexes Strategy**

**Optimized Queries:**
```sql
-- Product queries (slug, sku, category, active status)
CREATE INDEX "Product_slug_idx" ON "Product"("slug");
CREATE INDEX "Product_sku_idx" ON "Product"("sku");
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- Order queries (user, status, date)
CREATE INDEX "Order_userId_idx" ON "Order"("userId");
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- User queries (email for login)
CREATE INDEX "User_email_idx" ON "User"("email");

-- Category queries (slug, parent)
CREATE INDEX "Category_slug_idx" ON "Category"("slug");
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");
```

### **Prisma Client Usage**

```typescript
// src/config/database.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

---

## 🔗 EXTERNAL SERVICES INTEGRATION

### **1. Cloudinary (Image Storage)**

```typescript
// src/config/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary
```

**Upload Function:**
```typescript
// src/services/upload.service.ts
import cloudinary from '../config/cloudinary'
import sharp from 'sharp'

export const uploadImage = async (file: Express.Multer.File) => {
  // Optimize image
  const optimized = await sharp(file.buffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer()

  // Upload to Cloudinary
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'promosyonoyuncak', format: 'webp' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(optimized)
  })
}
```

### **2. iyzico (Payment Gateway)**

```typescript
// src/config/iyzico.ts
import Iyzipay from 'iyzipay'

export const iyzico = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY as string,
  secretKey: process.env.IYZICO_SECRET_KEY as string,
  uri: process.env.IYZICO_BASE_URL as string, // sandbox or production
})
```

**Payment Service:**
```typescript
// src/services/payment.service.ts
import { iyzico } from '../config/iyzico'

export const initializePayment = async (orderData: any) => {
  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: orderData.orderId,
    price: orderData.total.toString(),
    paidPrice: orderData.total.toString(),
    currency: Iyzipay.CURRENCY.TRY,
    basketId: orderData.orderId,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: `${process.env.FRONTEND_URL}/api/payment/callback`,
    enabledInstallments: [2, 3, 6, 9],
    buyer: { /* buyer info */ },
    shippingAddress: { /* shipping address */ },
    billingAddress: { /* billing address */ },
    basketItems: [ /* items */ ],
  }

  return new Promise((resolve, reject) => {
    iyzico.checkoutFormInitialize.create(request, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}
```

### **3. Resend (Email Service)**

```typescript
// src/config/email.ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
```

**Email Service:**
```typescript
// src/services/email.service.ts
import { resend } from '../config/email'
import { render } from '@react-email/render'
import OrderConfirmationEmail from '../../emails/OrderConfirmationEmail'

export const sendOrderConfirmation = async (order: any) => {
  const emailHtml = render(<OrderConfirmationEmail order={order} />)

  await resend.emails.send({
    from: 'PROMOSYONOYUNCAK <noreply@promosyonoyuncak.com>',
    to: order.user.email,
    subject: `Siparişiniz Alındı - #${order.orderNumber}`,
    html: emailHtml,
  })
}
```

---

## 🚀 DEPLOYMENT MİMARİSİ

### **Production Environment**

```
┌─────────────────────────────────────────────────────────┐
│                   CLOUDFLARE DNS                         │
│              promosyonoyuncak.com                        │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌───────────────────┐     ┌───────────────────────┐
│  VERCEL           │     │  RENDER               │
│  (Frontend)       │────▶│  (Backend API)        │
│  - Next.js        │     │  - Express.js         │
│  - SSR/ISR        │     │  - JWT Auth           │
│  - Edge Functions │     │  - Prisma ORM         │
│  - CDN            │     │                       │
└───────────────────┘     └───────┬───────────────┘
                                  │
                                  ▼
                          ┌───────────────────┐
                          │  SUPABASE/NEON    │
                          │  PostgreSQL       │
                          │  - Managed DB     │
                          │  - Auto Backups   │
                          │  - Connection Pool│
                          └───────────────────┘

┌─────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ CLOUDINARY   │  │   IYZICO     │  │   RESEND     │  │
│  │ (Images/CDN) │  │  (Payments)  │  │   (Email)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │   SENTRY     │  │ UPTIMEROBOT  │                    │
│  │ (Monitoring) │  │  (Uptime)    │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

### **Deployment Configuration**

#### **Vercel (Frontend)**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs",
  "nodeVersion": "18.x"
}
```

#### **Render (Backend)**
```yaml
services:
  - type: web
    name: promosyonoyuncak-api
    env: node
    plan: starter # Free tier
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false # Set in Render dashboard
      - key: JWT_SECRET
        generateValue: true
    healthCheckPath: /api/health
    autoDeploy: true
```

---

## 📊 PERFORMANS OPTİMİZASYONLARI

### **Frontend Optimization**
1. **Image Optimization:** Next.js Image component + Cloudinary CDN
2. **Code Splitting:** Dynamic imports for heavy components
3. **ISR:** Product pages revalidate every 60s
4. **Prefetching:** Link prefetch on hover
5. **Bundle Analysis:** Remove unused dependencies
6. **Lazy Loading:** Images, modals, drawers

### **Backend Optimization**
1. **Database Indexing:** Optimized indexes on frequently queried fields
2. **Connection Pooling:** Prisma connection pool (PgBouncer in production)
3. **Caching:** Redis for hot data (future)
4. **Response Compression:** Gzip enabled
5. **Query Optimization:** Select only needed fields

### **Database Optimization**
1. **Indexes:** Strategic indexes on slug, sku, email, userId, status
2. **Pagination:** Offset-based pagination (consider cursor-based for large datasets)
3. **Eager Loading:** Use Prisma `include` wisely to avoid N+1 queries

---

## 🔐 GÜVENLİK MİMARİSİ

### **Security Layers**

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 1: NETWORK SECURITY                               │
│  - HTTPS (TLS 1.3)                                      │
│  - HSTS Headers                                         │
│  - Cloudflare DDoS Protection (optional)                │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│  LAYER 2: APPLICATION SECURITY                           │
│  - Helmet.js (Security Headers)                         │
│  - CORS (Whitelist Frontend URL)                        │
│  - Rate Limiting (100 req/15min)                        │
│  - CSRF Tokens (state-changing requests)                │
│  - Input Validation (Zod)                               │
│  - Input Sanitization (DOMPurify, validator)            │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│  LAYER 3: AUTHENTICATION & AUTHORIZATION                 │
│  - JWT (HS256, 30-day expiry)                           │
│  - Password Hashing (bcrypt, 12 rounds)                 │
│  - Role-Based Access Control (CUSTOMER, ADMIN)          │
│  - Session Management (HTTPOnly, Secure, SameSite)      │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│  LAYER 4: DATA SECURITY                                  │
│  - SQL Injection Prevention (Prisma ORM)                │
│  - XSS Prevention (Sanitization)                        │
│  - Environment Variables (Sensitive data)               │
│  - Encrypted Connections (PostgreSQL SSL)               │
└─────────────────────────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────┐
│  LAYER 5: MONITORING & LOGGING                           │
│  - Error Tracking (Sentry)                              │
│  - Audit Logs (Admin actions)                           │
│  - Failed Login Tracking                                │
│  - Uptime Monitoring (UptimeRobot)                      │
└─────────────────────────────────────────────────────────┘
```

---

## 📚 DEVELOPER WORKFLOW

### **Local Development**

```bash
# Clone repository
git clone https://github.com/username/promosyonoyuncak.git
cd promosyonoyuncak

# Install dependencies
npm install
cd backend && npm install && cd ..

# Setup environment variables
cp .env.example .env.local
cd backend && cp .env.example .env && cd ..

# Setup database
cd backend
npx prisma migrate dev
npx prisma db seed
cd ..

# Start development servers
npm run dev          # Frontend (port 3000)
cd backend && npm run dev  # Backend (port 5000)
```

### **Git Workflow**

```bash
# Feature branch
git checkout -b feature/product-catalog

# Commit changes
git add .
git commit -m "Add product catalog page

- Implement product grid
- Add filtering and sorting
- Setup pagination"

# Push to remote
git push origin feature/product-catalog

# Create pull request (GitHub)
# Merge to main after review
```

### **Database Migrations**

```bash
# Create migration
cd backend
npx prisma migrate dev --name add_wishlist_model

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

---

## 🧪 TESTING STRATEGY

### **Test Pyramid**

```
        ┌─────────────┐
        │   E2E Tests │  10% (Playwright)
        │  (Critical  │
        │    Flows)   │
        └─────────────┘
      ┌─────────────────┐
      │ Integration Tests│  30% (Supertest)
      │   (API Routes)   │
      └─────────────────┘
    ┌───────────────────────┐
    │      Unit Tests       │  60% (Jest)
    │ (Functions, Services) │
    └───────────────────────┘
```

---

## 📖 API DOCUMENTATION

### **REST API Endpoints**

**Base URL:** `https://api.promosyonoyuncak.com` (production)

#### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### **Products (Public)**
- `GET /api/products` - List products (with filters)
- `GET /api/products/:slug` - Get product detail

#### **Products (Admin)**
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

#### **Orders**
- `POST /api/orders` - Create order
- `GET /api/orders` - User's orders
- `GET /api/orders/:id` - Order detail

---

## 📝 NOTLAR

### **Architecture Decisions**

**Why Decoupled Architecture?**
- ✅ Independent scaling (frontend vs backend)
- ✅ Technology flexibility
- ✅ Clear API contracts
- ✅ Easier to test
- ✅ Microservices-ready

**Why Next.js 14?**
- ✅ App Router (modern React patterns)
- ✅ Server Components (better performance)
- ✅ ISR (fresh content without full rebuilds)
- ✅ Image optimization (automatic)
- ✅ SEO-friendly (SSR)

**Why Prisma ORM?**
- ✅ Type-safe database access
- ✅ Auto-generated types
- ✅ Migration system
- ✅ Prevents SQL injection
- ✅ Great developer experience

**Why JWT over Session?**
- ✅ Stateless (scales horizontally)
- ✅ Works across domains
- ✅ Mobile-friendly
- ✅ No server-side session store needed

---

**Last Updated:** 2025-11-07 by Claude Code
**Status:** ✅ Complete
**Version:** 1.0
