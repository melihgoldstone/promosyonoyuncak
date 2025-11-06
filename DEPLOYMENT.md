# 🚀 Deployment Guide - Promosyon Oyuncak

Complete deployment guide for both **Backend API** and **Frontend**.

---

## 📦 Project Structure

```
promosyonoyuncak/
├── backend/          # Express API (deploy independently)
├── app/              # Next.js Frontend
└── docker-compose.yml # Full stack deployment
```

---

## 🎯 Deployment Options

### Option 1: Separate Deployment (Recommended)

**Backend:** Railway/Render/DigitalOcean
**Frontend:** Vercel/Netlify
**Database:** Railway/Render PostgreSQL

### Option 2: Single Server (Docker Compose)

Deploy everything on one server (DigitalOcean Droplet, AWS EC2, etc.)

---

## 🔧 Backend Deployment

### Railway.app (Easiest)

1. **Create account:** https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Add PostgreSQL database**
4. **Configure backend service:**
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npx prisma migrate deploy && npm start`

5. **Set Environment Variables:**
   ```env
   NODE_ENV=production
   DATABASE_URL=${DATABASE_URL} # Auto from Railway
   JWT_SECRET=<generate-strong-secret>
   FRONTEND_URL=https://your-frontend-url.vercel.app
   IYZICO_API_KEY=<your-key>
   IYZICO_SECRET_KEY=<your-secret>
   IYZICO_BASE_URL=https://api.iyzipay.com
   ```

6. **Deploy!** Backend URL: `https://your-app.railway.app`

### Render.com

1. **New Web Service**
2. **Connect Repository**
3. **Configure:**
   - Name: `promosyonoyuncak-backend`
   - Root Directory: `backend`
   - Build: `npm install && npm run build`
   - Start: `npx prisma migrate deploy && npm start`

4. **Add PostgreSQL Database**
5. **Set Environment Variables**
6. **Deploy**

### DigitalOcean App Platform

1. **Create App**
2. **Add Component** → Web Service
3. **Select `backend` folder**
4. **Add PostgreSQL database**
5. **Configure Environment Variables**
6. **Deploy**

---

## 🎨 Frontend Deployment

### Vercel (Recommended for Next.js)

1. **Import project:** https://vercel.com/new
2. **Configure:**
   - Framework: Next.js
   - Root Directory: `/` (project root)
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables:**
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   NEXTAUTH_URL=https://your-site.vercel.app
   NEXTAUTH_SECRET=<generate-strong-secret>
   ```

4. **Deploy!**

### Netlify

1. **New Site from Git**
2. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Add Environment Variables**
4. **Deploy**

---

## 🐳 Docker Deployment (Full Stack)

Deploy both backend and database on a single server.

### 1. Setup Server

```bash
# Get a server (DigitalOcean, AWS, etc.)
# SSH into server
ssh root@your-server-ip

# Install Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt-get update
apt-get install docker-compose-plugin
```

### 2. Clone Repository

```bash
git clone https://github.com/your-username/promosyonoyuncak.git
cd promosyonoyuncak
```

### 3. Configure Environment

```bash
# Create backend .env
cd backend
cp .env.example .env
nano .env  # Edit with your values
cd ..

# Edit docker-compose.yml if needed
```

### 4. Deploy

```bash
# Build and start
docker-compose up -d

# Check logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 5. Setup Nginx (Reverse Proxy)

```bash
# Install Nginx
apt-get install nginx certbot python3-certbot-nginx

# Configure Nginx
nano /etc/nginx/sites-available/promosyonoyuncak

# Add configuration:
server {
    listen 80;
    server_name api.promosyonoyuncak.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/promosyonoyuncak /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Get SSL certificate
certbot --nginx -d api.promosyonoyuncak.com
```

---

## 🔒 SSL Certificate

### Railway/Render/Vercel
✅ Automatic SSL (included)

### Custom Domain
```bash
# Use Let's Encrypt (Free)
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 📊 Database Setup

### Railway PostgreSQL

1. Add PostgreSQL addon
2. Copy `DATABASE_URL` from Railway
3. Add to backend environment variables
4. Migrations run automatically on deploy

### Manual PostgreSQL

```bash
# Connect to your database
psql postgresql://user:pass@host:5432/dbname

# Run migrations manually
cd backend
npx prisma migrate deploy
```

---

## 🔄 CI/CD Setup

### GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: |
          # Railway CLI deployment
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: |
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 🧪 Testing Deployment

```bash
# Test backend health
curl https://your-backend-url.com/health

# Test auth endpoint
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'

# Test frontend
open https://your-frontend-url.com
```

---

## 🔧 Environment Variables Checklist

### Backend
- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL` (from hosting provider)
- [ ] `JWT_SECRET` (generate strong random string)
- [ ] `FRONTEND_URL` (your frontend URL)
- [ ] `IYZICO_API_KEY`
- [ ] `IYZICO_SECRET_KEY`
- [ ] `IYZICO_BASE_URL`

### Frontend
- [ ] `NEXT_PUBLIC_API_URL` (your backend URL)
- [ ] `NEXTAUTH_URL` (your frontend URL)
- [ ] `NEXTAUTH_SECRET` (generate strong random string)

---

## 📝 Post-Deployment

1. **Test all features:**
   - [ ] User registration/login
   - [ ] Browse products
   - [ ] Add to cart
   - [ ] Checkout process
   - [ ] Admin panel access

2. **Setup monitoring:**
   - Railway/Render dashboard
   - Vercel analytics
   - Error tracking (Sentry, etc.)

3. **Setup backups:**
   - Database backups (automatic on Railway/Render)
   - Code repository (GitHub)

4. **Update DNS:**
   - Point your domain to deployed URLs
   - Update CORS settings with final domains

---

## 🆘 Troubleshooting

### Backend not connecting to database
- Check `DATABASE_URL` is correct
- Verify database is running
- Check firewall rules

### Frontend can't reach backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is deployed and accessible

### Build fails
- Check all dependencies are in `package.json`
- Verify Node.js version matches
- Check build logs for specific errors

---

## 💡 Tips

1. **Use environment-specific configs**
2. **Enable logging and monitoring**
3. **Setup automatic backups**
4. **Use strong secrets in production**
5. **Test on staging before production**
6. **Keep dependencies updated**
7. **Monitor performance and errors**

---

## 📚 Resources

- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

**🎉 Deployment Complete!**

Your e-commerce platform is now live! 🚀
