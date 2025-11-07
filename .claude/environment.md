# Environment Variables Documentation

> **Last Update:** 2025-11-07
> **Project:** PROMOSYONOYUNCAK.COM

---

## 📋 OVERVIEW

This document explains all environment variables used in the project. Keep sensitive credentials secure and never commit `.env` files to git.

---

## 🔐 SECURITY BEST PRACTICES

1. **Never commit `.env` or `.env.local` files**
   - These files are in `.gitignore`
   - Only commit `.env.example` files

2. **Use strong secrets**
   - Generate JWT_SECRET: `openssl rand -base64 32`
   - Use unique passwords for each service

3. **Different values for dev/prod**
   - Development: localhost URLs
   - Production: real domain names

4. **Rotate secrets regularly**
   - Change API keys every 90 days (production)
   - Update JWT_SECRET on security incidents

---

## 🖥️ FRONTEND ENVIRONMENT VARIABLES

**File:** `.env.local` (not committed)
**Example:** `.env.example` (committed)

### Database
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/promosyonoyuncak"
```
- **Purpose:** PostgreSQL connection string
- **Development:** Local database
- **Production:** Managed PostgreSQL (Supabase/Neon)
- **Format:** `postgresql://[user]:[password]@[host]:[port]/[database]`

### Backend API
```bash
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```
- **Purpose:** Backend API base URL
- **Development:** `http://localhost:5000/api`
- **Production:** `https://promosyonoyuncak-8s9a.onrender.com/api`
- **Note:** Must start with `NEXT_PUBLIC_` to be accessible in browser

### NextAuth (Authentication)
```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```
- **NEXTAUTH_URL:**
  - Development: `http://localhost:3000`
  - Production: `https://promosyonoyuncak.com`
- **NEXTAUTH_SECRET:**
  - Random string for JWT encryption
  - Generate with: `openssl rand -base64 32`
  - Must be at least 32 characters

### Cloudinary (Image Storage)
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```
- **Purpose:** Image upload and CDN
- **Get credentials:** https://cloudinary.com/console
- **NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:** Used in browser for direct uploads
- **API_KEY & API_SECRET:** Server-side only

### Email (SMTP)
```bash
SMTP_HOST="smtp.resend.com"
SMTP_PORT="587"
SMTP_USER="resend"
SMTP_PASSWORD="your-resend-api-key"
SMTP_FROM="PROMOSYON OYUNCAK <noreply@promosyonoyuncak.com>"
```
- **Recommended Provider:** Resend (https://resend.com)
  - Free tier: 3,000 emails/month
  - Modern API
  - Easy setup
- **Alternative:** SendGrid, Gmail (with app password)

### iyzico (Payment Gateway)
```bash
IYZICO_API_KEY="your-iyzico-api-key"
IYZICO_SECRET_KEY="your-iyzico-secret-key"
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"
```
- **Purpose:** Credit card payments (Turkish market)
- **Get credentials:** https://merchant.iyzipay.com
- **Sandbox URL:** `https://sandbox-api.iyzipay.com`
- **Production URL:** `https://api.iyzipay.com`

### Site Settings
```bash
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Promosyon Oyuncak"
```
- **Purpose:** Site metadata, canonical URLs
- **SITE_URL:** Used for sitemaps, redirects
- **SITE_NAME:** Used in emails, meta tags

### Monitoring (Optional)
```bash
NEXT_PUBLIC_SENTRY_DSN="your-sentry-dsn"
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```
- **Sentry:** Error tracking (https://sentry.io)
- **Google Analytics:** Website analytics

---

## ⚙️ BACKEND ENVIRONMENT VARIABLES

**File:** `backend/.env` (not committed)
**Example:** `backend/.env.example` (committed)

### Server
```bash
NODE_ENV="development"
PORT="5000"
```
- **NODE_ENV:** `development` or `production`
- **PORT:** Server port (default: 5000)

### Database
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/promosyonoyuncak"
```
- **Same as frontend**
- **Production:** Use managed PostgreSQL
  - Supabase: Free tier, good for startups
  - Neon: Serverless PostgreSQL
  - Railway: Simple deployment

### JWT Authentication
```bash
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="30d"
```
- **JWT_SECRET:** Used to sign tokens
  - Generate: `openssl rand -base64 32`
  - Keep secret, never expose
- **JWT_EXPIRES_IN:** Token lifespan (30 days)

### CORS - Frontend URL
```bash
FRONTEND_URL="http://localhost:3000"
```
- **Purpose:** CORS whitelist (only this origin can call API)
- **Development:** `http://localhost:3000`
- **Production:** `https://promosyonoyuncak.com`

### Cloudinary
```bash
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```
- **Or use single URL:**
  ```bash
  CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
  ```
- **Purpose:** Server-side image uploads

### Email (SMTP)
```bash
SMTP_HOST="smtp.resend.com"
SMTP_PORT="587"
SMTP_USER="resend"
SMTP_PASSWORD="your-resend-api-key"
SMTP_FROM="PROMOSYON OYUNCAK <noreply@promosyonoyuncak.com>"
```
- **Or use Resend API directly:**
  ```bash
  RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
  ```
- **Purpose:** Send transactional emails

### iyzico Payment
```bash
IYZICO_API_KEY="your-iyzico-api-key"
IYZICO_SECRET_KEY="your-iyzico-secret-key"
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"
```
- **Purpose:** Process payments
- **Test Mode:** Use sandbox URL
- **Production:** Change to production URL

### Site Settings
```bash
SITE_NAME="Promosyon Oyuncak"
SITE_URL="https://promosyonoyuncak.com"
```
- **Purpose:** Email templates, redirects

### Monitoring (Optional)
```bash
SENTRY_DSN="your-sentry-dsn"
```
- **Purpose:** Error tracking in production

### Security (Optional)
```bash
MAX_LOGIN_ATTEMPTS="5"
LOCKOUT_DURATION_MINUTES="30"
RATE_LIMIT_WINDOW_MS="900000"
RATE_LIMIT_MAX_REQUESTS="100"
```
- **Purpose:** Account security, DDoS prevention
- **Defaults are reasonable for most use cases**

---

## 🔧 SETUP INSTRUCTIONS

### 1. Frontend Setup

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local and fill in values
nano .env.local  # or use your editor
```

**Required variables:**
- `NEXT_PUBLIC_API_URL` (backend URL)
- `NEXTAUTH_URL` (your domain)
- `NEXTAUTH_SECRET` (generate with openssl)

**Optional but recommended:**
- Cloudinary credentials (for image uploads)
- iyzico credentials (for payments)

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Copy example file
cp .env.example .env

# Edit .env and fill in values
nano .env
```

**Required variables:**
- `DATABASE_URL` (PostgreSQL connection)
- `JWT_SECRET` (generate with openssl)
- `FRONTEND_URL` (CORS whitelist)

**Optional but recommended:**
- Cloudinary credentials
- Email SMTP settings
- iyzico credentials

### 3. Verify Setup

```bash
# Frontend
npm run dev
# Should start on http://localhost:3000

# Backend
cd backend
npm run dev
# Should start on http://localhost:5000
```

---

## 🌍 PRODUCTION DEPLOYMENT

### Vercel (Frontend)

1. Go to Vercel dashboard
2. Import GitHub repository
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` → Your Render backend URL
   - `NEXTAUTH_URL` → `https://promosyonoyuncak.com`
   - `NEXTAUTH_SECRET` → Generated secret
   - All other variables from `.env.example`

### Render (Backend)

1. Backend already deployed (root: `backend/`)
2. Add environment variables in Render dashboard:
   - `DATABASE_URL` → Production PostgreSQL URL
   - `JWT_SECRET` → Generated secret
   - `FRONTEND_URL` → `https://promosyonoyuncak.com`
   - `NODE_ENV` → `production`
   - All other variables from `backend/.env.example`

### Database (Supabase/Neon)

1. Create project
2. Copy connection string
3. Update `DATABASE_URL` in both frontend and backend
4. Run migrations:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

---

## ❗ TROUBLESHOOTING

### "NEXTAUTH_URL is not defined"
- Make sure `.env.local` exists in root
- Restart Next.js dev server

### "Failed to connect to database"
- Check `DATABASE_URL` format
- Ensure PostgreSQL is running
- Verify credentials (username, password)

### "CORS error when calling API"
- Check `FRONTEND_URL` in backend `.env`
- Ensure it matches your frontend URL exactly
- Restart backend server

### "Cloudinary upload failed"
- Verify credentials in `.env.local` and `backend/.env`
- Check Cloudinary dashboard for account status
- Ensure `CLOUDINARY_URL` format is correct

---

## 📚 EXTERNAL SERVICE SETUP

### Cloudinary (Image Storage)

1. Sign up: https://cloudinary.com/users/register_free
2. Go to Dashboard: https://cloudinary.com/console
3. Copy credentials:
   - Cloud Name
   - API Key
   - API Secret
4. Add to both `.env.local` and `backend/.env`

**Free Tier:**
- 25 GB storage
- 25 GB bandwidth/month
- Perfect for startups

### Resend (Email)

1. Sign up: https://resend.com/signup
2. Verify domain (or use test domain)
3. Create API key
4. Add to `backend/.env`:
   ```bash
   RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
   ```

**Free Tier:**
- 3,000 emails/month
- 100 emails/day

### iyzico (Payments)

1. Sign up: https://merchant.iyzipay.com
2. Get sandbox credentials (for testing)
3. Add to `.env.local` and `backend/.env`
4. **For production:** Apply for production credentials

**Test Cards:**
- Success: 5528790000000008
- 3D Secure: 5528790000000008
- CVV: Any 3 digits

### Sentry (Error Tracking)

1. Sign up: https://sentry.io/signup
2. Create project (Next.js + Node.js)
3. Copy DSN
4. Add to both `.env.local` and `backend/.env`

**Free Tier:**
- 5,000 errors/month
- 1 project

---

## 🔑 GENERATING SECRETS

### JWT Secret
```bash
openssl rand -base64 32
```
Output example: `a7s9d8f7a6s5d4f3a2s1d0f9a8s7d6f5a4s3d2f1a0s9d8f7a6s5d4f3`

### Random Password
```bash
openssl rand -hex 16
```
Output example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

## 📝 CHECKLIST

### Development Setup
- [ ] `.env.local` created (frontend)
- [ ] `backend/.env` created
- [ ] `DATABASE_URL` configured
- [ ] `NEXTAUTH_SECRET` generated
- [ ] Frontend runs on http://localhost:3000
- [ ] Backend runs on http://localhost:5000
- [ ] Database connection works

### Production Setup
- [ ] Vercel environment variables set
- [ ] Render environment variables set
- [ ] Production database created
- [ ] Database migrations run
- [ ] Cloudinary configured (production account)
- [ ] Email service configured (production API key)
- [ ] iyzico production credentials (when ready)
- [ ] Domain configured (promosyonoyuncak.com)
- [ ] SSL certificate active
- [ ] Sentry monitoring active

---

**Last Updated:** 2025-11-07 by Claude Code
**Status:** ✅ Complete
