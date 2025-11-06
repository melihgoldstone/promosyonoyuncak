# 🎮 Promosyon Oyuncak - Backend API

Standalone Express.js backend API for Promosyon Oyuncak e-commerce platform.

## 🚀 Features

- **RESTful API** - Clean and organized endpoints
- **Authentication** - JWT-based auth with bcrypt password hashing
- **Role-Based Access** - Admin and Customer roles
- **Database** - PostgreSQL with Prisma ORM
- **Security** - Helmet, CORS, Rate Limiting
- **Validation** - Zod schema validation
- **TypeScript** - Full type safety
- **Docker Ready** - Containerized for easy deployment

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Products (Public)
- `GET /api/products` - List products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product

### Categories (Public)
- `GET /api/categories` - List categories

### Orders (Requires Auth)
- `POST /api/orders` - Create new order
- `GET /api/orders` - List user orders
- `GET /api/orders/:id` - Get single order

### Admin Products (Requires Admin)
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Admin Categories (Requires Admin)
- `GET /api/admin/categories` - List all categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

### Utility
- `GET /health` - Health check endpoint

## 🛠️ Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm

### Setup

1. **Install dependencies:**

\`\`\`bash
cd backend
npm install
\`\`\`

2. **Configure environment:**

\`\`\`bash
cp .env.example .env
# Edit .env with your settings
\`\`\`

3. **Setup database:**

\`\`\`bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio
npx prisma studio
\`\`\`

4. **Start development server:**

\`\`\`bash
npm run dev
\`\`\`

API will be available at `http://localhost:5000`

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

Run both database and backend:

\`\`\`bash
# From project root
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop
docker-compose down
\`\`\`

### Using Docker only

\`\`\`bash
cd backend

# Build image
docker build -t promosyonoyuncak-backend .

# Run container
docker run -d \
  -p 5000:5000 \
  -e DATABASE_URL="your-postgres-url" \
  -e JWT_SECRET="your-secret" \
  -e FRONTEND_URL="http://localhost:3000" \
  --name backend \
  promosyonoyuncak-backend
\`\`\`

## ☁️ Production Deployment

### Railway.app

1. Create new project on [Railway](https://railway.app)
2. Add PostgreSQL database
3. Add this backend service
4. Set environment variables
5. Deploy!

\`\`\`bash
# Railway CLI
railway login
railway init
railway up
\`\`\`

### Render.com

1. Create new Web Service
2. Connect your repository
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npx prisma migrate deploy && npm start`
5. Add PostgreSQL database
6. Set environment variables

### DigitalOcean App Platform

1. Create new app
2. Select this repository
3. Choose `backend` folder
4. Add managed PostgreSQL database
5. Set environment variables
6. Deploy!

### Environment Variables for Production

\`\`\`env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=<strong-random-secret>
JWT_EXPIRES_IN=30d
FRONTEND_URL=https://your-frontend-url.com
IYZICO_API_KEY=<your-key>
IYZICO_SECRET_KEY=<your-secret>
IYZICO_BASE_URL=https://api.iyzipay.com
\`\`\`

## 🔒 Security

The API includes:

- ✅ Helmet.js for secure HTTP headers
- ✅ CORS configured for frontend domain
- ✅ Rate limiting (100 req/15min per IP)
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation with Zod
- ✅ Role-based access control

## 📊 Database Migrations

\`\`\`bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (development only!)
npx prisma migrate reset
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run tests (when implemented)
npm test

# Test endpoints with curl
curl http://localhost:5000/health
\`\`\`

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## 🔧 Troubleshooting

### Port already in use

\`\`\`bash
# Change PORT in .env
PORT=5001
\`\`\`

### Database connection error

- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check firewall settings

### CORS error

- Add your frontend URL to FRONTEND_URL environment variable
- Check CORS configuration in `src/index.ts`

## 📚 Tech Stack

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Zod** - Schema validation
- **Helmet** - Security headers
- **Morgan** - HTTP logging

## 🤝 API Response Format

### Success Response
\`\`\`json
{
  "data": { ... },
  "message": "Success message"
}
\`\`\`

### Error Response
\`\`\`json
{
  "error": "Error message"
}
\`\`\`

### Paginated Response
\`\`\`json
{
  "products": [ ... ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 12,
    "totalPages": 9
  }
}
\`\`\`

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ for Promosyon Oyuncak**
