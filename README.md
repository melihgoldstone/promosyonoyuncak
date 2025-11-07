# PROMOSYONOYUNCAK.COM

Professional B2B e-commerce platform for wholesale toys and party supplies.

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Carousel:** Embla Carousel
- **Forms:** React Hook Form + Zod
- **Notifications:** React Hot Toast

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL 14+
- **Authentication:** JWT
- **Image Storage:** Cloudinary
- **Image Processing:** Sharp.js

## Features

### Customer Features
- Product catalog with search and filters
- Product detail pages with image galleries
- Shopping cart with persistent storage
- User authentication (register/login)
- Multi-step checkout process
- Order management
- Responsive design (mobile, tablet, desktop)

### Admin Features
- Admin dashboard with statistics
- Product management (CRUD)
- Order management with status tracking
- User management
- Image upload system
- Secure admin-only routes

## Project Structure

```
promosyonoyuncak/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin panel pages
│   │   ├── layout.tsx       # Admin layout with sidebar
│   │   ├── page.tsx         # Admin dashboard
│   │   ├── urunler/         # Products management
│   │   └── siparisler/      # Orders management
│   ├── giris/               # Login page
│   ├── kayit/               # Register page
│   ├── sepet/               # Shopping cart
│   ├── odeme/               # Checkout page
│   ├── urun/                # Product detail
│   ├── kategori/            # Category pages
│   ├── error.tsx            # Global error page
│   ├── loading.tsx          # Global loading page
│   └── not-found.tsx        # 404 page
├── lib/
│   ├── api/                 # API client layer
│   │   ├── client.ts        # Axios configuration
│   │   ├── auth.ts          # Auth API
│   │   ├── products.ts      # Products API
│   │   ├── categories.ts    # Categories API
│   │   └── orders.ts        # Orders API
│   ├── store/               # Zustand stores
│   │   └── cart-store.ts    # Shopping cart state
│   └── utils.ts             # Utility functions
├── hooks/
│   ├── useProducts.ts       # Product data fetching
│   └── useAuth.ts           # Authentication hook
├── components/
│   ├── home/                # Homepage components
│   ├── layout/              # Layout components
│   └── ui/                  # Reusable UI components
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── config/          # Configuration
│   │   └── prisma/          # Prisma schema
│   └── package.json
└── tailwind.config.ts       # Tailwind configuration
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/promosyonoyuncak.git
cd promosyonoyuncak
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up environment variables:

**Backend (.env):**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/promosyonoyuncak"
JWT_SECRET="your-secret-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
PORT=5000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

5. Set up the database:
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

6. Start the backend:
```bash
cd backend
npm run dev
```

7. Start the frontend:
```bash
npm run dev
```

8. Open http://localhost:3000

## Design System

### Color Palette
- **Primary (Turquoise):** #14b8a6
- **Background:** #f9fafb (gray-50)
- **Text:** #111827 (gray-900)

### Typography
- **Font Family:** System fonts (sans-serif)
- **Headings:** Bold, various sizes
- **Body:** Regular weight, 16px base

### Components
- Clean, minimal design
- No gradients (single color backgrounds)
- Consistent spacing and border radius
- Hover states on interactive elements

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/best-sellers` - Get best sellers

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Admin
- `POST /api/admin/upload` - Upload image (admin only)

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Backend (Render)
1. Push to GitHub
2. Connect to Render
3. Set environment variables
4. Deploy

## Contributing

Developed by @kubilaiswf

## License

Private - All rights reserved