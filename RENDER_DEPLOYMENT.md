# 🚀 Render.com Deployment Rehberi

## 📋 Adım 1: Render Hesabı Oluştur

1. **https://render.com** adresine git
2. **"Get Started for Free"** tıkla
3. **GitHub ile giriş yap** (repo'ya erişim için)

---

## 🗄️ Adım 2: PostgreSQL Database Oluştur

1. Dashboard'da **"New +"** → **"PostgreSQL"** seç
2. Ayarlar:
   - **Name:** `promosyonoyuncak-db`
   - **Database:** `promosyonoyuncak`
   - **User:** `promosyonoyuncak_user` (otomatik)
   - **Region:** Frankfurt veya en yakın
   - **Plan:** **Free** (0$/month)
3. **"Create Database"** tıkla
4. **Internal Database URL'yi kopyala** (Environment variable için lazım)
   - Format: `postgresql://user:pass@hostname/dbname`

---

## 🖥️ Adım 3: Backend Web Service Oluştur

1. Dashboard'da **"New +"** → **"Web Service"** seç
2. **GitHub repository'yi bağla:**
   - Repository: `promosyonoyuncak`
   - **"Connect"** tıkla

3. **Servis Ayarları:**
   ```
   Name: promosyonoyuncak-backend
   Region: Frankfurt (Database ile aynı bölge)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: ./render-build.sh
   Start Command: npm start
   ```

4. **Plan Seç:**
   - **Free** (0$/month) - Uyku moduna girer, ilk istek 50sn sürer
   - Ya da **Starter** ($7/month) - Hızlı, 7/24 aktif

5. **Environment Variables Ekle:** (Add Environment Variable)
   ```env
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=<Adım 2'deki Internal Database URL>
   JWT_SECRET=<güçlü-random-key-buraya> (örn: openssl rand -base64 32)
   JWT_EXPIRES_IN=30d
   FRONTEND_URL=https://promosyonoyuncak.vercel.app
   IYZICO_API_KEY=<iyzico-api-key>
   IYZICO_SECRET_KEY=<iyzico-secret-key>
   IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
   SITE_NAME=Promosyon Oyuncak
   SITE_URL=https://promosyonoyuncak.vercel.app
   ```

   **JWT_SECRET oluşturmak için PowerShell'de:**
   ```powershell
   [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).Guid))
   ```

6. **"Create Web Service"** tıkla

7. **Deploy başlayacak** (5-10 dakika sürer)

8. **Backend URL'yi kopyala:**
   - Format: `https://promosyonoyuncak-backend.onrender.com`

---

## 🎨 Adım 4: Frontend Vercel'de Deploy Et

### Vercel Deployment

1. **https://vercel.com** adresine git
2. **GitHub ile giriş yap**
3. **"Import Project"** → Repository seç
4. **Configure Project:**
   ```
   Framework Preset: Next.js
   Root Directory: ./ (ana dizin)
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install --legacy-peer-deps
   ```

5. **Environment Variables:**
   ```env
   NEXT_PUBLIC_API_URL=https://promosyonoyuncak-backend.onrender.com/api
   DATABASE_URL=<Adım 2'deki Internal Database URL>
   NEXTAUTH_URL=https://promosyonoyuncak.vercel.app
   NEXTAUTH_SECRET=<güçlü-random-key> (backend'dekinden farklı)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=<email@gmail.com>
   SMTP_PASSWORD=<app-password>
   SMTP_FROM=noreply@promosyonoyuncak.com
   IYZICO_API_KEY=<iyzico-api-key>
   IYZICO_SECRET_KEY=<iyzico-secret-key>
   IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
   NEXT_PUBLIC_SITE_URL=https://promosyonoyuncak.vercel.app
   NEXT_PUBLIC_SITE_NAME=Promosyon Oyuncak
   ```

6. **"Deploy"** tıkla

7. **Domain:**
   - Otomatik: `promosyonoyuncak.vercel.app`
   - Özel domain eklemek için: Settings → Domains

---

## ✅ Adım 5: Test Et

### Backend Test:
```bash
# Health check
curl https://promosyonoyuncak-backend.onrender.com/health

# API test
curl https://promosyonoyuncak-backend.onrender.com/api/categories
```

### Frontend Test:
- Tarayıcıda aç: `https://promosyonoyuncak.vercel.app`

---

## 🔄 Güncelleme (Re-deploy)

### Otomatik:
- GitHub'a push yaptığında **otomatik deploy** olur

### Manuel:
- Render Dashboard → Service → **"Manual Deploy"** → Deploy latest commit

---

## 💡 Önemli Notlar

### ⚠️ Render Free Plan Limitler:
- **750 saat/ay** (31 günde ~30.5 gün = yeterli)
- **15 dakika hareketsizlik sonrası uyku modu** (ilk istek 50sn sürer)
- **512 MB RAM**
- **100 GB bandwidth/ay**

### 🚀 İpuçları:
1. **Veritabanı aynı bölgede** olmalı (latency için)
2. **Free plan için CORS ayarları** önemli
3. **Environment variables doğru** olmalı
4. **Build loglarını** kontrol et hata varsa

### 📊 Monitoring:
- Render Dashboard → Logs
- Vercel Dashboard → Deployments → Function Logs

---

## 🛠️ Sorun Giderme

### Build Hatası:
```bash
# render-build.sh'a execute izni ver
chmod +x backend/render-build.sh
git add backend/render-build.sh
git commit -m "Add execute permission to render-build.sh"
git push
```

### Database Connection Hatası:
- DATABASE_URL'in Internal URL olduğundan emin ol
- SSL gerekliyse: `?sslmode=require` ekle

### CORS Hatası:
- Backend'de FRONTEND_URL doğru mu?
- Frontend'de NEXT_PUBLIC_API_URL doğru mu?

---

## 📞 İletişim & Destek

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- GitHub Issues: Repository'de issue aç

---

**✨ Deploy sonrası backend URL'yi frontend .env'e eklemeyi unutma!**
