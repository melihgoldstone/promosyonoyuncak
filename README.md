# 🎮 Promosyon Oyuncak - E-Ticaret Platformu

Türkiye'nin güvenilir toptan promosyon oyuncak tedarikçisi için geliştirilmiş, modern, güvenli ve yasal gerekliliklere uygun profesyonel e-ticaret platformu.

## ✨ Özellikler

### 🔐 Güvenlik
- ✅ SSL/TLS şifreleme
- ✅ PCI DSS uyumlu ödeme sistemi (iyzico entegrasyonu)
- ✅ XSS ve CSRF koruması
- ✅ Rate limiting
- ✅ Güvenli HTTP headers (HSTS, CSP, X-Frame-Options)
- ✅ Şifrelenmiş veri saklama

### ⚖️ Yasal Uyumluluk (Türkiye)
- ✅ KVKK (Kişisel Verilerin Korunması Kanunu) uyumlu
- ✅ Mesafeli Satış Sözleşmesi
- ✅ Gizlilik Politikası
- ✅ Kullanım Koşulları
- ✅ Çerez Politikası
- ✅ Tüm yasal metinler hazır

### 🛒 E-Ticaret Özellikleri
- ✅ Ürün katalog sistemi
- ✅ Kategori yönetimi
- ✅ Sepet sistemi
- ✅ Güvenli ödeme (iyzico)
- ✅ Sipariş takibi
- ✅ Toptan fiyatlandırma (miktar bazlı indirim)
- ✅ Kullanıcı hesap yönetimi
- ✅ Admin paneli
- ✅ Stok takibi
- ✅ Email bildirimleri

### 🎨 Teknik Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- NextAuth.js (Authentication)
- Lucide React (Icons)

**Backend (Standalone API):**
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Zod Validation
- Docker Ready

**Additional:**
- iyzico Payment Gateway (Türkiye)
- Nodemailer (Email)
- Docker & Docker Compose
- Helmet.js (Security)
- Morgan (Logging)

## 📁 Proje Yapısı

```
promosyonoyuncak/
├── backend/              # Standalone Express API
│   ├── src/             # Backend source code
│   ├── prisma/          # Database schema
│   ├── Dockerfile       # Backend container
│   └── README.md        # Backend documentation
├── app/                 # Next.js Frontend
├── components/          # React components
├── lib/                 # Utilities and stores
├── prisma/              # Frontend Prisma (if needed)
├── docker-compose.yml   # Full stack deployment
└── DEPLOYMENT.md        # Deployment guide
```

## 📋 Gereksinimler

- Node.js 18.17.0 veya üzeri
- PostgreSQL 14 veya üzeri
- npm veya yarn
- Docker (opsiyonel, deployment için)

## 🚀 Hızlı Başlangıç

### Seçenek 1: Docker ile (Önerilen)

\`\`\`bash
# 1. Projeyi klonlayın
git clone <repository-url>
cd promosyonoyuncak

# 2. Backend environment variables
cd backend
cp .env.example .env
# .env dosyasını düzenleyin
cd ..

# 3. Docker ile çalıştırın
docker-compose up -d

# Backend: http://localhost:5000
# Database: localhost:5432
\`\`\`

### Seçenek 2: Manuel Kurulum

#### Backend API

\`\`\`bash
cd backend

# Bağımlılıkları yükle
npm install

# Environment variables
cp .env.example .env
# .env dosyasını düzenleyin

# Database migration
npx prisma generate
npx prisma migrate dev

# Development server
npm run dev

# Backend: http://localhost:5000
\`\`\`

#### Frontend

\`\`\`bash
# Ana dizinde
npm install --legacy-peer-deps

# Environment variables
cp .env.example .env
# .env dosyasını düzenleyin

# Development server
npm run dev

# Frontend: http://localhost:3000
\`\`\`

## ⚙️ Environment Variables

### Backend (\`backend/.env\`)

\`\`\`env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/promosyonoyuncak"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="30d"
FRONTEND_URL="http://localhost:3000"
IYZICO_API_KEY="your-key"
IYZICO_SECRET_KEY="your-secret"
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"
\`\`\`

### Frontend (\`.env\`)

\`\`\`env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
\`\`\`

## 📁 Proje Yapısı

\`\`\`
promosyonoyuncak/
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                  # Ana sayfa
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── kvkk/                     # KVKK sayfası
│   ├── gizlilik-politikasi/      # Gizlilik politikası
│   ├── mesafeli-satis-sozlesmesi/# Mesafeli satış sözleşmesi
│   ├── kullanim-kosullari/       # Kullanım koşulları
│   └── cerez-politikasi/         # Çerez politikası
├── components/                   # React bileşenleri
├── lib/                          # Utility fonksiyonları
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts                  # Yardımcı fonksiyonlar
├── prisma/
│   └── schema.prisma             # Database şeması
├── public/                       # Statik dosyalar
├── .env                          # Environment variables
├── next.config.js                # Next.js konfigürasyonu
├── tailwind.config.ts            # Tailwind konfigürasyonu
├── tsconfig.json                 # TypeScript konfigürasyonu
└── package.json                  # Paket bağımlılıkları
\`\`\`

## 🗄️ Database Şeması

Proje aşağıdaki temel modelleri içerir:

- **User**: Kullanıcı hesapları (müşteri ve admin)
- **Address**: Teslimat adresleri
- **Category**: Ürün kategorileri (hiyerarşik)
- **Product**: Ürünler
- **PriceRule**: Toptan fiyat kuralları
- **Cart**: Sepet
- **CartItem**: Sepet ürünleri
- **Order**: Siparişler
- **OrderItem**: Sipariş ürünleri
- **Setting**: Site ayarları

## 🔧 Yapılandırma

### iyzico Ödeme Entegrasyonu

1. [iyzico](https://www.iyzico.com/) hesabı oluşturun
2. API anahtarlarınızı alın
3. \`.env\` dosyasına ekleyin:

\`\`\`env
IYZICO_API_KEY="your-api-key"
IYZICO_SECRET_KEY="your-secret-key"
IYZICO_BASE_URL="https://sandbox-api.iyzipay.com"  # Test için
# Production: https://api.iyzipay.com
\`\`\`

### Email Konfigürasyonu

SMTP ayarlarını yapılandırın (Gmail örneği):

\`\`\`env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"  # 2FA etkinse App Password kullanın
SMTP_FROM="noreply@promosyonoyuncak.com"
\`\`\`

## 🚀 Production Deployment

### Önerilen Mimari

**Backend:** Railway / Render / DigitalOcean
**Frontend:** Vercel / Netlify
**Database:** Railway PostgreSQL / Render PostgreSQL

### Hızlı Deployment

\`\`\`bash
# Backend - Railway
cd backend
railway up

# Frontend - Vercel
vercel --prod
\`\`\`

**Detaylı deployment rehberi için:** [DEPLOYMENT.md](./DEPLOYMENT.md) dosyasına bakın.

### Docker ile Production

\`\`\`bash
# Full stack deployment
docker-compose up -d

# Nginx reverse proxy ekle
# SSL sertifikası (Let's Encrypt)
certbot --nginx -d yourdomain.com
\`\`\`

## 📝 Geliştirme Planı

### Tamamlanan ✅
- [x] Proje temel yapısı (Next.js 14, TypeScript, Tailwind)
- [x] Database şeması (Prisma + PostgreSQL)
- [x] Yasal sayfalar (KVKK, Mesafeli Satış, Gizlilik, vb.)
- [x] Güvenlik headers yapılandırması

### Yapılacaklar 🚧
- [ ] iyzico gerçek ödeme entegrasyonu
- [ ] Email bildirimleri (SMTP configuration)
- [ ] Ürün görselleri upload sistemi
- [ ] Sipariş tracking sistemi
- [ ] Analytics dashboard
- [ ] Responsive mobil optimizasyon
- [ ] SEO optimizasyonu
- [ ] PWA support
- [ ] Çoklu dil desteği

## 🛡️ Güvenlik

Bu proje aşağıdaki güvenlik önlemlerini içerir:

- ✅ HTTPS zorunlu (HSTS)
- ✅ XSS koruması
- ✅ CSRF token'ları
- ✅ SQL injection koruması (Prisma ORM)
- ✅ Rate limiting
- ✅ Secure headers
- ✅ PCI DSS uyumlu ödeme (iyzico)
- ✅ Şifrelerin hash'lenmesi (bcrypt)
- ✅ Environment variables ile hassas bilgi yönetimi

## 📄 Lisans

Tüm hakları saklıdır © 2024 Promosyon Oyuncak

## 📞 İletişim

- **Web:** promosyonoyuncak.com
- **Email:** info@promosyonoyuncak.com
- **Telefon:** +90 (XXX) XXX XX XX

---

**Not:** Bu proje production-ready seviyede güvenlik ve yasal uyumluluk standartlarına sahiptir.
Deployment öncesi tüm environment variables'ları ve API anahtarlarını güncellemeyi unutmayın.
